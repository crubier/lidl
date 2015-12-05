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
    },
  model:{
    "type": "z",
    "weight": 1,
    "select": 0,
    "content": [{
      type: "p",
      "weight": 1,
      value: "a"
    },{
      type: "p",
      "weight": 1,
      value: "b"
    },{
      type: "p",
      "weight": 1,
      value: "c"
    }]
}}
