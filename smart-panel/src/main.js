"use strict";
import React, {
  Children,
  PropTypes,
  Component
} from 'react';
import ReactDOM from 'react-dom';

import SmartContainer from './SmartContainer';

import testModel from './testModel';

let style = {position:'absolute',left:0,top:0,right:0,bottom:0};

ReactDOM.render(<SmartContainer model={testModel}>
    <div panelId={'a'} panelName={'This is A'} style={{...style, backgroundColor:'rgb(255, 231, 231)'}}>OK a</div>
    <div panelId={'b'} panelName={'This is B'} style={{...style, backgroundColor:'rgb(255, 245, 231)'}}>OK b</div>
    <div panelId={'c'} panelName={'This is C'} style={{...style, backgroundColor:'rgb(254, 255, 231)'}}>OK c</div>
    <div panelId={'d'} panelName={'This is D'} style={{...style, backgroundColor:'rgb(242, 255, 231)'}}>OK d</div>
    <div panelId={'e'} panelName={'This is E'} style={{...style, backgroundColor:'rgb(231, 255, 238)'}}>OK e</div>
    <div panelId={'f'} panelName={'This is F'} style={{...style, backgroundColor:'rgb(231, 251, 255)'}}>OK f</div>
    <div panelId={'g'} panelName={'This is G'} style={{...style, backgroundColor:'rgb(231, 232, 255)'}}>OK g</div>
    <div panelId={'h'} panelName={'This is H'} style={{...style, backgroundColor:'rgb(254, 231, 255)'}}>OK h</div>
</SmartContainer>, document.getElementById("main"));

// ReactDOM.render(<span>ok</span>, document.getElementById("main"));
