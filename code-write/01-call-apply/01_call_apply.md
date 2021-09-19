### 手撕 call

---

-call 的特点

1. 改变函数的 this 指向
2. 让当前函数执行

- 小例子：html 里面的默认 this (浏览器里面默认 window node 里面是 global)

```javascript
function fn1() {
  console.log(this);
}

fn1(); // => window
fn1.call(); // => window
```

- 小例子：改变 this

```javascript
function fn1() {
  console.log(this);
}

fn1.call("嫁人要嫁灰太狼"); // => "嫁人要嫁灰太狼"
```

- call 的参数的传递：逐个传递（和 apply 不同，apply 是列表传递）

```javascript
function fn1() {
  console.log(this, arguments);
}

fn1.call("我是叮当猫", "铜锣烧1", "铜锣烧2"); // => '我是叮当猫' ['铜锣烧1', '铜锣烧2']
```

- call 方法会让自己执行，于是有下面的骚操作

```javascript
function fn1() {
  console.log(1);
}

function fn2() {
  console.log(2);
}

fn1.call(fn2); // => 1
fn1.call.call(fn2); // => 2 注意这里不是1

// 因为fn1.call是一个函数，再一次.call也是一个函数找到的是同一个函数，会把fn2作为里面的this并执行，于是打印了2
// Function.prototype.call = function () {
//   this();
// };
```

- 如何实现一个 call

```javascript
Function.prototype.call = function (context) {
  context = context ? Object(context) : window; // Object是为了处理基本类型，目的是为了支持进行挂载fn
  context.fn = this; // this指代当前执行call的那一个函数本身
  // 挂载到context上是为了让待执行函数里面的this指向context

  let args = Array.from(arguments).slice(1); // 收集参数
  let res = context.fn(...args); // 获取返回
  delete context.fn; // 清理多余参数
  return res; // 结果返回
};

function a() {
  console.log(this, 1);
}

a.call("333"); // => 3
```

- 如何实现 apply ，代码执行参数哪里处理成数组即可

```javascript
Function.prototype.apply = function (context) {
  context = context ? Object(context) : window; // Object是为了处理基本类型，目的是为了支持进行挂载fn
  context.fn = this; // this指代当前执行call的那一个函数本身
  // 挂载到context上是为了让待执行函数里面的this指向context

  let args = arguments[1] || []; // 收集参数
  let res = args.length ? context.fn(...args) : context.fn(); // 获取返回
  delete context.fn; // 清理多余参数
  return res; // 结果返回
};
```
