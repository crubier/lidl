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
var edge_22427 = inactive;
var edge_22432 = inactive;
var edge_22437 = inactive;
var edge_22442 = inactive;
var edge_22474 = inactive;
var edge_22658 = inactive;
var edge_22661 = inactive;
var edge_22662 = inactive;
var edge_22666 = inactive;
var edge_22668 = inactive;
var edge_22669 = inactive;
var edge_22670 = inactive;
var edge_22671 = inactive;
var edge_22674 = inactive;
var edge_22675 = inactive;
var edge_22678 = inactive;
var edge_22682 = inactive;
var edge_22686 = inactive;
var edge_22690 = inactive;
var edge_22692 = inactive;
var edge_22693 = inactive;
var edge_22694 = inactive;
var edge_22698 = inactive;
var edge_22701 = inactive;
var edge_22705 = inactive;
var edge_22707 = inactive;
var edge_22711 = inactive;
var edge_22715 = inactive;
var edge_22719 = inactive;
var edge_22721 = inactive;
var edge_22725 = inactive;
var edge_22728 = inactive;
var edge_22729 = inactive;
var edge_22732 = inactive;
var edge_22733 = inactive;
var edge_22736 = inactive;
var edge_22737 = inactive;
var edge_22740 = inactive;
var edge_22741 = inactive;
var edge_22744 = inactive;
var edge_22745 = inactive;
var edge_22750 = inactive;
var edge_22753 = inactive;
var edge_22754 = inactive;
var edge_22757 = inactive;
var edge_22758 = inactive;
var edge_22761 = inactive;
var edge_22762 = inactive;
var edge_22764 = inactive;
var edge_22765 = inactive;
var edge_22767 = inactive;
var edge_22769 = inactive;
var edge_22773 = inactive;
var edge_22775 = inactive;
var edge_22776 = inactive;
var edge_22777 = inactive;
var edge_22778 = inactive;
var edge_22779 = inactive;
var edge_22780 = inactive;
var edge_22781 = inactive;
var edge_22782 = inactive;
var edge_22783 = inactive;
var edge_22784 = inactive;
var edge_22785 = inactive;
var edge_22786 = inactive;
var edge_22787 = inactive;
var edge_22788 = inactive;
var edge_22789 = inactive;
var edge_22790 = inactive;
var edge_22791 = inactive;
var edge_22792 = inactive;
var edge_22793 = inactive;
var edge_22794 = inactive;
var edge_22795 = inactive;
var edge_22796 = inactive;
var edge_22797 = inactive;
var edge_22798 = inactive;
var edge_22799 = inactive;
var edge_22800 = inactive;
var edge_22802 = inactive;
var edge_22803 = inactive;
var edge_22804 = inactive;
var edge_22805 = inactive;
var edge_22806 = inactive;
var edge_22808 = inactive;
var edge_22809 = inactive;
var edge_22810 = inactive;
var edge_22812 = inactive;
var edge_22813 = inactive;
var edge_22814 = inactive;
var edge_22816 = inactive;
var edge_22817 = inactive;
var edge_22818 = inactive;
var edge_22820 = inactive;
var edge_22821 = inactive;
var edge_22822 = inactive;
var edge_22824 = inactive;
var edge_22825 = inactive;
var edge_22826 = inactive;
var edge_22828 = inactive;
var edge_22829 = inactive;
var edge_22830 = inactive;

///////////////////////////////////////////////////////////////////////
// Data flow processing (Nodes of the graph)
// node_22423
edge_22674 = "Labeltext";
// node_22421
edge_22670 = "OK";
// node_22418
edge_22828 = 0.5;
// node_22827
edge_22829 = edge_22828;
edge_22830 = edge_22828;
// node_22416
edge_22767 = 0;
// node_22766
edge_22769 = {};
edge_22769['start'] = edge_22767;
edge_22769['end'] = edge_22829;
// node_22412
edge_22816 = 1;
// node_22815
edge_22817 = edge_22816;
edge_22818 = edge_22816;
// node_22770
edge_22773 = {};
edge_22773['start'] = edge_22830;
edge_22773['end'] = edge_22818;
// node_22409
edge_22661 = 20;
// node_22407
edge_22474 = cursor;
// node_22404
edge_22812 = columnElement;
// node_22811
edge_22813 = edge_22812;
edge_22814 = edge_22812;
// node_22401
edge_22808 = group;
// node_22807
edge_22809 = edge_22808;
edge_22810 = edge_22808;
// node_22396
edge_22802 = all;
// node_22801
edge_22803 = edge_22802;
edge_22804 = edge_22802;
edge_22805 = edge_22802;
edge_22806 = edge_22802;
// node_22394
edge_22442 = label;
// node_22392
edge_22432 = isEqual;
// node_22390
edge_22427 = inset;
// node_22388
edge_22437 = button;
// node_22301
edge_22775 = active;
// node_22774
edge_22776 = edge_22775;
edge_22777 = edge_22775;
edge_22778 = edge_22775;
edge_22779 = edge_22775;
edge_22780 = edge_22775;
edge_22781 = edge_22775;
edge_22782 = edge_22775;
edge_22783 = edge_22775;
edge_22784 = edge_22775;
edge_22785 = edge_22775;
edge_22786 = edge_22775;
edge_22787 = edge_22775;
edge_22788 = edge_22775;
edge_22789 = edge_22775;
edge_22790 = edge_22775;
edge_22791 = edge_22775;
edge_22792 = edge_22775;
edge_22793 = edge_22775;
edge_22794 = edge_22775;
edge_22795 = edge_22775;
edge_22796 = edge_22775;
edge_22797 = edge_22775;
edge_22798 = edge_22775;
edge_22799 = edge_22775;
edge_22800 = edge_22775;
// node_22482
if(edge_22785 === active && edge_22806!==null && edge_22806!==undefined) {edge_22701 = edge_22806(edge_22790);}
// node_22699
edge_22719 = edge_22701['a'];
// node_22477
if(edge_22784 === active && edge_22805!==null && edge_22805!==undefined) {edge_22698 = edge_22805(edge_22789);}
// node_22695
edge_22711 = edge_22698['a'];
edge_22715 = edge_22698['b'];
// node_22467
if(edge_22782 === active && edge_22804!==null && edge_22804!==undefined) {edge_22694 = edge_22804(edge_22788);}
// node_22691
edge_22692 = edge_22694['a'];
edge_22693 = edge_22694['b'];
// node_22445
if(edge_22780 === active && edge_22803!==null && edge_22803!==undefined) {edge_22678 = edge_22803(edge_22787);}
// node_22676
edge_22707 = edge_22678['a'];
// node_21523
edge_22721=theInterface.layout;
// node_22718
if(edge_22719 === active) {edge_22750 = edge_22721;}
// node_22746
if(edge_22797 === active) {edge_22824 = edge_22750;}
// node_22823
edge_22825 = edge_22824;
edge_22826 = edge_22824;
// node_22687
edge_22690 = {};
edge_22690['interval'] = edge_22773;
edge_22690['rect'] = edge_22826;
// node_22461
if(edge_22693 === active && edge_22814!==null && edge_22814!==undefined) {edge_22741 = edge_22814(edge_22690);}
// node_22738
if(edge_22795 === active) {edge_22740 = edge_22741;}
// node_22672
edge_22675 = {};
edge_22675['layout'] = edge_22740;
edge_22675['text'] = edge_22674;
// node_22440
if(edge_22779 === active && edge_22442!==null && edge_22442!==undefined) {edge_22736 = edge_22442(edge_22675);}
// node_22734
if(edge_22794 === active) {edge_22737 = edge_22736;}
// node_22683
edge_22686 = {};
edge_22686['interval'] = edge_22769;
edge_22686['rect'] = edge_22825;
// node_22455
if(edge_22692 === active && edge_22813!==null && edge_22813!==undefined) {edge_22733 = edge_22813(edge_22686);}
// node_22730
if(edge_22793 === active) {edge_22732 = edge_22733;}
// node_22659
edge_22662 = {};
edge_22662['rect'] = edge_22732;
edge_22662['margin'] = edge_22661;
// node_22425
if(edge_22776 === active && edge_22427!==null && edge_22427!==undefined) {edge_22668 = edge_22427(edge_22662);}
// node_21521
edge_22820=theInterface.mouse;
// node_22819
edge_22821 = edge_22820;
edge_22822 = edge_22820;
// node_22714
if(edge_22715 === active) {edge_22758 = edge_22822;}
// node_22755
if(edge_22799 === active) {edge_22757 = edge_22758;}
// node_22472
if(edge_22783 === active && edge_22474!==null && edge_22474!==undefined) {edge_22761 = edge_22474(edge_22757);}
// node_22759
if(edge_22800 === active) {edge_22762 = edge_22761;}
// node_22710
if(edge_22711 === active) {edge_22745 = edge_22821;}
// node_22742
if(edge_22796 === active) {edge_22744 = edge_22745;}
// node_22706
if(edge_22707 === active) {edge_22725 = edge_22744;}
// node_22722
if(edge_22791 === active) {edge_22765 = edge_22725;}
// node_22763
edge_22764 = edge_22765['buttons'];
// node_22663
edge_22666 = {};
edge_22666['a'] = edge_22764;
edge_22666['b'] = edge_22817;
// node_22430
if(edge_22777 === active && edge_22432!==null && edge_22432!==undefined) {edge_22669 = edge_22432(edge_22666);}
// node_22667
edge_22671 = {};
edge_22671['layout'] = edge_22668;
edge_22671['text'] = edge_22670;
edge_22671['pushed'] = edge_22669;
// node_22435
if(edge_22778 === active && edge_22437!==null && edge_22437!==undefined) {edge_22728 = edge_22437(edge_22671);}
// node_22726
if(edge_22792 === active) {edge_22729 = edge_22728;}
// node_22679
edge_22682 = {};
edge_22682['a'] = edge_22729;
edge_22682['b'] = edge_22737;
// node_22450
if(edge_22781 === active && edge_22809!==null && edge_22809!==undefined) {edge_22753 = edge_22809(edge_22682);}
// node_22751
if(edge_22798 === active) {edge_22754 = edge_22753;}
// node_22702
edge_22705 = {};
edge_22705['a'] = edge_22754;
edge_22705['b'] = edge_22762;
// node_22487
if(edge_22786 === active && edge_22810!==null && edge_22810!==undefined) {edge_22658 = edge_22810(edge_22705);}
// node_21525
theInterface.graphics=edge_22658;


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