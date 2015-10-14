var React = require('react');
var iii = require('iii');


function findErrorInteraction(Interaction){

  try{
    iii.parser.parse(Interaction);
    console.log("parse",iii.parser.parse(Interaction));
    iii.compiler.compileToIii(Interaction);

    return  "";
  }catch(error) {
    console.log("catch")
    if(error.message){
      return error.message;
    } else{
      return error
    }
  }
}

class InteractionEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  interactionChanged(e) {
    console.log("changed")
    this.props.onInteractionChange(e.target.value);

  }

  render() {
    var errorClasse;
    var errorMessage;
    console.log("state",this.props.Interaction)
    var errInteraction=findErrorInteraction(this.props.Interaction);
    if(errInteraction==""){
        errorClasse="info";
        errorMessage="Valid Interaction";
      }else{
        console.log("cc")
        errorClasse="error";
        errorMessage=errInteraction;
      }

    return (

      <div  className="interactionEditor" >
    <textarea defaultValue={this.props.Interaction} name="interaction" onChange={this.interactionChanged.bind(this)} />

    <p className ={errorClasse }>{errorMessage}</p>
          </div>
    );
  }
  }

  InteractionEditor.propTypes = {

    Interaction: React.PropTypes.string,


  };

  InteractionEditor.defaultProps = {

    Interaction: "interaction (test):Number in  is (#0)",

  };

  module.exports = InteractionEditor;
