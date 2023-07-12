import React from "react"

export interface IActionParam {
    selection: any[]
}

export interface IActionParamForRun {
    closeContextMenu: () => void
}

export interface IOnContextMenuShowParam {
    actionParam: IActionParam
    // poate mai bagam pe viitor chestii aici; precum posib de alte customizari; precum o functie de render pentru context menu
}

/**
 * This is a descriptor passed by the user to define an action entry in the context menu.
 * Can have a `run` function that will be called when user will clicks the corresponding menu entry. 
 * It will receive a parameter containing things like: current selection, a close menu function to be run after clicking the action
 */
export interface IAction {
    isVisible?: (param: IActionParam) => boolean,
    icon?: string | ((param: IActionParam) => string),
    label?: string | ((param: IActionParam) => string),
    run?: (param: IActionParamForRun) => void,
    renderInMenu?: (param: IActionParamForRun) => React.ReactElement
}
