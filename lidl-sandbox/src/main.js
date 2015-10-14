import React from 'react';
import Container from './Container';

export default class DustbinSingleTarget {
  render() {
    return (
      <div>
        <Container />
      </div>
    );
  }
}


React.render(<DustbinSingleTarget/>, document.getElementById("main"));
