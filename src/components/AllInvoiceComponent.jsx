import React from "react";
import DataTable from "react-data-table-component";
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
const AllInvoiceComponent = () => {
  const columns = [
    {
      name: "Invoice no",
      selector: (row) => row.invoice_no,
    },
    {
      name: "Template id",
      selector: (row) => row.template_id,
    },
    {
      name: "Invoice date",
      selector: (row) => row.invoice_date,
    },
    {
      name: "Delivery date",
      selector: (row) => row.delivery_date,
    },
    {
      name: "Customer name",
      selector: (row) => row.customer_name,
    },

    {
      name: "Writer name",
      selector: (row) => row.invoice_writer_name,
    },

    {
      name: "Total",
      selector: (row) => row.total,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <AllInvoiceComponent />
        </>
      ),
    },
  ];

  const data = [
    {
      invoice_no: "215",
      invoice_date: "22/02/2023",
      delivery_date: "22/02/2023",
      customer_name: "Beetlejuice",
      address: "Beetlejuice dsf fds dsfgs sdfg dfs",
      invoice_writer_name: "Amit",
      template_id: 2,
      total: 2500,
    },
    {
      invoice_no: "215",
      invoice_date: "22/02/2023",
      delivery_date: "22/02/2023",
      customer_name: "Beetlejuice",
      address: "Beetlejuice",
      invoice_writer_name: "Amit",
      template_id: 2,
      total: 2500,
    },
    {
      invoice_no: "215",
      invoice_date: "22/02/2023",
      delivery_date: "22/02/2023",
      customer_name: "Beetlejuice",
      address: "Beetlejuice",
      invoice_writer_name: "Amit",
      template_id: 2,
      total: 2500,
    },
  ];

  function AllInvoiceComponent() {
    return (
      <div className="flex gap-3 justify-center">
        <button className="p-1">
          <FaRegPenToSquare />
        </button>
        <button className="p-1">
          <FaRegTrashCan />
        </button>
      </div>
    );
  }

  return (
    <section className="p-[16px]">
      <div>
        <div className="grid grid-cols-12 gap-[20px]">
          <div className="col-span-12 bg-white rounded-md p-[20px]">
            <h2 className="font-semibold">List of invoice data:</h2>
            <br />
            <DataTable columns={columns} data={data} pagination />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllInvoiceComponent;
