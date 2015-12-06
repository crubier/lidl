import React, {
  Children,
  PropTypes,
  Component
}
from 'react';

export default {
  "type": "x",
  "weight": 1,
  "select": false,
  "content": [{
    "type": "z",
    "weight": 2,
    "select": false,
    "content": [{
      "select": true,
      type: "p",
      "weight": 1,
      value: "a"
    }]
  }, {
    "type": "y",
    "weight": 1,
    "select": false,
    "content": [{
      "type": "z",
      "weight": 1,
      "select": false,
      "content": [{
        "select": false,
        type: "p",
        "weight": 1,
        value: "b"
      }, {
        "select": true,
        type: "p",
        "weight": 1,
        value: "c"
      }]
    }, {
      "type": "z",
      "weight": 2,
      "select": false,
      "content": [{
        "select": true,
        type: "p",
        "weight": 1,
        value: "d"
      }, {
        "select": false,
        type: "p",
        "weight": 1,
        value: "e"
      }]
    }]
  }, {
    "type": "y",
    "weight": 1,
    "select": false,
    "content": [{
      "type": "z",
      "weight": 1,
      "select": false,
      "content": [{
        "select": true,
        type: "p",
        "weight": 1,
        value: "f"
      }]
    }, {
      "type": "z",
      "weight": 1,
      "select": false,
      "content": [{
        "select": true,
        type: "p",
        "weight": 1,
        value: "g"
      }]
    }, {
      "type": "z",
      "weight": 1,
      "select": false,
      "content": [{
        "select": true,
        type: "p",
        "weight": 1,
        value: "h"
      }]
    }]
  }]
}
