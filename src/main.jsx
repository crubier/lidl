var React = require('react');
var CodeEditor = require('./codeEditor.jsx');
var TraceViewer = require('./traceViewer.jsx');


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
