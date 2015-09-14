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
      mainInterfaceState:{keyboard: {
          "U+0041": false,
          "U+0040": false,
          "U+0026": false,
          "U+00E9": false,
          "U+0022": false,
          "U+0027": false,
          "U+0028": false,
          "U+00A7": false,
          "U+00E8": false,
          "U+0021": false,
          "U+00E7": false,
          "U+00E0": false,
          "U+0029": false,
          "U+002D": false,
          "U+0009": true,
          "U+005A": false,
          "U+0045": false,
          "U+0052": false,
          "U+0054": false,
          "U+0059": false,
          "U+0055": false,
          "U+0049": false,
          "U+004F": false,
          "U+0050": false,
          "Unidentified": false,
          "U+0024": false,
          "Enter": false,
          "Meta": false,
          "Control": false,
          "Alt": false,
          "Shift": false,
          "U+0051": false,
          "U+0053": false,
          "U+0044": false,
          "U+0046": false,
          "U+0047": false,
          "U+0048": false,
          "U+004A": false,
          "U+004B": false,
          "U+004C": false,
          "U+004D": false,
          "U+00F9": false,
          "U+0020": false,
          "U+003C": false,
          "U+0057": false,
          "U+0058": false,
          "U+0043": false,
          "U+0056": false,
          "U+0042": false,
          "U+004E": false,
          "U+002C": false,
          "U+003B": false,
          "U+003A": false,
          "U+003D": false,
          "Left": false,
          "Down": false,
          "Right": false,
          "Up": false,
          "U+001B": false,
          "F1": false,
          "F2": false,
          "F3": false,
          "F4": false,
          "F5": false,
          "F6": false,
          "F7": false,
          "F8": false,
          "F9": false,
          "F10": false,
          "F11": false,
          "F12": false
      },time:0,mouse: {
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
        },}
    };
    console.log("eeeeeeeeeeeee",JSON.stringify(this.state.mainInterfaceState));

  }

  mouse(e) {
      var target = e.target;
      var rect = React.findDOMNode(this.refs.iiicanvas).getBoundingClientRect();
      var offsetX = e.clientX - rect.left;
      var offsetY = e.clientY - rect.top;
      var theKeyboard=this.state.mainInterfaceState.keyboard;
      this.setState({mainInterfaceState:{keyboard:theKeyboard,time:e.timeStamp,mouse : {
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
      console.log("gastli ",JSON.stringify(this.state.mainInterfaceState));
      this.scenarioChanged();
  }

  resize(e) {
      var canvas=React.findDOMNode(this.refs.iiicanvas);
      this.setState({mainInterfaceState:{time:e.timeStamp,size : {
          width: canvas.offsetWidth,
          height: canvas.offsetHeight
      }}});
  }




  keydown(e) {
      var key;
      console.log("eamamammama")
      if (event.key !== undefined) {
          key = event.key;
      } else if (event.keyIdentifier !== undefined) {
          key = event.keyIdentifier;
      } else if (event.keyCode !== undefined) {
          key = event.keyCode;
      }
      if (mainInterface.keyboard[key] !== true) {
        var theKeyboard=mainInterface.keyboard[key]=true;
        this.setState({mainInterfaceState:{time:e.timeStamp,keyboard:theKeyboard}});
      }
      this.scenarioChanged();
  }

  keyup(e) {
      var key;
      if (event.key !== undefined) {
          key = event.key;
      } else if (event.keyIdentifier !== undefined) {
          key = event.keyIdentifier;
      } else if (event.keyCode !== undefined) {
          key = event.keyCode;
      }
      if (mainInterface.keyboard[key] !== false) {
        console.log("doudou ",mainInterface.keyboard);
        var theKeyboard=mainInterface.keyboard[key]=false;
        this.setState({mainInterfaceState:{time:e.timeStamp,keyboard:theKeyboard}});
      }
      this.scenarioChanged();
      console.log("okkk")
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

    // Global
    window.addEventListener("resize", resize, false);

    // Keyboard events
    iiicanvas.addEventListener("keydown", this.keydown.bind(this), false);
    iiicanvas.addEventListener("keyup", this.keyup.bind(this), false);

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


  scenarioChanged() {
    this.props.addToScenario(this.state.mainInterfaceState);
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
