## 手写 new

- 常规类的使用

```javascript
function Animal(type) {
  this.type = type;
}

Animal.prototype.say = function () {
  console.log("你好动物世界");
};

let pig = new Animal("猪猪侠");

console.log(pig.type); // => 猪猪侠
pig.say(); // => 你好动物世界
```

- 手写 new

1. 会执行构造函数,返回一个新对象
2. 实例会有\_\_proto\_\_指向构造函数原型 prototype
3. 根据构造函数的执行结果返回值类型返回相应值：对象类型优先返回，否则返回 new 之后的实例

```javascript
function mockNew() {
  let constructorFn = arguments[0]; // 获取构造函数
  let args = [].slice.call(arguments, 1); // 获取参数
  let obj = {}; // 新实例对象
  obj.__proto__ = constructorFn.prototype; // 原型关联
  let res = constructorFn.apply(obj, args); // 构造函数执行
  return res instanceof Object ? res : obj; // 构造函数返回
}

let pig = mockNew(Animal, "灰太狼");
console.log(pig.type); // => 灰太狼
pig.say(); // => 你好动物世界
```
