import React, {
  PropTypes,
  Component
} from 'react';
import ReactDOM from 'react-dom';

import BlockCodeEditor from './BlockCodeEditor/BlockCodeEditor';
import CodeEditor from './CodeEditor/CodeEditor';
import Graph from './Graph/Graph';
import View from './FlexContainer/FlexContainer';
import ScenarioEditor from './ScenarioEditor/ScenarioEditor';
import HeaderEditor from './HeaderEditor/HeaderEditor';
import ErrorDisplay from './ErrorDisplay/ErrorDisplay';
import Canvas from './Canvas/Canvas';
import Analysis from './Analysis/Analysis';
import GeneratedCodeViewer from './GeneratedCodeViewer/GeneratedCodeViewer';

import _ from 'lodash';

import {Accordion,AccordionItem} from 'react-sanfona';

import initialState from './initialState'

// Create a web worker which will do the heavy lifting tasks
var work = require('webworkify');
var w = work(require('./worker.js'));


export default class Main extends Component {

  constructor(props){
    super(props);

    let that = this;

    // Listen to the web worker events
    w.addEventListener('message', function (ev) {
      switch(ev.data.type) {
            case 'compilationError':
              that.setState({lidlCodeError:ev.data.message});
              break;
            case 'compilationResult':
              that.setState({lidlCodeError:null,generatedCode:ev.data.source});
              // console.log(ev.data.partialSource.transitionFunction);
              break;
          }
    });

    // Debounce the change methods in order to speed up text editing
    this.lidlCodeChanged = _.debounce(this.lidlCodeChanged,1000);
    this.headerCodeChanged = _.debounce(this.headerCodeChanged,1000);

  }

  state = initialState;

  lidlCodeChanged(newCode) {
    this.setState({lidlCode:newCode});
    w.postMessage({type:'compile',code:newCode,header:this.state.headerCode})
  }


  headerCodeChanged(newCode) {
    this.setState({headerCode:newCode});
    w.postMessage({type:'compile',code:this.state.lidlCode,header:newCode});
  }

  render() {
    return (
// <View layout={'row'}>
      <Accordion allowMultiple={true}>
        {[
          <AccordionItem title={"Lidl code editor"} key={1}><CodeEditor value={this.state.lidlCode} onChange={this.lidlCodeChanged.bind(this)}/></AccordionItem>,
          <AccordionItem title={"Lidl block code editor"} key={2}><BlockCodeEditor/></AccordionItem>,
          <AccordionItem title={"Scenario editor"} key={3}><ScenarioEditor/></AccordionItem>,
          <AccordionItem title={"Header editor"} key={4}><HeaderEditor value={this.state.headerCode} onChange={this.headerCodeChanged.bind(this)}/></AccordionItem>,
          <AccordionItem title={"Errors"} key={5}><ErrorDisplay lidlCodeError={this.state.lidlCodeError}/></AccordionItem>,
          <AccordionItem title={"Analysis"} key={6}><Analysis/></AccordionItem>,
          <AccordionItem title={"Graph"} key={7}><Graph/></AccordionItem>,
          <AccordionItem title={"Generated code"} key={8}><GeneratedCodeViewer value={this.state.generatedCode}/></AccordionItem>,
          <AccordionItem title={"Canvas"} key={9}><Canvas/></AccordionItem>
      ]}
      </Accordion>
//       <Accordion allowMultiple={true}>
//         {[
//           <AccordionItem title={"Lidl Code editor"} key={1}><CodeEditor/></AccordionItem>,
//           <AccordionItem title={"Lidl Block Code editor"} key={2}><BlockCodeEditor/></AccordionItem>,
//           <AccordionItem title={"Scenario editor"} key={3}><ScenarioEditor/></AccordionItem>,
//           <AccordionItem title={"Header editor"} key={4}><HeaderEditor/></AccordionItem>,
//           <AccordionItem title={"Errors"} key={5}><ErrorDisplay/></AccordionItem>,
//           <AccordionItem title={"Analysis"} key={6}><Analysis/></AccordionItem>,
//           <AccordionItem title={"Graph"} key={7}><Graph/></AccordionItem>,
//           <AccordionItem title={"Canvas"} key={8}><Canvas/></AccordionItem>
//       ]}
//       </Accordion>
// </View>

        );

  }
}



ReactDOM.render(<Main/>, document.getElementById("main"));




// Compiler worker


//
// function compile(source,header) {
//   w.postMessage({type:'compile',code:source,header:header}); // send the worker a message
// }
//
// var header = "var isActive = function(x) {  return (x !== null && x !== undefined);};var cool = function(x) {  if (isActive(x[0]) && isActive(x[1])) {    return {      sum: (x[0] + x[1]),      diff: (x[0] - x[1])    };  } else {    return {      sum: inactive,      diff: inactive    };  }};var fallback = function(x) {  return (isActive(x[0]) ? x[0] : x[1]);};var return0 = function(x) {  return 0;};var return1 = function(x) {  return 1;};var addition = function(x) {  if (isActive(x[0]) && isActive(x[1])) {    return x[0] + x[1];  } else {    return inactive;  }};var addOne = function(x) {  if (isActive(x))    return x + 1;  else {    return inactive;  }};var identity = function(x) {  return x};var isEqual = function(x) {  if (isActive(x.a) && isActive(x.b)) {    return (x.a===x.b)?true:false;  } else {    return inactive;  }};var boolNot = function(x) {  if (isActive(x) ) {    return !x;  } else {    return inactive;  }};var ifThenElse = function(x) {  if (isActive(x) ) {    if (isActive(x.cond) ) {      if(x.cond ===true) {        return x.a;      } else if(x.cond ===false) {        return x.b;      } else {        return inactive;      }    } else {      return inactive;    }  } else {    return inactive;  }};var whenThenElse = function(x) {  if (isActive(x) ) {    if (isActive(x.cond) ) {      if(x.cond === true) {        return {a:active,b:inactive};      } else if(x.cond ===false) {        return {a:inactive,b:active};      } else {        return inactive;      }    } else {      return inactive;    }  } else {    return inactive;  }};var all = function(x) {  return {a:x,b:x,c:x,d:x,e:x,f:x,g:x,h:x,i:x,j:x,k:x,l:x,l:x,n:x,o:x,p:x}};";

// compile("interaction (bob):{theNumber:Number in,theOther:Number in, theResult:Number out, theLast:Number out}is({theNumber:(variable theNumber)theOther:(variable theNumber)theResult:(variable theNumber)theLast:(variable theNumber)})",header);
