import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode-generator";

class pdfScript {
  // Template one
  templateOne({ getSetting, templateData, print, view, save }) {
    const pdf = new jsPDF(
      getSetting?.pageOrientation,
      "mm",
      getSetting?.pageSize
    );

    pdf.setFont("inter", "normal");

    // Bg color
    pdf.setFillColor.apply(null, [
      getSetting?.bgColor.r,
      getSetting?.bgColor.g,
      getSetting?.bgColor.b,
    ]);
    pdf.rect(
      0,
      0,
      pdf.internal.pageSize.width,
      pdf.internal.pageSize.height,
      "F"
    );

    // Demo Text
    pdf.setTextColor(200);
    let text = "Template one";
    pdf.setFontSize(50);
    let textWidth = pdf.getTextWidth(text);
    let centerTextX = (pdf.internal.pageSize.width - textWidth) / 2;
    pdf.text(text, centerTextX, 60);
    pdf.setTextColor(0, 0, 0);

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
      27
    );
    pdf.text(`Writer: ${templateData?.invoiceWriter}`, rightPosition, 33);

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
      pdf.text(`A/C name:  ${templateData?.accountName}`, rightPosition, 60);
    templateData?.paymentMethod === "Bank" &&
      pdf.text(`Branch: ${templateData?.branchName}`, rightPosition, 66);
    pdf.setTextColor(255, 0, 0);
    templateData?.paymentMethod === "Bank"
      ? pdf.text(
          `Payment status: ${templateData?.due > 0 ? "Due" : "Paid"}`,
          rightPosition,
          72
        )
      : pdf.text(
          `Payment status: ${templateData?.due > 0 ? "Due" : "Paid"}`,
          rightPosition,
          54
        );
    pdf.setTextColor(0, 0, 0);

    // Table Item
    autoTable(pdf, {
      startY: 80,
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
    // Table Calculation
    autoTable(pdf, {
      tableWidth: 120,
      margin: { left: pdf.internal.pageSize.width - 134 },
      headStyles: {
        halign: "left",
        fillColor: [
          getSetting?.themeColor?.r,
          getSetting?.themeColor?.g,
          getSetting?.themeColor?.b,
        ],
      },
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
      headStyles: {
        europe: { halign: "right" },
        fillColor: [
          getSetting?.themeColor?.r,
          getSetting?.themeColor?.g,
          getSetting?.themeColor?.b,
        ],
      },
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
    pdf.text(
      "Authorized Signature",
      rightPosition,
      pdf.internal.pageSize.height - 23
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
    // Save the PDF

    print === true && pdf.autoPrint();
    view === true && pdf.output("dataurlnewwindow");
    save === true && pdf.save("invoice.pdf");

    // Convert the PDF to a data URL
    const pdfDataUri = pdf.output("datauristring");
    // Set the data URL in the state to trigger a re-render
    return pdfDataUri;
  }
  // Template two
  templateTwo({ getSetting, templateData, print, view, save }) {
    const pdf = new jsPDF(
      getSetting?.pageOrientation,
      "mm",
      getSetting?.pageSize
    );

    pdf.setFont("inter", "normal");

    // Bg color
    pdf.setFillColor.apply(null, [
      getSetting?.bgColor.r,
      getSetting?.bgColor.g,
      getSetting?.bgColor.b,
    ]);
    pdf.rect(
      0,
      0,
      pdf.internal.pageSize.width,
      pdf.internal.pageSize.height,
      "F"
    );

    // Demo Text
    pdf.setTextColor(200);
    let text = "Template Two";
    pdf.setFontSize(50);
    let textWidth = pdf.getTextWidth(text);
    let centerTextX = (pdf.internal.pageSize.width - textWidth) / 2;
    pdf.text(text, centerTextX, 60);
    pdf.setTextColor(0, 0, 0);

    // Bg image
    let imgWidth = 100; // Set the width of your image
    let imgHeight = 0; // Set the height of your image
    let centerImgX = (pdf.internal.pageSize.width - imgWidth) / 2;
    let centerImgY = (pdf.internal.pageSize.height - imgHeight) / 2;

    // Background image set
    getSetting?.bgImg?.length !== 0 &&
      pdf.addImage(
        getSetting?.bgImg,
        "JPEG",
        centerImgX,
        centerImgY,
        imgWidth,
        imgHeight
      );

    // Logo
    getSetting?.logo.length !== 0 &&
      pdf.addImage(getSetting?.logo, "JPEG", 15, 10, 0, 14);

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
        maxWidth = itemWidth;
      }
    });
    let rightPosition = pdf.internal.pageSize.width - maxWidth - 10;

    pdf.setFontSize(12);
    pdf.text(
      `Payment method: ${templateData?.paymentMethod}`,
      rightPosition,
      20
    );
    pdf.setFontSize(10);
    templateData?.paymentMethod === "Bank" &&
      pdf.text(`A/C no: ${templateData?.accountNumber}`, rightPosition, 26);
    templateData?.paymentMethod === "Bank" &&
      pdf.text(`A/C name:  ${templateData?.accountName}`, rightPosition, 31);
    templateData?.paymentMethod === "Bank" &&
      pdf.text(`Branch: ${templateData?.branchName}`, rightPosition, 36);
    pdf.setTextColor(255, 0, 0);
    templateData?.paymentMethod === "Bank"
      ? pdf.text(
          `Payment status: ${templateData?.due > 0 ? "Due" : "Paid"}`,
          rightPosition,
          41
        )
      : pdf.text(
          `Payment status: ${templateData?.due > 0 ? "Due" : "Paid"}`,
          rightPosition,
          54
        );

    // Invoice id
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
    pdf.text(`Invoice no: ${templateData?.invoiceID}`, 15, 35);
    pdf.text(
      `Date: ${templateData?.startDate.toISOString().slice(0, 10)}`,
      15,
      42
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
    pdf.setTextColor(255, 255, 255);
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
    pdf.rect(
      templateTwoRightStart + 15,
      52,
      templateTwoRightStart - 30,
      8,
      "F"
    );
    pdf.setTextColor(255, 255, 255);
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
    // Table Calculation
    autoTable(pdf, {
      tableWidth: 120,
      margin: { left: pdf.internal.pageSize.width - 134 },
      headStyles: {
        halign: "left",
        fillColor: [
          getSetting?.themeColor?.r,
          getSetting?.themeColor?.g,
          getSetting?.themeColor?.b,
        ],
      },
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
      headStyles: {
        europe: { halign: "right" },
        fillColor: [
          getSetting?.themeColor?.r,
          getSetting?.themeColor?.g,
          getSetting?.themeColor?.b,
        ],
      },
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
    let footerSingTextTemTwo = "Authorized Signature";
    let pageSizeTemTwo = pdf.internal.pageSize;
    let pageWidthTemTwo = pageSizeTemTwo.width;
    let textWidthTemTwo = pdf.getStringUnitWidth(footerSingTextTemTwo);
    let startXTemTwo =
      parseInt(pageWidthTemTwo) - parseInt(textWidthTemTwo) - 50;

    pdf.text(
      footerSingTextTemTwo,
      startXTemTwo,
      pdf.internal.pageSize.height - 23
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
        15,
        pdf.internal.pageSize.height - 75,
        qrWidth,
        qrHeight
      );

    let note = pdf.splitTextToSize(`Note: ${templateData?.note}`, 120);
    pdf.text(note, 10, pdf.internal.pageSize.height - 35);
    // Save the PDF

    view === true && pdf.output("dataurlnewwindow");
    // Convert the PDF to a data URL
    const pdfDataUri = pdf.output("datauristring");
    // Set the data URL in the state to trigger a re-render
    return pdfDataUri;
  }
}

let pdfScriptData = new pdfScript();

export default pdfScriptData;
