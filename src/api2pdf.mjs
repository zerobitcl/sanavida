const ENDPOINT = 'https://v2.api2pdf.com/chrome/pdf/html';

/**
 * Convierte HTML a PDF vía Api2Pdf (Headless Chrome).
 * La API key NUNCA debe llegar al navegador.
 */
export async function htmlToPdf({ html, fileName, apiKey }) {
  if (!apiKey) throw new Error('Falta API2PDF_API_KEY');

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      html,
      fileName: fileName || 'cotizacion-sanavida.pdf',
      inlinePdf: true,
      options: {
        printBackground: true,
        preferCSSPageSize: true,
        marginTop: '0.4in',
        marginBottom: '0.45in',
        marginLeft: '0.4in',
        marginRight: '0.4in',
        displayHeaderFooter: true,
        headerTemplate: '<span></span>',
        footerTemplate: `
          <div style="width:100%;font-size:8px;color:#6b5670;padding:0 28px;display:flex;justify-content:space-between;font-family:system-ui,sans-serif">
            <span>SanaVida · Cotización confidencial</span>
            <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
          </div>`,
      },
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.Success === false) {
    const msg = data.Error || data.message || `Api2Pdf HTTP ${res.status}`;
    throw new Error(msg);
  }
  if (!data.FileUrl) throw new Error('Api2Pdf no devolvió FileUrl');
  return data;
}
