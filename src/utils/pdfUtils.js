import { jsPDF } from 'jspdf';

/**
 * Generate a simple PDF table without using jspdf-autotable
 * @param {Object} options - Configuration options
 * @param {Array} options.headers - Table headers
 * @param {Array} options.data - Table data (array of arrays)
 * @param {string} options.title - PDF title
 * @param {string} options.filename - Output filename
 */
export const generatePDF = (options) => {
  const { headers, data, title, filename = 'export.pdf' } = options;
  
  // Create PDF document
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(18);
  doc.text(title || 'Product Catalog', 14, 20);
  
  // Add date
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
  
  // Set table styling
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  
  // Calculate column widths (simple approach)
  const pageWidth = doc.internal.pageSize.width;
  const margin = 14;
  const tableWidth = pageWidth - (margin * 2);
  const colWidth = tableWidth / headers.length;
  
  // Draw headers
  let y = 40;
  doc.setFont('helvetica', 'bold');
  headers.forEach((header, i) => {
    doc.text(header, margin + (i * colWidth), y);
  });
  
  // Draw data rows
  y += 10;
  doc.setFont('helvetica', 'normal');
  
  data.forEach(row => {
    // Check if we need a new page
    if (y > doc.internal.pageSize.height - 20) {
      doc.addPage();
      y = 20;
      
      // Redraw headers on new page
      doc.setFont('helvetica', 'bold');
      headers.forEach((header, i) => {
        doc.text(header, margin + (i * colWidth), y);
      });
      doc.setFont('helvetica', 'normal');
      y += 10;
    }
    
    // Draw row data
    row.forEach((cell, i) => {
      // Truncate long text
      const text = String(cell || '').substring(0, 25);
      doc.text(text, margin + (i * colWidth), y);
    });
    
    y += 7;
  });
  
  // Save the PDF
  doc.save(filename);
  
  return doc;
};
