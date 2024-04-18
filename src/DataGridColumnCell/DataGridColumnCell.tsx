interface IDataGridColumnCell {
  data: any;
  index?: number;
}
function DataGridColumnCell({ data }: IDataGridColumnCell) {
  return (
    <div className="w-full h-full">
      {data.displayValue instanceof Date ? data.text : data.displayValue}
    </div>
  );
}

export { DataGridColumnCell };
