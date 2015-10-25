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

// const Card = require('material-ui/lib/card/card');
// const CardHeader = require('material-ui/lib/card/card-header');
// const CardText = require('material-ui/lib/card/card-text');
// const CardActions = require('material-ui/lib/card/card-actions');
// const CardMedia= require('material-ui/lib/card/card-media');
// const FlatButton = require('material-ui/lib/flat-button');
// const Avatar = require('material-ui/lib/avatar');
// const Paper = require('material-ui/lib/paper');
// const Tabs = require('material-ui/lib/tabs/tabs');
// const Tab = require('material-ui/lib/tabs/tab');


export default class Main extends Component {

  state =  {
    code: {},
    scenario: {},
    compiled:{}
  };

  render() {
    return (
      <View row>
        <View column>
          <CodeEditor/>
          <BlockCodeEditor/>
          <ErrorDisplay/>
          <Analysis/>
        </View>
        <View column>
          <ScenarioEditor/>
          <Canvas/>
          <Graph/>
        </View>
      </View>
    );
  }
}

ReactDOM.render(<Main/>, document.getElementById("main"));


// <Canvas />
