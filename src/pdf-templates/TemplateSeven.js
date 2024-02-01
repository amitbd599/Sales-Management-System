import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode-generator";

function TemplateSeven({ getSetting, templateData, print, view, save }) {
  const pdf = new jsPDF(
    getSetting?.pageOrientation,
    "mm",
    getSetting?.pageSize
  );

  pdf.setFont("inter", "normal");
  // Logo
  getSetting?.logo.length !== 0 &&
    pdf.addImage(getSetting?.logo, "JPEG", 15, 12, 0, 18);

  pdf.setFontSize(12);
  pdf.text(
    `Payment method: ${templateData?.paymentMethod}`,
    pdf.internal.pageSize.width - 15,
    20,
    {
      align: "right",
    }
  );
  pdf.setFontSize(10);
  templateData?.paymentMethod === "Bank" &&
    pdf.text(
      `A/C no: ${templateData?.accountNumber}`,
      pdf.internal.pageSize.width - 15,
      26,
      {
        align: "right",
      }
    );
  templateData?.paymentMethod === "Bank" &&
    pdf.text(
      `A/C name:  ${templateData?.accountName}`,
      pdf.internal.pageSize.width - 15,
      31,
      {
        align: "right",
      }
    );
  templateData?.paymentMethod === "Bank" &&
    pdf.text(
      `Branch: ${templateData?.branchName}`,
      pdf.internal.pageSize.width - 15,
      36,
      {
        align: "right",
      }
    );
  pdf.setTextColor(255, 0, 0);
  pdf.setFontSize(12);
  templateData?.paymentMethod === "Bank"
    ? pdf.text(
        `Payment status: ${templateData?.due > 0 ? "Due" : "Paid"}`,
        pdf.internal.pageSize.width - 15,
        43,
        {
          align: "right",
        }
      )
    : pdf.text(
        `Payment status: ${templateData?.due > 0 ? "Due" : "Paid"}`,
        pdf.internal.pageSize.width - 15,
        56,
        {
          align: "right",
        }
      );

  // Invoice id
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(12);
  pdf.text(`Invoice no: # ${templateData?.invoiceID}`, 15, 36);
  pdf.setFontSize(10);
  pdf.text(
    `Submit date: ${templateData?.startDate.toISOString().slice(0, 10)}`,
    15,
    41
  );
  pdf.text(
    `Delivery date: ${templateData?.deliveryDate.toISOString().slice(0, 10)}`,
    15,
    46
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
  pdf.text("Bill Form", 20, 57);
  pdf.setTextColor(0, 0, 0);
  // company_name
  pdf.setFontSize(14);
  pdf.setFont("inter", "bold");
  pdf.text(`${getSetting?.company_name}`, 20, 68);
  pdf.setFont("inter", "normal");
  pdf.setFontSize(10);
  pdf.text(`${getSetting?.company_address}`, 20, 73);
  pdf.text(`${getSetting?.email}, ${getSetting?.mobile}`, 20, 78);
  pdf.text(`${getSetting?.website}`, 20, 83);

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
  pdf.text("Bill To", templateTwoRightStart + 20, 57);
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(14);
  pdf.setFont("inter", "bold");
  pdf.text(templateData?.customerName, templateTwoRightStart + 20, 68);
  pdf.setFontSize(10);
  pdf.setFont("inter", "normal");
  pdf.text(templateData?.address, templateTwoRightStart + 20, 73);
  pdf.text(`Phone: ${templateData?.phone}`, templateTwoRightStart + 20, 78);
  pdf.text(`Email: ${templateData?.email}`, templateTwoRightStart + 20, 83);

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
    theme: "plain",
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
  pdf.setFontSize(12);
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
  let splitTitle = pdf.splitTextToSize(getSetting?.footerText, 180);
  pdf.text(splitTitle, 10, pdf.internal.pageSize.height - 7);

  // Your QR code content
  const qrCodeContent = "Please add your information";
  const typeNumber = 0;
  const errorCorrectionLevel = "L";
  const qr = QRCode(typeNumber, errorCorrectionLevel);
  qr.addData(qrCodeContent);
  qr.make();
  const qrCodeImageUri = qr.createDataURL();
  let qrWidth = 30; // Set the width of your image
  let qrHeight = 30; // Set the height of your image
  getSetting?.qrCode === "yes" &&
    pdf.addImage(
      qrCodeImageUri,
      "PNG",
      12,
      pdf.internal.pageSize.height - 68,
      qrWidth,
      qrHeight
    );

  let note = pdf.splitTextToSize(`Note: ${templateData?.note}`, 120);
  pdf.text(note, 15, pdf.internal.pageSize.height - 35);

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

export default TemplateSeven;
