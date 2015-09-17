var React = require('react');
var iii = require('iii');

class Analyse extends React.Component {
  constructor(props) {
    super(props);
  }





            render() {
              return (

                <div className="analyse" style={{
                  display: this.props.openedTab === 2
                    ? 'inline-block'
                    : 'none',
                    overflow:"auto",
                }}>
              <div className="Tab compiledInteraction" style={{
                display: this.props.openedTab === 2
                  ? 'inline-block'
                  : 'none',
                  overflow:"auto",
              }} >{this.props.compiledInteraction}</div>
              <p style={{
                display: this.props.openedTab === 2
                  ? 'inline-block'
                  : 'none',
                  overflow:"auto",
              }} >{ "Number of previous :" + this.props.stats.previous} </p>
              <br/>
              <br/>
              <p style={{
                display: this.props.openedTab === 2
                  ? 'inline-block'
                  : 'none',
                  overflow:"auto",
              }} > { "Number of identifiers :" + this.props.stats.identifiers} </p>
              <br/>
              <br/>
              <p style={{
                display: this.props.openedTab === 2
                  ? 'inline-block'
                  : 'none',
                  overflow:"auto",
              }} > { "Number of functions :" + this.props.stats.functions} </p>
              <br/>
              <br/>
              <p style={{
                display: this.props.openedTab === 2
                  ? 'inline-block'
                  : 'none',
                  overflow:"auto",
              }} > { "Number of compositions :" + this.props.stats.compositions} </p>
              <br/>
              <br/>
              <p style={{
                display: this.props.openedTab === 2
                  ? 'inline-block'
                  : 'none',
                  overflow:"auto",
              }} > { "Number of variables :" + (this.props.stats.identifiers+this.props.stats.previous)} </p>
              <br/>
              <br/>
              <p style={{
                display: this.props.openedTab === 2
                  ? 'inline-block'
                  : 'none',
                  overflow:"auto",
              }} > { "Total of interactions :" + (this.props.stats.identifiers+this.props.stats.previous+this.props.stats.compositions+ this.props.stats.functions)} </p>
              <br/>
              <br/>


                    </div>
                  );
                }
                }

            Analyse.propTypes = {
              stats: React.PropTypes.object,
              compiledInteraction:React.PropTypes.string,
              openedTab: React.PropTypes.number,

            };

            Analyse.defaultProps = {
              stats: {variables:0,previous:0,identifiers:0,functions:0,compositions:0},
              compiledInteraction:"({x:(previous(#0)),y:(#0),z:(#1)})",
              openedTab:0
            };

            module.exports = Analyse;
