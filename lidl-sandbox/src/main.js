import React from 'react';
import Container from './Container';

export default class DustbinSingleTarget {
  render() {
    return (
      <div style={{
        overflow: 'auto',
        display: 'inline-block',
        width: '100%',
        height: '100%',
        backgroundColor:'rgb(244, 244, 244)'
      }}>
        <Container />
      </div>
    );
  }
}


React.render(<DustbinSingleTarget/>, document.getElementById("main"));
