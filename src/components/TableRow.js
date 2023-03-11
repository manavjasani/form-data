import React from "react";
import { Form } from "react-bootstrap";
import {
  addIcon,
  closeIcon,
  DeleteIcon,
  EditIcon,
  saveIcon,
} from "../assets/icons/icons";

const TableRow = ({
  editableId,
  deviceName,
  deviceNameHandler,
  formDataArray,
  setMenu,
  menu,
  setDeviceEnabled,
  deviceEnabled,
  removeFormDataHandler,
  addData,
  item,
  name,
  index,
  saveDataHandler,
  deleteDataHandler,
  addFormDataHandler,
  editableData,
  setFormDataArray,
}) => {
  const createDataHandler = () => {
    const data = {
      id: editableData
        ? editableData.id
        : formDataArray.length > 0
        ? formDataArray[formDataArray.length - 1].id + 1
        : 1,
      deviceName,
      miles: editableData
        ? editableData.miles
        : formDataArray.length > 0
        ? formDataArray[formDataArray.length - 1].miles + 1
        : 1,
      menu,
      deviceEnabled,
    };
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

  return (
    <tr>
      <td>
        <Form.Control
          type="text"
          placeholder="Enter device name"
          value={
            name === "new"
              ? !editableId
                ? deviceName
                : ""
              : editableId === item.id
              ? deviceName
              : item.deviceName
          }
          onChange={deviceNameHandler}
          disabled={name === "new" ? editableId : editableId !== item.id}
        />
      </td>
      <td>
        {name === "new"
          ? `${
              formDataArray.length > 0
                ? formDataArray[formDataArray.length - 1]?.miles +
                  " - " +
                  (formDataArray[formDataArray.length - 1]?.miles + 1)
                : "0 - 1 "
            }`
          : `${item.miles - 1} - ${item.miles}`}{" "}
        Miles
      </td>
      <td>
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => {
            setMenu(e.target.value);
          }}
          defaultValue={
            name === "new" ? menu : editableId === item.id ? menu : item.menu
          }
          disabled={name === "new" ? editableId : editableId !== item.id}
        >
          <option value="PC">PC</option>
          <option value="Tab">Tab</option>
        </Form.Select>
      </td>
      <td>
        <Form.Check
          onChange={(e) => setDeviceEnabled(e.target.checked)}
          type="checkbox"
          checked={
            name === "new"
              ? !editableId
                ? deviceEnabled
                : false
              : editableId === item.id
              ? deviceEnabled
              : item.deviceEnabled
          }
          id={`device-enabled`}
          disabled={name === "new" ? editableId : editableId !== item.id}
        />
      </td>
      <td>
        {name === "new" ? (
          <div>
            <button onClick={createDataHandler}>{saveIcon}</button>
          </div>
        ) : (
          <div>
            {editableId !== item.id && (
              <button onClick={() => saveDataHandler(item)}>{EditIcon}</button>
            )}
            {editableId === item.id && (
              <button onClick={createDataHandler}>{saveIcon}</button>
            )}
            <button onClick={() => deleteDataHandler(item.id)}>
              {DeleteIcon}
            </button>
          </div>
        )}
      </td>
      <td>
        {name === "new"
          ? addData && (
              <button onClick={removeFormDataHandler}>{closeIcon}</button>
            )
          : index === formDataArray.length - 1 &&
            !addData && <button onClick={addFormDataHandler}>{addIcon}</button>}
      </td>
    </tr>
  );
};

export default TableRow;
