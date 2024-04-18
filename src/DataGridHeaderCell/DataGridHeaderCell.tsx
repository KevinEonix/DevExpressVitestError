import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';

interface IDataGridHeaderCell {
  data: any;
  index?: number;
}

const DataGridHeaderCell = ({ data }: IDataGridHeaderCell) => {
  return (
    <div className="p-2 text-black font-bold flex items-center w-full">
      {data.column.caption}
      {data.column.sortOrder !== undefined
        ? (
            data.column.sortOrder === 'asc'
              ? (
                  <ArrowUpIcon className="ml-auto w-5 h-5 arrow-up-icon" />
                )
              : (
                  <ArrowDownIcon className="ml-auto w-5 h-5 arrow-down-icon" />
                )
          )
        : null}
    </div>
  );
};

export { DataGridHeaderCell };
