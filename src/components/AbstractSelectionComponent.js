import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

/**
 * This Component is meant to wrap any base component that needs logic for selecting items
 * The base component should listen for click and right click events and notify the selection component about this events by calling
 * <code>onItemClickHandler</code>, <code>onItemRightClickHandler</code> and onOutsideClickHandler() (via the React.createRef() ref mechanism)
 *
 * The selection component notifies the base component via onSelectionChangeHandler about selection change and the base component can acces
 * the selected items via getSelectedItems()
 *
 * If the base component has any additional selection logic (e.g. selection rectangle as in case of gantt) it should call selectionComponent.setSelectedItems()
 *
 * TODO DB: Selection logic for mobile - to discuss with CS
 */
export class AbstractSelectionComponent extends React.Component {
  static propTypes = {
    /**
     * The base component should listen when the selection changes by passing this function
     * (for updating the item renderers).
     */
    onSelectionChangeHandler: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      isShilftCtrlPressed: false
    };
  }

  /**
   * If the base components needs access to the selected items it should use this getter
   *
   * @returns
   */
  getSelectedItems() {
    return this.state.selectedItems;
  }

  /**
   * The base component can have its own additional logic for selection (e.g. gantt uses a selection rectangle)
   * but should call this after computing the new seelcted items
   */
  setSelectedItems(selectedItems) {
    // TODO DB: implemenet this
    this.setState({selectedItems});
    this.props.onSelectionChanged(selectedItems);
  }

  /**
   * Checks if shift or ctrl was pressed. Change the isShilftCtrlPressed state
   *
   * @param {*} element
   */
  onkeyDown(element) {
    //TODO DB implement this
  }

  /**
   * Should be called by the base component when an item is clicked
   * It adds/removes from selection (in case of multiple selection) or set the selection (in case of single selection)
   */
  onItemClickHandler(itemKey) {
    let newSelection;
    const {selectedItems} = this.state;
    if (this.state.isShilftCtrlPressed) {
      // Single selection
      newSelection = [itemKey];
    } else {
      // Multiple selection
      newSelection = selectedItems.slice();
      const idx = selectedItems.indexOf(itemKey);
      if (idx > -1) {
        // already in selection => remove it
        newSelection.splice(idx, 1);
      } else {
        // not in selection => add it
        newSelection.push(Number(itemKey));
      }
    }

    this.setState({selectedItems: newSelection});

    // notify the base component about seelction change
    this.props.onSelectionChanged(newSelection);
  }

  /**
   * Should be called by the base component when an item is right clicked (contextMenu event)
   * Select the right clicked element if is not already selected
   */
  onItemRightClickHandler(itemKey) {
    if (selectedItems.indexOf(itemKey) < 0) {
      const newSelection = {selectedItems: [itemKey]};
      this.setState(newSelection);
      // notify the base component about seelction change
      this.props.onSelectionChanged(newSelection);
    }
  }

  /**
   * Should be called by the base component when a click happens outside the selected items
   * It unselects everything + it notifies the base component about selection change
   */
  onOutsideClickHandler() {
    //TODO DB: implement this
  }

  render() {
    const child = React.Children.only(this.props.children);
    return <Fragment>{React.cloneElement(child, {onkeyDown: this.onkeyDown})}</Fragment>;
  }
}
