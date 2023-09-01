import { DataCell } from 'fixed-data-table-2';
import React from 'react';
import { GanttContext } from '../utils/GanttContext';

export interface GanttDataCellProperties {
    rowIndex: number,
    content: () => string | React.ReactNode
}

export class GanttDataCell extends React.Component<GanttDataCellProperties> {
    static contextType = GanttContext;
    context!: React.ContextType<typeof GanttContext>;

    render(): React.ReactNode {
        const {rows} = this.context;
        return this.props.rowIndex < rows.length ? <DataCell>{this.props.content()}</DataCell> : <DataCell></DataCell>; 
    }
}