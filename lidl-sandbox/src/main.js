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




// // var bob = require("./test.js");
// // bob=5;
// console.log("lol "+bob);
