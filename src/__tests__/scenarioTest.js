
jest.autoMockOff();

// jest.dontMock('../scenario.js').dontMock('lodash').dontMock('iii');

var iii=require('iii');
var _=require('lodash');
var scenario=require('../scenario.js');









describe('check element',function(){

  it('should work positively on an atomic interface',function(){
    var theInterface = iii.parser.parse("Number in",{startRule:"interface"});
    expect(scenario.checkElement(theInterface,5,"main")).toBeTruthy();
  });

});











//
describe('scenario checker',function(){

  it('should work positively on an atomic interface',function(){
    var theInterface = iii.parser.parse("Number in",{startRule:"interface"});
    var theScenario = [5,4,5];
    expect(scenario.check(theInterface,theScenario,"main")).toBeTruthy();
  });

  it('should work negatively on an atomic interface',function(){
    var theInterface = iii.parser.parse("Number in",{startRule:"interface"});
    var theScenario = [{x:5,y:4},4,5];
    expect(scenario.check(theInterface,theScenario,"main")).toBeFalsy();
  });

});














describe('scenario element flattener',function(){

  it('should work on a normal',function(){

    var theElement = {a:{e:2},b:{c:{d:5}}};
    var theResult = {"main.a.e":2,"main.b.c.d":5};

    expect(
      scenario.flattenElement(theElement,"main")
    ).toEqual(
      theResult
    );

  });

  it('should work on a edge case',function(){

  var theElement = 5;
  var theResult = {"main":5};

  expect(
    scenario.flattenElement(theElement,"main")
  ).toEqual(
    theResult
  );

});

});
