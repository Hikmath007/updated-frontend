import React from "react";
import { Route } from "wouter";
import Listingpage from "../../pages/ListView";


const AppRoutes = () => {
  return (
    <>
      <Route path="/listingpage" component={Listingpage} />
    </>
  );
};

export default AppRoutes;