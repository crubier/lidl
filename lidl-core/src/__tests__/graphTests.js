"use strict"
jest.dontMock('../g.js').dontMock('lodash');

var Graph = require('../g.js');

describe('graph', function() {


    describe('construct node', function() {
it('works in simple case', function() {
    let g = new Graph();

      let coucou = g.addNode({
        type: 'bob',
        content: 'coucou'
      });
      expect(g.nodes).toContain(coucou);
});
it('works in simple case 2', function() {
    let g = new Graph();

      let coucou = g.addNode({
        type: 'bob',
        content: 'coucou'
      });
      expect(g.matchNodes()).toContain(coucou);
});
});


  describe('inverse node', function() {
    let g = new Graph();

    let coucou = g.addNode({
      type: 'bob',
      content: 'coucou'
    });
    let beeh = g.addNode({
      type: 'bob',
      content: 'ouuu'
    });

    it('works in simple case', function() {
      expect(g.inverse({
        to: {
          node: coucou
        }
      })).toEqual({
        from: {
          node: coucou
        }
      });
    });

    it('works in simple case 2', function() {
      expect(g.inverse({
        to: {
          node: coucou
        }
      })).not.toEqual({
        to: {
          node: coucou
        }
      });
    });

    it('works in simple case', function() {
      expect(g.inverse({
        to: {
          node: coucou
        },
        from: {
          node: beeh
        }
      })).toEqual({
        from: {
          node: coucou
        },
        to: {
          node: beeh
        }
      });
    });

  });


  describe('construct and get edge matches', function() {
    let g = new Graph();
    let lol = g.addNode({
      type: 'bob',
      content: 'lol'
    });
    let coucou = g.addNode({
      type: 'bob',
      content: 'coucou'
    });
    let wow = g.addNode({
      type: 'bob',
      content: 'wow'
    });
    g.addEdge({
      type: 'ast',
      content: 'caca',
      from: {
        node: lol
      },
      to: {
        node: coucou
      }
    });
    g.addEdge({
      type: 'ast',
      content: 'meu',
      from: {
        node: lol
      },
      to: {
        node: wow
      }
    });
    g.addEdge({
      type: 'ast',
      content: 'beeeh',
      from: {
        node: coucou
      },
      to: {
        node: wow
      }
    });


    it('works in simple case', function() {
      expect(g.matchDirectedEdges({
        to: {
          node: coucou
        }
      }).first().content).toEqual('caca');
    });

    it('works in inversed case', function() {
      expect(g.matchDirectedEdges(g.inverse({
        from: {
          node: coucou
        }
      })).first().content).toEqual('caca');
    });

    it('length in simple case', function() {
      expect(g.matchDirectedEdges({
        from: {
          node: coucou
        }
      }).value().length).toEqual(1);
    });

    it('works undirected in right case', function() {
      expect(g.matchUndirectedEdges({
        to: {
          node: wow
        }
      }).first().content).toEqual('meu');
    });

    it('length undirected in wrong case', function() {
      expect(g.matchUndirectedEdges({
        from: {
          node: coucou
        }
      }).commit().size()).toEqual(2);
    });

    it('works undirected in wrong case', function() {
      expect(g.matchUndirectedEdges({
        from: {
          node: wow
        }
      }).first().content).toEqual('meu');
    });
  });


  describe('finishing and matches', function() {
    let g = new Graph();
    let lol = g.addNode({
      type: 'n',
      content: 'a'
    });
    let coucou = g.addNode({
      type: 'n',
      content: 'b'
    });
    let wow = g.addNode({
      type: 'n',
      content: 'c'
    });
    g.addEdge({
      type: 'e',
      content: 'x',
      from: {
        node: lol
      },
      to: {
        node: coucou
      }
    });
    g.addEdge({
      type: 'e',
      content: 'y',
      from: {
        node: lol
      },
      to: {
        node: wow
      }
    });
    g.addEdge({
      type: 'e',
      content: 'z',
      from: {
        node: coucou
      },
      to: {
        node: wow
      }
    });


    // it('should match first ', function() {
    //   expect(g.matchUndirectedEdges({
    //     from: {
    //       node: wow
    //     }
    //   }).first().content).toEqual('meu');
    // });



    it('1', function() {
      expect(g.matchUndirectedEdges().size()).toEqual(3);
    });
    it('2', function() {
      expect(g.matchNodes().size()).toEqual(3);
    });
    it('3', function() {
// g.finish(g.findNode({content:'a'}));
        g.finish(lol);
// lol.finished=true;
// console.log("aaaaaa" + lol.finished);

    });
    it('4', function() {
      expect(g.matchDirectedEdges().size()).toEqual(1);
    });
    it('5', function() {
      expect(g.matchUndirectedEdges().size()).toEqual(1);
    });
    it('6', function() {
      expect(g.matchNodes().size()).toEqual(2);
    });
    it('should work ', function() {
      expect(g.matchUndirectedEdges().first().content).toEqual('z');
    });





  });
});
