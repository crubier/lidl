import React, {
  Children,
  PropTypes,
  Component
} from 'react';

export default {
  views:{
    a:{name:'the A',value:<div style={{flexGrow:1,alignSelf: 'stretch',backgroundColor:'rgb(255, 231, 231)'}}>OK a</div>},
    b:{name:'the B',value:<div style={{flexGrow:1,alignSelf: 'stretch',backgroundColor:'rgb(255, 245, 231)'}}>OK b</div>},
    c:{name:'the C',value:<div style={{flexGrow:1,alignSelf: 'stretch',backgroundColor:'rgb(254, 255, 231)'}}>OK c</div>},
    d:{name:'the D',value:<div style={{flexGrow:1,alignSelf: 'stretch',backgroundColor:'rgb(242, 255, 231)'}}>OK d</div>},
    e:{name:'the E',value:<div style={{flexGrow:1,alignSelf: 'stretch',backgroundColor:'rgb(231, 255, 238)'}}>OK e</div>},
    f:{name:'the F',value:<div style={{flexGrow:1,alignSelf: 'stretch',backgroundColor:'rgb(231, 251, 255)'}}>OK f</div>},
    g:{name:'the G',value:<div style={{flexGrow:1,alignSelf: 'stretch',backgroundColor:'rgb(231, 232, 255)'}}>OK g</div>},
    h:{name:'the H',value:<div style={{flexGrow:1,alignSelf: 'stretch',backgroundColor:'rgb(254, 231, 255)'}}>OK h</div>}
  },
  model:{
  "type": "x",
  "weight": 1,
  "select": 0,
  "content": [{
    "type": "z",
    "weight": 1,
    "select": 0,
    "content": [{
      type: "p",
      "weight": 1,
      value: "a"
    }]
  }, {
    "type": "y",
    "weight": 1,
    "select": 0,
    "content": [{
      "type": "z",
      "weight": 1,
      "select": 0,
      "content": [{
        type: "p",
        "weight": 1,
        value: "b"
      }, {
        type: "p",
        "weight": 1,
        value: "c"
      }]
    }, {
      "type": "z",
      "weight": 1,
      "select": 1,
      "content": [{
        type: "p",
        "weight": 1,
        value: "d"
      }, {
        type: "p",
        "weight": 1,
        value: "e"
      }]
    }]
  }, {
    "type": "y",
    "weight": 1,
    "select": 0,
    "content": [{
      "type": "z",
      "weight": 1,
      "select": 0,
      "content": [{
        type: "p",
        "weight": 1,
        value: "f"
      }]
    }, {
      "type": "z",
      "weight": 1,
      "select": 0,
      "content": [{
        type: "p",
        "weight": 1,
        value: "g"
      }]
    }, {
      "type": "z",
      "weight": 1,
      "select": 0,
      "content": [{
        type: "p",
        "weight": 1,
        value: "h"
      }]
    }]
  }]
}
}
