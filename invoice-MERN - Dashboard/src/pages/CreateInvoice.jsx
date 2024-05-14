import React, { Fragment, Suspense } from "react";
import MasterLayout from "../layout/MasterLayout";
import CreateInvoiceComponent from "../components/CreateInvoiceComponent";

const CreateInvoice = () => {
  return (
    <Fragment>
      <Suspense fallback={""}>
        <MasterLayout>
          <CreateInvoiceComponent />
        </MasterLayout>
      </Suspense>
    </Fragment>
  );
};

export default CreateInvoice;
