import React, { Fragment, Suspense } from "react";
import MasterLayout from "../layout/MasterLayout";
import HomeComponent from "../components/HomeComponent";

const Home = () => {
  return (
    <Fragment>
      <Suspense fallback={""}>
        <MasterLayout>
          <HomeComponent />
        </MasterLayout>
      </Suspense>
    </Fragment>
  );
};

export default Home;
