# 类型判断

- typeof

原始类型判断

> boolean, number, string, undefined, symbol, null

> (null 并不是对象类型，他是原始类型 虽然 typeof null => 'object')

```javascript
typeof true;
// => 'boolean'

typeof 2;
// => 'number'

typeof "ggg";
// => 'string'

typeof undefined;
// => 'undefined'

typeof null;
// => 'object'

typeof Symbol;
// => 'function'
```

- [], {}, 正则，函数都是对象类型

```javascript
typeof [];
// => 'object'

typeof {};
// => 'object'

typeof /^s$/;
// => 'object'

typeof function a() {};
// => 'function'
```

- Object.toString.call() 能精确区分[], {}, 正则，函数， null

```javascript
Object.prototype.toString.call([]);
// => '[object Array]'

Object.prototype.toString.call({});
// => '[object Object]'

Object.prototype.toString.call(/^gg$/);
// => '[object RegExp]'

Object.prototype.toString.call(null);
// => '[object Null]'

Object.prototype.toString.call(function () {});
// => '[object Function]'
```

- Object.toString.call() 只能校验已经存在的类型,不能校验自定义类型

```javascript
class A {}
let a2 = new A();
Object.prototype.toString.call(a2); // => '[object Object]'
```

- 于是 intanceof 就出来了

```javascript
class A {}
let a2 = new A();

a2 instanceof A; // => true
```

- instanceof 的工作原理

```javascript
// a2 instanceof A;
a2.__proto__ === A.prototype;

// 如果没找到，继续沿着原型链查找
a2.__proto__.__proto__ === A.prototype;
```

- 自己实现一个

```javascript
function instanceOf(A, B) {
  A = A.__proto__;
  B = B.prototype;

  while (true) {
    if (!A) {
      return false;
    }

    if (A === B) {
      return true;
    }

    A = A.__proto__;
  }
}

class A {}
let a3 = new A();

console.log(instanceOf(a3, A)); // => true
```

- 想要检测普通类型咋办？

```javascript
function instanceOfA(A, B) {
  A = A.__proto__;
  B = B.prototype;

  while (true) {
    if (!A) {
      return false;
    }

    if (A === B) {
      return true;
    }

    A = A.__proto__;
  }
}

console.log(instanceOfA("123", String)); // => true

// instanceof 默认会调用原始 Symbol.hasInstance方法
// instanceOfA("123", String) === String[Symbol.hasInstance]('123')
// 可以重写
// class TEST {
//   static [Symbol.hasInstance](x) {
//     return typeof x === "string";
//   }
// }
```
