import React, {
  Children,
  PropTypes,
  Component
} from 'react';

export default {
  "type": "x",
  "weight": 1,
  "select": 0,
  "content": [{
    "type": "z",
    "weight": 2,
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
      "weight": 2,
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
