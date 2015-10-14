jest.dontMock('../data.js').dontMock('lodash');

describe('data data', function() {
  var data = require('../data.js');


  describe('validation', function() {
    it('should detect invalid data', function() {

      expect(data.isValid({
        bob: "lol"
      })).toBeFalsy();

      expect(data.isValid({
        type: "Bobie"
      })).toBeFalsy();

      expect(data.isValid({
        type: "DataAtomic"
      })).toBeFalsy();

      expect(data.isValid({
        type: "DataComposite"
      })).toBeFalsy();

      expect(data.isValid({
        type: "DataFunction"
      })).toBeFalsy();

      expect(data.isValid({
        type: "DataArray"
      })).toBeFalsy();

      expect(data.isValid({
        type: "DataOperation"
      })).toBeFalsy();
    });

    describe('valid data', function() {

      it('should detect valid atomic type', function() {
        expect(data.isValid({
          type: "DataAtomic",
          name: "Boolean"
        })).toBeTruthy();
      });

      it('should detect valid composite type', function() {
        expect(data.isValid({
          type: "DataComposite",
          element: [{
            type: "DataCompositeElement",
            key: "joe",
            value: {
              type: "DataAtomic",
              name: "Boolean"
            }
          }]
        })).toBeTruthy();
      });

      it('should detect valid function type', function() {
        expect(data.isValid({
          type: "DataFunction",
          domain: {
            type: "DataAtomic",
            name: "Boolean"
          },
          codomain: {
            type: "DataAtomic",
            name: "Number"
          }
        })).toBeTruthy();
      });

      it('should detect valid array type', function() {
        expect(data.isValid({
          type: "DataArray",
          element: {
            type: "DataAtomic",
            name: "Text"
          }
        })).toBeTruthy();
      });

      //TODO
      it('should detect valid operation type', function() {
        expect(data.isValid({
          type: "DataOperation",
          operator: 'union',
          operand: [{
            type: "DataComposite",
            element: [{
              type: "DataCompositeElement",
              key: "joe",
              value: {
                type: "DataAtomic",
                name: "Boolean"
              }
            }]
          }, {
            type: "DataComposite",
            element: [{
              type: "DataCompositeElement",
              key: "bob",
              value: {
                type: "DataAtomic",
                name: "Number"
              }
            }]
          }]
        })).toBeTruthy();
      });

      //TODO
      // it('should prevent invalid operation type', function() {
      //   expect(data.isValid({
      //     type: "DataOperation",
      //     operator: 'union',
      //     operand: [{
      //       type: "DataAtomic",
      //       name: "Boolean"
      //     }]
      //   })).toBeFalsy();
      // });


    });
  });


  describe('compare', function() {

    describe('mixed data', function() {
      it('should detect difference', function() {
        expect(data.compare({
          type: "DataAtomic",
          name: "Number"
        }, {
          type: "DataArray",
          element: {
            type: "DataAtomic",
            name: "Boolean"
          }
        })).toBeFalsy();
      });

    });

    describe('atomic', function() {
      it('should detect equality', function() {
        expect(data.compare({
          type: "DataAtomic",
          name: "Number"
        }, {
          type: "DataAtomic",
          name: "Number"
        })).toBeTruthy();
      });
      it('should detect difference', function() {
        expect(data.compare({
          type: "DataAtomic",
          name: "Number"
        }, {
          type: "DataAtomic",
          name: "Text"
        })).toBeFalsy();
      });
    });

    describe('array', function() {
      it('should detect equality', function() {
        expect(data.compare({
          type: "DataArray",
          element: {
            type: "DataAtomic",
            name: "Boolean"
          }
        }, {
          type: "DataArray",
          element: {
            type: "DataAtomic",
            name: "Boolean"
          }
        })).toBeTruthy();
      });
      it('should detect difference', function() {
        expect(data.compare({
          type: "DataArray",
          element: {
            type: "DataAtomic",
            name: "Activation"
          }
        }, {
          type: "DataArray",
          element: {
            type: "DataAtomic",
            name: "Boolean"
          }
        })).toBeFalsy();
      });
    });

    describe('function', function() {
      it('should detect equality', function() {
        expect(data.compare({
          type: "DataFunction",
          domain: {
            type: "DataAtomic",
            name: "Boolean"
          },
          codomain: {
            type: "DataAtomic",
            name: "Number"
          }
        }, {
          type: "DataFunction",
          domain: {
            type: "DataAtomic",
            name: "Boolean"
          },
          codomain: {
            type: "DataAtomic",
            name: "Number"
          }
        })).toBeTruthy();
      });
      it('should detect difference', function() {
        expect(data.compare({
          type: "DataFunction",
          domain: {
            type: "DataAtomic",
            name: "Boolean"
          },
          codomain: {
            type: "DataAtomic",
            name: "Number"
          }
        }, {
          type: "DataFunction",
          domain: {
            type: "DataAtomic",
            name: "Number"
          },
          codomain: {
            type: "DataAtomic",
            name: "Number"
          }
        })).toBeFalsy();
      });
    });

    describe('composite', function() {
      it('should detect equality in a simple case', function() {
        expect(data.compare({
          type: "DataComposite",
          element: [{
            type: "DataCompositeElement",
            key: "ABC",
            value: {
              type: "DataAtomic",
              name: "Number"
            }
          }, {
            type: "DataCompositeElement",
            key: "XYZ",
            value: {
              type: "DataAtomic",
              name: "Boolean"
            }
          }]
        }, {
          type: "DataComposite",
          element: [{
            type: "DataCompositeElement",
            key: "ABC",
            value: {
              type: "DataAtomic",
              name: "Number"
            }
          }, {
            type: "DataCompositeElement",
            key: "XYZ",
            value: {
              type: "DataAtomic",
              name: "Boolean"
            }
          }]
        })).toBeTruthy();
      });
      it('should detect equality even if keys are in a different order', function() {
        expect(data.compare({
          type: "DataComposite",
          element: [{
            type: "DataCompositeElement",
            key: "ABC",
            value: {
              type: "DataAtomic",
              name: "Number"
            }
          }, {
            type: "DataCompositeElement",
            key: "XYZ",
            value: {
              type: "DataAtomic",
              name: "Boolean"
            }
          }]
        }, {
          type: "DataComposite",
          element: [{
            type: "DataCompositeElement",
            key: "XYZ",
            value: {
              type: "DataAtomic",
              name: "Boolean"
            }
          }, {
            type: "DataCompositeElement",
            key: "ABC",
            value: {
              type: "DataAtomic",
              name: "Number"
            }
          }]
        })).toBeTruthy();
      });
      it('should detect difference in data', function() {
        expect(data.compare({
          type: "DataComposite",
          element: [{
            type: "DataCompositeElement",
            key: "ABC",
            value: {
              type: "DataAtomic",
              name: "Number"
            }
          }]
        }, {
          type: "DataComposite",
          element: [{
            type: "DataCompositeElement",
            key: "ABC",
            value: {
              type: "DataAtomic",
              name: "Boolean"
            }
          }]
        })).toBeFalsy();
      });

      it('should detect difference in keys', function() {
        expect(data.compare({
          type: "DataComposite",
          element: [{
            type: "DataCompositeElement",
            key: "XYZ",
            value: {
              type: "DataAtomic",
              name: "Boolean"
            }
          }]
        }, {
          type: "DataComposite",
          element: [{
            type: "DataCompositeElement",
            key: "ABC",
            value: {
              type: "DataAtomic",
              name: "Boolean"
            }
          }]
        })).toBeFalsy();
      });

    });


  });


  describe('compute', function() {
    describe('union', function() {

      it('should work in a simple case', function() {
        expect(data.compute({
          type: "DataOperation",
          operator: "union",
          operand: [{
            type: "DataComposite",
            element: [{
              type: "DataCompositeElement",
              key: "ABC",
              value: {
                type: "DataAtomic",
                name: "Number"
              }
            }]
          }, {
            type: "DataComposite",
            element: [{
              type: "DataCompositeElement",
              key: "XYZ",
              value: {
                type: "DataAtomic",
                name: "Boolean"
              }
            }]
          }]
        })).toEqual({
          type: "DataComposite",
          element: [{
            type: "DataCompositeElement",
            key: "ABC",
            value: {
              type: "DataAtomic",
              name: "Number"
            }
          }, {
            type: "DataCompositeElement",
            key: "XYZ",
            value: {
              type: "DataAtomic",
              name: "Boolean"
            }
          }]
        });
      });

      it('should output a composite type where keys are sorted lexicographically', function() {
        expect(data.compute({
          type: "DataOperation",
          operator: "union",
          operand: [{
            type: "DataComposite",
            element: [{
              type: "DataCompositeElement",
              key: "XYZ",
              value: {
                type: "DataAtomic",
                name: "Boolean"
              }
            }]
          }, {
            type: "DataComposite",
            element: [{
              type: "DataCompositeElement",
              key: "ABC",
              value: {
                type: "DataAtomic",
                name: "Number"
              }
            }]
          }]
        })).toEqual({
          type: "DataComposite",
          element: [{
            type: "DataCompositeElement",
            key: "ABC",
            value: {
              type: "DataAtomic",
              name: "Number"
            }
          }, {
            type: "DataCompositeElement",
            key: "XYZ",
            value: {
              type: "DataAtomic",
              name: "Boolean"
            }
          }]
        });
      });

      it('should pick elements from the first operand when operands have identical keys with different data', function() {
        expect(data.compute({
          type: "DataOperation",
          operator: "union",
          operand: [{
            type: "DataComposite",
            element: [{
              type: "DataCompositeElement",
              key: "XYZ",
              value: {
                type: "DataAtomic",
                name: "Boolean"
              }
            }]
          }, {
            type: "DataComposite",
            element: [{
              type: "DataCompositeElement",
              key: "XYZ",
              value: {
                type: "DataAtomic",
                name: "Text"
              }
            }, {
              type: "DataCompositeElement",
              key: "ABC",
              value: {
                type: "DataAtomic",
                name: "Number"
              }
            }]
          }]
        })).toEqual({
          type: "DataComposite",
          element: [{
            type: "DataCompositeElement",
            key: "ABC",
            value: {
              type: "DataAtomic",
              name: "Number"
            }
          }, {
            type: "DataCompositeElement",
            key: "XYZ",
            value: {
              type: "DataAtomic",
              name: "Boolean"
            }
          }]
        });
      });

    });


    describe('intersection', function() {

      it('should work in a simple case', function() {
        expect(data.compute({
          type: "DataOperation",
          operator: "intersection",
          operand: [{
            type: "DataComposite",
            element: [{
              type: "DataCompositeElement",
              key: "ABC",
              value: {
                type: "DataAtomic",
                name: "Number"
              }
            }]
          }, {
            type: "DataComposite",
            element: [{
              type: "DataCompositeElement",
              key: "ABC",
              value: {
                type: "DataAtomic",
                name: "Number"
              }
            }, {
              type: "DataCompositeElement",
              key: "XYZ",
              value: {
                type: "DataAtomic",
                name: "Boolean"
              }
            }]
          }]
        })).toEqual({
          type: "DataComposite",
          element: [{
            type: "DataCompositeElement",
            key: "ABC",
            value: {
              type: "DataAtomic",
              name: "Number"
            }
          }]
        });
      });

      it('should output a composite type where keys are sorted lexicographically', function() {
        expect(data.compute({
          type: "DataOperation",
          operator: "union",
          operand: [{
            type: "DataComposite",
            element: [{
              type: "DataCompositeElement",
              key: "XYZ",
              value: {
                type: "DataAtomic",
                name: "Boolean"
              }
            }]
          }, {
            type: "DataComposite",
            element: [{
              type: "DataCompositeElement",
              key: "ABC",
              value: {
                type: "DataAtomic",
                name: "Number"
              }
            }]
          }]
        })).toEqual({
          type: "DataComposite",
          element: [{
            type: "DataCompositeElement",
            key: "ABC",
            value: {
              type: "DataAtomic",
              name: "Number"
            }
          }, {
            type: "DataCompositeElement",
            key: "XYZ",
            value: {
              type: "DataAtomic",
              name: "Boolean"
            }
          }]
        });
      });

      it('should pick elements from the first operand when operands have identical keys with different data', function() {
        expect(data.compute({
          type: "DataOperation",
          operator: "union",
          operand: [{
            type: "DataComposite",
            element: [{
              type: "DataCompositeElement",
              key: "XYZ",
              value: {
                type: "DataAtomic",
                name: "Boolean"
              }
            }]
          }, {
            type: "DataComposite",
            element: [{
              type: "DataCompositeElement",
              key: "XYZ",
              value: {
                type: "DataAtomic",
                name: "Text"
              }
            }, {
              type: "DataCompositeElement",
              key: "ABC",
              value: {
                type: "DataAtomic",
                name: "Number"
              }
            }]
          }]
        })).toEqual({
          type: "DataComposite",
          element: [{
            type: "DataCompositeElement",
            key: "ABC",
            value: {
              type: "DataAtomic",
              name: "Number"
            }
          }, {
            type: "DataCompositeElement",
            key: "XYZ",
            value: {
              type: "DataAtomic",
              name: "Boolean"
            }
          }]
        });
      });

    });

  });
});
