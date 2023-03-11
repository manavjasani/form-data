import React, { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import {
  addIcon,
  closeIcon,
  DeleteIcon,
  DownArrow,
  EditIcon,
  saveIcon,
} from "../assets/icons/icons";

const Device = () => {
  const [id, setId] = useState("");
  const [editableData, setEditableData] = useState("");

  const [deviceName, setDeviceName] = useState("");
  const [editableId, setEditableId] = useState("");
  const [menu, setMenu] = useState("PC");
  const [deviceEnabled, setDeviceEnabled] = useState(false);
  const [addData, setAddData] = useState(false);

  const [formDataArray, setFormDataArray] = useState(
    JSON.parse(localStorage.getItem("formData")) || []
  );

  console.log("editableData", editableData);
  //   const [miles, setMiles] = useState(formDataArray.length - 1);

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
    localStorage.setItem("formData", JSON.stringify(formDataArray));
  }, [formDataArray]);

  console.log("formDataArray", formDataArray);

  const deviceNameHandler = (e) => {
    setDeviceName(e.target.value);
  };

  const addFormDataHandler = () => {
    setAddData(true);
    // setFormDataArray([
    //   ...formDataArray,
    //   {
    //     id: formDataArray.length + 1,
    //     deviceName: "",
    //     miles: "",
    //     menu: "",
    //     deviceEnabled: false,
    //   },
    // ]);
  };
  const removeFormDataHandler = () => {
    setAddData(false);
    // setFormDataArray([
    //   ...formDataArray,
    //   {
    //     id: formDataArray.length + 1,
    //     deviceName: "",
    //     miles: "",
    //     menu: "",
    //     deviceEnabled: false,
    //   },
    // ]);
  };
  console.log("addData", addData);

  const deleteDataHandler = (id) => {
    const data = formDataArray.filter((item, index) => item.id !== id);
    setFormDataArray(data);
    console.log("data", data);
  };

  const saveDataHandler = (data) => {
    setEditableId(data.id);
    setEditableData(data);
  };

  console.log("EditableId", editableId);

  const createDataHandler = () => {
    const data = {
      id: editableData ? editableData.id : formDataArray.length + 1,
      deviceName,
      miles: editableData
        ? editableData.miles
        : formDataArray.length > 0
        ? formDataArray[formDataArray.length - 1].miles + 1
        : 1,
      menu,
      deviceEnabled,
    };
    console.log("data", data);
    if (editableId) {
      const editableArr = formDataArray.map((item) => {
        if (editableData.id === item.id) {
          return data;
        }
        return item;
      });
      setFormDataArray(editableArr);
    } else {
      setFormDataArray([...formDataArray, data]);
    }
  };

  console.log("menu", formDataArray);

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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {formDataArray?.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter device name"
                    value={
                      editableId === item.id ? deviceName : item.deviceName
                    }
                    onChange={deviceNameHandler}
                    disabled={editableId !== item.id}
                  />
                </td>
                <td>{`${item.miles - 1} - ${item.miles}`} Miles</td>
                <td>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => {
                      console.log("e.target.value", e.target.value);
                      setMenu(e.target.value);
                    }}
                    defaultValue={editableId === item.id ? menu : item.menu}
                    disabled={editableId !== item.id}
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
                    checked={
                      editableId === item.id
                        ? deviceEnabled
                        : item.deviceEnabled
                    }
                    id={`device-enabled`}
                    disabled={editableId !== item.id}
                  />
                </td>
                <td>
                  <div>
                    {editableId !== item.id && (
                      <button onClick={() => saveDataHandler(item)}>
                        {EditIcon}
                      </button>
                    )}
                    {editableId === item.id && (
                      <button onClick={createDataHandler}>{saveIcon}</button>
                    )}
                    <button onClick={() => deleteDataHandler(item.id)}>
                      {DeleteIcon}
                    </button>
                  </div>
                </td>
                <td>
                  {index === formDataArray.length - 1 && !addData && (
                    <button onClick={addFormDataHandler}>{addIcon}</button>
                  )}
                </td>
              </tr>
            );
          })}
          {(addData || formDataArray.length === 0) && (
            <tr>
              <td>
                <Form.Control
                  type="text"
                  placeholder="Enter device name"
                  value={!editableId ? deviceName : ""}
                  onChange={deviceNameHandler}
                  disabled={editableId}
                />
              </td>
              <td>
                {`${
                  formDataArray.length > 0
                    ? formDataArray[formDataArray.length - 1]?.miles +
                      " - " +
                      (formDataArray[formDataArray.length - 1]?.miles + 1)
                    : "0 - 1 "
                }`}{" "}
                Miles
              </td>
              <td>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => {
                    setMenu(e.target.value);
                  }}
                  defaultValue={menu}
                  disabled={editableId}
                >
                  <option value="PC">PC</option>
                  <option value="Tab">Tab</option>
                </Form.Select>
              </td>
              <td>
                <Form.Check
                  onChange={(e) => setDeviceEnabled(e.target.checked)}
                  type="checkbox"
                  checked={!editableId ? deviceEnabled : false}
                  id={`device-enabled`}
                  disabled={editableId}
                />
              </td>
              <td>
                <div>
                  <button onClick={createDataHandler}>{saveIcon}</button>
                </div>
              </td>
              <td>
                {addData && (
                  <button onClick={removeFormDataHandler}>{closeIcon}</button>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Device;

{
  /* <tr>
  <td>
    <Form.Control
      type="text"
      placeholder="Enter device name"
      value={!editableId ? deviceName : ""}
      onChange={deviceNameHandler}
      disabled={editableId}
    />
  </td>
  <td>
    {`${
      formDataArray.length > 0
        ? formDataArray[formDataArray.length - 1]?.miles +
          " - " +
          (formDataArray[formDataArray.length - 1]?.miles + 1)
        : "0 - 1 "
    }`}{" "}
    Miles
  </td>
  <td>
    <Form.Select
      aria-label="Default select example"
      onChange={(e) => {
        setMenu(e.target.value);
      }}
      defaultValue={menu}
      disabled={editableId}
    >
      <option value="PC">PC</option>
      <option value="Tab">Tab</option>
    </Form.Select>
  </td>
  <td>
    <Form.Check
      onChange={(e) => setDeviceEnabled(e.target.checked)}
      type="checkbox"
      checked={!editableId ? deviceEnabled : false}
      id={`device-enabled`}
      disabled={editableId}
    />
  </td>
  <td>
    <div>
      <button onClick={createDataHandler}>{saveIcon}</button>

    </div>
  </td>
</tr>; */
}
