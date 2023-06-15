import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';
import _ from 'lodash';
import { Action } from '../types';
import { MenuActionsHolder } from '../utils/MenuActionsHolder';

export class ContextMenu extends React.Component {
  static propTypes = {
    menuActionsHolder: PropTypes.objectOf<MenuActionsHolder>,

    /**
     * For the contextMenu to be closed by a child component (clicking a runable action)
     * it needs the closeMenu function from the parent component
     *
     * @type {Function}
     */
    closeMenu: PropTypes.func
  };

  render() {return <Menu>
      {_.map((this.props as any).menuActionsHolder.getVisibleActions(), (action: Action) => {

       return (
        <Menu.Item>
            {// TODO DB ??: if implementing the submenu feature =>
             // onHover(index) = this.state.indexOfOpenedSubMenu = currentIndex, subModal.open: index==this.state.indexOfOpenedSubMenu
            !action.customRenderer ? <Menu.Item icon={action.icon} content={action.label} 
                                              onClick={() => {(this.props as any).menuActionsHolder.run(action);
                                                    action.closeMenuAfterRun && (this.props as any).closeMenu();
                                              }}></Menu.Item>
            : action.customRenderer()}
        </Menu.Item>);} 
        )}
    </Menu>
  }
}
