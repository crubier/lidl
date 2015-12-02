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
                w.postMessage({type:'LidlAst2DisplayGraph',lidlAst:m.lidlAst});
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

    // Debounce the change methods in order to speed up text editing
    let debounceDelay = 1000;
    this.lidlChanged = _.debounce(this.lidlChanged,debounceDelay);
    this.lidlAstChanged = _.debounce(this.lidlAstChanged,debounceDelay);
    this.scenarioChanged = _.debounce(this.scenarioChanged,debounceDelay);
    this.headerChanged = _.debounce(this.headerChanged,debounceDelay);

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

  recompileAll() {
    let newState = initialState;
newState.fileName = this.state.fileName;
newState.listOfFiles = this.state.listOfFiles;
    newState.lidl = this.state.lidl;
    newState.header = this.state.header;
    newState.scenario = this.state.scenario;
    this.setState(newState);
    w.postMessage({type:'Lidl2LidlAst',lidl:this.state.lidl});
    w.postMessage({type:'Scenario2ScenarioAst',scenario:this.state.scenario});
  }

  handleChange(event) {
     this.setState({fileName: event.target.value });
   }

  dropDownChange(event, selectedIndex, menuItem) {

    this.setState({fileName: menuItem.text });
  }

  clickOpen(){
    let opened = JSON.parse(localStorage.getItem("LidlSandbox."+this.state.fileName));
    let newState = initialState;
    newState.fileName = this.state.fileName;
newState.listOfFiles = this.state.listOfFiles;
        newState.lidl = opened.lidl;
        newState.header = opened.header;
        newState.scenario = opened.scenario;
        this.setState(newState);
        w.postMessage({type:'Lidl2LidlAst',lidl:opened.lidl});
        w.postMessage({type:'Scenario2ScenarioAst',scenario:opened.scenario});

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
}

  render() {

    let menuItems =  _(this.state.listOfFiles)
    .map((key,index)=>({ payload: ''+index, text: key }))
    .value();




let that= this;
    return (
// <View layout={'row'}>
<div><Paper  zDepth={4} style={{zIndex: 100000,position: "fixed",top: 0,left: 0,width:"100%"}}><Toolbar>
    <ToolbarGroup key={0} float="left">
      <ToolbarTitle text="Lidl Sandbox" />
<DropDownMenu menuItems={menuItems} onChange={this.dropDownChange.bind(this)} />
<IconButton tooltipPosition="bottom-center"  tooltip="Load File" iconClassName="material-icons" primary={false} onClick={this.clickOpen.bind(this)}>file_download</IconButton>
<TextField
  hintText="File Name"
  value={this.state.fileName}
  onChange={this.handleChange.bind(this)} />
<IconButton tooltipPosition="bottom-center"  tooltip="Save File" iconClassName="material-icons" primary={false} onClick={this.clickSave.bind(this)}>file_upload</IconButton>




    </ToolbarGroup>
    <ToolbarGroup key={1} float="right">
      <RaisedButton label="Recompile All" onClick={that.recompileAll.bind(that)} primary={true} />
    </ToolbarGroup>
  </Toolbar></Paper>



  <Snackbar ref="snackbarSaved" message={"Saved file "+this.state.fileName} autoHideDuration={1000}/>
<Snackbar ref="snackbarOpened" message={"Loaded file "+this.state.fileName} autoHideDuration={1000}/>
      <Accordion style={{marginTop:"90px"}}>

          <AccordionItem title={"Lidl code editor"} key={0}><CodeEditor value={this.state.lidl} onChange={this.lidlChanged.bind(this)}/></AccordionItem>
          <AccordionItem title={"Lidl visual code editor"} key={1}><BlockCodeEditor lidlAst={this.state.lidlAst} onChange={this.lidlAstChanged.bind(this)}/></AccordionItem>
          <AccordionItem title={"Scenario editor"} key={2}><ScenarioEditor value={this.state.scenario} onChange={this.scenarioChanged.bind(this)}/></AccordionItem>
          <AccordionItem title={"Custom Header editor"} key={3}><HeaderEditor value={this.state.header} onChange={this.headerChanged.bind(this)}/></AccordionItem>
          <AccordionItem title={"Errors"} key={4}><ErrorDisplay value={this.state.error}/></AccordionItem>
          <AccordionItem title={"Lidl code analysis"} key={5}><Analysis expandedLidlAst={this.state.expandedLidlAst} expandedLidl={this.state.expandedLidl}/></AccordionItem>
          <AccordionItem title={"Graph"} key={6}><Graphviz displayGraph={this.state.displayGraph}/></AccordionItem>
          <AccordionItem title={"Generated code viewer"} key={7}><GeneratedCodeViewer value={this.state.cleanJs}/></AccordionItem>
          <AccordionItem title={"Trace viewer"} key={8}><TraceViewer lidlAst={this.state.lidlAst} traceAst={this.state.traceAst} /></AccordionItem>
          <AccordionItem title={"Advanced Trace viewer"} key={9}><AdvancedTraceViewer value={this.state.trace}/></AccordionItem>
          <AccordionItem title={"Canvas"} key={10}><Canvas/></AccordionItem>

      </Accordion>
</div>


        );

  }
}



ReactDOM.render(<Main/>, document.getElementById("main"));


w.postMessage({type:'Ping',message:"pong"});
