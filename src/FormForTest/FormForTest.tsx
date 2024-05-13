import React from 'react';
import {Controller, useForm} from "react-hook-form";
import {DevExpressDatePickerField} from "@/DevExpressDatePickerField";
import dayjs from "dayjs";

function FormForTest() {
 const {handleSubmit, control} = useForm({
     defaultValues: {
         test: undefined,
         userEventTest: ''
     }
 });

 return (
  <form onSubmit={handleSubmit(async (data) => {
   console.log('data are', data)
  })}>
   {/*<Controller*/}
   {/* control={control}*/}
   {/* name="test"*/}
   {/* render={({field: {onChange, value}}) => (*/}
   {/*     <DevExpressDatePickerField*/}
   {/*         label="Date field test"*/}
   {/*         id="date-input"*/}
   {/*         format="dd/MM/yyyy"*/}
   {/*         onDateChange={(d) => {*/}
   {/*          onChange(dayjs(d).format('YYYY-MM-DD'));*/}
   {/*         }}*/}
   {/*         value={value}*/}
   {/*     />*/}
   {/* )}*/}
   {/*/>*/}
   <Controller
    control={control}
    name="userEventTest"
    render={({field: {onChange, value, name}}) => (
        <div>
            <label htmlFor="userEventTestField">Test field label</label>
            <input type="text" name={name} id="userEventTestField" onChange={onChange} value={value}/>
        </div>
    )}
   />
  </form>
 );
}

export { FormForTest };