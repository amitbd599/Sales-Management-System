import React, { Fragment, Suspense } from "react";
import ForgotPasswordComponent from "../components/ForgotPasswordComponent";

const ForgotPassword = () => {
  return (
    <Fragment>
      <Suspense fallback={""}>
        <>
          <ForgotPasswordComponent />
        </>
      </Suspense>
    </Fragment>
  );
};

export default ForgotPassword;
