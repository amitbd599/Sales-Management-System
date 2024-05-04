import React, { Fragment, Suspense } from "react";
import RegistrationComponent from "../components/RegistrationComponent";

const Registration = () => {
  return (
    <Fragment>
      <Suspense fallback={""}>
        <>
          <RegistrationComponent />
        </>
      </Suspense>
    </Fragment>
  );
};

export default Registration;
