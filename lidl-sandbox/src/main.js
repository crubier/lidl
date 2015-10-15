import React from 'react';
import Container from './Container';

const Card = require('material-ui/lib/card/card');
const CardHeader = require('material-ui/lib/card/card-header');
const CardText = require('material-ui/lib/card/card-text');
const CardActions = require('material-ui/lib/card/card-actions');
const CardMedia= require('material-ui/lib/card/card-media');
const FlatButton = require('material-ui/lib/flat-button');
const Avatar = require('material-ui/lib/avatar');
const Paper = require('material-ui/lib/paper');
const Tabs = require('material-ui/lib/tabs/tabs');
const Tab = require('material-ui/lib/tabs/tab');

export default class DustbinSingleTarget {
  render() {
    return (
      <div style={{
        overflow: 'auto',
        display: 'inline-block',
        width: '100%',
        height: '100%',
        backgroundColor:'rgba(0, 0, 0,0)'
      }}>
<Container />
    
      </div>
    );
  }
}


React.render(<DustbinSingleTarget/>, document.getElementById("main"));

// <CardMedia expandable={true}>
//<Container />
// </CardMedia>
