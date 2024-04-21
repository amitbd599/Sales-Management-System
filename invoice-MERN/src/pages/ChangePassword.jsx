import React, { Fragment, Suspense } from "react";
import ChangePasswordComponent from "../components/ChangePasswordComponent";

const ChangePassword = () => {
  return (
    <Fragment>
      <Suspense fallback={""}>
        <>
          <ChangePasswordComponent />
        </>
      </Suspense>
    </Fragment>
  );
};

export default ChangePassword;
