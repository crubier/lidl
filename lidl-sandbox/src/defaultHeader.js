export default `var isActive = function(x) {
  return (x !== null && x !== undefined);
};
var fallback = function(x) {
  return (isActive(x[0]) ? x[0] : x[1]);
};
var return0 = function(x) {
  return 0;
};
var return1 = function(x) {
  return 1;
};
var addition = function(x) {
  if (isActive(x[0]) && isActive(x[1])) {
    return x[0] + x[1];
  } else {
    return inactive;
  }
};
var addOne = function(x) {
  if (isActive(x)) return x + 1;
  else {
    return inactive;
  }
};
var identity = function(x) {
  return x
};
var isEqual = function(x) {
  if (isActive(x.a) && isActive(x.b)) {
    return (x.a === x.b) ? true : false;
  } else {
    return inactive;
  }
};
var cool = function(x) {
  if (isActive(x[0]) && isActive(x[1])) {
    return {
      sum: (x[0] + x[1]),
      diff: (x[0] - x[1])
    };
  } else {
    return {
      sum: inactive,
      diff: inactive
    };
  }
};
var boolNot = function(x) {
  if (isActive(x)) {
    return !x;
  } else {
    return inactive;
  }
};
var ifThenElse = function(x) {
  if (isActive(x)) {
    if (isActive(x.cond)) {
      if (x.cond === true) {
        return x.a;
      } else if (x.cond === false) {
        return x.b;
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
var whenThenElse = function(x) {
  if (isActive(x)) {
    if (isActive(x.cond)) {
      if (x.cond === true) {
        return {
          a: active,
          b: inactive
        };
      } else if (x.cond === false) {
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
var all = function(x) {
  return {
    a: x,
    b: x,
    c: x,
    d: x,
    e: x,
    f: x,
    g: x,
    h: x,
    i: x,
    j: x,
    k: x,
    l: x,
    n: x,
    o: x,
    p: x
  }
};`;