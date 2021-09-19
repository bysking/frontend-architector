function Animal(type) {
  this.type = type;
}

Animal.prototype.say = function () {
  console.log("你好动物世界");
};

// let pig = new Animal("猪猪侠");

// console.log(pig.type); // => 猪猪侠
// pig.say(); // => 你好动物世界

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
