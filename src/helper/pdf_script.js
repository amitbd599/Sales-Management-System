import jsPDF from "jspdf";

class pdfScript {
  templateOne({ getSetting }) {
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.setFont("inter", "normal");
    // Logo
    pdf.addImage("/image/shape/shape_1.png", "JPEG", 0, 0, 110, 0);
    pdf.addImage(getSetting?.logo, "JPEG", 15, 10, 30, 0);
    pdf.setFontSize(12);
    pdf.text(`Id: ${invoiceID}`, 150, 15);
    pdf.text(`Date: ${startDate.toISOString().slice(0, 10)}`, 150, 22);
    pdf.text(
      `Delivery date: ${deliveryDate.toISOString().slice(0, 10)}`,
      150,
      29
    );

    // Client info
    pdf.text("Invoice to:", 15, 45);
    pdf.setFont("inter", "bold");
    pdf.setFontSize(16);
    pdf.text(customerName, 15, 54);
    pdf.setFont("inter", "normal");
    pdf.setFontSize(10);
    pdf.text(address, 15, 60);
    pdf.text(`Phone: ${address}`, 15, 66);
    pdf.text(`Email: ${email}`, 15, 72);
    pdf.text(`Payment method: ${paymentMethod}`, 150, 45);
    pdf.text(`Account no: ${accountNumber}`, 150, 54);
    pdf.text(`Account name:  ${accountName}`, 150, 60);
    pdf.text(`Branch name: ${branchName}`, 150, 66);
    pdf.text(`Payment status: ${due > 0 ? "Due" : "Paid"}`, 150, 72);

    // Table head
    autoTable(pdf, {
      startY: 80,
      headStyles: { europe: { halign: "center" }, fillColor: [250, 185, 7] }, // European countries centered
      columnStyles: { europe: { halign: "center" } }, // European countries centered
      body: invoiceItems,
      columns: [
        { header: "Item", dataKey: "item" },
        { header: "Quantity", dataKey: "quantity" },
        { header: "Rate", dataKey: "rate" },
        { header: "Amount", dataKey: "amount" },
      ],
    });

    autoTable(pdf, {
      tableWidth: 120,
      margin: { left: pdf.internal.pageSize.width - 134 },
      headStyles: { europe: { halign: "right" }, fillColor: [250, 185, 7] }, // European countries centered
      columnStyles: { europe: { halign: "center" } }, // European countries centered
      body: [
        {
          Title: "Subtotal",
          subTotal: `${subTotal.toString()}`,
          Tax: `+ ${tax.toString()}`,
          Vat: `${vat.toString()}`,
          Shipping: `+ ${shipping.toString()}`,
          Discount: `- ${discount.toString()}`,
          Total: `= ${total.toString()}`,
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

    // pdf.text(
    //   "Additional text goes here",
    //   15,
    //   pdf.autoTable.previous.finalY + 10
    // );

    // Footer
    pdf.setTextColor(0, 0, 0);
    pdf.text(
      "Thank you for your business!",
      15,
      pdf.internal.pageSize.height - 15
    );

    // Save the PDF
    pdf.save("invoice.pdf");

    // Convert the PDF to a data URL
    const pdfDataUri = pdf.output("datauristring");
    // Set the data URL in the state to trigger a re-render
    setPdfDataUri(pdfDataUri);
  }
}

let pdfScriptData = new pdfScript();

export default pdfScriptData;
