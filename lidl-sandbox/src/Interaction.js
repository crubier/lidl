import React, {
  PropTypes,
  Component
} from 'react';
import ItemTypes from './ItemTypes';
import {DropTarget} from 'react-dnd';
import {DragSource} from 'react-dnd';

import _ from 'lodash';
import Lidl from 'lidl';
import MultiLineFitInput from './MultiLineFitInput'


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
  border: '0px solid rgba(0, 0, 0, 0.1)',
  margin: '2px',
  padding: '2px',
  borderRadius: '4px',
  verticalAlign: 'middle',
  userSelect: 'none',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)'
};

const boxTarget = {
  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      return
    } else {
      let oldVal = component.props.val;
      component.handleDrop(monitor.getItem());
      return {
        val: oldVal
      };
    }
  }
};

const boxSource = {
  beginDrag(props) {
    return {
      val: props.val
    };
  },

  endDrag(props, monitor) {
    // const item = monitor.getItem();
    // const dropResult = monitor.getDropResult();
    //
    // if (dropResult) {
    //   window.alert( // eslint-disable-line no-alert
    //   `You dropped ${item.interaction.operator} into ${dropResult.interaction.operator}!`);
    // }
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
    val: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    indexInParent: PropTypes.number
  };

  static defaultProps = {
    indexInParent: 0
  };

  handleDrop(item) {
    this.props.onChange(item.val,this.props.indexInParent);
  }

  handleChangeInChild(valOfChild,indexOfChild) {
    var newVal = _.cloneDeep(this.props.val);
    newVal.operand[indexOfChild]=valOfChild;
    this.props.onChange(newVal,this.props.indexInParent);
  }

  handleChangeInOperator(valOfChild,indexOfChild) {
    let listElements = Lidl.interactions.toShallowListOfElements(this.props.val);
    let beg = _.slice(listElements, 0,indexOfChild);
    let end = _.slice(listElements, indexOfChild+1,listElements.length);
    let mid = valOfChild.replace(/[\(\)\$]/g,"_$_").split("_").map(function(x){
      if(x!=="$"){
        return x;
      }else {
        return {type:"InteractionSimple",formating:"",operator:"",operand:[]}
      }
    });
    listElements = _.flatten([beg,mid,end]);
    let newVal = Lidl.interactions.fromShallowListOfElements(listElements);
    this.props.onChange(newVal,this.props.indexInParent);
  }

  render() {
    const {canDrop, isOver, connectDropTarget} = this.props;
    const isActive = canDrop && isOver;
    const {isDragging, connectDragSource} = this.props;
    const {name} = this.props;
    const opacity = isDragging? 0.4: 1;

    const that = this;

    let backgroundColor = 'hsla(' + Math.abs(hashCode(this.props.val.operator)) % 360 + ', 100%, ' + (isActive
      ? '100%'
      : '94%') + ',1)';

    let listElements = Lidl.interactions
      .toShallowListOfElements(this.props.val);

    let i = -1;

    let subs = _
      .map(listElements, function(x, n) {
        if (_.isString(x)) {
          return (<MultiLineFitInput onChange={that.handleChangeInOperator.bind(that)} indexInParent={n} key={n} val={x}/>);
        } else {
          i++;
          return ( <Interaction onChange={that.handleChangeInChild.bind(that)} indexInParent={i} key={n} val={x}/>);
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
