/**
 * @author Daniela Buzatu
 */
export class SelectionHolder {
  /**
   * If the host components needs access to the selected items it should use this property
   */
  selectedItems: number[] = [];

  /**
     * The host component should listen when the selection changes by passing this function
     * (for updating the item renderers).
     */
  selectionChangedHandler: () => void;

  /**
   * Should be called by the host component when an item is clicked or right clicked (contextMenu event) or when user clicks outside any selectable items (for reseting the selection),
   * or any other user action intended to select items happens
   * (e.g. in gantt: drawing selection rectangle)
   * It adds/removes from selection (in case of multiple selection) or set the selection (in case of single selection)
   * 
   * Usually the right click on the host component works just as a left click regarding the selection.  So the host component calls should be the same in both click cases 
   */
  addRemoveItems(itemsKeys: number[], event: MouseEvent) {
    if (event.type == "contextmenu") {
      if (itemsKeys.length == 1 && this.selectedItems.includes(itemsKeys[0])) {
        // right click on a selected item => doesn't change the selection
        return;
      }
    }

    let newSelection;
    if (!(event.ctrlKey || event.shiftKey)) {
        // Single selection
        newSelection = [...itemsKeys];
    } else {
      // Multiple selection
      const oldSelection = this.selectedItems;
      newSelection = oldSelection.slice();
      itemsKeys.forEach(function(itemKey) {
        const idx = newSelection.indexOf(itemKey);
        if (idx > -1) {
          // already in selection => remove it
          newSelection.splice(idx, 1);
        } else {
          // not in selection => add it
          newSelection.push(itemKey);
        }
      });
    }
    this.selectedItems = newSelection;

    // Notify the host component about selection change
    if (this.selectionChangedHandler) {
      this.selectionChangedHandler();
    }
  }
}
