import React from 'react';
import {Cell, Column, Table} from 'fixed-data-table-2';
import 'fixed-data-table-2/dist/fixed-data-table.css';

export class TimelineTable extends React.Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    rowHeight: 50,
    tableHeight: 500,
    isColumnResizing: false,
    isColumnReordering: false,
    touchScrollEnabled: true
  };

  renderTableHeader(props, tableColumn) {
    let headerElement;
    if (tableColumn.headerLabel) {
      headerElement = tableColumn.headerLabel;
    } else if (typeof tableColumn.headerRenderer === 'object') {
      headerElement = tableColumn.headerRenderer;
    } else {
      const CustomRenderer = tableColumn.headerRenderer;
      headerElement = <CustomRenderer />;
    }
    return <Cell>{headerElement}</Cell>;
  }

  renderTableCell(props, tableColumn, groups) {
    let cellElement;
    if (tableColumn.labelProperty) {
      cellElement = tableColumn.labelProperty;
    } else if (typeof tableColumn.cellRenderer === 'object') {
      cellElement = tableColumn.cellRenderer;
    } else {
      const CustomRenderer = tableColumn.cellRenderer;
      cellElement = <CustomRenderer group={groups[props.rowIndex]} />;
    }
    return <Cell>{cellElement}</Cell>;
  }

  getTableColumnsTotalWidth(tableColumns) {
    return (
      tableColumns
        .map(tableColumn => tableColumn.width)
        .reduce((accumulator, currentWidth) => accumulator + currentWidth, 0) + 15
    );
  }

  getRowHeight(rowIndex) {
    return this.props.rowsHeights ? this.props.rowsHeights[rowIndex] : this.props.rowHeight;
  }

  render() {
    const {tableColumns, groups, table_ref_callback} = this.props;
    console.log(groups.length);

    return (
      <Table
        ref={table_ref_callback}
        rowsCount={groups.length}
        rowHeight={this.props.rowHeight}
        width={this.getTableColumnsTotalWidth(tableColumns)}
        height={this.props.tableHeight}
        headerHeight={this.props.headerHeight}
        touchScrollEnabled={this.props.touchScrollEnabled}
        isColumnResizing={this.props.isColumnResizing}
        isColumnReordering={this.props.isColumnReordering}
        rowHeightGetter={rowIndex => this.getRowHeight(rowIndex)}
        {...this.props}>
        {tableColumns.map((tableColumn, index) => (
          <Column
            key={index}
            columnKey={index}
            allowCellsRecycling
            width={tableColumn.width}
            isResizable={false}
            isReorderable={false}
            // flexGrow={index === tableColumns.length - 1 ? 1 : undefined}
            header={props => this.renderTableHeader(props, tableColumn)}
            cell={props => this.renderTableCell(props, tableColumn, groups)}
          />
        ))}
      </Table>
    );
  }
}
