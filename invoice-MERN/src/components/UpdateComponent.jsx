import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaRegFilePdf,
  FaPrint,
  FaRegTrashCan,
  FaDownload,
} from "react-icons/fa6";
import DatePicker from "react-datepicker";
import { ErrorToast, IsEmpty, fixNumber, toNumber } from "../helper/helper.js";
import { Option, Select, Tooltip } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";
import TemplateOne from "../pdf-templates/TemplateOne";
import TemplateTwo from "../pdf-templates/TemplateTwo";
import TemplateThree from "../pdf-templates/TemplateThree";
import TemplateFour from "../pdf-templates/TemplateFour";
import TemplateFive from "../pdf-templates/TemplateFive";
import TemplateSix from "../pdf-templates/TemplateSix";
import TemplateSeven from "../pdf-templates/TemplateSeven";
import TemplateEight from "../pdf-templates/TemplateEight";
import {
  invoice_read_single__get__Request__API,
  invoice_update__Request__API,
  setting__get__Request__API,
} from "../api/Api.js";

let UpdateComponent = () => {
  let location = useLocation();
  let navigate = useNavigate();
  let [getSetting, getSetSetting] = useState([]);
  let [startDate, setStartDate] = useState(new Date());
  let [deliveryDate, setDeliveryDate] = useState(new Date());
  let [invoiceID, setInvoiceID] = useState("");
  let [customerName, setCustomerName] = useState("");
  let [address, setAddress] = useState("");
  let [invoiceWriter, setInvoiceWriter] = useState("");
  let [phone, setPhone] = useState("");
  let [email, setEmail] = useState("");
  let [note, setNote] = useState("");
  let [paymentMethod, setPaymentMethod] = useState("");
  let [accountName, setAccountName] = useState("");
  let [accountNumber, setAccountNumber] = useState("");
  let [branchName, setBranchName] = useState("");
  let [invoiceItems, setInvoiceItems] = useState([]);
  let [payment, setPayment] = useState(0);
  let [taxation, setTaxation] = useState(0);
  let [taxationName, setTaxationName] = useState(0);
  let [taxationAmount, setTaxationAmount] = useState(0);
  let [discount, setDiscount] = useState(0);
  let [shipping, setShipping] = useState(0);
  let searchParams = new URLSearchParams(location.search);
  let id = searchParams.get("id");
  useEffect(() => {
    setting__get__Request__API().then((result) => {
      if (result.status === "success") {
        let response = result["data"];
        getSetSetting(response);
      }
    });

    invoice_read_single__get__Request__API(id).then((result) => {
      if (result.status === "success") {
        let filterData = result?.data;
        setStartDate(filterData?.startDate);
        setDeliveryDate(filterData?.deliveryDate);
        setInvoiceID(filterData?.invoiceID);
        setCustomerName(filterData?.customerName);
        setAddress(filterData?.address);
        setInvoiceWriter(filterData?.invoiceWriter);
        setPhone(filterData?.phone);
        setEmail(filterData?.email);
        setNote(filterData?.note);
        setPaymentMethod(filterData?.paymentMethod);
        setAccountName(filterData?.accountName);
        setAccountNumber(filterData?.accountNumber);
        setBranchName(filterData?.branchName);
        setInvoiceItems(filterData?.invoiceItems);
        setPayment(filterData?.payment);
        setTaxation(filterData?.taxation);
        setTaxationName(filterData?.taxationName);
        setTaxationAmount(filterData?.taxationAmount);
        setDiscount(filterData?.discount);
        setShipping(filterData?.shipping);
      }
    });
  }, []);

  let handleAddItem = () => {
    setInvoiceItems([
      ...invoiceItems,
      { item: "", quantity: 0, rate: 0, amount: 0 },
    ]);
  };

  let handleDeleteItem = (index) => {
    let updatedItems = [...invoiceItems];
    updatedItems.splice(index, 1);
    setInvoiceItems(updatedItems);
  };

  let handleItemChange = (index, field, value) => {
    let updatedItems = [...invoiceItems];
    updatedItems[index][field] = value;
    setInvoiceItems(updatedItems);
  };

  let calculateSubtotal = () => {
    return invoiceItems.reduce(
      (total, item) => total + item.quantity * item.rate,
      0
    );
  };

  let calculateTotal = () => {
    let subtotal = calculateSubtotal();
    let taxationCal = parseInt((subtotal * taxation) / 100);
    return subtotal + taxationCal + shipping - discount;
  };

  let calculateDue = () => {
    let total = calculateTotal();
    return total - payment;
  };

  let selectedTemplate = fixNumber(toNumber(getSetting?.selectedTemplate));

  let subTotal = calculateSubtotal();
  let total = calculateTotal();
  let due = calculateDue();
  let currency = getSetting?.currency;
  taxationAmount = parseInt((subTotal * taxation) / 100);

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
    due,
    payment,
    discount,
    shipping,
    startDate,
    deliveryDate,
    note,
    taxation,
    taxationName,
    taxationAmount,
    selectedTemplate,
    paymentMethod,
    accountName,
    accountNumber,
    branchName,
    currency,
  };

  let saveStorage = () => {
    invoice_update__Request__API(id, templateData).then((result) => {
      if (result) {
        navigate("/all-invoice");
      }
    });
  };

  let saveInvoice = (id) => {
    if (IsEmpty(invoiceID)) {
      ErrorToast("Invoice is empty");
    } else if (IsEmpty(customerName)) {
      ErrorToast("Customer Name is empty");
    } else if (IsEmpty(address)) {
      ErrorToast("Address is empty");
    } else if (IsEmpty(invoiceWriter)) {
      ErrorToast("Invoice Writer is empty");
    } else {
      saveStorage(id);
    }
  };
  let downloadPdf = async (id) => {
    if (IsEmpty(invoiceID)) {
      ErrorToast("Invoice is empty");
    } else if (IsEmpty(customerName)) {
      ErrorToast("Customer Name is empty");
    } else if (IsEmpty(address)) {
      ErrorToast("Address is empty");
    } else if (IsEmpty(invoiceWriter)) {
      ErrorToast("Invoice Writer is empty");
    } else if (getSetting?.selectedTemplate === 1) {
      TemplateOne({
        templateData,
        getSetting,
        save: true,
      });
      saveStorage(id);
    } else if (getSetting?.selectedTemplate === 2) {
      TemplateTwo({
        templateData,
        getSetting,
        save: true,
      });
      saveStorage(id);
    } else if (getSetting?.selectedTemplate === 3) {
      TemplateThree({
        templateData,
        getSetting,
        save: true,
      });
      saveStorage(id);
    } else if (getSetting?.selectedTemplate === 4) {
      TemplateFour({
        templateData,
        getSetting,
        save: true,
      });
      saveStorage(id);
    } else if (getSetting?.selectedTemplate === 5) {
      TemplateFive({
        templateData,
        getSetting,
        save: true,
      });
      saveStorage(id);
    } else if (getSetting?.selectedTemplate === 6) {
      TemplateSix({
        templateData,
        getSetting,
        save: true,
      });
      saveStorage(id);
    } else if (getSetting?.selectedTemplate === 7) {
      TemplateSeven({
        templateData,
        getSetting,
        save: true,
      });
      saveStorage(id);
    } else if (getSetting?.selectedTemplate === 8) {
      TemplateEight({
        templateData,
        getSetting,
        save: true,
      });
      saveStorage(id);
    }
  };
  let viewPdf = async () => {
    if (getSetting?.selectedTemplate === 1) {
      TemplateOne({
        templateData,
        getSetting,
        view: true,
      });
    } else if (getSetting?.selectedTemplate === 2) {
      TemplateTwo({
        templateData,
        getSetting,
        view: true,
      });
    } else if (getSetting?.selectedTemplate === 3) {
      TemplateThree({
        templateData,
        getSetting,
        view: true,
      });
    } else if (getSetting?.selectedTemplate === 4) {
      TemplateFour({
        templateData,
        getSetting,
        view: true,
      });
    } else if (getSetting?.selectedTemplate === 5) {
      TemplateFive({
        templateData,
        getSetting,
        view: true,
      });
    } else if (getSetting?.selectedTemplate === 6) {
      TemplateSix({
        templateData,
        getSetting,
        view: true,
      });
    } else if (getSetting?.selectedTemplate === 7) {
      TemplateSeven({
        templateData,
        getSetting,
        view: true,
      });
    } else if (getSetting?.selectedTemplate === 8) {
      TemplateEight({
        templateData,
        getSetting,
        view: true,
      });
    }
  };
  let printPdf = async (id) => {
    if (IsEmpty(invoiceID)) {
      ErrorToast("Invoice is empty");
    } else if (IsEmpty(customerName)) {
      ErrorToast("Customer Name is empty");
    } else if (IsEmpty(address)) {
      ErrorToast("Address is empty");
    } else if (IsEmpty(invoiceWriter)) {
      ErrorToast("Invoice Writer is empty");
    } else if (getSetting?.selectedTemplate === 1) {
      TemplateOne({
        templateData,
        getSetting,
        print: true,
      });
      saveStorage(id);
    } else if (getSetting?.selectedTemplate === 2) {
      TemplateTwo({
        templateData,
        getSetting,
        print: true,
      });
      saveStorage(id);
    } else if (getSetting?.selectedTemplate === 3) {
      TemplateThree({
        templateData,
        getSetting,
        save: true,
      });
      saveStorage(id);
    } else if (getSetting?.selectedTemplate === 4) {
      TemplateFour({
        templateData,
        getSetting,
        save: true,
      });
      saveStorage(id);
    } else if (getSetting?.selectedTemplate === 5) {
      TemplateFive({
        templateData,
        getSetting,
        save: true,
      });
      saveStorage(id);
    } else if (getSetting?.selectedTemplate === 6) {
      TemplateSix({
        templateData,
        getSetting,
        save: true,
      });
      saveStorage(id);
    } else if (getSetting?.selectedTemplate === 7) {
      TemplateSeven({
        templateData,
        getSetting,
        save: true,
      });
      saveStorage(id);
    } else if (getSetting?.selectedTemplate === 8) {
      TemplateEight({
        templateData,
        getSetting,
        save: true,
      });
      saveStorage(id);
    }
  };

  return (
    <>
      <section className="container mx-auto py-[80px]">
        <div>
          <div className="grid grid-cols-12 gap-[20px]">
            <div className="col-span-12 xl:col-span-9 bg-white shadow-lg rounded-md p-[26px]">
              <h2 className="pb-4 text-[20px] text-gray-900 font-semibold">
                Update Invoice:
              </h2>
              <div>
                <div className="grid grid-cols-12 gap-[20px]">
                  <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                    <div className="grid gap-1">
                      <label htmlFor="invoice">Invoice no:</label>

                      <input
                        value={invoiceID}
                        type="text"
                        className="input_box"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-2">
                    <div className="grid gap-1">
                      <label htmlFor="invoice_date">Invoice date:</label>

                      <span className="input_box">
                        <DatePicker
                          selected={new Date(startDate)}
                          onChange={(date) => setStartDate(date)}
                          className="focus-visible:outline-none w-full block bg-transparent text-gray-800"
                        />
                      </span>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-2">
                    <div className="grid gap-1">
                      <label htmlFor="delivery_date">Delivery date:</label>
                      <span className="input_box">
                        <DatePicker
                          selected={new Date(deliveryDate)}
                          onChange={(date) => setDeliveryDate(date)}
                          className="focus-visible:outline-none w-full block bg-transparent text-gray-800"
                        />
                      </span>
                    </div>
                  </div>

                  <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-5">
                    <div className="grid gap-1">
                      <label htmlFor="invoice">Invoice writer name:</label>
                      <input
                        value={invoiceWriter}
                        onChange={(e) => setInvoiceWriter(e.target.value)}
                        type="text"
                        className="input_box"
                      />
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                    <div className="grid gap-1">
                      <label htmlFor="invoice">Customer name:</label>
                      <input
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        type="text"
                        className="input_box"
                      />
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                    <div className="grid gap-1">
                      <label htmlFor="invoice">Customer Address:</label>
                      <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        type="text"
                        className="input_box"
                      />
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                    <div className="grid gap-1">
                      <label htmlFor="invoice">Customer Phone no:</label>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="text"
                        className="input_box"
                      />
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                    <div className="grid gap-1">
                      <label htmlFor="invoice">Customer email:</label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        className="input_box"
                      />
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                    <div className="grid gap-1">
                      <label>Payment method:</label>
                      <div>
                        <Select
                          onChange={(event) => setPaymentMethod(event)}
                          value={paymentMethod}
                          label="Select item"
                          color="light-blue"
                          className="text-gray-800"
                          animate={{
                            mount: { y: 0 },
                            unmount: { y: 25 },
                          }}
                        >
                          <Option value="Bank">Bank</Option>
                          <Option value="Cash">Cash</Option>
                        </Select>
                      </div>
                    </div>
                  </div>
                  {paymentMethod === "Bank" && (
                    <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                      <div className="grid gap-1">
                        <label htmlFor="invoice">Account Name:</label>
                        <input
                          value={accountName}
                          onChange={(e) => setAccountName(e.target.value)}
                          type="text"
                          className="input_box"
                        />
                      </div>
                    </div>
                  )}
                  {paymentMethod === "Bank" && (
                    <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                      <div className="grid gap-1">
                        <label htmlFor="invoice">Account number:</label>
                        <input
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value)}
                          type="text"
                          className="input_box"
                        />
                      </div>
                    </div>
                  )}
                  {paymentMethod === "Bank" && (
                    <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                      <div className="grid gap-1">
                        <label htmlFor="invoice">Branch name:</label>
                        <input
                          value={branchName}
                          onChange={(e) => setBranchName(e.target.value)}
                          type="text"
                          className="input_box"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-[20px] mt-[40px]">
                  <div className="w-full">
                    {/* Table */}
                    <div className="w-full  mx-auto bg-white  rounded-sm border border-gray-200">
                      <div className="px-5 py-4 border-b border-gray-50">
                        <h3 className="font-semibold">Item table</h3>
                      </div>
                      <div className="p-3">
                        <div className="overflow-x-auto">
                          <table className=" w-full">
                            <thead className="text-xs font-semibold uppercase rounded-md text-gray-800 bg-gray-100">
                              <tr>
                                <th className="p-2 min-w-[500px]">
                                  <span className="font-semibold text-left">
                                    Item
                                  </span>
                                </th>
                                <th className="p-2 min-w-[60px]">
                                  <span className="font-semibold text-center">
                                    Quantity
                                  </span>
                                </th>
                                <th className="p-2 min-w-[100px]">
                                  <span className="font-semibold text-center">
                                    Rate ({getSetting?.currency})
                                  </span>
                                </th>
                                <th className="p-2 min-w-[60px]">
                                  <span className="font-semibold text-center">
                                    Amount
                                  </span>
                                </th>
                                <th className="p-2 min-w-[60px]">
                                  <span className="font-semibold text-center">
                                    Action
                                  </span>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="text-sm  ">
                              {invoiceItems.map((item, index) => (
                                <tr key={index}>
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
                                      className="input_box  min-w-[500px]"
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
                                          fixNumber(toNumber(e.target.value))
                                        )
                                      }
                                      className="input_box w-full text-center min-w-[60px]"
                                    />
                                  </td>
                                  <td className="py-2 pr-2 w-[100px] ">
                                    <input
                                      type="number"
                                      value={item.rate}
                                      placeholder="Rate"
                                      onChange={(e) => {
                                        handleItemChange(
                                          index,
                                          "rate",
                                          fixNumber(toNumber(e.target.value))
                                        );
                                        handleItemChange(
                                          index,
                                          "amount",
                                          fixNumber(
                                            toNumber(item.quantity * item.rate)
                                          )
                                        );
                                      }}
                                      className="input_box w-full text-center min-w-[60px]"
                                    />
                                  </td>
                                  <td className="py-2 pr-2 w-[100px] text-center">
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
                        <div className="mt-3">
                          <button
                            className="px-[20px] py-[8px] rounded-md bg-gray-900 text-white"
                            onClick={handleAddItem}
                          >
                            Add item
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-[20px] mt-[40px]">
                  <div className="grid grid-cols-12  w-full">
                    <div className="col-span-12 w-full">
                      <div className="grid gap-1">
                        <label htmlFor="invoice">Note:</label>
                        <textarea
                          defaultValue={note}
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
            </div>
            <div className="col-span-12 xl:col-span-3  ">
              <div className="bg-white rounded-md shadow-lg py-[40px] px-[20px]">
                <h2 className="font-semibold border-b border-gray-200 pb-2">
                  Calculation flow:
                </h2>
                {subTotal >= 1 ? (
                  <div className="mt-[20px] grid gap-[16px]">
                    <p className="flex justify-between">
                      Subtotal:{" "}
                      <span className="pl-3">{calculateSubtotal()}</span>
                    </p>
                    <p className="flex justify-between">
                      {taxationName} :{" "}
                      <span className="pl-3">+ {taxation}%</span>
                    </p>

                    <div className="border-b border-gray-200 pb-3 flex gap-2 items-center justify-between">
                      <p>Shipping:</p>
                      <span>
                        {" "}
                        +
                        <input
                          className="input_box inline w-[100px] text-right ml-2"
                          type="number"
                          defaultValue={shipping}
                          onChange={(e) =>
                            setShipping(fixNumber(toNumber(e.target.value)))
                          }
                        />
                      </span>
                    </div>

                    <div className=" flex gap-2 items-center justify-between ">
                      <p>Discount:</p>
                      <span>
                        -
                        <input
                          className="input_box inline w-[100px] text-right ml-2"
                          type="number"
                          defaultValue={discount}
                          onChange={(e) =>
                            setDiscount(fixNumber(toNumber(e.target.value)))
                          }
                        />
                      </span>
                    </div>

                    <p className="font-semibold flex justify-between">
                      Total:{" "}
                      <span className="pl-8">
                        {calculateTotal()} {getSetting?.currency}
                      </span>
                    </p>
                    <div className=" flex gap-2 items-center justify-between ">
                      <p>Payment:</p>
                      <span>
                        -
                        <input
                          className="input_box inline w-[100px] text-right ml-2"
                          type="number"
                          defaultValue={payment}
                          onChange={(e) =>
                            setPayment(fixNumber(toNumber(e.target.value)))
                          }
                        />
                      </span>
                    </div>

                    <p className="font-semibold flex justify-between">
                      Due:{" "}
                      <span className="pl-8">
                        {calculateDue()} {getSetting?.currency}
                      </span>
                    </p>
                  </div>
                ) : (
                  <p className="mt-2">Please add some item </p>
                )}

                <div>
                  <div className="w-full mt-[30px]">
                    <button
                      onClick={() => saveInvoice()}
                      className="px-[20px] w-full py-[8px] rounded-md bg-gray-900 text-white"
                    >
                      Update Invoice
                    </button>
                  </div>
                  <p className="flex justify-center py-5">or</p>
                  <div className="flex gap-[20px] py-[2px] justify-around border border- rounded-md">
                    <Tooltip
                      content="Save & Download"
                      placement="bottom"
                      animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0, y: 25 },
                      }}
                    >
                      <button
                        onClick={() => downloadPdf()}
                        className="px-[20px] flex justify-center items-center gap-3 py-[8px]"
                      >
                        <FaDownload className="text-[20px] " />
                      </button>
                    </Tooltip>
                    <Tooltip
                      content="View Invoice"
                      placement="bottom"
                      animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0, y: 25 },
                      }}
                    >
                      <button
                        onClick={viewPdf}
                        className="px-[20px] flex justify-center items-center gap-3 py-[8px]"
                      >
                        <FaRegFilePdf className="text-[20px] " />
                      </button>
                    </Tooltip>
                    <Tooltip
                      content="Save & Print"
                      placement="bottom"
                      animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0, y: 25 },
                      }}
                    >
                      <button
                        onClick={() => printPdf()}
                        className="px-[20px] flex justify-center items-center gap-3 py-[8px]"
                      >
                        <FaPrint className="text-[20px] " />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateComponent;
