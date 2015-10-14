jest.dontMock('../interactions.js')
  .dontMock('../parser.js')
  .dontMock('../serializer.js')
  .dontMock('../operator.js')
  .dontMock('lodash');




var interactions = require('../interactions.js');
var parser = require('../parser.js');
var _ = require('lodash');

describe('interactions', function() {

  describe('compare interactions', function() {

    it('simple', function() {
      expect(interactions.compare({
          "type": "InteractionSimple",
          "operator": "#hdhsd",
          "operand": []
        }, {
          "type": "InteractionSimple",
          "operator": "#hdhsd",
          "operand": []
        }))
        .toEqual(0);
    });

  });

  describe('list of interactions', function() {

    it('simple', function() {
      expect(interactions.listOfInteractions(
        parser.parse("(a)", {
          startRule: "interaction"
        }))).toEqual(
        ["a"]
      );
    });

    it('composite', function() {
      expect(_.sortBy(interactions.listOfInteractions(
        parser.parse("({a:(x),b:((y)+(5))})", {
          startRule: "interaction"
        })))).toEqual(
        _.sortBy(["x", "y", "5", "$+$", "{a:$,b:$}"])
      );
    });
  });

  describe('is base interaction', function() {

    it('simple', function() {
      expect(interactions.isBaseInteraction(
        parser.parse("(previous(q))", {
          startRule: "interaction"
        }))).toEqual(
        true
      );
    });

  });

  describe('is made of base interactions', function() {

    it('case 1', function() {

      expect(interactions.isOnlyMadeOfBaseInteractions(
        parser.parse("(previous(#))", {
          startRule: "interaction"
        }))).toEqual(
        true
      );
    });

    it('case 2 with the custom interaction (5)', function() {

      expect(interactions.isOnlyMadeOfBaseInteractions(
        parser.parse("(previous(#(5)))", {
          startRule: "interaction"
        }))).toEqual(
        false
      );
    });

    it('case 3', function() {
      expect(interactions.isOnlyMadeOfBaseInteractions(
        parser.parse("(previous(#(#5)))", {
          startRule: "interaction"
        }))).toEqual(
        true
      );
    });


    it('case 4 with all base interactions', function() {
      expect(interactions.isOnlyMadeOfBaseInteractions(
        parser.parse("({a:(previous(#(#5)))b:((#d).xys)c:((#2)in(#5)(#2)=(#(#5)))})", {
          startRule: "interaction"
        }))).toEqual(
        true
      );
    });

  });




  describe('compare', function() {

    it('case 1', function() {
      expect(interactions.compare(
        parser.parse("(previous(#))", {
          startRule: "interaction"
        }),
        parser.parse("(previous(#))", {
          startRule: "interaction"
        })) === 0).toBeTruthy();
    });

    it('case 2', function() {
      expect(interactions.compare(
        parser.parse("(previous(#))", {
          startRule: "interaction"
        }),
        parser.parse("(previous(#lol))", {
          startRule: "interaction"
        })) !== 0).toBeTruthy();
    });

    it('case 3', function() {
      expect(interactions.compare(
        parser.parse("(previous(#(5)(6)))", {
          startRule: "interaction"
        }),
        parser.parse("(previous(#(5)(7)))", {
          startRule: "interaction"
        })) !== 0).toBeTruthy();
    });

    it('case 4', function() {
      expect(interactions.compare(
        parser.parse("(previous(#(5)(6)))", {
          startRule: "interaction"
        }),
        parser.parse("(precious(#(5)(7)))", {
          startRule: "interaction"
        })) !== 0).toBeTruthy();
    });


  });

  describe('substitute in interaction', function() {

    it('case 1', function() {
      expect(
        interactions.compare(
          interactions.substituteInInteraction(
            parser.parse("(bob(joe(5)(6))and(lol))", {
              startRule: "interaction"
            }),
            parser.parse("(joe(5)(6))", {
              startRule: "interaction"
            }),
            parser.parse("(a)", {
              startRule: "interaction"
            })
          ),
          parser.parse("(bob(a)and(lol))", {
            startRule: "interaction"
          })
        ) === 0
      ).toBeTruthy();
    });

    it('case 2', function() {
      expect(
        interactions.compare(
          interactions.substituteInInteraction(
            parser.parse("(bob(joe(5)(6))and(joe(5)(6)))", {
              startRule: "interaction"
            }),
            parser.parse("(joe(5)(6))", {
              startRule: "interaction"
            }),
            parser.parse("(a)", {
              startRule: "interaction"
            })
          ),
          parser.parse("(bob(a)and(a))", {
            startRule: "interaction"
          })
        ) === 0
      ).toBeTruthy();
    });

    it('case 3', function() {
      expect(
        interactions.compare(
          interactions.substituteInInteraction(
            interactions.substituteInInteraction(
              parser.parse("(bob(x)and(y))", {
                startRule: "interaction"
              }),
              parser.parse("(x)", {
                startRule: "interaction"
              }),
              parser.parse("(lol(y))", {
                startRule: "interaction"
              })
            ),
            parser.parse("(y)", {
              startRule: "interaction"
            }),
            parser.parse("(bobie(4))", {
              startRule: "interaction"
            })
          ),
          parser.parse("(bob(lol(bobie(4)))and(bobie(4)))", {
            startRule: "interaction"
          })
        ) === 0
      ).toBeTruthy();
    });

    it('case 4', function() {
      expect(
        interactions.compare(
          interactions.substituteInInteraction(
            parser.parse("(#4(5))", {
              startRule: "interaction"
            }),
            parser.parse("(#4(5))", {
              startRule: "interaction"
            }),
            parser.parse("(#4)", {
              startRule: "interaction"
            })
          ),
          parser.parse("(#4)", {
            startRule: "interaction"
          })
        ) === 0
      ).toBeTruthy();
    });

  });




  describe('interaction matches definition', function() {
    it('should work', function() {
      expect(
        interactions.interactionMatchesDefinition(
          parser.parse("(test(a)(b))", {
            startRule: "interaction"
          }),
          parser.parse("interaction(test(a:X in)(b:Y out)):Z in is (bob)", {
            startRule: "interactionDefinition"
          })
        )).toBeTruthy();
    });
  });



  describe('instantiate in interaction', function() {

    it('should preserve interactions not matching', function() {

      expect(
        interactions.instantiate(
          parser.parse("(test(a)(b))", {
            startRule: "interaction"
          }),
          parser.parse("interaction (x):Number in is (y)", {
            startRule: "interactionDefinition"
          })
        )
      ).toEqual(parser.parse("(test(a)(b))", {
        startRule: "interaction"
      }));

    });

    it('should instantiate a simple case with no arguments', function() {
      expect(
        interactions.instantiate(
          parser.parse("(test(a)(b))", {
            startRule: "interaction"
          }),
          parser.parse("interaction (a):Number in is (b)", {
            startRule: "interactionDefinition"
          })
        )
      ).toEqual(parser.parse("(test(b)(b))", {
        startRule: "interaction"
      }));

    });

    it('should instantiate a case with arguments', function() {
      expect(
        interactions.instantiate(
          parser.parse("(test(a(5))(b))", {
            startRule: "interaction"
          }),
          parser.parse("interaction (a(x:Number in)):Number out is (bob(x)test(x))", {
            startRule: "interactionDefinition"
          })
        )
      ).toEqual(
        parser.parse("(test(bob(5)test(5))(b))", {
          startRule: "interaction"
        }));
    });

    it('should instantiate a complex case', function() {
      expect(
        interactions.instantiate(
          parser.parse("(test(a((5)+(6)))(a(b(F(3)))))", {
            startRule: "interaction"
          }),
          parser.parse("interaction (a(x:Number in)):Number out is (bob(x)test(b))", {
            startRule: "interactionDefinition"
          })
        )
      ).toEqual(
        parser.parse("(test(bob((5)+(6))test(b))(bob(b(F(3)))test(b)))", {
          startRule: "interaction"
        }));
    });


  });

  describe('find matching definition', function() {

    it('should work on a simple case with a definition on the same level', function() {
      var res = parser.parse("interaction (a(x:Number in)):Number out with interaction (b):Number out is (c) is (bob(x)test(b))", {
        startRule: "interactionDefinition"
      });
      var b = parser.parse("(b)", {
        startRule: "interaction"
      });
      var defb = parser.parse("interaction (b):Number out is (c)", {
        startRule: "interactionDefinition"
      });
      var foundDefb = interactions.findMatchingDefinition(b, res);
      delete foundDefb.parent;
      expect(foundDefb).toEqual(defb);
    });

    it('should work on a simple case with a definition on the parent', function() {
      var res = parser.parse("interaction (k):Number in with interaction (b):Number out is (d) interaction (a(x:Number in)):Number out with interaction (b):Number out is (c) is (bob(x)test(b)) is (b)");
      var b = parser.parse("(b)", {
        startRule: "interaction"
      });
      var rightdefb = parser.parse("interaction (b):Number out is (c)", {
        startRule: "interactionDefinition"
      });
      var wrongdefb = parser.parse("interaction (b):Number out is (d)", {
        startRule: "interactionDefinition"
      });
      var foundDefb = interactions.findMatchingDefinition(b, res[0].definitions[1]);
      delete foundDefb.parent;
      expect(foundDefb).toEqual(rightdefb);
      expect(foundDefb).not.toEqual(wrongdefb);
    });

    it('should work on a simple case where the interaction is an argument', function() {
      var res = parser.parse("interaction (k):Number in with interaction (b):Number out is (d) interaction (a(x:Number in)):Number out with interaction (b):Number out is (c) is (bob(x)test(b)) is (b)");
      var x = parser.parse("(x)", {
        startRule: "interaction"
      });
      var rightDefx = "Argument";
      var foundDefx = interactions.findMatchingDefinition(x, res[0].definitions[1]);
      expect(foundDefx).toEqual(rightDefx);
    });

    it('should work on a simple case where the interaction is an argument of a parent', function() {
      var res = parser.parse("interaction (k(x:Number in)):Number in with interaction (b):Number out is (d) interaction (a):Number out with interaction (b):Number out is (c) is (bob(x)test(b)) is (b)");
      var x = parser.parse("(x)", {
        startRule: "interaction"
      });
      var rightDefx = "Argument";
      var foundDefx = interactions.findMatchingDefinition(x, res[0].definitions[1]);
      expect(foundDefx).toEqual(rightDefx);
    });
  });




  describe('list non base interactions', function() {
    it('should work on a simple case', function() {
      var list = interactions.listNonBaseInteractions(parser.parse("({b:(4),y:(cos(sin(previous(x))))})", {
        startRule: "interaction"
      }));

      expect(list).toContain(parser.parse("(4)", {
        startRule: "interaction"
      }));

      expect(list).toContain(parser.parse("(cos(sin(previous(x))))", {
        startRule: "interaction"
      }));

      expect(list).toContain(parser.parse("(sin(previous(x)))", {
        startRule: "interaction"
      }));

      expect(list).toContain(parser.parse("(x)", {
        startRule: "interaction"
      }));

    });
  });

  describe('expand', function() {
    it('should work on a simple case', function() {
      var interaction = interactions.expand(
        parser.parse("interaction (joe(x:Number in)):Number in is (x)")[0]
      ).interaction;
      expect(interaction).toEqual(parser.parse("(x)", {
        startRule: "interaction"
      }));
    });
    it.only('should work on a simple case with a closure', function() {
      var interaction = interactions.expand(
        parser.parse("interaction (joe(x:Number in)):Number in with interaction (a):Number in is (x) is (a)")[0]
      ).interaction;
      expect(interaction).toEqual(parser.parse("(x)", {
        startRule: "interaction"
      }));
    });

    it('should error on a erroneous case', function() {
      expect(function() {
        interactions.expand(
          parser.parse("interaction (joe(x:Number in)):Number in with interaction (a):Number in is (2) is (a)")[0]
        );
      }).toThrow("could not find definition matching interaction (2)");
    });

    it('should work on a simple case with base interactions', function() {
      var interaction = interactions.expand(
        parser.parse("interaction (a(x:Number in)(y:Number out)):Number in is ({x:(x),y:(y)})")[0]
      ).interaction;

      expect(interaction).toEqual(parser.parse("({x:(x),y:(y)})", {
        startRule: "interaction"
      }));
    });

    /*TODO make this test pass*/
    it('should work on a complex case with base interactions', function() {
      var interaction = interactions.expand(
        parser.parse("interaction (a(x:Number in)(y:Number out)):Number in with interaction (z):Number in with interaction (k):Number out is (#3) is ((k)in(#1)({})=(k)) is ((x)in(#2)({x:(x),z:(z)})=(y))")[0]
      ).interaction;

      expect(interaction).toEqual(parser.parse("((x)in(#2)({x:(x),z:((#3)in(#1)({})=(#3))})=(y))", {
        startRule: "interaction"
      }));
    });


    it('should work on a case with base interactions', function() {

      var interaction = interactions.expand(
        parser.parse("interaction (a(x:Number in)(y:Number out)):Number in with interaction (z):Number in is ((#3)in(#1)({})=(#3)) is ((x)in(#2)({x:(x),z:(z)})=(y))")[0]
      ).interaction;

      expect(interaction).toEqual(parser.parse("((x)in(#2)({x:(x),z:((#3)in(#1)({})=(#3))})=(y))", {
        startRule: "interaction"
      }));
    });



  });



});
