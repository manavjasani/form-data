import React from "react";
import Device from "../../components/Device";
import Location from "../../components/Location";

const Container = () => {
  return (
    <div className="main-container">
      <Location />
      <Device />
    </div>
  );
};

export default Container;
