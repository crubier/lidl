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
import TraceViewer from'./TraceViewer/TraceViewer';

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

    w.addEventListener('error', function (ev) {
      that.setState({error:ev});
    });

    // Listen to the web worker events
    w.addEventListener('message', function (ev) {
        var m = ev.data;


        switch(m.type) {
              case 'Ping':
                console.log(m.message);
                break;
              case 'Lidl2LidlAst':
                console.log("Lidl2LidlAst");
                that.setState({lidlAst:m.lidlAst});
                w.postMessage({type:'LidlAst2ExpandedLidlAst',lidlAst:m.lidlAst});
                break;
              case 'LidlAst2ExpandedLidlAst':
                that.setState({expandedLidlAst:m.expandedLidlAst});
                w.postMessage({type:'ExpandedLidlAst2ExpandedLidl',expandedLidlAst:m.expandedLidlAst});
                w.postMessage({type:'ExpandedLidlAst2Graph',expandedLidlAst:m.expandedLidlAst});
                break;
              case 'ExpandedLidlAst2ExpandedLidl':
              console.log("ExpandedLidlAst2ExpandedLidl");
                that.setState({expandedLidl:m.expandedLidl});
                break;
              case 'ExpandedLidlAst2Graph':
              console.log("ExpandedLidlAst2Graph");
                that.setState({graph:m.graph});
                w.postMessage({type:'Graph2Js',graph:m.graph,header:that.state.header});
                w.postMessage({type:'Graph2DisplayGraph',graph:m.graph});
                break;
              case 'Graph2DisplayGraph':
                console.log("Graph2DisplayGraph");
                that.setState({displayGraph:m.displayGraph});
                break;
              case 'Graph2Js':
              console.log("Graph2Js");
                that.setState({js:m.js});
                w.postMessage({type:'Js2CleanJs',js:m.js});
                w.postMessage({type:'Js2TraceAst',js:m.js,scenarioAst:that.state.scenarioAst});
                break;
              case 'Js2CleanJs':
              console.log("Js2CleanJs");
                that.setState({cleanJs:m.cleanJs});
                break;
              case 'Scenario2ScenarioAst':
              console.log("Scenario2ScenarioAst");
                that.setState({scenarioAst:m.scenarioAst});
                w.postMessage({type:'Js2TraceAst',js:that.state.js,scenarioAst:m.scenarioAst});
                break;
              case 'Js2TraceAst':
              console.log("Js2TraceAst");
                that.setState({traceAst:m.traceAst});
                w.postMessage({type:'TraceAst2Trace',traceAst:m.traceAst});
                break;
              case 'TraceAst2Trace':
              console.log("TraceAst2Trace");
                that.setState({trace:m.trace});
                break;
            }
      }

    );

    // Debounce the change methods in order to speed up text editing
    this.lidlChanged = _.debounce(this.lidlChanged,300);
    this.lidlAstChanged = _.debounce(this.lidlAstChanged,300);
    this.scenarioChanged = _.debounce(this.scenarioChanged,300);
    this.headerChanged = _.debounce(this.headerChanged,300);

    this.lidlChanged(this.state.lidl);
    this.scenarioChanged(this.state.scenario);
    this.headerChanged(this.state.header);

  }

  state = initialState;

  lidlChanged(newCode) {
    this.setState({lidl:newCode});
    w.postMessage({type:'Lidl2LidlAst',lidl:newCode});
  }

  lidlAstChanged(newAst) {
    // console.log("don't care ! lol");
    // w.postMessage({type:'Lidl2LidlAst',lidl:newCode});
  }

  scenarioChanged(newCode) {
    this.setState({scenario:newCode});
    w.postMessage({type:'Scenario2ScenarioAst',scenario:newCode});
  }

  headerChanged(newCode) {
    this.setState({header:newCode});
    w.postMessage({type:'Graph2Js',graph:this.state.graph,header:newCode});
  }

  render() {
    return (
// <View layout={'row'}>
      <Accordion allowMultiple={true}>
        {[
          <AccordionItem title={"Lidl code editor"} key={1}><CodeEditor value={this.state.lidl} onChange={this.lidlChanged.bind(this)}/></AccordionItem>,
          <AccordionItem title={"Lidl block code editor"} key={2}><BlockCodeEditor lidlAst={this.state.lidlAst} onChange={this.lidlAstChanged.bind(this)}/></AccordionItem>,
          <AccordionItem title={"Scenario editor"} key={3}><ScenarioEditor value={this.state.scenario} onChange={this.scenarioChanged.bind(this)}/></AccordionItem>,
          <AccordionItem title={"Header editor"} key={4}><HeaderEditor value={this.state.header} onChange={this.headerChanged.bind(this)}/></AccordionItem>,
          <AccordionItem title={"Errors"} key={5}><ErrorDisplay value={this.state.error}/></AccordionItem>,
          <AccordionItem title={"Analysis"} key={6}><Analysis expandedLidlAst={this.state.expandedLidlAst} expandedLidl={this.state.expandedLidl}/></AccordionItem>,
          <AccordionItem title={"Graph"} key={7}><Graph graph={this.state.displayGraph}/></AccordionItem>,
          <AccordionItem title={"Generated code viewer"} key={8}><GeneratedCodeViewer value={this.state.cleanJs}/></AccordionItem>,
          <AccordionItem title={"Trace viewer"} key={9}><TraceViewer traceAst={this.state.traceAst} value={this.state.trace}/></AccordionItem>,
          <AccordionItem title={"Canvas"} key={10}><Canvas/></AccordionItem>
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


w.postMessage({type:'Ping',message:"pong"});
