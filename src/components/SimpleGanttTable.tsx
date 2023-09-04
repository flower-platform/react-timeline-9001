import React from "react";
import { Table, Column, DataCell } from 'fixed-data-table-2';
import { GanttDataCell } from "./GanttDataCell";
import { GanttContext } from "../utils/GanttContext";

export interface SimpleGanttTableProperties {
    field: string,
    header?: string | React.ReactNode
    width?: number
}

/**
 * @author Daniela Buzatu
 */
export class SimpleGanttTable extends React.Component<SimpleGanttTableProperties> {
    static contextType = GanttContext;
    static defaultProps = {
        width: 130,
        header: undefined
    }

    context!: React.ContextType<typeof GanttContext>;

    render(): React.ReactNode {
        const { rows, configureTable } = this.context;
        return (
            configureTable(
                <Table width={this.props.width}>
                    <Column
                        columnKey="title"
                        flexGrow={1}
                        width={this.props.width}
                        header={<DataCell>{this.props.header ? this.props.header : ""}</DataCell>}
                        cell={({ rowIndex }) => <GanttDataCell rowIndex={rowIndex} content={() => rows[rowIndex][this.props.field]} />} />
                </Table>
            )
        );
    }

}