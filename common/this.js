Function.prototype.myCall = function(context = window) {
  context.fn = this;
  let args = [...arguments].slice(1);
  let result = context.fn(...args);
  delete context.fn;
  return result;
};
Function.prototype.myApply = function(context = window) {
  context.fn = this;
  let result;
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};
Function.prototype.myBind = function(context) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  var that = this;
  var args = [...arguments].splice(1);
  return function F() {
    if (this instanceof F) {
      return new that(...args, ...arguments);
    }
    return that.apply(context, args.concat(...arguments));
  };
};

function myNew() {
  let target = {}; //创建的新对象
  let [constructor, ...args] = [...arguments]; //第一个参数是构造函数
  target.__proto__ = constructor.prototype; //设置原型链
  let result = constructor.apply(target, args); //执行构造函数
  if (result && (typeof result == "object" || typeof result == "function")) {
    return result; //如果构造函数返回一个对象，那么就返回这个对象
  }
  return target;
}

const deepClone = origin => {
  if (origin === null) return null;
  let target = origin.push ? [] : {};
  for (let prop in origin) {
    if (origin.hasOwnProperty(prop)) {
      if (typeof origin[prop] === "object") {
        target[prop] = deepClone(origin[prop]);
      } else {
        target[prop] = origin[prop];
      }
    }
  }
  return target;
};

const curry = (fn, ...args) =>
  args.length < fn.length
    ? (...arguments) => curry(fn, ...args, ...arguments)
    : fn(...args);
function sumFn(a, b, c) {
  return a + b + c;
}
var sum = curry(sumFn);
// sum(1, 2, 3); //6
// sum(1, 2)(3); //6
// sum(1)(2)(3); //6
