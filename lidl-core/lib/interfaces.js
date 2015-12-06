"use strict";var _ = require('lodash');

var isInterface = function isInterface(obj) {
  if (obj.type) {
    switch (obj.type) {
      case "InterfaceAtomic":
      case "InterfaceComposite":
        return true;
      default:
        return false;}} else 

  {
    return false;}};



// Directions
var isDirection = function isDirection(obj) {
  if (obj === "in" || obj === "out") {
    return true;} else 
  {
    return false;}};



var oppositeDirection = function oppositeDirection(direction) {
  switch (direction) {
    case "in":
      return "out";
    case "out":
      return "in";
    default:
      throw "Trying to find the opposite of an invalid direction (in or out)";}};



var compareInterface = function compareInterface(interface1, interface2) {};




// Interface operations
var conjugateInterface = function conjugateInterface(theInterface) {
  switch (theInterface.type) {
    case "InterfaceAtomic":
      return { 
        type: "InterfaceAtomic", 
        datatype: theInterface.datatype, 
        direction: oppositeDirection(theInterface.direction) };

    case "InterfaceComposite":
      return { 
        type: "InterfaceComposite", 
        component: _.map(theInterface.component, function (field) {
          return { 
            type: "InterfaceCompositeField", 
            key: field.key, 
            value: conjugateInterface(field.value) };}) };



    default:
      throw "Trying to get the conjugation of something which is not an interface";}};



var receptionInterface = function receptionInterface(theInterface) {
  switch (theInterface.type) {
    case "InterfaceAtomic":
      return { 
        type: "InterfaceAtomic", 
        datatype: theInterface.datatype, 
        direction: "in" };

    case "InterfaceComposite":
      return { 
        type: "InterfaceComposite", 
        component: _.map(theInterface.component, function (field) {
          return { 
            type: "InterfaceCompositeField", 
            key: field.key, 
            value: receptionInterface(field.value) };}) };



    default:
      throw "Trying to get the reception of something which is not an interface";}};



var emissionInterface = function emissionInterface(theInterface) {
  switch (theInterface.type) {
    case "InterfaceAtomic":
      return { 
        type: "InterfaceAtomic", 
        datatype: theInterface.datatype, 
        direction: "out" };

    case "InterfaceComposite":
      return { 
        type: "InterfaceComposite", 
        component: _.map(theInterface.component, function (field) {
          return { 
            type: "InterfaceCompositeField", 
            key: field.key, 
            value: emissionInterface(field.value) };}) };



    default:
      throw "Trying to get the emission of something which is not an interface";}};



//TODO
var globalisationInterface = function globalisationInterface(theInterface) {
  switch (theInterface.type) {
    case "InterfaceAtomic":
      return theInterface;
    case "InterfaceComposite":
      return { 
        type: "InterfaceComposite", 
        component: _.map(theInterface.component, function (field) {
          return { 
            type: "InterfaceCompositeField", 
            key: field.key, 
            value: emissionInterface(field.value) };}) };



    default:
      throw "Trying to get the globalisation of something which is not an interface";}};



function listOfAtoms(theInterface, prefix) {
  switch (theInterface.type) {
    case "InterfaceAtomic":
      return [{ name: prefix, data: theInterface.data, direction: theInterface.direction }];
    case "InterfaceComposite":
      var res = [];
      var i = 0;
      // TODO Clean that, make it functional
      for (i = 0; i < theInterface.element.length; i++) {
        res = _.union(res, listOfAtoms(theInterface.element[i].value, prefix + "." + theInterface.element[i].key));}

      return res;
    default:
      throw "Trying to get the list of atomic interfaces of something which is not an interface";}}



// Transforms the interface into an operator for an interaction
function toOperator(theInterface) {
  switch (theInterface.type) {
    case "InterfaceComposite":
      return '{' + _.reduce(_.map(theInterface.element, 'key'), function (total, value, index) {return total + value + ':$';}, "") + '}';
    case "InterfaceAtomic":
    default:
      throw "Trying to get the operator of something which is not a composite interface";}}





module.exports = { 
  toOperator: toOperator, 
  conjugate: conjugateInterface, 
  listOfAtoms: listOfAtoms, 
  receptionInterface: receptionInterface, 
  emissionInterface: emissionInterface };