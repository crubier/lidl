import { createRequire } from "node:module";
var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};
var __require = /* @__PURE__ */ createRequire(import.meta.url);

// node_modules/vscode-languageserver/lib/common/utils/is.js
var require_is = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.thenable = exports.typedArray = exports.stringArray = exports.array = exports.func = exports.error = exports.number = exports.string = exports.boolean = undefined;
  function boolean(value) {
    return value === true || value === false;
  }
  exports.boolean = boolean;
  function string(value) {
    return typeof value === "string" || value instanceof String;
  }
  exports.string = string;
  function number(value) {
    return typeof value === "number" || value instanceof Number;
  }
  exports.number = number;
  function error(value) {
    return value instanceof Error;
  }
  exports.error = error;
  function func(value) {
    return typeof value === "function";
  }
  exports.func = func;
  function array(value) {
    return Array.isArray(value);
  }
  exports.array = array;
  function stringArray(value) {
    return array(value) && value.every((elem) => string(elem));
  }
  exports.stringArray = stringArray;
  function typedArray(value, check) {
    return Array.isArray(value) && value.every(check);
  }
  exports.typedArray = typedArray;
  function thenable(value) {
    return value && func(value.then);
  }
  exports.thenable = thenable;
});

// node_modules/vscode-jsonrpc/lib/common/is.js
var require_is2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.stringArray = exports.array = exports.func = exports.error = exports.number = exports.string = exports.boolean = undefined;
  function boolean(value) {
    return value === true || value === false;
  }
  exports.boolean = boolean;
  function string(value) {
    return typeof value === "string" || value instanceof String;
  }
  exports.string = string;
  function number(value) {
    return typeof value === "number" || value instanceof Number;
  }
  exports.number = number;
  function error(value) {
    return value instanceof Error;
  }
  exports.error = error;
  function func(value) {
    return typeof value === "function";
  }
  exports.func = func;
  function array(value) {
    return Array.isArray(value);
  }
  exports.array = array;
  function stringArray(value) {
    return array(value) && value.every((elem) => string(elem));
  }
  exports.stringArray = stringArray;
});

// node_modules/vscode-jsonrpc/lib/common/messages.js
var require_messages = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Message = exports.NotificationType9 = exports.NotificationType8 = exports.NotificationType7 = exports.NotificationType6 = exports.NotificationType5 = exports.NotificationType4 = exports.NotificationType3 = exports.NotificationType2 = exports.NotificationType1 = exports.NotificationType0 = exports.NotificationType = exports.RequestType9 = exports.RequestType8 = exports.RequestType7 = exports.RequestType6 = exports.RequestType5 = exports.RequestType4 = exports.RequestType3 = exports.RequestType2 = exports.RequestType1 = exports.RequestType = exports.RequestType0 = exports.AbstractMessageSignature = exports.ParameterStructures = exports.ResponseError = exports.ErrorCodes = undefined;
  var is = require_is2();
  var ErrorCodes;
  (function(ErrorCodes2) {
    ErrorCodes2.ParseError = -32700;
    ErrorCodes2.InvalidRequest = -32600;
    ErrorCodes2.MethodNotFound = -32601;
    ErrorCodes2.InvalidParams = -32602;
    ErrorCodes2.InternalError = -32603;
    ErrorCodes2.jsonrpcReservedErrorRangeStart = -32099;
    ErrorCodes2.serverErrorStart = -32099;
    ErrorCodes2.MessageWriteError = -32099;
    ErrorCodes2.MessageReadError = -32098;
    ErrorCodes2.PendingResponseRejected = -32097;
    ErrorCodes2.ConnectionInactive = -32096;
    ErrorCodes2.ServerNotInitialized = -32002;
    ErrorCodes2.UnknownErrorCode = -32001;
    ErrorCodes2.jsonrpcReservedErrorRangeEnd = -32000;
    ErrorCodes2.serverErrorEnd = -32000;
  })(ErrorCodes || (exports.ErrorCodes = ErrorCodes = {}));

  class ResponseError extends Error {
    constructor(code, message, data) {
      super(message);
      this.code = is.number(code) ? code : ErrorCodes.UnknownErrorCode;
      this.data = data;
      Object.setPrototypeOf(this, ResponseError.prototype);
    }
    toJson() {
      const result = {
        code: this.code,
        message: this.message
      };
      if (this.data !== undefined) {
        result.data = this.data;
      }
      return result;
    }
  }
  exports.ResponseError = ResponseError;

  class ParameterStructures {
    constructor(kind) {
      this.kind = kind;
    }
    static is(value) {
      return value === ParameterStructures.auto || value === ParameterStructures.byName || value === ParameterStructures.byPosition;
    }
    toString() {
      return this.kind;
    }
  }
  exports.ParameterStructures = ParameterStructures;
  ParameterStructures.auto = new ParameterStructures("auto");
  ParameterStructures.byPosition = new ParameterStructures("byPosition");
  ParameterStructures.byName = new ParameterStructures("byName");

  class AbstractMessageSignature {
    constructor(method, numberOfParams) {
      this.method = method;
      this.numberOfParams = numberOfParams;
    }
    get parameterStructures() {
      return ParameterStructures.auto;
    }
  }
  exports.AbstractMessageSignature = AbstractMessageSignature;

  class RequestType0 extends AbstractMessageSignature {
    constructor(method) {
      super(method, 0);
    }
  }
  exports.RequestType0 = RequestType0;

  class RequestType extends AbstractMessageSignature {
    constructor(method, _parameterStructures = ParameterStructures.auto) {
      super(method, 1);
      this._parameterStructures = _parameterStructures;
    }
    get parameterStructures() {
      return this._parameterStructures;
    }
  }
  exports.RequestType = RequestType;

  class RequestType1 extends AbstractMessageSignature {
    constructor(method, _parameterStructures = ParameterStructures.auto) {
      super(method, 1);
      this._parameterStructures = _parameterStructures;
    }
    get parameterStructures() {
      return this._parameterStructures;
    }
  }
  exports.RequestType1 = RequestType1;

  class RequestType2 extends AbstractMessageSignature {
    constructor(method) {
      super(method, 2);
    }
  }
  exports.RequestType2 = RequestType2;

  class RequestType3 extends AbstractMessageSignature {
    constructor(method) {
      super(method, 3);
    }
  }
  exports.RequestType3 = RequestType3;

  class RequestType4 extends AbstractMessageSignature {
    constructor(method) {
      super(method, 4);
    }
  }
  exports.RequestType4 = RequestType4;

  class RequestType5 extends AbstractMessageSignature {
    constructor(method) {
      super(method, 5);
    }
  }
  exports.RequestType5 = RequestType5;

  class RequestType6 extends AbstractMessageSignature {
    constructor(method) {
      super(method, 6);
    }
  }
  exports.RequestType6 = RequestType6;

  class RequestType7 extends AbstractMessageSignature {
    constructor(method) {
      super(method, 7);
    }
  }
  exports.RequestType7 = RequestType7;

  class RequestType8 extends AbstractMessageSignature {
    constructor(method) {
      super(method, 8);
    }
  }
  exports.RequestType8 = RequestType8;

  class RequestType9 extends AbstractMessageSignature {
    constructor(method) {
      super(method, 9);
    }
  }
  exports.RequestType9 = RequestType9;

  class NotificationType extends AbstractMessageSignature {
    constructor(method, _parameterStructures = ParameterStructures.auto) {
      super(method, 1);
      this._parameterStructures = _parameterStructures;
    }
    get parameterStructures() {
      return this._parameterStructures;
    }
  }
  exports.NotificationType = NotificationType;

  class NotificationType0 extends AbstractMessageSignature {
    constructor(method) {
      super(method, 0);
    }
  }
  exports.NotificationType0 = NotificationType0;

  class NotificationType1 extends AbstractMessageSignature {
    constructor(method, _parameterStructures = ParameterStructures.auto) {
      super(method, 1);
      this._parameterStructures = _parameterStructures;
    }
    get parameterStructures() {
      return this._parameterStructures;
    }
  }
  exports.NotificationType1 = NotificationType1;

  class NotificationType2 extends AbstractMessageSignature {
    constructor(method) {
      super(method, 2);
    }
  }
  exports.NotificationType2 = NotificationType2;

  class NotificationType3 extends AbstractMessageSignature {
    constructor(method) {
      super(method, 3);
    }
  }
  exports.NotificationType3 = NotificationType3;

  class NotificationType4 extends AbstractMessageSignature {
    constructor(method) {
      super(method, 4);
    }
  }
  exports.NotificationType4 = NotificationType4;

  class NotificationType5 extends AbstractMessageSignature {
    constructor(method) {
      super(method, 5);
    }
  }
  exports.NotificationType5 = NotificationType5;

  class NotificationType6 extends AbstractMessageSignature {
    constructor(method) {
      super(method, 6);
    }
  }
  exports.NotificationType6 = NotificationType6;

  class NotificationType7 extends AbstractMessageSignature {
    constructor(method) {
      super(method, 7);
    }
  }
  exports.NotificationType7 = NotificationType7;

  class NotificationType8 extends AbstractMessageSignature {
    constructor(method) {
      super(method, 8);
    }
  }
  exports.NotificationType8 = NotificationType8;

  class NotificationType9 extends AbstractMessageSignature {
    constructor(method) {
      super(method, 9);
    }
  }
  exports.NotificationType9 = NotificationType9;
  var Message;
  (function(Message2) {
    function isRequest(message) {
      const candidate = message;
      return candidate && is.string(candidate.method) && (is.string(candidate.id) || is.number(candidate.id));
    }
    Message2.isRequest = isRequest;
    function isNotification(message) {
      const candidate = message;
      return candidate && is.string(candidate.method) && message.id === undefined;
    }
    Message2.isNotification = isNotification;
    function isResponse(message) {
      const candidate = message;
      return candidate && (candidate.result !== undefined || !!candidate.error) && (is.string(candidate.id) || is.number(candidate.id) || candidate.id === null);
    }
    Message2.isResponse = isResponse;
  })(Message || (exports.Message = Message = {}));
});

// node_modules/vscode-jsonrpc/lib/common/linkedMap.js
var require_linkedMap = __commonJS((exports) => {
  var _a;
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.LRUCache = exports.LinkedMap = exports.Touch = undefined;
  var Touch;
  (function(Touch2) {
    Touch2.None = 0;
    Touch2.First = 1;
    Touch2.AsOld = Touch2.First;
    Touch2.Last = 2;
    Touch2.AsNew = Touch2.Last;
  })(Touch || (exports.Touch = Touch = {}));

  class LinkedMap {
    constructor() {
      this[_a] = "LinkedMap";
      this._map = new Map;
      this._head = undefined;
      this._tail = undefined;
      this._size = 0;
      this._state = 0;
    }
    clear() {
      this._map.clear();
      this._head = undefined;
      this._tail = undefined;
      this._size = 0;
      this._state++;
    }
    isEmpty() {
      return !this._head && !this._tail;
    }
    get size() {
      return this._size;
    }
    get first() {
      return this._head?.value;
    }
    get last() {
      return this._tail?.value;
    }
    has(key) {
      return this._map.has(key);
    }
    get(key, touch = Touch.None) {
      const item = this._map.get(key);
      if (!item) {
        return;
      }
      if (touch !== Touch.None) {
        this.touch(item, touch);
      }
      return item.value;
    }
    set(key, value, touch = Touch.None) {
      let item = this._map.get(key);
      if (item) {
        item.value = value;
        if (touch !== Touch.None) {
          this.touch(item, touch);
        }
      } else {
        item = { key, value, next: undefined, previous: undefined };
        switch (touch) {
          case Touch.None:
            this.addItemLast(item);
            break;
          case Touch.First:
            this.addItemFirst(item);
            break;
          case Touch.Last:
            this.addItemLast(item);
            break;
          default:
            this.addItemLast(item);
            break;
        }
        this._map.set(key, item);
        this._size++;
      }
      return this;
    }
    delete(key) {
      return !!this.remove(key);
    }
    remove(key) {
      const item = this._map.get(key);
      if (!item) {
        return;
      }
      this._map.delete(key);
      this.removeItem(item);
      this._size--;
      return item.value;
    }
    shift() {
      if (!this._head && !this._tail) {
        return;
      }
      if (!this._head || !this._tail) {
        throw new Error("Invalid list");
      }
      const item = this._head;
      this._map.delete(item.key);
      this.removeItem(item);
      this._size--;
      return item.value;
    }
    forEach(callbackfn, thisArg) {
      const state = this._state;
      let current = this._head;
      while (current) {
        if (thisArg) {
          callbackfn.bind(thisArg)(current.value, current.key, this);
        } else {
          callbackfn(current.value, current.key, this);
        }
        if (this._state !== state) {
          throw new Error(`LinkedMap got modified during iteration.`);
        }
        current = current.next;
      }
    }
    keys() {
      const state = this._state;
      let current = this._head;
      const iterator = {
        [Symbol.iterator]: () => {
          return iterator;
        },
        next: () => {
          if (this._state !== state) {
            throw new Error(`LinkedMap got modified during iteration.`);
          }
          if (current) {
            const result = { value: current.key, done: false };
            current = current.next;
            return result;
          } else {
            return { value: undefined, done: true };
          }
        }
      };
      return iterator;
    }
    values() {
      const state = this._state;
      let current = this._head;
      const iterator = {
        [Symbol.iterator]: () => {
          return iterator;
        },
        next: () => {
          if (this._state !== state) {
            throw new Error(`LinkedMap got modified during iteration.`);
          }
          if (current) {
            const result = { value: current.value, done: false };
            current = current.next;
            return result;
          } else {
            return { value: undefined, done: true };
          }
        }
      };
      return iterator;
    }
    entries() {
      const state = this._state;
      let current = this._head;
      const iterator = {
        [Symbol.iterator]: () => {
          return iterator;
        },
        next: () => {
          if (this._state !== state) {
            throw new Error(`LinkedMap got modified during iteration.`);
          }
          if (current) {
            const result = { value: [current.key, current.value], done: false };
            current = current.next;
            return result;
          } else {
            return { value: undefined, done: true };
          }
        }
      };
      return iterator;
    }
    [(_a = Symbol.toStringTag, Symbol.iterator)]() {
      return this.entries();
    }
    trimOld(newSize) {
      if (newSize >= this.size) {
        return;
      }
      if (newSize === 0) {
        this.clear();
        return;
      }
      let current = this._head;
      let currentSize = this.size;
      while (current && currentSize > newSize) {
        this._map.delete(current.key);
        current = current.next;
        currentSize--;
      }
      this._head = current;
      this._size = currentSize;
      if (current) {
        current.previous = undefined;
      }
      this._state++;
    }
    addItemFirst(item) {
      if (!this._head && !this._tail) {
        this._tail = item;
      } else if (!this._head) {
        throw new Error("Invalid list");
      } else {
        item.next = this._head;
        this._head.previous = item;
      }
      this._head = item;
      this._state++;
    }
    addItemLast(item) {
      if (!this._head && !this._tail) {
        this._head = item;
      } else if (!this._tail) {
        throw new Error("Invalid list");
      } else {
        item.previous = this._tail;
        this._tail.next = item;
      }
      this._tail = item;
      this._state++;
    }
    removeItem(item) {
      if (item === this._head && item === this._tail) {
        this._head = undefined;
        this._tail = undefined;
      } else if (item === this._head) {
        if (!item.next) {
          throw new Error("Invalid list");
        }
        item.next.previous = undefined;
        this._head = item.next;
      } else if (item === this._tail) {
        if (!item.previous) {
          throw new Error("Invalid list");
        }
        item.previous.next = undefined;
        this._tail = item.previous;
      } else {
        const next = item.next;
        const previous = item.previous;
        if (!next || !previous) {
          throw new Error("Invalid list");
        }
        next.previous = previous;
        previous.next = next;
      }
      item.next = undefined;
      item.previous = undefined;
      this._state++;
    }
    touch(item, touch) {
      if (!this._head || !this._tail) {
        throw new Error("Invalid list");
      }
      if (touch !== Touch.First && touch !== Touch.Last) {
        return;
      }
      if (touch === Touch.First) {
        if (item === this._head) {
          return;
        }
        const next = item.next;
        const previous = item.previous;
        if (item === this._tail) {
          previous.next = undefined;
          this._tail = previous;
        } else {
          next.previous = previous;
          previous.next = next;
        }
        item.previous = undefined;
        item.next = this._head;
        this._head.previous = item;
        this._head = item;
        this._state++;
      } else if (touch === Touch.Last) {
        if (item === this._tail) {
          return;
        }
        const next = item.next;
        const previous = item.previous;
        if (item === this._head) {
          next.previous = undefined;
          this._head = next;
        } else {
          next.previous = previous;
          previous.next = next;
        }
        item.next = undefined;
        item.previous = this._tail;
        this._tail.next = item;
        this._tail = item;
        this._state++;
      }
    }
    toJSON() {
      const data = [];
      this.forEach((value, key) => {
        data.push([key, value]);
      });
      return data;
    }
    fromJSON(data) {
      this.clear();
      for (const [key, value] of data) {
        this.set(key, value);
      }
    }
  }
  exports.LinkedMap = LinkedMap;

  class LRUCache extends LinkedMap {
    constructor(limit, ratio = 1) {
      super();
      this._limit = limit;
      this._ratio = Math.min(Math.max(0, ratio), 1);
    }
    get limit() {
      return this._limit;
    }
    set limit(limit) {
      this._limit = limit;
      this.checkTrim();
    }
    get ratio() {
      return this._ratio;
    }
    set ratio(ratio) {
      this._ratio = Math.min(Math.max(0, ratio), 1);
      this.checkTrim();
    }
    get(key, touch = Touch.AsNew) {
      return super.get(key, touch);
    }
    peek(key) {
      return super.get(key, Touch.None);
    }
    set(key, value) {
      super.set(key, value, Touch.Last);
      this.checkTrim();
      return this;
    }
    checkTrim() {
      if (this.size > this._limit) {
        this.trimOld(Math.round(this._limit * this._ratio));
      }
    }
  }
  exports.LRUCache = LRUCache;
});

// node_modules/vscode-jsonrpc/lib/common/disposable.js
var require_disposable = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Disposable = undefined;
  var Disposable;
  (function(Disposable2) {
    function create(func) {
      return {
        dispose: func
      };
    }
    Disposable2.create = create;
  })(Disposable || (exports.Disposable = Disposable = {}));
});

// node_modules/vscode-jsonrpc/lib/common/ral.js
var require_ral = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var _ral;
  function RAL() {
    if (_ral === undefined) {
      throw new Error(`No runtime abstraction layer installed`);
    }
    return _ral;
  }
  (function(RAL2) {
    function install(ral) {
      if (ral === undefined) {
        throw new Error(`No runtime abstraction layer provided`);
      }
      _ral = ral;
    }
    RAL2.install = install;
  })(RAL || (RAL = {}));
  exports.default = RAL;
});

// node_modules/vscode-jsonrpc/lib/common/events.js
var require_events = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Emitter = exports.Event = undefined;
  var ral_1 = require_ral();
  var Event;
  (function(Event2) {
    const _disposable = { dispose() {} };
    Event2.None = function() {
      return _disposable;
    };
  })(Event || (exports.Event = Event = {}));

  class CallbackList {
    add(callback, context = null, bucket) {
      if (!this._callbacks) {
        this._callbacks = [];
        this._contexts = [];
      }
      this._callbacks.push(callback);
      this._contexts.push(context);
      if (Array.isArray(bucket)) {
        bucket.push({ dispose: () => this.remove(callback, context) });
      }
    }
    remove(callback, context = null) {
      if (!this._callbacks) {
        return;
      }
      let foundCallbackWithDifferentContext = false;
      for (let i = 0, len = this._callbacks.length;i < len; i++) {
        if (this._callbacks[i] === callback) {
          if (this._contexts[i] === context) {
            this._callbacks.splice(i, 1);
            this._contexts.splice(i, 1);
            return;
          } else {
            foundCallbackWithDifferentContext = true;
          }
        }
      }
      if (foundCallbackWithDifferentContext) {
        throw new Error("When adding a listener with a context, you should remove it with the same context");
      }
    }
    invoke(...args) {
      if (!this._callbacks) {
        return [];
      }
      const ret = [], callbacks = this._callbacks.slice(0), contexts = this._contexts.slice(0);
      for (let i = 0, len = callbacks.length;i < len; i++) {
        try {
          ret.push(callbacks[i].apply(contexts[i], args));
        } catch (e) {
          (0, ral_1.default)().console.error(e);
        }
      }
      return ret;
    }
    isEmpty() {
      return !this._callbacks || this._callbacks.length === 0;
    }
    dispose() {
      this._callbacks = undefined;
      this._contexts = undefined;
    }
  }

  class Emitter {
    constructor(_options) {
      this._options = _options;
    }
    get event() {
      if (!this._event) {
        this._event = (listener, thisArgs, disposables) => {
          if (!this._callbacks) {
            this._callbacks = new CallbackList;
          }
          if (this._options && this._options.onFirstListenerAdd && this._callbacks.isEmpty()) {
            this._options.onFirstListenerAdd(this);
          }
          this._callbacks.add(listener, thisArgs);
          const result = {
            dispose: () => {
              if (!this._callbacks) {
                return;
              }
              this._callbacks.remove(listener, thisArgs);
              result.dispose = Emitter._noop;
              if (this._options && this._options.onLastListenerRemove && this._callbacks.isEmpty()) {
                this._options.onLastListenerRemove(this);
              }
            }
          };
          if (Array.isArray(disposables)) {
            disposables.push(result);
          }
          return result;
        };
      }
      return this._event;
    }
    fire(event) {
      if (this._callbacks) {
        this._callbacks.invoke.call(this._callbacks, event);
      }
    }
    dispose() {
      if (this._callbacks) {
        this._callbacks.dispose();
        this._callbacks = undefined;
      }
    }
  }
  exports.Emitter = Emitter;
  Emitter._noop = function() {};
});

// node_modules/vscode-jsonrpc/lib/common/cancellation.js
var require_cancellation = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.CancellationTokenSource = exports.CancellationToken = undefined;
  var ral_1 = require_ral();
  var Is = require_is2();
  var events_1 = require_events();
  var CancellationToken;
  (function(CancellationToken2) {
    CancellationToken2.None = Object.freeze({
      isCancellationRequested: false,
      onCancellationRequested: events_1.Event.None
    });
    CancellationToken2.Cancelled = Object.freeze({
      isCancellationRequested: true,
      onCancellationRequested: events_1.Event.None
    });
    function is(value) {
      const candidate = value;
      return candidate && (candidate === CancellationToken2.None || candidate === CancellationToken2.Cancelled || Is.boolean(candidate.isCancellationRequested) && !!candidate.onCancellationRequested);
    }
    CancellationToken2.is = is;
  })(CancellationToken || (exports.CancellationToken = CancellationToken = {}));
  var shortcutEvent = Object.freeze(function(callback, context) {
    const handle = (0, ral_1.default)().timer.setTimeout(callback.bind(context), 0);
    return { dispose() {
      handle.dispose();
    } };
  });

  class MutableToken {
    constructor() {
      this._isCancelled = false;
    }
    cancel() {
      if (!this._isCancelled) {
        this._isCancelled = true;
        if (this._emitter) {
          this._emitter.fire(undefined);
          this.dispose();
        }
      }
    }
    get isCancellationRequested() {
      return this._isCancelled;
    }
    get onCancellationRequested() {
      if (this._isCancelled) {
        return shortcutEvent;
      }
      if (!this._emitter) {
        this._emitter = new events_1.Emitter;
      }
      return this._emitter.event;
    }
    dispose() {
      if (this._emitter) {
        this._emitter.dispose();
        this._emitter = undefined;
      }
    }
  }

  class CancellationTokenSource {
    get token() {
      if (!this._token) {
        this._token = new MutableToken;
      }
      return this._token;
    }
    cancel() {
      if (!this._token) {
        this._token = CancellationToken.Cancelled;
      } else {
        this._token.cancel();
      }
    }
    dispose() {
      if (!this._token) {
        this._token = CancellationToken.None;
      } else if (this._token instanceof MutableToken) {
        this._token.dispose();
      }
    }
  }
  exports.CancellationTokenSource = CancellationTokenSource;
});

// node_modules/vscode-jsonrpc/lib/common/sharedArrayCancellation.js
var require_sharedArrayCancellation = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.SharedArrayReceiverStrategy = exports.SharedArraySenderStrategy = undefined;
  var cancellation_1 = require_cancellation();
  var CancellationState;
  (function(CancellationState2) {
    CancellationState2.Continue = 0;
    CancellationState2.Cancelled = 1;
  })(CancellationState || (CancellationState = {}));

  class SharedArraySenderStrategy {
    constructor() {
      this.buffers = new Map;
    }
    enableCancellation(request) {
      if (request.id === null) {
        return;
      }
      const buffer = new SharedArrayBuffer(4);
      const data = new Int32Array(buffer, 0, 1);
      data[0] = CancellationState.Continue;
      this.buffers.set(request.id, buffer);
      request.$cancellationData = buffer;
    }
    async sendCancellation(_conn, id) {
      const buffer = this.buffers.get(id);
      if (buffer === undefined) {
        return;
      }
      const data = new Int32Array(buffer, 0, 1);
      Atomics.store(data, 0, CancellationState.Cancelled);
    }
    cleanup(id) {
      this.buffers.delete(id);
    }
    dispose() {
      this.buffers.clear();
    }
  }
  exports.SharedArraySenderStrategy = SharedArraySenderStrategy;

  class SharedArrayBufferCancellationToken {
    constructor(buffer) {
      this.data = new Int32Array(buffer, 0, 1);
    }
    get isCancellationRequested() {
      return Atomics.load(this.data, 0) === CancellationState.Cancelled;
    }
    get onCancellationRequested() {
      throw new Error(`Cancellation over SharedArrayBuffer doesn't support cancellation events`);
    }
  }

  class SharedArrayBufferCancellationTokenSource {
    constructor(buffer) {
      this.token = new SharedArrayBufferCancellationToken(buffer);
    }
    cancel() {}
    dispose() {}
  }

  class SharedArrayReceiverStrategy {
    constructor() {
      this.kind = "request";
    }
    createCancellationTokenSource(request) {
      const buffer = request.$cancellationData;
      if (buffer === undefined) {
        return new cancellation_1.CancellationTokenSource;
      }
      return new SharedArrayBufferCancellationTokenSource(buffer);
    }
  }
  exports.SharedArrayReceiverStrategy = SharedArrayReceiverStrategy;
});

// node_modules/vscode-jsonrpc/lib/common/semaphore.js
var require_semaphore = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Semaphore = undefined;
  var ral_1 = require_ral();

  class Semaphore {
    constructor(capacity = 1) {
      if (capacity <= 0) {
        throw new Error("Capacity must be greater than 0");
      }
      this._capacity = capacity;
      this._active = 0;
      this._waiting = [];
    }
    lock(thunk) {
      return new Promise((resolve, reject) => {
        this._waiting.push({ thunk, resolve, reject });
        this.runNext();
      });
    }
    get active() {
      return this._active;
    }
    runNext() {
      if (this._waiting.length === 0 || this._active === this._capacity) {
        return;
      }
      (0, ral_1.default)().timer.setImmediate(() => this.doRunNext());
    }
    doRunNext() {
      if (this._waiting.length === 0 || this._active === this._capacity) {
        return;
      }
      const next = this._waiting.shift();
      this._active++;
      if (this._active > this._capacity) {
        throw new Error(`To many thunks active`);
      }
      try {
        const result = next.thunk();
        if (result instanceof Promise) {
          result.then((value) => {
            this._active--;
            next.resolve(value);
            this.runNext();
          }, (err) => {
            this._active--;
            next.reject(err);
            this.runNext();
          });
        } else {
          this._active--;
          next.resolve(result);
          this.runNext();
        }
      } catch (err) {
        this._active--;
        next.reject(err);
        this.runNext();
      }
    }
  }
  exports.Semaphore = Semaphore;
});

// node_modules/vscode-jsonrpc/lib/common/messageReader.js
var require_messageReader = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ReadableStreamMessageReader = exports.AbstractMessageReader = exports.MessageReader = undefined;
  var ral_1 = require_ral();
  var Is = require_is2();
  var events_1 = require_events();
  var semaphore_1 = require_semaphore();
  var MessageReader;
  (function(MessageReader2) {
    function is(value) {
      let candidate = value;
      return candidate && Is.func(candidate.listen) && Is.func(candidate.dispose) && Is.func(candidate.onError) && Is.func(candidate.onClose) && Is.func(candidate.onPartialMessage);
    }
    MessageReader2.is = is;
  })(MessageReader || (exports.MessageReader = MessageReader = {}));

  class AbstractMessageReader {
    constructor() {
      this.errorEmitter = new events_1.Emitter;
      this.closeEmitter = new events_1.Emitter;
      this.partialMessageEmitter = new events_1.Emitter;
    }
    dispose() {
      this.errorEmitter.dispose();
      this.closeEmitter.dispose();
    }
    get onError() {
      return this.errorEmitter.event;
    }
    fireError(error) {
      this.errorEmitter.fire(this.asError(error));
    }
    get onClose() {
      return this.closeEmitter.event;
    }
    fireClose() {
      this.closeEmitter.fire(undefined);
    }
    get onPartialMessage() {
      return this.partialMessageEmitter.event;
    }
    firePartialMessage(info) {
      this.partialMessageEmitter.fire(info);
    }
    asError(error) {
      if (error instanceof Error) {
        return error;
      } else {
        return new Error(`Reader received error. Reason: ${Is.string(error.message) ? error.message : "unknown"}`);
      }
    }
  }
  exports.AbstractMessageReader = AbstractMessageReader;
  var ResolvedMessageReaderOptions;
  (function(ResolvedMessageReaderOptions2) {
    function fromOptions(options) {
      let charset;
      let result;
      let contentDecoder;
      const contentDecoders = new Map;
      let contentTypeDecoder;
      const contentTypeDecoders = new Map;
      if (options === undefined || typeof options === "string") {
        charset = options ?? "utf-8";
      } else {
        charset = options.charset ?? "utf-8";
        if (options.contentDecoder !== undefined) {
          contentDecoder = options.contentDecoder;
          contentDecoders.set(contentDecoder.name, contentDecoder);
        }
        if (options.contentDecoders !== undefined) {
          for (const decoder of options.contentDecoders) {
            contentDecoders.set(decoder.name, decoder);
          }
        }
        if (options.contentTypeDecoder !== undefined) {
          contentTypeDecoder = options.contentTypeDecoder;
          contentTypeDecoders.set(contentTypeDecoder.name, contentTypeDecoder);
        }
        if (options.contentTypeDecoders !== undefined) {
          for (const decoder of options.contentTypeDecoders) {
            contentTypeDecoders.set(decoder.name, decoder);
          }
        }
      }
      if (contentTypeDecoder === undefined) {
        contentTypeDecoder = (0, ral_1.default)().applicationJson.decoder;
        contentTypeDecoders.set(contentTypeDecoder.name, contentTypeDecoder);
      }
      return { charset, contentDecoder, contentDecoders, contentTypeDecoder, contentTypeDecoders };
    }
    ResolvedMessageReaderOptions2.fromOptions = fromOptions;
  })(ResolvedMessageReaderOptions || (ResolvedMessageReaderOptions = {}));

  class ReadableStreamMessageReader extends AbstractMessageReader {
    constructor(readable, options) {
      super();
      this.readable = readable;
      this.options = ResolvedMessageReaderOptions.fromOptions(options);
      this.buffer = (0, ral_1.default)().messageBuffer.create(this.options.charset);
      this._partialMessageTimeout = 1e4;
      this.nextMessageLength = -1;
      this.messageToken = 0;
      this.readSemaphore = new semaphore_1.Semaphore(1);
    }
    set partialMessageTimeout(timeout) {
      this._partialMessageTimeout = timeout;
    }
    get partialMessageTimeout() {
      return this._partialMessageTimeout;
    }
    listen(callback) {
      this.nextMessageLength = -1;
      this.messageToken = 0;
      this.partialMessageTimer = undefined;
      this.callback = callback;
      const result = this.readable.onData((data) => {
        this.onData(data);
      });
      this.readable.onError((error) => this.fireError(error));
      this.readable.onClose(() => this.fireClose());
      return result;
    }
    onData(data) {
      try {
        this.buffer.append(data);
        while (true) {
          if (this.nextMessageLength === -1) {
            const headers = this.buffer.tryReadHeaders(true);
            if (!headers) {
              return;
            }
            const contentLength = headers.get("content-length");
            if (!contentLength) {
              this.fireError(new Error(`Header must provide a Content-Length property.
${JSON.stringify(Object.fromEntries(headers))}`));
              return;
            }
            const length = parseInt(contentLength);
            if (isNaN(length)) {
              this.fireError(new Error(`Content-Length value must be a number. Got ${contentLength}`));
              return;
            }
            this.nextMessageLength = length;
          }
          const body = this.buffer.tryReadBody(this.nextMessageLength);
          if (body === undefined) {
            this.setPartialMessageTimer();
            return;
          }
          this.clearPartialMessageTimer();
          this.nextMessageLength = -1;
          this.readSemaphore.lock(async () => {
            const bytes = this.options.contentDecoder !== undefined ? await this.options.contentDecoder.decode(body) : body;
            const message = await this.options.contentTypeDecoder.decode(bytes, this.options);
            this.callback(message);
          }).catch((error) => {
            this.fireError(error);
          });
        }
      } catch (error) {
        this.fireError(error);
      }
    }
    clearPartialMessageTimer() {
      if (this.partialMessageTimer) {
        this.partialMessageTimer.dispose();
        this.partialMessageTimer = undefined;
      }
    }
    setPartialMessageTimer() {
      this.clearPartialMessageTimer();
      if (this._partialMessageTimeout <= 0) {
        return;
      }
      this.partialMessageTimer = (0, ral_1.default)().timer.setTimeout((token, timeout) => {
        this.partialMessageTimer = undefined;
        if (token === this.messageToken) {
          this.firePartialMessage({ messageToken: token, waitingTime: timeout });
          this.setPartialMessageTimer();
        }
      }, this._partialMessageTimeout, this.messageToken, this._partialMessageTimeout);
    }
  }
  exports.ReadableStreamMessageReader = ReadableStreamMessageReader;
});

// node_modules/vscode-jsonrpc/lib/common/messageWriter.js
var require_messageWriter = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.WriteableStreamMessageWriter = exports.AbstractMessageWriter = exports.MessageWriter = undefined;
  var ral_1 = require_ral();
  var Is = require_is2();
  var semaphore_1 = require_semaphore();
  var events_1 = require_events();
  var ContentLength = "Content-Length: ";
  var CRLF = `\r
`;
  var MessageWriter;
  (function(MessageWriter2) {
    function is(value) {
      let candidate = value;
      return candidate && Is.func(candidate.dispose) && Is.func(candidate.onClose) && Is.func(candidate.onError) && Is.func(candidate.write);
    }
    MessageWriter2.is = is;
  })(MessageWriter || (exports.MessageWriter = MessageWriter = {}));

  class AbstractMessageWriter {
    constructor() {
      this.errorEmitter = new events_1.Emitter;
      this.closeEmitter = new events_1.Emitter;
    }
    dispose() {
      this.errorEmitter.dispose();
      this.closeEmitter.dispose();
    }
    get onError() {
      return this.errorEmitter.event;
    }
    fireError(error, message, count) {
      this.errorEmitter.fire([this.asError(error), message, count]);
    }
    get onClose() {
      return this.closeEmitter.event;
    }
    fireClose() {
      this.closeEmitter.fire(undefined);
    }
    asError(error) {
      if (error instanceof Error) {
        return error;
      } else {
        return new Error(`Writer received error. Reason: ${Is.string(error.message) ? error.message : "unknown"}`);
      }
    }
  }
  exports.AbstractMessageWriter = AbstractMessageWriter;
  var ResolvedMessageWriterOptions;
  (function(ResolvedMessageWriterOptions2) {
    function fromOptions(options) {
      if (options === undefined || typeof options === "string") {
        return { charset: options ?? "utf-8", contentTypeEncoder: (0, ral_1.default)().applicationJson.encoder };
      } else {
        return { charset: options.charset ?? "utf-8", contentEncoder: options.contentEncoder, contentTypeEncoder: options.contentTypeEncoder ?? (0, ral_1.default)().applicationJson.encoder };
      }
    }
    ResolvedMessageWriterOptions2.fromOptions = fromOptions;
  })(ResolvedMessageWriterOptions || (ResolvedMessageWriterOptions = {}));

  class WriteableStreamMessageWriter extends AbstractMessageWriter {
    constructor(writable, options) {
      super();
      this.writable = writable;
      this.options = ResolvedMessageWriterOptions.fromOptions(options);
      this.errorCount = 0;
      this.writeSemaphore = new semaphore_1.Semaphore(1);
      this.writable.onError((error) => this.fireError(error));
      this.writable.onClose(() => this.fireClose());
    }
    async write(msg) {
      return this.writeSemaphore.lock(async () => {
        const payload = this.options.contentTypeEncoder.encode(msg, this.options).then((buffer) => {
          if (this.options.contentEncoder !== undefined) {
            return this.options.contentEncoder.encode(buffer);
          } else {
            return buffer;
          }
        });
        return payload.then((buffer) => {
          const headers = [];
          headers.push(ContentLength, buffer.byteLength.toString(), CRLF);
          headers.push(CRLF);
          return this.doWrite(msg, headers, buffer);
        }, (error) => {
          this.fireError(error);
          throw error;
        });
      });
    }
    async doWrite(msg, headers, data) {
      try {
        await this.writable.write(headers.join(""), "ascii");
        return this.writable.write(data);
      } catch (error) {
        this.handleError(error, msg);
        return Promise.reject(error);
      }
    }
    handleError(error, msg) {
      this.errorCount++;
      this.fireError(error, msg, this.errorCount);
    }
    end() {
      this.writable.end();
    }
  }
  exports.WriteableStreamMessageWriter = WriteableStreamMessageWriter;
});

// node_modules/vscode-jsonrpc/lib/common/messageBuffer.js
var require_messageBuffer = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.AbstractMessageBuffer = undefined;
  var CR = 13;
  var LF = 10;
  var CRLF = `\r
`;

  class AbstractMessageBuffer {
    constructor(encoding = "utf-8") {
      this._encoding = encoding;
      this._chunks = [];
      this._totalLength = 0;
    }
    get encoding() {
      return this._encoding;
    }
    append(chunk) {
      const toAppend = typeof chunk === "string" ? this.fromString(chunk, this._encoding) : chunk;
      this._chunks.push(toAppend);
      this._totalLength += toAppend.byteLength;
    }
    tryReadHeaders(lowerCaseKeys = false) {
      if (this._chunks.length === 0) {
        return;
      }
      let state = 0;
      let chunkIndex = 0;
      let offset = 0;
      let chunkBytesRead = 0;
      row:
        while (chunkIndex < this._chunks.length) {
          const chunk = this._chunks[chunkIndex];
          offset = 0;
          column:
            while (offset < chunk.length) {
              const value = chunk[offset];
              switch (value) {
                case CR:
                  switch (state) {
                    case 0:
                      state = 1;
                      break;
                    case 2:
                      state = 3;
                      break;
                    default:
                      state = 0;
                  }
                  break;
                case LF:
                  switch (state) {
                    case 1:
                      state = 2;
                      break;
                    case 3:
                      state = 4;
                      offset++;
                      break row;
                    default:
                      state = 0;
                  }
                  break;
                default:
                  state = 0;
              }
              offset++;
            }
          chunkBytesRead += chunk.byteLength;
          chunkIndex++;
        }
      if (state !== 4) {
        return;
      }
      const buffer = this._read(chunkBytesRead + offset);
      const result = new Map;
      const headers = this.toString(buffer, "ascii").split(CRLF);
      if (headers.length < 2) {
        return result;
      }
      for (let i = 0;i < headers.length - 2; i++) {
        const header = headers[i];
        const index = header.indexOf(":");
        if (index === -1) {
          throw new Error(`Message header must separate key and value using ':'
${header}`);
        }
        const key = header.substr(0, index);
        const value = header.substr(index + 1).trim();
        result.set(lowerCaseKeys ? key.toLowerCase() : key, value);
      }
      return result;
    }
    tryReadBody(length) {
      if (this._totalLength < length) {
        return;
      }
      return this._read(length);
    }
    get numberOfBytes() {
      return this._totalLength;
    }
    _read(byteCount) {
      if (byteCount === 0) {
        return this.emptyBuffer();
      }
      if (byteCount > this._totalLength) {
        throw new Error(`Cannot read so many bytes!`);
      }
      if (this._chunks[0].byteLength === byteCount) {
        const chunk = this._chunks[0];
        this._chunks.shift();
        this._totalLength -= byteCount;
        return this.asNative(chunk);
      }
      if (this._chunks[0].byteLength > byteCount) {
        const chunk = this._chunks[0];
        const result2 = this.asNative(chunk, byteCount);
        this._chunks[0] = chunk.slice(byteCount);
        this._totalLength -= byteCount;
        return result2;
      }
      const result = this.allocNative(byteCount);
      let resultOffset = 0;
      let chunkIndex = 0;
      while (byteCount > 0) {
        const chunk = this._chunks[chunkIndex];
        if (chunk.byteLength > byteCount) {
          const chunkPart = chunk.slice(0, byteCount);
          result.set(chunkPart, resultOffset);
          resultOffset += byteCount;
          this._chunks[chunkIndex] = chunk.slice(byteCount);
          this._totalLength -= byteCount;
          byteCount -= byteCount;
        } else {
          result.set(chunk, resultOffset);
          resultOffset += chunk.byteLength;
          this._chunks.shift();
          this._totalLength -= chunk.byteLength;
          byteCount -= chunk.byteLength;
        }
      }
      return result;
    }
  }
  exports.AbstractMessageBuffer = AbstractMessageBuffer;
});

// node_modules/vscode-jsonrpc/lib/common/connection.js
var require_connection = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.createMessageConnection = exports.ConnectionOptions = exports.MessageStrategy = exports.CancellationStrategy = exports.CancellationSenderStrategy = exports.CancellationReceiverStrategy = exports.RequestCancellationReceiverStrategy = exports.IdCancellationReceiverStrategy = exports.ConnectionStrategy = exports.ConnectionError = exports.ConnectionErrors = exports.LogTraceNotification = exports.SetTraceNotification = exports.TraceFormat = exports.TraceValues = exports.Trace = exports.NullLogger = exports.ProgressType = exports.ProgressToken = undefined;
  var ral_1 = require_ral();
  var Is = require_is2();
  var messages_1 = require_messages();
  var linkedMap_1 = require_linkedMap();
  var events_1 = require_events();
  var cancellation_1 = require_cancellation();
  var CancelNotification;
  (function(CancelNotification2) {
    CancelNotification2.type = new messages_1.NotificationType("$/cancelRequest");
  })(CancelNotification || (CancelNotification = {}));
  var ProgressToken;
  (function(ProgressToken2) {
    function is(value) {
      return typeof value === "string" || typeof value === "number";
    }
    ProgressToken2.is = is;
  })(ProgressToken || (exports.ProgressToken = ProgressToken = {}));
  var ProgressNotification;
  (function(ProgressNotification2) {
    ProgressNotification2.type = new messages_1.NotificationType("$/progress");
  })(ProgressNotification || (ProgressNotification = {}));

  class ProgressType {
    constructor() {}
  }
  exports.ProgressType = ProgressType;
  var StarRequestHandler;
  (function(StarRequestHandler2) {
    function is(value) {
      return Is.func(value);
    }
    StarRequestHandler2.is = is;
  })(StarRequestHandler || (StarRequestHandler = {}));
  exports.NullLogger = Object.freeze({
    error: () => {},
    warn: () => {},
    info: () => {},
    log: () => {}
  });
  var Trace;
  (function(Trace2) {
    Trace2[Trace2["Off"] = 0] = "Off";
    Trace2[Trace2["Messages"] = 1] = "Messages";
    Trace2[Trace2["Compact"] = 2] = "Compact";
    Trace2[Trace2["Verbose"] = 3] = "Verbose";
  })(Trace || (exports.Trace = Trace = {}));
  var TraceValues;
  (function(TraceValues2) {
    TraceValues2.Off = "off";
    TraceValues2.Messages = "messages";
    TraceValues2.Compact = "compact";
    TraceValues2.Verbose = "verbose";
  })(TraceValues || (exports.TraceValues = TraceValues = {}));
  (function(Trace2) {
    function fromString(value) {
      if (!Is.string(value)) {
        return Trace2.Off;
      }
      value = value.toLowerCase();
      switch (value) {
        case "off":
          return Trace2.Off;
        case "messages":
          return Trace2.Messages;
        case "compact":
          return Trace2.Compact;
        case "verbose":
          return Trace2.Verbose;
        default:
          return Trace2.Off;
      }
    }
    Trace2.fromString = fromString;
    function toString(value) {
      switch (value) {
        case Trace2.Off:
          return "off";
        case Trace2.Messages:
          return "messages";
        case Trace2.Compact:
          return "compact";
        case Trace2.Verbose:
          return "verbose";
        default:
          return "off";
      }
    }
    Trace2.toString = toString;
  })(Trace || (exports.Trace = Trace = {}));
  var TraceFormat;
  (function(TraceFormat2) {
    TraceFormat2["Text"] = "text";
    TraceFormat2["JSON"] = "json";
  })(TraceFormat || (exports.TraceFormat = TraceFormat = {}));
  (function(TraceFormat2) {
    function fromString(value) {
      if (!Is.string(value)) {
        return TraceFormat2.Text;
      }
      value = value.toLowerCase();
      if (value === "json") {
        return TraceFormat2.JSON;
      } else {
        return TraceFormat2.Text;
      }
    }
    TraceFormat2.fromString = fromString;
  })(TraceFormat || (exports.TraceFormat = TraceFormat = {}));
  var SetTraceNotification;
  (function(SetTraceNotification2) {
    SetTraceNotification2.type = new messages_1.NotificationType("$/setTrace");
  })(SetTraceNotification || (exports.SetTraceNotification = SetTraceNotification = {}));
  var LogTraceNotification;
  (function(LogTraceNotification2) {
    LogTraceNotification2.type = new messages_1.NotificationType("$/logTrace");
  })(LogTraceNotification || (exports.LogTraceNotification = LogTraceNotification = {}));
  var ConnectionErrors;
  (function(ConnectionErrors2) {
    ConnectionErrors2[ConnectionErrors2["Closed"] = 1] = "Closed";
    ConnectionErrors2[ConnectionErrors2["Disposed"] = 2] = "Disposed";
    ConnectionErrors2[ConnectionErrors2["AlreadyListening"] = 3] = "AlreadyListening";
  })(ConnectionErrors || (exports.ConnectionErrors = ConnectionErrors = {}));

  class ConnectionError extends Error {
    constructor(code, message) {
      super(message);
      this.code = code;
      Object.setPrototypeOf(this, ConnectionError.prototype);
    }
  }
  exports.ConnectionError = ConnectionError;
  var ConnectionStrategy;
  (function(ConnectionStrategy2) {
    function is(value) {
      const candidate = value;
      return candidate && Is.func(candidate.cancelUndispatched);
    }
    ConnectionStrategy2.is = is;
  })(ConnectionStrategy || (exports.ConnectionStrategy = ConnectionStrategy = {}));
  var IdCancellationReceiverStrategy;
  (function(IdCancellationReceiverStrategy2) {
    function is(value) {
      const candidate = value;
      return candidate && (candidate.kind === undefined || candidate.kind === "id") && Is.func(candidate.createCancellationTokenSource) && (candidate.dispose === undefined || Is.func(candidate.dispose));
    }
    IdCancellationReceiverStrategy2.is = is;
  })(IdCancellationReceiverStrategy || (exports.IdCancellationReceiverStrategy = IdCancellationReceiverStrategy = {}));
  var RequestCancellationReceiverStrategy;
  (function(RequestCancellationReceiverStrategy2) {
    function is(value) {
      const candidate = value;
      return candidate && candidate.kind === "request" && Is.func(candidate.createCancellationTokenSource) && (candidate.dispose === undefined || Is.func(candidate.dispose));
    }
    RequestCancellationReceiverStrategy2.is = is;
  })(RequestCancellationReceiverStrategy || (exports.RequestCancellationReceiverStrategy = RequestCancellationReceiverStrategy = {}));
  var CancellationReceiverStrategy;
  (function(CancellationReceiverStrategy2) {
    CancellationReceiverStrategy2.Message = Object.freeze({
      createCancellationTokenSource(_) {
        return new cancellation_1.CancellationTokenSource;
      }
    });
    function is(value) {
      return IdCancellationReceiverStrategy.is(value) || RequestCancellationReceiverStrategy.is(value);
    }
    CancellationReceiverStrategy2.is = is;
  })(CancellationReceiverStrategy || (exports.CancellationReceiverStrategy = CancellationReceiverStrategy = {}));
  var CancellationSenderStrategy;
  (function(CancellationSenderStrategy2) {
    CancellationSenderStrategy2.Message = Object.freeze({
      sendCancellation(conn, id) {
        return conn.sendNotification(CancelNotification.type, { id });
      },
      cleanup(_) {}
    });
    function is(value) {
      const candidate = value;
      return candidate && Is.func(candidate.sendCancellation) && Is.func(candidate.cleanup);
    }
    CancellationSenderStrategy2.is = is;
  })(CancellationSenderStrategy || (exports.CancellationSenderStrategy = CancellationSenderStrategy = {}));
  var CancellationStrategy;
  (function(CancellationStrategy2) {
    CancellationStrategy2.Message = Object.freeze({
      receiver: CancellationReceiverStrategy.Message,
      sender: CancellationSenderStrategy.Message
    });
    function is(value) {
      const candidate = value;
      return candidate && CancellationReceiverStrategy.is(candidate.receiver) && CancellationSenderStrategy.is(candidate.sender);
    }
    CancellationStrategy2.is = is;
  })(CancellationStrategy || (exports.CancellationStrategy = CancellationStrategy = {}));
  var MessageStrategy;
  (function(MessageStrategy2) {
    function is(value) {
      const candidate = value;
      return candidate && Is.func(candidate.handleMessage);
    }
    MessageStrategy2.is = is;
  })(MessageStrategy || (exports.MessageStrategy = MessageStrategy = {}));
  var ConnectionOptions;
  (function(ConnectionOptions2) {
    function is(value) {
      const candidate = value;
      return candidate && (CancellationStrategy.is(candidate.cancellationStrategy) || ConnectionStrategy.is(candidate.connectionStrategy) || MessageStrategy.is(candidate.messageStrategy));
    }
    ConnectionOptions2.is = is;
  })(ConnectionOptions || (exports.ConnectionOptions = ConnectionOptions = {}));
  var ConnectionState;
  (function(ConnectionState2) {
    ConnectionState2[ConnectionState2["New"] = 1] = "New";
    ConnectionState2[ConnectionState2["Listening"] = 2] = "Listening";
    ConnectionState2[ConnectionState2["Closed"] = 3] = "Closed";
    ConnectionState2[ConnectionState2["Disposed"] = 4] = "Disposed";
  })(ConnectionState || (ConnectionState = {}));
  function createMessageConnection(messageReader, messageWriter, _logger, options) {
    const logger = _logger !== undefined ? _logger : exports.NullLogger;
    let sequenceNumber = 0;
    let notificationSequenceNumber = 0;
    let unknownResponseSequenceNumber = 0;
    const version = "2.0";
    let starRequestHandler = undefined;
    const requestHandlers = new Map;
    let starNotificationHandler = undefined;
    const notificationHandlers = new Map;
    const progressHandlers = new Map;
    let timer;
    let messageQueue = new linkedMap_1.LinkedMap;
    let responsePromises = new Map;
    let knownCanceledRequests = new Set;
    let requestTokens = new Map;
    let trace = Trace.Off;
    let traceFormat = TraceFormat.Text;
    let tracer;
    let state = ConnectionState.New;
    const errorEmitter = new events_1.Emitter;
    const closeEmitter = new events_1.Emitter;
    const unhandledNotificationEmitter = new events_1.Emitter;
    const unhandledProgressEmitter = new events_1.Emitter;
    const disposeEmitter = new events_1.Emitter;
    const cancellationStrategy = options && options.cancellationStrategy ? options.cancellationStrategy : CancellationStrategy.Message;
    function createRequestQueueKey(id) {
      if (id === null) {
        throw new Error(`Can't send requests with id null since the response can't be correlated.`);
      }
      return "req-" + id.toString();
    }
    function createResponseQueueKey(id) {
      if (id === null) {
        return "res-unknown-" + (++unknownResponseSequenceNumber).toString();
      } else {
        return "res-" + id.toString();
      }
    }
    function createNotificationQueueKey() {
      return "not-" + (++notificationSequenceNumber).toString();
    }
    function addMessageToQueue(queue, message) {
      if (messages_1.Message.isRequest(message)) {
        queue.set(createRequestQueueKey(message.id), message);
      } else if (messages_1.Message.isResponse(message)) {
        queue.set(createResponseQueueKey(message.id), message);
      } else {
        queue.set(createNotificationQueueKey(), message);
      }
    }
    function cancelUndispatched(_message) {
      return;
    }
    function isListening() {
      return state === ConnectionState.Listening;
    }
    function isClosed() {
      return state === ConnectionState.Closed;
    }
    function isDisposed() {
      return state === ConnectionState.Disposed;
    }
    function closeHandler() {
      if (state === ConnectionState.New || state === ConnectionState.Listening) {
        state = ConnectionState.Closed;
        closeEmitter.fire(undefined);
      }
    }
    function readErrorHandler(error) {
      errorEmitter.fire([error, undefined, undefined]);
    }
    function writeErrorHandler(data) {
      errorEmitter.fire(data);
    }
    messageReader.onClose(closeHandler);
    messageReader.onError(readErrorHandler);
    messageWriter.onClose(closeHandler);
    messageWriter.onError(writeErrorHandler);
    function triggerMessageQueue() {
      if (timer || messageQueue.size === 0) {
        return;
      }
      timer = (0, ral_1.default)().timer.setImmediate(() => {
        timer = undefined;
        processMessageQueue();
      });
    }
    function handleMessage(message) {
      if (messages_1.Message.isRequest(message)) {
        handleRequest(message);
      } else if (messages_1.Message.isNotification(message)) {
        handleNotification(message);
      } else if (messages_1.Message.isResponse(message)) {
        handleResponse(message);
      } else {
        handleInvalidMessage(message);
      }
    }
    function processMessageQueue() {
      if (messageQueue.size === 0) {
        return;
      }
      const message = messageQueue.shift();
      try {
        const messageStrategy = options?.messageStrategy;
        if (MessageStrategy.is(messageStrategy)) {
          messageStrategy.handleMessage(message, handleMessage);
        } else {
          handleMessage(message);
        }
      } finally {
        triggerMessageQueue();
      }
    }
    const callback = (message) => {
      try {
        if (messages_1.Message.isNotification(message) && message.method === CancelNotification.type.method) {
          const cancelId = message.params.id;
          const key = createRequestQueueKey(cancelId);
          const toCancel = messageQueue.get(key);
          if (messages_1.Message.isRequest(toCancel)) {
            const strategy = options?.connectionStrategy;
            const response = strategy && strategy.cancelUndispatched ? strategy.cancelUndispatched(toCancel, cancelUndispatched) : cancelUndispatched(toCancel);
            if (response && (response.error !== undefined || response.result !== undefined)) {
              messageQueue.delete(key);
              requestTokens.delete(cancelId);
              response.id = toCancel.id;
              traceSendingResponse(response, message.method, Date.now());
              messageWriter.write(response).catch(() => logger.error(`Sending response for canceled message failed.`));
              return;
            }
          }
          const cancellationToken = requestTokens.get(cancelId);
          if (cancellationToken !== undefined) {
            cancellationToken.cancel();
            traceReceivedNotification(message);
            return;
          } else {
            knownCanceledRequests.add(cancelId);
          }
        }
        addMessageToQueue(messageQueue, message);
      } finally {
        triggerMessageQueue();
      }
    };
    function handleRequest(requestMessage) {
      if (isDisposed()) {
        return;
      }
      function reply(resultOrError, method, startTime2) {
        const message = {
          jsonrpc: version,
          id: requestMessage.id
        };
        if (resultOrError instanceof messages_1.ResponseError) {
          message.error = resultOrError.toJson();
        } else {
          message.result = resultOrError === undefined ? null : resultOrError;
        }
        traceSendingResponse(message, method, startTime2);
        messageWriter.write(message).catch(() => logger.error(`Sending response failed.`));
      }
      function replyError(error, method, startTime2) {
        const message = {
          jsonrpc: version,
          id: requestMessage.id,
          error: error.toJson()
        };
        traceSendingResponse(message, method, startTime2);
        messageWriter.write(message).catch(() => logger.error(`Sending response failed.`));
      }
      function replySuccess(result, method, startTime2) {
        if (result === undefined) {
          result = null;
        }
        const message = {
          jsonrpc: version,
          id: requestMessage.id,
          result
        };
        traceSendingResponse(message, method, startTime2);
        messageWriter.write(message).catch(() => logger.error(`Sending response failed.`));
      }
      traceReceivedRequest(requestMessage);
      const element = requestHandlers.get(requestMessage.method);
      let type;
      let requestHandler;
      if (element) {
        type = element.type;
        requestHandler = element.handler;
      }
      const startTime = Date.now();
      if (requestHandler || starRequestHandler) {
        const tokenKey = requestMessage.id ?? String(Date.now());
        const cancellationSource = IdCancellationReceiverStrategy.is(cancellationStrategy.receiver) ? cancellationStrategy.receiver.createCancellationTokenSource(tokenKey) : cancellationStrategy.receiver.createCancellationTokenSource(requestMessage);
        if (requestMessage.id !== null && knownCanceledRequests.has(requestMessage.id)) {
          cancellationSource.cancel();
        }
        if (requestMessage.id !== null) {
          requestTokens.set(tokenKey, cancellationSource);
        }
        try {
          let handlerResult;
          if (requestHandler) {
            if (requestMessage.params === undefined) {
              if (type !== undefined && type.numberOfParams !== 0) {
                replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines ${type.numberOfParams} params but received none.`), requestMessage.method, startTime);
                return;
              }
              handlerResult = requestHandler(cancellationSource.token);
            } else if (Array.isArray(requestMessage.params)) {
              if (type !== undefined && type.parameterStructures === messages_1.ParameterStructures.byName) {
                replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines parameters by name but received parameters by position`), requestMessage.method, startTime);
                return;
              }
              handlerResult = requestHandler(...requestMessage.params, cancellationSource.token);
            } else {
              if (type !== undefined && type.parameterStructures === messages_1.ParameterStructures.byPosition) {
                replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines parameters by position but received parameters by name`), requestMessage.method, startTime);
                return;
              }
              handlerResult = requestHandler(requestMessage.params, cancellationSource.token);
            }
          } else if (starRequestHandler) {
            handlerResult = starRequestHandler(requestMessage.method, requestMessage.params, cancellationSource.token);
          }
          const promise = handlerResult;
          if (!handlerResult) {
            requestTokens.delete(tokenKey);
            replySuccess(handlerResult, requestMessage.method, startTime);
          } else if (promise.then) {
            promise.then((resultOrError) => {
              requestTokens.delete(tokenKey);
              reply(resultOrError, requestMessage.method, startTime);
            }, (error) => {
              requestTokens.delete(tokenKey);
              if (error instanceof messages_1.ResponseError) {
                replyError(error, requestMessage.method, startTime);
              } else if (error && Is.string(error.message)) {
                replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error.message}`), requestMessage.method, startTime);
              } else {
                replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
              }
            });
          } else {
            requestTokens.delete(tokenKey);
            reply(handlerResult, requestMessage.method, startTime);
          }
        } catch (error) {
          requestTokens.delete(tokenKey);
          if (error instanceof messages_1.ResponseError) {
            reply(error, requestMessage.method, startTime);
          } else if (error && Is.string(error.message)) {
            replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error.message}`), requestMessage.method, startTime);
          } else {
            replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
          }
        }
      } else {
        replyError(new messages_1.ResponseError(messages_1.ErrorCodes.MethodNotFound, `Unhandled method ${requestMessage.method}`), requestMessage.method, startTime);
      }
    }
    function handleResponse(responseMessage) {
      if (isDisposed()) {
        return;
      }
      if (responseMessage.id === null) {
        if (responseMessage.error) {
          logger.error(`Received response message without id: Error is: 
${JSON.stringify(responseMessage.error, undefined, 4)}`);
        } else {
          logger.error(`Received response message without id. No further error information provided.`);
        }
      } else {
        const key = responseMessage.id;
        const responsePromise = responsePromises.get(key);
        traceReceivedResponse(responseMessage, responsePromise);
        if (responsePromise !== undefined) {
          responsePromises.delete(key);
          try {
            if (responseMessage.error) {
              const error = responseMessage.error;
              responsePromise.reject(new messages_1.ResponseError(error.code, error.message, error.data));
            } else if (responseMessage.result !== undefined) {
              responsePromise.resolve(responseMessage.result);
            } else {
              throw new Error("Should never happen.");
            }
          } catch (error) {
            if (error.message) {
              logger.error(`Response handler '${responsePromise.method}' failed with message: ${error.message}`);
            } else {
              logger.error(`Response handler '${responsePromise.method}' failed unexpectedly.`);
            }
          }
        }
      }
    }
    function handleNotification(message) {
      if (isDisposed()) {
        return;
      }
      let type = undefined;
      let notificationHandler;
      if (message.method === CancelNotification.type.method) {
        const cancelId = message.params.id;
        knownCanceledRequests.delete(cancelId);
        traceReceivedNotification(message);
        return;
      } else {
        const element = notificationHandlers.get(message.method);
        if (element) {
          notificationHandler = element.handler;
          type = element.type;
        }
      }
      if (notificationHandler || starNotificationHandler) {
        try {
          traceReceivedNotification(message);
          if (notificationHandler) {
            if (message.params === undefined) {
              if (type !== undefined) {
                if (type.numberOfParams !== 0 && type.parameterStructures !== messages_1.ParameterStructures.byName) {
                  logger.error(`Notification ${message.method} defines ${type.numberOfParams} params but received none.`);
                }
              }
              notificationHandler();
            } else if (Array.isArray(message.params)) {
              const params = message.params;
              if (message.method === ProgressNotification.type.method && params.length === 2 && ProgressToken.is(params[0])) {
                notificationHandler({ token: params[0], value: params[1] });
              } else {
                if (type !== undefined) {
                  if (type.parameterStructures === messages_1.ParameterStructures.byName) {
                    logger.error(`Notification ${message.method} defines parameters by name but received parameters by position`);
                  }
                  if (type.numberOfParams !== message.params.length) {
                    logger.error(`Notification ${message.method} defines ${type.numberOfParams} params but received ${params.length} arguments`);
                  }
                }
                notificationHandler(...params);
              }
            } else {
              if (type !== undefined && type.parameterStructures === messages_1.ParameterStructures.byPosition) {
                logger.error(`Notification ${message.method} defines parameters by position but received parameters by name`);
              }
              notificationHandler(message.params);
            }
          } else if (starNotificationHandler) {
            starNotificationHandler(message.method, message.params);
          }
        } catch (error) {
          if (error.message) {
            logger.error(`Notification handler '${message.method}' failed with message: ${error.message}`);
          } else {
            logger.error(`Notification handler '${message.method}' failed unexpectedly.`);
          }
        }
      } else {
        unhandledNotificationEmitter.fire(message);
      }
    }
    function handleInvalidMessage(message) {
      if (!message) {
        logger.error("Received empty message.");
        return;
      }
      logger.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(message, null, 4)}`);
      const responseMessage = message;
      if (Is.string(responseMessage.id) || Is.number(responseMessage.id)) {
        const key = responseMessage.id;
        const responseHandler = responsePromises.get(key);
        if (responseHandler) {
          responseHandler.reject(new Error("The received response has neither a result nor an error property."));
        }
      }
    }
    function stringifyTrace(params) {
      if (params === undefined || params === null) {
        return;
      }
      switch (trace) {
        case Trace.Verbose:
          return JSON.stringify(params, null, 4);
        case Trace.Compact:
          return JSON.stringify(params);
        default:
          return;
      }
    }
    function traceSendingRequest(message) {
      if (trace === Trace.Off || !tracer) {
        return;
      }
      if (traceFormat === TraceFormat.Text) {
        let data = undefined;
        if ((trace === Trace.Verbose || trace === Trace.Compact) && message.params) {
          data = `Params: ${stringifyTrace(message.params)}

`;
        }
        tracer.log(`Sending request '${message.method} - (${message.id})'.`, data);
      } else {
        logLSPMessage("send-request", message);
      }
    }
    function traceSendingNotification(message) {
      if (trace === Trace.Off || !tracer) {
        return;
      }
      if (traceFormat === TraceFormat.Text) {
        let data = undefined;
        if (trace === Trace.Verbose || trace === Trace.Compact) {
          if (message.params) {
            data = `Params: ${stringifyTrace(message.params)}

`;
          } else {
            data = `No parameters provided.

`;
          }
        }
        tracer.log(`Sending notification '${message.method}'.`, data);
      } else {
        logLSPMessage("send-notification", message);
      }
    }
    function traceSendingResponse(message, method, startTime) {
      if (trace === Trace.Off || !tracer) {
        return;
      }
      if (traceFormat === TraceFormat.Text) {
        let data = undefined;
        if (trace === Trace.Verbose || trace === Trace.Compact) {
          if (message.error && message.error.data) {
            data = `Error data: ${stringifyTrace(message.error.data)}

`;
          } else {
            if (message.result) {
              data = `Result: ${stringifyTrace(message.result)}

`;
            } else if (message.error === undefined) {
              data = `No result returned.

`;
            }
          }
        }
        tracer.log(`Sending response '${method} - (${message.id})'. Processing request took ${Date.now() - startTime}ms`, data);
      } else {
        logLSPMessage("send-response", message);
      }
    }
    function traceReceivedRequest(message) {
      if (trace === Trace.Off || !tracer) {
        return;
      }
      if (traceFormat === TraceFormat.Text) {
        let data = undefined;
        if ((trace === Trace.Verbose || trace === Trace.Compact) && message.params) {
          data = `Params: ${stringifyTrace(message.params)}

`;
        }
        tracer.log(`Received request '${message.method} - (${message.id})'.`, data);
      } else {
        logLSPMessage("receive-request", message);
      }
    }
    function traceReceivedNotification(message) {
      if (trace === Trace.Off || !tracer || message.method === LogTraceNotification.type.method) {
        return;
      }
      if (traceFormat === TraceFormat.Text) {
        let data = undefined;
        if (trace === Trace.Verbose || trace === Trace.Compact) {
          if (message.params) {
            data = `Params: ${stringifyTrace(message.params)}

`;
          } else {
            data = `No parameters provided.

`;
          }
        }
        tracer.log(`Received notification '${message.method}'.`, data);
      } else {
        logLSPMessage("receive-notification", message);
      }
    }
    function traceReceivedResponse(message, responsePromise) {
      if (trace === Trace.Off || !tracer) {
        return;
      }
      if (traceFormat === TraceFormat.Text) {
        let data = undefined;
        if (trace === Trace.Verbose || trace === Trace.Compact) {
          if (message.error && message.error.data) {
            data = `Error data: ${stringifyTrace(message.error.data)}

`;
          } else {
            if (message.result) {
              data = `Result: ${stringifyTrace(message.result)}

`;
            } else if (message.error === undefined) {
              data = `No result returned.

`;
            }
          }
        }
        if (responsePromise) {
          const error = message.error ? ` Request failed: ${message.error.message} (${message.error.code}).` : "";
          tracer.log(`Received response '${responsePromise.method} - (${message.id})' in ${Date.now() - responsePromise.timerStart}ms.${error}`, data);
        } else {
          tracer.log(`Received response ${message.id} without active response promise.`, data);
        }
      } else {
        logLSPMessage("receive-response", message);
      }
    }
    function logLSPMessage(type, message) {
      if (!tracer || trace === Trace.Off) {
        return;
      }
      const lspMessage = {
        isLSPMessage: true,
        type,
        message,
        timestamp: Date.now()
      };
      tracer.log(lspMessage);
    }
    function throwIfClosedOrDisposed() {
      if (isClosed()) {
        throw new ConnectionError(ConnectionErrors.Closed, "Connection is closed.");
      }
      if (isDisposed()) {
        throw new ConnectionError(ConnectionErrors.Disposed, "Connection is disposed.");
      }
    }
    function throwIfListening() {
      if (isListening()) {
        throw new ConnectionError(ConnectionErrors.AlreadyListening, "Connection is already listening");
      }
    }
    function throwIfNotListening() {
      if (!isListening()) {
        throw new Error("Call listen() first.");
      }
    }
    function undefinedToNull(param) {
      if (param === undefined) {
        return null;
      } else {
        return param;
      }
    }
    function nullToUndefined(param) {
      if (param === null) {
        return;
      } else {
        return param;
      }
    }
    function isNamedParam(param) {
      return param !== undefined && param !== null && !Array.isArray(param) && typeof param === "object";
    }
    function computeSingleParam(parameterStructures, param) {
      switch (parameterStructures) {
        case messages_1.ParameterStructures.auto:
          if (isNamedParam(param)) {
            return nullToUndefined(param);
          } else {
            return [undefinedToNull(param)];
          }
        case messages_1.ParameterStructures.byName:
          if (!isNamedParam(param)) {
            throw new Error(`Received parameters by name but param is not an object literal.`);
          }
          return nullToUndefined(param);
        case messages_1.ParameterStructures.byPosition:
          return [undefinedToNull(param)];
        default:
          throw new Error(`Unknown parameter structure ${parameterStructures.toString()}`);
      }
    }
    function computeMessageParams(type, params) {
      let result;
      const numberOfParams = type.numberOfParams;
      switch (numberOfParams) {
        case 0:
          result = undefined;
          break;
        case 1:
          result = computeSingleParam(type.parameterStructures, params[0]);
          break;
        default:
          result = [];
          for (let i = 0;i < params.length && i < numberOfParams; i++) {
            result.push(undefinedToNull(params[i]));
          }
          if (params.length < numberOfParams) {
            for (let i = params.length;i < numberOfParams; i++) {
              result.push(null);
            }
          }
          break;
      }
      return result;
    }
    const connection = {
      sendNotification: (type, ...args) => {
        throwIfClosedOrDisposed();
        let method;
        let messageParams;
        if (Is.string(type)) {
          method = type;
          const first = args[0];
          let paramStart = 0;
          let parameterStructures = messages_1.ParameterStructures.auto;
          if (messages_1.ParameterStructures.is(first)) {
            paramStart = 1;
            parameterStructures = first;
          }
          let paramEnd = args.length;
          const numberOfParams = paramEnd - paramStart;
          switch (numberOfParams) {
            case 0:
              messageParams = undefined;
              break;
            case 1:
              messageParams = computeSingleParam(parameterStructures, args[paramStart]);
              break;
            default:
              if (parameterStructures === messages_1.ParameterStructures.byName) {
                throw new Error(`Received ${numberOfParams} parameters for 'by Name' notification parameter structure.`);
              }
              messageParams = args.slice(paramStart, paramEnd).map((value) => undefinedToNull(value));
              break;
          }
        } else {
          const params = args;
          method = type.method;
          messageParams = computeMessageParams(type, params);
        }
        const notificationMessage = {
          jsonrpc: version,
          method,
          params: messageParams
        };
        traceSendingNotification(notificationMessage);
        return messageWriter.write(notificationMessage).catch((error) => {
          logger.error(`Sending notification failed.`);
          throw error;
        });
      },
      onNotification: (type, handler) => {
        throwIfClosedOrDisposed();
        let method;
        if (Is.func(type)) {
          starNotificationHandler = type;
        } else if (handler) {
          if (Is.string(type)) {
            method = type;
            notificationHandlers.set(type, { type: undefined, handler });
          } else {
            method = type.method;
            notificationHandlers.set(type.method, { type, handler });
          }
        }
        return {
          dispose: () => {
            if (method !== undefined) {
              notificationHandlers.delete(method);
            } else {
              starNotificationHandler = undefined;
            }
          }
        };
      },
      onProgress: (_type, token, handler) => {
        if (progressHandlers.has(token)) {
          throw new Error(`Progress handler for token ${token} already registered`);
        }
        progressHandlers.set(token, handler);
        return {
          dispose: () => {
            progressHandlers.delete(token);
          }
        };
      },
      sendProgress: (_type, token, value) => {
        return connection.sendNotification(ProgressNotification.type, { token, value });
      },
      onUnhandledProgress: unhandledProgressEmitter.event,
      sendRequest: (type, ...args) => {
        throwIfClosedOrDisposed();
        throwIfNotListening();
        let method;
        let messageParams;
        let token = undefined;
        if (Is.string(type)) {
          method = type;
          const first = args[0];
          const last = args[args.length - 1];
          let paramStart = 0;
          let parameterStructures = messages_1.ParameterStructures.auto;
          if (messages_1.ParameterStructures.is(first)) {
            paramStart = 1;
            parameterStructures = first;
          }
          let paramEnd = args.length;
          if (cancellation_1.CancellationToken.is(last)) {
            paramEnd = paramEnd - 1;
            token = last;
          }
          const numberOfParams = paramEnd - paramStart;
          switch (numberOfParams) {
            case 0:
              messageParams = undefined;
              break;
            case 1:
              messageParams = computeSingleParam(parameterStructures, args[paramStart]);
              break;
            default:
              if (parameterStructures === messages_1.ParameterStructures.byName) {
                throw new Error(`Received ${numberOfParams} parameters for 'by Name' request parameter structure.`);
              }
              messageParams = args.slice(paramStart, paramEnd).map((value) => undefinedToNull(value));
              break;
          }
        } else {
          const params = args;
          method = type.method;
          messageParams = computeMessageParams(type, params);
          const numberOfParams = type.numberOfParams;
          token = cancellation_1.CancellationToken.is(params[numberOfParams]) ? params[numberOfParams] : undefined;
        }
        const id = sequenceNumber++;
        let disposable;
        if (token) {
          disposable = token.onCancellationRequested(() => {
            const p = cancellationStrategy.sender.sendCancellation(connection, id);
            if (p === undefined) {
              logger.log(`Received no promise from cancellation strategy when cancelling id ${id}`);
              return Promise.resolve();
            } else {
              return p.catch(() => {
                logger.log(`Sending cancellation messages for id ${id} failed`);
              });
            }
          });
        }
        const requestMessage = {
          jsonrpc: version,
          id,
          method,
          params: messageParams
        };
        traceSendingRequest(requestMessage);
        if (typeof cancellationStrategy.sender.enableCancellation === "function") {
          cancellationStrategy.sender.enableCancellation(requestMessage);
        }
        return new Promise(async (resolve, reject) => {
          const resolveWithCleanup = (r) => {
            resolve(r);
            cancellationStrategy.sender.cleanup(id);
            disposable?.dispose();
          };
          const rejectWithCleanup = (r) => {
            reject(r);
            cancellationStrategy.sender.cleanup(id);
            disposable?.dispose();
          };
          const responsePromise = { method, timerStart: Date.now(), resolve: resolveWithCleanup, reject: rejectWithCleanup };
          try {
            await messageWriter.write(requestMessage);
            responsePromises.set(id, responsePromise);
          } catch (error) {
            logger.error(`Sending request failed.`);
            responsePromise.reject(new messages_1.ResponseError(messages_1.ErrorCodes.MessageWriteError, error.message ? error.message : "Unknown reason"));
            throw error;
          }
        });
      },
      onRequest: (type, handler) => {
        throwIfClosedOrDisposed();
        let method = null;
        if (StarRequestHandler.is(type)) {
          method = undefined;
          starRequestHandler = type;
        } else if (Is.string(type)) {
          method = null;
          if (handler !== undefined) {
            method = type;
            requestHandlers.set(type, { handler, type: undefined });
          }
        } else {
          if (handler !== undefined) {
            method = type.method;
            requestHandlers.set(type.method, { type, handler });
          }
        }
        return {
          dispose: () => {
            if (method === null) {
              return;
            }
            if (method !== undefined) {
              requestHandlers.delete(method);
            } else {
              starRequestHandler = undefined;
            }
          }
        };
      },
      hasPendingResponse: () => {
        return responsePromises.size > 0;
      },
      trace: async (_value, _tracer, sendNotificationOrTraceOptions) => {
        let _sendNotification = false;
        let _traceFormat = TraceFormat.Text;
        if (sendNotificationOrTraceOptions !== undefined) {
          if (Is.boolean(sendNotificationOrTraceOptions)) {
            _sendNotification = sendNotificationOrTraceOptions;
          } else {
            _sendNotification = sendNotificationOrTraceOptions.sendNotification || false;
            _traceFormat = sendNotificationOrTraceOptions.traceFormat || TraceFormat.Text;
          }
        }
        trace = _value;
        traceFormat = _traceFormat;
        if (trace === Trace.Off) {
          tracer = undefined;
        } else {
          tracer = _tracer;
        }
        if (_sendNotification && !isClosed() && !isDisposed()) {
          await connection.sendNotification(SetTraceNotification.type, { value: Trace.toString(_value) });
        }
      },
      onError: errorEmitter.event,
      onClose: closeEmitter.event,
      onUnhandledNotification: unhandledNotificationEmitter.event,
      onDispose: disposeEmitter.event,
      end: () => {
        messageWriter.end();
      },
      dispose: () => {
        if (isDisposed()) {
          return;
        }
        state = ConnectionState.Disposed;
        disposeEmitter.fire(undefined);
        const error = new messages_1.ResponseError(messages_1.ErrorCodes.PendingResponseRejected, "Pending response rejected since connection got disposed");
        for (const promise of responsePromises.values()) {
          promise.reject(error);
        }
        responsePromises = new Map;
        requestTokens = new Map;
        knownCanceledRequests = new Set;
        messageQueue = new linkedMap_1.LinkedMap;
        if (Is.func(messageWriter.dispose)) {
          messageWriter.dispose();
        }
        if (Is.func(messageReader.dispose)) {
          messageReader.dispose();
        }
      },
      listen: () => {
        throwIfClosedOrDisposed();
        throwIfListening();
        state = ConnectionState.Listening;
        messageReader.listen(callback);
      },
      inspect: () => {
        (0, ral_1.default)().console.log("inspect");
      }
    };
    connection.onNotification(LogTraceNotification.type, (params) => {
      if (trace === Trace.Off || !tracer) {
        return;
      }
      const verbose = trace === Trace.Verbose || trace === Trace.Compact;
      tracer.log(params.message, verbose ? params.verbose : undefined);
    });
    connection.onNotification(ProgressNotification.type, (params) => {
      const handler = progressHandlers.get(params.token);
      if (handler) {
        handler(params.value);
      } else {
        unhandledProgressEmitter.fire(params);
      }
    });
    return connection;
  }
  exports.createMessageConnection = createMessageConnection;
});

// node_modules/vscode-jsonrpc/lib/common/api.js
var require_api = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ProgressType = exports.ProgressToken = exports.createMessageConnection = exports.NullLogger = exports.ConnectionOptions = exports.ConnectionStrategy = exports.AbstractMessageBuffer = exports.WriteableStreamMessageWriter = exports.AbstractMessageWriter = exports.MessageWriter = exports.ReadableStreamMessageReader = exports.AbstractMessageReader = exports.MessageReader = exports.SharedArrayReceiverStrategy = exports.SharedArraySenderStrategy = exports.CancellationToken = exports.CancellationTokenSource = exports.Emitter = exports.Event = exports.Disposable = exports.LRUCache = exports.Touch = exports.LinkedMap = exports.ParameterStructures = exports.NotificationType9 = exports.NotificationType8 = exports.NotificationType7 = exports.NotificationType6 = exports.NotificationType5 = exports.NotificationType4 = exports.NotificationType3 = exports.NotificationType2 = exports.NotificationType1 = exports.NotificationType0 = exports.NotificationType = exports.ErrorCodes = exports.ResponseError = exports.RequestType9 = exports.RequestType8 = exports.RequestType7 = exports.RequestType6 = exports.RequestType5 = exports.RequestType4 = exports.RequestType3 = exports.RequestType2 = exports.RequestType1 = exports.RequestType0 = exports.RequestType = exports.Message = exports.RAL = undefined;
  exports.MessageStrategy = exports.CancellationStrategy = exports.CancellationSenderStrategy = exports.CancellationReceiverStrategy = exports.ConnectionError = exports.ConnectionErrors = exports.LogTraceNotification = exports.SetTraceNotification = exports.TraceFormat = exports.TraceValues = exports.Trace = undefined;
  var messages_1 = require_messages();
  Object.defineProperty(exports, "Message", { enumerable: true, get: function() {
    return messages_1.Message;
  } });
  Object.defineProperty(exports, "RequestType", { enumerable: true, get: function() {
    return messages_1.RequestType;
  } });
  Object.defineProperty(exports, "RequestType0", { enumerable: true, get: function() {
    return messages_1.RequestType0;
  } });
  Object.defineProperty(exports, "RequestType1", { enumerable: true, get: function() {
    return messages_1.RequestType1;
  } });
  Object.defineProperty(exports, "RequestType2", { enumerable: true, get: function() {
    return messages_1.RequestType2;
  } });
  Object.defineProperty(exports, "RequestType3", { enumerable: true, get: function() {
    return messages_1.RequestType3;
  } });
  Object.defineProperty(exports, "RequestType4", { enumerable: true, get: function() {
    return messages_1.RequestType4;
  } });
  Object.defineProperty(exports, "RequestType5", { enumerable: true, get: function() {
    return messages_1.RequestType5;
  } });
  Object.defineProperty(exports, "RequestType6", { enumerable: true, get: function() {
    return messages_1.RequestType6;
  } });
  Object.defineProperty(exports, "RequestType7", { enumerable: true, get: function() {
    return messages_1.RequestType7;
  } });
  Object.defineProperty(exports, "RequestType8", { enumerable: true, get: function() {
    return messages_1.RequestType8;
  } });
  Object.defineProperty(exports, "RequestType9", { enumerable: true, get: function() {
    return messages_1.RequestType9;
  } });
  Object.defineProperty(exports, "ResponseError", { enumerable: true, get: function() {
    return messages_1.ResponseError;
  } });
  Object.defineProperty(exports, "ErrorCodes", { enumerable: true, get: function() {
    return messages_1.ErrorCodes;
  } });
  Object.defineProperty(exports, "NotificationType", { enumerable: true, get: function() {
    return messages_1.NotificationType;
  } });
  Object.defineProperty(exports, "NotificationType0", { enumerable: true, get: function() {
    return messages_1.NotificationType0;
  } });
  Object.defineProperty(exports, "NotificationType1", { enumerable: true, get: function() {
    return messages_1.NotificationType1;
  } });
  Object.defineProperty(exports, "NotificationType2", { enumerable: true, get: function() {
    return messages_1.NotificationType2;
  } });
  Object.defineProperty(exports, "NotificationType3", { enumerable: true, get: function() {
    return messages_1.NotificationType3;
  } });
  Object.defineProperty(exports, "NotificationType4", { enumerable: true, get: function() {
    return messages_1.NotificationType4;
  } });
  Object.defineProperty(exports, "NotificationType5", { enumerable: true, get: function() {
    return messages_1.NotificationType5;
  } });
  Object.defineProperty(exports, "NotificationType6", { enumerable: true, get: function() {
    return messages_1.NotificationType6;
  } });
  Object.defineProperty(exports, "NotificationType7", { enumerable: true, get: function() {
    return messages_1.NotificationType7;
  } });
  Object.defineProperty(exports, "NotificationType8", { enumerable: true, get: function() {
    return messages_1.NotificationType8;
  } });
  Object.defineProperty(exports, "NotificationType9", { enumerable: true, get: function() {
    return messages_1.NotificationType9;
  } });
  Object.defineProperty(exports, "ParameterStructures", { enumerable: true, get: function() {
    return messages_1.ParameterStructures;
  } });
  var linkedMap_1 = require_linkedMap();
  Object.defineProperty(exports, "LinkedMap", { enumerable: true, get: function() {
    return linkedMap_1.LinkedMap;
  } });
  Object.defineProperty(exports, "LRUCache", { enumerable: true, get: function() {
    return linkedMap_1.LRUCache;
  } });
  Object.defineProperty(exports, "Touch", { enumerable: true, get: function() {
    return linkedMap_1.Touch;
  } });
  var disposable_1 = require_disposable();
  Object.defineProperty(exports, "Disposable", { enumerable: true, get: function() {
    return disposable_1.Disposable;
  } });
  var events_1 = require_events();
  Object.defineProperty(exports, "Event", { enumerable: true, get: function() {
    return events_1.Event;
  } });
  Object.defineProperty(exports, "Emitter", { enumerable: true, get: function() {
    return events_1.Emitter;
  } });
  var cancellation_1 = require_cancellation();
  Object.defineProperty(exports, "CancellationTokenSource", { enumerable: true, get: function() {
    return cancellation_1.CancellationTokenSource;
  } });
  Object.defineProperty(exports, "CancellationToken", { enumerable: true, get: function() {
    return cancellation_1.CancellationToken;
  } });
  var sharedArrayCancellation_1 = require_sharedArrayCancellation();
  Object.defineProperty(exports, "SharedArraySenderStrategy", { enumerable: true, get: function() {
    return sharedArrayCancellation_1.SharedArraySenderStrategy;
  } });
  Object.defineProperty(exports, "SharedArrayReceiverStrategy", { enumerable: true, get: function() {
    return sharedArrayCancellation_1.SharedArrayReceiverStrategy;
  } });
  var messageReader_1 = require_messageReader();
  Object.defineProperty(exports, "MessageReader", { enumerable: true, get: function() {
    return messageReader_1.MessageReader;
  } });
  Object.defineProperty(exports, "AbstractMessageReader", { enumerable: true, get: function() {
    return messageReader_1.AbstractMessageReader;
  } });
  Object.defineProperty(exports, "ReadableStreamMessageReader", { enumerable: true, get: function() {
    return messageReader_1.ReadableStreamMessageReader;
  } });
  var messageWriter_1 = require_messageWriter();
  Object.defineProperty(exports, "MessageWriter", { enumerable: true, get: function() {
    return messageWriter_1.MessageWriter;
  } });
  Object.defineProperty(exports, "AbstractMessageWriter", { enumerable: true, get: function() {
    return messageWriter_1.AbstractMessageWriter;
  } });
  Object.defineProperty(exports, "WriteableStreamMessageWriter", { enumerable: true, get: function() {
    return messageWriter_1.WriteableStreamMessageWriter;
  } });
  var messageBuffer_1 = require_messageBuffer();
  Object.defineProperty(exports, "AbstractMessageBuffer", { enumerable: true, get: function() {
    return messageBuffer_1.AbstractMessageBuffer;
  } });
  var connection_1 = require_connection();
  Object.defineProperty(exports, "ConnectionStrategy", { enumerable: true, get: function() {
    return connection_1.ConnectionStrategy;
  } });
  Object.defineProperty(exports, "ConnectionOptions", { enumerable: true, get: function() {
    return connection_1.ConnectionOptions;
  } });
  Object.defineProperty(exports, "NullLogger", { enumerable: true, get: function() {
    return connection_1.NullLogger;
  } });
  Object.defineProperty(exports, "createMessageConnection", { enumerable: true, get: function() {
    return connection_1.createMessageConnection;
  } });
  Object.defineProperty(exports, "ProgressToken", { enumerable: true, get: function() {
    return connection_1.ProgressToken;
  } });
  Object.defineProperty(exports, "ProgressType", { enumerable: true, get: function() {
    return connection_1.ProgressType;
  } });
  Object.defineProperty(exports, "Trace", { enumerable: true, get: function() {
    return connection_1.Trace;
  } });
  Object.defineProperty(exports, "TraceValues", { enumerable: true, get: function() {
    return connection_1.TraceValues;
  } });
  Object.defineProperty(exports, "TraceFormat", { enumerable: true, get: function() {
    return connection_1.TraceFormat;
  } });
  Object.defineProperty(exports, "SetTraceNotification", { enumerable: true, get: function() {
    return connection_1.SetTraceNotification;
  } });
  Object.defineProperty(exports, "LogTraceNotification", { enumerable: true, get: function() {
    return connection_1.LogTraceNotification;
  } });
  Object.defineProperty(exports, "ConnectionErrors", { enumerable: true, get: function() {
    return connection_1.ConnectionErrors;
  } });
  Object.defineProperty(exports, "ConnectionError", { enumerable: true, get: function() {
    return connection_1.ConnectionError;
  } });
  Object.defineProperty(exports, "CancellationReceiverStrategy", { enumerable: true, get: function() {
    return connection_1.CancellationReceiverStrategy;
  } });
  Object.defineProperty(exports, "CancellationSenderStrategy", { enumerable: true, get: function() {
    return connection_1.CancellationSenderStrategy;
  } });
  Object.defineProperty(exports, "CancellationStrategy", { enumerable: true, get: function() {
    return connection_1.CancellationStrategy;
  } });
  Object.defineProperty(exports, "MessageStrategy", { enumerable: true, get: function() {
    return connection_1.MessageStrategy;
  } });
  var ral_1 = require_ral();
  exports.RAL = ral_1.default;
});

// node_modules/vscode-jsonrpc/lib/node/ril.js
var require_ril = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var util_1 = __require("util");
  var api_1 = require_api();

  class MessageBuffer extends api_1.AbstractMessageBuffer {
    constructor(encoding = "utf-8") {
      super(encoding);
    }
    emptyBuffer() {
      return MessageBuffer.emptyBuffer;
    }
    fromString(value, encoding) {
      return Buffer.from(value, encoding);
    }
    toString(value, encoding) {
      if (value instanceof Buffer) {
        return value.toString(encoding);
      } else {
        return new util_1.TextDecoder(encoding).decode(value);
      }
    }
    asNative(buffer, length) {
      if (length === undefined) {
        return buffer instanceof Buffer ? buffer : Buffer.from(buffer);
      } else {
        return buffer instanceof Buffer ? buffer.slice(0, length) : Buffer.from(buffer, 0, length);
      }
    }
    allocNative(length) {
      return Buffer.allocUnsafe(length);
    }
  }
  MessageBuffer.emptyBuffer = Buffer.allocUnsafe(0);

  class ReadableStreamWrapper {
    constructor(stream) {
      this.stream = stream;
    }
    onClose(listener) {
      this.stream.on("close", listener);
      return api_1.Disposable.create(() => this.stream.off("close", listener));
    }
    onError(listener) {
      this.stream.on("error", listener);
      return api_1.Disposable.create(() => this.stream.off("error", listener));
    }
    onEnd(listener) {
      this.stream.on("end", listener);
      return api_1.Disposable.create(() => this.stream.off("end", listener));
    }
    onData(listener) {
      this.stream.on("data", listener);
      return api_1.Disposable.create(() => this.stream.off("data", listener));
    }
  }

  class WritableStreamWrapper {
    constructor(stream) {
      this.stream = stream;
    }
    onClose(listener) {
      this.stream.on("close", listener);
      return api_1.Disposable.create(() => this.stream.off("close", listener));
    }
    onError(listener) {
      this.stream.on("error", listener);
      return api_1.Disposable.create(() => this.stream.off("error", listener));
    }
    onEnd(listener) {
      this.stream.on("end", listener);
      return api_1.Disposable.create(() => this.stream.off("end", listener));
    }
    write(data, encoding) {
      return new Promise((resolve, reject) => {
        const callback = (error) => {
          if (error === undefined || error === null) {
            resolve();
          } else {
            reject(error);
          }
        };
        if (typeof data === "string") {
          this.stream.write(data, encoding, callback);
        } else {
          this.stream.write(data, callback);
        }
      });
    }
    end() {
      this.stream.end();
    }
  }
  var _ril = Object.freeze({
    messageBuffer: Object.freeze({
      create: (encoding) => new MessageBuffer(encoding)
    }),
    applicationJson: Object.freeze({
      encoder: Object.freeze({
        name: "application/json",
        encode: (msg, options) => {
          try {
            return Promise.resolve(Buffer.from(JSON.stringify(msg, undefined, 0), options.charset));
          } catch (err) {
            return Promise.reject(err);
          }
        }
      }),
      decoder: Object.freeze({
        name: "application/json",
        decode: (buffer, options) => {
          try {
            if (buffer instanceof Buffer) {
              return Promise.resolve(JSON.parse(buffer.toString(options.charset)));
            } else {
              return Promise.resolve(JSON.parse(new util_1.TextDecoder(options.charset).decode(buffer)));
            }
          } catch (err) {
            return Promise.reject(err);
          }
        }
      })
    }),
    stream: Object.freeze({
      asReadableStream: (stream) => new ReadableStreamWrapper(stream),
      asWritableStream: (stream) => new WritableStreamWrapper(stream)
    }),
    console,
    timer: Object.freeze({
      setTimeout(callback, ms, ...args) {
        const handle = setTimeout(callback, ms, ...args);
        return { dispose: () => clearTimeout(handle) };
      },
      setImmediate(callback, ...args) {
        const handle = setImmediate(callback, ...args);
        return { dispose: () => clearImmediate(handle) };
      },
      setInterval(callback, ms, ...args) {
        const handle = setInterval(callback, ms, ...args);
        return { dispose: () => clearInterval(handle) };
      }
    })
  });
  function RIL() {
    return _ril;
  }
  (function(RIL2) {
    function install() {
      api_1.RAL.install(_ril);
    }
    RIL2.install = install;
  })(RIL || (RIL = {}));
  exports.default = RIL;
});

// node_modules/vscode-jsonrpc/lib/node/main.js
var require_main = __commonJS((exports) => {
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = exports && exports.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
        __createBinding(exports2, m, p);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.createMessageConnection = exports.createServerSocketTransport = exports.createClientSocketTransport = exports.createServerPipeTransport = exports.createClientPipeTransport = exports.generateRandomPipeName = exports.StreamMessageWriter = exports.StreamMessageReader = exports.SocketMessageWriter = exports.SocketMessageReader = exports.PortMessageWriter = exports.PortMessageReader = exports.IPCMessageWriter = exports.IPCMessageReader = undefined;
  var ril_1 = require_ril();
  ril_1.default.install();
  var path = __require("path");
  var os = __require("os");
  var crypto_1 = __require("crypto");
  var net_1 = __require("net");
  var api_1 = require_api();
  __exportStar(require_api(), exports);

  class IPCMessageReader extends api_1.AbstractMessageReader {
    constructor(process2) {
      super();
      this.process = process2;
      let eventEmitter = this.process;
      eventEmitter.on("error", (error) => this.fireError(error));
      eventEmitter.on("close", () => this.fireClose());
    }
    listen(callback) {
      this.process.on("message", callback);
      return api_1.Disposable.create(() => this.process.off("message", callback));
    }
  }
  exports.IPCMessageReader = IPCMessageReader;

  class IPCMessageWriter extends api_1.AbstractMessageWriter {
    constructor(process2) {
      super();
      this.process = process2;
      this.errorCount = 0;
      const eventEmitter = this.process;
      eventEmitter.on("error", (error) => this.fireError(error));
      eventEmitter.on("close", () => this.fireClose);
    }
    write(msg) {
      try {
        if (typeof this.process.send === "function") {
          this.process.send(msg, undefined, undefined, (error) => {
            if (error) {
              this.errorCount++;
              this.handleError(error, msg);
            } else {
              this.errorCount = 0;
            }
          });
        }
        return Promise.resolve();
      } catch (error) {
        this.handleError(error, msg);
        return Promise.reject(error);
      }
    }
    handleError(error, msg) {
      this.errorCount++;
      this.fireError(error, msg, this.errorCount);
    }
    end() {}
  }
  exports.IPCMessageWriter = IPCMessageWriter;

  class PortMessageReader extends api_1.AbstractMessageReader {
    constructor(port) {
      super();
      this.onData = new api_1.Emitter;
      port.on("close", () => this.fireClose);
      port.on("error", (error) => this.fireError(error));
      port.on("message", (message) => {
        this.onData.fire(message);
      });
    }
    listen(callback) {
      return this.onData.event(callback);
    }
  }
  exports.PortMessageReader = PortMessageReader;

  class PortMessageWriter extends api_1.AbstractMessageWriter {
    constructor(port) {
      super();
      this.port = port;
      this.errorCount = 0;
      port.on("close", () => this.fireClose());
      port.on("error", (error) => this.fireError(error));
    }
    write(msg) {
      try {
        this.port.postMessage(msg);
        return Promise.resolve();
      } catch (error) {
        this.handleError(error, msg);
        return Promise.reject(error);
      }
    }
    handleError(error, msg) {
      this.errorCount++;
      this.fireError(error, msg, this.errorCount);
    }
    end() {}
  }
  exports.PortMessageWriter = PortMessageWriter;

  class SocketMessageReader extends api_1.ReadableStreamMessageReader {
    constructor(socket, encoding = "utf-8") {
      super((0, ril_1.default)().stream.asReadableStream(socket), encoding);
    }
  }
  exports.SocketMessageReader = SocketMessageReader;

  class SocketMessageWriter extends api_1.WriteableStreamMessageWriter {
    constructor(socket, options) {
      super((0, ril_1.default)().stream.asWritableStream(socket), options);
      this.socket = socket;
    }
    dispose() {
      super.dispose();
      this.socket.destroy();
    }
  }
  exports.SocketMessageWriter = SocketMessageWriter;

  class StreamMessageReader extends api_1.ReadableStreamMessageReader {
    constructor(readable, encoding) {
      super((0, ril_1.default)().stream.asReadableStream(readable), encoding);
    }
  }
  exports.StreamMessageReader = StreamMessageReader;

  class StreamMessageWriter extends api_1.WriteableStreamMessageWriter {
    constructor(writable, options) {
      super((0, ril_1.default)().stream.asWritableStream(writable), options);
    }
  }
  exports.StreamMessageWriter = StreamMessageWriter;
  var XDG_RUNTIME_DIR = process.env["XDG_RUNTIME_DIR"];
  var safeIpcPathLengths = new Map([
    ["linux", 107],
    ["darwin", 103]
  ]);
  function generateRandomPipeName() {
    const randomSuffix = (0, crypto_1.randomBytes)(21).toString("hex");
    if (process.platform === "win32") {
      return `\\\\.\\pipe\\vscode-jsonrpc-${randomSuffix}-sock`;
    }
    let result;
    if (XDG_RUNTIME_DIR) {
      result = path.join(XDG_RUNTIME_DIR, `vscode-ipc-${randomSuffix}.sock`);
    } else {
      result = path.join(os.tmpdir(), `vscode-${randomSuffix}.sock`);
    }
    const limit = safeIpcPathLengths.get(process.platform);
    if (limit !== undefined && result.length > limit) {
      (0, ril_1.default)().console.warn(`WARNING: IPC handle "${result}" is longer than ${limit} characters.`);
    }
    return result;
  }
  exports.generateRandomPipeName = generateRandomPipeName;
  function createClientPipeTransport(pipeName, encoding = "utf-8") {
    let connectResolve;
    const connected = new Promise((resolve, _reject) => {
      connectResolve = resolve;
    });
    return new Promise((resolve, reject) => {
      let server = (0, net_1.createServer)((socket) => {
        server.close();
        connectResolve([
          new SocketMessageReader(socket, encoding),
          new SocketMessageWriter(socket, encoding)
        ]);
      });
      server.on("error", reject);
      server.listen(pipeName, () => {
        server.removeListener("error", reject);
        resolve({
          onConnected: () => {
            return connected;
          }
        });
      });
    });
  }
  exports.createClientPipeTransport = createClientPipeTransport;
  function createServerPipeTransport(pipeName, encoding = "utf-8") {
    const socket = (0, net_1.createConnection)(pipeName);
    return [
      new SocketMessageReader(socket, encoding),
      new SocketMessageWriter(socket, encoding)
    ];
  }
  exports.createServerPipeTransport = createServerPipeTransport;
  function createClientSocketTransport(port, encoding = "utf-8") {
    let connectResolve;
    const connected = new Promise((resolve, _reject) => {
      connectResolve = resolve;
    });
    return new Promise((resolve, reject) => {
      const server = (0, net_1.createServer)((socket) => {
        server.close();
        connectResolve([
          new SocketMessageReader(socket, encoding),
          new SocketMessageWriter(socket, encoding)
        ]);
      });
      server.on("error", reject);
      server.listen(port, "127.0.0.1", () => {
        server.removeListener("error", reject);
        resolve({
          onConnected: () => {
            return connected;
          }
        });
      });
    });
  }
  exports.createClientSocketTransport = createClientSocketTransport;
  function createServerSocketTransport(port, encoding = "utf-8") {
    const socket = (0, net_1.createConnection)(port, "127.0.0.1");
    return [
      new SocketMessageReader(socket, encoding),
      new SocketMessageWriter(socket, encoding)
    ];
  }
  exports.createServerSocketTransport = createServerSocketTransport;
  function isReadableStream(value) {
    const candidate = value;
    return candidate.read !== undefined && candidate.addListener !== undefined;
  }
  function isWritableStream(value) {
    const candidate = value;
    return candidate.write !== undefined && candidate.addListener !== undefined;
  }
  function createMessageConnection(input, output, logger, options) {
    if (!logger) {
      logger = api_1.NullLogger;
    }
    const reader = isReadableStream(input) ? new StreamMessageReader(input) : input;
    const writer = isWritableStream(output) ? new StreamMessageWriter(output) : output;
    if (api_1.ConnectionStrategy.is(options)) {
      options = { connectionStrategy: options };
    }
    return (0, api_1.createMessageConnection)(reader, writer, logger, options);
  }
  exports.createMessageConnection = createMessageConnection;
});

// node_modules/vscode-languageserver-types/lib/umd/main.js
var require_main2 = __commonJS((exports, module) => {
  (function(factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
      var v = factory(__require, exports);
      if (v !== undefined)
        module.exports = v;
    } else if (typeof define === "function" && define.amd) {
      define(["require", "exports"], factory);
    }
  })(function(require2, exports2) {
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TextDocument = exports2.EOL = exports2.WorkspaceFolder = exports2.InlineCompletionContext = exports2.SelectedCompletionInfo = exports2.InlineCompletionTriggerKind = exports2.InlineCompletionList = exports2.InlineCompletionItem = exports2.StringValue = exports2.InlayHint = exports2.InlayHintLabelPart = exports2.InlayHintKind = exports2.InlineValueContext = exports2.InlineValueEvaluatableExpression = exports2.InlineValueVariableLookup = exports2.InlineValueText = exports2.SemanticTokens = exports2.SemanticTokenModifiers = exports2.SemanticTokenTypes = exports2.SelectionRange = exports2.DocumentLink = exports2.FormattingOptions = exports2.CodeLens = exports2.CodeAction = exports2.CodeActionContext = exports2.CodeActionTriggerKind = exports2.CodeActionKind = exports2.DocumentSymbol = exports2.WorkspaceSymbol = exports2.SymbolInformation = exports2.SymbolTag = exports2.SymbolKind = exports2.DocumentHighlight = exports2.DocumentHighlightKind = exports2.SignatureInformation = exports2.ParameterInformation = exports2.Hover = exports2.MarkedString = exports2.CompletionList = exports2.CompletionItem = exports2.CompletionItemLabelDetails = exports2.InsertTextMode = exports2.InsertReplaceEdit = exports2.CompletionItemTag = exports2.InsertTextFormat = exports2.CompletionItemKind = exports2.MarkupContent = exports2.MarkupKind = exports2.TextDocumentItem = exports2.OptionalVersionedTextDocumentIdentifier = exports2.VersionedTextDocumentIdentifier = exports2.TextDocumentIdentifier = exports2.WorkspaceChange = exports2.WorkspaceEdit = exports2.DeleteFile = exports2.RenameFile = exports2.CreateFile = exports2.TextDocumentEdit = exports2.AnnotatedTextEdit = exports2.ChangeAnnotationIdentifier = exports2.ChangeAnnotation = exports2.TextEdit = exports2.Command = exports2.Diagnostic = exports2.CodeDescription = exports2.DiagnosticTag = exports2.DiagnosticSeverity = exports2.DiagnosticRelatedInformation = exports2.FoldingRange = exports2.FoldingRangeKind = exports2.ColorPresentation = exports2.ColorInformation = exports2.Color = exports2.LocationLink = exports2.Location = exports2.Range = exports2.Position = exports2.uinteger = exports2.integer = exports2.URI = exports2.DocumentUri = undefined;
    var DocumentUri;
    (function(DocumentUri2) {
      function is(value) {
        return typeof value === "string";
      }
      DocumentUri2.is = is;
    })(DocumentUri || (exports2.DocumentUri = DocumentUri = {}));
    var URI;
    (function(URI2) {
      function is(value) {
        return typeof value === "string";
      }
      URI2.is = is;
    })(URI || (exports2.URI = URI = {}));
    var integer;
    (function(integer2) {
      integer2.MIN_VALUE = -2147483648;
      integer2.MAX_VALUE = 2147483647;
      function is(value) {
        return typeof value === "number" && integer2.MIN_VALUE <= value && value <= integer2.MAX_VALUE;
      }
      integer2.is = is;
    })(integer || (exports2.integer = integer = {}));
    var uinteger;
    (function(uinteger2) {
      uinteger2.MIN_VALUE = 0;
      uinteger2.MAX_VALUE = 2147483647;
      function is(value) {
        return typeof value === "number" && uinteger2.MIN_VALUE <= value && value <= uinteger2.MAX_VALUE;
      }
      uinteger2.is = is;
    })(uinteger || (exports2.uinteger = uinteger = {}));
    var Position;
    (function(Position2) {
      function create(line, character) {
        if (line === Number.MAX_VALUE) {
          line = uinteger.MAX_VALUE;
        }
        if (character === Number.MAX_VALUE) {
          character = uinteger.MAX_VALUE;
        }
        return { line, character };
      }
      Position2.create = create;
      function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Is.uinteger(candidate.line) && Is.uinteger(candidate.character);
      }
      Position2.is = is;
    })(Position || (exports2.Position = Position = {}));
    var Range;
    (function(Range2) {
      function create(one, two, three, four) {
        if (Is.uinteger(one) && Is.uinteger(two) && Is.uinteger(three) && Is.uinteger(four)) {
          return { start: Position.create(one, two), end: Position.create(three, four) };
        } else if (Position.is(one) && Position.is(two)) {
          return { start: one, end: two };
        } else {
          throw new Error("Range#create called with invalid arguments[".concat(one, ", ").concat(two, ", ").concat(three, ", ").concat(four, "]"));
        }
      }
      Range2.create = create;
      function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Position.is(candidate.start) && Position.is(candidate.end);
      }
      Range2.is = is;
    })(Range || (exports2.Range = Range = {}));
    var Location;
    (function(Location2) {
      function create(uri, range) {
        return { uri, range };
      }
      Location2.create = create;
      function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Range.is(candidate.range) && (Is.string(candidate.uri) || Is.undefined(candidate.uri));
      }
      Location2.is = is;
    })(Location || (exports2.Location = Location = {}));
    var LocationLink;
    (function(LocationLink2) {
      function create(targetUri, targetRange, targetSelectionRange, originSelectionRange) {
        return { targetUri, targetRange, targetSelectionRange, originSelectionRange };
      }
      LocationLink2.create = create;
      function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Range.is(candidate.targetRange) && Is.string(candidate.targetUri) && Range.is(candidate.targetSelectionRange) && (Range.is(candidate.originSelectionRange) || Is.undefined(candidate.originSelectionRange));
      }
      LocationLink2.is = is;
    })(LocationLink || (exports2.LocationLink = LocationLink = {}));
    var Color;
    (function(Color2) {
      function create(red, green, blue, alpha) {
        return {
          red,
          green,
          blue,
          alpha
        };
      }
      Color2.create = create;
      function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Is.numberRange(candidate.red, 0, 1) && Is.numberRange(candidate.green, 0, 1) && Is.numberRange(candidate.blue, 0, 1) && Is.numberRange(candidate.alpha, 0, 1);
      }
      Color2.is = is;
    })(Color || (exports2.Color = Color = {}));
    var ColorInformation;
    (function(ColorInformation2) {
      function create(range, color) {
        return {
          range,
          color
        };
      }
      ColorInformation2.create = create;
      function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Range.is(candidate.range) && Color.is(candidate.color);
      }
      ColorInformation2.is = is;
    })(ColorInformation || (exports2.ColorInformation = ColorInformation = {}));
    var ColorPresentation;
    (function(ColorPresentation2) {
      function create(label, textEdit, additionalTextEdits) {
        return {
          label,
          textEdit,
          additionalTextEdits
        };
      }
      ColorPresentation2.create = create;
      function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Is.string(candidate.label) && (Is.undefined(candidate.textEdit) || TextEdit.is(candidate)) && (Is.undefined(candidate.additionalTextEdits) || Is.typedArray(candidate.additionalTextEdits, TextEdit.is));
      }
      ColorPresentation2.is = is;
    })(ColorPresentation || (exports2.ColorPresentation = ColorPresentation = {}));
    var FoldingRangeKind;
    (function(FoldingRangeKind2) {
      FoldingRangeKind2.Comment = "comment";
      FoldingRangeKind2.Imports = "imports";
      FoldingRangeKind2.Region = "region";
    })(FoldingRangeKind || (exports2.FoldingRangeKind = FoldingRangeKind = {}));
    var FoldingRange;
    (function(FoldingRange2) {
      function create(startLine, endLine, startCharacter, endCharacter, kind, collapsedText) {
        var result = {
          startLine,
          endLine
        };
        if (Is.defined(startCharacter)) {
          result.startCharacter = startCharacter;
        }
        if (Is.defined(endCharacter)) {
          result.endCharacter = endCharacter;
        }
        if (Is.defined(kind)) {
          result.kind = kind;
        }
        if (Is.defined(collapsedText)) {
          result.collapsedText = collapsedText;
        }
        return result;
      }
      FoldingRange2.create = create;
      function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Is.uinteger(candidate.startLine) && Is.uinteger(candidate.startLine) && (Is.undefined(candidate.startCharacter) || Is.uinteger(candidate.startCharacter)) && (Is.undefined(candidate.endCharacter) || Is.uinteger(candidate.endCharacter)) && (Is.undefined(candidate.kind) || Is.string(candidate.kind));
      }
      FoldingRange2.is = is;
    })(FoldingRange || (exports2.FoldingRange = FoldingRange = {}));
    var DiagnosticRelatedInformation;
    (function(DiagnosticRelatedInformation2) {
      function create(location, message) {
        return {
          location,
          message
        };
      }
      DiagnosticRelatedInformation2.create = create;
      function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Location.is(candidate.location) && Is.string(candidate.message);
      }
      DiagnosticRelatedInformation2.is = is;
    })(DiagnosticRelatedInformation || (exports2.DiagnosticRelatedInformation = DiagnosticRelatedInformation = {}));
    var DiagnosticSeverity;
    (function(DiagnosticSeverity2) {
      DiagnosticSeverity2.Error = 1;
      DiagnosticSeverity2.Warning = 2;
      DiagnosticSeverity2.Information = 3;
      DiagnosticSeverity2.Hint = 4;
    })(DiagnosticSeverity || (exports2.DiagnosticSeverity = DiagnosticSeverity = {}));
    var DiagnosticTag;
    (function(DiagnosticTag2) {
      DiagnosticTag2.Unnecessary = 1;
      DiagnosticTag2.Deprecated = 2;
    })(DiagnosticTag || (exports2.DiagnosticTag = DiagnosticTag = {}));
    var CodeDescription;
    (function(CodeDescription2) {
      function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Is.string(candidate.href);
      }
      CodeDescription2.is = is;
    })(CodeDescription || (exports2.CodeDescription = CodeDescription = {}));
    var Diagnostic;
    (function(Diagnostic2) {
      function create(range, message, severity, code, source, relatedInformation) {
        var result = { range, message };
        if (Is.defined(severity)) {
          result.severity = severity;
        }
        if (Is.defined(code)) {
          result.code = code;
        }
        if (Is.defined(source)) {
          result.source = source;
        }
        if (Is.defined(relatedInformation)) {
          result.relatedInformation = relatedInformation;
        }
        return result;
      }
      Diagnostic2.create = create;
      function is(value) {
        var _a;
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && Is.string(candidate.message) && (Is.number(candidate.severity) || Is.undefined(candidate.severity)) && (Is.integer(candidate.code) || Is.string(candidate.code) || Is.undefined(candidate.code)) && (Is.undefined(candidate.codeDescription) || Is.string((_a = candidate.codeDescription) === null || _a === undefined ? undefined : _a.href)) && (Is.string(candidate.source) || Is.undefined(candidate.source)) && (Is.undefined(candidate.relatedInformation) || Is.typedArray(candidate.relatedInformation, DiagnosticRelatedInformation.is));
      }
      Diagnostic2.is = is;
    })(Diagnostic || (exports2.Diagnostic = Diagnostic = {}));
    var Command;
    (function(Command2) {
      function create(title, command) {
        var args = [];
        for (var _i = 2;_i < arguments.length; _i++) {
          args[_i - 2] = arguments[_i];
        }
        var result = { title, command };
        if (Is.defined(args) && args.length > 0) {
          result.arguments = args;
        }
        return result;
      }
      Command2.create = create;
      function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.title) && Is.string(candidate.command);
      }
      Command2.is = is;
    })(Command || (exports2.Command = Command = {}));
    var TextEdit;
    (function(TextEdit2) {
      function replace(range, newText) {
        return { range, newText };
      }
      TextEdit2.replace = replace;
      function insert(position, newText) {
        return { range: { start: position, end: position }, newText };
      }
      TextEdit2.insert = insert;
      function del(range) {
        return { range, newText: "" };
      }
      TextEdit2.del = del;
      function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Is.string(candidate.newText) && Range.is(candidate.range);
      }
      TextEdit2.is = is;
    })(TextEdit || (exports2.TextEdit = TextEdit = {}));
    var ChangeAnnotation;
    (function(ChangeAnnotation2) {
      function create(label, needsConfirmation, description) {
        var result = { label };
        if (needsConfirmation !== undefined) {
          result.needsConfirmation = needsConfirmation;
        }
        if (description !== undefined) {
          result.description = description;
        }
        return result;
      }
      ChangeAnnotation2.create = create;
      function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Is.string(candidate.label) && (Is.boolean(candidate.needsConfirmation) || candidate.needsConfirmation === undefined) && (Is.string(candidate.description) || candidate.description === undefined);
      }
      ChangeAnnotation2.is = is;
    })(ChangeAnnotation || (exports2.ChangeAnnotation = ChangeAnnotation = {}));
    var ChangeAnnotationIdentifier;
    (function(ChangeAnnotationIdentifier2) {
      function is(value) {
        var candidate = value;
        return Is.string(candidate);
      }
      ChangeAnnotationIdentifier2.is = is;
    })(ChangeAnnotationIdentifier || (exports2.ChangeAnnotationIdentifier = ChangeAnnotationIdentifier = {}));
    var AnnotatedTextEdit;
    (function(AnnotatedTextEdit2) {
      function replace(range, newText, annotation) {
        return { range, newText, annotationId: annotation };
      }
      AnnotatedTextEdit2.replace = replace;
      function insert(position, newText, annotation) {
        return { range: { start: position, end: position }, newText, annotationId: annotation };
      }
      AnnotatedTextEdit2.insert = insert;
      function del(range, annotation) {
        return { range, newText: "", annotationId: annotation };
      }
      AnnotatedTextEdit2.del = del;
      function is(value) {
        var candidate = value;
        return TextEdit.is(candidate) && (ChangeAnnotation.is(candidate.annotationId) || ChangeAnnotationIdentifier.is(candidate.annotationId));
      }
      AnnotatedTextEdit2.is = is;
    })(AnnotatedTextEdit || (exports2.AnnotatedTextEdit = AnnotatedTextEdit = {}));
    var TextDocumentEdit;
    (function(TextDocumentEdit2) {
      function create(textDocument, edits) {
        return { textDocument, edits };
      }
      TextDocumentEdit2.create = create;
      function is(value) {
        var candidate = value;
        return Is.defined(candidate) && OptionalVersionedTextDocumentIdentifier.is(candidate.textDocument) && Array.isArray(candidate.edits);
      }
      TextDocumentEdit2.is = is;
    })(TextDocumentEdit || (exports2.TextDocumentEdit = TextDocumentEdit = {}));
    var CreateFile;
    (function(CreateFile2) {
      function create(uri, options, annotation) {
        var result = {
          kind: "create",
          uri
        };
        if (options !== undefined && (options.overwrite !== undefined || options.ignoreIfExists !== undefined)) {
          result.options = options;
        }
        if (annotation !== undefined) {
          result.annotationId = annotation;
        }
        return result;
      }
      CreateFile2.create = create;
      function is(value) {
        var candidate = value;
        return candidate && candidate.kind === "create" && Is.string(candidate.uri) && (candidate.options === undefined || (candidate.options.overwrite === undefined || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === undefined || Is.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === undefined || ChangeAnnotationIdentifier.is(candidate.annotationId));
      }
      CreateFile2.is = is;
    })(CreateFile || (exports2.CreateFile = CreateFile = {}));
    var RenameFile;
    (function(RenameFile2) {
      function create(oldUri, newUri, options, annotation) {
        var result = {
          kind: "rename",
          oldUri,
          newUri
        };
        if (options !== undefined && (options.overwrite !== undefined || options.ignoreIfExists !== undefined)) {
          result.options = options;
        }
        if (annotation !== undefined) {
          result.annotationId = annotation;
        }
        return result;
      }
      RenameFile2.create = create;
      function is(value) {
        var candidate = value;
        return candidate && candidate.kind === "rename" && Is.string(candidate.oldUri) && Is.string(candidate.newUri) && (candidate.options === undefined || (candidate.options.overwrite === undefined || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === undefined || Is.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === undefined || ChangeAnnotationIdentifier.is(candidate.annotationId));
      }
      RenameFile2.is = is;
    })(RenameFile || (exports2.RenameFile = RenameFile = {}));
    var DeleteFile;
    (function(DeleteFile2) {
      function create(uri, options, annotation) {
        var result = {
          kind: "delete",
          uri
        };
        if (options !== undefined && (options.recursive !== undefined || options.ignoreIfNotExists !== undefined)) {
          result.options = options;
        }
        if (annotation !== undefined) {
          result.annotationId = annotation;
        }
        return result;
      }
      DeleteFile2.create = create;
      function is(value) {
        var candidate = value;
        return candidate && candidate.kind === "delete" && Is.string(candidate.uri) && (candidate.options === undefined || (candidate.options.recursive === undefined || Is.boolean(candidate.options.recursive)) && (candidate.options.ignoreIfNotExists === undefined || Is.boolean(candidate.options.ignoreIfNotExists))) && (candidate.annotationId === undefined || ChangeAnnotationIdentifier.is(candidate.annotationId));
      }
      DeleteFile2.is = is;
    })(DeleteFile || (exports2.DeleteFile = DeleteFile = {}));
    var WorkspaceEdit;
    (function(WorkspaceEdit2) {
      function is(value) {
        var candidate = value;
        return candidate && (candidate.changes !== undefined || candidate.documentChanges !== undefined) && (candidate.documentChanges === undefined || candidate.documentChanges.every(function(change) {
          if (Is.string(change.kind)) {
            return CreateFile.is(change) || RenameFile.is(change) || DeleteFile.is(change);
          } else {
            return TextDocumentEdit.is(change);
          }
        }));
      }
      WorkspaceEdit2.is = is;
    })(WorkspaceEdit || (exports2.WorkspaceEdit = WorkspaceEdit = {}));
    var TextEditChangeImpl = function() {
      function TextEditChangeImpl2(edits, changeAnnotations) {
        this.edits = edits;
        this.changeAnnotations = changeAnnotations;
      }
      TextEditChangeImpl2.prototype.insert = function(position, newText, annotation) {
        var edit;
        var id;
        if (annotation === undefined) {
          edit = TextEdit.insert(position, newText);
        } else if (ChangeAnnotationIdentifier.is(annotation)) {
          id = annotation;
          edit = AnnotatedTextEdit.insert(position, newText, annotation);
        } else {
          this.assertChangeAnnotations(this.changeAnnotations);
          id = this.changeAnnotations.manage(annotation);
          edit = AnnotatedTextEdit.insert(position, newText, id);
        }
        this.edits.push(edit);
        if (id !== undefined) {
          return id;
        }
      };
      TextEditChangeImpl2.prototype.replace = function(range, newText, annotation) {
        var edit;
        var id;
        if (annotation === undefined) {
          edit = TextEdit.replace(range, newText);
        } else if (ChangeAnnotationIdentifier.is(annotation)) {
          id = annotation;
          edit = AnnotatedTextEdit.replace(range, newText, annotation);
        } else {
          this.assertChangeAnnotations(this.changeAnnotations);
          id = this.changeAnnotations.manage(annotation);
          edit = AnnotatedTextEdit.replace(range, newText, id);
        }
        this.edits.push(edit);
        if (id !== undefined) {
          return id;
        }
      };
      TextEditChangeImpl2.prototype.delete = function(range, annotation) {
        var edit;
        var id;
        if (annotation === undefined) {
          edit = TextEdit.del(range);
        } else if (ChangeAnnotationIdentifier.is(annotation)) {
          id = annotation;
          edit = AnnotatedTextEdit.del(range, annotation);
        } else {
          this.assertChangeAnnotations(this.changeAnnotations);
          id = this.changeAnnotations.manage(annotation);
          edit = AnnotatedTextEdit.del(range, id);
        }
        this.edits.push(edit);
        if (id !== undefined) {
          return id;
        }
      };
      TextEditChangeImpl2.prototype.add = function(edit) {
        this.edits.push(edit);
      };
      TextEditChangeImpl2.prototype.all = function() {
        return this.edits;
      };
      TextEditChangeImpl2.prototype.clear = function() {
        this.edits.splice(0, this.edits.length);
      };
      TextEditChangeImpl2.prototype.assertChangeAnnotations = function(value) {
        if (value === undefined) {
          throw new Error("Text edit change is not configured to manage change annotations.");
        }
      };
      return TextEditChangeImpl2;
    }();
    var ChangeAnnotations = function() {
      function ChangeAnnotations2(annotations) {
        this._annotations = annotations === undefined ? Object.create(null) : annotations;
        this._counter = 0;
        this._size = 0;
      }
      ChangeAnnotations2.prototype.all = function() {
        return this._annotations;
      };
      Object.defineProperty(ChangeAnnotations2.prototype, "size", {
        get: function() {
          return this._size;
        },
        enumerable: false,
        configurable: true
      });
      ChangeAnnotations2.prototype.manage = function(idOrAnnotation, annotation) {
        var id;
        if (ChangeAnnotationIdentifier.is(idOrAnnotation)) {
          id = idOrAnnotation;
        } else {
          id = this.nextId();
          annotation = idOrAnnotation;
        }
        if (this._annotations[id] !== undefined) {
          throw new Error("Id ".concat(id, " is already in use."));
        }
        if (annotation === undefined) {
          throw new Error("No annotation provided for id ".concat(id));
        }
        this._annotations[id] = annotation;
        this._size++;
        return id;
      };
      ChangeAnnotations2.prototype.nextId = function() {
        this._counter++;
        return this._counter.toString();
      };
      return ChangeAnnotations2;
    }();
    var WorkspaceChange = function() {
      function WorkspaceChange2(workspaceEdit) {
        var _this = this;
        this._textEditChanges = Object.create(null);
        if (workspaceEdit !== undefined) {
          this._workspaceEdit = workspaceEdit;
          if (workspaceEdit.documentChanges) {
            this._changeAnnotations = new ChangeAnnotations(workspaceEdit.changeAnnotations);
            workspaceEdit.changeAnnotations = this._changeAnnotations.all();
            workspaceEdit.documentChanges.forEach(function(change) {
              if (TextDocumentEdit.is(change)) {
                var textEditChange = new TextEditChangeImpl(change.edits, _this._changeAnnotations);
                _this._textEditChanges[change.textDocument.uri] = textEditChange;
              }
            });
          } else if (workspaceEdit.changes) {
            Object.keys(workspaceEdit.changes).forEach(function(key) {
              var textEditChange = new TextEditChangeImpl(workspaceEdit.changes[key]);
              _this._textEditChanges[key] = textEditChange;
            });
          }
        } else {
          this._workspaceEdit = {};
        }
      }
      Object.defineProperty(WorkspaceChange2.prototype, "edit", {
        get: function() {
          this.initDocumentChanges();
          if (this._changeAnnotations !== undefined) {
            if (this._changeAnnotations.size === 0) {
              this._workspaceEdit.changeAnnotations = undefined;
            } else {
              this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
            }
          }
          return this._workspaceEdit;
        },
        enumerable: false,
        configurable: true
      });
      WorkspaceChange2.prototype.getTextEditChange = function(key) {
        if (OptionalVersionedTextDocumentIdentifier.is(key)) {
          this.initDocumentChanges();
          if (this._workspaceEdit.documentChanges === undefined) {
            throw new Error("Workspace edit is not configured for document changes.");
          }
          var textDocument = { uri: key.uri, version: key.version };
          var result = this._textEditChanges[textDocument.uri];
          if (!result) {
            var edits = [];
            var textDocumentEdit = {
              textDocument,
              edits
            };
            this._workspaceEdit.documentChanges.push(textDocumentEdit);
            result = new TextEditChangeImpl(edits, this._changeAnnotations);
            this._textEditChanges[textDocument.uri] = result;
          }
          return result;
        } else {
          this.initChanges();
          if (this._workspaceEdit.changes === undefined) {
            throw new Error("Workspace edit is not configured for normal text edit changes.");
          }
          var result = this._textEditChanges[key];
          if (!result) {
            var edits = [];
            this._workspaceEdit.changes[key] = edits;
            result = new TextEditChangeImpl(edits);
            this._textEditChanges[key] = result;
          }
          return result;
        }
      };
      WorkspaceChange2.prototype.initDocumentChanges = function() {
        if (this._workspaceEdit.documentChanges === undefined && this._workspaceEdit.changes === undefined) {
          this._changeAnnotations = new ChangeAnnotations;
          this._workspaceEdit.documentChanges = [];
          this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
        }
      };
      WorkspaceChange2.prototype.initChanges = function() {
        if (this._workspaceEdit.documentChanges === undefined && this._workspaceEdit.changes === undefined) {
          this._workspaceEdit.changes = Object.create(null);
        }
      };
      WorkspaceChange2.prototype.createFile = function(uri, optionsOrAnnotation, options) {
        this.initDocumentChanges();
        if (this._workspaceEdit.documentChanges === undefined) {
          throw new Error("Workspace edit is not configured for document changes.");
        }
        var annotation;
        if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
          annotation = optionsOrAnnotation;
        } else {
          options = optionsOrAnnotation;
        }
        var operation;
        var id;
        if (annotation === undefined) {
          operation = CreateFile.create(uri, options);
        } else {
          id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
          operation = CreateFile.create(uri, options, id);
        }
        this._workspaceEdit.documentChanges.push(operation);
        if (id !== undefined) {
          return id;
        }
      };
      WorkspaceChange2.prototype.renameFile = function(oldUri, newUri, optionsOrAnnotation, options) {
        this.initDocumentChanges();
        if (this._workspaceEdit.documentChanges === undefined) {
          throw new Error("Workspace edit is not configured for document changes.");
        }
        var annotation;
        if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
          annotation = optionsOrAnnotation;
        } else {
          options = optionsOrAnnotation;
        }
        var operation;
        var id;
        if (annotation === undefined) {
          operation = RenameFile.create(oldUri, newUri, options);
        } else {
          id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
          operation = RenameFile.create(oldUri, newUri, options, id);
        }
        this._workspaceEdit.documentChanges.push(operation);
        if (id !== undefined) {
          return id;
        }
      };
      WorkspaceChange2.prototype.deleteFile = function(uri, optionsOrAnnotation, options) {
        this.initDocumentChanges();
        if (this._workspaceEdit.documentChanges === undefined) {
          throw new Error("Workspace edit is not configured for document changes.");
        }
        var annotation;
        if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
          annotation = optionsOrAnnotation;
        } else {
          options = optionsOrAnnotation;
        }
        var operation;
        var id;
        if (annotation === undefined) {
          operation = DeleteFile.create(uri, options);
        } else {
          id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
          operation = DeleteFile.create(uri, options, id);
        }
        this._workspaceEdit.documentChanges.push(operation);
        if (id !== undefined) {
          return id;
        }
      };
      return WorkspaceChange2;
    }();
    exports2.WorkspaceChange = WorkspaceChange;
    var TextDocumentIdentifier;
    (function(TextDocumentIdentifier2) {
      function create(uri) {
        return { uri };
      }
      TextDocumentIdentifier2.create = create;
      function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri);
      }
      TextDocumentIdentifier2.is = is;
    })(TextDocumentIdentifier || (exports2.TextDocumentIdentifier = TextDocumentIdentifier = {}));
    var VersionedTextDocumentIdentifier;
    (function(VersionedTextDocumentIdentifier2) {
      function create(uri, version) {
        return { uri, version };
      }
      VersionedTextDocumentIdentifier2.create = create;
      function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && Is.integer(candidate.version);
      }
      VersionedTextDocumentIdentifier2.is = is;
    })(VersionedTextDocumentIdentifier || (exports2.VersionedTextDocumentIdentifier = VersionedTextDocumentIdentifier = {}));
    var OptionalVersionedTextDocumentIdentifier;
    (function(OptionalVersionedTextDocumentIdentifier2) {
      function create(uri, version) {
        return { uri, version };
      }
      OptionalVersionedTextDocumentIdentifier2.create = create;
      function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && (candidate.version === null || Is.integer(candidate.version));
      }
      OptionalVersionedTextDocumentIdentifier2.is = is;
    })(OptionalVersionedTextDocumentIdentifier || (exports2.OptionalVersionedTextDocumentIdentifier = OptionalVersionedTextDocumentIdentifier = {}));
    var TextDocumentItem;
    (function(TextDocumentItem2) {
      function create(uri, languageId, version, text) {
        return { uri, languageId, version, text };
      }
      TextDocumentItem2.create = create;
      function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && Is.string(candidate.languageId) && Is.integer(candidate.version) && Is.string(candidate.text);
      }
      TextDocumentItem2.is = is;
    })(TextDocumentItem || (exports2.TextDocumentItem = TextDocumentItem = {}));
    var MarkupKind;
    (function(MarkupKind2) {
      MarkupKind2.PlainText = "plaintext";
      MarkupKind2.Markdown = "markdown";
      function is(value) {
        var candidate = value;
        return candidate === MarkupKind2.PlainText || candidate === MarkupKind2.Markdown;
      }
      MarkupKind2.is = is;
    })(MarkupKind || (exports2.MarkupKind = MarkupKind = {}));
    var MarkupContent;
    (function(MarkupContent2) {
      function is(value) {
        var candidate = value;
        return Is.objectLiteral(value) && MarkupKind.is(candidate.kind) && Is.string(candidate.value);
      }
      MarkupContent2.is = is;
    })(MarkupContent || (exports2.MarkupContent = MarkupContent = {}));
    var CompletionItemKind;
    (function(CompletionItemKind2) {
      CompletionItemKind2.Text = 1;
      CompletionItemKind2.Method = 2;
      CompletionItemKind2.Function = 3;
      CompletionItemKind2.Constructor = 4;
      CompletionItemKind2.Field = 5;
      CompletionItemKind2.Variable = 6;
      CompletionItemKind2.Class = 7;
      CompletionItemKind2.Interface = 8;
      CompletionItemKind2.Module = 9;
      CompletionItemKind2.Property = 10;
      CompletionItemKind2.Unit = 11;
      CompletionItemKind2.Value = 12;
      CompletionItemKind2.Enum = 13;
      CompletionItemKind2.Keyword = 14;
      CompletionItemKind2.Snippet = 15;
      CompletionItemKind2.Color = 16;
      CompletionItemKind2.File = 17;
      CompletionItemKind2.Reference = 18;
      CompletionItemKind2.Folder = 19;
      CompletionItemKind2.EnumMember = 20;
      CompletionItemKind2.Constant = 21;
      CompletionItemKind2.Struct = 22;
      CompletionItemKind2.Event = 23;
      CompletionItemKind2.Operator = 24;
      CompletionItemKind2.TypeParameter = 25;
    })(CompletionItemKind || (exports2.CompletionItemKind = CompletionItemKind = {}));
    var InsertTextFormat;
    (function(InsertTextFormat2) {
      InsertTextFormat2.PlainText = 1;
      InsertTextFormat2.Snippet = 2;
    })(InsertTextFormat || (exports2.InsertTextFormat = InsertTextFormat = {}));
    var CompletionItemTag;
    (function(CompletionItemTag2) {
      CompletionItemTag2.Deprecated = 1;
    })(CompletionItemTag || (exports2.CompletionItemTag = CompletionItemTag = {}));
    var InsertReplaceEdit;
    (function(InsertReplaceEdit2) {
      function create(newText, insert, replace) {
        return { newText, insert, replace };
      }
      InsertReplaceEdit2.create = create;
      function is(value) {
        var candidate = value;
        return candidate && Is.string(candidate.newText) && Range.is(candidate.insert) && Range.is(candidate.replace);
      }
      InsertReplaceEdit2.is = is;
    })(InsertReplaceEdit || (exports2.InsertReplaceEdit = InsertReplaceEdit = {}));
    var InsertTextMode;
    (function(InsertTextMode2) {
      InsertTextMode2.asIs = 1;
      InsertTextMode2.adjustIndentation = 2;
    })(InsertTextMode || (exports2.InsertTextMode = InsertTextMode = {}));
    var CompletionItemLabelDetails;
    (function(CompletionItemLabelDetails2) {
      function is(value) {
        var candidate = value;
        return candidate && (Is.string(candidate.detail) || candidate.detail === undefined) && (Is.string(candidate.description) || candidate.description === undefined);
      }
      CompletionItemLabelDetails2.is = is;
    })(CompletionItemLabelDetails || (exports2.CompletionItemLabelDetails = CompletionItemLabelDetails = {}));
    var CompletionItem;
    (function(CompletionItem2) {
      function create(label) {
        return { label };
      }
      CompletionItem2.create = create;
    })(CompletionItem || (exports2.CompletionItem = CompletionItem = {}));
    var CompletionList;
    (function(CompletionList2) {
      function create(items, isIncomplete) {
        return { items: items ? items : [], isIncomplete: !!isIncomplete };
      }
      CompletionList2.create = create;
    })(CompletionList || (exports2.CompletionList = CompletionList = {}));
    var MarkedString;
    (function(MarkedString2) {
      function fromPlainText(plainText) {
        return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
      }
      MarkedString2.fromPlainText = fromPlainText;
      function is(value) {
        var candidate = value;
        return Is.string(candidate) || Is.objectLiteral(candidate) && Is.string(candidate.language) && Is.string(candidate.value);
      }
      MarkedString2.is = is;
    })(MarkedString || (exports2.MarkedString = MarkedString = {}));
    var Hover;
    (function(Hover2) {
      function is(value) {
        var candidate = value;
        return !!candidate && Is.objectLiteral(candidate) && (MarkupContent.is(candidate.contents) || MarkedString.is(candidate.contents) || Is.typedArray(candidate.contents, MarkedString.is)) && (value.range === undefined || Range.is(value.range));
      }
      Hover2.is = is;
    })(Hover || (exports2.Hover = Hover = {}));
    var ParameterInformation;
    (function(ParameterInformation2) {
      function create(label, documentation) {
        return documentation ? { label, documentation } : { label };
      }
      ParameterInformation2.create = create;
    })(ParameterInformation || (exports2.ParameterInformation = ParameterInformation = {}));
    var SignatureInformation;
    (function(SignatureInformation2) {
      function create(label, documentation) {
        var parameters = [];
        for (var _i = 2;_i < arguments.length; _i++) {
          parameters[_i - 2] = arguments[_i];
        }
        var result = { label };
        if (Is.defined(documentation)) {
          result.documentation = documentation;
        }
        if (Is.defined(parameters)) {
          result.parameters = parameters;
        } else {
          result.parameters = [];
        }
        return result;
      }
      SignatureInformation2.create = create;
    })(SignatureInformation || (exports2.SignatureInformation = SignatureInformation = {}));
    var DocumentHighlightKind;
    (function(DocumentHighlightKind2) {
      DocumentHighlightKind2.Text = 1;
      DocumentHighlightKind2.Read = 2;
      DocumentHighlightKind2.Write = 3;
    })(DocumentHighlightKind || (exports2.DocumentHighlightKind = DocumentHighlightKind = {}));
    var DocumentHighlight;
    (function(DocumentHighlight2) {
      function create(range, kind) {
        var result = { range };
        if (Is.number(kind)) {
          result.kind = kind;
        }
        return result;
      }
      DocumentHighlight2.create = create;
    })(DocumentHighlight || (exports2.DocumentHighlight = DocumentHighlight = {}));
    var SymbolKind;
    (function(SymbolKind2) {
      SymbolKind2.File = 1;
      SymbolKind2.Module = 2;
      SymbolKind2.Namespace = 3;
      SymbolKind2.Package = 4;
      SymbolKind2.Class = 5;
      SymbolKind2.Method = 6;
      SymbolKind2.Property = 7;
      SymbolKind2.Field = 8;
      SymbolKind2.Constructor = 9;
      SymbolKind2.Enum = 10;
      SymbolKind2.Interface = 11;
      SymbolKind2.Function = 12;
      SymbolKind2.Variable = 13;
      SymbolKind2.Constant = 14;
      SymbolKind2.String = 15;
      SymbolKind2.Number = 16;
      SymbolKind2.Boolean = 17;
      SymbolKind2.Array = 18;
      SymbolKind2.Object = 19;
      SymbolKind2.Key = 20;
      SymbolKind2.Null = 21;
      SymbolKind2.EnumMember = 22;
      SymbolKind2.Struct = 23;
      SymbolKind2.Event = 24;
      SymbolKind2.Operator = 25;
      SymbolKind2.TypeParameter = 26;
    })(SymbolKind || (exports2.SymbolKind = SymbolKind = {}));
    var SymbolTag;
    (function(SymbolTag2) {
      SymbolTag2.Deprecated = 1;
    })(SymbolTag || (exports2.SymbolTag = SymbolTag = {}));
    var SymbolInformation;
    (function(SymbolInformation2) {
      function create(name, kind, range, uri, containerName) {
        var result = {
          name,
          kind,
          location: { uri, range }
        };
        if (containerName) {
          result.containerName = containerName;
        }
        return result;
      }
      SymbolInformation2.create = create;
    })(SymbolInformation || (exports2.SymbolInformation = SymbolInformation = {}));
    var WorkspaceSymbol;
    (function(WorkspaceSymbol2) {
      function create(name, kind, uri, range) {
        return range !== undefined ? { name, kind, location: { uri, range } } : { name, kind, location: { uri } };
      }
      WorkspaceSymbol2.create = create;
    })(WorkspaceSymbol || (exports2.WorkspaceSymbol = WorkspaceSymbol = {}));
    var DocumentSymbol;
    (function(DocumentSymbol2) {
      function create(name, detail, kind, range, selectionRange, children) {
        var result = {
          name,
          detail,
          kind,
          range,
          selectionRange
        };
        if (children !== undefined) {
          result.children = children;
        }
        return result;
      }
      DocumentSymbol2.create = create;
      function is(value) {
        var candidate = value;
        return candidate && Is.string(candidate.name) && Is.number(candidate.kind) && Range.is(candidate.range) && Range.is(candidate.selectionRange) && (candidate.detail === undefined || Is.string(candidate.detail)) && (candidate.deprecated === undefined || Is.boolean(candidate.deprecated)) && (candidate.children === undefined || Array.isArray(candidate.children)) && (candidate.tags === undefined || Array.isArray(candidate.tags));
      }
      DocumentSymbol2.is = is;
    })(DocumentSymbol || (exports2.DocumentSymbol = DocumentSymbol = {}));
    var CodeActionKind;
    (function(CodeActionKind2) {
      CodeActionKind2.Empty = "";
      CodeActionKind2.QuickFix = "quickfix";
      CodeActionKind2.Refactor = "refactor";
      CodeActionKind2.RefactorExtract = "refactor.extract";
      CodeActionKind2.RefactorInline = "refactor.inline";
      CodeActionKind2.RefactorRewrite = "refactor.rewrite";
      CodeActionKind2.Source = "source";
      CodeActionKind2.SourceOrganizeImports = "source.organizeImports";
      CodeActionKind2.SourceFixAll = "source.fixAll";
    })(CodeActionKind || (exports2.CodeActionKind = CodeActionKind = {}));
    var CodeActionTriggerKind;
    (function(CodeActionTriggerKind2) {
      CodeActionTriggerKind2.Invoked = 1;
      CodeActionTriggerKind2.Automatic = 2;
    })(CodeActionTriggerKind || (exports2.CodeActionTriggerKind = CodeActionTriggerKind = {}));
    var CodeActionContext;
    (function(CodeActionContext2) {
      function create(diagnostics, only, triggerKind) {
        var result = { diagnostics };
        if (only !== undefined && only !== null) {
          result.only = only;
        }
        if (triggerKind !== undefined && triggerKind !== null) {
          result.triggerKind = triggerKind;
        }
        return result;
      }
      CodeActionContext2.create = create;
      function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.typedArray(candidate.diagnostics, Diagnostic.is) && (candidate.only === undefined || Is.typedArray(candidate.only, Is.string)) && (candidate.triggerKind === undefined || candidate.triggerKind === CodeActionTriggerKind.Invoked || candidate.triggerKind === CodeActionTriggerKind.Automatic);
      }
      CodeActionContext2.is = is;
    })(CodeActionContext || (exports2.CodeActionContext = CodeActionContext = {}));
    var CodeAction;
    (function(CodeAction2) {
      function create(title, kindOrCommandOrEdit, kind) {
        var result = { title };
        var checkKind = true;
        if (typeof kindOrCommandOrEdit === "string") {
          checkKind = false;
          result.kind = kindOrCommandOrEdit;
        } else if (Command.is(kindOrCommandOrEdit)) {
          result.command = kindOrCommandOrEdit;
        } else {
          result.edit = kindOrCommandOrEdit;
        }
        if (checkKind && kind !== undefined) {
          result.kind = kind;
        }
        return result;
      }
      CodeAction2.create = create;
      function is(value) {
        var candidate = value;
        return candidate && Is.string(candidate.title) && (candidate.diagnostics === undefined || Is.typedArray(candidate.diagnostics, Diagnostic.is)) && (candidate.kind === undefined || Is.string(candidate.kind)) && (candidate.edit !== undefined || candidate.command !== undefined) && (candidate.command === undefined || Command.is(candidate.command)) && (candidate.isPreferred === undefined || Is.boolean(candidate.isPreferred)) && (candidate.edit === undefined || WorkspaceEdit.is(candidate.edit));
      }
      CodeAction2.is = is;
    })(CodeAction || (exports2.CodeAction = CodeAction = {}));
    var CodeLens;
    (function(CodeLens2) {
      function create(range, data) {
        var result = { range };
        if (Is.defined(data)) {
          result.data = data;
        }
        return result;
      }
      CodeLens2.create = create;
      function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.command) || Command.is(candidate.command));
      }
      CodeLens2.is = is;
    })(CodeLens || (exports2.CodeLens = CodeLens = {}));
    var FormattingOptions;
    (function(FormattingOptions2) {
      function create(tabSize, insertSpaces) {
        return { tabSize, insertSpaces };
      }
      FormattingOptions2.create = create;
      function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.uinteger(candidate.tabSize) && Is.boolean(candidate.insertSpaces);
      }
      FormattingOptions2.is = is;
    })(FormattingOptions || (exports2.FormattingOptions = FormattingOptions = {}));
    var DocumentLink;
    (function(DocumentLink2) {
      function create(range, target, data) {
        return { range, target, data };
      }
      DocumentLink2.create = create;
      function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.target) || Is.string(candidate.target));
      }
      DocumentLink2.is = is;
    })(DocumentLink || (exports2.DocumentLink = DocumentLink = {}));
    var SelectionRange;
    (function(SelectionRange2) {
      function create(range, parent) {
        return { range, parent };
      }
      SelectionRange2.create = create;
      function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Range.is(candidate.range) && (candidate.parent === undefined || SelectionRange2.is(candidate.parent));
      }
      SelectionRange2.is = is;
    })(SelectionRange || (exports2.SelectionRange = SelectionRange = {}));
    var SemanticTokenTypes;
    (function(SemanticTokenTypes2) {
      SemanticTokenTypes2["namespace"] = "namespace";
      SemanticTokenTypes2["type"] = "type";
      SemanticTokenTypes2["class"] = "class";
      SemanticTokenTypes2["enum"] = "enum";
      SemanticTokenTypes2["interface"] = "interface";
      SemanticTokenTypes2["struct"] = "struct";
      SemanticTokenTypes2["typeParameter"] = "typeParameter";
      SemanticTokenTypes2["parameter"] = "parameter";
      SemanticTokenTypes2["variable"] = "variable";
      SemanticTokenTypes2["property"] = "property";
      SemanticTokenTypes2["enumMember"] = "enumMember";
      SemanticTokenTypes2["event"] = "event";
      SemanticTokenTypes2["function"] = "function";
      SemanticTokenTypes2["method"] = "method";
      SemanticTokenTypes2["macro"] = "macro";
      SemanticTokenTypes2["keyword"] = "keyword";
      SemanticTokenTypes2["modifier"] = "modifier";
      SemanticTokenTypes2["comment"] = "comment";
      SemanticTokenTypes2["string"] = "string";
      SemanticTokenTypes2["number"] = "number";
      SemanticTokenTypes2["regexp"] = "regexp";
      SemanticTokenTypes2["operator"] = "operator";
      SemanticTokenTypes2["decorator"] = "decorator";
    })(SemanticTokenTypes || (exports2.SemanticTokenTypes = SemanticTokenTypes = {}));
    var SemanticTokenModifiers;
    (function(SemanticTokenModifiers2) {
      SemanticTokenModifiers2["declaration"] = "declaration";
      SemanticTokenModifiers2["definition"] = "definition";
      SemanticTokenModifiers2["readonly"] = "readonly";
      SemanticTokenModifiers2["static"] = "static";
      SemanticTokenModifiers2["deprecated"] = "deprecated";
      SemanticTokenModifiers2["abstract"] = "abstract";
      SemanticTokenModifiers2["async"] = "async";
      SemanticTokenModifiers2["modification"] = "modification";
      SemanticTokenModifiers2["documentation"] = "documentation";
      SemanticTokenModifiers2["defaultLibrary"] = "defaultLibrary";
    })(SemanticTokenModifiers || (exports2.SemanticTokenModifiers = SemanticTokenModifiers = {}));
    var SemanticTokens;
    (function(SemanticTokens2) {
      function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && (candidate.resultId === undefined || typeof candidate.resultId === "string") && Array.isArray(candidate.data) && (candidate.data.length === 0 || typeof candidate.data[0] === "number");
      }
      SemanticTokens2.is = is;
    })(SemanticTokens || (exports2.SemanticTokens = SemanticTokens = {}));
    var InlineValueText;
    (function(InlineValueText2) {
      function create(range, text) {
        return { range, text };
      }
      InlineValueText2.create = create;
      function is(value) {
        var candidate = value;
        return candidate !== undefined && candidate !== null && Range.is(candidate.range) && Is.string(candidate.text);
      }
      InlineValueText2.is = is;
    })(InlineValueText || (exports2.InlineValueText = InlineValueText = {}));
    var InlineValueVariableLookup;
    (function(InlineValueVariableLookup2) {
      function create(range, variableName, caseSensitiveLookup) {
        return { range, variableName, caseSensitiveLookup };
      }
      InlineValueVariableLookup2.create = create;
      function is(value) {
        var candidate = value;
        return candidate !== undefined && candidate !== null && Range.is(candidate.range) && Is.boolean(candidate.caseSensitiveLookup) && (Is.string(candidate.variableName) || candidate.variableName === undefined);
      }
      InlineValueVariableLookup2.is = is;
    })(InlineValueVariableLookup || (exports2.InlineValueVariableLookup = InlineValueVariableLookup = {}));
    var InlineValueEvaluatableExpression;
    (function(InlineValueEvaluatableExpression2) {
      function create(range, expression) {
        return { range, expression };
      }
      InlineValueEvaluatableExpression2.create = create;
      function is(value) {
        var candidate = value;
        return candidate !== undefined && candidate !== null && Range.is(candidate.range) && (Is.string(candidate.expression) || candidate.expression === undefined);
      }
      InlineValueEvaluatableExpression2.is = is;
    })(InlineValueEvaluatableExpression || (exports2.InlineValueEvaluatableExpression = InlineValueEvaluatableExpression = {}));
    var InlineValueContext;
    (function(InlineValueContext2) {
      function create(frameId, stoppedLocation) {
        return { frameId, stoppedLocation };
      }
      InlineValueContext2.create = create;
      function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(value.stoppedLocation);
      }
      InlineValueContext2.is = is;
    })(InlineValueContext || (exports2.InlineValueContext = InlineValueContext = {}));
    var InlayHintKind;
    (function(InlayHintKind2) {
      InlayHintKind2.Type = 1;
      InlayHintKind2.Parameter = 2;
      function is(value) {
        return value === 1 || value === 2;
      }
      InlayHintKind2.is = is;
    })(InlayHintKind || (exports2.InlayHintKind = InlayHintKind = {}));
    var InlayHintLabelPart;
    (function(InlayHintLabelPart2) {
      function create(value) {
        return { value };
      }
      InlayHintLabelPart2.create = create;
      function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && (candidate.tooltip === undefined || Is.string(candidate.tooltip) || MarkupContent.is(candidate.tooltip)) && (candidate.location === undefined || Location.is(candidate.location)) && (candidate.command === undefined || Command.is(candidate.command));
      }
      InlayHintLabelPart2.is = is;
    })(InlayHintLabelPart || (exports2.InlayHintLabelPart = InlayHintLabelPart = {}));
    var InlayHint;
    (function(InlayHint2) {
      function create(position, label, kind) {
        var result = { position, label };
        if (kind !== undefined) {
          result.kind = kind;
        }
        return result;
      }
      InlayHint2.create = create;
      function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Position.is(candidate.position) && (Is.string(candidate.label) || Is.typedArray(candidate.label, InlayHintLabelPart.is)) && (candidate.kind === undefined || InlayHintKind.is(candidate.kind)) && candidate.textEdits === undefined || Is.typedArray(candidate.textEdits, TextEdit.is) && (candidate.tooltip === undefined || Is.string(candidate.tooltip) || MarkupContent.is(candidate.tooltip)) && (candidate.paddingLeft === undefined || Is.boolean(candidate.paddingLeft)) && (candidate.paddingRight === undefined || Is.boolean(candidate.paddingRight));
      }
      InlayHint2.is = is;
    })(InlayHint || (exports2.InlayHint = InlayHint = {}));
    var StringValue;
    (function(StringValue2) {
      function createSnippet(value) {
        return { kind: "snippet", value };
      }
      StringValue2.createSnippet = createSnippet;
    })(StringValue || (exports2.StringValue = StringValue = {}));
    var InlineCompletionItem;
    (function(InlineCompletionItem2) {
      function create(insertText, filterText, range, command) {
        return { insertText, filterText, range, command };
      }
      InlineCompletionItem2.create = create;
    })(InlineCompletionItem || (exports2.InlineCompletionItem = InlineCompletionItem = {}));
    var InlineCompletionList;
    (function(InlineCompletionList2) {
      function create(items) {
        return { items };
      }
      InlineCompletionList2.create = create;
    })(InlineCompletionList || (exports2.InlineCompletionList = InlineCompletionList = {}));
    var InlineCompletionTriggerKind;
    (function(InlineCompletionTriggerKind2) {
      InlineCompletionTriggerKind2.Invoked = 0;
      InlineCompletionTriggerKind2.Automatic = 1;
    })(InlineCompletionTriggerKind || (exports2.InlineCompletionTriggerKind = InlineCompletionTriggerKind = {}));
    var SelectedCompletionInfo;
    (function(SelectedCompletionInfo2) {
      function create(range, text) {
        return { range, text };
      }
      SelectedCompletionInfo2.create = create;
    })(SelectedCompletionInfo || (exports2.SelectedCompletionInfo = SelectedCompletionInfo = {}));
    var InlineCompletionContext;
    (function(InlineCompletionContext2) {
      function create(triggerKind, selectedCompletionInfo) {
        return { triggerKind, selectedCompletionInfo };
      }
      InlineCompletionContext2.create = create;
    })(InlineCompletionContext || (exports2.InlineCompletionContext = InlineCompletionContext = {}));
    var WorkspaceFolder;
    (function(WorkspaceFolder2) {
      function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && URI.is(candidate.uri) && Is.string(candidate.name);
      }
      WorkspaceFolder2.is = is;
    })(WorkspaceFolder || (exports2.WorkspaceFolder = WorkspaceFolder = {}));
    exports2.EOL = [`
`, `\r
`, "\r"];
    var TextDocument;
    (function(TextDocument2) {
      function create(uri, languageId, version, content) {
        return new FullTextDocument(uri, languageId, version, content);
      }
      TextDocument2.create = create;
      function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && (Is.undefined(candidate.languageId) || Is.string(candidate.languageId)) && Is.uinteger(candidate.lineCount) && Is.func(candidate.getText) && Is.func(candidate.positionAt) && Is.func(candidate.offsetAt) ? true : false;
      }
      TextDocument2.is = is;
      function applyEdits(document, edits) {
        var text = document.getText();
        var sortedEdits = mergeSort(edits, function(a, b) {
          var diff = a.range.start.line - b.range.start.line;
          if (diff === 0) {
            return a.range.start.character - b.range.start.character;
          }
          return diff;
        });
        var lastModifiedOffset = text.length;
        for (var i = sortedEdits.length - 1;i >= 0; i--) {
          var e = sortedEdits[i];
          var startOffset = document.offsetAt(e.range.start);
          var endOffset = document.offsetAt(e.range.end);
          if (endOffset <= lastModifiedOffset) {
            text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
          } else {
            throw new Error("Overlapping edit");
          }
          lastModifiedOffset = startOffset;
        }
        return text;
      }
      TextDocument2.applyEdits = applyEdits;
      function mergeSort(data, compare) {
        if (data.length <= 1) {
          return data;
        }
        var p = data.length / 2 | 0;
        var left = data.slice(0, p);
        var right = data.slice(p);
        mergeSort(left, compare);
        mergeSort(right, compare);
        var leftIdx = 0;
        var rightIdx = 0;
        var i = 0;
        while (leftIdx < left.length && rightIdx < right.length) {
          var ret = compare(left[leftIdx], right[rightIdx]);
          if (ret <= 0) {
            data[i++] = left[leftIdx++];
          } else {
            data[i++] = right[rightIdx++];
          }
        }
        while (leftIdx < left.length) {
          data[i++] = left[leftIdx++];
        }
        while (rightIdx < right.length) {
          data[i++] = right[rightIdx++];
        }
        return data;
      }
    })(TextDocument || (exports2.TextDocument = TextDocument = {}));
    var FullTextDocument = function() {
      function FullTextDocument2(uri, languageId, version, content) {
        this._uri = uri;
        this._languageId = languageId;
        this._version = version;
        this._content = content;
        this._lineOffsets = undefined;
      }
      Object.defineProperty(FullTextDocument2.prototype, "uri", {
        get: function() {
          return this._uri;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(FullTextDocument2.prototype, "languageId", {
        get: function() {
          return this._languageId;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(FullTextDocument2.prototype, "version", {
        get: function() {
          return this._version;
        },
        enumerable: false,
        configurable: true
      });
      FullTextDocument2.prototype.getText = function(range) {
        if (range) {
          var start = this.offsetAt(range.start);
          var end = this.offsetAt(range.end);
          return this._content.substring(start, end);
        }
        return this._content;
      };
      FullTextDocument2.prototype.update = function(event, version) {
        this._content = event.text;
        this._version = version;
        this._lineOffsets = undefined;
      };
      FullTextDocument2.prototype.getLineOffsets = function() {
        if (this._lineOffsets === undefined) {
          var lineOffsets = [];
          var text = this._content;
          var isLineStart = true;
          for (var i = 0;i < text.length; i++) {
            if (isLineStart) {
              lineOffsets.push(i);
              isLineStart = false;
            }
            var ch = text.charAt(i);
            isLineStart = ch === "\r" || ch === `
`;
            if (ch === "\r" && i + 1 < text.length && text.charAt(i + 1) === `
`) {
              i++;
            }
          }
          if (isLineStart && text.length > 0) {
            lineOffsets.push(text.length);
          }
          this._lineOffsets = lineOffsets;
        }
        return this._lineOffsets;
      };
      FullTextDocument2.prototype.positionAt = function(offset) {
        offset = Math.max(Math.min(offset, this._content.length), 0);
        var lineOffsets = this.getLineOffsets();
        var low = 0, high = lineOffsets.length;
        if (high === 0) {
          return Position.create(0, offset);
        }
        while (low < high) {
          var mid = Math.floor((low + high) / 2);
          if (lineOffsets[mid] > offset) {
            high = mid;
          } else {
            low = mid + 1;
          }
        }
        var line = low - 1;
        return Position.create(line, offset - lineOffsets[line]);
      };
      FullTextDocument2.prototype.offsetAt = function(position) {
        var lineOffsets = this.getLineOffsets();
        if (position.line >= lineOffsets.length) {
          return this._content.length;
        } else if (position.line < 0) {
          return 0;
        }
        var lineOffset = lineOffsets[position.line];
        var nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
        return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
      };
      Object.defineProperty(FullTextDocument2.prototype, "lineCount", {
        get: function() {
          return this.getLineOffsets().length;
        },
        enumerable: false,
        configurable: true
      });
      return FullTextDocument2;
    }();
    var Is;
    (function(Is2) {
      var toString = Object.prototype.toString;
      function defined(value) {
        return typeof value !== "undefined";
      }
      Is2.defined = defined;
      function undefined2(value) {
        return typeof value === "undefined";
      }
      Is2.undefined = undefined2;
      function boolean(value) {
        return value === true || value === false;
      }
      Is2.boolean = boolean;
      function string(value) {
        return toString.call(value) === "[object String]";
      }
      Is2.string = string;
      function number(value) {
        return toString.call(value) === "[object Number]";
      }
      Is2.number = number;
      function numberRange(value, min, max) {
        return toString.call(value) === "[object Number]" && min <= value && value <= max;
      }
      Is2.numberRange = numberRange;
      function integer2(value) {
        return toString.call(value) === "[object Number]" && -2147483648 <= value && value <= 2147483647;
      }
      Is2.integer = integer2;
      function uinteger2(value) {
        return toString.call(value) === "[object Number]" && 0 <= value && value <= 2147483647;
      }
      Is2.uinteger = uinteger2;
      function func(value) {
        return toString.call(value) === "[object Function]";
      }
      Is2.func = func;
      function objectLiteral(value) {
        return value !== null && typeof value === "object";
      }
      Is2.objectLiteral = objectLiteral;
      function typedArray(value, check) {
        return Array.isArray(value) && value.every(check);
      }
      Is2.typedArray = typedArray;
    })(Is || (Is = {}));
  });
});

// node_modules/vscode-languageserver-protocol/lib/common/messages.js
var require_messages2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ProtocolNotificationType = exports.ProtocolNotificationType0 = exports.ProtocolRequestType = exports.ProtocolRequestType0 = exports.RegistrationType = exports.MessageDirection = undefined;
  var vscode_jsonrpc_1 = require_main();
  var MessageDirection;
  (function(MessageDirection2) {
    MessageDirection2["clientToServer"] = "clientToServer";
    MessageDirection2["serverToClient"] = "serverToClient";
    MessageDirection2["both"] = "both";
  })(MessageDirection || (exports.MessageDirection = MessageDirection = {}));

  class RegistrationType {
    constructor(method) {
      this.method = method;
    }
  }
  exports.RegistrationType = RegistrationType;

  class ProtocolRequestType0 extends vscode_jsonrpc_1.RequestType0 {
    constructor(method) {
      super(method);
    }
  }
  exports.ProtocolRequestType0 = ProtocolRequestType0;

  class ProtocolRequestType extends vscode_jsonrpc_1.RequestType {
    constructor(method) {
      super(method, vscode_jsonrpc_1.ParameterStructures.byName);
    }
  }
  exports.ProtocolRequestType = ProtocolRequestType;

  class ProtocolNotificationType0 extends vscode_jsonrpc_1.NotificationType0 {
    constructor(method) {
      super(method);
    }
  }
  exports.ProtocolNotificationType0 = ProtocolNotificationType0;

  class ProtocolNotificationType extends vscode_jsonrpc_1.NotificationType {
    constructor(method) {
      super(method, vscode_jsonrpc_1.ParameterStructures.byName);
    }
  }
  exports.ProtocolNotificationType = ProtocolNotificationType;
});

// node_modules/vscode-languageserver-protocol/lib/common/utils/is.js
var require_is3 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.objectLiteral = exports.typedArray = exports.stringArray = exports.array = exports.func = exports.error = exports.number = exports.string = exports.boolean = undefined;
  function boolean(value) {
    return value === true || value === false;
  }
  exports.boolean = boolean;
  function string(value) {
    return typeof value === "string" || value instanceof String;
  }
  exports.string = string;
  function number(value) {
    return typeof value === "number" || value instanceof Number;
  }
  exports.number = number;
  function error(value) {
    return value instanceof Error;
  }
  exports.error = error;
  function func(value) {
    return typeof value === "function";
  }
  exports.func = func;
  function array(value) {
    return Array.isArray(value);
  }
  exports.array = array;
  function stringArray(value) {
    return array(value) && value.every((elem) => string(elem));
  }
  exports.stringArray = stringArray;
  function typedArray(value, check) {
    return Array.isArray(value) && value.every(check);
  }
  exports.typedArray = typedArray;
  function objectLiteral(value) {
    return value !== null && typeof value === "object";
  }
  exports.objectLiteral = objectLiteral;
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.implementation.js
var require_protocol_implementation = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ImplementationRequest = undefined;
  var messages_1 = require_messages2();
  var ImplementationRequest;
  (function(ImplementationRequest2) {
    ImplementationRequest2.method = "textDocument/implementation";
    ImplementationRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    ImplementationRequest2.type = new messages_1.ProtocolRequestType(ImplementationRequest2.method);
  })(ImplementationRequest || (exports.ImplementationRequest = ImplementationRequest = {}));
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.typeDefinition.js
var require_protocol_typeDefinition = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TypeDefinitionRequest = undefined;
  var messages_1 = require_messages2();
  var TypeDefinitionRequest;
  (function(TypeDefinitionRequest2) {
    TypeDefinitionRequest2.method = "textDocument/typeDefinition";
    TypeDefinitionRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    TypeDefinitionRequest2.type = new messages_1.ProtocolRequestType(TypeDefinitionRequest2.method);
  })(TypeDefinitionRequest || (exports.TypeDefinitionRequest = TypeDefinitionRequest = {}));
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.workspaceFolder.js
var require_protocol_workspaceFolder = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DidChangeWorkspaceFoldersNotification = exports.WorkspaceFoldersRequest = undefined;
  var messages_1 = require_messages2();
  var WorkspaceFoldersRequest;
  (function(WorkspaceFoldersRequest2) {
    WorkspaceFoldersRequest2.method = "workspace/workspaceFolders";
    WorkspaceFoldersRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
    WorkspaceFoldersRequest2.type = new messages_1.ProtocolRequestType0(WorkspaceFoldersRequest2.method);
  })(WorkspaceFoldersRequest || (exports.WorkspaceFoldersRequest = WorkspaceFoldersRequest = {}));
  var DidChangeWorkspaceFoldersNotification;
  (function(DidChangeWorkspaceFoldersNotification2) {
    DidChangeWorkspaceFoldersNotification2.method = "workspace/didChangeWorkspaceFolders";
    DidChangeWorkspaceFoldersNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
    DidChangeWorkspaceFoldersNotification2.type = new messages_1.ProtocolNotificationType(DidChangeWorkspaceFoldersNotification2.method);
  })(DidChangeWorkspaceFoldersNotification || (exports.DidChangeWorkspaceFoldersNotification = DidChangeWorkspaceFoldersNotification = {}));
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.configuration.js
var require_protocol_configuration = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ConfigurationRequest = undefined;
  var messages_1 = require_messages2();
  var ConfigurationRequest;
  (function(ConfigurationRequest2) {
    ConfigurationRequest2.method = "workspace/configuration";
    ConfigurationRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
    ConfigurationRequest2.type = new messages_1.ProtocolRequestType(ConfigurationRequest2.method);
  })(ConfigurationRequest || (exports.ConfigurationRequest = ConfigurationRequest = {}));
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.colorProvider.js
var require_protocol_colorProvider = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ColorPresentationRequest = exports.DocumentColorRequest = undefined;
  var messages_1 = require_messages2();
  var DocumentColorRequest;
  (function(DocumentColorRequest2) {
    DocumentColorRequest2.method = "textDocument/documentColor";
    DocumentColorRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentColorRequest2.type = new messages_1.ProtocolRequestType(DocumentColorRequest2.method);
  })(DocumentColorRequest || (exports.DocumentColorRequest = DocumentColorRequest = {}));
  var ColorPresentationRequest;
  (function(ColorPresentationRequest2) {
    ColorPresentationRequest2.method = "textDocument/colorPresentation";
    ColorPresentationRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    ColorPresentationRequest2.type = new messages_1.ProtocolRequestType(ColorPresentationRequest2.method);
  })(ColorPresentationRequest || (exports.ColorPresentationRequest = ColorPresentationRequest = {}));
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.foldingRange.js
var require_protocol_foldingRange = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.FoldingRangeRefreshRequest = exports.FoldingRangeRequest = undefined;
  var messages_1 = require_messages2();
  var FoldingRangeRequest;
  (function(FoldingRangeRequest2) {
    FoldingRangeRequest2.method = "textDocument/foldingRange";
    FoldingRangeRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    FoldingRangeRequest2.type = new messages_1.ProtocolRequestType(FoldingRangeRequest2.method);
  })(FoldingRangeRequest || (exports.FoldingRangeRequest = FoldingRangeRequest = {}));
  var FoldingRangeRefreshRequest;
  (function(FoldingRangeRefreshRequest2) {
    FoldingRangeRefreshRequest2.method = `workspace/foldingRange/refresh`;
    FoldingRangeRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
    FoldingRangeRefreshRequest2.type = new messages_1.ProtocolRequestType0(FoldingRangeRefreshRequest2.method);
  })(FoldingRangeRefreshRequest || (exports.FoldingRangeRefreshRequest = FoldingRangeRefreshRequest = {}));
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.declaration.js
var require_protocol_declaration = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DeclarationRequest = undefined;
  var messages_1 = require_messages2();
  var DeclarationRequest;
  (function(DeclarationRequest2) {
    DeclarationRequest2.method = "textDocument/declaration";
    DeclarationRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    DeclarationRequest2.type = new messages_1.ProtocolRequestType(DeclarationRequest2.method);
  })(DeclarationRequest || (exports.DeclarationRequest = DeclarationRequest = {}));
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.selectionRange.js
var require_protocol_selectionRange = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.SelectionRangeRequest = undefined;
  var messages_1 = require_messages2();
  var SelectionRangeRequest;
  (function(SelectionRangeRequest2) {
    SelectionRangeRequest2.method = "textDocument/selectionRange";
    SelectionRangeRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    SelectionRangeRequest2.type = new messages_1.ProtocolRequestType(SelectionRangeRequest2.method);
  })(SelectionRangeRequest || (exports.SelectionRangeRequest = SelectionRangeRequest = {}));
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.progress.js
var require_protocol_progress = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.WorkDoneProgressCancelNotification = exports.WorkDoneProgressCreateRequest = exports.WorkDoneProgress = undefined;
  var vscode_jsonrpc_1 = require_main();
  var messages_1 = require_messages2();
  var WorkDoneProgress;
  (function(WorkDoneProgress2) {
    WorkDoneProgress2.type = new vscode_jsonrpc_1.ProgressType;
    function is(value) {
      return value === WorkDoneProgress2.type;
    }
    WorkDoneProgress2.is = is;
  })(WorkDoneProgress || (exports.WorkDoneProgress = WorkDoneProgress = {}));
  var WorkDoneProgressCreateRequest;
  (function(WorkDoneProgressCreateRequest2) {
    WorkDoneProgressCreateRequest2.method = "window/workDoneProgress/create";
    WorkDoneProgressCreateRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
    WorkDoneProgressCreateRequest2.type = new messages_1.ProtocolRequestType(WorkDoneProgressCreateRequest2.method);
  })(WorkDoneProgressCreateRequest || (exports.WorkDoneProgressCreateRequest = WorkDoneProgressCreateRequest = {}));
  var WorkDoneProgressCancelNotification;
  (function(WorkDoneProgressCancelNotification2) {
    WorkDoneProgressCancelNotification2.method = "window/workDoneProgress/cancel";
    WorkDoneProgressCancelNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
    WorkDoneProgressCancelNotification2.type = new messages_1.ProtocolNotificationType(WorkDoneProgressCancelNotification2.method);
  })(WorkDoneProgressCancelNotification || (exports.WorkDoneProgressCancelNotification = WorkDoneProgressCancelNotification = {}));
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.callHierarchy.js
var require_protocol_callHierarchy = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.CallHierarchyOutgoingCallsRequest = exports.CallHierarchyIncomingCallsRequest = exports.CallHierarchyPrepareRequest = undefined;
  var messages_1 = require_messages2();
  var CallHierarchyPrepareRequest;
  (function(CallHierarchyPrepareRequest2) {
    CallHierarchyPrepareRequest2.method = "textDocument/prepareCallHierarchy";
    CallHierarchyPrepareRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    CallHierarchyPrepareRequest2.type = new messages_1.ProtocolRequestType(CallHierarchyPrepareRequest2.method);
  })(CallHierarchyPrepareRequest || (exports.CallHierarchyPrepareRequest = CallHierarchyPrepareRequest = {}));
  var CallHierarchyIncomingCallsRequest;
  (function(CallHierarchyIncomingCallsRequest2) {
    CallHierarchyIncomingCallsRequest2.method = "callHierarchy/incomingCalls";
    CallHierarchyIncomingCallsRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    CallHierarchyIncomingCallsRequest2.type = new messages_1.ProtocolRequestType(CallHierarchyIncomingCallsRequest2.method);
  })(CallHierarchyIncomingCallsRequest || (exports.CallHierarchyIncomingCallsRequest = CallHierarchyIncomingCallsRequest = {}));
  var CallHierarchyOutgoingCallsRequest;
  (function(CallHierarchyOutgoingCallsRequest2) {
    CallHierarchyOutgoingCallsRequest2.method = "callHierarchy/outgoingCalls";
    CallHierarchyOutgoingCallsRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    CallHierarchyOutgoingCallsRequest2.type = new messages_1.ProtocolRequestType(CallHierarchyOutgoingCallsRequest2.method);
  })(CallHierarchyOutgoingCallsRequest || (exports.CallHierarchyOutgoingCallsRequest = CallHierarchyOutgoingCallsRequest = {}));
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.semanticTokens.js
var require_protocol_semanticTokens = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.SemanticTokensRefreshRequest = exports.SemanticTokensRangeRequest = exports.SemanticTokensDeltaRequest = exports.SemanticTokensRequest = exports.SemanticTokensRegistrationType = exports.TokenFormat = undefined;
  var messages_1 = require_messages2();
  var TokenFormat;
  (function(TokenFormat2) {
    TokenFormat2.Relative = "relative";
  })(TokenFormat || (exports.TokenFormat = TokenFormat = {}));
  var SemanticTokensRegistrationType;
  (function(SemanticTokensRegistrationType2) {
    SemanticTokensRegistrationType2.method = "textDocument/semanticTokens";
    SemanticTokensRegistrationType2.type = new messages_1.RegistrationType(SemanticTokensRegistrationType2.method);
  })(SemanticTokensRegistrationType || (exports.SemanticTokensRegistrationType = SemanticTokensRegistrationType = {}));
  var SemanticTokensRequest;
  (function(SemanticTokensRequest2) {
    SemanticTokensRequest2.method = "textDocument/semanticTokens/full";
    SemanticTokensRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    SemanticTokensRequest2.type = new messages_1.ProtocolRequestType(SemanticTokensRequest2.method);
    SemanticTokensRequest2.registrationMethod = SemanticTokensRegistrationType.method;
  })(SemanticTokensRequest || (exports.SemanticTokensRequest = SemanticTokensRequest = {}));
  var SemanticTokensDeltaRequest;
  (function(SemanticTokensDeltaRequest2) {
    SemanticTokensDeltaRequest2.method = "textDocument/semanticTokens/full/delta";
    SemanticTokensDeltaRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    SemanticTokensDeltaRequest2.type = new messages_1.ProtocolRequestType(SemanticTokensDeltaRequest2.method);
    SemanticTokensDeltaRequest2.registrationMethod = SemanticTokensRegistrationType.method;
  })(SemanticTokensDeltaRequest || (exports.SemanticTokensDeltaRequest = SemanticTokensDeltaRequest = {}));
  var SemanticTokensRangeRequest;
  (function(SemanticTokensRangeRequest2) {
    SemanticTokensRangeRequest2.method = "textDocument/semanticTokens/range";
    SemanticTokensRangeRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    SemanticTokensRangeRequest2.type = new messages_1.ProtocolRequestType(SemanticTokensRangeRequest2.method);
    SemanticTokensRangeRequest2.registrationMethod = SemanticTokensRegistrationType.method;
  })(SemanticTokensRangeRequest || (exports.SemanticTokensRangeRequest = SemanticTokensRangeRequest = {}));
  var SemanticTokensRefreshRequest;
  (function(SemanticTokensRefreshRequest2) {
    SemanticTokensRefreshRequest2.method = `workspace/semanticTokens/refresh`;
    SemanticTokensRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
    SemanticTokensRefreshRequest2.type = new messages_1.ProtocolRequestType0(SemanticTokensRefreshRequest2.method);
  })(SemanticTokensRefreshRequest || (exports.SemanticTokensRefreshRequest = SemanticTokensRefreshRequest = {}));
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.showDocument.js
var require_protocol_showDocument = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ShowDocumentRequest = undefined;
  var messages_1 = require_messages2();
  var ShowDocumentRequest;
  (function(ShowDocumentRequest2) {
    ShowDocumentRequest2.method = "window/showDocument";
    ShowDocumentRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
    ShowDocumentRequest2.type = new messages_1.ProtocolRequestType(ShowDocumentRequest2.method);
  })(ShowDocumentRequest || (exports.ShowDocumentRequest = ShowDocumentRequest = {}));
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.linkedEditingRange.js
var require_protocol_linkedEditingRange = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.LinkedEditingRangeRequest = undefined;
  var messages_1 = require_messages2();
  var LinkedEditingRangeRequest;
  (function(LinkedEditingRangeRequest2) {
    LinkedEditingRangeRequest2.method = "textDocument/linkedEditingRange";
    LinkedEditingRangeRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    LinkedEditingRangeRequest2.type = new messages_1.ProtocolRequestType(LinkedEditingRangeRequest2.method);
  })(LinkedEditingRangeRequest || (exports.LinkedEditingRangeRequest = LinkedEditingRangeRequest = {}));
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.fileOperations.js
var require_protocol_fileOperations = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.WillDeleteFilesRequest = exports.DidDeleteFilesNotification = exports.DidRenameFilesNotification = exports.WillRenameFilesRequest = exports.DidCreateFilesNotification = exports.WillCreateFilesRequest = exports.FileOperationPatternKind = undefined;
  var messages_1 = require_messages2();
  var FileOperationPatternKind;
  (function(FileOperationPatternKind2) {
    FileOperationPatternKind2.file = "file";
    FileOperationPatternKind2.folder = "folder";
  })(FileOperationPatternKind || (exports.FileOperationPatternKind = FileOperationPatternKind = {}));
  var WillCreateFilesRequest;
  (function(WillCreateFilesRequest2) {
    WillCreateFilesRequest2.method = "workspace/willCreateFiles";
    WillCreateFilesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    WillCreateFilesRequest2.type = new messages_1.ProtocolRequestType(WillCreateFilesRequest2.method);
  })(WillCreateFilesRequest || (exports.WillCreateFilesRequest = WillCreateFilesRequest = {}));
  var DidCreateFilesNotification;
  (function(DidCreateFilesNotification2) {
    DidCreateFilesNotification2.method = "workspace/didCreateFiles";
    DidCreateFilesNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
    DidCreateFilesNotification2.type = new messages_1.ProtocolNotificationType(DidCreateFilesNotification2.method);
  })(DidCreateFilesNotification || (exports.DidCreateFilesNotification = DidCreateFilesNotification = {}));
  var WillRenameFilesRequest;
  (function(WillRenameFilesRequest2) {
    WillRenameFilesRequest2.method = "workspace/willRenameFiles";
    WillRenameFilesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    WillRenameFilesRequest2.type = new messages_1.ProtocolRequestType(WillRenameFilesRequest2.method);
  })(WillRenameFilesRequest || (exports.WillRenameFilesRequest = WillRenameFilesRequest = {}));
  var DidRenameFilesNotification;
  (function(DidRenameFilesNotification2) {
    DidRenameFilesNotification2.method = "workspace/didRenameFiles";
    DidRenameFilesNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
    DidRenameFilesNotification2.type = new messages_1.ProtocolNotificationType(DidRenameFilesNotification2.method);
  })(DidRenameFilesNotification || (exports.DidRenameFilesNotification = DidRenameFilesNotification = {}));
  var DidDeleteFilesNotification;
  (function(DidDeleteFilesNotification2) {
    DidDeleteFilesNotification2.method = "workspace/didDeleteFiles";
    DidDeleteFilesNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
    DidDeleteFilesNotification2.type = new messages_1.ProtocolNotificationType(DidDeleteFilesNotification2.method);
  })(DidDeleteFilesNotification || (exports.DidDeleteFilesNotification = DidDeleteFilesNotification = {}));
  var WillDeleteFilesRequest;
  (function(WillDeleteFilesRequest2) {
    WillDeleteFilesRequest2.method = "workspace/willDeleteFiles";
    WillDeleteFilesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    WillDeleteFilesRequest2.type = new messages_1.ProtocolRequestType(WillDeleteFilesRequest2.method);
  })(WillDeleteFilesRequest || (exports.WillDeleteFilesRequest = WillDeleteFilesRequest = {}));
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.moniker.js
var require_protocol_moniker = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.MonikerRequest = exports.MonikerKind = exports.UniquenessLevel = undefined;
  var messages_1 = require_messages2();
  var UniquenessLevel;
  (function(UniquenessLevel2) {
    UniquenessLevel2.document = "document";
    UniquenessLevel2.project = "project";
    UniquenessLevel2.group = "group";
    UniquenessLevel2.scheme = "scheme";
    UniquenessLevel2.global = "global";
  })(UniquenessLevel || (exports.UniquenessLevel = UniquenessLevel = {}));
  var MonikerKind;
  (function(MonikerKind2) {
    MonikerKind2.$import = "import";
    MonikerKind2.$export = "export";
    MonikerKind2.local = "local";
  })(MonikerKind || (exports.MonikerKind = MonikerKind = {}));
  var MonikerRequest;
  (function(MonikerRequest2) {
    MonikerRequest2.method = "textDocument/moniker";
    MonikerRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    MonikerRequest2.type = new messages_1.ProtocolRequestType(MonikerRequest2.method);
  })(MonikerRequest || (exports.MonikerRequest = MonikerRequest = {}));
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.typeHierarchy.js
var require_protocol_typeHierarchy = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TypeHierarchySubtypesRequest = exports.TypeHierarchySupertypesRequest = exports.TypeHierarchyPrepareRequest = undefined;
  var messages_1 = require_messages2();
  var TypeHierarchyPrepareRequest;
  (function(TypeHierarchyPrepareRequest2) {
    TypeHierarchyPrepareRequest2.method = "textDocument/prepareTypeHierarchy";
    TypeHierarchyPrepareRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    TypeHierarchyPrepareRequest2.type = new messages_1.ProtocolRequestType(TypeHierarchyPrepareRequest2.method);
  })(TypeHierarchyPrepareRequest || (exports.TypeHierarchyPrepareRequest = TypeHierarchyPrepareRequest = {}));
  var TypeHierarchySupertypesRequest;
  (function(TypeHierarchySupertypesRequest2) {
    TypeHierarchySupertypesRequest2.method = "typeHierarchy/supertypes";
    TypeHierarchySupertypesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    TypeHierarchySupertypesRequest2.type = new messages_1.ProtocolRequestType(TypeHierarchySupertypesRequest2.method);
  })(TypeHierarchySupertypesRequest || (exports.TypeHierarchySupertypesRequest = TypeHierarchySupertypesRequest = {}));
  var TypeHierarchySubtypesRequest;
  (function(TypeHierarchySubtypesRequest2) {
    TypeHierarchySubtypesRequest2.method = "typeHierarchy/subtypes";
    TypeHierarchySubtypesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    TypeHierarchySubtypesRequest2.type = new messages_1.ProtocolRequestType(TypeHierarchySubtypesRequest2.method);
  })(TypeHierarchySubtypesRequest || (exports.TypeHierarchySubtypesRequest = TypeHierarchySubtypesRequest = {}));
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.inlineValue.js
var require_protocol_inlineValue = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.InlineValueRefreshRequest = exports.InlineValueRequest = undefined;
  var messages_1 = require_messages2();
  var InlineValueRequest;
  (function(InlineValueRequest2) {
    InlineValueRequest2.method = "textDocument/inlineValue";
    InlineValueRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    InlineValueRequest2.type = new messages_1.ProtocolRequestType(InlineValueRequest2.method);
  })(InlineValueRequest || (exports.InlineValueRequest = InlineValueRequest = {}));
  var InlineValueRefreshRequest;
  (function(InlineValueRefreshRequest2) {
    InlineValueRefreshRequest2.method = `workspace/inlineValue/refresh`;
    InlineValueRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
    InlineValueRefreshRequest2.type = new messages_1.ProtocolRequestType0(InlineValueRefreshRequest2.method);
  })(InlineValueRefreshRequest || (exports.InlineValueRefreshRequest = InlineValueRefreshRequest = {}));
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.inlayHint.js
var require_protocol_inlayHint = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.InlayHintRefreshRequest = exports.InlayHintResolveRequest = exports.InlayHintRequest = undefined;
  var messages_1 = require_messages2();
  var InlayHintRequest;
  (function(InlayHintRequest2) {
    InlayHintRequest2.method = "textDocument/inlayHint";
    InlayHintRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    InlayHintRequest2.type = new messages_1.ProtocolRequestType(InlayHintRequest2.method);
  })(InlayHintRequest || (exports.InlayHintRequest = InlayHintRequest = {}));
  var InlayHintResolveRequest;
  (function(InlayHintResolveRequest2) {
    InlayHintResolveRequest2.method = "inlayHint/resolve";
    InlayHintResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    InlayHintResolveRequest2.type = new messages_1.ProtocolRequestType(InlayHintResolveRequest2.method);
  })(InlayHintResolveRequest || (exports.InlayHintResolveRequest = InlayHintResolveRequest = {}));
  var InlayHintRefreshRequest;
  (function(InlayHintRefreshRequest2) {
    InlayHintRefreshRequest2.method = `workspace/inlayHint/refresh`;
    InlayHintRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
    InlayHintRefreshRequest2.type = new messages_1.ProtocolRequestType0(InlayHintRefreshRequest2.method);
  })(InlayHintRefreshRequest || (exports.InlayHintRefreshRequest = InlayHintRefreshRequest = {}));
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.diagnostic.js
var require_protocol_diagnostic = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DiagnosticRefreshRequest = exports.WorkspaceDiagnosticRequest = exports.DocumentDiagnosticRequest = exports.DocumentDiagnosticReportKind = exports.DiagnosticServerCancellationData = undefined;
  var vscode_jsonrpc_1 = require_main();
  var Is = require_is3();
  var messages_1 = require_messages2();
  var DiagnosticServerCancellationData;
  (function(DiagnosticServerCancellationData2) {
    function is(value) {
      const candidate = value;
      return candidate && Is.boolean(candidate.retriggerRequest);
    }
    DiagnosticServerCancellationData2.is = is;
  })(DiagnosticServerCancellationData || (exports.DiagnosticServerCancellationData = DiagnosticServerCancellationData = {}));
  var DocumentDiagnosticReportKind;
  (function(DocumentDiagnosticReportKind2) {
    DocumentDiagnosticReportKind2.Full = "full";
    DocumentDiagnosticReportKind2.Unchanged = "unchanged";
  })(DocumentDiagnosticReportKind || (exports.DocumentDiagnosticReportKind = DocumentDiagnosticReportKind = {}));
  var DocumentDiagnosticRequest;
  (function(DocumentDiagnosticRequest2) {
    DocumentDiagnosticRequest2.method = "textDocument/diagnostic";
    DocumentDiagnosticRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentDiagnosticRequest2.type = new messages_1.ProtocolRequestType(DocumentDiagnosticRequest2.method);
    DocumentDiagnosticRequest2.partialResult = new vscode_jsonrpc_1.ProgressType;
  })(DocumentDiagnosticRequest || (exports.DocumentDiagnosticRequest = DocumentDiagnosticRequest = {}));
  var WorkspaceDiagnosticRequest;
  (function(WorkspaceDiagnosticRequest2) {
    WorkspaceDiagnosticRequest2.method = "workspace/diagnostic";
    WorkspaceDiagnosticRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    WorkspaceDiagnosticRequest2.type = new messages_1.ProtocolRequestType(WorkspaceDiagnosticRequest2.method);
    WorkspaceDiagnosticRequest2.partialResult = new vscode_jsonrpc_1.ProgressType;
  })(WorkspaceDiagnosticRequest || (exports.WorkspaceDiagnosticRequest = WorkspaceDiagnosticRequest = {}));
  var DiagnosticRefreshRequest;
  (function(DiagnosticRefreshRequest2) {
    DiagnosticRefreshRequest2.method = `workspace/diagnostic/refresh`;
    DiagnosticRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
    DiagnosticRefreshRequest2.type = new messages_1.ProtocolRequestType0(DiagnosticRefreshRequest2.method);
  })(DiagnosticRefreshRequest || (exports.DiagnosticRefreshRequest = DiagnosticRefreshRequest = {}));
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.notebook.js
var require_protocol_notebook = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DidCloseNotebookDocumentNotification = exports.DidSaveNotebookDocumentNotification = exports.DidChangeNotebookDocumentNotification = exports.NotebookCellArrayChange = exports.DidOpenNotebookDocumentNotification = exports.NotebookDocumentSyncRegistrationType = exports.NotebookDocument = exports.NotebookCell = exports.ExecutionSummary = exports.NotebookCellKind = undefined;
  var vscode_languageserver_types_1 = require_main2();
  var Is = require_is3();
  var messages_1 = require_messages2();
  var NotebookCellKind;
  (function(NotebookCellKind2) {
    NotebookCellKind2.Markup = 1;
    NotebookCellKind2.Code = 2;
    function is(value) {
      return value === 1 || value === 2;
    }
    NotebookCellKind2.is = is;
  })(NotebookCellKind || (exports.NotebookCellKind = NotebookCellKind = {}));
  var ExecutionSummary;
  (function(ExecutionSummary2) {
    function create(executionOrder, success) {
      const result = { executionOrder };
      if (success === true || success === false) {
        result.success = success;
      }
      return result;
    }
    ExecutionSummary2.create = create;
    function is(value) {
      const candidate = value;
      return Is.objectLiteral(candidate) && vscode_languageserver_types_1.uinteger.is(candidate.executionOrder) && (candidate.success === undefined || Is.boolean(candidate.success));
    }
    ExecutionSummary2.is = is;
    function equals(one, other) {
      if (one === other) {
        return true;
      }
      if (one === null || one === undefined || other === null || other === undefined) {
        return false;
      }
      return one.executionOrder === other.executionOrder && one.success === other.success;
    }
    ExecutionSummary2.equals = equals;
  })(ExecutionSummary || (exports.ExecutionSummary = ExecutionSummary = {}));
  var NotebookCell;
  (function(NotebookCell2) {
    function create(kind, document) {
      return { kind, document };
    }
    NotebookCell2.create = create;
    function is(value) {
      const candidate = value;
      return Is.objectLiteral(candidate) && NotebookCellKind.is(candidate.kind) && vscode_languageserver_types_1.DocumentUri.is(candidate.document) && (candidate.metadata === undefined || Is.objectLiteral(candidate.metadata));
    }
    NotebookCell2.is = is;
    function diff(one, two) {
      const result = new Set;
      if (one.document !== two.document) {
        result.add("document");
      }
      if (one.kind !== two.kind) {
        result.add("kind");
      }
      if (one.executionSummary !== two.executionSummary) {
        result.add("executionSummary");
      }
      if ((one.metadata !== undefined || two.metadata !== undefined) && !equalsMetadata(one.metadata, two.metadata)) {
        result.add("metadata");
      }
      if ((one.executionSummary !== undefined || two.executionSummary !== undefined) && !ExecutionSummary.equals(one.executionSummary, two.executionSummary)) {
        result.add("executionSummary");
      }
      return result;
    }
    NotebookCell2.diff = diff;
    function equalsMetadata(one, other) {
      if (one === other) {
        return true;
      }
      if (one === null || one === undefined || other === null || other === undefined) {
        return false;
      }
      if (typeof one !== typeof other) {
        return false;
      }
      if (typeof one !== "object") {
        return false;
      }
      const oneArray = Array.isArray(one);
      const otherArray = Array.isArray(other);
      if (oneArray !== otherArray) {
        return false;
      }
      if (oneArray && otherArray) {
        if (one.length !== other.length) {
          return false;
        }
        for (let i = 0;i < one.length; i++) {
          if (!equalsMetadata(one[i], other[i])) {
            return false;
          }
        }
      }
      if (Is.objectLiteral(one) && Is.objectLiteral(other)) {
        const oneKeys = Object.keys(one);
        const otherKeys = Object.keys(other);
        if (oneKeys.length !== otherKeys.length) {
          return false;
        }
        oneKeys.sort();
        otherKeys.sort();
        if (!equalsMetadata(oneKeys, otherKeys)) {
          return false;
        }
        for (let i = 0;i < oneKeys.length; i++) {
          const prop = oneKeys[i];
          if (!equalsMetadata(one[prop], other[prop])) {
            return false;
          }
        }
      }
      return true;
    }
  })(NotebookCell || (exports.NotebookCell = NotebookCell = {}));
  var NotebookDocument;
  (function(NotebookDocument2) {
    function create(uri, notebookType, version, cells) {
      return { uri, notebookType, version, cells };
    }
    NotebookDocument2.create = create;
    function is(value) {
      const candidate = value;
      return Is.objectLiteral(candidate) && Is.string(candidate.uri) && vscode_languageserver_types_1.integer.is(candidate.version) && Is.typedArray(candidate.cells, NotebookCell.is);
    }
    NotebookDocument2.is = is;
  })(NotebookDocument || (exports.NotebookDocument = NotebookDocument = {}));
  var NotebookDocumentSyncRegistrationType;
  (function(NotebookDocumentSyncRegistrationType2) {
    NotebookDocumentSyncRegistrationType2.method = "notebookDocument/sync";
    NotebookDocumentSyncRegistrationType2.messageDirection = messages_1.MessageDirection.clientToServer;
    NotebookDocumentSyncRegistrationType2.type = new messages_1.RegistrationType(NotebookDocumentSyncRegistrationType2.method);
  })(NotebookDocumentSyncRegistrationType || (exports.NotebookDocumentSyncRegistrationType = NotebookDocumentSyncRegistrationType = {}));
  var DidOpenNotebookDocumentNotification;
  (function(DidOpenNotebookDocumentNotification2) {
    DidOpenNotebookDocumentNotification2.method = "notebookDocument/didOpen";
    DidOpenNotebookDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
    DidOpenNotebookDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidOpenNotebookDocumentNotification2.method);
    DidOpenNotebookDocumentNotification2.registrationMethod = NotebookDocumentSyncRegistrationType.method;
  })(DidOpenNotebookDocumentNotification || (exports.DidOpenNotebookDocumentNotification = DidOpenNotebookDocumentNotification = {}));
  var NotebookCellArrayChange;
  (function(NotebookCellArrayChange2) {
    function is(value) {
      const candidate = value;
      return Is.objectLiteral(candidate) && vscode_languageserver_types_1.uinteger.is(candidate.start) && vscode_languageserver_types_1.uinteger.is(candidate.deleteCount) && (candidate.cells === undefined || Is.typedArray(candidate.cells, NotebookCell.is));
    }
    NotebookCellArrayChange2.is = is;
    function create(start, deleteCount, cells) {
      const result = { start, deleteCount };
      if (cells !== undefined) {
        result.cells = cells;
      }
      return result;
    }
    NotebookCellArrayChange2.create = create;
  })(NotebookCellArrayChange || (exports.NotebookCellArrayChange = NotebookCellArrayChange = {}));
  var DidChangeNotebookDocumentNotification;
  (function(DidChangeNotebookDocumentNotification2) {
    DidChangeNotebookDocumentNotification2.method = "notebookDocument/didChange";
    DidChangeNotebookDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
    DidChangeNotebookDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidChangeNotebookDocumentNotification2.method);
    DidChangeNotebookDocumentNotification2.registrationMethod = NotebookDocumentSyncRegistrationType.method;
  })(DidChangeNotebookDocumentNotification || (exports.DidChangeNotebookDocumentNotification = DidChangeNotebookDocumentNotification = {}));
  var DidSaveNotebookDocumentNotification;
  (function(DidSaveNotebookDocumentNotification2) {
    DidSaveNotebookDocumentNotification2.method = "notebookDocument/didSave";
    DidSaveNotebookDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
    DidSaveNotebookDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidSaveNotebookDocumentNotification2.method);
    DidSaveNotebookDocumentNotification2.registrationMethod = NotebookDocumentSyncRegistrationType.method;
  })(DidSaveNotebookDocumentNotification || (exports.DidSaveNotebookDocumentNotification = DidSaveNotebookDocumentNotification = {}));
  var DidCloseNotebookDocumentNotification;
  (function(DidCloseNotebookDocumentNotification2) {
    DidCloseNotebookDocumentNotification2.method = "notebookDocument/didClose";
    DidCloseNotebookDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
    DidCloseNotebookDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidCloseNotebookDocumentNotification2.method);
    DidCloseNotebookDocumentNotification2.registrationMethod = NotebookDocumentSyncRegistrationType.method;
  })(DidCloseNotebookDocumentNotification || (exports.DidCloseNotebookDocumentNotification = DidCloseNotebookDocumentNotification = {}));
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.inlineCompletion.js
var require_protocol_inlineCompletion = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.InlineCompletionRequest = undefined;
  var messages_1 = require_messages2();
  var InlineCompletionRequest;
  (function(InlineCompletionRequest2) {
    InlineCompletionRequest2.method = "textDocument/inlineCompletion";
    InlineCompletionRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    InlineCompletionRequest2.type = new messages_1.ProtocolRequestType(InlineCompletionRequest2.method);
  })(InlineCompletionRequest || (exports.InlineCompletionRequest = InlineCompletionRequest = {}));
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.js
var require_protocol = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.WorkspaceSymbolRequest = exports.CodeActionResolveRequest = exports.CodeActionRequest = exports.DocumentSymbolRequest = exports.DocumentHighlightRequest = exports.ReferencesRequest = exports.DefinitionRequest = exports.SignatureHelpRequest = exports.SignatureHelpTriggerKind = exports.HoverRequest = exports.CompletionResolveRequest = exports.CompletionRequest = exports.CompletionTriggerKind = exports.PublishDiagnosticsNotification = exports.WatchKind = exports.RelativePattern = exports.FileChangeType = exports.DidChangeWatchedFilesNotification = exports.WillSaveTextDocumentWaitUntilRequest = exports.WillSaveTextDocumentNotification = exports.TextDocumentSaveReason = exports.DidSaveTextDocumentNotification = exports.DidCloseTextDocumentNotification = exports.DidChangeTextDocumentNotification = exports.TextDocumentContentChangeEvent = exports.DidOpenTextDocumentNotification = exports.TextDocumentSyncKind = exports.TelemetryEventNotification = exports.LogMessageNotification = exports.ShowMessageRequest = exports.ShowMessageNotification = exports.MessageType = exports.DidChangeConfigurationNotification = exports.ExitNotification = exports.ShutdownRequest = exports.InitializedNotification = exports.InitializeErrorCodes = exports.InitializeRequest = exports.WorkDoneProgressOptions = exports.TextDocumentRegistrationOptions = exports.StaticRegistrationOptions = exports.PositionEncodingKind = exports.FailureHandlingKind = exports.ResourceOperationKind = exports.UnregistrationRequest = exports.RegistrationRequest = exports.DocumentSelector = exports.NotebookCellTextDocumentFilter = exports.NotebookDocumentFilter = exports.TextDocumentFilter = undefined;
  exports.MonikerRequest = exports.MonikerKind = exports.UniquenessLevel = exports.WillDeleteFilesRequest = exports.DidDeleteFilesNotification = exports.WillRenameFilesRequest = exports.DidRenameFilesNotification = exports.WillCreateFilesRequest = exports.DidCreateFilesNotification = exports.FileOperationPatternKind = exports.LinkedEditingRangeRequest = exports.ShowDocumentRequest = exports.SemanticTokensRegistrationType = exports.SemanticTokensRefreshRequest = exports.SemanticTokensRangeRequest = exports.SemanticTokensDeltaRequest = exports.SemanticTokensRequest = exports.TokenFormat = exports.CallHierarchyPrepareRequest = exports.CallHierarchyOutgoingCallsRequest = exports.CallHierarchyIncomingCallsRequest = exports.WorkDoneProgressCancelNotification = exports.WorkDoneProgressCreateRequest = exports.WorkDoneProgress = exports.SelectionRangeRequest = exports.DeclarationRequest = exports.FoldingRangeRefreshRequest = exports.FoldingRangeRequest = exports.ColorPresentationRequest = exports.DocumentColorRequest = exports.ConfigurationRequest = exports.DidChangeWorkspaceFoldersNotification = exports.WorkspaceFoldersRequest = exports.TypeDefinitionRequest = exports.ImplementationRequest = exports.ApplyWorkspaceEditRequest = exports.ExecuteCommandRequest = exports.PrepareRenameRequest = exports.RenameRequest = exports.PrepareSupportDefaultBehavior = exports.DocumentOnTypeFormattingRequest = exports.DocumentRangesFormattingRequest = exports.DocumentRangeFormattingRequest = exports.DocumentFormattingRequest = exports.DocumentLinkResolveRequest = exports.DocumentLinkRequest = exports.CodeLensRefreshRequest = exports.CodeLensResolveRequest = exports.CodeLensRequest = exports.WorkspaceSymbolResolveRequest = undefined;
  exports.InlineCompletionRequest = exports.DidCloseNotebookDocumentNotification = exports.DidSaveNotebookDocumentNotification = exports.DidChangeNotebookDocumentNotification = exports.NotebookCellArrayChange = exports.DidOpenNotebookDocumentNotification = exports.NotebookDocumentSyncRegistrationType = exports.NotebookDocument = exports.NotebookCell = exports.ExecutionSummary = exports.NotebookCellKind = exports.DiagnosticRefreshRequest = exports.WorkspaceDiagnosticRequest = exports.DocumentDiagnosticRequest = exports.DocumentDiagnosticReportKind = exports.DiagnosticServerCancellationData = exports.InlayHintRefreshRequest = exports.InlayHintResolveRequest = exports.InlayHintRequest = exports.InlineValueRefreshRequest = exports.InlineValueRequest = exports.TypeHierarchySupertypesRequest = exports.TypeHierarchySubtypesRequest = exports.TypeHierarchyPrepareRequest = undefined;
  var messages_1 = require_messages2();
  var vscode_languageserver_types_1 = require_main2();
  var Is = require_is3();
  var protocol_implementation_1 = require_protocol_implementation();
  Object.defineProperty(exports, "ImplementationRequest", { enumerable: true, get: function() {
    return protocol_implementation_1.ImplementationRequest;
  } });
  var protocol_typeDefinition_1 = require_protocol_typeDefinition();
  Object.defineProperty(exports, "TypeDefinitionRequest", { enumerable: true, get: function() {
    return protocol_typeDefinition_1.TypeDefinitionRequest;
  } });
  var protocol_workspaceFolder_1 = require_protocol_workspaceFolder();
  Object.defineProperty(exports, "WorkspaceFoldersRequest", { enumerable: true, get: function() {
    return protocol_workspaceFolder_1.WorkspaceFoldersRequest;
  } });
  Object.defineProperty(exports, "DidChangeWorkspaceFoldersNotification", { enumerable: true, get: function() {
    return protocol_workspaceFolder_1.DidChangeWorkspaceFoldersNotification;
  } });
  var protocol_configuration_1 = require_protocol_configuration();
  Object.defineProperty(exports, "ConfigurationRequest", { enumerable: true, get: function() {
    return protocol_configuration_1.ConfigurationRequest;
  } });
  var protocol_colorProvider_1 = require_protocol_colorProvider();
  Object.defineProperty(exports, "DocumentColorRequest", { enumerable: true, get: function() {
    return protocol_colorProvider_1.DocumentColorRequest;
  } });
  Object.defineProperty(exports, "ColorPresentationRequest", { enumerable: true, get: function() {
    return protocol_colorProvider_1.ColorPresentationRequest;
  } });
  var protocol_foldingRange_1 = require_protocol_foldingRange();
  Object.defineProperty(exports, "FoldingRangeRequest", { enumerable: true, get: function() {
    return protocol_foldingRange_1.FoldingRangeRequest;
  } });
  Object.defineProperty(exports, "FoldingRangeRefreshRequest", { enumerable: true, get: function() {
    return protocol_foldingRange_1.FoldingRangeRefreshRequest;
  } });
  var protocol_declaration_1 = require_protocol_declaration();
  Object.defineProperty(exports, "DeclarationRequest", { enumerable: true, get: function() {
    return protocol_declaration_1.DeclarationRequest;
  } });
  var protocol_selectionRange_1 = require_protocol_selectionRange();
  Object.defineProperty(exports, "SelectionRangeRequest", { enumerable: true, get: function() {
    return protocol_selectionRange_1.SelectionRangeRequest;
  } });
  var protocol_progress_1 = require_protocol_progress();
  Object.defineProperty(exports, "WorkDoneProgress", { enumerable: true, get: function() {
    return protocol_progress_1.WorkDoneProgress;
  } });
  Object.defineProperty(exports, "WorkDoneProgressCreateRequest", { enumerable: true, get: function() {
    return protocol_progress_1.WorkDoneProgressCreateRequest;
  } });
  Object.defineProperty(exports, "WorkDoneProgressCancelNotification", { enumerable: true, get: function() {
    return protocol_progress_1.WorkDoneProgressCancelNotification;
  } });
  var protocol_callHierarchy_1 = require_protocol_callHierarchy();
  Object.defineProperty(exports, "CallHierarchyIncomingCallsRequest", { enumerable: true, get: function() {
    return protocol_callHierarchy_1.CallHierarchyIncomingCallsRequest;
  } });
  Object.defineProperty(exports, "CallHierarchyOutgoingCallsRequest", { enumerable: true, get: function() {
    return protocol_callHierarchy_1.CallHierarchyOutgoingCallsRequest;
  } });
  Object.defineProperty(exports, "CallHierarchyPrepareRequest", { enumerable: true, get: function() {
    return protocol_callHierarchy_1.CallHierarchyPrepareRequest;
  } });
  var protocol_semanticTokens_1 = require_protocol_semanticTokens();
  Object.defineProperty(exports, "TokenFormat", { enumerable: true, get: function() {
    return protocol_semanticTokens_1.TokenFormat;
  } });
  Object.defineProperty(exports, "SemanticTokensRequest", { enumerable: true, get: function() {
    return protocol_semanticTokens_1.SemanticTokensRequest;
  } });
  Object.defineProperty(exports, "SemanticTokensDeltaRequest", { enumerable: true, get: function() {
    return protocol_semanticTokens_1.SemanticTokensDeltaRequest;
  } });
  Object.defineProperty(exports, "SemanticTokensRangeRequest", { enumerable: true, get: function() {
    return protocol_semanticTokens_1.SemanticTokensRangeRequest;
  } });
  Object.defineProperty(exports, "SemanticTokensRefreshRequest", { enumerable: true, get: function() {
    return protocol_semanticTokens_1.SemanticTokensRefreshRequest;
  } });
  Object.defineProperty(exports, "SemanticTokensRegistrationType", { enumerable: true, get: function() {
    return protocol_semanticTokens_1.SemanticTokensRegistrationType;
  } });
  var protocol_showDocument_1 = require_protocol_showDocument();
  Object.defineProperty(exports, "ShowDocumentRequest", { enumerable: true, get: function() {
    return protocol_showDocument_1.ShowDocumentRequest;
  } });
  var protocol_linkedEditingRange_1 = require_protocol_linkedEditingRange();
  Object.defineProperty(exports, "LinkedEditingRangeRequest", { enumerable: true, get: function() {
    return protocol_linkedEditingRange_1.LinkedEditingRangeRequest;
  } });
  var protocol_fileOperations_1 = require_protocol_fileOperations();
  Object.defineProperty(exports, "FileOperationPatternKind", { enumerable: true, get: function() {
    return protocol_fileOperations_1.FileOperationPatternKind;
  } });
  Object.defineProperty(exports, "DidCreateFilesNotification", { enumerable: true, get: function() {
    return protocol_fileOperations_1.DidCreateFilesNotification;
  } });
  Object.defineProperty(exports, "WillCreateFilesRequest", { enumerable: true, get: function() {
    return protocol_fileOperations_1.WillCreateFilesRequest;
  } });
  Object.defineProperty(exports, "DidRenameFilesNotification", { enumerable: true, get: function() {
    return protocol_fileOperations_1.DidRenameFilesNotification;
  } });
  Object.defineProperty(exports, "WillRenameFilesRequest", { enumerable: true, get: function() {
    return protocol_fileOperations_1.WillRenameFilesRequest;
  } });
  Object.defineProperty(exports, "DidDeleteFilesNotification", { enumerable: true, get: function() {
    return protocol_fileOperations_1.DidDeleteFilesNotification;
  } });
  Object.defineProperty(exports, "WillDeleteFilesRequest", { enumerable: true, get: function() {
    return protocol_fileOperations_1.WillDeleteFilesRequest;
  } });
  var protocol_moniker_1 = require_protocol_moniker();
  Object.defineProperty(exports, "UniquenessLevel", { enumerable: true, get: function() {
    return protocol_moniker_1.UniquenessLevel;
  } });
  Object.defineProperty(exports, "MonikerKind", { enumerable: true, get: function() {
    return protocol_moniker_1.MonikerKind;
  } });
  Object.defineProperty(exports, "MonikerRequest", { enumerable: true, get: function() {
    return protocol_moniker_1.MonikerRequest;
  } });
  var protocol_typeHierarchy_1 = require_protocol_typeHierarchy();
  Object.defineProperty(exports, "TypeHierarchyPrepareRequest", { enumerable: true, get: function() {
    return protocol_typeHierarchy_1.TypeHierarchyPrepareRequest;
  } });
  Object.defineProperty(exports, "TypeHierarchySubtypesRequest", { enumerable: true, get: function() {
    return protocol_typeHierarchy_1.TypeHierarchySubtypesRequest;
  } });
  Object.defineProperty(exports, "TypeHierarchySupertypesRequest", { enumerable: true, get: function() {
    return protocol_typeHierarchy_1.TypeHierarchySupertypesRequest;
  } });
  var protocol_inlineValue_1 = require_protocol_inlineValue();
  Object.defineProperty(exports, "InlineValueRequest", { enumerable: true, get: function() {
    return protocol_inlineValue_1.InlineValueRequest;
  } });
  Object.defineProperty(exports, "InlineValueRefreshRequest", { enumerable: true, get: function() {
    return protocol_inlineValue_1.InlineValueRefreshRequest;
  } });
  var protocol_inlayHint_1 = require_protocol_inlayHint();
  Object.defineProperty(exports, "InlayHintRequest", { enumerable: true, get: function() {
    return protocol_inlayHint_1.InlayHintRequest;
  } });
  Object.defineProperty(exports, "InlayHintResolveRequest", { enumerable: true, get: function() {
    return protocol_inlayHint_1.InlayHintResolveRequest;
  } });
  Object.defineProperty(exports, "InlayHintRefreshRequest", { enumerable: true, get: function() {
    return protocol_inlayHint_1.InlayHintRefreshRequest;
  } });
  var protocol_diagnostic_1 = require_protocol_diagnostic();
  Object.defineProperty(exports, "DiagnosticServerCancellationData", { enumerable: true, get: function() {
    return protocol_diagnostic_1.DiagnosticServerCancellationData;
  } });
  Object.defineProperty(exports, "DocumentDiagnosticReportKind", { enumerable: true, get: function() {
    return protocol_diagnostic_1.DocumentDiagnosticReportKind;
  } });
  Object.defineProperty(exports, "DocumentDiagnosticRequest", { enumerable: true, get: function() {
    return protocol_diagnostic_1.DocumentDiagnosticRequest;
  } });
  Object.defineProperty(exports, "WorkspaceDiagnosticRequest", { enumerable: true, get: function() {
    return protocol_diagnostic_1.WorkspaceDiagnosticRequest;
  } });
  Object.defineProperty(exports, "DiagnosticRefreshRequest", { enumerable: true, get: function() {
    return protocol_diagnostic_1.DiagnosticRefreshRequest;
  } });
  var protocol_notebook_1 = require_protocol_notebook();
  Object.defineProperty(exports, "NotebookCellKind", { enumerable: true, get: function() {
    return protocol_notebook_1.NotebookCellKind;
  } });
  Object.defineProperty(exports, "ExecutionSummary", { enumerable: true, get: function() {
    return protocol_notebook_1.ExecutionSummary;
  } });
  Object.defineProperty(exports, "NotebookCell", { enumerable: true, get: function() {
    return protocol_notebook_1.NotebookCell;
  } });
  Object.defineProperty(exports, "NotebookDocument", { enumerable: true, get: function() {
    return protocol_notebook_1.NotebookDocument;
  } });
  Object.defineProperty(exports, "NotebookDocumentSyncRegistrationType", { enumerable: true, get: function() {
    return protocol_notebook_1.NotebookDocumentSyncRegistrationType;
  } });
  Object.defineProperty(exports, "DidOpenNotebookDocumentNotification", { enumerable: true, get: function() {
    return protocol_notebook_1.DidOpenNotebookDocumentNotification;
  } });
  Object.defineProperty(exports, "NotebookCellArrayChange", { enumerable: true, get: function() {
    return protocol_notebook_1.NotebookCellArrayChange;
  } });
  Object.defineProperty(exports, "DidChangeNotebookDocumentNotification", { enumerable: true, get: function() {
    return protocol_notebook_1.DidChangeNotebookDocumentNotification;
  } });
  Object.defineProperty(exports, "DidSaveNotebookDocumentNotification", { enumerable: true, get: function() {
    return protocol_notebook_1.DidSaveNotebookDocumentNotification;
  } });
  Object.defineProperty(exports, "DidCloseNotebookDocumentNotification", { enumerable: true, get: function() {
    return protocol_notebook_1.DidCloseNotebookDocumentNotification;
  } });
  var protocol_inlineCompletion_1 = require_protocol_inlineCompletion();
  Object.defineProperty(exports, "InlineCompletionRequest", { enumerable: true, get: function() {
    return protocol_inlineCompletion_1.InlineCompletionRequest;
  } });
  var TextDocumentFilter;
  (function(TextDocumentFilter2) {
    function is(value) {
      const candidate = value;
      return Is.string(candidate) || (Is.string(candidate.language) || Is.string(candidate.scheme) || Is.string(candidate.pattern));
    }
    TextDocumentFilter2.is = is;
  })(TextDocumentFilter || (exports.TextDocumentFilter = TextDocumentFilter = {}));
  var NotebookDocumentFilter;
  (function(NotebookDocumentFilter2) {
    function is(value) {
      const candidate = value;
      return Is.objectLiteral(candidate) && (Is.string(candidate.notebookType) || Is.string(candidate.scheme) || Is.string(candidate.pattern));
    }
    NotebookDocumentFilter2.is = is;
  })(NotebookDocumentFilter || (exports.NotebookDocumentFilter = NotebookDocumentFilter = {}));
  var NotebookCellTextDocumentFilter;
  (function(NotebookCellTextDocumentFilter2) {
    function is(value) {
      const candidate = value;
      return Is.objectLiteral(candidate) && (Is.string(candidate.notebook) || NotebookDocumentFilter.is(candidate.notebook)) && (candidate.language === undefined || Is.string(candidate.language));
    }
    NotebookCellTextDocumentFilter2.is = is;
  })(NotebookCellTextDocumentFilter || (exports.NotebookCellTextDocumentFilter = NotebookCellTextDocumentFilter = {}));
  var DocumentSelector;
  (function(DocumentSelector2) {
    function is(value) {
      if (!Array.isArray(value)) {
        return false;
      }
      for (let elem of value) {
        if (!Is.string(elem) && !TextDocumentFilter.is(elem) && !NotebookCellTextDocumentFilter.is(elem)) {
          return false;
        }
      }
      return true;
    }
    DocumentSelector2.is = is;
  })(DocumentSelector || (exports.DocumentSelector = DocumentSelector = {}));
  var RegistrationRequest;
  (function(RegistrationRequest2) {
    RegistrationRequest2.method = "client/registerCapability";
    RegistrationRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
    RegistrationRequest2.type = new messages_1.ProtocolRequestType(RegistrationRequest2.method);
  })(RegistrationRequest || (exports.RegistrationRequest = RegistrationRequest = {}));
  var UnregistrationRequest;
  (function(UnregistrationRequest2) {
    UnregistrationRequest2.method = "client/unregisterCapability";
    UnregistrationRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
    UnregistrationRequest2.type = new messages_1.ProtocolRequestType(UnregistrationRequest2.method);
  })(UnregistrationRequest || (exports.UnregistrationRequest = UnregistrationRequest = {}));
  var ResourceOperationKind;
  (function(ResourceOperationKind2) {
    ResourceOperationKind2.Create = "create";
    ResourceOperationKind2.Rename = "rename";
    ResourceOperationKind2.Delete = "delete";
  })(ResourceOperationKind || (exports.ResourceOperationKind = ResourceOperationKind = {}));
  var FailureHandlingKind;
  (function(FailureHandlingKind2) {
    FailureHandlingKind2.Abort = "abort";
    FailureHandlingKind2.Transactional = "transactional";
    FailureHandlingKind2.TextOnlyTransactional = "textOnlyTransactional";
    FailureHandlingKind2.Undo = "undo";
  })(FailureHandlingKind || (exports.FailureHandlingKind = FailureHandlingKind = {}));
  var PositionEncodingKind;
  (function(PositionEncodingKind2) {
    PositionEncodingKind2.UTF8 = "utf-8";
    PositionEncodingKind2.UTF16 = "utf-16";
    PositionEncodingKind2.UTF32 = "utf-32";
  })(PositionEncodingKind || (exports.PositionEncodingKind = PositionEncodingKind = {}));
  var StaticRegistrationOptions;
  (function(StaticRegistrationOptions2) {
    function hasId(value) {
      const candidate = value;
      return candidate && Is.string(candidate.id) && candidate.id.length > 0;
    }
    StaticRegistrationOptions2.hasId = hasId;
  })(StaticRegistrationOptions || (exports.StaticRegistrationOptions = StaticRegistrationOptions = {}));
  var TextDocumentRegistrationOptions;
  (function(TextDocumentRegistrationOptions2) {
    function is(value) {
      const candidate = value;
      return candidate && (candidate.documentSelector === null || DocumentSelector.is(candidate.documentSelector));
    }
    TextDocumentRegistrationOptions2.is = is;
  })(TextDocumentRegistrationOptions || (exports.TextDocumentRegistrationOptions = TextDocumentRegistrationOptions = {}));
  var WorkDoneProgressOptions;
  (function(WorkDoneProgressOptions2) {
    function is(value) {
      const candidate = value;
      return Is.objectLiteral(candidate) && (candidate.workDoneProgress === undefined || Is.boolean(candidate.workDoneProgress));
    }
    WorkDoneProgressOptions2.is = is;
    function hasWorkDoneProgress(value) {
      const candidate = value;
      return candidate && Is.boolean(candidate.workDoneProgress);
    }
    WorkDoneProgressOptions2.hasWorkDoneProgress = hasWorkDoneProgress;
  })(WorkDoneProgressOptions || (exports.WorkDoneProgressOptions = WorkDoneProgressOptions = {}));
  var InitializeRequest;
  (function(InitializeRequest2) {
    InitializeRequest2.method = "initialize";
    InitializeRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    InitializeRequest2.type = new messages_1.ProtocolRequestType(InitializeRequest2.method);
  })(InitializeRequest || (exports.InitializeRequest = InitializeRequest = {}));
  var InitializeErrorCodes;
  (function(InitializeErrorCodes2) {
    InitializeErrorCodes2.unknownProtocolVersion = 1;
  })(InitializeErrorCodes || (exports.InitializeErrorCodes = InitializeErrorCodes = {}));
  var InitializedNotification;
  (function(InitializedNotification2) {
    InitializedNotification2.method = "initialized";
    InitializedNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
    InitializedNotification2.type = new messages_1.ProtocolNotificationType(InitializedNotification2.method);
  })(InitializedNotification || (exports.InitializedNotification = InitializedNotification = {}));
  var ShutdownRequest;
  (function(ShutdownRequest2) {
    ShutdownRequest2.method = "shutdown";
    ShutdownRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    ShutdownRequest2.type = new messages_1.ProtocolRequestType0(ShutdownRequest2.method);
  })(ShutdownRequest || (exports.ShutdownRequest = ShutdownRequest = {}));
  var ExitNotification;
  (function(ExitNotification2) {
    ExitNotification2.method = "exit";
    ExitNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
    ExitNotification2.type = new messages_1.ProtocolNotificationType0(ExitNotification2.method);
  })(ExitNotification || (exports.ExitNotification = ExitNotification = {}));
  var DidChangeConfigurationNotification;
  (function(DidChangeConfigurationNotification2) {
    DidChangeConfigurationNotification2.method = "workspace/didChangeConfiguration";
    DidChangeConfigurationNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
    DidChangeConfigurationNotification2.type = new messages_1.ProtocolNotificationType(DidChangeConfigurationNotification2.method);
  })(DidChangeConfigurationNotification || (exports.DidChangeConfigurationNotification = DidChangeConfigurationNotification = {}));
  var MessageType;
  (function(MessageType2) {
    MessageType2.Error = 1;
    MessageType2.Warning = 2;
    MessageType2.Info = 3;
    MessageType2.Log = 4;
    MessageType2.Debug = 5;
  })(MessageType || (exports.MessageType = MessageType = {}));
  var ShowMessageNotification;
  (function(ShowMessageNotification2) {
    ShowMessageNotification2.method = "window/showMessage";
    ShowMessageNotification2.messageDirection = messages_1.MessageDirection.serverToClient;
    ShowMessageNotification2.type = new messages_1.ProtocolNotificationType(ShowMessageNotification2.method);
  })(ShowMessageNotification || (exports.ShowMessageNotification = ShowMessageNotification = {}));
  var ShowMessageRequest;
  (function(ShowMessageRequest2) {
    ShowMessageRequest2.method = "window/showMessageRequest";
    ShowMessageRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
    ShowMessageRequest2.type = new messages_1.ProtocolRequestType(ShowMessageRequest2.method);
  })(ShowMessageRequest || (exports.ShowMessageRequest = ShowMessageRequest = {}));
  var LogMessageNotification;
  (function(LogMessageNotification2) {
    LogMessageNotification2.method = "window/logMessage";
    LogMessageNotification2.messageDirection = messages_1.MessageDirection.serverToClient;
    LogMessageNotification2.type = new messages_1.ProtocolNotificationType(LogMessageNotification2.method);
  })(LogMessageNotification || (exports.LogMessageNotification = LogMessageNotification = {}));
  var TelemetryEventNotification;
  (function(TelemetryEventNotification2) {
    TelemetryEventNotification2.method = "telemetry/event";
    TelemetryEventNotification2.messageDirection = messages_1.MessageDirection.serverToClient;
    TelemetryEventNotification2.type = new messages_1.ProtocolNotificationType(TelemetryEventNotification2.method);
  })(TelemetryEventNotification || (exports.TelemetryEventNotification = TelemetryEventNotification = {}));
  var TextDocumentSyncKind;
  (function(TextDocumentSyncKind2) {
    TextDocumentSyncKind2.None = 0;
    TextDocumentSyncKind2.Full = 1;
    TextDocumentSyncKind2.Incremental = 2;
  })(TextDocumentSyncKind || (exports.TextDocumentSyncKind = TextDocumentSyncKind = {}));
  var DidOpenTextDocumentNotification;
  (function(DidOpenTextDocumentNotification2) {
    DidOpenTextDocumentNotification2.method = "textDocument/didOpen";
    DidOpenTextDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
    DidOpenTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidOpenTextDocumentNotification2.method);
  })(DidOpenTextDocumentNotification || (exports.DidOpenTextDocumentNotification = DidOpenTextDocumentNotification = {}));
  var TextDocumentContentChangeEvent;
  (function(TextDocumentContentChangeEvent2) {
    function isIncremental(event) {
      let candidate = event;
      return candidate !== undefined && candidate !== null && typeof candidate.text === "string" && candidate.range !== undefined && (candidate.rangeLength === undefined || typeof candidate.rangeLength === "number");
    }
    TextDocumentContentChangeEvent2.isIncremental = isIncremental;
    function isFull(event) {
      let candidate = event;
      return candidate !== undefined && candidate !== null && typeof candidate.text === "string" && candidate.range === undefined && candidate.rangeLength === undefined;
    }
    TextDocumentContentChangeEvent2.isFull = isFull;
  })(TextDocumentContentChangeEvent || (exports.TextDocumentContentChangeEvent = TextDocumentContentChangeEvent = {}));
  var DidChangeTextDocumentNotification;
  (function(DidChangeTextDocumentNotification2) {
    DidChangeTextDocumentNotification2.method = "textDocument/didChange";
    DidChangeTextDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
    DidChangeTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidChangeTextDocumentNotification2.method);
  })(DidChangeTextDocumentNotification || (exports.DidChangeTextDocumentNotification = DidChangeTextDocumentNotification = {}));
  var DidCloseTextDocumentNotification;
  (function(DidCloseTextDocumentNotification2) {
    DidCloseTextDocumentNotification2.method = "textDocument/didClose";
    DidCloseTextDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
    DidCloseTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidCloseTextDocumentNotification2.method);
  })(DidCloseTextDocumentNotification || (exports.DidCloseTextDocumentNotification = DidCloseTextDocumentNotification = {}));
  var DidSaveTextDocumentNotification;
  (function(DidSaveTextDocumentNotification2) {
    DidSaveTextDocumentNotification2.method = "textDocument/didSave";
    DidSaveTextDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
    DidSaveTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidSaveTextDocumentNotification2.method);
  })(DidSaveTextDocumentNotification || (exports.DidSaveTextDocumentNotification = DidSaveTextDocumentNotification = {}));
  var TextDocumentSaveReason;
  (function(TextDocumentSaveReason2) {
    TextDocumentSaveReason2.Manual = 1;
    TextDocumentSaveReason2.AfterDelay = 2;
    TextDocumentSaveReason2.FocusOut = 3;
  })(TextDocumentSaveReason || (exports.TextDocumentSaveReason = TextDocumentSaveReason = {}));
  var WillSaveTextDocumentNotification;
  (function(WillSaveTextDocumentNotification2) {
    WillSaveTextDocumentNotification2.method = "textDocument/willSave";
    WillSaveTextDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
    WillSaveTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(WillSaveTextDocumentNotification2.method);
  })(WillSaveTextDocumentNotification || (exports.WillSaveTextDocumentNotification = WillSaveTextDocumentNotification = {}));
  var WillSaveTextDocumentWaitUntilRequest;
  (function(WillSaveTextDocumentWaitUntilRequest2) {
    WillSaveTextDocumentWaitUntilRequest2.method = "textDocument/willSaveWaitUntil";
    WillSaveTextDocumentWaitUntilRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    WillSaveTextDocumentWaitUntilRequest2.type = new messages_1.ProtocolRequestType(WillSaveTextDocumentWaitUntilRequest2.method);
  })(WillSaveTextDocumentWaitUntilRequest || (exports.WillSaveTextDocumentWaitUntilRequest = WillSaveTextDocumentWaitUntilRequest = {}));
  var DidChangeWatchedFilesNotification;
  (function(DidChangeWatchedFilesNotification2) {
    DidChangeWatchedFilesNotification2.method = "workspace/didChangeWatchedFiles";
    DidChangeWatchedFilesNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
    DidChangeWatchedFilesNotification2.type = new messages_1.ProtocolNotificationType(DidChangeWatchedFilesNotification2.method);
  })(DidChangeWatchedFilesNotification || (exports.DidChangeWatchedFilesNotification = DidChangeWatchedFilesNotification = {}));
  var FileChangeType;
  (function(FileChangeType2) {
    FileChangeType2.Created = 1;
    FileChangeType2.Changed = 2;
    FileChangeType2.Deleted = 3;
  })(FileChangeType || (exports.FileChangeType = FileChangeType = {}));
  var RelativePattern;
  (function(RelativePattern2) {
    function is(value) {
      const candidate = value;
      return Is.objectLiteral(candidate) && (vscode_languageserver_types_1.URI.is(candidate.baseUri) || vscode_languageserver_types_1.WorkspaceFolder.is(candidate.baseUri)) && Is.string(candidate.pattern);
    }
    RelativePattern2.is = is;
  })(RelativePattern || (exports.RelativePattern = RelativePattern = {}));
  var WatchKind;
  (function(WatchKind2) {
    WatchKind2.Create = 1;
    WatchKind2.Change = 2;
    WatchKind2.Delete = 4;
  })(WatchKind || (exports.WatchKind = WatchKind = {}));
  var PublishDiagnosticsNotification;
  (function(PublishDiagnosticsNotification2) {
    PublishDiagnosticsNotification2.method = "textDocument/publishDiagnostics";
    PublishDiagnosticsNotification2.messageDirection = messages_1.MessageDirection.serverToClient;
    PublishDiagnosticsNotification2.type = new messages_1.ProtocolNotificationType(PublishDiagnosticsNotification2.method);
  })(PublishDiagnosticsNotification || (exports.PublishDiagnosticsNotification = PublishDiagnosticsNotification = {}));
  var CompletionTriggerKind;
  (function(CompletionTriggerKind2) {
    CompletionTriggerKind2.Invoked = 1;
    CompletionTriggerKind2.TriggerCharacter = 2;
    CompletionTriggerKind2.TriggerForIncompleteCompletions = 3;
  })(CompletionTriggerKind || (exports.CompletionTriggerKind = CompletionTriggerKind = {}));
  var CompletionRequest;
  (function(CompletionRequest2) {
    CompletionRequest2.method = "textDocument/completion";
    CompletionRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    CompletionRequest2.type = new messages_1.ProtocolRequestType(CompletionRequest2.method);
  })(CompletionRequest || (exports.CompletionRequest = CompletionRequest = {}));
  var CompletionResolveRequest;
  (function(CompletionResolveRequest2) {
    CompletionResolveRequest2.method = "completionItem/resolve";
    CompletionResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    CompletionResolveRequest2.type = new messages_1.ProtocolRequestType(CompletionResolveRequest2.method);
  })(CompletionResolveRequest || (exports.CompletionResolveRequest = CompletionResolveRequest = {}));
  var HoverRequest;
  (function(HoverRequest2) {
    HoverRequest2.method = "textDocument/hover";
    HoverRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    HoverRequest2.type = new messages_1.ProtocolRequestType(HoverRequest2.method);
  })(HoverRequest || (exports.HoverRequest = HoverRequest = {}));
  var SignatureHelpTriggerKind;
  (function(SignatureHelpTriggerKind2) {
    SignatureHelpTriggerKind2.Invoked = 1;
    SignatureHelpTriggerKind2.TriggerCharacter = 2;
    SignatureHelpTriggerKind2.ContentChange = 3;
  })(SignatureHelpTriggerKind || (exports.SignatureHelpTriggerKind = SignatureHelpTriggerKind = {}));
  var SignatureHelpRequest;
  (function(SignatureHelpRequest2) {
    SignatureHelpRequest2.method = "textDocument/signatureHelp";
    SignatureHelpRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    SignatureHelpRequest2.type = new messages_1.ProtocolRequestType(SignatureHelpRequest2.method);
  })(SignatureHelpRequest || (exports.SignatureHelpRequest = SignatureHelpRequest = {}));
  var DefinitionRequest;
  (function(DefinitionRequest2) {
    DefinitionRequest2.method = "textDocument/definition";
    DefinitionRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    DefinitionRequest2.type = new messages_1.ProtocolRequestType(DefinitionRequest2.method);
  })(DefinitionRequest || (exports.DefinitionRequest = DefinitionRequest = {}));
  var ReferencesRequest;
  (function(ReferencesRequest2) {
    ReferencesRequest2.method = "textDocument/references";
    ReferencesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    ReferencesRequest2.type = new messages_1.ProtocolRequestType(ReferencesRequest2.method);
  })(ReferencesRequest || (exports.ReferencesRequest = ReferencesRequest = {}));
  var DocumentHighlightRequest;
  (function(DocumentHighlightRequest2) {
    DocumentHighlightRequest2.method = "textDocument/documentHighlight";
    DocumentHighlightRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentHighlightRequest2.type = new messages_1.ProtocolRequestType(DocumentHighlightRequest2.method);
  })(DocumentHighlightRequest || (exports.DocumentHighlightRequest = DocumentHighlightRequest = {}));
  var DocumentSymbolRequest;
  (function(DocumentSymbolRequest2) {
    DocumentSymbolRequest2.method = "textDocument/documentSymbol";
    DocumentSymbolRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentSymbolRequest2.type = new messages_1.ProtocolRequestType(DocumentSymbolRequest2.method);
  })(DocumentSymbolRequest || (exports.DocumentSymbolRequest = DocumentSymbolRequest = {}));
  var CodeActionRequest;
  (function(CodeActionRequest2) {
    CodeActionRequest2.method = "textDocument/codeAction";
    CodeActionRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    CodeActionRequest2.type = new messages_1.ProtocolRequestType(CodeActionRequest2.method);
  })(CodeActionRequest || (exports.CodeActionRequest = CodeActionRequest = {}));
  var CodeActionResolveRequest;
  (function(CodeActionResolveRequest2) {
    CodeActionResolveRequest2.method = "codeAction/resolve";
    CodeActionResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    CodeActionResolveRequest2.type = new messages_1.ProtocolRequestType(CodeActionResolveRequest2.method);
  })(CodeActionResolveRequest || (exports.CodeActionResolveRequest = CodeActionResolveRequest = {}));
  var WorkspaceSymbolRequest;
  (function(WorkspaceSymbolRequest2) {
    WorkspaceSymbolRequest2.method = "workspace/symbol";
    WorkspaceSymbolRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    WorkspaceSymbolRequest2.type = new messages_1.ProtocolRequestType(WorkspaceSymbolRequest2.method);
  })(WorkspaceSymbolRequest || (exports.WorkspaceSymbolRequest = WorkspaceSymbolRequest = {}));
  var WorkspaceSymbolResolveRequest;
  (function(WorkspaceSymbolResolveRequest2) {
    WorkspaceSymbolResolveRequest2.method = "workspaceSymbol/resolve";
    WorkspaceSymbolResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    WorkspaceSymbolResolveRequest2.type = new messages_1.ProtocolRequestType(WorkspaceSymbolResolveRequest2.method);
  })(WorkspaceSymbolResolveRequest || (exports.WorkspaceSymbolResolveRequest = WorkspaceSymbolResolveRequest = {}));
  var CodeLensRequest;
  (function(CodeLensRequest2) {
    CodeLensRequest2.method = "textDocument/codeLens";
    CodeLensRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    CodeLensRequest2.type = new messages_1.ProtocolRequestType(CodeLensRequest2.method);
  })(CodeLensRequest || (exports.CodeLensRequest = CodeLensRequest = {}));
  var CodeLensResolveRequest;
  (function(CodeLensResolveRequest2) {
    CodeLensResolveRequest2.method = "codeLens/resolve";
    CodeLensResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    CodeLensResolveRequest2.type = new messages_1.ProtocolRequestType(CodeLensResolveRequest2.method);
  })(CodeLensResolveRequest || (exports.CodeLensResolveRequest = CodeLensResolveRequest = {}));
  var CodeLensRefreshRequest;
  (function(CodeLensRefreshRequest2) {
    CodeLensRefreshRequest2.method = `workspace/codeLens/refresh`;
    CodeLensRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
    CodeLensRefreshRequest2.type = new messages_1.ProtocolRequestType0(CodeLensRefreshRequest2.method);
  })(CodeLensRefreshRequest || (exports.CodeLensRefreshRequest = CodeLensRefreshRequest = {}));
  var DocumentLinkRequest;
  (function(DocumentLinkRequest2) {
    DocumentLinkRequest2.method = "textDocument/documentLink";
    DocumentLinkRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentLinkRequest2.type = new messages_1.ProtocolRequestType(DocumentLinkRequest2.method);
  })(DocumentLinkRequest || (exports.DocumentLinkRequest = DocumentLinkRequest = {}));
  var DocumentLinkResolveRequest;
  (function(DocumentLinkResolveRequest2) {
    DocumentLinkResolveRequest2.method = "documentLink/resolve";
    DocumentLinkResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentLinkResolveRequest2.type = new messages_1.ProtocolRequestType(DocumentLinkResolveRequest2.method);
  })(DocumentLinkResolveRequest || (exports.DocumentLinkResolveRequest = DocumentLinkResolveRequest = {}));
  var DocumentFormattingRequest;
  (function(DocumentFormattingRequest2) {
    DocumentFormattingRequest2.method = "textDocument/formatting";
    DocumentFormattingRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentFormattingRequest2.type = new messages_1.ProtocolRequestType(DocumentFormattingRequest2.method);
  })(DocumentFormattingRequest || (exports.DocumentFormattingRequest = DocumentFormattingRequest = {}));
  var DocumentRangeFormattingRequest;
  (function(DocumentRangeFormattingRequest2) {
    DocumentRangeFormattingRequest2.method = "textDocument/rangeFormatting";
    DocumentRangeFormattingRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentRangeFormattingRequest2.type = new messages_1.ProtocolRequestType(DocumentRangeFormattingRequest2.method);
  })(DocumentRangeFormattingRequest || (exports.DocumentRangeFormattingRequest = DocumentRangeFormattingRequest = {}));
  var DocumentRangesFormattingRequest;
  (function(DocumentRangesFormattingRequest2) {
    DocumentRangesFormattingRequest2.method = "textDocument/rangesFormatting";
    DocumentRangesFormattingRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentRangesFormattingRequest2.type = new messages_1.ProtocolRequestType(DocumentRangesFormattingRequest2.method);
  })(DocumentRangesFormattingRequest || (exports.DocumentRangesFormattingRequest = DocumentRangesFormattingRequest = {}));
  var DocumentOnTypeFormattingRequest;
  (function(DocumentOnTypeFormattingRequest2) {
    DocumentOnTypeFormattingRequest2.method = "textDocument/onTypeFormatting";
    DocumentOnTypeFormattingRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentOnTypeFormattingRequest2.type = new messages_1.ProtocolRequestType(DocumentOnTypeFormattingRequest2.method);
  })(DocumentOnTypeFormattingRequest || (exports.DocumentOnTypeFormattingRequest = DocumentOnTypeFormattingRequest = {}));
  var PrepareSupportDefaultBehavior;
  (function(PrepareSupportDefaultBehavior2) {
    PrepareSupportDefaultBehavior2.Identifier = 1;
  })(PrepareSupportDefaultBehavior || (exports.PrepareSupportDefaultBehavior = PrepareSupportDefaultBehavior = {}));
  var RenameRequest;
  (function(RenameRequest2) {
    RenameRequest2.method = "textDocument/rename";
    RenameRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    RenameRequest2.type = new messages_1.ProtocolRequestType(RenameRequest2.method);
  })(RenameRequest || (exports.RenameRequest = RenameRequest = {}));
  var PrepareRenameRequest;
  (function(PrepareRenameRequest2) {
    PrepareRenameRequest2.method = "textDocument/prepareRename";
    PrepareRenameRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    PrepareRenameRequest2.type = new messages_1.ProtocolRequestType(PrepareRenameRequest2.method);
  })(PrepareRenameRequest || (exports.PrepareRenameRequest = PrepareRenameRequest = {}));
  var ExecuteCommandRequest;
  (function(ExecuteCommandRequest2) {
    ExecuteCommandRequest2.method = "workspace/executeCommand";
    ExecuteCommandRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
    ExecuteCommandRequest2.type = new messages_1.ProtocolRequestType(ExecuteCommandRequest2.method);
  })(ExecuteCommandRequest || (exports.ExecuteCommandRequest = ExecuteCommandRequest = {}));
  var ApplyWorkspaceEditRequest;
  (function(ApplyWorkspaceEditRequest2) {
    ApplyWorkspaceEditRequest2.method = "workspace/applyEdit";
    ApplyWorkspaceEditRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
    ApplyWorkspaceEditRequest2.type = new messages_1.ProtocolRequestType("workspace/applyEdit");
  })(ApplyWorkspaceEditRequest || (exports.ApplyWorkspaceEditRequest = ApplyWorkspaceEditRequest = {}));
});

// node_modules/vscode-languageserver-protocol/lib/common/connection.js
var require_connection2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.createProtocolConnection = undefined;
  var vscode_jsonrpc_1 = require_main();
  function createProtocolConnection(input, output, logger, options) {
    if (vscode_jsonrpc_1.ConnectionStrategy.is(options)) {
      options = { connectionStrategy: options };
    }
    return (0, vscode_jsonrpc_1.createMessageConnection)(input, output, logger, options);
  }
  exports.createProtocolConnection = createProtocolConnection;
});

// node_modules/vscode-languageserver-protocol/lib/common/api.js
var require_api2 = __commonJS((exports) => {
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = exports && exports.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
        __createBinding(exports2, m, p);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.LSPErrorCodes = exports.createProtocolConnection = undefined;
  __exportStar(require_main(), exports);
  __exportStar(require_main2(), exports);
  __exportStar(require_messages2(), exports);
  __exportStar(require_protocol(), exports);
  var connection_1 = require_connection2();
  Object.defineProperty(exports, "createProtocolConnection", { enumerable: true, get: function() {
    return connection_1.createProtocolConnection;
  } });
  var LSPErrorCodes;
  (function(LSPErrorCodes2) {
    LSPErrorCodes2.lspReservedErrorRangeStart = -32899;
    LSPErrorCodes2.RequestFailed = -32803;
    LSPErrorCodes2.ServerCancelled = -32802;
    LSPErrorCodes2.ContentModified = -32801;
    LSPErrorCodes2.RequestCancelled = -32800;
    LSPErrorCodes2.lspReservedErrorRangeEnd = -32800;
  })(LSPErrorCodes || (exports.LSPErrorCodes = LSPErrorCodes = {}));
});

// node_modules/vscode-languageserver-protocol/lib/node/main.js
var require_main3 = __commonJS((exports) => {
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = exports && exports.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
        __createBinding(exports2, m, p);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.createProtocolConnection = undefined;
  var node_1 = require_main();
  __exportStar(require_main(), exports);
  __exportStar(require_api2(), exports);
  function createProtocolConnection(input, output, logger, options) {
    return (0, node_1.createMessageConnection)(input, output, logger, options);
  }
  exports.createProtocolConnection = createProtocolConnection;
});

// node_modules/vscode-languageserver/lib/common/utils/uuid.js
var require_uuid = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.generateUuid = exports.parse = exports.isUUID = exports.v4 = exports.empty = undefined;

  class ValueUUID {
    constructor(_value) {
      this._value = _value;
    }
    asHex() {
      return this._value;
    }
    equals(other) {
      return this.asHex() === other.asHex();
    }
  }

  class V4UUID extends ValueUUID {
    static _oneOf(array) {
      return array[Math.floor(array.length * Math.random())];
    }
    static _randomHex() {
      return V4UUID._oneOf(V4UUID._chars);
    }
    constructor() {
      super([
        V4UUID._randomHex(),
        V4UUID._randomHex(),
        V4UUID._randomHex(),
        V4UUID._randomHex(),
        V4UUID._randomHex(),
        V4UUID._randomHex(),
        V4UUID._randomHex(),
        V4UUID._randomHex(),
        "-",
        V4UUID._randomHex(),
        V4UUID._randomHex(),
        V4UUID._randomHex(),
        V4UUID._randomHex(),
        "-",
        "4",
        V4UUID._randomHex(),
        V4UUID._randomHex(),
        V4UUID._randomHex(),
        "-",
        V4UUID._oneOf(V4UUID._timeHighBits),
        V4UUID._randomHex(),
        V4UUID._randomHex(),
        V4UUID._randomHex(),
        "-",
        V4UUID._randomHex(),
        V4UUID._randomHex(),
        V4UUID._randomHex(),
        V4UUID._randomHex(),
        V4UUID._randomHex(),
        V4UUID._randomHex(),
        V4UUID._randomHex(),
        V4UUID._randomHex(),
        V4UUID._randomHex(),
        V4UUID._randomHex(),
        V4UUID._randomHex(),
        V4UUID._randomHex()
      ].join(""));
    }
  }
  V4UUID._chars = ["0", "1", "2", "3", "4", "5", "6", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
  V4UUID._timeHighBits = ["8", "9", "a", "b"];
  exports.empty = new ValueUUID("00000000-0000-0000-0000-000000000000");
  function v4() {
    return new V4UUID;
  }
  exports.v4 = v4;
  var _UUIDPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  function isUUID(value) {
    return _UUIDPattern.test(value);
  }
  exports.isUUID = isUUID;
  function parse(value) {
    if (!isUUID(value)) {
      throw new Error("invalid uuid");
    }
    return new ValueUUID(value);
  }
  exports.parse = parse;
  function generateUuid() {
    return v4().asHex();
  }
  exports.generateUuid = generateUuid;
});

// node_modules/vscode-languageserver/lib/common/progress.js
var require_progress = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.attachPartialResult = exports.ProgressFeature = exports.attachWorkDone = undefined;
  var vscode_languageserver_protocol_1 = require_main3();
  var uuid_1 = require_uuid();

  class WorkDoneProgressReporterImpl {
    constructor(_connection, _token) {
      this._connection = _connection;
      this._token = _token;
      WorkDoneProgressReporterImpl.Instances.set(this._token, this);
    }
    begin(title, percentage, message, cancellable) {
      let param = {
        kind: "begin",
        title,
        percentage,
        message,
        cancellable
      };
      this._connection.sendProgress(vscode_languageserver_protocol_1.WorkDoneProgress.type, this._token, param);
    }
    report(arg0, arg1) {
      let param = {
        kind: "report"
      };
      if (typeof arg0 === "number") {
        param.percentage = arg0;
        if (arg1 !== undefined) {
          param.message = arg1;
        }
      } else {
        param.message = arg0;
      }
      this._connection.sendProgress(vscode_languageserver_protocol_1.WorkDoneProgress.type, this._token, param);
    }
    done() {
      WorkDoneProgressReporterImpl.Instances.delete(this._token);
      this._connection.sendProgress(vscode_languageserver_protocol_1.WorkDoneProgress.type, this._token, { kind: "end" });
    }
  }
  WorkDoneProgressReporterImpl.Instances = new Map;

  class WorkDoneProgressServerReporterImpl extends WorkDoneProgressReporterImpl {
    constructor(connection, token) {
      super(connection, token);
      this._source = new vscode_languageserver_protocol_1.CancellationTokenSource;
    }
    get token() {
      return this._source.token;
    }
    done() {
      this._source.dispose();
      super.done();
    }
    cancel() {
      this._source.cancel();
    }
  }

  class NullProgressReporter {
    constructor() {}
    begin() {}
    report() {}
    done() {}
  }

  class NullProgressServerReporter extends NullProgressReporter {
    constructor() {
      super();
      this._source = new vscode_languageserver_protocol_1.CancellationTokenSource;
    }
    get token() {
      return this._source.token;
    }
    done() {
      this._source.dispose();
    }
    cancel() {
      this._source.cancel();
    }
  }
  function attachWorkDone(connection, params) {
    if (params === undefined || params.workDoneToken === undefined) {
      return new NullProgressReporter;
    }
    const token = params.workDoneToken;
    delete params.workDoneToken;
    return new WorkDoneProgressReporterImpl(connection, token);
  }
  exports.attachWorkDone = attachWorkDone;
  var ProgressFeature = (Base) => {
    return class extends Base {
      constructor() {
        super();
        this._progressSupported = false;
      }
      initialize(capabilities) {
        super.initialize(capabilities);
        if (capabilities?.window?.workDoneProgress === true) {
          this._progressSupported = true;
          this.connection.onNotification(vscode_languageserver_protocol_1.WorkDoneProgressCancelNotification.type, (params) => {
            let progress = WorkDoneProgressReporterImpl.Instances.get(params.token);
            if (progress instanceof WorkDoneProgressServerReporterImpl || progress instanceof NullProgressServerReporter) {
              progress.cancel();
            }
          });
        }
      }
      attachWorkDoneProgress(token) {
        if (token === undefined) {
          return new NullProgressReporter;
        } else {
          return new WorkDoneProgressReporterImpl(this.connection, token);
        }
      }
      createWorkDoneProgress() {
        if (this._progressSupported) {
          const token = (0, uuid_1.generateUuid)();
          return this.connection.sendRequest(vscode_languageserver_protocol_1.WorkDoneProgressCreateRequest.type, { token }).then(() => {
            const result = new WorkDoneProgressServerReporterImpl(this.connection, token);
            return result;
          });
        } else {
          return Promise.resolve(new NullProgressServerReporter);
        }
      }
    };
  };
  exports.ProgressFeature = ProgressFeature;
  var ResultProgress;
  (function(ResultProgress2) {
    ResultProgress2.type = new vscode_languageserver_protocol_1.ProgressType;
  })(ResultProgress || (ResultProgress = {}));

  class ResultProgressReporterImpl {
    constructor(_connection, _token) {
      this._connection = _connection;
      this._token = _token;
    }
    report(data) {
      this._connection.sendProgress(ResultProgress.type, this._token, data);
    }
  }
  function attachPartialResult(connection, params) {
    if (params === undefined || params.partialResultToken === undefined) {
      return;
    }
    const token = params.partialResultToken;
    delete params.partialResultToken;
    return new ResultProgressReporterImpl(connection, token);
  }
  exports.attachPartialResult = attachPartialResult;
});

// node_modules/vscode-languageserver/lib/common/configuration.js
var require_configuration = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ConfigurationFeature = undefined;
  var vscode_languageserver_protocol_1 = require_main3();
  var Is = require_is();
  var ConfigurationFeature = (Base) => {
    return class extends Base {
      getConfiguration(arg) {
        if (!arg) {
          return this._getConfiguration({});
        } else if (Is.string(arg)) {
          return this._getConfiguration({ section: arg });
        } else {
          return this._getConfiguration(arg);
        }
      }
      _getConfiguration(arg) {
        let params = {
          items: Array.isArray(arg) ? arg : [arg]
        };
        return this.connection.sendRequest(vscode_languageserver_protocol_1.ConfigurationRequest.type, params).then((result) => {
          if (Array.isArray(result)) {
            return Array.isArray(arg) ? result : result[0];
          } else {
            return Array.isArray(arg) ? [] : null;
          }
        });
      }
    };
  };
  exports.ConfigurationFeature = ConfigurationFeature;
});

// node_modules/vscode-languageserver/lib/common/workspaceFolder.js
var require_workspaceFolder = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.WorkspaceFoldersFeature = undefined;
  var vscode_languageserver_protocol_1 = require_main3();
  var WorkspaceFoldersFeature = (Base) => {
    return class extends Base {
      constructor() {
        super();
        this._notificationIsAutoRegistered = false;
      }
      initialize(capabilities) {
        super.initialize(capabilities);
        let workspaceCapabilities = capabilities.workspace;
        if (workspaceCapabilities && workspaceCapabilities.workspaceFolders) {
          this._onDidChangeWorkspaceFolders = new vscode_languageserver_protocol_1.Emitter;
          this.connection.onNotification(vscode_languageserver_protocol_1.DidChangeWorkspaceFoldersNotification.type, (params) => {
            this._onDidChangeWorkspaceFolders.fire(params.event);
          });
        }
      }
      fillServerCapabilities(capabilities) {
        super.fillServerCapabilities(capabilities);
        const changeNotifications = capabilities.workspace?.workspaceFolders?.changeNotifications;
        this._notificationIsAutoRegistered = changeNotifications === true || typeof changeNotifications === "string";
      }
      getWorkspaceFolders() {
        return this.connection.sendRequest(vscode_languageserver_protocol_1.WorkspaceFoldersRequest.type);
      }
      get onDidChangeWorkspaceFolders() {
        if (!this._onDidChangeWorkspaceFolders) {
          throw new Error("Client doesn't support sending workspace folder change events.");
        }
        if (!this._notificationIsAutoRegistered && !this._unregistration) {
          this._unregistration = this.connection.client.register(vscode_languageserver_protocol_1.DidChangeWorkspaceFoldersNotification.type);
        }
        return this._onDidChangeWorkspaceFolders.event;
      }
    };
  };
  exports.WorkspaceFoldersFeature = WorkspaceFoldersFeature;
});

// node_modules/vscode-languageserver/lib/common/callHierarchy.js
var require_callHierarchy = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.CallHierarchyFeature = undefined;
  var vscode_languageserver_protocol_1 = require_main3();
  var CallHierarchyFeature = (Base) => {
    return class extends Base {
      get callHierarchy() {
        return {
          onPrepare: (handler) => {
            return this.connection.onRequest(vscode_languageserver_protocol_1.CallHierarchyPrepareRequest.type, (params, cancel) => {
              return handler(params, cancel, this.attachWorkDoneProgress(params), undefined);
            });
          },
          onIncomingCalls: (handler) => {
            const type = vscode_languageserver_protocol_1.CallHierarchyIncomingCallsRequest.type;
            return this.connection.onRequest(type, (params, cancel) => {
              return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
            });
          },
          onOutgoingCalls: (handler) => {
            const type = vscode_languageserver_protocol_1.CallHierarchyOutgoingCallsRequest.type;
            return this.connection.onRequest(type, (params, cancel) => {
              return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
            });
          }
        };
      }
    };
  };
  exports.CallHierarchyFeature = CallHierarchyFeature;
});

// node_modules/vscode-languageserver/lib/common/semanticTokens.js
var require_semanticTokens = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.SemanticTokensBuilder = exports.SemanticTokensDiff = exports.SemanticTokensFeature = undefined;
  var vscode_languageserver_protocol_1 = require_main3();
  var SemanticTokensFeature = (Base) => {
    return class extends Base {
      get semanticTokens() {
        return {
          refresh: () => {
            return this.connection.sendRequest(vscode_languageserver_protocol_1.SemanticTokensRefreshRequest.type);
          },
          on: (handler) => {
            const type = vscode_languageserver_protocol_1.SemanticTokensRequest.type;
            return this.connection.onRequest(type, (params, cancel) => {
              return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
            });
          },
          onDelta: (handler) => {
            const type = vscode_languageserver_protocol_1.SemanticTokensDeltaRequest.type;
            return this.connection.onRequest(type, (params, cancel) => {
              return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
            });
          },
          onRange: (handler) => {
            const type = vscode_languageserver_protocol_1.SemanticTokensRangeRequest.type;
            return this.connection.onRequest(type, (params, cancel) => {
              return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
            });
          }
        };
      }
    };
  };
  exports.SemanticTokensFeature = SemanticTokensFeature;

  class SemanticTokensDiff {
    constructor(originalSequence, modifiedSequence) {
      this.originalSequence = originalSequence;
      this.modifiedSequence = modifiedSequence;
    }
    computeDiff() {
      const originalLength = this.originalSequence.length;
      const modifiedLength = this.modifiedSequence.length;
      let startIndex = 0;
      while (startIndex < modifiedLength && startIndex < originalLength && this.originalSequence[startIndex] === this.modifiedSequence[startIndex]) {
        startIndex++;
      }
      if (startIndex < modifiedLength && startIndex < originalLength) {
        let originalEndIndex = originalLength - 1;
        let modifiedEndIndex = modifiedLength - 1;
        while (originalEndIndex >= startIndex && modifiedEndIndex >= startIndex && this.originalSequence[originalEndIndex] === this.modifiedSequence[modifiedEndIndex]) {
          originalEndIndex--;
          modifiedEndIndex--;
        }
        if (originalEndIndex < startIndex || modifiedEndIndex < startIndex) {
          originalEndIndex++;
          modifiedEndIndex++;
        }
        const deleteCount = originalEndIndex - startIndex + 1;
        const newData = this.modifiedSequence.slice(startIndex, modifiedEndIndex + 1);
        if (newData.length === 1 && newData[0] === this.originalSequence[originalEndIndex]) {
          return [
            { start: startIndex, deleteCount: deleteCount - 1 }
          ];
        } else {
          return [
            { start: startIndex, deleteCount, data: newData }
          ];
        }
      } else if (startIndex < modifiedLength) {
        return [
          { start: startIndex, deleteCount: 0, data: this.modifiedSequence.slice(startIndex) }
        ];
      } else if (startIndex < originalLength) {
        return [
          { start: startIndex, deleteCount: originalLength - startIndex }
        ];
      } else {
        return [];
      }
    }
  }
  exports.SemanticTokensDiff = SemanticTokensDiff;

  class SemanticTokensBuilder {
    constructor() {
      this._prevData = undefined;
      this.initialize();
    }
    initialize() {
      this._id = Date.now();
      this._prevLine = 0;
      this._prevChar = 0;
      this._data = [];
      this._dataLen = 0;
    }
    push(line, char, length, tokenType, tokenModifiers) {
      let pushLine = line;
      let pushChar = char;
      if (this._dataLen > 0) {
        pushLine -= this._prevLine;
        if (pushLine === 0) {
          pushChar -= this._prevChar;
        }
      }
      this._data[this._dataLen++] = pushLine;
      this._data[this._dataLen++] = pushChar;
      this._data[this._dataLen++] = length;
      this._data[this._dataLen++] = tokenType;
      this._data[this._dataLen++] = tokenModifiers;
      this._prevLine = line;
      this._prevChar = char;
    }
    get id() {
      return this._id.toString();
    }
    previousResult(id) {
      if (this.id === id) {
        this._prevData = this._data;
      }
      this.initialize();
    }
    build() {
      this._prevData = undefined;
      return {
        resultId: this.id,
        data: this._data
      };
    }
    canBuildEdits() {
      return this._prevData !== undefined;
    }
    buildEdits() {
      if (this._prevData !== undefined) {
        return {
          resultId: this.id,
          edits: new SemanticTokensDiff(this._prevData, this._data).computeDiff()
        };
      } else {
        return this.build();
      }
    }
  }
  exports.SemanticTokensBuilder = SemanticTokensBuilder;
});

// node_modules/vscode-languageserver/lib/common/showDocument.js
var require_showDocument = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ShowDocumentFeature = undefined;
  var vscode_languageserver_protocol_1 = require_main3();
  var ShowDocumentFeature = (Base) => {
    return class extends Base {
      showDocument(params) {
        return this.connection.sendRequest(vscode_languageserver_protocol_1.ShowDocumentRequest.type, params);
      }
    };
  };
  exports.ShowDocumentFeature = ShowDocumentFeature;
});

// node_modules/vscode-languageserver/lib/common/fileOperations.js
var require_fileOperations = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.FileOperationsFeature = undefined;
  var vscode_languageserver_protocol_1 = require_main3();
  var FileOperationsFeature = (Base) => {
    return class extends Base {
      onDidCreateFiles(handler) {
        return this.connection.onNotification(vscode_languageserver_protocol_1.DidCreateFilesNotification.type, (params) => {
          handler(params);
        });
      }
      onDidRenameFiles(handler) {
        return this.connection.onNotification(vscode_languageserver_protocol_1.DidRenameFilesNotification.type, (params) => {
          handler(params);
        });
      }
      onDidDeleteFiles(handler) {
        return this.connection.onNotification(vscode_languageserver_protocol_1.DidDeleteFilesNotification.type, (params) => {
          handler(params);
        });
      }
      onWillCreateFiles(handler) {
        return this.connection.onRequest(vscode_languageserver_protocol_1.WillCreateFilesRequest.type, (params, cancel) => {
          return handler(params, cancel);
        });
      }
      onWillRenameFiles(handler) {
        return this.connection.onRequest(vscode_languageserver_protocol_1.WillRenameFilesRequest.type, (params, cancel) => {
          return handler(params, cancel);
        });
      }
      onWillDeleteFiles(handler) {
        return this.connection.onRequest(vscode_languageserver_protocol_1.WillDeleteFilesRequest.type, (params, cancel) => {
          return handler(params, cancel);
        });
      }
    };
  };
  exports.FileOperationsFeature = FileOperationsFeature;
});

// node_modules/vscode-languageserver/lib/common/linkedEditingRange.js
var require_linkedEditingRange = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.LinkedEditingRangeFeature = undefined;
  var vscode_languageserver_protocol_1 = require_main3();
  var LinkedEditingRangeFeature = (Base) => {
    return class extends Base {
      onLinkedEditingRange(handler) {
        return this.connection.onRequest(vscode_languageserver_protocol_1.LinkedEditingRangeRequest.type, (params, cancel) => {
          return handler(params, cancel, this.attachWorkDoneProgress(params), undefined);
        });
      }
    };
  };
  exports.LinkedEditingRangeFeature = LinkedEditingRangeFeature;
});

// node_modules/vscode-languageserver/lib/common/typeHierarchy.js
var require_typeHierarchy = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TypeHierarchyFeature = undefined;
  var vscode_languageserver_protocol_1 = require_main3();
  var TypeHierarchyFeature = (Base) => {
    return class extends Base {
      get typeHierarchy() {
        return {
          onPrepare: (handler) => {
            return this.connection.onRequest(vscode_languageserver_protocol_1.TypeHierarchyPrepareRequest.type, (params, cancel) => {
              return handler(params, cancel, this.attachWorkDoneProgress(params), undefined);
            });
          },
          onSupertypes: (handler) => {
            const type = vscode_languageserver_protocol_1.TypeHierarchySupertypesRequest.type;
            return this.connection.onRequest(type, (params, cancel) => {
              return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
            });
          },
          onSubtypes: (handler) => {
            const type = vscode_languageserver_protocol_1.TypeHierarchySubtypesRequest.type;
            return this.connection.onRequest(type, (params, cancel) => {
              return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
            });
          }
        };
      }
    };
  };
  exports.TypeHierarchyFeature = TypeHierarchyFeature;
});

// node_modules/vscode-languageserver/lib/common/inlineValue.js
var require_inlineValue = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.InlineValueFeature = undefined;
  var vscode_languageserver_protocol_1 = require_main3();
  var InlineValueFeature = (Base) => {
    return class extends Base {
      get inlineValue() {
        return {
          refresh: () => {
            return this.connection.sendRequest(vscode_languageserver_protocol_1.InlineValueRefreshRequest.type);
          },
          on: (handler) => {
            return this.connection.onRequest(vscode_languageserver_protocol_1.InlineValueRequest.type, (params, cancel) => {
              return handler(params, cancel, this.attachWorkDoneProgress(params));
            });
          }
        };
      }
    };
  };
  exports.InlineValueFeature = InlineValueFeature;
});

// node_modules/vscode-languageserver/lib/common/foldingRange.js
var require_foldingRange = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.FoldingRangeFeature = undefined;
  var vscode_languageserver_protocol_1 = require_main3();
  var FoldingRangeFeature = (Base) => {
    return class extends Base {
      get foldingRange() {
        return {
          refresh: () => {
            return this.connection.sendRequest(vscode_languageserver_protocol_1.FoldingRangeRefreshRequest.type);
          },
          on: (handler) => {
            const type = vscode_languageserver_protocol_1.FoldingRangeRequest.type;
            return this.connection.onRequest(type, (params, cancel) => {
              return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
            });
          }
        };
      }
    };
  };
  exports.FoldingRangeFeature = FoldingRangeFeature;
});

// node_modules/vscode-languageserver/lib/common/inlayHint.js
var require_inlayHint = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.InlayHintFeature = undefined;
  var vscode_languageserver_protocol_1 = require_main3();
  var InlayHintFeature = (Base) => {
    return class extends Base {
      get inlayHint() {
        return {
          refresh: () => {
            return this.connection.sendRequest(vscode_languageserver_protocol_1.InlayHintRefreshRequest.type);
          },
          on: (handler) => {
            return this.connection.onRequest(vscode_languageserver_protocol_1.InlayHintRequest.type, (params, cancel) => {
              return handler(params, cancel, this.attachWorkDoneProgress(params));
            });
          },
          resolve: (handler) => {
            return this.connection.onRequest(vscode_languageserver_protocol_1.InlayHintResolveRequest.type, (params, cancel) => {
              return handler(params, cancel);
            });
          }
        };
      }
    };
  };
  exports.InlayHintFeature = InlayHintFeature;
});

// node_modules/vscode-languageserver/lib/common/diagnostic.js
var require_diagnostic = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DiagnosticFeature = undefined;
  var vscode_languageserver_protocol_1 = require_main3();
  var DiagnosticFeature = (Base) => {
    return class extends Base {
      get diagnostics() {
        return {
          refresh: () => {
            return this.connection.sendRequest(vscode_languageserver_protocol_1.DiagnosticRefreshRequest.type);
          },
          on: (handler) => {
            return this.connection.onRequest(vscode_languageserver_protocol_1.DocumentDiagnosticRequest.type, (params, cancel) => {
              return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(vscode_languageserver_protocol_1.DocumentDiagnosticRequest.partialResult, params));
            });
          },
          onWorkspace: (handler) => {
            return this.connection.onRequest(vscode_languageserver_protocol_1.WorkspaceDiagnosticRequest.type, (params, cancel) => {
              return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(vscode_languageserver_protocol_1.WorkspaceDiagnosticRequest.partialResult, params));
            });
          }
        };
      }
    };
  };
  exports.DiagnosticFeature = DiagnosticFeature;
});

// node_modules/vscode-languageserver/lib/common/textDocuments.js
var require_textDocuments = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TextDocuments = undefined;
  var vscode_languageserver_protocol_1 = require_main3();

  class TextDocuments {
    constructor(configuration) {
      this._configuration = configuration;
      this._syncedDocuments = new Map;
      this._onDidChangeContent = new vscode_languageserver_protocol_1.Emitter;
      this._onDidOpen = new vscode_languageserver_protocol_1.Emitter;
      this._onDidClose = new vscode_languageserver_protocol_1.Emitter;
      this._onDidSave = new vscode_languageserver_protocol_1.Emitter;
      this._onWillSave = new vscode_languageserver_protocol_1.Emitter;
    }
    get onDidOpen() {
      return this._onDidOpen.event;
    }
    get onDidChangeContent() {
      return this._onDidChangeContent.event;
    }
    get onWillSave() {
      return this._onWillSave.event;
    }
    onWillSaveWaitUntil(handler) {
      this._willSaveWaitUntil = handler;
    }
    get onDidSave() {
      return this._onDidSave.event;
    }
    get onDidClose() {
      return this._onDidClose.event;
    }
    get(uri) {
      return this._syncedDocuments.get(uri);
    }
    all() {
      return Array.from(this._syncedDocuments.values());
    }
    keys() {
      return Array.from(this._syncedDocuments.keys());
    }
    listen(connection) {
      connection.__textDocumentSync = vscode_languageserver_protocol_1.TextDocumentSyncKind.Incremental;
      const disposables = [];
      disposables.push(connection.onDidOpenTextDocument((event) => {
        const td = event.textDocument;
        const document = this._configuration.create(td.uri, td.languageId, td.version, td.text);
        this._syncedDocuments.set(td.uri, document);
        const toFire = Object.freeze({ document });
        this._onDidOpen.fire(toFire);
        this._onDidChangeContent.fire(toFire);
      }));
      disposables.push(connection.onDidChangeTextDocument((event) => {
        const td = event.textDocument;
        const changes = event.contentChanges;
        if (changes.length === 0) {
          return;
        }
        const { version } = td;
        if (version === null || version === undefined) {
          throw new Error(`Received document change event for ${td.uri} without valid version identifier`);
        }
        let syncedDocument = this._syncedDocuments.get(td.uri);
        if (syncedDocument !== undefined) {
          syncedDocument = this._configuration.update(syncedDocument, changes, version);
          this._syncedDocuments.set(td.uri, syncedDocument);
          this._onDidChangeContent.fire(Object.freeze({ document: syncedDocument }));
        }
      }));
      disposables.push(connection.onDidCloseTextDocument((event) => {
        let syncedDocument = this._syncedDocuments.get(event.textDocument.uri);
        if (syncedDocument !== undefined) {
          this._syncedDocuments.delete(event.textDocument.uri);
          this._onDidClose.fire(Object.freeze({ document: syncedDocument }));
        }
      }));
      disposables.push(connection.onWillSaveTextDocument((event) => {
        let syncedDocument = this._syncedDocuments.get(event.textDocument.uri);
        if (syncedDocument !== undefined) {
          this._onWillSave.fire(Object.freeze({ document: syncedDocument, reason: event.reason }));
        }
      }));
      disposables.push(connection.onWillSaveTextDocumentWaitUntil((event, token) => {
        let syncedDocument = this._syncedDocuments.get(event.textDocument.uri);
        if (syncedDocument !== undefined && this._willSaveWaitUntil) {
          return this._willSaveWaitUntil(Object.freeze({ document: syncedDocument, reason: event.reason }), token);
        } else {
          return [];
        }
      }));
      disposables.push(connection.onDidSaveTextDocument((event) => {
        let syncedDocument = this._syncedDocuments.get(event.textDocument.uri);
        if (syncedDocument !== undefined) {
          this._onDidSave.fire(Object.freeze({ document: syncedDocument }));
        }
      }));
      return vscode_languageserver_protocol_1.Disposable.create(() => {
        disposables.forEach((disposable) => disposable.dispose());
      });
    }
  }
  exports.TextDocuments = TextDocuments;
});

// node_modules/vscode-languageserver/lib/common/notebook.js
var require_notebook = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.NotebookDocuments = exports.NotebookSyncFeature = undefined;
  var vscode_languageserver_protocol_1 = require_main3();
  var textDocuments_1 = require_textDocuments();
  var NotebookSyncFeature = (Base) => {
    return class extends Base {
      get synchronization() {
        return {
          onDidOpenNotebookDocument: (handler) => {
            return this.connection.onNotification(vscode_languageserver_protocol_1.DidOpenNotebookDocumentNotification.type, (params) => {
              handler(params);
            });
          },
          onDidChangeNotebookDocument: (handler) => {
            return this.connection.onNotification(vscode_languageserver_protocol_1.DidChangeNotebookDocumentNotification.type, (params) => {
              handler(params);
            });
          },
          onDidSaveNotebookDocument: (handler) => {
            return this.connection.onNotification(vscode_languageserver_protocol_1.DidSaveNotebookDocumentNotification.type, (params) => {
              handler(params);
            });
          },
          onDidCloseNotebookDocument: (handler) => {
            return this.connection.onNotification(vscode_languageserver_protocol_1.DidCloseNotebookDocumentNotification.type, (params) => {
              handler(params);
            });
          }
        };
      }
    };
  };
  exports.NotebookSyncFeature = NotebookSyncFeature;

  class CellTextDocumentConnection {
    onDidOpenTextDocument(handler) {
      this.openHandler = handler;
      return vscode_languageserver_protocol_1.Disposable.create(() => {
        this.openHandler = undefined;
      });
    }
    openTextDocument(params) {
      this.openHandler && this.openHandler(params);
    }
    onDidChangeTextDocument(handler) {
      this.changeHandler = handler;
      return vscode_languageserver_protocol_1.Disposable.create(() => {
        this.changeHandler = handler;
      });
    }
    changeTextDocument(params) {
      this.changeHandler && this.changeHandler(params);
    }
    onDidCloseTextDocument(handler) {
      this.closeHandler = handler;
      return vscode_languageserver_protocol_1.Disposable.create(() => {
        this.closeHandler = undefined;
      });
    }
    closeTextDocument(params) {
      this.closeHandler && this.closeHandler(params);
    }
    onWillSaveTextDocument() {
      return CellTextDocumentConnection.NULL_DISPOSE;
    }
    onWillSaveTextDocumentWaitUntil() {
      return CellTextDocumentConnection.NULL_DISPOSE;
    }
    onDidSaveTextDocument() {
      return CellTextDocumentConnection.NULL_DISPOSE;
    }
  }
  CellTextDocumentConnection.NULL_DISPOSE = Object.freeze({ dispose: () => {} });

  class NotebookDocuments {
    constructor(configurationOrTextDocuments) {
      if (configurationOrTextDocuments instanceof textDocuments_1.TextDocuments) {
        this._cellTextDocuments = configurationOrTextDocuments;
      } else {
        this._cellTextDocuments = new textDocuments_1.TextDocuments(configurationOrTextDocuments);
      }
      this.notebookDocuments = new Map;
      this.notebookCellMap = new Map;
      this._onDidOpen = new vscode_languageserver_protocol_1.Emitter;
      this._onDidChange = new vscode_languageserver_protocol_1.Emitter;
      this._onDidSave = new vscode_languageserver_protocol_1.Emitter;
      this._onDidClose = new vscode_languageserver_protocol_1.Emitter;
    }
    get cellTextDocuments() {
      return this._cellTextDocuments;
    }
    getCellTextDocument(cell) {
      return this._cellTextDocuments.get(cell.document);
    }
    getNotebookDocument(uri) {
      return this.notebookDocuments.get(uri);
    }
    getNotebookCell(uri) {
      const value = this.notebookCellMap.get(uri);
      return value && value[0];
    }
    findNotebookDocumentForCell(cell) {
      const key = typeof cell === "string" ? cell : cell.document;
      const value = this.notebookCellMap.get(key);
      return value && value[1];
    }
    get onDidOpen() {
      return this._onDidOpen.event;
    }
    get onDidSave() {
      return this._onDidSave.event;
    }
    get onDidChange() {
      return this._onDidChange.event;
    }
    get onDidClose() {
      return this._onDidClose.event;
    }
    listen(connection) {
      const cellTextDocumentConnection = new CellTextDocumentConnection;
      const disposables = [];
      disposables.push(this.cellTextDocuments.listen(cellTextDocumentConnection));
      disposables.push(connection.notebooks.synchronization.onDidOpenNotebookDocument((params) => {
        this.notebookDocuments.set(params.notebookDocument.uri, params.notebookDocument);
        for (const cellTextDocument of params.cellTextDocuments) {
          cellTextDocumentConnection.openTextDocument({ textDocument: cellTextDocument });
        }
        this.updateCellMap(params.notebookDocument);
        this._onDidOpen.fire(params.notebookDocument);
      }));
      disposables.push(connection.notebooks.synchronization.onDidChangeNotebookDocument((params) => {
        const notebookDocument = this.notebookDocuments.get(params.notebookDocument.uri);
        if (notebookDocument === undefined) {
          return;
        }
        notebookDocument.version = params.notebookDocument.version;
        const oldMetadata = notebookDocument.metadata;
        let metadataChanged = false;
        const change = params.change;
        if (change.metadata !== undefined) {
          metadataChanged = true;
          notebookDocument.metadata = change.metadata;
        }
        const opened = [];
        const closed = [];
        const data = [];
        const text = [];
        if (change.cells !== undefined) {
          const changedCells = change.cells;
          if (changedCells.structure !== undefined) {
            const array = changedCells.structure.array;
            notebookDocument.cells.splice(array.start, array.deleteCount, ...array.cells !== undefined ? array.cells : []);
            if (changedCells.structure.didOpen !== undefined) {
              for (const open of changedCells.structure.didOpen) {
                cellTextDocumentConnection.openTextDocument({ textDocument: open });
                opened.push(open.uri);
              }
            }
            if (changedCells.structure.didClose) {
              for (const close of changedCells.structure.didClose) {
                cellTextDocumentConnection.closeTextDocument({ textDocument: close });
                closed.push(close.uri);
              }
            }
          }
          if (changedCells.data !== undefined) {
            const cellUpdates = new Map(changedCells.data.map((cell) => [cell.document, cell]));
            for (let i = 0;i <= notebookDocument.cells.length; i++) {
              const change2 = cellUpdates.get(notebookDocument.cells[i].document);
              if (change2 !== undefined) {
                const old = notebookDocument.cells.splice(i, 1, change2);
                data.push({ old: old[0], new: change2 });
                cellUpdates.delete(change2.document);
                if (cellUpdates.size === 0) {
                  break;
                }
              }
            }
          }
          if (changedCells.textContent !== undefined) {
            for (const cellTextDocument of changedCells.textContent) {
              cellTextDocumentConnection.changeTextDocument({ textDocument: cellTextDocument.document, contentChanges: cellTextDocument.changes });
              text.push(cellTextDocument.document.uri);
            }
          }
        }
        this.updateCellMap(notebookDocument);
        const changeEvent = { notebookDocument };
        if (metadataChanged) {
          changeEvent.metadata = { old: oldMetadata, new: notebookDocument.metadata };
        }
        const added = [];
        for (const open of opened) {
          added.push(this.getNotebookCell(open));
        }
        const removed = [];
        for (const close of closed) {
          removed.push(this.getNotebookCell(close));
        }
        const textContent = [];
        for (const change2 of text) {
          textContent.push(this.getNotebookCell(change2));
        }
        if (added.length > 0 || removed.length > 0 || data.length > 0 || textContent.length > 0) {
          changeEvent.cells = { added, removed, changed: { data, textContent } };
        }
        if (changeEvent.metadata !== undefined || changeEvent.cells !== undefined) {
          this._onDidChange.fire(changeEvent);
        }
      }));
      disposables.push(connection.notebooks.synchronization.onDidSaveNotebookDocument((params) => {
        const notebookDocument = this.notebookDocuments.get(params.notebookDocument.uri);
        if (notebookDocument === undefined) {
          return;
        }
        this._onDidSave.fire(notebookDocument);
      }));
      disposables.push(connection.notebooks.synchronization.onDidCloseNotebookDocument((params) => {
        const notebookDocument = this.notebookDocuments.get(params.notebookDocument.uri);
        if (notebookDocument === undefined) {
          return;
        }
        this._onDidClose.fire(notebookDocument);
        for (const cellTextDocument of params.cellTextDocuments) {
          cellTextDocumentConnection.closeTextDocument({ textDocument: cellTextDocument });
        }
        this.notebookDocuments.delete(params.notebookDocument.uri);
        for (const cell of notebookDocument.cells) {
          this.notebookCellMap.delete(cell.document);
        }
      }));
      return vscode_languageserver_protocol_1.Disposable.create(() => {
        disposables.forEach((disposable) => disposable.dispose());
      });
    }
    updateCellMap(notebookDocument) {
      for (const cell of notebookDocument.cells) {
        this.notebookCellMap.set(cell.document, [cell, notebookDocument]);
      }
    }
  }
  exports.NotebookDocuments = NotebookDocuments;
});

// node_modules/vscode-languageserver/lib/common/moniker.js
var require_moniker = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.MonikerFeature = undefined;
  var vscode_languageserver_protocol_1 = require_main3();
  var MonikerFeature = (Base) => {
    return class extends Base {
      get moniker() {
        return {
          on: (handler) => {
            const type = vscode_languageserver_protocol_1.MonikerRequest.type;
            return this.connection.onRequest(type, (params, cancel) => {
              return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
            });
          }
        };
      }
    };
  };
  exports.MonikerFeature = MonikerFeature;
});

// node_modules/vscode-languageserver/lib/common/server.js
var require_server = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.createConnection = exports.combineFeatures = exports.combineNotebooksFeatures = exports.combineLanguagesFeatures = exports.combineWorkspaceFeatures = exports.combineWindowFeatures = exports.combineClientFeatures = exports.combineTracerFeatures = exports.combineTelemetryFeatures = exports.combineConsoleFeatures = exports._NotebooksImpl = exports._LanguagesImpl = exports.BulkUnregistration = exports.BulkRegistration = exports.ErrorMessageTracker = undefined;
  var vscode_languageserver_protocol_1 = require_main3();
  var Is = require_is();
  var UUID = require_uuid();
  var progress_1 = require_progress();
  var configuration_1 = require_configuration();
  var workspaceFolder_1 = require_workspaceFolder();
  var callHierarchy_1 = require_callHierarchy();
  var semanticTokens_1 = require_semanticTokens();
  var showDocument_1 = require_showDocument();
  var fileOperations_1 = require_fileOperations();
  var linkedEditingRange_1 = require_linkedEditingRange();
  var typeHierarchy_1 = require_typeHierarchy();
  var inlineValue_1 = require_inlineValue();
  var foldingRange_1 = require_foldingRange();
  var inlayHint_1 = require_inlayHint();
  var diagnostic_1 = require_diagnostic();
  var notebook_1 = require_notebook();
  var moniker_1 = require_moniker();
  function null2Undefined(value) {
    if (value === null) {
      return;
    }
    return value;
  }

  class ErrorMessageTracker {
    constructor() {
      this._messages = Object.create(null);
    }
    add(message) {
      let count = this._messages[message];
      if (!count) {
        count = 0;
      }
      count++;
      this._messages[message] = count;
    }
    sendErrors(connection) {
      Object.keys(this._messages).forEach((message) => {
        connection.window.showErrorMessage(message);
      });
    }
  }
  exports.ErrorMessageTracker = ErrorMessageTracker;

  class RemoteConsoleImpl {
    constructor() {}
    rawAttach(connection) {
      this._rawConnection = connection;
    }
    attach(connection) {
      this._connection = connection;
    }
    get connection() {
      if (!this._connection) {
        throw new Error("Remote is not attached to a connection yet.");
      }
      return this._connection;
    }
    fillServerCapabilities(_capabilities) {}
    initialize(_capabilities) {}
    error(message) {
      this.send(vscode_languageserver_protocol_1.MessageType.Error, message);
    }
    warn(message) {
      this.send(vscode_languageserver_protocol_1.MessageType.Warning, message);
    }
    info(message) {
      this.send(vscode_languageserver_protocol_1.MessageType.Info, message);
    }
    log(message) {
      this.send(vscode_languageserver_protocol_1.MessageType.Log, message);
    }
    debug(message) {
      this.send(vscode_languageserver_protocol_1.MessageType.Debug, message);
    }
    send(type, message) {
      if (this._rawConnection) {
        this._rawConnection.sendNotification(vscode_languageserver_protocol_1.LogMessageNotification.type, { type, message }).catch(() => {
          (0, vscode_languageserver_protocol_1.RAL)().console.error(`Sending log message failed`);
        });
      }
    }
  }

  class _RemoteWindowImpl {
    constructor() {}
    attach(connection) {
      this._connection = connection;
    }
    get connection() {
      if (!this._connection) {
        throw new Error("Remote is not attached to a connection yet.");
      }
      return this._connection;
    }
    initialize(_capabilities) {}
    fillServerCapabilities(_capabilities) {}
    showErrorMessage(message, ...actions) {
      let params = { type: vscode_languageserver_protocol_1.MessageType.Error, message, actions };
      return this.connection.sendRequest(vscode_languageserver_protocol_1.ShowMessageRequest.type, params).then(null2Undefined);
    }
    showWarningMessage(message, ...actions) {
      let params = { type: vscode_languageserver_protocol_1.MessageType.Warning, message, actions };
      return this.connection.sendRequest(vscode_languageserver_protocol_1.ShowMessageRequest.type, params).then(null2Undefined);
    }
    showInformationMessage(message, ...actions) {
      let params = { type: vscode_languageserver_protocol_1.MessageType.Info, message, actions };
      return this.connection.sendRequest(vscode_languageserver_protocol_1.ShowMessageRequest.type, params).then(null2Undefined);
    }
  }
  var RemoteWindowImpl = (0, showDocument_1.ShowDocumentFeature)((0, progress_1.ProgressFeature)(_RemoteWindowImpl));
  var BulkRegistration;
  (function(BulkRegistration2) {
    function create() {
      return new BulkRegistrationImpl;
    }
    BulkRegistration2.create = create;
  })(BulkRegistration || (exports.BulkRegistration = BulkRegistration = {}));

  class BulkRegistrationImpl {
    constructor() {
      this._registrations = [];
      this._registered = new Set;
    }
    add(type, registerOptions) {
      const method = Is.string(type) ? type : type.method;
      if (this._registered.has(method)) {
        throw new Error(`${method} is already added to this registration`);
      }
      const id = UUID.generateUuid();
      this._registrations.push({
        id,
        method,
        registerOptions: registerOptions || {}
      });
      this._registered.add(method);
    }
    asRegistrationParams() {
      return {
        registrations: this._registrations
      };
    }
  }
  var BulkUnregistration;
  (function(BulkUnregistration2) {
    function create() {
      return new BulkUnregistrationImpl(undefined, []);
    }
    BulkUnregistration2.create = create;
  })(BulkUnregistration || (exports.BulkUnregistration = BulkUnregistration = {}));

  class BulkUnregistrationImpl {
    constructor(_connection, unregistrations) {
      this._connection = _connection;
      this._unregistrations = new Map;
      unregistrations.forEach((unregistration) => {
        this._unregistrations.set(unregistration.method, unregistration);
      });
    }
    get isAttached() {
      return !!this._connection;
    }
    attach(connection) {
      this._connection = connection;
    }
    add(unregistration) {
      this._unregistrations.set(unregistration.method, unregistration);
    }
    dispose() {
      let unregistrations = [];
      for (let unregistration of this._unregistrations.values()) {
        unregistrations.push(unregistration);
      }
      let params = {
        unregisterations: unregistrations
      };
      this._connection.sendRequest(vscode_languageserver_protocol_1.UnregistrationRequest.type, params).catch(() => {
        this._connection.console.info(`Bulk unregistration failed.`);
      });
    }
    disposeSingle(arg) {
      const method = Is.string(arg) ? arg : arg.method;
      const unregistration = this._unregistrations.get(method);
      if (!unregistration) {
        return false;
      }
      let params = {
        unregisterations: [unregistration]
      };
      this._connection.sendRequest(vscode_languageserver_protocol_1.UnregistrationRequest.type, params).then(() => {
        this._unregistrations.delete(method);
      }, (_error) => {
        this._connection.console.info(`Un-registering request handler for ${unregistration.id} failed.`);
      });
      return true;
    }
  }

  class RemoteClientImpl {
    attach(connection) {
      this._connection = connection;
    }
    get connection() {
      if (!this._connection) {
        throw new Error("Remote is not attached to a connection yet.");
      }
      return this._connection;
    }
    initialize(_capabilities) {}
    fillServerCapabilities(_capabilities) {}
    register(typeOrRegistrations, registerOptionsOrType, registerOptions) {
      if (typeOrRegistrations instanceof BulkRegistrationImpl) {
        return this.registerMany(typeOrRegistrations);
      } else if (typeOrRegistrations instanceof BulkUnregistrationImpl) {
        return this.registerSingle1(typeOrRegistrations, registerOptionsOrType, registerOptions);
      } else {
        return this.registerSingle2(typeOrRegistrations, registerOptionsOrType);
      }
    }
    registerSingle1(unregistration, type, registerOptions) {
      const method = Is.string(type) ? type : type.method;
      const id = UUID.generateUuid();
      let params = {
        registrations: [{ id, method, registerOptions: registerOptions || {} }]
      };
      if (!unregistration.isAttached) {
        unregistration.attach(this.connection);
      }
      return this.connection.sendRequest(vscode_languageserver_protocol_1.RegistrationRequest.type, params).then((_result) => {
        unregistration.add({ id, method });
        return unregistration;
      }, (_error) => {
        this.connection.console.info(`Registering request handler for ${method} failed.`);
        return Promise.reject(_error);
      });
    }
    registerSingle2(type, registerOptions) {
      const method = Is.string(type) ? type : type.method;
      const id = UUID.generateUuid();
      let params = {
        registrations: [{ id, method, registerOptions: registerOptions || {} }]
      };
      return this.connection.sendRequest(vscode_languageserver_protocol_1.RegistrationRequest.type, params).then((_result) => {
        return vscode_languageserver_protocol_1.Disposable.create(() => {
          this.unregisterSingle(id, method).catch(() => {
            this.connection.console.info(`Un-registering capability with id ${id} failed.`);
          });
        });
      }, (_error) => {
        this.connection.console.info(`Registering request handler for ${method} failed.`);
        return Promise.reject(_error);
      });
    }
    unregisterSingle(id, method) {
      let params = {
        unregisterations: [{ id, method }]
      };
      return this.connection.sendRequest(vscode_languageserver_protocol_1.UnregistrationRequest.type, params).catch(() => {
        this.connection.console.info(`Un-registering request handler for ${id} failed.`);
      });
    }
    registerMany(registrations) {
      let params = registrations.asRegistrationParams();
      return this.connection.sendRequest(vscode_languageserver_protocol_1.RegistrationRequest.type, params).then(() => {
        return new BulkUnregistrationImpl(this._connection, params.registrations.map((registration) => {
          return { id: registration.id, method: registration.method };
        }));
      }, (_error) => {
        this.connection.console.info(`Bulk registration failed.`);
        return Promise.reject(_error);
      });
    }
  }

  class _RemoteWorkspaceImpl {
    constructor() {}
    attach(connection) {
      this._connection = connection;
    }
    get connection() {
      if (!this._connection) {
        throw new Error("Remote is not attached to a connection yet.");
      }
      return this._connection;
    }
    initialize(_capabilities) {}
    fillServerCapabilities(_capabilities) {}
    applyEdit(paramOrEdit) {
      function isApplyWorkspaceEditParams(value) {
        return value && !!value.edit;
      }
      let params = isApplyWorkspaceEditParams(paramOrEdit) ? paramOrEdit : { edit: paramOrEdit };
      return this.connection.sendRequest(vscode_languageserver_protocol_1.ApplyWorkspaceEditRequest.type, params);
    }
  }
  var RemoteWorkspaceImpl = (0, fileOperations_1.FileOperationsFeature)((0, workspaceFolder_1.WorkspaceFoldersFeature)((0, configuration_1.ConfigurationFeature)(_RemoteWorkspaceImpl)));

  class TracerImpl {
    constructor() {
      this._trace = vscode_languageserver_protocol_1.Trace.Off;
    }
    attach(connection) {
      this._connection = connection;
    }
    get connection() {
      if (!this._connection) {
        throw new Error("Remote is not attached to a connection yet.");
      }
      return this._connection;
    }
    initialize(_capabilities) {}
    fillServerCapabilities(_capabilities) {}
    set trace(value) {
      this._trace = value;
    }
    log(message, verbose) {
      if (this._trace === vscode_languageserver_protocol_1.Trace.Off) {
        return;
      }
      this.connection.sendNotification(vscode_languageserver_protocol_1.LogTraceNotification.type, {
        message,
        verbose: this._trace === vscode_languageserver_protocol_1.Trace.Verbose ? verbose : undefined
      }).catch(() => {});
    }
  }

  class TelemetryImpl {
    constructor() {}
    attach(connection) {
      this._connection = connection;
    }
    get connection() {
      if (!this._connection) {
        throw new Error("Remote is not attached to a connection yet.");
      }
      return this._connection;
    }
    initialize(_capabilities) {}
    fillServerCapabilities(_capabilities) {}
    logEvent(data) {
      this.connection.sendNotification(vscode_languageserver_protocol_1.TelemetryEventNotification.type, data).catch(() => {
        this.connection.console.log(`Sending TelemetryEventNotification failed`);
      });
    }
  }

  class _LanguagesImpl {
    constructor() {}
    attach(connection) {
      this._connection = connection;
    }
    get connection() {
      if (!this._connection) {
        throw new Error("Remote is not attached to a connection yet.");
      }
      return this._connection;
    }
    initialize(_capabilities) {}
    fillServerCapabilities(_capabilities) {}
    attachWorkDoneProgress(params) {
      return (0, progress_1.attachWorkDone)(this.connection, params);
    }
    attachPartialResultProgress(_type, params) {
      return (0, progress_1.attachPartialResult)(this.connection, params);
    }
  }
  exports._LanguagesImpl = _LanguagesImpl;
  var LanguagesImpl = (0, foldingRange_1.FoldingRangeFeature)((0, moniker_1.MonikerFeature)((0, diagnostic_1.DiagnosticFeature)((0, inlayHint_1.InlayHintFeature)((0, inlineValue_1.InlineValueFeature)((0, typeHierarchy_1.TypeHierarchyFeature)((0, linkedEditingRange_1.LinkedEditingRangeFeature)((0, semanticTokens_1.SemanticTokensFeature)((0, callHierarchy_1.CallHierarchyFeature)(_LanguagesImpl)))))))));

  class _NotebooksImpl {
    constructor() {}
    attach(connection) {
      this._connection = connection;
    }
    get connection() {
      if (!this._connection) {
        throw new Error("Remote is not attached to a connection yet.");
      }
      return this._connection;
    }
    initialize(_capabilities) {}
    fillServerCapabilities(_capabilities) {}
    attachWorkDoneProgress(params) {
      return (0, progress_1.attachWorkDone)(this.connection, params);
    }
    attachPartialResultProgress(_type, params) {
      return (0, progress_1.attachPartialResult)(this.connection, params);
    }
  }
  exports._NotebooksImpl = _NotebooksImpl;
  var NotebooksImpl = (0, notebook_1.NotebookSyncFeature)(_NotebooksImpl);
  function combineConsoleFeatures(one, two) {
    return function(Base) {
      return two(one(Base));
    };
  }
  exports.combineConsoleFeatures = combineConsoleFeatures;
  function combineTelemetryFeatures(one, two) {
    return function(Base) {
      return two(one(Base));
    };
  }
  exports.combineTelemetryFeatures = combineTelemetryFeatures;
  function combineTracerFeatures(one, two) {
    return function(Base) {
      return two(one(Base));
    };
  }
  exports.combineTracerFeatures = combineTracerFeatures;
  function combineClientFeatures(one, two) {
    return function(Base) {
      return two(one(Base));
    };
  }
  exports.combineClientFeatures = combineClientFeatures;
  function combineWindowFeatures(one, two) {
    return function(Base) {
      return two(one(Base));
    };
  }
  exports.combineWindowFeatures = combineWindowFeatures;
  function combineWorkspaceFeatures(one, two) {
    return function(Base) {
      return two(one(Base));
    };
  }
  exports.combineWorkspaceFeatures = combineWorkspaceFeatures;
  function combineLanguagesFeatures(one, two) {
    return function(Base) {
      return two(one(Base));
    };
  }
  exports.combineLanguagesFeatures = combineLanguagesFeatures;
  function combineNotebooksFeatures(one, two) {
    return function(Base) {
      return two(one(Base));
    };
  }
  exports.combineNotebooksFeatures = combineNotebooksFeatures;
  function combineFeatures(one, two) {
    function combine(one2, two2, func) {
      if (one2 && two2) {
        return func(one2, two2);
      } else if (one2) {
        return one2;
      } else {
        return two2;
      }
    }
    let result = {
      __brand: "features",
      console: combine(one.console, two.console, combineConsoleFeatures),
      tracer: combine(one.tracer, two.tracer, combineTracerFeatures),
      telemetry: combine(one.telemetry, two.telemetry, combineTelemetryFeatures),
      client: combine(one.client, two.client, combineClientFeatures),
      window: combine(one.window, two.window, combineWindowFeatures),
      workspace: combine(one.workspace, two.workspace, combineWorkspaceFeatures),
      languages: combine(one.languages, two.languages, combineLanguagesFeatures),
      notebooks: combine(one.notebooks, two.notebooks, combineNotebooksFeatures)
    };
    return result;
  }
  exports.combineFeatures = combineFeatures;
  function createConnection(connectionFactory, watchDog, factories) {
    const logger = factories && factories.console ? new (factories.console(RemoteConsoleImpl)) : new RemoteConsoleImpl;
    const connection = connectionFactory(logger);
    logger.rawAttach(connection);
    const tracer = factories && factories.tracer ? new (factories.tracer(TracerImpl)) : new TracerImpl;
    const telemetry = factories && factories.telemetry ? new (factories.telemetry(TelemetryImpl)) : new TelemetryImpl;
    const client = factories && factories.client ? new (factories.client(RemoteClientImpl)) : new RemoteClientImpl;
    const remoteWindow = factories && factories.window ? new (factories.window(RemoteWindowImpl)) : new RemoteWindowImpl;
    const workspace = factories && factories.workspace ? new (factories.workspace(RemoteWorkspaceImpl)) : new RemoteWorkspaceImpl;
    const languages = factories && factories.languages ? new (factories.languages(LanguagesImpl)) : new LanguagesImpl;
    const notebooks = factories && factories.notebooks ? new (factories.notebooks(NotebooksImpl)) : new NotebooksImpl;
    const allRemotes = [logger, tracer, telemetry, client, remoteWindow, workspace, languages, notebooks];
    function asPromise(value) {
      if (value instanceof Promise) {
        return value;
      } else if (Is.thenable(value)) {
        return new Promise((resolve, reject) => {
          value.then((resolved) => resolve(resolved), (error) => reject(error));
        });
      } else {
        return Promise.resolve(value);
      }
    }
    let shutdownHandler = undefined;
    let initializeHandler = undefined;
    let exitHandler = undefined;
    let protocolConnection = {
      listen: () => connection.listen(),
      sendRequest: (type, ...params) => connection.sendRequest(Is.string(type) ? type : type.method, ...params),
      onRequest: (type, handler) => connection.onRequest(type, handler),
      sendNotification: (type, param) => {
        const method = Is.string(type) ? type : type.method;
        return connection.sendNotification(method, param);
      },
      onNotification: (type, handler) => connection.onNotification(type, handler),
      onProgress: connection.onProgress,
      sendProgress: connection.sendProgress,
      onInitialize: (handler) => {
        initializeHandler = handler;
        return {
          dispose: () => {
            initializeHandler = undefined;
          }
        };
      },
      onInitialized: (handler) => connection.onNotification(vscode_languageserver_protocol_1.InitializedNotification.type, handler),
      onShutdown: (handler) => {
        shutdownHandler = handler;
        return {
          dispose: () => {
            shutdownHandler = undefined;
          }
        };
      },
      onExit: (handler) => {
        exitHandler = handler;
        return {
          dispose: () => {
            exitHandler = undefined;
          }
        };
      },
      get console() {
        return logger;
      },
      get telemetry() {
        return telemetry;
      },
      get tracer() {
        return tracer;
      },
      get client() {
        return client;
      },
      get window() {
        return remoteWindow;
      },
      get workspace() {
        return workspace;
      },
      get languages() {
        return languages;
      },
      get notebooks() {
        return notebooks;
      },
      onDidChangeConfiguration: (handler) => connection.onNotification(vscode_languageserver_protocol_1.DidChangeConfigurationNotification.type, handler),
      onDidChangeWatchedFiles: (handler) => connection.onNotification(vscode_languageserver_protocol_1.DidChangeWatchedFilesNotification.type, handler),
      __textDocumentSync: undefined,
      onDidOpenTextDocument: (handler) => connection.onNotification(vscode_languageserver_protocol_1.DidOpenTextDocumentNotification.type, handler),
      onDidChangeTextDocument: (handler) => connection.onNotification(vscode_languageserver_protocol_1.DidChangeTextDocumentNotification.type, handler),
      onDidCloseTextDocument: (handler) => connection.onNotification(vscode_languageserver_protocol_1.DidCloseTextDocumentNotification.type, handler),
      onWillSaveTextDocument: (handler) => connection.onNotification(vscode_languageserver_protocol_1.WillSaveTextDocumentNotification.type, handler),
      onWillSaveTextDocumentWaitUntil: (handler) => connection.onRequest(vscode_languageserver_protocol_1.WillSaveTextDocumentWaitUntilRequest.type, handler),
      onDidSaveTextDocument: (handler) => connection.onNotification(vscode_languageserver_protocol_1.DidSaveTextDocumentNotification.type, handler),
      sendDiagnostics: (params) => connection.sendNotification(vscode_languageserver_protocol_1.PublishDiagnosticsNotification.type, params),
      onHover: (handler) => connection.onRequest(vscode_languageserver_protocol_1.HoverRequest.type, (params, cancel) => {
        return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), undefined);
      }),
      onCompletion: (handler) => connection.onRequest(vscode_languageserver_protocol_1.CompletionRequest.type, (params, cancel) => {
        return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
      }),
      onCompletionResolve: (handler) => connection.onRequest(vscode_languageserver_protocol_1.CompletionResolveRequest.type, handler),
      onSignatureHelp: (handler) => connection.onRequest(vscode_languageserver_protocol_1.SignatureHelpRequest.type, (params, cancel) => {
        return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), undefined);
      }),
      onDeclaration: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DeclarationRequest.type, (params, cancel) => {
        return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
      }),
      onDefinition: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DefinitionRequest.type, (params, cancel) => {
        return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
      }),
      onTypeDefinition: (handler) => connection.onRequest(vscode_languageserver_protocol_1.TypeDefinitionRequest.type, (params, cancel) => {
        return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
      }),
      onImplementation: (handler) => connection.onRequest(vscode_languageserver_protocol_1.ImplementationRequest.type, (params, cancel) => {
        return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
      }),
      onReferences: (handler) => connection.onRequest(vscode_languageserver_protocol_1.ReferencesRequest.type, (params, cancel) => {
        return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
      }),
      onDocumentHighlight: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentHighlightRequest.type, (params, cancel) => {
        return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
      }),
      onDocumentSymbol: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentSymbolRequest.type, (params, cancel) => {
        return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
      }),
      onWorkspaceSymbol: (handler) => connection.onRequest(vscode_languageserver_protocol_1.WorkspaceSymbolRequest.type, (params, cancel) => {
        return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
      }),
      onWorkspaceSymbolResolve: (handler) => connection.onRequest(vscode_languageserver_protocol_1.WorkspaceSymbolResolveRequest.type, handler),
      onCodeAction: (handler) => connection.onRequest(vscode_languageserver_protocol_1.CodeActionRequest.type, (params, cancel) => {
        return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
      }),
      onCodeActionResolve: (handler) => connection.onRequest(vscode_languageserver_protocol_1.CodeActionResolveRequest.type, (params, cancel) => {
        return handler(params, cancel);
      }),
      onCodeLens: (handler) => connection.onRequest(vscode_languageserver_protocol_1.CodeLensRequest.type, (params, cancel) => {
        return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
      }),
      onCodeLensResolve: (handler) => connection.onRequest(vscode_languageserver_protocol_1.CodeLensResolveRequest.type, (params, cancel) => {
        return handler(params, cancel);
      }),
      onDocumentFormatting: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentFormattingRequest.type, (params, cancel) => {
        return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), undefined);
      }),
      onDocumentRangeFormatting: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentRangeFormattingRequest.type, (params, cancel) => {
        return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), undefined);
      }),
      onDocumentOnTypeFormatting: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentOnTypeFormattingRequest.type, (params, cancel) => {
        return handler(params, cancel);
      }),
      onRenameRequest: (handler) => connection.onRequest(vscode_languageserver_protocol_1.RenameRequest.type, (params, cancel) => {
        return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), undefined);
      }),
      onPrepareRename: (handler) => connection.onRequest(vscode_languageserver_protocol_1.PrepareRenameRequest.type, (params, cancel) => {
        return handler(params, cancel);
      }),
      onDocumentLinks: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentLinkRequest.type, (params, cancel) => {
        return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
      }),
      onDocumentLinkResolve: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentLinkResolveRequest.type, (params, cancel) => {
        return handler(params, cancel);
      }),
      onDocumentColor: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentColorRequest.type, (params, cancel) => {
        return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
      }),
      onColorPresentation: (handler) => connection.onRequest(vscode_languageserver_protocol_1.ColorPresentationRequest.type, (params, cancel) => {
        return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
      }),
      onFoldingRanges: (handler) => connection.onRequest(vscode_languageserver_protocol_1.FoldingRangeRequest.type, (params, cancel) => {
        return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
      }),
      onSelectionRanges: (handler) => connection.onRequest(vscode_languageserver_protocol_1.SelectionRangeRequest.type, (params, cancel) => {
        return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
      }),
      onExecuteCommand: (handler) => connection.onRequest(vscode_languageserver_protocol_1.ExecuteCommandRequest.type, (params, cancel) => {
        return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), undefined);
      }),
      dispose: () => connection.dispose()
    };
    for (let remote of allRemotes) {
      remote.attach(protocolConnection);
    }
    connection.onRequest(vscode_languageserver_protocol_1.InitializeRequest.type, (params) => {
      watchDog.initialize(params);
      if (Is.string(params.trace)) {
        tracer.trace = vscode_languageserver_protocol_1.Trace.fromString(params.trace);
      }
      for (let remote of allRemotes) {
        remote.initialize(params.capabilities);
      }
      if (initializeHandler) {
        let result = initializeHandler(params, new vscode_languageserver_protocol_1.CancellationTokenSource().token, (0, progress_1.attachWorkDone)(connection, params), undefined);
        return asPromise(result).then((value) => {
          if (value instanceof vscode_languageserver_protocol_1.ResponseError) {
            return value;
          }
          let result2 = value;
          if (!result2) {
            result2 = { capabilities: {} };
          }
          let capabilities = result2.capabilities;
          if (!capabilities) {
            capabilities = {};
            result2.capabilities = capabilities;
          }
          if (capabilities.textDocumentSync === undefined || capabilities.textDocumentSync === null) {
            capabilities.textDocumentSync = Is.number(protocolConnection.__textDocumentSync) ? protocolConnection.__textDocumentSync : vscode_languageserver_protocol_1.TextDocumentSyncKind.None;
          } else if (!Is.number(capabilities.textDocumentSync) && !Is.number(capabilities.textDocumentSync.change)) {
            capabilities.textDocumentSync.change = Is.number(protocolConnection.__textDocumentSync) ? protocolConnection.__textDocumentSync : vscode_languageserver_protocol_1.TextDocumentSyncKind.None;
          }
          for (let remote of allRemotes) {
            remote.fillServerCapabilities(capabilities);
          }
          return result2;
        });
      } else {
        let result = { capabilities: { textDocumentSync: vscode_languageserver_protocol_1.TextDocumentSyncKind.None } };
        for (let remote of allRemotes) {
          remote.fillServerCapabilities(result.capabilities);
        }
        return result;
      }
    });
    connection.onRequest(vscode_languageserver_protocol_1.ShutdownRequest.type, () => {
      watchDog.shutdownReceived = true;
      if (shutdownHandler) {
        return shutdownHandler(new vscode_languageserver_protocol_1.CancellationTokenSource().token);
      } else {
        return;
      }
    });
    connection.onNotification(vscode_languageserver_protocol_1.ExitNotification.type, () => {
      try {
        if (exitHandler) {
          exitHandler();
        }
      } finally {
        if (watchDog.shutdownReceived) {
          watchDog.exit(0);
        } else {
          watchDog.exit(1);
        }
      }
    });
    connection.onNotification(vscode_languageserver_protocol_1.SetTraceNotification.type, (params) => {
      tracer.trace = vscode_languageserver_protocol_1.Trace.fromString(params.value);
    });
    return protocolConnection;
  }
  exports.createConnection = createConnection;
});

// node_modules/vscode-languageserver/lib/node/files.js
var require_files = __commonJS((exports) => {
  var __filename = "/Users/vincent-lecrubier/Code/lidl/lidl-lsp/node_modules/vscode-languageserver/lib/node/files.js";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.resolveModulePath = exports.FileSystem = exports.resolveGlobalYarnPath = exports.resolveGlobalNodePath = exports.resolve = exports.uriToFilePath = undefined;
  var url = __require("url");
  var path = __require("path");
  var fs = __require("fs");
  var child_process_1 = __require("child_process");
  function uriToFilePath(uri) {
    let parsed = url.parse(uri);
    if (parsed.protocol !== "file:" || !parsed.path) {
      return;
    }
    let segments = parsed.path.split("/");
    for (var i = 0, len = segments.length;i < len; i++) {
      segments[i] = decodeURIComponent(segments[i]);
    }
    if (process.platform === "win32" && segments.length > 1) {
      let first = segments[0];
      let second = segments[1];
      if (first.length === 0 && second.length > 1 && second[1] === ":") {
        segments.shift();
      }
    }
    return path.normalize(segments.join("/"));
  }
  exports.uriToFilePath = uriToFilePath;
  function isWindows() {
    return process.platform === "win32";
  }
  function resolve(moduleName, nodePath, cwd, tracer) {
    const nodePathKey = "NODE_PATH";
    const app = [
      "var p = process;",
      "p.on('message',function(m){",
      "if(m.c==='e'){",
      "p.exit(0);",
      "}",
      "else if(m.c==='rs'){",
      "try{",
      "var r=require.resolve(m.a);",
      "p.send({c:'r',s:true,r:r});",
      "}",
      "catch(err){",
      "p.send({c:'r',s:false});",
      "}",
      "}",
      "});"
    ].join("");
    return new Promise((resolve2, reject) => {
      let env = process.env;
      let newEnv = Object.create(null);
      Object.keys(env).forEach((key) => newEnv[key] = env[key]);
      if (nodePath && fs.existsSync(nodePath)) {
        if (newEnv[nodePathKey]) {
          newEnv[nodePathKey] = nodePath + path.delimiter + newEnv[nodePathKey];
        } else {
          newEnv[nodePathKey] = nodePath;
        }
        if (tracer) {
          tracer(`NODE_PATH value is: ${newEnv[nodePathKey]}`);
        }
      }
      newEnv["ELECTRON_RUN_AS_NODE"] = "1";
      try {
        let cp = (0, child_process_1.fork)("", [], {
          cwd,
          env: newEnv,
          execArgv: ["-e", app]
        });
        if (cp.pid === undefined) {
          reject(new Error(`Starting process to resolve node module  ${moduleName} failed`));
          return;
        }
        cp.on("error", (error) => {
          reject(error);
        });
        cp.on("message", (message2) => {
          if (message2.c === "r") {
            cp.send({ c: "e" });
            if (message2.s) {
              resolve2(message2.r);
            } else {
              reject(new Error(`Failed to resolve module: ${moduleName}`));
            }
          }
        });
        let message = {
          c: "rs",
          a: moduleName
        };
        cp.send(message);
      } catch (error) {
        reject(error);
      }
    });
  }
  exports.resolve = resolve;
  function resolveGlobalNodePath(tracer) {
    let npmCommand = "npm";
    const env = Object.create(null);
    Object.keys(process.env).forEach((key) => env[key] = process.env[key]);
    env["NO_UPDATE_NOTIFIER"] = "true";
    const options = {
      encoding: "utf8",
      env
    };
    if (isWindows()) {
      npmCommand = "npm.cmd";
      options.shell = true;
    }
    let handler = () => {};
    try {
      process.on("SIGPIPE", handler);
      let stdout = (0, child_process_1.spawnSync)(npmCommand, ["config", "get", "prefix"], options).stdout;
      if (!stdout) {
        if (tracer) {
          tracer(`'npm config get prefix' didn't return a value.`);
        }
        return;
      }
      let prefix = stdout.trim();
      if (tracer) {
        tracer(`'npm config get prefix' value is: ${prefix}`);
      }
      if (prefix.length > 0) {
        if (isWindows()) {
          return path.join(prefix, "node_modules");
        } else {
          return path.join(prefix, "lib", "node_modules");
        }
      }
      return;
    } catch (err) {
      return;
    } finally {
      process.removeListener("SIGPIPE", handler);
    }
  }
  exports.resolveGlobalNodePath = resolveGlobalNodePath;
  function resolveGlobalYarnPath(tracer) {
    let yarnCommand = "yarn";
    let options = {
      encoding: "utf8"
    };
    if (isWindows()) {
      yarnCommand = "yarn.cmd";
      options.shell = true;
    }
    let handler = () => {};
    try {
      process.on("SIGPIPE", handler);
      let results = (0, child_process_1.spawnSync)(yarnCommand, ["global", "dir", "--json"], options);
      let stdout = results.stdout;
      if (!stdout) {
        if (tracer) {
          tracer(`'yarn global dir' didn't return a value.`);
          if (results.stderr) {
            tracer(results.stderr);
          }
        }
        return;
      }
      let lines = stdout.trim().split(/\r?\n/);
      for (let line of lines) {
        try {
          let yarn = JSON.parse(line);
          if (yarn.type === "log") {
            return path.join(yarn.data, "node_modules");
          }
        } catch (e) {}
      }
      return;
    } catch (err) {
      return;
    } finally {
      process.removeListener("SIGPIPE", handler);
    }
  }
  exports.resolveGlobalYarnPath = resolveGlobalYarnPath;
  var FileSystem;
  (function(FileSystem2) {
    let _isCaseSensitive = undefined;
    function isCaseSensitive() {
      if (_isCaseSensitive !== undefined) {
        return _isCaseSensitive;
      }
      if (process.platform === "win32") {
        _isCaseSensitive = false;
      } else {
        _isCaseSensitive = !fs.existsSync(__filename.toUpperCase()) || !fs.existsSync(__filename.toLowerCase());
      }
      return _isCaseSensitive;
    }
    FileSystem2.isCaseSensitive = isCaseSensitive;
    function isParent(parent, child) {
      if (isCaseSensitive()) {
        return path.normalize(child).indexOf(path.normalize(parent)) === 0;
      } else {
        return path.normalize(child).toLowerCase().indexOf(path.normalize(parent).toLowerCase()) === 0;
      }
    }
    FileSystem2.isParent = isParent;
  })(FileSystem || (exports.FileSystem = FileSystem = {}));
  function resolveModulePath(workspaceRoot, moduleName, nodePath, tracer) {
    if (nodePath) {
      if (!path.isAbsolute(nodePath)) {
        nodePath = path.join(workspaceRoot, nodePath);
      }
      return resolve(moduleName, nodePath, nodePath, tracer).then((value) => {
        if (FileSystem.isParent(nodePath, value)) {
          return value;
        } else {
          return Promise.reject(new Error(`Failed to load ${moduleName} from node path location.`));
        }
      }).then(undefined, (_error) => {
        return resolve(moduleName, resolveGlobalNodePath(tracer), workspaceRoot, tracer);
      });
    } else {
      return resolve(moduleName, resolveGlobalNodePath(tracer), workspaceRoot, tracer);
    }
  }
  exports.resolveModulePath = resolveModulePath;
});

// node_modules/vscode-languageserver/lib/common/inlineCompletion.proposed.js
var require_inlineCompletion_proposed = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.InlineCompletionFeature = undefined;
  var vscode_languageserver_protocol_1 = require_main3();
  var InlineCompletionFeature = (Base) => {
    return class extends Base {
      get inlineCompletion() {
        return {
          on: (handler) => {
            return this.connection.onRequest(vscode_languageserver_protocol_1.InlineCompletionRequest.type, (params, cancel) => {
              return handler(params, cancel, this.attachWorkDoneProgress(params));
            });
          }
        };
      }
    };
  };
  exports.InlineCompletionFeature = InlineCompletionFeature;
});

// node_modules/vscode-languageserver/lib/common/api.js
var require_api3 = __commonJS((exports) => {
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = exports && exports.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
        __createBinding(exports2, m, p);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ProposedFeatures = exports.NotebookDocuments = exports.TextDocuments = exports.SemanticTokensBuilder = undefined;
  var semanticTokens_1 = require_semanticTokens();
  Object.defineProperty(exports, "SemanticTokensBuilder", { enumerable: true, get: function() {
    return semanticTokens_1.SemanticTokensBuilder;
  } });
  var ic = require_inlineCompletion_proposed();
  __exportStar(require_main3(), exports);
  var textDocuments_1 = require_textDocuments();
  Object.defineProperty(exports, "TextDocuments", { enumerable: true, get: function() {
    return textDocuments_1.TextDocuments;
  } });
  var notebook_1 = require_notebook();
  Object.defineProperty(exports, "NotebookDocuments", { enumerable: true, get: function() {
    return notebook_1.NotebookDocuments;
  } });
  __exportStar(require_server(), exports);
  var ProposedFeatures;
  (function(ProposedFeatures2) {
    ProposedFeatures2.all = {
      __brand: "features",
      languages: ic.InlineCompletionFeature
    };
  })(ProposedFeatures || (exports.ProposedFeatures = ProposedFeatures = {}));
});

// node_modules/vscode-languageserver/lib/node/main.js
var require_main4 = __commonJS((exports) => {
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = exports && exports.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
        __createBinding(exports2, m, p);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.createConnection = exports.Files = undefined;
  var node_util_1 = __require("node:util");
  var Is = require_is();
  var server_1 = require_server();
  var fm = require_files();
  var node_1 = require_main3();
  __exportStar(require_main3(), exports);
  __exportStar(require_api3(), exports);
  var Files;
  (function(Files2) {
    Files2.uriToFilePath = fm.uriToFilePath;
    Files2.resolveGlobalNodePath = fm.resolveGlobalNodePath;
    Files2.resolveGlobalYarnPath = fm.resolveGlobalYarnPath;
    Files2.resolve = fm.resolve;
    Files2.resolveModulePath = fm.resolveModulePath;
  })(Files || (exports.Files = Files = {}));
  var _protocolConnection;
  function endProtocolConnection() {
    if (_protocolConnection === undefined) {
      return;
    }
    try {
      _protocolConnection.end();
    } catch (_err) {}
  }
  var _shutdownReceived = false;
  var exitTimer = undefined;
  function setupExitTimer() {
    const argName = "--clientProcessId";
    function runTimer(value) {
      try {
        let processId = parseInt(value);
        if (!isNaN(processId)) {
          exitTimer = setInterval(() => {
            try {
              process.kill(processId, 0);
            } catch (ex) {
              endProtocolConnection();
              process.exit(_shutdownReceived ? 0 : 1);
            }
          }, 3000);
        }
      } catch (e) {}
    }
    for (let i = 2;i < process.argv.length; i++) {
      let arg = process.argv[i];
      if (arg === argName && i + 1 < process.argv.length) {
        runTimer(process.argv[i + 1]);
        return;
      } else {
        let args = arg.split("=");
        if (args[0] === argName) {
          runTimer(args[1]);
        }
      }
    }
  }
  setupExitTimer();
  var watchDog = {
    initialize: (params) => {
      const processId = params.processId;
      if (Is.number(processId) && exitTimer === undefined) {
        setInterval(() => {
          try {
            process.kill(processId, 0);
          } catch (ex) {
            process.exit(_shutdownReceived ? 0 : 1);
          }
        }, 3000);
      }
    },
    get shutdownReceived() {
      return _shutdownReceived;
    },
    set shutdownReceived(value) {
      _shutdownReceived = value;
    },
    exit: (code) => {
      endProtocolConnection();
      process.exit(code);
    }
  };
  function createConnection(arg1, arg2, arg3, arg4) {
    let factories;
    let input;
    let output;
    let options;
    if (arg1 !== undefined && arg1.__brand === "features") {
      factories = arg1;
      arg1 = arg2;
      arg2 = arg3;
      arg3 = arg4;
    }
    if (node_1.ConnectionStrategy.is(arg1) || node_1.ConnectionOptions.is(arg1)) {
      options = arg1;
    } else {
      input = arg1;
      output = arg2;
      options = arg3;
    }
    return _createConnection(input, output, options, factories);
  }
  exports.createConnection = createConnection;
  function _createConnection(input, output, options, factories) {
    let stdio = false;
    if (!input && !output && process.argv.length > 2) {
      let port = undefined;
      let pipeName = undefined;
      let argv = process.argv.slice(2);
      for (let i = 0;i < argv.length; i++) {
        let arg = argv[i];
        if (arg === "--node-ipc") {
          input = new node_1.IPCMessageReader(process);
          output = new node_1.IPCMessageWriter(process);
          break;
        } else if (arg === "--stdio") {
          stdio = true;
          input = process.stdin;
          output = process.stdout;
          break;
        } else if (arg === "--socket") {
          port = parseInt(argv[i + 1]);
          break;
        } else if (arg === "--pipe") {
          pipeName = argv[i + 1];
          break;
        } else {
          var args = arg.split("=");
          if (args[0] === "--socket") {
            port = parseInt(args[1]);
            break;
          } else if (args[0] === "--pipe") {
            pipeName = args[1];
            break;
          }
        }
      }
      if (port) {
        let transport = (0, node_1.createServerSocketTransport)(port);
        input = transport[0];
        output = transport[1];
      } else if (pipeName) {
        let transport = (0, node_1.createServerPipeTransport)(pipeName);
        input = transport[0];
        output = transport[1];
      }
    }
    var commandLineMessage = "Use arguments of createConnection or set command line parameters: '--node-ipc', '--stdio' or '--socket={number}'";
    if (!input) {
      throw new Error("Connection input stream is not set. " + commandLineMessage);
    }
    if (!output) {
      throw new Error("Connection output stream is not set. " + commandLineMessage);
    }
    if (Is.func(input.read) && Is.func(input.on)) {
      let inputStream = input;
      inputStream.on("end", () => {
        endProtocolConnection();
        process.exit(_shutdownReceived ? 0 : 1);
      });
      inputStream.on("close", () => {
        endProtocolConnection();
        process.exit(_shutdownReceived ? 0 : 1);
      });
    }
    const connectionFactory = (logger) => {
      const result = (0, node_1.createProtocolConnection)(input, output, logger, options);
      if (stdio) {
        patchConsole(logger);
      }
      return result;
    };
    return (0, server_1.createConnection)(connectionFactory, watchDog, factories);
  }
  function patchConsole(logger) {
    function serialize(args) {
      return args.map((arg) => typeof arg === "string" ? arg : (0, node_util_1.inspect)(arg)).join(" ");
    }
    const counters = new Map;
    console.assert = function assert(assertion, ...args) {
      if (assertion) {
        return;
      }
      if (args.length === 0) {
        logger.error("Assertion failed");
      } else {
        const [message, ...rest] = args;
        logger.error(`Assertion failed: ${message} ${serialize(rest)}`);
      }
    };
    console.count = function count(label = "default") {
      const message = String(label);
      let counter = counters.get(message) ?? 0;
      counter += 1;
      counters.set(message, counter);
      logger.log(`${message}: ${message}`);
    };
    console.countReset = function countReset(label) {
      if (label === undefined) {
        counters.clear();
      } else {
        counters.delete(String(label));
      }
    };
    console.debug = function debug(...args) {
      logger.log(serialize(args));
    };
    console.dir = function dir(arg, options) {
      logger.log((0, node_util_1.inspect)(arg, options));
    };
    console.log = function log(...args) {
      logger.log(serialize(args));
    };
    console.error = function error(...args) {
      logger.error(serialize(args));
    };
    console.trace = function trace(...args) {
      const stack = new Error().stack.replace(/(.+\n){2}/, "");
      let message = "Trace";
      if (args.length !== 0) {
        message += `: ${serialize(args)}`;
      }
      logger.log(`${message}
${stack}`);
    };
    console.warn = function warn(...args) {
      logger.warn(serialize(args));
    };
  }
});

// ../lidl-core/node_modules/lodash/lodash.js
var require_lodash = __commonJS((exports, module) => {
  (function() {
    var undefined2;
    var VERSION = "4.17.23";
    var LARGE_ARRAY_SIZE = 200;
    var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var MAX_MEMOIZE_SIZE = 500;
    var PLACEHOLDER = "__lodash_placeholder__";
    var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
    var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
    var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
    var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
    var HOT_COUNT = 800, HOT_SPAN = 16;
    var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
    var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000, NAN = 0 / 0;
    var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
    var wrapFlags = [
      ["ary", WRAP_ARY_FLAG],
      ["bind", WRAP_BIND_FLAG],
      ["bindKey", WRAP_BIND_KEY_FLAG],
      ["curry", WRAP_CURRY_FLAG],
      ["curryRight", WRAP_CURRY_RIGHT_FLAG],
      ["flip", WRAP_FLIP_FLAG],
      ["partial", WRAP_PARTIAL_FLAG],
      ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
      ["rearg", WRAP_REARG_FLAG]
    ];
    var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", domExcTag = "[object DOMException]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]";
    var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
    var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
    var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
    var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
    var reTrimStart = /^\s+/;
    var reWhitespace = /\s/;
    var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
    var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
    var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
    var reEscapeChar = /\\(\\)?/g;
    var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
    var reFlags = /\w*$/;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsOctal = /^0o[0-7]+$/i;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
    var reNoMatch = /($^)/;
    var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
    var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
    var rsApos = "['’]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
    var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
    var reApos = RegExp(rsApos, "g");
    var reComboMark = RegExp(rsCombo, "g");
    var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
    var reUnicodeWord = RegExp([
      rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
      rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
      rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
      rsUpper + "+" + rsOptContrUpper,
      rsOrdUpper,
      rsOrdLower,
      rsDigits,
      rsEmoji
    ].join("|"), "g");
    var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
    var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
    var contextProps = [
      "Array",
      "Buffer",
      "DataView",
      "Date",
      "Error",
      "Float32Array",
      "Float64Array",
      "Function",
      "Int8Array",
      "Int16Array",
      "Int32Array",
      "Map",
      "Math",
      "Object",
      "Promise",
      "RegExp",
      "Set",
      "String",
      "Symbol",
      "TypeError",
      "Uint8Array",
      "Uint8ClampedArray",
      "Uint16Array",
      "Uint32Array",
      "WeakMap",
      "_",
      "clearTimeout",
      "isFinite",
      "parseInt",
      "setTimeout"
    ];
    var templateCounter = -1;
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    var cloneableTags = {};
    cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
    cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
    var deburredLetters = {
      "À": "A",
      "Á": "A",
      "Â": "A",
      "Ã": "A",
      "Ä": "A",
      "Å": "A",
      "à": "a",
      "á": "a",
      "â": "a",
      "ã": "a",
      "ä": "a",
      "å": "a",
      "Ç": "C",
      "ç": "c",
      "Ð": "D",
      "ð": "d",
      "È": "E",
      "É": "E",
      "Ê": "E",
      "Ë": "E",
      "è": "e",
      "é": "e",
      "ê": "e",
      "ë": "e",
      "Ì": "I",
      "Í": "I",
      "Î": "I",
      "Ï": "I",
      "ì": "i",
      "í": "i",
      "î": "i",
      "ï": "i",
      "Ñ": "N",
      "ñ": "n",
      "Ò": "O",
      "Ó": "O",
      "Ô": "O",
      "Õ": "O",
      "Ö": "O",
      "Ø": "O",
      "ò": "o",
      "ó": "o",
      "ô": "o",
      "õ": "o",
      "ö": "o",
      "ø": "o",
      "Ù": "U",
      "Ú": "U",
      "Û": "U",
      "Ü": "U",
      "ù": "u",
      "ú": "u",
      "û": "u",
      "ü": "u",
      "Ý": "Y",
      "ý": "y",
      "ÿ": "y",
      "Æ": "Ae",
      "æ": "ae",
      "Þ": "Th",
      "þ": "th",
      "ß": "ss",
      "Ā": "A",
      "Ă": "A",
      "Ą": "A",
      "ā": "a",
      "ă": "a",
      "ą": "a",
      "Ć": "C",
      "Ĉ": "C",
      "Ċ": "C",
      "Č": "C",
      "ć": "c",
      "ĉ": "c",
      "ċ": "c",
      "č": "c",
      "Ď": "D",
      "Đ": "D",
      "ď": "d",
      "đ": "d",
      "Ē": "E",
      "Ĕ": "E",
      "Ė": "E",
      "Ę": "E",
      "Ě": "E",
      "ē": "e",
      "ĕ": "e",
      "ė": "e",
      "ę": "e",
      "ě": "e",
      "Ĝ": "G",
      "Ğ": "G",
      "Ġ": "G",
      "Ģ": "G",
      "ĝ": "g",
      "ğ": "g",
      "ġ": "g",
      "ģ": "g",
      "Ĥ": "H",
      "Ħ": "H",
      "ĥ": "h",
      "ħ": "h",
      "Ĩ": "I",
      "Ī": "I",
      "Ĭ": "I",
      "Į": "I",
      "İ": "I",
      "ĩ": "i",
      "ī": "i",
      "ĭ": "i",
      "į": "i",
      "ı": "i",
      "Ĵ": "J",
      "ĵ": "j",
      "Ķ": "K",
      "ķ": "k",
      "ĸ": "k",
      "Ĺ": "L",
      "Ļ": "L",
      "Ľ": "L",
      "Ŀ": "L",
      "Ł": "L",
      "ĺ": "l",
      "ļ": "l",
      "ľ": "l",
      "ŀ": "l",
      "ł": "l",
      "Ń": "N",
      "Ņ": "N",
      "Ň": "N",
      "Ŋ": "N",
      "ń": "n",
      "ņ": "n",
      "ň": "n",
      "ŋ": "n",
      "Ō": "O",
      "Ŏ": "O",
      "Ő": "O",
      "ō": "o",
      "ŏ": "o",
      "ő": "o",
      "Ŕ": "R",
      "Ŗ": "R",
      "Ř": "R",
      "ŕ": "r",
      "ŗ": "r",
      "ř": "r",
      "Ś": "S",
      "Ŝ": "S",
      "Ş": "S",
      "Š": "S",
      "ś": "s",
      "ŝ": "s",
      "ş": "s",
      "š": "s",
      "Ţ": "T",
      "Ť": "T",
      "Ŧ": "T",
      "ţ": "t",
      "ť": "t",
      "ŧ": "t",
      "Ũ": "U",
      "Ū": "U",
      "Ŭ": "U",
      "Ů": "U",
      "Ű": "U",
      "Ų": "U",
      "ũ": "u",
      "ū": "u",
      "ŭ": "u",
      "ů": "u",
      "ű": "u",
      "ų": "u",
      "Ŵ": "W",
      "ŵ": "w",
      "Ŷ": "Y",
      "ŷ": "y",
      "Ÿ": "Y",
      "Ź": "Z",
      "Ż": "Z",
      "Ž": "Z",
      "ź": "z",
      "ż": "z",
      "ž": "z",
      "Ĳ": "IJ",
      "ĳ": "ij",
      "Œ": "Oe",
      "œ": "oe",
      "ŉ": "'n",
      "ſ": "s"
    };
    var htmlEscapes = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    var htmlUnescapes = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    };
    var stringEscapes = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "\u2028": "u2028",
      "\u2029": "u2029"
    };
    var freeParseFloat = parseFloat, freeParseInt = parseInt;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {}
    }();
    var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0:
          return func.call(thisArg);
        case 1:
          return func.call(thisArg, args[0]);
        case 2:
          return func.call(thisArg, args[0], args[1]);
        case 3:
          return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }
    function arrayAggregator(array, setter, iteratee, accumulator) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        var value = array[index];
        setter(accumulator, value, iteratee(value), array);
      }
      return accumulator;
    }
    function arrayEach(array, iteratee) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }
      return array;
    }
    function arrayEachRight(array, iteratee) {
      var length = array == null ? 0 : array.length;
      while (length--) {
        if (iteratee(array[length], length, array) === false) {
          break;
        }
      }
      return array;
    }
    function arrayEvery(array, predicate) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (!predicate(array[index], index, array)) {
          return false;
        }
      }
      return true;
    }
    function arrayFilter(array, predicate) {
      var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }
    function arrayIncludes(array, value) {
      var length = array == null ? 0 : array.length;
      return !!length && baseIndexOf(array, value, 0) > -1;
    }
    function arrayIncludesWith(array, value, comparator) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (comparator(value, array[index])) {
          return true;
        }
      }
      return false;
    }
    function arrayMap(array, iteratee) {
      var index = -1, length = array == null ? 0 : array.length, result = Array(length);
      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }
    function arrayPush(array, values) {
      var index = -1, length = values.length, offset = array.length;
      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }
    function arrayReduce(array, iteratee, accumulator, initAccum) {
      var index = -1, length = array == null ? 0 : array.length;
      if (initAccum && length) {
        accumulator = array[++index];
      }
      while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
      }
      return accumulator;
    }
    function arrayReduceRight(array, iteratee, accumulator, initAccum) {
      var length = array == null ? 0 : array.length;
      if (initAccum && length) {
        accumulator = array[--length];
      }
      while (length--) {
        accumulator = iteratee(accumulator, array[length], length, array);
      }
      return accumulator;
    }
    function arraySome(array, predicate) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }
      return false;
    }
    var asciiSize = baseProperty("length");
    function asciiToArray(string) {
      return string.split("");
    }
    function asciiWords(string) {
      return string.match(reAsciiWord) || [];
    }
    function baseFindKey(collection, predicate, eachFunc) {
      var result;
      eachFunc(collection, function(value, key, collection2) {
        if (predicate(value, key, collection2)) {
          result = key;
          return false;
        }
      });
      return result;
    }
    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
      while (fromRight ? index-- : ++index < length) {
        if (predicate(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }
    function baseIndexOf(array, value, fromIndex) {
      return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
    }
    function baseIndexOfWith(array, value, fromIndex, comparator) {
      var index = fromIndex - 1, length = array.length;
      while (++index < length) {
        if (comparator(array[index], value)) {
          return index;
        }
      }
      return -1;
    }
    function baseIsNaN(value) {
      return value !== value;
    }
    function baseMean(array, iteratee) {
      var length = array == null ? 0 : array.length;
      return length ? baseSum(array, iteratee) / length : NAN;
    }
    function baseProperty(key) {
      return function(object) {
        return object == null ? undefined2 : object[key];
      };
    }
    function basePropertyOf(object) {
      return function(key) {
        return object == null ? undefined2 : object[key];
      };
    }
    function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
      eachFunc(collection, function(value, index, collection2) {
        accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
      });
      return accumulator;
    }
    function baseSortBy(array, comparer) {
      var length = array.length;
      array.sort(comparer);
      while (length--) {
        array[length] = array[length].value;
      }
      return array;
    }
    function baseSum(array, iteratee) {
      var result, index = -1, length = array.length;
      while (++index < length) {
        var current = iteratee(array[index]);
        if (current !== undefined2) {
          result = result === undefined2 ? current : result + current;
        }
      }
      return result;
    }
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    function baseToPairs(object, props) {
      return arrayMap(props, function(key) {
        return [key, object[key]];
      });
    }
    function baseTrim(string) {
      return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
    }
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    function baseValues(object, props) {
      return arrayMap(props, function(key) {
        return object[key];
      });
    }
    function cacheHas(cache, key) {
      return cache.has(key);
    }
    function charsStartIndex(strSymbols, chrSymbols) {
      var index = -1, length = strSymbols.length;
      while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
      return index;
    }
    function charsEndIndex(strSymbols, chrSymbols) {
      var index = strSymbols.length;
      while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
      return index;
    }
    function countHolders(array, placeholder) {
      var length = array.length, result = 0;
      while (length--) {
        if (array[length] === placeholder) {
          ++result;
        }
      }
      return result;
    }
    var deburrLetter = basePropertyOf(deburredLetters);
    var escapeHtmlChar = basePropertyOf(htmlEscapes);
    function escapeStringChar(chr) {
      return "\\" + stringEscapes[chr];
    }
    function getValue(object, key) {
      return object == null ? undefined2 : object[key];
    }
    function hasUnicode(string) {
      return reHasUnicode.test(string);
    }
    function hasUnicodeWord(string) {
      return reHasUnicodeWord.test(string);
    }
    function iteratorToArray(iterator) {
      var data, result = [];
      while (!(data = iterator.next()).done) {
        result.push(data.value);
      }
      return result;
    }
    function mapToArray(map) {
      var index = -1, result = Array(map.size);
      map.forEach(function(value, key) {
        result[++index] = [key, value];
      });
      return result;
    }
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    function replaceHolders(array, placeholder) {
      var index = -1, length = array.length, resIndex = 0, result = [];
      while (++index < length) {
        var value = array[index];
        if (value === placeholder || value === PLACEHOLDER) {
          array[index] = PLACEHOLDER;
          result[resIndex++] = index;
        }
      }
      return result;
    }
    function setToArray(set) {
      var index = -1, result = Array(set.size);
      set.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }
    function setToPairs(set) {
      var index = -1, result = Array(set.size);
      set.forEach(function(value) {
        result[++index] = [value, value];
      });
      return result;
    }
    function strictIndexOf(array, value, fromIndex) {
      var index = fromIndex - 1, length = array.length;
      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }
    function strictLastIndexOf(array, value, fromIndex) {
      var index = fromIndex + 1;
      while (index--) {
        if (array[index] === value) {
          return index;
        }
      }
      return index;
    }
    function stringSize(string) {
      return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
    }
    function stringToArray(string) {
      return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
    }
    function trimmedEndIndex(string) {
      var index = string.length;
      while (index-- && reWhitespace.test(string.charAt(index))) {}
      return index;
    }
    var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
    function unicodeSize(string) {
      var result = reUnicode.lastIndex = 0;
      while (reUnicode.test(string)) {
        ++result;
      }
      return result;
    }
    function unicodeToArray(string) {
      return string.match(reUnicode) || [];
    }
    function unicodeWords(string) {
      return string.match(reUnicodeWord) || [];
    }
    var runInContext = function runInContext(context) {
      context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));
      var { Array: Array2, Date: Date2, Error: Error2, Function: Function2, Math: Math2, Object: Object2, RegExp: RegExp2, String: String2, TypeError: TypeError2 } = context;
      var arrayProto = Array2.prototype, funcProto = Function2.prototype, objectProto = Object2.prototype;
      var coreJsData = context["__core-js_shared__"];
      var funcToString = funcProto.toString;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var idCounter = 0;
      var maskSrcKey = function() {
        var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
        return uid ? "Symbol(src)_1." + uid : "";
      }();
      var nativeObjectToString = objectProto.toString;
      var objectCtorString = funcToString.call(Object2);
      var oldDash = root._;
      var reIsNative = RegExp2("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
      var Buffer2 = moduleExports ? context.Buffer : undefined2, Symbol2 = context.Symbol, Uint8Array = context.Uint8Array, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : undefined2, getPrototype = overArg(Object2.getPrototypeOf, Object2), objectCreate = Object2.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : undefined2, symIterator = Symbol2 ? Symbol2.iterator : undefined2, symToStringTag = Symbol2 ? Symbol2.toStringTag : undefined2;
      var defineProperty = function() {
        try {
          var func = getNative(Object2, "defineProperty");
          func({}, "", {});
          return func;
        } catch (e) {}
      }();
      var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout, ctxNow = Date2 && Date2.now !== root.Date.now && Date2.now, ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;
      var { ceil: nativeCeil, floor: nativeFloor } = Math2, nativeGetSymbols = Object2.getOwnPropertySymbols, nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : undefined2, nativeIsFinite = context.isFinite, nativeJoin = arrayProto.join, nativeKeys = overArg(Object2.keys, Object2), nativeMax = Math2.max, nativeMin = Math2.min, nativeNow = Date2.now, nativeParseInt = context.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto.reverse;
      var DataView = getNative(context, "DataView"), Map2 = getNative(context, "Map"), Promise2 = getNative(context, "Promise"), Set2 = getNative(context, "Set"), WeakMap2 = getNative(context, "WeakMap"), nativeCreate = getNative(Object2, "create");
      var metaMap = WeakMap2 && new WeakMap2;
      var realNames = {};
      var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap2);
      var symbolProto = Symbol2 ? Symbol2.prototype : undefined2, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined2, symbolToString = symbolProto ? symbolProto.toString : undefined2;
      function lodash(value) {
        if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
          if (value instanceof LodashWrapper) {
            return value;
          }
          if (hasOwnProperty.call(value, "__wrapped__")) {
            return wrapperClone(value);
          }
        }
        return new LodashWrapper(value);
      }
      var baseCreate = function() {
        function object() {}
        return function(proto) {
          if (!isObject(proto)) {
            return {};
          }
          if (objectCreate) {
            return objectCreate(proto);
          }
          object.prototype = proto;
          var result2 = new object;
          object.prototype = undefined2;
          return result2;
        };
      }();
      function baseLodash() {}
      function LodashWrapper(value, chainAll) {
        this.__wrapped__ = value;
        this.__actions__ = [];
        this.__chain__ = !!chainAll;
        this.__index__ = 0;
        this.__values__ = undefined2;
      }
      lodash.templateSettings = {
        escape: reEscape,
        evaluate: reEvaluate,
        interpolate: reInterpolate,
        variable: "",
        imports: {
          _: lodash
        }
      };
      lodash.prototype = baseLodash.prototype;
      lodash.prototype.constructor = lodash;
      LodashWrapper.prototype = baseCreate(baseLodash.prototype);
      LodashWrapper.prototype.constructor = LodashWrapper;
      function LazyWrapper(value) {
        this.__wrapped__ = value;
        this.__actions__ = [];
        this.__dir__ = 1;
        this.__filtered__ = false;
        this.__iteratees__ = [];
        this.__takeCount__ = MAX_ARRAY_LENGTH;
        this.__views__ = [];
      }
      function lazyClone() {
        var result2 = new LazyWrapper(this.__wrapped__);
        result2.__actions__ = copyArray(this.__actions__);
        result2.__dir__ = this.__dir__;
        result2.__filtered__ = this.__filtered__;
        result2.__iteratees__ = copyArray(this.__iteratees__);
        result2.__takeCount__ = this.__takeCount__;
        result2.__views__ = copyArray(this.__views__);
        return result2;
      }
      function lazyReverse() {
        if (this.__filtered__) {
          var result2 = new LazyWrapper(this);
          result2.__dir__ = -1;
          result2.__filtered__ = true;
        } else {
          result2 = this.clone();
          result2.__dir__ *= -1;
        }
        return result2;
      }
      function lazyValue() {
        var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
        if (!isArr || !isRight && arrLength == length && takeCount == length) {
          return baseWrapperValue(array, this.__actions__);
        }
        var result2 = [];
        outer:
          while (length-- && resIndex < takeCount) {
            index += dir;
            var iterIndex = -1, value = array[index];
            while (++iterIndex < iterLength) {
              var data = iteratees[iterIndex], iteratee2 = data.iteratee, type = data.type, computed = iteratee2(value);
              if (type == LAZY_MAP_FLAG) {
                value = computed;
              } else if (!computed) {
                if (type == LAZY_FILTER_FLAG) {
                  continue outer;
                } else {
                  break outer;
                }
              }
            }
            result2[resIndex++] = value;
          }
        return result2;
      }
      LazyWrapper.prototype = baseCreate(baseLodash.prototype);
      LazyWrapper.prototype.constructor = LazyWrapper;
      function Hash(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function hashClear() {
        this.__data__ = nativeCreate ? nativeCreate(null) : {};
        this.size = 0;
      }
      function hashDelete(key) {
        var result2 = this.has(key) && delete this.__data__[key];
        this.size -= result2 ? 1 : 0;
        return result2;
      }
      function hashGet(key) {
        var data = this.__data__;
        if (nativeCreate) {
          var result2 = data[key];
          return result2 === HASH_UNDEFINED ? undefined2 : result2;
        }
        return hasOwnProperty.call(data, key) ? data[key] : undefined2;
      }
      function hashHas(key) {
        var data = this.__data__;
        return nativeCreate ? data[key] !== undefined2 : hasOwnProperty.call(data, key);
      }
      function hashSet(key, value) {
        var data = this.__data__;
        this.size += this.has(key) ? 0 : 1;
        data[key] = nativeCreate && value === undefined2 ? HASH_UNDEFINED : value;
        return this;
      }
      Hash.prototype.clear = hashClear;
      Hash.prototype["delete"] = hashDelete;
      Hash.prototype.get = hashGet;
      Hash.prototype.has = hashHas;
      Hash.prototype.set = hashSet;
      function ListCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function listCacheClear() {
        this.__data__ = [];
        this.size = 0;
      }
      function listCacheDelete(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
          return false;
        }
        var lastIndex = data.length - 1;
        if (index == lastIndex) {
          data.pop();
        } else {
          splice.call(data, index, 1);
        }
        --this.size;
        return true;
      }
      function listCacheGet(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        return index < 0 ? undefined2 : data[index][1];
      }
      function listCacheHas(key) {
        return assocIndexOf(this.__data__, key) > -1;
      }
      function listCacheSet(key, value) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
          ++this.size;
          data.push([key, value]);
        } else {
          data[index][1] = value;
        }
        return this;
      }
      ListCache.prototype.clear = listCacheClear;
      ListCache.prototype["delete"] = listCacheDelete;
      ListCache.prototype.get = listCacheGet;
      ListCache.prototype.has = listCacheHas;
      ListCache.prototype.set = listCacheSet;
      function MapCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function mapCacheClear() {
        this.size = 0;
        this.__data__ = {
          hash: new Hash,
          map: new (Map2 || ListCache),
          string: new Hash
        };
      }
      function mapCacheDelete(key) {
        var result2 = getMapData(this, key)["delete"](key);
        this.size -= result2 ? 1 : 0;
        return result2;
      }
      function mapCacheGet(key) {
        return getMapData(this, key).get(key);
      }
      function mapCacheHas(key) {
        return getMapData(this, key).has(key);
      }
      function mapCacheSet(key, value) {
        var data = getMapData(this, key), size2 = data.size;
        data.set(key, value);
        this.size += data.size == size2 ? 0 : 1;
        return this;
      }
      MapCache.prototype.clear = mapCacheClear;
      MapCache.prototype["delete"] = mapCacheDelete;
      MapCache.prototype.get = mapCacheGet;
      MapCache.prototype.has = mapCacheHas;
      MapCache.prototype.set = mapCacheSet;
      function SetCache(values2) {
        var index = -1, length = values2 == null ? 0 : values2.length;
        this.__data__ = new MapCache;
        while (++index < length) {
          this.add(values2[index]);
        }
      }
      function setCacheAdd(value) {
        this.__data__.set(value, HASH_UNDEFINED);
        return this;
      }
      function setCacheHas(value) {
        return this.__data__.has(value);
      }
      SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
      SetCache.prototype.has = setCacheHas;
      function Stack(entries) {
        var data = this.__data__ = new ListCache(entries);
        this.size = data.size;
      }
      function stackClear() {
        this.__data__ = new ListCache;
        this.size = 0;
      }
      function stackDelete(key) {
        var data = this.__data__, result2 = data["delete"](key);
        this.size = data.size;
        return result2;
      }
      function stackGet(key) {
        return this.__data__.get(key);
      }
      function stackHas(key) {
        return this.__data__.has(key);
      }
      function stackSet(key, value) {
        var data = this.__data__;
        if (data instanceof ListCache) {
          var pairs = data.__data__;
          if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
            pairs.push([key, value]);
            this.size = ++data.size;
            return this;
          }
          data = this.__data__ = new MapCache(pairs);
        }
        data.set(key, value);
        this.size = data.size;
        return this;
      }
      Stack.prototype.clear = stackClear;
      Stack.prototype["delete"] = stackDelete;
      Stack.prototype.get = stackGet;
      Stack.prototype.has = stackHas;
      Stack.prototype.set = stackSet;
      function arrayLikeKeys(value, inherited) {
        var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes(value.length, String2) : [], length = result2.length;
        for (var key in value) {
          if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) {
            result2.push(key);
          }
        }
        return result2;
      }
      function arraySample(array) {
        var length = array.length;
        return length ? array[baseRandom(0, length - 1)] : undefined2;
      }
      function arraySampleSize(array, n) {
        return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
      }
      function arrayShuffle(array) {
        return shuffleSelf(copyArray(array));
      }
      function assignMergeValue(object, key, value) {
        if (value !== undefined2 && !eq(object[key], value) || value === undefined2 && !(key in object)) {
          baseAssignValue(object, key, value);
        }
      }
      function assignValue(object, key, value) {
        var objValue = object[key];
        if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined2 && !(key in object)) {
          baseAssignValue(object, key, value);
        }
      }
      function assocIndexOf(array, key) {
        var length = array.length;
        while (length--) {
          if (eq(array[length][0], key)) {
            return length;
          }
        }
        return -1;
      }
      function baseAggregator(collection, setter, iteratee2, accumulator) {
        baseEach(collection, function(value, key, collection2) {
          setter(accumulator, value, iteratee2(value), collection2);
        });
        return accumulator;
      }
      function baseAssign(object, source) {
        return object && copyObject(source, keys(source), object);
      }
      function baseAssignIn(object, source) {
        return object && copyObject(source, keysIn(source), object);
      }
      function baseAssignValue(object, key, value) {
        if (key == "__proto__" && defineProperty) {
          defineProperty(object, key, {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        } else {
          object[key] = value;
        }
      }
      function baseAt(object, paths) {
        var index = -1, length = paths.length, result2 = Array2(length), skip = object == null;
        while (++index < length) {
          result2[index] = skip ? undefined2 : get(object, paths[index]);
        }
        return result2;
      }
      function baseClamp(number, lower, upper) {
        if (number === number) {
          if (upper !== undefined2) {
            number = number <= upper ? number : upper;
          }
          if (lower !== undefined2) {
            number = number >= lower ? number : lower;
          }
        }
        return number;
      }
      function baseClone(value, bitmask, customizer, key, object, stack) {
        var result2, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
        if (customizer) {
          result2 = object ? customizer(value, key, object, stack) : customizer(value);
        }
        if (result2 !== undefined2) {
          return result2;
        }
        if (!isObject(value)) {
          return value;
        }
        var isArr = isArray(value);
        if (isArr) {
          result2 = initCloneArray(value);
          if (!isDeep) {
            return copyArray(value, result2);
          }
        } else {
          var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
          if (isBuffer(value)) {
            return cloneBuffer(value, isDeep);
          }
          if (tag == objectTag || tag == argsTag || isFunc && !object) {
            result2 = isFlat || isFunc ? {} : initCloneObject(value);
            if (!isDeep) {
              return isFlat ? copySymbolsIn(value, baseAssignIn(result2, value)) : copySymbols(value, baseAssign(result2, value));
            }
          } else {
            if (!cloneableTags[tag]) {
              return object ? value : {};
            }
            result2 = initCloneByTag(value, tag, isDeep);
          }
        }
        stack || (stack = new Stack);
        var stacked = stack.get(value);
        if (stacked) {
          return stacked;
        }
        stack.set(value, result2);
        if (isSet(value)) {
          value.forEach(function(subValue) {
            result2.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
          });
        } else if (isMap(value)) {
          value.forEach(function(subValue, key2) {
            result2.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
          });
        }
        var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
        var props = isArr ? undefined2 : keysFunc(value);
        arrayEach(props || value, function(subValue, key2) {
          if (props) {
            key2 = subValue;
            subValue = value[key2];
          }
          assignValue(result2, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
        });
        return result2;
      }
      function baseConforms(source) {
        var props = keys(source);
        return function(object) {
          return baseConformsTo(object, source, props);
        };
      }
      function baseConformsTo(object, source, props) {
        var length = props.length;
        if (object == null) {
          return !length;
        }
        object = Object2(object);
        while (length--) {
          var key = props[length], predicate = source[key], value = object[key];
          if (value === undefined2 && !(key in object) || !predicate(value)) {
            return false;
          }
        }
        return true;
      }
      function baseDelay(func, wait, args) {
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        return setTimeout2(function() {
          func.apply(undefined2, args);
        }, wait);
      }
      function baseDifference(array, values2, iteratee2, comparator) {
        var index = -1, includes2 = arrayIncludes, isCommon = true, length = array.length, result2 = [], valuesLength = values2.length;
        if (!length) {
          return result2;
        }
        if (iteratee2) {
          values2 = arrayMap(values2, baseUnary(iteratee2));
        }
        if (comparator) {
          includes2 = arrayIncludesWith;
          isCommon = false;
        } else if (values2.length >= LARGE_ARRAY_SIZE) {
          includes2 = cacheHas;
          isCommon = false;
          values2 = new SetCache(values2);
        }
        outer:
          while (++index < length) {
            var value = array[index], computed = iteratee2 == null ? value : iteratee2(value);
            value = comparator || value !== 0 ? value : 0;
            if (isCommon && computed === computed) {
              var valuesIndex = valuesLength;
              while (valuesIndex--) {
                if (values2[valuesIndex] === computed) {
                  continue outer;
                }
              }
              result2.push(value);
            } else if (!includes2(values2, computed, comparator)) {
              result2.push(value);
            }
          }
        return result2;
      }
      var baseEach = createBaseEach(baseForOwn);
      var baseEachRight = createBaseEach(baseForOwnRight, true);
      function baseEvery(collection, predicate) {
        var result2 = true;
        baseEach(collection, function(value, index, collection2) {
          result2 = !!predicate(value, index, collection2);
          return result2;
        });
        return result2;
      }
      function baseExtremum(array, iteratee2, comparator) {
        var index = -1, length = array.length;
        while (++index < length) {
          var value = array[index], current = iteratee2(value);
          if (current != null && (computed === undefined2 ? current === current && !isSymbol(current) : comparator(current, computed))) {
            var computed = current, result2 = value;
          }
        }
        return result2;
      }
      function baseFill(array, value, start, end) {
        var length = array.length;
        start = toInteger(start);
        if (start < 0) {
          start = -start > length ? 0 : length + start;
        }
        end = end === undefined2 || end > length ? length : toInteger(end);
        if (end < 0) {
          end += length;
        }
        end = start > end ? 0 : toLength(end);
        while (start < end) {
          array[start++] = value;
        }
        return array;
      }
      function baseFilter(collection, predicate) {
        var result2 = [];
        baseEach(collection, function(value, index, collection2) {
          if (predicate(value, index, collection2)) {
            result2.push(value);
          }
        });
        return result2;
      }
      function baseFlatten(array, depth, predicate, isStrict, result2) {
        var index = -1, length = array.length;
        predicate || (predicate = isFlattenable);
        result2 || (result2 = []);
        while (++index < length) {
          var value = array[index];
          if (depth > 0 && predicate(value)) {
            if (depth > 1) {
              baseFlatten(value, depth - 1, predicate, isStrict, result2);
            } else {
              arrayPush(result2, value);
            }
          } else if (!isStrict) {
            result2[result2.length] = value;
          }
        }
        return result2;
      }
      var baseFor = createBaseFor();
      var baseForRight = createBaseFor(true);
      function baseForOwn(object, iteratee2) {
        return object && baseFor(object, iteratee2, keys);
      }
      function baseForOwnRight(object, iteratee2) {
        return object && baseForRight(object, iteratee2, keys);
      }
      function baseFunctions(object, props) {
        return arrayFilter(props, function(key) {
          return isFunction(object[key]);
        });
      }
      function baseGet(object, path) {
        path = castPath(path, object);
        var index = 0, length = path.length;
        while (object != null && index < length) {
          object = object[toKey(path[index++])];
        }
        return index && index == length ? object : undefined2;
      }
      function baseGetAllKeys(object, keysFunc, symbolsFunc) {
        var result2 = keysFunc(object);
        return isArray(object) ? result2 : arrayPush(result2, symbolsFunc(object));
      }
      function baseGetTag(value) {
        if (value == null) {
          return value === undefined2 ? undefinedTag : nullTag;
        }
        return symToStringTag && symToStringTag in Object2(value) ? getRawTag(value) : objectToString(value);
      }
      function baseGt(value, other) {
        return value > other;
      }
      function baseHas(object, key) {
        return object != null && hasOwnProperty.call(object, key);
      }
      function baseHasIn(object, key) {
        return object != null && key in Object2(object);
      }
      function baseInRange(number, start, end) {
        return number >= nativeMin(start, end) && number < nativeMax(start, end);
      }
      function baseIntersection(arrays, iteratee2, comparator) {
        var includes2 = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array2(othLength), maxLength = Infinity, result2 = [];
        while (othIndex--) {
          var array = arrays[othIndex];
          if (othIndex && iteratee2) {
            array = arrayMap(array, baseUnary(iteratee2));
          }
          maxLength = nativeMin(array.length, maxLength);
          caches[othIndex] = !comparator && (iteratee2 || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined2;
        }
        array = arrays[0];
        var index = -1, seen = caches[0];
        outer:
          while (++index < length && result2.length < maxLength) {
            var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
            value = comparator || value !== 0 ? value : 0;
            if (!(seen ? cacheHas(seen, computed) : includes2(result2, computed, comparator))) {
              othIndex = othLength;
              while (--othIndex) {
                var cache = caches[othIndex];
                if (!(cache ? cacheHas(cache, computed) : includes2(arrays[othIndex], computed, comparator))) {
                  continue outer;
                }
              }
              if (seen) {
                seen.push(computed);
              }
              result2.push(value);
            }
          }
        return result2;
      }
      function baseInverter(object, setter, iteratee2, accumulator) {
        baseForOwn(object, function(value, key, object2) {
          setter(accumulator, iteratee2(value), key, object2);
        });
        return accumulator;
      }
      function baseInvoke(object, path, args) {
        path = castPath(path, object);
        object = parent(object, path);
        var func = object == null ? object : object[toKey(last(path))];
        return func == null ? undefined2 : apply(func, object, args);
      }
      function baseIsArguments(value) {
        return isObjectLike(value) && baseGetTag(value) == argsTag;
      }
      function baseIsArrayBuffer(value) {
        return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
      }
      function baseIsDate(value) {
        return isObjectLike(value) && baseGetTag(value) == dateTag;
      }
      function baseIsEqual(value, other, bitmask, customizer, stack) {
        if (value === other) {
          return true;
        }
        if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
          return value !== value && other !== other;
        }
        return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
      }
      function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
        var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
        objTag = objTag == argsTag ? objectTag : objTag;
        othTag = othTag == argsTag ? objectTag : othTag;
        var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
        if (isSameTag && isBuffer(object)) {
          if (!isBuffer(other)) {
            return false;
          }
          objIsArr = true;
          objIsObj = false;
        }
        if (isSameTag && !objIsObj) {
          stack || (stack = new Stack);
          return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
        }
        if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
          var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
          if (objIsWrapped || othIsWrapped) {
            var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
            stack || (stack = new Stack);
            return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
          }
        }
        if (!isSameTag) {
          return false;
        }
        stack || (stack = new Stack);
        return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
      }
      function baseIsMap(value) {
        return isObjectLike(value) && getTag(value) == mapTag;
      }
      function baseIsMatch(object, source, matchData, customizer) {
        var index = matchData.length, length = index, noCustomizer = !customizer;
        if (object == null) {
          return !length;
        }
        object = Object2(object);
        while (index--) {
          var data = matchData[index];
          if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
            return false;
          }
        }
        while (++index < length) {
          data = matchData[index];
          var key = data[0], objValue = object[key], srcValue = data[1];
          if (noCustomizer && data[2]) {
            if (objValue === undefined2 && !(key in object)) {
              return false;
            }
          } else {
            var stack = new Stack;
            if (customizer) {
              var result2 = customizer(objValue, srcValue, key, object, source, stack);
            }
            if (!(result2 === undefined2 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result2)) {
              return false;
            }
          }
        }
        return true;
      }
      function baseIsNative(value) {
        if (!isObject(value) || isMasked(value)) {
          return false;
        }
        var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
        return pattern.test(toSource(value));
      }
      function baseIsRegExp(value) {
        return isObjectLike(value) && baseGetTag(value) == regexpTag;
      }
      function baseIsSet(value) {
        return isObjectLike(value) && getTag(value) == setTag;
      }
      function baseIsTypedArray(value) {
        return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
      }
      function baseIteratee(value) {
        if (typeof value == "function") {
          return value;
        }
        if (value == null) {
          return identity;
        }
        if (typeof value == "object") {
          return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
        }
        return property(value);
      }
      function baseKeys(object) {
        if (!isPrototype(object)) {
          return nativeKeys(object);
        }
        var result2 = [];
        for (var key in Object2(object)) {
          if (hasOwnProperty.call(object, key) && key != "constructor") {
            result2.push(key);
          }
        }
        return result2;
      }
      function baseKeysIn(object) {
        if (!isObject(object)) {
          return nativeKeysIn(object);
        }
        var isProto = isPrototype(object), result2 = [];
        for (var key in object) {
          if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
            result2.push(key);
          }
        }
        return result2;
      }
      function baseLt(value, other) {
        return value < other;
      }
      function baseMap(collection, iteratee2) {
        var index = -1, result2 = isArrayLike(collection) ? Array2(collection.length) : [];
        baseEach(collection, function(value, key, collection2) {
          result2[++index] = iteratee2(value, key, collection2);
        });
        return result2;
      }
      function baseMatches(source) {
        var matchData = getMatchData(source);
        if (matchData.length == 1 && matchData[0][2]) {
          return matchesStrictComparable(matchData[0][0], matchData[0][1]);
        }
        return function(object) {
          return object === source || baseIsMatch(object, source, matchData);
        };
      }
      function baseMatchesProperty(path, srcValue) {
        if (isKey(path) && isStrictComparable(srcValue)) {
          return matchesStrictComparable(toKey(path), srcValue);
        }
        return function(object) {
          var objValue = get(object, path);
          return objValue === undefined2 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
        };
      }
      function baseMerge(object, source, srcIndex, customizer, stack) {
        if (object === source) {
          return;
        }
        baseFor(source, function(srcValue, key) {
          stack || (stack = new Stack);
          if (isObject(srcValue)) {
            baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
          } else {
            var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : undefined2;
            if (newValue === undefined2) {
              newValue = srcValue;
            }
            assignMergeValue(object, key, newValue);
          }
        }, keysIn);
      }
      function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
        var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
        if (stacked) {
          assignMergeValue(object, key, stacked);
          return;
        }
        var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined2;
        var isCommon = newValue === undefined2;
        if (isCommon) {
          var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
          newValue = srcValue;
          if (isArr || isBuff || isTyped) {
            if (isArray(objValue)) {
              newValue = objValue;
            } else if (isArrayLikeObject(objValue)) {
              newValue = copyArray(objValue);
            } else if (isBuff) {
              isCommon = false;
              newValue = cloneBuffer(srcValue, true);
            } else if (isTyped) {
              isCommon = false;
              newValue = cloneTypedArray(srcValue, true);
            } else {
              newValue = [];
            }
          } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
            newValue = objValue;
            if (isArguments(objValue)) {
              newValue = toPlainObject(objValue);
            } else if (!isObject(objValue) || isFunction(objValue)) {
              newValue = initCloneObject(srcValue);
            }
          } else {
            isCommon = false;
          }
        }
        if (isCommon) {
          stack.set(srcValue, newValue);
          mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
          stack["delete"](srcValue);
        }
        assignMergeValue(object, key, newValue);
      }
      function baseNth(array, n) {
        var length = array.length;
        if (!length) {
          return;
        }
        n += n < 0 ? length : 0;
        return isIndex(n, length) ? array[n] : undefined2;
      }
      function baseOrderBy(collection, iteratees, orders) {
        if (iteratees.length) {
          iteratees = arrayMap(iteratees, function(iteratee2) {
            if (isArray(iteratee2)) {
              return function(value) {
                return baseGet(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
              };
            }
            return iteratee2;
          });
        } else {
          iteratees = [identity];
        }
        var index = -1;
        iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
        var result2 = baseMap(collection, function(value, key, collection2) {
          var criteria = arrayMap(iteratees, function(iteratee2) {
            return iteratee2(value);
          });
          return { criteria, index: ++index, value };
        });
        return baseSortBy(result2, function(object, other) {
          return compareMultiple(object, other, orders);
        });
      }
      function basePick(object, paths) {
        return basePickBy(object, paths, function(value, path) {
          return hasIn(object, path);
        });
      }
      function basePickBy(object, paths, predicate) {
        var index = -1, length = paths.length, result2 = {};
        while (++index < length) {
          var path = paths[index], value = baseGet(object, path);
          if (predicate(value, path)) {
            baseSet(result2, castPath(path, object), value);
          }
        }
        return result2;
      }
      function basePropertyDeep(path) {
        return function(object) {
          return baseGet(object, path);
        };
      }
      function basePullAll(array, values2, iteratee2, comparator) {
        var indexOf2 = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length = values2.length, seen = array;
        if (array === values2) {
          values2 = copyArray(values2);
        }
        if (iteratee2) {
          seen = arrayMap(array, baseUnary(iteratee2));
        }
        while (++index < length) {
          var fromIndex = 0, value = values2[index], computed = iteratee2 ? iteratee2(value) : value;
          while ((fromIndex = indexOf2(seen, computed, fromIndex, comparator)) > -1) {
            if (seen !== array) {
              splice.call(seen, fromIndex, 1);
            }
            splice.call(array, fromIndex, 1);
          }
        }
        return array;
      }
      function basePullAt(array, indexes) {
        var length = array ? indexes.length : 0, lastIndex = length - 1;
        while (length--) {
          var index = indexes[length];
          if (length == lastIndex || index !== previous) {
            var previous = index;
            if (isIndex(index)) {
              splice.call(array, index, 1);
            } else {
              baseUnset(array, index);
            }
          }
        }
        return array;
      }
      function baseRandom(lower, upper) {
        return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
      }
      function baseRange(start, end, step, fromRight) {
        var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result2 = Array2(length);
        while (length--) {
          result2[fromRight ? length : ++index] = start;
          start += step;
        }
        return result2;
      }
      function baseRepeat(string, n) {
        var result2 = "";
        if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
          return result2;
        }
        do {
          if (n % 2) {
            result2 += string;
          }
          n = nativeFloor(n / 2);
          if (n) {
            string += string;
          }
        } while (n);
        return result2;
      }
      function baseRest(func, start) {
        return setToString(overRest(func, start, identity), func + "");
      }
      function baseSample(collection) {
        return arraySample(values(collection));
      }
      function baseSampleSize(collection, n) {
        var array = values(collection);
        return shuffleSelf(array, baseClamp(n, 0, array.length));
      }
      function baseSet(object, path, value, customizer) {
        if (!isObject(object)) {
          return object;
        }
        path = castPath(path, object);
        var index = -1, length = path.length, lastIndex = length - 1, nested = object;
        while (nested != null && ++index < length) {
          var key = toKey(path[index]), newValue = value;
          if (key === "__proto__" || key === "constructor" || key === "prototype") {
            return object;
          }
          if (index != lastIndex) {
            var objValue = nested[key];
            newValue = customizer ? customizer(objValue, key, nested) : undefined2;
            if (newValue === undefined2) {
              newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
            }
          }
          assignValue(nested, key, newValue);
          nested = nested[key];
        }
        return object;
      }
      var baseSetData = !metaMap ? identity : function(func, data) {
        metaMap.set(func, data);
        return func;
      };
      var baseSetToString = !defineProperty ? identity : function(func, string) {
        return defineProperty(func, "toString", {
          configurable: true,
          enumerable: false,
          value: constant(string),
          writable: true
        });
      };
      function baseShuffle(collection) {
        return shuffleSelf(values(collection));
      }
      function baseSlice(array, start, end) {
        var index = -1, length = array.length;
        if (start < 0) {
          start = -start > length ? 0 : length + start;
        }
        end = end > length ? length : end;
        if (end < 0) {
          end += length;
        }
        length = start > end ? 0 : end - start >>> 0;
        start >>>= 0;
        var result2 = Array2(length);
        while (++index < length) {
          result2[index] = array[index + start];
        }
        return result2;
      }
      function baseSome(collection, predicate) {
        var result2;
        baseEach(collection, function(value, index, collection2) {
          result2 = predicate(value, index, collection2);
          return !result2;
        });
        return !!result2;
      }
      function baseSortedIndex(array, value, retHighest) {
        var low = 0, high = array == null ? low : array.length;
        if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
          while (low < high) {
            var mid = low + high >>> 1, computed = array[mid];
            if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }
          return high;
        }
        return baseSortedIndexBy(array, value, identity, retHighest);
      }
      function baseSortedIndexBy(array, value, iteratee2, retHighest) {
        var low = 0, high = array == null ? 0 : array.length;
        if (high === 0) {
          return 0;
        }
        value = iteratee2(value);
        var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol(value), valIsUndefined = value === undefined2;
        while (low < high) {
          var mid = nativeFloor((low + high) / 2), computed = iteratee2(array[mid]), othIsDefined = computed !== undefined2, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol(computed);
          if (valIsNaN) {
            var setLow = retHighest || othIsReflexive;
          } else if (valIsUndefined) {
            setLow = othIsReflexive && (retHighest || othIsDefined);
          } else if (valIsNull) {
            setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
          } else if (valIsSymbol) {
            setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
          } else if (othIsNull || othIsSymbol) {
            setLow = false;
          } else {
            setLow = retHighest ? computed <= value : computed < value;
          }
          if (setLow) {
            low = mid + 1;
          } else {
            high = mid;
          }
        }
        return nativeMin(high, MAX_ARRAY_INDEX);
      }
      function baseSortedUniq(array, iteratee2) {
        var index = -1, length = array.length, resIndex = 0, result2 = [];
        while (++index < length) {
          var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
          if (!index || !eq(computed, seen)) {
            var seen = computed;
            result2[resIndex++] = value === 0 ? 0 : value;
          }
        }
        return result2;
      }
      function baseToNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol(value)) {
          return NAN;
        }
        return +value;
      }
      function baseToString(value) {
        if (typeof value == "string") {
          return value;
        }
        if (isArray(value)) {
          return arrayMap(value, baseToString) + "";
        }
        if (isSymbol(value)) {
          return symbolToString ? symbolToString.call(value) : "";
        }
        var result2 = value + "";
        return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
      }
      function baseUniq(array, iteratee2, comparator) {
        var index = -1, includes2 = arrayIncludes, length = array.length, isCommon = true, result2 = [], seen = result2;
        if (comparator) {
          isCommon = false;
          includes2 = arrayIncludesWith;
        } else if (length >= LARGE_ARRAY_SIZE) {
          var set2 = iteratee2 ? null : createSet(array);
          if (set2) {
            return setToArray(set2);
          }
          isCommon = false;
          includes2 = cacheHas;
          seen = new SetCache;
        } else {
          seen = iteratee2 ? [] : result2;
        }
        outer:
          while (++index < length) {
            var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
            value = comparator || value !== 0 ? value : 0;
            if (isCommon && computed === computed) {
              var seenIndex = seen.length;
              while (seenIndex--) {
                if (seen[seenIndex] === computed) {
                  continue outer;
                }
              }
              if (iteratee2) {
                seen.push(computed);
              }
              result2.push(value);
            } else if (!includes2(seen, computed, comparator)) {
              if (seen !== result2) {
                seen.push(computed);
              }
              result2.push(value);
            }
          }
        return result2;
      }
      function baseUnset(object, path) {
        path = castPath(path, object);
        var index = -1, length = path.length;
        if (!length) {
          return true;
        }
        var isRootPrimitive = object == null || typeof object !== "object" && typeof object !== "function";
        while (++index < length) {
          var key = path[index];
          if (typeof key !== "string") {
            continue;
          }
          if (key === "__proto__" && !hasOwnProperty.call(object, "__proto__")) {
            return false;
          }
          if (key === "constructor" && index + 1 < length && typeof path[index + 1] === "string" && path[index + 1] === "prototype") {
            if (isRootPrimitive && index === 0) {
              continue;
            }
            return false;
          }
        }
        var obj = parent(object, path);
        return obj == null || delete obj[toKey(last(path))];
      }
      function baseUpdate(object, path, updater, customizer) {
        return baseSet(object, path, updater(baseGet(object, path)), customizer);
      }
      function baseWhile(array, predicate, isDrop, fromRight) {
        var length = array.length, index = fromRight ? length : -1;
        while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {}
        return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
      }
      function baseWrapperValue(value, actions) {
        var result2 = value;
        if (result2 instanceof LazyWrapper) {
          result2 = result2.value();
        }
        return arrayReduce(actions, function(result3, action) {
          return action.func.apply(action.thisArg, arrayPush([result3], action.args));
        }, result2);
      }
      function baseXor(arrays, iteratee2, comparator) {
        var length = arrays.length;
        if (length < 2) {
          return length ? baseUniq(arrays[0]) : [];
        }
        var index = -1, result2 = Array2(length);
        while (++index < length) {
          var array = arrays[index], othIndex = -1;
          while (++othIndex < length) {
            if (othIndex != index) {
              result2[index] = baseDifference(result2[index] || array, arrays[othIndex], iteratee2, comparator);
            }
          }
        }
        return baseUniq(baseFlatten(result2, 1), iteratee2, comparator);
      }
      function baseZipObject(props, values2, assignFunc) {
        var index = -1, length = props.length, valsLength = values2.length, result2 = {};
        while (++index < length) {
          var value = index < valsLength ? values2[index] : undefined2;
          assignFunc(result2, props[index], value);
        }
        return result2;
      }
      function castArrayLikeObject(value) {
        return isArrayLikeObject(value) ? value : [];
      }
      function castFunction(value) {
        return typeof value == "function" ? value : identity;
      }
      function castPath(value, object) {
        if (isArray(value)) {
          return value;
        }
        return isKey(value, object) ? [value] : stringToPath(toString(value));
      }
      var castRest = baseRest;
      function castSlice(array, start, end) {
        var length = array.length;
        end = end === undefined2 ? length : end;
        return !start && end >= length ? array : baseSlice(array, start, end);
      }
      var clearTimeout2 = ctxClearTimeout || function(id) {
        return root.clearTimeout(id);
      };
      function cloneBuffer(buffer, isDeep) {
        if (isDeep) {
          return buffer.slice();
        }
        var length = buffer.length, result2 = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
        buffer.copy(result2);
        return result2;
      }
      function cloneArrayBuffer(arrayBuffer) {
        var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
        new Uint8Array(result2).set(new Uint8Array(arrayBuffer));
        return result2;
      }
      function cloneDataView(dataView, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
        return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
      }
      function cloneRegExp(regexp) {
        var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
        result2.lastIndex = regexp.lastIndex;
        return result2;
      }
      function cloneSymbol(symbol) {
        return symbolValueOf ? Object2(symbolValueOf.call(symbol)) : {};
      }
      function cloneTypedArray(typedArray, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
        return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
      }
      function compareAscending(value, other) {
        if (value !== other) {
          var valIsDefined = value !== undefined2, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
          var othIsDefined = other !== undefined2, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
          if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
            return 1;
          }
          if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
            return -1;
          }
        }
        return 0;
      }
      function compareMultiple(object, other, orders) {
        var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
        while (++index < length) {
          var result2 = compareAscending(objCriteria[index], othCriteria[index]);
          if (result2) {
            if (index >= ordersLength) {
              return result2;
            }
            var order = orders[index];
            return result2 * (order == "desc" ? -1 : 1);
          }
        }
        return object.index - other.index;
      }
      function composeArgs(args, partials, holders, isCurried) {
        var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(leftLength + rangeLength), isUncurried = !isCurried;
        while (++leftIndex < leftLength) {
          result2[leftIndex] = partials[leftIndex];
        }
        while (++argsIndex < holdersLength) {
          if (isUncurried || argsIndex < argsLength) {
            result2[holders[argsIndex]] = args[argsIndex];
          }
        }
        while (rangeLength--) {
          result2[leftIndex++] = args[argsIndex++];
        }
        return result2;
      }
      function composeArgsRight(args, partials, holders, isCurried) {
        var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(rangeLength + rightLength), isUncurried = !isCurried;
        while (++argsIndex < rangeLength) {
          result2[argsIndex] = args[argsIndex];
        }
        var offset = argsIndex;
        while (++rightIndex < rightLength) {
          result2[offset + rightIndex] = partials[rightIndex];
        }
        while (++holdersIndex < holdersLength) {
          if (isUncurried || argsIndex < argsLength) {
            result2[offset + holders[holdersIndex]] = args[argsIndex++];
          }
        }
        return result2;
      }
      function copyArray(source, array) {
        var index = -1, length = source.length;
        array || (array = Array2(length));
        while (++index < length) {
          array[index] = source[index];
        }
        return array;
      }
      function copyObject(source, props, object, customizer) {
        var isNew = !object;
        object || (object = {});
        var index = -1, length = props.length;
        while (++index < length) {
          var key = props[index];
          var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined2;
          if (newValue === undefined2) {
            newValue = source[key];
          }
          if (isNew) {
            baseAssignValue(object, key, newValue);
          } else {
            assignValue(object, key, newValue);
          }
        }
        return object;
      }
      function copySymbols(source, object) {
        return copyObject(source, getSymbols(source), object);
      }
      function copySymbolsIn(source, object) {
        return copyObject(source, getSymbolsIn(source), object);
      }
      function createAggregator(setter, initializer) {
        return function(collection, iteratee2) {
          var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
          return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
        };
      }
      function createAssigner(assigner) {
        return baseRest(function(object, sources) {
          var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined2, guard = length > 2 ? sources[2] : undefined2;
          customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined2;
          if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            customizer = length < 3 ? undefined2 : customizer;
            length = 1;
          }
          object = Object2(object);
          while (++index < length) {
            var source = sources[index];
            if (source) {
              assigner(object, source, index, customizer);
            }
          }
          return object;
        });
      }
      function createBaseEach(eachFunc, fromRight) {
        return function(collection, iteratee2) {
          if (collection == null) {
            return collection;
          }
          if (!isArrayLike(collection)) {
            return eachFunc(collection, iteratee2);
          }
          var length = collection.length, index = fromRight ? length : -1, iterable = Object2(collection);
          while (fromRight ? index-- : ++index < length) {
            if (iteratee2(iterable[index], index, iterable) === false) {
              break;
            }
          }
          return collection;
        };
      }
      function createBaseFor(fromRight) {
        return function(object, iteratee2, keysFunc) {
          var index = -1, iterable = Object2(object), props = keysFunc(object), length = props.length;
          while (length--) {
            var key = props[fromRight ? length : ++index];
            if (iteratee2(iterable[key], key, iterable) === false) {
              break;
            }
          }
          return object;
        };
      }
      function createBind(func, bitmask, thisArg) {
        var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
        function wrapper() {
          var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
          return fn.apply(isBind ? thisArg : this, arguments);
        }
        return wrapper;
      }
      function createCaseFirst(methodName) {
        return function(string) {
          string = toString(string);
          var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined2;
          var chr = strSymbols ? strSymbols[0] : string.charAt(0);
          var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
          return chr[methodName]() + trailing;
        };
      }
      function createCompounder(callback) {
        return function(string) {
          return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
        };
      }
      function createCtor(Ctor) {
        return function() {
          var args = arguments;
          switch (args.length) {
            case 0:
              return new Ctor;
            case 1:
              return new Ctor(args[0]);
            case 2:
              return new Ctor(args[0], args[1]);
            case 3:
              return new Ctor(args[0], args[1], args[2]);
            case 4:
              return new Ctor(args[0], args[1], args[2], args[3]);
            case 5:
              return new Ctor(args[0], args[1], args[2], args[3], args[4]);
            case 6:
              return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
            case 7:
              return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
          }
          var thisBinding = baseCreate(Ctor.prototype), result2 = Ctor.apply(thisBinding, args);
          return isObject(result2) ? result2 : thisBinding;
        };
      }
      function createCurry(func, bitmask, arity) {
        var Ctor = createCtor(func);
        function wrapper() {
          var length = arguments.length, args = Array2(length), index = length, placeholder = getHolder(wrapper);
          while (index--) {
            args[index] = arguments[index];
          }
          var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
          length -= holders.length;
          if (length < arity) {
            return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, undefined2, args, holders, undefined2, undefined2, arity - length);
          }
          var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
          return apply(fn, this, args);
        }
        return wrapper;
      }
      function createFind(findIndexFunc) {
        return function(collection, predicate, fromIndex) {
          var iterable = Object2(collection);
          if (!isArrayLike(collection)) {
            var iteratee2 = getIteratee(predicate, 3);
            collection = keys(collection);
            predicate = function(key) {
              return iteratee2(iterable[key], key, iterable);
            };
          }
          var index = findIndexFunc(collection, predicate, fromIndex);
          return index > -1 ? iterable[iteratee2 ? collection[index] : index] : undefined2;
        };
      }
      function createFlow(fromRight) {
        return flatRest(function(funcs) {
          var length = funcs.length, index = length, prereq = LodashWrapper.prototype.thru;
          if (fromRight) {
            funcs.reverse();
          }
          while (index--) {
            var func = funcs[index];
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            if (prereq && !wrapper && getFuncName(func) == "wrapper") {
              var wrapper = new LodashWrapper([], true);
            }
          }
          index = wrapper ? index : length;
          while (++index < length) {
            func = funcs[index];
            var funcName = getFuncName(func), data = funcName == "wrapper" ? getData(func) : undefined2;
            if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
              wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
            } else {
              wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
            }
          }
          return function() {
            var args = arguments, value = args[0];
            if (wrapper && args.length == 1 && isArray(value)) {
              return wrapper.plant(value).value();
            }
            var index2 = 0, result2 = length ? funcs[index2].apply(this, args) : value;
            while (++index2 < length) {
              result2 = funcs[index2].call(this, result2);
            }
            return result2;
          };
        });
      }
      function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
        var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined2 : createCtor(func);
        function wrapper() {
          var length = arguments.length, args = Array2(length), index = length;
          while (index--) {
            args[index] = arguments[index];
          }
          if (isCurried) {
            var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
          }
          if (partials) {
            args = composeArgs(args, partials, holders, isCurried);
          }
          if (partialsRight) {
            args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
          }
          length -= holdersCount;
          if (isCurried && length < arity) {
            var newHolders = replaceHolders(args, placeholder);
            return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, thisArg, args, newHolders, argPos, ary2, arity - length);
          }
          var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
          length = args.length;
          if (argPos) {
            args = reorder(args, argPos);
          } else if (isFlip && length > 1) {
            args.reverse();
          }
          if (isAry && ary2 < length) {
            args.length = ary2;
          }
          if (this && this !== root && this instanceof wrapper) {
            fn = Ctor || createCtor(fn);
          }
          return fn.apply(thisBinding, args);
        }
        return wrapper;
      }
      function createInverter(setter, toIteratee) {
        return function(object, iteratee2) {
          return baseInverter(object, setter, toIteratee(iteratee2), {});
        };
      }
      function createMathOperation(operator, defaultValue) {
        return function(value, other) {
          var result2;
          if (value === undefined2 && other === undefined2) {
            return defaultValue;
          }
          if (value !== undefined2) {
            result2 = value;
          }
          if (other !== undefined2) {
            if (result2 === undefined2) {
              return other;
            }
            if (typeof value == "string" || typeof other == "string") {
              value = baseToString(value);
              other = baseToString(other);
            } else {
              value = baseToNumber(value);
              other = baseToNumber(other);
            }
            result2 = operator(value, other);
          }
          return result2;
        };
      }
      function createOver(arrayFunc) {
        return flatRest(function(iteratees) {
          iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
          return baseRest(function(args) {
            var thisArg = this;
            return arrayFunc(iteratees, function(iteratee2) {
              return apply(iteratee2, thisArg, args);
            });
          });
        });
      }
      function createPadding(length, chars) {
        chars = chars === undefined2 ? " " : baseToString(chars);
        var charsLength = chars.length;
        if (charsLength < 2) {
          return charsLength ? baseRepeat(chars, length) : chars;
        }
        var result2 = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
        return hasUnicode(chars) ? castSlice(stringToArray(result2), 0, length).join("") : result2.slice(0, length);
      }
      function createPartial(func, bitmask, thisArg, partials) {
        var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
        function wrapper() {
          var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array2(leftLength + argsLength), fn = this && this !== root && this instanceof wrapper ? Ctor : func;
          while (++leftIndex < leftLength) {
            args[leftIndex] = partials[leftIndex];
          }
          while (argsLength--) {
            args[leftIndex++] = arguments[++argsIndex];
          }
          return apply(fn, isBind ? thisArg : this, args);
        }
        return wrapper;
      }
      function createRange(fromRight) {
        return function(start, end, step) {
          if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
            end = step = undefined2;
          }
          start = toFinite(start);
          if (end === undefined2) {
            end = start;
            start = 0;
          } else {
            end = toFinite(end);
          }
          step = step === undefined2 ? start < end ? 1 : -1 : toFinite(step);
          return baseRange(start, end, step, fromRight);
        };
      }
      function createRelationalOperation(operator) {
        return function(value, other) {
          if (!(typeof value == "string" && typeof other == "string")) {
            value = toNumber(value);
            other = toNumber(other);
          }
          return operator(value, other);
        };
      }
      function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
        var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined2, newHoldersRight = isCurry ? undefined2 : holders, newPartials = isCurry ? partials : undefined2, newPartialsRight = isCurry ? undefined2 : partials;
        bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
        bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
        if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
          bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
        }
        var newData = [
          func,
          bitmask,
          thisArg,
          newPartials,
          newHolders,
          newPartialsRight,
          newHoldersRight,
          argPos,
          ary2,
          arity
        ];
        var result2 = wrapFunc.apply(undefined2, newData);
        if (isLaziable(func)) {
          setData(result2, newData);
        }
        result2.placeholder = placeholder;
        return setWrapToString(result2, func, bitmask);
      }
      function createRound(methodName) {
        var func = Math2[methodName];
        return function(number, precision) {
          number = toNumber(number);
          precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
          if (precision && nativeIsFinite(number)) {
            var pair = (toString(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
            pair = (toString(value) + "e").split("e");
            return +(pair[0] + "e" + (+pair[1] - precision));
          }
          return func(number);
        };
      }
      var createSet = !(Set2 && 1 / setToArray(new Set2([, -0]))[1] == INFINITY) ? noop : function(values2) {
        return new Set2(values2);
      };
      function createToPairs(keysFunc) {
        return function(object) {
          var tag = getTag(object);
          if (tag == mapTag) {
            return mapToArray(object);
          }
          if (tag == setTag) {
            return setToPairs(object);
          }
          return baseToPairs(object, keysFunc(object));
        };
      }
      function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
        var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
        if (!isBindKey && typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        var length = partials ? partials.length : 0;
        if (!length) {
          bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
          partials = holders = undefined2;
        }
        ary2 = ary2 === undefined2 ? ary2 : nativeMax(toInteger(ary2), 0);
        arity = arity === undefined2 ? arity : toInteger(arity);
        length -= holders ? holders.length : 0;
        if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
          var partialsRight = partials, holdersRight = holders;
          partials = holders = undefined2;
        }
        var data = isBindKey ? undefined2 : getData(func);
        var newData = [
          func,
          bitmask,
          thisArg,
          partials,
          holders,
          partialsRight,
          holdersRight,
          argPos,
          ary2,
          arity
        ];
        if (data) {
          mergeData(newData, data);
        }
        func = newData[0];
        bitmask = newData[1];
        thisArg = newData[2];
        partials = newData[3];
        holders = newData[4];
        arity = newData[9] = newData[9] === undefined2 ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);
        if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
          bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
        }
        if (!bitmask || bitmask == WRAP_BIND_FLAG) {
          var result2 = createBind(func, bitmask, thisArg);
        } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
          result2 = createCurry(func, bitmask, arity);
        } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
          result2 = createPartial(func, bitmask, thisArg, partials);
        } else {
          result2 = createHybrid.apply(undefined2, newData);
        }
        var setter = data ? baseSetData : setData;
        return setWrapToString(setter(result2, newData), func, bitmask);
      }
      function customDefaultsAssignIn(objValue, srcValue, key, object) {
        if (objValue === undefined2 || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
          return srcValue;
        }
        return objValue;
      }
      function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
        if (isObject(objValue) && isObject(srcValue)) {
          stack.set(srcValue, objValue);
          baseMerge(objValue, srcValue, undefined2, customDefaultsMerge, stack);
          stack["delete"](srcValue);
        }
        return objValue;
      }
      function customOmitClone(value) {
        return isPlainObject(value) ? undefined2 : value;
      }
      function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
        if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
          return false;
        }
        var arrStacked = stack.get(array);
        var othStacked = stack.get(other);
        if (arrStacked && othStacked) {
          return arrStacked == other && othStacked == array;
        }
        var index = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache : undefined2;
        stack.set(array, other);
        stack.set(other, array);
        while (++index < arrLength) {
          var arrValue = array[index], othValue = other[index];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
          }
          if (compared !== undefined2) {
            if (compared) {
              continue;
            }
            result2 = false;
            break;
          }
          if (seen) {
            if (!arraySome(other, function(othValue2, othIndex) {
              if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                return seen.push(othIndex);
              }
            })) {
              result2 = false;
              break;
            }
          } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
            result2 = false;
            break;
          }
        }
        stack["delete"](array);
        stack["delete"](other);
        return result2;
      }
      function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
        switch (tag) {
          case dataViewTag:
            if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
              return false;
            }
            object = object.buffer;
            other = other.buffer;
          case arrayBufferTag:
            if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
              return false;
            }
            return true;
          case boolTag:
          case dateTag:
          case numberTag:
            return eq(+object, +other);
          case errorTag:
            return object.name == other.name && object.message == other.message;
          case regexpTag:
          case stringTag:
            return object == other + "";
          case mapTag:
            var convert = mapToArray;
          case setTag:
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
            convert || (convert = setToArray);
            if (object.size != other.size && !isPartial) {
              return false;
            }
            var stacked = stack.get(object);
            if (stacked) {
              return stacked == other;
            }
            bitmask |= COMPARE_UNORDERED_FLAG;
            stack.set(object, other);
            var result2 = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
            stack["delete"](object);
            return result2;
          case symbolTag:
            if (symbolValueOf) {
              return symbolValueOf.call(object) == symbolValueOf.call(other);
            }
        }
        return false;
      }
      function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
        if (objLength != othLength && !isPartial) {
          return false;
        }
        var index = objLength;
        while (index--) {
          var key = objProps[index];
          if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
            return false;
          }
        }
        var objStacked = stack.get(object);
        var othStacked = stack.get(other);
        if (objStacked && othStacked) {
          return objStacked == other && othStacked == object;
        }
        var result2 = true;
        stack.set(object, other);
        stack.set(other, object);
        var skipCtor = isPartial;
        while (++index < objLength) {
          key = objProps[index];
          var objValue = object[key], othValue = other[key];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
          }
          if (!(compared === undefined2 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
            result2 = false;
            break;
          }
          skipCtor || (skipCtor = key == "constructor");
        }
        if (result2 && !skipCtor) {
          var objCtor = object.constructor, othCtor = other.constructor;
          if (objCtor != othCtor && (("constructor" in object) && ("constructor" in other)) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
            result2 = false;
          }
        }
        stack["delete"](object);
        stack["delete"](other);
        return result2;
      }
      function flatRest(func) {
        return setToString(overRest(func, undefined2, flatten), func + "");
      }
      function getAllKeys(object) {
        return baseGetAllKeys(object, keys, getSymbols);
      }
      function getAllKeysIn(object) {
        return baseGetAllKeys(object, keysIn, getSymbolsIn);
      }
      var getData = !metaMap ? noop : function(func) {
        return metaMap.get(func);
      };
      function getFuncName(func) {
        var result2 = func.name + "", array = realNames[result2], length = hasOwnProperty.call(realNames, result2) ? array.length : 0;
        while (length--) {
          var data = array[length], otherFunc = data.func;
          if (otherFunc == null || otherFunc == func) {
            return data.name;
          }
        }
        return result2;
      }
      function getHolder(func) {
        var object = hasOwnProperty.call(lodash, "placeholder") ? lodash : func;
        return object.placeholder;
      }
      function getIteratee() {
        var result2 = lodash.iteratee || iteratee;
        result2 = result2 === iteratee ? baseIteratee : result2;
        return arguments.length ? result2(arguments[0], arguments[1]) : result2;
      }
      function getMapData(map2, key) {
        var data = map2.__data__;
        return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
      }
      function getMatchData(object) {
        var result2 = keys(object), length = result2.length;
        while (length--) {
          var key = result2[length], value = object[key];
          result2[length] = [key, value, isStrictComparable(value)];
        }
        return result2;
      }
      function getNative(object, key) {
        var value = getValue(object, key);
        return baseIsNative(value) ? value : undefined2;
      }
      function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
        try {
          value[symToStringTag] = undefined2;
          var unmasked = true;
        } catch (e) {}
        var result2 = nativeObjectToString.call(value);
        if (unmasked) {
          if (isOwn) {
            value[symToStringTag] = tag;
          } else {
            delete value[symToStringTag];
          }
        }
        return result2;
      }
      var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
        if (object == null) {
          return [];
        }
        object = Object2(object);
        return arrayFilter(nativeGetSymbols(object), function(symbol) {
          return propertyIsEnumerable.call(object, symbol);
        });
      };
      var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
        var result2 = [];
        while (object) {
          arrayPush(result2, getSymbols(object));
          object = getPrototype(object);
        }
        return result2;
      };
      var getTag = baseGetTag;
      if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2) != setTag || WeakMap2 && getTag(new WeakMap2) != weakMapTag) {
        getTag = function(value) {
          var result2 = baseGetTag(value), Ctor = result2 == objectTag ? value.constructor : undefined2, ctorString = Ctor ? toSource(Ctor) : "";
          if (ctorString) {
            switch (ctorString) {
              case dataViewCtorString:
                return dataViewTag;
              case mapCtorString:
                return mapTag;
              case promiseCtorString:
                return promiseTag;
              case setCtorString:
                return setTag;
              case weakMapCtorString:
                return weakMapTag;
            }
          }
          return result2;
        };
      }
      function getView(start, end, transforms) {
        var index = -1, length = transforms.length;
        while (++index < length) {
          var data = transforms[index], size2 = data.size;
          switch (data.type) {
            case "drop":
              start += size2;
              break;
            case "dropRight":
              end -= size2;
              break;
            case "take":
              end = nativeMin(end, start + size2);
              break;
            case "takeRight":
              start = nativeMax(start, end - size2);
              break;
          }
        }
        return { start, end };
      }
      function getWrapDetails(source) {
        var match = source.match(reWrapDetails);
        return match ? match[1].split(reSplitDetails) : [];
      }
      function hasPath(object, path, hasFunc) {
        path = castPath(path, object);
        var index = -1, length = path.length, result2 = false;
        while (++index < length) {
          var key = toKey(path[index]);
          if (!(result2 = object != null && hasFunc(object, key))) {
            break;
          }
          object = object[key];
        }
        if (result2 || ++index != length) {
          return result2;
        }
        length = object == null ? 0 : object.length;
        return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
      }
      function initCloneArray(array) {
        var length = array.length, result2 = new array.constructor(length);
        if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
          result2.index = array.index;
          result2.input = array.input;
        }
        return result2;
      }
      function initCloneObject(object) {
        return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
      }
      function initCloneByTag(object, tag, isDeep) {
        var Ctor = object.constructor;
        switch (tag) {
          case arrayBufferTag:
            return cloneArrayBuffer(object);
          case boolTag:
          case dateTag:
            return new Ctor(+object);
          case dataViewTag:
            return cloneDataView(object, isDeep);
          case float32Tag:
          case float64Tag:
          case int8Tag:
          case int16Tag:
          case int32Tag:
          case uint8Tag:
          case uint8ClampedTag:
          case uint16Tag:
          case uint32Tag:
            return cloneTypedArray(object, isDeep);
          case mapTag:
            return new Ctor;
          case numberTag:
          case stringTag:
            return new Ctor(object);
          case regexpTag:
            return cloneRegExp(object);
          case setTag:
            return new Ctor;
          case symbolTag:
            return cloneSymbol(object);
        }
      }
      function insertWrapDetails(source, details) {
        var length = details.length;
        if (!length) {
          return source;
        }
        var lastIndex = length - 1;
        details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
        details = details.join(length > 2 ? ", " : " ");
        return source.replace(reWrapComment, `{
/* [wrapped with ` + details + `] */
`);
      }
      function isFlattenable(value) {
        return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
      }
      function isIndex(value, length) {
        var type = typeof value;
        length = length == null ? MAX_SAFE_INTEGER : length;
        return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
      }
      function isIterateeCall(value, index, object) {
        if (!isObject(object)) {
          return false;
        }
        var type = typeof index;
        if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && (index in object)) {
          return eq(object[index], value);
        }
        return false;
      }
      function isKey(value, object) {
        if (isArray(value)) {
          return false;
        }
        var type = typeof value;
        if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
          return true;
        }
        return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object2(object);
      }
      function isKeyable(value) {
        var type = typeof value;
        return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
      }
      function isLaziable(func) {
        var funcName = getFuncName(func), other = lodash[funcName];
        if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
          return false;
        }
        if (func === other) {
          return true;
        }
        var data = getData(other);
        return !!data && func === data[0];
      }
      function isMasked(func) {
        return !!maskSrcKey && maskSrcKey in func;
      }
      var isMaskable = coreJsData ? isFunction : stubFalse;
      function isPrototype(value) {
        var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
        return value === proto;
      }
      function isStrictComparable(value) {
        return value === value && !isObject(value);
      }
      function matchesStrictComparable(key, srcValue) {
        return function(object) {
          if (object == null) {
            return false;
          }
          return object[key] === srcValue && (srcValue !== undefined2 || (key in Object2(object)));
        };
      }
      function memoizeCapped(func) {
        var result2 = memoize(func, function(key) {
          if (cache.size === MAX_MEMOIZE_SIZE) {
            cache.clear();
          }
          return key;
        });
        var cache = result2.cache;
        return result2;
      }
      function mergeData(data, source) {
        var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
        var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
        if (!(isCommon || isCombo)) {
          return data;
        }
        if (srcBitmask & WRAP_BIND_FLAG) {
          data[2] = source[2];
          newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
        }
        var value = source[3];
        if (value) {
          var partials = data[3];
          data[3] = partials ? composeArgs(partials, value, source[4]) : value;
          data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
        }
        value = source[5];
        if (value) {
          partials = data[5];
          data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
          data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
        }
        value = source[7];
        if (value) {
          data[7] = value;
        }
        if (srcBitmask & WRAP_ARY_FLAG) {
          data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
        }
        if (data[9] == null) {
          data[9] = source[9];
        }
        data[0] = source[0];
        data[1] = newBitmask;
        return data;
      }
      function nativeKeysIn(object) {
        var result2 = [];
        if (object != null) {
          for (var key in Object2(object)) {
            result2.push(key);
          }
        }
        return result2;
      }
      function objectToString(value) {
        return nativeObjectToString.call(value);
      }
      function overRest(func, start, transform2) {
        start = nativeMax(start === undefined2 ? func.length - 1 : start, 0);
        return function() {
          var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array2(length);
          while (++index < length) {
            array[index] = args[start + index];
          }
          index = -1;
          var otherArgs = Array2(start + 1);
          while (++index < start) {
            otherArgs[index] = args[index];
          }
          otherArgs[start] = transform2(array);
          return apply(func, this, otherArgs);
        };
      }
      function parent(object, path) {
        return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
      }
      function reorder(array, indexes) {
        var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array);
        while (length--) {
          var index = indexes[length];
          array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined2;
        }
        return array;
      }
      function safeGet(object, key) {
        if (key === "constructor" && typeof object[key] === "function") {
          return;
        }
        if (key == "__proto__") {
          return;
        }
        return object[key];
      }
      var setData = shortOut(baseSetData);
      var setTimeout2 = ctxSetTimeout || function(func, wait) {
        return root.setTimeout(func, wait);
      };
      var setToString = shortOut(baseSetToString);
      function setWrapToString(wrapper, reference, bitmask) {
        var source = reference + "";
        return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
      }
      function shortOut(func) {
        var count = 0, lastCalled = 0;
        return function() {
          var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
          lastCalled = stamp;
          if (remaining > 0) {
            if (++count >= HOT_COUNT) {
              return arguments[0];
            }
          } else {
            count = 0;
          }
          return func.apply(undefined2, arguments);
        };
      }
      function shuffleSelf(array, size2) {
        var index = -1, length = array.length, lastIndex = length - 1;
        size2 = size2 === undefined2 ? length : size2;
        while (++index < size2) {
          var rand = baseRandom(index, lastIndex), value = array[rand];
          array[rand] = array[index];
          array[index] = value;
        }
        array.length = size2;
        return array;
      }
      var stringToPath = memoizeCapped(function(string) {
        var result2 = [];
        if (string.charCodeAt(0) === 46) {
          result2.push("");
        }
        string.replace(rePropName, function(match, number, quote, subString) {
          result2.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
        });
        return result2;
      });
      function toKey(value) {
        if (typeof value == "string" || isSymbol(value)) {
          return value;
        }
        var result2 = value + "";
        return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
      }
      function toSource(func) {
        if (func != null) {
          try {
            return funcToString.call(func);
          } catch (e) {}
          try {
            return func + "";
          } catch (e) {}
        }
        return "";
      }
      function updateWrapDetails(details, bitmask) {
        arrayEach(wrapFlags, function(pair) {
          var value = "_." + pair[0];
          if (bitmask & pair[1] && !arrayIncludes(details, value)) {
            details.push(value);
          }
        });
        return details.sort();
      }
      function wrapperClone(wrapper) {
        if (wrapper instanceof LazyWrapper) {
          return wrapper.clone();
        }
        var result2 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
        result2.__actions__ = copyArray(wrapper.__actions__);
        result2.__index__ = wrapper.__index__;
        result2.__values__ = wrapper.__values__;
        return result2;
      }
      function chunk(array, size2, guard) {
        if (guard ? isIterateeCall(array, size2, guard) : size2 === undefined2) {
          size2 = 1;
        } else {
          size2 = nativeMax(toInteger(size2), 0);
        }
        var length = array == null ? 0 : array.length;
        if (!length || size2 < 1) {
          return [];
        }
        var index = 0, resIndex = 0, result2 = Array2(nativeCeil(length / size2));
        while (index < length) {
          result2[resIndex++] = baseSlice(array, index, index += size2);
        }
        return result2;
      }
      function compact(array) {
        var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
        while (++index < length) {
          var value = array[index];
          if (value) {
            result2[resIndex++] = value;
          }
        }
        return result2;
      }
      function concat() {
        var length = arguments.length;
        if (!length) {
          return [];
        }
        var args = Array2(length - 1), array = arguments[0], index = length;
        while (index--) {
          args[index - 1] = arguments[index];
        }
        return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
      }
      var difference = baseRest(function(array, values2) {
        return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true)) : [];
      });
      var differenceBy = baseRest(function(array, values2) {
        var iteratee2 = last(values2);
        if (isArrayLikeObject(iteratee2)) {
          iteratee2 = undefined2;
        }
        return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2)) : [];
      });
      var differenceWith = baseRest(function(array, values2) {
        var comparator = last(values2);
        if (isArrayLikeObject(comparator)) {
          comparator = undefined2;
        }
        return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), undefined2, comparator) : [];
      });
      function drop(array, n, guard) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        n = guard || n === undefined2 ? 1 : toInteger(n);
        return baseSlice(array, n < 0 ? 0 : n, length);
      }
      function dropRight(array, n, guard) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        n = guard || n === undefined2 ? 1 : toInteger(n);
        n = length - n;
        return baseSlice(array, 0, n < 0 ? 0 : n);
      }
      function dropRightWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
      }
      function dropWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
      }
      function fill(array, value, start, end) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        if (start && typeof start != "number" && isIterateeCall(array, value, start)) {
          start = 0;
          end = length;
        }
        return baseFill(array, value, start, end);
      }
      function findIndex(array, predicate, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = fromIndex == null ? 0 : toInteger(fromIndex);
        if (index < 0) {
          index = nativeMax(length + index, 0);
        }
        return baseFindIndex(array, getIteratee(predicate, 3), index);
      }
      function findLastIndex(array, predicate, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = length - 1;
        if (fromIndex !== undefined2) {
          index = toInteger(fromIndex);
          index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
        }
        return baseFindIndex(array, getIteratee(predicate, 3), index, true);
      }
      function flatten(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseFlatten(array, 1) : [];
      }
      function flattenDeep(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseFlatten(array, INFINITY) : [];
      }
      function flattenDepth(array, depth) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        depth = depth === undefined2 ? 1 : toInteger(depth);
        return baseFlatten(array, depth);
      }
      function fromPairs(pairs) {
        var index = -1, length = pairs == null ? 0 : pairs.length, result2 = {};
        while (++index < length) {
          var pair = pairs[index];
          result2[pair[0]] = pair[1];
        }
        return result2;
      }
      function head(array) {
        return array && array.length ? array[0] : undefined2;
      }
      function indexOf(array, value, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = fromIndex == null ? 0 : toInteger(fromIndex);
        if (index < 0) {
          index = nativeMax(length + index, 0);
        }
        return baseIndexOf(array, value, index);
      }
      function initial(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseSlice(array, 0, -1) : [];
      }
      var intersection = baseRest(function(arrays) {
        var mapped = arrayMap(arrays, castArrayLikeObject);
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
      });
      var intersectionBy = baseRest(function(arrays) {
        var iteratee2 = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
        if (iteratee2 === last(mapped)) {
          iteratee2 = undefined2;
        } else {
          mapped.pop();
        }
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
      });
      var intersectionWith = baseRest(function(arrays) {
        var comparator = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
        comparator = typeof comparator == "function" ? comparator : undefined2;
        if (comparator) {
          mapped.pop();
        }
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined2, comparator) : [];
      });
      function join(array, separator) {
        return array == null ? "" : nativeJoin.call(array, separator);
      }
      function last(array) {
        var length = array == null ? 0 : array.length;
        return length ? array[length - 1] : undefined2;
      }
      function lastIndexOf(array, value, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = length;
        if (fromIndex !== undefined2) {
          index = toInteger(fromIndex);
          index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
        }
        return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
      }
      function nth(array, n) {
        return array && array.length ? baseNth(array, toInteger(n)) : undefined2;
      }
      var pull = baseRest(pullAll);
      function pullAll(array, values2) {
        return array && array.length && values2 && values2.length ? basePullAll(array, values2) : array;
      }
      function pullAllBy(array, values2, iteratee2) {
        return array && array.length && values2 && values2.length ? basePullAll(array, values2, getIteratee(iteratee2, 2)) : array;
      }
      function pullAllWith(array, values2, comparator) {
        return array && array.length && values2 && values2.length ? basePullAll(array, values2, undefined2, comparator) : array;
      }
      var pullAt = flatRest(function(array, indexes) {
        var length = array == null ? 0 : array.length, result2 = baseAt(array, indexes);
        basePullAt(array, arrayMap(indexes, function(index) {
          return isIndex(index, length) ? +index : index;
        }).sort(compareAscending));
        return result2;
      });
      function remove(array, predicate) {
        var result2 = [];
        if (!(array && array.length)) {
          return result2;
        }
        var index = -1, indexes = [], length = array.length;
        predicate = getIteratee(predicate, 3);
        while (++index < length) {
          var value = array[index];
          if (predicate(value, index, array)) {
            result2.push(value);
            indexes.push(index);
          }
        }
        basePullAt(array, indexes);
        return result2;
      }
      function reverse(array) {
        return array == null ? array : nativeReverse.call(array);
      }
      function slice(array, start, end) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        if (end && typeof end != "number" && isIterateeCall(array, start, end)) {
          start = 0;
          end = length;
        } else {
          start = start == null ? 0 : toInteger(start);
          end = end === undefined2 ? length : toInteger(end);
        }
        return baseSlice(array, start, end);
      }
      function sortedIndex(array, value) {
        return baseSortedIndex(array, value);
      }
      function sortedIndexBy(array, value, iteratee2) {
        return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2));
      }
      function sortedIndexOf(array, value) {
        var length = array == null ? 0 : array.length;
        if (length) {
          var index = baseSortedIndex(array, value);
          if (index < length && eq(array[index], value)) {
            return index;
          }
        }
        return -1;
      }
      function sortedLastIndex(array, value) {
        return baseSortedIndex(array, value, true);
      }
      function sortedLastIndexBy(array, value, iteratee2) {
        return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2), true);
      }
      function sortedLastIndexOf(array, value) {
        var length = array == null ? 0 : array.length;
        if (length) {
          var index = baseSortedIndex(array, value, true) - 1;
          if (eq(array[index], value)) {
            return index;
          }
        }
        return -1;
      }
      function sortedUniq(array) {
        return array && array.length ? baseSortedUniq(array) : [];
      }
      function sortedUniqBy(array, iteratee2) {
        return array && array.length ? baseSortedUniq(array, getIteratee(iteratee2, 2)) : [];
      }
      function tail(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseSlice(array, 1, length) : [];
      }
      function take(array, n, guard) {
        if (!(array && array.length)) {
          return [];
        }
        n = guard || n === undefined2 ? 1 : toInteger(n);
        return baseSlice(array, 0, n < 0 ? 0 : n);
      }
      function takeRight(array, n, guard) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        n = guard || n === undefined2 ? 1 : toInteger(n);
        n = length - n;
        return baseSlice(array, n < 0 ? 0 : n, length);
      }
      function takeRightWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
      }
      function takeWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
      }
      var union = baseRest(function(arrays) {
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
      });
      var unionBy = baseRest(function(arrays) {
        var iteratee2 = last(arrays);
        if (isArrayLikeObject(iteratee2)) {
          iteratee2 = undefined2;
        }
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2));
      });
      var unionWith = baseRest(function(arrays) {
        var comparator = last(arrays);
        comparator = typeof comparator == "function" ? comparator : undefined2;
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined2, comparator);
      });
      function uniq(array) {
        return array && array.length ? baseUniq(array) : [];
      }
      function uniqBy(array, iteratee2) {
        return array && array.length ? baseUniq(array, getIteratee(iteratee2, 2)) : [];
      }
      function uniqWith(array, comparator) {
        comparator = typeof comparator == "function" ? comparator : undefined2;
        return array && array.length ? baseUniq(array, undefined2, comparator) : [];
      }
      function unzip(array) {
        if (!(array && array.length)) {
          return [];
        }
        var length = 0;
        array = arrayFilter(array, function(group) {
          if (isArrayLikeObject(group)) {
            length = nativeMax(group.length, length);
            return true;
          }
        });
        return baseTimes(length, function(index) {
          return arrayMap(array, baseProperty(index));
        });
      }
      function unzipWith(array, iteratee2) {
        if (!(array && array.length)) {
          return [];
        }
        var result2 = unzip(array);
        if (iteratee2 == null) {
          return result2;
        }
        return arrayMap(result2, function(group) {
          return apply(iteratee2, undefined2, group);
        });
      }
      var without = baseRest(function(array, values2) {
        return isArrayLikeObject(array) ? baseDifference(array, values2) : [];
      });
      var xor = baseRest(function(arrays) {
        return baseXor(arrayFilter(arrays, isArrayLikeObject));
      });
      var xorBy = baseRest(function(arrays) {
        var iteratee2 = last(arrays);
        if (isArrayLikeObject(iteratee2)) {
          iteratee2 = undefined2;
        }
        return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee2, 2));
      });
      var xorWith = baseRest(function(arrays) {
        var comparator = last(arrays);
        comparator = typeof comparator == "function" ? comparator : undefined2;
        return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined2, comparator);
      });
      var zip = baseRest(unzip);
      function zipObject(props, values2) {
        return baseZipObject(props || [], values2 || [], assignValue);
      }
      function zipObjectDeep(props, values2) {
        return baseZipObject(props || [], values2 || [], baseSet);
      }
      var zipWith = baseRest(function(arrays) {
        var length = arrays.length, iteratee2 = length > 1 ? arrays[length - 1] : undefined2;
        iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : undefined2;
        return unzipWith(arrays, iteratee2);
      });
      function chain(value) {
        var result2 = lodash(value);
        result2.__chain__ = true;
        return result2;
      }
      function tap(value, interceptor) {
        interceptor(value);
        return value;
      }
      function thru(value, interceptor) {
        return interceptor(value);
      }
      var wrapperAt = flatRest(function(paths) {
        var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function(object) {
          return baseAt(object, paths);
        };
        if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
          return this.thru(interceptor);
        }
        value = value.slice(start, +start + (length ? 1 : 0));
        value.__actions__.push({
          func: thru,
          args: [interceptor],
          thisArg: undefined2
        });
        return new LodashWrapper(value, this.__chain__).thru(function(array) {
          if (length && !array.length) {
            array.push(undefined2);
          }
          return array;
        });
      });
      function wrapperChain() {
        return chain(this);
      }
      function wrapperCommit() {
        return new LodashWrapper(this.value(), this.__chain__);
      }
      function wrapperNext() {
        if (this.__values__ === undefined2) {
          this.__values__ = toArray(this.value());
        }
        var done = this.__index__ >= this.__values__.length, value = done ? undefined2 : this.__values__[this.__index__++];
        return { done, value };
      }
      function wrapperToIterator() {
        return this;
      }
      function wrapperPlant(value) {
        var result2, parent2 = this;
        while (parent2 instanceof baseLodash) {
          var clone2 = wrapperClone(parent2);
          clone2.__index__ = 0;
          clone2.__values__ = undefined2;
          if (result2) {
            previous.__wrapped__ = clone2;
          } else {
            result2 = clone2;
          }
          var previous = clone2;
          parent2 = parent2.__wrapped__;
        }
        previous.__wrapped__ = value;
        return result2;
      }
      function wrapperReverse() {
        var value = this.__wrapped__;
        if (value instanceof LazyWrapper) {
          var wrapped = value;
          if (this.__actions__.length) {
            wrapped = new LazyWrapper(this);
          }
          wrapped = wrapped.reverse();
          wrapped.__actions__.push({
            func: thru,
            args: [reverse],
            thisArg: undefined2
          });
          return new LodashWrapper(wrapped, this.__chain__);
        }
        return this.thru(reverse);
      }
      function wrapperValue() {
        return baseWrapperValue(this.__wrapped__, this.__actions__);
      }
      var countBy = createAggregator(function(result2, value, key) {
        if (hasOwnProperty.call(result2, key)) {
          ++result2[key];
        } else {
          baseAssignValue(result2, key, 1);
        }
      });
      function every(collection, predicate, guard) {
        var func = isArray(collection) ? arrayEvery : baseEvery;
        if (guard && isIterateeCall(collection, predicate, guard)) {
          predicate = undefined2;
        }
        return func(collection, getIteratee(predicate, 3));
      }
      function filter(collection, predicate) {
        var func = isArray(collection) ? arrayFilter : baseFilter;
        return func(collection, getIteratee(predicate, 3));
      }
      var find = createFind(findIndex);
      var findLast = createFind(findLastIndex);
      function flatMap(collection, iteratee2) {
        return baseFlatten(map(collection, iteratee2), 1);
      }
      function flatMapDeep(collection, iteratee2) {
        return baseFlatten(map(collection, iteratee2), INFINITY);
      }
      function flatMapDepth(collection, iteratee2, depth) {
        depth = depth === undefined2 ? 1 : toInteger(depth);
        return baseFlatten(map(collection, iteratee2), depth);
      }
      function forEach(collection, iteratee2) {
        var func = isArray(collection) ? arrayEach : baseEach;
        return func(collection, getIteratee(iteratee2, 3));
      }
      function forEachRight(collection, iteratee2) {
        var func = isArray(collection) ? arrayEachRight : baseEachRight;
        return func(collection, getIteratee(iteratee2, 3));
      }
      var groupBy = createAggregator(function(result2, value, key) {
        if (hasOwnProperty.call(result2, key)) {
          result2[key].push(value);
        } else {
          baseAssignValue(result2, key, [value]);
        }
      });
      function includes(collection, value, fromIndex, guard) {
        collection = isArrayLike(collection) ? collection : values(collection);
        fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
        var length = collection.length;
        if (fromIndex < 0) {
          fromIndex = nativeMax(length + fromIndex, 0);
        }
        return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
      }
      var invokeMap = baseRest(function(collection, path, args) {
        var index = -1, isFunc = typeof path == "function", result2 = isArrayLike(collection) ? Array2(collection.length) : [];
        baseEach(collection, function(value) {
          result2[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
        });
        return result2;
      });
      var keyBy = createAggregator(function(result2, value, key) {
        baseAssignValue(result2, key, value);
      });
      function map(collection, iteratee2) {
        var func = isArray(collection) ? arrayMap : baseMap;
        return func(collection, getIteratee(iteratee2, 3));
      }
      function orderBy(collection, iteratees, orders, guard) {
        if (collection == null) {
          return [];
        }
        if (!isArray(iteratees)) {
          iteratees = iteratees == null ? [] : [iteratees];
        }
        orders = guard ? undefined2 : orders;
        if (!isArray(orders)) {
          orders = orders == null ? [] : [orders];
        }
        return baseOrderBy(collection, iteratees, orders);
      }
      var partition = createAggregator(function(result2, value, key) {
        result2[key ? 0 : 1].push(value);
      }, function() {
        return [[], []];
      });
      function reduce(collection, iteratee2, accumulator) {
        var func = isArray(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
        return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
      }
      function reduceRight(collection, iteratee2, accumulator) {
        var func = isArray(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
        return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
      }
      function reject(collection, predicate) {
        var func = isArray(collection) ? arrayFilter : baseFilter;
        return func(collection, negate(getIteratee(predicate, 3)));
      }
      function sample(collection) {
        var func = isArray(collection) ? arraySample : baseSample;
        return func(collection);
      }
      function sampleSize(collection, n, guard) {
        if (guard ? isIterateeCall(collection, n, guard) : n === undefined2) {
          n = 1;
        } else {
          n = toInteger(n);
        }
        var func = isArray(collection) ? arraySampleSize : baseSampleSize;
        return func(collection, n);
      }
      function shuffle(collection) {
        var func = isArray(collection) ? arrayShuffle : baseShuffle;
        return func(collection);
      }
      function size(collection) {
        if (collection == null) {
          return 0;
        }
        if (isArrayLike(collection)) {
          return isString(collection) ? stringSize(collection) : collection.length;
        }
        var tag = getTag(collection);
        if (tag == mapTag || tag == setTag) {
          return collection.size;
        }
        return baseKeys(collection).length;
      }
      function some(collection, predicate, guard) {
        var func = isArray(collection) ? arraySome : baseSome;
        if (guard && isIterateeCall(collection, predicate, guard)) {
          predicate = undefined2;
        }
        return func(collection, getIteratee(predicate, 3));
      }
      var sortBy = baseRest(function(collection, iteratees) {
        if (collection == null) {
          return [];
        }
        var length = iteratees.length;
        if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
          iteratees = [];
        } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
          iteratees = [iteratees[0]];
        }
        return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
      });
      var now = ctxNow || function() {
        return root.Date.now();
      };
      function after(n, func) {
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        n = toInteger(n);
        return function() {
          if (--n < 1) {
            return func.apply(this, arguments);
          }
        };
      }
      function ary(func, n, guard) {
        n = guard ? undefined2 : n;
        n = func && n == null ? func.length : n;
        return createWrap(func, WRAP_ARY_FLAG, undefined2, undefined2, undefined2, undefined2, n);
      }
      function before(n, func) {
        var result2;
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        n = toInteger(n);
        return function() {
          if (--n > 0) {
            result2 = func.apply(this, arguments);
          }
          if (n <= 1) {
            func = undefined2;
          }
          return result2;
        };
      }
      var bind = baseRest(function(func, thisArg, partials) {
        var bitmask = WRAP_BIND_FLAG;
        if (partials.length) {
          var holders = replaceHolders(partials, getHolder(bind));
          bitmask |= WRAP_PARTIAL_FLAG;
        }
        return createWrap(func, bitmask, thisArg, partials, holders);
      });
      var bindKey = baseRest(function(object, key, partials) {
        var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
        if (partials.length) {
          var holders = replaceHolders(partials, getHolder(bindKey));
          bitmask |= WRAP_PARTIAL_FLAG;
        }
        return createWrap(key, bitmask, object, partials, holders);
      });
      function curry(func, arity, guard) {
        arity = guard ? undefined2 : arity;
        var result2 = createWrap(func, WRAP_CURRY_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
        result2.placeholder = curry.placeholder;
        return result2;
      }
      function curryRight(func, arity, guard) {
        arity = guard ? undefined2 : arity;
        var result2 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
        result2.placeholder = curryRight.placeholder;
        return result2;
      }
      function debounce(func, wait, options) {
        var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        wait = toNumber(wait) || 0;
        if (isObject(options)) {
          leading = !!options.leading;
          maxing = "maxWait" in options;
          maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        function invokeFunc(time) {
          var args = lastArgs, thisArg = lastThis;
          lastArgs = lastThis = undefined2;
          lastInvokeTime = time;
          result2 = func.apply(thisArg, args);
          return result2;
        }
        function leadingEdge(time) {
          lastInvokeTime = time;
          timerId = setTimeout2(timerExpired, wait);
          return leading ? invokeFunc(time) : result2;
        }
        function remainingWait(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
          return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
        }
        function shouldInvoke(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
          return lastCallTime === undefined2 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
        }
        function timerExpired() {
          var time = now();
          if (shouldInvoke(time)) {
            return trailingEdge(time);
          }
          timerId = setTimeout2(timerExpired, remainingWait(time));
        }
        function trailingEdge(time) {
          timerId = undefined2;
          if (trailing && lastArgs) {
            return invokeFunc(time);
          }
          lastArgs = lastThis = undefined2;
          return result2;
        }
        function cancel() {
          if (timerId !== undefined2) {
            clearTimeout2(timerId);
          }
          lastInvokeTime = 0;
          lastArgs = lastCallTime = lastThis = timerId = undefined2;
        }
        function flush() {
          return timerId === undefined2 ? result2 : trailingEdge(now());
        }
        function debounced() {
          var time = now(), isInvoking = shouldInvoke(time);
          lastArgs = arguments;
          lastThis = this;
          lastCallTime = time;
          if (isInvoking) {
            if (timerId === undefined2) {
              return leadingEdge(lastCallTime);
            }
            if (maxing) {
              clearTimeout2(timerId);
              timerId = setTimeout2(timerExpired, wait);
              return invokeFunc(lastCallTime);
            }
          }
          if (timerId === undefined2) {
            timerId = setTimeout2(timerExpired, wait);
          }
          return result2;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
      }
      var defer = baseRest(function(func, args) {
        return baseDelay(func, 1, args);
      });
      var delay = baseRest(function(func, wait, args) {
        return baseDelay(func, toNumber(wait) || 0, args);
      });
      function flip(func) {
        return createWrap(func, WRAP_FLIP_FLAG);
      }
      function memoize(func, resolver) {
        if (typeof func != "function" || resolver != null && typeof resolver != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        var memoized = function() {
          var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
          if (cache.has(key)) {
            return cache.get(key);
          }
          var result2 = func.apply(this, args);
          memoized.cache = cache.set(key, result2) || cache;
          return result2;
        };
        memoized.cache = new (memoize.Cache || MapCache);
        return memoized;
      }
      memoize.Cache = MapCache;
      function negate(predicate) {
        if (typeof predicate != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        return function() {
          var args = arguments;
          switch (args.length) {
            case 0:
              return !predicate.call(this);
            case 1:
              return !predicate.call(this, args[0]);
            case 2:
              return !predicate.call(this, args[0], args[1]);
            case 3:
              return !predicate.call(this, args[0], args[1], args[2]);
          }
          return !predicate.apply(this, args);
        };
      }
      function once(func) {
        return before(2, func);
      }
      var overArgs = castRest(function(func, transforms) {
        transforms = transforms.length == 1 && isArray(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
        var funcsLength = transforms.length;
        return baseRest(function(args) {
          var index = -1, length = nativeMin(args.length, funcsLength);
          while (++index < length) {
            args[index] = transforms[index].call(this, args[index]);
          }
          return apply(func, this, args);
        });
      });
      var partial = baseRest(function(func, partials) {
        var holders = replaceHolders(partials, getHolder(partial));
        return createWrap(func, WRAP_PARTIAL_FLAG, undefined2, partials, holders);
      });
      var partialRight = baseRest(function(func, partials) {
        var holders = replaceHolders(partials, getHolder(partialRight));
        return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined2, partials, holders);
      });
      var rearg = flatRest(function(func, indexes) {
        return createWrap(func, WRAP_REARG_FLAG, undefined2, undefined2, undefined2, indexes);
      });
      function rest(func, start) {
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        start = start === undefined2 ? start : toInteger(start);
        return baseRest(func, start);
      }
      function spread(func, start) {
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        start = start == null ? 0 : nativeMax(toInteger(start), 0);
        return baseRest(function(args) {
          var array = args[start], otherArgs = castSlice(args, 0, start);
          if (array) {
            arrayPush(otherArgs, array);
          }
          return apply(func, this, otherArgs);
        });
      }
      function throttle(func, wait, options) {
        var leading = true, trailing = true;
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        if (isObject(options)) {
          leading = "leading" in options ? !!options.leading : leading;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        return debounce(func, wait, {
          leading,
          maxWait: wait,
          trailing
        });
      }
      function unary(func) {
        return ary(func, 1);
      }
      function wrap(value, wrapper) {
        return partial(castFunction(wrapper), value);
      }
      function castArray() {
        if (!arguments.length) {
          return [];
        }
        var value = arguments[0];
        return isArray(value) ? value : [value];
      }
      function clone(value) {
        return baseClone(value, CLONE_SYMBOLS_FLAG);
      }
      function cloneWith(value, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined2;
        return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
      }
      function cloneDeep(value) {
        return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
      }
      function cloneDeepWith(value, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined2;
        return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
      }
      function conformsTo(object, source) {
        return source == null || baseConformsTo(object, source, keys(source));
      }
      function eq(value, other) {
        return value === other || value !== value && other !== other;
      }
      var gt = createRelationalOperation(baseGt);
      var gte = createRelationalOperation(function(value, other) {
        return value >= other;
      });
      var isArguments = baseIsArguments(function() {
        return arguments;
      }()) ? baseIsArguments : function(value) {
        return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
      };
      var isArray = Array2.isArray;
      var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
      function isArrayLike(value) {
        return value != null && isLength(value.length) && !isFunction(value);
      }
      function isArrayLikeObject(value) {
        return isObjectLike(value) && isArrayLike(value);
      }
      function isBoolean(value) {
        return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
      }
      var isBuffer = nativeIsBuffer || stubFalse;
      var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
      function isElement(value) {
        return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
      }
      function isEmpty(value) {
        if (value == null) {
          return true;
        }
        if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
          return !value.length;
        }
        var tag = getTag(value);
        if (tag == mapTag || tag == setTag) {
          return !value.size;
        }
        if (isPrototype(value)) {
          return !baseKeys(value).length;
        }
        for (var key in value) {
          if (hasOwnProperty.call(value, key)) {
            return false;
          }
        }
        return true;
      }
      function isEqual(value, other) {
        return baseIsEqual(value, other);
      }
      function isEqualWith(value, other, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined2;
        var result2 = customizer ? customizer(value, other) : undefined2;
        return result2 === undefined2 ? baseIsEqual(value, other, undefined2, customizer) : !!result2;
      }
      function isError(value) {
        if (!isObjectLike(value)) {
          return false;
        }
        var tag = baseGetTag(value);
        return tag == errorTag || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject(value);
      }
      function isFinite(value) {
        return typeof value == "number" && nativeIsFinite(value);
      }
      function isFunction(value) {
        if (!isObject(value)) {
          return false;
        }
        var tag = baseGetTag(value);
        return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
      }
      function isInteger(value) {
        return typeof value == "number" && value == toInteger(value);
      }
      function isLength(value) {
        return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
      }
      function isObject(value) {
        var type = typeof value;
        return value != null && (type == "object" || type == "function");
      }
      function isObjectLike(value) {
        return value != null && typeof value == "object";
      }
      var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
      function isMatch(object, source) {
        return object === source || baseIsMatch(object, source, getMatchData(source));
      }
      function isMatchWith(object, source, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined2;
        return baseIsMatch(object, source, getMatchData(source), customizer);
      }
      function isNaN2(value) {
        return isNumber(value) && value != +value;
      }
      function isNative(value) {
        if (isMaskable(value)) {
          throw new Error2(CORE_ERROR_TEXT);
        }
        return baseIsNative(value);
      }
      function isNull(value) {
        return value === null;
      }
      function isNil(value) {
        return value == null;
      }
      function isNumber(value) {
        return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
      }
      function isPlainObject(value) {
        if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
          return false;
        }
        var proto = getPrototype(value);
        if (proto === null) {
          return true;
        }
        var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
        return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
      }
      var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
      function isSafeInteger(value) {
        return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
      }
      var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
      function isString(value) {
        return typeof value == "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
      }
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
      }
      var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
      function isUndefined(value) {
        return value === undefined2;
      }
      function isWeakMap(value) {
        return isObjectLike(value) && getTag(value) == weakMapTag;
      }
      function isWeakSet(value) {
        return isObjectLike(value) && baseGetTag(value) == weakSetTag;
      }
      var lt = createRelationalOperation(baseLt);
      var lte = createRelationalOperation(function(value, other) {
        return value <= other;
      });
      function toArray(value) {
        if (!value) {
          return [];
        }
        if (isArrayLike(value)) {
          return isString(value) ? stringToArray(value) : copyArray(value);
        }
        if (symIterator && value[symIterator]) {
          return iteratorToArray(value[symIterator]());
        }
        var tag = getTag(value), func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
        return func(value);
      }
      function toFinite(value) {
        if (!value) {
          return value === 0 ? value : 0;
        }
        value = toNumber(value);
        if (value === INFINITY || value === -INFINITY) {
          var sign = value < 0 ? -1 : 1;
          return sign * MAX_INTEGER;
        }
        return value === value ? value : 0;
      }
      function toInteger(value) {
        var result2 = toFinite(value), remainder = result2 % 1;
        return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
      }
      function toLength(value) {
        return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
      }
      function toNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol(value)) {
          return NAN;
        }
        if (isObject(value)) {
          var other = typeof value.valueOf == "function" ? value.valueOf() : value;
          value = isObject(other) ? other + "" : other;
        }
        if (typeof value != "string") {
          return value === 0 ? value : +value;
        }
        value = baseTrim(value);
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
      }
      function toPlainObject(value) {
        return copyObject(value, keysIn(value));
      }
      function toSafeInteger(value) {
        return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
      }
      function toString(value) {
        return value == null ? "" : baseToString(value);
      }
      var assign = createAssigner(function(object, source) {
        if (isPrototype(source) || isArrayLike(source)) {
          copyObject(source, keys(source), object);
          return;
        }
        for (var key in source) {
          if (hasOwnProperty.call(source, key)) {
            assignValue(object, key, source[key]);
          }
        }
      });
      var assignIn = createAssigner(function(object, source) {
        copyObject(source, keysIn(source), object);
      });
      var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
        copyObject(source, keysIn(source), object, customizer);
      });
      var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
        copyObject(source, keys(source), object, customizer);
      });
      var at = flatRest(baseAt);
      function create(prototype, properties) {
        var result2 = baseCreate(prototype);
        return properties == null ? result2 : baseAssign(result2, properties);
      }
      var defaults = baseRest(function(object, sources) {
        object = Object2(object);
        var index = -1;
        var length = sources.length;
        var guard = length > 2 ? sources[2] : undefined2;
        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          length = 1;
        }
        while (++index < length) {
          var source = sources[index];
          var props = keysIn(source);
          var propsIndex = -1;
          var propsLength = props.length;
          while (++propsIndex < propsLength) {
            var key = props[propsIndex];
            var value = object[key];
            if (value === undefined2 || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) {
              object[key] = source[key];
            }
          }
        }
        return object;
      });
      var defaultsDeep = baseRest(function(args) {
        args.push(undefined2, customDefaultsMerge);
        return apply(mergeWith, undefined2, args);
      });
      function findKey(object, predicate) {
        return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
      }
      function findLastKey(object, predicate) {
        return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
      }
      function forIn(object, iteratee2) {
        return object == null ? object : baseFor(object, getIteratee(iteratee2, 3), keysIn);
      }
      function forInRight(object, iteratee2) {
        return object == null ? object : baseForRight(object, getIteratee(iteratee2, 3), keysIn);
      }
      function forOwn(object, iteratee2) {
        return object && baseForOwn(object, getIteratee(iteratee2, 3));
      }
      function forOwnRight(object, iteratee2) {
        return object && baseForOwnRight(object, getIteratee(iteratee2, 3));
      }
      function functions(object) {
        return object == null ? [] : baseFunctions(object, keys(object));
      }
      function functionsIn(object) {
        return object == null ? [] : baseFunctions(object, keysIn(object));
      }
      function get(object, path, defaultValue) {
        var result2 = object == null ? undefined2 : baseGet(object, path);
        return result2 === undefined2 ? defaultValue : result2;
      }
      function has(object, path) {
        return object != null && hasPath(object, path, baseHas);
      }
      function hasIn(object, path) {
        return object != null && hasPath(object, path, baseHasIn);
      }
      var invert = createInverter(function(result2, value, key) {
        if (value != null && typeof value.toString != "function") {
          value = nativeObjectToString.call(value);
        }
        result2[value] = key;
      }, constant(identity));
      var invertBy = createInverter(function(result2, value, key) {
        if (value != null && typeof value.toString != "function") {
          value = nativeObjectToString.call(value);
        }
        if (hasOwnProperty.call(result2, value)) {
          result2[value].push(key);
        } else {
          result2[value] = [key];
        }
      }, getIteratee);
      var invoke = baseRest(baseInvoke);
      function keys(object) {
        return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
      }
      function keysIn(object) {
        return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
      }
      function mapKeys(object, iteratee2) {
        var result2 = {};
        iteratee2 = getIteratee(iteratee2, 3);
        baseForOwn(object, function(value, key, object2) {
          baseAssignValue(result2, iteratee2(value, key, object2), value);
        });
        return result2;
      }
      function mapValues(object, iteratee2) {
        var result2 = {};
        iteratee2 = getIteratee(iteratee2, 3);
        baseForOwn(object, function(value, key, object2) {
          baseAssignValue(result2, key, iteratee2(value, key, object2));
        });
        return result2;
      }
      var merge = createAssigner(function(object, source, srcIndex) {
        baseMerge(object, source, srcIndex);
      });
      var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
        baseMerge(object, source, srcIndex, customizer);
      });
      var omit = flatRest(function(object, paths) {
        var result2 = {};
        if (object == null) {
          return result2;
        }
        var isDeep = false;
        paths = arrayMap(paths, function(path) {
          path = castPath(path, object);
          isDeep || (isDeep = path.length > 1);
          return path;
        });
        copyObject(object, getAllKeysIn(object), result2);
        if (isDeep) {
          result2 = baseClone(result2, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
        }
        var length = paths.length;
        while (length--) {
          baseUnset(result2, paths[length]);
        }
        return result2;
      });
      function omitBy(object, predicate) {
        return pickBy(object, negate(getIteratee(predicate)));
      }
      var pick = flatRest(function(object, paths) {
        return object == null ? {} : basePick(object, paths);
      });
      function pickBy(object, predicate) {
        if (object == null) {
          return {};
        }
        var props = arrayMap(getAllKeysIn(object), function(prop) {
          return [prop];
        });
        predicate = getIteratee(predicate);
        return basePickBy(object, props, function(value, path) {
          return predicate(value, path[0]);
        });
      }
      function result(object, path, defaultValue) {
        path = castPath(path, object);
        var index = -1, length = path.length;
        if (!length) {
          length = 1;
          object = undefined2;
        }
        while (++index < length) {
          var value = object == null ? undefined2 : object[toKey(path[index])];
          if (value === undefined2) {
            index = length;
            value = defaultValue;
          }
          object = isFunction(value) ? value.call(object) : value;
        }
        return object;
      }
      function set(object, path, value) {
        return object == null ? object : baseSet(object, path, value);
      }
      function setWith(object, path, value, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined2;
        return object == null ? object : baseSet(object, path, value, customizer);
      }
      var toPairs = createToPairs(keys);
      var toPairsIn = createToPairs(keysIn);
      function transform(object, iteratee2, accumulator) {
        var isArr = isArray(object), isArrLike = isArr || isBuffer(object) || isTypedArray(object);
        iteratee2 = getIteratee(iteratee2, 4);
        if (accumulator == null) {
          var Ctor = object && object.constructor;
          if (isArrLike) {
            accumulator = isArr ? new Ctor : [];
          } else if (isObject(object)) {
            accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
          } else {
            accumulator = {};
          }
        }
        (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object2) {
          return iteratee2(accumulator, value, index, object2);
        });
        return accumulator;
      }
      function unset(object, path) {
        return object == null ? true : baseUnset(object, path);
      }
      function update(object, path, updater) {
        return object == null ? object : baseUpdate(object, path, castFunction(updater));
      }
      function updateWith(object, path, updater, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined2;
        return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
      }
      function values(object) {
        return object == null ? [] : baseValues(object, keys(object));
      }
      function valuesIn(object) {
        return object == null ? [] : baseValues(object, keysIn(object));
      }
      function clamp(number, lower, upper) {
        if (upper === undefined2) {
          upper = lower;
          lower = undefined2;
        }
        if (upper !== undefined2) {
          upper = toNumber(upper);
          upper = upper === upper ? upper : 0;
        }
        if (lower !== undefined2) {
          lower = toNumber(lower);
          lower = lower === lower ? lower : 0;
        }
        return baseClamp(toNumber(number), lower, upper);
      }
      function inRange(number, start, end) {
        start = toFinite(start);
        if (end === undefined2) {
          end = start;
          start = 0;
        } else {
          end = toFinite(end);
        }
        number = toNumber(number);
        return baseInRange(number, start, end);
      }
      function random(lower, upper, floating) {
        if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
          upper = floating = undefined2;
        }
        if (floating === undefined2) {
          if (typeof upper == "boolean") {
            floating = upper;
            upper = undefined2;
          } else if (typeof lower == "boolean") {
            floating = lower;
            lower = undefined2;
          }
        }
        if (lower === undefined2 && upper === undefined2) {
          lower = 0;
          upper = 1;
        } else {
          lower = toFinite(lower);
          if (upper === undefined2) {
            upper = lower;
            lower = 0;
          } else {
            upper = toFinite(upper);
          }
        }
        if (lower > upper) {
          var temp = lower;
          lower = upper;
          upper = temp;
        }
        if (floating || lower % 1 || upper % 1) {
          var rand = nativeRandom();
          return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
        }
        return baseRandom(lower, upper);
      }
      var camelCase = createCompounder(function(result2, word, index) {
        word = word.toLowerCase();
        return result2 + (index ? capitalize(word) : word);
      });
      function capitalize(string) {
        return upperFirst(toString(string).toLowerCase());
      }
      function deburr(string) {
        string = toString(string);
        return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
      }
      function endsWith(string, target, position) {
        string = toString(string);
        target = baseToString(target);
        var length = string.length;
        position = position === undefined2 ? length : baseClamp(toInteger(position), 0, length);
        var end = position;
        position -= target.length;
        return position >= 0 && string.slice(position, end) == target;
      }
      function escape(string) {
        string = toString(string);
        return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
      }
      function escapeRegExp(string) {
        string = toString(string);
        return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
      }
      var kebabCase = createCompounder(function(result2, word, index) {
        return result2 + (index ? "-" : "") + word.toLowerCase();
      });
      var lowerCase = createCompounder(function(result2, word, index) {
        return result2 + (index ? " " : "") + word.toLowerCase();
      });
      var lowerFirst = createCaseFirst("toLowerCase");
      function pad(string, length, chars) {
        string = toString(string);
        length = toInteger(length);
        var strLength = length ? stringSize(string) : 0;
        if (!length || strLength >= length) {
          return string;
        }
        var mid = (length - strLength) / 2;
        return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
      }
      function padEnd(string, length, chars) {
        string = toString(string);
        length = toInteger(length);
        var strLength = length ? stringSize(string) : 0;
        return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
      }
      function padStart(string, length, chars) {
        string = toString(string);
        length = toInteger(length);
        var strLength = length ? stringSize(string) : 0;
        return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
      }
      function parseInt2(string, radix, guard) {
        if (guard || radix == null) {
          radix = 0;
        } else if (radix) {
          radix = +radix;
        }
        return nativeParseInt(toString(string).replace(reTrimStart, ""), radix || 0);
      }
      function repeat(string, n, guard) {
        if (guard ? isIterateeCall(string, n, guard) : n === undefined2) {
          n = 1;
        } else {
          n = toInteger(n);
        }
        return baseRepeat(toString(string), n);
      }
      function replace() {
        var args = arguments, string = toString(args[0]);
        return args.length < 3 ? string : string.replace(args[1], args[2]);
      }
      var snakeCase = createCompounder(function(result2, word, index) {
        return result2 + (index ? "_" : "") + word.toLowerCase();
      });
      function split(string, separator, limit) {
        if (limit && typeof limit != "number" && isIterateeCall(string, separator, limit)) {
          separator = limit = undefined2;
        }
        limit = limit === undefined2 ? MAX_ARRAY_LENGTH : limit >>> 0;
        if (!limit) {
          return [];
        }
        string = toString(string);
        if (string && (typeof separator == "string" || separator != null && !isRegExp(separator))) {
          separator = baseToString(separator);
          if (!separator && hasUnicode(string)) {
            return castSlice(stringToArray(string), 0, limit);
          }
        }
        return string.split(separator, limit);
      }
      var startCase = createCompounder(function(result2, word, index) {
        return result2 + (index ? " " : "") + upperFirst(word);
      });
      function startsWith(string, target, position) {
        string = toString(string);
        position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
        target = baseToString(target);
        return string.slice(position, position + target.length) == target;
      }
      function template(string, options, guard) {
        var settings = lodash.templateSettings;
        if (guard && isIterateeCall(string, options, guard)) {
          options = undefined2;
        }
        string = toString(string);
        options = assignInWith({}, options, settings, customDefaultsAssignIn);
        var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
        var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
        var reDelimiters = RegExp2((options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$", "g");
        var sourceURL = "//# sourceURL=" + (hasOwnProperty.call(options, "sourceURL") ? (options.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + `
`;
        string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
          interpolateValue || (interpolateValue = esTemplateValue);
          source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
          if (escapeValue) {
            isEscaping = true;
            source += `' +
__e(` + escapeValue + `) +
'`;
          }
          if (evaluateValue) {
            isEvaluating = true;
            source += `';
` + evaluateValue + `;
__p += '`;
          }
          if (interpolateValue) {
            source += `' +
((__t = (` + interpolateValue + `)) == null ? '' : __t) +
'`;
          }
          index = offset + match.length;
          return match;
        });
        source += `';
`;
        var variable = hasOwnProperty.call(options, "variable") && options.variable;
        if (!variable) {
          source = `with (obj) {
` + source + `
}
`;
        } else if (reForbiddenIdentifierChars.test(variable)) {
          throw new Error2(INVALID_TEMPL_VAR_ERROR_TEXT);
        }
        source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
        source = "function(" + (variable || "obj") + `) {
` + (variable ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? `, __j = Array.prototype.join;
` + `function print() { __p += __j.call(arguments, '') }
` : `;
`) + source + `return __p
}`;
        var result2 = attempt(function() {
          return Function2(importsKeys, sourceURL + "return " + source).apply(undefined2, importsValues);
        });
        result2.source = source;
        if (isError(result2)) {
          throw result2;
        }
        return result2;
      }
      function toLower(value) {
        return toString(value).toLowerCase();
      }
      function toUpper(value) {
        return toString(value).toUpperCase();
      }
      function trim(string, chars, guard) {
        string = toString(string);
        if (string && (guard || chars === undefined2)) {
          return baseTrim(string);
        }
        if (!string || !(chars = baseToString(chars))) {
          return string;
        }
        var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
        return castSlice(strSymbols, start, end).join("");
      }
      function trimEnd(string, chars, guard) {
        string = toString(string);
        if (string && (guard || chars === undefined2)) {
          return string.slice(0, trimmedEndIndex(string) + 1);
        }
        if (!string || !(chars = baseToString(chars))) {
          return string;
        }
        var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
        return castSlice(strSymbols, 0, end).join("");
      }
      function trimStart(string, chars, guard) {
        string = toString(string);
        if (string && (guard || chars === undefined2)) {
          return string.replace(reTrimStart, "");
        }
        if (!string || !(chars = baseToString(chars))) {
          return string;
        }
        var strSymbols = stringToArray(string), start = charsStartIndex(strSymbols, stringToArray(chars));
        return castSlice(strSymbols, start).join("");
      }
      function truncate(string, options) {
        var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
        if (isObject(options)) {
          var separator = "separator" in options ? options.separator : separator;
          length = "length" in options ? toInteger(options.length) : length;
          omission = "omission" in options ? baseToString(options.omission) : omission;
        }
        string = toString(string);
        var strLength = string.length;
        if (hasUnicode(string)) {
          var strSymbols = stringToArray(string);
          strLength = strSymbols.length;
        }
        if (length >= strLength) {
          return string;
        }
        var end = length - stringSize(omission);
        if (end < 1) {
          return omission;
        }
        var result2 = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
        if (separator === undefined2) {
          return result2 + omission;
        }
        if (strSymbols) {
          end += result2.length - end;
        }
        if (isRegExp(separator)) {
          if (string.slice(end).search(separator)) {
            var match, substring = result2;
            if (!separator.global) {
              separator = RegExp2(separator.source, toString(reFlags.exec(separator)) + "g");
            }
            separator.lastIndex = 0;
            while (match = separator.exec(substring)) {
              var newEnd = match.index;
            }
            result2 = result2.slice(0, newEnd === undefined2 ? end : newEnd);
          }
        } else if (string.indexOf(baseToString(separator), end) != end) {
          var index = result2.lastIndexOf(separator);
          if (index > -1) {
            result2 = result2.slice(0, index);
          }
        }
        return result2 + omission;
      }
      function unescape(string) {
        string = toString(string);
        return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
      }
      var upperCase = createCompounder(function(result2, word, index) {
        return result2 + (index ? " " : "") + word.toUpperCase();
      });
      var upperFirst = createCaseFirst("toUpperCase");
      function words(string, pattern, guard) {
        string = toString(string);
        pattern = guard ? undefined2 : pattern;
        if (pattern === undefined2) {
          return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
        }
        return string.match(pattern) || [];
      }
      var attempt = baseRest(function(func, args) {
        try {
          return apply(func, undefined2, args);
        } catch (e) {
          return isError(e) ? e : new Error2(e);
        }
      });
      var bindAll = flatRest(function(object, methodNames) {
        arrayEach(methodNames, function(key) {
          key = toKey(key);
          baseAssignValue(object, key, bind(object[key], object));
        });
        return object;
      });
      function cond(pairs) {
        var length = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
        pairs = !length ? [] : arrayMap(pairs, function(pair) {
          if (typeof pair[1] != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return [toIteratee(pair[0]), pair[1]];
        });
        return baseRest(function(args) {
          var index = -1;
          while (++index < length) {
            var pair = pairs[index];
            if (apply(pair[0], this, args)) {
              return apply(pair[1], this, args);
            }
          }
        });
      }
      function conforms(source) {
        return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
      }
      function constant(value) {
        return function() {
          return value;
        };
      }
      function defaultTo(value, defaultValue) {
        return value == null || value !== value ? defaultValue : value;
      }
      var flow = createFlow();
      var flowRight = createFlow(true);
      function identity(value) {
        return value;
      }
      function iteratee(func) {
        return baseIteratee(typeof func == "function" ? func : baseClone(func, CLONE_DEEP_FLAG));
      }
      function matches(source) {
        return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
      }
      function matchesProperty(path, srcValue) {
        return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
      }
      var method = baseRest(function(path, args) {
        return function(object) {
          return baseInvoke(object, path, args);
        };
      });
      var methodOf = baseRest(function(object, args) {
        return function(path) {
          return baseInvoke(object, path, args);
        };
      });
      function mixin(object, source, options) {
        var props = keys(source), methodNames = baseFunctions(source, props);
        if (options == null && !(isObject(source) && (methodNames.length || !props.length))) {
          options = source;
          source = object;
          object = this;
          methodNames = baseFunctions(source, keys(source));
        }
        var chain2 = !(isObject(options) && ("chain" in options)) || !!options.chain, isFunc = isFunction(object);
        arrayEach(methodNames, function(methodName) {
          var func = source[methodName];
          object[methodName] = func;
          if (isFunc) {
            object.prototype[methodName] = function() {
              var chainAll = this.__chain__;
              if (chain2 || chainAll) {
                var result2 = object(this.__wrapped__), actions = result2.__actions__ = copyArray(this.__actions__);
                actions.push({ func, args: arguments, thisArg: object });
                result2.__chain__ = chainAll;
                return result2;
              }
              return func.apply(object, arrayPush([this.value()], arguments));
            };
          }
        });
        return object;
      }
      function noConflict() {
        if (root._ === this) {
          root._ = oldDash;
        }
        return this;
      }
      function noop() {}
      function nthArg(n) {
        n = toInteger(n);
        return baseRest(function(args) {
          return baseNth(args, n);
        });
      }
      var over = createOver(arrayMap);
      var overEvery = createOver(arrayEvery);
      var overSome = createOver(arraySome);
      function property(path) {
        return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
      }
      function propertyOf(object) {
        return function(path) {
          return object == null ? undefined2 : baseGet(object, path);
        };
      }
      var range = createRange();
      var rangeRight = createRange(true);
      function stubArray() {
        return [];
      }
      function stubFalse() {
        return false;
      }
      function stubObject() {
        return {};
      }
      function stubString() {
        return "";
      }
      function stubTrue() {
        return true;
      }
      function times(n, iteratee2) {
        n = toInteger(n);
        if (n < 1 || n > MAX_SAFE_INTEGER) {
          return [];
        }
        var index = MAX_ARRAY_LENGTH, length = nativeMin(n, MAX_ARRAY_LENGTH);
        iteratee2 = getIteratee(iteratee2);
        n -= MAX_ARRAY_LENGTH;
        var result2 = baseTimes(length, iteratee2);
        while (++index < n) {
          iteratee2(index);
        }
        return result2;
      }
      function toPath(value) {
        if (isArray(value)) {
          return arrayMap(value, toKey);
        }
        return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
      }
      function uniqueId(prefix) {
        var id = ++idCounter;
        return toString(prefix) + id;
      }
      var add = createMathOperation(function(augend, addend) {
        return augend + addend;
      }, 0);
      var ceil = createRound("ceil");
      var divide = createMathOperation(function(dividend, divisor) {
        return dividend / divisor;
      }, 1);
      var floor = createRound("floor");
      function max(array) {
        return array && array.length ? baseExtremum(array, identity, baseGt) : undefined2;
      }
      function maxBy(array, iteratee2) {
        return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseGt) : undefined2;
      }
      function mean(array) {
        return baseMean(array, identity);
      }
      function meanBy(array, iteratee2) {
        return baseMean(array, getIteratee(iteratee2, 2));
      }
      function min(array) {
        return array && array.length ? baseExtremum(array, identity, baseLt) : undefined2;
      }
      function minBy(array, iteratee2) {
        return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseLt) : undefined2;
      }
      var multiply = createMathOperation(function(multiplier, multiplicand) {
        return multiplier * multiplicand;
      }, 1);
      var round = createRound("round");
      var subtract = createMathOperation(function(minuend, subtrahend) {
        return minuend - subtrahend;
      }, 0);
      function sum(array) {
        return array && array.length ? baseSum(array, identity) : 0;
      }
      function sumBy(array, iteratee2) {
        return array && array.length ? baseSum(array, getIteratee(iteratee2, 2)) : 0;
      }
      lodash.after = after;
      lodash.ary = ary;
      lodash.assign = assign;
      lodash.assignIn = assignIn;
      lodash.assignInWith = assignInWith;
      lodash.assignWith = assignWith;
      lodash.at = at;
      lodash.before = before;
      lodash.bind = bind;
      lodash.bindAll = bindAll;
      lodash.bindKey = bindKey;
      lodash.castArray = castArray;
      lodash.chain = chain;
      lodash.chunk = chunk;
      lodash.compact = compact;
      lodash.concat = concat;
      lodash.cond = cond;
      lodash.conforms = conforms;
      lodash.constant = constant;
      lodash.countBy = countBy;
      lodash.create = create;
      lodash.curry = curry;
      lodash.curryRight = curryRight;
      lodash.debounce = debounce;
      lodash.defaults = defaults;
      lodash.defaultsDeep = defaultsDeep;
      lodash.defer = defer;
      lodash.delay = delay;
      lodash.difference = difference;
      lodash.differenceBy = differenceBy;
      lodash.differenceWith = differenceWith;
      lodash.drop = drop;
      lodash.dropRight = dropRight;
      lodash.dropRightWhile = dropRightWhile;
      lodash.dropWhile = dropWhile;
      lodash.fill = fill;
      lodash.filter = filter;
      lodash.flatMap = flatMap;
      lodash.flatMapDeep = flatMapDeep;
      lodash.flatMapDepth = flatMapDepth;
      lodash.flatten = flatten;
      lodash.flattenDeep = flattenDeep;
      lodash.flattenDepth = flattenDepth;
      lodash.flip = flip;
      lodash.flow = flow;
      lodash.flowRight = flowRight;
      lodash.fromPairs = fromPairs;
      lodash.functions = functions;
      lodash.functionsIn = functionsIn;
      lodash.groupBy = groupBy;
      lodash.initial = initial;
      lodash.intersection = intersection;
      lodash.intersectionBy = intersectionBy;
      lodash.intersectionWith = intersectionWith;
      lodash.invert = invert;
      lodash.invertBy = invertBy;
      lodash.invokeMap = invokeMap;
      lodash.iteratee = iteratee;
      lodash.keyBy = keyBy;
      lodash.keys = keys;
      lodash.keysIn = keysIn;
      lodash.map = map;
      lodash.mapKeys = mapKeys;
      lodash.mapValues = mapValues;
      lodash.matches = matches;
      lodash.matchesProperty = matchesProperty;
      lodash.memoize = memoize;
      lodash.merge = merge;
      lodash.mergeWith = mergeWith;
      lodash.method = method;
      lodash.methodOf = methodOf;
      lodash.mixin = mixin;
      lodash.negate = negate;
      lodash.nthArg = nthArg;
      lodash.omit = omit;
      lodash.omitBy = omitBy;
      lodash.once = once;
      lodash.orderBy = orderBy;
      lodash.over = over;
      lodash.overArgs = overArgs;
      lodash.overEvery = overEvery;
      lodash.overSome = overSome;
      lodash.partial = partial;
      lodash.partialRight = partialRight;
      lodash.partition = partition;
      lodash.pick = pick;
      lodash.pickBy = pickBy;
      lodash.property = property;
      lodash.propertyOf = propertyOf;
      lodash.pull = pull;
      lodash.pullAll = pullAll;
      lodash.pullAllBy = pullAllBy;
      lodash.pullAllWith = pullAllWith;
      lodash.pullAt = pullAt;
      lodash.range = range;
      lodash.rangeRight = rangeRight;
      lodash.rearg = rearg;
      lodash.reject = reject;
      lodash.remove = remove;
      lodash.rest = rest;
      lodash.reverse = reverse;
      lodash.sampleSize = sampleSize;
      lodash.set = set;
      lodash.setWith = setWith;
      lodash.shuffle = shuffle;
      lodash.slice = slice;
      lodash.sortBy = sortBy;
      lodash.sortedUniq = sortedUniq;
      lodash.sortedUniqBy = sortedUniqBy;
      lodash.split = split;
      lodash.spread = spread;
      lodash.tail = tail;
      lodash.take = take;
      lodash.takeRight = takeRight;
      lodash.takeRightWhile = takeRightWhile;
      lodash.takeWhile = takeWhile;
      lodash.tap = tap;
      lodash.throttle = throttle;
      lodash.thru = thru;
      lodash.toArray = toArray;
      lodash.toPairs = toPairs;
      lodash.toPairsIn = toPairsIn;
      lodash.toPath = toPath;
      lodash.toPlainObject = toPlainObject;
      lodash.transform = transform;
      lodash.unary = unary;
      lodash.union = union;
      lodash.unionBy = unionBy;
      lodash.unionWith = unionWith;
      lodash.uniq = uniq;
      lodash.uniqBy = uniqBy;
      lodash.uniqWith = uniqWith;
      lodash.unset = unset;
      lodash.unzip = unzip;
      lodash.unzipWith = unzipWith;
      lodash.update = update;
      lodash.updateWith = updateWith;
      lodash.values = values;
      lodash.valuesIn = valuesIn;
      lodash.without = without;
      lodash.words = words;
      lodash.wrap = wrap;
      lodash.xor = xor;
      lodash.xorBy = xorBy;
      lodash.xorWith = xorWith;
      lodash.zip = zip;
      lodash.zipObject = zipObject;
      lodash.zipObjectDeep = zipObjectDeep;
      lodash.zipWith = zipWith;
      lodash.entries = toPairs;
      lodash.entriesIn = toPairsIn;
      lodash.extend = assignIn;
      lodash.extendWith = assignInWith;
      mixin(lodash, lodash);
      lodash.add = add;
      lodash.attempt = attempt;
      lodash.camelCase = camelCase;
      lodash.capitalize = capitalize;
      lodash.ceil = ceil;
      lodash.clamp = clamp;
      lodash.clone = clone;
      lodash.cloneDeep = cloneDeep;
      lodash.cloneDeepWith = cloneDeepWith;
      lodash.cloneWith = cloneWith;
      lodash.conformsTo = conformsTo;
      lodash.deburr = deburr;
      lodash.defaultTo = defaultTo;
      lodash.divide = divide;
      lodash.endsWith = endsWith;
      lodash.eq = eq;
      lodash.escape = escape;
      lodash.escapeRegExp = escapeRegExp;
      lodash.every = every;
      lodash.find = find;
      lodash.findIndex = findIndex;
      lodash.findKey = findKey;
      lodash.findLast = findLast;
      lodash.findLastIndex = findLastIndex;
      lodash.findLastKey = findLastKey;
      lodash.floor = floor;
      lodash.forEach = forEach;
      lodash.forEachRight = forEachRight;
      lodash.forIn = forIn;
      lodash.forInRight = forInRight;
      lodash.forOwn = forOwn;
      lodash.forOwnRight = forOwnRight;
      lodash.get = get;
      lodash.gt = gt;
      lodash.gte = gte;
      lodash.has = has;
      lodash.hasIn = hasIn;
      lodash.head = head;
      lodash.identity = identity;
      lodash.includes = includes;
      lodash.indexOf = indexOf;
      lodash.inRange = inRange;
      lodash.invoke = invoke;
      lodash.isArguments = isArguments;
      lodash.isArray = isArray;
      lodash.isArrayBuffer = isArrayBuffer;
      lodash.isArrayLike = isArrayLike;
      lodash.isArrayLikeObject = isArrayLikeObject;
      lodash.isBoolean = isBoolean;
      lodash.isBuffer = isBuffer;
      lodash.isDate = isDate;
      lodash.isElement = isElement;
      lodash.isEmpty = isEmpty;
      lodash.isEqual = isEqual;
      lodash.isEqualWith = isEqualWith;
      lodash.isError = isError;
      lodash.isFinite = isFinite;
      lodash.isFunction = isFunction;
      lodash.isInteger = isInteger;
      lodash.isLength = isLength;
      lodash.isMap = isMap;
      lodash.isMatch = isMatch;
      lodash.isMatchWith = isMatchWith;
      lodash.isNaN = isNaN2;
      lodash.isNative = isNative;
      lodash.isNil = isNil;
      lodash.isNull = isNull;
      lodash.isNumber = isNumber;
      lodash.isObject = isObject;
      lodash.isObjectLike = isObjectLike;
      lodash.isPlainObject = isPlainObject;
      lodash.isRegExp = isRegExp;
      lodash.isSafeInteger = isSafeInteger;
      lodash.isSet = isSet;
      lodash.isString = isString;
      lodash.isSymbol = isSymbol;
      lodash.isTypedArray = isTypedArray;
      lodash.isUndefined = isUndefined;
      lodash.isWeakMap = isWeakMap;
      lodash.isWeakSet = isWeakSet;
      lodash.join = join;
      lodash.kebabCase = kebabCase;
      lodash.last = last;
      lodash.lastIndexOf = lastIndexOf;
      lodash.lowerCase = lowerCase;
      lodash.lowerFirst = lowerFirst;
      lodash.lt = lt;
      lodash.lte = lte;
      lodash.max = max;
      lodash.maxBy = maxBy;
      lodash.mean = mean;
      lodash.meanBy = meanBy;
      lodash.min = min;
      lodash.minBy = minBy;
      lodash.stubArray = stubArray;
      lodash.stubFalse = stubFalse;
      lodash.stubObject = stubObject;
      lodash.stubString = stubString;
      lodash.stubTrue = stubTrue;
      lodash.multiply = multiply;
      lodash.nth = nth;
      lodash.noConflict = noConflict;
      lodash.noop = noop;
      lodash.now = now;
      lodash.pad = pad;
      lodash.padEnd = padEnd;
      lodash.padStart = padStart;
      lodash.parseInt = parseInt2;
      lodash.random = random;
      lodash.reduce = reduce;
      lodash.reduceRight = reduceRight;
      lodash.repeat = repeat;
      lodash.replace = replace;
      lodash.result = result;
      lodash.round = round;
      lodash.runInContext = runInContext;
      lodash.sample = sample;
      lodash.size = size;
      lodash.snakeCase = snakeCase;
      lodash.some = some;
      lodash.sortedIndex = sortedIndex;
      lodash.sortedIndexBy = sortedIndexBy;
      lodash.sortedIndexOf = sortedIndexOf;
      lodash.sortedLastIndex = sortedLastIndex;
      lodash.sortedLastIndexBy = sortedLastIndexBy;
      lodash.sortedLastIndexOf = sortedLastIndexOf;
      lodash.startCase = startCase;
      lodash.startsWith = startsWith;
      lodash.subtract = subtract;
      lodash.sum = sum;
      lodash.sumBy = sumBy;
      lodash.template = template;
      lodash.times = times;
      lodash.toFinite = toFinite;
      lodash.toInteger = toInteger;
      lodash.toLength = toLength;
      lodash.toLower = toLower;
      lodash.toNumber = toNumber;
      lodash.toSafeInteger = toSafeInteger;
      lodash.toString = toString;
      lodash.toUpper = toUpper;
      lodash.trim = trim;
      lodash.trimEnd = trimEnd;
      lodash.trimStart = trimStart;
      lodash.truncate = truncate;
      lodash.unescape = unescape;
      lodash.uniqueId = uniqueId;
      lodash.upperCase = upperCase;
      lodash.upperFirst = upperFirst;
      lodash.each = forEach;
      lodash.eachRight = forEachRight;
      lodash.first = head;
      mixin(lodash, function() {
        var source = {};
        baseForOwn(lodash, function(func, methodName) {
          if (!hasOwnProperty.call(lodash.prototype, methodName)) {
            source[methodName] = func;
          }
        });
        return source;
      }(), { chain: false });
      lodash.VERSION = VERSION;
      arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
        lodash[methodName].placeholder = lodash;
      });
      arrayEach(["drop", "take"], function(methodName, index) {
        LazyWrapper.prototype[methodName] = function(n) {
          n = n === undefined2 ? 1 : nativeMax(toInteger(n), 0);
          var result2 = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
          if (result2.__filtered__) {
            result2.__takeCount__ = nativeMin(n, result2.__takeCount__);
          } else {
            result2.__views__.push({
              size: nativeMin(n, MAX_ARRAY_LENGTH),
              type: methodName + (result2.__dir__ < 0 ? "Right" : "")
            });
          }
          return result2;
        };
        LazyWrapper.prototype[methodName + "Right"] = function(n) {
          return this.reverse()[methodName](n).reverse();
        };
      });
      arrayEach(["filter", "map", "takeWhile"], function(methodName, index) {
        var type = index + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
        LazyWrapper.prototype[methodName] = function(iteratee2) {
          var result2 = this.clone();
          result2.__iteratees__.push({
            iteratee: getIteratee(iteratee2, 3),
            type
          });
          result2.__filtered__ = result2.__filtered__ || isFilter;
          return result2;
        };
      });
      arrayEach(["head", "last"], function(methodName, index) {
        var takeName = "take" + (index ? "Right" : "");
        LazyWrapper.prototype[methodName] = function() {
          return this[takeName](1).value()[0];
        };
      });
      arrayEach(["initial", "tail"], function(methodName, index) {
        var dropName = "drop" + (index ? "" : "Right");
        LazyWrapper.prototype[methodName] = function() {
          return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
        };
      });
      LazyWrapper.prototype.compact = function() {
        return this.filter(identity);
      };
      LazyWrapper.prototype.find = function(predicate) {
        return this.filter(predicate).head();
      };
      LazyWrapper.prototype.findLast = function(predicate) {
        return this.reverse().find(predicate);
      };
      LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
        if (typeof path == "function") {
          return new LazyWrapper(this);
        }
        return this.map(function(value) {
          return baseInvoke(value, path, args);
        });
      });
      LazyWrapper.prototype.reject = function(predicate) {
        return this.filter(negate(getIteratee(predicate)));
      };
      LazyWrapper.prototype.slice = function(start, end) {
        start = toInteger(start);
        var result2 = this;
        if (result2.__filtered__ && (start > 0 || end < 0)) {
          return new LazyWrapper(result2);
        }
        if (start < 0) {
          result2 = result2.takeRight(-start);
        } else if (start) {
          result2 = result2.drop(start);
        }
        if (end !== undefined2) {
          end = toInteger(end);
          result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start);
        }
        return result2;
      };
      LazyWrapper.prototype.takeRightWhile = function(predicate) {
        return this.reverse().takeWhile(predicate).reverse();
      };
      LazyWrapper.prototype.toArray = function() {
        return this.take(MAX_ARRAY_LENGTH);
      };
      baseForOwn(LazyWrapper.prototype, function(func, methodName) {
        var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
        if (!lodashFunc) {
          return;
        }
        lodash.prototype[methodName] = function() {
          var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee2 = args[0], useLazy = isLazy || isArray(value);
          var interceptor = function(value2) {
            var result3 = lodashFunc.apply(lodash, arrayPush([value2], args));
            return isTaker && chainAll ? result3[0] : result3;
          };
          if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
            isLazy = useLazy = false;
          }
          var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
          if (!retUnwrapped && useLazy) {
            value = onlyLazy ? value : new LazyWrapper(this);
            var result2 = func.apply(value, args);
            result2.__actions__.push({ func: thru, args: [interceptor], thisArg: undefined2 });
            return new LodashWrapper(result2, chainAll);
          }
          if (isUnwrapped && onlyLazy) {
            return func.apply(this, args);
          }
          result2 = this.thru(interceptor);
          return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
        };
      });
      arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
        var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
        lodash.prototype[methodName] = function() {
          var args = arguments;
          if (retUnwrapped && !this.__chain__) {
            var value = this.value();
            return func.apply(isArray(value) ? value : [], args);
          }
          return this[chainName](function(value2) {
            return func.apply(isArray(value2) ? value2 : [], args);
          });
        };
      });
      baseForOwn(LazyWrapper.prototype, function(func, methodName) {
        var lodashFunc = lodash[methodName];
        if (lodashFunc) {
          var key = lodashFunc.name + "";
          if (!hasOwnProperty.call(realNames, key)) {
            realNames[key] = [];
          }
          realNames[key].push({ name: methodName, func: lodashFunc });
        }
      });
      realNames[createHybrid(undefined2, WRAP_BIND_KEY_FLAG).name] = [{
        name: "wrapper",
        func: undefined2
      }];
      LazyWrapper.prototype.clone = lazyClone;
      LazyWrapper.prototype.reverse = lazyReverse;
      LazyWrapper.prototype.value = lazyValue;
      lodash.prototype.at = wrapperAt;
      lodash.prototype.chain = wrapperChain;
      lodash.prototype.commit = wrapperCommit;
      lodash.prototype.next = wrapperNext;
      lodash.prototype.plant = wrapperPlant;
      lodash.prototype.reverse = wrapperReverse;
      lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
      lodash.prototype.first = lodash.prototype.head;
      if (symIterator) {
        lodash.prototype[symIterator] = wrapperToIterator;
      }
      return lodash;
    };
    var _ = runInContext();
    if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
      root._ = _;
      define(function() {
        return _;
      });
    } else if (freeModule) {
      (freeModule.exports = _)._ = _;
      freeExports._ = _;
    } else {
      root._ = _;
    }
  }).call(exports);
});

// src/server.ts
var import_node = __toESM(require_main4(), 1);

// node_modules/vscode-languageserver-textdocument/lib/esm/main.js
class FullTextDocument {
  constructor(uri, languageId, version, content) {
    this._uri = uri;
    this._languageId = languageId;
    this._version = version;
    this._content = content;
    this._lineOffsets = undefined;
  }
  get uri() {
    return this._uri;
  }
  get languageId() {
    return this._languageId;
  }
  get version() {
    return this._version;
  }
  getText(range) {
    if (range) {
      const start = this.offsetAt(range.start);
      const end = this.offsetAt(range.end);
      return this._content.substring(start, end);
    }
    return this._content;
  }
  update(changes, version) {
    for (const change of changes) {
      if (FullTextDocument.isIncremental(change)) {
        const range = getWellformedRange(change.range);
        const startOffset = this.offsetAt(range.start);
        const endOffset = this.offsetAt(range.end);
        this._content = this._content.substring(0, startOffset) + change.text + this._content.substring(endOffset, this._content.length);
        const startLine = Math.max(range.start.line, 0);
        const endLine = Math.max(range.end.line, 0);
        let lineOffsets = this._lineOffsets;
        const addedLineOffsets = computeLineOffsets(change.text, false, startOffset);
        if (endLine - startLine === addedLineOffsets.length) {
          for (let i = 0, len = addedLineOffsets.length;i < len; i++) {
            lineOffsets[i + startLine + 1] = addedLineOffsets[i];
          }
        } else {
          if (addedLineOffsets.length < 1e4) {
            lineOffsets.splice(startLine + 1, endLine - startLine, ...addedLineOffsets);
          } else {
            this._lineOffsets = lineOffsets = lineOffsets.slice(0, startLine + 1).concat(addedLineOffsets, lineOffsets.slice(endLine + 1));
          }
        }
        const diff = change.text.length - (endOffset - startOffset);
        if (diff !== 0) {
          for (let i = startLine + 1 + addedLineOffsets.length, len = lineOffsets.length;i < len; i++) {
            lineOffsets[i] = lineOffsets[i] + diff;
          }
        }
      } else if (FullTextDocument.isFull(change)) {
        this._content = change.text;
        this._lineOffsets = undefined;
      } else {
        throw new Error("Unknown change event received");
      }
    }
    this._version = version;
  }
  getLineOffsets() {
    if (this._lineOffsets === undefined) {
      this._lineOffsets = computeLineOffsets(this._content, true);
    }
    return this._lineOffsets;
  }
  positionAt(offset) {
    offset = Math.max(Math.min(offset, this._content.length), 0);
    const lineOffsets = this.getLineOffsets();
    let low = 0, high = lineOffsets.length;
    if (high === 0) {
      return { line: 0, character: offset };
    }
    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      if (lineOffsets[mid] > offset) {
        high = mid;
      } else {
        low = mid + 1;
      }
    }
    const line = low - 1;
    offset = this.ensureBeforeEOL(offset, lineOffsets[line]);
    return { line, character: offset - lineOffsets[line] };
  }
  offsetAt(position) {
    const lineOffsets = this.getLineOffsets();
    if (position.line >= lineOffsets.length) {
      return this._content.length;
    } else if (position.line < 0) {
      return 0;
    }
    const lineOffset = lineOffsets[position.line];
    if (position.character <= 0) {
      return lineOffset;
    }
    const nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
    const offset = Math.min(lineOffset + position.character, nextLineOffset);
    return this.ensureBeforeEOL(offset, lineOffset);
  }
  ensureBeforeEOL(offset, lineOffset) {
    while (offset > lineOffset && isEOL(this._content.charCodeAt(offset - 1))) {
      offset--;
    }
    return offset;
  }
  get lineCount() {
    return this.getLineOffsets().length;
  }
  static isIncremental(event) {
    const candidate = event;
    return candidate !== undefined && candidate !== null && typeof candidate.text === "string" && candidate.range !== undefined && (candidate.rangeLength === undefined || typeof candidate.rangeLength === "number");
  }
  static isFull(event) {
    const candidate = event;
    return candidate !== undefined && candidate !== null && typeof candidate.text === "string" && candidate.range === undefined && candidate.rangeLength === undefined;
  }
}
var TextDocument;
(function(TextDocument2) {
  function create(uri, languageId, version, content) {
    return new FullTextDocument(uri, languageId, version, content);
  }
  TextDocument2.create = create;
  function update(document, changes, version) {
    if (document instanceof FullTextDocument) {
      document.update(changes, version);
      return document;
    } else {
      throw new Error("TextDocument.update: document must be created by TextDocument.create");
    }
  }
  TextDocument2.update = update;
  function applyEdits(document, edits) {
    const text = document.getText();
    const sortedEdits = mergeSort(edits.map(getWellformedEdit), (a, b) => {
      const diff = a.range.start.line - b.range.start.line;
      if (diff === 0) {
        return a.range.start.character - b.range.start.character;
      }
      return diff;
    });
    let lastModifiedOffset = 0;
    const spans = [];
    for (const e of sortedEdits) {
      const startOffset = document.offsetAt(e.range.start);
      if (startOffset < lastModifiedOffset) {
        throw new Error("Overlapping edit");
      } else if (startOffset > lastModifiedOffset) {
        spans.push(text.substring(lastModifiedOffset, startOffset));
      }
      if (e.newText.length) {
        spans.push(e.newText);
      }
      lastModifiedOffset = document.offsetAt(e.range.end);
    }
    spans.push(text.substr(lastModifiedOffset));
    return spans.join("");
  }
  TextDocument2.applyEdits = applyEdits;
})(TextDocument || (TextDocument = {}));
function mergeSort(data, compare) {
  if (data.length <= 1) {
    return data;
  }
  const p = data.length / 2 | 0;
  const left = data.slice(0, p);
  const right = data.slice(p);
  mergeSort(left, compare);
  mergeSort(right, compare);
  let leftIdx = 0;
  let rightIdx = 0;
  let i = 0;
  while (leftIdx < left.length && rightIdx < right.length) {
    const ret = compare(left[leftIdx], right[rightIdx]);
    if (ret <= 0) {
      data[i++] = left[leftIdx++];
    } else {
      data[i++] = right[rightIdx++];
    }
  }
  while (leftIdx < left.length) {
    data[i++] = left[leftIdx++];
  }
  while (rightIdx < right.length) {
    data[i++] = right[rightIdx++];
  }
  return data;
}
function computeLineOffsets(text, isAtLineStart, textOffset = 0) {
  const result = isAtLineStart ? [textOffset] : [];
  for (let i = 0;i < text.length; i++) {
    const ch = text.charCodeAt(i);
    if (isEOL(ch)) {
      if (ch === 13 && i + 1 < text.length && text.charCodeAt(i + 1) === 10) {
        i++;
      }
      result.push(textOffset + i + 1);
    }
  }
  return result;
}
function isEOL(char) {
  return char === 13 || char === 10;
}
function getWellformedRange(range) {
  const start = range.start;
  const end = range.end;
  if (start.line > end.line || start.line === end.line && start.character > end.character) {
    return { start: end, end: start };
  }
  return range;
}
function getWellformedEdit(textEdit) {
  const range = getWellformedRange(textEdit.range);
  if (range !== textEdit.range) {
    return { newText: textEdit.newText, range };
  }
  return textEdit;
}

// ../lidl-core/src/data.ts
var import_lodash = __toESM(require_lodash(), 1);
function intersectionObjects2(a, b, areEqualFunction) {
  var results = [];
  for (var i = 0;i < a.length; i++) {
    var aElement = a[i];
    var existsInB = import_lodash.default.some(b, function(bElement) {
      return areEqualFunction(bElement, aElement);
    });
    if (existsInB) {
      results.push(aElement);
    }
  }
  return results;
}
import_lodash.default.intersectionObjects = function() {
  var results = arguments[0];
  var lastArgument = arguments[arguments.length - 1];
  var arrayCount = arguments.length;
  var areEqualFunction = import_lodash.default.isEqual;
  if (typeof lastArgument === "function") {
    areEqualFunction = lastArgument;
    arrayCount--;
  }
  for (var i = 1;i < arrayCount; i++) {
    var array = arguments[i];
    results = intersectionObjects2(results, array, areEqualFunction);
    if (results.length === 0)
      break;
  }
  return results;
};
function computeData(theData) {
  if (theData.type === "DataOperation") {
    switch (theData.operator) {
      case "union":
        if (import_lodash.default.every(theData.operand, ["type", "DataComposite"])) {
          return {
            type: "DataComposite",
            element: import_lodash.default.sortBy(import_lodash.default.uniqBy(import_lodash.default.union.apply(null, import_lodash.default.map(theData.operand, "element")), "key"), "key")
          };
        } else {
          throw new Error("Arguments of the union data operator can only be composite data");
        }
        break;
      case "intersection":
        if (import_lodash.default.every(theData.operand, ["type", "DataComposite"])) {
          return {
            type: "DataComposite",
            element: import_lodash.default.sortBy(import_lodash.default.uniqBy(import_lodash.default.intersectionObjects.apply(null, import_lodash.default.map(theData.operand, "element")), "key"), "key")
          };
        } else {
          throw new Error("Arguments of the intersection data operator can only be composite data");
        }
        break;
      case "complement":
        break;
      default:
        throw new Error("Unknown data operator");
    }
  }
  return theData;
}
function compareData(data1, data2) {
  switch (data1.type + data2.type) {
    case "DataAtomicDataAtomic":
      return data1.name === data2.name;
    case "DataArrayDataArray":
      return compareData(data1.element, data2.element);
    case "DataCompositeDataComposite":
      if (import_lodash.default.isEmpty(import_lodash.default.xor(import_lodash.default.map(data1.element, "key"), import_lodash.default.map(data2.element, "key")))) {
        return import_lodash.default.reduce(import_lodash.default.zip(import_lodash.default.sortBy(data1.element, "key"), import_lodash.default.sortBy(data2.element, "key")), function(result, element, n) {
          return result && compareData(element[0].value, element[1].value);
        }, true);
      } else {
        return false;
      }
      break;
    case "DataFunctionDataFunction":
      return compareData(data1.codomain, data2.codomain) && compareData(data1.domain, data2.domain);
    default:
      if (data1.type === "DataOperation" || data2.type === "DataOperation") {
        return compareData(computeData(data1), computeData(data2));
      } else {
        return false;
      }
  }
}
// ../lidl-core/src/interactions.ts
var import_lodash3 = __toESM(require_lodash(), 1);

// ../lidl-core/node_modules/ohm-js/src/common.js
var exports_common = {};
__export(exports_common, {
  unexpectedObjToString: () => unexpectedObjToString,
  unescapeCodePoint: () => unescapeCodePoint,
  repeatStr: () => repeatStr,
  repeatFn: () => repeatFn,
  repeat: () => repeat,
  padLeft: () => padLeft,
  isSyntactic: () => isSyntactic,
  isLexical: () => isLexical,
  getDuplicates: () => getDuplicates,
  defineLazyProperty: () => defineLazyProperty,
  copyWithoutDuplicates: () => copyWithoutDuplicates,
  clone: () => clone,
  checkNotNull: () => checkNotNull,
  assert: () => assert,
  abstract: () => abstract,
  StringBuffer: () => StringBuffer
});
var escapeStringFor = {};
for (let c = 0;c < 128; c++) {
  escapeStringFor[c] = String.fromCharCode(c);
}
escapeStringFor[39] = "\\'";
escapeStringFor[34] = "\\\"";
escapeStringFor[92] = "\\\\";
escapeStringFor[8] = "\\b";
escapeStringFor[12] = "\\f";
escapeStringFor[10] = "\\n";
escapeStringFor[13] = "\\r";
escapeStringFor[9] = "\\t";
escapeStringFor[11] = "\\v";
function abstract(optMethodName) {
  const methodName = optMethodName || "";
  return function() {
    throw new Error("this method " + methodName + " is abstract! " + "(it has no implementation in class " + this.constructor.name + ")");
  };
}
function assert(cond, message) {
  if (!cond) {
    throw new Error(message || "Assertion failed");
  }
}
function defineLazyProperty(obj, propName, getterFn) {
  let memo;
  Object.defineProperty(obj, propName, {
    get() {
      if (!memo) {
        memo = getterFn.call(this);
      }
      return memo;
    }
  });
}
function clone(obj) {
  if (obj) {
    return Object.assign({}, obj);
  }
  return obj;
}
function repeatFn(fn, n) {
  const arr = [];
  while (n-- > 0) {
    arr.push(fn());
  }
  return arr;
}
function repeatStr(str, n) {
  return new Array(n + 1).join(str);
}
function repeat(x, n) {
  return repeatFn(() => x, n);
}
function getDuplicates(array) {
  const duplicates = [];
  for (let idx = 0;idx < array.length; idx++) {
    const x = array[idx];
    if (array.lastIndexOf(x) !== idx && duplicates.indexOf(x) < 0) {
      duplicates.push(x);
    }
  }
  return duplicates;
}
function copyWithoutDuplicates(array) {
  const noDuplicates = [];
  array.forEach((entry) => {
    if (noDuplicates.indexOf(entry) < 0) {
      noDuplicates.push(entry);
    }
  });
  return noDuplicates;
}
function isSyntactic(ruleName) {
  const firstChar = ruleName[0];
  return firstChar === firstChar.toUpperCase();
}
function isLexical(ruleName) {
  return !isSyntactic(ruleName);
}
function padLeft(str, len, optChar) {
  const ch = optChar || " ";
  if (str.length < len) {
    return repeatStr(ch, len - str.length) + str;
  }
  return str;
}
function StringBuffer() {
  this.strings = [];
}
StringBuffer.prototype.append = function(str) {
  this.strings.push(str);
};
StringBuffer.prototype.contents = function() {
  return this.strings.join("");
};
var escapeUnicode = (str) => String.fromCodePoint(parseInt(str, 16));
function unescapeCodePoint(s) {
  if (s.charAt(0) === "\\") {
    switch (s.charAt(1)) {
      case "b":
        return "\b";
      case "f":
        return "\f";
      case "n":
        return `
`;
      case "r":
        return "\r";
      case "t":
        return "\t";
      case "v":
        return "\v";
      case "x":
        return escapeUnicode(s.slice(2, 4));
      case "u":
        return s.charAt(2) === "{" ? escapeUnicode(s.slice(3, -1)) : escapeUnicode(s.slice(2, 6));
      default:
        return s.charAt(1);
    }
  } else {
    return s;
  }
}
function unexpectedObjToString(obj) {
  if (obj == null) {
    return String(obj);
  }
  const baseToString = Object.prototype.toString.call(obj);
  try {
    let typeName;
    if (obj.constructor && obj.constructor.name) {
      typeName = obj.constructor.name;
    } else if (baseToString.indexOf("[object ") === 0) {
      typeName = baseToString.slice(8, -1);
    } else {
      typeName = typeof obj;
    }
    return typeName + ": " + JSON.stringify(String(obj));
  } catch {
    return baseToString;
  }
}
function checkNotNull(obj, message = "unexpected null value") {
  if (obj == null) {
    throw new Error(message);
  }
  return obj;
}

// ../lidl-core/node_modules/ohm-js/src/unicode.js
var toRegExp = (val) => new RegExp(String.raw`\p{${val}}`, "u");
var UnicodeCategories = Object.fromEntries([
  "Cc",
  "Cf",
  "Cn",
  "Co",
  "Cs",
  "Ll",
  "Lm",
  "Lo",
  "Lt",
  "Lu",
  "Mc",
  "Me",
  "Mn",
  "Nd",
  "Nl",
  "No",
  "Pc",
  "Pd",
  "Pe",
  "Pf",
  "Pi",
  "Po",
  "Ps",
  "Sc",
  "Sk",
  "Sm",
  "So",
  "Zl",
  "Zp",
  "Zs"
].map((cat) => [cat, toRegExp(cat)]));
UnicodeCategories["Ltmo"] = /\p{Lt}|\p{Lm}|\p{Lo}/u;
var UnicodeBinaryProperties = Object.fromEntries(["XID_Start", "XID_Continue", "White_Space"].map((prop) => [prop, toRegExp(prop)]));

// ../lidl-core/node_modules/ohm-js/src/pexprs-main.js
class PExpr {
  constructor() {
    if (this.constructor === PExpr) {
      throw new Error("PExpr cannot be instantiated -- it's abstract");
    }
  }
  withSource(interval) {
    if (interval) {
      this.source = interval.trimmed();
    }
    return this;
  }
}
var any = Object.create(PExpr.prototype);
var end = Object.create(PExpr.prototype);

class Terminal extends PExpr {
  constructor(obj) {
    super();
    this.obj = obj;
  }
}

class Range extends PExpr {
  constructor(from, to) {
    super();
    this.from = from;
    this.to = to;
    this.matchCodePoint = from.length > 1 || to.length > 1;
  }
}

class Param extends PExpr {
  constructor(index) {
    super();
    this.index = index;
  }
}

class Alt extends PExpr {
  constructor(terms) {
    super();
    this.terms = terms;
  }
}

class Extend extends Alt {
  constructor(superGrammar, name, body) {
    const origBody = superGrammar.rules[name].body;
    super([body, origBody]);
    this.superGrammar = superGrammar;
    this.name = name;
    this.body = body;
  }
}

class Splice extends Alt {
  constructor(superGrammar, ruleName, beforeTerms, afterTerms) {
    const origBody = superGrammar.rules[ruleName].body;
    super([...beforeTerms, origBody, ...afterTerms]);
    this.superGrammar = superGrammar;
    this.ruleName = ruleName;
    this.expansionPos = beforeTerms.length;
  }
}

class Seq extends PExpr {
  constructor(factors) {
    super();
    this.factors = factors;
  }
}

class Iter extends PExpr {
  constructor(expr) {
    super();
    this.expr = expr;
  }
}

class Star extends Iter {
}

class Plus extends Iter {
}

class Opt extends Iter {
}
Star.prototype.operator = "*";
Plus.prototype.operator = "+";
Opt.prototype.operator = "?";
Star.prototype.minNumMatches = 0;
Plus.prototype.minNumMatches = 1;
Opt.prototype.minNumMatches = 0;
Star.prototype.maxNumMatches = Number.POSITIVE_INFINITY;
Plus.prototype.maxNumMatches = Number.POSITIVE_INFINITY;
Opt.prototype.maxNumMatches = 1;

class Not extends PExpr {
  constructor(expr) {
    super();
    this.expr = expr;
  }
}

class Lookahead extends PExpr {
  constructor(expr) {
    super();
    this.expr = expr;
  }
}

class Lex extends PExpr {
  constructor(expr) {
    super();
    this.expr = expr;
  }
}

class Apply extends PExpr {
  constructor(ruleName, args = []) {
    super();
    this.ruleName = ruleName;
    this.args = args;
  }
  isSyntactic() {
    return isSyntactic(this.ruleName);
  }
  toMemoKey() {
    if (!this._memoKey) {
      Object.defineProperty(this, "_memoKey", { value: this.toString() });
    }
    return this._memoKey;
  }
}

class UnicodeChar extends PExpr {
  constructor(categoryOrProp) {
    super();
    this.categoryOrProp = categoryOrProp;
    if (categoryOrProp in UnicodeCategories) {
      this.pattern = UnicodeCategories[categoryOrProp];
    } else if (categoryOrProp in UnicodeBinaryProperties) {
      this.pattern = UnicodeBinaryProperties[categoryOrProp];
    } else {
      throw new Error(`Invalid Unicode category or property name: ${JSON.stringify(categoryOrProp)}`);
    }
  }
}

// ../lidl-core/node_modules/ohm-js/src/errors.js
function createError(message, optInterval) {
  let e;
  if (optInterval) {
    e = new Error(optInterval.getLineAndColumnMessage() + message);
    e.shortMessage = message;
    e.interval = optInterval;
  } else {
    e = new Error(message);
  }
  return e;
}
function intervalSourcesDontMatch() {
  return createError("Interval sources don't match");
}
function grammarSyntaxError(matchFailure) {
  const e = new Error;
  Object.defineProperty(e, "message", {
    enumerable: true,
    get() {
      return matchFailure.message;
    }
  });
  Object.defineProperty(e, "shortMessage", {
    enumerable: true,
    get() {
      return "Expected " + matchFailure.getExpectedText();
    }
  });
  e.interval = matchFailure.getInterval();
  return e;
}
function undeclaredGrammar(grammarName, namespace, interval) {
  const message = namespace ? `Grammar ${grammarName} is not declared in namespace '${namespace}'` : "Undeclared grammar " + grammarName;
  return createError(message, interval);
}
function duplicateGrammarDeclaration(grammar, namespace) {
  return createError("Grammar " + grammar.name + " is already declared in this namespace");
}
function grammarDoesNotSupportIncrementalParsing(grammar) {
  return createError(`Grammar '${grammar.name}' does not support incremental parsing`);
}
function undeclaredRule(ruleName, grammarName, optInterval) {
  return createError("Rule " + ruleName + " is not declared in grammar " + grammarName, optInterval);
}
function cannotOverrideUndeclaredRule(ruleName, grammarName, optSource) {
  return createError("Cannot override rule " + ruleName + " because it is not declared in " + grammarName, optSource);
}
function cannotExtendUndeclaredRule(ruleName, grammarName, optSource) {
  return createError("Cannot extend rule " + ruleName + " because it is not declared in " + grammarName, optSource);
}
function duplicateRuleDeclaration(ruleName, grammarName, declGrammarName, optSource) {
  let message = "Duplicate declaration for rule '" + ruleName + "' in grammar '" + grammarName + "'";
  if (grammarName !== declGrammarName) {
    message += " (originally declared in '" + declGrammarName + "')";
  }
  return createError(message, optSource);
}
function wrongNumberOfParameters(ruleName, expected, actual, source) {
  return createError("Wrong number of parameters for rule " + ruleName + " (expected " + expected + ", got " + actual + ")", source);
}
function wrongNumberOfArguments(ruleName, expected, actual, expr) {
  return createError("Wrong number of arguments for rule " + ruleName + " (expected " + expected + ", got " + actual + ")", expr);
}
function duplicateParameterNames(ruleName, duplicates, source) {
  return createError("Duplicate parameter names in rule " + ruleName + ": " + duplicates.join(", "), source);
}
function invalidParameter(ruleName, expr) {
  return createError("Invalid parameter to rule " + ruleName + ": " + expr + " has arity " + expr.getArity() + ", but parameter expressions must have arity 1", expr.source);
}
var syntacticVsLexicalNote = "NOTE: A _syntactic rule_ is a rule whose name begins with a capital letter. " + "See https://ohmjs.org/d/svl for more details.";
function applicationOfSyntacticRuleFromLexicalContext(ruleName, applyExpr) {
  return createError("Cannot apply syntactic rule " + ruleName + " from here (inside a lexical context)", applyExpr.source);
}
function applySyntacticWithLexicalRuleApplication(applyExpr) {
  const { ruleName } = applyExpr;
  return createError(`applySyntactic is for syntactic rules, but '${ruleName}' is a lexical rule. ` + syntacticVsLexicalNote, applyExpr.source);
}
function unnecessaryExperimentalApplySyntactic(applyExpr) {
  return createError("applySyntactic is not required here (in a syntactic context)", applyExpr.source);
}
function incorrectArgumentType(expectedType, expr) {
  return createError("Incorrect argument type: expected " + expectedType, expr.source);
}
function multipleSuperSplices(expr) {
  return createError("'...' can appear at most once in a rule body", expr.source);
}
function invalidCodePoint(applyWrapper) {
  const node = applyWrapper._node;
  assert(node && node.isNonterminal() && node.ctorName === "escapeChar_unicodeCodePoint");
  const digitIntervals = applyWrapper.children.slice(1, -1).map((d) => d.source);
  const fullInterval = digitIntervals[0].coverageWith(...digitIntervals.slice(1));
  return createError(`U+${fullInterval.contents} is not a valid Unicode code point`, fullInterval);
}
function kleeneExprHasNullableOperand(kleeneExpr, applicationStack) {
  const actuals = applicationStack.length > 0 ? applicationStack[applicationStack.length - 1].args : [];
  const expr = kleeneExpr.expr.substituteParams(actuals);
  let message = "Nullable expression " + expr + " is not allowed inside '" + kleeneExpr.operator + "' (possible infinite loop)";
  if (applicationStack.length > 0) {
    const stackTrace = applicationStack.map((app) => new Apply(app.ruleName, app.args)).join(`
`);
    message += `
Application stack (most recent application last):
` + stackTrace;
  }
  return createError(message, kleeneExpr.expr.source);
}
function inconsistentArity(ruleName, expected, actual, expr) {
  return createError("Rule " + ruleName + " involves an alternation which has inconsistent arity " + "(expected " + expected + ", got " + actual + ")", expr.source);
}
function multipleErrors(errors) {
  const messages = errors.map((e) => e.message);
  return createError(["Errors:"].concat(messages).join(`
- `), errors[0].interval);
}
function missingSemanticAction(ctorName, name, type, stack) {
  let stackTrace = stack.slice(0, -1).map((info) => {
    const ans = "  " + info[0].name + " > " + info[1];
    return info.length === 3 ? ans + " for '" + info[2] + "'" : ans;
  }).join(`
`);
  stackTrace += `
  ` + name + " > " + ctorName;
  let moreInfo = "";
  if (ctorName === "_iter") {
    moreInfo = [
      `
NOTE: as of Ohm v16, there is no default action for iteration nodes — see `,
      "  https://ohmjs.org/d/dsa for details."
    ].join(`
`);
  }
  const message = [
    `Missing semantic action for '${ctorName}' in ${type} '${name}'.${moreInfo}`,
    "Action stack (most recent call last):",
    stackTrace
  ].join(`
`);
  const e = createError(message);
  e.name = "missingSemanticAction";
  return e;
}
function throwErrors(errors) {
  if (errors.length === 1) {
    throw errors[0];
  }
  if (errors.length > 1) {
    throw multipleErrors(errors);
  }
}

// ../lidl-core/node_modules/ohm-js/src/util.js
function padNumbersToEqualLength(arr) {
  let maxLen = 0;
  const strings = arr.map((n) => {
    const str = n.toString();
    maxLen = Math.max(maxLen, str.length);
    return str;
  });
  return strings.map((s) => padLeft(s, maxLen));
}
function strcpy(dest, src, offset) {
  const origDestLen = dest.length;
  const start = dest.slice(0, offset);
  const end2 = dest.slice(offset + src.length);
  return (start + src + end2).substr(0, origDestLen);
}
function lineAndColumnToMessage(...ranges) {
  const lineAndCol = this;
  const { offset } = lineAndCol;
  const { repeatStr: repeatStr2 } = exports_common;
  const sb = new StringBuffer;
  sb.append("Line " + lineAndCol.lineNum + ", col " + lineAndCol.colNum + `:
`);
  const lineNumbers = padNumbersToEqualLength([
    lineAndCol.prevLine == null ? 0 : lineAndCol.lineNum - 1,
    lineAndCol.lineNum,
    lineAndCol.nextLine == null ? 0 : lineAndCol.lineNum + 1
  ]);
  const appendLine = (num, content, prefix) => {
    sb.append(prefix + lineNumbers[num] + " | " + content + `
`);
  };
  if (lineAndCol.prevLine != null) {
    appendLine(0, lineAndCol.prevLine, "  ");
  }
  appendLine(1, lineAndCol.line, "> ");
  const lineLen = lineAndCol.line.length;
  let indicationLine = repeatStr2(" ", lineLen + 1);
  for (let i = 0;i < ranges.length; ++i) {
    let startIdx = ranges[i][0];
    let endIdx = ranges[i][1];
    assert(startIdx >= 0 && startIdx <= endIdx, "range start must be >= 0 and <= end");
    const lineStartOffset = offset - lineAndCol.colNum + 1;
    startIdx = Math.max(0, startIdx - lineStartOffset);
    endIdx = Math.min(endIdx - lineStartOffset, lineLen);
    indicationLine = strcpy(indicationLine, repeatStr2("~", endIdx - startIdx), startIdx);
  }
  const gutterWidth = 2 + lineNumbers[1].length + 3;
  sb.append(repeatStr2(" ", gutterWidth));
  indicationLine = strcpy(indicationLine, "^", lineAndCol.colNum - 1);
  sb.append(indicationLine.replace(/ +$/, "") + `
`);
  if (lineAndCol.nextLine != null) {
    appendLine(2, lineAndCol.nextLine, "  ");
  }
  return sb.contents();
}
var builtInRulesCallbacks = [];
function awaitBuiltInRules(cb) {
  builtInRulesCallbacks.push(cb);
}
function announceBuiltInRules(grammar) {
  builtInRulesCallbacks.forEach((cb) => {
    cb(grammar);
  });
  builtInRulesCallbacks = null;
}
function getLineAndColumn(str, offset) {
  let lineNum = 1;
  let colNum = 1;
  let currOffset = 0;
  let lineStartOffset = 0;
  let nextLine = null;
  let prevLine = null;
  let prevLineStartOffset = -1;
  while (currOffset < offset) {
    const c = str.charAt(currOffset++);
    if (c === `
`) {
      lineNum++;
      colNum = 1;
      prevLineStartOffset = lineStartOffset;
      lineStartOffset = currOffset;
    } else if (c !== "\r") {
      colNum++;
    }
  }
  let lineEndOffset = str.indexOf(`
`, lineStartOffset);
  if (lineEndOffset === -1) {
    lineEndOffset = str.length;
  } else {
    const nextLineEndOffset = str.indexOf(`
`, lineEndOffset + 1);
    nextLine = nextLineEndOffset === -1 ? str.slice(lineEndOffset) : str.slice(lineEndOffset, nextLineEndOffset);
    nextLine = nextLine.replace(/^\r?\n/, "").replace(/\r$/, "");
  }
  if (prevLineStartOffset >= 0) {
    prevLine = str.slice(prevLineStartOffset, lineStartOffset).replace(/\r?\n$/, "");
  }
  const line = str.slice(lineStartOffset, lineEndOffset).replace(/\r$/, "");
  return {
    offset,
    lineNum,
    colNum,
    line,
    prevLine,
    nextLine,
    toString: lineAndColumnToMessage
  };
}
function getLineAndColumnMessage(str, offset, ...ranges) {
  return getLineAndColumn(str, offset).toString(...ranges);
}
var uniqueId = (() => {
  let idCounter = 0;
  return (prefix) => "" + prefix + idCounter++;
})();

// ../lidl-core/node_modules/ohm-js/src/Interval.js
class Interval {
  constructor(sourceString, startIdx, endIdx) {
    Object.defineProperty(this, "_sourceString", {
      value: sourceString,
      configurable: false,
      enumerable: false,
      writable: false
    });
    this.startIdx = startIdx;
    this.endIdx = endIdx;
  }
  get sourceString() {
    return this._sourceString;
  }
  get contents() {
    if (this._contents === undefined) {
      this._contents = this.sourceString.slice(this.startIdx, this.endIdx);
    }
    return this._contents;
  }
  get length() {
    return this.endIdx - this.startIdx;
  }
  coverageWith(...intervals) {
    return Interval.coverage(...intervals, this);
  }
  collapsedLeft() {
    return new Interval(this.sourceString, this.startIdx, this.startIdx);
  }
  collapsedRight() {
    return new Interval(this.sourceString, this.endIdx, this.endIdx);
  }
  getLineAndColumn() {
    return getLineAndColumn(this.sourceString, this.startIdx);
  }
  getLineAndColumnMessage() {
    const range = [this.startIdx, this.endIdx];
    return getLineAndColumnMessage(this.sourceString, this.startIdx, range);
  }
  minus(that) {
    if (this.sourceString !== that.sourceString) {
      throw intervalSourcesDontMatch();
    } else if (this.startIdx === that.startIdx && this.endIdx === that.endIdx) {
      return [];
    } else if (this.startIdx < that.startIdx && that.endIdx < this.endIdx) {
      return [
        new Interval(this.sourceString, this.startIdx, that.startIdx),
        new Interval(this.sourceString, that.endIdx, this.endIdx)
      ];
    } else if (this.startIdx < that.endIdx && that.endIdx < this.endIdx) {
      return [new Interval(this.sourceString, that.endIdx, this.endIdx)];
    } else if (this.startIdx < that.startIdx && that.startIdx < this.endIdx) {
      return [new Interval(this.sourceString, this.startIdx, that.startIdx)];
    } else {
      return [this];
    }
  }
  relativeTo(that) {
    if (this.sourceString !== that.sourceString) {
      throw intervalSourcesDontMatch();
    }
    assert(this.startIdx >= that.startIdx && this.endIdx <= that.endIdx, "other interval does not cover this one");
    return new Interval(this.sourceString, this.startIdx - that.startIdx, this.endIdx - that.startIdx);
  }
  trimmed() {
    const { contents } = this;
    const startIdx = this.startIdx + contents.match(/^\s*/)[0].length;
    const endIdx = this.endIdx - contents.match(/\s*$/)[0].length;
    return new Interval(this.sourceString, startIdx, endIdx);
  }
  subInterval(offset, len) {
    const newStartIdx = this.startIdx + offset;
    return new Interval(this.sourceString, newStartIdx, newStartIdx + len);
  }
}
Interval.coverage = function(firstInterval, ...intervals) {
  let { startIdx, endIdx } = firstInterval;
  for (const interval of intervals) {
    if (interval.sourceString !== firstInterval.sourceString) {
      throw intervalSourcesDontMatch();
    } else {
      startIdx = Math.min(startIdx, interval.startIdx);
      endIdx = Math.max(endIdx, interval.endIdx);
    }
  }
  return new Interval(firstInterval.sourceString, startIdx, endIdx);
};

// ../lidl-core/node_modules/ohm-js/src/InputStream.js
var MAX_CHAR_CODE = 65535;
var MAX_CODE_POINT = 1114111;

class InputStream {
  constructor(source) {
    this.source = source;
    this.pos = 0;
    this.examinedLength = 0;
  }
  atEnd() {
    const ans = this.pos >= this.source.length;
    this.examinedLength = Math.max(this.examinedLength, this.pos + 1);
    return ans;
  }
  next() {
    const ans = this.source[this.pos++];
    this.examinedLength = Math.max(this.examinedLength, this.pos);
    return ans;
  }
  nextCharCode() {
    const nextChar = this.next();
    return nextChar && nextChar.charCodeAt(0);
  }
  nextCodePoint() {
    const cp = this.source.slice(this.pos++).codePointAt(0);
    if (cp > MAX_CHAR_CODE) {
      this.pos += 1;
    }
    this.examinedLength = Math.max(this.examinedLength, this.pos);
    return cp;
  }
  matchString(s, optIgnoreCase) {
    let idx;
    if (optIgnoreCase) {
      for (idx = 0;idx < s.length; idx++) {
        const actual = this.next();
        const expected = s[idx];
        if (actual == null || actual.toUpperCase() !== expected.toUpperCase()) {
          return false;
        }
      }
      return true;
    }
    for (idx = 0;idx < s.length; idx++) {
      if (this.next() !== s[idx]) {
        return false;
      }
    }
    return true;
  }
  sourceSlice(startIdx, endIdx) {
    return this.source.slice(startIdx, endIdx);
  }
  interval(startIdx, optEndIdx) {
    return new Interval(this.source, startIdx, optEndIdx ? optEndIdx : this.pos);
  }
}

// ../lidl-core/node_modules/ohm-js/src/MatchResult.js
class MatchResult {
  constructor(matcher, input, startExpr, cst, cstOffset, rightmostFailurePosition, optRecordedFailures) {
    this.matcher = matcher;
    this.input = input;
    this.startExpr = startExpr;
    this._cst = cst;
    this._cstOffset = cstOffset;
    this._rightmostFailurePosition = rightmostFailurePosition;
    this._rightmostFailures = optRecordedFailures;
    if (this.failed()) {
      defineLazyProperty(this, "message", function() {
        const detail = "Expected " + this.getExpectedText();
        return getLineAndColumnMessage(this.input, this.getRightmostFailurePosition()) + detail;
      });
      defineLazyProperty(this, "shortMessage", function() {
        const detail = "expected " + this.getExpectedText();
        const errorInfo = getLineAndColumn(this.input, this.getRightmostFailurePosition());
        return "Line " + errorInfo.lineNum + ", col " + errorInfo.colNum + ": " + detail;
      });
    }
  }
  succeeded() {
    return !!this._cst;
  }
  failed() {
    return !this.succeeded();
  }
  getRightmostFailurePosition() {
    return this._rightmostFailurePosition;
  }
  getRightmostFailures() {
    if (!this._rightmostFailures) {
      this.matcher.setInput(this.input);
      const matchResultWithFailures = this.matcher._match(this.startExpr, {
        tracing: false,
        positionToRecordFailures: this.getRightmostFailurePosition()
      });
      this._rightmostFailures = matchResultWithFailures.getRightmostFailures();
    }
    return this._rightmostFailures;
  }
  toString() {
    return this.succeeded() ? "[match succeeded]" : "[match failed at position " + this.getRightmostFailurePosition() + "]";
  }
  getExpectedText() {
    if (this.succeeded()) {
      throw new Error("cannot get expected text of a successful MatchResult");
    }
    const sb = new StringBuffer;
    let failures = this.getRightmostFailures();
    failures = failures.filter((failure) => !failure.isFluffy());
    for (let idx = 0;idx < failures.length; idx++) {
      if (idx > 0) {
        if (idx === failures.length - 1) {
          sb.append(failures.length > 2 ? ", or " : " or ");
        } else {
          sb.append(", ");
        }
      }
      sb.append(failures[idx].toString());
    }
    return sb.contents();
  }
  getInterval() {
    const pos = this.getRightmostFailurePosition();
    return new Interval(this.input, pos, pos);
  }
}

// ../lidl-core/node_modules/ohm-js/src/PosInfo.js
class PosInfo {
  constructor() {
    this.applicationMemoKeyStack = [];
    this.memo = {};
    this.maxExaminedLength = 0;
    this.maxRightmostFailureOffset = -1;
    this.currentLeftRecursion = undefined;
  }
  isActive(application) {
    return this.applicationMemoKeyStack.indexOf(application.toMemoKey()) >= 0;
  }
  enter(application) {
    this.applicationMemoKeyStack.push(application.toMemoKey());
  }
  exit() {
    this.applicationMemoKeyStack.pop();
  }
  startLeftRecursion(headApplication, memoRec) {
    memoRec.isLeftRecursion = true;
    memoRec.headApplication = headApplication;
    memoRec.nextLeftRecursion = this.currentLeftRecursion;
    this.currentLeftRecursion = memoRec;
    const { applicationMemoKeyStack } = this;
    const indexOfFirstInvolvedRule = applicationMemoKeyStack.indexOf(headApplication.toMemoKey()) + 1;
    const involvedApplicationMemoKeys = applicationMemoKeyStack.slice(indexOfFirstInvolvedRule);
    memoRec.isInvolved = function(applicationMemoKey) {
      return involvedApplicationMemoKeys.indexOf(applicationMemoKey) >= 0;
    };
    memoRec.updateInvolvedApplicationMemoKeys = function() {
      for (let idx = indexOfFirstInvolvedRule;idx < applicationMemoKeyStack.length; idx++) {
        const applicationMemoKey = applicationMemoKeyStack[idx];
        if (!this.isInvolved(applicationMemoKey)) {
          involvedApplicationMemoKeys.push(applicationMemoKey);
        }
      }
    };
  }
  endLeftRecursion() {
    this.currentLeftRecursion = this.currentLeftRecursion.nextLeftRecursion;
  }
  shouldUseMemoizedResult(memoRec) {
    if (!memoRec.isLeftRecursion) {
      return true;
    }
    const { applicationMemoKeyStack } = this;
    for (let idx = 0;idx < applicationMemoKeyStack.length; idx++) {
      const applicationMemoKey = applicationMemoKeyStack[idx];
      if (memoRec.isInvolved(applicationMemoKey)) {
        return false;
      }
    }
    return true;
  }
  memoize(memoKey, memoRec) {
    this.memo[memoKey] = memoRec;
    this.maxExaminedLength = Math.max(this.maxExaminedLength, memoRec.examinedLength);
    this.maxRightmostFailureOffset = Math.max(this.maxRightmostFailureOffset, memoRec.rightmostFailureOffset);
    return memoRec;
  }
  clearObsoleteEntries(pos, invalidatedIdx) {
    if (pos + this.maxExaminedLength <= invalidatedIdx) {
      return;
    }
    const { memo } = this;
    this.maxExaminedLength = 0;
    this.maxRightmostFailureOffset = -1;
    Object.keys(memo).forEach((k) => {
      const memoRec = memo[k];
      if (pos + memoRec.examinedLength > invalidatedIdx) {
        delete memo[k];
      } else {
        this.maxExaminedLength = Math.max(this.maxExaminedLength, memoRec.examinedLength);
        this.maxRightmostFailureOffset = Math.max(this.maxRightmostFailureOffset, memoRec.rightmostFailureOffset);
      }
    });
  }
}

// ../lidl-core/node_modules/ohm-js/src/Trace.js
var BALLOT_X = "✗";
var CHECK_MARK = "✓";
var DOT_OPERATOR = "⋅";
var RIGHTWARDS_DOUBLE_ARROW = "⇒";
var SYMBOL_FOR_HORIZONTAL_TABULATION = "␉";
var SYMBOL_FOR_LINE_FEED = "␊";
var SYMBOL_FOR_CARRIAGE_RETURN = "␍";
var Flags = {
  succeeded: 1 << 0,
  isRootNode: 1 << 1,
  isImplicitSpaces: 1 << 2,
  isMemoized: 1 << 3,
  isHeadOfLeftRecursion: 1 << 4,
  terminatesLR: 1 << 5
};
function spaces(n) {
  return repeat(" ", n).join("");
}
function getInputExcerpt(input, pos, len) {
  const excerpt = asEscapedString(input.slice(pos, pos + len));
  if (excerpt.length < len) {
    return excerpt + repeat(" ", len - excerpt.length).join("");
  }
  return excerpt;
}
function asEscapedString(obj) {
  if (typeof obj === "string") {
    return obj.replace(/ /g, DOT_OPERATOR).replace(/\t/g, SYMBOL_FOR_HORIZONTAL_TABULATION).replace(/\n/g, SYMBOL_FOR_LINE_FEED).replace(/\r/g, SYMBOL_FOR_CARRIAGE_RETURN);
  }
  return String(obj);
}

class Trace {
  constructor(input, pos1, pos2, expr, succeeded, bindings, optChildren) {
    this.input = input;
    this.pos = this.pos1 = pos1;
    this.pos2 = pos2;
    this.source = new Interval(input, pos1, pos2);
    this.expr = expr;
    this.bindings = bindings;
    this.children = optChildren || [];
    this.terminatingLREntry = null;
    this._flags = succeeded ? Flags.succeeded : 0;
  }
  get displayString() {
    return this.expr.toDisplayString();
  }
  clone() {
    return this.cloneWithExpr(this.expr);
  }
  cloneWithExpr(expr) {
    const ans = new Trace(this.input, this.pos, this.pos2, expr, this.succeeded, this.bindings, this.children);
    ans.isHeadOfLeftRecursion = this.isHeadOfLeftRecursion;
    ans.isImplicitSpaces = this.isImplicitSpaces;
    ans.isMemoized = this.isMemoized;
    ans.isRootNode = this.isRootNode;
    ans.terminatesLR = this.terminatesLR;
    ans.terminatingLREntry = this.terminatingLREntry;
    return ans;
  }
  recordLRTermination(ruleBodyTrace, value) {
    this.terminatingLREntry = new Trace(this.input, this.pos, this.pos2, this.expr, false, [value], [ruleBodyTrace]);
    this.terminatingLREntry.terminatesLR = true;
  }
  walk(visitorObjOrFn, optThisArg) {
    let visitor = visitorObjOrFn;
    if (typeof visitor === "function") {
      visitor = { enter: visitor };
    }
    function _walk(node, parent, depth) {
      let recurse = true;
      if (visitor.enter) {
        if (visitor.enter.call(optThisArg, node, parent, depth) === Trace.prototype.SKIP) {
          recurse = false;
        }
      }
      if (recurse) {
        node.children.forEach((child) => {
          _walk(child, node, depth + 1);
        });
        if (visitor.exit) {
          visitor.exit.call(optThisArg, node, parent, depth);
        }
      }
    }
    if (this.isRootNode) {
      this.children.forEach((c) => {
        _walk(c, null, 0);
      });
    } else {
      _walk(this, null, 0);
    }
  }
  toString() {
    const sb = new StringBuffer;
    this.walk((node, parent, depth) => {
      if (!node) {
        return this.SKIP;
      }
      const ctorName = node.expr.constructor.name;
      if (ctorName === "Alt") {
        return;
      }
      sb.append(getInputExcerpt(node.input, node.pos, 10) + spaces(depth * 2 + 1));
      sb.append((node.succeeded ? CHECK_MARK : BALLOT_X) + " " + node.displayString);
      if (node.isHeadOfLeftRecursion) {
        sb.append(" (LR)");
      }
      if (node.succeeded) {
        const contents = asEscapedString(node.source.contents);
        sb.append(" " + RIGHTWARDS_DOUBLE_ARROW + "  ");
        sb.append(typeof contents === "string" ? '"' + contents + '"' : contents);
      }
      sb.append(`
`);
    });
    return sb.contents();
  }
}
Trace.prototype.SKIP = {};
Object.keys(Flags).forEach((name) => {
  const mask = Flags[name];
  Object.defineProperty(Trace.prototype, name, {
    get() {
      return (this._flags & mask) !== 0;
    },
    set(val) {
      if (val) {
        this._flags |= mask;
      } else {
        this._flags &= ~mask;
      }
    }
  });
});

// ../lidl-core/node_modules/ohm-js/src/pexprs-allowsSkippingPrecedingSpace.js
PExpr.prototype.allowsSkippingPrecedingSpace = abstract("allowsSkippingPrecedingSpace");
any.allowsSkippingPrecedingSpace = end.allowsSkippingPrecedingSpace = Apply.prototype.allowsSkippingPrecedingSpace = Terminal.prototype.allowsSkippingPrecedingSpace = Range.prototype.allowsSkippingPrecedingSpace = UnicodeChar.prototype.allowsSkippingPrecedingSpace = function() {
  return true;
};
Alt.prototype.allowsSkippingPrecedingSpace = Iter.prototype.allowsSkippingPrecedingSpace = Lex.prototype.allowsSkippingPrecedingSpace = Lookahead.prototype.allowsSkippingPrecedingSpace = Not.prototype.allowsSkippingPrecedingSpace = Param.prototype.allowsSkippingPrecedingSpace = Seq.prototype.allowsSkippingPrecedingSpace = function() {
  return false;
};

// ../lidl-core/node_modules/ohm-js/src/pexprs-assertAllApplicationsAreValid.js
var BuiltInRules;
awaitBuiltInRules((g) => {
  BuiltInRules = g;
});
var lexifyCount;
PExpr.prototype.assertAllApplicationsAreValid = function(ruleName, grammar) {
  lexifyCount = 0;
  this._assertAllApplicationsAreValid(ruleName, grammar);
};
PExpr.prototype._assertAllApplicationsAreValid = abstract("_assertAllApplicationsAreValid");
any._assertAllApplicationsAreValid = end._assertAllApplicationsAreValid = Terminal.prototype._assertAllApplicationsAreValid = Range.prototype._assertAllApplicationsAreValid = Param.prototype._assertAllApplicationsAreValid = UnicodeChar.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {};
Lex.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
  lexifyCount++;
  this.expr._assertAllApplicationsAreValid(ruleName, grammar);
  lexifyCount--;
};
Alt.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
  for (let idx = 0;idx < this.terms.length; idx++) {
    this.terms[idx]._assertAllApplicationsAreValid(ruleName, grammar);
  }
};
Seq.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
  for (let idx = 0;idx < this.factors.length; idx++) {
    this.factors[idx]._assertAllApplicationsAreValid(ruleName, grammar);
  }
};
Iter.prototype._assertAllApplicationsAreValid = Not.prototype._assertAllApplicationsAreValid = Lookahead.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
  this.expr._assertAllApplicationsAreValid(ruleName, grammar);
};
Apply.prototype._assertAllApplicationsAreValid = function(ruleName, grammar, skipSyntacticCheck = false) {
  const ruleInfo = grammar.rules[this.ruleName];
  const isContextSyntactic = isSyntactic(ruleName) && lexifyCount === 0;
  if (!ruleInfo) {
    throw undeclaredRule(this.ruleName, grammar.name, this.source);
  }
  if (!skipSyntacticCheck && isSyntactic(this.ruleName) && !isContextSyntactic) {
    throw applicationOfSyntacticRuleFromLexicalContext(this.ruleName, this);
  }
  const actual = this.args.length;
  const expected = ruleInfo.formals.length;
  if (actual !== expected) {
    throw wrongNumberOfArguments(this.ruleName, expected, actual, this.source);
  }
  const isBuiltInApplySyntactic = BuiltInRules && ruleInfo === BuiltInRules.rules.applySyntactic;
  const isBuiltInCaseInsensitive = BuiltInRules && ruleInfo === BuiltInRules.rules.caseInsensitive;
  if (isBuiltInCaseInsensitive) {
    if (!(this.args[0] instanceof Terminal)) {
      throw incorrectArgumentType('a Terminal (e.g. "abc")', this.args[0]);
    }
  }
  if (isBuiltInApplySyntactic) {
    const arg = this.args[0];
    if (!(arg instanceof Apply)) {
      throw incorrectArgumentType("a syntactic rule application", arg);
    }
    if (!isSyntactic(arg.ruleName)) {
      throw applySyntacticWithLexicalRuleApplication(arg);
    }
    if (isContextSyntactic) {
      throw unnecessaryExperimentalApplySyntactic(this);
    }
  }
  this.args.forEach((arg) => {
    arg._assertAllApplicationsAreValid(ruleName, grammar, isBuiltInApplySyntactic);
    if (arg.getArity() !== 1) {
      throw invalidParameter(this.ruleName, arg);
    }
  });
};

// ../lidl-core/node_modules/ohm-js/src/pexprs-assertChoicesHaveUniformArity.js
PExpr.prototype.assertChoicesHaveUniformArity = abstract("assertChoicesHaveUniformArity");
any.assertChoicesHaveUniformArity = end.assertChoicesHaveUniformArity = Terminal.prototype.assertChoicesHaveUniformArity = Range.prototype.assertChoicesHaveUniformArity = Param.prototype.assertChoicesHaveUniformArity = Lex.prototype.assertChoicesHaveUniformArity = UnicodeChar.prototype.assertChoicesHaveUniformArity = function(ruleName) {};
Alt.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  if (this.terms.length === 0) {
    return;
  }
  const arity = this.terms[0].getArity();
  for (let idx = 0;idx < this.terms.length; idx++) {
    const term = this.terms[idx];
    term.assertChoicesHaveUniformArity();
    const otherArity = term.getArity();
    if (arity !== otherArity) {
      throw inconsistentArity(ruleName, arity, otherArity, term);
    }
  }
};
Extend.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  const actualArity = this.terms[0].getArity();
  const expectedArity = this.terms[1].getArity();
  if (actualArity !== expectedArity) {
    throw inconsistentArity(ruleName, expectedArity, actualArity, this.terms[0]);
  }
};
Seq.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  for (let idx = 0;idx < this.factors.length; idx++) {
    this.factors[idx].assertChoicesHaveUniformArity(ruleName);
  }
};
Iter.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  this.expr.assertChoicesHaveUniformArity(ruleName);
};
Not.prototype.assertChoicesHaveUniformArity = function(ruleName) {};
Lookahead.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  this.expr.assertChoicesHaveUniformArity(ruleName);
};
Apply.prototype.assertChoicesHaveUniformArity = function(ruleName) {};

// ../lidl-core/node_modules/ohm-js/src/pexprs-assertIteratedExprsAreNotNullable.js
PExpr.prototype.assertIteratedExprsAreNotNullable = abstract("assertIteratedExprsAreNotNullable");
any.assertIteratedExprsAreNotNullable = end.assertIteratedExprsAreNotNullable = Terminal.prototype.assertIteratedExprsAreNotNullable = Range.prototype.assertIteratedExprsAreNotNullable = Param.prototype.assertIteratedExprsAreNotNullable = UnicodeChar.prototype.assertIteratedExprsAreNotNullable = function(grammar) {};
Alt.prototype.assertIteratedExprsAreNotNullable = function(grammar) {
  for (let idx = 0;idx < this.terms.length; idx++) {
    this.terms[idx].assertIteratedExprsAreNotNullable(grammar);
  }
};
Seq.prototype.assertIteratedExprsAreNotNullable = function(grammar) {
  for (let idx = 0;idx < this.factors.length; idx++) {
    this.factors[idx].assertIteratedExprsAreNotNullable(grammar);
  }
};
Iter.prototype.assertIteratedExprsAreNotNullable = function(grammar) {
  this.expr.assertIteratedExprsAreNotNullable(grammar);
  if (this.expr.isNullable(grammar)) {
    throw kleeneExprHasNullableOperand(this, []);
  }
};
Opt.prototype.assertIteratedExprsAreNotNullable = Not.prototype.assertIteratedExprsAreNotNullable = Lookahead.prototype.assertIteratedExprsAreNotNullable = Lex.prototype.assertIteratedExprsAreNotNullable = function(grammar) {
  this.expr.assertIteratedExprsAreNotNullable(grammar);
};
Apply.prototype.assertIteratedExprsAreNotNullable = function(grammar) {
  this.args.forEach((arg) => {
    arg.assertIteratedExprsAreNotNullable(grammar);
  });
};

// ../lidl-core/node_modules/ohm-js/src/nodes.js
class Node {
  constructor(matchLength) {
    this.matchLength = matchLength;
  }
  get ctorName() {
    throw new Error("subclass responsibility");
  }
  numChildren() {
    return this.children ? this.children.length : 0;
  }
  childAt(idx) {
    if (this.children) {
      return this.children[idx];
    }
  }
  indexOfChild(arg) {
    return this.children.indexOf(arg);
  }
  hasChildren() {
    return this.numChildren() > 0;
  }
  hasNoChildren() {
    return !this.hasChildren();
  }
  onlyChild() {
    if (this.numChildren() !== 1) {
      throw new Error("cannot get only child of a node of type " + this.ctorName + " (it has " + this.numChildren() + " children)");
    } else {
      return this.firstChild();
    }
  }
  firstChild() {
    if (this.hasNoChildren()) {
      throw new Error("cannot get first child of a " + this.ctorName + " node, which has no children");
    } else {
      return this.childAt(0);
    }
  }
  lastChild() {
    if (this.hasNoChildren()) {
      throw new Error("cannot get last child of a " + this.ctorName + " node, which has no children");
    } else {
      return this.childAt(this.numChildren() - 1);
    }
  }
  childBefore(child) {
    const childIdx = this.indexOfChild(child);
    if (childIdx < 0) {
      throw new Error("Node.childBefore() called w/ an argument that is not a child");
    } else if (childIdx === 0) {
      throw new Error("cannot get child before first child");
    } else {
      return this.childAt(childIdx - 1);
    }
  }
  childAfter(child) {
    const childIdx = this.indexOfChild(child);
    if (childIdx < 0) {
      throw new Error("Node.childAfter() called w/ an argument that is not a child");
    } else if (childIdx === this.numChildren() - 1) {
      throw new Error("cannot get child after last child");
    } else {
      return this.childAt(childIdx + 1);
    }
  }
  isTerminal() {
    return false;
  }
  isNonterminal() {
    return false;
  }
  isIteration() {
    return false;
  }
  isOptional() {
    return false;
  }
}

class TerminalNode extends Node {
  get ctorName() {
    return "_terminal";
  }
  isTerminal() {
    return true;
  }
  get primitiveValue() {
    throw new Error("The `primitiveValue` property was removed in Ohm v17.");
  }
}

class NonterminalNode extends Node {
  constructor(ruleName, children, childOffsets, matchLength) {
    super(matchLength);
    this.ruleName = ruleName;
    this.children = children;
    this.childOffsets = childOffsets;
  }
  get ctorName() {
    return this.ruleName;
  }
  isNonterminal() {
    return true;
  }
  isLexical() {
    return isLexical(this.ctorName);
  }
  isSyntactic() {
    return isSyntactic(this.ctorName);
  }
}

class IterationNode extends Node {
  constructor(children, childOffsets, matchLength, isOptional) {
    super(matchLength);
    this.children = children;
    this.childOffsets = childOffsets;
    this.optional = isOptional;
  }
  get ctorName() {
    return "_iter";
  }
  isIteration() {
    return true;
  }
  isOptional() {
    return this.optional;
  }
}

// ../lidl-core/node_modules/ohm-js/src/pexprs-eval.js
PExpr.prototype.eval = abstract("eval");
any.eval = function(state) {
  const { inputStream } = state;
  const origPos = inputStream.pos;
  const cp = inputStream.nextCodePoint();
  if (cp !== undefined) {
    state.pushBinding(new TerminalNode(String.fromCodePoint(cp).length), origPos);
    return true;
  } else {
    state.processFailure(origPos, this);
    return false;
  }
};
end.eval = function(state) {
  const { inputStream } = state;
  const origPos = inputStream.pos;
  if (inputStream.atEnd()) {
    state.pushBinding(new TerminalNode(0), origPos);
    return true;
  } else {
    state.processFailure(origPos, this);
    return false;
  }
};
Terminal.prototype.eval = function(state) {
  const { inputStream } = state;
  const origPos = inputStream.pos;
  if (!inputStream.matchString(this.obj)) {
    state.processFailure(origPos, this);
    return false;
  } else {
    state.pushBinding(new TerminalNode(this.obj.length), origPos);
    return true;
  }
};
Range.prototype.eval = function(state) {
  const { inputStream } = state;
  const origPos = inputStream.pos;
  const cp = this.matchCodePoint ? inputStream.nextCodePoint() : inputStream.nextCharCode();
  if (cp !== undefined && this.from.codePointAt(0) <= cp && cp <= this.to.codePointAt(0)) {
    state.pushBinding(new TerminalNode(String.fromCodePoint(cp).length), origPos);
    return true;
  } else {
    state.processFailure(origPos, this);
    return false;
  }
};
Param.prototype.eval = function(state) {
  return state.eval(state.currentApplication().args[this.index]);
};
Lex.prototype.eval = function(state) {
  state.enterLexifiedContext();
  const ans = state.eval(this.expr);
  state.exitLexifiedContext();
  return ans;
};
Alt.prototype.eval = function(state) {
  for (let idx = 0;idx < this.terms.length; idx++) {
    if (state.eval(this.terms[idx])) {
      return true;
    }
  }
  return false;
};
Seq.prototype.eval = function(state) {
  for (let idx = 0;idx < this.factors.length; idx++) {
    const factor = this.factors[idx];
    if (!state.eval(factor)) {
      return false;
    }
  }
  return true;
};
Iter.prototype.eval = function(state) {
  const { inputStream } = state;
  const origPos = inputStream.pos;
  const arity = this.getArity();
  const cols = [];
  const colOffsets = [];
  while (cols.length < arity) {
    cols.push([]);
    colOffsets.push([]);
  }
  let numMatches = 0;
  let prevPos = origPos;
  let idx;
  while (numMatches < this.maxNumMatches && state.eval(this.expr)) {
    if (inputStream.pos === prevPos) {
      throw kleeneExprHasNullableOperand(this, state._applicationStack);
    }
    prevPos = inputStream.pos;
    numMatches++;
    const row = state._bindings.splice(state._bindings.length - arity, arity);
    const rowOffsets = state._bindingOffsets.splice(state._bindingOffsets.length - arity, arity);
    for (idx = 0;idx < row.length; idx++) {
      cols[idx].push(row[idx]);
      colOffsets[idx].push(rowOffsets[idx]);
    }
  }
  if (numMatches < this.minNumMatches) {
    return false;
  }
  let offset = state.posToOffset(origPos);
  let matchLength = 0;
  if (numMatches > 0) {
    const lastCol = cols[arity - 1];
    const lastColOffsets = colOffsets[arity - 1];
    const endOffset = lastColOffsets[lastColOffsets.length - 1] + lastCol[lastCol.length - 1].matchLength;
    offset = colOffsets[0][0];
    matchLength = endOffset - offset;
  }
  const isOptional = this instanceof Opt;
  for (idx = 0;idx < cols.length; idx++) {
    state._bindings.push(new IterationNode(cols[idx], colOffsets[idx], matchLength, isOptional));
    state._bindingOffsets.push(offset);
  }
  return true;
};
Not.prototype.eval = function(state) {
  const { inputStream } = state;
  const origPos = inputStream.pos;
  state.pushFailuresInfo();
  const ans = state.eval(this.expr);
  state.popFailuresInfo();
  if (ans) {
    state.processFailure(origPos, this);
    return false;
  }
  inputStream.pos = origPos;
  return true;
};
Lookahead.prototype.eval = function(state) {
  const { inputStream } = state;
  const origPos = inputStream.pos;
  if (state.eval(this.expr)) {
    inputStream.pos = origPos;
    return true;
  } else {
    return false;
  }
};
Apply.prototype.eval = function(state) {
  const caller = state.currentApplication();
  const actuals = caller ? caller.args : [];
  const app = this.substituteParams(actuals);
  const posInfo = state.getCurrentPosInfo();
  if (posInfo.isActive(app)) {
    return app.handleCycle(state);
  }
  const memoKey = app.toMemoKey();
  const memoRec = posInfo.memo[memoKey];
  if (memoRec && posInfo.shouldUseMemoizedResult(memoRec)) {
    if (state.hasNecessaryInfo(memoRec)) {
      return state.useMemoizedResult(state.inputStream.pos, memoRec);
    }
    delete posInfo.memo[memoKey];
  }
  return app.reallyEval(state);
};
Apply.prototype.handleCycle = function(state) {
  const posInfo = state.getCurrentPosInfo();
  const { currentLeftRecursion } = posInfo;
  const memoKey = this.toMemoKey();
  let memoRec = posInfo.memo[memoKey];
  if (currentLeftRecursion && currentLeftRecursion.headApplication.toMemoKey() === memoKey) {
    memoRec.updateInvolvedApplicationMemoKeys();
  } else if (!memoRec) {
    memoRec = posInfo.memoize(memoKey, {
      matchLength: 0,
      examinedLength: 0,
      value: false,
      rightmostFailureOffset: -1
    });
    posInfo.startLeftRecursion(this, memoRec);
  }
  return state.useMemoizedResult(state.inputStream.pos, memoRec);
};
Apply.prototype.reallyEval = function(state) {
  const { inputStream } = state;
  const origPos = inputStream.pos;
  const origPosInfo = state.getCurrentPosInfo();
  const ruleInfo = state.grammar.rules[this.ruleName];
  const { body } = ruleInfo;
  const { description } = ruleInfo;
  state.enterApplication(origPosInfo, this);
  if (description) {
    state.pushFailuresInfo();
  }
  const origInputStreamExaminedLength = inputStream.examinedLength;
  inputStream.examinedLength = 0;
  let value = this.evalOnce(body, state);
  const currentLR = origPosInfo.currentLeftRecursion;
  const memoKey = this.toMemoKey();
  const isHeadOfLeftRecursion = currentLR && currentLR.headApplication.toMemoKey() === memoKey;
  let memoRec;
  if (state.doNotMemoize) {
    state.doNotMemoize = false;
  } else if (isHeadOfLeftRecursion) {
    value = this.growSeedResult(body, state, origPos, currentLR, value);
    origPosInfo.endLeftRecursion();
    memoRec = currentLR;
    memoRec.examinedLength = inputStream.examinedLength - origPos;
    memoRec.rightmostFailureOffset = state._getRightmostFailureOffset();
    origPosInfo.memoize(memoKey, memoRec);
  } else if (!currentLR || !currentLR.isInvolved(memoKey)) {
    memoRec = origPosInfo.memoize(memoKey, {
      matchLength: inputStream.pos - origPos,
      examinedLength: inputStream.examinedLength - origPos,
      value,
      failuresAtRightmostPosition: state.cloneRecordedFailures(),
      rightmostFailureOffset: state._getRightmostFailureOffset()
    });
  }
  const succeeded = !!value;
  if (description) {
    state.popFailuresInfo();
    if (!succeeded) {
      state.processFailure(origPos, this);
    }
    if (memoRec) {
      memoRec.failuresAtRightmostPosition = state.cloneRecordedFailures();
      memoRec.rightmostFailureOffset = state._getRightmostFailureOffset();
    }
  }
  if (state.isTracing() && memoRec) {
    const entry = state.getTraceEntry(origPos, this, succeeded, succeeded ? [value] : []);
    if (isHeadOfLeftRecursion) {
      assert(entry.terminatingLREntry != null || !succeeded);
      entry.isHeadOfLeftRecursion = true;
    }
    memoRec.traceEntry = entry;
  }
  inputStream.examinedLength = Math.max(inputStream.examinedLength, origInputStreamExaminedLength);
  state.exitApplication(origPosInfo, value);
  return succeeded;
};
Apply.prototype.evalOnce = function(expr, state) {
  const { inputStream } = state;
  const origPos = inputStream.pos;
  if (state.eval(expr)) {
    const arity = expr.getArity();
    const bindings = state._bindings.splice(state._bindings.length - arity, arity);
    const offsets = state._bindingOffsets.splice(state._bindingOffsets.length - arity, arity);
    const matchLength = inputStream.pos - origPos;
    return new NonterminalNode(this.ruleName, bindings, offsets, matchLength);
  } else {
    return false;
  }
};
Apply.prototype.growSeedResult = function(body, state, origPos, lrMemoRec, newValue) {
  if (!newValue) {
    return false;
  }
  const { inputStream } = state;
  while (true) {
    lrMemoRec.matchLength = inputStream.pos - origPos;
    lrMemoRec.value = newValue;
    lrMemoRec.failuresAtRightmostPosition = state.cloneRecordedFailures();
    if (state.isTracing()) {
      const seedTrace = state.trace[state.trace.length - 1];
      lrMemoRec.traceEntry = new Trace(state.input, origPos, inputStream.pos, this, true, [newValue], [seedTrace.clone()]);
    }
    inputStream.pos = origPos;
    newValue = this.evalOnce(body, state);
    if (inputStream.pos - origPos <= lrMemoRec.matchLength) {
      break;
    }
    if (state.isTracing()) {
      state.trace.splice(-2, 1);
    }
  }
  if (state.isTracing()) {
    lrMemoRec.traceEntry.recordLRTermination(state.trace.pop(), newValue);
  }
  inputStream.pos = origPos + lrMemoRec.matchLength;
  return lrMemoRec.value;
};
UnicodeChar.prototype.eval = function(state) {
  const { inputStream } = state;
  const origPos = inputStream.pos;
  const cp = inputStream.nextCodePoint();
  if (cp !== undefined && cp <= MAX_CODE_POINT) {
    const ch = String.fromCodePoint(cp);
    if (this.pattern.test(ch)) {
      state.pushBinding(new TerminalNode(ch.length), origPos);
      return true;
    }
  }
  state.processFailure(origPos, this);
  return false;
};

// ../lidl-core/node_modules/ohm-js/src/pexprs-getArity.js
PExpr.prototype.getArity = abstract("getArity");
any.getArity = end.getArity = Terminal.prototype.getArity = Range.prototype.getArity = Param.prototype.getArity = Apply.prototype.getArity = UnicodeChar.prototype.getArity = function() {
  return 1;
};
Alt.prototype.getArity = function() {
  return this.terms.length === 0 ? 0 : this.terms[0].getArity();
};
Seq.prototype.getArity = function() {
  let arity = 0;
  for (let idx = 0;idx < this.factors.length; idx++) {
    arity += this.factors[idx].getArity();
  }
  return arity;
};
Iter.prototype.getArity = function() {
  return this.expr.getArity();
};
Not.prototype.getArity = function() {
  return 0;
};
Lookahead.prototype.getArity = Lex.prototype.getArity = function() {
  return this.expr.getArity();
};

// ../lidl-core/node_modules/ohm-js/src/pexprs-outputRecipe.js
function getMetaInfo(expr, grammarInterval) {
  const metaInfo = {};
  if (expr.source && grammarInterval) {
    const adjusted = expr.source.relativeTo(grammarInterval);
    metaInfo.sourceInterval = [adjusted.startIdx, adjusted.endIdx];
  }
  return metaInfo;
}
PExpr.prototype.outputRecipe = abstract("outputRecipe");
any.outputRecipe = function(formals, grammarInterval) {
  return ["any", getMetaInfo(this, grammarInterval)];
};
end.outputRecipe = function(formals, grammarInterval) {
  return ["end", getMetaInfo(this, grammarInterval)];
};
Terminal.prototype.outputRecipe = function(formals, grammarInterval) {
  return ["terminal", getMetaInfo(this, grammarInterval), this.obj];
};
Range.prototype.outputRecipe = function(formals, grammarInterval) {
  return ["range", getMetaInfo(this, grammarInterval), this.from, this.to];
};
Param.prototype.outputRecipe = function(formals, grammarInterval) {
  return ["param", getMetaInfo(this, grammarInterval), this.index];
};
Alt.prototype.outputRecipe = function(formals, grammarInterval) {
  return ["alt", getMetaInfo(this, grammarInterval)].concat(this.terms.map((term) => term.outputRecipe(formals, grammarInterval)));
};
Extend.prototype.outputRecipe = function(formals, grammarInterval) {
  const extension = this.terms[0];
  return extension.outputRecipe(formals, grammarInterval);
};
Splice.prototype.outputRecipe = function(formals, grammarInterval) {
  const beforeTerms = this.terms.slice(0, this.expansionPos);
  const afterTerms = this.terms.slice(this.expansionPos + 1);
  return [
    "splice",
    getMetaInfo(this, grammarInterval),
    beforeTerms.map((term) => term.outputRecipe(formals, grammarInterval)),
    afterTerms.map((term) => term.outputRecipe(formals, grammarInterval))
  ];
};
Seq.prototype.outputRecipe = function(formals, grammarInterval) {
  return ["seq", getMetaInfo(this, grammarInterval)].concat(this.factors.map((factor) => factor.outputRecipe(formals, grammarInterval)));
};
Star.prototype.outputRecipe = Plus.prototype.outputRecipe = Opt.prototype.outputRecipe = Not.prototype.outputRecipe = Lookahead.prototype.outputRecipe = Lex.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    this.constructor.name.toLowerCase(),
    getMetaInfo(this, grammarInterval),
    this.expr.outputRecipe(formals, grammarInterval)
  ];
};
Apply.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    "app",
    getMetaInfo(this, grammarInterval),
    this.ruleName,
    this.args.map((arg) => arg.outputRecipe(formals, grammarInterval))
  ];
};
UnicodeChar.prototype.outputRecipe = function(formals, grammarInterval) {
  return ["unicodeChar", getMetaInfo(this, grammarInterval), this.categoryOrProp];
};

// ../lidl-core/node_modules/ohm-js/src/pexprs-introduceParams.js
PExpr.prototype.introduceParams = abstract("introduceParams");
any.introduceParams = end.introduceParams = Terminal.prototype.introduceParams = Range.prototype.introduceParams = Param.prototype.introduceParams = UnicodeChar.prototype.introduceParams = function(formals) {
  return this;
};
Alt.prototype.introduceParams = function(formals) {
  this.terms.forEach((term, idx, terms) => {
    terms[idx] = term.introduceParams(formals);
  });
  return this;
};
Seq.prototype.introduceParams = function(formals) {
  this.factors.forEach((factor, idx, factors) => {
    factors[idx] = factor.introduceParams(formals);
  });
  return this;
};
Iter.prototype.introduceParams = Not.prototype.introduceParams = Lookahead.prototype.introduceParams = Lex.prototype.introduceParams = function(formals) {
  this.expr = this.expr.introduceParams(formals);
  return this;
};
Apply.prototype.introduceParams = function(formals) {
  const index = formals.indexOf(this.ruleName);
  if (index >= 0) {
    if (this.args.length > 0) {
      throw new Error("Parameterized rules cannot be passed as arguments to another rule.");
    }
    return new Param(index).withSource(this.source);
  } else {
    this.args.forEach((arg, idx, args) => {
      args[idx] = arg.introduceParams(formals);
    });
    return this;
  }
};

// ../lidl-core/node_modules/ohm-js/src/pexprs-isNullable.js
PExpr.prototype.isNullable = function(grammar) {
  return this._isNullable(grammar, Object.create(null));
};
PExpr.prototype._isNullable = abstract("_isNullable");
any._isNullable = Range.prototype._isNullable = Param.prototype._isNullable = Plus.prototype._isNullable = UnicodeChar.prototype._isNullable = function(grammar, memo) {
  return false;
};
end._isNullable = function(grammar, memo) {
  return true;
};
Terminal.prototype._isNullable = function(grammar, memo) {
  if (typeof this.obj === "string") {
    return this.obj === "";
  } else {
    return false;
  }
};
Alt.prototype._isNullable = function(grammar, memo) {
  return this.terms.length === 0 || this.terms.some((term) => term._isNullable(grammar, memo));
};
Seq.prototype._isNullable = function(grammar, memo) {
  return this.factors.every((factor) => factor._isNullable(grammar, memo));
};
Star.prototype._isNullable = Opt.prototype._isNullable = Not.prototype._isNullable = Lookahead.prototype._isNullable = function(grammar, memo) {
  return true;
};
Lex.prototype._isNullable = function(grammar, memo) {
  return this.expr._isNullable(grammar, memo);
};
Apply.prototype._isNullable = function(grammar, memo) {
  const key = this.toMemoKey();
  if (!Object.prototype.hasOwnProperty.call(memo, key)) {
    const { body } = grammar.rules[this.ruleName];
    const inlined = body.substituteParams(this.args);
    memo[key] = false;
    memo[key] = inlined._isNullable(grammar, memo);
  }
  return memo[key];
};

// ../lidl-core/node_modules/ohm-js/src/pexprs-substituteParams.js
PExpr.prototype.substituteParams = abstract("substituteParams");
any.substituteParams = end.substituteParams = Terminal.prototype.substituteParams = Range.prototype.substituteParams = UnicodeChar.prototype.substituteParams = function(actuals) {
  return this;
};
Param.prototype.substituteParams = function(actuals) {
  return checkNotNull(actuals[this.index]);
};
Alt.prototype.substituteParams = function(actuals) {
  return new Alt(this.terms.map((term) => term.substituteParams(actuals)));
};
Seq.prototype.substituteParams = function(actuals) {
  return new Seq(this.factors.map((factor) => factor.substituteParams(actuals)));
};
Iter.prototype.substituteParams = Not.prototype.substituteParams = Lookahead.prototype.substituteParams = Lex.prototype.substituteParams = function(actuals) {
  return new this.constructor(this.expr.substituteParams(actuals));
};
Apply.prototype.substituteParams = function(actuals) {
  if (this.args.length === 0) {
    return this;
  } else {
    const args = this.args.map((arg) => arg.substituteParams(actuals));
    return new Apply(this.ruleName, args);
  }
};

// ../lidl-core/node_modules/ohm-js/src/pexprs-toArgumentNameList.js
function isRestrictedJSIdentifier(str) {
  return /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(str);
}
function resolveDuplicatedNames(argumentNameList) {
  const count = Object.create(null);
  argumentNameList.forEach((argName) => {
    count[argName] = (count[argName] || 0) + 1;
  });
  Object.keys(count).forEach((dupArgName) => {
    if (count[dupArgName] <= 1) {
      return;
    }
    let subscript = 1;
    argumentNameList.forEach((argName, idx) => {
      if (argName === dupArgName) {
        argumentNameList[idx] = argName + "_" + subscript++;
      }
    });
  });
}
PExpr.prototype.toArgumentNameList = abstract("toArgumentNameList");
any.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  return ["any"];
};
end.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  return ["end"];
};
Terminal.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  if (typeof this.obj === "string" && /^[_a-zA-Z0-9]+$/.test(this.obj)) {
    return ["_" + this.obj];
  } else {
    return ["$" + firstArgIndex];
  }
};
Range.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  let argName = this.from + "_to_" + this.to;
  if (!isRestrictedJSIdentifier(argName)) {
    argName = "_" + argName;
  }
  if (!isRestrictedJSIdentifier(argName)) {
    argName = "$" + firstArgIndex;
  }
  return [argName];
};
Alt.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  const termArgNameLists = this.terms.map((term) => term.toArgumentNameList(firstArgIndex, true));
  const argumentNameList = [];
  const numArgs = termArgNameLists[0].length;
  for (let colIdx = 0;colIdx < numArgs; colIdx++) {
    const col = [];
    for (let rowIdx = 0;rowIdx < this.terms.length; rowIdx++) {
      col.push(termArgNameLists[rowIdx][colIdx]);
    }
    const uniqueNames = copyWithoutDuplicates(col);
    argumentNameList.push(uniqueNames.join("_or_"));
  }
  if (!noDupCheck) {
    resolveDuplicatedNames(argumentNameList);
  }
  return argumentNameList;
};
Seq.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  let argumentNameList = [];
  this.factors.forEach((factor) => {
    const factorArgumentNameList = factor.toArgumentNameList(firstArgIndex, true);
    argumentNameList = argumentNameList.concat(factorArgumentNameList);
    firstArgIndex += factorArgumentNameList.length;
  });
  if (!noDupCheck) {
    resolveDuplicatedNames(argumentNameList);
  }
  return argumentNameList;
};
Iter.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  const argumentNameList = this.expr.toArgumentNameList(firstArgIndex, noDupCheck).map((exprArgumentString) => exprArgumentString[exprArgumentString.length - 1] === "s" ? exprArgumentString + "es" : exprArgumentString + "s");
  if (!noDupCheck) {
    resolveDuplicatedNames(argumentNameList);
  }
  return argumentNameList;
};
Opt.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  return this.expr.toArgumentNameList(firstArgIndex, noDupCheck).map((argName) => {
    return "opt" + argName[0].toUpperCase() + argName.slice(1);
  });
};
Not.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  return [];
};
Lookahead.prototype.toArgumentNameList = Lex.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  return this.expr.toArgumentNameList(firstArgIndex, noDupCheck);
};
Apply.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  return [this.ruleName];
};
UnicodeChar.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  return ["$" + firstArgIndex];
};
Param.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  return ["param" + this.index];
};

// ../lidl-core/node_modules/ohm-js/src/pexprs-toDisplayString.js
PExpr.prototype.toDisplayString = abstract("toDisplayString");
Alt.prototype.toDisplayString = Seq.prototype.toDisplayString = function() {
  if (this.source) {
    return this.source.trimmed().contents;
  }
  return "[" + this.constructor.name + "]";
};
any.toDisplayString = end.toDisplayString = Iter.prototype.toDisplayString = Not.prototype.toDisplayString = Lookahead.prototype.toDisplayString = Lex.prototype.toDisplayString = Terminal.prototype.toDisplayString = Range.prototype.toDisplayString = Param.prototype.toDisplayString = function() {
  return this.toString();
};
Apply.prototype.toDisplayString = function() {
  if (this.args.length > 0) {
    const ps = this.args.map((arg) => arg.toDisplayString());
    return this.ruleName + "<" + ps.join(",") + ">";
  } else {
    return this.ruleName;
  }
};
UnicodeChar.prototype.toDisplayString = function() {
  return "Unicode [" + this.categoryOrProp + "] character";
};

// ../lidl-core/node_modules/ohm-js/src/Failure.js
function isValidType(type) {
  return type === "description" || type === "string" || type === "code";
}

class Failure {
  constructor(pexpr, text, type) {
    if (!isValidType(type)) {
      throw new Error("invalid Failure type: " + type);
    }
    this.pexpr = pexpr;
    this.text = text;
    this.type = type;
    this.fluffy = false;
  }
  getPExpr() {
    return this.pexpr;
  }
  getText() {
    return this.text;
  }
  getType() {
    return this.type;
  }
  isDescription() {
    return this.type === "description";
  }
  isStringTerminal() {
    return this.type === "string";
  }
  isCode() {
    return this.type === "code";
  }
  isFluffy() {
    return this.fluffy;
  }
  makeFluffy() {
    this.fluffy = true;
  }
  clearFluffy() {
    this.fluffy = false;
  }
  subsumes(that) {
    return this.getText() === that.getText() && this.type === that.type && (!this.isFluffy() || this.isFluffy() && that.isFluffy());
  }
  toString() {
    return this.type === "string" ? JSON.stringify(this.getText()) : this.getText();
  }
  clone() {
    const failure = new Failure(this.pexpr, this.text, this.type);
    if (this.isFluffy()) {
      failure.makeFluffy();
    }
    return failure;
  }
  toKey() {
    return this.toString() + "#" + this.type;
  }
}

// ../lidl-core/node_modules/ohm-js/src/pexprs-toFailure.js
PExpr.prototype.toFailure = abstract("toFailure");
any.toFailure = function(grammar) {
  return new Failure(this, "any object", "description");
};
end.toFailure = function(grammar) {
  return new Failure(this, "end of input", "description");
};
Terminal.prototype.toFailure = function(grammar) {
  return new Failure(this, this.obj, "string");
};
Range.prototype.toFailure = function(grammar) {
  return new Failure(this, JSON.stringify(this.from) + ".." + JSON.stringify(this.to), "code");
};
Not.prototype.toFailure = function(grammar) {
  const description = this.expr === any ? "nothing" : "not " + this.expr.toFailure(grammar);
  return new Failure(this, description, "description");
};
Lookahead.prototype.toFailure = function(grammar) {
  return this.expr.toFailure(grammar);
};
Apply.prototype.toFailure = function(grammar) {
  let { description } = grammar.rules[this.ruleName];
  if (!description) {
    const article = /^[aeiouAEIOU]/.test(this.ruleName) ? "an" : "a";
    description = article + " " + this.ruleName;
  }
  return new Failure(this, description, "description");
};
UnicodeChar.prototype.toFailure = function(grammar) {
  return new Failure(this, "a Unicode [" + this.categoryOrProp + "] character", "description");
};
Alt.prototype.toFailure = function(grammar) {
  const fs = this.terms.map((t) => t.toFailure(grammar));
  const description = "(" + fs.join(" or ") + ")";
  return new Failure(this, description, "description");
};
Seq.prototype.toFailure = function(grammar) {
  const fs = this.factors.map((f) => f.toFailure(grammar));
  const description = "(" + fs.join(" ") + ")";
  return new Failure(this, description, "description");
};
Iter.prototype.toFailure = function(grammar) {
  const description = "(" + this.expr.toFailure(grammar) + this.operator + ")";
  return new Failure(this, description, "description");
};

// ../lidl-core/node_modules/ohm-js/src/pexprs-toString.js
PExpr.prototype.toString = abstract("toString");
any.toString = function() {
  return "any";
};
end.toString = function() {
  return "end";
};
Terminal.prototype.toString = function() {
  return JSON.stringify(this.obj);
};
Range.prototype.toString = function() {
  return JSON.stringify(this.from) + ".." + JSON.stringify(this.to);
};
Param.prototype.toString = function() {
  return "$" + this.index;
};
Lex.prototype.toString = function() {
  return "#(" + this.expr.toString() + ")";
};
Alt.prototype.toString = function() {
  return this.terms.length === 1 ? this.terms[0].toString() : "(" + this.terms.map((term) => term.toString()).join(" | ") + ")";
};
Seq.prototype.toString = function() {
  return this.factors.length === 1 ? this.factors[0].toString() : "(" + this.factors.map((factor) => factor.toString()).join(" ") + ")";
};
Iter.prototype.toString = function() {
  return this.expr + this.operator;
};
Not.prototype.toString = function() {
  return "~" + this.expr;
};
Lookahead.prototype.toString = function() {
  return "&" + this.expr;
};
Apply.prototype.toString = function() {
  if (this.args.length > 0) {
    const ps = this.args.map((arg) => arg.toString());
    return this.ruleName + "<" + ps.join(",") + ">";
  } else {
    return this.ruleName;
  }
};
UnicodeChar.prototype.toString = function() {
  return "\\p{" + this.categoryOrProp + "}";
};
// ../lidl-core/node_modules/ohm-js/src/CaseInsensitiveTerminal.js
class CaseInsensitiveTerminal extends PExpr {
  constructor(param) {
    super();
    this.obj = param;
  }
  _getString(state) {
    const terminal = state.currentApplication().args[this.obj.index];
    assert(terminal instanceof Terminal, "expected a Terminal expression");
    return terminal.obj;
  }
  allowsSkippingPrecedingSpace() {
    return true;
  }
  eval(state) {
    const { inputStream } = state;
    const origPos = inputStream.pos;
    const matchStr = this._getString(state);
    if (!inputStream.matchString(matchStr, true)) {
      state.processFailure(origPos, this);
      return false;
    } else {
      state.pushBinding(new TerminalNode(matchStr.length), origPos);
      return true;
    }
  }
  getArity() {
    return 1;
  }
  substituteParams(actuals) {
    return new CaseInsensitiveTerminal(this.obj.substituteParams(actuals));
  }
  toDisplayString() {
    return this.obj.toDisplayString() + " (case-insensitive)";
  }
  toFailure(grammar) {
    return new Failure(this, this.obj.toFailure(grammar) + " (case-insensitive)", "description");
  }
  _isNullable(grammar, memo) {
    return this.obj._isNullable(grammar, memo);
  }
}
// ../lidl-core/node_modules/ohm-js/src/MatchState.js
var builtInApplySyntacticBody;
awaitBuiltInRules((builtInRules) => {
  builtInApplySyntacticBody = builtInRules.rules.applySyntactic.body;
});
var applySpaces = new Apply("spaces");

class MatchState {
  constructor(matcher, startExpr, optPositionToRecordFailures) {
    this.matcher = matcher;
    this.startExpr = startExpr;
    this.grammar = matcher.grammar;
    this.input = matcher.getInput();
    this.inputStream = new InputStream(this.input);
    this.memoTable = matcher._memoTable;
    this.userData = undefined;
    this.doNotMemoize = false;
    this._bindings = [];
    this._bindingOffsets = [];
    this._applicationStack = [];
    this._posStack = [0];
    this.inLexifiedContextStack = [false];
    this.rightmostFailurePosition = -1;
    this._rightmostFailurePositionStack = [];
    this._recordedFailuresStack = [];
    if (optPositionToRecordFailures !== undefined) {
      this.positionToRecordFailures = optPositionToRecordFailures;
      this.recordedFailures = Object.create(null);
    }
  }
  posToOffset(pos) {
    return pos - this._posStack[this._posStack.length - 1];
  }
  enterApplication(posInfo, app) {
    this._posStack.push(this.inputStream.pos);
    this._applicationStack.push(app);
    this.inLexifiedContextStack.push(false);
    posInfo.enter(app);
    this._rightmostFailurePositionStack.push(this.rightmostFailurePosition);
    this.rightmostFailurePosition = -1;
  }
  exitApplication(posInfo, optNode) {
    const origPos = this._posStack.pop();
    this._applicationStack.pop();
    this.inLexifiedContextStack.pop();
    posInfo.exit();
    this.rightmostFailurePosition = Math.max(this.rightmostFailurePosition, this._rightmostFailurePositionStack.pop());
    if (optNode) {
      this.pushBinding(optNode, origPos);
    }
  }
  enterLexifiedContext() {
    this.inLexifiedContextStack.push(true);
  }
  exitLexifiedContext() {
    this.inLexifiedContextStack.pop();
  }
  currentApplication() {
    return this._applicationStack[this._applicationStack.length - 1];
  }
  inSyntacticContext() {
    const currentApplication = this.currentApplication();
    if (currentApplication) {
      return currentApplication.isSyntactic() && !this.inLexifiedContext();
    } else {
      return this.startExpr.factors[0].isSyntactic();
    }
  }
  inLexifiedContext() {
    return this.inLexifiedContextStack[this.inLexifiedContextStack.length - 1];
  }
  skipSpaces() {
    this.pushFailuresInfo();
    this.eval(applySpaces);
    this.popBinding();
    this.popFailuresInfo();
    return this.inputStream.pos;
  }
  skipSpacesIfInSyntacticContext() {
    return this.inSyntacticContext() ? this.skipSpaces() : this.inputStream.pos;
  }
  maybeSkipSpacesBefore(expr) {
    if (expr.allowsSkippingPrecedingSpace() && expr !== applySpaces) {
      return this.skipSpacesIfInSyntacticContext();
    } else {
      return this.inputStream.pos;
    }
  }
  pushBinding(node, origPos) {
    this._bindings.push(node);
    this._bindingOffsets.push(this.posToOffset(origPos));
  }
  popBinding() {
    this._bindings.pop();
    this._bindingOffsets.pop();
  }
  numBindings() {
    return this._bindings.length;
  }
  truncateBindings(newLength) {
    while (this._bindings.length > newLength) {
      this.popBinding();
    }
  }
  getCurrentPosInfo() {
    return this.getPosInfo(this.inputStream.pos);
  }
  getPosInfo(pos) {
    let posInfo = this.memoTable[pos];
    if (!posInfo) {
      posInfo = this.memoTable[pos] = new PosInfo;
    }
    return posInfo;
  }
  processFailure(pos, expr) {
    this.rightmostFailurePosition = Math.max(this.rightmostFailurePosition, pos);
    if (this.recordedFailures && pos === this.positionToRecordFailures) {
      const app = this.currentApplication();
      if (app) {
        expr = expr.substituteParams(app.args);
      } else {}
      this.recordFailure(expr.toFailure(this.grammar), false);
    }
  }
  recordFailure(failure, shouldCloneIfNew) {
    const key = failure.toKey();
    if (!this.recordedFailures[key]) {
      this.recordedFailures[key] = shouldCloneIfNew ? failure.clone() : failure;
    } else if (this.recordedFailures[key].isFluffy() && !failure.isFluffy()) {
      this.recordedFailures[key].clearFluffy();
    }
  }
  recordFailures(failures, shouldCloneIfNew) {
    Object.keys(failures).forEach((key) => {
      this.recordFailure(failures[key], shouldCloneIfNew);
    });
  }
  cloneRecordedFailures() {
    if (!this.recordedFailures) {
      return;
    }
    const ans = Object.create(null);
    Object.keys(this.recordedFailures).forEach((key) => {
      ans[key] = this.recordedFailures[key].clone();
    });
    return ans;
  }
  getRightmostFailurePosition() {
    return this.rightmostFailurePosition;
  }
  _getRightmostFailureOffset() {
    return this.rightmostFailurePosition >= 0 ? this.posToOffset(this.rightmostFailurePosition) : -1;
  }
  getMemoizedTraceEntry(pos, expr) {
    const posInfo = this.memoTable[pos];
    if (posInfo && expr instanceof Apply) {
      const memoRec = posInfo.memo[expr.toMemoKey()];
      if (memoRec && memoRec.traceEntry) {
        const entry = memoRec.traceEntry.cloneWithExpr(expr);
        entry.isMemoized = true;
        return entry;
      }
    }
    return null;
  }
  getTraceEntry(pos, expr, succeeded, bindings) {
    if (expr instanceof Apply) {
      const app = this.currentApplication();
      const actuals = app ? app.args : [];
      expr = expr.substituteParams(actuals);
    }
    return this.getMemoizedTraceEntry(pos, expr) || new Trace(this.input, pos, this.inputStream.pos, expr, succeeded, bindings, this.trace);
  }
  isTracing() {
    return !!this.trace;
  }
  hasNecessaryInfo(memoRec) {
    if (this.trace && !memoRec.traceEntry) {
      return false;
    }
    if (this.recordedFailures && this.inputStream.pos + memoRec.rightmostFailureOffset === this.positionToRecordFailures) {
      return !!memoRec.failuresAtRightmostPosition;
    }
    return true;
  }
  useMemoizedResult(origPos, memoRec) {
    if (this.trace) {
      this.trace.push(memoRec.traceEntry);
    }
    const memoRecRightmostFailurePosition = this.inputStream.pos + memoRec.rightmostFailureOffset;
    this.rightmostFailurePosition = Math.max(this.rightmostFailurePosition, memoRecRightmostFailurePosition);
    if (this.recordedFailures && this.positionToRecordFailures === memoRecRightmostFailurePosition && memoRec.failuresAtRightmostPosition) {
      this.recordFailures(memoRec.failuresAtRightmostPosition, true);
    }
    this.inputStream.examinedLength = Math.max(this.inputStream.examinedLength, memoRec.examinedLength + origPos);
    if (memoRec.value) {
      this.inputStream.pos += memoRec.matchLength;
      this.pushBinding(memoRec.value, origPos);
      return true;
    }
    return false;
  }
  eval(expr) {
    const { inputStream } = this;
    const origNumBindings = this._bindings.length;
    const origUserData = this.userData;
    let origRecordedFailures;
    if (this.recordedFailures) {
      origRecordedFailures = this.recordedFailures;
      this.recordedFailures = Object.create(null);
    }
    const origPos = inputStream.pos;
    const memoPos = this.maybeSkipSpacesBefore(expr);
    let origTrace;
    if (this.trace) {
      origTrace = this.trace;
      this.trace = [];
    }
    const ans = expr.eval(this);
    if (this.trace) {
      const bindings = this._bindings.slice(origNumBindings);
      const traceEntry = this.getTraceEntry(memoPos, expr, ans, bindings);
      traceEntry.isImplicitSpaces = expr === applySpaces;
      traceEntry.isRootNode = expr === this.startExpr;
      origTrace.push(traceEntry);
      this.trace = origTrace;
    }
    if (ans) {
      if (this.recordedFailures && inputStream.pos === this.positionToRecordFailures) {
        Object.keys(this.recordedFailures).forEach((key) => {
          this.recordedFailures[key].makeFluffy();
        });
      }
    } else {
      inputStream.pos = origPos;
      this.truncateBindings(origNumBindings);
      this.userData = origUserData;
    }
    if (this.recordedFailures) {
      this.recordFailures(origRecordedFailures, false);
    }
    if (expr === builtInApplySyntacticBody) {
      this.skipSpaces();
    }
    return ans;
  }
  getMatchResult() {
    this.grammar._setUpMatchState(this);
    this.eval(this.startExpr);
    let rightmostFailures;
    if (this.recordedFailures) {
      rightmostFailures = Object.keys(this.recordedFailures).map((key) => this.recordedFailures[key]);
    }
    const cst = this._bindings[0];
    if (cst) {
      cst.grammar = this.grammar;
    }
    return new MatchResult(this.matcher, this.input, this.startExpr, cst, this._bindingOffsets[0], this.rightmostFailurePosition, rightmostFailures);
  }
  getTrace() {
    this.trace = [];
    const matchResult = this.getMatchResult();
    const rootTrace = this.trace[this.trace.length - 1];
    rootTrace.result = matchResult;
    return rootTrace;
  }
  pushFailuresInfo() {
    this._rightmostFailurePositionStack.push(this.rightmostFailurePosition);
    this._recordedFailuresStack.push(this.recordedFailures);
  }
  popFailuresInfo() {
    this.rightmostFailurePosition = this._rightmostFailurePositionStack.pop();
    this.recordedFailures = this._recordedFailuresStack.pop();
  }
}

// ../lidl-core/node_modules/ohm-js/src/Matcher.js
class Matcher {
  constructor(grammar) {
    this.grammar = grammar;
    this._memoTable = [];
    this._input = "";
    this._isMemoTableStale = false;
  }
  _resetMemoTable() {
    this._memoTable = [];
    this._isMemoTableStale = false;
  }
  getInput() {
    return this._input;
  }
  setInput(str) {
    if (this._input !== str) {
      this.replaceInputRange(0, this._input.length, str);
    }
    return this;
  }
  replaceInputRange(startIdx, endIdx, str) {
    const prevInput = this._input;
    const memoTable = this._memoTable;
    if (startIdx < 0 || startIdx > prevInput.length || endIdx < 0 || endIdx > prevInput.length || startIdx > endIdx) {
      throw new Error("Invalid indices: " + startIdx + " and " + endIdx);
    }
    this._input = prevInput.slice(0, startIdx) + str + prevInput.slice(endIdx);
    if (this._input !== prevInput && memoTable.length > 0) {
      this._isMemoTableStale = true;
    }
    const restOfMemoTable = memoTable.slice(endIdx);
    memoTable.length = startIdx;
    for (let idx = 0;idx < str.length; idx++) {
      memoTable.push(undefined);
    }
    for (const posInfo of restOfMemoTable) {
      memoTable.push(posInfo);
    }
    for (let pos = 0;pos < startIdx; pos++) {
      const posInfo = memoTable[pos];
      if (posInfo) {
        posInfo.clearObsoleteEntries(pos, startIdx);
      }
    }
    return this;
  }
  match(optStartApplicationStr, options = { incremental: true }) {
    return this._match(this._getStartExpr(optStartApplicationStr), {
      incremental: options.incremental,
      tracing: false
    });
  }
  trace(optStartApplicationStr, options = { incremental: true }) {
    return this._match(this._getStartExpr(optStartApplicationStr), {
      incremental: options.incremental,
      tracing: true
    });
  }
  _match(startExpr, options = {}) {
    const opts = {
      tracing: false,
      incremental: true,
      positionToRecordFailures: undefined,
      ...options
    };
    if (!opts.incremental) {
      this._resetMemoTable();
    } else if (this._isMemoTableStale && !this.grammar.supportsIncrementalParsing) {
      throw grammarDoesNotSupportIncrementalParsing(this.grammar);
    }
    const state = new MatchState(this, startExpr, opts.positionToRecordFailures);
    return opts.tracing ? state.getTrace() : state.getMatchResult();
  }
  _getStartExpr(optStartApplicationStr) {
    const applicationStr = optStartApplicationStr || this.grammar.defaultStartRule;
    if (!applicationStr) {
      throw new Error("Missing start rule argument -- the grammar has no default start rule.");
    }
    const startApp = this.grammar.parseApplication(applicationStr);
    return new Seq([startApp, end]);
  }
}

// ../lidl-core/node_modules/ohm-js/src/Semantics.js
var globalActionStack = [];
var hasOwnProperty = (x, prop) => Object.prototype.hasOwnProperty.call(x, prop);

class Wrapper {
  constructor(node, sourceInterval, baseInterval) {
    this._node = node;
    this.source = sourceInterval;
    this._baseInterval = baseInterval;
    if (node.isNonterminal()) {
      assert(sourceInterval === baseInterval);
    }
    this._childWrappers = [];
  }
  _forgetMemoizedResultFor(attributeName) {
    delete this._node[this._semantics.attributeKeys[attributeName]];
    this.children.forEach((child) => {
      child._forgetMemoizedResultFor(attributeName);
    });
  }
  child(idx) {
    if (!(0 <= idx && idx < this._node.numChildren())) {
      return;
    }
    let childWrapper = this._childWrappers[idx];
    if (!childWrapper) {
      const childNode = this._node.childAt(idx);
      const offset = this._node.childOffsets[idx];
      const source = this._baseInterval.subInterval(offset, childNode.matchLength);
      const base = childNode.isNonterminal() ? source : this._baseInterval;
      childWrapper = this._childWrappers[idx] = this._semantics.wrap(childNode, source, base);
    }
    return childWrapper;
  }
  _children() {
    for (let idx = 0;idx < this._node.numChildren(); idx++) {
      this.child(idx);
    }
    return this._childWrappers;
  }
  isIteration() {
    return this._node.isIteration();
  }
  isTerminal() {
    return this._node.isTerminal();
  }
  isNonterminal() {
    return this._node.isNonterminal();
  }
  isSyntactic() {
    return this.isNonterminal() && this._node.isSyntactic();
  }
  isLexical() {
    return this.isNonterminal() && this._node.isLexical();
  }
  isOptional() {
    return this._node.isOptional();
  }
  iteration(optChildWrappers) {
    const childWrappers = optChildWrappers || [];
    const childNodes = childWrappers.map((c) => c._node);
    const iter = new IterationNode(childNodes, [], -1, false);
    const wrapper = this._semantics.wrap(iter, null, null);
    wrapper._childWrappers = childWrappers;
    return wrapper;
  }
  get children() {
    return this._children();
  }
  get ctorName() {
    return this._node.ctorName;
  }
  get numChildren() {
    return this._node.numChildren();
  }
  get sourceString() {
    return this.source.contents;
  }
}

class Semantics {
  constructor(grammar, superSemantics) {
    const self2 = this;
    this.grammar = grammar;
    this.checkedActionDicts = false;
    this.Wrapper = class extends (superSemantics ? superSemantics.Wrapper : Wrapper) {
      constructor(node, sourceInterval, baseInterval) {
        super(node, sourceInterval, baseInterval);
        self2.checkActionDictsIfHaventAlready();
        this._semantics = self2;
      }
      toString() {
        return "[semantics wrapper for " + self2.grammar.name + "]";
      }
    };
    this.super = superSemantics;
    if (superSemantics) {
      if (!(grammar.equals(this.super.grammar) || grammar._inheritsFrom(this.super.grammar))) {
        throw new Error("Cannot extend a semantics for grammar '" + this.super.grammar.name + "' for use with grammar '" + grammar.name + "' (not a sub-grammar)");
      }
      this.operations = Object.create(this.super.operations);
      this.attributes = Object.create(this.super.attributes);
      this.attributeKeys = Object.create(null);
      for (const attributeName in this.attributes) {
        Object.defineProperty(this.attributeKeys, attributeName, {
          value: uniqueId(attributeName)
        });
      }
    } else {
      this.operations = Object.create(null);
      this.attributes = Object.create(null);
      this.attributeKeys = Object.create(null);
    }
  }
  toString() {
    return "[semantics for " + this.grammar.name + "]";
  }
  checkActionDictsIfHaventAlready() {
    if (!this.checkedActionDicts) {
      this.checkActionDicts();
      this.checkedActionDicts = true;
    }
  }
  checkActionDicts() {
    let name;
    for (name in this.operations) {
      this.operations[name].checkActionDict(this.grammar);
    }
    for (name in this.attributes) {
      this.attributes[name].checkActionDict(this.grammar);
    }
  }
  toRecipe(semanticsOnly) {
    function hasSuperSemantics(s) {
      return s.super !== Semantics.BuiltInSemantics._getSemantics();
    }
    let str = `(function(g) {
`;
    if (hasSuperSemantics(this)) {
      str += "  var semantics = " + this.super.toRecipe(true) + "(g";
      const superSemanticsGrammar = this.super.grammar;
      let relatedGrammar = this.grammar;
      while (relatedGrammar !== superSemanticsGrammar) {
        str += ".superGrammar";
        relatedGrammar = relatedGrammar.superGrammar;
      }
      str += `);
`;
      str += "  return g.extendSemantics(semantics)";
    } else {
      str += "  return g.createSemantics()";
    }
    ["Operation", "Attribute"].forEach((type) => {
      const semanticOperations = this[type.toLowerCase() + "s"];
      Object.keys(semanticOperations).forEach((name) => {
        const { actionDict, formals, builtInDefault } = semanticOperations[name];
        let signature = name;
        if (formals.length > 0) {
          signature += "(" + formals.join(", ") + ")";
        }
        let method;
        if (hasSuperSemantics(this) && this.super[type.toLowerCase() + "s"][name]) {
          method = "extend" + type;
        } else {
          method = "add" + type;
        }
        str += `
    .` + method + "(" + JSON.stringify(signature) + ", {";
        const srcArray = [];
        Object.keys(actionDict).forEach((actionName) => {
          if (actionDict[actionName] !== builtInDefault) {
            let source = actionDict[actionName].toString().trim();
            source = source.replace(/^.*\(/, "function(");
            srcArray.push(`
      ` + JSON.stringify(actionName) + ": " + source);
          }
        });
        str += srcArray.join(",") + `
    })`;
      });
    });
    str += `;
  })`;
    if (!semanticsOnly) {
      str = `(function() {
` + "  var grammar = this.fromRecipe(" + this.grammar.toRecipe() + `);
` + "  var semantics = " + str + `(grammar);
` + `  return semantics;
` + `});
`;
    }
    return str;
  }
  addOperationOrAttribute(type, signature, actionDict) {
    const typePlural = type + "s";
    const parsedNameAndFormalArgs = parseSignature(signature, type);
    const { name } = parsedNameAndFormalArgs;
    const { formals } = parsedNameAndFormalArgs;
    this.assertNewName(name, type);
    const builtInDefault = newDefaultAction(type, name, doIt);
    const realActionDict = { _default: builtInDefault };
    Object.keys(actionDict).forEach((name2) => {
      realActionDict[name2] = actionDict[name2];
    });
    const entry = type === "operation" ? new Operation(name, formals, realActionDict, builtInDefault) : new Attribute(name, realActionDict, builtInDefault);
    entry.checkActionDict(this.grammar);
    this[typePlural][name] = entry;
    function doIt(...args) {
      const thisThing = this._semantics[typePlural][name];
      if (arguments.length !== thisThing.formals.length) {
        throw new Error("Invalid number of arguments passed to " + name + " " + type + " (expected " + thisThing.formals.length + ", got " + arguments.length + ")");
      }
      const argsObj = Object.create(null);
      for (const [idx, val] of Object.entries(args)) {
        const formal = thisThing.formals[idx];
        argsObj[formal] = val;
      }
      const oldArgs = this.args;
      this.args = argsObj;
      const ans = thisThing.execute(this._semantics, this);
      this.args = oldArgs;
      return ans;
    }
    if (type === "operation") {
      this.Wrapper.prototype[name] = doIt;
      this.Wrapper.prototype[name].toString = function() {
        return "[" + name + " operation]";
      };
    } else {
      Object.defineProperty(this.Wrapper.prototype, name, {
        get: doIt,
        configurable: true
      });
      Object.defineProperty(this.attributeKeys, name, {
        value: uniqueId(name)
      });
    }
  }
  extendOperationOrAttribute(type, name, actionDict) {
    const typePlural = type + "s";
    parseSignature(name, "attribute");
    if (!(this.super && (name in this.super[typePlural]))) {
      throw new Error("Cannot extend " + type + " '" + name + "': did not inherit an " + type + " with that name");
    }
    if (hasOwnProperty(this[typePlural], name)) {
      throw new Error("Cannot extend " + type + " '" + name + "' again");
    }
    const inheritedFormals = this[typePlural][name].formals;
    const inheritedActionDict = this[typePlural][name].actionDict;
    const newActionDict = Object.create(inheritedActionDict);
    Object.keys(actionDict).forEach((name2) => {
      newActionDict[name2] = actionDict[name2];
    });
    this[typePlural][name] = type === "operation" ? new Operation(name, inheritedFormals, newActionDict) : new Attribute(name, newActionDict);
    this[typePlural][name].checkActionDict(this.grammar);
  }
  assertNewName(name, type) {
    if (hasOwnProperty(Wrapper.prototype, name)) {
      throw new Error("Cannot add " + type + " '" + name + "': that's a reserved name");
    }
    if (name in this.operations) {
      throw new Error("Cannot add " + type + " '" + name + "': an operation with that name already exists");
    }
    if (name in this.attributes) {
      throw new Error("Cannot add " + type + " '" + name + "': an attribute with that name already exists");
    }
  }
  wrap(node, source, optBaseInterval) {
    const baseInterval = optBaseInterval || source;
    return node instanceof this.Wrapper ? node : new this.Wrapper(node, source, baseInterval);
  }
}
function parseSignature(signature, type) {
  if (!Semantics.prototypeGrammar) {
    assert(signature.indexOf("(") === -1);
    return {
      name: signature,
      formals: []
    };
  }
  const r = Semantics.prototypeGrammar.match(signature, type === "operation" ? "OperationSignature" : "AttributeSignature");
  if (r.failed()) {
    throw new Error(r.message);
  }
  return Semantics.prototypeGrammarSemantics(r).parse();
}
function newDefaultAction(type, name, doIt) {
  return function(...children) {
    const thisThing = this._semantics.operations[name] || this._semantics.attributes[name];
    const args = thisThing.formals.map((formal) => this.args[formal]);
    if (!this.isIteration() && children.length === 1) {
      return doIt.apply(children[0], args);
    } else {
      throw missingSemanticAction(this.ctorName, name, type, globalActionStack);
    }
  };
}
Semantics.createSemantics = function(grammar, optSuperSemantics) {
  const s = new Semantics(grammar, optSuperSemantics !== undefined ? optSuperSemantics : Semantics.BuiltInSemantics._getSemantics());
  const proxy = function ASemantics(matchResult) {
    if (!(matchResult instanceof MatchResult)) {
      throw new TypeError("Semantics expected a MatchResult, but got " + unexpectedObjToString(matchResult));
    }
    if (matchResult.failed()) {
      throw new TypeError("cannot apply Semantics to " + matchResult.toString());
    }
    const cst = matchResult._cst;
    if (cst.grammar !== grammar) {
      throw new Error("Cannot use a MatchResult from grammar '" + cst.grammar.name + "' with a semantics for '" + grammar.name + "'");
    }
    const inputStream = new InputStream(matchResult.input);
    return s.wrap(cst, inputStream.interval(matchResult._cstOffset, matchResult.input.length));
  };
  proxy.addOperation = function(signature, actionDict) {
    s.addOperationOrAttribute("operation", signature, actionDict);
    return proxy;
  };
  proxy.extendOperation = function(name, actionDict) {
    s.extendOperationOrAttribute("operation", name, actionDict);
    return proxy;
  };
  proxy.addAttribute = function(name, actionDict) {
    s.addOperationOrAttribute("attribute", name, actionDict);
    return proxy;
  };
  proxy.extendAttribute = function(name, actionDict) {
    s.extendOperationOrAttribute("attribute", name, actionDict);
    return proxy;
  };
  proxy._getActionDict = function(operationOrAttributeName) {
    const action = s.operations[operationOrAttributeName] || s.attributes[operationOrAttributeName];
    if (!action) {
      throw new Error('"' + operationOrAttributeName + '" is not a valid operation or attribute ' + 'name in this semantics for "' + grammar.name + '"');
    }
    return action.actionDict;
  };
  proxy._remove = function(operationOrAttributeName) {
    let semantic;
    if (operationOrAttributeName in s.operations) {
      semantic = s.operations[operationOrAttributeName];
      delete s.operations[operationOrAttributeName];
    } else if (operationOrAttributeName in s.attributes) {
      semantic = s.attributes[operationOrAttributeName];
      delete s.attributes[operationOrAttributeName];
    }
    delete s.Wrapper.prototype[operationOrAttributeName];
    return semantic;
  };
  proxy.getOperationNames = function() {
    return Object.keys(s.operations);
  };
  proxy.getAttributeNames = function() {
    return Object.keys(s.attributes);
  };
  proxy.getGrammar = function() {
    return s.grammar;
  };
  proxy.toRecipe = function(semanticsOnly) {
    return s.toRecipe(semanticsOnly);
  };
  proxy.toString = s.toString.bind(s);
  proxy._getSemantics = function() {
    return s;
  };
  return proxy;
};

class Operation {
  constructor(name, formals, actionDict, builtInDefault) {
    this.name = name;
    this.formals = formals;
    this.actionDict = actionDict;
    this.builtInDefault = builtInDefault;
  }
  checkActionDict(grammar) {
    grammar._checkTopDownActionDict(this.typeName, this.name, this.actionDict);
  }
  execute(semantics, nodeWrapper) {
    try {
      const { ctorName } = nodeWrapper._node;
      let actionFn = this.actionDict[ctorName];
      if (actionFn) {
        globalActionStack.push([this, ctorName]);
        return actionFn.apply(nodeWrapper, nodeWrapper._children());
      }
      if (nodeWrapper.isNonterminal()) {
        actionFn = this.actionDict._nonterminal;
        if (actionFn) {
          globalActionStack.push([this, "_nonterminal", ctorName]);
          return actionFn.apply(nodeWrapper, nodeWrapper._children());
        }
      }
      globalActionStack.push([this, "default action", ctorName]);
      return this.actionDict._default.apply(nodeWrapper, nodeWrapper._children());
    } finally {
      globalActionStack.pop();
    }
  }
}
Operation.prototype.typeName = "operation";

class Attribute extends Operation {
  constructor(name, actionDict, builtInDefault) {
    super(name, [], actionDict, builtInDefault);
  }
  execute(semantics, nodeWrapper) {
    const node = nodeWrapper._node;
    const key = semantics.attributeKeys[this.name];
    if (!hasOwnProperty(node, key)) {
      node[key] = Operation.prototype.execute.call(this, semantics, nodeWrapper);
    }
    return node[key];
  }
}
Attribute.prototype.typeName = "attribute";

// ../lidl-core/node_modules/ohm-js/src/Grammar.js
var SPECIAL_ACTION_NAMES = ["_iter", "_terminal", "_nonterminal", "_default"];
function getSortedRuleValues(grammar) {
  return Object.keys(grammar.rules).sort().map((name) => grammar.rules[name]);
}
var jsonToJS = (str) => str.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
var ohmGrammar;
var buildGrammar;

class Grammar {
  constructor(name, superGrammar, rules, optDefaultStartRule) {
    this.name = name;
    this.superGrammar = superGrammar;
    this.rules = rules;
    if (optDefaultStartRule) {
      if (!(optDefaultStartRule in rules)) {
        throw new Error("Invalid start rule: '" + optDefaultStartRule + "' is not a rule in grammar '" + name + "'");
      }
      this.defaultStartRule = optDefaultStartRule;
    }
    this._matchStateInitializer = undefined;
    this.supportsIncrementalParsing = true;
  }
  matcher() {
    return new Matcher(this);
  }
  isBuiltIn() {
    return this === Grammar.ProtoBuiltInRules || this === Grammar.BuiltInRules;
  }
  equals(g) {
    if (this === g) {
      return true;
    }
    if (g == null || this.name !== g.name || this.defaultStartRule !== g.defaultStartRule || !(this.superGrammar === g.superGrammar || this.superGrammar.equals(g.superGrammar))) {
      return false;
    }
    const myRules = getSortedRuleValues(this);
    const otherRules = getSortedRuleValues(g);
    return myRules.length === otherRules.length && myRules.every((rule, i) => {
      return rule.description === otherRules[i].description && rule.formals.join(",") === otherRules[i].formals.join(",") && rule.body.toString() === otherRules[i].body.toString();
    });
  }
  match(input, optStartApplication) {
    const m = this.matcher();
    m.replaceInputRange(0, 0, input);
    return m.match(optStartApplication);
  }
  trace(input, optStartApplication) {
    const m = this.matcher();
    m.replaceInputRange(0, 0, input);
    return m.trace(optStartApplication);
  }
  createSemantics() {
    return Semantics.createSemantics(this);
  }
  extendSemantics(superSemantics) {
    return Semantics.createSemantics(this, superSemantics._getSemantics());
  }
  _checkTopDownActionDict(what, name, actionDict) {
    const problems = [];
    for (const k in actionDict) {
      const v = actionDict[k];
      const isSpecialAction = SPECIAL_ACTION_NAMES.includes(k);
      if (!isSpecialAction && !(k in this.rules)) {
        problems.push(`'${k}' is not a valid semantic action for '${this.name}'`);
        continue;
      }
      if (typeof v !== "function") {
        problems.push(`'${k}' must be a function in an action dictionary for '${this.name}'`);
        continue;
      }
      const actual = v.length;
      const expected = this._topDownActionArity(k);
      if (actual !== expected) {
        let details;
        if (k === "_iter" || k === "_nonterminal") {
          details = `it should use a rest parameter, e.g. \`${k}(...children) {}\`. ` + "NOTE: this is new in Ohm v16 — see https://ohmjs.org/d/ati for details.";
        } else {
          details = `expected ${expected}, got ${actual}`;
        }
        problems.push(`Semantic action '${k}' has the wrong arity: ${details}`);
      }
    }
    if (problems.length > 0) {
      const prettyProblems = problems.map((problem) => "- " + problem);
      const error = new Error([
        `Found errors in the action dictionary of the '${name}' ${what}:`,
        ...prettyProblems
      ].join(`
`));
      error.problems = problems;
      throw error;
    }
  }
  _topDownActionArity(actionName) {
    return SPECIAL_ACTION_NAMES.includes(actionName) ? 0 : this.rules[actionName].body.getArity();
  }
  _inheritsFrom(grammar) {
    let g = this.superGrammar;
    while (g) {
      if (g.equals(grammar, true)) {
        return true;
      }
      g = g.superGrammar;
    }
    return false;
  }
  toRecipe(superGrammarExpr = undefined) {
    const metaInfo = {};
    if (this.source) {
      metaInfo.source = this.source.contents;
    }
    let startRule = null;
    if (this.defaultStartRule) {
      startRule = this.defaultStartRule;
    }
    const rules = {};
    Object.keys(this.rules).forEach((ruleName) => {
      const ruleInfo = this.rules[ruleName];
      const { body } = ruleInfo;
      const isDefinition = !this.superGrammar || !this.superGrammar.rules[ruleName];
      let operation;
      if (isDefinition) {
        operation = "define";
      } else {
        operation = body instanceof Extend ? "extend" : "override";
      }
      const metaInfo2 = {};
      if (ruleInfo.source && this.source) {
        const adjusted = ruleInfo.source.relativeTo(this.source);
        metaInfo2.sourceInterval = [adjusted.startIdx, adjusted.endIdx];
      }
      const description = isDefinition ? ruleInfo.description : null;
      const bodyRecipe = body.outputRecipe(ruleInfo.formals, this.source);
      rules[ruleName] = [
        operation,
        metaInfo2,
        description,
        ruleInfo.formals,
        bodyRecipe
      ];
    });
    let superGrammarOutput = "null";
    if (superGrammarExpr) {
      superGrammarOutput = superGrammarExpr;
    } else if (this.superGrammar && !this.superGrammar.isBuiltIn()) {
      superGrammarOutput = this.superGrammar.toRecipe();
    }
    const recipeElements = [
      ...["grammar", metaInfo, this.name].map(JSON.stringify),
      superGrammarOutput,
      ...[startRule, rules].map(JSON.stringify)
    ];
    return jsonToJS(`[${recipeElements.join(",")}]`);
  }
  toOperationActionDictionaryTemplate() {
    return this._toOperationOrAttributeActionDictionaryTemplate();
  }
  toAttributeActionDictionaryTemplate() {
    return this._toOperationOrAttributeActionDictionaryTemplate();
  }
  _toOperationOrAttributeActionDictionaryTemplate() {
    const sb = new StringBuffer;
    sb.append("{");
    let first = true;
    for (const ruleName in this.rules) {
      const { body } = this.rules[ruleName];
      if (first) {
        first = false;
      } else {
        sb.append(",");
      }
      sb.append(`
`);
      sb.append("  ");
      this.addSemanticActionTemplate(ruleName, body, sb);
    }
    sb.append(`
}`);
    return sb.contents();
  }
  addSemanticActionTemplate(ruleName, body, sb) {
    sb.append(ruleName);
    sb.append(": function(");
    const arity = this._topDownActionArity(ruleName);
    sb.append(repeat("_", arity).join(", "));
    sb.append(`) {
`);
    sb.append("  }");
  }
  parseApplication(str) {
    let app;
    if (str.indexOf("<") === -1) {
      app = new Apply(str);
    } else {
      const cst = ohmGrammar.match(str, "Base_application");
      app = buildGrammar(cst, {});
    }
    if (!(app.ruleName in this.rules)) {
      throw undeclaredRule(app.ruleName, this.name);
    }
    const { formals } = this.rules[app.ruleName];
    if (formals.length !== app.args.length) {
      const { source } = this.rules[app.ruleName];
      throw wrongNumberOfParameters(app.ruleName, formals.length, app.args.length, source);
    }
    return app;
  }
  _setUpMatchState(state) {
    if (this._matchStateInitializer) {
      this._matchStateInitializer(state);
    }
  }
}
Grammar.ProtoBuiltInRules = new Grammar("ProtoBuiltInRules", undefined, {
  any: {
    body: any,
    formals: [],
    description: "any character",
    primitive: true
  },
  end: {
    body: end,
    formals: [],
    description: "end of input",
    primitive: true
  },
  caseInsensitive: {
    body: new CaseInsensitiveTerminal(new Param(0)),
    formals: ["str"],
    primitive: true
  },
  lower: {
    body: new UnicodeChar("Ll"),
    formals: [],
    description: "a lowercase letter",
    primitive: true
  },
  upper: {
    body: new UnicodeChar("Lu"),
    formals: [],
    description: "an uppercase letter",
    primitive: true
  },
  unicodeLtmo: {
    body: new UnicodeChar("Ltmo"),
    formals: [],
    description: "a Unicode character in Lt, Lm, or Lo",
    primitive: true
  },
  spaces: {
    body: new Star(new Apply("space")),
    formals: []
  },
  space: {
    body: new Range("\x00", " "),
    formals: [],
    description: "a space"
  }
});
Grammar.initApplicationParser = function(grammar, builderFn) {
  ohmGrammar = grammar;
  buildGrammar = builderFn;
};

// ../lidl-core/node_modules/ohm-js/src/GrammarDecl.js
class GrammarDecl {
  constructor(name) {
    this.name = name;
  }
  sourceInterval(startIdx, endIdx) {
    return this.source.subInterval(startIdx, endIdx - startIdx);
  }
  ensureSuperGrammar() {
    if (!this.superGrammar) {
      this.withSuperGrammar(this.name === "BuiltInRules" ? Grammar.ProtoBuiltInRules : Grammar.BuiltInRules);
    }
    return this.superGrammar;
  }
  ensureSuperGrammarRuleForOverriding(name, source) {
    const ruleInfo = this.ensureSuperGrammar().rules[name];
    if (!ruleInfo) {
      throw cannotOverrideUndeclaredRule(name, this.superGrammar.name, source);
    }
    return ruleInfo;
  }
  installOverriddenOrExtendedRule(name, formals, body, source) {
    const duplicateParameterNames2 = getDuplicates(formals);
    if (duplicateParameterNames2.length > 0) {
      throw duplicateParameterNames(name, duplicateParameterNames2, source);
    }
    const ruleInfo = this.ensureSuperGrammar().rules[name];
    const expectedFormals = ruleInfo.formals;
    const expectedNumFormals = expectedFormals ? expectedFormals.length : 0;
    if (formals.length !== expectedNumFormals) {
      throw wrongNumberOfParameters(name, expectedNumFormals, formals.length, source);
    }
    return this.install(name, formals, body, ruleInfo.description, source);
  }
  install(name, formals, body, description, source, primitive = false) {
    this.rules[name] = {
      body: body.introduceParams(formals),
      formals,
      description,
      source,
      primitive
    };
    return this;
  }
  withSuperGrammar(superGrammar) {
    if (this.superGrammar) {
      throw new Error("the super grammar of a GrammarDecl cannot be set more than once");
    }
    this.superGrammar = superGrammar;
    this.rules = Object.create(superGrammar.rules);
    if (!superGrammar.isBuiltIn()) {
      this.defaultStartRule = superGrammar.defaultStartRule;
    }
    return this;
  }
  withDefaultStartRule(ruleName) {
    this.defaultStartRule = ruleName;
    return this;
  }
  withSource(source) {
    this.source = new InputStream(source).interval(0, source.length);
    return this;
  }
  build() {
    const grammar = new Grammar(this.name, this.ensureSuperGrammar(), this.rules, this.defaultStartRule);
    grammar._matchStateInitializer = grammar.superGrammar._matchStateInitializer;
    grammar.supportsIncrementalParsing = grammar.superGrammar.supportsIncrementalParsing;
    const grammarErrors = [];
    let grammarHasInvalidApplications = false;
    Object.keys(grammar.rules).forEach((ruleName) => {
      const { body } = grammar.rules[ruleName];
      try {
        body.assertChoicesHaveUniformArity(ruleName);
      } catch (e) {
        grammarErrors.push(e);
      }
      try {
        body.assertAllApplicationsAreValid(ruleName, grammar);
      } catch (e) {
        grammarErrors.push(e);
        grammarHasInvalidApplications = true;
      }
    });
    if (!grammarHasInvalidApplications) {
      Object.keys(grammar.rules).forEach((ruleName) => {
        const { body } = grammar.rules[ruleName];
        try {
          body.assertIteratedExprsAreNotNullable(grammar, []);
        } catch (e) {
          grammarErrors.push(e);
        }
      });
    }
    if (grammarErrors.length > 0) {
      throwErrors(grammarErrors);
    }
    if (this.source) {
      grammar.source = this.source;
    }
    return grammar;
  }
  define(name, formals, body, description, source, primitive) {
    this.ensureSuperGrammar();
    if (this.superGrammar.rules[name]) {
      throw duplicateRuleDeclaration(name, this.name, this.superGrammar.name, source);
    } else if (this.rules[name]) {
      throw duplicateRuleDeclaration(name, this.name, this.name, source);
    }
    const duplicateParameterNames2 = getDuplicates(formals);
    if (duplicateParameterNames2.length > 0) {
      throw duplicateParameterNames(name, duplicateParameterNames2, source);
    }
    return this.install(name, formals, body, description, source, primitive);
  }
  override(name, formals, body, descIgnored, source) {
    this.ensureSuperGrammarRuleForOverriding(name, source);
    this.installOverriddenOrExtendedRule(name, formals, body, source);
    return this;
  }
  extend(name, formals, fragment, descIgnored, source) {
    const ruleInfo = this.ensureSuperGrammar().rules[name];
    if (!ruleInfo) {
      throw cannotExtendUndeclaredRule(name, this.superGrammar.name, source);
    }
    const body = new Extend(this.superGrammar, name, fragment);
    body.source = fragment.source;
    this.installOverriddenOrExtendedRule(name, formals, body, source);
    return this;
  }
}

// ../lidl-core/node_modules/ohm-js/src/Builder.js
class Builder {
  constructor(options) {
    this.currentDecl = null;
    this.currentRuleName = null;
    this.options = options || {};
  }
  newGrammar(name) {
    return new GrammarDecl(name);
  }
  grammar(metaInfo, name, superGrammar, defaultStartRule, rules) {
    const gDecl = new GrammarDecl(name);
    if (superGrammar) {
      gDecl.withSuperGrammar(superGrammar instanceof Grammar ? superGrammar : this.fromRecipe(superGrammar));
    }
    if (defaultStartRule) {
      gDecl.withDefaultStartRule(defaultStartRule);
    }
    if (metaInfo && metaInfo.source) {
      gDecl.withSource(metaInfo.source);
    }
    this.currentDecl = gDecl;
    Object.keys(rules).forEach((ruleName) => {
      this.currentRuleName = ruleName;
      const ruleRecipe = rules[ruleName];
      const action = ruleRecipe[0];
      const metaInfo2 = ruleRecipe[1];
      const description = ruleRecipe[2];
      const formals = ruleRecipe[3];
      const body = this.fromRecipe(ruleRecipe[4]);
      let source;
      if (gDecl.source && metaInfo2 && metaInfo2.sourceInterval) {
        source = gDecl.source.subInterval(metaInfo2.sourceInterval[0], metaInfo2.sourceInterval[1] - metaInfo2.sourceInterval[0]);
      }
      gDecl[action](ruleName, formals, body, description, source);
    });
    this.currentRuleName = this.currentDecl = null;
    return gDecl.build();
  }
  terminal(x) {
    return new Terminal(x);
  }
  range(from, to) {
    return new Range(from, to);
  }
  param(index) {
    return new Param(index);
  }
  alt(...termArgs) {
    let terms = [];
    for (let arg of termArgs) {
      if (!(arg instanceof PExpr)) {
        arg = this.fromRecipe(arg);
      }
      if (arg instanceof Alt) {
        terms = terms.concat(arg.terms);
      } else {
        terms.push(arg);
      }
    }
    return terms.length === 1 ? terms[0] : new Alt(terms);
  }
  seq(...factorArgs) {
    let factors = [];
    for (let arg of factorArgs) {
      if (!(arg instanceof PExpr)) {
        arg = this.fromRecipe(arg);
      }
      if (arg instanceof Seq) {
        factors = factors.concat(arg.factors);
      } else {
        factors.push(arg);
      }
    }
    return factors.length === 1 ? factors[0] : new Seq(factors);
  }
  star(expr) {
    if (!(expr instanceof PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new Star(expr);
  }
  plus(expr) {
    if (!(expr instanceof PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new Plus(expr);
  }
  opt(expr) {
    if (!(expr instanceof PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new Opt(expr);
  }
  not(expr) {
    if (!(expr instanceof PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new Not(expr);
  }
  lookahead(expr) {
    if (!(expr instanceof PExpr)) {
      expr = this.fromRecipe(expr);
    }
    if (this.options.eliminateLookaheads) {
      return new Not(new Not(expr));
    }
    return new Lookahead(expr);
  }
  lex(expr) {
    if (!(expr instanceof PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new Lex(expr);
  }
  app(ruleName, optParams) {
    if (optParams && optParams.length > 0) {
      optParams = optParams.map(function(param) {
        return param instanceof PExpr ? param : this.fromRecipe(param);
      }, this);
    }
    return new Apply(ruleName, optParams);
  }
  splice(beforeTerms, afterTerms) {
    return new Splice(this.currentDecl.superGrammar, this.currentRuleName, beforeTerms.map((term) => this.fromRecipe(term)), afterTerms.map((term) => this.fromRecipe(term)));
  }
  fromRecipe(recipe) {
    const args = recipe[0] === "grammar" ? recipe.slice(1) : recipe.slice(2);
    const result = this[recipe[0]](...args);
    const metaInfo = recipe[1];
    if (metaInfo) {
      if (metaInfo.sourceInterval && this.currentDecl) {
        result.withSource(this.currentDecl.sourceInterval(...metaInfo.sourceInterval));
      }
    }
    return result;
  }
}

// ../lidl-core/node_modules/ohm-js/src/makeRecipe.js
function makeRecipe(recipe) {
  if (typeof recipe === "function") {
    return recipe.call(new Builder);
  } else {
    if (typeof recipe === "string") {
      recipe = JSON.parse(recipe);
    }
    return new Builder().fromRecipe(recipe);
  }
}

// ../lidl-core/node_modules/ohm-js/dist/built-in-rules.js
var built_in_rules_default = makeRecipe(["grammar", { source: `BuiltInRules {

  alnum  (an alpha-numeric character)
    = letter
    | digit

  letter  (a letter)
    = lower
    | upper
    | unicodeLtmo

  digit  (a digit)
    = "0".."9"

  hexDigit  (a hexadecimal digit)
    = digit
    | "a".."f"
    | "A".."F"

  ListOf<elem, sep>
    = NonemptyListOf<elem, sep>
    | EmptyListOf<elem, sep>

  NonemptyListOf<elem, sep>
    = elem (sep elem)*

  EmptyListOf<elem, sep>
    = /* nothing */

  listOf<elem, sep>
    = nonemptyListOf<elem, sep>
    | emptyListOf<elem, sep>

  nonemptyListOf<elem, sep>
    = elem (sep elem)*

  emptyListOf<elem, sep>
    = /* nothing */

  // Allows a syntactic rule application within a lexical context.
  applySyntactic<app> = app
}` }, "BuiltInRules", null, null, { alnum: ["define", { sourceInterval: [18, 78] }, "an alpha-numeric character", [], ["alt", { sourceInterval: [60, 78] }, ["app", { sourceInterval: [60, 66] }, "letter", []], ["app", { sourceInterval: [73, 78] }, "digit", []]]], letter: ["define", { sourceInterval: [82, 142] }, "a letter", [], ["alt", { sourceInterval: [107, 142] }, ["app", { sourceInterval: [107, 112] }, "lower", []], ["app", { sourceInterval: [119, 124] }, "upper", []], ["app", { sourceInterval: [131, 142] }, "unicodeLtmo", []]]], digit: ["define", { sourceInterval: [146, 177] }, "a digit", [], ["range", { sourceInterval: [169, 177] }, "0", "9"]], hexDigit: ["define", { sourceInterval: [181, 254] }, "a hexadecimal digit", [], ["alt", { sourceInterval: [219, 254] }, ["app", { sourceInterval: [219, 224] }, "digit", []], ["range", { sourceInterval: [231, 239] }, "a", "f"], ["range", { sourceInterval: [246, 254] }, "A", "F"]]], ListOf: ["define", { sourceInterval: [258, 336] }, null, ["elem", "sep"], ["alt", { sourceInterval: [282, 336] }, ["app", { sourceInterval: [282, 307] }, "NonemptyListOf", [["param", { sourceInterval: [297, 301] }, 0], ["param", { sourceInterval: [303, 306] }, 1]]], ["app", { sourceInterval: [314, 336] }, "EmptyListOf", [["param", { sourceInterval: [326, 330] }, 0], ["param", { sourceInterval: [332, 335] }, 1]]]]], NonemptyListOf: ["define", { sourceInterval: [340, 388] }, null, ["elem", "sep"], ["seq", { sourceInterval: [372, 388] }, ["param", { sourceInterval: [372, 376] }, 0], ["star", { sourceInterval: [377, 388] }, ["seq", { sourceInterval: [378, 386] }, ["param", { sourceInterval: [378, 381] }, 1], ["param", { sourceInterval: [382, 386] }, 0]]]]], EmptyListOf: ["define", { sourceInterval: [392, 434] }, null, ["elem", "sep"], ["seq", { sourceInterval: [438, 438] }]], listOf: ["define", { sourceInterval: [438, 516] }, null, ["elem", "sep"], ["alt", { sourceInterval: [462, 516] }, ["app", { sourceInterval: [462, 487] }, "nonemptyListOf", [["param", { sourceInterval: [477, 481] }, 0], ["param", { sourceInterval: [483, 486] }, 1]]], ["app", { sourceInterval: [494, 516] }, "emptyListOf", [["param", { sourceInterval: [506, 510] }, 0], ["param", { sourceInterval: [512, 515] }, 1]]]]], nonemptyListOf: ["define", { sourceInterval: [520, 568] }, null, ["elem", "sep"], ["seq", { sourceInterval: [552, 568] }, ["param", { sourceInterval: [552, 556] }, 0], ["star", { sourceInterval: [557, 568] }, ["seq", { sourceInterval: [558, 566] }, ["param", { sourceInterval: [558, 561] }, 1], ["param", { sourceInterval: [562, 566] }, 0]]]]], emptyListOf: ["define", { sourceInterval: [572, 682] }, null, ["elem", "sep"], ["seq", { sourceInterval: [685, 685] }]], applySyntactic: ["define", { sourceInterval: [685, 710] }, null, ["app"], ["param", { sourceInterval: [707, 710] }, 0]] }]);

// ../lidl-core/node_modules/ohm-js/src/main-kernel.js
Grammar.BuiltInRules = built_in_rules_default;
announceBuiltInRules(Grammar.BuiltInRules);

// ../lidl-core/node_modules/ohm-js/dist/ohm-grammar.js
var ohm_grammar_default = makeRecipe(["grammar", { source: `Ohm {

  Grammars
    = Grammar*

  Grammar
    = ident SuperGrammar? "{" Rule* "}"

  SuperGrammar
    = "<:" ident

  Rule
    = ident Formals? ruleDescr? "="  RuleBody  -- define
    | ident Formals?            ":=" OverrideRuleBody  -- override
    | ident Formals?            "+=" RuleBody  -- extend

  RuleBody
    = "|"? NonemptyListOf<TopLevelTerm, "|">

  TopLevelTerm
    = Seq caseName  -- inline
    | Seq

  OverrideRuleBody
    = "|"? NonemptyListOf<OverrideTopLevelTerm, "|">

  OverrideTopLevelTerm
    = "..."  -- superSplice
    | TopLevelTerm

  Formals
    = "<" ListOf<ident, ","> ">"

  Params
    = "<" ListOf<Seq, ","> ">"

  Alt
    = NonemptyListOf<Seq, "|">

  Seq
    = Iter*

  Iter
    = Pred "*"  -- star
    | Pred "+"  -- plus
    | Pred "?"  -- opt
    | Pred

  Pred
    = "~" Lex  -- not
    | "&" Lex  -- lookahead
    | Lex

  Lex
    = "#" Base  -- lex
    | Base

  Base
    = ident Params? ~(ruleDescr? "=" | ":=" | "+=")  -- application
    | oneCharTerminal ".." oneCharTerminal           -- range
    | terminal                                       -- terminal
    | "(" Alt ")"                                    -- paren

  ruleDescr  (a rule description)
    = "(" ruleDescrText ")"

  ruleDescrText
    = (~")" any)*

  caseName
    = "--" (~"\\n" space)* name (~"\\n" space)* ("\\n" | &"}")

  name  (a name)
    = nameFirst nameRest*

  nameFirst
    = "_"
    | letter

  nameRest
    = "_"
    | alnum

  ident  (an identifier)
    = name

  terminal
    = "\\"" terminalChar* "\\""

  oneCharTerminal
    = "\\"" terminalChar "\\""

  terminalChar
    = escapeChar
      | ~"\\\\" ~"\\"" ~"\\n" "\\u{0}".."\\u{10FFFF}"

  escapeChar  (an escape sequence)
    = "\\\\\\\\"                                     -- backslash
    | "\\\\\\""                                     -- doubleQuote
    | "\\\\\\'"                                     -- singleQuote
    | "\\\\b"                                      -- backspace
    | "\\\\n"                                      -- lineFeed
    | "\\\\r"                                      -- carriageReturn
    | "\\\\t"                                      -- tab
    | "\\\\u{" hexDigit hexDigit? hexDigit?
             hexDigit? hexDigit? hexDigit? "}"   -- unicodeCodePoint
    | "\\\\u" hexDigit hexDigit hexDigit hexDigit  -- unicodeEscape
    | "\\\\x" hexDigit hexDigit                    -- hexEscape

  space
   += comment

  comment
    = "//" (~"\\n" any)* &("\\n" | end)  -- singleLine
    | "/*" (~"*/" any)* "*/"  -- multiLine

  tokens = token*

  token = caseName | comment | ident | operator | punctuation | terminal | any

  operator = "<:" | "=" | ":=" | "+=" | "*" | "+" | "?" | "~" | "&"

  punctuation = "<" | ">" | "," | "--"
}` }, "Ohm", null, "Grammars", { Grammars: ["define", { sourceInterval: [9, 32] }, null, [], ["star", { sourceInterval: [24, 32] }, ["app", { sourceInterval: [24, 31] }, "Grammar", []]]], Grammar: ["define", { sourceInterval: [36, 83] }, null, [], ["seq", { sourceInterval: [50, 83] }, ["app", { sourceInterval: [50, 55] }, "ident", []], ["opt", { sourceInterval: [56, 69] }, ["app", { sourceInterval: [56, 68] }, "SuperGrammar", []]], ["terminal", { sourceInterval: [70, 73] }, "{"], ["star", { sourceInterval: [74, 79] }, ["app", { sourceInterval: [74, 78] }, "Rule", []]], ["terminal", { sourceInterval: [80, 83] }, "}"]]], SuperGrammar: ["define", { sourceInterval: [87, 116] }, null, [], ["seq", { sourceInterval: [106, 116] }, ["terminal", { sourceInterval: [106, 110] }, "<:"], ["app", { sourceInterval: [111, 116] }, "ident", []]]], Rule_define: ["define", { sourceInterval: [131, 181] }, null, [], ["seq", { sourceInterval: [131, 170] }, ["app", { sourceInterval: [131, 136] }, "ident", []], ["opt", { sourceInterval: [137, 145] }, ["app", { sourceInterval: [137, 144] }, "Formals", []]], ["opt", { sourceInterval: [146, 156] }, ["app", { sourceInterval: [146, 155] }, "ruleDescr", []]], ["terminal", { sourceInterval: [157, 160] }, "="], ["app", { sourceInterval: [162, 170] }, "RuleBody", []]]], Rule_override: ["define", { sourceInterval: [188, 248] }, null, [], ["seq", { sourceInterval: [188, 235] }, ["app", { sourceInterval: [188, 193] }, "ident", []], ["opt", { sourceInterval: [194, 202] }, ["app", { sourceInterval: [194, 201] }, "Formals", []]], ["terminal", { sourceInterval: [214, 218] }, ":="], ["app", { sourceInterval: [219, 235] }, "OverrideRuleBody", []]]], Rule_extend: ["define", { sourceInterval: [255, 305] }, null, [], ["seq", { sourceInterval: [255, 294] }, ["app", { sourceInterval: [255, 260] }, "ident", []], ["opt", { sourceInterval: [261, 269] }, ["app", { sourceInterval: [261, 268] }, "Formals", []]], ["terminal", { sourceInterval: [281, 285] }, "+="], ["app", { sourceInterval: [286, 294] }, "RuleBody", []]]], Rule: ["define", { sourceInterval: [120, 305] }, null, [], ["alt", { sourceInterval: [131, 305] }, ["app", { sourceInterval: [131, 170] }, "Rule_define", []], ["app", { sourceInterval: [188, 235] }, "Rule_override", []], ["app", { sourceInterval: [255, 294] }, "Rule_extend", []]]], RuleBody: ["define", { sourceInterval: [309, 362] }, null, [], ["seq", { sourceInterval: [324, 362] }, ["opt", { sourceInterval: [324, 328] }, ["terminal", { sourceInterval: [324, 327] }, "|"]], ["app", { sourceInterval: [329, 362] }, "NonemptyListOf", [["app", { sourceInterval: [344, 356] }, "TopLevelTerm", []], ["terminal", { sourceInterval: [358, 361] }, "|"]]]]], TopLevelTerm_inline: ["define", { sourceInterval: [385, 408] }, null, [], ["seq", { sourceInterval: [385, 397] }, ["app", { sourceInterval: [385, 388] }, "Seq", []], ["app", { sourceInterval: [389, 397] }, "caseName", []]]], TopLevelTerm: ["define", { sourceInterval: [366, 418] }, null, [], ["alt", { sourceInterval: [385, 418] }, ["app", { sourceInterval: [385, 397] }, "TopLevelTerm_inline", []], ["app", { sourceInterval: [415, 418] }, "Seq", []]]], OverrideRuleBody: ["define", { sourceInterval: [422, 491] }, null, [], ["seq", { sourceInterval: [445, 491] }, ["opt", { sourceInterval: [445, 449] }, ["terminal", { sourceInterval: [445, 448] }, "|"]], ["app", { sourceInterval: [450, 491] }, "NonemptyListOf", [["app", { sourceInterval: [465, 485] }, "OverrideTopLevelTerm", []], ["terminal", { sourceInterval: [487, 490] }, "|"]]]]], OverrideTopLevelTerm_superSplice: ["define", { sourceInterval: [522, 543] }, null, [], ["terminal", { sourceInterval: [522, 527] }, "..."]], OverrideTopLevelTerm: ["define", { sourceInterval: [495, 562] }, null, [], ["alt", { sourceInterval: [522, 562] }, ["app", { sourceInterval: [522, 527] }, "OverrideTopLevelTerm_superSplice", []], ["app", { sourceInterval: [550, 562] }, "TopLevelTerm", []]]], Formals: ["define", { sourceInterval: [566, 606] }, null, [], ["seq", { sourceInterval: [580, 606] }, ["terminal", { sourceInterval: [580, 583] }, "<"], ["app", { sourceInterval: [584, 602] }, "ListOf", [["app", { sourceInterval: [591, 596] }, "ident", []], ["terminal", { sourceInterval: [598, 601] }, ","]]], ["terminal", { sourceInterval: [603, 606] }, ">"]]], Params: ["define", { sourceInterval: [610, 647] }, null, [], ["seq", { sourceInterval: [623, 647] }, ["terminal", { sourceInterval: [623, 626] }, "<"], ["app", { sourceInterval: [627, 643] }, "ListOf", [["app", { sourceInterval: [634, 637] }, "Seq", []], ["terminal", { sourceInterval: [639, 642] }, ","]]], ["terminal", { sourceInterval: [644, 647] }, ">"]]], Alt: ["define", { sourceInterval: [651, 685] }, null, [], ["app", { sourceInterval: [661, 685] }, "NonemptyListOf", [["app", { sourceInterval: [676, 679] }, "Seq", []], ["terminal", { sourceInterval: [681, 684] }, "|"]]]], Seq: ["define", { sourceInterval: [689, 704] }, null, [], ["star", { sourceInterval: [699, 704] }, ["app", { sourceInterval: [699, 703] }, "Iter", []]]], Iter_star: ["define", { sourceInterval: [719, 736] }, null, [], ["seq", { sourceInterval: [719, 727] }, ["app", { sourceInterval: [719, 723] }, "Pred", []], ["terminal", { sourceInterval: [724, 727] }, "*"]]], Iter_plus: ["define", { sourceInterval: [743, 760] }, null, [], ["seq", { sourceInterval: [743, 751] }, ["app", { sourceInterval: [743, 747] }, "Pred", []], ["terminal", { sourceInterval: [748, 751] }, "+"]]], Iter_opt: ["define", { sourceInterval: [767, 783] }, null, [], ["seq", { sourceInterval: [767, 775] }, ["app", { sourceInterval: [767, 771] }, "Pred", []], ["terminal", { sourceInterval: [772, 775] }, "?"]]], Iter: ["define", { sourceInterval: [708, 794] }, null, [], ["alt", { sourceInterval: [719, 794] }, ["app", { sourceInterval: [719, 727] }, "Iter_star", []], ["app", { sourceInterval: [743, 751] }, "Iter_plus", []], ["app", { sourceInterval: [767, 775] }, "Iter_opt", []], ["app", { sourceInterval: [790, 794] }, "Pred", []]]], Pred_not: ["define", { sourceInterval: [809, 824] }, null, [], ["seq", { sourceInterval: [809, 816] }, ["terminal", { sourceInterval: [809, 812] }, "~"], ["app", { sourceInterval: [813, 816] }, "Lex", []]]], Pred_lookahead: ["define", { sourceInterval: [831, 852] }, null, [], ["seq", { sourceInterval: [831, 838] }, ["terminal", { sourceInterval: [831, 834] }, "&"], ["app", { sourceInterval: [835, 838] }, "Lex", []]]], Pred: ["define", { sourceInterval: [798, 862] }, null, [], ["alt", { sourceInterval: [809, 862] }, ["app", { sourceInterval: [809, 816] }, "Pred_not", []], ["app", { sourceInterval: [831, 838] }, "Pred_lookahead", []], ["app", { sourceInterval: [859, 862] }, "Lex", []]]], Lex_lex: ["define", { sourceInterval: [876, 892] }, null, [], ["seq", { sourceInterval: [876, 884] }, ["terminal", { sourceInterval: [876, 879] }, "#"], ["app", { sourceInterval: [880, 884] }, "Base", []]]], Lex: ["define", { sourceInterval: [866, 903] }, null, [], ["alt", { sourceInterval: [876, 903] }, ["app", { sourceInterval: [876, 884] }, "Lex_lex", []], ["app", { sourceInterval: [899, 903] }, "Base", []]]], Base_application: ["define", { sourceInterval: [918, 979] }, null, [], ["seq", { sourceInterval: [918, 963] }, ["app", { sourceInterval: [918, 923] }, "ident", []], ["opt", { sourceInterval: [924, 931] }, ["app", { sourceInterval: [924, 930] }, "Params", []]], ["not", { sourceInterval: [932, 963] }, ["alt", { sourceInterval: [934, 962] }, ["seq", { sourceInterval: [934, 948] }, ["opt", { sourceInterval: [934, 944] }, ["app", { sourceInterval: [934, 943] }, "ruleDescr", []]], ["terminal", { sourceInterval: [945, 948] }, "="]], ["terminal", { sourceInterval: [951, 955] }, ":="], ["terminal", { sourceInterval: [958, 962] }, "+="]]]]], Base_range: ["define", { sourceInterval: [986, 1041] }, null, [], ["seq", { sourceInterval: [986, 1022] }, ["app", { sourceInterval: [986, 1001] }, "oneCharTerminal", []], ["terminal", { sourceInterval: [1002, 1006] }, ".."], ["app", { sourceInterval: [1007, 1022] }, "oneCharTerminal", []]]], Base_terminal: ["define", { sourceInterval: [1048, 1106] }, null, [], ["app", { sourceInterval: [1048, 1056] }, "terminal", []]], Base_paren: ["define", { sourceInterval: [1113, 1168] }, null, [], ["seq", { sourceInterval: [1113, 1124] }, ["terminal", { sourceInterval: [1113, 1116] }, "("], ["app", { sourceInterval: [1117, 1120] }, "Alt", []], ["terminal", { sourceInterval: [1121, 1124] }, ")"]]], Base: ["define", { sourceInterval: [907, 1168] }, null, [], ["alt", { sourceInterval: [918, 1168] }, ["app", { sourceInterval: [918, 963] }, "Base_application", []], ["app", { sourceInterval: [986, 1022] }, "Base_range", []], ["app", { sourceInterval: [1048, 1056] }, "Base_terminal", []], ["app", { sourceInterval: [1113, 1124] }, "Base_paren", []]]], ruleDescr: ["define", { sourceInterval: [1172, 1231] }, "a rule description", [], ["seq", { sourceInterval: [1210, 1231] }, ["terminal", { sourceInterval: [1210, 1213] }, "("], ["app", { sourceInterval: [1214, 1227] }, "ruleDescrText", []], ["terminal", { sourceInterval: [1228, 1231] }, ")"]]], ruleDescrText: ["define", { sourceInterval: [1235, 1266] }, null, [], ["star", { sourceInterval: [1255, 1266] }, ["seq", { sourceInterval: [1256, 1264] }, ["not", { sourceInterval: [1256, 1260] }, ["terminal", { sourceInterval: [1257, 1260] }, ")"]], ["app", { sourceInterval: [1261, 1264] }, "any", []]]]], caseName: ["define", { sourceInterval: [1270, 1338] }, null, [], ["seq", { sourceInterval: [1285, 1338] }, ["terminal", { sourceInterval: [1285, 1289] }, "--"], ["star", { sourceInterval: [1290, 1304] }, ["seq", { sourceInterval: [1291, 1302] }, ["not", { sourceInterval: [1291, 1296] }, ["terminal", { sourceInterval: [1292, 1296] }, `
`]], ["app", { sourceInterval: [1297, 1302] }, "space", []]]], ["app", { sourceInterval: [1305, 1309] }, "name", []], ["star", { sourceInterval: [1310, 1324] }, ["seq", { sourceInterval: [1311, 1322] }, ["not", { sourceInterval: [1311, 1316] }, ["terminal", { sourceInterval: [1312, 1316] }, `
`]], ["app", { sourceInterval: [1317, 1322] }, "space", []]]], ["alt", { sourceInterval: [1326, 1337] }, ["terminal", { sourceInterval: [1326, 1330] }, `
`], ["lookahead", { sourceInterval: [1333, 1337] }, ["terminal", { sourceInterval: [1334, 1337] }, "}"]]]]], name: ["define", { sourceInterval: [1342, 1382] }, "a name", [], ["seq", { sourceInterval: [1363, 1382] }, ["app", { sourceInterval: [1363, 1372] }, "nameFirst", []], ["star", { sourceInterval: [1373, 1382] }, ["app", { sourceInterval: [1373, 1381] }, "nameRest", []]]]], nameFirst: ["define", { sourceInterval: [1386, 1418] }, null, [], ["alt", { sourceInterval: [1402, 1418] }, ["terminal", { sourceInterval: [1402, 1405] }, "_"], ["app", { sourceInterval: [1412, 1418] }, "letter", []]]], nameRest: ["define", { sourceInterval: [1422, 1452] }, null, [], ["alt", { sourceInterval: [1437, 1452] }, ["terminal", { sourceInterval: [1437, 1440] }, "_"], ["app", { sourceInterval: [1447, 1452] }, "alnum", []]]], ident: ["define", { sourceInterval: [1456, 1489] }, "an identifier", [], ["app", { sourceInterval: [1485, 1489] }, "name", []]], terminal: ["define", { sourceInterval: [1493, 1531] }, null, [], ["seq", { sourceInterval: [1508, 1531] }, ["terminal", { sourceInterval: [1508, 1512] }, '"'], ["star", { sourceInterval: [1513, 1526] }, ["app", { sourceInterval: [1513, 1525] }, "terminalChar", []]], ["terminal", { sourceInterval: [1527, 1531] }, '"']]], oneCharTerminal: ["define", { sourceInterval: [1535, 1579] }, null, [], ["seq", { sourceInterval: [1557, 1579] }, ["terminal", { sourceInterval: [1557, 1561] }, '"'], ["app", { sourceInterval: [1562, 1574] }, "terminalChar", []], ["terminal", { sourceInterval: [1575, 1579] }, '"']]], terminalChar: ["define", { sourceInterval: [1583, 1660] }, null, [], ["alt", { sourceInterval: [1602, 1660] }, ["app", { sourceInterval: [1602, 1612] }, "escapeChar", []], ["seq", { sourceInterval: [1621, 1660] }, ["not", { sourceInterval: [1621, 1626] }, ["terminal", { sourceInterval: [1622, 1626] }, "\\"]], ["not", { sourceInterval: [1627, 1632] }, ["terminal", { sourceInterval: [1628, 1632] }, '"']], ["not", { sourceInterval: [1633, 1638] }, ["terminal", { sourceInterval: [1634, 1638] }, `
`]], ["range", { sourceInterval: [1639, 1660] }, "\x00", "\uDBFF\uDFFF"]]]], escapeChar_backslash: ["define", { sourceInterval: [1703, 1758] }, null, [], ["terminal", { sourceInterval: [1703, 1709] }, "\\\\"]], escapeChar_doubleQuote: ["define", { sourceInterval: [1765, 1822] }, null, [], ["terminal", { sourceInterval: [1765, 1771] }, "\\\""]], escapeChar_singleQuote: ["define", { sourceInterval: [1829, 1886] }, null, [], ["terminal", { sourceInterval: [1829, 1835] }, "\\'"]], escapeChar_backspace: ["define", { sourceInterval: [1893, 1948] }, null, [], ["terminal", { sourceInterval: [1893, 1898] }, "\\b"]], escapeChar_lineFeed: ["define", { sourceInterval: [1955, 2009] }, null, [], ["terminal", { sourceInterval: [1955, 1960] }, "\\n"]], escapeChar_carriageReturn: ["define", { sourceInterval: [2016, 2076] }, null, [], ["terminal", { sourceInterval: [2016, 2021] }, "\\r"]], escapeChar_tab: ["define", { sourceInterval: [2083, 2132] }, null, [], ["terminal", { sourceInterval: [2083, 2088] }, "\\t"]], escapeChar_unicodeCodePoint: ["define", { sourceInterval: [2139, 2243] }, null, [], ["seq", { sourceInterval: [2139, 2221] }, ["terminal", { sourceInterval: [2139, 2145] }, "\\u{"], ["app", { sourceInterval: [2146, 2154] }, "hexDigit", []], ["opt", { sourceInterval: [2155, 2164] }, ["app", { sourceInterval: [2155, 2163] }, "hexDigit", []]], ["opt", { sourceInterval: [2165, 2174] }, ["app", { sourceInterval: [2165, 2173] }, "hexDigit", []]], ["opt", { sourceInterval: [2188, 2197] }, ["app", { sourceInterval: [2188, 2196] }, "hexDigit", []]], ["opt", { sourceInterval: [2198, 2207] }, ["app", { sourceInterval: [2198, 2206] }, "hexDigit", []]], ["opt", { sourceInterval: [2208, 2217] }, ["app", { sourceInterval: [2208, 2216] }, "hexDigit", []]], ["terminal", { sourceInterval: [2218, 2221] }, "}"]]], escapeChar_unicodeEscape: ["define", { sourceInterval: [2250, 2309] }, null, [], ["seq", { sourceInterval: [2250, 2291] }, ["terminal", { sourceInterval: [2250, 2255] }, "\\u"], ["app", { sourceInterval: [2256, 2264] }, "hexDigit", []], ["app", { sourceInterval: [2265, 2273] }, "hexDigit", []], ["app", { sourceInterval: [2274, 2282] }, "hexDigit", []], ["app", { sourceInterval: [2283, 2291] }, "hexDigit", []]]], escapeChar_hexEscape: ["define", { sourceInterval: [2316, 2371] }, null, [], ["seq", { sourceInterval: [2316, 2339] }, ["terminal", { sourceInterval: [2316, 2321] }, "\\x"], ["app", { sourceInterval: [2322, 2330] }, "hexDigit", []], ["app", { sourceInterval: [2331, 2339] }, "hexDigit", []]]], escapeChar: ["define", { sourceInterval: [1664, 2371] }, "an escape sequence", [], ["alt", { sourceInterval: [1703, 2371] }, ["app", { sourceInterval: [1703, 1709] }, "escapeChar_backslash", []], ["app", { sourceInterval: [1765, 1771] }, "escapeChar_doubleQuote", []], ["app", { sourceInterval: [1829, 1835] }, "escapeChar_singleQuote", []], ["app", { sourceInterval: [1893, 1898] }, "escapeChar_backspace", []], ["app", { sourceInterval: [1955, 1960] }, "escapeChar_lineFeed", []], ["app", { sourceInterval: [2016, 2021] }, "escapeChar_carriageReturn", []], ["app", { sourceInterval: [2083, 2088] }, "escapeChar_tab", []], ["app", { sourceInterval: [2139, 2221] }, "escapeChar_unicodeCodePoint", []], ["app", { sourceInterval: [2250, 2291] }, "escapeChar_unicodeEscape", []], ["app", { sourceInterval: [2316, 2339] }, "escapeChar_hexEscape", []]]], space: ["extend", { sourceInterval: [2375, 2394] }, null, [], ["app", { sourceInterval: [2387, 2394] }, "comment", []]], comment_singleLine: ["define", { sourceInterval: [2412, 2458] }, null, [], ["seq", { sourceInterval: [2412, 2443] }, ["terminal", { sourceInterval: [2412, 2416] }, "//"], ["star", { sourceInterval: [2417, 2429] }, ["seq", { sourceInterval: [2418, 2427] }, ["not", { sourceInterval: [2418, 2423] }, ["terminal", { sourceInterval: [2419, 2423] }, `
`]], ["app", { sourceInterval: [2424, 2427] }, "any", []]]], ["lookahead", { sourceInterval: [2430, 2443] }, ["alt", { sourceInterval: [2432, 2442] }, ["terminal", { sourceInterval: [2432, 2436] }, `
`], ["app", { sourceInterval: [2439, 2442] }, "end", []]]]]], comment_multiLine: ["define", { sourceInterval: [2465, 2501] }, null, [], ["seq", { sourceInterval: [2465, 2487] }, ["terminal", { sourceInterval: [2465, 2469] }, "/*"], ["star", { sourceInterval: [2470, 2482] }, ["seq", { sourceInterval: [2471, 2480] }, ["not", { sourceInterval: [2471, 2476] }, ["terminal", { sourceInterval: [2472, 2476] }, "*/"]], ["app", { sourceInterval: [2477, 2480] }, "any", []]]], ["terminal", { sourceInterval: [2483, 2487] }, "*/"]]], comment: ["define", { sourceInterval: [2398, 2501] }, null, [], ["alt", { sourceInterval: [2412, 2501] }, ["app", { sourceInterval: [2412, 2443] }, "comment_singleLine", []], ["app", { sourceInterval: [2465, 2487] }, "comment_multiLine", []]]], tokens: ["define", { sourceInterval: [2505, 2520] }, null, [], ["star", { sourceInterval: [2514, 2520] }, ["app", { sourceInterval: [2514, 2519] }, "token", []]]], token: ["define", { sourceInterval: [2524, 2600] }, null, [], ["alt", { sourceInterval: [2532, 2600] }, ["app", { sourceInterval: [2532, 2540] }, "caseName", []], ["app", { sourceInterval: [2543, 2550] }, "comment", []], ["app", { sourceInterval: [2553, 2558] }, "ident", []], ["app", { sourceInterval: [2561, 2569] }, "operator", []], ["app", { sourceInterval: [2572, 2583] }, "punctuation", []], ["app", { sourceInterval: [2586, 2594] }, "terminal", []], ["app", { sourceInterval: [2597, 2600] }, "any", []]]], operator: ["define", { sourceInterval: [2604, 2669] }, null, [], ["alt", { sourceInterval: [2615, 2669] }, ["terminal", { sourceInterval: [2615, 2619] }, "<:"], ["terminal", { sourceInterval: [2622, 2625] }, "="], ["terminal", { sourceInterval: [2628, 2632] }, ":="], ["terminal", { sourceInterval: [2635, 2639] }, "+="], ["terminal", { sourceInterval: [2642, 2645] }, "*"], ["terminal", { sourceInterval: [2648, 2651] }, "+"], ["terminal", { sourceInterval: [2654, 2657] }, "?"], ["terminal", { sourceInterval: [2660, 2663] }, "~"], ["terminal", { sourceInterval: [2666, 2669] }, "&"]]], punctuation: ["define", { sourceInterval: [2673, 2709] }, null, [], ["alt", { sourceInterval: [2687, 2709] }, ["terminal", { sourceInterval: [2687, 2690] }, "<"], ["terminal", { sourceInterval: [2693, 2696] }, ">"], ["terminal", { sourceInterval: [2699, 2702] }, ","], ["terminal", { sourceInterval: [2705, 2709] }, "--"]]] }]);

// ../lidl-core/node_modules/ohm-js/src/buildGrammar.js
var superSplicePlaceholder = Object.create(PExpr.prototype);
function namespaceHas(ns, name) {
  for (const prop in ns) {
    if (prop === name)
      return true;
  }
  return false;
}
function buildGrammar2(match, namespace, optOhmGrammarForTesting, options) {
  const builder = new Builder(options);
  let decl;
  let currentRuleName;
  let currentRuleFormals;
  let overriding = false;
  const metaGrammar = optOhmGrammarForTesting || ohm_grammar_default;
  const helpers = metaGrammar.createSemantics().addOperation("visit", {
    Grammars(grammarIter) {
      return grammarIter.children.map((c) => c.visit());
    },
    Grammar(id, s, _open, rules, _close) {
      const grammarName = id.visit();
      decl = builder.newGrammar(grammarName);
      s.child(0) && s.child(0).visit();
      rules.children.map((c) => c.visit());
      const g = decl.build();
      g.source = this.source.trimmed();
      if (namespaceHas(namespace, grammarName)) {
        throw duplicateGrammarDeclaration(g, namespace);
      }
      namespace[grammarName] = g;
      return g;
    },
    SuperGrammar(_2, n) {
      const superGrammarName = n.visit();
      if (superGrammarName === "null") {
        decl.withSuperGrammar(null);
      } else {
        if (!namespace || !namespaceHas(namespace, superGrammarName)) {
          throw undeclaredGrammar(superGrammarName, namespace, n.source);
        }
        decl.withSuperGrammar(namespace[superGrammarName]);
      }
    },
    Rule_define(n, fs, d, _2, b) {
      currentRuleName = n.visit();
      currentRuleFormals = fs.children.map((c) => c.visit())[0] || [];
      if (!decl.defaultStartRule && decl.ensureSuperGrammar() !== Grammar.ProtoBuiltInRules) {
        decl.withDefaultStartRule(currentRuleName);
      }
      const body = b.visit();
      const description = d.children.map((c) => c.visit())[0];
      const source = this.source.trimmed();
      return decl.define(currentRuleName, currentRuleFormals, body, description, source);
    },
    Rule_override(n, fs, _2, b) {
      currentRuleName = n.visit();
      currentRuleFormals = fs.children.map((c) => c.visit())[0] || [];
      const source = this.source.trimmed();
      decl.ensureSuperGrammarRuleForOverriding(currentRuleName, source);
      overriding = true;
      const body = b.visit();
      overriding = false;
      return decl.override(currentRuleName, currentRuleFormals, body, null, source);
    },
    Rule_extend(n, fs, _2, b) {
      currentRuleName = n.visit();
      currentRuleFormals = fs.children.map((c) => c.visit())[0] || [];
      const body = b.visit();
      const source = this.source.trimmed();
      return decl.extend(currentRuleName, currentRuleFormals, body, null, source);
    },
    RuleBody(_2, terms) {
      return builder.alt(...terms.visit()).withSource(this.source);
    },
    OverrideRuleBody(_2, terms) {
      const args = terms.visit();
      const expansionPos = args.indexOf(superSplicePlaceholder);
      if (expansionPos >= 0) {
        const beforeTerms = args.slice(0, expansionPos);
        const afterTerms = args.slice(expansionPos + 1);
        afterTerms.forEach((t) => {
          if (t === superSplicePlaceholder)
            throw multipleSuperSplices(t);
        });
        return new Splice(decl.superGrammar, currentRuleName, beforeTerms, afterTerms).withSource(this.source);
      } else {
        return builder.alt(...args).withSource(this.source);
      }
    },
    Formals(opointy, fs, cpointy) {
      return fs.visit();
    },
    Params(opointy, ps, cpointy) {
      return ps.visit();
    },
    Alt(seqs) {
      return builder.alt(...seqs.visit()).withSource(this.source);
    },
    TopLevelTerm_inline(b, n) {
      const inlineRuleName = currentRuleName + "_" + n.visit();
      const body = b.visit();
      const source = this.source.trimmed();
      const isNewRuleDeclaration = !(decl.superGrammar && decl.superGrammar.rules[inlineRuleName]);
      if (overriding && !isNewRuleDeclaration) {
        decl.override(inlineRuleName, currentRuleFormals, body, null, source);
      } else {
        decl.define(inlineRuleName, currentRuleFormals, body, null, source);
      }
      const params = currentRuleFormals.map((formal) => builder.app(formal));
      return builder.app(inlineRuleName, params).withSource(body.source);
    },
    OverrideTopLevelTerm_superSplice(_2) {
      return superSplicePlaceholder;
    },
    Seq(expr) {
      return builder.seq(...expr.children.map((c) => c.visit())).withSource(this.source);
    },
    Iter_star(x, _2) {
      return builder.star(x.visit()).withSource(this.source);
    },
    Iter_plus(x, _2) {
      return builder.plus(x.visit()).withSource(this.source);
    },
    Iter_opt(x, _2) {
      return builder.opt(x.visit()).withSource(this.source);
    },
    Pred_not(_2, x) {
      return builder.not(x.visit()).withSource(this.source);
    },
    Pred_lookahead(_2, x) {
      return builder.lookahead(x.visit()).withSource(this.source);
    },
    Lex_lex(_2, x) {
      return builder.lex(x.visit()).withSource(this.source);
    },
    Base_application(rule, ps) {
      const params = ps.children.map((c) => c.visit())[0] || [];
      return builder.app(rule.visit(), params).withSource(this.source);
    },
    Base_range(from, _2, to) {
      return builder.range(from.visit(), to.visit()).withSource(this.source);
    },
    Base_terminal(expr) {
      return builder.terminal(expr.visit()).withSource(this.source);
    },
    Base_paren(open, x, close) {
      return x.visit();
    },
    ruleDescr(open, t, close) {
      return t.visit();
    },
    ruleDescrText(_2) {
      return this.sourceString.trim();
    },
    caseName(_2, space1, n, space2, end2) {
      return n.visit();
    },
    name(first, rest) {
      return this.sourceString;
    },
    nameFirst(expr) {},
    nameRest(expr) {},
    terminal(open, cs, close) {
      return cs.children.map((c) => c.visit()).join("");
    },
    oneCharTerminal(open, c, close) {
      return c.visit();
    },
    escapeChar(c) {
      try {
        return unescapeCodePoint(this.sourceString);
      } catch (err) {
        if (err instanceof RangeError && err.message.startsWith("Invalid code point ")) {
          throw invalidCodePoint(c);
        }
        throw err;
      }
    },
    NonemptyListOf(x, _2, xs) {
      return [x.visit()].concat(xs.children.map((c) => c.visit()));
    },
    EmptyListOf() {
      return [];
    },
    _terminal() {
      return this.sourceString;
    }
  });
  return helpers(match).visit();
}

// ../lidl-core/node_modules/ohm-js/dist/operations-and-attributes.js
var operations_and_attributes_default = makeRecipe(["grammar", { source: `OperationsAndAttributes {

  AttributeSignature =
    name

  OperationSignature =
    name Formals?

  Formals
    = "(" ListOf<name, ","> ")"

  name  (a name)
    = nameFirst nameRest*

  nameFirst
    = "_"
    | letter

  nameRest
    = "_"
    | alnum

}` }, "OperationsAndAttributes", null, "AttributeSignature", { AttributeSignature: ["define", { sourceInterval: [29, 58] }, null, [], ["app", { sourceInterval: [54, 58] }, "name", []]], OperationSignature: ["define", { sourceInterval: [62, 100] }, null, [], ["seq", { sourceInterval: [87, 100] }, ["app", { sourceInterval: [87, 91] }, "name", []], ["opt", { sourceInterval: [92, 100] }, ["app", { sourceInterval: [92, 99] }, "Formals", []]]]], Formals: ["define", { sourceInterval: [104, 143] }, null, [], ["seq", { sourceInterval: [118, 143] }, ["terminal", { sourceInterval: [118, 121] }, "("], ["app", { sourceInterval: [122, 139] }, "ListOf", [["app", { sourceInterval: [129, 133] }, "name", []], ["terminal", { sourceInterval: [135, 138] }, ","]]], ["terminal", { sourceInterval: [140, 143] }, ")"]]], name: ["define", { sourceInterval: [147, 187] }, "a name", [], ["seq", { sourceInterval: [168, 187] }, ["app", { sourceInterval: [168, 177] }, "nameFirst", []], ["star", { sourceInterval: [178, 187] }, ["app", { sourceInterval: [178, 186] }, "nameRest", []]]]], nameFirst: ["define", { sourceInterval: [191, 223] }, null, [], ["alt", { sourceInterval: [207, 223] }, ["terminal", { sourceInterval: [207, 210] }, "_"], ["app", { sourceInterval: [217, 223] }, "letter", []]]], nameRest: ["define", { sourceInterval: [227, 257] }, null, [], ["alt", { sourceInterval: [242, 257] }, ["terminal", { sourceInterval: [242, 245] }, "_"], ["app", { sourceInterval: [252, 257] }, "alnum", []]]] }]);

// ../lidl-core/node_modules/ohm-js/src/semanticsDeferredInit.js
initBuiltInSemantics(Grammar.BuiltInRules);
initPrototypeParser(operations_and_attributes_default);
function initBuiltInSemantics(builtInRules) {
  const actions = {
    empty() {
      return this.iteration();
    },
    nonEmpty(first, _2, rest) {
      return this.iteration([first].concat(rest.children));
    },
    self(..._children) {
      return this;
    }
  };
  Semantics.BuiltInSemantics = Semantics.createSemantics(builtInRules, null).addOperation("asIteration", {
    emptyListOf: actions.empty,
    nonemptyListOf: actions.nonEmpty,
    EmptyListOf: actions.empty,
    NonemptyListOf: actions.nonEmpty,
    _iter: actions.self
  });
}
function initPrototypeParser(grammar) {
  Semantics.prototypeGrammarSemantics = grammar.createSemantics().addOperation("parse", {
    AttributeSignature(name) {
      return {
        name: name.parse(),
        formals: []
      };
    },
    OperationSignature(name, optFormals) {
      return {
        name: name.parse(),
        formals: optFormals.children.map((c) => c.parse())[0] || []
      };
    },
    Formals(oparen, fs, cparen) {
      return fs.asIteration().children.map((c) => c.parse());
    },
    name(first, rest) {
      return this.sourceString;
    }
  });
  Semantics.prototypeGrammar = grammar;
}
// ../lidl-core/node_modules/ohm-js/src/findIndentation.js
function findIndentation(input) {
  let pos = 0;
  const stack = [0];
  const topOfStack = () => stack[stack.length - 1];
  const result = {};
  const regex = /( *).*(?:$|\r?\n|\r)/g;
  let match;
  while ((match = regex.exec(input)) != null) {
    const [line, indent] = match;
    if (line.length === 0)
      break;
    const indentSize = indent.length;
    const prevSize = topOfStack();
    const indentPos = pos + indentSize;
    if (indentSize > prevSize) {
      stack.push(indentSize);
      result[indentPos] = 1;
    } else if (indentSize < prevSize) {
      const prevLength = stack.length;
      while (topOfStack() !== indentSize) {
        stack.pop();
      }
      result[indentPos] = -1 * (prevLength - stack.length);
    }
    pos += line.length;
  }
  if (stack.length > 1) {
    result[pos] = 1 - stack.length;
  }
  return result;
}

// ../lidl-core/node_modules/ohm-js/src/IndentationSensitive.js
var INDENT_DESCRIPTION = "an indented block";
var DEDENT_DESCRIPTION = "a dedent";
var INVALID_CODE_POINT = 1114111 + 1;

class InputStreamWithIndentation extends InputStream {
  constructor(state) {
    super(state.input);
    this.state = state;
  }
  _indentationAt(pos) {
    return this.state.userData[pos] || 0;
  }
  atEnd() {
    return super.atEnd() && this._indentationAt(this.pos) === 0;
  }
  next() {
    if (this._indentationAt(this.pos) !== 0) {
      this.examinedLength = Math.max(this.examinedLength, this.pos);
      return;
    }
    return super.next();
  }
  nextCharCode() {
    if (this._indentationAt(this.pos) !== 0) {
      this.examinedLength = Math.max(this.examinedLength, this.pos);
      return INVALID_CODE_POINT;
    }
    return super.nextCharCode();
  }
  nextCodePoint() {
    if (this._indentationAt(this.pos) !== 0) {
      this.examinedLength = Math.max(this.examinedLength, this.pos);
      return INVALID_CODE_POINT;
    }
    return super.nextCodePoint();
  }
}

class Indentation extends PExpr {
  constructor(isIndent = true) {
    super();
    this.isIndent = isIndent;
  }
  allowsSkippingPrecedingSpace() {
    return true;
  }
  eval(state) {
    const { inputStream } = state;
    const pseudoTokens = state.userData;
    state.doNotMemoize = true;
    const origPos = inputStream.pos;
    const sign = this.isIndent ? 1 : -1;
    const count = (pseudoTokens[origPos] || 0) * sign;
    if (count > 0) {
      state.userData = Object.create(pseudoTokens);
      state.userData[origPos] -= sign;
      state.pushBinding(new TerminalNode(0), origPos);
      return true;
    } else {
      state.processFailure(origPos, this);
      return false;
    }
  }
  getArity() {
    return 1;
  }
  _assertAllApplicationsAreValid(ruleName, grammar) {}
  _isNullable(grammar, memo) {
    return false;
  }
  assertChoicesHaveUniformArity(ruleName) {}
  assertIteratedExprsAreNotNullable(grammar) {}
  introduceParams(formals) {
    return this;
  }
  substituteParams(actuals) {
    return this;
  }
  toString() {
    return this.isIndent ? "indent" : "dedent";
  }
  toDisplayString() {
    return this.toString();
  }
  toFailure(grammar) {
    const description = this.isIndent ? INDENT_DESCRIPTION : DEDENT_DESCRIPTION;
    return new Failure(this, description, "description");
  }
}
var applyIndent = new Apply("indent");
var applyDedent = new Apply("dedent");
var newAnyBody = new Splice(built_in_rules_default, "any", [applyIndent, applyDedent], []);
var IndentationSensitive = new Builder().newGrammar("IndentationSensitive").withSuperGrammar(built_in_rules_default).define("indent", [], new Indentation(true), INDENT_DESCRIPTION, undefined, true).define("dedent", [], new Indentation(false), DEDENT_DESCRIPTION, undefined, true).extend("any", [], newAnyBody, "any character", undefined).build();
Object.assign(IndentationSensitive, {
  _matchStateInitializer(state) {
    state.userData = findIndentation(state.input);
    state.inputStream = new InputStreamWithIndentation(state);
  },
  supportsIncrementalParsing: false
});

// ../lidl-core/node_modules/ohm-js/src/main.js
Grammar.initApplicationParser(ohm_grammar_default, buildGrammar2);
var isBuffer = (obj) => !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
function compileAndLoad(source, namespace, buildOptions) {
  const m = ohm_grammar_default.match(source, "Grammars");
  if (m.failed()) {
    throw grammarSyntaxError(m);
  }
  return buildGrammar2(m, namespace, undefined, buildOptions);
}
function _grammar(source, optNamespace, buildOptions) {
  const ns = _grammars(source, optNamespace, buildOptions);
  const grammarNames = Object.keys(ns);
  if (grammarNames.length === 0) {
    throw new Error("Missing grammar definition");
  } else if (grammarNames.length > 1) {
    const secondGrammar = ns[grammarNames[1]];
    const interval = secondGrammar.source;
    throw new Error(getLineAndColumnMessage(interval.sourceString, interval.startIdx) + "Found more than one grammar definition -- use ohm.grammars() instead.");
  }
  return ns[grammarNames[0]];
}
function _grammars(source, optNamespace, buildOptions) {
  const ns = Object.create(optNamespace || {});
  if (typeof source !== "string") {
    if (isBuffer(source)) {
      source = source.toString();
    } else {
      throw new TypeError("Expected string as first argument, got " + unexpectedObjToString(source));
    }
  }
  compileAndLoad(source, ns, buildOptions);
  return ns;
}
function grammar(source, optNamespace) {
  return _grammar(source, optNamespace);
}
// ../lidl-core/src/operator.ts
var grammar2 = grammar(String.raw`LIDLOperator {
  Start = Composition
        | Behaviour
        | Affectation
        | Previous
        | Identifier
        | Reference
        | CoReference
        | FunctionApplication
        | Function
        | Activation
        | Boolean
        | Number
        | Text
        | Custom
        | Void

  Composition = "{" CompositionEntry* "}"
  CompositionEntry = keyIdentifier ":" "$" ","?

  Behaviour = "$" "with" "behaviour" "$"

  Affectation = "$" "=" "$"

  Previous = "get" "$" "from" "previous" "and" "set" "$" "for" "next"  -- long
           | "$" "=" "previous" "$"                                     -- assign
           | "next" "$" "=" "$"                                         -- next

  Identifier = "variable" opIdent? ("$" opIdent?)*  -- variable
             | "#" opIdent? ("$" opIdent?)*          -- hash

  Reference = "$" "!"

  CoReference = "$" "?"

  FunctionApplication = "apply" "$" "to" "$" "and" "get" "$"  -- long
                       | "$" "$" "=" "$"                        -- short

  Function = "function" functionIdentifier

  Activation = "active"    -- active
             | "inactive"  -- inactive

  Boolean = "true"   -- true
          | "false"  -- false

  Number = "-"? digit+ ("." digit+)?

  Text = "\"" (~"\"" any)* "\""

  Custom = customChars

  Void = end

  customChars = (~space ~"_" ~"(" ~")" any)+
  opIdent = (~space ~"$" ~"(" ~")" any)+
  keyIdentifier = (lower | digit) alnum*
  functionIdentifier = (letter | "_") (alnum | "_")*
}`);
var semantics = grammar2.createSemantics();
semantics.addOperation("classify", {
  Start(alt) {
    return alt.classify();
  },
  Composition(_open, _entries, _close) {
    return "Composition";
  },
  CompositionEntry(_key, _colon, _dollar, _comma) {
    return "Composition";
  },
  Behaviour(_d1, _with, _beh, _d2) {
    return "Behaviour";
  },
  Affectation(_d1, _eq, _d2) {
    return "Affectation";
  },
  Previous_long(_get, _d1, _from, _prev, _and, _set, _d2, _for, _next) {
    return "Previous";
  },
  Previous_assign(_d1, _eq, _prev, _d2) {
    return "Previous";
  },
  Previous_next(_next, _d1, _eq, _d2) {
    return "Previous";
  },
  Identifier_variable(_var, _name, _dollars, _dollarNames) {
    return "Identifier";
  },
  Identifier_hash(_hash, _name, _dollars, _dollarNames) {
    return "Identifier";
  },
  Reference(_d, _bang) {
    return "Reference";
  },
  CoReference(_d, _q) {
    return "CoReference";
  },
  FunctionApplication_long(_apply, _d1, _to, _d2, _and, _get, _d3) {
    return "FunctionApplication";
  },
  FunctionApplication_short(_d1, _d2, _eq, _d3) {
    return "FunctionApplication";
  },
  Function(_kw, _name) {
    return "Function";
  },
  Activation_active(_2) {
    return "Activation";
  },
  Activation_inactive(_2) {
    return "Activation";
  },
  Boolean_true(_2) {
    return "Boolean";
  },
  Boolean_false(_2) {
    return "Boolean";
  },
  Number(_neg, _int, _dot, _frac) {
    return "Number";
  },
  Text(_open, _content, _close) {
    return "Text";
  },
  Custom(_chars) {
    return "Custom";
  },
  Void(_end) {
    return "Void";
  },
  customChars(_2) {
    return this.sourceString;
  },
  opIdent(_2) {
    return this.sourceString;
  },
  keyIdentifier(_first, _rest) {
    return this.sourceString;
  },
  functionIdentifier(_first, _rest) {
    return this.sourceString;
  },
  _terminal() {
    return this.sourceString;
  },
  _iter(...children) {
    return children.map((c) => c.classify());
  }
});
var operator = {
  parse(input) {
    const match = grammar2.match(input);
    if (match.failed()) {
      return "Custom";
    }
    return semantics(match).classify();
  },
  SyntaxError
};
var operator_default = operator;

// ../lidl-core/src/serializer.ts
var import_lodash2 = __toESM(require_lodash(), 1);
function serialize(object, indentation) {
  if (import_lodash2.default.isUndefined(object))
    return "?";
  var indent;
  if (!import_lodash2.default.isFinite(indentation)) {
    indent = 0;
  } else {
    indent = indentation;
  }
  switch (object.type) {
    case "InteractionSimple":
      return serializeInteractionSimple(object, indent);
    case "InteractionNative":
      return serializeInteractionNative(object, indent);
    case "InteractionDefinition":
      return serialize(object.interaction, indent);
    case "InteractionSignature":
      return serializeInteractionSignatureSimpleRow(object, indent);
    case "InteractionSignatureOperandElement":
      return "(" + object.name + ": " + serialize(object.interfac) + ")";
    case "InterfaceAtomic":
      return serialize(object.data) + " " + object.direction;
    case "InterfaceNamed":
      return object.name;
    case "InterfaceComposite":
      return "{" + import_lodash2.default(object.element).map((x) => x.key + ": " + serialize(x.value)).join(", ") + "}";
    case "DataAtomic":
      return object.name;
    case "DataComposite":
      return "{" + import_lodash2.default(object.element).map((x) => x.key + ": " + serialize(x.value)).join(", ") + "}";
    case "DataFunction":
      return "{" + serialize(object.domain) + " -> " + serialize(object.codomain) + "}";
    case "DataArray":
      return "[" + serialize(object.element) + "]";
    default:
      console.log(new Error("Cannot serialize " + object.type));
      return "";
  }
}
var indentString = "  ";
function serializeInteractionSimple(object, indentation) {
  var r = serializeInteractionSimpleRow(object);
  if (r.length > 80) {
    r = serializeInteractionSimpleNeat(object, indentation);
  }
  return r;
}
function serializeInteractionSimpleRow(object) {
  if (object.operand.length === 0) {
    return "(" + object.operator + ")";
  } else {
    var list = object.operator.split("$");
    var res = "(";
    res = res + list[0];
    for (var i = 1;i < list.length; i++) {
      res = res + serializeInteractionSimpleRow(object.operand[i - 1]);
      res = res + list[i];
    }
    res = res + ")";
    return res;
  }
}
function serializeInteractionSimpleNeat(object, indentation) {
  let baseIndent = import_lodash2.default.repeat(indentString, indentation);
  let nextIndent = baseIndent + indentString;
  if (object.operand.length === 0) {
    return `
` + baseIndent + "(" + object.operator + ")";
  } else {
    var list = object.operator.split("$");
    var res = `(
` + baseIndent;
    res = res + (list[0].length === 0 ? "" : indentString + list[0] + `
` + baseIndent);
    for (var i = 1;i < list.length; i++) {
      res = res + indentString + serialize(object.operand[i - 1], indentation + 1) + `
` + baseIndent;
      res = res + (list[i].length === 0 ? "" : indentString + list[i] + `
` + baseIndent);
    }
    res = res + ")";
    return res;
  }
}
function serializeInteractionSignatureSimpleRow(object, indent) {
  if (object.operand.length === 0) {
    return "(" + object.operator + ")";
  } else {
    var list = object.operator.split("$");
    var res = "(";
    res = res + list[0];
    for (var i = 1;i < list.length; i++) {
      res = res + serialize(object.operand[i - 1]);
      res = res + list[i];
    }
    res = res + ")";
    return res;
  }
}
// ../lidl-core/src/interfaces.ts
var import_lodash4 = __toESM(require_lodash(), 1);

// ../lidl-core/src/extendableError.ts
class ExtendableError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    Error.captureStackTrace(this, this.constructor.name);
  }
}

// ../lidl-core/src/interfaces.ts
class InvalidInterfaceError extends ExtendableError {
  constructor(m) {
    super(m);
  }
}

class IncompatibleInterfaceError extends ExtendableError {
  constructor(m) {
    super(m);
  }
}
function oppositeDirection(direction) {
  switch (direction) {
    case "in":
      return "out";
    case "out":
      return "in";
    default:
      throw "Trying to find the opposite of an invalid direction (in or out)";
  }
}
function isAtomic(inter) {
  if (import_lodash4.default.isUndefined(inter))
    return false;
  return inter.type === "InterfaceAtomic";
}
function isComposite(inter) {
  if (import_lodash4.default.isUndefined(inter))
    return false;
  return inter.type === "InterfaceComposite";
}
function isUndefined(inter) {
  return inter === undefined || inter === null;
}
function conjugateInterface(theInterface) {
  if (import_lodash4.default.isUndefined(theInterface))
    return;
  switch (theInterface.type) {
    case "InterfaceAtomic":
      return {
        type: "InterfaceAtomic",
        data: theInterface.data,
        direction: oppositeDirection(theInterface.direction)
      };
    case "InterfaceComposite":
      return {
        type: "InterfaceComposite",
        element: import_lodash4.default.map(theInterface.element, function(field) {
          return {
            type: "InterfaceCompositeElement",
            key: field.key,
            value: conjugateInterface(field.value)
          };
        })
      };
    default:
      throw new Error("Trying to get the conjugation of something which is not an interface: " + serialize(theInterface));
  }
}
function transformDataTypeIntoInterface(data, direction) {
  if (import_lodash4.default.isUndefined(data))
    return;
  switch (data.type) {
    case "DataComposite":
      return {
        type: "InterfaceComposite",
        element: import_lodash4.default(data.element).map((x) => ({
          type: "InterfaceCompositeElement",
          key: x.key,
          value: transformDataTypeIntoInterface(x.value, direction)
        })).value()
      };
      break;
    default:
      return {
        type: "InterfaceAtomic",
        data,
        direction
      };
  }
}
function localisationInterface(theInterface) {
  if (import_lodash4.default.isUndefined(theInterface))
    return;
  switch (theInterface.type) {
    case "InterfaceAtomic":
      return transformDataTypeIntoInterface(theInterface.data, theInterface.direction);
    case "InterfaceComposite":
      return {
        type: "InterfaceComposite",
        element: import_lodash4.default(theInterface.element).map((x) => import_lodash4.default.assign(import_lodash4.default.clone(x), {
          value: localisationInterface(x.value)
        })).value()
      };
    default:
      throw "Trying to get the localisation of something which is not an interface: " + theInterface;
  }
}
function toOperator(theInterface) {
  switch (theInterface.type) {
    case "InterfaceComposite":
      return "{" + import_lodash4.default.reduce(import_lodash4.default.map(theInterface.element, "key"), function(total, value, index) {
        return total + value + ":$";
      }, "") + "}";
    case "InterfaceAtomic":
    default:
      throw "Trying to get the operator of something which is not a composite interface";
  }
}
function madeOnlyOf(inter) {
  if (import_lodash4.default.isUndefined(inter))
    return;
  switch (inter.type) {
    case "InterfaceComposite":
      let res = import_lodash4.default(inter.element).map((comp) => madeOnlyOf(comp.value)).uniq().value();
      if (res.length > 1) {
        return;
      } else {
        return res[0];
      }
    case "InterfaceAtomic":
      return inter.direction;
    default:
      throw "Trying to get the madeOnlyOf of something which is not an interface: " + inter.type;
  }
}
function isCompatible(int1, int2) {
  if (import_lodash4.default.isUndefined(int1))
    return true;
  if (import_lodash4.default.isUndefined(int2))
    return true;
  let i1 = localisationInterface(int1);
  let i2 = localisationInterface(int2);
  var res;
  switch (i1.type) {
    case "InterfaceAtomic":
      {
        switch (i2.type) {
          case "InterfaceAtomic":
            res = compareData(i1.data, i2.data) && i1.direction === oppositeDirection(i2.direction);
            break;
          case "InterfaceComposite":
            res = false;
            break;
          default:
            throw "Trying to get the compatibility of something which is not an interface: " + i2.type;
        }
      }
      break;
    case "InterfaceComposite":
      {
        switch (i2.type) {
          case "InterfaceAtomic":
            res = false;
            break;
          case "InterfaceComposite":
            res = import_lodash4.default(i1.element).every((op1) => {
              let op2 = import_lodash4.default(i2.element).find((op22) => op22.key === op1.key);
              if (op2 === undefined) {
                return true;
              } else {
                return isCompatible(op1.value, op2.value);
              }
            });
            break;
          default:
            throw "Trying to get the compatibility of something which is not an interface: " + i2.type;
        }
      }
      break;
    default:
      throw "Trying to get the compatibility of something which is not an interface: " + i1.type;
  }
  return res;
}
function subInterface(interfac, elementName) {
  return import_lodash4.default(localisationInterface(interfac).element).find((x) => x.key === elementName).value;
}
function mergeInterface(x, y) {
  if (isCompatible(x, conjugateInterface(y))) {
    if (isComposite(x)) {
      if (isComposite(y)) {
        return {
          type: "InterfaceComposite",
          element: import_lodash4.default(x.element).concat(y.element).groupBy("key").map((el, key) => import_lodash4.default.size(el) > 1 ? {
            type: "InterfaceCompositeElement",
            key,
            value: mergeInterface(el[0].value, el[1].value)
          } : {
            type: "InterfaceCompositeElement",
            key,
            value: el[0].value
          }).values().value()
        };
      } else if (isAtomic(y)) {
        return mergeInterface(x, transformDataTypeIntoInterface(y.data, y.direction));
      } else if (isUndefined(y)) {
        return x;
      } else {
        throw new InvalidInterfaceError("Trying to merge with something which is not an interface: " + serialize(y));
      }
    } else if (isAtomic(x)) {
      if (isComposite(y)) {
        return mergeInterface(transformDataTypeIntoInterface(x.data, x.direction), y);
      } else if (isAtomic(y)) {
        return x;
      } else if (isUndefined(y)) {
        return x;
      } else {
        throw new InvalidInterfaceError("Trying to merge with something which is not an interface: " + serialize(y));
      }
    } else if (isUndefined(x)) {
      if (isComposite(y)) {
        return y;
      } else if (isAtomic(y)) {
        return y;
      } else if (isUndefined(y)) {
        return;
      } else {
        throw new InvalidInterfaceError("Trying to merge with something which is not an interface: " + serialize(y));
      }
    } else {
      throw new InvalidInterfaceError("Trying to merge with something which is not an interface: " + serialize(x));
    }
  } else {
    throw new IncompatibleInterfaceError("Trying to merge incompatible interfaces: " + serialize(x) + " and " + serialize(y));
  }
}
// ../lidl-core/src/identifiers.ts
var import_lodash5 = __toESM(require_lodash(), 1);
// ../lidl-core/src/parser.ts
var grammar3 = grammar(String.raw`LIDL {
  Start = Content*

  Content = InteractionDefinition
          | InterfaceDefinition
          | DataDefinition

  InteractionDefinition = "interaction" InteractionSignature WithClause? "is" Interaction

  WithClause = "with" Content*

  InteractionSignature = "(" InteractionSignatureElement* ")" ":" Interface

  InteractionSignatureElement = sigOperatorChars            -- operator
                              | "(" variableIdentifier ":" Interface ")"  -- operand

  sigOperatorChars = (~"(" ~")" any)+

  Interaction = "(" InteractionElement* ")"

  InteractionElement = Interaction            -- operand
                     | interactionOperatorChars  -- operator

  interactionOperatorChars = (~"(" ~")" any)+

  InterfaceDefinition = "interface" interfaceIdentifier WithClause? "is" Interface

  Interface = InterfaceAtomic
            | InterfaceComposite
            | InterfaceOperation
            | InterfaceNamed

  InterfaceAtomic = Data direction

  InterfaceComposite = "{" NonemptyListOf<InterfaceCompositeElement, ","> "}"

  InterfaceCompositeElement = keyIdentifier ":" Interface

  InterfaceOperation = interfaceOperator "(" NonemptyListOf<Interface, ","> ")"

  interfaceOperator = "conjugation" | "globalisation" | "localisation"
                    | "reception" | "emission" | "union"
                    | "intersection" | "complement"

  InterfaceNamed = interfaceIdentifier

  direction = "out" | "in" | "ref"

  DataDefinition = "data" dataIdentifier WithClause? "is" Data

  Data = DataComposite
       | DataArray
       | DataFunction
       | DataOperation
       | DataAtomic

  DataAtomic = dataIdentifier

  DataComposite = "{" NonemptyListOf<DataCompositeElement, ","> "}"

  DataCompositeElement = keyIdentifier ":" Data

  DataArray = "[" Data "]"

  DataFunction = "{" Data arrow Data "}"

  DataOperation = dataOperator "(" NonemptyListOf<Data, ","> ")"

  arrow = "→" | "->"

  dataOperator = "union" | "intersection" | "complement"

  interfaceIdentifier = upper alnum*
  dataIdentifier = upper alnum*
  variableIdentifier = lower alnum*
  keyIdentifier = (lower | digit) alnum*
}`);
function mergeExpression(elements) {
  const res = { operator: "", operand: [] };
  for (const el of elements) {
    if (el.operand !== undefined && el.operand !== null) {
      res.operand.push(el.operand);
      res.operator += "$";
    }
    if (el.operator !== undefined && el.operator !== null) {
      res.operator += el.operator;
    }
  }
  return res;
}
function mergeSignature(elements) {
  const res = { operator: "", operand: [] };
  for (const el of elements) {
    if (el.operand !== undefined && el.operand !== null) {
      res.operand.push(el.operand);
      res.operator += "$";
    }
    if (el.operator !== undefined && el.operator !== null) {
      res.operator += el.operator;
    }
  }
  return res;
}
var parseOptions = {};
function makeMeta(node) {
  const lc = node.source.getLineAndColumn();
  return {
    location: {
      source: undefined,
      start: { offset: node.source.startIdx, line: lc.lineNum, column: lc.colNum },
      end: { offset: node.source.endIdx, line: 0, column: 0 }
    },
    options: parseOptions
  };
}
var semantics2 = grammar3.createSemantics();
semantics2.addOperation("toAST", {
  Start(contents) {
    return contents.children.map((c) => c.toAST());
  },
  Content(alt) {
    return alt.toAST();
  },
  InteractionDefinition(_kw, sig, withClause, _is, interaction) {
    const defs = withClause.children.length > 0 ? withClause.children[0].toAST() : [];
    const res = {
      type: "InteractionDefinition",
      interaction: interaction.toAST(),
      signature: sig.toAST(),
      definitions: defs,
      meta: makeMeta(this)
    };
    for (const def of res.definitions) {
      def.parent = res;
    }
    return res;
  },
  WithClause(_with, contents) {
    return contents.children.map((c) => c.toAST());
  },
  InteractionSignature(_open, elements, _close, _colon, iface) {
    const elems = elements.children.map((c) => c.toAST());
    const temp = mergeSignature(elems);
    return {
      type: "InteractionSignature",
      interfac: iface.toAST(),
      formating: temp.operator,
      operator: temp.operator.replace(/[ \t\r\n]*/g, ""),
      operand: temp.operand,
      meta: makeMeta(this)
    };
  },
  InteractionSignatureElement_operator(chars) {
    return { operator: chars.sourceString };
  },
  InteractionSignatureElement_operand(_open, name, _colon, iface, _close) {
    return {
      operand: {
        type: "InteractionSignatureOperandElement",
        interfac: iface.toAST(),
        name: name.toAST(),
        meta: makeMeta(this)
      }
    };
  },
  sigOperatorChars(_chars) {
    return this.sourceString;
  },
  Interaction(_open, elements, _close) {
    const elems = elements.children.map((c) => c.toAST());
    const temp = mergeExpression(elems);
    return {
      type: "InteractionSimple",
      formating: temp.operator,
      operator: temp.operator.replace(/[ \t\r\n]*/g, ""),
      operand: temp.operand,
      meta: makeMeta(this)
    };
  },
  InteractionElement_operand(interaction) {
    return { operand: interaction.toAST() };
  },
  InteractionElement_operator(chars) {
    return { operator: chars.sourceString };
  },
  interactionOperatorChars(_chars) {
    return this.sourceString;
  },
  InterfaceDefinition(_kw, signature, withClause, _is, iface) {
    const defs = withClause.children.length > 0 ? withClause.children[0].toAST() : [];
    return {
      type: "InterfaceDefinition",
      interfac: iface.toAST(),
      signature: signature.toAST(),
      definitions: defs,
      meta: makeMeta(this)
    };
  },
  Interface(alt) {
    return alt.toAST();
  },
  InterfaceAtomic(data, dir) {
    return {
      type: "InterfaceAtomic",
      data: data.toAST(),
      direction: dir.toAST(),
      meta: makeMeta(this)
    };
  },
  InterfaceComposite(_open, list, _close) {
    return {
      type: "InterfaceComposite",
      element: list.asIteration().children.map((c) => c.toAST()),
      meta: makeMeta(this)
    };
  },
  InterfaceCompositeElement(key, _colon, value) {
    return {
      type: "InterfaceCompositeElement",
      key: key.toAST(),
      value: value.toAST(),
      meta: makeMeta(this)
    };
  },
  InterfaceOperation(op, _open, list, _close) {
    return {
      type: "InterfaceOperation",
      operator: op.toAST(),
      operand: list.asIteration().children.map((c) => c.toAST()),
      meta: makeMeta(this)
    };
  },
  interfaceOperator(_6) {
    return this.sourceString;
  },
  InterfaceNamed(name) {
    return {
      type: "InterfaceNamed",
      name: name.toAST(),
      meta: makeMeta(this)
    };
  },
  direction(_6) {
    return this.sourceString;
  },
  DataDefinition(_kw, signature, withClause, _is, data) {
    const defs = withClause.children.length > 0 ? withClause.children[0].toAST() : [];
    return {
      type: "DataDefinition",
      data: data.toAST(),
      signature: signature.toAST(),
      definitions: defs,
      meta: makeMeta(this)
    };
  },
  Data(alt) {
    return alt.toAST();
  },
  DataAtomic(name) {
    return {
      type: "DataAtomic",
      name: name.toAST(),
      meta: makeMeta(this)
    };
  },
  DataComposite(_open, list, _close) {
    return {
      type: "DataComposite",
      element: list.asIteration().children.map((c) => c.toAST()),
      meta: makeMeta(this)
    };
  },
  DataCompositeElement(key, _colon, value) {
    return {
      type: "DataCompositeElement",
      key: key.toAST(),
      value: value.toAST(),
      meta: makeMeta(this)
    };
  },
  DataArray(_open, data, _close) {
    return {
      type: "DataArray",
      element: data.toAST(),
      meta: makeMeta(this)
    };
  },
  DataFunction(_open, domain, _arrow, codomain, _close) {
    return {
      type: "DataFunction",
      domain: domain.toAST(),
      codomain: codomain.toAST(),
      meta: makeMeta(this)
    };
  },
  DataOperation(op, _open, list, _close) {
    return {
      type: "DataOperation",
      operator: op.toAST(),
      operand: list.asIteration().children.map((c) => c.toAST()),
      meta: makeMeta(this)
    };
  },
  dataOperator(_6) {
    return this.sourceString;
  },
  arrow(_6) {
    return this.sourceString;
  },
  interfaceIdentifier(_first, _rest) {
    return this.sourceString;
  },
  dataIdentifier(_first, _rest) {
    return this.sourceString;
  },
  variableIdentifier(_first, _rest) {
    return this.sourceString;
  },
  keyIdentifier(_first, _rest) {
    return this.sourceString;
  },
  NonemptyListOf(first, _sep, rest) {
    return [first.toAST(), ...rest.children.map((c) => c.toAST())];
  },
  EmptyListOf() {
    return [];
  },
  _terminal() {
    return this.sourceString;
  },
  _iter(...children) {
    return children.map((c) => c.toAST());
  }
});
var ruleNameMap = {
  start: "Start",
  interaction: "Interaction",
  interactionDefinition: "InteractionDefinition",
  interfac: "Interface",
  data: "Data"
};

class LIDLSyntaxError extends SyntaxError {
  expected;
  found;
  location;
  constructor(message, expected, found, location) {
    super(message);
    this.name = "SyntaxError";
    this.expected = expected;
    this.found = found;
    this.location = location;
  }
}
var parser = {
  parse(input, options) {
    parseOptions = options || {};
    const startRule = ruleNameMap[parseOptions.startRule || "start"] || "Start";
    const match = grammar3.match(input, startRule);
    if (match.failed()) {
      const failedMatch = match;
      const pos = failedMatch.getRightmostFailurePosition();
      throw new LIDLSyntaxError(failedMatch.message || "Parse error", failedMatch.getExpectedText(), input[pos] ?? null, { start: { offset: pos, line: 0, column: 0 }, end: { offset: pos, line: 0, column: 0 } });
    }
    return semantics2(match).toAST();
  },
  SyntaxError: LIDLSyntaxError
};
var parser_default = parser;
// ../lidl-core/src/g.ts
var import_lodash6 = __toESM(require_lodash(), 1);
var _origForEach = import_lodash6.default.prototype.forEach;
import_lodash6.default.prototype.forEach = function(iteratee) {
  var result = _origForEach.call(this, iteratee);
  return result != null && typeof result === "object" ? import_lodash6.default(result) : result;
};
import_lodash6.default.prototype.commit = function() {
  return import_lodash6.default(this.value());
};

class Graph {
  nodes;
  edges;
  nodeTypeIndex;
  edgeTypeIndex;
  version;
  constructor(nodes, edges) {
    this.nodes = nodes ?? [];
    this.edges = edges ?? [];
    this.version = 0;
    this.nodeTypeIndex = new Map;
    for (const n of this.nodes) {
      const type = n.type ?? "";
      let set = this.nodeTypeIndex.get(type);
      if (!set) {
        set = new Set;
        this.nodeTypeIndex.set(type, set);
      }
      if (!n.finished)
        set.add(n);
    }
    this.edgeTypeIndex = new Map;
    for (const e of this.edges) {
      const type = e.type ?? "";
      let set = this.edgeTypeIndex.get(type);
      if (!set) {
        set = new Set;
        this.edgeTypeIndex.set(type, set);
      }
      if (!e.finished)
        set.add(e);
    }
  }
  addNode(node) {
    this.version++;
    const res = Object.assign({}, node);
    delete res.id;
    delete res.finished;
    res.id = import_lodash6.default.uniqueId("node_");
    res.finished = false;
    res.incomingEdges = new Set;
    res.outgoingEdges = new Set;
    res.incomingEdgeTypeIndex = new Map;
    res.outgoingEdgeTypeIndex = new Map;
    if (res.type == null)
      res.type = "";
    this.nodes.push(res);
    let typeSet = this.nodeTypeIndex.get(res.type);
    if (!typeSet) {
      typeSet = new Set;
      this.nodeTypeIndex.set(res.type, typeSet);
    }
    typeSet.add(res);
    return res;
  }
  addEdge(edge) {
    this.version++;
    const res = Object.assign({}, edge);
    delete res.id;
    delete res.finished;
    res.id = import_lodash6.default.uniqueId("edge_");
    res.finished = false;
    if (res.type == null)
      res.type = "";
    this.edges.push(res);
    let typeSet = this.edgeTypeIndex.get(res.type);
    if (!typeSet) {
      typeSet = new Set;
      this.edgeTypeIndex.set(res.type, typeSet);
    }
    typeSet.add(res);
    const fromNode = res.from.node;
    fromNode.outgoingEdges.add(res);
    let fromTypeSet = fromNode.outgoingEdgeTypeIndex.get(res.type);
    if (!fromTypeSet) {
      fromTypeSet = new Set;
      fromNode.outgoingEdgeTypeIndex.set(res.type, fromTypeSet);
    }
    fromTypeSet.add(res);
    const toNode = res.to.node;
    toNode.incomingEdges.add(res);
    let toTypeSet = toNode.incomingEdgeTypeIndex.get(res.type);
    if (!toTypeSet) {
      toTypeSet = new Set;
      toNode.incomingEdgeTypeIndex.set(res.type, toTypeSet);
    }
    toTypeSet.add(res);
    return res;
  }
  _getEdgeSource(pattern) {
    if (pattern.type !== undefined) {
      if (pattern.from?.node?.outgoingEdgeTypeIndex instanceof Map) {
        const set2 = pattern.from.node.outgoingEdgeTypeIndex.get(pattern.type);
        return set2 ? [...set2] : [];
      }
      if (pattern.to?.node?.incomingEdgeTypeIndex instanceof Map) {
        const set2 = pattern.to.node.incomingEdgeTypeIndex.get(pattern.type);
        return set2 ? [...set2] : [];
      }
      const set = this.edgeTypeIndex.get(pattern.type);
      return set ? [...set] : [];
    }
    if (pattern.from?.node?.outgoingEdges instanceof Set) {
      return [...pattern.from.node.outgoingEdges];
    }
    if (pattern.to?.node?.incomingEdges instanceof Set) {
      return [...pattern.to.node.incomingEdges];
    }
    return this.edges.filter((e) => !e.finished);
  }
  matchNodes(pattern) {
    if (pattern === undefined) {
      return import_lodash6.default(this.nodes.filter((n) => !n.finished));
    }
    if (pattern.type !== undefined) {
      const typeSet = this.nodeTypeIndex.get(pattern.type);
      return import_lodash6.default(typeSet ? [...typeSet] : []).filter(pattern);
    }
    return import_lodash6.default(this.nodes.filter((n) => !n.finished)).filter(pattern);
  }
  matchDirectedEdges(pattern) {
    if (pattern === undefined) {
      return import_lodash6.default(this.edges.filter((e) => !e.finished));
    }
    return import_lodash6.default(this._getEdgeSource(pattern)).filter(pattern);
  }
  matchUndirectedEdges(pattern) {
    return this.matchDirectedEdges(pattern).union(this.matchDirectedEdges(this.inverse(pattern)).map(this.inverse.bind(this)).value()).uniqBy("id");
  }
  findNode(pattern) {
    if (pattern === undefined) {
      for (const n of this.nodes) {
        if (!n.finished)
          return n;
      }
      return;
    }
    if (pattern.type !== undefined) {
      const typeSet = this.nodeTypeIndex.get(pattern.type);
      return import_lodash6.default(typeSet ? [...typeSet] : []).find(pattern);
    }
    return import_lodash6.default(this.nodes.filter((n) => !n.finished)).find(pattern);
  }
  findDirectedEdge(pattern) {
    if (pattern === undefined) {
      for (const e of this.edges) {
        if (!e.finished)
          return e;
      }
      return;
    }
    return import_lodash6.default(this._getEdgeSource(pattern)).find(pattern);
  }
  findUndirectedEdge(pattern) {
    var res = this.findDirectedEdge(pattern);
    if (!import_lodash6.default.isUndefined(res))
      return res;
    return this.inverse(this.findDirectedEdge(this.inverse(pattern)));
  }
  reduceNodes(pattern, iteratee, accumulator, thisArg) {
    var current = this.findNode(pattern);
    var result = accumulator === undefined ? [] : accumulator;
    var boundIteratee = import_lodash6.default.bind(iteratee, thisArg);
    var i = 0;
    while (current !== undefined) {
      result = boundIteratee(result, current, i);
      current = this.findNode(pattern);
    }
    return import_lodash6.default(result);
  }
  reduceDirectedEdges(pattern, iteratee, accumulator, thisArg) {
    var current = this.findDirectedEdge(pattern);
    var result = accumulator === undefined ? [] : accumulator;
    var boundIteratee = import_lodash6.default.bind(iteratee, thisArg);
    var i = 0;
    while (current !== undefined) {
      result = boundIteratee(result, current, i);
      current = this.findDirectedEdge(pattern);
    }
    return import_lodash6.default(result);
  }
  reduceUndirectedEdges(pattern, iteratee, accumulator, thisArg) {
    var current = this.findUndirectedEdge(pattern);
    var result = accumulator === undefined ? [] : accumulator;
    var boundIteratee = import_lodash6.default.bind(iteratee, thisArg);
    var i = 0;
    while (current !== undefined) {
      result = boundIteratee(result, current, i);
      current = this.findUndirectedEdge(pattern);
    }
    return import_lodash6.default(result);
  }
  inverse(edge) {
    if (import_lodash6.default.isUndefined(edge) || import_lodash6.default.isNull(edge))
      return;
    let res = import_lodash6.default.clone(edge);
    let _from = res.from;
    let _to = res.to;
    res.from = _to;
    res.to = _from;
    if (import_lodash6.default.isUndefined(res.from))
      delete res.from;
    if (import_lodash6.default.isUndefined(res.to))
      delete res.to;
    return res;
  }
  clean() {
    this.nodes = this.nodes.filter((n) => !n.finished);
    this.edges = this.edges.filter((e) => !e.finished);
  }
  finish(x) {
    if (x.finished)
      return x;
    x.finished = true;
    this.version++;
    if (x.outgoingEdges instanceof Set) {
      const typeSet = this.nodeTypeIndex.get(x.type);
      if (typeSet)
        typeSet.delete(x);
      const incidentEdges = new Set;
      for (const e of x.outgoingEdges)
        incidentEdges.add(e);
      for (const e of x.incomingEdges)
        incidentEdges.add(e);
      for (const edge of incidentEdges) {
        if (!edge.finished) {
          edge.finished = true;
          this._removeEdgeFromIndexes(edge);
        }
      }
      x.outgoingEdges.clear();
      x.incomingEdges.clear();
      x.outgoingEdgeTypeIndex.clear();
      x.incomingEdgeTypeIndex.clear();
    } else {
      this._removeEdgeFromIndexes(x);
    }
    return x;
  }
  _removeEdgeFromIndexes(edge) {
    const typeSet = this.edgeTypeIndex.get(edge.type);
    if (typeSet)
      typeSet.delete(edge);
    const fromNode = edge.from.node;
    fromNode.outgoingEdges?.delete(edge);
    fromNode.outgoingEdgeTypeIndex?.get(edge.type)?.delete(edge);
    const toNode = edge.to.node;
    toNode.incomingEdges?.delete(edge);
    toNode.incomingEdgeTypeIndex?.get(edge.type)?.delete(edge);
  }
  nodeIsFinished(n) {
    return n.finished === true;
  }
  nodeIsNotFinished(n) {
    return !this.nodeIsFinished(n);
  }
  edgeIsFinished(e) {
    return e.finished === true || this.nodeIsFinished(e.to.node) || this.nodeIsFinished(e.from.node);
  }
  edgeIsNotFinished(e) {
    return !this.edgeIsFinished(e);
  }
  toDotWithParamaters(def) {
    var nodeDefaults = {
      shape: "ellipse",
      style: "filled",
      color: "#b0b0b0",
      fontname: "Times",
      label: "Node"
    };
    var edgeDefaults = {
      arrowsize: 1,
      arrowHead: "normal",
      color: "#333333",
      fontname: "Times-Italic",
      label: "Edge",
      headlabel: "",
      taillabel: ""
    };
    var nodeTemplate = import_lodash6.default.template(`<%=id%> [shape="<%=shape%>", style="<%=style%>", color="<%=color%>", fontname="<%=fontname%>", label="<%=label%>" ]
`);
    var directedEdgeTemplate = import_lodash6.default.template(`<%=from.node.id%> -> <%=to.node.id%> [dir=forward, arrowHead=normal, fontname="<%=fontname%>", arrowsize=<%=arrowsize%>, color="<%=color%>", label="<%=label%>",  headlabel="<%=headlabel%>", taillabel="<%=taillabel%>" ]
`);
    var undirectedEdgeTemplate = import_lodash6.default.template(`<%=from.node.id%> -> <%=to.node.id%> [dir=none, arrowHead=none, fontname="<%=fontname%>", arrowsize=<%=arrowsize%>, color="<%=color%>", label="<%=label%>",  headlabel="<%=headlabel%>", taillabel="<%=taillabel%>" ]
`);
    var that = this;
    var res = "digraph g{";
    import_lodash6.default(def.nodes).forEach((desc, key) => {
      that.matchNodes({
        type: key
      }).map((x) => import_lodash6.default.assign(import_lodash6.default.clone(nodeDefaults), {
        id: x.id,
        color: desc.color
      }, desc.transform(x))).forEach((x) => {
        res += nodeTemplate(x);
      }).commit();
    }).commit();
    import_lodash6.default(def.directedEdges).forEach((desc, key) => {
      that.matchDirectedEdges({
        type: key
      }).map((x) => import_lodash6.default.assign(import_lodash6.default.clone(edgeDefaults), {
        id: x.id,
        color: desc.color,
        from: x.from,
        to: x.to
      }, desc.transform(x))).forEach((x) => {
        res += directedEdgeTemplate(x);
      }).commit();
    }).commit();
    import_lodash6.default(def.undirectedEdges).forEach((desc, key) => {
      that.matchUndirectedEdges({
        type: key
      }).map((x) => import_lodash6.default.assign(import_lodash6.default.clone(edgeDefaults), {
        id: x.id,
        color: desc.color,
        from: x.from,
        to: x.to
      }, desc.transform(x))).forEach((x) => {
        res += undirectedEdgeTemplate(x);
      }).commit();
    }).commit();
    res += "}";
    return res;
  }
  toDot() {
    return this.toDotWithParamaters({
      nodes: {
        Interaction: {
          color: "#ffd1d1",
          transform: (x) => ({
            label: x.content.operatorType + `
` + x.content.operator.replace(/"/g, "")
          })
        },
        InteractionInstance: {
          color: "#ffed8e",
          transform: (x) => ({
            shape: x.content.type === "InteractionSimple" ? "ellipse" : "box",
            color: x.content.type === "InteractionSimple" ? "#ffde2f" : "#dff1f2",
            fontname: x.content.type === "InteractionSimple" ? "Times" : "Courier",
            label: x.id + `
` + (x.content.type === "InteractionSimple" ? x.content.operatorType + `
` + x.content.operator.replace(/"/g, "") : x.content.content.replace(/"/g, "")) + `
` + x.ports.map((x2, i) => i + ": " + serialize(x2)).join(`
`)
          })
        },
        InteractionDefinition: {
          color: "#afe7ff",
          transform: (x) => ({
            label: x.content.signature.operator
          })
        },
        InterfaceDefinition: {
          color: "#afffe4",
          transform: (x) => ({
            label: x.content.signature
          })
        },
        InteractionSignatureOperandElement: {
          color: "#2fffc7",
          transform: (x) => ({
            label: x.content.name
          })
        },
        Interface: {
          color: "#2fcdff",
          transform: (x) => ({
            label: x.content.type === "InterfaceAtomic" ? x.name + " : " + serialize(x.content) : x.name
          })
        }
      },
      directedEdges: {
        DefinitionSubInteractionInstance: {
          color: "#ffd3b3",
          transform: (x) => ({
            label: ""
          })
        },
        DefinitionInteractionInstance: {
          color: "#ff6b00",
          transform: (x) => ({
            label: ""
          })
        },
        InteractionInstanceIsOperandOf: {
          color: "#00ff03",
          transform: (x) => ({
            label: x.to.index
          })
        },
        InteractionInstanceInteraction: {
          color: "#ffa800",
          transform: (x) => ({
            label: ""
          })
        },
        InteractionOperand: {
          color: "#d00000",
          transform: (x) => ({
            label: x.from.index
          })
        },
        DefinitionInteraction: {
          color: "#ff0000",
          transform: (x) => ({
            label: x.from.index
          })
        },
        DefinitionSubInteraction: {
          color: "#ffd5d5",
          transform: (x) => ({
            label: ""
          })
        },
        SignatureOperand: {
          color: "#2fffc7",
          transform: (x) => ({
            label: x.from.index
          })
        },
        InteractionSignatureOperandElementInterface: {
          color: "#00e8ff",
          transform: (x) => ({
            label: ""
          })
        },
        DefinitionInterface: {
          color: "#00e8ff",
          transform: (x) => ({
            label: ""
          })
        },
        DefinitionSubInterface: {
          color: "#bef9ff",
          transform: (x) => ({
            label: ""
          })
        },
        InterfaceElement: {
          color: "#008cff",
          transform: (x) => ({
            label: x.from.index
          })
        },
        InterfaceInteractionInstance: {
          color: "#e300ff",
          transform: (x) => ({
            label: ""
          })
        },
        DefinitionDefinition: {
          color: "#81ddff",
          transform: (x) => ({
            label: x.from.index
          })
        },
        InteractionDefinition: {
          color: "#e681ff",
          transform: (x) => ({
            label: ""
          })
        },
        InterfaceDefinition: {
          color: "#2bff00",
          transform: (x) => ({
            label: ""
          })
        },
        InteractionDefinitionDependency: {
          color: "#0040ff",
          transform: (x) => ({
            label: ""
          })
        },
        InterfaceDefinitionDependency: {
          color: "#b5ff00",
          transform: (x) => ({
            label: ""
          })
        },
        InteractionInstanceDataDependency: {
          color: "#ddd2ff",
          transform: (x) => ({
            label: ""
          })
        },
        InteractionInstanceOrdering: {
          color: "#cc00ff",
          transform: (x) => ({
            label: x.executionOrder
          })
        }
      },
      undirectedEdges: {
        InteractionInstanceOperand: {
          color: "#9d8400",
          transform: (x) => ({
            label: x.id,
            headlabel: x.to.index + (import_lodash6.default.isUndefined(x.to.ports) ? "" : ": " + serialize(x.to.ports)) + (import_lodash6.default.isUndefined(x.to.compositionElementName) ? "" : ": " + x.to.compositionElementName),
            taillabel: x.from.index + (import_lodash6.default.isUndefined(x.from.ports) ? "" : ": " + serialize(x.from.ports)) + (import_lodash6.default.isUndefined(x.from.compositionElementName) ? "" : ": " + x.from.compositionElementName)
          })
        }
      }
    });
  }
  toDot2() {
    return this.toDotWithParamaters({
      nodes: {
        port: {
          color: "#94ff87",
          transform: (x) => ({
            label: x.ports.compositionElementName + `
` + x.node.content.operator + x.node.content.content
          })
        },
        coPort: {
          color: "#dce7f9",
          transform: (x) => ({
            label: x.ports.coCompositionElementName + `
` + x.node.content.operator + x.node.content.content
          })
        }
      },
      directedEdges: {
        normal: {
          color: "#000000",
          transform: (x) => ({
            label: ""
          })
        },
        loop: {
          color: "#ff0000",
          transform: (x) => ({
            label: ""
          })
        },
        closure: {
          color: "#c79999",
          transform: (x) => ({
            label: ""
          })
        }
      },
      undirectedEdges: {}
    });
  }
}
var g_default = Graph;
// ../lidl-core/src/graphCompiler.ts
var exports_graphCompiler = {};
__export(exports_graphCompiler, {
  graphTransformationPipeline: () => graphTransformationPipeline,
  compile: () => compile
});
var import_lodash27 = __toESM(require_lodash(), 1);

// ../lidl-core/src/graphInputs/addInteractionDefinitionToGraph.ts
var import_lodash9 = __toESM(require_lodash(), 1);

// ../lidl-core/src/graphInputs/addInterfaceToGraph.ts
var import_lodash7 = __toESM(require_lodash(), 1);
function addInterfaceToGraph(graph, interfac, prefix, definitionNode) {
  var rootNode;
  switch (interfac.type) {
    case "InterfaceAtomic":
      rootNode = graph.addNode({
        type: "Interface",
        name: prefix,
        content: interfac
      });
      break;
    case "InterfaceComposite":
      rootNode = graph.addNode({
        type: "Interface",
        name: prefix,
        content: interfac
      });
      let nodeOfElement = import_lodash7.default(interfac.element).map((x) => addInterfaceToGraph(graph, x.value, prefix + "." + x.key, definitionNode)).value();
      import_lodash7.default(nodeOfElement).forEach((x, index) => graph.addEdge({
        type: "InterfaceElement",
        from: {
          node: rootNode,
          index: index + 1
        },
        to: {
          node: x,
          index: 0
        }
      })).commit();
      break;
    case "InterfaceNamed":
      rootNode = graph.addNode({
        type: "Interface",
        name: prefix,
        content: interfac
      });
      break;
    default:
      throw new Error("Cannot transform into a graph the interface of type " + interfac.type);
  }
  graph.addEdge({
    type: "DefinitionSubInterface",
    from: {
      node: definitionNode
    },
    to: {
      node: rootNode
    }
  });
  return rootNode;
}

// ../lidl-core/src/graphInputs/addInteractionToGraph.ts
var import_lodash8 = __toESM(require_lodash(), 1);
function addInteractionToGraph(graph, interaction, definitionNode) {
  var rootNode;
  switch (interaction.type) {
    case "InteractionSimple":
      rootNode = graph.addNode({
        type: "Interaction",
        content: interaction,
        ports: []
      });
      graph.addEdge({
        type: "DefinitionSubInteraction",
        from: {
          node: definitionNode
        },
        to: {
          node: rootNode
        }
      });
      import_lodash8.default(interaction.operand).map((operand) => addInteractionToGraph(graph, operand, definitionNode)).forEach((x, index) => {
        graph.addEdge({
          type: "InteractionOperand",
          content: interaction,
          from: {
            node: rootNode,
            index: index + 1
          },
          to: {
            node: x,
            index: 0
          }
        });
      }).commit();
      break;
    case "InteractionNative":
      rootNode = graph.addNode({
        type: "Interaction",
        content: interaction,
        ports: []
      });
      graph.addEdge({
        type: "DefinitionSubInteraction",
        from: {
          node: definitionNode
        },
        to: {
          node: rootNode
        }
      });
      break;
    default:
      throw new Error("Trying to transform into a graph an invalid interaction of type " + interaction.type);
  }
  return rootNode;
}

// ../lidl-core/src/graphInputs/addInteractionDefinitionToGraph.ts
function addInteractionDefinitionToGraph(graph, definition) {
  let rootNode = graph.addNode({
    type: "InteractionDefinition",
    content: definition,
    instantiated: false
  });
  import_lodash9.default(definition.definitions).map((subDefinition) => addDefinitionToGraph(graph, subDefinition)).forEach((subDefinitionNode, index) => {
    graph.addEdge({
      type: "DefinitionDefinition",
      from: {
        node: rootNode,
        index: index + 1
      },
      to: {
        node: subDefinitionNode,
        index: 0
      }
    });
  }).commit();
  import_lodash9.default(definition.signature.operand).map((operand) => {
    let operandNode = graph.addNode({
      type: "InteractionSignatureOperandElement",
      content: operand
    });
    let operandInterfaceNode = addInterfaceToGraph(graph, operand.interfac, "theArgs." + operand.name, rootNode);
    graph.addEdge({
      type: "InteractionSignatureOperandElementInterface",
      from: {
        node: operandNode
      },
      to: {
        node: operandInterfaceNode
      }
    });
    return operandNode;
  }).forEach((operandNode, index) => {
    graph.addEdge({
      type: "SignatureOperand",
      from: {
        node: rootNode,
        index: index + 1
      },
      to: {
        node: operandNode,
        index: 0
      }
    });
  }).commit();
  let interfaceNode = addInterfaceToGraph(graph, definition.signature.interfac, "theInterface", rootNode);
  graph.addEdge({
    type: "DefinitionInterface",
    from: {
      node: rootNode
    },
    to: {
      node: interfaceNode
    }
  });
  graph.addEdge({
    type: "DefinitionInteraction",
    from: {
      node: rootNode
    },
    to: {
      node: addInteractionToGraph(graph, definition.interaction, rootNode)
    }
  });
  return rootNode;
}

// ../lidl-core/src/graphInputs/addInterfaceDefinitionToGraph.ts
function addInterfaceDefinitionToGraph(graph, definition) {
  let rootNode = graph.addNode({
    type: "InterfaceDefinition",
    content: definition,
    instantiated: false
  });
  let interfacNode = addInterfaceToGraph(graph, definition.interfac, definition.signature, rootNode);
  graph.addEdge({
    type: "DefinitionInterface",
    from: {
      node: rootNode
    },
    to: {
      node: interfacNode
    }
  });
  return rootNode;
}

// ../lidl-core/src/graphInputs/addDefinitionToGraph.ts
function addDefinitionToGraph(graph, definition) {
  if (definition.type === "InteractionDefinition") {
    return addInteractionDefinitionToGraph(graph, definition);
  } else if (definition.type === "InterfaceDefinition") {
    return addInterfaceDefinitionToGraph(graph, definition);
  }
}

// ../lidl-core/src/graphTransformations/addOperatorTypeAnnotation.ts
function addOperatorTypeAnnotation(graph) {
  graph.matchNodes({ type: "Interaction", content: { type: "InteractionSimple" } }).forEach((x) => {
    x.content.operatorType = operator_default.parse(x.content.operator);
  }).commit();
}

// ../lidl-core/src/graphTransformations/referentialTransparency.ts
var import_lodash10 = __toESM(require_lodash(), 1);
function edgeKey(e) {
  return `${e.from.index}:${e.to.index}:${e.to.node.id}`;
}
function referentialTransparency(graph) {
  graph.matchNodes({ type: "Interaction", content: { type: "InteractionSimple" } }).forEach((theNode) => {
    theNode.referentialTransparencySolved = false;
    theNode.referentialTransparencySolvable = graph.matchUndirectedEdges({
      type: "InteractionOperand",
      from: { node: theNode }
    }).filter((e) => e.from.index > 0).size() == 0;
  }).commit();
  const operatorIndex = new Map;
  graph.matchNodes({ type: "Interaction", content: { type: "InteractionSimple" } }).forEach((n) => {
    const op = n.content.operator;
    let group = operatorIndex.get(op);
    if (!group) {
      group = [];
      operatorIndex.set(op, group);
    }
    group.push(n);
  }).commit();
  graph.reduceNodes({
    type: "Interaction",
    content: { type: "InteractionSimple" },
    referentialTransparencySolved: false,
    referentialTransparencySolvable: true
  }, (theResult, theNode) => {
    let theChildrenEdges = graph.matchUndirectedEdges({
      type: "InteractionOperand",
      from: { node: theNode }
    }).filter((e) => e.from.index > 0).value();
    const theChildrenKeys = new Set(theChildrenEdges.map(edgeKey));
    let parentDef = graph.findDirectedEdge({
      type: "DefinitionSubInteraction",
      to: { node: theNode }
    }).from.node;
    const candidates = operatorIndex.get(theNode.content.operator) || [];
    let similarNodes = candidates.filter((n) => {
      if (n.finished)
        return false;
      if (import_lodash10.default.isUndefined(graph.findDirectedEdge({
        type: "DefinitionSubInteraction",
        from: { node: parentDef },
        to: { node: n }
      })))
        return false;
      const nChildrenEdges = graph.matchUndirectedEdges({
        type: "InteractionOperand",
        from: { node: n }
      }).filter((e) => e.from.index > 0).value();
      if (nChildrenEdges.length !== theChildrenKeys.size)
        return false;
      const nKeys = new Set(nChildrenEdges.map(edgeKey));
      if (nKeys.size !== theChildrenKeys.size)
        return false;
      for (const key of nKeys) {
        if (!theChildrenKeys.has(key))
          return false;
      }
      return true;
    });
    let newNode = graph.addNode(theNode);
    let group = operatorIndex.get(theNode.content.operator);
    if (group)
      group.push(newNode);
    graph.matchDirectedEdges({
      type: "DefinitionInteraction",
      to: { node: theNode }
    }).forEach((e) => graph.addEdge({
      type: "DefinitionInteraction",
      from: e.from,
      to: { node: newNode }
    })).commit();
    graph.matchDirectedEdges({
      type: "DefinitionSubInteraction",
      to: { node: theNode }
    }).forEach((e) => graph.addEdge({
      type: "DefinitionSubInteraction",
      from: e.from,
      to: { node: newNode }
    })).commit();
    import_lodash10.default(theChildrenEdges).forEach((ce) => {
      graph.addEdge({
        type: "InteractionOperand",
        from: { node: newNode, index: ce.from.index, ports: ce.from.ports },
        to: ce.to
      });
    }).commit();
    newNode.referentialTransparencySolved = true;
    newNode.referentialTransparencySolvable = false;
    import_lodash10.default(similarNodes).forEach((similarNode) => {
      graph.matchUndirectedEdges({
        type: "InteractionOperand",
        from: { node: similarNode, index: 0 }
      }).forEach((edgeFromSimilarNode) => {
        graph.addEdge({
          type: "InteractionOperand",
          from: {
            node: newNode,
            index: edgeFromSimilarNode.from.index,
            ports: edgeFromSimilarNode.from.ports
          },
          to: edgeFromSimilarNode.to
        });
      }).commit();
      graph.finish(similarNode);
    }).commit();
    graph.matchNodes({
      type: "Interaction",
      content: { type: "InteractionSimple" },
      referentialTransparencySolved: false,
      referentialTransparencySolvable: false
    }).filter((n) => {
      return graph.matchUndirectedEdges({
        type: "InteractionOperand",
        from: { node: n }
      }).filter((x) => x.from.index > 0).every((x) => {
        return x.to.node.referentialTransparencySolved === true;
      });
    }).forEach((n) => {
      n.referentialTransparencySolvable = true;
    }).commit();
  });
}

// ../lidl-core/src/graphTransformations/linkInteractionsToDefinitions.ts
var import_lodash11 = __toESM(require_lodash(), 1);
function linkInteractionsToDefinitions(graph) {
  graph.matchNodes({ type: "Interaction", content: { type: "InteractionSimple" } }).forEach((theNode) => {
    if (theNode.content.operatorType === "Custom") {
      theNode.hasDefinition = false;
    } else {
      theNode.hasDefinition = true;
      theNode.isArgument = false;
      theNode.isCustom = false;
      theNode.isBase = true;
    }
  }).commit();
  graph.reduceNodes({
    type: "Interaction",
    content: { type: "InteractionSimple", operatorType: "Custom" },
    hasDefinition: false
  }, (theResult, theNode) => {
    let edgeToParent = graph.findDirectedEdge({
      type: "DefinitionSubInteraction",
      to: { node: theNode }
    });
    while (!import_lodash11.default.isUndefined(edgeToParent)) {
      let parentDef = edgeToParent.from.node;
      let childDefs = graph.matchDirectedEdges({
        type: "DefinitionDefinition",
        from: { node: parentDef }
      }).map("to.node").filter((defNode) => defNode.content.signature.operator === theNode.content.operator).value();
      if (import_lodash11.default.size(childDefs) > 1) {
        throw new Error("LIDL does not support polymorphism yet (for interaction operator " + theNode.content.operator + ")");
      } else if (import_lodash11.default.size(childDefs) === 1) {
        graph.addEdge({
          type: "InteractionDefinition",
          from: { node: theNode },
          to: { node: import_lodash11.default.first(childDefs) }
        });
        theNode.hasDefinition = true;
        theNode.isArgument = false;
        theNode.isCustom = true;
        theNode.isBase = false;
        break;
      }
      let argPos = import_lodash11.default(parentDef.content.signature.operand).map("name").indexOf(theNode.content.operator) + 1;
      if (argPos > 0) {
        let argNode = graph.findDirectedEdge({
          type: "SignatureOperand",
          from: { node: parentDef, index: argPos }
        }).to.node;
        graph.addEdge({
          type: "InteractionDefinition",
          from: { node: theNode },
          to: { node: argNode }
        });
        theNode.hasDefinition = true;
        theNode.isArgument = true;
        theNode.isCustom = false;
        theNode.isBase = false;
        break;
      }
      edgeToParent = graph.findDirectedEdge({
        type: "DefinitionDefinition",
        to: { node: parentDef }
      });
    }
    if (!theNode.hasDefinition) {
      theNode.content.operator = "#" + theNode.content.operator;
      theNode.content.operatorType = "Identifier";
      theNode.hasDefinition = true;
      theNode.isArgument = false;
      theNode.isCustom = false;
      theNode.isBase = true;
    }
  });
}

// ../lidl-core/src/graphTransformations/addInterfaceInformationToInteractions.ts
function addInterfaceInformationToInteractions(graph) {
  addInterfaceInformationToArguments(graph);
  addInterfaceInformationToMainInteractions(graph);
}
function addInterfaceInformationToArguments(graph) {
  graph.matchNodes({ type: "Interaction", isArgument: true }).forEach((theNode) => {
    let theArgumentNode = graph.findDirectedEdge({
      type: "InteractionDefinition",
      from: { node: theNode }
    }).to.node;
    let theArgumentInterfaceNode = graph.findDirectedEdge({
      type: "InteractionSignatureOperandElementInterface",
      from: { node: theArgumentNode }
    }).to.node;
    theNode.ports = [theArgumentInterfaceNode.content];
  }).commit();
}
function addInterfaceInformationToMainInteractions(graph) {
  graph.matchNodes({ type: "InteractionDefinition" }).forEach((theNode) => {
    let theInterfaceNode = graph.findDirectedEdge({
      type: "DefinitionInterface",
      from: { node: theNode }
    }).to.node;
    let theMainInteractionNode = graph.findDirectedEdge({
      type: "DefinitionInteraction",
      from: { node: theNode }
    }).to.node;
    theMainInteractionNode.ports = [theInterfaceNode.content];
  }).commit();
}

// ../lidl-core/src/graphTransformations/expandDefinitions.ts
var import_lodash12 = __toESM(require_lodash(), 1);
function expandDefinitions(graph) {
  graph.matchNodes({
    type: "InteractionDefinition"
  }).forEach((defNode) => {
    defNode.markedDuringDefinitionGraphOrdering = false;
    graph.matchDirectedEdges({
      type: "DefinitionSubInteraction",
      from: {
        node: defNode
      },
      to: {
        node: {
          isCustom: true
        }
      }
    }).map("to.node").forEach((subInteractionNode) => {
      let subInteractionDefNode = graph.findDirectedEdge({
        type: "InteractionDefinition",
        from: {
          node: subInteractionNode
        }
      }).to.node;
      if (import_lodash12.default.isUndefined(graph.findDirectedEdge({
        type: "InteractionDefinitionDependency",
        from: {
          node: defNode
        },
        to: {
          node: subInteractionDefNode
        }
      }))) {
        graph.addEdge({
          type: "InteractionDefinitionDependency",
          from: {
            node: defNode
          },
          to: {
            node: subInteractionDefNode
          }
        });
      }
    }).commit();
  }).commit();
  let orderingList = [];
  graph.reduceNodes({
    type: "InteractionDefinition",
    markedDuringDefinitionGraphOrdering: false
  }, (theResult, theNode) => {
    visitDef(theNode);
  });
  function visitDef(n) {
    if (n.temporarilyMarkedDuringDefinitionGraphOrdering === true) {
      throw new Error("the definition structure contains circular definitions");
    } else {
      if (n.markedDuringDefinitionGraphOrdering !== true) {
        n.temporarilyMarkedDuringDefinitionGraphOrdering = true;
        graph.matchNodes((m) => graph.matchDirectedEdges({
          type: "InteractionDefinitionDependency",
          from: {
            node: n
          },
          to: {
            node: m
          }
        }).size() > 0).forEach(visitDef).commit();
        n.markedDuringDefinitionGraphOrdering = true;
        n.temporarilyMarkedDuringDefinitionGraphOrdering = false;
        orderingList.unshift(n);
      }
    }
  }
  import_lodash12.default(orderingList).reverse().forEach((defNode) => {
    instantiateDefinitionInteraction(graph, defNode);
  }).commit();
}
function instantiateDefinitionInteraction(graph, definitionNode) {
  let rootInteraction = graph.findDirectedEdge({
    type: "DefinitionInteraction",
    from: {
      node: definitionNode
    }
  }).to.node;
  rootInteraction.isRootOfDefiniton = true;
  graph.matchDirectedEdges({
    type: "DefinitionSubInteraction",
    from: {
      node: definitionNode
    }
  }).forEach((edge) => {
    edge.to.node.markedDuringInteractionGraphOrdering = false;
  }).commit();
  let orderingList = [];
  graph.reduceDirectedEdges({
    type: "DefinitionSubInteraction",
    from: {
      node: definitionNode
    },
    to: {
      node: {
        markedDuringInteractionGraphOrdering: false
      }
    }
  }, (theResult, theEdge) => {
    visitInteraction(theEdge.to.node);
  });
  function visitInteraction(n) {
    if (n.temporarilyMarkedDuringInteractionGraphOrdering === true) {
      throw new Error("The interaction structure contains cycles");
    } else {
      if (n.markedDuringInteractionGraphOrdering !== true) {
        n.temporarilyMarkedDuringInteractionGraphOrdering = true;
        graph.matchNodes((m) => graph.matchDirectedEdges({
          type: "InteractionOperand",
          from: {
            node: n
          },
          to: {
            node: m
          }
        }).size() > 0).forEach(visitInteraction).commit();
        n.markedDuringInteractionGraphOrdering = true;
        n.temporarilyMarkedDuringInteractionGraphOrdering = false;
        orderingList.unshift(n);
      }
    }
  }
  import_lodash12.default(orderingList).reverse().forEach((interNode) => {
    let newNodes = instantiateInteraction(graph, interNode, definitionNode);
    import_lodash12.default(newNodes).forEach((n) => {
      graph.addEdge({
        type: "DefinitionSubInteractionInstance",
        from: {
          node: definitionNode
        },
        to: {
          node: n
        }
      });
    }).commit();
  }).commit();
  let instantiatedRoot = graph.findDirectedEdge({
    type: "DefinitionSubInteractionInstance",
    from: {
      node: definitionNode
    },
    to: {
      node: {
        isRootOfDefiniton: true
      }
    }
  }).to.node;
  graph.addEdge({
    type: "DefinitionInteractionInstance",
    from: {
      node: definitionNode
    },
    to: {
      node: instantiatedRoot
    }
  });
}
function instantiateInteraction(graph, interactionNode, stackDefNode) {
  let interactionoperandEdgesFrom = graph.matchDirectedEdges({
    type: "InteractionInstanceOperand",
    from: {
      node: interactionNode
    }
  }).value();
  let interactionoperandEdgesTo = graph.matchDirectedEdges({
    type: "InteractionOperand",
    to: {
      node: interactionNode
    }
  }).value();
  if (interactionNode.isBase) {
    let newNode = graph.addNode({
      type: "InteractionInstance",
      isRootOfDefiniton: interactionNode.isRootOfDefiniton,
      isArgument: false,
      content: interactionNode.content,
      ports: interactionNode.ports
    });
    graph.addEdge({
      type: "InteractionInstanceInteraction",
      from: {
        node: newNode
      },
      to: {
        node: interactionNode
      }
    });
    import_lodash12.default(interactionoperandEdgesFrom).forEach((edge) => {
      graph.addEdge({
        type: "InteractionInstanceOperand",
        from: {
          node: newNode,
          index: edge.from.index
        },
        to: edge.to
      });
    }).commit();
    import_lodash12.default(interactionoperandEdgesTo).forEach((edge) => {
      graph.addEdge({
        type: "InteractionInstanceOperand",
        to: {
          node: newNode,
          index: edge.to.index
        },
        from: edge.from
      });
    }).commit();
    graph.finish(interactionNode);
    let res = [newNode];
    import_lodash12.default(res).forEach((n) => {
      if (import_lodash12.default.isUndefined(n.content.meta.stack)) {
        n.content.meta.stack = [];
      }
      n.content.meta.stack.push(interactionNode);
    }).commit();
    return res;
  } else if (interactionNode.isArgument) {
    let newNode = graph.addNode({
      type: "InteractionInstance",
      isRootOfDefiniton: interactionNode.isRootOfDefiniton,
      isArgument: true,
      content: interactionNode.content,
      ports: interactionNode.ports
    });
    graph.addEdge({
      type: "InteractionInstanceInteraction",
      from: {
        node: newNode
      },
      to: {
        node: interactionNode
      }
    });
    let argNode = graph.findDirectedEdge({
      type: "InteractionDefinition",
      from: {
        node: interactionNode
      }
    }).to.node;
    let defPort = graph.findDirectedEdge({
      type: "SignatureOperand",
      to: {
        node: argNode
      }
    }).from;
    graph.addEdge({
      type: "InteractionInstanceIsOperandOf",
      from: {
        node: newNode
      },
      to: defPort
    });
    import_lodash12.default(interactionoperandEdgesTo).forEach((edge) => {
      graph.addEdge({
        type: "InteractionInstanceOperand",
        to: {
          node: newNode,
          index: edge.to.index
        },
        from: edge.from
      });
    }).commit();
    graph.finish(interactionNode);
    let res = [newNode];
    import_lodash12.default(res).forEach((n) => {
      if (import_lodash12.default.isUndefined(n.content.meta.stack)) {
        n.content.meta.stack = [];
      }
      n.content.meta.stack.push(interactionNode);
    }).commit();
    return res;
  } else if (interactionNode.isCustom) {
    let defNode = graph.findDirectedEdge({
      type: "InteractionDefinition",
      from: {
        node: interactionNode
      }
    }).to.node;
    let defInteractionInstanceNodes = graph.matchDirectedEdges({
      type: "DefinitionSubInteractionInstance",
      from: {
        node: defNode
      }
    }).map((x) => x.to.node).value();
    const defInstanceNodeSet = new Set(defInteractionInstanceNodes);
    let defInteractionInstanceEdges = graph.matchDirectedEdges({
      type: "InteractionInstanceOperand"
    }).filter((e) => defInstanceNodeSet.has(e.to.node) && defInstanceNodeSet.has(e.from.node)).value();
    let defInteractionInstanceIsOperandOf = graph.matchDirectedEdges({
      type: "InteractionInstanceIsOperandOf"
    }).filter((e) => defInstanceNodeSet.has(e.from.node)).value();
    let graphToCopy = {
      nodes: defInteractionInstanceNodes,
      edges: import_lodash12.default.union(defInteractionInstanceEdges, defInteractionInstanceIsOperandOf)
    };
    let newSubGraph = copy(graph, graphToCopy);
    let rootOfDef = import_lodash12.default(newSubGraph.nodes).find({
      isRootOfDefiniton: true
    });
    rootOfDef.isRootOfDefiniton = interactionNode.isRootOfDefiniton;
    import_lodash12.default(interactionoperandEdgesTo).forEach((edge) => {
      graph.addEdge({
        type: "InteractionInstanceOperand",
        to: {
          node: rootOfDef,
          index: edge.to.index
        },
        from: edge.from
      });
    }).commit();
    let argsOfDef = import_lodash12.default(newSubGraph.nodes).filter({
      isArgument: true
    }).map((nod) => {
      let directArg = graph.findDirectedEdge({
        type: "InteractionInstanceIsOperandOf",
        from: {
          node: nod
        },
        to: {
          node: defNode
        }
      });
      if (import_lodash12.default.isUndefined(directArg)) {
        return {
          node: nod,
          index: undefined
        };
      } else {
        return {
          node: nod,
          index: directArg.to.index
        };
      }
    }).reject((x) => import_lodash12.default.isUndefined(x.index)).value();
    import_lodash12.default(argsOfDef).forEach((el) => {
      import_lodash12.default(interactionoperandEdgesFrom).filter({
        from: {
          index: el.index
        }
      }).forEach((edge) => {
        graph.matchDirectedEdges({
          type: "InteractionInstanceOperand",
          to: {
            node: el.node
          }
        }).forEach((ed) => {
          graph.addEdge({
            type: "InteractionInstanceOperand",
            from: ed.from,
            to: edge.to
          });
        }).commit();
      }).commit();
      graph.finish(el.node);
    }).commit();
    graph.finish(interactionNode);
    let res = newSubGraph.nodes;
    import_lodash12.default(res).forEach((n) => {
      if (import_lodash12.default.isUndefined(n.content.meta.stack)) {
        n.content.meta.stack = [];
      }
      n.content.meta.stack.push(interactionNode);
    }).commit();
    return res;
  } else {
    throw new Error("Could not instantiate interaction " + interactionNode.content.operator + " " + interactionNode.id + " because it is not an argument, a base interaction or a custom defined interaction");
  }
}
function copy(graph, subgraph) {
  let newNodes = import_lodash12.default(subgraph.nodes).map((n) => graph.addNode(n)).value();
  const nodeMap = new Map(subgraph.nodes.map((n, i) => [n, newNodes[i]]));
  function copied(nod) {
    return nodeMap.get(nod) ?? nod;
  }
  let newEdges = import_lodash12.default(subgraph.edges).map((e) => graph.addEdge(import_lodash12.default.assign(import_lodash12.default.clone(e), {
    from: import_lodash12.default.assign(import_lodash12.default.clone(e.from), {
      node: copied(e.from.node)
    }),
    to: import_lodash12.default.assign(import_lodash12.default.clone(e.to), {
      node: copied(e.to.node)
    })
  }))).value();
  return {
    nodes: newNodes,
    edges: newEdges
  };
}

// ../lidl-core/src/graphTransformations/removeNonRootDefinitions.ts
function removeNonRootDefinition(graph, rootNode) {
  graph.matchNodes({ type: "InteractionDefinition" }).reject((x) => x === rootNode).forEach((x) => {
    graph.matchDirectedEdges({
      type: "DefinitionSubInteractionInstance",
      from: { node: x }
    }).forEach((e) => {
      graph.finish(e.to.node);
    }).commit();
    graph.matchDirectedEdges({
      type: "DefinitionSubInterface",
      from: { node: x }
    }).forEach((e) => {
      graph.finish(e.to.node);
    }).commit();
    graph.matchDirectedEdges({ type: "SignatureOperand", from: { node: x } }).forEach((e) => {
      graph.finish(e.to.node);
    }).commit();
    graph.finish(x);
  }).commit();
}

// ../lidl-core/src/graphTransformations/clearSubInformation.ts
function clearSubInformation(graph) {
  graph.matchDirectedEdges({ type: "DefinitionSubInterface" }).forEach((x) => {
    graph.finish(x);
  }).commit();
  graph.matchDirectedEdges({ type: "DefinitionSubInteractionInstance" }).forEach((x) => {
    graph.finish(x);
  }).commit();
}

// ../lidl-core/src/graphTransformations/instantiateInterfaces.ts
var import_lodash13 = __toESM(require_lodash(), 1);
function instantiateInterfaces(graph, defNode) {
  graph.matchNodes({
    type: "Interface"
  }).forEach((n) => {
    n.markedDuringInterfaceGraphOrdering = false;
  }).commit();
  let orderingList = [];
  graph.reduceNodes({
    type: "Interface",
    markedDuringInterfaceGraphOrdering: false
  }, (theResult, theNode) => {
    visitInterface(theNode);
  });
  function visitInterface(n) {
    if (n.temporarilyMarkedDuringInterfaceGraphOrdering === true) {
      throw new Error("the interface structure contains cycles");
    } else {
      if (n.markedDuringInterfaceGraphOrdering !== true) {
        n.temporarilyMarkedDuringInterfaceGraphOrdering = true;
        graph.matchNodes((m) => graph.matchDirectedEdges({
          type: "InterfaceElement",
          from: {
            node: n
          },
          to: {
            node: m
          }
        }).size() > 0).forEach(visitInterface).commit();
        n.markedDuringInterfaceGraphOrdering = true;
        n.temporarilyMarkedDuringInterfaceGraphOrdering = false;
        orderingList.unshift(n);
      }
    }
  }
  import_lodash13.default(orderingList).reverse().map((interfaceNode) => {
    instantiateInterface(graph, interfaceNode);
  }).commit();
}
function instantiateInterface(graph, interfacNode) {
  let prefix = interfacNode.name;
  let interfac = interfacNode.content;
  var rootNode;
  switch (interfac.type) {
    case "InterfaceAtomic":
      if (interfac.direction === "in") {
        rootNode = graph.addNode({
          type: "InteractionInstance",
          content: {
            type: "InteractionNative",
            content: "<%=a0%>=" + prefix + `;
`
          },
          ports: [conjugateInterface(interfac)]
        });
      } else {
        rootNode = graph.addNode({
          type: "InteractionInstance",
          content: {
            type: "InteractionNative",
            content: "" + prefix + `=<%=a0%>;
`
          },
          ports: [conjugateInterface(interfac)]
        });
      }
      break;
    case "InterfaceComposite":
      let nodeOfElement = graph.matchDirectedEdges({
        type: "InterfaceElement",
        from: {
          node: interfacNode
        }
      }).map((edge) => {
        let edgeToInstance = graph.findDirectedEdge({
          type: "InterfaceInteractionInstance",
          from: {
            node: edge.to.node
          }
        });
        return {
          index: edge.from.index,
          node: edgeToInstance.to.node
        };
      }).sortBy("index").value();
      rootNode = graph.addNode({
        type: "InteractionInstance",
        content: {
          type: "InteractionSimple",
          operator: toOperator(interfac),
          operatorType: "Composition"
        },
        ports: [conjugateInterface(interfac)]
      });
      import_lodash13.default(nodeOfElement).forEach((x) => {
        x.node.ports[0] = mergeInterface(x.node.ports[0], conjugateInterface(subInterface(interfac, interfac.element[x.index - 1].key)));
        rootNode.ports[x.index] = conjugateInterface(x.node.ports[0]);
        graph.addEdge({
          type: "InteractionInstanceOperand",
          content: interfac,
          from: {
            node: rootNode,
            index: x.index,
            compositionElementName: interfac.element[x.index - 1].key,
            ports: rootNode.ports[x.index]
          },
          to: {
            node: x.node,
            index: 0,
            ports: x.node.ports[0]
          }
        });
      }).commit();
      break;
    default:
      throw new Error("Cannot transform into a graph the interface of type " + interfac.type);
  }
  graph.addEdge({
    type: "InterfaceInteractionInstance",
    from: {
      node: interfacNode
    },
    to: {
      node: rootNode
    }
  });
  return rootNode;
}

// ../lidl-core/src/graphTransformations/linkArguments.ts
function linkArguments(graph, rootDefNode) {
  graph.matchDirectedEdges({
    type: "SignatureOperand",
    from: { node: rootDefNode }
  }).forEach((edge) => {
    let argumentInteractionInstanceNode = graph.findDirectedEdge({
      type: "InteractionInstanceIsOperandOf",
      to: { node: rootDefNode, index: edge.from.index }
    }).from.node;
    let signatureOperandElementNode = edge.to.node;
    let interfaceNode = graph.findDirectedEdge({
      type: "InteractionSignatureOperandElementInterface",
      from: { node: signatureOperandElementNode }
    }).to.node;
    let interfaceInteractionInstanceNode = graph.findDirectedEdge({
      type: "InterfaceInteractionInstance",
      from: { node: interfaceNode }
    }).to.node;
    if (signatureOperandElementNode.content.name !== argumentInteractionInstanceNode.content.operator) {
      throw new Error("Internal error: arguments with matching indices have different names " + signatureOperandElementNode.content.name + " and " + argumentInteractionInstanceNode.content.operator);
    }
    graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      from: { node: argumentInteractionInstanceNode }
    }).forEach((e) => {
      graph.addEdge({
        type: "InteractionInstanceOperand",
        from: {
          node: interfaceInteractionInstanceNode,
          index: e.from.index,
          ports: e.from.ports
        },
        to: e.to
      });
    }).commit();
    graph.matchUndirectedEdges({
      type: "DefinitionInteractionInstance",
      to: { node: argumentInteractionInstanceNode }
    }).forEach((e) => {
      graph.addEdge({
        type: "DefinitionInteractionInstance",
        from: e.from,
        to: { node: interfaceInteractionInstanceNode }
      });
    }).commit();
    graph.finish(argumentInteractionInstanceNode);
    graph.finish(signatureOperandElementNode);
    graph.finish(interfaceNode);
  }).commit();
}

// ../lidl-core/src/graphTransformations/linkInterface.ts
function linkInterface(graph, rootDefNode) {
  graph.matchDirectedEdges({
    type: "DefinitionInterface",
    from: { node: rootDefNode }
  }).forEach((edge) => {
    let mainInteractionInstanceNode = graph.findDirectedEdge({
      type: "DefinitionInteractionInstance",
      from: { node: rootDefNode }
    }).to.node;
    let interfaceNode = edge.to.node;
    let interfaceInteractionInstanceNode = graph.findDirectedEdge({
      type: "InterfaceInteractionInstance",
      from: { node: interfaceNode }
    }).to.node;
    graph.addEdge({
      type: "InteractionInstanceOperand",
      from: { node: mainInteractionInstanceNode, index: 0 },
      to: { node: interfaceInteractionInstanceNode, index: 0 }
    });
  }).commit();
}

// ../lidl-core/src/graphTransformations/keepOnlyInteractions.ts
function keepOnlyInteractions(graph) {
  graph.matchNodes().reject({ type: "InteractionInstance" }).forEach((n) => {
    graph.finish(n);
  }).commit();
}

// ../lidl-core/src/graphTransformations/referentialTransparencyInstances.ts
var import_lodash14 = __toESM(require_lodash(), 1);
function edgeKey2(e) {
  return `${e.from.index}:${e.to.index}:${e.to.node.id}`;
}
function referentialTransparencyInstances(graph) {
  graph.matchNodes({
    type: "InteractionInstance",
    content: { type: "InteractionSimple" }
  }).forEach((theNode) => {
    theNode.referentialTransparencySolved = false;
    theNode.referentialTransparencySolvable = graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      from: { node: theNode }
    }).filter((e) => e.from.index > 0).size() == 0;
  }).commit();
  const operatorIndex = new Map;
  graph.matchNodes({
    type: "InteractionInstance",
    content: { type: "InteractionSimple" }
  }).forEach((n) => {
    const op = n.content.operator;
    let group = operatorIndex.get(op);
    if (!group) {
      group = [];
      operatorIndex.set(op, group);
    }
    group.push(n);
  }).commit();
  graph.reduceNodes({
    type: "InteractionInstance",
    content: { type: "InteractionSimple" },
    referentialTransparencySolved: false,
    referentialTransparencySolvable: true
  }, (theResult, theNode) => {
    let theChildrenEdges = graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      from: { node: theNode }
    }).filter((e) => e.from.index > 0).value();
    const theChildrenKeys = new Set(theChildrenEdges.map(edgeKey2));
    const candidates = operatorIndex.get(theNode.content.operator) || [];
    let similarNodes = candidates.filter((n) => {
      if (n.finished)
        return false;
      const nChildrenEdges = graph.matchUndirectedEdges({
        type: "InteractionInstanceOperand",
        from: { node: n }
      }).filter((e) => e.from.index > 0).value();
      if (nChildrenEdges.length !== theChildrenKeys.size)
        return false;
      const nKeys = new Set(nChildrenEdges.map(edgeKey2));
      if (nKeys.size !== theChildrenKeys.size)
        return false;
      for (const key of nKeys) {
        if (!theChildrenKeys.has(key))
          return false;
      }
      return true;
    });
    let newNode = graph.addNode(theNode);
    let group = operatorIndex.get(theNode.content.operator);
    if (group)
      group.push(newNode);
    graph.matchDirectedEdges({
      type: "DefinitionInteraction",
      to: { node: theNode }
    }).forEach((e) => graph.addEdge({
      type: "DefinitionInteraction",
      from: e.from,
      to: { node: newNode }
    })).commit();
    import_lodash14.default(theChildrenEdges).forEach((ce) => {
      graph.addEdge({
        type: "InteractionInstanceOperand",
        from: { node: newNode, index: ce.from.index, ports: ce.from.ports },
        to: ce.to
      });
    }).commit();
    newNode.referentialTransparencySolved = true;
    newNode.referentialTransparencySolvable = false;
    import_lodash14.default(similarNodes).forEach((similarNode) => {
      graph.matchUndirectedEdges({
        type: "InteractionInstanceOperand",
        from: { node: similarNode, index: 0 }
      }).forEach((edgeFromSimilarNode) => {
        graph.addEdge({
          type: "InteractionInstanceOperand",
          from: {
            node: newNode,
            index: edgeFromSimilarNode.from.index,
            ports: edgeFromSimilarNode.from.ports
          },
          to: edgeFromSimilarNode.to
        });
      }).commit();
      graph.finish(similarNode);
    }).commit();
    graph.matchNodes({
      type: "InteractionInstance",
      content: { type: "InteractionSimple" },
      referentialTransparencySolved: false,
      referentialTransparencySolvable: false
    }).filter((n) => {
      return graph.matchUndirectedEdges({
        type: "InteractionInstanceOperand",
        from: { node: n }
      }).filter((x) => x.from.index > 0).every((x) => {
        return x.to.node.referentialTransparencySolved === true;
      });
    }).forEach((n) => {
      n.referentialTransparencySolvable = true;
    }).commit();
  });
}

// ../lidl-core/src/graphTransformations/linkIdentifiers.ts
function linkIdentifiers(graph) {
  graph.matchNodes({
    type: "InteractionInstance",
    content: {
      type: "InteractionSimple",
      operatorType: "Identifier"
    }
  }).forEach((theNode) => {
    let theReferenceNode = graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      from: {
        node: theNode,
        index: 0
      },
      to: {
        node: {
          type: "InteractionInstance",
          content: {
            type: "InteractionSimple",
            operatorType: "Reference"
          }
        },
        index: 1
      }
    }).map((theEdge) => theEdge.to.node).value();
    if (theReferenceNode.length > 1) {
      throw new Error("Fatal: referentialTransparency failed, there are two references to identifier " + serialize(theNode.content));
    } else if (theReferenceNode.length < 1) {
      return;
    } else {
      theReferenceNode = theReferenceNode[0];
    }
    let theCoReferenceNode = graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      from: {
        node: theNode,
        index: 0
      },
      to: {
        node: {
          type: "InteractionInstance",
          content: {
            type: "InteractionSimple",
            operatorType: "CoReference"
          }
        },
        index: 1
      }
    }).map((theEdge) => theEdge.to.node).value();
    if (theCoReferenceNode.length > 1) {
      throw new Error("Fatal: referentialTransparency failed, there are two co references to identifier " + serialize(theNode.content));
    } else if (theCoReferenceNode.length < 1) {
      return;
    } else {
      theCoReferenceNode = theCoReferenceNode[0];
    }
    graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      from: {
        node: theReferenceNode,
        index: 0
      }
    }).forEach((theEdge) => {
      graph.matchUndirectedEdges({
        type: "InteractionInstanceOperand",
        from: {
          node: theCoReferenceNode,
          index: 0
        }
      }).forEach((theCoEdge) => {
        graph.addEdge({
          type: "InteractionInstanceOperand",
          from: theEdge.to,
          to: theCoEdge.to
        });
      }).commit();
    }).commit();
  }).commit();
  graph.matchNodes({
    type: "InteractionInstance",
    content: {
      type: "InteractionSimple",
      operatorType: "Identifier"
    }
  }).forEach((theNode) => graph.finish(theNode)).commit();
  graph.matchNodes({
    type: "InteractionInstance",
    content: {
      type: "InteractionSimple",
      operatorType: "Reference"
    }
  }).forEach((theNode) => graph.finish(theNode)).commit();
  graph.matchNodes({
    type: "InteractionInstance",
    content: {
      type: "InteractionSimple",
      operatorType: "CoReference"
    }
  }).forEach((theNode) => graph.finish(theNode)).commit();
}

// ../lidl-core/src/graphTransformations/voidInteractionCreation.ts
function voidInteractionCreation(graph) {
  graph.reduceNodes({ type: "InteractionInstance", content: { operatorType: "Void" } }, (theResut, theNode) => {
    let newNode = graph.addNode({
      type: "InteractionInstance",
      content: {
        type: "InteractionNative",
        content: `/*Nothing, there was a void interaction*/
`
      },
      ports: [],
      isVoid: true
    });
    graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      to: { node: theNode, index: 0 }
    }).forEach((x) => graph.addEdge({
      type: "InteractionInstanceOperand",
      from: x,
      to: { node: newNode, index: x.to.index }
    })).commit();
    graph.finish(theNode);
  });
}

// ../lidl-core/src/graphTransformations/behaviourSeparation.ts
function behaviourSeparation(graph) {
  let activeSource = graph.addNode({
    type: "InteractionInstance",
    content: {
      type: "InteractionNative",
      content: `<%=a0%> = active;
`
    },
    ports: [
      {
        type: "InterfaceAtomic",
        direction: "out",
        data: {
          type: "DataAtomic",
          name: "Activation"
        }
      }
    ]
  });
  graph.reduceNodes({
    type: "InteractionInstance",
    content: {
      operatorType: "Behaviour"
    }
  }, (theResut, theNode) => {
    graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      from: {
        node: theNode,
        index: 2
      }
    }).forEach((x) => graph.addEdge({
      type: "InteractionInstanceOperand",
      from: {
        node: activeSource,
        index: 0
      },
      to: x.to
    })).commit();
    graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      from: {
        node: theNode,
        index: 0
      }
    }).forEach((x) => graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      from: {
        node: theNode,
        index: 1
      }
    }).forEach((y) => graph.addEdge({
      type: "InteractionInstanceOperand",
      from: x.to,
      to: y.to
    })).commit()).commit();
    graph.finish(theNode);
  });
}

// ../lidl-core/src/graphTransformations/functionLiteralLinking.ts
function functionLiteralLinking(graph) {
  graph.reduceNodes({ type: "InteractionInstance", content: { operatorType: "Function" } }, (theResult, theNode) => {
    let funcName = theNode.content.operator.substring(8);
    let source = graph.addNode({
      type: "InteractionInstance",
      content: {
        type: "InteractionNative",
        content: "<%=a0%> = " + funcName + `;
`
      },
      ports: theNode.ports
    });
    graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      from: { node: theNode, index: 0 }
    }).forEach((x) => graph.addEdge({
      type: "InteractionInstanceOperand",
      from: { node: source, index: 0 },
      to: x.to
    })).commit();
    graph.finish(theNode);
  });
}

// ../lidl-core/src/graphTransformations/dataLiteralLinking.ts
function dataLiteralLinking(graph) {
  graph.reduceNodes({ type: "InteractionInstance", content: { operatorType: "Activation" } }, (theResult, theNode) => {
    let literal = theNode.content.operator;
    let source = graph.addNode({
      type: "InteractionInstance",
      content: {
        type: "InteractionNative",
        content: "<%=a0%> = " + literal + `;
`
      },
      ports: [
        {
          type: "InterfaceAtomic",
          direction: "out",
          data: { type: "DataAtomic", name: "Activation" }
        }
      ]
    });
    graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      from: { node: theNode, index: 0 }
    }).forEach((x) => graph.addEdge({
      type: "InteractionInstanceOperand",
      from: { node: source, index: 0 },
      to: x.to
    })).commit();
    graph.finish(theNode);
  });
  graph.reduceNodes({ type: "InteractionInstance", content: { operatorType: "Boolean" } }, (theResult, theNode) => {
    let literal = theNode.content.operator;
    let source = graph.addNode({
      type: "InteractionInstance",
      content: {
        type: "InteractionNative",
        content: "<%=a0%> = " + literal + `;
`
      },
      ports: [
        {
          type: "InterfaceAtomic",
          direction: "out",
          data: { type: "DataAtomic", name: "Boolean" }
        }
      ]
    });
    graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      from: { node: theNode, index: 0 }
    }).forEach((x) => graph.addEdge({
      type: "InteractionInstanceOperand",
      from: { node: source, index: 0 },
      to: x.to
    })).commit();
    graph.finish(theNode);
  });
  graph.reduceNodes({ type: "InteractionInstance", content: { operatorType: "Number" } }, (theResult, theNode) => {
    let literal = theNode.content.operator;
    let source = graph.addNode({
      type: "InteractionInstance",
      content: {
        type: "InteractionNative",
        content: "<%=a0%> = " + literal + `;
`
      },
      ports: [
        {
          type: "InterfaceAtomic",
          direction: "out",
          data: { type: "DataAtomic", name: "Number" }
        }
      ]
    });
    graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      from: { node: theNode, index: 0 }
    }).forEach((x) => graph.addEdge({
      type: "InteractionInstanceOperand",
      from: { node: source, index: 0 },
      to: x.to
    })).commit();
    graph.finish(theNode);
  });
  graph.reduceNodes({ type: "InteractionInstance", content: { operatorType: "Text" } }, (theResult, theNode) => {
    let literal = theNode.content.operator;
    let source = graph.addNode({
      type: "InteractionInstance",
      content: {
        type: "InteractionNative",
        content: "<%=a0%> = " + literal + `;
`
      },
      ports: [
        {
          type: "InterfaceAtomic",
          direction: "out",
          data: { type: "DataAtomic", name: "Text" }
        }
      ]
    });
    graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      from: { node: theNode, index: 0 }
    }).forEach((x) => graph.addEdge({
      type: "InteractionInstanceOperand",
      from: { node: source, index: 0 },
      to: x.to
    })).commit();
    graph.finish(theNode);
  });
}

// ../lidl-core/src/graphTransformations/functionApplicationLinking.ts
function functionApplicationLinking(graph) {
  graph.reduceNodes({
    type: "InteractionInstance",
    content: {
      operatorType: "FunctionApplication"
    }
  }, (theResult, theNode) => {
    let source = graph.addNode({
      type: "InteractionInstance",
      content: {
        type: "InteractionNative",
        content: `if(<%=a0%> === active && <%=a1%>!==null && <%=a1%>!==undefined) {<%=a3%> = <%=a1%>(<%=a2%>);}
`
      },
      ports: [
        {
          type: "InterfaceAtomic",
          direction: "in",
          data: {
            type: "DataAtomic",
            name: "Activation"
          }
        }
      ]
    });
    graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      from: {
        node: theNode,
        index: 0
      }
    }).forEach((x) => graph.addEdge({
      type: "InteractionInstanceOperand",
      from: {
        node: source,
        index: 0
      },
      to: x.to
    })).commit();
    graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      from: {
        node: theNode,
        index: 1
      }
    }).forEach((x) => {
      source.ports[1] = mergeInterface(source.ports[1], conjugateInterface(x.to.node.ports[x.to.index]));
      graph.addEdge({
        type: "InteractionInstanceOperand",
        from: {
          node: source,
          index: 1
        },
        to: x.to
      });
    }).commit();
    if (!isAtomic(source.ports[1]) || source.ports[1].data.type !== "DataFunction")
      throw new Error("Function application should receive functions as first argument, received the interface " + serialize(source.ports[1]));
    source.ports[2] = {
      type: "InterfaceAtomic",
      direction: "in",
      data: source.ports[1].data.domain
    };
    source.ports[3] = {
      type: "InterfaceAtomic",
      direction: "out",
      data: source.ports[1].data.codomain
    };
    graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      from: {
        node: theNode,
        index: 2
      }
    }).forEach((x) => {
      source.ports[2] = mergeInterface(source.ports[2], conjugateInterface(x.to.node.ports[x.to.index]));
      graph.addEdge({
        type: "InteractionInstanceOperand",
        from: {
          node: source,
          index: 2
        },
        to: x.to
      });
    }).commit();
    graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      from: {
        node: theNode,
        index: 3
      }
    }).forEach((x) => {
      source.ports[3] = mergeInterface(source.ports[3], conjugateInterface(x.to.node.ports[x.to.index]));
      graph.addEdge({
        type: "InteractionInstanceOperand",
        from: {
          node: source,
          index: 3
        },
        to: x.to
      });
    }).commit();
    graph.finish(theNode);
  });
}

// ../lidl-core/src/graphTransformations/previousNextLinking.ts
var import_lodash15 = __toESM(require_lodash(), 1);
function previousNextLinking(graph) {
  graph.reduceNodes({
    type: "InteractionInstance",
    content: {
      operatorType: "Previous"
    }
  }, (theResult, theNode) => {
    let stateId = import_lodash15.default.uniqueId("state_");
    let source = graph.addNode({
      type: "InteractionInstance",
      containsAState: true,
      stateVariableName: stateId,
      content: {
        type: "InteractionNative",
        content: `if(<%=a0%> === active) {
<%=a1%> = previousState['` + stateId + `'];
}
`
      },
      ports: [
        {
          type: "InterfaceAtomic",
          direction: "in",
          data: {
            type: "DataAtomic",
            name: "Activation"
          }
        },
        undefined
      ]
    });
    graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      from: {
        node: theNode,
        index: 0
      }
    }).forEach((x) => graph.addEdge({
      type: "InteractionInstanceOperand",
      from: {
        node: source,
        index: 0
      },
      to: x.to
    })).commit();
    graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      from: {
        node: theNode,
        index: 1
      }
    }).forEach((x) => {
      source.ports[1] = mergeInterface(source.ports[1], conjugateInterface(x.to.node.ports[x.to.index]));
      graph.addEdge({
        type: "InteractionInstanceOperand",
        from: {
          node: source,
          index: 1
        },
        to: x.to
      });
    }).commit();
    let source2 = graph.addNode({
      type: "InteractionInstance",
      containsAState: true,
      stateVariableName: stateId,
      content: {
        type: "InteractionNative",
        content: `if(<%=a0%> === active) {
nextState['` + stateId + `'] = <%=a1%>;
}
`
      },
      ports: [
        {
          type: "InterfaceAtomic",
          direction: "in",
          data: {
            type: "DataAtomic",
            name: "Activation"
          }
        },
        undefined
      ]
    });
    graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      from: {
        node: theNode,
        index: 0
      }
    }).forEach((x) => graph.addEdge({
      type: "InteractionInstanceOperand",
      from: {
        node: source2,
        index: 0
      },
      to: x.to
    })).commit();
    graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      from: {
        node: theNode,
        index: 2
      }
    }).forEach((x) => {
      source2.ports[1] = mergeInterface(source2.ports[1], conjugateInterface(x.to.node.ports[x.to.index]));
      graph.addEdge({
        type: "InteractionInstanceOperand",
        from: {
          node: source2,
          index: 1
        },
        to: x.to
      });
    }).commit();
    graph.finish(theNode);
  });
}

// ../lidl-core/src/graphTransformations/tagCompositionElementEdges.ts
var import_lodash16 = __toESM(require_lodash(), 1);
function tagCompositionElementEdges(graph) {
  graph.matchUndirectedEdges({
    type: "InteractionInstanceOperand",
    from: {
      node: {
        type: "InteractionInstance",
        content: { type: "InteractionSimple", operatorType: "Composition" }
      }
    }
  }).forEach((theEdge) => {
    if (theEdge.from.index > 0)
      theEdge.from.compositionElementName = import_lodash16.default.words(theEdge.from.node.content.operator, /[^,:\{\}\$]+/g)[theEdge.from.index - 1];
  }).filter({
    to: {
      node: {
        type: "InteractionInstance",
        content: { type: "InteractionSimple", operatorType: "Composition" }
      }
    }
  }).forEach((theEdge) => {
    if (theEdge.to.index > 0)
      theEdge.to.compositionElementName = import_lodash16.default.words(theEdge.to.node.content.operator, /[^,:\{\}\$]+/g)[theEdge.to.index - 1];
  }).commit();
}

// ../lidl-core/src/graphTransformations/matchingCompositionReduction.ts
var import_lodash18 = __toESM(require_lodash(), 1);

// ../lidl-core/src/satSolver.ts
var import_lodash17 = __toESM(require_lodash(), 1);
function State() {
  this.empty = false;
  this.vars = [null];
  this.clauses = [];
  this.trail = [];
  this.dlevel = 0;
  this.tlevel = 0;
}
function Variable() {
  this.set = false;
  this.sign = false;
  this.mark = false;
  this.unit = false;
  this.unit_sign = false;
  this.dlevel = 0;
  this.reason = null;
  this.watches = [[], []];
  this.setUnit = function(sign) {
    this.unit = true;
    this.unit_sign = sign;
  };
}
function literalGetIdx(literal) {
  return literal < 0 ? -literal : literal;
}
function literalGetSign(literal) {
  return literal < 0;
}
function literalGetVar(state, literal) {
  var idx = literalGetIdx(literal);
  return state.vars[idx];
}
function literalIsFalse(state, literal) {
  var v = literalGetVar(state, literal);
  return v.set && v.sign != literalGetSign(literal);
}
function literalGetMark(state, literal) {
  var v = literalGetVar(state, literal);
  return v.mark;
}
function literalAddWatch(state, literal, clause) {
  var v = literalGetVar(state, literal);
  var watch = v.watches[Number(literalGetSign(literal))];
  watch.push(clause);
}
function literalSet(state, literal, reason) {
  var v = literalGetVar(state, literal);
  v.sign = literalGetSign(literal);
  v.set = true;
  v.dlevel = state.dlevel;
  v.reason = reason;
  state.trail.push(literal);
}
function satAddClause(state, clause) {
  switch (clause.length) {
    case 0:
      state.empty = true;
      return;
    case 1:
      var v = literalGetVar(state, clause[0]);
      var sign = literalGetSign(clause[0]);
      if (v.unit) {
        if (sign != v.unit_sign)
          state.empty = true;
        return;
      }
      v.setUnit(sign);
      return;
    default:
      literalAddWatch(state, clause[0], clause);
      literalAddWatch(state, clause[1], clause);
  }
}
function satSelectLiteral(state) {
  var M = 1, N = state.vars.length - 1;
  var i = Math.floor(M + (1 + N - M) * Math.random());
  var i0 = i;
  while (state.vars[i].set) {
    i++;
    if (i >= state.vars.length)
      i = 1;
    if (i == i0)
      return 0;
  }
  var literal = Math.random() < 0.5 ? -i : i;
  return literal;
}
function satSolve(size, clauses) {
  var state = new State;
  for (var i = 0;i < size; i++)
    state.vars.push(new Variable);
  for (var i = 0;i < clauses.length; i++)
    satAddClause(state, clauses[i]);
  if (state.empty)
    return null;
  for (var i = 1;i < state.vars.length; i++) {
    var v = state.vars[i];
    if (v.unit) {
      var literal = v.unit_sign ? -i : i;
      if (!satUnitPropagate(state, literal, null))
        return null;
    }
  }
  for (state.dlevel = 1;; state.dlevel++) {
    var literal = satSelectLiteral(state);
    if (literal === 0) {
      state.vars.shift();
      return state.vars.map(function(x) {
        return !x.sign;
      });
    }
    if (!satUnitPropagate(state, literal, null)) {
      return null;
    }
  }
  return null;
}
function satUnitPropagate(state, literal, reason) {
  var curr, next;
  var restart;
  do {
    curr = state.trail.length;
    next = curr + 1;
    literalSet(state, literal, reason);
    restart = false;
    while (curr < next) {
      literal = state.trail[curr];
      curr++;
      literal = -literal;
      var v = literalGetVar(state, literal);
      var watch = v.watches[Number(literalGetSign(literal))];
      for (var i = 0;i < watch.length; i++) {
        var clause = watch[i];
        var watch_idx = Number(clause[0] == literal);
        var watch_lit = clause[watch_idx];
        var watch_sign = literalGetSign(watch_lit);
        var w = literalGetVar(state, watch_lit);
        if (w.set && w.sign == watch_sign) {
          continue;
        }
        var j;
        for (j = 2;j < clause.length && literalIsFalse(state, clause[j]); j++)
          ;
        if (j >= clause.length) {
          if (!w.set) {
            if (watch_idx != 0) {
              clause[0] = watch_lit;
              clause[1] = literal;
            }
            literalSet(state, watch_lit, clause);
            next++;
            continue;
          }
          reason = satBacktrack(state, clause);
          if (reason == null)
            return false;
          literal = reason[0];
          restart = true;
          break;
        }
        var new_lit = clause[j];
        clause[Number(!watch_idx)] = new_lit;
        clause[j] = literal;
        literalAddWatch(state, new_lit, clause);
        if (i == watch.length - 1)
          watch.pop();
        else {
          watch[i] = watch.pop();
          i--;
        }
      }
      if (restart)
        break;
    }
  } while (restart);
  return true;
}
function satBacktrack(state, reason) {
  var conflicts = [];
  if (state.dlevel === 0)
    return null;
  var count = 0;
  for (var i = 0;i < reason.length; i++) {
    var v = literalGetVar(state, reason[i]);
    if (v.dlevel === 0)
      continue;
    v.mark = true;
    if (v.dlevel < state.dlevel)
      conflicts.push(reason[i]);
    else
      count++;
  }
  var tlevel = state.trail.length - 1;
  var literal;
  var v;
  do {
    if (tlevel < 0)
      return null;
    literal = state.trail[tlevel--];
    v = literalGetVar(state, literal);
    v.set = false;
    if (!v.mark)
      continue;
    v.mark = false;
    count--;
    if (count <= 0)
      break;
    for (var i = 1;i < v.reason.length; i++) {
      literal = v.reason[i];
      var w = literalGetVar(state, literal);
      if (w.mark || w.dlevel == 0)
        continue;
      if (w.dlevel < state.dlevel)
        conflicts.push(literal);
      else
        count++;
      w.mark = true;
    }
  } while (true);
  var nogood = [-literal];
  var blevel = 0;
  for (var i = 0;i < conflicts.length; i++) {
    literal = conflicts[i];
    v = literalGetVar(state, literal);
    if (v.reason != null) {
      var k;
      for (k = 1;k < v.reason.length && literalGetMark(state, v.reason[k]); k++)
        ;
      if (k >= v.reason.length)
        continue;
    }
    nogood.push(literal);
    if (blevel < v.dlevel) {
      blevel = v.dlevel;
      nogood[nogood.length - 1] = nogood[1];
      nogood[1] = literal;
    }
  }
  while (tlevel >= 0) {
    literal = state.trail[tlevel];
    v = literalGetVar(state, literal);
    if (v.dlevel <= blevel)
      break;
    v.set = false;
    tlevel--;
  }
  state.trail.length = tlevel + 1;
  for (var i = 0;i < conflicts.length; i++) {
    v = literalGetVar(state, conflicts[i]);
    v.mark = false;
  }
  satAddClause(state, nogood);
  state.dlevel = blevel;
  if (state.empty)
    return null;
  return nogood;
}
function solvePath(nodes, paths, options) {
  var varNumber = nodes.length;
  var clauses = import_lodash17.default(paths).map((thePath) => import_lodash17.default(thePath).map((theElement) => -1 * (import_lodash17.default.indexOf(nodes, theElement) + 1)).value()).value();
  var solved = satSolve(varNumber, clauses);
  var res = [];
  if (options?.firstOnly) {
    if (solved !== null) {
      res.push(solved);
    }
  } else {
    var negClauses = [];
    while (solved !== null) {
      res.push(solved);
      var newClause = import_lodash17.default.map(solved, (value, index) => (index + 1) * (value ? -1 : 1));
      negClauses.push(newClause);
      solved = satSolve(varNumber, clauses.concat(negClauses));
    }
  }
  return import_lodash17.default(res).map((theSolution) => import_lodash17.default(theSolution).map((x) => !x).value()).value();
}

// ../lidl-core/src/graphTransformations/matchingCompositionReduction.ts
function findAllMatchingCompositionNodesAndTheirAffectationCondition(graph, node) {
  function visitTheAffectation(n, fromWhichSide) {
    n.temporarilyMarkedDuringCompositionTraversal = true;
    let conditionForCurrentAffectation = graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      from: {
        node: n,
        index: 0
      },
      to: {
        node: {
          type: "InteractionInstance"
        }
      }
    }).map((e) => e.to).value();
    let compos2 = graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      from: {
        node: n
      },
      to: {
        index: 0,
        node: {
          type: "InteractionInstance",
          unSuitableForCompositionReduction: false,
          content: {
            type: "InteractionSimple",
            operatorType: "Composition"
          }
        }
      }
    }).filter((e) => e.from.index === 3 - fromWhichSide && e.to.node.temporarilyMarkedDuringCompositionTraversal !== true).map((e) => ({
      compositionNode: e.to.node,
      condition: conditionForCurrentAffectation
    })).value();
    let otheraffects2 = graph.matchUndirectedEdges({
      typae: "InteractionInstanceOperand",
      from: {
        node: n
      },
      to: {
        node: {
          type: "InteractionInstance",
          content: {
            type: "InteractionSimple",
            operatorType: "Affectation"
          }
        }
      }
    }).filter((e) => e.from.index === 3 - fromWhichSide && (e.to.index === 1 || e.to.index === 2) && e.to.node.temporarilyMarkedDuringCompositionTraversal !== true).map((e) => visitTheAffectation(e.to.node)).flatten().map((x) => ({
      compositionNode: x.compositionNode,
      condition: x.condition.concat(conditionForCurrentAffectation)
    })).value();
    n.temporarilyMarkedDuringCompositionTraversal = false;
    return compos2.concat(otheraffects2);
  }
  node.temporarilyMarkedDuringCompositionTraversal = true;
  let compos = graph.matchUndirectedEdges({
    type: "InteractionInstanceOperand",
    from: {
      node,
      index: 0
    },
    to: {
      index: 0,
      node: {
        type: "InteractionInstance",
        unSuitableForCompositionReduction: false,
        content: {
          type: "InteractionSimple",
          operatorType: "Composition"
        }
      }
    }
  }).map((e) => {
    graph.finish(e);
    return {
      compositionNode: e.to.node,
      condition: []
    };
  }).value();
  let otheraffects = graph.matchUndirectedEdges({
    type: "InteractionInstanceOperand",
    from: {
      node,
      index: 0
    },
    to: {
      node: {
        type: "InteractionInstance",
        content: {
          type: "InteractionSimple",
          operatorType: "Affectation"
        }
      }
    }
  }).filter((e) => e.to.index === 1 || e.to.index === 2).map((e) => {
    graph.finish(e);
    return visitTheAffectation(e.to.node, e.to.index);
  }).flatten().value();
  node.temporarilyMarkedDuringCompositionTraversal = false;
  let res = compos.concat(otheraffects);
  return res;
}
function simplifyPathExpression(graph, p) {
  let reduced = import_lodash18.default(p).groupBy("compositionNode.id").map((x) => ({
    compositionNode: x[0].compositionNode,
    condition: import_lodash18.default(x).map("condition").map((y) => import_lodash18.default.uniqBy(y, (z) => z.node.id + " " + z.index)).value()
  })).flatten().forEach((x) => {
    let allConds = import_lodash18.default(x.condition).flatten().map((c) => ({
      cond: c,
      stringRep: c.node.id + " " + c.index
    })).uniqBy("stringRep").value();
    if (allConds.length == 0) {
      x.simplifiedCond = null;
    } else {
      if (allConds.length == 1) {
        x.simplifiedCond = x.condition[0][0];
      } else {
        let satProblem = import_lodash18.default(x.condition).map((y) => import_lodash18.default(y).map((c) => c.node.id + " " + c.index).value()).value();
        let solution = solvePath(import_lodash18.default.map(allConds, "stringRep"), satProblem);
        let newNode = graph.addNode({
          type: "InteractionInstance",
          content: {
            type: "InteractionNative",
            content: "TBD"
          }
        });
        let allEdgesToConds = import_lodash18.default(allConds).map((c, index) => ({
          cond: c.cond,
          stringRep: c.stringRep,
          edge: graph.addEdge({
            type: "InteractionInstanceOperand",
            from: {
              index: index + 1,
              node: newNode,
              ports: {
                type: "InterfaceAtomic",
                direction: "in",
                data: { type: "DataAtomic", name: "Activation" }
              }
            },
            to: c.cond
          })
        })).value();
        let code = import_lodash18.default(solution).map((s) => {
          let solcode = "if( ";
          solcode = solcode + import_lodash18.default(s).map((value, index) => "( <%=a" + (index + 1) + "%>" + " === " + (value ? "active" : "inactive") + " )").join(" && ");
          solcode = solcode + `) {
  <%=a0%> = active;
} else {
  <%=a0%> = inactive;
}`;
          return solcode;
        }).join(`
`);
        newNode.content.content = code;
        newNode.ports = [
          {
            type: "InterfaceAtomic",
            direction: "out",
            data: { type: "DataAtomic", name: "Activation" }
          }
        ].concat(import_lodash18.default.map(allConds, {
          type: "InterfaceAtomic",
          direction: "in",
          data: { type: "DataAtomic", name: "Activation" }
        }));
        x.simplifiedCond = {
          index: 0,
          node: newNode,
          ports: {
            type: "InterfaceAtomic",
            direction: "out",
            data: { type: "DataAtomic", name: "Activation" }
          }
        };
      }
    }
  }).value();
  return reduced;
}
function matchingCompositionReduction(graph) {
  graph.matchNodes({
    type: "InteractionInstance",
    content: {
      type: "InteractionSimple"
    }
  }).forEach((theNode) => {
    theNode.unSuitableForCompositionReduction = false;
    theNode.didCompositionReduction = false;
  }).commit();
  graph.reduceNodes({
    type: "InteractionInstance",
    unSuitableForCompositionReduction: false,
    content: {
      type: "InteractionSimple",
      operatorType: "Composition"
    }
  }, (theResult, n1) => {
    let matchingCompoNodes = simplifyPathExpression(graph, findAllMatchingCompositionNodesAndTheirAffectationCondition(graph, n1));
    import_lodash18.default(matchingCompoNodes).forEach((x) => {
      let n2 = x.compositionNode;
      if (import_lodash18.default.isNull(x.simplifiedCond)) {
        graph.matchUndirectedEdges({
          type: "InteractionInstanceOperand",
          from: {
            node: n2
          }
        }).reject((e2) => import_lodash18.default.isUndefined(e2.from.compositionElementName)).forEach((e2) => {
          let d2 = e2.to;
          if (d2.node === n2)
            d2 = {
              node: n1,
              coCompositionElementName: e2.to.compositionElementName,
              isCoPort: true
            };
          graph.addEdge({
            type: "InteractionInstanceOperand",
            from: {
              node: n1,
              coCompositionElementName: e2.from.compositionElementName,
              isCoPort: true
            },
            to: d2
          });
        }).commit();
        n1.didCompositionReduction = true;
        n2.didCompositionReduction = true;
      } else {
        graph.matchUndirectedEdges({
          type: "InteractionInstanceOperand",
          from: {
            node: n2
          }
        }).reject((e2) => import_lodash18.default.isUndefined(e2.from.compositionElementName)).forEach((e2) => {
          let d2 = e2.to;
          if (d2.node === n2)
            d2 = {
              node: n1,
              coCompositionElementName: e2.to.compositionElementName,
              isCoPort: true
            };
          let intermedAffectation = graph.addNode({
            type: "InteractionInstance",
            content: {
              type: "InteractionSimple",
              operator: "$=$",
              operatorType: "Affectation"
            },
            ports: [
              {
                type: "InterfaceAtomic",
                direction: "in",
                data: { type: "DataAtomic", name: "Activation" }
              }
            ]
          });
          graph.addEdge({
            type: "InteractionInstanceOperand",
            from: {
              node: n1,
              coCompositionElementName: e2.from.compositionElementName,
              isCoPort: true
            },
            to: {
              node: intermedAffectation,
              index: 1
            }
          });
          graph.addEdge({
            type: "InteractionInstanceOperand",
            from: {
              node: intermedAffectation,
              index: 2
            },
            to: d2
          });
          graph.addEdge({
            type: "InteractionInstanceOperand",
            from: {
              node: intermedAffectation,
              index: 0
            },
            to: x.simplifiedCond
          });
        }).commit();
        n1.didCompositionReduction = true;
        n2.didCompositionReduction = true;
      }
    }).commit();
    n1.unSuitableForCompositionReduction = true;
  });
  graph.matchNodes({
    type: "InteractionInstance",
    didCompositionReduction: true
  }).forEach((n1) => {
    let internalGraph = new g_default;
    internalGraph.type = "internal";
    let coPortsFrom = graph.matchDirectedEdges({
      type: "InteractionInstanceOperand",
      from: {
        node: n1
      }
    }).filter((x) => x.from.isCoPort === true).filter((x) => x.from.coCompositionElementName !== undefined).map((x) => ({
      type: "coPort",
      ports: x.from,
      closed: false,
      node: x.to.node,
      target: x.to
    })).value();
    let coPortsTo = graph.matchDirectedEdges({
      type: "InteractionInstanceOperand",
      to: {
        node: n1
      }
    }).filter((x) => x.to.isCoPort === true).filter((x) => x.to.coCompositionElementName !== undefined).map((x) => ({
      type: "coPort",
      ports: x.to,
      closed: false,
      node: x.from.node,
      target: x.from
    })).value();
    let coPortNodes = {};
    import_lodash18.default([coPortsFrom, coPortsTo]).flatten().sortBy("ports.coCompositionElementName").uniqBy("ports.coCompositionElementName").forEach((x) => {
      coPortNodes[x.ports.coCompositionElementName] = internalGraph.addNode(x);
    }).commit();
    let portsFrom = graph.matchDirectedEdges({
      type: "InteractionInstanceOperand",
      from: {
        node: n1
      }
    }).filter((x) => x.from.isCoPort !== true).filter((x) => x.from.compositionElementName !== undefined).map((x) => ({
      type: "port",
      ports: x.from,
      closed: false,
      node: x.to.node,
      target: x.to
    })).value();
    let portsTo = graph.matchDirectedEdges({
      type: "InteractionInstanceOperand",
      to: {
        node: n1
      }
    }).filter((x) => x.to.isCoPort !== true).filter((x) => x.to.compositionElementName !== undefined).map((x) => ({
      type: "port",
      ports: x.to,
      closed: false,
      node: x.from.node,
      target: x.from
    })).value();
    let portNodes = {};
    import_lodash18.default([portsFrom, portsTo]).flatten().sortBy("ports.compositionElementName").uniqBy("ports.compositionElementName").forEach((x) => {
      portNodes[x.ports.compositionElementName] = internalGraph.addNode(x);
    }).commit();
    internalGraph.matchNodes({
      ports: {
        isCoPort: true
      }
    }).forEach((n12) => {
      internalGraph.matchNodes({
        ports: {
          compositionElementName: n12.ports.coCompositionElementName
        }
      }).filter((x) => x.ports.isCoPort !== true).forEach((n2) => internalGraph.addEdge({
        type: "normal",
        mul: true,
        from: {
          node: n12
        },
        to: {
          node: n2
        }
      })).commit();
    }).commit();
    graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      from: {
        node: n1
      },
      to: {
        node: n1
      }
    }).reject((e) => import_lodash18.default.isUndefined(e.from.compositionElementName) && import_lodash18.default.isUndefined(e.from.coCompositionElementName) || import_lodash18.default.isUndefined(e.to.compositionElementName) && import_lodash18.default.isUndefined(e.to.coCompositionElementName)).forEach((e) => {
      let origin = e.from.isCoPort === true ? coPortNodes[e.from.coCompositionElementName] : portNodes[e.from.compositionElementName];
      let dest = e.to.isCoPort === true ? coPortNodes[e.to.coCompositionElementName] : portNodes[e.to.compositionElementName];
      internalGraph.addEdge({
        type: "loop",
        mul: true,
        from: {
          node: origin
        },
        to: {
          node: dest
        }
      });
    }).commit();
    internalGraph.reduceNodes({
      closed: false
    }, (theResult, theNode) => {
      internalGraph.matchUndirectedEdges({
        from: {
          node: theNode
        }
      }).forEach((e1) => {
        internalGraph.matchUndirectedEdges({
          from: {
            node: theNode
          }
        }).filter((e2) => e2.id !== e1.id).forEach((e2) => {
          if (import_lodash18.default.isEmpty(internalGraph.findUndirectedEdge({
            from: {
              node: e1.to.node
            },
            to: {
              node: e2.to.node
            }
          }))) {
            internalGraph.addEdge({
              type: "closure",
              mul: true,
              from: {
                node: e1.to.node
              },
              to: {
                node: e2.to.node
              }
            });
          }
        }).commit();
      }).commit();
      theNode.closed = true;
    });
    internalGraph.matchUndirectedEdges({
      from: { node: { type: "coPort" } },
      to: { node: { type: "port" } }
    }).forEach((internalEdge) => {
      graph.matchUndirectedEdges({
        from: {
          node: n1,
          coCompositionElementName: internalEdge.from.node.ports.coCompositionElementName
        }
      }).forEach((coEdge) => {
        graph.matchUndirectedEdges({
          from: {
            node: n1,
            compositionElementName: internalEdge.to.node.ports.compositionElementName
          }
        }).forEach((edge) => {
          graph.addEdge({
            type: "InteractionInstanceOperand",
            from: coEdge.to,
            to: edge.to
          });
        }).commit();
      }).commit();
    }).commit();
  }).commit();
  let didReduce = false;
  graph.matchNodes({
    type: "InteractionInstance",
    didCompositionReduction: true,
    content: {
      type: "InteractionSimple",
      operatorType: "Composition"
    }
  }).forEach((theNode) => {
    graph.finish(theNode);
    didReduce = true;
  }).commit();
  return didReduce;
}

// ../lidl-core/src/graphTransformations/removeOneSidedAffectation.ts
function removeOneSidedAffectation(graph) {
  let didMatch = true;
  do {
    didMatch = !graph.matchNodes({
      type: "InteractionInstance",
      content: { type: "InteractionSimple", operatorType: "Affectation" }
    }).filter((theNode) => graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      from: { node: theNode, index: 1 }
    }).isEmpty() || graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      from: { node: theNode, index: 2 }
    }).isEmpty()).forEach((theNode) => graph.finish(theNode)).isEmpty();
  } while (didMatch);
}

// ../lidl-core/src/graphTransformations/createDataFlowDirection.ts
function createDataFlowDirection(graph) {
  graph.matchUndirectedEdges({
    type: "InteractionInstanceOperand"
  }).forEach((theEdge) => {
    let portOnOrigin = theEdge.from.node.ports[theEdge.from.index];
    let portOnDestination = theEdge.to.node.ports[theEdge.to.index];
    try {
      theEdge.from.ports = mergeInterface(portOnOrigin, conjugateInterface(portOnDestination));
    } catch (e) {}
    try {
      theEdge.to.ports = mergeInterface(portOnDestination, conjugateInterface(portOnOrigin));
    } catch (e) {}
    if (!isCompatible(theEdge.from.ports, theEdge.to.ports)) {
      throw new Error("Incompatible interfaces on " + theEdge.id);
    }
  }).commit();
  graph.matchNodes({
    type: "InteractionInstance"
  }).forEach((theNode) => {
    graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      from: { node: theNode }
    }).forEach((theEdge) => {
      theNode.ports[theEdge.from.index] = mergeInterface(theNode.ports[theEdge.from.index], theEdge.from.ports);
    }).filter({ type: "InteractionInstanceOperand", to: { node: theNode } }).forEach((theEdge) => {
      theNode.ports[theEdge.to.index] = mergeInterface(theNode.ports[theEdge.to.index], theEdge.to.ports);
    }).commit();
  }).commit();
}

// ../lidl-core/src/graphTransformations/nonMatchingCompositionCompilation.ts
var import_lodash19 = __toESM(require_lodash(), 1);
function nonMatchingCompositionCompilation(graph) {
  graph.matchNodes({
    type: "InteractionInstance",
    content: { type: "InteractionSimple", operatorType: "Composition" }
  }).filter((x) => madeOnlyOf(x.ports[0]) === "out" || madeOnlyOf(x.ports[0]) === "in").forEach((theNode) => {
    let isCompo = madeOnlyOf(theNode.ports[0]) === "out";
    let code = isCompo ? `<%=a0%> = {};
` : "";
    let ports = [theNode.ports[0]];
    let compositionElementNameWithTheirIndex = graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      from: { node: theNode }
    }).reject((theEdge) => import_lodash19.default.isUndefined(theEdge.from.compositionElementName)).forEach((theEdge) => {
      if (theEdge.to.node === theNode) {
        throw new Error("Error:Loop on a composition interaction " + theNode.content.operator);
      }
    }).map((theEdge) => ({
      compositionElementName: theEdge.from.compositionElementName,
      index: theEdge.from.index
    })).groupBy("index").map((theElement) => import_lodash19.default(theElement).tap((x) => {
      if (import_lodash19.default.size(import_lodash19.default.uniqBy(x, (y) => y.compositionElementName)) > 1) {
        throw new Error("Error: there are different edges with the same index but different compositionElementName");
      }
    }).uniqBy((z) => z.compositionElementName).first()).value();
    import_lodash19.default(compositionElementNameWithTheirIndex).forEach((el) => {
      if (isCompo) {
        code = code.concat("<%=a0%>['" + el.compositionElementName + "'] = <%=a" + el.index + `%>;
`);
        ports[el.index] = conjugateInterface(subInterface(theNode.ports[0], el.compositionElementName));
      } else {
        code = code.concat("<%=a" + el.index + "%> = <%=a0%>['" + el.compositionElementName + `'];
`);
        ports[el.index] = conjugateInterface(subInterface(theNode.ports[0], el.compositionElementName));
      }
    }).commit();
    let newNode = graph.addNode({
      type: "InteractionInstance",
      content: {
        type: "InteractionNative",
        content: code
      },
      ports
    });
    graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      from: { node: theNode }
    }).forEach((theEdge) => {
      graph.addEdge({
        type: "InteractionInstanceOperand",
        from: {
          node: newNode,
          index: theEdge.from.index
        },
        to: theEdge.to
      });
    }).commit();
    graph.finish(theNode);
  }).commit();
}

// ../lidl-core/src/graphTransformations/affectationLinking.ts
var import_lodash20 = __toESM(require_lodash(), 1);
function affectationLinking(graph) {
  graph.matchNodes({
    type: "InteractionInstance",
    content: {
      type: "InteractionSimple",
      operatorType: "Affectation"
    }
  }).forEach((theNode) => {
    theNode.potentiallyAffectationLinkable = true;
  }).commit();
  graph.reduceNodes({
    type: "InteractionInstance",
    potentiallyAffectationLinkable: true,
    content: {
      type: "InteractionSimple",
      operatorType: "Affectation"
    }
  }, (theResult, theNode) => {
    theNode.ports[0] = {
      type: "InterfaceAtomic",
      data: {
        type: "DataAtomic",
        name: "Activation"
      },
      direction: "in"
    };
    if (!isUndefined(theNode.ports[1]) && !isUndefined(theNode.ports[2])) {
      if (madeOnlyOf(theNode.ports[1]) === "out" && madeOnlyOf(theNode.ports[2]) === "in") {
        let source = graph.addNode({
          type: "InteractionInstance",
          content: {
            type: "InteractionNative",
            content: `if(<%=a0%> !== inactive) {<%=a1%> = <%=a2%>;}
`
          },
          ports: theNode.ports
        });
        import_lodash20.default(import_lodash20.default.range(3)).forEach((i) => graph.matchUndirectedEdges({
          type: "InteractionInstanceOperand",
          from: {
            node: theNode,
            index: i
          }
        }).forEach((x) => graph.addEdge({
          type: "InteractionInstanceOperand",
          from: {
            node: source,
            index: i
          },
          to: x.to
        })).commit()).commit();
        graph.finish(theNode);
      } else if (madeOnlyOf(theNode.ports[1]) === "in" && madeOnlyOf(theNode.ports[2]) === "out") {
        let source = graph.addNode({
          type: "InteractionInstance",
          content: {
            type: "InteractionNative",
            content: `if(<%=a0%> !== inactive) {<%=a2%> = <%=a1%>;}
`
          },
          ports: theNode.ports
        });
        import_lodash20.default(import_lodash20.default.range(3)).forEach((i) => graph.matchUndirectedEdges({
          type: "InteractionInstanceOperand",
          from: {
            node: theNode,
            index: i
          }
        }).forEach((x) => graph.addEdge({
          type: "InteractionInstanceOperand",
          from: {
            node: source,
            index: i
          },
          to: x.to
        })).commit()).commit();
        graph.finish(theNode);
      } else if (madeOnlyOf(theNode.ports[1]) === "in" && madeOnlyOf(theNode.ports[2]) === "in") {
        graph.finish(theNode);
      } else if (madeOnlyOf(theNode.ports[1]) === "out" && madeOnlyOf(theNode.ports[2]) === "out") {
        graph.finish(theNode);
      } else {
        theNode.potentiallyAffectationLinkable = false;
      }
    } else {
      if (!isUndefined(theNode.ports[1])) {
        theNode.ports[2] = conjugateInterface(theNode.ports[1]);
      } else if (!isUndefined(theNode.ports[2])) {
        theNode.ports[1] = conjugateInterface(theNode.ports[2]);
      } else {
        theNode.potentiallyAffectationLinkable = false;
      }
    }
  });
}

// ../lidl-core/src/graphTransformations/removeDuplicateEdge.ts
var import_lodash21 = __toESM(require_lodash(), 1);
function removeDuplicateEdge(graph) {
  graph.matchUndirectedEdges({ type: "InteractionInstanceOperand" }).forEach((edge) => {
    edge.maybeDuplicate = true;
  }).commit();
  graph.reduceUndirectedEdges({ type: "InteractionInstanceOperand", maybeDuplicate: true }, (theResult, theEdge) => {
    let identicalEdges = graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      maybeDuplicate: true,
      from: { node: theEdge.from.node, index: theEdge.from.index },
      to: { node: theEdge.to.node, index: theEdge.to.index }
    }).value();
    import_lodash21.default(identicalEdges).tail().forEach((identicalEdge) => {
      graph.finish(identicalEdge);
    }).commit();
    theEdge.maybeDuplicate = false;
  });
}

// ../lidl-core/src/graphTransformations/resolveMultiplePorts.ts
var import_lodash22 = __toESM(require_lodash(), 1);
function resolveMultiplePorts(graph) {
  graph.matchUndirectedEdges({
    type: "InteractionInstanceOperand"
  }).forEach((theEdge) => {
    theEdge.from.multiResolved = false;
    theEdge.to.multiResolved = false;
  }).commit();
  graph.reduceUndirectedEdges({
    type: "InteractionInstanceOperand",
    from: {
      multiResolved: false
    }
  }, (theResult, theEdge) => {
    let direct = madeOnlyOf(theEdge.from.ports) === "out";
    let indirect = madeOnlyOf(theEdge.to.ports) === "out";
    if (direct === indirect) {
      graph.finish(theEdge);
      return;
    }
    let theRightEdge = direct ? import_lodash22.default.clone(theEdge) : graph.inverse(theEdge);
    let similarOutputEdges = graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      from: {
        node: theRightEdge.from.node,
        index: theRightEdge.from.index
      }
    }).forEach((theOtherEdge) => {
      theEdge.from.multiResolved = true;
    }).value();
    if (import_lodash22.default(similarOutputEdges).size() > 1) {
      let code = "";
      let ports = [conjugateInterface(theRightEdge.from.ports)];
      import_lodash22.default(similarOutputEdges).forEach((similarEdge, index) => {
        code = code + "<%=a" + (index + 1) + `%> = <%=a0%>;
`;
        ports.push(theRightEdge.from.ports);
      }).commit();
      let newNode = graph.addNode({
        type: "InteractionInstance",
        content: {
          type: "InteractionNative",
          content: code
        },
        ports
      });
      graph.addEdge({
        type: "InteractionInstanceOperand",
        from: {
          multiResolved: true,
          node: theRightEdge.from.node,
          index: theRightEdge.from.index,
          ports: theRightEdge.from.ports
        },
        to: {
          multiResolved: true,
          node: newNode,
          index: 0,
          ports: conjugateInterface(theRightEdge.from.ports)
        }
      });
      import_lodash22.default(similarOutputEdges).forEach((similarEdge, index) => {
        graph.addEdge({
          type: "InteractionInstanceOperand",
          from: {
            multiResolved: true,
            node: newNode,
            index: index + 1,
            ports: theRightEdge.from.ports
          },
          to: similarEdge.to
        });
        graph.finish(graph.findDirectedEdge({
          id: similarEdge.id
        }));
      }).commit();
    } else if (import_lodash22.default(similarOutputEdges).size() < 1) {
      throw new Error("what ? that should be impossible");
    }
    let similarInputEdges = graph.matchUndirectedEdges({
      type: "InteractionInstanceOperand",
      to: {
        node: theRightEdge.to.node,
        index: theRightEdge.to.index
      }
    }).forEach((theOtherEdge) => {
      theEdge.to.multiResolved = true;
    }).value();
    if (import_lodash22.default(similarInputEdges).size() > 1) {
      let code = `<%=a0%>=null;
`;
      let ports = [conjugateInterface(theRightEdge.to.ports)];
      import_lodash22.default(similarInputEdges).forEach((similarEdge, index) => {
        code = code + `if(<%=a0%>===null ){
  <%=a0%> = <%=a` + (index + 1) + `%>;
} else if (<%=a` + (index + 1) + `%> !== null){
  throw new Error('Multiple active assignments to the same signal <%=a0%> : '+<%=a0%> + ' and ' + <%=a` + (index + 1) + `%>);
}`;
        ports.push(theRightEdge.to.ports);
      }).commit();
      let newNode = graph.addNode({
        type: "InteractionInstance",
        content: {
          type: "InteractionNative",
          content: code + `
`
        },
        ports
      });
      graph.addEdge({
        type: "InteractionInstanceOperand",
        to: {
          multiResolved: true,
          node: theRightEdge.to.node,
          index: theRightEdge.to.index,
          ports: theRightEdge.to.ports
        },
        from: {
          multiResolved: true,
          node: newNode,
          index: 0,
          ports: conjugateInterface(theRightEdge.to.ports)
        }
      });
      import_lodash22.default(similarInputEdges).forEach((similarEdge, index) => {
        graph.addEdge({
          type: "InteractionInstanceOperand",
          to: {
            multiResolved: true,
            node: newNode,
            index: index + 1,
            ports: theRightEdge.to.ports
          },
          from: similarEdge.from
        });
        graph.finish(graph.findDirectedEdge({
          id: similarEdge.id
        }));
      }).commit();
    } else if (import_lodash22.default(similarInputEdges).size() < 1) {
      throw new Error("what ? that should be impossible");
    }
  });
  createDataFlowDirection(graph);
}

// ../lidl-core/src/graphTransformations/instantiateTemplates.ts
var import_lodash23 = __toESM(require_lodash(), 1);
function instantiateTemplates(graph) {
  graph.matchNodes({
    type: "InteractionInstance"
  }).forEach((n) => {
    n.shouldDoCodeGeneration = true;
    n.codeGeneration = false;
  }).commit();
  graph.reduceNodes({
    type: "InteractionInstance",
    content: {
      type: "InteractionNative"
    },
    shouldDoCodeGeneration: true
  }, (theResult, theNode) => {
    let theArgs = {};
    let shouldGenerate = true;
    import_lodash23.default(theNode.ports).forEach((ports, index) => {
      let edge = graph.findUndirectedEdge({
        type: "InteractionInstanceOperand",
        from: {
          node: theNode,
          index
        }
      });
      if (edge === undefined) {
        if (madeOnlyOf(ports) === "in") {
          let newNode = graph.addNode({
            type: "InteractionInstance",
            content: {
              type: "InteractionNative",
              content: `<%=a0%> = inactive; //Fake sender node
`
            },
            shouldDoCodeGeneration: true,
            codeGeneration: false,
            ports: [conjugateInterface(ports)]
          });
          edge = graph.addEdge({
            type: "InteractionInstanceOperand",
            from: {
              node: newNode,
              index: 0,
              ports: conjugateInterface(ports)
            },
            to: {
              node: theNode,
              index,
              ports
            }
          });
        } else if (madeOnlyOf(ports) === "out") {
          let newNode = graph.addNode({
            type: "InteractionInstance",
            content: {
              type: "InteractionNative",
              content: `// We dont care about <%=a0%>, this is a fake receiver node
`
            },
            shouldDoCodeGeneration: true,
            codeGeneration: false,
            ports: [conjugateInterface(ports)]
          });
          edge = graph.addEdge({
            type: "InteractionInstanceOperand",
            to: {
              node: newNode,
              index: 0,
              ports: conjugateInterface(ports)
            },
            from: {
              node: theNode,
              index,
              ports
            }
          });
        } else {
          edge = { id: "" };
        }
      }
      theArgs["a" + index] = edge.id;
    }).commit();
    if (shouldGenerate) {
      theNode.codeGeneration = {
        js: "// " + theNode.id + `
` + import_lodash23.default.template(theNode.content.content)(theArgs)
      };
      theNode.codeGenerated = true;
    }
    theNode.shouldDoCodeGeneration = false;
  });
}

// ../lidl-core/src/graphTransformations/orderGraph.ts
var import_lodash24 = __toESM(require_lodash(), 1);
function orderGraph(graph) {
  let orderingList = [];
  graph.matchNodes({ type: "InteractionInstance" }).forEach((x) => {
    x.markedDuringGraphOrdering = false;
  }).commit();
  graph.reduceNodes({ markedDuringGraphOrdering: false }, (theResult, theNode) => {
    visit(theNode, [theNode]);
  });
  function visit(n, stack) {
    if (n.temporarilyMarkedDuringGraphOrdering === true) {
      throw new Error("the interaction DAG contains cycles: " + import_lodash24.default(stack).concat([n]).map("id").join(" -> "));
    } else {
      if (n.markedDuringGraphOrdering !== true) {
        n.temporarilyMarkedDuringGraphOrdering = true;
        graph.matchNodes((m) => graph.matchUndirectedEdges({
          type: "InteractionInstanceOperand",
          from: { node: n },
          to: { node: m }
        }).filter((edge) => madeOnlyOf(edge.from.ports) === "out" && madeOnlyOf(edge.to.ports) === "in").size() > 0).forEach((m) => visit(m, import_lodash24.default(stack).concat([n]).value())).forEach((m) => {
          graph.addEdge({
            type: "InteractionInstanceDataDependency",
            from: { node: n },
            to: { node: m }
          });
        }).commit();
        n.markedDuringGraphOrdering = true;
        n.temporarilyMarkedDuringGraphOrdering = false;
        orderingList.unshift(n);
      }
    }
  }
  import_lodash24.default(orderingList).reduce((prev, current, index) => {
    current.hasExecutionOrder = true;
    current.executionOrder = index;
    if (prev !== null) {
      graph.addEdge({
        type: "InteractionInstanceOrdering",
        executionOrder: index,
        from: { node: prev },
        to: { node: current }
      });
    }
    return current;
  }, null);
}

// ../lidl-core/src/graphTransformations/keepOnlyOrdering.ts
function keepOnlyOrdering(graph) {
  graph.matchUndirectedEdges().reject({ type: "InteractionInstanceOrdering" }).forEach((e) => {
    graph.finish(e);
  }).commit();
}

// ../lidl-core/src/graphOutputs/getExpandedLidl.ts
var import_lodash25 = __toESM(require_lodash(), 1);
function getExpandedLidl(graph, _rootDefinitionNode) {
  return { source: "change code in getExpandedLidl.js to see this" };
  let defNode = graph.findNode({ type: "InteractionDefinition" });
  let rootNode = graph.findDirectedEdge({
    type: "DefinitionInteractionInstance",
    from: { node: defNode }
  }).to.node;
  return { source: getLidl(graph, rootNode) };
}
function getLidl(graph, node) {
  let operand = graph.matchUndirectedEdges({
    type: "InteractionInstanceOperand",
    from: { node }
  }).filter((e) => e.to.index === 0 && e.from.index > 0).sortBy((e) => e.from.index).map("to.node").map((n) => getLidl(graph, n)).value();
  let operator2 = node.content.formating.split("$");
  return "(" + import_lodash25.default.range(2 * operator2.length - 1).map((x) => x % 2 === 0 ? operator2[x / 2] : operand[(x - 1) / 2]).join("") + ")";
}

// ../lidl-core/src/graphOutputs/getJsCode.ts
var import_lodash26 = __toESM(require_lodash(), 1);
function getJsCode(graph, header) {
  var nodesCode = graph.matchNodes({
    type: "InteractionInstance",
    codeGenerated: true,
    hasExecutionOrder: true
  }).sortBy("executionOrder").map((n) => n.codeGeneration.js).join("");
  var edgeTemplate = import_lodash26.default.template("var <%=id%> = inactive;");
  var edgesCode = graph.matchDirectedEdges({ type: "InteractionInstanceOperand" }).map(edgeTemplate).join(`
`);
  var stateTemplate = import_lodash26.default.template("<%=stateVariableName%>:null");
  var statesCode = graph.matchNodes({ type: "InteractionInstance", containsAState: true }).uniqBy("stateVariableName").map(stateTemplate).join(`,
`);
  var conf = {
    edgesCode,
    nodesCode,
    statesCode,
    customHeader: header,
    standardHeader: jsStandardHeader
  };
  var transTemplate = `///////////////////////////////////////////////////////////////////////
// Standard LIDL Header (Standard JS function definitions)
<%= standardHeader%>

///////////////////////////////////////////////////////////////////////
// Custom LIDL Header (Custom JS function definitions)
<%= customHeader%>

///////////////////////////////////////////////////////////////////////
// Declaration of variables (Edges of the graph)
<%= edgesCode%>

///////////////////////////////////////////////////////////////////////
// Data flow processing (Nodes of the graph)
<%= nodesCode%>

///////////////////////////////////////////////////////////////////////
// Return statement
  return {
      memo: {},
      state: nextState,
      args: theArgs,
      inter: theInterface
    };
`;
  var initTemplate = `return {
      memo: {},
      state: {<%= statesCode%>},
      args: {},
      inter: {}
    };
`;
  var transCode = import_lodash26.default.template(transTemplate)(conf);
  var initCode = import_lodash26.default.template(initTemplate)(conf);
  return {
    source: import_lodash26.default.template(jsSourceTemplate)({
      transitionFunction: transCode,
      initializationFunction: initCode
    }),
    partialSource: {
      transitionFunction: transCode,
      initializationFunction: initCode
    }
  };
}
var jsStandardHeader = `function clone(a) {if (!a) return a;var c, b = [Number, String, Boolean];if (b.forEach(function(b) { a instanceof b && (c = b(a)); }), "undefined" == typeof c) if ("[object Array]" === Object.prototype.toString.call(a)) c = [], a.forEach(function(a, b, d) { c[b] = clone(a); }); else if ("object" == typeof a) if (a.nodeType && "function" == typeof a.cloneNode) c = a.cloneNode(!0); else if (a.prototype) c = a; else if (a instanceof Date) c = new Date(a); else { c = {}; for (var d in a) c[d] = clone(a[d]); } else c = a; return c;}

var theInterface = clone(data.inter);
var previousState = data.state;
var nextState = clone(previousState);
var theArgs = clone(data.args);
var active = "lidl_active_value";
var inactive = null;
`;
var jsSourceTemplate = `function transitionFunction(data){
<%=transitionFunction%>
}

function initializationFunction(data){
<%=initializationFunction%>
}

module.export={transitionFunction:  transitionFunction ,initializationFunction: initializationFunction};`;

// ../lidl-core/src/graphOutputs/getInteractionMetrics.ts
function getInteractionMetrics(graph) {
  return {
    metrics: {
      numberOfIdentifiers: graph.matchNodes({
        type: "InteractionInstance",
        content: { operatorType: "Identifier" }
      }).size(),
      numberOfComposition: graph.matchNodes({
        type: "InteractionInstance",
        content: { operatorType: "Composition" }
      }).size(),
      numberOfBehaviour: graph.matchNodes({
        type: "InteractionInstance",
        content: { operatorType: "Behaviour" }
      }).size(),
      numberOfAffectation: graph.matchNodes({
        type: "InteractionInstance",
        content: { operatorType: "Affectation" }
      }).size(),
      numberOfPrevious: graph.matchNodes({
        type: "InteractionInstance",
        content: { operatorType: "Previous" }
      }).size(),
      numberOfFunctionApplication: graph.matchNodes({
        type: "InteractionInstance",
        content: { operatorType: "FunctionApplication" }
      }).size(),
      numberOfFunction: graph.matchNodes({
        type: "InteractionInstance",
        content: { operatorType: "FunctionLiteral" }
      }).size(),
      numberOfActivation: graph.matchNodes({
        type: "InteractionInstance",
        content: { operatorType: "Activation" }
      }).size(),
      numberOfBoolean: graph.matchNodes({
        type: "InteractionInstance",
        content: { operatorType: "Boolean" }
      }).size(),
      numberOfNumber: graph.matchNodes({
        type: "InteractionInstance",
        content: { operatorType: "Number" }
      }).size(),
      numberOfText: graph.matchNodes({
        type: "InteractionInstance",
        content: { operatorType: "Text" }
      }).size(),
      numberOfVoid: graph.matchNodes({
        type: "InteractionInstance",
        content: { operatorType: "Void" }
      }).size(),
      totalInteractions: graph.matchNodes({ type: "InteractionInstance" }).size()
    }
  };
}

// ../lidl-core/src/graphCompiler.ts
function compile(ast, header, callbacks) {
  function callCallback(element, data) {
    graph.clean();
    if (import_lodash27.default.isUndefined(callbacks[element])) {
      return true;
    } else {
      let ret = callbacks[element](graph, import_lodash27.default.isObject(data) ? import_lodash27.default.assign({
        stage: element
      }, data) : import_lodash27.default.isUndefined(data) ? {
        stage: element
      } : data);
      if (import_lodash27.default.isBoolean(ret)) {
        return ret;
      } else {
        throw new Error("Compilation stage callbacks should return a boolean (true to continue compilation, false to stop it), the callback for " + element + " returned " + ret);
      }
    }
  }
  var newCallbacks = import_lodash27.default.assign(import_lodash27.default.clone(callbacks), {
    instantiateInterfaces: (graph2, data) => {
      callCallback("getExpandedLidlCode", getExpandedLidl(graph2, rootDefinitionNode));
      return callCallback("instantiateInterfaces", data);
    },
    referentialTransparencyInstances: (graph2, data) => {
      callCallback("getInteractionMetrics", getInteractionMetrics(graph2));
      return callCallback("referentialTransparencyInstances", data);
    },
    orderGraph: (graph2, data) => {
      callCallback("getJsCode", getJsCode(graph2, header));
      return callCallback("orderGraph", data);
    }
  });
  let graph = new g_default;
  let rootDefinitionNode = addDefinitionToGraph(graph, ast);
  graphTransformationPipeline(graph, rootDefinitionNode, newCallbacks);
  return graph;
}
function graphTransformationPipeline(graph, rootDefinitionNode, callbacks) {
  var step = 0;
  var callBackIterationCounter = {};
  function callCallback(element, data) {
    graph.clean();
    step = step + 1;
    if (callBackIterationCounter[element] === undefined)
      callBackIterationCounter[element] = 0;
    callBackIterationCounter[element] = callBackIterationCounter[element] + 1;
    if (import_lodash27.default.isUndefined(callbacks[element])) {
      return true;
    } else {
      let additionalInfo = {
        stage: element,
        step,
        iteration: callBackIterationCounter[element]
      };
      let ret = callbacks[element](graph, import_lodash27.default.isObject(data) ? import_lodash27.default.assign(additionalInfo, data) : import_lodash27.default.isUndefined(data) ? additionalInfo : data);
      if (import_lodash27.default.isBoolean(ret)) {
        return ret;
      } else {
        throw new Error("Compilation stage callbacks should return a boolean (true to continue compilation, false to stop it), the callback for " + element + " returned " + ret);
      }
    }
  }
  try {
    if (callCallback("addDefinitionToGraph") === false)
      return graph;
    addOperatorTypeAnnotation(graph);
    if (callCallback("addOperatorTypeAnnotation") === false)
      return graph;
    referentialTransparency(graph);
    if (callCallback("referentialTransparency") === false)
      return graph;
    linkInteractionsToDefinitions(graph);
    if (callCallback("linkInteractionsToDefinitions") === false)
      return graph;
    addInterfaceInformationToInteractions(graph);
    if (callCallback("addInterfaceInformationToInteractions") === false)
      return graph;
    expandDefinitions(graph);
    if (callCallback("expandDefinitions") === false)
      return graph;
    removeNonRootDefinition(graph, rootDefinitionNode);
    if (callCallback("removeNonRootDefinitions") === false)
      return graph;
    clearSubInformation(graph);
    if (callCallback("clearSubInformation") === false)
      return graph;
    instantiateInterfaces(graph, rootDefinitionNode);
    if (callCallback("instantiateInterfaces") === false)
      return graph;
    linkArguments(graph, rootDefinitionNode);
    if (callCallback("linkArguments") === false)
      return graph;
    linkInterface(graph, rootDefinitionNode);
    if (callCallback("linkInterface") === false)
      return graph;
    keepOnlyInteractions(graph);
    if (callCallback("keepOnlyInteractions") === false)
      return graph;
    referentialTransparencyInstances(graph);
    if (callCallback("referentialTransparencyInstances") === false)
      return graph;
    createDataFlowDirection(graph);
    if (callCallback("createDataFlowDirection") === false)
      return graph;
    voidInteractionCreation(graph);
    if (callCallback("voidInteractionCreation") === false)
      return graph;
    behaviourSeparation(graph);
    if (callCallback("behaviourSeparation") === false)
      return graph;
    createDataFlowDirection(graph);
    if (callCallback("createDataFlowDirection") === false)
      return graph;
    functionLiteralLinking(graph);
    if (callCallback("functionLiteralLinking") === false)
      return graph;
    createDataFlowDirection(graph);
    if (callCallback("createDataFlowDirection") === false)
      return graph;
    dataLiteralLinking(graph);
    if (callCallback("dataLiteralLinking") === false)
      return graph;
    createDataFlowDirection(graph);
    if (callCallback("createDataFlowDirection") === false)
      return graph;
    functionApplicationLinking(graph);
    if (callCallback("functionApplicationLinking") === false)
      return graph;
    createDataFlowDirection(graph);
    if (callCallback("createDataFlowDirection") === false)
      return graph;
    previousNextLinking(graph);
    if (callCallback("previousNextLinking") === false)
      return graph;
    createDataFlowDirection(graph);
    if (callCallback("createDataFlowDirection") === false)
      return graph;
    tagCompositionElementEdges(graph);
    if (callCallback("tagCompositionElementEdges") === false)
      return graph;
    while (true) {
      let didReduce = matchingCompositionReduction(graph);
      if (callCallback("matchingCompositionReduction") === false)
        return graph;
      createDataFlowDirection(graph);
      if (callCallback("createDataFlowDirection") === false)
        return graph;
      if (!didReduce)
        break;
    }
    linkIdentifiers(graph);
    if (callCallback("linkIdentifiers") === false)
      return graph;
    createDataFlowDirection(graph);
    if (callCallback("createDataFlowDirection") === false)
      return graph;
    while (true) {
      let didReduce = matchingCompositionReduction(graph);
      if (callCallback("matchingCompositionReduction") === false)
        return graph;
      createDataFlowDirection(graph);
      if (callCallback("createDataFlowDirection") === false)
        return graph;
      if (!didReduce)
        break;
    }
    removeOneSidedAffectation(graph);
    if (callCallback("removeOneSidedAffectation") === false)
      return graph;
    while (true) {
      let v = graph.version;
      createDataFlowDirection(graph);
      if (callCallback("createDataFlowDirection") === false)
        return graph;
      nonMatchingCompositionCompilation(graph);
      if (callCallback("nonMatchingCompositionCompilation") === false)
        return graph;
      affectationLinking(graph);
      if (callCallback("affectationLinking") === false)
        return graph;
      if (graph.version === v)
        break;
    }
    createDataFlowDirection(graph);
    if (callCallback("createDataFlowDirection") === false)
      return graph;
    removeDuplicateEdge(graph);
    if (callCallback("removeDuplicateEdge") === false)
      return graph;
    resolveMultiplePorts(graph);
    if (callCallback("resolveMultiplePorts") === false)
      return graph;
    createDataFlowDirection(graph);
    if (callCallback("createDataFlowDirection") === false)
      return graph;
    instantiateTemplates(graph);
    if (callCallback("instantiateTemplates") === false)
      return graph;
    orderGraph(graph);
    if (callCallback("orderGraph") === false)
      return graph;
    keepOnlyOrdering(graph);
    if (callCallback("keepOnlyOrdering") === false)
      return graph;
    if (callCallback("graphTransformationPipeline") === false)
      return graph;
    return graph;
  } catch (e) {
    callCallback("error", {
      error: e,
      iteration: 1
    });
    throw e;
  }
}
// ../lidl-core/src/examples.ts
var examples_default = {
  header: `var isActive = function(_) {
  return (_ !== null && _ !== undefined);
};

var cool = function(_) {
  if (isActive(_.a) && isActive(_.b)) {
    return {
      sum: (_.a + _.b),
      diff: (_.a - _.b)
    };
  } else {
    return {
      sum: inactive,
      diff: inactive
    };
  }
};


var isInactive = function(y){return !isActive(y);};


var fallback = function(_) {
  return (isActive(_.a) ? _.a : _.b);
};

var return0 = function(_) {
  return 0;
};


var return1 = function(_) {
  return 1;
};

var addition = function(_) {
  if (isActive(_.a) && isActive(_.b)) {
    return _.a + _.b;
  } else {
    return inactive;
  }
};

var multiplication = function(_) {
  if (isActive(_.a) && isActive(_.b)) {
    return _.a * _.b;
  } else {
    return inactive;
  }
};

var substraction = function(_) {
  if (isActive(_.a) && isActive(_.b)) {
    return _.a - _.b;
  } else {
    return inactive;
  }
};

var division = function(_) {
  if (isActive(_.a) && isActive(_.b)) {
    return _.a / _.b;
  } else {
    return inactive;
  }
};

var remainder = function(_) {
  if (isActive(_.a) && isActive(_.b)) {
    return _.a % _.b;
  } else {
    return inactive;
  }
};

var power = function(_) {
  if (isActive(_.a) && isActive(_.b)) {
    return Math.pow(_.a, _.b);
  } else {
    return inactive;
  }
};

var addOne = function(_) {
  if (isActive(_))
    return _ + 1;
  else {
    return inactive;
  }
};

var identity = function(_) {
  return _;
};

var isEqual = function(_) {
  if (isActive(_.a) && isActive(_.b)) {
    return (_.a === _.b) ? true : false;
  } else {
    return inactive;
  }
};


var boolNot = function(_) {
  if (isActive(_)) {
    return !_;
  } else {
    return inactive;
  }
};

var boolAnd = function(_) {
  if (isActive(_) && isActive(_.a) && isActive(_.b)) {
    return _.a && _.b;
  } else {
    return inactive;
  }
};

var boolOr = function(_) {
  if (isActive(_)&& isActive(_.a) && isActive(_.b)) {
    return _.a || _.b;
  } else {
    return inactive;
  }
};

var boolXor = function(_) {
  if (isActive(_)&& isActive(_.a) && isActive(_.b)) {
    return ( _.a && !_.b ) || ( !_.a && _.b ) ;
  } else {
    return inactive;
  }
};


var ifThenElse = function(_) {
  if (isActive(_)) {
    if (isActive(_.cond)) {
      if (_.cond === true) {
        return _.a;
      } else if (_.cond === false) {
        return _.b;
      } else {
        return inactive;
      }
    } else {
      return inactive;
    }
  } else {
    return inactive;
  }
};


var whenThenElse = function(_) {
  if (isActive(_)) {
    if (isActive(_.cond)) {
      if (_.cond === true) {
        return {
          a: active,
          b: inactive
        };
      } else if (_.cond === false) {
        return {
          a: inactive,
          b: active
        };
      } else {
        return inactive;
      }
    } else {
      return inactive;
    }
  } else {
    return inactive;
  }
};


var all = function(_) {
  return {
    a: _,
    b: _,
    c: _,
    d: _,
    e: _,
    f: _,
    g: _,
    h: _,
    i: _,
    j: _,
    k: _,
    l: _,
    m: _,
    n: _,
    o: _,
    p: _
  };
};


var cursor = function(mouse) {
  var cursor = {
    type: "shadow",
    blur: mouse.buttons === 0 ? 20 : 10,
    offset: {
      x: 0,
      y: mouse.buttons === 0 ? 4 : 2
    },
    color: "rgba(0, 0, 0, 0.5)",
    content: {
      type: "translate",
      x: mouse.position.x,
      y: mouse.position.y,
      content: {
        type: "scale",
        width: mouse.buttons === 0 ? 1 : 0.8,
        height: mouse.buttons === 0 ? 1 : 0.8,
        content: {
          type: "fill",
          style: "rgba(200, 0, 200, 1)",
          content: {
            type: "path",
            content: [{
              type: "begin"
            }, {
              type: "move",
              x: 0,
              y: 0
            }, {
              type: "line",
              x: 0,
              y: 15
            }, {
              type: "line",
              x: 10.6,
              y: 10.6
            }, {
              type: "close"
            }]
          }
        }
      }
    }
  };
  return cursor;
}

var toString = function(_){
  if(isActive(_)){
    return _+"";
  } else {
    return inactive;
  }
}

var button = function(button) {
  var button = {
    type: "shadow",
    blur: button.pushed ? 10 : 20,
    offset: {
      x: 0,
      y: button.pushed ? 2 : 4
    },
    color: "rgba(0, 0, 0, 0.5)",
    content: {
      type: "group",
      content: [{
        type: "fill",
        style: "rgba(0, 171, 255, 1)",
        content: {
          type: "rect",
          x: button.layout.x,
          y: button.layout.y,
          width: button.layout.width,
          height: button.layout.height
        }
      }, {
        type: "fill",
        style: "rgba(255, 255, 255, 1)",
        content: {
          type: "text",
          textBaseline: "middle",
          textAlign: "center",
          font: "200 30px Helvetica neue",
          text: button.text,
          x: button.layout.x + button.layout.width / 2,
          y: button.layout.y + button.layout.height / 2
        }
      }]
    }
  };
  return button;
}




var label = function(_) {
  var label = {
        type: "fill",
        style: "rgba(56, 56, 56, 1)",
        content: {
          type: "text",
          textBaseline: "middle",
          textAlign: "center",
          font: "200 30px Helvetica neue",
          text: _.text,
          x: _.layout.x + _.layout.width / 2,
          y: _.layout.y + _.layout.height / 2
        }
      };
  return label;
}



var group = function(elements) {
  var group = {
      type: "group",
      content: [elements.a,elements.b ]
    };
  return group;
}

// Checks if a point is inside a rectangle (picking)
var isInside = function(_){
  if(isActive(_) && isActive(_.point) && isActive(_.rect)){
    return _.point.x >= _.rect.x && _.point.x <= _.rect.x + _.rect.width && _.point.y >= _.rect.y && _.point.y <= _.rect.y + _.rect.height;
  } else {
    return inactive;
  }
}

// Returns a rectangle which is a fraction of a column of another rectanle
var columnElement = function(_){
  if(isActive(_) && isActive(_.interval) && isActive(_.rect)){
    return {x:_.rect.x,y:_.rect.y+_.interval.start*_.rect.height,width:_.rect.width,height:_.rect.height*(_.interval.end - _.interval.start)};
  } else {
    return inactive;
  }
}

// Returns a rectangle which is a fraction of a column of another rectanle
var rowElement = function(_){
  if(isActive(_) && isActive(_.interval) && isActive(_.rect)){
    return {y:_.rect.y,x:_.rect.x+_.interval.start*_.rect.width,height:_.rect.height,width:_.rect.width*(_.interval.end - _.interval.start)};
  } else {
    return inactive;
  }
}

// Returns a rectangle which is inset with a margin inside a bigger rectangle
var inset = function(_){
  if(isActive(_) && isActive(_.margin) && isActive(_.rect)){
    return {x:_.rect.x + _.margin,y:_.rect.y + _.margin,width:_.rect.width-2*_.margin,height:_.rect.height-2*_.margin};
  } else {
    return inactive;
  }
}
`,
  lidl: [
    {
      name: "Definition Of Make Flow",
      fileName: "/Users/vincent-lecrubier/Code/lidl/lidl-core/example/ok/definitionOfMakeFlow",
      code: `interaction
  (bob):{theNumber:Number in,theResult:Number out}
with

  interaction
    (previous (x:Number in)):Number out
  is
    (
      ((the previous(x))!)
      with behaviour
      (((the previous(x))?)= previous (x))
    )

  interaction
    (not(a:Boolean in)):Boolean out
  with
    interaction (boolean negation):{Boolean->Boolean} out is (function boolNot)
  is
    (
      ((#not (a))!)
      with behaviour
      ((boolean negation)  (a) = ((#not (a))?) )
    )

  interaction
    ((a:Number in) is active):Boolean out
  with
    interaction (is active):{Number->Boolean}out is (function isActive)
  is
    (
      ((#(a) is active)!)
      with behaviour
      (apply (is active) to (a) and get ((#(a) is active)?) )
    )

  interaction
    ((a:Number in)+(b:Number in)):Number out
  with
    interaction (addition):{{a:Number,b:Number}->Number} out is (function addition)
  is
    (
      ((result of (a)+(b))!)
      with behaviour
      (
        apply
        (addition)
        to
        ({a:(a)b:(b)})
        and get
        ((result of (a)+(b))?)
      )
    )


  interaction
    (init):Boolean out
  is
    ( not ( (previous(1) ) is active ) )

  interaction
    (all (a:Activation out) else (b:Activation out)):Activation in
  with
    interaction (func all):{Activation->{a:Activation,b:Activation}} out is (function all)
  is
    (
      ((variable all (a) (b))?)
      with behaviour
      (
        apply
        (function all)
        to
        ((variable all (a) (b))!)
        and get
        ({a:(a) b:(b)})
      )
    )

  interaction
    ( (a:Number in) fallback to (b:Number in)):Number out
  is
    (
      if ((a) is active)
      then (a)
      else (b)
    )



  interaction
    ((u:Number in)==(v:Number in)):Boolean out
  with
    interaction (is equal):{{a:Number,b:Number}->Boolean}out is (function isEqual)
  is
    (
      ((result of (u)==(v))!)
      with behaviour
      (apply (is equal) to ({a:(u),b:(v)}) and get ((result of (u)==(v))?) )
    )


  interaction
    (when (cond:Boolean in) then (a:Activation out) else (b:Activation out)):Activation in
  with
    interaction
      (whenThenElse):{{cond:Boolean,source:Activation}->{a:Activation,b:Activation}}out
    is
      (function whenThenElse)
  is
    (
      ((activation of when (cond) then (a) else (b) )?)
      with behaviour
      (
        apply
        (whenThenElse)
        to
        ({  cond:(cond)  source:((activation of when (cond) then (a) else (b)) !)   })
        and get
        ({a:(a) b:(b)})
      )
    )

  interaction
    (if (cond:Boolean in) then (x:Number in) else (y:Number in)):Number out
  is
    (
      ( (result of if (cond) then (x) else (y)) !)
      with behaviour
      (
        when
        (cond)
        then
        (( (result of if (cond) then (x) else (y) )?) = (x))
        else
        (( (result of if (cond) then (x) else (y) )?) = (y))
      )
    )

  interaction
    (make (x:Number ref) flow initially from (y:Number in)):Activation in
  is
    (
      ((x)?) = (
                  ((new (x))!)
                  fallback to
                  (if (init) then (y) else (previous ((x)!)) )
                )
    )


is
  (
    ({
      theNumber:((new ( y ))?)
      theResult:(( y )!)
    })
    with behaviour
    (make ( y ) flow initially from (1) )
  )
`,
      scenario: `[
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": 1 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": 1 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 78,  "theResult": 78 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": 78 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 67,  "theResult": 67 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": -4,  "theResult": -4 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": -4 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": -4 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": -4 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 42,  "theResult": 42 }
  }
]
`
    },
    {
      name: "Composition 2 X 2",
      fileName: "/Users/vincent-lecrubier/Code/lidl/lidl-core/example/ok/composition2x2",
      code: `interaction
  (bob):{theNumber:Number in,theOther:Number in,theResult:Number out,theLast:Number out}
with
 interaction
  (cool):{{a:Number,b:Number}->{sum:Number,diff:Number}} out
  is
  (function cool)
is
  (
    ({
      theNumber:( (theNumber)?)
      theOther:( (y)?)
      theResult:( (theResult)!)
      theLast:( (wow)!)
    })
  with behaviour
    ( apply (cool)
      to
      ({a:( (theNumber)!)b:( (y)!)})
      and get
      ({sum:( (theResult)?)diff:( (wow)?)})
    )
  )
`,
      scenario: `[
  {
    "args":  {},
    "inter":  { "theNumber": 50,"theOther": 50,   "theResult": 100,"theLast":0 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 78, "theOther": 2, "theResult": 80,"theLast":76 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,"theOther": 50,  "theResult": null,"theLast":null }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 42,"theOther": 12,  "theResult": 54,"theLast":30 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 67,"theOther": 50,  "theResult": 117,"theLast":17 }
  }
]
`
    },
    {
      name: "Ui Button",
      fileName: "/Users/vincent-lecrubier/Code/lidl/lidl-core/example/ok/uiButton",
      code: `interaction
  (simple UI):{mouse:Mouse in,graphics:Graphics out}
with

  interaction
    (button widget):{mouse:Mouse in,graphics:Graphics out}
  with
    interaction (button):{{layout:{x:Number,y:Number,width:Number,height:Number},text:Text,pushed:Boolean}->Graphics}out is (function button)
  is
    (
      ({
        mouse: ((the mouse for button widget)?)
        graphics: ((the graphics for button widget)!)
      })
      with behaviour
      ((button)({layout:({x:(10)y:(10)width:(200)height:(100)})text:("OK")pushed:(false)})=((the graphics for button widget)?))
    )

is
  (button widget)
`,
      scenario: `[{
  "memo": {},
  "state": {},
  "args": {},
  "inter": {
    "mouse": {
      "buttons": 0,
      "position": {
        "x": 42,
        "y": 63
      },
      "wheel": {
        "x": 0,
        "y": 0,
        "z": 0
      }
    },
    "graphics":
    {
      "type": "shadow",
      "blur": 20,
      "offset": {
        "x": 0,
        "y": 4
      },
      "color": "rgba(0, 0, 0, 0.5)",
      "content": {
        "type": "group",
        "content": [{
          "type": "fill",
          "style": "rgba(0, 171, 255, 1)",
          "content": {
            "type": "rect",
            "x": 10,
            "y": 10,
            "width": 200,
            "height": 100
          }
        }, {
          "type": "fill",
          "style": "rgba(255, 255, 255, 1)",
          "content": {
            "type": "text",
            "textBaseline": "middle",
            "textAlign": "center",
            "font": "200 30px Helvetica neue",
            "text": "OK",
            "x": 110,
            "y": 60
          }
        }]
      }
    }
  }
}]
`
    },
    {
      name: "Simple Func",
      fileName: "/Users/vincent-lecrubier/Code/lidl/lidl-core/example/ok/simpleFunc",
      code: `interaction
  (bob):{theNumber:Number in,theResult:Number out}
with
  interaction
    (bob(x:Number in)):Number out
  with
    interaction
      (addOne):{Number->Number}out
    is
      (function addOne)
  is
    (((result of bob(x))!) with behaviour ((addOne)(x)=((result of bob(x))?)))
is
  ({theNumber:((a)?),theResult:(bob((a)!))})
`,
      scenario: `[
  {
    "args":  {},
    "inter":  { "theNumber": 50,  "theResult": 51 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 78,  "theResult": 79 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": null }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 42,  "theResult": 43 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 67,  "theResult": 68 }
  }
]
`
    },
    {
      name: "Problematic Definitionof If Then Else",
      fileName: "/Users/vincent-lecrubier/Code/lidl/lidl-core/example/ok/problematicDefinitionofIfThenElse",
      code: `interaction
 (test (a:Number in)):{theNumber:Number in,theResult:Number out}
with


  interaction
    ((a:Number in)==(b:Number in)):Boolean out
  with
    interaction (isEqual):{{a:Number,b:Number}->Boolean}out is (function isEqual)
  is
    (
      ((result of (a)==(b))!)
      with behaviour
      (apply (isEqual) to ({a:(a),b:(b)}) and get ((result of (a)==(b))?) )
    )


  interaction
    (when (cond:Boolean in) then (a:Activation out) else (b:Activation out)):Activation in
  with
    interaction (whenThenElse):{{cond:Boolean,source:Activation}->{a:Activation,b:Activation}}out is (function whenThenElse)
  is
    (
      ((activation of when (cond) then (a) else (b))?)
      with behaviour
      (
        apply
        (whenThenElse)
        to
        ({  cond:(cond)  source:((activation of when (cond) then (a) else (b))!)   })
        and get
        ({a:(a) b:(b)})
      )
    )

    interaction
      (if (cond:Boolean in) then (a:Number in) else (b:Number in)):Number out
    is
      (
        ((result of if (cond) then (a) else (b))!)
        with behaviour
        (
          when
          (cond)
          then
          (((result of if (cond) then (a) else (b))?) = (a))
          else
          (((result of if (cond) then (a) else (b))?) = (b))
        )
      )

is
  (if((a)==(1))then({theNumber:((b)?),theResult:((b)!)})else({theNumber:((b)?),theResult:(-8000)}))
`,
      scenario: `[
  {
    "args":  {"t":0},
    "inter":  4
  },
  {
    "args":  {"t":1},
    "inter":  3
  },
  {
    "args":  {"t":2},
    "inter":  4
  },
  {
    "args":  {"t":3},
    "inter":  4
  }
]
`
    },
    {
      name: "Function Application",
      fileName: "/Users/vincent-lecrubier/Code/lidl/lidl-core/example/ok/functionApplication",
      code: `interaction
  (bob):{theNumber:Number in,theResult:Number out}
with
  interaction (add one):{Number->Number}out is (function addOne)
is
  (
    ({
      theNumber:((theNumber)?)
      theResult:((theResult)!)
    })
    with behaviour
    (apply(add one) to ((theNumber)!) and get ((theResult)?))
  )
`,
      scenario: `[
  {
    "args":  {},
    "inter":  { "theNumber": 50,  "theResult": 51 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 78,  "theResult": 79 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": null }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 42,  "theResult": 43 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 67,  "theResult": 68 }
  }
]
`
    },
    {
      name: "Real Affectation Expression",
      fileName: "/Users/vincent-lecrubier/Code/lidl/lidl-core/example/ok/realAffectationExpression",
      code: `interaction
  (bob):{theNumber:Number in,theResult:Number out}
with

  interaction (addition):{{a:Number,b:Number}->Number}out is (function addition)

  interaction
    ((a:Number in)+(b:Number in)):Number out
  is
    (
      ((variable result of (a)+(b))!)
      with behaviour
      (
        apply (addition)
        to ({a:(a)b:(b)})
        and get ((variable result of (a)+(b))?)
      )
    )

is
  (
    ({
      theNumber:((theNumber)?)
      theResult:((theResult)!)
    })
    with behaviour
    (((theResult)?)=((1)+((theNumber)!)))
  )
`,
      scenario: `[
  {
    "args":  {},
    "inter":  { "theNumber": 50,  "theResult": 51 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 78,  "theResult": 79 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": null }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 42,  "theResult": 43 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 67,  "theResult": 68 }
  }
]
`
    },
    {
      name: "Definition Of Init",
      fileName: "/Users/vincent-lecrubier/Code/lidl/lidl-core/example/ok/definitionOfInit",
      code: `interaction
  (bob):{theNumber:Number in,theResult:Boolean out}
with

  interaction
    (previous (x:Number in)):Number out
  is
    (
      ((the previous(x))!)
      with behaviour
      (((the previous(x))?)= previous (x))
    )

  interaction
    ((a:Number in)==(b:Number in)):Boolean out
  with
    interaction (is equal):{{a:Number,b:Number}->Boolean}out is (function isEqual)
  is
    (
      ((result of (a)==(b))!)
      with behaviour
      (apply (is equal) to ({a:(a),b:(b)}) and get ( (result of (a)==(b))?) )
    )

  interaction
    (not(a:Boolean in)):Boolean out
  with
    interaction (boolean negation):{Boolean->Boolean} out is (function boolNot)
  is
    (
      ((#not (a)) !)
      with behaviour
      (apply (boolean negation) to (a) and get ((#not (a))?) )
    )

  interaction
    ((a:Number in) is active):Boolean out
  with
    interaction (is active):{Number->Boolean} out is (function isActive)
  is
    (
      ( (#(a) is active)!)
      with behaviour
      (apply (is active) to (a) and get ( (#(a) is active)?) )
    )

  interaction
    ((a:Number in)+(b:Number in)):Number out
  with
    interaction (addition):{{a:Number,b:Number}->Number} out is (function addition)
  is
    (
      ( (result of (a)+(b))!)
      with behaviour
      (
        apply
        (addition)
        to
        ({a:(a)b:(b)})
        and get
        ( (result of (a)+(b))?)
      )
    )

  interaction
    (init):Boolean out
  is
    ( not ( (previous(1) ) is active ) )

is
  ({
    theNumber:((theNumber)?)
    theResult:(init)
  })
`,
      scenario: `[
  {
    "args":  {},
    "inter":  { "theNumber": 50,  "theResult": true }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 78,  "theResult": false }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": false }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 42,  "theResult": false }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 67,  "theResult": false }
  }
]
`
    },
    {
      name: "Affectation Expression",
      fileName: "/Users/vincent-lecrubier/Code/lidl/lidl-core/example/ok/affectationExpression",
      code: `interaction
  (bob):{theNumber:Number in,theResult:Number out}
with

  interaction
    (the magic number):Number out
  with
    interaction (return1):{Void->Number} out is (function return1)
  is
    (
      ( (result1)!)
      with behaviour
      (
        apply
        (return1)
        to
        ( (ok)!)
        and get
        ( (result1)?)
      )
    )

  interaction
    ((a:Number in)+(b:Number in)):Number out
  with
    interaction (addition):{{a:Number,b:Number}->Number} out is (function addition)
  is
    (
      ( (result of (a)+(b))!)
      with behaviour
      (
        apply
        (addition)
        to
        ({a:(a)b:(b)})
        and get
        ( (result of (a)+(b))?)
      )
    )

is
  (
    ({
      theNumber:((theNumber)?)
      theResult:((theResult)!)
    })
  with behaviour
    (
      ((theResult)?) =((the magic number )+((theNumber)!))
    )
  )
`,
      scenario: `[
  {
    "args":  {},
    "inter":  { "theNumber": 50,  "theResult": 51 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 78,  "theResult": 79 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": null }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 42,  "theResult": 43 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 67,  "theResult": 68 }
  }
]
`
    },
    {
      name: "Abstract UI",
      fileName: "/Users/vincent-lecrubier/Code/lidl/lidl-core/example/ok/abstractUI",
      code: `
interaction
  (my abstract Interface):{valueLabel:{text:Text out}, valueManipulation:{incrementButton:{text:Text out,click:Activation in},decrementButton:{text:Text out,click:Activation in}}}
with


  interaction
    (all (a:Activation out)  (b:Activation out)):Activation in
  with
    interaction (func all):{Activation->{a:Activation,b:Activation}} out is (function all)
  is
    (
      ((variable all (a) (b))?)
      with behaviour
      (
        apply
        (func all)
        to
        ((variable all (a) (b))!)
        and get
        ({a:(a) b:(b)})
      )
    )

  interaction
    (previous (x:Number in)):Number out
  is
    (
      ((the previous(x))!)
      with behaviour
      (((the previous(x))?)= previous (x))
    )

  interaction
    (not(a:Boolean in)):Boolean out
  with
    interaction (boolean negation):{Boolean->Boolean} out is (function boolNot)
  is
    (
      ((#not (a))!)
      with behaviour
      ((boolean negation)  (a) = ((#not (a))?) )
    )

  interaction
    ((a:Number in) is active):Boolean out
  with
    interaction (is active):{Number->Boolean}out is (function isActive)
  is
    (
      ((#(a) is active)!)
      with behaviour
      (apply (is active) to (a) and get ((#(a) is active)?) )
    )

  interaction
    ((a:Number in)+(b:Number in)):Number out
  with
    interaction (addition):{{a:Number,b:Number}->Number} out is (function addition)
  is
    (
      ((result of (a)+(b))!)
      with behaviour
      (
        apply
        (addition)
        to
        ({a:(a)b:(b)})
        and get
        ((result of (a)+(b))?)
      )
    )

  interaction
    ((a:Number in)-(b:Number in)):Number out
  with
    interaction (substraction):{{a:Number,b:Number}->Number} out is (function substraction)
  is
    (
      ((result of (a)-(b))!)
      with behaviour
      (
        apply
        (substraction)
        to
        ({a:(a)b:(b)})
        and get
        ((result of (a)-(b))?)
      )
    )

  interaction
    (init):Boolean out
  is
    ( not ( (previous(1) ) is active ) )

  interaction
    (all (a:Activation out) else (b:Activation out)):Activation in
  with
    interaction (func all):{Activation->{a:Activation,b:Activation}} out is (function all)
  is
    (
      ((variable all (a) (b))?)
      with behaviour
      (
        apply
        (function all)
        to
        ((variable all (a) (b))!)
        and get
        ({a:(a) b:(b)})
      )
    )

  interaction
    ( (a:Number in) fallback to (b:Number in)):Number out
  is
    (
      if ((a) is active)
      then (a)
      else (b)
    )



  interaction
    ((u:Number in)==(v:Number in)):Boolean out
  with
    interaction (is equal):{{a:Number,b:Number}->Boolean}out is (function isEqual)
  is
    (
      ((result of (u)==(v))!)
      with behaviour
      (apply (is equal) to ({a:(u),b:(v)}) and get ((result of (u)==(v))?) )
    )


  interaction
    (when (cond:Boolean in) then (a:Activation out) else (b:Activation out)):Activation in
  with
    interaction
      (whenThenElse):{{cond:Boolean,source:Activation}->{a:Activation,b:Activation}}out
    is
      (function whenThenElse)
  is
    (
      ((activation of when (cond) then (a) else (b) )?)
      with behaviour
      (
        apply
        (whenThenElse)
        to
        ({  cond:(cond)  source:((activation of when (cond) then (a) else (b)) !)   })
        and get
        ({a:(a) b:(b)})
      )
    )

  interaction
    (if (cond:Boolean in) then (x:Number in) else (y:Number in)):Number out
  is
    (
      ( (result of if (cond) then (x) else (y)) !)
      with behaviour
      (
        when
        (cond)
        then
        (( (result of if (cond) then (x) else (y) )?) = (x))
        else
        (( (result of if (cond) then (x) else (y) )?) = (y))
      )
    )

  interaction
    (make (x:Number ref) flow initially from (y:Number in)):Activation in
  is
    (
      ((x)?) = (
                  ((new (x))!)
                  fallback to
                  (if (init) then (y) else (previous ((x)!)) )
                )
    )


  interaction
    (label displaying text (theText:Text in)):{text:Text out}
  is
  ({
    text:(theText)
  })


  interaction
    (label displaying number (theNumber:Number in)):{text:Text out}
  with
    interaction (toString):{Number->Text} out is (function toString)
  is
    (
      ({
        text:((the string for (theNumber))!)
      })
      with behaviour
      ((toString)(theNumber)=((the string for (theNumber))?))
    )

  interaction
    (button displaying (theText:Text in) triggering (action:Activation out)):{text:Text out,click:Activation in}
  is
    ({
      text:(theText)
      click:(action)
    })


  interaction
    (increment decrement widget setting (theOutputValue:Number out)):{incrementButton:{text:Text out,click:Activation in},decrementButton:{text:Text out,click:Activation in}}
  is
    (
      ({
        incrementButton:(button displaying ("+") triggering (((new(theValue of increment decrement setting (theOutputValue)))?) = ((previous((theValue of increment decrement setting (theOutputValue))!)) + (1))) )
        decrementButton:(button displaying ("-") triggering (((new(theValue of increment decrement setting (theOutputValue)))?) = ((previous((theValue of increment decrement setting (theOutputValue))!)) - (1))) )
      })
      with behaviour
      (all
        (make (theValue of increment decrement setting (theOutputValue)) flow initially from (0))
        ((theOutputValue)=((theValue of increment decrement setting (theOutputValue))!))
      )
    )

is
  ({
    valueLabel:(label displaying number ((theValue)!)   )
    valueManipulation:(increment decrement widget setting ((theValue)?)   )
  })
`,
      scenario: `[{
  "args": {},
  "memo": {},
  "state": {},
  "inter": {
    "valueLabel": {
      "text": "0"
    },
    "valueManipulation": {
      "incrementButton": {
        "text": "+",
        "click": null
      },
      "decrementButton": {
        "text": "-",
        "click": null
      }
    }
  }
},
{
  "args": {},
  "memo": {},
  "state": {},
  "inter": {
    "valueLabel": {
      "text": "0"
    },
    "valueManipulation": {
      "incrementButton": {
        "text": "+",
        "click": null
      },
      "decrementButton": {
        "text": "-",
        "click": null
      }
    }
  }
},
{
  "args": {},
  "memo": {},
  "state": {},
  "inter": {
    "valueLabel": {
      "text": "1"
    },
    "valueManipulation": {
      "incrementButton": {
        "text": "+",
        "click": "lidl_active_value"
      },
      "decrementButton": {
        "text": "-",
        "click": null
      }
    }
  }
},
{
  "args": {},
  "memo": {},
  "state": {},
  "inter": {
    "valueLabel": {
      "text": "2"
    },
    "valueManipulation": {
      "incrementButton": {
        "text": "+",
        "click": "lidl_active_value"
      },
      "decrementButton": {
        "text": "-",
        "click": null
      }
    }
  }
},
{
  "args": {},
  "memo": {},
  "state": {},
  "inter": {
    "valueLabel": {
      "text": "2"
    },
    "valueManipulation": {
      "incrementButton": {
        "text": "+",
        "click": null
      },
      "decrementButton": {
        "text": "-",
        "click": null
      }
    }
  }
},
{
  "args": {},
  "memo": {},
  "state": {},
  "inter": {
    "valueLabel": {
      "text": "1"
    },
    "valueManipulation": {
      "incrementButton": {
        "text": "+",
        "click": null
      },
      "decrementButton": {
        "text": "-",
        "click": "lidl_active_value"
      }
    }
  }
}]
`
    },
    {
      name: "Sum Of Previous",
      fileName: "/Users/vincent-lecrubier/Code/lidl/lidl-core/example/ok/sumOfPrevious",
      code: `interaction
  (wow (a:Number in)):Number out
with

  interaction
    ((a:Number in) + (b:Number in)):Number out
  with
    interaction (addition):{{a:Number,b:Number}->Number}out is (function addition)
  is
    (((result of (a)+(b))!) with behaviour ((addition)({a:(a)b:(b)})=((result of (a)+(b))?)))

  interaction
    (previous(a:Number in)):Number out
  is
    (((the previous (a))!) with behaviour (((the previous (a))?) = previous (a)))

is
    ((previous(a))+(previous(a)))
`,
      scenario: `
[
  {
    "args": {
      "a": 1
    },
    "inter" : null
  },
  {
    "args": {
      "a": 8
    },
    "inter" : 2
  },
   {
    "args": {
      "a": 6
    },
    "inter" : 16
  }
]
`
    },
    {
      name: "Compilation Example Thesis",
      fileName: "/Users/vincent-lecrubier/Code/lidl/lidl-core/example/ok/compilationExampleThesis",
      code: `interaction
  (My Simple User Interface):{theNumber: Number in, theResult: Number out}
with
  interaction (add one):{Number->Number}out is (function addOne)
is
  (
    ({
      theNumber:  ((x)?)
      theResult:  ((y)!)
    })
    with behaviour
    (apply (add one) to ((x)!) and get ((y)?) )
  )
`,
      scenario: `[
  {
    "args":  {},
    "inter":  { "theNumber": 50,  "theResult": 51 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 78,  "theResult": 79 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": null }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 42,  "theResult": 43 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 67,  "theResult": 68 }
  }
]
`
    },
    {
      name: "Simple",
      fileName: "/Users/vincent-lecrubier/Code/lidl/lidl-core/example/ok/simple",
      code: `interaction
  (main):{theNumber:Number in,theResult:Number out}
is
  ({
    theNumber:((x)?)
    theResult:((x)!)
  })
`,
      scenario: `[
  {
    "args":  {},
    "inter":  { "theNumber": 50,  "theResult": 50 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 78,  "theResult": 78 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": null }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 42,  "theResult": 42 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 67,  "theResult": 67 }
  }
]
`
    },
    {
      name: "Referential Transparency",
      fileName: "/Users/vincent-lecrubier/Code/lidl/lidl-core/example/ok/referentialTransparency",
      code: `interaction
  (main):{theNumber:Number in,theResult:Number out}
with

  interaction (z):Number out
  is ((variable y b)?)

  interaction (y):Number out
  is ((variable y b)?)

  interaction (x):Number out
  is ((variable b)!)
is
  ({
    theNumber:(( x (y) ((variable b)!))?)
    theResult:(( x (z) (x))!)
  })
`,
      scenario: `[
  {
    "args":  {},
    "inter":  { "theNumber": 50,  "theResult": 50 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 78,  "theResult": 78 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": null }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 42,  "theResult": 42 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 67,  "theResult": 67 }
  }
]
`
    },
    {
      name: "Ui Cursor",
      fileName: "/Users/vincent-lecrubier/Code/lidl/lidl-core/example/ok/uiCursor",
      code: `interaction
  (simple UI):{mouse:Mouse in,graphics:Graphics out}
with

  interaction
    (cursor widget):{mouse:Mouse in,graphics:Graphics out}
  with
    interaction (cursor):{Mouse->Graphics}out is (function cursor)
  is
    (
      ({
        mouse: ((the mouse for cursor widget)?)
        graphics: ((the graphics for cursor widget)!)
      })
      with behaviour
      ((cursor)((the mouse for cursor widget)!)=((the graphics for cursor widget)?))
    )

is
  (cursor widget)
`,
      scenario: `[{
  "args": {},
  "inter": {
    "mouse": {
      "buttons": 0,
      "position": {
        "x": 42,
        "y": 63
      },
      "wheel": {
        "x": 0,
        "y": 0,
        "z": 0
      }
    },
    "graphics": {
      "type": "shadow",
      "blur": 20,
      "offset": {
        "x": 0,
        "y": 4
      },
      "color": "rgba(0, 0, 0, 0.5)",
      "content": {
        "type": "translate",
        "x": 42,
        "y": 63,
        "content": {
          "type": "scale",
          "width": 1,
          "height": 1,
          "content": {
            "type": "fill",
            "style": "rgba(200, 0, 200, 1)",
            "content": {
              "type": "path",
              "content": [{
                "type": "begin"
              }, {
                "type": "move",
                "x": 0,
                "y": 0
              }, {
                "type": "line",
                "x": 0,
                "y": 15
              }, {
                "type": "line",
                "x": 10.6,
                "y": 10.6
              }, {
                "type": "close"
              }]
            }
          }
        }
      }
    }
  }
}]
`
    },
    {
      name: "Simple Previous Next",
      fileName: "/Users/vincent-lecrubier/Code/lidl/lidl-core/example/ok/simplePreviousNext",
      code: `interaction
  (main):{theNumber:Number in,theResult:Number out}
is
  (
    ({
      theNumber:((x)?)
      theResult:((y)!)
    })
    with behaviour
    ( ((y)?) = previous ((x)!) )
  )
`,
      scenario: `[
  {
    "args":  {},
    "inter":  { "theNumber": 50,  "theResult": null }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 78,  "theResult": 50 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": 78 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 42,  "theResult": null }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 67,  "theResult": 42 }
  }
]
`
    },
    {
      name: "Composition 2 X 1",
      fileName: "/Users/vincent-lecrubier/Code/lidl/lidl-core/example/ok/composition2x1",
      code: `interaction
  (bob):{theNumber:Number in,theOther:Number in,theResult:Number out}
with
  interaction
    (addition):{{a:Number,b:Number}->Number}out
  is
    (function addition)
is
  (
    ({
      theNumber:((x)?)
      theOther:((y)?)
      theResult:((z)!)
    })
   with behaviour
    (apply
      (addition)
      to
      ({a:((x)!)b:((y)!)})
      and get
      ((z)?)
    )
  )
`,
      scenario: `[
  {
    "args":  {},
    "inter":  { "theNumber": 50,"theOther": 50,   "theResult": 100 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 78, "theOther": 2, "theResult": 80 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,"theOther": 50,  "theResult": null }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 42,"theOther": 12,  "theResult": 54 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 67,"theOther": 50,  "theResult": 117 }
  }
]
`
    },
    {
      name: "Fake Affectation",
      fileName: "/Users/vincent-lecrubier/Code/lidl/lidl-core/example/ok/fakeAffectation",
      code: `interaction
  (bob):{theNumber:Number in,theResult:Number out}
with
  interaction
    ((a:Number out)=fake=(b:Number in)):Activation in
  with
    interaction (identity):{Number->Number}out is (function identity)
  is
    (apply (identity) to (b) and get (a))
is
  (
    ({
      theNumber:((theNumber)?)
      theResult:((theResult)!)
    })
  with behaviour
    (((theResult)?)=fake=((theNumber)!))
  )
`,
      scenario: `[
  {
    "args":  {},
    "inter":  { "theNumber": 50,  "theResult": 50 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 78,  "theResult": 78 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": null }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 42,  "theResult": 42 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 67,  "theResult": 67 }
  }
]
`
    },
    {
      name: "Simple Cursor Function",
      fileName: "/Users/vincent-lecrubier/Code/lidl/lidl-core/example/ok/simpleCursorFunction",
      code: `interaction
  (cursor of (mouse:Mouse in)):Graphics out
with
  interaction (cursor):{Mouse->Graphics}out is (function cursor)
is
  (((#cursor of (mouse))!)
  with behaviour
  ((cursor)(mouse)=((#cursor of (mouse))?)))
`,
      scenario: `[{
  "args": {
    "mouse": {
      "buttons": 0,
      "position": {
        "x": 42,
        "y": 63
      }
    }
  },
  "inter": {
    "type": "shadow",
    "blur": 20,
    "offset": {
      "x": 0,
      "y": 4
    },
    "color": "rgba(0, 0, 0, 0.5)",
    "content": {
      "type": "translate",
      "x": 42,
      "y": 63,
      "content": {
        "type": "scale",
        "width": 1,
        "height": 1,
        "content": {
          "type": "fill",
          "style": "rgba(200, 0, 200, 1)",
          "content": {
            "type": "path",
            "content": [{
              "type": "begin"
            }, {
              "type": "move",
              "x": 0,
              "y": 0
            }, {
              "type": "line",
              "x": 0,
              "y": 15
            }, {
              "type": "line",
              "x": 10.6,
              "y": 10.6
            }, {
              "type": "close"
            }]
          }
        }
      }
    }
  }
}, {
  "args": {
    "mouse": {
      "buttons": 1,
      "position": {
        "x": 31,
        "y": 89
      }
    }
  },
  "inter": {
    "type": "shadow",
    "blur": 10,
    "offset": {
      "x": 0,
      "y": 2
    },
    "color": "rgba(0, 0, 0, 0.5)",
    "content": {
      "type": "translate",
      "x": 31,
      "y": 89,
      "content": {
        "type": "scale",
        "width": 0.8,
        "height": 0.8,
        "content": {
          "type": "fill",
          "style": "rgba(200, 0, 200, 1)",
          "content": {
            "type": "path",
            "content": [{
              "type": "begin"
            }, {
              "type": "move",
              "x": 0,
              "y": 0
            }, {
              "type": "line",
              "x": 0,
              "y": 15
            }, {
              "type": "line",
              "x": 10.6,
              "y": 10.6
            }, {
              "type": "close"
            }]
          }
        }
      }
    }
  }
}]
`
    },
    {
      name: "Definition Of Previous",
      fileName: "/Users/vincent-lecrubier/Code/lidl/lidl-core/example/ok/definitionOfPrevious",
      code: `interaction
  (bob):{theNumber:Number in,theResult:Number out}
with

  interaction
    (previous (x:Number in)):Number out
  is
    (
      ((the previous(x))!)
      with behaviour
      ( ((the previous(x))?) = previous (x))
    )

is
  ({
    theNumber:((x)?)
    theResult:(previous((x)!))
  })
`,
      scenario: `[
  {
    "args":  {},
    "inter":  { "theNumber": 50,  "theResult": null }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 78,  "theResult": 50 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": 78 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 42,  "theResult": null }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 67,  "theResult": 42 }
  }
]
`
    },
    {
      name: "Ui Empty With Cursor",
      fileName: "/Users/vincent-lecrubier/Code/lidl/lidl-core/example/ok/uiEmptyWithCursor",
      code: `interaction
  (empty UI with cursor):{
        mouse: {
          buttons: Number,
          position: {
            x: Number,
            y: Number
          },
          wheel: {
            x: Number,
            y: Number,
            z: Number
          }
        } in,
        graphics: Graphics out
      }

with

  interaction
    (cursor of (mouse:{
          buttons: Number,
          position: {
            x: Number,
            y: Number
          },
          wheel: {
            x: Number,
            y: Number,
            z: Number
          }
        } in)):Graphics out
  with
    interaction (cursor):{{
          buttons: Number,
          position: {
            x: Number,
            y: Number
          },
          wheel: {
            x: Number,
            y: Number,
            z: Number
          }
        }->Graphics}out is (function cursor)
  is
    (
      ((#cursor of (mouse))!)
      with behaviour
      ((cursor)(mouse)=((#cursor of (mouse))?))
    )


is
  ({
        mouse: ((mouse)?)
        graphics: (cursor of ((mouse)!))
  })
`,
      scenario: `[{
  "args": {},
  "inter": {
    "mouse": {
      "buttons": 0,
      "position": {
        "x": 42,
        "y": 63
      },
      "wheel": {
        "x": 0,
        "y": 0,
        "z": 0
      }
    },
    "graphics": {
      "type": "shadow",
      "blur": 20,
      "offset": {
        "x": 0,
        "y": 4
      },
      "color": "rgba(0, 0, 0, 0.5)",
      "content": {
        "type": "translate",
        "x": 42,
        "y": 63,
        "content": {
          "type": "scale",
          "width": 1,
          "height": 1,
          "content": {
            "type": "fill",
            "style": "rgba(200, 0, 200, 1)",
            "content": {
              "type": "path",
              "content": [{
                "type": "begin"
              }, {
                "type": "move",
                "x": 0,
                "y": 0
              }, {
                "type": "line",
                "x": 0,
                "y": 15
              }, {
                "type": "line",
                "x": 10.6,
                "y": 10.6
              }, {
                "type": "close"
              }]
            }
          }
        }
      }
    }
  }
}]
`
    },
    {
      name: "Dereferencing",
      fileName: "/Users/vincent-lecrubier/Code/lidl/lidl-core/example/ok/dereferencing",
      code: `interaction
  (bob):{theNumber:Number in,theResult:Number out}
with

  interaction
    ((x:{theNumber:Number in,theResult:Number out}).theNumber):Number out
  is
    (((#(x).theNumber)!) with behaviour (({theNumber:((#(x).theNumber)?)})=(x)))

  interaction
    ((x:{theNumber:Number in,theResult:Number out}).theResult):Number in
  is
    (((#(x).theResult)!) with behaviour ((x)=({theResult:((#(x).theResult)?)})))

is
  (
    ( (this)?)
    with behaviour
    ((( (this)!).theResult)=(( (this)!).theNumber) )
  )
`,
      scenario: `[
  {
    "args":  {},
    "inter":  { "theNumber": 50,  "theResult": 50 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 78,  "theResult": 78 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null,  "theResult": null }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 42,  "theResult": 42 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 67,  "theResult": 67 }
  }
]
`
    },
    {
      name: "Definitionof If Then Else",
      fileName: "/Users/vincent-lecrubier/Code/lidl/lidl-core/example/ok/definitionofIfThenElse",
      code: `interaction
 (test (t:Number in)):Number out
with


  interaction
    ((u:Number in)==(v:Number in)):Boolean out
  with
    interaction (is equal):{{a:Number,b:Number}->Boolean}out is (function isEqual)
  is
    (
      ( (result of (u)==(v))!)
      with behaviour
      (apply (is equal) to ({a:(u),b:(v)}) and get ( (result of (u)==(v))?) )
    )


  interaction
    (when (cond:Boolean in) then (a:Activation out) else (b:Activation out)):Activation in
  with
    interaction
      (whenThenElse):{{cond:Boolean,source:Activation}->{a:Activation,b:Activation}}out
    is
      (function whenThenElse)
  is
    (
      ( (activation of when (cond) then (a) else (b))?)
      with behaviour
      (
        apply
        (whenThenElse)
        to
        ({  cond:(cond)  source:( (activation of when (cond) then (a) else (b))!)   })
        and get
        ({a:(a) b:(b)})
      )
    )

    interaction
      (if (cond:Boolean in) then (x:Number in) else (y:Number in)):Number out
    is
    (
      ( (result of if (cond) then (x) else (y))?)
      with behaviour
      (
        when
        (cond)
        then
        (( (result of if (cond) then (x) else (y))!) = (x))
        else
        (( (result of if (cond) then (x) else (y))!) = (y))
      )
    )

is
  (if((t)==(1))then(3)else(4))
`,
      scenario: `[
  {
    "args":  {"t":0},
    "inter":  4
  },
  {
    "args":  {"t":1},
    "inter":  3
  },
  {
    "args":  {"t":2},
    "inter":  4
  },
  {
    "args":  {"t":3},
    "inter":  4
  }
]
`
    },
    {
      name: "Literals",
      fileName: "/Users/vincent-lecrubier/Code/lidl/lidl-core/example/ok/literals",
      code: `interaction
  (ok literal):Number out
with

  interaction
    ((a:Number in) + (b:Number in)):Number out
  with
    interaction
      (addition):{{a:Number,b:Number}->Number}out
    is
      (function addition)
  is
    (((#(a)+(b))!) with behaviour ((addition)({a:(a)b:(b)})=((#(a)+(b))?)))

is
  ((9)+(9))
`,
      scenario: `
[
  {
    "args": {},
    "inter" : 18
  },
  {
  "args": {},
  "inter" : 18
},
{
  "args": {},
  "inter" : 18
},
{
  "args": {},
  "inter" : 18
}
]
`
    },
    {
      name: "Ui Button With Cursor",
      fileName: "/Users/vincent-lecrubier/Code/lidl/lidl-core/example/ok/uiButtonWithCursor",
      code: `interaction
  (simple UI):{mouse:Mouse in,graphics:Graphics out}
with

  interaction
    (group widget containing (a:{mouse:Mouse out,graphics:Graphics in}) and (b:{mouse:Mouse out,graphics:Graphics in})):{mouse:Mouse in,graphics:Graphics out}
  is
    ({
      mouse:    (both ((a).mouse) and ((b).mouse))
      graphics: (graphics containing ((a).graphics) and ((b).graphics))
    })

  interaction
    ((x:{mouse:Mouse out,graphics:Graphics in}).mouse):Mouse in
  is
    (((result of (x).mouse)!)
    with behaviour
    ((x)=({mouse:((result of (x).mouse)?)})))



  interaction
    ((x:{mouse:Mouse out,graphics:Graphics in}).graphics):Graphics out
  is
    (((result of (x).graphics)!)
    with behaviour
    ((x)=({graphics:((result of (x).graphics)?)})))



  interaction
    (both (a:Mouse out) and (b:Mouse out)):Mouse in
  is
    (
      ( (#both(a)and(b)) ?)
      with behaviour
      (all
        ( (a) = ((#both(a)and(b))!) )
        ( (b) = ((#both(a)and(b))!) )
      )
    )

  interaction
    (graphics containing (a:Graphics in) and (b:Graphics in)):Graphics out
  with
    interaction (group graphics):{{a:Graphics,b:Graphics}->Graphics}out is (function group)
  is
    (
      ((result of graphics containing (a) and (b))!)
      with behaviour
      (
        (group graphics)
        ({a:(a),b:(b)})
        =
        ((result of graphics containing (a) and (b))?)
      )
    )


  interaction
    (all (a:Activation out)  (b:Activation out)):Activation in
  with
    interaction (func all):{Activation->{a:Activation,b:Activation}} out is (function all)
  is
    (
      ((variable all (a) (b))?)
      with behaviour
      (
        apply
        (func all)
        to
        ((variable all (a) (b))!)
        and get
        ({a:(a) b:(b)})
      )
    )


  interaction
    (cursor widget):{mouse:Mouse in,graphics:Graphics out}
  with
    interaction (cursor):{Mouse->Graphics}out is (function cursor)
  is
    (
      ({
        mouse: ((the mouse for cursor widget)?)
        graphics: ((the graphics for cursor widget)!)
      })
      with behaviour
      ((cursor)((the mouse for cursor widget)!)=((the graphics for cursor widget)?))
    )





  interaction
    (button widget):{mouse:Mouse in,graphics:Graphics out}
  with
    interaction (button):{{layout:{x:Number,y:Number,width:Number,height:Number},text:Text,pushed:Boolean}->Graphics}out is (function button)
  is
    (
      ({
        mouse: ((the mouse for button widget)?)
        graphics: ((the graphics for button widget)!)
      })
      with behaviour
      ((button)({layout:({x:(10)y:(10)width:(200)height:(100)})text:("OK")pushed:(false)})=((the graphics for button widget)?))
    )

is
  (group widget containing (cursor widget) and (button widget))
`,
      scenario: `[{
  "memo": {},
  "state": {},
  "args": {},
  "inter": {
    "mouse": {
      "buttons": 0,
      "position": {
        "x": 42,
        "y": 63
      },
      "wheel": {
        "x": 0,
        "y": 0,
        "z": 0
      }
    },
    "graphics": {
      "type": "group",
      "content": [{
        "type": "shadow",
        "blur": 20,
        "offset": {
          "x": 0,
          "y": 4
        },
        "color": "rgba(0, 0, 0, 0.5)",
        "content": {
          "type": "translate",
          "x": 42,
          "y": 63,
          "content": {
            "type": "scale",
            "width": 1,
            "height": 1,
            "content": {
              "type": "fill",
              "style": "rgba(200, 0, 200, 1)",
              "content": {
                "type": "path",
                "content": [{
                  "type": "begin"
                }, {
                  "type": "move",
                  "x": 0,
                  "y": 0
                }, {
                  "type": "line",
                  "x": 0,
                  "y": 15
                }, {
                  "type": "line",
                  "x": 10.6,
                  "y": 10.6
                }, {
                  "type": "close"
                }]
              }
            }
          }
        }
      }, {
        "type": "shadow",
        "blur": 20,
        "offset": {
          "x": 0,
          "y": 4
        },
        "color": "rgba(0, 0, 0, 0.5)",
        "content": {
          "type": "group",
          "content": [{
            "type": "fill",
            "style": "rgba(0, 171, 255, 1)",
            "content": {
              "type": "rect",
              "x": 10,
              "y": 10,
              "width": 200,
              "height": 100
            }
          }, {
            "type": "fill",
            "style": "rgba(255, 255, 255, 1)",
            "content": {
              "type": "text",
              "textBaseline": "middle",
              "textAlign": "center",
              "font": "200 30px Helvetica neue",
              "text": "OK",
              "x": 110,
              "y": 60
            }
          }]
        }
      }]
    }

  }
}]
`
    },
    {
      name: "Ui Detailled Button With Cursor",
      fileName: "/Users/vincent-lecrubier/Code/lidl/lidl-core/example/ok/uiDetailledButtonWithCursor",
      code: `interaction
  (simple UI):{mouse:{buttons:Number, position:{x: Number,y:Number}} in,graphics:Graphics out}
with

  interaction
    (group widget containing (a:{mouse:{buttons:Number, position:{x: Number,y:Number}} out,graphics:Graphics in}) and (b:{mouse:{buttons:Number, position:{x: Number,y:Number}} out,graphics:Graphics in})):{mouse:{buttons:Number, position:{x: Number,y:Number}} in,graphics:Graphics out}
  is
    ({
      mouse:    (both ((a).mouse) and ((b).mouse))
      graphics: (graphics containing ((a).graphics) and ((b).graphics))
    })

  interaction
    ((x:{mouse:{buttons:Number, position:{x: Number,y:Number}} out,graphics:Graphics in}).mouse):{buttons:Number, position:{x: Number,y:Number}} in
  is
    (((result of (x).mouse)!)
    with behaviour
    ((x)=({mouse:((result of (x).mouse)?)})))



  interaction
    ((x:{mouse:{buttons:Number, position:{x: Number,y:Number}} out,graphics:Graphics in}).graphics):Graphics out
  is
    (((result of (x).graphics)!)
    with behaviour
    ((x)=({graphics:((result of (x).graphics)?)})))



  interaction
    (both (a:{buttons:Number, position:{x: Number,y:Number}} out) and (b:{buttons:Number, position:{x: Number,y:Number}} out)):{buttons:Number, position:{x: Number,y:Number}} in
  is
    (
      ( (#both(a)and(b)) ?)
      with behaviour
      (all
        ( (a) = ((#both(a)and(b))!) )
        ( (b) = ((#both(a)and(b))!) )
      )
    )

  interaction
    (graphics containing (a:Graphics in) and (b:Graphics in)):Graphics out
  with
    interaction (group graphics):{{a:Graphics,b:Graphics}->Graphics}out is (function group)
  is
    (
      ((result of graphics containing (a) and (b))!)
      with behaviour
      (
        (group graphics)
        ({a:(a),b:(b)})
        =
        ((result of graphics containing (a) and (b))?)
      )
    )


  interaction
    (all (a:Activation out)  (b:Activation out)):Activation in
  with
    interaction (func all):{Activation->{a:Activation,b:Activation}} out is (function all)
  is
    (
      ((variable all (a) (b))?)
      with behaviour
      (
        apply
        (func all)
        to
        ((variable all (a) (b))!)
        and get
        ({a:(a) b:(b)})
      )
    )


  interaction
    (cursor widget):{mouse:{buttons:Number, position:{x: Number,y:Number}} in,graphics:Graphics out}
  with
    interaction (cursor):{{buttons:Number, position:{x: Number,y:Number}}->Graphics}out is (function cursor)
  is
    (
      ({
        mouse: ((the mouse for cursor widget)?)
        graphics: ((the graphics for cursor widget)!)
      })
      with behaviour
      ((cursor)((the mouse for cursor widget)!)=((the graphics for cursor widget)?))
    )





  interaction
    (button widget):{mouse:{buttons:Number, position:{x: Number,y:Number}} in,graphics:Graphics out}
  with
    interaction (button):{{layout:{x:Number,y:Number,width:Number,height:Number},text:Text,pushed:Boolean}->Graphics}out is (function button)
  is
    (
      ({
        mouse: ((the mouse for button widget)?)
        graphics: ((the graphics for button widget)!)
      })
      with behaviour
      ((button)({layout:({x:(10)y:(10)width:(200)height:(100)})text:("OK")pushed:(false)})=((the graphics for button widget)?))
    )

is
  (group widget containing (button widget) and (cursor widget) )
`,
      scenario: `[{
  "memo": {},
  "state": {},
  "args": {},
  "inter": {
    "mouse": {
      "buttons": 0,
      "position": {
        "x": 42,
        "y": 63
      },
      "wheel": {
        "x": 0,
        "y": 0,
        "z": 0
      }
    },
    "graphics": {
      "type": "group",
      "content": [{
        "type": "shadow",
        "blur": 20,
        "offset": {
          "x": 0,
          "y": 4
        },
        "color": "rgba(0, 0, 0, 0.5)",
        "content": {
          "type": "group",
          "content": [{
            "type": "fill",
            "style": "rgba(0, 171, 255, 1)",
            "content": {
              "type": "rect",
              "x": 10,
              "y": 10,
              "width": 200,
              "height": 100
            }
          }, {
            "type": "fill",
            "style": "rgba(255, 255, 255, 1)",
            "content": {
              "type": "text",
              "textBaseline": "middle",
              "textAlign": "center",
              "font": "200 30px Helvetica neue",
              "text": "OK",
              "x": 110,
              "y": 60
            }
          }]
        }
      }, {
        "type": "shadow",
        "blur": 20,
        "offset": {
          "x": 0,
          "y": 4
        },
        "color": "rgba(0, 0, 0, 0.5)",
        "content": {
          "type": "translate",
          "x": 42,
          "y": 63,
          "content": {
            "type": "scale",
            "width": 1,
            "height": 1,
            "content": {
              "type": "fill",
              "style": "rgba(200, 0, 200, 1)",
              "content": {
                "type": "path",
                "content": [{
                  "type": "begin"
                }, {
                  "type": "move",
                  "x": 0,
                  "y": 0
                }, {
                  "type": "line",
                  "x": 0,
                  "y": 15
                }, {
                  "type": "line",
                  "x": 10.6,
                  "y": 10.6
                }, {
                  "type": "close"
                }]
              }
            }
          }
        }
      }]
    }

  }
}]
`
    },
    {
      name: "Ui Layout Button Click",
      fileName: "/Users/vincent-lecrubier/Code/lidl/lidl-core/example/ok/uiLayoutButtonClick",
      code: `interaction
  (simple UI):{mouse:{buttons:Number, position:{x: Number,y:Number}} in,layout:{x:Number,y:Number,width:Number,height:Number} in, graphics:Graphics out}
with

  interaction
    (two layers containing (a:{mouse:{buttons:Number, position:{x: Number,y:Number}} out,layout:{x:Number,y:Number,width:Number,height:Number} out, graphics:Graphics in}) and (b:{mouse:{buttons:Number, position:{x: Number,y:Number}} out,layout:{x:Number,y:Number,width:Number,height:Number} out, graphics:Graphics in})):{mouse:{buttons:Number, position:{x: Number,y:Number}} in,layout:{x:Number,y:Number,width:Number,height:Number} in, graphics:Graphics out}
  is
    ({
      mouse:    (both ((a).mouse) and ((b).mouse))
      layout:   (both2 ((a).layout) and ((b).layout))
      graphics: (graphics containing ((a).graphics) and ((b).graphics))
    })


  interaction
    (split column containing (a:{mouse:{buttons:Number, position:{x: Number,y:Number}} out,layout:{x:Number,y:Number,width:Number,height:Number} out, graphics:Graphics in}) and (b:{mouse:{buttons:Number, position:{x: Number,y:Number}} out,layout:{x:Number,y:Number,width:Number,height:Number} out, graphics:Graphics in})):{mouse:{buttons:Number, position:{x: Number,y:Number}} in,layout:{x:Number,y:Number,width:Number,height:Number} in, graphics:Graphics out}
  with
    interaction (columnElement):{{interval:{start:Number,end:Number},rect:{x:Number,y:Number,width:Number,height:Number}}->{x:Number,y:Number,width:Number,height:Number}} out is (function columnElement)
  is
    (
      ({
        mouse:    (both ((a).mouse) and ((b).mouse))
        layout:   ((the layout of split column containing (a) and (b))?)
        graphics: (graphics containing ((a).graphics) and ((b).graphics))
      })
      with behaviour
      (all
        ((columnElement)({interval:({start:(0)end:(0.5)})rect:((the layout of split column containing (a) and (b))!)})=((a).layout))
        ((columnElement)({interval:({start:(0.5)end:(1)})rect:((the layout of split column containing (a) and (b))!)})=((b).layout))
      )
    )


  interaction
    ((x:{mouse:{buttons:Number, position:{x: Number,y:Number}} out,layout:{x:Number,y:Number,width:Number,height:Number} out, graphics:Graphics in}).mouse):{buttons:Number, position:{x: Number,y:Number}} in
  is
    (((result of (x).mouse)!)
    with behaviour
    ((x)=({mouse:((result of (x).mouse)?)})))



  interaction
    ((x:{mouse:{buttons:Number, position:{x: Number,y:Number}} out,layout:{x:Number,y:Number,width:Number,height:Number} out, graphics:Graphics in}).graphics):Graphics out
  is
    (((result of (x).graphics)!)
    with behaviour
    ((x)=({graphics:((result of (x).graphics)?)})))

  interaction
    ((x:{mouse:{buttons:Number, position:{x: Number,y:Number}} out,layout:{x:Number,y:Number,width:Number,height:Number} out, graphics:Graphics in}).layout):{x:Number,y:Number,width:Number,height:Number} in
  is
    (((result of (x).layout)!)
    with behaviour
    ((x)=({layout:((result of (x).layout)?)})))



  interaction
    (both (a:{buttons:Number, position:{x: Number,y:Number}} out) and (b:{buttons:Number, position:{x: Number,y:Number}} out)):{buttons:Number, position:{x: Number,y:Number}} in
  is
    (
      ( (#both(a)and(b)) ?)
      with behaviour
      (all
        ( (a) = ((#both(a)and(b))!) )
        ( (b) = ((#both(a)and(b))!) )
      )
    )

  interaction
    (both2 (a:{x:Number,y:Number,width:Number,height:Number} out) and (b:{x:Number,y:Number,width:Number,height:Number} out)):{x:Number,y:Number,width:Number,height:Number} in
  is
    (
      ( (#both2(a)and(b)) ?)
      with behaviour
      (all
        ( (a) = ((#both2(a)and(b))!) )
        ( (b) = ((#both2(a)and(b))!) )
      )
    )

  interaction
    (graphics containing (a:Graphics in) and (b:Graphics in)):Graphics out
  with
    interaction (group graphics):{{a:Graphics,b:Graphics}->Graphics}out is (function group)
  is
    (
      ((result of graphics containing (a) and (b))!)
      with behaviour
      (
        (group graphics)
        ({a:(a),b:(b)})
        =
        ((result of graphics containing (a) and (b))?)
      )
    )


  interaction
    (all (a:Activation out)  (b:Activation out)):Activation in
  with
    interaction (func all):{Activation->{a:Activation,b:Activation}} out is (function all)
  is
    (
      ((variable all (a) (b))?)
      with behaviour
      (
        apply
        (func all)
        to
        ((variable all (a) (b))!)
        and get
        ({a:(a) b:(b)})
      )
    )


  interaction
    (cursor widget):{mouse:{buttons:Number, position:{x: Number,y:Number}} in,layout:{x:Number,y:Number,width:Number,height:Number} in, graphics:Graphics out}
  with
    interaction (cursor):{{buttons:Number, position:{x: Number,y:Number}}->Graphics}out is (function cursor)
  is
    (
      ({
        mouse: ((the mouse for cursor widget)?)
        graphics: ((the graphics for cursor widget)!)
      })
      with behaviour
      ((cursor)((the mouse for cursor widget)!)=((the graphics for cursor widget)?))
    )


  interaction
    ((a:Number in)==(b:Number in)):Boolean out
  with
    interaction (is equal):{{a:Number,b:Number}->Boolean}out is (function isEqual)
  is
    (
      ((result of (a)==(b))!)
      with behaviour
      (apply (is equal) to ({a:(a),b:(b)}) and get ( (result of (a)==(b))?) )
    )


  interaction
    ((a:Boolean in)and(b:Boolean in)):Boolean out
  with
    interaction (boolean and):{{a:Boolean,b:Boolean}->Boolean} out is (function boolAnd)
  is
    (
      ((result of (a)and(b))!)
      with behaviour
      (apply (boolean and) to ({a:(a),b:(b)}) and get ( (result of (a)and(b))?) )
    )

  interaction
    (add margin of (m:Number in) to (a:{x:Number,y:Number,width:Number,height:Number} in)):{x:Number,y:Number,width:Number,height:Number} out
  with
    interaction (inset):{{rect:{x:Number,y:Number,width:Number,height:Number},margin:Number}->{x:Number,y:Number,width:Number,height:Number}} out is (function inset)
  is
    (
      (((a)with added margin(m))!)
      with behaviour
      ((inset)({rect:(a)margin:(m)})=(((a)with added margin(m))?))
    )

  interaction
    ((thePoint:{x:Number,y:Number}in) is inside (theRectangle:{x:Number,y:Number,width:Number,height:Number}in)):Boolean out
  with
    interaction (func is inside): {{point:{x: Number,y:Number},rect:{x:Number,y:Number,width:Number,height:Number}}->Boolean} out is (function isInside)
  is
    (
      ((the result of (thePoint) is inside (theRectangle))!)
      with behaviour
      ((func is inside)({point:(thePoint),rect:(theRectangle)})=((the result of (thePoint) is inside (theRectangle))?))
    )


  interaction
    (button widget):{mouse:{buttons:Number, position:{x: Number,y:Number}} in,layout:{x:Number,y:Number,width:Number,height:Number} in, graphics:Graphics out}
  with
    interaction (button graphics function):{{layout:{x:Number,y:Number,width:Number,height:Number},text:Text,pushed:Boolean}->Graphics}out is (function button)
  is
    (
      ({
        mouse: ({buttons:((the buttons of the mouse)?),position:((the position of the mouse)?)})
        layout:((the layout for button widget)?)
        graphics: ((the graphics for button widget)!)
      })
      with behaviour
      (
        (button graphics function)
        ({
          layout:(add margin of (20) to ((the layout for button widget)!))
          text:("OK")
          pushed:((((the buttons of the mouse)!)==(1)) and (((the position of the mouse)!) is inside ((the layout for button widget)!)))
        })
        =
        ((the graphics for button widget)?)
      )
    )

  interaction
    (label widget):{mouse:{buttons:Number, position:{x: Number,y:Number}} in,layout:{x:Number,y:Number,width:Number,height:Number} in, graphics:Graphics out}
  with
    interaction (label graphics function):{{layout:{x:Number,y:Number,width:Number,height:Number},text:Text,pushed:Boolean}->Graphics}out is (function label)
  is
    (
      ({
        layout:((the layout for label widget)?)
        graphics: ((the graphics for label widget)!)
      })
      with behaviour
      (
        (label graphics function)
        ({
          layout:((the layout for label widget)!)
          text:("Label text")
        })
        =
        ((the graphics for label widget)?)
      )
    )



is
  (two layers containing
    (split column containing
      (button widget) and
      (label widget)) and
    (cursor widget)
  )
`,
      scenario: `[{
  "memo": {},
  "state": {},
  "args": {},
  "inter": {
    "layout": {
      "x": 0,
      "y": 0,
      "width": 1024,
      "height": 768
    },
    "mouse": {
      "buttons": 0,
      "position": {
        "x": 42,
        "y": 63
      },
      "wheel": {
        "x": 0,
        "y": 0,
        "z": 0
      }
    },
    "graphics": {
      "type": "group",
      "content": [{
        "type": "group",
        "content": [{
          "type": "shadow",
          "blur": 20,
          "offset": {
            "x": 0,
            "y": 4
          },
          "color": "rgba(0, 0, 0, 0.5)",
          "content": {
            "type": "group",
            "content": [{
              "type": "fill",
              "style": "rgba(0, 171, 255, 1)",
              "content": {
                "type": "rect",
                "x": 20,
                "y": 20,
                "width": 984,
                "height": 344
              }
            }, {
              "type": "fill",
              "style": "rgba(255, 255, 255, 1)",
              "content": {
                "type": "text",
                "textBaseline": "middle",
                "textAlign": "center",
                "font": "200 30px Helvetica neue",
                "text": "OK",
                "x": 512,
                "y": 192
              }
            }]
          }
        }, {
          "type": "fill",
          "style": "rgba(56, 56, 56, 1)",
          "content": {
            "type": "text",
            "textBaseline": "middle",
            "textAlign": "center",
            "font": "200 30px Helvetica neue",
            "text": "Labeltext",
            "x": 512,
            "y": 576
          }
        }]
      }, {
        "type": "shadow",
        "blur": 20,
        "offset": {
          "x": 0,
          "y": 4
        },
        "color": "rgba(0, 0, 0, 0.5)",
        "content": {
          "type": "translate",
          "x": 42,
          "y": 63,
          "content": {
            "type": "scale",
            "width": 1,
            "height": 1,
            "content": {
              "type": "fill",
              "style": "rgba(200, 0, 200, 1)",
              "content": {
                "type": "path",
                "content": [{
                  "type": "begin"
                }, {
                  "type": "move",
                  "x": 0,
                  "y": 0
                }, {
                  "type": "line",
                  "x": 0,
                  "y": 15
                }, {
                  "type": "line",
                  "x": 10.6,
                  "y": 10.6
                }, {
                  "type": "close"
                }]
              }
            }
          }
        }
      }]
    }
  }
}]
`
    },
    {
      name: "Arguments",
      fileName: "/Users/vincent-lecrubier/Code/lidl/lidl-core/example/ok/arguments",
      code: `interaction
  (bob(a:Number in)):Number out
is
  (a)
`,
      scenario: `[
  {
    "args":  {"a":28},
    "inter":  28
  },
  {
    "args":  {"a":2},
    "inter":  2
  },
  {
    "args":  {"a":3},
    "inter":  3
  },
  {
    "args":  {"a":6},
    "inter":  6
  }
]
`
    },
    {
      name: "Resolver",
      fileName: "/Users/vincent-lecrubier/Code/lidl/lidl-core/example/ok/resolver",
      code: `interaction
  (bob):{theNumber:Number in,theOther:Number in, theResult:Number out, theLast:Number out}
is
  ({
    theNumber:((x)?)
    theOther:((x)?)
    theResult:((x)!)
    theLast:((x)!)
  })
`,
      scenario: `[
  {
    "args":  {},
    "inter":  { "theNumber": 50, "theOther":null, "theResult": 50, "theLast": 50 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 78,  "theOther":null,"theResult": 78 , "theLast": 78}
  },
  {
    "args":  {},
    "inter":  { "theNumber": null, "theOther":null, "theResult": null, "theLast": null }
  },
  {
    "args":  {},
    "inter":  { "theNumber": null, "theOther":42, "theResult": 42, "theLast": 42 }
  },
  {
    "args":  {},
    "inter":  { "theNumber": 67, "theOther":null, "theResult": 67, "theLast": 67 }
  }
]
`
    }
  ]
};
// ../lidl-core/src/tokenizer.ts
function tok(node, type) {
  return { start: node.source.startIdx, end: node.source.endIdx, type };
}
var OPERATOR_KEYWORDS = new Set([
  "function",
  "variable",
  "behaviour",
  "previous",
  "next",
  "active",
  "inactive",
  "apply"
]);
var OPERATOR_CONSTANTS = new Set(["true", "false"]);
function subTokenizeOperatorText(baseOffset, text) {
  const tokens = [];
  const re = /([A-Z][a-zA-Z0-9]*)|([a-z][a-zA-Z0-9]*)|(-?\d+(?:\.\d+)?)|("(?:[^"\\]|\\.)*")|([!?=]|#|→|->)/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const start = baseOffset + m.index;
    const end2 = start + m[0].length;
    if (m[1]) {
      tokens.push({ start, end: end2, type: "type" });
    } else if (m[2]) {
      if (OPERATOR_KEYWORDS.has(m[2]))
        tokens.push({ start, end: end2, type: "keyword" });
      else if (OPERATOR_CONSTANTS.has(m[2]))
        tokens.push({ start, end: end2, type: "number" });
    } else if (m[3]) {
      tokens.push({ start, end: end2, type: "number" });
    } else if (m[4]) {
      tokens.push({ start, end: end2, type: "string" });
    } else if (m[5]) {
      tokens.push({ start, end: end2, type: "operator" });
    }
  }
  return tokens;
}
var tokenSemantics = grammar3.createSemantics();
tokenSemantics.addOperation("tokenize", {
  _nonterminal(...children) {
    return children.flatMap((c) => c.tokenize());
  },
  _terminal() {
    return [];
  },
  _iter(...children) {
    return children.flatMap((c) => c.tokenize());
  },
  InteractionDefinition(_kw, sig, withClause, _is, interaction) {
    return [
      tok(_kw, "structKeyword"),
      ...sig.tokenize(),
      ...withClause.children.flatMap((c) => c.tokenize()),
      tok(_is, "structKeyword"),
      ...interaction.tokenize()
    ];
  },
  WithClause(_with, contents) {
    return [
      tok(_with, "structKeyword"),
      ...contents.children.flatMap((c) => c.tokenize())
    ];
  },
  InteractionSignatureElement_operand(_open, name, _colon, iface, _close) {
    return [tok(name, "parameter"), ...iface.tokenize()];
  },
  InterfaceDefinition(_kw, name, withClause, _is, iface) {
    return [
      tok(_kw, "structKeyword"),
      tok(name, "type"),
      ...withClause.children.flatMap((c) => c.tokenize()),
      tok(_is, "structKeyword"),
      ...iface.tokenize()
    ];
  },
  InterfaceCompositeElement(key, _colon, value) {
    return [tok(key, "property"), ...value.tokenize()];
  },
  InterfaceNamed(name) {
    return [tok(name, "type")];
  },
  direction(_28) {
    return [tok(this, "direction")];
  },
  interfaceOperator(_28) {
    return [tok(this, "keyword")];
  },
  DataDefinition(_kw, name, withClause, _is, data) {
    return [
      tok(_kw, "structKeyword"),
      tok(name, "type"),
      ...withClause.children.flatMap((c) => c.tokenize()),
      tok(_is, "structKeyword"),
      ...data.tokenize()
    ];
  },
  DataAtomic(name) {
    return [tok(name, "type")];
  },
  DataCompositeElement(key, _colon, value) {
    return [tok(key, "property"), ...value.tokenize()];
  },
  DataFunction(_open, domain, _arrow, codomain, _close) {
    return [
      ...domain.tokenize(),
      tok(_arrow, "operator"),
      ...codomain.tokenize()
    ];
  },
  DataOperation(op, _open, list, _close) {
    return [tok(op, "keyword"), ...list.tokenize()];
  },
  dataOperator(_28) {
    return [tok(this, "keyword")];
  },
  arrow(_28) {
    return [tok(this, "operator")];
  },
  InteractionElement_operator(chars) {
    return subTokenizeOperatorText(chars.source.startIdx, chars.sourceString);
  },
  interfaceIdentifier(_first, _rest) {
    return [tok(this, "type")];
  },
  dataIdentifier(_first, _rest) {
    return [tok(this, "type")];
  },
  keyIdentifier(_first, _rest) {
    return [tok(this, "property")];
  }
});
// ../lidl-core/src/formatter.ts
var INDENT = "  ";
function indent(depth) {
  return INDENT.repeat(depth);
}
var formatSemantics = grammar3.createSemantics();
formatSemantics.addOperation("fmt(depth)", {
  Start(contents) {
    return contents.children.map((c) => c.fmt(0)).join(`

`) + `
`;
  },
  Content(alt) {
    return alt.fmt(this.args.depth);
  },
  InteractionDefinition(_kw, sig, withClause, _is, interaction) {
    const depth = this.args.depth;
    const base = indent(depth);
    const sigStr = sig.fmt(depth);
    const withStr = withClause.children.length > 0 ? `
` + withClause.children[0].fmt(depth) : "";
    const interStr = interaction.fmt(depth + 1);
    return `${base}interaction ${sigStr}${withStr}
${base}is
${indent(depth + 1)}${interStr}`;
  },
  WithClause(_with, contents) {
    const depth = this.args.depth;
    const base = indent(depth);
    const defs = contents.children.map((c) => c.fmt(depth + 1)).join(`
`);
    return `${base}with
${defs}`;
  },
  InteractionSignature(_open, elements, _close, _colon, iface) {
    const depth = this.args.depth;
    const parts = elements.children.map((c) => c.fmt(depth));
    return `(${parts.join("")}):${iface.fmt(depth)}`;
  },
  InteractionSignatureElement_operator(chars) {
    return chars.sourceString.replace(/\s+/g, " ").trim();
  },
  InteractionSignatureElement_operand(_open, name, _colon, iface, _close) {
    const depth = this.args.depth;
    return `(${name.sourceString}:${iface.fmt(depth)})`;
  },
  sigOperatorChars(_chars) {
    return this.sourceString;
  },
  Interaction(_open, elements, _close) {
    const depth = this.args.depth;
    const elems = elements.children.map((c) => c.fmt(depth));
    const normalized = elems.map((e) => e.type === "operator" ? { ...e, text: e.text.replace(/\s+/g, " ").trim() } : e);
    const singleLine = `(${normalized.map((e) => e.text).join("")})`;
    if (singleLine.length <= 80) {
      return singleLine;
    }
    const base = indent(depth);
    const inner = indent(depth + 1);
    const lines = [];
    for (const e of normalized) {
      if (e.type === "operator") {
        lines.push(`${inner}${e.text}`);
      } else {
        lines.push(`${inner}${e.text}`);
      }
    }
    return `(
${lines.join(`
`)}
${base})`;
  },
  InteractionElement_operand(interaction) {
    return { type: "operand", text: interaction.fmt(this.args.depth) };
  },
  InteractionElement_operator(chars) {
    return { type: "operator", text: chars.sourceString };
  },
  interactionOperatorChars(_chars) {
    return this.sourceString;
  },
  InterfaceDefinition(_kw, name, withClause, _is, iface) {
    const depth = this.args.depth;
    const base = indent(depth);
    const withStr = withClause.children.length > 0 ? `
` + withClause.children[0].fmt(depth) : "";
    return `${base}interface ${name.sourceString}${withStr}
${base}is
${indent(depth + 1)}${iface.fmt(depth + 1)}`;
  },
  Interface(alt) {
    return alt.fmt(this.args.depth);
  },
  InterfaceAtomic(data, dir) {
    return `${data.fmt(this.args.depth)} ${dir.sourceString}`;
  },
  InterfaceComposite(_open, list, _close) {
    const depth = this.args.depth;
    const items = list.asIteration().children.map((c) => c.fmt(depth));
    const singleLine = `{${items.join(", ")}}`;
    if (singleLine.length <= 80) {
      return singleLine;
    }
    const base = indent(depth);
    const parts = items.map((e) => `${indent(depth + 1)}${e}`);
    return `{
${parts.join(`,
`)}
${base}}`;
  },
  InterfaceCompositeElement(key, _colon, value) {
    return `${key.sourceString}:${value.fmt(this.args.depth)}`;
  },
  InterfaceOperation(op, _open, list, _close) {
    const depth = this.args.depth;
    const items = list.asIteration().children.map((c) => c.fmt(depth));
    return `${op.sourceString}(${items.join(", ")})`;
  },
  interfaceOperator(_28) {
    return this.sourceString;
  },
  InterfaceNamed(name) {
    return name.sourceString;
  },
  direction(_28) {
    return this.sourceString;
  },
  DataDefinition(_kw, name, withClause, _is, data) {
    const depth = this.args.depth;
    const base = indent(depth);
    const withStr = withClause.children.length > 0 ? `
` + withClause.children[0].fmt(depth) : "";
    return `${base}data ${name.sourceString}${withStr}
${base}is
${indent(depth + 1)}${data.fmt(depth + 1)}`;
  },
  Data(alt) {
    return alt.fmt(this.args.depth);
  },
  DataAtomic(name) {
    return name.sourceString;
  },
  DataComposite(_open, list, _close) {
    const depth = this.args.depth;
    const items = list.asIteration().children.map((c) => c.fmt(depth));
    const singleLine = `{${items.join(", ")}}`;
    if (singleLine.length <= 80) {
      return singleLine;
    }
    const base = indent(depth);
    const parts = items.map((e) => `${indent(depth + 1)}${e}`);
    return `{
${parts.join(`,
`)}
${base}}`;
  },
  DataCompositeElement(key, _colon, value) {
    return `${key.sourceString}:${value.fmt(this.args.depth)}`;
  },
  DataArray(_open, data, _close) {
    return `[${data.fmt(this.args.depth)}]`;
  },
  DataFunction(_open, domain, _arrow, codomain, _close) {
    return `{${domain.fmt(this.args.depth)} -> ${codomain.fmt(this.args.depth)}}`;
  },
  DataOperation(op, _open, list, _close) {
    const depth = this.args.depth;
    const items = list.asIteration().children.map((c) => c.fmt(depth));
    return `${op.sourceString}(${items.join(", ")})`;
  },
  dataOperator(_28) {
    return this.sourceString;
  },
  arrow(_28) {
    return this.sourceString;
  },
  interfaceIdentifier(_first, _rest) {
    return this.sourceString;
  },
  dataIdentifier(_first, _rest) {
    return this.sourceString;
  },
  variableIdentifier(_first, _rest) {
    return this.sourceString;
  },
  keyIdentifier(_first, _rest) {
    return this.sourceString;
  },
  NonemptyListOf(first, _sep, rest) {
    return [
      first.fmt(this.args.depth),
      ...rest.children.map((c) => c.fmt(this.args.depth))
    ];
  },
  EmptyListOf() {
    return [];
  },
  _terminal() {
    return this.sourceString;
  },
  _iter(...children) {
    return children.map((c) => c.fmt(this.args.depth));
  }
});
function format(source) {
  const match = grammar3.match(source, "Start");
  if (match.failed()) {
    throw new Error(`Parse error: ${match.message || "Invalid LIDL"}`);
  }
  return formatSemantics(match).fmt(0);
}
// src/server.ts
var graphCompilerCompile = exports_graphCompiler.compile;
var connection = import_node.createConnection(import_node.ProposedFeatures.all);
var documents = new import_node.TextDocuments(TextDocument);
var KEYWORDS = [
  "interaction",
  "interface",
  "data",
  "is",
  "with",
  "in",
  "out",
  "ref"
];
var INTERFACE_OPERATORS = [
  "conjugation",
  "globalisation",
  "localisation",
  "reception",
  "emission",
  "union",
  "intersection",
  "complement"
];
var DATA_OPERATORS = ["union", "intersection", "complement"];
connection.onInitialize((_params) => {
  return {
    capabilities: {
      textDocumentSync: import_node.TextDocumentSyncKind.Full,
      completionProvider: {
        triggerCharacters: ["(", "{", ":", " "]
      },
      hoverProvider: true,
      documentSymbolProvider: true,
      documentFormattingProvider: true,
      definitionProvider: true
    }
  };
});
var parsedCache = new Map;
function validateDocument(doc) {
  const text = doc.getText();
  const diagnostics = [];
  let ast = null;
  try {
    ast = parser_default.parse(text);
  } catch (e) {
    const loc = e.location;
    const startLine = loc?.start?.line ?? 0;
    const startCol = loc?.start?.column ?? 0;
    diagnostics.push({
      severity: import_node.DiagnosticSeverity.Error,
      range: {
        start: { line: Math.max(0, startLine - 1), character: startCol },
        end: { line: Math.max(0, startLine - 1), character: startCol + 1 }
      },
      message: e.message,
      source: "lidl"
    });
  }
  if (ast) {
    try {
      const compileErrors = [];
      graphCompilerCompile(ast[0], examples_default.header, {
        error: (_g, data) => {
          compileErrors.push(data?.error?.message || "Compilation error");
          return true;
        },
        getJsCode: () => true
      });
      for (const msg of compileErrors) {
        diagnostics.push({
          severity: import_node.DiagnosticSeverity.Warning,
          range: {
            start: { line: 0, character: 0 },
            end: { line: 0, character: 1 }
          },
          message: msg,
          source: "lidl"
        });
      }
    } catch (e) {
      diagnostics.push({
        severity: import_node.DiagnosticSeverity.Warning,
        range: {
          start: { line: 0, character: 0 },
          end: { line: 0, character: 1 }
        },
        message: `Compilation: ${e.message}`,
        source: "lidl"
      });
    }
  }
  parsedCache.set(doc.uri, { ast, errors: diagnostics });
  connection.sendDiagnostics({ uri: doc.uri, diagnostics });
}
documents.onDidChangeContent((change) => {
  validateDocument(change.document);
});
connection.onCompletion((_params) => {
  const doc = documents.get(_params.textDocument.uri);
  if (!doc)
    return [];
  const cached = parsedCache.get(_params.textDocument.uri);
  const items = [];
  for (const kw of KEYWORDS) {
    items.push({
      label: kw,
      kind: import_node.CompletionItemKind.Keyword
    });
  }
  for (const op of INTERFACE_OPERATORS) {
    items.push({
      label: op,
      kind: import_node.CompletionItemKind.Function,
      detail: "Interface operator"
    });
  }
  for (const op of DATA_OPERATORS) {
    items.push({
      label: op,
      kind: import_node.CompletionItemKind.Function,
      detail: "Data operator"
    });
  }
  if (cached?.ast) {
    for (const def of cached.ast) {
      if (def.type === "InteractionDefinition" && def.signature) {
        items.push({
          label: def.signature.operator,
          kind: import_node.CompletionItemKind.Function,
          detail: "Interaction"
        });
      } else if (def.type === "InterfaceDefinition" && def.signature) {
        items.push({
          label: def.signature,
          kind: import_node.CompletionItemKind.Interface,
          detail: "Interface"
        });
      } else if (def.type === "DataDefinition" && def.signature) {
        items.push({
          label: def.signature,
          kind: import_node.CompletionItemKind.Struct,
          detail: "Data type"
        });
      }
    }
  }
  return items;
});
connection.onHover((params) => {
  const doc = documents.get(params.textDocument.uri);
  if (!doc)
    return null;
  const cached = parsedCache.get(params.textDocument.uri);
  if (!cached?.ast)
    return null;
  const offset = doc.offsetAt(params.position);
  const found = findNodeAtOffset(cached.ast, offset);
  if (!found)
    return null;
  let content = "";
  switch (found.type) {
    case "InteractionDefinition":
      content = `**interaction** \`${found.signature?.operator || "?"}\``;
      if (found.signature?.interfac) {
        content += `

Interface: \`${describeInterface(found.signature.interfac)}\``;
      }
      break;
    case "InterfaceDefinition":
      content = `**interface** \`${found.signature || "?"}\``;
      break;
    case "DataDefinition":
      content = `**data** \`${found.signature || "?"}\``;
      break;
    case "InterfaceAtomic":
      content = `\`${describeData(found.data)} ${found.direction}\``;
      break;
    case "InterfaceNamed":
      content = `**interface** \`${found.name}\``;
      break;
    case "DataAtomic":
      content = `**data** \`${found.name}\``;
      break;
    default:
      return null;
  }
  return { contents: { kind: "markdown", value: content } };
});
connection.onDocumentSymbol((params) => {
  const doc = documents.get(params.textDocument.uri);
  if (!doc)
    return [];
  const cached = parsedCache.get(params.textDocument.uri);
  if (!cached?.ast)
    return [];
  const symbols = [];
  function collectSymbols(defs, uri) {
    for (const def of defs) {
      const meta = def.meta?.location;
      if (!meta)
        continue;
      const startPos = doc.positionAt(meta.start.offset);
      const endPos = doc.positionAt(meta.end.offset);
      const range = import_node.Range.create(startPos, endPos);
      if (def.type === "InteractionDefinition") {
        symbols.push({
          name: `interaction (${def.signature?.operator || "?"})`,
          kind: import_node.SymbolKind.Function,
          location: import_node.Location.create(uri, range)
        });
        if (def.definitions)
          collectSymbols(def.definitions, uri);
      } else if (def.type === "InterfaceDefinition") {
        symbols.push({
          name: `interface ${def.signature || "?"}`,
          kind: import_node.SymbolKind.Interface,
          location: import_node.Location.create(uri, range)
        });
      } else if (def.type === "DataDefinition") {
        symbols.push({
          name: `data ${def.signature || "?"}`,
          kind: import_node.SymbolKind.Struct,
          location: import_node.Location.create(uri, range)
        });
      }
    }
  }
  collectSymbols(cached.ast, params.textDocument.uri);
  return symbols;
});
connection.onDocumentFormatting((params) => {
  const doc = documents.get(params.textDocument.uri);
  if (!doc)
    return null;
  try {
    const formatted = format(doc.getText());
    const lastLine = doc.lineCount - 1;
    const lastChar = doc.getText().length;
    return [
      import_node.TextEdit.replace(import_node.Range.create(import_node.Position.create(0, 0), doc.positionAt(lastChar)), formatted)
    ];
  } catch {
    return null;
  }
});
connection.onDefinition((params) => {
  const doc = documents.get(params.textDocument.uri);
  if (!doc)
    return null;
  const cached = parsedCache.get(params.textDocument.uri);
  if (!cached?.ast)
    return null;
  const offset = doc.offsetAt(params.position);
  const word = getWordAtOffset(doc.getText(), offset);
  if (!word)
    return null;
  const def = findDefinition(cached.ast, word);
  if (!def?.meta?.location)
    return null;
  const meta = def.meta.location;
  const startPos = doc.positionAt(meta.start.offset);
  const endPos = doc.positionAt(meta.end.offset);
  return import_node.Location.create(params.textDocument.uri, import_node.Range.create(startPos, endPos));
});
function findNodeAtOffset(defs, offset) {
  for (const def of defs) {
    const meta = def.meta?.location;
    if (meta && offset >= meta.start.offset && offset <= meta.end.offset) {
      if (def.definitions) {
        const inner = findNodeAtOffset(def.definitions, offset);
        if (inner)
          return inner;
      }
      return def;
    }
  }
  return null;
}
function findDefinition(defs, name) {
  for (const def of defs) {
    if (def.type === "InteractionDefinition" && def.signature?.operator === name) {
      return def;
    }
    if (def.type === "InterfaceDefinition" && def.signature === name) {
      return def;
    }
    if (def.type === "DataDefinition" && def.signature === name) {
      return def;
    }
    if (def.definitions) {
      const found = findDefinition(def.definitions, name);
      if (found)
        return found;
    }
  }
  return null;
}
function getWordAtOffset(text, offset) {
  let start = offset;
  let end2 = offset;
  while (start > 0 && /\w/.test(text[start - 1]))
    start--;
  while (end2 < text.length && /\w/.test(text[end2]))
    end2++;
  const word = text.slice(start, end2);
  return word.length > 0 ? word : null;
}
function describeInterface(iface) {
  if (!iface)
    return "?";
  switch (iface.type) {
    case "InterfaceAtomic":
      return `${describeData(iface.data)} ${iface.direction}`;
    case "InterfaceComposite":
      return "{" + (iface.element || []).map((e) => `${e.key}: ${describeInterface(e.value)}`).join(", ") + "}";
    case "InterfaceNamed":
      return iface.name;
    case "InterfaceOperation":
      return `${iface.operator}(${(iface.operand || []).map(describeInterface).join(", ")})`;
    default:
      return "?";
  }
}
function describeData(data) {
  if (!data)
    return "?";
  switch (data.type) {
    case "DataAtomic":
      return data.name;
    case "DataComposite":
      return "{" + (data.element || []).map((e) => `${e.key}: ${describeData(e.value)}`).join(", ") + "}";
    case "DataFunction":
      return `{${describeData(data.domain)} -> ${describeData(data.codomain)}}`;
    case "DataArray":
      return `[${describeData(data.element)}]`;
    default:
      return "?";
  }
}
documents.listen(connection);
connection.listen();
