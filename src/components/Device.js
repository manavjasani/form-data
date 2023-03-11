import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import TableHead from "./TableHead";
import TableRow from "./TableRow";

const Device = () => {
  const [editableData, setEditableData] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [editableId, setEditableId] = useState("");
  const [menu, setMenu] = useState("PC");
  const [deviceEnabled, setDeviceEnabled] = useState(false);
  const [addData, setAddData] = useState(false);
  const [formDataArray, setFormDataArray] = useState(
    JSON.parse(localStorage.getItem("formData")) || []
  );

  useEffect(() => {
    if (editableData) {
      setDeviceName(editableData?.deviceName);
      setMenu(editableData?.menu);
      setDeviceEnabled(editableData?.deviceEnabled);
    }
  }, [editableData]);

  useEffect(() => {
    setEditableData("");
    setEditableId("");
    setDeviceName("");
    setMenu("PC");
    setDeviceEnabled(false);
    setAddData(false);
    localStorage.setItem("formData", JSON.stringify(formDataArray));
  }, [formDataArray]);

  const deviceNameHandler = (e) => {
    setDeviceName(e.target.value);
  };

  const addFormDataHandler = () => {
    setAddData(true);
  };

  const removeFormDataHandler = () => {
    setAddData(false);
  };

  const deleteDataHandler = (id) => {
    const data = formDataArray.filter((item) => item.id !== id);
    setFormDataArray(data);
  };

  const saveDataHandler = (data) => {
    setEditableId(data.id);
    setEditableData(data);
  };

  return (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <TableHead />
        </thead>
        <tbody>
          {formDataArray?.map((item, index) => {
            return (
              <TableRow
                key={item.id}
                index={index}
                item={item}
                editableId={editableId}
                deviceName={deviceName}
                deviceNameHandler={deviceNameHandler}
                formDataArray={formDataArray}
                setMenu={setMenu}
                menu={menu}
                setDeviceEnabled={setDeviceEnabled}
                deviceEnabled={deviceEnabled}
                saveDataHandler={saveDataHandler}
                deleteDataHandler={deleteDataHandler}
                addFormDataHandler={addFormDataHandler}
                addData={addData}
                editableData={editableData}
                setFormDataArray={setFormDataArray}
              />
            );
          })}
          {(addData || formDataArray.length === 0) && (
            <TableRow
              editableId={editableId}
              deviceName={deviceName}
              deviceNameHandler={deviceNameHandler}
              formDataArray={formDataArray}
              setMenu={setMenu}
              menu={menu}
              setDeviceEnabled={setDeviceEnabled}
              deviceEnabled={deviceEnabled}
              removeFormDataHandler={removeFormDataHandler}
              addData={addData}
              editableData={editableData}
              setFormDataArray={setFormDataArray}
              name="new"
            />
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Device;
