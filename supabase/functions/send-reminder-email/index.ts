import { corsHeaders } from "@shared/cors.ts";

interface ReminderEmailRequest {
  to: string;
  userName: string;
  credentialName: string;
  credentialType: string;
  organization: string;
  expiryDate: string;
  daysUntilExpiry: number;
  renewalLink?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders, status: 200 });
  }

  try {
    const {
      to,
      userName,
      credentialName,
      credentialType,
      organization,
      expiryDate,
      daysUntilExpiry,
      renewalLink,
    }: ReminderEmailRequest = await req.json();

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    
    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Credential Expiry Reminder</title>
</head>
<body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #111827; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #0066FF 0%, #0052CC 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">🔔 Credential Expiry Reminder</h1>
  </div>
  
  <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
    <p style="font-size: 16px; margin-bottom: 20px;">Hi ${userName},</p>
    
    <p style="font-size: 16px; margin-bottom: 20px;">
      Your <strong>${credentialName}</strong> will expire in <strong style="color: ${daysUntilExpiry <= 7 ? '#EF4444' : daysUntilExpiry <= 30 ? '#F59E0B' : '#10B981'};">${daysUntilExpiry} days</strong> on <strong>${expiryDate}</strong>.
    </p>
    
    <div style="background: #F9FAFB; border-radius: 8px; padding: 20px; margin: 20px 0;">
      <h3 style="margin: 0 0 15px 0; font-size: 14px; color: #6B7280; text-transform: uppercase; letter-spacing: 0.5px;">Credential Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #6B7280; font-size: 14px;">Type:</td>
          <td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${credentialType}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6B7280; font-size: 14px;">Organization:</td>
          <td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${organization}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6B7280; font-size: 14px;">Expiration Date:</td>
          <td style="padding: 8px 0; font-weight: 600; font-size: 14px; color: ${daysUntilExpiry <= 7 ? '#EF4444' : '#111827'};">${expiryDate}</td>
        </tr>
      </table>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${renewalLink || 'https://certtracker.app/dashboard'}" style="display: inline-block; background: #0066FF; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
        View in Dashboard →
      </a>
    </div>
    
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
    
    <p style="font-size: 14px; color: #6B7280; margin-bottom: 10px;">
      Questions? Reply to this email or visit your CertTracker dashboard.
    </p>
    
    <p style="font-size: 14px; color: #6B7280; margin: 0;">
      Best regards,<br>
      <strong>CertTracker Team</strong>
    </p>
  </div>
  
  <div style="text-align: center; padding: 20px; color: #9CA3AF; font-size: 12px;">
    <p style="margin: 0;">© 2024 CertTracker. All rights reserved.</p>
    <p style="margin: 5px 0 0 0;">
      <a href="#" style="color: #9CA3AF; text-decoration: underline;">Unsubscribe</a> · 
      <a href="#" style="color: #9CA3AF; text-decoration: underline;">Privacy Policy</a>
    </p>
  </div>
</body>
</html>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'CertTracker <notifications@certtracker.app>',
        to: [to],
        subject: `Your ${credentialName} expires in ${daysUntilExpiry} days`,
        html: emailHtml,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to send email', details: data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, messageId: data.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
