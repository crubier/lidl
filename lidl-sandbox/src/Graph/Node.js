import React, {
  PropTypes,
  Component
} from 'react';

import Art from 'react-art';
const Group = Art.Group;
const Shape = Art.Shape;
const Text = Art.Text;
import Circle from 'react-art/shapes/Circle'
const Transform = Art.Transform;


export default class Node extends Component {

  constructor(props){
    super(props);
  }

  static propTypes = {
      position: PropTypes.object.isRequired,
      name: PropTypes.string.isRequired,
    };

    static defaultProps = {
      position: {x:0,y:0},
      name:"x"
    };

  render() {
    return (
        <Group x={this.props.position.x} y={this.props.position.y}>
          <Text font={'roboto'} alignment={'center'} color={'rgba(0, 0, 0,1)'}> {this.props.name}</Text>
          <Circle radius={50} fill={'rgba(0, 0, 0,0.1)'}  />
        </Group>
    );
  }
}
