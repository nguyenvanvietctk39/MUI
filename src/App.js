import { Button, MenuItem } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import {
  FormInputText,
  FormInputDatePicker,
  FormInputMultiSelectChip,
  FormInputMultiSelectCheckMarks,
} from "./FormC/Form";
import moment from "moment";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function App() {
  const formItems = [
    {
      name: "ten",
      label: "Tên",
      //default = string.empty
      defaultValue: "",
      render: (control) => {
        return <FormInputText control={control} />;
      },
    },
    {
      name: "date",
      label: "NTNS",
      //default = string.empty
      defaultValue: moment(),
      render: (control) => {
        return <FormInputDatePicker control={control} />;
      },
    },
    {
      name: "selectMulti",
      label: "Chip",
      //default = string.empty
      defaultValue: [],
      render: (control) => {
        return (
          <FormInputMultiSelectChip control={control}>
            <MenuItem value="viet">Việt</MenuItem>
            <MenuItem value="soi">Sói</MenuItem>
          </FormInputMultiSelectChip>
        );
      },
    },
    {
      name: "selectMultiCheck",
      label: "Multi Check",
      defaultValue: [],
      render: (control) => {
        return (
          <FormInputMultiSelectCheckMarks control={control}>
            <MenuItem value="viet">Việt</MenuItem>
            <MenuItem value="soi">Sói</MenuItem>
          </FormInputMultiSelectCheckMarks>
        );
      },
    },
  ];

  const objDefaultValues = formItems.reduce(
    (obj, item) => Object.assign(obj, { [item.name]: item.defaultValue ?? "" }),
    {}
  );

  const { getValues, control, handleSubmit } = useForm({
    defaultValues: objDefaultValues,
    mode: "all",
    resolver: yupResolver(
      yup.object({
        selectMulti: yup.array().min(1, "chọn cmmd"),
        selectMultiCheck: yup.array().min(1, "chọn cmmd"),
        date: yup
          .date()
          .typeError("lỗi rồi dcmm")
          .min("01/01/1000", "min cai dcmcm"),
      })
    ),
  });

  return (
    <form
      onSubmit={handleSubmit((values) => {
        console.log(values);
      })}
      style={{ width: 500, margin: "auto" }}
    >
      {formItems.map((element, index) => {
        return React.cloneElement(element.render(control), {
          name: element.name,
          label: element.label,
          key: index.toString(),
        });
      })}

      <Button type="Submit">Submit</Button>
      <Button
        onClick={() => {
          const values = getValues("date");
          console.log(moment(values).format());
        }}
      >
        GetValues
      </Button>
    </form>
  );
}

export default App;
