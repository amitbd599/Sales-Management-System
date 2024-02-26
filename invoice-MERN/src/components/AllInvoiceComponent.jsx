import React, { useState } from "react";
import TemplateOne from "../pdf-templates/TemplateOne";
import TemplateTwo from "../pdf-templates/TemplateTwo";
import TemplateThree from "../pdf-templates/TemplateThree";
import TemplateFour from "../pdf-templates/TemplateFour";
import TemplateFive from "../pdf-templates/TemplateFive";
import TemplateSix from "../pdf-templates/TemplateSix";
import TemplateSeven from "../pdf-templates/TemplateSeven";
import TemplateEight from "../pdf-templates/TemplateEight";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import {
  FaDownload,
  FaExpand,
  FaPenToSquare,
  FaPrint,
  FaTrashCan,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
const AllInvoiceComponent = () => {
  let getSetting = JSON.parse(localStorage.getItem("setting"));
  let [invoices, setInvoices] = useState(
    JSON.parse(localStorage.getItem("invoices") || [])
  );

  const deleteItem = (idToDelete) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedData = invoices.filter(
          (item) => item.invoiceID !== idToDelete
        );
        setInvoices(updatedData);

        localStorage.setItem("invoices", JSON.stringify(updatedData));
      }
    });
  };

  const downloadPdf = (idToView) => {
    let templateData = invoices.filter((item) => item.invoiceID === idToView);
    templateData = templateData[0];
    if (getSetting?.selectedTemplate === 1) {
      TemplateOne({
        templateData,
        getSetting,
        save: true,
      });
    } else if (getSetting?.selectedTemplate === 2) {
      TemplateTwo({
        templateData,
        getSetting,
        save: true,
      });
    } else if (getSetting?.selectedTemplate === 3) {
      TemplateThree({
        templateData,
        getSetting,
        save: true,
      });
    } else if (getSetting?.selectedTemplate === 4) {
      TemplateFour({
        templateData,
        getSetting,
        save: true,
      });
    } else if (getSetting?.selectedTemplate === 5) {
      TemplateFive({
        templateData,
        getSetting,
        save: true,
      });
    } else if (getSetting?.selectedTemplate === 6) {
      TemplateSix({
        templateData,
        getSetting,
        save: true,
      });
    } else if (getSetting?.selectedTemplate === 7) {
      TemplateSeven({
        templateData,
        getSetting,
        save: true,
      });
    } else if (getSetting?.selectedTemplate === 8) {
      TemplateEight({
        templateData,
        getSetting,
        save: true,
      });
    }
  };

  let viewPdf = (idToView) => {
    let templateData = invoices.filter((item) => item.invoiceID === idToView);
    templateData = templateData[0];
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

  let printPdf = (idToView) => {
    let templateData = invoices.filter((item) => item.invoiceID === idToView);
    templateData = templateData[0];
    if (getSetting?.selectedTemplate === 1) {
      TemplateOne({
        templateData,
        getSetting,
        print: true,
      });
    } else if (getSetting?.selectedTemplate === 2) {
      TemplateTwo({
        templateData,
        getSetting,
        print: true,
      });
    } else if (getSetting?.selectedTemplate === 3) {
      TemplateThree({
        templateData,
        getSetting,
        save: true,
      });
    } else if (getSetting?.selectedTemplate === 4) {
      TemplateFour({
        templateData,
        getSetting,
        save: true,
      });
    } else if (getSetting?.selectedTemplate === 5) {
      TemplateFive({
        templateData,
        getSetting,
        save: true,
      });
    } else if (getSetting?.selectedTemplate === 6) {
      TemplateSix({
        templateData,
        getSetting,
        save: true,
      });
    } else if (getSetting?.selectedTemplate === 7) {
      TemplateSeven({
        templateData,
        getSetting,
        save: true,
      });
    } else if (getSetting?.selectedTemplate === 8) {
      TemplateEight({
        templateData,
        getSetting,
        save: true,
      });
    }
  };
  const columns = [
    {
      name: "Invoice ID",
      selector: (row) => row.invoiceID,
      width: "150px",
    },
    {
      name: "Customer Name",
      selector: (row) => row.customerName,

      wrap: true,
      width: "200px",
    },

    {
      name: "Date",

      selector: (row) => row.startDate.slice(0, 10),
      width: "100px",
    },
    {
      name: "Delivery Date",

      selector: (row) => row.deliveryDate.slice(0, 10),
      width: "120px",
    },
    {
      name: "Payment Method",
      selector: (row) => row.paymentMethod,
      width: "140px",
    },
    {
      name: "Paid",
      selector: (row) => (
        <div>
          <span className="bg-[#ecfdf5] text-[#10b981] px-[10px] py-[6px] rounded-full">
            {row.payment}
          </span>
        </div>
      ),
      width: "120px",
    },
    {
      name: "Due",
      selector: (row) => (
        <div>
          <span className="bg-[#fff1f2] text-[#f43f5e] px-[10px] py-[6px] rounded-full">
            {row.due}
          </span>
        </div>
      ),
      width: "100px",
    },

    {
      name: "Action",
      with: "500px",

      selector: (row) => (
        <div className="flex gap-4 ">
          <FaDownload
            className="p-1 cursor-pointer text-[25px] text-gray-700"
            onClick={() => downloadPdf(row.invoiceID)}
          />
          <Link to={`/update?id=${row.invoiceID}`}>
            <FaPenToSquare className="p-1 cursor-pointer text-[25px] text-gray-700" />
          </Link>

          <FaExpand
            className="p-1 cursor-pointer text-[25px] text-gray-700"
            onClick={() => viewPdf(row.invoiceID)}
          />
          <FaPrint
            className="p-1 cursor-pointer text-[25px] text-gray-700"
            onClick={() => printPdf(row.invoiceID)}
          />
          <FaTrashCan
            className="p-1 cursor-pointer text-[25px] text-gray-700"
            onClick={() => deleteItem(row.invoiceID)}
          />
        </div>
      ),
    },
  ];

  return (
    <section className="container mx-auto py-[60px]">
      <div className="bg-white shadow-lg p-[20px] rounded-lg">
        <div className="rounded-xl bg-white md:m-[30px]">
          <h2 className="text-slate-700 text-2xl font-semibold mb-2">
            All Invoice file
          </h2>
          <DataTable
            fixedHeader
            fixedHeaderScrollHeight="600px"
            columns={columns}
            data={invoices}
            pagination
          />
        </div>
      </div>
    </section>
  );
};

export default AllInvoiceComponent;
