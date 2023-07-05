import React from 'react';
import { Menu, Popup } from 'semantic-ui-react';
import { IAction } from './IAction';

type Point = { x: number, y: number };

type IParamsForAction = {
  selection: any[];
  [key: string]: any;
}
interface ContextMenuProps {
  actions: IAction[];

  paramsForAction: IParamsForAction;
  /**
   * if undefined => the menu is closed else {x, y} position where the menu should open
   */
  positionToOpen?: Point;
}

export class ContextMenu extends React.Component<ContextMenuProps, { isOpened?: boolean }> {

  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.state = {
      isOpened: props.positionToOpen
    }
  }

  componentDidUpdate(prevProps: Readonly<ContextMenuProps>, prevState: Readonly<{}>, snapshot?: any): void {
    if (this.props.positionToOpen != prevProps.positionToOpen) {
      this.setState({ isOpened: this.props.positionToOpen ? true : false });
    }
  }

  close() {
    this.setState({ isOpened: false });
  }

  getPopupContext(): HTMLElement {
    const x = this.props.positionToOpen?.x;
    const y = this.props.positionToOpen?.y;
    return {
      getBoundingClientRect: () => ({
        left: x,
        top: y,
        right: x + 1,
        bottom: y + 1,
        height: 0,
        width: 0
      })
    } as HTMLElement;
  }

  getVisisbleActions(actions: IAction[]): IAction[] {
    return actions.filter(action => action.isVisible ? action.isVisible(this.props.paramsForAction) : true);
  }

  render() {
    const visibleActions = this.getVisisbleActions(this.props.actions);
    return <Popup basic context={this.getPopupContext()} onClose={() => this.setState({ isOpened: false })} open={(this.state.isOpened && visibleActions.length > 0)}>
      <Menu secondary vertical>
        {visibleActions.map((action: IAction) => {
          return (!action.renderInMenu ?
            <Menu.Item key={visibleActions.indexOf(action)}
              icon={action.icon instanceof Function ? action.icon({ ...this.props.paramsForAction }) : action.icon} content={action.label instanceof Function ? action.label({ ...this.props.paramsForAction }) : action.label}
              onClick={() => { action.run({ ...this.props.paramsForAction, closeContextMenu: this.close }); }}>
            </Menu.Item>
            : action.renderInMenu(this.props.paramsForAction)
          );
        })
        }
      </Menu>
    </Popup>
  }
}
