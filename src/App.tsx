import {useRef} from 'react'
import './App.css'
import {DataGrid} from "devextreme-react";
import {Column, FilterRow, Pager, Paging, Sorting, Toolbar} from "devextreme-react/data-grid";
import {DataGridHeaderCell} from "./DataGridHeaderCell";
import {DataGridColumnCell} from "./DataGridColumnCell";

import {DocumentPlusIcon, TrashIcon} from '@heroicons/react/20/solid';
import 'devextreme/dist/css/dx.light.css';
import {DevExpressRichTextEditor} from "./DevExpressRichTextEditor";
import {FormForTest} from "@/FormForTest";

function App() {
    const dataGridRef = useRef<DataGrid>(null);

    const mockedData = [{
        name: 'Test Name',
        content: 'Test content'
    },
    {
        name: 'Test Name 2',
        content: 'Test content 2'
    },
    {
        name: 'Test Name 3',
        content: 'Test content 3'
    }];

  return (
    <>
      <h1>Test data grid</h1>
        <DataGrid
            errorRowEnabled={false}
            ref={dataGridRef}
            dataSource={mockedData}
            className="table-auto rounded-lg overflow-hidden mt-4 p-5 bg-white text-black"
            hoverStateEnabled
            wordWrapEnabled
            width="100%"
            noDataText="No data"
            cacheEnabled={false}
        >
            <Sorting
                mode="single"
                ascendingText="Sort asc"
                descendingText="Sort desc"
                clearText="Clear sort"
            />
            <FilterRow visible/>
            <Pager
                allowedPageSizes={[1, 10, 25, 50, 100]}
                visible={false}
            />
            <Paging
                enabled
                defaultPageSize={10}
            />
            <Toolbar visible={false}/>
            <Column
                dataField="name"
                dataType="string"
                headerCellComponent={DataGridHeaderCell}
                cellComponent={DataGridColumnCell}
                caption="Name"
                calculateDisplayValue={data => data.name}
                width="auto"
            />
            <Column
                dataField="content"
                dataType="string"
                headerCellComponent={DataGridHeaderCell}
                cellComponent={DataGridColumnCell}
                caption="Content"
                calculateDisplayValue={data => data.content}
                width="auto"
            />
            <Column
                dataField="actions"
                allowFiltering={true}
                allowHiding={false}
                allowExporting={false}
                caption="Actions"
                alignment="center"
                type="buttons"
                headerCellComponent={DataGridHeaderCell}
                cellRender={({ row }) => {
                    return (
                        <div
                            className="flex items-center justify-center"
                            role="group"
                        >
                            <button
                                className="p-1 rounded-md bg-blue-800 hover:bg-blue-900 text-white ml-2"
                                value={row.rowIndex}
                            >
                                <DocumentPlusIcon className="inline-block w-5 h-5" />
                            </button>
                            <button
                                className="p-1 rounded-md bg-blue-800 hover:bg-blue-900 text-white ml-2"
                                value={row.rowIndex}
                            >
                                <TrashIcon className="inline-block w-5 h-5" />
                            </button>
                        </div>
                    );
                }}
            />
        </DataGrid>

        <DevExpressRichTextEditor
            fileName="Test"
            isDocumentFileUpdating={false}
            renderLoader={() => <span>Loading</span>}
        />

        <FormForTest />
    </>
  )
}

export default App
