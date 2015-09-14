var React = require('react');
var FixedDataTable = require('fixed-data-table');
var _ = require('lodash');
var Column = FixedDataTable.Column;
var ColumnGroup = FixedDataTable.ColumnGroup;
var Table = FixedDataTable.Table;
var rowNumber=5;
var scenarioUtils=require('./scenario.js');

class TraceViewer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tableWidth: this.props.tableWidth,
      tableHeight: this.props.tableHeight,
      openedTab: 0,
      mainInterfaceState:{time:0,mouse: {
            buttons: 0,
            position: {
                x: 0,
                y: 0
            },
            wheel: {
                x: 0,
                y: 0,
                z: 0
            }
        }}
    };

  }

  mouse(e) {
      var target = e.target;
      var rect = React.findDOMNode(this.refs.iiicanvas).getBoundingClientRect();
      var offsetX = e.clientX - rect.left;
      var offsetY = e.clientY - rect.top;
      this.setState({mainInterfaceState:{time:e.timeStamp,mouse : {
          buttons: e.buttons,
          position: {
              x: offsetX,
              y: offsetY
          },
          wheel: {
              x: (e.deltaX !== undefined && e.deltaX !== null) ? e.deltaX : 0,
              y: (e.deltaY !== undefined && e.deltaY !== null) ? e.deltaY : 0,
              z: (e.deltaZ !== undefined && e.deltaZ !== null) ? e.deltaZ : 0
          }
      }}});
      console.log("ok  "  + JSON.stringify(this.state));
  }

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

    ///////////////////////////////////////////////////////////
    // DEBUT  CODE iii Canvas

    var iiicanvas = React.findDOMNode(this.refs.iiicanvas);

    // Prevent context menu
    iiicanvas.addEventListener("contextmenu", function(e) {
      if (e.preventDefault !== undefined)
          e.preventDefault();
      if (e.stopPropagation !== undefined)
          e.stopPropagation();
      return false;
    }, false);

    // Mouse events
    iiicanvas.addEventListener("mousemove", this.mouse.bind(this), false);
    iiicanvas.addEventListener("mousedown", this.mouse.bind(this), false);
    iiicanvas.addEventListener("mouseup", this.mouse.bind(this), false);
    iiicanvas.addEventListener("wheel", this.mouse.bind(this), false);

    // // Global
    // window.addEventListener("resize", resize, false);

    // // Keyboard events
    // iiicanvas.addEventListener("keydown", keydown, false);
    // iiicanvas.addEventListener("keyup", keyup, false);


    //
    // // Touch events
    // iiicanvas.addEventListener("touchcancel", touch, false);
    // iiicanvas.addEventListener("touchend", touch, false);
    // iiicanvas.addEventListener("touchmove", touch, false);
    // iiicanvas.addEventListener("touchstart", touch, false);
    //
    // // Device
    // // window.addEventListener("devicemotion", devicemotion, false);
    // window.addEventListener("deviceorientation", deviceorientation, false);
    // window.addEventListener("devicelight", devicelight, false);
    // window.addEventListener("deviceproximity", deviceproximity, false);
    //
    // window.setInterval(function(){
    //   mainInterface.time = Date.now();
    //   timeStep();
    // }, 1000/60);


    // FIN  CODE iii Canvas
    ///////////////////////////////////////////////////////////





  }


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
  }

  _rowGetter(index) {
    var prefix = "main";
    var row = this.props.scenario[index];
    return scenarioUtils.flattenElement(row,prefix);
  }




  render() {

    var controlledScrolling = this.props.left !== undefined || this.props.top !== undefined;
    var listOfAtoms = this.props.listOfAtoms;
    var espace="         ";
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
        <br/>
        <div className="icons" style={{
        display: this.state.openedTab === 0
          ? 'inline'
          : 'none'
      }}>
          <i className="fa fa-fast-backward fa-3x" onClick={this.props.fastBackward} style={{
          display: this.state.openedTab === 0
            ? 'inline'
            : 'none'
        }}>{espace}</i>
          <i className="fa fa-backward fa-3x" onClick={this.props.backward}style={{
          display: this.state.openedTab === 0
            ? 'inline'
            : 'none'
        }}>{espace}</i>
          <i className="fa fa-forward fa-3x" onClick={this.props.forward}style={{
          display: this.state.openedTab === 0
            ? 'inline'
            : 'none'
        }}>{espace}</i>
          <i className="fa fa-fast-forward fa-3x" onClick={this.props.fastForward}style={{
          display: this.state.openedTab === 0
            ? 'inline'
            : 'none'
        }}>{espace}</i>
        </div>
        <br/>
        <br/>
        <div style={{
        display: this.state.openedTab === 0
          ? 'inline'
          : 'none'
      }}>
        <Table groupHeaderHeight={30} headerHeight={30} height={this.state.tableHeight} width={this.state.tableWidth} overflowX={controlledScrolling ? "hidden" : "auto"} overflowY={controlledScrolling ? "hidden" : "auto"} rowGetter={this._rowGetter.bind(this)} rowHeight={30} rowsCount={this.props.tableRowNumber} scrollLeft={this.props.left} scrollTop={this.props.top}>

          {listOfAtoms.map(function(x) {
            return (
          <ColumnGroup key={x.name} fixed={true} label={x.name}>
            <Column dataKey={x.name} fixed={true} label={x.data.name + " " + x.direction} width={150}/>
          </ColumnGroup>
          ); })}

        </Table>
        </div>
        <canvas ref="iiicanvas" style={{
        display: this.state.openedTab === 1
          ? 'inline'
          : 'none'
      }} width="400" height="400" ></canvas>

      </div>
      </div>

    );
  }

}
TraceViewer.propTypes = {
  listOfAtoms: React.PropTypes.array,
  scenario: React.PropTypes.array,
  onContentDimensionsChange: React.PropTypes.func,
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
