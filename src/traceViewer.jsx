var React = require('react');
var _ = require('lodash');
var Canvas= require('./canvas.jsx');
var VariablesTable= require('./variablesTable.jsx');




class TraceViewer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
     tableWidth: this.props.tableWidth,
     tableHeight: this.props.tableHeight,
     openedTab: 0,

   };
  }

/*
  componentDidMount() {
    this._updateSize();
    var win = window;
    if (win.addEventListener) {
      win.addEventListener('resize', this._onResize.bind(this), false);
    } else if (win.attachEvent) {
      win.attachEvent('onresize', this._onResize.bind(this));
    } else {
      win.onresize = this._onResize.bind(this);
    }

  }

  _onResize() {
    clearTimeout(this._updateTimer);
    this._updateTimer = setTimeout(this._updateSize.bind(this), 16);
  }

  _updateSize() {
    var win = window;
    this.setState({
      tableWidth: win.innerWidth / 2,
      tableHeight: win.innerHeight/2,
    });
  }*/



  openTab0(e) {
    this.setState({
      openedTab: 0
    });

  }

  openTab1(e) {

    this.setState({
      openedTab: 1
    });
  }



  render() {

    return (
      <div className="TraceViewer">
        <div className="Tabs">
        <div className={this.state.openedTab === 0
          ? 'TabTraceViewer active'
          : 'TabTraceViewer'} onClick={this.openTab0.bind(this)}>
          <span> Variables Table </span>
        </div>
        <div className={this.state.openedTab === 1
            ? 'TabTraceViewer active'
            : 'TabTraceViewer'} onClick={this.openTab1.bind(this)}>
            <span>Canvas</span>
        </div>
        </div>

        <div className="TabContentTraceViewer">

        <VariablesTable  backward={this.props.backward} fastBackward={this.props.fastBackward} fastForward={this.props.fastForward} forward={this.props.forward} listOfAtoms={this.props.listOfAtoms} scenario={this.props.scenario} tableRowNumber={this.props.tableRowNumber} tableWidth={this.state.tableWidth} tableHeight={this.state.tableHeight} openedTab={this.state.openedTab} />

      <Canvas  addToScenario={this.props.addToScenario}    />




      </div>
      </div>

    );
  }

}
TraceViewer.propTypes = {
  listOfAtoms: React.PropTypes.array,
  scenario: React.PropTypes.array,
  left: React.PropTypes.number,
  top: React.PropTypes.number,
  tableRowNumber: React.PropTypes.number
};

TraceViewer.defaultProps = {
  listOfAtoms: [],
  scenario: [],
  tableWidth: 500,
  tableHeight: 500,
  tableRowNumber: 5
};
module.exports = TraceViewer;
