import React, {
  PropTypes,
  Component
} from 'react';
import ReactDOM from 'react-dom';

import BlockCodeEditor from './BlockCodeEditor/BlockCodeEditor';
import CodeEditor from './CodeEditor/CodeEditor';
import Graphviz from './Graphviz/Graphviz';
import View from './FlexContainer/FlexContainer';
import ScenarioEditor from './ScenarioEditor/ScenarioEditor';
import HeaderEditor from './HeaderEditor/HeaderEditor';
import ErrorDisplay from './ErrorDisplay/ErrorDisplay';
import Canvas from './Canvas/Canvas';
import Analysis from './Analysis/Analysis';
import GeneratedCodeViewer from './GeneratedCodeViewer/GeneratedCodeViewer';
import TraceViewer from'./TraceViewer/TraceViewer';
import AdvancedTraceViewer from'./AdvancedTraceViewer/AdvancedTraceViewer';
import ExpandedCodeViewer from'./ExpandedCodeViewer/ExpandedCodeViewer';

import SmartContainer from './SmartPanel/SmartContainer'


import Paper from 'material-ui/lib/paper'

import AppBar from 'material-ui/lib/app-bar'
import FlatButton from 'material-ui/lib/flat-button'
import Snackbar from 'material-ui/lib/snackbar'
import RaisedButton from 'material-ui/lib/raised-button'
import TextField from 'material-ui/lib/text-field'

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';

import DropDownIcon from 'material-ui/lib/drop-down-icon';
import DropDownMenu from 'material-ui/lib/drop-down-menu';

import MenuItem from 'material-ui/lib/menus/menu-item';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import Menu from 'material-ui/lib/menus/menu';
import FontIcon from 'material-ui/lib/font-icon';

import IconButton from  'material-ui/lib/icon-button';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import _ from 'lodash';

// import {Accordion,AccordionItem} from 'react-sanfona';
import {Accordion,AccordionItem} from './Accordion/Accordion';

import initialState from './initialState'
import model from './viewModel';

var config = require('lidl-core').config;

// Create a web worker which will do the heavy lifting tasks
var work = require('webworkify');
var w = work(require('./worker.js'));




export default class Main extends Component {

  constructor(props){
    super(props);

    let that = this;

    // console.log(config.graphTransformations);

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

        case 'LidlAst':
          that.setState({lidlAst:m.lidlAst});
          break;

        case 'IntermediateGraph':
          that.setState({displayGraphs:that.state.displayGraphs.set(m.stage,m.graphSvg)});
          break;

        case 'GeneratedJs':
          that.setState({cleanJs:m.code});
          break;

        case 'ExpandedLidl':
          that.setState({expandedLidl:m.code});
          break;

        case 'TraceAst':
          that.setState({traceAst:m.traceAst});
          break;

        case 'Trace':
          that.setState({trace:m.trace});
          break;

        case 'InteractionMetrics':
          that.setState({metrics:m.metrics});
          break;

        case 'Error':
          break;

        case 'Lidl2LidlAst':
          console.log("Lidl2LidlAst");
          that.setState({lidlAst:m.lidlAst});
          w.postMessage({type:'LidlAst2ExpandedLidlAst',lidlAst:m.lidlAst});
          w.postMessage({type:'LidlAst2DisplayGraph',upto:that.state.displayGraphUpTo,lidlAst:m.lidlAst});
          break;
        case 'LidlAst2ExpandedLidlAst':
          console.log("LidlAst2ExpandedLidlAst");
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
          break;
        case 'LidlAst2DisplayGraph':
          console.log("LidlAst2DisplayGraph");
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
    this.state = initialState;


    // Debounce the change methods in order to speed up text editing
    let debounceDelay = 1000;
    this.lidlChanged = _.debounce(this.lidlChanged,debounceDelay);
    this.lidlAstChanged = _.debounce(this.lidlAstChanged,debounceDelay);
    this.scenarioChanged = _.debounce(this.scenarioChanged,debounceDelay);
    this.headerChanged = _.debounce(this.headerChanged,debounceDelay);


  }

  lidlChanged(newCode) {
    this.setState({lidl:newCode});
    w.postMessage({type:'RecompileAll',lidl:newCode,header:this.state.header,scenario:this.state.scenario});
  }

  lidlAstChanged(newAst) {
    // console.log("don't care ! lol");
    // w.postMessage({type:'Lidl2LidlAst',lidl:newCode});
  }

  scenarioChanged(newCode) {
    this.setState({scenario:newCode});
    w.postMessage({type:'RecompileAll',lidl:this.state.lidl,header:this.state.header,scenario:newCode});
  }

  headerChanged(newCode) {
    this.setState({header:newCode});
    w.postMessage({type:'RecompileAll',lidl:this.state.lidl,header:newCode,scenario:this.state.scenario});
  }

  recompileAll() {
    let newState = initialState;
    newState.fileName = this.state.fileName;
    newState.listOfFiles = this.state.listOfFiles;
    newState.displayGraphUpTo = this.state.displayGraphUpTo;
    newState.lidl = this.state.lidl;
    newState.header = this.state.header;
    newState.scenario = this.state.scenario;
    this.setState(newState);
    w.postMessage({type:'RecompileAll',lidl:this.state.lidl,header:this.state.header,scenario:this.state.scenario});
  }

  handleChange(event) {
     this.setState({fileName: event.target.value });
   }

  dropDownChange(event, selectedIndex, menuItem) {
    let opened = JSON.parse(localStorage.getItem("LidlSandbox."+menuItem.text));
      let newState = initialState;
      newState.fileName = menuItem.text;
      newState.listOfFiles = this.state.listOfFiles;
      newState.displayGraphUpTo = this.state.displayGraphUpTo;
      newState.lidl = opened.lidl;
      newState.header = opened.header;
      newState.scenario = opened.scenario;
      this.setState(newState);
      w.postMessage({type:'RecompileAll',lidl:opened.lidl,header:opened.header,scenario:opened.scenario});
      this.refs.snackbarOpened.show();
  }

  clickSave(){
    localStorage.setItem("LidlSandbox."+this.state.fileName,JSON.stringify({lidl:this.state.lidl,header:this.state.header,scenario:this.state.scenario}));
    this.updateListOfFiles();
    this.refs.snackbarSaved.show();
  }

  updateListOfFiles(){
    let localStoragekeys = []
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
      let key= localStorage.key( i ) ;
      if(_.startsWith(key, "LidlSandbox.")){
        localStoragekeys.push( key.substring("LidlSandbox.".length) );
      }
    }
    this.setState({listOfFiles:localStoragekeys});
  }

  componentDidMount(){
    this.updateListOfFiles();
    w.postMessage({type:'RecompileAll',lidl:this.state.lidl,header:this.state.header,scenario:this.state.scenario});
  }

  render() {

    let menuItems =  _(this.state.listOfFiles)
    .map((key,index)=>({ payload: ''+index, text: key }))
    .value();

    let menuItems2 =  _(config.graphTransformations)
    .map((key,index)=>({ payload: ''+index, text: key }))
    .value();


let that= this;
    return (
// <View layout={'row'}>
<div><Paper  zDepth={1} style={{zIndex: 100000,position: "fixed",top: 0,left: 0,width:"100%"}}><Toolbar>
    <ToolbarGroup key={0} float="left">
      <ToolbarTitle text="Lidl Sandbox" />
<DropDownMenu tooltipPosition="bottom-center"  tooltip="Name of file to load" menuItems={menuItems} onChange={this.dropDownChange.bind(this)} />
<TextField
tooltipPosition="bottom-center"  tooltip="Name of file to save"
  hintText="File Name"
  value={this.state.fileName}
  onChange={this.handleChange.bind(this)} />
<IconButton tooltipPosition="bottom-center"  tooltip="Save File" iconClassName="material-icons" primary={false} onClick={this.clickSave.bind(this)}>file_upload</IconButton>




    </ToolbarGroup>

    <ToolbarGroup key={2} float="right">
      <RaisedButton label="Recompile All" onClick={that.recompileAll.bind(that)} primary={true} />
</ToolbarGroup>
  </Toolbar></Paper>



  <Snackbar ref="snackbarSaved" message={"Saved file "+this.state.fileName} autoHideDuration={1000}/>
<Snackbar ref="snackbarOpened" message={"Loaded file "+this.state.fileName} autoHideDuration={1000}/>

      <SmartContainer model={model} position={{left:0,top:56,height:window.innerHeight-56,width:window.innerWidth}}>
          <CodeEditor panelId={"CodeEditor"} panelName={"Lidl code editor"}  value={this.state.lidl} onChange={this.lidlChanged.bind(this)}/>
          <BlockCodeEditor panelId={"BlockCodeEditor"} panelName={"Lidl visual code editor"} lidlAst={this.state.lidlAst} onChange={this.lidlAstChanged.bind(this)}/>
          <ScenarioEditor panelId={"ScenarioEditor"} panelName={"Scenario editor"}  value={this.state.scenario} onChange={this.scenarioChanged.bind(this)}/>
          <HeaderEditor panelId={"HeaderEditor"} panelName={"Custom Header editor"} value={this.state.header} onChange={this.headerChanged.bind(this)}/>
          <ErrorDisplay panelId={"ErrorDisplay"} panelName={"Errors"}  value={this.state.error}/>
          <Analysis panelId={"Analysis"} panelName={"Lidl code analysis"}  metrics={this.state.metrics}/>
          <Graphviz panelId={"Graphviz"} panelName={"Graph"}  displayGraph={this.state.displayGraphs.get('addDefinitionToGraph')}/>
          <GeneratedCodeViewer panelId={"GeneratedCodeViewer"} panelName={"Generated code viewer"}  value={this.state.cleanJs}/>
          <TraceViewer panelId={"TraceViewer"} panelName={"Trace viewer"} lidlAst={this.state.lidlAst} traceAst={this.state.traceAst} />
          <AdvancedTraceViewer panelId={"AdvancedTraceViewer"} panelName={"Advanced Trace viewer"}  value={this.state.trace}/>
          <ExpandedCodeViewer panelId={"ExpandedCodeViewer"} panelName={"Expanded code viewer"}  value={this.state.expandedLidl}/>
          <Canvas panelId={"Canvas"} panelName={"Canvas"} key={10}/>
      </SmartContainer>
</div>


        );

  }
}


ReactDOM.render(<Main/>, document.getElementById("main"));


w.postMessage({type:'Ping',message:"pong"});
