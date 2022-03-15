import React from "react";
import { Controller } from "react-hook-form";
import {
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Select,
  TextField,
  Checkbox,
  ListItemText,
} from "@mui/material";
import AdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import moment from "moment";
import { Box } from "@mui/system";
import "moment/locale/vi";

const DEFAULT_MUI_PROPS = {
  margin: "normal",
  fullWidth: true,
  variant: "outlined",
};

//date
const DATE_FORMAT = "DD/MM/yyyy";
const MIN_DATE = moment("01/01/1000", DATE_FORMAT);

//multi select
const SPLIT_PREFIX = ", ";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MULTI_SELECT_MENU_PROPS = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export function FormInputText({ name, control, label, muiProps }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error }, formState }) => (
        <TextField
          {...field}
          {...DEFAULT_MUI_PROPS}
          {...muiProps}
          error={!!error}
          helperText={error ? error.message : null}
          label={label}
        />
      )}
    />
  );
}

export function FormInputDatePicker({ name, control, label, muiProps }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterMoment} locale="vi">
            <DatePicker
              {...muiProps}
              clearable
              clearText="Xóa"
              label={label}
              value={value}
              onChange={onChange}
              inputFormat={DATE_FORMAT}
              minDate={MIN_DATE}
              renderInput={(params) => (
                <TextField
                  {...DEFAULT_MUI_PROPS}
                  {...params}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
}

export function FormInputMultiSelectChip({
  name,
  control,
  label,
  muiProps,
  children,
}) {
  const labelKey = `multiple-chip-label-${name}`;

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange },
        fieldState: { error },
        formState,
      }) => {
        const handleChange = (event) => {
          const {
            target: { value },
          } = event;
          onChange(value);
        };

        return (
          <FormControl error={!!error} {...DEFAULT_MUI_PROPS} {...muiProps}>
            <InputLabel id={labelKey}>{label}</InputLabel>
            <Select
              labelId={labelKey}
              multiple
              id={name}
              value={value}
              onChange={handleChange}
              input={<OutlinedInput id={name} label={label} />}
              renderValue={(selected) => {
                return (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected &&
                      selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                  </Box>
                );
              }}
              MenuProps={MULTI_SELECT_MENU_PROPS}
            >
              {children}
            </Select>
            <FormHelperText>{error ? error.message : null}</FormHelperText>
          </FormControl>
        );
      }}
    />
  );
}

export function FormInputMultiSelectCheckMarks({
  name,
  control,
  label,
  muiProps,
  children,
}) {
  const labelKey = `multiple-check-marks-label-${name}`;
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange },
        fieldState: { error },
        formState,
      }) => {
        const handleChange = (event) => {
          const {
            target: { value },
          } = event;
          onChange(value);
        };

        return (
          <FormControl error={!!error} {...DEFAULT_MUI_PROPS} {...muiProps}>
            <InputLabel id={labelKey}>{label}</InputLabel>
            <Select
              labelId={labelKey}
              multiple
              id={name}
              value={value}
              onChange={handleChange}
              input={<OutlinedInput id={name} label={label} />}
              renderValue={(selected) => selected.join(SPLIT_PREFIX)}
              MenuProps={MULTI_SELECT_MENU_PROPS}
            >
              {children.map((e, i) => {
                const childValue = e?.props?.value;
                return React.cloneElement(
                  e,
                  {
                    key: i.toString(),
                  },
                  <>
                    <Checkbox checked={value.indexOf(childValue) > -1} />
                    <ListItemText primary={childValue} />
                  </>
                );
              })}
            </Select>
            <FormHelperText>{error ? error.message : null}</FormHelperText>
          </FormControl>
        );
      }}
    />
  );
}
