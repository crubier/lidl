import React, {
  PropTypes,
  Component
}
from 'react';


export default class ScenarioEditor extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (<div style={{width:"100%"}}>
    <h1> Scenario </h1>
    <textarea id="scenario" value = {"ok"} name="scenario" style={{width:"100%"}}/>
    </div>);
  }
}
