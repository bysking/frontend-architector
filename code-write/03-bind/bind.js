let obj = {
  name: "小明",
};

function fn(cat, age) {
  console.log(this.name, cat, age);
}

// let bindFn = fn.bind(obj);
// bindFn(); // => 小明

// Function.prototype.myBind = function (context) {
//   let that = this; //  待执行的函数
//   let args = [].slice.call(arguments, 1); // 绑定参数收集

//   // 返回待执行函数
//   return function () {
//     let newArgs = [].slice.call(arguments); // 执行参数收集
//     let totalArgs = [...args, ...newArgs]; // 参数合并
//     that.apply(context, totalArgs); // 修改this指向
//   };
// };

// let fnBind = fn.myBind(obj, "小黑");
// fnBind(9); // => 小明 小黑 9

// 3. 如果返回的函数被 new 那么执行函数里面的 this 就是新的实例
Function.prototype.myBind = function (context) {
  let that = this;
  let args = [].slice.call(arguments, 1);

  function binFn() {
    this.test = 666;
    let newArgs = [].slice.call(arguments);
    let totalArgs = [...args, ...newArgs];
    that.apply(this instanceof binFn ? this : context, totalArgs); // 修改this指向, 命名函数处理实例判断
  }

  binFn.prototype = this.prototype; // 实现原型公用

  return binFn;
};

let fnBind = fn.myBind(obj, "小黑");
let a = new fnBind(9); // => undefined 小黑 9
console.log(a); // => binFn {test: 666}
