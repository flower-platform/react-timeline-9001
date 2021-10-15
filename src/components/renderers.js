import React from 'react';

/**
 * Default item renderer class
 * @param {object} props - Component props
 * @param {object} props.item - The item to be rendered
 * @param {string} props.item.title - The item's title
 * @param {?...object} props.rest - Any other arguments for the span tag
 */
export const DefaultItemRenderer = props => {
  const {item, ...rest} = props;

  return (
    <span {...rest} title={item.tooltip ? item.tooltip : ''}>
      <span className="rct9k-item-renderer-inner">{item.title}</span>
    </span>
  );
};

/**
 * Default group (row) renderer class
 * @param {object} props - Component props
 * @param {string} props.dataKey - The key of the data from group that should be rendered
 * @param {object} props.group - The group to be rendered
 * @param {string} props.group.title - The group's title
 * @param {string} props.group.id - The group's id
 * @param {?...object} props.rest - Any other arguments for the span tag
 */
export class DefaultGroupRenderer extends React.Component {
  getTitle() {
    const {dataKey, group} = this.props;
    // If dataKey is missing, return title field from group.
    if (dataKey == undefined || dataKey == null || dataKey == '') {
      return group.title;
    }

    return group[dataKey];
  }

  render() {
    const {group, dataKey, ...rest} = this.props;
    return (
      <span data-group-index={group.id} {...rest}>
        <span>{this.getTitle()}</span>
      </span>
    );
  }
}
