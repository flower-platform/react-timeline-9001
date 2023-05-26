import {Column, DataCell, Table} from 'fixed-data-table-2';
import 'fixed-data-table-2/dist/fixed-data-table.css';
import React from 'react';

export class TimelineTable extends React.Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    rowHeight: 50,
    tableHeight: 500,
    touchScrollEnabled: true,
    selectedRanges: []
  };

  renderTableHeader(props, column) {
    let headerElement;
    if (column.headerRenderer) {
      if (React.isValidElement(column.headerRenderer)) {
        headerElement = column.headerRenderer;
      } else {
        headerElement = <column.headerRenderer />;
      }
    } else {
      headerElement = <this.props.groupTitleRenderer column={column} />;
    }
    return <DataCell>{headerElement}</DataCell>;
  }

  renderTableCell(props, tableColumn, groups) {
    let cellElement;
    const group = groups[props.rowIndex];
    if (tableColumn.cellRenderer) {
      if (React.isValidElement(tableColumn.cellRenderer)) {
        cellElement = tableColumn.cellRenderer;
      } else {
        cellElement = <tableColumn.cellRenderer group={group} />;
      }
    } else {
      cellElement = <this.props.groupRenderer group={group} labelProperty={tableColumn.labelProperty} />;
    }

    return <DataCell>{cellElement}</DataCell>;
  }

  render() {
    const {tableColumns, groups, table_ref_callback} = this.props;
    console.log(groups.length);

    return (
      <Table
        ref={table_ref_callback}
        rowHeight={this.props.rowHeight}
        width={this.props.width}
        height={this.props.tableHeight}
        headerHeight={this.props.headerHeight}
        touchScrollEnabled={this.props.touchScrollEnabled}
        rowHeightGetter={this.props.rowHeightGetter}
        {...this.props}>
        {tableColumns.map((tableColumn, index) => (
          <Column
            key={index}
            columnKey={index}
            allowCellsRecycling
            width={tableColumn.width}
            isResizable={false}
            isReorderable={false}
            header={props => this.renderTableHeader(props, tableColumn)}
            cell={props => this.renderTableCell(props, tableColumn, groups)}
          />
        ))}
      </Table>
    );
  }
}
