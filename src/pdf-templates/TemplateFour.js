import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode-generator";

function TemplateFour({ getSetting, templateData, print, view, save }) {
  const pdf = new jsPDF(
    getSetting?.pageOrientation,
    "mm",
    getSetting?.pageSize
  );

  pdf.setFont("inter", "normal");
  // Logo
  getSetting?.logo.length !== 0 &&
    pdf.addImage(getSetting?.logo, "JPEG", 15, 8, 0, 14);

  pdf.setDrawColor(0);
  pdf.setFillColor(
    getSetting?.themeColor?.r,
    getSetting?.themeColor?.g,
    getSetting?.themeColor?.b
  );
  pdf.rect(-10, 44, 400, 1, "F");

  pdf.setFontSize(40);
  pdf.setFont("inter", "bold");
  pdf.setTextColor(
    getSetting?.themeColor?.r,
    getSetting?.themeColor?.g,
    getSetting?.themeColor?.b
  );

  // Your QR code content
  const qrCodeContent = `Invoice Id #-${templateData?.invoiceID}`;
  const typeNumber = 0;
  const errorCorrectionLevel = "L";
  const qr = QRCode(typeNumber, errorCorrectionLevel);
  qr.addData(qrCodeContent);
  qr.make();
  const qrCodeImageUri = qr.createDataURL();
  let qrWidth = 20; // Set the width of your image
  let qrHeight = 20; // Set the height of your image
  getSetting?.qrCode === "yes" &&
    pdf.addImage(
      qrCodeImageUri,
      "PNG",
      pdf.internal.pageSize.width - 32,
      22,
      qrWidth,
      qrHeight
    );
  pdf.setTextColor(0, 0, 0);
  pdf.setFont("inter", "normal");
  pdf.setFontSize(8);
  pdf.text(
    `INVOICE # ${templateData?.invoiceID}`,
    pdf.internal.pageSize.width - 15,
    10,
    {
      align: "right",
    }
  );
  pdf.text(
    `Payment status: ${templateData?.due > 0 ? "Due" : "Paid"}`,
    pdf.internal.pageSize.width - 15,
    14,
    {
      align: "right",
    }
  );
  pdf.text(
    `Submit date  ${templateData?.startDate.toISOString().slice(0, 10)}`,
    pdf.internal.pageSize.width - 15,
    18,
    {
      align: "right",
    }
  );
  pdf.text(
    `Delivery date  ${templateData?.deliveryDate.toISOString().slice(0, 10)}`,
    pdf.internal.pageSize.width - 15,
    22,
    {
      align: "right",
    }
  );

  pdf.text(`${getSetting?.company_name}`, 15, 28);
  pdf.setFontSize(10);
  pdf.text(`${getSetting?.company_address}`, 15, 33);
  pdf.text(
    `${getSetting?.email}, ${getSetting?.mobile}, ${getSetting?.website}`,
    15,
    38
  );

  // Right side data
  let templateTwoRightStart = parseInt(pdf.internal.pageSize.width) / 2;
  // Filled red square
  pdf.setDrawColor(0);
  pdf.setFillColor(
    getSetting?.themeColor?.r,
    getSetting?.themeColor?.g,
    getSetting?.themeColor?.b
  );
  pdf.rect(15, 52, templateTwoRightStart - 30, 8, "F");
  pdf.setTextColor(
    getSetting?.themeTextColor?.r,
    getSetting?.themeTextColor?.g,
    getSetting?.themeTextColor?.b
  );
  pdf.setFontSize(12);
  pdf.text("Client information", 20, 57);
  pdf.setTextColor(0, 0, 0);
  // company_name
  pdf.setFontSize(14);
  pdf.setFont("inter", "bold");
  pdf.text(`${templateData?.customerName}`, 20, 66);
  pdf.setFont("inter", "normal");
  pdf.setFontSize(10);
  pdf.text(`${templateData?.address}`, 20, 73);
  pdf.text(`Phone: ${templateData?.phone}`, 20, 78);
  pdf.text(`Email: ${templateData?.email}`, 20, 83);

  // Filled red square
  pdf.setDrawColor(0);
  pdf.setFillColor(
    getSetting?.themeColor?.r,
    getSetting?.themeColor?.g,
    getSetting?.themeColor?.b
  );
  pdf.rect(templateTwoRightStart + 15, 52, templateTwoRightStart - 30, 8, "F");
  pdf.setTextColor(
    getSetting?.themeTextColor?.r,
    getSetting?.themeTextColor?.g,
    getSetting?.themeTextColor?.b
  );
  pdf.setFontSize(12);
  pdf.text("Payment info", templateTwoRightStart + 20, 57);
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(14);
  pdf.setFont("inter", "bold");
  pdf.setFontSize(10);
  pdf.setFont("inter", "normal");
  pdf.setFontSize(14);
  pdf.setFont("inter", "bold");
  pdf.text(
    `Payment method: ${templateData?.paymentMethod}`,
    templateTwoRightStart + 20,
    66
  );
  pdf.setFont("inter", "normal");
  pdf.setFontSize(10);
  templateData?.paymentMethod === "Bank" &&
    pdf.text(
      `A/C name:  ${templateData?.accountName}`,
      templateTwoRightStart + 20,
      73
    );
  templateData?.paymentMethod === "Bank" &&
    pdf.text(
      `A/C no: ${templateData?.accountNumber}`,
      templateTwoRightStart + 20,
      78
    );
  templateData?.paymentMethod === "Bank" &&
    pdf.text(
      `Branch: ${templateData?.branchName}`,
      templateTwoRightStart + 20,
      83
    );
  pdf.setTextColor(255, 0, 0);

  // Table Item
  autoTable(pdf, {
    startY: 90,
    theme: "grid",
    headStyles: {
      halign: "left",
      fillColor: [
        getSetting?.themeColor?.r,
        getSetting?.themeColor?.g,
        getSetting?.themeColor?.b,
      ],
      textColor: [
        getSetting?.themeTextColor?.r,
        getSetting?.themeTextColor?.g,
        getSetting?.themeTextColor?.b,
      ],
    },
    columnStyles: {
      halign: "left",
    },
    body: templateData?.invoiceItems,
    columns: [
      { header: "Item", dataKey: "item" },
      { header: "Quantity", dataKey: "quantity" },
      { header: `Rate(${templateData?.currency})`, dataKey: "rate" },
      { header: `Amount(${templateData?.currency})`, dataKey: "amount" },
    ],
  });
  // Table payment calculation
  let data = [
    ["Subtotal", templateData?.subTotal],
    [
      `${templateData?.taxationName}(${templateData?.taxationPercent}%)`,
      templateData?.taxation,
    ],
    ["Shipping", templateData?.shipping],
    ["Discount", `(${templateData?.discount})`],
    ["Total", templateData?.total],
    ["Payment", `(${templateData?.payment})`],
    ["Due", templateData?.due],
  ];
  var styles = {
    fontStyle: "bold",
    fontSize: 10,
    textColor: 0,
    halign: "left",
  };
  autoTable(pdf, {
    tableWidth: 70,
    margin: { left: pdf.internal.pageSize.width - 84, bottom: 40 },
    body: data,
    styles: styles,
    theme: "grid",
    headStyles: {
      europe: { halign: "right" },
      fillColor: [0, 0, 0],
      textColor: [0, 0, 0],
    },
    columnStyles: {
      0: { fontStyle: "normal" },
    },
  });

  // Footer
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(14);

  pdf.text(
    "Authorized Signature",
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
  let splitTitle = pdf.splitTextToSize(
    getSetting?.footerText,
    pdf.internal.pageSize.width - 15
  );
  pdf.text(splitTitle, 10, pdf.internal.pageSize.height - 7);

  let note = pdf.splitTextToSize(`Note: ${templateData?.note}`, 120);
  pdf.text(note, 10, pdf.internal.pageSize.height - 35);

  for (let i = 1; i <= pdf.internal.getNumberOfPages(); i++) {
    pdf.setPage(i);
    // Water nark
    pdf.setFontSize(200);
    pdf.saveGraphicsState();
    pdf.setGState(new pdf.GState({ opacity: 0.1 }));
    pdf.text(templateData?.waterMark, 50, 220, null, 45);
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

  pdf.setProperties({
    title: "Report view in PDF",
  });
  // Save the PDF

  if (print === true) {
    pdf.autoPrint();
    pdf.output("dataurlnewwindow");
  }

  view === true && pdf.output("dataurlnewwindow");
  save === true && pdf.save("invoice.pdf");
}

export default TemplateFour;
