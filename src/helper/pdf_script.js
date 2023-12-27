import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode-generator";

class pdfScript {
  //! Template one
  templateOne({ getSetting, templateData, print, view, save }) {
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
  //! Template two
  templateTwo({ getSetting, templateData, print, view, save }) {
    const pdf = new jsPDF(
      getSetting?.pageOrientation,
      "mm",
      getSetting?.pageSize
    );

    pdf.setFont("inter", "normal");
    // Logo
    getSetting?.logo.length !== 0 &&
      pdf.addImage(getSetting?.logo, "JPEG", 15, 12, 0, 18);

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
    pdf.setFontSize(12);
    templateData?.paymentMethod === "Bank"
      ? pdf.text(
        `Payment status: ${templateData?.due > 0 ? "Due" : "Paid"}`,
        rightPosition,
        43
      )
      : pdf.text(
        `Payment status: ${templateData?.due > 0 ? "Due" : "Paid"}`,
        rightPosition,
        56
      );

    // Invoice id
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
    pdf.text(`Invoice no: ${templateData?.invoiceID}`, 15, 40);
    pdf.text(
      `Date: ${templateData?.startDate.toISOString().slice(0, 10)}`,
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
        { header: `Rate(${templateData?.currency})`, dataKey: "rate" },
        { header: "Amount", dataKey: "amount" },
      ],
    });
    // Table Calculation
    let data = [
      ["Description", `Value(${templateData?.currency})`],
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
      tableWidth: 70,
      margin: { left: pdf.internal.pageSize.width - 84, bottom: 40 },
      head: [data[0]],
      body: data.slice(1),
      styles: styles,
      theme: 'plain',
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
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
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

    // Save the PDF

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

  //! Template three
  templateThree({ getSetting, templateData, print, view, save }) {
    const pdf = new jsPDF(
      getSetting?.pageOrientation,
      "mm",
      getSetting?.pageSize
    );

    pdf.setFont("inter", "normal");

    pdf.setTextColor(0, 0, 0);
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
        pdf.internal.pageSize.width - 40,
        12,
        qrWidth,
        qrHeight
      );

    pdf.setTextColor(0, 0, 0);
    pdf.setFont("inter", "normal");
    pdf.setFontSize(12);
    pdf.text(`${getSetting?.company_name}`, 15, 28);
    pdf.setFontSize(10);
    pdf.text(`${getSetting?.company_address}`, 15, 33);
    pdf.text(
      `${getSetting?.email}, ${getSetting?.mobile}, ${getSetting?.website}`,
      15,
      38
    );

    // Filled red square
    pdf.setDrawColor(0);
    pdf.setFillColor(
      getSetting?.themeColor?.r,
      getSetting?.themeColor?.g,
      getSetting?.themeColor?.b
    );
    pdf.rect(0, 50, 40, 8, "F");

    pdf.setFontSize(12);
    pdf.setTextColor(255, 255, 255);
    pdf.text("Invoice To", 15, 55);

    pdf.setFont("inter", "normal");
    pdf.setFontSize(20);
    pdf.setTextColor(0, 0, 0);
    pdf.text(templateData?.customerName, 15, 66);

    pdf.setFont("inter", "normal");
    pdf.setFontSize(10);
    pdf.text(templateData?.address, 15, 72);
    pdf.text(`Phone: ${templateData?.phone}`, 15, 77);
    pdf.text(`Email: ${templateData?.email}`, 15, 82);

    pdf.text(
      `INVOICE #  ${templateData?.invoiceID}`,
      pdf.internal.pageSize.width - 15,
      55,
      {
        align: "right",
      }
    );
    pdf.text(
      `Submit Date  ${templateData?.startDate.toISOString().slice(0, 10)}`,
      pdf.internal.pageSize.width - 15,
      60,
      {
        align: "right",
      }
    );
    pdf.text(
      `Delivery date  ${templateData?.deliveryDate.toISOString().slice(0, 10)}`,
      pdf.internal.pageSize.width - 15,
      65,
      {
        align: "right",
      }
    );

    templateData?.paymentMethod === "Bank" &&
      pdf.text(
        `A/C no: ${templateData?.accountNumber}`,
        pdf.internal.pageSize.width - 15,
        70,
        {
          align: "right",
        }
      );
    templateData?.paymentMethod === "Bank" &&
      pdf.text(
        `A/C name:  ${templateData?.accountName}`,
        pdf.internal.pageSize.width - 15,
        75,
        {
          align: "right",
        }
      );
    templateData?.paymentMethod === "Bank" &&
      pdf.text(
        `Branch: ${templateData?.branchName}`,
        pdf.internal.pageSize.width - 15,
        80,
        {
          align: "right",
        }
      );
    pdf.setTextColor(255, 0, 0);
    templateData?.paymentMethod === "Bank"
      ? pdf.text(
        `Payment status: ${templateData?.due > 0 ? "Due" : "Paid"}`,
        pdf.internal.pageSize.width - 15,
        85,
        {
          align: "right",
        }
      )
      : pdf.text(
        `Payment status: ${templateData?.due > 0 ? "Due" : "Paid"}`,
        pdf.internal.pageSize.width - 15,
        85,
        {
          align: "right",
        }
      );

    // Table Item
    autoTable(pdf, {
      startY: 90,
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
        { header: `Rate(${templateData?.currency})`, dataKey: "rate" },
        { header: "Amount", dataKey: "amount" },
      ],
    });
    // Table payment calculation
    let data = [
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
      tableWidth: 70,
      margin: { left: pdf.internal.pageSize.width - 84, bottom: 40 },
      body: data,
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



    // Save the PDF

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

  //Template four
  templateFour({ getSetting, templateData, print, view, save }) {
    const pdf = new jsPDF(
      getSetting?.pageOrientation,
      "mm",
      getSetting?.pageSize
    );

    pdf.setFont("inter", "normal");
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
    const qrCodeContent = "Please add your information";
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
    pdf.setTextColor(255, 255, 255);
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
    pdf.rect(
      templateTwoRightStart + 15,
      52,
      templateTwoRightStart - 30,
      8,
      "F"
    );
    pdf.setTextColor(255, 255, 255);
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
    // Table payment calculation

    // / Table Calculation
    let data = [
      ["Description", `Value(${templateData?.currency})`],
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
      tableWidth: 70,
      margin: { left: pdf.internal.pageSize.width - 84, bottom: 40 },
      head: [data[0]],
      body: data.slice(1),
      styles: styles,
      theme: 'plain',
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
    // Save the PDF

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

  //Template five
  templateFive({ getSetting, templateData, print, view, save }) {
    const pdf = new jsPDF(
      getSetting?.pageOrientation,
      "mm",
      getSetting?.pageSize
    );

    // shape set
    var pdfWidth = pdf.internal.pageSize.width;
    // Add the image to the PDF
    pdf.addImage("/image/shape/shape_2.png", "JPEG", pdfWidth - 200, 0, 200, 0);

    pdf.setFont("inter", "normal");
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
      pdf.addImage(getSetting?.logo, "JPEG", 15, 8, 0, 14);

    pdf.setDrawColor(0);
    pdf.setFillColor(0, 0, 0);
    pdf.rect(-10, 44, 400, 1, "F");

    pdf.setFontSize(40);
    pdf.setFont("inter", "bold");
    pdf.setTextColor(
      getSetting?.themeColor?.r,
      getSetting?.themeColor?.g,
      getSetting?.themeColor?.b
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
      `Submit Date  ${templateData?.startDate.toISOString().slice(0, 10)}`,
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
    pdf.setTextColor(255, 255, 255);
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
    pdf.rect(
      templateTwoRightStart + 15,
      52,
      templateTwoRightStart - 30,
      8,
      "F"
    );
    pdf.setTextColor(255, 255, 255);
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
    // Table payment calculation

    let data = [
      ["Description", "Value"],
      ["Subtotal", templateData?.subTotal],
      ["Tax(15%)", templateData?.tax],
      ["Vat", templateData?.vat],
      ["Shipping", templateData?.shipping],
      ["Discount", templateData?.discount],
      ["Total", templateData?.total],
      ["Payment", templateData?.payment],
      ["Due", templateData?.due],
    ];

    // Filter out elements where the second element is 0
    var filteredData = data.filter(function (item) {
      return (
        (item[1] !== 0 && item[0] === "Description") ||
        (item[1] !== null && item[0] === "Subtotal") ||
        (item[1] !== 0 && item[0] === "Tax(15%)") ||
        (item[1] !== 0 && item[0] === "Vat") ||
        (item[1] !== null && item[0] === "Shipping") ||
        (item[1] !== null && item[0] === "Discount") ||
        (item[1] !== null && item[0] === "Total") ||
        (item[1] !== null && item[0] === "Payment") ||
        (item[1] !== null && item[0] === "Due")
      );
    });

    var styles = {
      fontStyle: "bold",
      fontSize: 10,
      textColor: 0,
      halign: "center",
    };

    pdf.autoTable({
      tableWidth: 60,
      margin: { left: pdf.internal.pageSize.width - 74, bottom: 40 },
      head: [filteredData[0]],
      body: filteredData.slice(1),
      styles: styles,
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
    getSetting?.qrCode === "yes" &&
      pdf.addImage(
        qrCodeImageUri,
        "PNG",
        7,
        pdf.internal.pageSize.height - 58,
        qrWidth,
        qrHeight
      );

    let note = pdf.splitTextToSize(`Note: ${templateData?.note}`, 120);
    pdf.text(note, 10, pdf.internal.pageSize.height - 35);
    // Save the PDF

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
}

let pdfScriptData = new pdfScript();

export default pdfScriptData;
