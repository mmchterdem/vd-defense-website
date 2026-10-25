import {NextResponse} from 'next/server';
export const runtime='nodejs';
const recipient='caglaryuklu@vegatek.com.tr';
function validEmail(v:string){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)}
export async function POST(req:Request){
 let data:Record<string,unknown>;
 try{if(Number(req.headers.get('content-length')||0)>16000)return NextResponse.json({error:'Too large'},{status:413});data=await req.json();}catch{return NextResponse.json({error:'Invalid request'},{status:400})}
 const get=(key:string)=>typeof data[key]==='string'?(data[key] as string).trim():'';
 if(get('website'))return NextResponse.json({ok:true});
 const name=get('name'),email=get('email'),phone=get('phone'),company=get('company'),subject=get('subject'),message=get('message'),lang=get('lang');
 if(!name||name.length>120||!validEmail(email)||email.length>200||phone.length>40||company.length>120||!subject||subject.length>150||message.length<10||message.length>5000||data.consent!=='yes'||!['tr','en'].includes(lang))return NextResponse.json({error:'Invalid fields'},{status:400});
 const key=process.env.RESEND_API_KEY,from=process.env.CONTACT_FROM_EMAIL;
 if(!key||!from){console.error('Contact form email service not configured');return NextResponse.json({error:'Service unavailable'},{status:503})}
 const escape=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]||c));
 const fields={Name:name,Company:company,Email:email,Phone:phone,Subject:subject,Message:message,Language:lang};
 const html='<h2>VD DEFENSE - New Contact Request</h2>'+Object.entries(fields).map(([k,v])=>`<p><strong>${k}:</strong> ${escape(v).replace(/\n/g,'<br>')}</p>`).join('');
 try{const res=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({from,to:[recipient],reply_to:email,subject:'VD DEFENSE Contact: '+subject,html}),cache:'no-store'});if(!res.ok){console.error('Email provider error',res.status);return NextResponse.json({error:'Delivery failed'},{status:502})}return NextResponse.json({ok:true})}catch{return NextResponse.json({error:'Delivery failed'},{status:502})}
}
