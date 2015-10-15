import React, {
  PropTypes,
  Component
} from 'react';

export default class Line extends Component {

static propTypes = {
      points: PropTypes.array.isRequired,
      name: PropTypes.string.isRequired,
    };

    static defaultProps = {
      position: {x:0,y:0},
      name:"x"
    };

  render() {

    return (
      <line x1={ this.props.pts[0][0] }
        y1={ this.props.pts[0][1] }
        x2={ this.props.pts[1][0] }
        y2={ this.props.pts[1][1] }
        stroke={ this.props.stroke }
        opacity={ this.props.opacity } />
    );
  }

});

module.exports = Line;
