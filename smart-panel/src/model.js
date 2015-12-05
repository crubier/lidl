"use strict";

import _ from 'lodash';

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
