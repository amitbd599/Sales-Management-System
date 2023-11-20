import React, { useEffect } from "react";

const InitLoadingData = () => {
  let getSetting = localStorage.getItem("setting");

  useEffect(() => {
    let setting = {
      bgColor: "#fff",
      bgImg: "",
      company_address: "",
      company_name: "",
      currency: "",
      discount: 0,
      email: "",
      fax: "",
      footerText: "",
      invoiceType: "",
      invoiceWriter: "",
      logo: "",
      mobile: "",
      pageOrientation: "",
      pageSize: "",
      phone: "",
      qrCode: "",
      shipping: 0,
      selectedTemplate: 1,
      tax: 0,
      vat: 0,
      website: "",
      waterMark: "",
    };

    if (!!getSetting === false) {
      localStorage.setItem("setting", JSON.stringify(setting));
    }
  }, []);
  return <></>;
};

export default InitLoadingData;
