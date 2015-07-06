jest.dontMock('../scenarioChecker.js').dontMock('lodash').dontMock('iii');

var iii=require('iii');
var _=require('lodash');
var scenarioChecker=require('../scenarioChecker.js');

describe('scenario checker',function(){

  it('should work positively on an atomic interface',function(){
    var theInterface = iii.parser.parse("Number in",{startRule:"interface"});
    var theScenario = JSON.parse("[5,4,5]");
    expect(scenarioChecker.check(theInterface,theScenario,"main")).toBeTruthy();
  });

  it('should work negatively on an atomic interface',function(){
    var theInterface = iii.parser.parse("Number in",{startRule:"interface"});
    var theScenario = [{x:5,y:4},4,5];
    expect(scenarioChecker.check(theInterface,theScenario,"main")).toBeFalsy();
  });

});
