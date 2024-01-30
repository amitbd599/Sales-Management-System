import React, { useEffect } from "react";

const InitLoadingData = () => {
  let getSetting = localStorage.getItem("setting");
  let getInvoices = localStorage.getItem("invoices");

  useEffect(() => {
    let setting = {
      paperColor: {
        r: 254,
        g: 254,
        b: 254,
        a: 1,
      },
      themeColor: {
        r: 68,
        g: 68,
        b: 206,
        a: 1,
      },
      themeTextColor: {
        r: 68,
        g: 68,
        b: 206,
        a: 1,
      },
      bgImg: "",
      company_address: "4521 My Drive New York, NY 10004",
      company_name: "Paytalk com. ltd",
      currency: "$",
      discount: 0,
      email: "paytalk@armyspy.com",
      fax: "(123)-456-7890",
      footerText:
        "Paytalk.com is a vibrant and succinct 2-syllable domain name. This is a desirable character length, as it’s easy to remember and is more likely to rapidly become a household name. Furthermore, the 7 characters make it a memorable, punchy choice in the world of domain names.",
      invoiceType: "random",
      invoiceWriter: "Gladys D. Watson",
      logo: "",
      mobile: "281-895-5319",
      pageOrientation: "p",
      pageSize: "a4",
      phone: "201-526-6699",
      qrCode: "no",
      shipping: 0,
      selectedTemplate: 1,
      taxation: 0,
      taxationName: "Income Tax",
      website: "paytalk.com",
      waterMark: "Demo",
    };

    if (!!getSetting === false) {
      localStorage.setItem("setting", JSON.stringify(setting));
    }
    if (!!getInvoices === false) {
      localStorage.setItem("invoices", JSON.stringify([]));
    }
  }, []);
  return <></>;
};

export default InitLoadingData;
