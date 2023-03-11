import React from "react";
import { Accordion } from "react-bootstrap";
import Device from "../../components/Device";
import Location from "../../components/Location";

const Container = () => {
  return (
    <div className="main-container">
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Location</Accordion.Header>
          <Accordion.Body>
            <Location />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Device</Accordion.Header>
          <Accordion.Body>
            <Device />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Container;
