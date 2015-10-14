jest.dontMock('../satSolver');



describe('sat solver',function(){
  var s = require('../satSolver');
  it('simple',function(){
    expect(s(3,[[-1,2],[1],[-1,-3]])).toEqual([true,true,false]);
    expect(s(3,[[-1,2],[1],[-1,-3],[3]])).toEqual(null);
    expect(s(3,[[-1],[2],[-3]])).toEqual([false,true,false]);
  });
});
