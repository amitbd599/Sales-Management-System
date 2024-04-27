import React, { Fragment, Suspense } from "react";
import LoginComponent from "../components/LoginComponent";

const Login = () => {
  return (
    <Fragment>
      <Suspense fallback={""}>
        <>
          <LoginComponent />
        </>
      </Suspense>
    </Fragment>
  );
};

export default Login;
