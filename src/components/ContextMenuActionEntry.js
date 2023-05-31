import React from 'react';
import {ActionType} from '../timeline';
import PropTypes from 'prop-types';

/**
 * This is a context menu entry that displayes:
 *  1. A Menu.Item with an icon and a title
 *  3. A different content depending if is a:
 *      a. Simple running actions
 *      b. Action that opens submenus
 *
 * @author Daniela Buzatu
 */
export class ContextMenuActionEntry extends React.Component {
  static propTypes = {
    action: ActionType,
    selectedItems,
    closeMenu: PropTypes.func,
    // Needed for actions with submenus
    isSubmenuOpened: PropTypes.bool,
    onHover: PropTypes.func
  };

  // For entries that opens a submenu
  closeSubmenu() {
    this.setState({isSubmenuOpened: false});
  }

  constructor(props) {
    this.closeSubmenu = this.closeSubmenu.bind(this);
    this.state = {
      isSubmenuOpened: this.props.isSubmenuOpened
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const {isSubmenuOpened} = this.props;

    // TODO DB
    if (isSubmenuOpened) {
      this.setState({isSubmenuOpened});
    }
  }

  render() {
    // Displayes a Menu.Item
    // With an icon from action.icon
    // With a label from action.label
    // If the action.subActions =>
    //      1. display an submenu arrow
    //      2. have a <Popup open={this.state.isSubmenuOpen}><ContextMenu isOpened={this.state.isSubmenuOpen} actions = action.subActions closeParentMenu="this.props.closeMenu" closeMenu = "this.closeSubmenu"/> <Popup>
    //      3. onHover delegate to parent that will set isSubMenuOpened=true for this entry and isSubMenuOpened=false for others
    // else
    //      1. onClick => execute action.run(selectedItems), close the menu this.props.closeMenu()
  }
}
