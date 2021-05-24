"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default =



addOperatorTypeAnnotation;var _operator = require('../operator.js');var _operator2 = _interopRequireDefault(_operator);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function addOperatorTypeAnnotation(graph) {
    graph.
    matchNodes({ type: 'Interaction', content: { type: "InteractionSimple" } }).
    forEach(function (x) {
        x.content.operatorType = _operator2.default.parse(x.content.operator);}).
    commit();
}