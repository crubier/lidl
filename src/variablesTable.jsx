var React = require('react');
var FixedDataTable = require('fixed-data-table');
var _ = require('lodash');
var Column = FixedDataTable.Column;
var ColumnGroup = FixedDataTable.ColumnGroup;
var Table = FixedDataTable.Table;
var rowNumber=5;
var scenarioUtils=require('./scenario.js');

class VariablesTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
     tableWidth: 500,
     tableHeight: 500,
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
        <div className="variablesTable" >
        <div className="icons" >

          <i className="fa fa-fast-backward fa-3x" onClick={this.props.fastBackward} >{espace}</i>
          <i className="fa fa-backward fa-3x" onClick={this.props.backward}>{espace}</i>
          <i className="fa fa-forward fa-3x" onClick={this.props.forward}>{espace}</i>
          <i className="fa fa-fast-forward fa-3x" onClick={this.props.fastForward}>{espace}</i>

        </div>



        <Table groupHeaderHeight={30} headerHeight={30} height={525} width={this.state.tableWidth} overflowX={controlledScrolling ? "hidden" : "auto"} overflowY={controlledScrolling ? "hidden" : "auto"} rowGetter={this._rowGetter.bind(this)} rowHeight={30} rowsCount={this.props.tableRowNumber} scrollLeft={this.props.left} scrollTop={this.props.top}>
          {listOfAtoms.map(function(x) {
            return (
          <ColumnGroup key={x.name} fixed={true} label={x.name}>
            <Column dataKey={x.name} fixed={true} label={x.data.name + " " + x.direction} width={150}/>
          </ColumnGroup>
          ); })}

        </Table>
      </div>
      
    );
  }

}

VariablesTable.propTypes = {
  listOfAtoms: React.PropTypes.array,
  scenario: React.PropTypes.array,
  onContentDimensionsChange: React.PropTypes.func,
  left: React.PropTypes.number,
  top: React.PropTypes.number,
  tableRowNumber: React.PropTypes.number
};

VariablesTable.defaultProps = {
  listOfAtoms: [],
  scenario: [],
  tableRowNumber: 5
};
module.exports = VariablesTable;
