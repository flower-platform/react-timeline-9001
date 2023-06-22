/**
 * TODO DB: Selection logic for mobile - to discuss with CS
 * 
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
   * TODO DB: ask CS: in windows explorer right click works different in one special case: ctrl + simple right click (but not shift + simple right click, and not ctrl + right click selection rectangle)
   */
  addRemoveItems(itemsKeys: number[], event: MouseEvent) {
    console.log("********" + itemsKeys.length + ": "+ itemsKeys);
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
