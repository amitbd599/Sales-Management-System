import React, { Fragment, Suspense } from "react";
import OTPComponent from "../components/OTPComponent";

const OTPCode = () => {
  return (
    <Fragment>
      <Suspense fallback={""}>
        <>
          <OTPComponent />
        </>
      </Suspense>
    </Fragment>
  );
};

export default OTPCode;
