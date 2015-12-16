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
import Immutable from 'immutable'

// import {Accordion,AccordionItem} from 'react-sanfona';
import {Accordion,AccordionItem} from './Accordion/Accordion';

import initialState from './initialState'
import model from './viewModel';

import fileSaver from 'browser-filesaver';

var Lidl = require('lidl-core');
var config = Lidl.config;
var examples = Lidl.examples;


// Create a web worker which will do the heavy lifting tasks
var work = require('webworkify');
var worker = require('./worker.js');

// Print all graph views for viewModel.js
// console.log(JSON.stringify(_(config.graphTransformations).map(x=>({
//               type: 'p',
//               weight: 1,
//               select: false,
//               value: "Graph "+x
//             })).value()));

var buildKey = 'd70ad78e-eeee-41dc-8ea2-d557dd959915'; // Unique key that represent the current version of the LIDL Library, update this every time you want to deprecate the current lib and load the new one in client browsers

export default class Main extends Component {

  constructor(props){
    super(props);

    this.state = initialState;
    this.state.position ={top:0,left:0,height:window.innerHeight,width:window.innerWidth};

    this.w = {}; // Worker pool

    if(localStorage.getItem("LidlSandboxImportedDefaults")!==buildKey) {
      console.log('Writing defaults, this will be done only once...');
      let header = examples.header ;
      _(examples.lidl)
      .forEach(x=>{
        localStorage
        .setItem(
          "LidlSandbox."+x.name,
          JSON.stringify({lidl:x.code,header:header,scenario:x.scenario}));})
      .commit();
      localStorage.setItem("LidlSandboxImportedDefaults",buildKey);
      console.log('Done');
    }


    // Debounce the change methods in order to speed up text editing
    this.lidlChanged = _.debounce(this.lidlChanged,1000);
    this.lidlAstChanged = _.debounce(this.lidlAstChanged,1000);
    this.scenarioChanged = _.debounce(this.scenarioChanged,100);
    this.headerChanged = _.debounce(this.headerChanged,1000);


  }

  resize() {
    this.setState({position:{top:this.state.top,left:this.state.left,height:window.innerHeight,width:window.innerWidth}});
  }

  launchWork(message){
    // Get the right worker of the pool
    let oldWorker = this.w[message.type];
    // Forget worker
    if( oldWorker !== undefined && oldWorker!==null) {
      oldWorker.removeEventListener('error', this.workerErrorListener.bind(this));
      oldWorker.removeEventListener('message',this.workerListener.bind(this));
      oldWorker.terminate();
    }
    // Create newWorker
    let newWorker = work(worker);
    this.w[message.type]=newWorker;
    newWorker.addEventListener('error', this.workerErrorListener.bind(this));
    newWorker.addEventListener('message',this.workerListener.bind(this));
    // Send message
    newWorker.postMessage(message);
  }

  workerListener(ev){
    var m = ev.data;
    switch(m.type) {
      case 'Ping':
        console.log(m.message);
        break;

      case 'LidlAst':
        this.setState({lidlAst:m.lidlAst});
        break;

      case 'IntermediateGraph':
        console.log(m.stage);
        this.setState({displayGraphs:this.state.displayGraphs.set(m.stage,m.graphSvg)});
        break;

      case 'GeneratedJs':
        this.setState({cleanJs:m.cleanJs,js:m.js});
        break;

      case 'ExpandedLidl':
        this.setState({expandedLidl:m.code});
        break;

      case 'Trace':
        this.setState({traceAst:m.traceAst,trace:m.trace});
        break;

      case 'InteractionMetrics':
        this.setState({metrics:m.metrics});
        break;

      case 'Error':
        this.setState({error:this.state.error.push(new Error('m.error'))});
        break;
    }
  }

  workerErrorListener(ev){
    this.setState({error:this.state.error.push(ev)});
  }

  lidlChanged(newCode) {
    this.setState({lidl:newCode});
    this.launchWork({type:'RecompileAll',lidl:newCode,header:this.state.header,scenario:this.state.scenario});
  }

  lidlAstChanged(newAst) {
    // console.log("don't care ! lol");
    // w.postMessage({type:'Lidl2LidlAst',lidl:newCode});
  }

  scenarioChanged(newCode) {
    this.setState({scenario:newCode});
    this.launchWork({type:'RunScenario',js:this.state.js,scenario:newCode});
  }

  headerChanged(newCode) {
    this.setState({header:newCode});
    this.launchWork({type:'RecompileAll',lidl:this.state.lidl,header:newCode,scenario:this.state.scenario});
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
    this.launchWork({type:'RecompileAll',lidl:this.state.lidl,header:this.state.header,scenario:this.state.scenario});
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
      this.launchWork({type:'RecompileAll',lidl:opened.lidl,header:opened.header,scenario:opened.scenario});
      this.refs.snackbarOpened.show();
  }

  clickSave(){
    localStorage.setItem("LidlSandbox."+this.state.fileName,JSON.stringify({lidl:this.state.lidl,header:this.state.header,scenario:this.state.scenario}));
      var fileParts = [this.state.lidl];
      var blob = new Blob(fileParts, {type : 'text/x-lidl'});
      fileSaver.saveAs(blob,this.state.fileName+'.lidl');

    this.updateListOfFiles();
    this.refs.snackbarSaved.show();
  }

  clearErrors(){
    this.setState({error:Immutable.fromJS([])});
  }

  updateListOfFiles(){
    let localStoragekeys = [];
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
      let key= localStorage.key( i ) ;
      if(_.startsWith(key, "LidlSandbox.")){
        localStoragekeys.push( key.substring("LidlSandbox.".length) );
      }
    }
    this.setState({listOfFiles:localStoragekeys});
  }

  componentDidMount(){
    this.launchWork({type:'Ping',message:'Pong'});
    this.updateListOfFiles();
    this.launchWork({type:'RecompileAll',lidl:this.state.lidl,header:this.state.header,scenario:this.state.scenario});
    window.addEventListener("resize", this.resize.bind(this), false);
  }

  viewLayoutChanged(){

  }

  exportCanvas(){
    var template = _.template(require('./Canvas/standaloneTemplate.js'))
    var fileParts = [template(this.state.js.partialSource)];
    var blob = new Blob(fileParts, {type : 'text/html'});
    fileSaver.saveAs(blob,'LidlCanvas.html');
    var URL = window.URL || window.webkitURL;
    var url = URL.createObjectURL(blob);
    window.open(url);
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
      <RaisedButton label="Export Canvas" onClick={that.exportCanvas.bind(that)} primary={false} />
      <RaisedButton label="Recompile All" onClick={that.recompileAll.bind(that)} primary={true} />
</ToolbarGroup>
  </Toolbar></Paper>



  <Snackbar ref="snackbarSaved" message={"Saved file "+this.state.fileName} autoHideDuration={1000}/>
<Snackbar ref="snackbarOpened" message={"Loaded file "+this.state.fileName} autoHideDuration={1000}/>

      <SmartContainer onChange={this.viewLayoutChanged.bind(this)} model={model} position={{left:0,top:56,height:this.state.position.height-56,width:this.state.position.width}}>
          <CodeEditor panelId={"CodeEditor"} panelName={"Lidl code editor"}  value={this.state.lidl} onChange={this.lidlChanged.bind(this)}/>
          <BlockCodeEditor panelId={"BlockCodeEditor"} panelName={"Visual Lidl editor"} lidlAst={this.state.lidlAst} onChange={this.lidlAstChanged.bind(this)}/>
          <ScenarioEditor panelId={"ScenarioEditor"} panelName={"Scenario editor"}  value={this.state.scenario} onChange={this.scenarioChanged.bind(this)}/>
          <HeaderEditor panelId={"HeaderEditor"} panelName={"Header editor"} value={this.state.header} onChange={this.headerChanged.bind(this)}/>
          <ErrorDisplay panelId={"ErrorDisplay"} panelName={"Errors"}  value={this.state.error}/>
          <Analysis panelId={"Analysis"} panelName={"Code analysis"}  metrics={this.state.metrics}/>
          <GeneratedCodeViewer panelId={"GeneratedCodeViewer"} panelName={"Generated code"}  value={this.state.cleanJs}/>
          <TraceViewer panelId={"TraceViewer"} panelName={"Trace"} lidlAst={this.state.lidlAst} traceAst={this.state.traceAst} />
          <AdvancedTraceViewer panelId={"AdvancedTraceViewer"} panelName={"Advanced Trace"}  value={this.state.trace}/>
          <ExpandedCodeViewer panelId={"ExpandedCodeViewer"} panelName={"Expanded code"}  value={this.state.expandedLidl}/>
          <Canvas panelId={"Canvas"} panelName={"Canvas"} key={10} code={this.state.js}/>

{_(config.graphTransformations).map(x=>(<Graphviz key={x} panelId={"Graph "+x} panelName={_.startCase(x)}  displayGraph={this.state.displayGraphs.get(x)}/>)).value()}
      </SmartContainer>
</div>


        );

  }
}


ReactDOM.render(<Main/>, document.getElementById("main"));
