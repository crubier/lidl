var React = require('react');


class CodeEditor extends React.Component {
  render() {
    return (<div className="CodeEditor">
    <div className="Tabs">
      <div className="Tab">Tab1</div>
      <div className="Tab">Tab2</div>
      </div>
      <div className="Panel">the content</div>
    </div>);
  }
}

class TraceViewer extends React.Component {
  render() {
    return (<div className="TraceViewer">
      Trace viewer
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
