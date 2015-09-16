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
      mainInterfaceState:{dimension:{
          width:500,
          height:500
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
        },keyboard: {
          "Enter": false,
          "Meta": false,
          "Control": false,
          "Alt": false,
          "Shift": false,
          "Left": false,
          "Down": false,
          "Right": false,
          "Up": false
      },touch: [],

        }
    };


  }

  mouse(e) {
      var target = e.target;
      var rect = React.findDOMNode(this.refs.iiicanvas).getBoundingClientRect();
      var offsetX = e.clientX - rect.left;
      var offsetY = e.clientY - rect.top;
      this.setState({mainInterfaceState:{dimension:this.state.mainInterfaceState.dimension,time:e.timeStamp,mouse : {
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
      },keyboard:this.state.mainInterfaceState.keyboard,touch:this.state.mainInterfaceState.touch}});
      this.scenarioChanged();
  }

  resize(e) {

      var canvas=React.findDOMNode(this.refs.iiicanvas);
      this.setState({mainInterfaceState:{dimension : {
          width: canvas.offsetWidth,
          height: canvas.offsetHeight
      },time:e.timeStamp,mouse:this.state.mainInterfaceState.mouse,keyboard:this.state.mainInterfaceState.keyboard,touch:this.state.mainInterfaceState.touch,}});

      this.scenarioChanged();
  }




  keydown(e) {

      var key;
      if (event.key !== undefined) {
          key = event.key;
      } else if (event.keyIdentifier !== undefined) {
          key = event.keyIdentifier;
      } else if (event.keyCode !== undefined) {
          key = event.keyCode;
      }
      if (this.state.mainInterfaceState.keyboard[key] !== true) {
        var theKeyboard=this.state.mainInterfaceState.keyboard;
        theKeyboard[key]=true;
        this.setState({mainInterfaceState:{dimension:this.state.mainInterfaceState.dimension,time:e.timeStamp,mouse:this.state.mainInterfaceState.mouse,keyboard:theKeyboard,touch:this.state.mainInterfaceState.touch,}});
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
      if (this.state.mainInterfaceState.keyboard[key] !== false) {
        var theKeyboard=this.state.mainInterfaceState.keyboard;
        theKeyboard[key]=false;
        this.setState({mainInterfaceState:{dimension:this.state.mainInterfaceState.dimension,time:e.timeStamp,mouse:this.state.mainInterfaceState.mouse,keyboard:theKeyboard,touch:this.state.mainInterfaceState.touch,}});
      }
      this.scenarioChanged();
  }


  touch(e) {
      var rect = React.findDOMNode(this.refs.iiicanvas).getBoundingClientRect();
      var i;
      var touches = [];
      for (i = 0; i < e.touches.length; i++) {
          touches[i] = {};
          var offsetX = e.touches[i].clientX - rect.left;
          var offsetY = e.touches[i].clientY - rect.top;
          touches[i].position = {
              x: offsetX,
              y: offsetY
          };
          touches[i].identifier = e.touches[i].identifier;
          touches[i].radius = {
              x: e.touches[i].radiusX,
              y: e.touches[i].radiusY
          };
          touches[i].rotationAngle = e.touches[i].rotationAngle;
          touches[i].force = e.touches[i].force;
      }
      this.setState({mainInterfaceState:{dimension:this.state.mainInterfaceState.dimension,time:e.timeStamp,mouse:this.state.mainInterfaceState.mouse,keyboard:this.state.mainInterfaceState.keyboard,touch : touches}});
      this.scenarioChanged();
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
    window.addEventListener("resize", this.resize.bind(this), false);

    // Keyboard events
    iiicanvas.addEventListener("keydown", this.keydown.bind(this), false);
    iiicanvas.addEventListener("keyup", this.keyup.bind(this), false);

    // // Touch events
     iiicanvas.addEventListener("touchcancel", this.touch.bind(this), false);
     iiicanvas.addEventListener("touchend", this.touch.bind(this), false);
     iiicanvas.addEventListener("touchmove", this.touch.bind(this), false);
     iiicanvas.addEventListener("touchstart", this.touch.bind(this), false);

    // Device
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
      //var iiicanvas = React.findDOMNode(this.refs.iiicanvas);
      //iiicanvas.focus();
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

        <div className="icons" style={{
        display: this.state.openedTab === 0
          ? 'inline-block'
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

        <div style={{
        display: this.state.openedTab === 0
          ? 'inline'
          : 'none',
          overflow:"auto"
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
        <canvas ref="iiicanvas" contentEditable="true" tabIndex="1" style={{
        display: this.state.openedTab === 1
          ? 'inline'
          : 'none'
      }}  ></canvas>

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
