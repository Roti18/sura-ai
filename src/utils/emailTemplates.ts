export interface EmailTemplateOptions {
  to: string;
  subject: string;
  title: string;
  message: string;
  footer?: string;
  brandName?: string;
  logoUrl?: string;
}

export function buildEmail({
  to,
  subject,
  title,
  message,
  footer,
  brandName = "Sura AI",
  logoUrl,
}: EmailTemplateOptions) {
  const htmlBody = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
    </head>
    <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif;">
      <div style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; box-shadow: 0 20px 40px rgba(220, 38, 38, 0.1); overflow: hidden;">
        
        <!-- Header Section -->
        <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%); padding: 40px 30px; text-align: center; position: relative;">
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="80" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grain)"/></svg></div>
          
          ${
            logoUrl
              ? `
          <div style="margin-bottom: 20px; position: relative; z-index: 2;">
            <img src="${logoUrl}" alt="${brandName}" style="height: 50px; width: auto;">
          </div>
          `
              : `
          <div style="margin-bottom: 20px; position: relative; z-index: 2;">
            <div style="display: inline-block; background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(10px); border-radius: 12px; padding: 12px 20px; border: 1px solid rgba(255, 255, 255, 0.2);">
              <span style="color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: 1px;">${brandName}</span>
            </div>
          </div>
          `
          }
          
          <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.1); position: relative; z-index: 2;">${title}</h1>
          
          <!-- Decorative wave -->
          <div style="position: absolute; bottom: -1px; left: 0; right: 0; height: 20px; background: #ffffff; clip-path: polygon(0 100%, 100% 100%, 100% 0, 0 80%);"></div>
        </div>

        <!-- Main Content -->
        <div style="padding: 40px 30px;">
          <div style="background: #ffffff; border-left: 4px solid #dc2626; padding: 25px; margin-bottom: 30px; border-radius: 0 8px 8px 0; box-shadow: 0 2px 10px rgba(220, 38, 38, 0.1);">
            <div style="color: #374151; font-size: 16px; line-height: 1.7; white-space: pre-line;">${message}</div>
          </div>

          <!-- Call to Action Section (optional) -->
          <div style="text-align: center; margin: 30px 0;">
            <div style="display: inline-block; background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 15px 30px; border-radius: 50px; box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3); transition: all 0.3s ease;">
              <span style="color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; letter-spacing: 0.5px;">📧 Email Terkirim</span>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <div style="height: 1px; background: linear-gradient(90deg, transparent 0%, #dc2626 20%, #dc2626 80%, transparent 100%); margin: 0 30px;"></div>

        <!-- Footer -->
        <div style="padding: 30px; background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); text-align: center;">
          <div style="margin-bottom: 20px;">
            <div style="display: inline-flex; gap: 15px; align-items: center; justify-content: center;">
              <div style="width: 8px; height: 8px; background: #dc2626; border-radius: 50%; animation: pulse 2s infinite;"></div>
              <span style="color: #dc2626; font-size: 14px; font-weight: 600;">Sura AI</span>
              <div style="width: 8px; height: 8px; background: #dc2626; border-radius: 50%; animation: pulse 2s infinite;"></div>
            </div>
          </div>
          
          <p style="color: #6b7280; font-size: 13px; line-height: 1.6; margin: 0; font-style: italic;">
            ${
              footer ||
              "Ini email otomatis dari sura-ai-ind.vercel.app Jangan balas email ini."
            }
          </p>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(220, 38, 38, 0.1);">
            <p style="color: #9ca3af; font-size: 11px; margin: 0;">
              © ${new Date().getFullYear()} ${brandName}. Semua hak dilindungi.
            </p>
          </div>
        </div>
      </div>
      
      <!-- Responsive styles -->
      <style>
        @media only screen and (max-width: 600px) {
          .email-container {
            margin: 20px 10px !important;
            border-radius: 12px !important;
          }
          .header-padding {
            padding: 30px 20px !important;
          }
          .content-padding {
            padding: 30px 20px !important;
          }
          .footer-padding {
            padding: 25px 20px !important;
          }
          .title {
            font-size: 24px !important;
          }
          .message {
            font-size: 15px !important;
          }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      </style>
    </body>
    </html>
  `;

  const plainBody = `
${brandName.toUpperCase()}
========================================

${title}

${message}

----------------------------------------
${
  footer ||
  "Ini email otomatis dari sura-ai-ind.vercel.app Jangan balas email ini."
}

© ${new Date().getFullYear()} ${brandName}
sura-ai-ind.vercel.app
  `;

  return { to, subject, htmlBody, plainBody };
}
