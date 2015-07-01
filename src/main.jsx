var React = require('react');


class CodeEditor extends React.Component {
  render() {
    return (<div className="CodeEditor">
    <div className="Tabs">
      <div className="Tab"><span>Tab1</span></div>
      <div className="Tab"><span>Tab2</span></div>
      </div>
      <div className="TabContent"><textarea name="Text1" rows="2" defaultValue="Hello this is some code"></textarea></div>
    </div>);
  }
}

class TraceViewer extends React.Component {
  render() {
    return (<div className="TraceViewer">
      <span>Trace viewer</span>
    </div>);
  }
}

class Main extends React.Component {
  render() {
    return (<div className="Main">
      <CodeEditor/>
      <TraceViewer/>
    </div>);
  }
}

React.render(<Main/>, document.getElementById("main"));
