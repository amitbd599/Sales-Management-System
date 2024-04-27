import React, { useEffect, useRef, useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import { currencyData } from "../script/currency";
import { ChromePicker } from "react-color";
import { page_size } from "../script/page_size";
import { taxation_data } from "../script/taxation";
import {
  ErrorToast,
  SuccessToast,
  fixNumber,
  getBase64,
  toNumber,
} from "../helper/helper";
import { FaXmark } from "react-icons/fa6";
import {
  setting__get__Request__API,
  setting__update__Request__API,
} from "../api/Api";
import Loading from "./Loading";
const SettingComponent = () => {
  let [loading, setLoading] = useState(false);
  let [getSetting, getSetSetting] = useState([]);
  let [logo, setLogo] = useState("");
  let [bgImg, setBgImg] = useState("");
  let [currency, setCurrency] = useState("");
  let [taxationName, setTaxationName] = useState("");
  let [invoiceType, setInvoiceType] = useState("");
  let [qrCode, setQrCode] = useState("");
  let [pageSize, setPageSize] = useState("");
  let [pageOrientation, setPageOrientation] = useState("");

  let [selectedTemplate, setTemplateImage] = useState("");
  let [themeColor, setThemeColor] = useState([]);
  let [themeTextColor, setThemeTextColor] = useState([]);
  useEffect(() => {
    setting__get__Request__API().then((result) => {
      if (result.status === "success") {
        let response = result["data"];
        getSetSetting(response);
        setLogo(response?.logo);
        setBgImg(response?.bgImg);
        setCurrency(response?.currency);
        setTaxationName(response?.taxationName);
        setInvoiceType(response?.invoiceType);
        setQrCode(response?.qrCode);
        setPageSize(response?.pageSize);
        setPageOrientation(response?.pageOrientation);
        setTemplateImage(response?.selectedTemplate);
        setThemeColor(response?.themeColor[0]);
        setThemeTextColor(response?.themeTextColor[0]);
      }
    });
  }, []);

  let handleThemeColorChange = (newColor) => {
    setThemeColor(newColor.rgb);
  };
  let handleThemeTextColorChange = (newColor) => {
    setThemeTextColor(newColor.rgb);
  };

  const logoHandel = (event) => {
    const file = event.target.files[0];
    if (file.size > 50 * 1024) {
      ErrorToast("File size exceeds 50KB.");
    } else if (file && file.type !== "image/png") {
      ErrorToast("Please select a valid PNG file.");
      event.target.value = null;
    } else {
      getBase64(event.target.files[0]).then((base64Img) => {
        setLogo(base64Img);
      });
    }
  };
  const bgHandel = (event) => {
    const file = event.target.files[0];
    if (file.size > 100 * 1024) {
      ErrorToast("File size exceeds 100KB.");
    } else if (file && file.type !== "image/png") {
      ErrorToast("Please select a valid PNG file.");
      event.target.value = null;
    } else {
      getBase64(event.target.files[0]).then((base64Img) => {
        setBgImg(base64Img);
      });
    }
  };

  const templates = [
    { id: 1, src: "/image/1.png" },
    { id: 2, src: "/image/2.png" },
    { id: 3, src: "/image/3.png" },
    { id: 4, src: "/image/4.png" },
    { id: 5, src: "/image/5.png" },
    { id: 6, src: "/image/6.png" },
    { id: 7, src: "/image/7.png" },
    { id: 8, src: "/image/8.png" },
  ];

  const handleImageClick = (imageId) => {
    setTemplateImage(imageId);
  };

  let company_nameRef,
    company_addressRef,
    mobileRef,
    phoneRef,
    faxRef,
    emailRef,
    websiteRef,
    discountRef,
    taxationRef,
    shippingRef,
    footerTextRef,
    invoiceWriterRef = useRef();

  const saveData = () => {
    setLoading(true);
    let company_name = company_nameRef.value;
    let company_address = company_addressRef.value;
    let mobile = mobileRef.value;
    let phone = phoneRef.value;
    let fax = faxRef.value;
    let footerText = footerTextRef.value;
    let email = emailRef.value;
    let website = websiteRef.value;
    let invoiceWriter = invoiceWriterRef.value;
    let taxation = fixNumber(toNumber(taxationRef.value));
    let discount = fixNumber(toNumber(discountRef.value));
    let shipping = fixNumber(toNumber(shippingRef.value));

    let setting = {
      themeColor,
      themeTextColor,
      bgImg,
      company_address,
      company_name,
      currency,
      discount,
      taxation,
      taxationName,
      email,
      fax,
      footerText,
      invoiceType,
      invoiceWriter,
      logo,
      mobile,
      pageOrientation,
      pageSize,
      phone,
      qrCode,
      shipping,
      selectedTemplate,
      website,
    };

    setting__update__Request__API(setting).then((result) => {
      if (result === true) {
        setLoading(false);
      }
    });
  };

  return (
    <section>
      {loading === true && <Loading />}
      <div className="container py-[60px]">
        <div className="grid grid-cols-12 gap-[20px] ">
          <div className="col-span-12 md:col-span-9 p-[20px] bg-white rounded-md">
            <h2 className="font-semibold mb-3">Setting your company info:</h2>
            <div className="grid grid-cols-12 gap-[20px]">
              <div className="w-full col-span-12 md:col-span-6 lg:col-span-4">
                <div className="grid gap-1">
                  <label>Company name:</label>
                  <input
                    type="text"
                    className="input_box"
                    defaultValue={getSetting?.company_name}
                    ref={(input) => (company_nameRef = input)}
                  />
                </div>
              </div>
              <div className="w-full col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-8">
                <div className="grid gap-1">
                  <label>Address:</label>
                  <input
                    type="text"
                    className="input_box"
                    defaultValue={getSetting?.company_address}
                    ref={(input) => (company_addressRef = input)}
                  />
                </div>
              </div>
              <div className="w-full col-span-12 md:col-span-6 lg:col-span-4">
                <div className="grid gap-1">
                  <label>Mobile no:</label>
                  <input
                    type="text"
                    className="input_box"
                    defaultValue={getSetting?.mobile}
                    ref={(input) => (mobileRef = input)}
                  />
                </div>
              </div>
              <div className="w-full col-span-12 md:col-span-6 lg:col-span-4">
                <div className="grid gap-1">
                  <label>Phone no:</label>
                  <input
                    type="text"
                    className="input_box"
                    defaultValue={getSetting?.phone}
                    ref={(input) => (phoneRef = input)}
                  />
                </div>
              </div>
              <div className="w-full col-span-12 md:col-span-6 lg:col-span-4">
                <div className="grid gap-1">
                  <label>Fax no:</label>
                  <input
                    type="text"
                    className="input_box"
                    defaultValue={getSetting?.fax}
                    ref={(input) => (faxRef = input)}
                  />
                </div>
              </div>
              <div className="w-full col-span-12 md:col-span-6 lg:col-span-4">
                <div className="grid gap-1">
                  <label>Email:</label>
                  <input
                    type="text"
                    className="input_box"
                    defaultValue={getSetting?.email}
                    ref={(input) => (emailRef = input)}
                  />
                </div>
              </div>
              <div className="w-full col-span-12 md:col-span-6 lg:col-span-4">
                <div className="grid gap-1">
                  <label>Website:</label>
                  <input
                    type="text"
                    className="input_box"
                    defaultValue={getSetting?.website}
                    ref={(input) => (websiteRef = input)}
                  />
                </div>
              </div>
              <div className="w-full col-span-12 md:col-span-6 lg:col-span-4">
                <div className="grid gap-1">
                  <label>Currency:</label>
                  <div>
                    <Select
                      onChange={(event) => setCurrency(event)}
                      value={currency}
                      label="Select item"
                      animate={{
                        mount: { y: 0 },
                        unmount: { y: 25 },
                      }}
                    >
                      {currencyData.map((item, index) => (
                        <Option key={index} value={item?.symbol}>
                          {item?.country} ({item?.currency} - {item?.symbol})
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>
              <div className="w-full col-span-12 md:col-span-6 lg:col-span-4">
                <label>Taxable cost:</label>
                <div>
                  <Select
                    onChange={(event) => setTaxationName(event)}
                    value={getSetting?.taxationName}
                    label="Select item"
                    animate={{
                      mount: { y: 0 },
                      unmount: { y: 25 },
                    }}
                  >
                    {taxation_data.map((item, index) => (
                      <Option key={index} value={item?.name}>
                        {item?.name}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="w-full col-span-12 md:col-span-6 lg:col-span-4">
                <div className="grid gap-1">
                  <label>{taxationName} (%):</label>
                  <input
                    type="number"
                    className="input_box"
                    placeholder="0"
                    defaultValue={getSetting?.taxation}
                    ref={(input) => (taxationRef = input)}
                  />
                </div>
              </div>
              <div className="w-full col-span-12 md:col-span-6 lg:col-span-2">
                <div className="grid gap-1">
                  <label>Discounts:</label>
                  <span className="flex gap-2 justify-center items-center">
                    <input
                      type="number"
                      className="input_box"
                      placeholder="0"
                      defaultValue={getSetting?.discount}
                      ref={(input) => (discountRef = input)}
                    />
                  </span>
                </div>
              </div>
              <div className="w-full col-span-12 md:col-span-6 lg:col-span-2">
                <div className="grid gap-1">
                  <label>Shipping:</label>
                  <span className="flex gap-2 justify-center items-center">
                    <input
                      type="number"
                      className="input_box"
                      placeholder="0"
                      defaultValue={getSetting?.shipping}
                      ref={(input) => (shippingRef = input)}
                    />
                  </span>
                </div>
              </div>
              <div className="w-full col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                <div className="grid gap-1">
                  <label>Invoice No type:</label>
                  <div>
                    <Select
                      label="Select item"
                      onChange={(event) => setInvoiceType(event)}
                      value={getSetting?.invoiceType}
                      animate={{
                        mount: { y: 0 },
                        unmount: { y: 25 },
                      }}
                    >
                      <Option value="custom">Custom number</Option>
                      <Option value="random">Random input</Option>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="w-full col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                <div className="grid gap-1">
                  <label>QRCode:</label>
                  <div>
                    <Select
                      onChange={(event) => setQrCode(event)}
                      value={qrCode}
                      label="Select item"
                      animate={{
                        mount: { y: 0 },
                        unmount: { y: 25 },
                      }}
                    >
                      <Option value="yes">Yes</Option>
                      <Option value="no">No</Option>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="w-full col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                <div className="grid gap-1">
                  <label>Page Orientation:</label>
                  <div>
                    <Select
                      onChange={(event) => setPageOrientation(event)}
                      value={getSetting?.pageOrientation}
                      label="Select item"
                      animate={{
                        mount: { y: 0 },
                        unmount: { y: 25 },
                      }}
                    >
                      <Option value="l">Landscape</Option>
                      <Option value="p">Portrait</Option>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="w-full col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                <div className="grid gap-1">
                  <label>Page Size :</label>
                  <div>
                    <Select
                      onChange={(event) => setPageSize(event)}
                      value={getSetting?.pageSize}
                      label="Select item"
                      animate={{
                        mount: { y: 0 },
                        unmount: { y: 25 },
                      }}
                    >
                      {page_size.map((item, index) => (
                        <Option key={index} value={item?.size}>
                          {item?.size}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>
              <div className="w-full col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4">
                <div className="grid gap-1 ">
                  <label>Change theme color:</label>
                  <div className="pt-2">
                    <ChromePicker
                      color={themeColor}
                      onChange={handleThemeColorChange}
                      className="w-full"
                      circleSize={40}
                      circleSpacing={24}
                      // disableAlpha={true}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4">
                <div className="grid gap-1 ">
                  <label>Change theme text color:</label>
                  <div className="pt-2">
                    <ChromePicker
                      color={themeTextColor}
                      onChange={handleThemeTextColorChange}
                      className="w-full"
                      circleSize={40}
                      circleSpacing={24}
                      // disableAlpha={true}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full col-span-12 lg:col-span-4 xl:col-span-4">
                <div className="grid gap-[14px]">
                  <div className="grid gap-1">
                    <label>Invoice writer name:</label>
                    <div>
                      <input
                        type="text"
                        className="input_box"
                        defaultValue={getSetting?.invoiceWriter}
                        ref={(input) => (invoiceWriterRef = input)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-1">
                    <label>Footer text:</label>
                    <div>
                      <textarea
                        defaultValue={getSetting?.footerText}
                        ref={(input) => (footerTextRef = input)}
                        className="input_box"
                        name=""
                        id=""
                        cols="30"
                        rows="8"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-3  ">
            <div className="p-[20px] bg-white rounded-md">
              <div className="flex gap-[30px]">
                <div className="w-[300px] relative">
                  <h2 className="font-semibold pb-2">Upload logo</h2>
                  <label
                    htmlFor="logo"
                    className=" cursor-pointer flex w-full  max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-6 text-center "
                  >
                    <div>
                      {logo ? (
                        <div>
                          <img
                            src={logo}
                            alt="Selected"
                            className="w-[100px] rounded-xl"
                          />
                          logooooo
                        </div>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                      )}
                    </div>
                    <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">
                      Change logo
                    </h2>
                    <p className="mt-2 text-gray-500 tracking-wide">
                      Upload file PNG only.
                    </p>
                    <p className="text-red-500">Max 50kb</p>
                    <input
                      id="logo"
                      type="file"
                      className="hidden"
                      onChange={(event) => logoHandel(event)}
                    />
                  </label>
                  {logo && (
                    <div>
                      <FaXmark
                        onClick={() => setLogo("")}
                        className="absolute cursor-pointer right-[-22px] z-[999] top-[-10px] p-2 text-[50px] text-red-600"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-[30px] mt-[40px]">
                <div className="w-[300px] relative">
                  <h2 className="font-semibold pb-2">Background image</h2>
                  <label
                    htmlFor="bg"
                    className=" cursor-pointer flex w-full  max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-6 text-center"
                  >
                    <div>
                      {bgImg ? (
                        <div>
                          <img
                            src={bgImg}
                            alt="Selected"
                            className="w-[100px] rounded-xl"
                          />
                        </div>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                      )}
                    </div>
                    <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">
                      Change image
                    </h2>
                    <p className="mt-2 text-gray-500 tracking-wide">
                      Upload file PNG only.
                    </p>
                    <p className="text-red-500">Max 100kb</p>
                    <input
                      id="bg"
                      type="file"
                      className="hidden"
                      onChange={(event) => bgHandel(event)}
                    />
                  </label>
                  {bgImg && (
                    <div>
                      <FaXmark
                        onClick={() => setBgImg("")}
                        className="absolute cursor-pointer right-[-22px] z-[999] top-[-10px] p-2 text-[50px] text-red-600"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-5 hidden lg:block">
                <button
                  className="px-[20px] py-[8px] w-full rounded-md bg-purple-500 text-white"
                  onClick={saveData}
                >
                  Save global setting
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className=" pt-[30px]">
          <div className="grid grid-cols-12 gap-[20px]">
            <div className="col-span-12 md:col-span-9 bg-white p-[20px] rounded-md">
              <h2 className="font-semibold">Choose a template</h2>
              <div className="grid grid-cols-12 gap-4">
                {templates.map((item, index) => (
                  <div
                    key={index}
                    className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
                  >
                    <img
                      src={item?.src}
                      alt=""
                      className={`w-full border p-[10px] shadow-xl rounded-md  ${
                        selectedTemplate === item.id
                          ? "border-2 border-red-500"
                          : " border-gray-200"
                      }`}
                      onClick={() => handleImageClick(item.id)}
                      style={{
                        border:
                          selectedTemplate === item.id
                            ? "2px solid red"
                            : "none",
                        cursor: "pointer",
                        marginRight: "10px",
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-5 block lg:hidden">
                <button
                  className="px-[20px] py-[8px] w-full rounded-md bg-purple-500 text-white"
                  onClick={saveData}
                >
                  Save global setting
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SettingComponent;
