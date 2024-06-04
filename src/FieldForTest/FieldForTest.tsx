import React, {useState} from 'react';

interface IFieldForTestProps {
    label: string;
    name: string;
}

function FieldForTest({label, name}: IFieldForTestProps) {
    const [value, setValue] = useState('');

 return (
  <div>
      <label htmlFor="test-field">{label}</label>
      <input type="text" id="test-field" name={name} value={value} onChange={e => setValue(e.target.value)}/>
  </div>
 );
}

export { FieldForTest };