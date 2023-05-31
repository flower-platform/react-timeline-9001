import React from 'react';
import PropTypes from 'prop-types';
import {ActionType} from '../timeline';

/**
 * A context menu that displays
 *  1. A title
 *  2. <ContextMenuActionEntry>s for each visible action received as parameter
 *
 * @author Daniela Buzatu
 * @extends React.Component<Timeline.propTypes>
 */
export class ContextMenu extends React.Component {
  onHover(rowIndex) {
    return function() {
      this.setState({indexOfOpenedSubMenu: rowIndex});
    };
  }

  /**
   * Intended to be called when user clicks a child actionEntry an an action is run
   */
  closeMenu() {
    this.props.closeMenu();
    if (this.props.closeParentMenu) {
      this.props.closeParentMenu();
    }
  }

  constructor() {
    this.onHover = this.onHover.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.state = {
      indexOfOpenedSubMenu: undefined
    };
  }
  static propTypes = {
    // parentContextMenu: ContextMenu,
    title: PropTypes.string,
    actions: PropTypes.arrayOf(ActionType),
    selectedItems: PropTypes.array,
    closeMenu: PropTypes.func,
    // Only for submenus
    closeParentMenu: PropTypes.func
  };
  render() {
    // TODO DB
    // Display the title if any
    // Inside a <Menu> component
    // Iterate all actions
    // Only for the visible(action.isVisible(Sslection)):
    // display for each a ContextMenuActionEntry.
    // Pass to each: the selectedItems, and the corresponding action, closeMenu = closeMenu, onHover=onHover(rowIndex),
    //                  isSubmenuOpened={index==this.state.indexOfOpenedSubMenu}
  }
}
