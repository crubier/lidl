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
import ErrorDisplay from './ErrorDisplay/ErrorDisplay';
import Canvas from './Canvas/Canvas';
import Analysis from './Analysis/Analysis';



export default class Main extends Component {

  constructor(props){
    super(props);
  }

  state =  {
    code: {},
    scenario: {},
    compiled:{}
  };

  render() {
    return (

        <View column>
          <CodeEditor/>
          <BlockCodeEditor/>
          <ErrorDisplay/>
          <Analysis/>
          <ScenarioEditor/>
          <Canvas/>
          <Graph/>
        </View>

    );
  }
}

// <BlockCodeEditor/>
ReactDOM.render(<Main/>, document.getElementById("main"));




// Compiler worker

var work = require('webworkify');
var w = work(require('./worker.js'));

function compile(source,header) {
  w.postMessage({type:'compile',code:source,header:header}); // send the worker a message
}

var header = "var isActive = function(x) {  return (x !== null && x !== undefined);};var cool = function(x) {  if (isActive(x[0]) && isActive(x[1])) {    return {      sum: (x[0] + x[1]),      diff: (x[0] - x[1])    };  } else {    return {      sum: inactive,      diff: inactive    };  }};var fallback = function(x) {  return (isActive(x[0]) ? x[0] : x[1]);};var return0 = function(x) {  return 0;};var return1 = function(x) {  return 1;};var addition = function(x) {  if (isActive(x[0]) && isActive(x[1])) {    return x[0] + x[1];  } else {    return inactive;  }};var addOne = function(x) {  if (isActive(x))    return x + 1;  else {    return inactive;  }};var identity = function(x) {  return x};var isEqual = function(x) {  if (isActive(x.a) && isActive(x.b)) {    return (x.a===x.b)?true:false;  } else {    return inactive;  }};var boolNot = function(x) {  if (isActive(x) ) {    return !x;  } else {    return inactive;  }};var ifThenElse = function(x) {  if (isActive(x) ) {    if (isActive(x.cond) ) {      if(x.cond ===true) {        return x.a;      } else if(x.cond ===false) {        return x.b;      } else {        return inactive;      }    } else {      return inactive;    }  } else {    return inactive;  }};var whenThenElse = function(x) {  if (isActive(x) ) {    if (isActive(x.cond) ) {      if(x.cond === true) {        return {a:active,b:inactive};      } else if(x.cond ===false) {        return {a:inactive,b:active};      } else {        return inactive;      }    } else {      return inactive;    }  } else {    return inactive;  }};var all = function(x) {  return {a:x,b:x,c:x,d:x,e:x,f:x,g:x,h:x,i:x,j:x,k:x,l:x,l:x,n:x,o:x,p:x}};";

w.addEventListener('message', function (ev) {
  switch(ev.data.type) {
        case 'error':
          console.log(ev.data.message);
          break;
        case 'compilationResult':
          console.log(ev.data.partialSource.transitionFunction);
      }
});

compile("interaction (bob):{theNumber:Number in,theOther:Number in, theResult:Number out, theLast:Number out}is({theNumber:(variable theNumber)theOther:(variable theNumber)theResult:(variable theNumber)theLast:(variable theNumber)})",header);
