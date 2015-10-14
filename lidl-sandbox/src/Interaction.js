import React, {
  PropTypes,
  Component
} from 'react';
import ItemTypes from './ItemTypes';
import {DropTarget} from 'react-dnd';
import {DragSource} from 'react-dnd';

import _ from 'lodash';
import Lidl from 'lidl';

function prepareString(str) {
  return str.replace(/\n/g, "$\n$")
    .split("$")
    .map(function(x, n) {
      if (x === "\n") {
        return <br key={n} style={{
            'userSelect': 'none'
          }}/>;
      } else {
        return <span key={n} style={{
            'userSelect': 'none'
          }}>{x
  .replace(/ /g, "\u00a0")
  .replace(/\t/g, "\u00a0\u00a0\u00a0\u00a0")}</span>;
      }
    });
}

function hashCode(str) {
  var hash = 0,
    i,
    chr,
    len;
  if (str.length == 0)
    return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

const style = {
  overflow: 'auto',
  display: 'inline-block',
  border: '0px solid rgba(0, 0, 0, 0.2)',
  margin: '4px',
  padding: '4px',
  borderRadius: '4px',
  verticalAlign: 'middle',
  userSelect: 'none',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)'
};

const boxTarget = {
  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      return
    } else {
      return {
        name: props.val.operator
      };
    }
  }
};

const boxSource = {
  beginDrag(props) {
    return {
      name: props.val.operator
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      window.alert( // eslint-disable-line no-alert
      `You dropped ${item.name} into ${dropResult.name}!`);
    }
  }
};

@DragSource(ItemTypes.Interaction, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
@DropTarget(ItemTypes.Interaction, boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver({
    shallow: true
  }),
  canDrop: monitor.canDrop()
}))
export default class Interaction extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    isDragging: PropTypes.bool.isRequired,
    val: PropTypes.object.isRequired
  };

  render() {
    const {canDrop, isOver, connectDropTarget} = this.props;
    const isActive = canDrop && isOver;
    const {isDragging, connectDragSource} = this.props;
    const {name} = this.props;
  const opacity = isDragging
    ? 0.4
    : 1;

  let backgroundColor = 'hsla(' + Math.abs(hashCode(this.props.val.operator)) % 360 + ', 100%, ' + (isActive
    ? '100%'
    : '90%') + ', 1)';

  let listElements = Lidl.interactions
    .toShallowListOfElements(this.props.val);

  let subs = _
    .map(listElements, function(x, n) {
      if (_.isString(x)) {
        return (
          <p key={n} style={{
            display: 'inline',
            userSelect: 'none'
          }}>{prepareString(x)}</p>
        );
      } else {
        return (
          <Interaction key={n} val={x}/>
        );
      }
    });

  return connectDragSource(connectDropTarget(<div style={{
      ...style,
      backgroundColor,
      opacity
    }}>
      {subs}
    </div>));
}
}
