import {
  require_react
} from "./chunk-65KY755N.js";
import {
  __toESM
} from "./chunk-V4OQ3NZ2.js";

// node_modules/react-uid/dist/es2015/Control.js
var React4 = __toESM(require_react());
var import_react2 = __toESM(require_react());

// node_modules/react-uid/dist/es2015/UIDComponent.js
var React2 = __toESM(require_react());

// node_modules/react-uid/dist/es2015/context.js
var React = __toESM(require_react());

// node_modules/react-uid/dist/es2015/uid.js
var generateUID = function() {
  var counter2 = 1;
  var map = /* @__PURE__ */ new WeakMap();
  var uid2 = function(item, index) {
    if (typeof item === "number" || typeof item === "string") {
      return index ? "idx-".concat(index) : "val-".concat(item);
    }
    if (!map.has(item)) {
      map.set(item, counter2++);
      return uid2(item);
    }
    return "uid" + map.get(item);
  };
  return uid2;
};
var uid = generateUID();

// node_modules/react-uid/dist/es2015/context.js
var createSource = function(prefix) {
  if (prefix === void 0) {
    prefix = "";
  }
  return {
    value: 1,
    prefix,
    uid: generateUID()
  };
};
var counter = createSource();
var source = React.createContext(createSource());
var getId = function(source2) {
  return source2.value++;
};
var getPrefix = function(source2) {
  return source2 ? source2.prefix : "";
};

// node_modules/react-uid/dist/es2015/UIDComponent.js
var __extends = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var prefixId = function(id, prefix, name) {
  var uid2 = prefix + id;
  return String(name ? name(uid2) : uid2);
};
var UID = (
  /** @class */
  function(_super) {
    __extends(UID2, _super);
    function UID2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.state = {
        quartz: _this.props.idSource || counter,
        prefix: getPrefix(_this.props.idSource),
        id: getId(_this.props.idSource || counter)
      };
      _this.uid = function(item) {
        return prefixId(_this.state.id + "-" + _this.state.quartz.uid(item), _this.state.prefix, _this.props.name);
      };
      return _this;
    }
    UID2.prototype.render = function() {
      var _a = this.props, children = _a.children, name = _a.name;
      var _b = this.state, id = _b.id, prefix = _b.prefix;
      return children(prefixId(id, prefix, name), this.uid);
    };
    return UID2;
  }(React2.Component)
);

// node_modules/react-uid/dist/es2015/hooks.js
var React3 = __toESM(require_react());
var import_react = __toESM(require_react());
var generateUID2 = function(context) {
  var quartz = context || counter;
  var prefix = getPrefix(quartz);
  var id = getId(quartz);
  var uid2 = prefix + id;
  var gen = function(item) {
    return uid2 + quartz.uid(item);
  };
  return { uid: uid2, gen };
};
var useUIDState = function() {
  if (true) {
    if (!("useContext" in React3)) {
      throw new Error("Hooks API requires React 16.8+");
    }
  }
  var context = (0, import_react.useContext)(source);
  var uid2 = (0, import_react.useState)(function() {
    return generateUID2(context);
  })[0];
  return uid2;
};
var useUID = function() {
  var uid2 = useUIDState().uid;
  return uid2;
};
var useUIDSeed = function() {
  var gen = useUIDState().gen;
  return gen;
};

// node_modules/react-uid/dist/es2015/Control.js
var UIDReset = function(_a) {
  var children = _a.children, _b = _a.prefix, prefix = _b === void 0 ? "" : _b;
  var valueSource = (0, import_react2.useState)(function() {
    return createSource(prefix);
  })[0];
  return React4.createElement(source.Provider, { value: valueSource }, children);
};
var UIDFork = function(_a) {
  var children = _a.children, _b = _a.prefix, prefix = _b === void 0 ? "" : _b;
  var id = useUID();
  var valueSource = (0, import_react2.useState)(function() {
    return createSource(id + "-" + prefix);
  })[0];
  return React4.createElement(source.Provider, { value: valueSource }, children);
};
var UIDConsumer = function(_a) {
  var name = _a.name, children = _a.children;
  return React4.createElement(source.Consumer, null, function(value) {
    return React4.createElement(UID, { name, idSource: value, children });
  });
};
export {
  UID,
  UIDConsumer,
  UIDFork,
  UIDReset,
  generateUID,
  uid,
  useUID,
  useUIDSeed
};
//# sourceMappingURL=react-uid.js.map
