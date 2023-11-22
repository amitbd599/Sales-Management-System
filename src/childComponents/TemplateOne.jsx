import React from "react";

const TemplateOne = ({ templateData }) => {
  console.log(templateData);
  let getSetting = JSON.parse(localStorage.getItem("setting"));
  return (
    <div id="content-to-convert" className="px-[20px] text-black">
      <div className="flex justify-between border-b border-gray-200 pb-3">
        <div className="mt-[30px]">
          <h2 className="text-[30px] font-semibold">Invoice</h2>
          <div className="grid gap-1 mt-2">
            <p>Invoice no: 12345</p>
            <p>Date: 10/02/2023</p>
            <p>Delivery date: 10/02/2023</p>
            <p>
              Payment status: <strong>Paid</strong>
            </p>
          </div>
        </div>
        <div>
          <div className="flex justify-end">
            <img src={getSetting?.logo} alt="" className="w-[200px]" />
          </div>
          <div className="text-end grid gap-1">
            <p>{getSetting?.company_name}</p>
            <p>{getSetting?.company_address}</p>
            <p>{getSetting?.email}</p>
            <p>{getSetting?.mobile}</p>
            <p>{getSetting?.fax}</p>
            <p>{getSetting?.website}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-[25px] gap-[100px]  pb-4 border-b border-gray-100">
        <div className="grid gap-2">
          <h2 className="font-semibold text-xl">Bill To:</h2>
          <p>Name: {templateData?.customerName}</p>
          <p>Address: {templateData?.address}</p>
          <p>Phone: {templateData?.phone}</p>
          <p>Email: {templateData?.email}</p>
        </div>
        <div className="grid gap-2">
          <h2 className="font-semibold text-xl">Payment information:</h2>
          <p>Bank: {templateData?.customerName}</p>
          <p>Account: {templateData?.address}</p>
          <p>Name: {templateData?.phone}</p>
        </div>
      </div>
      <div className="mt-4">
        <table className="rounded-t-lg  w-full mx-auto  text-gray-800">
          <tbody>
            <tr className="border-b-2 border-gray-300 text-center bg-gray-100">
              <th className="px-4 py-3 text-start">Sl no</th>
              <th className="px-4 py-3 text-start">Item</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Rate</th>
              <th className="px-4 py-3">Amount</th>
            </tr>
            {templateData?.invoiceItems.map((item, index) => (
              <tr key={index} className=" border-b border-gray-200 text-center">
                <td className="px-4 py-2 text-start">{index + 1}</td>
                <td className="px-4 py-2 text-start">{item?.item}</td>
                <td className="px-4 py-2">{item?.quantity}</td>
                <td className="px-4 py-2">{item?.rate}</td>
                <td className="px-4 py-2">{item?.quantity * item?.rate}</td>
              </tr>
            ))}

            {/* each row */}
          </tbody>
        </table>
      </div>

      {/* Sub Total info */}
      <div className="mt-4">
        <div className="grid grid-cols-12">
          <div className="col-span-8"></div>
          <div className="col-span-4">
            <div className="bg-white rounded-md p-5 border border-gray-100">
              <div className=" grid gap-[12px]">
                <div className="border-b border-gray-200 pb-3 grid gap-2">
                  <p className="flex justify-between">
                    Subtotal:{" "}
                    <span className="pl-3">{templateData?.subTotal}</span>
                  </p>
                  {templateData?.tax !== 0 && (
                    <p className="flex justify-between">
                      Tax: <span className="pl-3">+ {templateData?.tax}</span>
                    </p>
                  )}
                  {templateData?.vat !== 0 && (
                    <p className="flex justify-between">
                      Vat: <span className="pl-3">+ {templateData?.vat}</span>
                    </p>
                  )}
                  {templateData?.vat !== 0 && (
                    <p className="flex justify-between">
                      Shipping:{" "}
                      <span className="pl-3">+ {templateData?.shipping}</span>
                    </p>
                  )}
                </div>

                <div className=" flex gap-2 items-center justify-between ">
                  <p>Discount: </p>{" "}
                  <span className="pl-3">+ {templateData?.discount}</span>
                </div>

                <p className="font-semibold flex justify-between">
                  Total: <span className="pl-8">{templateData?.total}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateOne;
