import { Action } from "../types";
import { SelectionHolder } from "./SelectionHolder";

export class MenuActionsHolder {
    public actions : Action[];
    public selectionHolder : SelectionHolder;

    MenuActionsHolder(selectionHolder: SelectionHolder) {
        this.selectionHolder = selectionHolder;
    }

    getVisibleActions() {
        this.actions.filter(action => action.isVisible(this.selectionHolder.selectedItems));
    }

    run(action) {
        action.run(this.selectionHolder.selectedItems);
    }

}