'use strict';jest.dontMock('../interactions.js').
dontMock('../parser.js').
dontMock('../serializer.js').
dontMock('../operator.js').
dontMock('lodash');




var interactions = require('../interactions.js');
var parser = require('../parser.js');
var _ = require('lodash');

var removeFormattingInfo = function removeFormattingInfo(x) {return interactions.removeFormattingInfo(removeMeta(x));};

function removeMeta(obj) {
  if (obj.hasOwnProperty("meta")) {
    delete obj.meta;}

  if (Array.isArray(obj) || obj.hasOwnProperty("type")) {
    for (var prop in obj) {
      if (prop !== 'parent') {
        if (obj.hasOwnProperty(prop)) {
          removeMeta(obj[prop]);}}}}



  return obj;}


function parse(x, options) {
  var opts;
  if (options === undefined) opts = { startRule: 'start' };else opts = options;
  return removeMeta(parser.parse(x, opts));}


describe('interactions', function () {

  describe('shallow list of elements', function () {

    it('simple2', function () {

      var k = { 
        "type": "InteractionSimple", 
        "formating": "oo wow os$oll\nslk$bobie joe", 
        "operator": "oowowos$ollslk$bobiejoe", 
        "operand": [{ 
          "type": "InteractionSimple", 
          "formating": "  bob  ", 
          "operator": "bob", 
          "operand": [] }, 
        { 
          "type": "InteractionSimple", 
          "formating": "lol", 
          "operator": "l o l", 
          "operand": [] }] };



      expect(interactions.fromShallowListOfElements(interactions.toShallowListOfElements(k))).
      toEqual(k);});});







  describe('to shallow list of elements', function () {

    it('too simple', function () {
      expect(interactions.toShallowListOfElements({ 
        "type": "InteractionSimple", 
        "operator": "oksss", 
        "formating": "oksss", 
        "operand": [] })).

      toEqual([
      "oksss"]);});



    it('simple', function () {
      expect(interactions.toShallowListOfElements({ 
        "type": "InteractionSimple", 
        "operator": "$ok$", 
        "formating": "$   ok \n $", 
        "operand": [{ 
          "type": "InteractionSimple", 
          "operator": "bob", 
          "operand": [] }, 
        { 
          "type": "InteractionSimple", 
          "operator": "lol", 
          "operand": [] }] })).


      toEqual([
      "", { 
        "type": "InteractionSimple", 
        "operator": "bob", 
        "operand": [] }, 
      "   ok \n ", { 
        "type": "InteractionSimple", 
        "operator": "lol", 
        "operand": [] }, 
      ""]);});



    it('simple2', function () {
      expect(interactions.toShallowListOfElements({ 
        "type": "InteractionSimple", 
        "operator": "oo wow os$ollslk$bobie joe", 
        "formating": "oo wow \nos$\noll sl k\t$\n\tbobie joe", 
        "operand": [{ 
          "type": "InteractionSimple", 
          "operator": "bob", 
          "operand": [] }, 
        { 
          "type": "InteractionSimple", 
          "operator": "lol", 
          "operand": [] }] })).


      toEqual([
      "oo wow \nos", { 
        "type": "InteractionSimple", 
        "operator": "bob", 
        "operand": [] }, 
      "\noll sl k\t", { 
        "type": "InteractionSimple", 
        "operator": "lol", 
        "operand": [] }, 
      "\n\tbobie joe"]);});});





  describe('to list of elements', function () {

    it('too simple', function () {
      expect(interactions.toListOfElements({ 
        "type": "InteractionSimple", 
        "operator": "oksss", 
        "operand": [] })).

      toEqual([
      "oksss"]);});



    it('simple', function () {
      expect(interactions.toListOfElements({ 
        "type": "InteractionSimple", 
        "operator": "$ok$", 
        "operand": [{ 
          "type": "InteractionSimple", 
          "operator": "bob", 
          "operand": [] }, 
        { 
          "type": "InteractionSimple", 
          "operator": "lol", 
          "operand": [] }] })).


      toEqual([
      ["bob"], "ok", ["lol"]]);});



    it('simple2', function () {
      expect(interactions.toListOfElements({ 
        "type": "InteractionSimple", 
        "operator": "oo wow os$ollslk$bobie joe", 
        "operand": [{ 
          "type": "InteractionSimple", 
          "operator": "bob", 
          "operand": [] }, 
        { 
          "type": "InteractionSimple", 
          "operator": "lol", 
          "operand": [] }] })).


      toEqual([
      "oo wow os", ["bob"], "ollslk", ["lol"], "bobie joe"]);});});





  describe('compare interactions', function () {

    it('simple', function () {
      expect(interactions.compare({ 
        "type": "InteractionSimple", 
        "operator": "variable hdhsd", 
        "operand": [] }, 
      { 
        "type": "InteractionSimple", 
        "operator": "variable hdhsd", 
        "operand": [] })).

      toEqual(0);});});




  describe('list of interactions', function () {

    it('simple', function () {
      expect(interactions.listOfInteractions(
      parse("(a)", { 
        startRule: "interaction" }))).
      toEqual(
      ["a"]);});



    it('composite', function () {
      expect(_.sortBy(interactions.listOfInteractions(
      parse("({a:(x),b:((y)+(5))})", { 
        startRule: "interaction" })))).
      toEqual(
      _.sortBy(["x", "y", "5", "$+$", "{a:$,b:$}"]));});});




  describe('is base interaction', function () {

    it('simple', function () {
      expect(interactions.isBaseInteraction(
      parse("(variable (q))", { 
        startRule: "interaction" }))).
      toEqual(
      true);});});





  describe('is made of base interactions', function () {

    it('case 1', function () {

      expect(interactions.isOnlyMadeOfBaseInteractions(
      parse("(get (variable x) from previous and set (variable x) for next)", { 
        startRule: "interaction" }))).
      toEqual(
      true);});



    it('case 2 with the custom interaction (5)', function () {

      expect(interactions.isOnlyMadeOfBaseInteractions(
      parse("(variable(variable(5)))", { 
        startRule: "interaction" }))).
      toEqual(
      true);});



    it('case 3', function () {
      expect(interactions.isOnlyMadeOfBaseInteractions(
      parse("(apply(function bob) to (variable x) and get (variable y))", { 
        startRule: "interaction" }))).
      toEqual(
      true);});




    it('case 4 with all base interactions', function () {
      expect(interactions.isOnlyMadeOfBaseInteractions(
      parse("({a:(previous(variable (variable 5)))b:((variable d).xys)c:((variable 2)in(variable 5)(variable 2)=(variable (variable 5)))})", { 
        startRule: "interaction" }))).
      toEqual(
      false);});});








  describe('compare', function () {

    it('case 1', function () {
      expect(interactions.compare(
      parse("(previous(variable ))", { 
        startRule: "interaction" }), 

      parse("(previous(variable ))", { 
        startRule: "interaction" })) === 
      0).toBeTruthy();});


    it('case 2', function () {
      expect(interactions.compare(
      parse("(previous(variable ))", { 
        startRule: "interaction" }), 

      parse("(previous(variable lol))", { 
        startRule: "interaction" })) !== 
      0).toBeTruthy();});


    it('case 3', function () {
      expect(interactions.compare(
      parse("(previous(variable (5)(6)))", { 
        startRule: "interaction" }), 

      parse("(previous(variable (5)(7)))", { 
        startRule: "interaction" })) !== 
      0).toBeTruthy();});


    it('case 4', function () {
      expect(interactions.compare(
      parse("(previous(variable (5)(6)))", { 
        startRule: "interaction" }), 

      parse("(precious(variable (5)(7)))", { 
        startRule: "interaction" })) !== 
      0).toBeTruthy();});});





  describe('substitute in interaction', function () {

    it('case 1', function () {
      expect(
      interactions.compare(
      interactions.substituteInInteraction(
      parse("(bob(joe(5)(6))and(lol))", { 
        startRule: "interaction" }), 

      parse("(joe(5)(6))", { 
        startRule: "interaction" }), 

      parse("(a)", { 
        startRule: "interaction" })), 


      parse("(bob(a)and(lol))", { 
        startRule: "interaction" })) === 

      0).
      toBeTruthy();});


    it('case 2', function () {
      expect(
      interactions.compare(
      interactions.substituteInInteraction(
      parse("(bob(joe(5)(6))and(joe(5)(6)))", { 
        startRule: "interaction" }), 

      parse("(joe(5)(6))", { 
        startRule: "interaction" }), 

      parse("(a)", { 
        startRule: "interaction" })), 


      parse("(bob(a)and(a))", { 
        startRule: "interaction" })) === 

      0).
      toBeTruthy();});


    it('case 3', function () {
      expect(
      interactions.compare(
      interactions.substituteInInteraction(
      interactions.substituteInInteraction(
      parse("(bob(x)and(y))", { 
        startRule: "interaction" }), 

      parse("(x)", { 
        startRule: "interaction" }), 

      parse("(lol(y))", { 
        startRule: "interaction" })), 


      parse("(y)", { 
        startRule: "interaction" }), 

      parse("(bobie(4))", { 
        startRule: "interaction" })), 


      parse("(bob(lol(bobie(4)))and(bobie(4)))", { 
        startRule: "interaction" })) === 

      0).
      toBeTruthy();});


    it('case 4', function () {
      expect(
      interactions.compare(
      interactions.substituteInInteraction(
      parse("(variable 4(5))", { 
        startRule: "interaction" }), 

      parse("(variable 4(5))", { 
        startRule: "interaction" }), 

      parse("(variable 4)", { 
        startRule: "interaction" })), 


      parse("(variable 4)", { 
        startRule: "interaction" })) === 

      0).
      toBeTruthy();});});







  describe('interaction matches definition', function () {
    it('should work', function () {
      expect(
      interactions.interactionMatchesDefinition(
      parse("(test(a)(b))", { 
        startRule: "interaction" }), 

      parse("interaction(test(a:X in)(b:Y out)):Z in is (bob)", { 
        startRule: "interactionDefinition" }))).

      toBeTruthy();});});





  describe('instantiate in interaction', function () {

    it('should preserve interactions not matching', function () {

      expect(
      removeFormattingInfo(interactions.instantiate(
      parse("(test(a)(b))", { 
        startRule: "interaction" }), 

      parse("interaction (x):Number in is (y)", { 
        startRule: "interactionDefinition" })))).


      toEqual(removeFormattingInfo(parse("(test(a)(b))", { 
        startRule: "interaction" })));});




    it('should instantiate a simple case with no arguments', function () {
      expect(
      removeFormattingInfo(interactions.instantiate(
      parse("(test(a)(b))", { 
        startRule: "interaction" }), 

      parse("interaction (a):Number in is (b)", { 
        startRule: "interactionDefinition" })))).


      toEqual(removeFormattingInfo(parse("(test(b)(b))", { 
        startRule: "interaction" })));});




    it('should instantiate a case with arguments', function () {
      expect(
      removeFormattingInfo(interactions.instantiate(
      parse("(test(a(5))(b))", { 
        startRule: "interaction" }), 

      parse("interaction (a(x:Number in)):Number out is (bob(x)test(x))", { 
        startRule: "interactionDefinition" })))).


      toEqual(removeFormattingInfo(
      parse("(test(bob(5)test(5))(b))", { 
        startRule: "interaction" })));});



    it('should instantiate a complex case', function () {
      expect(
      removeFormattingInfo(interactions.instantiate(
      parse("(test(a((5)+(6)))(a(b(F(3)))))", { 
        startRule: "interaction" }), 

      parse("interaction (a(x:Number in)):Number out is (bob(x)test(b))", { 
        startRule: "interactionDefinition" })))).


      toEqual(removeFormattingInfo(
      parse("(test(bob((5)+(6))test(b))(bob(b(F(3)))test(b)))", { 
        startRule: "interaction" })));});});






  describe('find matching definition', function () {

    it('should work on a simple case with a definition on the same level', function () {
      var res = parse("interaction (a(x:Number in)):Number out with interaction (b):Number out is (c) is (bob(x)test(b))", { 
        startRule: "interactionDefinition" });

      var b = parse("(b)", { 
        startRule: "interaction" });

      var defb = parse("interaction (b):Number out is (c)", { 
        startRule: "interactionDefinition" });

      var foundDefb = interactions.findMatchingDefinition(b, res);
      delete foundDefb.parent;
      expect(removeMeta(foundDefb)).toEqual(removeMeta(defb));});


    it('should work on a simple case with a definition on the parent', function () {
      var res = parse("interaction (k):Number in with interaction (b):Number out is (d) interaction (a(x:Number in)):Number out with interaction (b):Number out is (c) is (bob(x)test(b)) is (b)");
      var b = parse("(b)", { 
        startRule: "interaction" });

      var rightdefb = parse("interaction (b):Number out is (c)", { 
        startRule: "interactionDefinition" });

      var wrongdefb = parse("interaction (b):Number out is (d)", { 
        startRule: "interactionDefinition" });

      var foundDefb = interactions.findMatchingDefinition(b, res[0].definitions[1]);
      delete foundDefb.parent;
      expect(removeMeta(foundDefb)).toEqual(removeMeta(rightdefb));
      expect(removeMeta(foundDefb)).not.toEqual(removeMeta(wrongdefb));});


    it('should work on a simple case where the interaction is an argument', function () {
      var res = parse("interaction (k):Number in with interaction (b):Number out is (d) interaction (a(x:Number in)):Number out with interaction (b):Number out is (c) is (bob(x)test(b)) is (b)");
      var x = parse("(x)", { 
        startRule: "interaction" });

      var rightDefx = "Argument";
      var foundDefx = interactions.findMatchingDefinition(x, res[0].definitions[1]);
      expect(removeMeta(foundDefx)).toEqual(removeMeta(rightDefx));});


    it('should work on a simple case where the interaction is an argument of a parent', function () {
      var res = parse("interaction (k(x:Number in)):Number in with interaction (b):Number out is (d) interaction (a):Number out with interaction (b):Number out is (c) is (bob(x)test(b)) is (b)");
      var x = parse("(x)", { 
        startRule: "interaction" });

      var rightDefx = "Argument";
      var foundDefx = interactions.findMatchingDefinition(x, res[0].definitions[1]);
      expect(removeMeta(foundDefx)).toEqual(removeMeta(rightDefx));});});





  describe('list non base interactions', function () {
    it('should work on a simple case', function () {
      var list = interactions.listNonBaseInteractions(removeMeta(parse("({b:(4),y:(cos(sin(previous(x))))})", { 
        startRule: "interaction" })));


      // expect(list).toContain(parse("(4)", {
      //   startRule: "interaction"
      // }));

      expect(list).toContain(removeMeta(parse("(cos(sin(previous(x))))", { 
        startRule: "interaction" })));


      expect(list).toContain(removeMeta(parse("(sin(previous(x)))", { 
        startRule: "interaction" })));


      expect(list).toContain(removeMeta(parse("(x)", { 
        startRule: "interaction" })));});});





  describe('expand', function () {
    it('should work on a simple case', function () {
      var interaction = interactions.expand(
      parse("interaction (joe(x:Number in)):Number in is (x)")[0]).
      interaction;
      expect(removeFormattingInfo(interaction)).toEqual(removeFormattingInfo(parse("(x)", { 
        startRule: "interaction" })));});


    it('should work on a simple case with a closure', function () {
      var interaction = interactions.expand(
      parse("interaction (joe(x:Number in)):Number in with interaction (a):Number in is (x) is (a)")[0]).
      interaction;
      expect(removeFormattingInfo(interaction)).toEqual(removeFormattingInfo(parse("(x)", { 
        startRule: "interaction" })));});



    it('should error on a erroneous case', function () {
      expect(function () {
        interactions.expand(
        parse("interaction (joe(x:Number in)):Number in with interaction (a):Number in is (wjxijwx) is (a)")[0]);}).

      toThrow("cannot find definition of interaction wjxijwx");});


    it('should work on a simple case with base interactions', function () {
      var interaction = interactions.expand(
      parse("interaction (a(x:Number in)(y:Number out)):Number in is ({x:(x),y:(y)})")[0]).
      interaction;

      expect(removeFormattingInfo(interaction)).toEqual(removeFormattingInfo(parse("({x:(x),y:(y)})", { 
        startRule: "interaction" })));});



    /*TODO make this test pass*/
    // it('should work on a complex case with base interactions', function() {
    //   var interaction = interactions.expand(
    //     parse("interaction (a(x:Number in)(y:Number out)):Number in with interaction (z):Number in with interaction (k):Number out is (variable 3) is (apply(k)to(variable 1)and send result to(k)) is (apply (variable f)to(variable 2) and send result to (y))")[0]
    //   ).interaction;
    //
    //   expect(removeFormattingInfo(interaction)).toEqual(removeFormattingInfo(parse("((x)in(variable 2)({x:(x),z:((variable 3)in(variable 1)({})=(variable 3))})=(y))", {
    //     startRule: "interaction"
    //   })));
    // });
    //
    //
    // it('should work on a case with base interactions', function() {
    //
    //   var interaction = interactions.expand(
    //     parse("interaction (a(x:Number in)(y:Number out)):Number in with interaction (z):Number in is ((variable 3)in(variable 1)({})=(variable 3)) is ((x)in(variable 2)({x:(x),z:(z)})=(y))")[0]
    //   ).interaction;
    //
    //   expect(removeFormattingInfo(interaction)).toEqual(removeFormattingInfo(parse("((x)in(variable 2)({x:(x),z:((variable 3)in(variable 1)({})=(variable 3))})=(y))", {
    //     startRule: "interaction"
    //   })));
    // });
  });});