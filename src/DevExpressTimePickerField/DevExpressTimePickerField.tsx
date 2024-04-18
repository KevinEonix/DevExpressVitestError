import dayjs from 'dayjs';
import { DateBox } from 'devextreme-react';
import { useEffect, useState } from 'react';

interface IDevExpressTimePickerField {
  label: string;
  id: string;
  format: string;
  pickerContainerId?: string;
  onDateChange: (date: Date) => void;
  interval?: number;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  requiredAriaLabel?: string;
}

function DevExpressTimePickerField({
  label,
  id,
  format,
  pickerContainerId,
  onDateChange,
  interval = 30,
  value,
  disabled,
  required,
  requiredAriaLabel
}: IDevExpressTimePickerField) {
  const [selectedDate, setSelectedDate] = useState<Date>();

  useEffect(() => {
    const date =
      value !== undefined
        ? dayjs(` 1970-01-01 ${value}`, ['YYYY-MM-DD HH:mm:ss']).toDate()
        : undefined;
    setSelectedDate(date);
  }, [value]);

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium leading-6 text-gray-900"
      >{label}{required && <span aria-label={requiredAriaLabel}>*</span>}</label>
      <DateBox
        type="time"
        value={selectedDate}
        displayFormat={format}
        useMaskBehavior
        interval={interval}
        onValueChanged={(e) => {
          onDateChange(e.value);
        }}
        pickerType="list"
        dropDownOptions={{
          hideOnParentScroll: false,
          container: pickerContainerId
        }}
        disabled={disabled}
      />
    </div>
  );
}

export { DevExpressTimePickerField };
