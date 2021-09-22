function deepClone(obj, map = {}) {
  if (obj == undefined) {
    return obj;
  }

  // 处理日期对象
  if (obj instanceof Date) {
    return new Date(obj);
  }
  // 处理正则对象
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }

  // 处理原始值
  if (typeof obj !== "object") {
    return obj;
  }

  if (map[obj]) {
    // 处理子引用，循环引用
    return map[obj];
  }
  let constructorFn = obj.constructor;

  let newObj = new constructorFn();
  map[obj] = newObj;

  Object.keys(obj).forEach((key) => {
    // 递归
    newObj[key] = deepClone(obj[key], map);
  });

  return newObj;
}

let cc;

cc = {
  a: undefined,
  b: () => {},
  c: {
    a: 1,
  },
  d: cc,
};

cc.d = cc;

console.log(deepClone(cc), {});
