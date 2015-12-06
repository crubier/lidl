'use strict';jest.dontMock('../satSolver').dontMock('lodash');



describe('sat solver', function () {
  var s = require('../satSolver');
  it('simple', function () {
    expect(s.satSolve(3, [[-1, 2], [1], [-1, -3]])).toEqual([true, true, false]);
    expect(s.satSolve(3, [[-1, 2], [1], [-1, -3], [3]])).toEqual(null);
    expect(s.satSolve(3, [[-1], [2], [-3]])).toEqual([false, true, false]);});


  // it('realTest',function(){
  //     console.log("==========================")
  //     // console.log(s(2,[[1,2],[1]]));
  //     console.log(s.satSolve(4,[[-1],[-1,-2],[-3,-4]]));
  //     console.log(s.satSolve(4,[[-1],[-1,-2],[-3,-4],[1,-2,3,4]]));
  //     console.log(s.satSolve(4,[[-1],[-1,-2],[-3,-4],[1,-2,3,4],[1,2,3,-4]]));
  //     console.log(s.satSolve(4,[[-1],[-1,-2],[-3,-4],[1,-2,3,4],[1,2,3,-4],[1,-2,-3,4]]));
  //     console.log(s.satSolve(4,[[-1],[-1,-2],[-3,-4],[1,-2,3,4],[1,2,3,-4],[1,-2,-3,4],[1,2,-3,4]]));
  //     console.log(s.satSolve(4,[[-1],[-1,-2],[-3,-4],[1,-2,3,4],[1,2,3,-4],[1,-2,-3,4],[1,2,-3,4],[1,2,3,4]]));
  //     console.log(s.satSolve(4,[[-1],[-1,-2],[-3,-4],[1,-2,3,4],[1,2,3,-4],[1,-2,-3,4],[1,2,-3,4],[1,2,3,4],[1,-2,3,-4]]));
  // });

  // it('realTest',function(){
  //       console.log("==========================")
  //       // console.log(s(2,[[1,2],[1]]));
  //       console.log(s.satSolve(2,[[-1],[-1,-2]]));
  //       console.log(s.satSolve(2,[[-1],[-1,-2],[1,2]]));
  //       console.log(s.satSolve(2,[[-1],[-1,-2],[1,2],[1,-2]]));
  //   });


  it('useful test', function () {
    //   console.log("==========================")
    //   // console.log(s(2,[[1,2],[1]]));
    //   console.log(s.satSolve(2,[[-1],[-1,-2]]));
    //   console.log(s.satSolve(2,[[-1],[-1,-2],[1,2]]));
    //   console.log(s.satSolve(2,[[-1],[-1,-2],[1,2],[1,-2]]));
    // console.log("====didjzdzjod======================")
    expect(s.solvePath(['a', 'b'], [['a'], ['a', 'b']])).toContain([true, false]);
    expect(s.solvePath(['a', 'b'], [['a'], ['a', 'b']])).toContain([true, true]);
    expect(s.solvePath(['a', 'b'], [['a'], ['a', 'b']])).not.toContain([false, true]);
    expect(s.solvePath(['a', 'b'], [['a'], ['a', 'b']])).not.toContain([false, false]);});});







//
//
// not(a or (a and b) or (c and d))
// not(a) and not(a and b) and not(c and d)
// not(a) and (not(a) or not(b)) and (not(c) or not(b))