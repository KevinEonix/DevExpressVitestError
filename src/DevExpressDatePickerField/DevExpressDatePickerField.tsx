import { DateBox } from 'devextreme-react';
import { useEffect, useState } from 'react';

interface IDevExpressDatePickerField {
  label?: string;
  withLabel?: boolean;
  id: string;
  format: string;
  pickerContainerId?: string;
  onDateChange: (date: Date) => void;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  requiredAriaLabel?: string;
}

function DevExpressDatePickerField({
  label,
  withLabel = true,
  id,
  format,
  pickerContainerId,
  onDateChange,
  value,
  disabled,
  required,
  requiredAriaLabel
}: IDevExpressDatePickerField) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  useEffect(() => {
    const date = value !== undefined ? new Date(value as string) : undefined;
    setSelectedDate(date);
  }, [value]);

  return (
    <div>
      {withLabel &&
        <label
          htmlFor={id}
          className="mb-1 block text-sm font-medium leading-6 text-gray-900"
        >{label}{required && <span aria-label={requiredAriaLabel}>*</span>}</label>
      }
      <DateBox
        inputAttr={{ id }}
        type="date"
        value={selectedDate}
        displayFormat={format}
        useMaskBehavior
        onValueChanged={(e) => {
          onDateChange(e.value);
        }}
        dropDownOptions={{
          hideOnParentScroll: false,
          position: {
            my: 'center',
            at: 'center',
            of: pickerContainerId
          },
          container: pickerContainerId
        }}
        disabled={disabled}
      />
    </div>
  );
}

export { DevExpressDatePickerField };
