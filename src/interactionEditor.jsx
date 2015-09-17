var React = require('react');
var iii = require('iii');

class InteractionEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  interactionChanged(e) {
    this.props.onInteractionChange(e.target.value);
  }

  render() {
    return (

      <div  className="interactionEditor" style={{
        display: this.props.openedTab === 1
          ? 'inline-block'
          : 'none',
          overflow:"auto",
      }} >
    <textarea style={{
      display: this.props.openedTab === 1
        ? 'inline-block'
        : 'none',
        overflow:"auto",
    }} className={this.props.errorInteraction !== ""
      ? "error"
      : ""} defaultValue={this.props.Interaction} name="interaction" onChange={this.interactionChanged.bind(this)} />

    <div className="errorScenario" style={{
      display: this.props.openedTab === 1
        ? 'inline-block'
        : 'none',
        overflow:"auto",
    }} >{this.props.errorInteraction}</div>
          </div>
    );
  }
  }

  InteractionEditor.propTypes = {
    errorInteraction: React.PropTypes.string,
    Interaction: React.PropTypes.string,
    openedTab: React.PropTypes.number,

  };

  InteractionEditor.defaultProps = {
    errorInteraction: "",
    Interaction: "interaction (test):{time:Number in,dimension:{width:Number in, height:Number in}, mouse:{buttons:Number in,position:{x:Number in ,y:Number in},wheel:{x:Number in ,y:Number in,z:Number in}},keyboard:{Enter: Number in, Meta: Number in, Control: Number in, Alt: Number in, Shift: Number in, Left: Number in, Down: Number in, Right: Number in, Up: Number in}} with interaction (a):Number out is (previous(#a)) is ({x:(a),y:(#a),z:(#b)})",
    openedTab:0
  };

  module.exports = InteractionEditor;
