import React, { Fragment, Suspense } from "react";
import MasterLayout from "../layout/MasterLayout";
import AllInvoiceComponent from "../components/AllInvoiceComponent";

const AllInvoice = () => {
  return (
    <Fragment>
      <Suspense fallback={""}>
        <MasterLayout>
          <AllInvoiceComponent />
        </MasterLayout>
      </Suspense>
    </Fragment>
  );
};

export default AllInvoice;
