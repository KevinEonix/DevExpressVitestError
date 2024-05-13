import {cleanup, render, screen} from '@testing-library/react';
import {FormForTest} from "@/FormForTest";
import userEvent from "@testing-library/user-event";

describe('Form test', () => {
    afterEach(() => {
        cleanup()
    })

    it('When rendering the form', async () => {
        render(<FormForTest />);

        // Then the form is rendered
        expect(await screen.findByRole('combobox')).toBeInTheDocument();
    });

    it('When typing in the field', async () => {

        render(<FormForTest />);
        const testStr = 'test';

        const field = await screen.findByLabelText('Test field label');
        await userEvent.type(field, testStr);

        // Then the value should change
        expect(field).toHaveValue(testStr);
    });
});