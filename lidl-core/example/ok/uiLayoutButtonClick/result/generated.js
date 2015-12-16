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

var toString = function(_){
  if(isActive(_)){
    return _+"";
  } else {
    return inactive;
  }
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
var edge_27400 = inactive;
var edge_27405 = inactive;
var edge_27410 = inactive;
var edge_27415 = inactive;
var edge_27420 = inactive;
var edge_27425 = inactive;
var edge_27457 = inactive;
var edge_27649 = inactive;
var edge_27652 = inactive;
var edge_27653 = inactive;
var edge_27657 = inactive;
var edge_27661 = inactive;
var edge_27663 = inactive;
var edge_27664 = inactive;
var edge_27665 = inactive;
var edge_27667 = inactive;
var edge_27668 = inactive;
var edge_27669 = inactive;
var edge_27670 = inactive;
var edge_27673 = inactive;
var edge_27674 = inactive;
var edge_27677 = inactive;
var edge_27681 = inactive;
var edge_27685 = inactive;
var edge_27689 = inactive;
var edge_27691 = inactive;
var edge_27692 = inactive;
var edge_27693 = inactive;
var edge_27697 = inactive;
var edge_27700 = inactive;
var edge_27704 = inactive;
var edge_27706 = inactive;
var edge_27710 = inactive;
var edge_27714 = inactive;
var edge_27718 = inactive;
var edge_27720 = inactive;
var edge_27724 = inactive;
var edge_27727 = inactive;
var edge_27728 = inactive;
var edge_27733 = inactive;
var edge_27736 = inactive;
var edge_27737 = inactive;
var edge_27740 = inactive;
var edge_27741 = inactive;
var edge_27744 = inactive;
var edge_27745 = inactive;
var edge_27750 = inactive;
var edge_27753 = inactive;
var edge_27754 = inactive;
var edge_27757 = inactive;
var edge_27758 = inactive;
var edge_27761 = inactive;
var edge_27762 = inactive;
var edge_27764 = inactive;
var edge_27765 = inactive;
var edge_27766 = inactive;
var edge_27768 = inactive;
var edge_27770 = inactive;
var edge_27774 = inactive;
var edge_27776 = inactive;
var edge_27777 = inactive;
var edge_27778 = inactive;
var edge_27779 = inactive;
var edge_27780 = inactive;
var edge_27781 = inactive;
var edge_27782 = inactive;
var edge_27783 = inactive;
var edge_27784 = inactive;
var edge_27785 = inactive;
var edge_27786 = inactive;
var edge_27787 = inactive;
var edge_27788 = inactive;
var edge_27789 = inactive;
var edge_27790 = inactive;
var edge_27791 = inactive;
var edge_27792 = inactive;
var edge_27793 = inactive;
var edge_27794 = inactive;
var edge_27795 = inactive;
var edge_27796 = inactive;
var edge_27797 = inactive;
var edge_27798 = inactive;
var edge_27799 = inactive;
var edge_27800 = inactive;
var edge_27801 = inactive;
var edge_27802 = inactive;
var edge_27803 = inactive;
var edge_27805 = inactive;
var edge_27806 = inactive;
var edge_27807 = inactive;
var edge_27808 = inactive;
var edge_27809 = inactive;
var edge_27811 = inactive;
var edge_27812 = inactive;
var edge_27813 = inactive;
var edge_27815 = inactive;
var edge_27816 = inactive;
var edge_27817 = inactive;
var edge_27819 = inactive;
var edge_27820 = inactive;
var edge_27821 = inactive;
var edge_27823 = inactive;
var edge_27824 = inactive;
var edge_27825 = inactive;
var edge_27827 = inactive;
var edge_27828 = inactive;
var edge_27829 = inactive;
var edge_27831 = inactive;
var edge_27832 = inactive;
var edge_27833 = inactive;
var edge_27835 = inactive;
var edge_27836 = inactive;
var edge_27837 = inactive;

///////////////////////////////////////////////////////////////////////
// Data flow processing (Nodes of the graph)
// node_27396
edge_27673 = "Labeltext";
// node_27394
edge_27669 = "OK";
// node_27391
edge_27835 = 0.5;
// node_27834
edge_27836 = edge_27835;
edge_27837 = edge_27835;
// node_27389
edge_27768 = 0;
// node_27767
edge_27770 = {};
edge_27770['start'] = edge_27768;
edge_27770['end'] = edge_27836;
// node_27385
edge_27819 = 1;
// node_27818
edge_27820 = edge_27819;
edge_27821 = edge_27819;
// node_27771
edge_27774 = {};
edge_27774['start'] = edge_27837;
edge_27774['end'] = edge_27821;
// node_27382
edge_27652 = 20;
// node_27380
edge_27457 = cursor;
// node_27377
edge_27815 = columnElement;
// node_27814
edge_27816 = edge_27815;
edge_27817 = edge_27815;
// node_27374
edge_27811 = group;
// node_27810
edge_27812 = edge_27811;
edge_27813 = edge_27811;
// node_27369
edge_27805 = all;
// node_27804
edge_27806 = edge_27805;
edge_27807 = edge_27805;
edge_27808 = edge_27805;
edge_27809 = edge_27805;
// node_27367
edge_27425 = label;
// node_27365
edge_27415 = boolAnd;
// node_27363
edge_27410 = isInside;
// node_27361
edge_27405 = isEqual;
// node_27359
edge_27400 = inset;
// node_27357
edge_27420 = button;
// node_27264
edge_27776 = active;
// node_27775
edge_27777 = edge_27776;
edge_27778 = edge_27776;
edge_27779 = edge_27776;
edge_27780 = edge_27776;
edge_27781 = edge_27776;
edge_27782 = edge_27776;
edge_27783 = edge_27776;
edge_27784 = edge_27776;
edge_27785 = edge_27776;
edge_27786 = edge_27776;
edge_27787 = edge_27776;
edge_27788 = edge_27776;
edge_27789 = edge_27776;
edge_27790 = edge_27776;
edge_27791 = edge_27776;
edge_27792 = edge_27776;
edge_27793 = edge_27776;
edge_27794 = edge_27776;
edge_27795 = edge_27776;
edge_27796 = edge_27776;
edge_27797 = edge_27776;
edge_27798 = edge_27776;
edge_27799 = edge_27776;
edge_27800 = edge_27776;
edge_27801 = edge_27776;
edge_27802 = edge_27776;
edge_27803 = edge_27776;
// node_27465
if(edge_27788 === active && edge_27809!==null && edge_27809!==undefined) {edge_27700 = edge_27809(edge_27793);}
// node_27698
edge_27718 = edge_27700['a'];
// node_27460
if(edge_27787 === active && edge_27808!==null && edge_27808!==undefined) {edge_27697 = edge_27808(edge_27792);}
// node_27694
edge_27710 = edge_27697['a'];
edge_27714 = edge_27697['b'];
// node_27450
if(edge_27785 === active && edge_27807!==null && edge_27807!==undefined) {edge_27693 = edge_27807(edge_27791);}
// node_27690
edge_27691 = edge_27693['a'];
edge_27692 = edge_27693['b'];
// node_27428
if(edge_27783 === active && edge_27806!==null && edge_27806!==undefined) {edge_27677 = edge_27806(edge_27790);}
// node_27675
edge_27706 = edge_27677['a'];
// node_26425
edge_27720=theInterface.layout;
// node_27717
if(edge_27718 !== inactive) {edge_27750 = edge_27720;}
// node_27746
if(edge_27800 !== inactive) {edge_27831 = edge_27750;}
// node_27830
edge_27832 = edge_27831;
edge_27833 = edge_27831;
// node_27686
edge_27689 = {};
edge_27689['interval'] = edge_27774;
edge_27689['rect'] = edge_27833;
// node_27444
if(edge_27692 === active && edge_27817!==null && edge_27817!==undefined) {edge_27741 = edge_27817(edge_27689);}
// node_27738
if(edge_27798 !== inactive) {edge_27740 = edge_27741;}
// node_27671
edge_27674 = {};
edge_27674['layout'] = edge_27740;
edge_27674['text'] = edge_27673;
// node_27423
if(edge_27782 === active && edge_27425!==null && edge_27425!==undefined) {edge_27736 = edge_27425(edge_27674);}
// node_27734
if(edge_27797 !== inactive) {edge_27737 = edge_27736;}
// node_27682
edge_27685 = {};
edge_27685['interval'] = edge_27770;
edge_27685['rect'] = edge_27832;
// node_27438
if(edge_27691 === active && edge_27816!==null && edge_27816!==undefined) {edge_27733 = edge_27816(edge_27685);}
// node_27729
if(edge_27796 !== inactive) {edge_27827 = edge_27733;}
// node_27826
edge_27828 = edge_27827;
edge_27829 = edge_27827;
// node_27650
edge_27653 = {};
edge_27653['rect'] = edge_27828;
edge_27653['margin'] = edge_27652;
// node_27398
if(edge_27777 === active && edge_27400!==null && edge_27400!==undefined) {edge_27667 = edge_27400(edge_27653);}
// node_26423
edge_27823=theInterface.mouse;
// node_27822
edge_27824 = edge_27823;
edge_27825 = edge_27823;
// node_27713
if(edge_27714 !== inactive) {edge_27758 = edge_27825;}
// node_27755
if(edge_27802 !== inactive) {edge_27757 = edge_27758;}
// node_27455
if(edge_27786 === active && edge_27457!==null && edge_27457!==undefined) {edge_27761 = edge_27457(edge_27757);}
// node_27759
if(edge_27803 !== inactive) {edge_27762 = edge_27761;}
// node_27709
if(edge_27710 !== inactive) {edge_27745 = edge_27824;}
// node_27742
if(edge_27799 !== inactive) {edge_27744 = edge_27745;}
// node_27705
if(edge_27706 !== inactive) {edge_27724 = edge_27744;}
// node_27721
if(edge_27794 !== inactive) {edge_27766 = edge_27724;}
// node_27763
edge_27764 = edge_27766['buttons'];
edge_27765 = edge_27766['position'];
// node_27658
edge_27661 = {};
edge_27661['point'] = edge_27765;
edge_27661['rect'] = edge_27829;
// node_27408
if(edge_27779 === active && edge_27410!==null && edge_27410!==undefined) {edge_27664 = edge_27410(edge_27661);}
// node_27654
edge_27657 = {};
edge_27657['a'] = edge_27764;
edge_27657['b'] = edge_27820;
// node_27403
if(edge_27778 === active && edge_27405!==null && edge_27405!==undefined) {edge_27663 = edge_27405(edge_27657);}
// node_27662
edge_27665 = {};
edge_27665['a'] = edge_27663;
edge_27665['b'] = edge_27664;
// node_27413
if(edge_27780 === active && edge_27415!==null && edge_27415!==undefined) {edge_27668 = edge_27415(edge_27665);}
// node_27666
edge_27670 = {};
edge_27670['layout'] = edge_27667;
edge_27670['text'] = edge_27669;
edge_27670['pushed'] = edge_27668;
// node_27418
if(edge_27781 === active && edge_27420!==null && edge_27420!==undefined) {edge_27727 = edge_27420(edge_27670);}
// node_27725
if(edge_27795 !== inactive) {edge_27728 = edge_27727;}
// node_27678
edge_27681 = {};
edge_27681['a'] = edge_27728;
edge_27681['b'] = edge_27737;
// node_27433
if(edge_27784 === active && edge_27812!==null && edge_27812!==undefined) {edge_27753 = edge_27812(edge_27681);}
// node_27751
if(edge_27801 !== inactive) {edge_27754 = edge_27753;}
// node_27701
edge_27704 = {};
edge_27704['a'] = edge_27754;
edge_27704['b'] = edge_27762;
// node_27470
if(edge_27789 === active && edge_27813!==null && edge_27813!==undefined) {edge_27649 = edge_27813(edge_27704);}
// node_26427
theInterface.graphics=edge_27649;


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