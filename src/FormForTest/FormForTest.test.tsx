import {cleanup, render, screen} from '@testing-library/react';
import {FormForTest} from "@/FormForTest";

describe('Form test', () => {
    afterEach(() => {
        cleanup()
    })

    it('When rendering the form', async () => {
        render(<FormForTest />);

        // Then the form is rendered
        expect(await screen.findByRole('combobox')).toBeInTheDocument();
    });
})