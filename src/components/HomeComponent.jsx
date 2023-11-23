import React, { useEffect, useRef, useState } from "react";
import {
  FaDownload,
  FaMagnifyingGlass,
  FaPrint,
  FaRegTrashCan,
} from "react-icons/fa6";

import DatePicker from "react-datepicker";
import { ErrorToast, IsEmpty, SuccessToast } from "../helper/helper";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import TemplateOne from "../childComponents/TemplateOne";

const HomeComponent = () => {
  const navigate = useNavigate();
  let getSetting = JSON.parse(localStorage.getItem("setting"));
  let getInvoices = JSON.parse(localStorage.getItem("invoices"));
  const [startDate, setStartDate] = useState(new Date());
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [invoiceID, setInvoiceID] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [invoiceWriter, setInvoiceWriter] = useState(getSetting?.invoiceWriter);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [discount, setDiscount] = useState(getSetting?.discount);
  const [shipping, setShipping] = useState(getSetting?.shipping);

  useEffect(() => {
    generateRandomNumber();
  }, []);

  const handleAddItem = () => {
    setInvoiceItems([...invoiceItems, { item: "", quantity: 0, rate: 0 }]);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...invoiceItems];
    updatedItems.splice(index, 1);
    setInvoiceItems(updatedItems);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...invoiceItems];
    updatedItems[index][field] = value;
    setInvoiceItems(updatedItems);
  };

  const calculateSubtotal = () => {
    return invoiceItems.reduce(
      (total, item) => total + item.quantity * item.rate,
      0
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return (
      subtotal +
      getSetting?.tax +
      getSetting?.vat +
      getSetting?.shipping -
      discount
    );
  };

  const generateRandomNumber = () => {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const random = Math.floor(Math.random() * 100) + 1;
    setInvoiceID(`${timestamp}${random}`);
  };

  let tax = getSetting?.tax;
  let vat = getSetting?.vat;
  let selectedTemplate = getSetting?.selectedTemplate;
  let subTotal = calculateSubtotal();
  let total = calculateTotal();

  let templateData = {
    invoiceID,
    customerName,
    phone,
    email,
    address,
    invoiceWriter,
    invoiceItems,
    subTotal,
    total,
    discount,
    shipping,
    startDate,
    deliveryDate,
    note,
    tax,
    vat,
    selectedTemplate,
  };

  const saveInvoice = () => {
    if (IsEmpty(invoiceID)) {
      ErrorToast("Invoice is empty");
    } else if (IsEmpty(customerName)) {
      ErrorToast("Customer Name is empty");
    } else if (IsEmpty(address)) {
      ErrorToast("Address is empty");
    } else if (IsEmpty(invoiceWriter)) {
      ErrorToast("Invoice Writer is empty");
    } else {
      let data = {
        invoiceID,
        customerName,
        phone,
        email,
        address,
        invoiceWriter,
        invoiceItems,
        subTotal,
        total,
        discount,
        shipping,
        startDate,
        deliveryDate,
        note,
        tax,
        vat,
        selectedTemplate,
      };

      localStorage.setItem("invoices", JSON.stringify([...getInvoices, data]));
      console.log(data);
      SuccessToast("Success");
      navigate("/all-invoice");
    }
  };

  const handleConvertToPDF = () => {
    // Get the HTML content that you want to convert
    const content = document.getElementById("content-to-convert");

    var opt = {
      margin: 5,
      filename: "myfile.pdf",
      image: { type: "png", quality: 1 },
      html2canvas: { scale: 2 },

      pagebreak: {
        before: ".beforeClass",
        after: ["#after1", "#after2"],
        avoid: "img",
      },

      jsPDF: {
        orientation: "p",
        unit: "mm",
        format: "a4",
        putOnlyUsedFonts: true,
        floatPrecision: 16,
      },
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(content).save();
  };

  return (
    <>
      <section className="p-[16px] ">
        <div>
          <div className="grid grid-cols-12 gap-[20px]">
            <div className="col-span-9 bg-white rounded-md p-[20px]">
              <div className="grid gap-[20px]">
                <div className="grid grid-cols-12 gap-[20px]">
                  <div className="col-span-3">
                    <div className="grid gap-1">
                      <label htmlFor="invoice">Invoice no:</label>
                      {getSetting?.invoiceType === "random" ? (
                        <input
                          value={invoiceID}
                          type="text"
                          className="input_box"
                          disabled
                        />
                      ) : (
                        <input
                          onChange={(e) => setInvoiceID(e.target.value)}
                          type="text"
                          className="input_box"
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="grid gap-1">
                      <label htmlFor="invoice_date">Invoice date:</label>

                      <span className="input_box">
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          className="focus-visible:outline-none w-full block"
                        />
                      </span>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="grid gap-1">
                      <label htmlFor="delivery_date">Delivery date:</label>
                      <span className="input_box">
                        <DatePicker
                          selected={deliveryDate}
                          onChange={(date) => setDeliveryDate(date)}
                          className="focus-visible:outline-none w-full block"
                        />
                      </span>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="grid gap-1">
                      <label htmlFor="invoice">Invoice writer name:</label>
                      <input
                        defaultValue={invoiceWriter}
                        onChange={(e) => setInvoiceWriter(e.target.value)}
                        type="text"
                        className="input_box"
                      />
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="grid gap-1">
                      <label htmlFor="invoice">Customer name:</label>
                      <input
                        onChange={(e) => setCustomerName(e.target.value)}
                        type="text"
                        className="input_box"
                      />
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="grid gap-1">
                      <label htmlFor="invoice">Customer Address:</label>
                      <input
                        onChange={(e) => setAddress(e.target.value)}
                        type="text"
                        className="input_box"
                      />
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="grid gap-1">
                      <label htmlFor="invoice">Customer Phone no:</label>
                      <input
                        onChange={(e) => setPhone(e.target.value)}
                        type="text"
                        className="input_box"
                      />
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="grid gap-1">
                      <label htmlFor="invoice">Customer email:</label>
                      <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        className="input_box"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-[20px]">
                  <div className="w-full">
                    {/* Table */}
                    <div className="w-full  mx-auto bg-white  rounded-sm border border-gray-200">
                      <div className="px-5 py-4 border-b border-gray-50">
                        <h3 className="font-semibold">Item table</h3>
                      </div>
                      <div className="p-3">
                        <div className="overflow-x-auto">
                          <table className=" w-full">
                            <thead className="text-xs font-semibold uppercase rounded-md text-purple-600 bg-purple-50">
                              <tr>
                                <th className="p-2 ">
                                  <div className="font-semibold text-left">
                                    Item
                                  </div>
                                </th>
                                <th className="p-2 ">
                                  <div className="font-semibold text-left">
                                    Quantity
                                  </div>
                                </th>
                                <th className="p-2 ">
                                  <div className="font-semibold text-left">
                                    Rate ({getSetting?.currency})
                                  </div>
                                </th>
                                <th className="p-2 ">
                                  <div className="font-semibold text-left">
                                    Amount
                                  </div>
                                </th>
                                <th className="p-2 ">
                                  <div className="font-semibold text-left">
                                    Action
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <div className="p-1"></div>
                            <tbody className="text-sm  ">
                              {invoiceItems.map((item, index) => (
                                <tr>
                                  <td className="py-2 pr-2">
                                    <input
                                      type="text"
                                      value={item.item}
                                      placeholder="Item"
                                      onChange={(e) =>
                                        handleItemChange(
                                          index,
                                          "item",
                                          e.target.value
                                        )
                                      }
                                      className="input_box "
                                    />
                                  </td>
                                  <td className="py-2 pr-2 w-[100px]">
                                    <input
                                      type="number"
                                      value={item.quantity}
                                      placeholder="Quantity"
                                      onChange={(e) =>
                                        handleItemChange(
                                          index,
                                          "quantity",
                                          parseInt(e.target.value, 10)
                                        )
                                      }
                                      className="input_box w-full"
                                    />
                                  </td>
                                  <td className="py-2 pr-2 w-[100px]">
                                    <input
                                      type="number"
                                      value={item.rate}
                                      placeholder="Rate"
                                      onChange={(e) =>
                                        handleItemChange(
                                          index,
                                          "rate",
                                          parseFloat(e.target.value)
                                        )
                                      }
                                      className="input_box w-full"
                                    />
                                  </td>
                                  <td className="py-2 pr-2 w-[100px]">
                                    <span>{item.quantity * item.rate}</span>
                                  </td>
                                  <td className="py-2 pr-2 w-[100px]">
                                    <button className="flex justify-center w-full">
                                      <FaRegTrashCan
                                        className="text-red-600 text-[18px]"
                                        onClick={() => handleDeleteItem(index)}
                                      />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="mt-2">
                          <button
                            className="px-[20px] py-[8px] rounded-md bg-purple-500 text-white"
                            onClick={handleAddItem}
                          >
                            Add item
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-[20px]">
                  <div className="w-full">
                    <div className="grid gap-1">
                      <label htmlFor="invoice">Note:</label>
                      <textarea
                        onChange={(e) => setNote(e.target.value)}
                        name=""
                        id=""
                        cols="30"
                        rows="6"
                        className="input_box"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-3  ">
              <div className="bg-white rounded-md py-[40px] px-[20px]">
                <h2 className="font-semibold border-b border-gray-200 pb-2">
                  Calculation flow:
                </h2>
                <div className="mt-[20px] grid gap-[16px]">
                  <p className="flex justify-between">
                    Subtotal:{" "}
                    <span className="pl-3">{calculateSubtotal()}</span>
                  </p>
                  {getSetting?.tax !== 0 && (
                    <p className="flex justify-between">
                      Tax: <span className="pl-3">+ {getSetting?.tax}</span>
                    </p>
                  )}
                  {getSetting?.vat !== 0 && (
                    <p className="flex justify-between">
                      Vat: <span className="pl-3">+ {getSetting?.vat}</span>
                    </p>
                  )}

                  <div className="border-b border-gray-200 pb-3 flex gap-2 items-center justify-between">
                    <p>Shipping:</p>
                    <span>
                      {" "}
                      +
                      <input
                        className="input_box inline w-[60px] text-right ml-2"
                        defaultValue={shipping}
                        type="number"
                        onChange={(e) =>
                          setShipping(parseFloat(e.target.value))
                        }
                      />
                    </span>
                  </div>

                  <div className=" flex gap-2 items-center justify-between ">
                    <p>Discount:</p>
                    <span>
                      -
                      <input
                        className="input_box inline w-[60px] text-right ml-2"
                        defaultValue={discount}
                        type="number"
                        onChange={(e) =>
                          setDiscount(parseFloat(e.target.value))
                        }
                      />
                    </span>
                  </div>

                  <p className="font-semibold flex justify-between">
                    Total: <span className="pl-8">{calculateTotal()}</span>
                  </p>
                </div>
                <div>
                  <div className="w-full mt-[30px]">
                    <button
                      onClick={saveInvoice}
                      className="px-[20px] w-full py-[8px] rounded-md bg-purple-500 text-white"
                    >
                      Save Invoice
                    </button>
                  </div>
                  <p className="flex justify-center py-5">or</p>
                  <div className="flex gap-[20px] py-[2px] justify-around border border-purple-500 rounded-md">
                    <button
                      onClick={handleConvertToPDF}
                      className="px-[20px] flex justify-center items-center gap-3 py-[8px]   text-purple"
                    >
                      <FaDownload className="text-[20px] hover:text-purple-500 transition-all duration-200" />
                    </button>
                    <button className="px-[20px] flex justify-center items-center gap-3 py-[8px]   text-purple">
                      <FaMagnifyingGlass className="text-[20px] hover:text-purple-500 transition-all duration-200" />
                    </button>
                    <button className="px-[20px] flex justify-center items-center gap-3 py-[8px]   text-purple">
                      <FaPrint className="text-[20px] hover:text-purple-500 transition-all duration-200" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Real time view invoice */}
      <section className="p-[16px]">
        <div className="grid gap-[20px] grid-cols-12">
          <div className="col-span-9">
            <div className="bg-white rounded-md p-[20px]">
              <TemplateOne templateData={templateData} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeComponent;
