import {
  render, screen
} from '@testing-library/react';
import { FieldForTest } from '.';
import userEvent from '@testing-library/user-event';

describe('Given an instance of FieldForTest', () => {
  const mockLabel = "Mock label";
  const mockName = "mockName";

  it('When rendering the component', async () => {
      render(<FieldForTest
        label={mockLabel}
        name={mockName}
      />);

    // Then the field is rendered
    expect(await screen.findByLabelText(mockLabel)).toBeInTheDocument();
  });

  it('When typing in the field', async () => {
      render(<FieldForTest
        label={mockLabel}
        name={mockName}
      />);

      const mockValue = "nex value";
      const field = await screen.findByLabelText(mockLabel);
      await userEvent.type(field, mockValue)

    // Then the value change
    expect(field).toBeInTheDocument();
    expect(field).toHaveValue(mockValue);
  });
});