"use strict";

import _ from 'lodash';

import Immutable from 'immutable';

export function simplify(model) {
  switch (model.type) {
    case "x":
    case "y":
    case "z":
      let newModel = {
        type: model.type,
        weight: model.weight,
        select: model.select
      }
      newModel.content =
        _(model.content)
        .map(simplify)
        .filter((x) => (x.type==="p" || x.content.length > 0))
        .map((el) => {
          if (el.type === model.type) {
            return _(el.content)
              .map(x => _.assign(_.clone(x), {
                weight: el.weight * x.weight
              }))
              .value();
          } else {
            return [el];
          }
        })
        .flatten()
        .value();
      break;
    case "p":
      return model;
      break;
  }

  return newModel;
}

export function getName(data,model) {
  switch (model.type) {
    case "x":
    case "y":
    case "z":
      _(model.content)
      .map(x=>getName(data,x))
      .join(', ');
      break;
    case "p":
      return data.views[model.value].name;
      break;
  }
}

export function select(model,ppath,index){
console.log("select "+ppath+ "   "+index);
  return _.set(model,_(ppath).push('select').join('.'),index);
}

export function close(model,ppath,index){
  console.log("close "+ppath+ "   "+index);
  if(ppath.length>0){

    let x = close(_.get(model,_(ppath).first()),_(ppath).drop().value(),index);
    console.log(x);
    return _.set(
      model,
      _(ppath).first(),
      x
    );
  } else {
    let newModel = _.clone(model);
    if(_.inRange(index,0,newModel.content.length)) {
      if(newModel.select === index ) {
        if(newModel.content.length-1>1) {
          newModel.select=(newModel.select)%(newModel.content.length-1);
        } else {
          newModel.select=0;
        }
      }
      newModel.content = _.pullAt(newModel.content,index);
      return newModel;
    } else {
      throw new Error('Tried to remove the view at index '+index+ ' but there are only '+newModel.content.length+' views');
    }
  }
}
