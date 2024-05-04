import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
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
import {
  invoice_all__get__Request__API,
  invoice_read_single__get__Request__API,
  invoice_single_delete__Request__API,
  setting__get__Request__API,
} from "../api/Api";
import Loading from "./Loading";
const AllInvoiceComponent = () => {
  let [loading, setLoading] = useState(true);
  let [invoices, setInvoices] = useState([]);
  let [getSetting, getSetSetting] = useState([]);
  useEffect(() => {
    setLoading(true);
    invoice_all__get__Request__API().then((result) => {
      if (result.status === "success") {
        let response = result["data"];
        setInvoices(response);
        setLoading(false);
      }
    });

    setting__get__Request__API().then((result) => {
      if (result.status === "success") {
        let response = result["data"];
        getSetSetting(response);
      }
    });
  }, []);

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
        invoice_single_delete__Request__API(idToDelete).then((result) => {
          setLoading(true);
          if (result) {
            invoice_all__get__Request__API().then((result) => {
              if (result.status === "success") {
                let response = result["data"];
                setInvoices(response);
                setLoading(false);
              }
            });
          }
        });
      }
    });
  };

  const downloadPdf = (idToView) => {
    invoice_read_single__get__Request__API(idToView).then((result) => {
      if (result.status === "success") {
        let templateData = result?.data;
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
      }
    });
  };

  let viewPdf = (idToView) => {
    invoice_read_single__get__Request__API(idToView).then((result) => {
      if (result.status === "success") {
        let templateData = result?.data;
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
      }
    });
  };

  let printPdf = (idToView) => {
    invoice_read_single__get__Request__API(idToView).then((result) => {
      if (result.status === "success") {
        let templateData = result?.data;
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
      }
    });
  };

  const columns = [
    {
      name: "Invoice ID",

      selector: (row) => (
        <div className="flex gap-[10px] justify-center items-center">
          <span
            className={`w-[11px] h-[11px] ${parseInt(row?.due) > 0 ? "bg-red-500" : "bg-green-500"}  block`}
          ></span>
          <span>{row?.invoiceID}</span>
        </div>
      ),

      width: "15%",
    },
    {
      name: "Customer Name",
      selector: (row) => row?.customerName,

      wrap: true,

      width: "25%",
    },

    {
      name: "Create date",

      selector: (row) => row?.startDate?.slice(0, 10),

      width: "10%",
      sortable: true,
    },
    {
      name: "Delivery date",

      selector: (row) => row?.deliveryDate?.slice(0, 10),

      width: "10%",
      sortable: true,
    },

    {
      name: "Paid",
      selector: (row) => row?.payment,

      width: "10%",
      sortable: true,
      style: {
        fontSize: '14px',
        color: '#10b981',
      }

    },
    {
      name: "Due",

      selector: (row) => row?.due,
      sortable: true,
      style: {
        fontSize: '14px',
        color: '#f43f5e',
      },
      width: "10%",
    },

    {
      name: "Action",

      width: "20%",

      selector: (row) => (
        <div className="flex gap-4 ">
          <FaDownload
            className="p-1 cursor-pointer text-[25px] text-gray-700"
            onClick={() => downloadPdf(row?._id)}
          />
          <Link to={`/update?id=${row?._id}`}>
            <FaPenToSquare className="p-1 cursor-pointer text-[25px] text-gray-700" />
          </Link>

          <FaExpand
            className="p-1 cursor-pointer text-[25px] text-gray-700"
            onClick={() => viewPdf(row?._id)}
          />
          <FaPrint
            className="p-1 cursor-pointer text-[25px] text-gray-700"
            onClick={() => printPdf(row?._id)}
          />
          <FaTrashCan
            className="p-1 cursor-pointer text-[25px] text-gray-700"
            onClick={() => deleteItem(row?._id)}
          />
        </div>
      ),
    },
  ];

  const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <div className="flex gap-3">
      <input
        id="search"
        type="text"
        placeholder="Filter By Customer Name"
        aria-label="Search Input"
        value={filterText}
        onChange={onFilter}
        className="input_box w-auto md:w-[400px]"
      />
      <button
        type="button"
        className="px-[20px] py-[8px]  rounded-md bg-red-500 text-white"
        onClick={onClear}
      >
        X
      </button>
    </div>
  );

  const Filtering = () => {
    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] =
      React.useState(false);
    const filteredItems = invoices?.filter(
      (item) =>
        item.customerName &&
        item.customerName.toLowerCase().includes(filterText?.toLowerCase())
    );

    const subHeaderComponentMemo = React.useMemo(() => {
      const handleClear = () => {
        if (filterText) {
          setResetPaginationToggle(!resetPaginationToggle);
          setFilterText("");
        }
      };

      return (
        <FilterComponent
          onFilter={(e) => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
        />
      );
    }, [filterText, resetPaginationToggle]);

    return (
      <DataTable
        columns={columns}
        data={filteredItems?.reverse()}
        pagination
        paginationResetDefaultPage={resetPaginationToggle}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        persistTableHead
        progressPending={loading}
        progressComponent={
          <SkeletonTheme
            baseColor="#ebebeb"
            highlightColor="#f5f5f5"
            className="w-100vw"
          >
            <div className="w-full block mt-[30px]">
              <Skeleton count={20} />
            </div>
          </SkeletonTheme>
        }
      />
    );
  };
  return (
    <>
      {/* {loading === true && <Loading />} */}
      <section className=" px-[40px] mx-auto py-[60px]">
        <div className="bg-white shadow-lg p-[20px] rounded-lg">
          <div className="rounded-xl bg-white md:m-[30px]">
            <h2 className="text-slate-700 text-2xl font-semibold mb-2">
              All Invoice file
            </h2>
            <Filtering />
          </div>
        </div>
      </section>
    </>
  );
};

export default AllInvoiceComponent;
