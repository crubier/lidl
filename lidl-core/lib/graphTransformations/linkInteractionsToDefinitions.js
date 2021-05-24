"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default =





linkInteractionsToDefinitions;var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function linkInteractionsToDefinitions(graph) {
  // Mark all nodes as not having a definition
  graph.
  matchNodes({ type: 'Interaction', content: { type: 'InteractionSimple' } }).
  forEach(function (theNode) {
    if (theNode.content.operatorType === 'Custom') {
      theNode.hasDefinition = false;
    } else {
      theNode.hasDefinition = true;
      theNode.isArgument = false;
      theNode.isCustom = false;
      theNode.isBase = true;
    }
  }).
  commit();

  graph.
  reduceNodes({ type: 'Interaction', content: { type: 'InteractionSimple', operatorType: 'Custom' }, hasDefinition: false },
  function (theResult, theNode) {

    var edgeToParent =
    graph.
    findDirectedEdge({ type: 'DefinitionSubInteraction', to: { node: theNode } });

    while (!_lodash2.default.isUndefined(edgeToParent)) {

      var parentDef = edgeToParent.from.node;

      // First case : Interaction definition is a child of current definition
      var childDefs =
      graph.
      matchDirectedEdges({ type: 'DefinitionDefinition', from: { node: parentDef } }).
      pluck("to.node").
      filter(function (defNode) {return defNode.content.signature.operator === theNode.content.operator;}).
      value();
      if (_lodash2.default.size(childDefs) > 1) {
        throw new Error('LIDL does not support polymorphism yet (for interaction operator ' + theNode.content.operator + ')');
      } else if (_lodash2.default.size(childDefs) === 1) {
        graph.
        addEdge({ type: 'InteractionDefinition', from: { node: theNode }, to: { node: _lodash2.default.first(childDefs) } });
        theNode.hasDefinition = true;
        theNode.isArgument = false;
        theNode.isCustom = true;
        theNode.isBase = false;
        break;
      }


      // Second case : Interaction definition is an argument ( aka operand) of current definition
      var argPos =
      (0, _lodash2.default)(parentDef.content.signature.operand).
      pluck("name").
      indexOf(theNode.content.operator) + 1;
      if (argPos > 0) {
        var argNode =
        graph.
        findDirectedEdge({ type: 'SignatureOperand', from: { node: parentDef, index: argPos } }).
        to.node;
        graph.
        addEdge({ type: 'InteractionDefinition', from: { node: theNode }, to: { node: argNode } });
        theNode.hasDefinition = true;
        theNode.isArgument = true;
        theNode.isCustom = false;
        theNode.isBase = false;
        break;
      }

      // Third case: Interaction is maybe defined in a parent definition
      edgeToParent =
      graph.
      findDirectedEdge({ type: 'DefinitionDefinition', to: { node: parentDef } });

    }

    if (!theNode.hasDefinition) {
      // If the node has no definition then we consider it as a identifier
      theNode.content.operator = '#' + theNode.content.operator;
      theNode.content.operatorType = 'Identifier';
      theNode.hasDefinition = true;
      theNode.isArgument = false;
      theNode.isCustom = false;
      theNode.isBase = true;
      // throw new Error ('Could not find definition for interaction with operator '+theNode.content.operator);
    }

  });

}