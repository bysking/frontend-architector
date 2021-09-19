// function fn1() {
//   console.log(this, arguments);
// }

// fn1();
// fn1.call();
// fn1.call("嫁人要嫁灰太狼");
// fn1.call("我是叮当猫", "铜锣烧1", "铜锣烧2"); // => String {'我是叮当猫'} Arguments(2) ['铜锣烧1', '铜锣烧2', callee: ƒ, Symbol(Symbol.iterator): ƒ]

// function fn1() {
//   console.log(1);
// }

// function fn2() {
//   console.log(2);
// }
// fn1.call(fn2); // => 1
// fn1.call.call(fn2); // => 2 注意这里不是1

// // Function.prototype.call = function () {
// //   this();
// // };

// // 实现自己的call

// Function.prototype.call = function (context) {
//   context = context ? Object(context) : window; // Object是为了处理基本类型，目的是为了支持进行挂载fn
//   context.fn = this; // this指代当前执行call的那一个函数本身
//   // 挂载到context上是为了让待执行函数里面的this指向context

//   let args = Array.from(arguments).slice(1); // 收集参数
//   let res = context.fn(...args); // 获取返回
//   delete context.fn; // 清理多余参数
//   return res; // 结果返回
// };

// function a() {
//   console.log(this, 1);
// }

// a.call("333"); // => 3

// 实现自己的apply

Function.prototype.apply = function (context) {
  context = context ? Object(context) : window; // Object是为了处理基本类型，目的是为了支持进行挂载fn
  context.fn = this; // this指代当前执行call的那一个函数本身
  // 挂载到context上是为了让待执行函数里面的this指向context

  let args = arguments[1] || []; // 收集参数
  let res = args.length ? context.fn(...args) : context.fn(); // 获取返回
  delete context.fn; // 清理多余参数
  return res; // 结果返回
};

function a() {
  console.log(this, arguments);
}

a.apply("333", [1, 2, 3]); // => 3
