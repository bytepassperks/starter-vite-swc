import type { Credential } from '@/types/supabase';

export const exportCredentialsToPDF = (credentials: Credential[], userName: string) => {
  // Create a printable HTML document
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to export PDF');
    return;
  }

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const getStatusColor = (expiryDate: string) => {
    const days = Math.ceil(
      (new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    if (days < 0) return '#EF4444';
    if (days <= 15) return '#EF4444';
    if (days <= 30) return '#F59E0B';
    return '#10B981';
  };

  const getStatusText = (expiryDate: string) => {
    const days = Math.ceil(
      (new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    if (days < 0) return 'Expired';
    if (days <= 30) return 'Expiring Soon';
    return 'Valid';
  };

  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>CertTracker - Credentials Report</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #111827;
      padding: 40px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 2px solid #0066FF;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .logo-icon {
      width: 40px;
      height: 40px;
      background: #0066FF;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
    }
    .logo-text {
      font-size: 24px;
      font-weight: bold;
      color: #111827;
    }
    .report-info {
      text-align: right;
      color: #6B7280;
      font-size: 14px;
    }
    h1 {
      font-size: 28px;
      margin-bottom: 10px;
      color: #111827;
    }
    .summary {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin-bottom: 40px;
    }
    .summary-card {
      background: #F9FAFB;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
    }
    .summary-card h3 {
      font-size: 12px;
      color: #6B7280;
      text-transform: uppercase;
      margin-bottom: 5px;
    }
    .summary-card .value {
      font-size: 32px;
      font-weight: bold;
    }
    .credentials-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    .credentials-table th {
      background: #F9FAFB;
      padding: 12px;
      text-align: left;
      font-size: 12px;
      text-transform: uppercase;
      color: #6B7280;
      border-bottom: 2px solid #E5E7EB;
    }
    .credentials-table td {
      padding: 16px 12px;
      border-bottom: 1px solid #E5E7EB;
      font-size: 14px;
    }
    .status-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #E5E7EB;
      text-align: center;
      color: #9CA3AF;
      font-size: 12px;
    }
    @media print {
      body { padding: 20px; }
      .summary { grid-template-columns: repeat(4, 1fr); }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">
      <div class="logo-icon">CT</div>
      <span class="logo-text">CertTracker</span>
    </div>
    <div class="report-info">
      <div><strong>${userName}</strong></div>
      <div>Generated: ${today}</div>
    </div>
  </div>

  <h1>Credentials Report</h1>
  <p style="color: #6B7280; margin-bottom: 30px;">Complete list of all tracked credentials and their status.</p>

  <div class="summary">
    <div class="summary-card">
      <h3>Total Credentials</h3>
      <div class="value" style="color: #111827;">${credentials.length}</div>
    </div>
    <div class="summary-card">
      <h3>Valid</h3>
      <div class="value" style="color: #10B981;">${credentials.filter(c => c.status === 'valid').length}</div>
    </div>
    <div class="summary-card">
      <h3>Expiring Soon</h3>
      <div class="value" style="color: #F59E0B;">${credentials.filter(c => c.status === 'expiring_soon').length}</div>
    </div>
    <div class="summary-card">
      <h3>Expired</h3>
      <div class="value" style="color: #EF4444;">${credentials.filter(c => c.status === 'expired').length}</div>
    </div>
  </div>

  <table class="credentials-table">
    <thead>
      <tr>
        <th>Credential Name</th>
        <th>Type</th>
        <th>Organization</th>
        <th>ID Number</th>
        <th>Expiry Date</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      ${credentials.map(cred => `
        <tr>
          <td><strong>${cred.name}</strong></td>
          <td style="text-transform: capitalize;">${cred.type}</td>
          <td>${cred.organization || '-'}</td>
          <td style="font-family: monospace;">${cred.credential_number || '-'}</td>
          <td>${new Date(cred.expiry_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
          <td>
            <span class="status-badge" style="background: ${getStatusColor(cred.expiry_date)}20; color: ${getStatusColor(cred.expiry_date)};">
              ${getStatusText(cred.expiry_date)}
            </span>
          </td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <div class="footer">
    <p>© 2024 CertTracker. This report was generated automatically.</p>
    <p>For questions, contact support@certtracker.app</p>
  </div>

  <script>
    window.onload = function() {
      window.print();
    }
  </script>
</body>
</html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
};
