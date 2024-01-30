import { useEffect } from "react";

const InitLoadData = () => {
  let getSetting = localStorage.getItem("setting");
  let getInvoices = localStorage.getItem("invoices");
  useEffect(() => {
    let setting = {
      themeColor: {
        r: 43,
        g: 43,
        b: 209,
        a: 1,
      },
      themeTextColor: {
        r: 167,
        g: 159,
        b: 213,
        a: 1,
      },
      paperColor: {
        r: 163,
        g: 150,
        b: 218,
        a: 1,
      },
      bgImg: "",
      company_address: "Laboriosam alias li",
      company_name: "Ipsum dolor dolor fu",
      currency: "$",
      discount: 73,
      taxation: 87,
      taxationName: "Income Tax",
      email: "Assumenda voluptatib",
      fax: "Ullam voluptas porro",
      footerText: "Consectetur sit il",
      invoiceType: "random",
      invoiceWriter: "Voluptate sed deseru",
      logo: "",
      mobile: "Ipsam sed ratione id",
      pageOrientation: "p",
      pageSize: "a4",
      phone: "Optio dolores in et",
      qrCode: "no",
      shipping: 66,
      selectedTemplate: 1,
      website: "Est occaecat laborum",
      waterMark: "Nihil magnam autem m",
    };

    if (!!getSetting === false) {
      localStorage.setItem("setting", JSON.stringify(setting));
    }
    if (!!getInvoices === false) {
      localStorage.setItem("invoices", JSON.stringify([]));
    }
  }, []);
  return null;
};

export default InitLoadData;
