var React = require('react');
var FixedDataTable = require('fixed-data-table');
var _ = require('lodash');
var Column = FixedDataTable.Column;
var ColumnGroup = FixedDataTable.ColumnGroup;
var Table = FixedDataTable.Table;
var rowNumber=5;
var scenarioUtils=require('./scenario.js');

class variablesTable extends React.Component {

  constructor(props) {
    super(props);

  }

  _rowGetter(index) {
    var prefix = "main";
    console.log("dadddoutaa "+JSON.stringify(this.props.scenario))
    var row = this.props.scenario[index];
    return scenarioUtils.flattenElement(row,prefix);
  }

  render() {

    var controlledScrolling = this.props.left !== undefined || this.props.top !== undefined;

    var listOfAtoms = this.props.listOfAtoms;
    var espace="         ";
    return (
        <div >
        <div className="icons" style={{
        display: this.props.openedTab === 0
          ? 'inline-block'
          : 'none'
      }}>

          <i className="fa fa-fast-backward fa-3x" onClick={this.props.fastBackward} style={{
          display: this.PropTypes.openedTab === 0
            ? 'inline'
            : 'none'
        }}>{espace}</i>
          <i className="fa fa-backward fa-3x" onClick={this.props.backward}style={{
          display: this.props.openedTab === 0
            ? 'inline'
            : 'none'
        }}>{espace}</i>
          <i className="fa fa-forward fa-3x" onClick={this.props.forward}style={{
          display: this.props.openedTab === 0
            ? 'inline'
            : 'none'
        }}>{espace}</i>
          <i className="fa fa-fast-forward fa-3x" onClick={this.props.fastForward}style={{
          display: this.props.openedTab === 0
            ? 'inline'
            : 'none'
        }}>{espace}</i>

        </div>

        <div style={{
        display: this.props.openedTab === 0
          ? 'inline-block'
          : 'none',
          overflow:"auto",

      }}>

        <Table groupHeaderHeight={30} headerHeight={30} height={525} width={this.props.tableWidth} overflowX={controlledScrolling ? "hidden" : "auto"} overflowY={controlledScrolling ? "hidden" : "auto"} rowGetter={this._rowGetter.bind(this)} rowHeight={30} rowsCount={this.props.tableRowNumber} scrollLeft={this.props.left} scrollTop={this.props.top}>
          {listOfAtoms.map(function(x) {
            return (
          <ColumnGroup key={x.name} fixed={true} label={x.name}>
            <Column dataKey={x.name} fixed={true} label={x.data.name + " " + x.direction} width={150}/>
          </ColumnGroup>
          ); })}

        </Table>
      </div>
      </div>
    );
  }

}

variablesTable.propTypes = {
  listOfAtoms: React.PropTypes.array,
  scenario: React.PropTypes.array,
  onContentDimensionsChange: React.PropTypes.func,
  left: React.PropTypes.number,
  top: React.PropTypes.number,
  tableRowNumber: React.PropTypes.number
};

variablesTable.defaultProps = {
  listOfAtoms: [],
  scenario: [],
  tableWidth: 500,
  tableHeight: 500,
  tableRowNumber: 5
};
module.exports = variablesTable;
