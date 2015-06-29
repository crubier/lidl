var React = require('react');
  mui = require('material-ui');

  var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

TextField=mui.TextField;
SelectField=mui.SelectField;




var SomeAwesomeComponent = React.createClass({displayName: "SomeAwesomeComponent",

  render: function() {

    return (
      React.createElement("div", null, 
      React.createElement(TextField, {
  hintText: "Hint Text"}), 
React.createElement(TextField, {
  hintText: "Hint Text", 
  defaultValue: "Default Value"}), 
React.createElement(TextField, {
  hintText: "Hint Text", 
  value: this.state.propValue, 
  onChange: this._handleInputChange}), 
React.createElement(TextField, {
  hintText: "Hint Text", 
  valueLink: this.linkState('valueLinkValue')}), 
React.createElement(TextField, {
  hintText: "Hint Text (MultiLine)", 
  multiLine: true}), 
React.createElement(TextField, {
  hintText: "Hint Text", 
  errorText: this.state.errorText, 
  onChange: this._handleErrorInputChange}), 
React.createElement(TextField, {
  hintText: "Hint Text", 
  errorText: this.state.error2Text, 
  onChange: this._handleError2InputChange, 
  defaultValue: "abc"}), 
React.createElement(TextField, {
  hintText: "Disabled Hint Text", 
  disabled: true}), 
React.createElement(TextField, {
  hintText: "Disabled Hint Text", 
  disabled: true, 
  defaultValue: "Disabled With Value"}), 

React.createElement(SelectField, {
value: this.state.selectValue, 
onChange: this._handleSelectValueChange, 
floatingLabelText: "Select Field", 
menuItems: menuItems}), 
React.createElement(SelectField, {
valueLink: this.linkState("selectValueLinkValue"), 
floatingLabelText: "Select Field", 
valueMember: "id", 
displayMember: "name", 
menuItems: arbitraryArrayMenuItems}), 
"//Floating Hint Text Labels", 
React.createElement(TextField, {
  hintText: "Hint Text", 
  floatingLabelText: "Floating Label Text"}), 
React.createElement(TextField, {
  hintText: "Hint Text", 
  defaultValue: "Default Value", 
  floatingLabelText: "Floating Label Text"}), 
React.createElement(TextField, {
  hintText: "Hint Text", 
  floatingLabelText: "Floating Label Text", 
  value: this.state.floatingPropValue, 
  onChange: this._handleFloatingInputChange}), 
React.createElement(TextField, {
  hintText: "Hint Text", 
  floatingLabelText: "Floating Label Text", 
  valueLink: this.linkState('floatingValueLinkValue')}), 
React.createElement(TextField, {
  hintText: "Hint Text (MultiLine)", 
  floatingLabelText: "Floating Label Text", 
  multiLine: true}), 
React.createElement(TextField, {
  hintText: "Hint Text", 
  errorText: this.state.floatingErrorText, 
  floatingLabelText: "Floating Label Text", 
  onChange: this._handleFloatingErrorInputChange}), 
React.createElement(TextField, {
  hintText: "Hint Text", 
  errorText: this.state.floatingError2Text, 
  defaultValue: "abc", 
  floatingLabelText: "Floating Label Text", 
  onChange: this._handleFloating2ErrorInputChange}), 
React.createElement(TextField, {
  hintText: "Disabled Hint Text", 
  disabled: true, 
  floatingLabelText: "Floating Label Text"}), 
React.createElement(TextField, {
  hintText: "Disabled Hint Text", 
  disabled: true, 
  defaultValue: "Disabled With Value", 
  floatingLabelText: "Floating Label Text"}), 
React.createElement(TextField, {
  hintText: "Custom Child input (e.g. password)", 
  defaultValue: "Custom Child input (e.g. password)", 
  floatingLabelText: "Custom Child input (e.g. password)"}, 
    React.createElement("input", {type: "password"})
), 
React.createElement(TextField, {
  hintText: "Disabled Child input (e.g. password)", 
  disabled: true, 
  defaultValue: "Custom Child input (e.g. password)", 
  floatingLabelText: "Custom Child input (e.g. password)"}, 
    React.createElement("input", {type: "password"})
)
    )
    );
  }

});

React.render(
    React.createElement(SomeAwesomeComponent, null),
    document.getElementById('example')
);
