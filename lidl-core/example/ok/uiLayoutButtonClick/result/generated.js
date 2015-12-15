function transitionFunction(data){
///////////////////////////////////////////////////////////////////////
// Standard LIDL Header (Standard JS function definitions)
function clone(a) {if (!a) return a;var c, b = [Number, String, Boolean];if (b.forEach(function(b) { a instanceof b && (c = b(a)); }), "undefined" == typeof c) if ("[object Array]" === Object.prototype.toString.call(a)) c = [], a.forEach(function(a, b, d) { c[b] = clone(a); }); else if ("object" == typeof a) if (a.nodeType && "function" == typeof a.cloneNode) c = a.cloneNode(!0); else if (a.prototype) c = a; else if (a instanceof Date) c = new Date(a); else { c = {}; for (var d in a) c[d] = clone(a[d]); } else c = a; return c;}

var theInterface = clone(data.inter);
var previousState = data.state;
var nextState = clone(previousState);
var theArgs = clone(data.args);
var active = "lidl_active_value";
var inactive = null;


///////////////////////////////////////////////////////////////////////
// Custom LIDL Header (Custom JS function definitions)
var isActive = function(_) {
  return (_ !== null && _ !== undefined);
};

var cool = function(_) {
  if (isActive(_.a) && isActive(_.b)) {
    return {
      sum: (_.a + _.b),
      diff: (_.a - _.b)
    };
  } else {
    return {
      sum: inactive,
      diff: inactive
    };
  }
};

var fallback = function(_) {
  return (isActive(_.a) ? _.a : _.b);
};

var return0 = function(_) {
  return 0;
};


var return1 = function(_) {
  return 1;
};

var addition = function(_) {
  if (isActive(_.a) && isActive(_.b)) {
    return _.a + _.b;
  } else {
    return inactive;
  }
};

var multiplication = function(_) {
  if (isActive(_.a) && isActive(_.b)) {
    return _.a * _.b;
  } else {
    return inactive;
  }
};

var substraction = function(_) {
  if (isActive(_.a) && isActive(_.b)) {
    return _.a - _.b;
  } else {
    return inactive;
  }
};

var division = function(_) {
  if (isActive(_.a) && isActive(_.b)) {
    return _.a / _.b;
  } else {
    return inactive;
  }
};

var remainder = function(_) {
  if (isActive(_.a) && isActive(_.b)) {
    return _.a % _.b;
  } else {
    return inactive;
  }
};

var power = function(_) {
  if (isActive(_.a) && isActive(_.b)) {
    return Math.pow(_.a, _.b);
  } else {
    return inactive;
  }
};

var addOne = function(_) {
  if (isActive(_))
    return _ + 1;
  else {
    return inactive;
  }
};

var identity = function(_) {
  return _;
};

var isEqual = function(_) {
  if (isActive(_.a) && isActive(_.b)) {
    return (_.a === _.b) ? true : false;
  } else {
    return inactive;
  }
};


var boolNot = function(_) {
  if (isActive(_)) {
    return !_;
  } else {
    return inactive;
  }
};

var boolAnd = function(_) {
  if (isActive(_) && isActive(_.a) && isActive(_.b)) {
    return _.a && _.b;
  } else {
    return inactive;
  }
};

var boolOr = function(_) {
  if (isActive(_)&& isActive(_.a) && isActive(_.b)) {
    return _.a || _.b;
  } else {
    return inactive;
  }
};

var boolXor = function(_) {
  if (isActive(_)&& isActive(_.a) && isActive(_.b)) {
    return ( _.a && !_.b ) || ( !_.a && _.b ) ;
  } else {
    return inactive;
  }
};


var ifThenElse = function(_) {
  if (isActive(_)) {
    if (isActive(_.cond)) {
      if (_.cond === true) {
        return _.a;
      } else if (_.cond === false) {
        return _.b;
      } else {
        return inactive;
      }
    } else {
      return inactive;
    }
  } else {
    return inactive;
  }
};


var whenThenElse = function(_) {
  if (isActive(_)) {
    if (isActive(_.cond)) {
      if (_.cond === true) {
        return {
          a: active,
          b: inactive
        };
      } else if (_.cond === false) {
        return {
          a: inactive,
          b: active
        };
      } else {
        return inactive;
      }
    } else {
      return inactive;
    }
  } else {
    return inactive;
  }
};


var all = function(_) {
  return {
    a: _,
    b: _,
    c: _,
    d: _,
    e: _,
    f: _,
    g: _,
    h: _,
    i: _,
    j: _,
    k: _,
    l: _,
    m: _,
    n: _,
    o: _,
    p: _
  };
};


var cursor = function(mouse) {
  var cursor = {
    type: "shadow",
    blur: mouse.buttons === 0 ? 20 : 10,
    offset: {
      x: 0,
      y: mouse.buttons === 0 ? 4 : 2
    },
    color: "rgba(0, 0, 0, 0.5)",
    content: {
      type: "translate",
      x: mouse.position.x,
      y: mouse.position.y,
      content: {
        type: "scale",
        width: mouse.buttons === 0 ? 1 : 0.8,
        height: mouse.buttons === 0 ? 1 : 0.8,
        content: {
          type: "fill",
          style: "rgba(200, 0, 200, 1)",
          content: {
            type: "path",
            content: [{
              type: "begin"
            }, {
              type: "move",
              x: 0,
              y: 0
            }, {
              type: "line",
              x: 0,
              y: 15
            }, {
              type: "line",
              x: 10.6,
              y: 10.6
            }, {
              type: "close"
            }]
          }
        }
      }
    }
  };
  return cursor;
}



var button = function(button) {
  var button = {
    type: "shadow",
    blur: button.pushed ? 10 : 20,
    offset: {
      x: 0,
      y: button.pushed ? 2 : 4
    },
    color: "rgba(0, 0, 0, 0.5)",
    content: {
      type: "group",
      content: [{
        type: "fill",
        style: "rgba(0, 171, 255, 1)",
        content: {
          type: "rect",
          x: button.layout.x,
          y: button.layout.y,
          width: button.layout.width,
          height: button.layout.height
        }
      }, {
        type: "fill",
        style: "rgba(255, 255, 255, 1)",
        content: {
          type: "text",
          textBaseline: "middle",
          textAlign: "center",
          font: "200 30px Helvetica neue",
          text: button.text,
          x: button.layout.x + button.layout.width / 2,
          y: button.layout.y + button.layout.height / 2
        }
      }]
    }
  };
  return button;
}




var label = function(_) {
  var label = {
        type: "fill",
        style: "rgba(56, 56, 56, 1)",
        content: {
          type: "text",
          textBaseline: "middle",
          textAlign: "center",
          font: "200 30px Helvetica neue",
          text: _.text,
          x: _.layout.x + _.layout.width / 2,
          y: _.layout.y + _.layout.height / 2
        }
      };
  return label;
}



var group = function(elements) {
  var group = {
      type: "group",
      content: [elements.a,elements.b ]
    };
  return group;
}

// Checks if a point is inside a rectangle (picking)
var isInside = function(_){
  if(isActive(_) && isActive(_.point) && isActive(_.rect)){
    return _.point.x >= _.rect.x && _.point.x <= _.rect.x + _.rect.width && _.point.y >= _.rect.y && _.point.y <= _.rect.y + _.rect.height;
  } else {
    return inactive;
  }
}

// Returns a rectangle which is a fraction of a column of another rectanle
var columnElement = function(_){
  if(isActive(_) && isActive(_.interval) && isActive(_.rect)){
    return {x:_.rect.x,y:_.rect.y+_.interval.start*_.rect.height,width:_.rect.width,height:_.rect.height*(_.interval.end - _.interval.start)};
  } else {
    return inactive;
  }
}

// Returns a rectangle which is a fraction of a column of another rectanle
var rowElement = function(_){
  if(isActive(_) && isActive(_.interval) && isActive(_.rect)){
    return {y:_.rect.y,x:_.rect.x+_.interval.start*_.rect.width,height:_.rect.height,width:_.rect.width*(_.interval.end - _.interval.start)};
  } else {
    return inactive;
  }
}

// Returns a rectangle which is inset with a margin inside a bigger rectangle
var inset = function(_){
  if(isActive(_) && isActive(_.margin) && isActive(_.rect)){
    return {x:_.rect.x + _.margin,y:_.rect.y + _.margin,width:_.rect.width-2*_.margin,height:_.rect.height-2*_.margin};
  } else {
    return inactive;
  }
}


///////////////////////////////////////////////////////////////////////
// Declaration of variables (Edges of the graph)
var edge_22669 = inactive;
var edge_22674 = inactive;
var edge_22679 = inactive;
var edge_22684 = inactive;
var edge_22689 = inactive;
var edge_22694 = inactive;
var edge_22726 = inactive;
var edge_22918 = inactive;
var edge_22921 = inactive;
var edge_22922 = inactive;
var edge_22926 = inactive;
var edge_22930 = inactive;
var edge_22932 = inactive;
var edge_22933 = inactive;
var edge_22934 = inactive;
var edge_22936 = inactive;
var edge_22937 = inactive;
var edge_22938 = inactive;
var edge_22939 = inactive;
var edge_22942 = inactive;
var edge_22943 = inactive;
var edge_22946 = inactive;
var edge_22950 = inactive;
var edge_22954 = inactive;
var edge_22958 = inactive;
var edge_22960 = inactive;
var edge_22961 = inactive;
var edge_22962 = inactive;
var edge_22966 = inactive;
var edge_22969 = inactive;
var edge_22973 = inactive;
var edge_22975 = inactive;
var edge_22979 = inactive;
var edge_22983 = inactive;
var edge_22987 = inactive;
var edge_22989 = inactive;
var edge_22993 = inactive;
var edge_22996 = inactive;
var edge_22997 = inactive;
var edge_23002 = inactive;
var edge_23005 = inactive;
var edge_23006 = inactive;
var edge_23009 = inactive;
var edge_23010 = inactive;
var edge_23013 = inactive;
var edge_23014 = inactive;
var edge_23019 = inactive;
var edge_23022 = inactive;
var edge_23023 = inactive;
var edge_23026 = inactive;
var edge_23027 = inactive;
var edge_23030 = inactive;
var edge_23031 = inactive;
var edge_23033 = inactive;
var edge_23034 = inactive;
var edge_23035 = inactive;
var edge_23037 = inactive;
var edge_23039 = inactive;
var edge_23043 = inactive;
var edge_23045 = inactive;
var edge_23046 = inactive;
var edge_23047 = inactive;
var edge_23048 = inactive;
var edge_23049 = inactive;
var edge_23050 = inactive;
var edge_23051 = inactive;
var edge_23052 = inactive;
var edge_23053 = inactive;
var edge_23054 = inactive;
var edge_23055 = inactive;
var edge_23056 = inactive;
var edge_23057 = inactive;
var edge_23058 = inactive;
var edge_23059 = inactive;
var edge_23060 = inactive;
var edge_23061 = inactive;
var edge_23062 = inactive;
var edge_23063 = inactive;
var edge_23064 = inactive;
var edge_23065 = inactive;
var edge_23066 = inactive;
var edge_23067 = inactive;
var edge_23068 = inactive;
var edge_23069 = inactive;
var edge_23070 = inactive;
var edge_23071 = inactive;
var edge_23072 = inactive;
var edge_23074 = inactive;
var edge_23075 = inactive;
var edge_23076 = inactive;
var edge_23077 = inactive;
var edge_23078 = inactive;
var edge_23080 = inactive;
var edge_23081 = inactive;
var edge_23082 = inactive;
var edge_23084 = inactive;
var edge_23085 = inactive;
var edge_23086 = inactive;
var edge_23088 = inactive;
var edge_23089 = inactive;
var edge_23090 = inactive;
var edge_23092 = inactive;
var edge_23093 = inactive;
var edge_23094 = inactive;
var edge_23096 = inactive;
var edge_23097 = inactive;
var edge_23098 = inactive;
var edge_23100 = inactive;
var edge_23101 = inactive;
var edge_23102 = inactive;
var edge_23104 = inactive;
var edge_23105 = inactive;
var edge_23106 = inactive;

///////////////////////////////////////////////////////////////////////
// Data flow processing (Nodes of the graph)
// node_22665
edge_22942 = "Labeltext";
// node_22663
edge_22938 = "OK";
// node_22660
edge_23104 = 0.5;
// node_23103
edge_23105 = edge_23104;
edge_23106 = edge_23104;
// node_22658
edge_23037 = 0;
// node_23036
edge_23039 = {};
edge_23039['start'] = edge_23037;
edge_23039['end'] = edge_23105;
// node_22654
edge_23088 = 1;
// node_23087
edge_23089 = edge_23088;
edge_23090 = edge_23088;
// node_23040
edge_23043 = {};
edge_23043['start'] = edge_23106;
edge_23043['end'] = edge_23090;
// node_22651
edge_22921 = 20;
// node_22649
edge_22726 = cursor;
// node_22646
edge_23084 = columnElement;
// node_23083
edge_23085 = edge_23084;
edge_23086 = edge_23084;
// node_22643
edge_23080 = group;
// node_23079
edge_23081 = edge_23080;
edge_23082 = edge_23080;
// node_22638
edge_23074 = all;
// node_23073
edge_23075 = edge_23074;
edge_23076 = edge_23074;
edge_23077 = edge_23074;
edge_23078 = edge_23074;
// node_22636
edge_22694 = label;
// node_22634
edge_22684 = boolAnd;
// node_22632
edge_22679 = isInside;
// node_22630
edge_22674 = isEqual;
// node_22628
edge_22669 = inset;
// node_22626
edge_22689 = button;
// node_22533
edge_23045 = active;
// node_23044
edge_23046 = edge_23045;
edge_23047 = edge_23045;
edge_23048 = edge_23045;
edge_23049 = edge_23045;
edge_23050 = edge_23045;
edge_23051 = edge_23045;
edge_23052 = edge_23045;
edge_23053 = edge_23045;
edge_23054 = edge_23045;
edge_23055 = edge_23045;
edge_23056 = edge_23045;
edge_23057 = edge_23045;
edge_23058 = edge_23045;
edge_23059 = edge_23045;
edge_23060 = edge_23045;
edge_23061 = edge_23045;
edge_23062 = edge_23045;
edge_23063 = edge_23045;
edge_23064 = edge_23045;
edge_23065 = edge_23045;
edge_23066 = edge_23045;
edge_23067 = edge_23045;
edge_23068 = edge_23045;
edge_23069 = edge_23045;
edge_23070 = edge_23045;
edge_23071 = edge_23045;
edge_23072 = edge_23045;
// node_22734
if(edge_23057 === active && edge_23078!==null && edge_23078!==undefined) {edge_22969 = edge_23078(edge_23062);}
// node_22967
edge_22987 = edge_22969['a'];
// node_22729
if(edge_23056 === active && edge_23077!==null && edge_23077!==undefined) {edge_22966 = edge_23077(edge_23061);}
// node_22963
edge_22979 = edge_22966['a'];
edge_22983 = edge_22966['b'];
// node_22719
if(edge_23054 === active && edge_23076!==null && edge_23076!==undefined) {edge_22962 = edge_23076(edge_23060);}
// node_22959
edge_22960 = edge_22962['a'];
edge_22961 = edge_22962['b'];
// node_22697
if(edge_23052 === active && edge_23075!==null && edge_23075!==undefined) {edge_22946 = edge_23075(edge_23059);}
// node_22944
edge_22975 = edge_22946['a'];
// node_21694
edge_22989=theInterface.layout;
// node_22986
if(edge_22987 === active) {edge_23019 = edge_22989;}
// node_23015
if(edge_23069 === active) {edge_23100 = edge_23019;}
// node_23099
edge_23101 = edge_23100;
edge_23102 = edge_23100;
// node_22955
edge_22958 = {};
edge_22958['interval'] = edge_23043;
edge_22958['rect'] = edge_23102;
// node_22713
if(edge_22961 === active && edge_23086!==null && edge_23086!==undefined) {edge_23010 = edge_23086(edge_22958);}
// node_23007
if(edge_23067 === active) {edge_23009 = edge_23010;}
// node_22940
edge_22943 = {};
edge_22943['layout'] = edge_23009;
edge_22943['text'] = edge_22942;
// node_22692
if(edge_23051 === active && edge_22694!==null && edge_22694!==undefined) {edge_23005 = edge_22694(edge_22943);}
// node_23003
if(edge_23066 === active) {edge_23006 = edge_23005;}
// node_22951
edge_22954 = {};
edge_22954['interval'] = edge_23039;
edge_22954['rect'] = edge_23101;
// node_22707
if(edge_22960 === active && edge_23085!==null && edge_23085!==undefined) {edge_23002 = edge_23085(edge_22954);}
// node_22998
if(edge_23065 === active) {edge_23096 = edge_23002;}
// node_23095
edge_23097 = edge_23096;
edge_23098 = edge_23096;
// node_22919
edge_22922 = {};
edge_22922['rect'] = edge_23097;
edge_22922['margin'] = edge_22921;
// node_22667
if(edge_23046 === active && edge_22669!==null && edge_22669!==undefined) {edge_22936 = edge_22669(edge_22922);}
// node_21692
edge_23092=theInterface.mouse;
// node_23091
edge_23093 = edge_23092;
edge_23094 = edge_23092;
// node_22982
if(edge_22983 === active) {edge_23027 = edge_23094;}
// node_23024
if(edge_23071 === active) {edge_23026 = edge_23027;}
// node_22724
if(edge_23055 === active && edge_22726!==null && edge_22726!==undefined) {edge_23030 = edge_22726(edge_23026);}
// node_23028
if(edge_23072 === active) {edge_23031 = edge_23030;}
// node_22978
if(edge_22979 === active) {edge_23014 = edge_23093;}
// node_23011
if(edge_23068 === active) {edge_23013 = edge_23014;}
// node_22974
if(edge_22975 === active) {edge_22993 = edge_23013;}
// node_22990
if(edge_23063 === active) {edge_23035 = edge_22993;}
// node_23032
edge_23033 = edge_23035['buttons'];
edge_23034 = edge_23035['position'];
// node_22927
edge_22930 = {};
edge_22930['point'] = edge_23034;
edge_22930['rect'] = edge_23098;
// node_22677
if(edge_23048 === active && edge_22679!==null && edge_22679!==undefined) {edge_22933 = edge_22679(edge_22930);}
// node_22923
edge_22926 = {};
edge_22926['a'] = edge_23033;
edge_22926['b'] = edge_23089;
// node_22672
if(edge_23047 === active && edge_22674!==null && edge_22674!==undefined) {edge_22932 = edge_22674(edge_22926);}
// node_22931
edge_22934 = {};
edge_22934['a'] = edge_22932;
edge_22934['b'] = edge_22933;
// node_22682
if(edge_23049 === active && edge_22684!==null && edge_22684!==undefined) {edge_22937 = edge_22684(edge_22934);}
// node_22935
edge_22939 = {};
edge_22939['layout'] = edge_22936;
edge_22939['text'] = edge_22938;
edge_22939['pushed'] = edge_22937;
// node_22687
if(edge_23050 === active && edge_22689!==null && edge_22689!==undefined) {edge_22996 = edge_22689(edge_22939);}
// node_22994
if(edge_23064 === active) {edge_22997 = edge_22996;}
// node_22947
edge_22950 = {};
edge_22950['a'] = edge_22997;
edge_22950['b'] = edge_23006;
// node_22702
if(edge_23053 === active && edge_23081!==null && edge_23081!==undefined) {edge_23022 = edge_23081(edge_22950);}
// node_23020
if(edge_23070 === active) {edge_23023 = edge_23022;}
// node_22970
edge_22973 = {};
edge_22973['a'] = edge_23023;
edge_22973['b'] = edge_23031;
// node_22739
if(edge_23058 === active && edge_23082!==null && edge_23082!==undefined) {edge_22918 = edge_23082(edge_22973);}
// node_21696
theInterface.graphics=edge_22918;


///////////////////////////////////////////////////////////////////////
// Return statement
  return {
      memo: {},
      state: nextState,
      args: theArgs,
      inter: theInterface
    };

}

function initializationFunction(data){
return {
      memo: {},
      state: {},
      args: {},
      inter: {}
    };

}

module.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};