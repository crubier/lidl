"use strict"
jest.dontMock('../g.js').dontMock('lodash');

var Graph = require('../g.js');

describe('graph', function() {


  describe('inverse node', function() {
    let g = new Graph();
    let coucou = g.addNode('bob', 'coucou');
    let beeh = g.addNode('bob', 'ouuu');

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
    let lol = g.addNode('bob', 'lol');
    let coucou = g.addNode('bob', 'coucou');
    let wow = g.addNode('bob', 'wow');
    g.addEdge('ast', 'caca', lol, coucou);
    g.addEdge('ast', 'meu', lol, wow);
    g.addEdge('ast', 'beeeh', coucou, wow);

    it('works in simple case', function() {
      expect(g.matchDirectedEdges({
        to: {
          node: coucou
        }
      })[0].content).toEqual('caca');
    });

    it('works in inversed case', function() {
      expect(g.matchDirectedEdges(g.inverse({
        from: {
          node: coucou
        }
      }))[0].content).toEqual('caca');
    });

    it('works undirected in right case', function() {
      expect(g.matchUndirectedEdges({
        to: {
          node: wow
        }
      })[0].content).toEqual('meu');
    });

    it('works undirected in wrong case', function() {
      expect(g.matchUndirectedEdges({
        from: {
          node: wow
        }
      })[0].content).toEqual('meu');
    });
  });


  describe('finishing and matches', function() {
    let g = new Graph();
    let lol = g.addNode('bob', 'lol');
    let coucou = g.addNode('bob', 'coucou');
    let wow = g.addNode('bob', 'wow');
    g.addEdge('ast', 'caca', lol, coucou);
    g.addEdge('ast', 'meu', lol, wow);
    g.addEdge('ast', 'beeeh', coucou, wow);


    it('should match first ', function() {
      expect(g.matchUndirectedEdges({
        from: {
          node: wow
        }
      })[0].content).toEqual('meu');
    });


    it('should work ', function() {


      g.finish(lol);
      expect(g.matchUndirectedEdges()[0].content).toEqual('beeeh');

    });





  });
});
