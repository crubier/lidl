import React, {
PropTypes,
Component
}
from 'react';

import _ from 'lodash';
import FitInput from './FitInput'


export default class MultiLineFitInput extends Component {
  static propTypes = {
    val: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    indexInParent: PropTypes.number.isRequired
  };

  static defaultProps = {
    type: 'text',
    value: '',
    indexInParent: 0
  };

  onChange(event ) {
    let indexOfChild = event.index;
    if(event.hasOwnProperty("newValue")) {
      let newVal = this.props.val.replace(/\n/g, "$\n$").split("$");
      newVal[indexOfChild]=event.newValue;
      newVal = newVal.join('');
      this.props.onChange(newVal,this.props.indexInParent);
    } else if(event.hasOwnProperty("removePreviousCharacter")) {
      if(indexOfChild>0){
        let newVal = this.props.val.replace(/\n/g, "$\n$").split("$");
        newVal[indexOfChild-1]=newVal[indexOfChild-1].substring(0,newVal[indexOfChild-1].length-1);
        newVal = newVal.join('');
        this.props.onChange(newVal,this.props.indexInParent);
      } else {

      }
    }
  }

  render() {

    let that=this ;

      let lst = this.props.val.replace(/\n/g, "$\n$")
        .split("$")
        .map(function(x, n) {
          if (x === "\n") {
            return <br key={n}/>;
          } else {
            return <FitInput indexInParent={n} onChange={that.onChange.bind(that)} key={n} value={x.replace(/ /g, "\u00a0").replace(/\t/g, "\u00a0\u00a0\u00a0\u00a0")}/>;
          }
        });

      return ( <p style = {{ display: 'inline', userSelect: 'none'}} > {lst} < /p>);
  }
}
