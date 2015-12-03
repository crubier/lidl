"use strict"

import _ from 'lodash'

//TODO Interfaces instead of ports
export function mergePortList(x, y) {
  if (_.isArray(x)) {
    if (_.isArray(y)) {
      let i = 0;
      let res = [];
      for (i = 0; i < Math.max(x.length, y.length); i++) {
        res[i] = mergePortList(x[i], y[i]);
      }
      return res;
    } else if (_.isString(y)) {
      // reduce interface to data type
      if(portIsOnlyMadeOf(x,y))return y;
    } else if (_.isUndefined(y)) {
      return _.clone(x);
    } else {
      throw new Error ("portLists should be strings or arrays of strings");
    }
  } else if (_.isString(x)) {
    if (_.isArray(y)) {
      // reduce interface to data type
      if(portIsOnlyMadeOf(y,x))return x;
    } else if (_.isString(y)) {
      if (x === y) return x
      else throw new Error ("trying to merge incompatible ports "+ x + " and "+ y);
    } else if (_.isUndefined(y)) {
      return x;
    } else {
      throw new Error ("portLists should be strings or arrays of strings");
    }
  } else if (_.isUndefined(x)) {
    if (_.isArray(y)) {
      return _.clone(y);
    } else if (_.isString(y)) {
      return y;
      throw new Error (" trying to merge incompatible ports "+ x + " and "+ y);
    } else if (_.isUndefined(y)) {
      return;
    } else {
      throw new Error (" portLists should be strings or arrays of strings");
    }
  } else {
    throw new Error (" portLists should be strings or arrays of strings");
  }
}

// Check if ports like x = ['in','in'] are compatible with s ='in'
export function portIsOnlyMadeOf(x,s){
  if (_.isArray(x)) {
    let i = 0;
    let res = true;
    for (i = 0; i < x.length; i++) {
      res = res && portIsOnlyMadeOf(x[i],s) ;
    }
    return res;
  } else if (_.isString(x)) {
    if(x===s){
      return true;
    }else {
      return false;
    }
  } else if (_.isUndefined(x)) {
    return false;
  } else {
    throw new Error (" port should be arrays of strings or strings");
  }
}

// ['in','out','out'] -> ['out','in','in']
export function conjugatePort(x) {
  if (_.isArray(x)) {
    let i = 0;
    let res = [];
    for (i = 0; i < x.length; i++) {
      res[i] = conjugatePort(x[i]);
    }
    return res;
  } else if (_.isString(x)) {
    if(x==='in'){
      return'out'
    }else if (x==='out'){
      return 'in';
    }else {
      throw new Error (" port should be in our out or arrays of in and out");
    }
  } else if (_.isUndefined(x)) {
    return undefined;
  } else {
    throw new Error (" port should be arrays of strings or strings");
  }
}

export function portIsDefined (x) {
  if(_.isNull(x) || _.isUndefined(x)){ return false} else {return true};
}
