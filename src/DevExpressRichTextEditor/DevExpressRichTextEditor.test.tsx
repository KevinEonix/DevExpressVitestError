import {
  cleanup, render, screen, waitFor
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { DevExpressRichTextEditor } from './DevExpressRichTextEditor';

describe('Given an instance of DevExpressRichTextEditor', () => {
  const mockOnEdit = vi.fn(() => Promise.resolve(true));
  const mockOnSaving = vi.fn();
  const mockOnErrorSaving = vi.fn();

  afterEach(() => {
    cleanup();
    mockOnEdit.mockClear();
    mockOnSaving.mockClear();
    mockOnErrorSaving.mockClear();
  });

  it('When rendering the component', async () => {
    render(
      <DevExpressRichTextEditor
        fileName="mock-file.docx"
        isDocumentFileUpdating={false}
        renderLoader={() => <p>loading</p>}
      />
    );

    // Then the editor is rendered
    expect(await screen.findByRole('button', { name: 'Update file' })).toBeInTheDocument();
  }, {repeats: 5});

  it('When clicking on the edit button', async () => {
    const mockedFile = new File(['content'], 'mock-file.txt', { type: 'text/plain' });

    render(
      <DevExpressRichTextEditor
        fileName="mock-file.docx"
        isDocumentFileUpdating={false}
        renderLoader={() => <p>loading</p>}
        onEditRequest={mockOnEdit}
        file={mockedFile}
      />
    );

    const editButton = await screen.findByRole('button', { name: 'Update file' });
    await userEvent.click(editButton);

    // Then the editor switch to edit mode
    expect(mockOnEdit).toHaveBeenCalled();
    await waitFor(() => {
      const selectedButton = screen.queryByRole('tab', { selected: true });
      expect(selectedButton).toBeInTheDocument();
      expect(selectedButton).toHaveTextContent('Home');
    });
  }, {repeats: 5});
});
