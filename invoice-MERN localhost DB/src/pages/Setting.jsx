import React, { Fragment, Suspense } from "react";
import MasterLayout from "../layout/MasterLayout";
import SettingComponent from "../components/SettingComponent";

const Setting = () => {
  return (
    <Fragment>
      <Suspense fallback={""}>
        <MasterLayout>
          <SettingComponent />
        </MasterLayout>
      </Suspense>
    </Fragment>
  );
};

export default Setting;
