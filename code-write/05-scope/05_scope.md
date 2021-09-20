# 执行栈 execute context stack [ECS]

```javascript
function a() {
  b();
}

function b() {
  c();
}

function c() {
  console.log("111111111111");
}
```

```javascript
// 默认会有全局的执行上下文
ECS = {
  globalContext: {},
};
// a执行;
ECS.push(aFunctionContext);
// b执行;
ECS.push(bFunctionContext);
// c执行;
ECS.push(cFunctionContext);

// c执行完，弹出
ECS.pop();
// b执行完
ECS.pop();
// c执行完
ECS.pop();
```

```javascript
// 执行上下文有3个重要的属性：变量对象+作用域链+this指向
// 作用域链： 作用域在函数定义的时候就决定了，函数会保存一个内部属性 [[scope]]: 保存了所有的父变量对象，父变量对象里面有AO,BO；这些多个执行作用于上下文构成的查找链条叫做作用域链

function a() {
  function b() {
    function c() {}
  }
}

a[[scope]] = [globalContext.VO];
b[[scope]] = [aContext.AO, globalContext.VO];
c[[scope]] = [bContext.AO, aContext.AO, globalContext.VO];

var a = 1;
function sum() {
  var b = 2;

  return a + b;
}
sum();

sum[[scope]] = [globalContext.VO];

// 函数执行的时候会有一个执行上下文栈
ECS = [
  globalContext, // 默认会有
  sumContext,
];

// 执行之前，会生成执行上下文对象
sumContext = {
  AO: {
    arguments: {
      length: 0,
    },
    b: undefined,
  },
  Scope: [AO, sum[[scope]]], // 存放自己活动对象以及函数的作用域
};

// 执行过程
sumContext = {
  AO: {
    arguments: {
      length: 0,
    },
    b: 2, // 会被赋值
  },
  Scope: [AO, sum[[scope]]], // 存放自己活动对象以及函数的作用域
};

// 执行完： ECS.pop()
```

- null 为什么是基本类型？
  > 因为计算机存储对象地址是 000 开头，而 null 什么都没有，也是 000 导致 typeof null => 'object'
