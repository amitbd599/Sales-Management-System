import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

class pdfScript {
  templateOne({ getSetting, templateData }) {
    console.log(getSetting, templateData);
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.setFont("inter", "normal");
    // Logo
    // pdf.addImage("/image/shape/shape_1.png", "JPEG", 0, 0, 110, 0);
    pdf.addImage(getSetting?.logo, "JPEG", 15, 6, 30, 0);
    pdf.setFontSize(12);
    pdf.text(`Id: ${templateData?.invoiceID}`, 145, 15);
    pdf.setFontSize(16);
    pdf.text(`${getSetting?.company_name}`, 15, 26);
    pdf.setFontSize(10);
    pdf.text(`${getSetting?.company_address}`, 15, 32);
    pdf.text(`${getSetting?.email}, ${getSetting?.mobile}`, 15, 38);
    pdf.rect(15, 41, 80, 0.1);
    pdf.text(
      `Date: ${templateData?.startDate.toISOString().slice(0, 10)}`,
      145,
      21
    );
    pdf.text(
      `Delivery date: ${templateData?.deliveryDate.toISOString().slice(0, 10)}`,
      145,
      27
    );
    pdf.text(`Invoice writer: ${templateData?.invoiceWriter}`, 145, 33);

    // Client info
    pdf.text("Invoice to:", 15, 47);
    pdf.setFont("inter", "bold");
    pdf.setFontSize(16);
    pdf.text(templateData?.customerName, 15, 54);
    pdf.setFont("inter", "normal");
    pdf.setFontSize(10);
    pdf.text(templateData?.address, 15, 60);
    pdf.text(`Phone: ${templateData?.phone}`, 15, 66);
    pdf.text(`Email: ${templateData?.email}`, 15, 72);
    pdf.setFontSize(14);
    pdf.text(`Payment method: ${templateData?.paymentMethod}`, 145, 48);
    pdf.setFontSize(10);
    templateData?.paymentMethod === "Bank" &&
      pdf.text(`Account no: ${templateData?.accountNumber}`, 145, 54);
    templateData?.paymentMethod === "Bank" &&
      pdf.text(`Account name:  ${templateData?.accountName}`, 145, 60);
    templateData?.paymentMethod === "Bank" &&
      pdf.text(`Branch name: ${templateData?.branchName}`, 145, 66);
    pdf.setTextColor(255, 0, 0);
    templateData?.paymentMethod === "Bank"
      ? pdf.text(
          `Payment status: ${templateData?.due > 0 ? "Due" : "Paid"}`,
          145,
          72
        )
      : pdf.text(
          `Payment status: ${templateData?.due > 0 ? "Due" : "Paid"}`,
          145,
          54
        );
    pdf.setTextColor(0, 0, 0);

    // Table Item
    autoTable(pdf, {
      startY: 80,
      headStyles: { halign: "left", fillColor: [250, 185, 7] },
      columnStyles: { halign: "left" },
      body: templateData?.invoiceItems,
      columns: [
        { header: "Item", dataKey: "item" },
        { header: "Quantity", dataKey: "quantity" },
        { header: "Rate", dataKey: "rate" },
        { header: "Amount", dataKey: "amount" },
      ],
    });
    // Table Calculation
    autoTable(pdf, {
      tableWidth: 120,
      margin: { left: pdf.internal.pageSize.width - 134 },
      headStyles: { halign: "left", fillColor: [250, 185, 7] },
      columnStyles: { halign: "left" },
      body: [
        {
          subTotal: `${templateData?.subTotal.toString()}`,
          Tax: `+ ${templateData?.tax.toString()}`,
          Vat: `${templateData?.vat.toString()}`,
          Shipping: `+ ${templateData?.shipping.toString()}`,
          Discount: `- ${templateData?.discount.toString()}`,
          Total: `= ${templateData?.total.toString()}`,
        },
      ],
      columns: [
        { header: "Subtotal", dataKey: "subTotal" },
        { header: "Tax", dataKey: "Tax" },
        { header: "Vat", dataKey: "Vat" },
        { header: "Shipping", dataKey: "Shipping" },
        { header: "Discount", dataKey: "Discount" },
        { header: "Total", dataKey: "Total" },
      ],
    });
    // Table payment calculation
    autoTable(pdf, {
      tableWidth: 60,
      margin: { left: pdf.internal.pageSize.width - 74, bottom: 40 },
      headStyles: { europe: { halign: "right" }, fillColor: [250, 185, 7] },
      columnStyles: { europe: { halign: "center" } },
      body: [
        {
          Total: `${templateData?.total.toString()}`,
          Payment: `- ${templateData?.payment.toString()}`,
          Due: `${templateData?.due.toString()}`,
        },
      ],
      columns: [
        { header: "Total", dataKey: "Total" },
        { header: "Payment", dataKey: "Payment" },
        { header: "Due", dataKey: "Due" },
      ],
    });

    // Footer
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(14);
    pdf.text("Authorized Signature", 150, pdf.internal.pageSize.height - 23);
    pdf.setFontSize(10);
    pdf.setDrawColor(0);
    pdf.setFillColor(255, 0, 0);
    pdf.rect(-10, pdf.internal.pageSize.height - 15, 400, 1, "F");
    var splitTitle = pdf.splitTextToSize(getSetting?.footerText, 180);
    pdf.text(splitTitle, 10, pdf.internal.pageSize.height - 7);

    var note = pdf.splitTextToSize(`Note: ${templateData?.note}`, 120);
    pdf.text(note, 10, pdf.internal.pageSize.height - 35);

    // Demo Text
    pdf.setFontSize(80);
    pdf.text("Test Page", 80, 200, null, 50);

    // Save the PDF
    pdf.save("invoice.pdf");

    // Convert the PDF to a data URL
    const pdfDataUri = pdf.output("datauristring");
    // Set the data URL in the state to trigger a re-render
    return pdfDataUri;
  }
}

let pdfScriptData = new pdfScript();

export default pdfScriptData;
