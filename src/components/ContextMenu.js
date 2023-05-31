import React from 'react';
import PropTypes from 'prop-types';
import {ActionType} from '../timeline';

/**
 * A context menu that displays
 *  1. A title
 *  2. <ContextMenuActionEntry>s for each visible action received as parameter
 *
* The menu is closed :
* 1. By the parent component that opened it 
*      a. the gantt in case of the main menu when user clicks outside the menu, 
*      b. the contextMenuActionEntry in case of a submenu, when the user hovers another action entry that opens another submenu
*    In this cases the parent know how to close the popup because he opened it
* 2. When the user clicks a child contextMenuActionEntry that runs an Action. 
    In this case menu should have the closeMenu() function from parent component in order to close itself 
*
 * 
 * @author Daniela Buzatu
 * @extends React.Component<Timeline.propTypes>
 */
export class ContextMenu extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    actions: PropTypes.arrayOf(ActionType),

    /**
     * The items (segments) selected in gantt
     * Are passed as parameters to child <ContextMenuActionEntries>
     *
     * @type { Array.<object> }
     */
    selectedItems: PropTypes.array,

    /**
     * The context menu it is opened as a popup by its parent component:
     * 1. the gantt diagram in case of the root context menu
     * 2. a contextMenuActionEntry in case of a submenu.
     *
     * By this prop the parent let the ContextMenu to know if it is opened or not
     * When isOpened==false => the current opened submenu will close as well
     *
     * @type {boolean}
     */
    isOpened: PropTypes.boolean,

    /**
     * For the contextMenu to be closed by a child component (clicking a runable action)
     * it needs the closeMenu function from the parent component
     *
     * @type {Function}
     */
    closeMenu: PropTypes.func,

    /**
     * When this is a submenu of another menu and this menu is closed by a child component (clicking a runable action)
     * the parent menu should be closed as well
     *
     * @type {Function}
     */

    closeParentMenu: PropTypes.func
  };

  constructor() {
    this.onHover = this.onHover.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.state = {
      indexOfOpenedSubMenu: undefined
    };
  }

  /**
   * When a child actionEntry with submenu with is hovered
   * That submenu should open and any other submenu should close
   */
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

  render() {
    // TODO DB
    // Display the title if any
    // Inside a <Menu> component
    // Iterate all actions
    // Only for the visible(action.isVisible(selectedItems)):
    // display for each a ContextMenuActionEntry.
    // Pass to each: the selectedItems, and the corresponding action, closeMenu = closeMenu, onHover=onHover(rowIndex),
    //                  isSubmenuOpened={this.props.isOpened && index==this.state.indexOfOpenedSubMenu}
  }
}
