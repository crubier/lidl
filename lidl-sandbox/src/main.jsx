var React = require('react');
var ReactDOM = require('react-dom');




class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="Main" overflow={"scroll"}>
        Hello
      </div>
    );
  }
}

ReactDOM.render(<Main/>, document.getElementById("main"));
