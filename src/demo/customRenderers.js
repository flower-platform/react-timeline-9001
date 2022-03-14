import React, {Component} from 'react';
import {DefaultItemRenderer} from '../components/renderers';

export class customItemRenderer extends DefaultItemRenderer {
  getBackgroundGradient() {
    return this.getGradientColor();
  }

  getStyle() {
    let style = super.getStyle();
    if (this.props.item.row % 5 === 0) {
      style.border = '1px solid black';
    }
    return style;
  }

  getTitle() {
    return `${this.props.item.start.format('HH:mm')} - ${this.props.item.end.format('HH:mm')}`;
  }
}

export function customGroupRenderer(props) {
  const {group, ...rest} = props;

  return (
    <span data-group-index={group.id} {...rest}>
      Custom {group.title}
    </span>
  );
}

export class CustomCellRenderer extends React.Component {
  render() {
    return <span>{this.props.group.description}</span>;
  }
}

export class CustomColumnHeaderRenderer extends React.Component {
  render() {
    return <span>Description</span>;
  }
}
