import { toCanvas } from 'html-to-image';
import { jsPDF } from 'jspdf';

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

export async function exportPreviewToPdf(elementId = 'pdf-export-target'): Promise<Blob> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('The CV preview is not available for export.');
  }

  await document.fonts.ready;

  const canvas = await toCanvas(element, {
    backgroundColor: '#ffffff',
    pixelRatio: 2,
    width: element.scrollWidth,
    height: element.scrollHeight,
    cacheBust: true,
    // Fonts are already loaded above; skipping CSS inlining avoids cross-origin
    // stylesheet access while preserving the preview's computed font families.
    skipFonts: true,
  });

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const pageHeightPx = Math.floor((canvas.width * A4_HEIGHT_MM) / A4_WIDTH_MM);
  let sourceY = 0;
  let pageIndex = 0;

  while (sourceY < canvas.height) {
    const sliceHeight = Math.min(pageHeightPx, canvas.height - sourceY);
    const pageCanvas = document.createElement('canvas');
    pageCanvas.width = canvas.width;
    pageCanvas.height = pageHeightPx;

    const context = pageCanvas.getContext('2d');
    if (!context) {
      throw new Error('Could not prepare the PDF page.');
    }

    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
    context.drawImage(
      canvas,
      0,
      sourceY,
      canvas.width,
      sliceHeight,
      0,
      0,
      canvas.width,
      sliceHeight
    );

    if (pageIndex > 0) pdf.addPage('a4', 'portrait');
    pdf.addImage(
      pageCanvas.toDataURL('image/png'),
      'PNG',
      0,
      0,
      A4_WIDTH_MM,
      A4_HEIGHT_MM,
      undefined,
      'FAST'
    );

    sourceY += sliceHeight;
    pageIndex += 1;
  }

  return pdf.output('blob');
}

export function downloadPdf(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
