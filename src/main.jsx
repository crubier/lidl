var React = require('react');
var CodeEditor = require('./codeEditor.jsx');






class TraceViewer extends React.Component {
  render() {
    return (
      <div className="TraceViewer">
        <span>Trace viewer</span>
      </div>
    );
  }
}

class Main extends React.Component {
  render() {
    return (
      <div className="Main">
        <CodeEditor/>
        <TraceViewer/>
      </div>
    );
  }
}

React.render(<Main/>, document.getElementById("main"));
