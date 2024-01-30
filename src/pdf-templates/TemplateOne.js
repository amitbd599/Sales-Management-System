import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode-generator";


function TemplateOne({ getSetting, templateData, print, view, save }) {
    const pdf = new jsPDF(
      getSetting?.pageOrientation,
      "mm",
      getSetting?.pageSize
    );
    pdf.setFont("inter", "normal");
    pdf.setTextColor(getSetting?.textColor?.r,
      getSetting?.textColor?.g,
      getSetting?.textColor?.b,);
    // Your QR code content
    const qrCodeContent = "Please add your information";
    const typeNumber = 0;
    const errorCorrectionLevel = "L";
    const qr = QRCode(typeNumber, errorCorrectionLevel);
    qr.addData(qrCodeContent);
    qr.make();
    const qrCodeImageUri = qr.createDataURL();
    let qrWidth = 20; // Set the width of your image
    let qrHeight = 20; // Set the height of your image
    let centerQRX = (pdf.internal.pageSize.width - qrWidth) / 2;
    getSetting?.qrCode === "yes" &&
      pdf.addImage(
        qrCodeImageUri,
        "PNG",
        centerQRX + 10,
        10,
        qrWidth,
        qrHeight
      );


    // Logo
    getSetting?.logo.length !== 0 &&
      pdf.addImage(getSetting?.logo, "JPEG", 15, 8, 0, 14);

    // Adjust right position data
    let dataList = [
      templateData?.invoiceID,
      templateData?.startDate.toISOString().slice(0, 10),
      templateData?.deliveryDate.toISOString().slice(0, 10),
      templateData?.invoiceWriter,
      `Payment method: ${templateData?.paymentMethod}`,
      `A/C no: ${templateData?.accountNumber}`,
      `Branch: ${templateData?.branchName}`,
      `Payment status: ${templateData?.due}`,
    ];
    let maxWidth = 0;

    dataList.forEach(function (item) {
      let itemWidth = pdf.getStringUnitWidth(item) * 5;
      if (itemWidth > maxWidth) {
        maxWidth = parseInt(itemWidth);
      }
    });
    let rightPosition =
      parseInt(pdf.internal.pageSize.width) - parseInt(maxWidth) - 4;

    // Invoice id
    pdf.setFontSize(12);
    pdf.text(`Id: ${templateData?.invoiceID}`, rightPosition, 15);

    // company_name
    pdf.text(`${getSetting?.company_name}`, 15, 28);

    pdf.setFontSize(10);
    pdf.text(`${getSetting?.company_address}`, 15, 34);
    pdf.text(
      `${getSetting?.email}, ${getSetting?.mobile}, ${getSetting?.website}`,
      15,
      38
    );
    pdf.rect(15, 41, 80, 0.1);
    pdf.text(
      `Date: ${templateData?.startDate.toISOString().slice(0, 10)}`,
      rightPosition,
      21
    );
    pdf.text(
      `Delivery date: ${templateData?.deliveryDate.toISOString().slice(0, 10)}`,
      rightPosition,
      26
    );
    pdf.text(`Writer: ${templateData?.invoiceWriter}`, rightPosition, 31);

    // Client info
    pdf.text("Invoice to:", 15, 47);
    pdf.setFont("inter", "bold");
    pdf.setFontSize(16);
    pdf.text(templateData?.customerName, 15, 54);
    pdf.setFont("inter", "normal");
    pdf.setFontSize(10);
    pdf.text(templateData?.address, 15, 60);
    pdf.text(`Phone: ${templateData?.phone}`, 15, 65);
    pdf.text(`Email: ${templateData?.email}`, 15, 70);
    pdf.setFontSize(12);
    pdf.text(
      `Payment method: ${templateData?.paymentMethod}`,
      rightPosition,
      48
    );
    pdf.setFontSize(10);
    templateData?.paymentMethod === "Bank" &&
      pdf.text(`A/C no: ${templateData?.accountNumber}`, rightPosition, 54);
    templateData?.paymentMethod === "Bank" &&
      pdf.text(`A/C name:  ${templateData?.accountName}`, rightPosition, 59);
    templateData?.paymentMethod === "Bank" &&
      pdf.text(`Branch: ${templateData?.branchName}`, rightPosition, 64);

    templateData?.paymentMethod === "Bank"
      ? pdf.text(
        `Payment status: ${templateData?.due > 0 ? "Due" : "Paid"}`,
        rightPosition,
        69
      )
      : pdf.text(
        `Payment status: ${templateData?.due > 0 ? "Due" : "Paid"}`,
        rightPosition,
        54
      );


    // Table Item
    autoTable(pdf, {
      startY: 80,
      theme: 'grid',
      headStyles: {
        halign: "left",
        fillColor: [
          getSetting?.themeColor?.r,
          getSetting?.themeColor?.g,
          getSetting?.themeColor?.b,
        ],
      },
      columnStyles: { halign: "left" },
      body: templateData?.invoiceItems,
      columns: [
        { header: "Item", dataKey: "item" },
        { header: "Quantity", dataKey: "quantity" },
        { header: "Rate", dataKey: "rate" },
        { header: "Amount", dataKey: "amount" },
      ],
    });
    let data = [
      ["Description", "Value"],
      ["Subtotal", templateData?.subTotal],
      [`${templateData?.taxationName}(${templateData?.taxationPercent}%)`, templateData?.taxation],
      ["Shipping", templateData?.shipping],
      ["Discount", templateData?.discount],
      ["Total", templateData?.total],
      ["Payment", templateData?.payment],
      ["Due", templateData?.due],
    ];
    var styles = {
      fontStyle: "bold",
      fontSize: 10,
      textColor: 0,
      halign: "left",
    };
    pdf.autoTable({
      tableWidth: 60,
      margin: { left: pdf.internal.pageSize.width - 74, bottom: 40 },
      // head: [data[0]],
      body: data.slice(1),
      styles: styles,
      theme: 'grid',
      headStyles: {
        europe: { halign: "right" },
        fillColor: [
          getSetting?.themeColor?.r,
          getSetting?.themeColor?.g,
          getSetting?.themeColor?.b,
        ],
        textColor: [255, 255, 255],
      },
      columnStyles: {
        0: { fontStyle: "normal" },
      },
    });

    // Footer
    pdf.setFontSize(14);
    pdf.text(
      `Authorized Signature`,
      pdf.internal.pageSize.width - 15,
      pdf.internal.pageSize.height - 23,
      {
        align: "right",
      }
    );
    pdf.setFontSize(10);
    pdf.setDrawColor(0);
    pdf.setFillColor(
      getSetting?.themeColor?.r,
      getSetting?.themeColor?.g,
      getSetting?.themeColor?.b
    );
    pdf.rect(-10, pdf.internal.pageSize.height - 15, 400, 1, "F");
    let splitTitle = pdf.splitTextToSize(getSetting?.footerText, 180);
    pdf.text(splitTitle, 10, pdf.internal.pageSize.height - 7);

    let note = pdf.splitTextToSize(`Note: ${templateData?.note}`, 120);
    pdf.text(note, 10, pdf.internal.pageSize.height - 35);

    for (let i = 1; i <= pdf.internal.getNumberOfPages(); i++) {
      pdf.setPage(i);
      // Water nark
      pdf.setFontSize(200);
      pdf.saveGraphicsState();
      pdf.setGState(new pdf.GState({ opacity: 0.1 }));
      pdf.text(templateData?.waterMark, 50, 220, null, 45)
      // Bg image
      let imgWidth = 100; // Set the width of your image
      let imgHeight = 0; // Set the height of your image
      let centerImgX = (pdf.internal.pageSize.width - imgWidth) / 2;
      let centerImgY = (pdf.internal.pageSize.height - imgHeight) / 2;

      // Add the image to the PDF at the center position

      getSetting?.bgImg?.length !== 0 &&
        pdf.addImage(
          getSetting?.bgImg,
          "JPEG",
          centerImgX,
          centerImgY,
          imgWidth,
          imgHeight
        );
      pdf.restoreGraphicsState();
    }

    if (print === true) {
      pdf.autoPrint();
      pdf.output("dataurlnewwindow");
    }

    view === true && pdf.output("dataurlnewwindow");
    save === true && pdf.save("invoice.pdf");

    // Convert the PDF to a data URL
    const pdfDataUri = pdf.output("datauristring");
    // Set the data URL in the state to trigger a re-render
    return pdfDataUri;
}
  

export default TemplateOne