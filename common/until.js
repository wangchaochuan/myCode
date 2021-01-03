/* 工具函数集合  王朝传  2020-02-26  */
/* 1、判断数组中的元素是否都相等 */
const allEqual = arr => arr.every(val => val === arr[0]);
/* 2、检查两个数字是否近似相等，差异值可以通过传参的形式进行设置 */
const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
    Math.abs(v1 - v2) < epsilon;
/* 3、 将没有逗号或双引号的元素转换成带有逗号分隔符的字符串即CSV格式识别的形式。 */
const arrayToCSV = (arr, delimiter = ",") =>
    arr.map(v => v.map(x => `"${x}"`).join(delimiter)).join("\n");
//arrayToCSV([['a', 'b'], ['c', 'd']]); // '"a","b"\n"c","d"'
// arrayToCSV([['a', 'b'], ['c', 'd']], ';'); // '"a";"b"\n"c";"d"'

// 4、此段代码执行一个函数，将剩余的参数传回函数当参数，返回相应的结果，并能捕获异常。
const attempt = (fn, ...args) => {
    try {
        return fn(...args);
    } catch (e) {
        return e instanceof Error ? e : new Error(e);
    }
};
var elements = attempt(function (selector) {
    return document.querySelectorAll(selector);
}, ">_>");
// if (elements instanceof Error) elements = []; // elements = []

// 5、此段代码返回两个或多个数的平均数。
const average = (...nums) =>
    nums.reduce((acc, val) => acc + val, 0) / nums.length;

// 6、此函数包含两个参数，类型都为数组，依据第二个参数的真假条件，将一个参数的数组进行分组，条件为真的放入第一个数组，其它的放入第二个数组。这里运用了Array.prototype.reduce() 和 Array.prototype.push() 相结合的形式。
const bifurcate = (arr, filter) =>
    arr.reduce((acc, val, i) => (acc[filter[i] ? 0 : 1].push(val), acc), [
        [],
        []
    ]);
bifurcate(["beep", "boop", "foo", "bar"], [true, true, false, true]);
// [ ['beep', 'boop', 'bar'], ['foo'] ]

// 7、用于检测页面是否滚动到页面底部。
const bottomVisible = () =>
    document.documentElement.clientHeight + window.scrollY >=
    (document.documentElement.scrollHeight ||
        document.documentElement.clientHeight);

// bottomVisible(); // true

// 8、此代码返回字符串的字节长度。这里用到了Blob对象，Blob（Binary Large Object）对象代表了一段二进制数据，提供了一系列操作接口。其他操作二进制数据的API（比如File对象），都是建立在Blob对象基础上的，继承了它的属性和方法。生成Blob对象有两种方法：一种是使用Blob构造函数，另一种是对现有的Blob对象使用slice方法切出一部分。
const byteSize = str => new Blob([str]).size;
// byteSize('王朝传'); // 9
// byteSize('Hello World'); // 11

// 9、将字符串的首字母转成大写,这里主要运用到了ES6的展开语法在数组中的运用。
const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join("");

// 10、将一个句子中每个单词首字母转换成大写字母，这里中要运用了正则表达式进行替换。
const capitalizeEveryWord = str =>
    str.replace(/\b[a-z]/g, char => char.toUpperCase());

// 11、将数组中移除值为 false 的内容。
const compact = arr => arr.filter(Boolean);

// 12、统计数组中某个值出现的次数
const countOccurrences = (arr, val) =>
    arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
// countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3

// 13、此代码段使用 existSync() 检查目录是否存在，然后使用 mkdirSync() 创建目录（如果不存在）。
const fs = require("fs");
const createDirIfNotExists = dir =>
    !fs.existsSync(dir) ? fs.mkdirSync(dir) : undefined;
// createDirIfNotExists('test');

// 14、返回当前访问的 URL 地址。
const currentURL = () => window.location.href;

// 15、返回当前是今年的第几天
const dayOfYear = date =>
    Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
// dayOfYear(new Date()); // 57

// 16、通过递归的形式，将多维数组展平成一维数组。  数组拍平
const deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));
// deepFlatten([1, [2], [[3], 4], 5]); // [1,2,3,4,5]

// 17、去重对象的属性，如果对象中含有重复的属性，以前面的为准。
const defaults = (obj, ...defs) => Object.assign({}, ...defs.reverse(), obj);
// defaults({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 }); // { a: 1, b: 2 }

// 18、延迟函数的调用，即异步调用函数。
const defer = (fn, ...args) => setTimeout(fn, 1, ...args);
// defer(console.log, 'a'), console.log('b'); // logs 'b' then 'a'

// 19、此段代码将标准的度数，转换成弧度。
const degreesToRads = deg => (deg * Math.PI) / 180.0;

// 20、此段代码查找两个给定数组的差异，查找出前者数组在后者数组中不存在元素。
const difference = (a, b) => {
    const s = new Set(b);
    return a.filter(x => !s.has(x));
};
//   difference([1, 2, 3], [1, 2, 4]); // [3]

// 21、通过给定的函数来处理需要对比差异的数组，查找出前者数组在后者数组中不存在元素
const differenceBy = (a, b, fn) => {
    const s = new Set(b.map(fn));
    return a.filter(x => !s.has(fn(x)));
};
// differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [1.2]
// differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], v => v.x); // [ { x: 2 } ]

// 22、此段代码按照给定函数逻辑筛选需要对比差异的数组，查找出前者数组在后者数组中不存在元素。
const differenceWith = (arr, val, comp) =>
    arr.filter(a => val.findIndex(b => comp(a, b)) === -1);
// differenceWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0], (a, b) => Math.round(a) === Math.round(b));
// [1, 1.2]

// 23、将输入的数字拆分成单个数字组成的数组。
const digitize = n => [...
    `${n}`
].map(i => parseInt(i));
// digitize(431); // [4, 3, 1]

// 24、计算两点之间的距离
const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0);
// distance(1, 1, 2, 3); // 2.23606797749979

// 25、此段代码将给定的数组从左边开始删除 n 个元素
const drop = (arr, n = 1) => arr.slice(n);

// 26、此段代码将给定的数组从右边开始删除 n 个元素
const dropRight = (arr, n = 1) => arr.slice(0, -n);

// 27、此段代码将给定的数组按照给定的函数条件从右开始删除，直到当前元素满足函数条件为True时，停止删除，并返回数组剩余元素。
const dropRightWhile = (arr, func) => {
    while (arr.length > 0 && !func(arr[arr.length - 1])) arr = arr.slice(0, -1);
    return arr;
};
// dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

// 28、按照给定的函数条件筛选数组，不满足函数条件的将从数组中移除。
const dropWhile = (arr, func) => {
    while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
    return arr;
};
// dropWhile([1, 2, 3, 4], n => n >= 3); // [3,4]

// 29、接收两个DOM元素对象参数，判断后者是否是前者的子元素。
const elementContains = (parent, child) =>
    parent !== child && parent.contains(child);
// elementContains(document.querySelector('head'), document.querySelector('title')); // true
// elementContains(document.querySelector('body'), document.querySelector('body')); // false

// 30、移除数组中重复的元素
const filterNonUnique = arr => [...new Set(arr)];

// 31、按照给定的函数条件，查找第一个满足条件对象的键值。
const findKey = (obj, fn) =>
    Object.keys(obj).find(key => fn(obj[key], key, obj)); // 'barney' // 32、按照给定的函数条件筛选数组，将最后一个满足条件的元素进行删除。

/* findKey(
  {
    barney: { age: 36, active: true },
    fred: { age: 40, active: false },
    pebbles: { age: 1, active: true }
  },
  o => o["active"]
); */
const findLast = (
    arr,
    fn
) => arr.filter(fn).pop();

// 33、按照指定数组的深度，将嵌套数组进行展平。
const flatten = (arr, depth = 1) =>
    arr.reduce(
        (a, v) =>
            a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v), []
    );

// flatten([1, [2], 3, 4]); // [1, 2, 3, 4]
// flatten([1, [2, [3, [4, 5], 6], 7], 8], 2); // [1, 2, 3, [4, 5], 6, 7, 8]

// 34、按照给定的函数条件，从数组的右边往左依次进行执行。
const forEachRight = (arr, callback) =>
    arr
        .slice(0)
        .reverse()
        .forEach(callback);

// forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'

// 35、此段代码按照给定的函数条件，进行迭代对象。
const forOwn = (obj, fn) =>
    Object.keys(obj).forEach(key => fn(obj[key], key, obj));
// forOwn({ foo: 'bar', a: 1 }, v => console.log(v)); // 'bar', 1

// 36、此段代码输出函数的名称。
const functionName = fn => (console.debug(fn.name), fn);
// functionName(Math.max); // max (logged in debug channel of console)

// 37、此段代码从Date对象里获取当前时间。
const getColonTimeFromDate = date => date.toTimeString().slice(0, 8);
// getColonTimeFromDate(new Date()); // "08:38:00"

// 38、此段代码返回两个日期之间相差多少天
const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
    (dateFinal - dateInitial) / (1000 * 3600 * 24);
// getDaysDiffBetweenDates(new Date('2019-01-13'), new Date('2019-01-15')); // 2

// 39、此代码返回DOM元素节点对应的属性值。
const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName];
// getStyle(document.querySelector('p'), 'font-size'); // '16px'

// 40、此段代码的主要功能就是返回数据的类型。
const getType = v =>
    v === undefined ?
        "undefined" :
        v === null ?
            "null" :
            v.constructor.name.toLowerCase();
// getType(new Set([1, 2, 3])); // 'set'

// 41、此段代码返回DOM元素是否包含指定的Class样式。
const hasClass = (el, className) => el.classList.contains(className);
// hasClass(document.querySelector('p.special'), 'special'); // true

// 42、此段代码隐藏指定的DOM元素。
const hide = (...el) => [...el].forEach(e => (e.style.display = "none"));
// hide(document.querySelectorAll('img')); // Hides all <img> elements on the page

// 43、此段代码的功能就是将http网址重定向https网址。
const httpsRedirect = () => {
    if (location.protocol !== "https:")
        location.replace("https://" + location.href.split("//")[1]);
};

// 44、此代码可以返回数组中某个值对应的所有索引值，如果不包含该值，则返回一个空数组。
const indexOfAll = (arr, val) =>
    arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);
// indexOfAll([1, 2, 3, 1, 2, 3], 1); // [0,3]

// 45、此段代码的功能主要是在给定的DOM节点后插入新的节点内容
const insertAfter = (el, htmlString) =>
    el.insertAdjacentHTML("afterend", htmlString);

// 46、此段代码的功能主要是在给定的DOM节点前插入新的节点内容
const insertBefore = (el, htmlString) =>
    el.insertAdjacentHTML("beforebegin", htmlString);

// 47、此段代码返回两个数组元素之间的交集。
const intersection = (a, b) => {
    const s = new Set(b);
    return a.filter(x => s.has(x));
};

// 48、按照给定的函数处理需要对比的数组元素，然后根据处理后的数组，找出交集，最后从第一个数组中将对应的元素输出。
const intersectionBy = (a, b, fn) => {
    const s = new Set(b.map(fn));
    return a.filter(x => s.has(fn(x)));
};
// intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [2.1]

// 49、此段代码用于判断数据是否为指定的数据类型，如果是则返回true。
const is = (type, val) => ![, null].includes(val) && val.constructor === type;
// is(RegExp, /./g); // true

// 50、接收两个日期类型的参数，判断前者的日期是否晚于后者的日期。
const isAfterDate = (dateA, dateB) => dateA > dateB;

// 51、用于检测两个单词是否相似。
const isAnagram = (str1, str2) => {
    const normalize = str =>
        str
            .toLowerCase()
            .replace(/[^a-z0-9]/gi, "")
            .split("")
            .sort()
            .join("");
    return normalize(str1) === normalize(str2);
};
// isAnagram('iceman', 'cinema'); // true

// 52、此段代码用于检测对象是否为类数组对象,是否可迭代。
const isArrayLike = obj =>
    obj != null && typeof obj[Symbol.iterator] === "function";
// isArrayLike(document.querySelectorAll('.className')); // true

// 53、接收两个日期类型的参数，判断前者的日期是否早于后者的日期。
const isBeforeDate = (dateA, dateB) => dateA < dateB;

// 54、对象深度克隆
const deepClone = origin => {
    if (typeof origin === null || typeof origin !== 'object') {
        return origin;
    }
    const target = Array.isArray(origin) ? [] : {};
    target.__proto__ = origin.__proto__;
    for (const prop in origin) {
        if (origin.hasOwnProperty(prop)) {
            target[prop] = typeof origin[prop] === 'object' ? deepClone(origin[prop]) : origin[prop];
        }
    }
    return target;
}

// 55、格式化金钱
const ThousandNum = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// const money = ThousandNum(20190214);// money => "20,190,214"

// 56、生成随机ID
const RandomId = len =>
    Math.random()
        .toString(36)
        .substr(3, len);
// const id = RandomId(10);// id => "jg7zpgiqva"

// 57、生成随机HEX色值
const RandomColor = () =>
    "#" +
    Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padEnd(6, "0");
// const color = RandomColor();// color => "#f03665"

// 58、生成星级评分
const StartScore = rate => "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);
// const start = StartScore(3);// start => "★★★"

// 59、操作URL查询参数
const params = new URLSearchParams(location.search.replace(/\?/gi, "")); // location.search = "?name=young&sex=male"
// params.has("young"); // true  params.get("sex"); // "male"

// 60、取整  代替正数的Math.floor()，代替负数的Math.ceil()
const num1 = ~~1.69;
const num2 = 1.69 | 0;
const num3 = 1.69 >> 0;
// num1 num2 num3 => 1 1 1

// 61、补零
const FillZero = (num, len) => num.toString().padStart(len, "0");
// const num = FillZero(169, 5);  // num => "00169"

// 62、精确小数
const RoundNum = (num, decimal) =>
    Math.round(num * 10 ** decimal) / 10 ** decimal;
// const num = RoundNum(1.69, 1); // num => 1.7

// 63、生成范围随机数
const RandomNum = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
// const num = RandomNum(1, 10);

// 64、判断数据类型
/* 可判断类型：undefined、null、string、number、boolean、array、object、symbol、date、
regexp、function、asyncfunction、arguments、set、map、weakset、weakmap*/
function dataType(tgt, type) {
    const dataType = Object.prototype.toString
        .call(tgt)
        .replace(/\[object (\w+)\]/, "$1")
        .toLowerCase();
    return type ? dataType === type : dataType;
}

// 65、是否为空数组
const isEmptyArray = params => Array.isArray(params) && params.length == 0;

// 66、是否为空对象
const isEmptyObject = params =>
    dataType(params, "object") && !Object.keys(obj).length;

// 67、混淆数组(数组打乱排序)
const confuseArray = array => array.slice().sort(() => Math.random - 0.5);

// 68、统计数组成员个数
const countMember = array =>
    array.reduce((t, v) => {
        t[v] = t[v] ? ++t[v] : 1;
        return t;
    }, {});
// countMember([0, 1, 1, 2, 2, 2])  { 0: 1, 1: 2, 2: 3 }

// 69、将get请求的参数转换为JSON对象
const queryString2Json = url => {
    let obj = {};
    let searchArr = url.split("?")[1].split("&");
    for (let item of searchArr) {
        let key = item.split("=")[0],
            value = item.split("=")[1];
        obj[key] = value;
    }
    return obj;
};

// 70、用于判断程序运行环境是否在浏览器，这有助于避免在node环境运行前端模块时出错。
const isBrowser = () => ![typeof window, typeof document].includes("undefined");

// 71、用于判断当前页面是否处于活动状态（显示状态）。
const isBrowserTabFocused = () => !document.hidden;

// 72、用于判断当前变量的值是否为 null 或 undefined 类型。
const isNil = val => val === undefined || val === null;

// 73、用于检查当前的值是否为数字类型。
const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n);

// 74、用于判断参数的值是否是对象，这里运用了Object 构造函数创建一个对象包装器，如果是对象类型，将会原值返回。
const isObject = obj => obj === Object(obj);

// 75、用于判断给定的两个日期是否是同一天。(不能传入时分秒)
const isSameDate = (dateA, dateB) =>
    dateA.toISOString() === dateB.toISOString();

// 76、用于判断给定的字符串是否是 JSON 字符串。
const isValidJSON = str => {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
};

// 77、此函数功能用于比较两个对象，以确定第一个对象是否包含与第二个对象相同的属性与值。
const matches = (obj, source) =>
    Object.keys(source).every(
        key => obj.hasOwnProperty(key) && obj[key] === source[key]
    );
matches({ age: 25, hair: "long", beard: true }, { hair: "long", beard: true }); // true
matches({ hair: 'long', beard: true }, { age: 25, hair: 'long', beard: true }); // false

// 78、此段代码输出数组中前 n 位最大的数。
const maxN = (arr, n = 1) => [...arr].sort((a, b) => b - a).slice(0, n);

// 79、此代码段查找日期数组中最早的日期进行输出。
const minDate = (...dates) => new Date(Math.min.apply(null, ...dates));

// 80、JS 识别不同浏览器信息
function myBrowser() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器  
    if (userAgent.indexOf("Firefox") > -1) {
        return "Firefox";
    } //判断是否Firefox浏览器  
    if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
    } //判断是否Google浏览器  
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器  
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器  
}

// 81、编写一个方法，求一个字符串的字节长度，假设：一个英文字符占用一个字节，一个中文字符占用两个字节
function getBytes(str) {
    var len = str.length;
    var bytes = len;
    for (var i = 0; i < len; i++) {
        if (str.charCodeAt(i) > 255) bytes++;
    }
    return bytes;
}