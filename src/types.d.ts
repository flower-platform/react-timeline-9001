export type Column = {
    labelProperty: string,
    cellRenderer: Function | JSX.Element,
    headerLabel: string,
    headerRenderer: Function | JSX.Element,
    width: number
}

export type Group = {
    id: number,
    title?: string
}

export type InteractOption = {
    draggable?: object,
    pointerEvents?: object,
    resizable?: object
}

export type Item = {
    key: number | string,
    row: number,
    start?: number | object,
    end?: number | object
}

export type RowLayer = {
    start?: number | object,
    end?: number | object,
    rowNumber: number,
    style: object
}