import React, { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import {
  DeleteIcon,
  DownArrow,
  EditIcon,
  saveIcon,
} from "../assets/icons/icons";

const Device = () => {
  const [id, setId] = useState(1);
  const [deviceName, setDeviceName] = useState("");
  const [editableId, setEditableId] = useState("");
  const [miles, setMiles] = useState(1);
  const [menu, setMenu] = useState("");
  const [deviceEnabled, setDeviceEnabled] = useState(false);

  const [formDataArray, setFormDataArray] = useState(
    JSON.parse(localStorage.getItem("formData"))
  );

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formDataArray));
  }, [formDataArray]);

  console.log("formDataArray", formDataArray);

  const deviceNameHandler = (e) => {
    setDeviceName(e.target.value);
  };

  const saveDataHandler = () => {};

  const createDataHandler = () => {
    const data = {
      id,
      deviceName,
      miles,
      menu,
      deviceEnabled,
    };
    console.log("data", data);
    setFormDataArray([...formDataArray, data]);
  };

  console.log("menu", deviceName, menu, deviceEnabled);

  return (
    <div>
      <div className="location-container">
        <span>Device</span>
        {DownArrow}
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Device Name</th>
            <th>Miles</th>
            <th>Type</th>
            <th>Enabled</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {formDataArray?.map((item, index) => {
            return (
              <tr key={item.index}>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter device name"
                    value={item.deviceName}
                    onChange={deviceNameHandler}
                  />
                </td>
                <td>{`${miles - 1} - ${miles}`} Miles</td>
                <td>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => {
                      console.log("e.target.value", e.target.value);
                      setMenu(e.target.value);
                    }}
                    defaultValue={item.menu}
                  >
                    {/* <option>Open this select menu</option> */}
                    <option value="PC">PC</option>
                    <option value="Tab">Tab</option>
                  </Form.Select>
                </td>
                <td>
                  <Form.Check
                    onChange={(e) => setDeviceEnabled(e.target.checked)}
                    type="checkbox"
                    checked={item.deviceEnabled}
                    id={`device-enabled`}
                  />
                </td>
                <td>
                  <div>
                    <button onClick={() => saveDataHandler()}>
                      {EditIcon}
                    </button>
                    <button onClick={createDataHandler}>{saveIcon}</button>
                    <button>{DeleteIcon}</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Device;
