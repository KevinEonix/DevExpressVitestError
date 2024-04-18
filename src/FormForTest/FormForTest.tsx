import React from 'react';
import {Controller, useForm} from "react-hook-form";
import {DevExpressDatePickerField} from "@/DevExpressDatePickerField";
import dayjs from "dayjs";

function FormForTest() {
 const {handleSubmit, control} = useForm();

 return (
  <form onSubmit={handleSubmit(async (data) => {
   console.log('data are', data)
  })}>
   <Controller
    control={control}
    name="test"
    render={({field: {onChange, value}}) => (
        <DevExpressDatePickerField
            label="Date field test"
            id="date-input"
            format="dd/MM/yyyy"
            onDateChange={(d) => {
             onChange(dayjs(d).format('YYYY-MM-DD'));
            }}
            value={value}
        />
    )}
   />
  </form>
 );
}

export { FormForTest };