import { DateBox } from 'devextreme-react';
import { useEffect, useState } from 'react';

interface IDevExpressDateTimePickerField {
  label: string;
  id: string;
  format: string;
  pickerContainerId?: string;
  onChange: (date: Date) => void;
  value?: string;
  required?: boolean;
  requiredAriaLabel?: string;
  minDate?: Date;
}

function DevExpressDateTimePickerField({
  label,
  id,
  format,
  pickerContainerId,
  onChange,
  value,
  required,
  requiredAriaLabel,
  minDate
}: IDevExpressDateTimePickerField) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  useEffect(() => {
    const date = value !== undefined ? new Date(value as string) : undefined;
    setSelectedDate(date);
  }, [value]);

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium leading-6 text-gray-900"
      >{label}{required && <span aria-label={requiredAriaLabel}>*</span>}</label>
      <DateBox
        inputAttr={{ id }}
        type="datetime"
        value={selectedDate}
        displayFormat={format}
        useMaskBehavior
        onValueChanged={(e) => {
          e.event?.preventDefault();
          e.event?.stopImmediatePropagation();
          onChange(e.value);
        }}
        min={minDate}
        dropDownOptions={{
          hideOnParentScroll: false,
          position: {
            my: 'center',
            at: 'center',
            of: pickerContainerId
          },
          container: pickerContainerId
        }}
        isValid={true}
      />
    </div>
  );
}

export { DevExpressDateTimePickerField };