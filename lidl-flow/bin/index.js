'use strict';

var fp = require('lodash/fp');

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();



var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

const NUM_RETRIES = 10;
const DELAY = 1;

const retry = (() => {
  var _ref = asyncToGenerator(function* (f, retries = NUM_RETRIES, delay = DELAY) {
    let i = 0;
    // eslint-disable-line no-constant-condition
    while (true) {
      try {
        return yield f(i);
      } catch (err) {
        if (i === retries) {
          throw err;
        } else {
          i = i + 1;
        }
        yield sleep(delay);
      }
    }
  });

  return function retry(_x) {
    return _ref.apply(this, arguments);
  };
})();

const available = (() => {
  var _ref2 = asyncToGenerator(function* (variable, retries = NUM_RETRIES, delay = DELAY) {
    let i = 0;
    // eslint-disable-line no-constant-condition
    while (true) {
      if (!fp.isNil(variable)) {
        return variable;
      } else {
        if (i === retries) {
          throw new Error("Could not receive variable");
        } else {
          i = i + 1;
        }
        yield sleep(delay);
      }
    }
  });

  return function available(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

const sleep = (duration = DELAY) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), duration);
  });
};

let main = (() => {
  var _ref3 = asyncToGenerator(function* () {
    const res = output();
    yield input(3);
    console.log((yield res));
  });

  return function main() {
    return _ref3.apply(this, arguments);
  };
})();

let channel = undefined;

const output = (() => {
  var _ref = asyncToGenerator(function* () {
    return yield available(channel);
  });

  return function output() {
    return _ref.apply(this, arguments);
  };
})();

const input = (() => {
  var _ref2 = asyncToGenerator(function* (x) {
    channel = x;
  });

  return function input(_x) {
    return _ref2.apply(this, arguments);
  };
})();

try {
  main();
} catch (e) {
  console.log(e);
}
