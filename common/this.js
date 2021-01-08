Function.prototype.myCall = function (context = window, ...args) {
  context.fn = this;
  let result = context.fn(...args);
  delete context.fn;
  return result;
};
Function.prototype.myApply = function (context = window, args) {
  context.fn = this;
  let result;
  if (args) {
    // 需要判断第二个参数是否为数组
    if (Array.isArray(args)) {
      result = context.fn(...args);
    } else {
      throw new Error('the second params should be an Array.');
    }
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};
Function.prototype.myBind = function (context, ...args) {
  // 因为是挂载在函数的原型对象上，所以必定是函数调用，所以这一步有点多余
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  const fn = this;
  return function F() {
    if (fn instanceof F) {
      return new F(...args, ...arguments);
    }
    return fn.apply(context, args.concat(...arguments));
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
  args.length < fn.length ?
  (...arguments) => curry(fn, ...args, ...arguments) :
  fn(...args);

function sumFn(a, b, c) {
  return a + b + c;
}
var sum = curry(sumFn);
// sum(1, 2, 3); //6
// sum(1, 2)(3); //6
// sum(1)(2)(3); //6