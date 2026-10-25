# VD DEFENSE Next.js Website

Turkish and English corporate website. Existing product and corporate pages preserved.

## Start

```bash
npm install
npm run dev
```

## Contact update

- Address: Konutkent Mahallesi, 3028. Cadde, No: 8E/61, Çankaya / Ankara, Türkiye
- Telephone / WhatsApp: +90 532 661 52 06
- Recipient: caglaryuklu@vegatek.com.tr
- Floating WhatsApp button appears on both languages.
- `/tr/contact` and `/en/contact` have 24/7 submission forms.
- The server endpoint `/api/contact` uses Resend. No credentials are shipped with this ZIP.

### REQUIRED to activate form email delivery

1. Create a Resend account and verify a domain you control for outbound email (e.g. vddefense.com). Follow the provider's DNS instructions without removing the Vercel website DNS records.
2. In Vercel Project > Settings > Environment Variables, set `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` (verified sender such as `noreply@vddefense.com`). Set Production environment, then redeploy.
3. Test the form end-to-end. The recipient is `caglaryuklu@vegatek.com.tr`. Until these environment variables are configured, the form returns an error rather than falsely claiming successful delivery.
4. Before public launch, add a privacy notice / KVKK disclosure and production anti-spam rate limiting or CAPTCHA. The current form includes basic validation and a honeypot, not comprehensive abuse prevention.

## Deploy

Upload the **contents** of this project directory to your GitHub repository root (not the ZIP file). Vercel automatically deploys connected repository commits. Keep `.env` files and API keys out of GitHub.

Run `npm audit` and resolve dependency security findings before production use.
