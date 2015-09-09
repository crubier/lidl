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
      tableRowNumber:5,
      openedTab: 0
    };

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


backward(){
    if(rowNumber>0){
      rowNumber=rowNumber-1;
    }
    this.setState({tableRowNumber:rowNumber});
}

forward(){
    if(rowNumber<this.props.scenario.length){
      rowNumber=rowNumber+1;
    }
    this.setState({tableRowNumber:rowNumber});

}
fastBackward(){
    rowNumber=0;
    this.setState({tableRowNumber:rowNumber});
}
fastForward(){
    rowNumber=this.props.scenario.length;
    this.setState({tableRowNumber:rowNumber});
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
          <i className="fa fa-fast-backward fa-3x" onClick={this.fastBackward.bind(this)} style={{
          display: this.state.openedTab === 0
            ? 'inline'
            : 'none'
        }}>{espace}</i>
          <i className="fa fa-backward fa-3x" onClick={this.backward.bind(this)}style={{
          display: this.state.openedTab === 0
            ? 'inline'
            : 'none'
        }}>{espace}</i>
          <i className="fa fa-forward fa-3x" onClick={this.forward.bind(this)}style={{
          display: this.state.openedTab === 0
            ? 'inline'
            : 'none'
        }}>{espace}</i>
          <i className="fa fa-fast-forward fa-3x" onClick={this.fastForward.bind(this)}style={{
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
        <Table groupHeaderHeight={30} headerHeight={30} height={this.state.tableHeight} width={this.state.tableWidth} overflowX={controlledScrolling ? "hidden" : "auto"} overflowY={controlledScrolling ? "hidden" : "auto"} rowGetter={this._rowGetter.bind(this)} rowHeight={30} rowsCount={this.state.tableRowNumber} scrollLeft={this.props.left} scrollTop={this.props.top}>

          {listOfAtoms.map(function(x) {
            return (
          <ColumnGroup key={x.name} fixed={true} label={x.name}>
            <Column dataKey={x.name} fixed={true} label={x.data.name + " " + x.direction} width={150}/>
          </ColumnGroup>
          ); })}

        </Table>
        </div>
        <canvas style={{
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
  top: React.PropTypes.number
};

TraceViewer.defaultProps = {
  listOfAtoms: [],
  scenario: [],
  tableWidth: 500,
  tableHeight: 500
};
module.exports = TraceViewer;
