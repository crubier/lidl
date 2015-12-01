import React, {
  Component,
  PropTypes
}
from 'react';

import _ from 'lodash';

function shadow(element) {
  var node = document.createElement('span');
  var style = window.getComputedStyle(element);

  node.style.fontFamily = style.fontFamily;
  node.style.fontSize = style.fontSize;
  node.style.fontStyle = style.fontStyle;
  node.style.fontWeight = style.fontWeight;
  node.style.fontKering = style.fontKering;
  node.style.fontStretch = style.fontStretch;
  node.style.letterSpacing = style.letterSpacing;
  node.style.textTransform = style.textTransform;

  node.style.position = 'absolute';
  node.style.top = '-100%';
  node.style.display = 'inline-block';
  node.style.padding = 0;
  node.style.whiteSpace = 'nowrap';

  node.style.width = 'auto';

  document.body
    .appendChild(node);

  return node;
}

// normalize input value
function normalize(value) {
  return (null === value ? '' : value + '');
}


export default class FitInput extends Component {

  constructor(props){
    super(props);
  }

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    value: '',
    indexInParent: 0
  };

  state = {
    value: normalize(this.props.value)
  }

  componentDidMount() {
    this.element = this.refs.theInput;
    this.shadow = shadow(this.element);
    this.element.style.width = this.getWidth();
  }

  componentWillUnmount() {
    document.body
      .removeChild(this.shadow);
  }

  componentWillReceiveProps(props) {
    this.setState({
      value: normalize(props.value)
    });
  }

  render() {

    return <input ref = 'theInput'
    style = {
      {
        border: 'none',
        fontFamily: 'Roboto',
        fontWeight: '300',
        fontSize: '14px',
        backgroundColor: 'rgba(0 , 0, 0, 0)', //((_.trim(this.state.value) === "") ? 'rgba(0 , 0, 0, 0.05)' : 'rgba(0 , 0, 0, 0)'),
        width: this.getWidth()
      }
    }
    value = {
      this.state.value
    }
    onChange = {
      this.onChange.bind(this)
    }
    onKeyDown = {
      this.onKeyPress.bind(this)
    }
    type = {
      'text'
    }
    />;

  }

  onKeyPress(event)  {
    if (event.key === "Enter") {
      this.props.onChange({
        index: this.props.indexInParent,
        newValue: (event.target.value.slice(0, event.target.selectionStart) +
          '\n' +
          event.target.value.slice(event.target.selectionEnd, event.target.value.length))
      });
      event.stopPropagation();
    } else if (event.key === "Tab") {
      this.props.onChange({
        index: this.props.indexInParent,
        newValue: (event.target.value.slice(0, event.target.selectionStart) +
          '    ' +
          event.target.value.slice(event.target.selectionEnd, event.target.value.length))
      });
      event.preventDefault();
      event.stopPropagation();
    } else if (event.key === "Backspace") {
      if (event.target.selectionStart === 0 && event.target.selectionEnd === 0) {
        this.props.onChange({
          index: this.props.indexInParent,
          removePreviousCharacter: true
        });
      }
      event.stopPropagation();
    }
  }

  onChange(event) {
    this.props.onChange({
      index: this.props.indexInParent,
      newValue: event.target.value
    });
  }

  getWidth() {
    if (!this.shadow)
      return 0;
    var string = this.state.value;

    if (string === '' && this.props.placeholder)
      string = this.props.placeholder;

    // use non breaking space
    this.shadow.textContent = string.replace(/ /g, '\xA0');
    // add 1px for caret width
    return this.shadow.clientWidth + 1 + 'px';
  }

  focus() {
    this.element
      .focus();
  }
}
