// 混入

dest = {};
src = { id: 'src' };

result = Object.assign(dest, src);

// Object.assign 修改目标对象
// 也会返回修改后的目标对象
console.log(dest === result); // true
console.log(dest !== src); // true
console.log(result); // { id: "src" }
console.log(dest); // { id: "src" }

/**
 * 多个源对象
 */
dest = {};

result = Object.assign(dest, {a: 'foo'}, {b: 'bar'});
console.log(result); // { a: "foo", b: "bar" };

/**
 * get函数与set函数
 */
dest = {
  set a(val) {
    console.log(`Invoke dest setter with param ${val}`)
  }
}

src = {
  get a() {
    console.log('Invoke src getter');
    return 'foo';
  }
}

Object.assign(dest, src);
// 调用src 的获取方法
// 调用dest的设置方法并传入参数"foo"
// 因为这里的设置函数不执行赋值操作
// 所以实际上并没有把指转移过来

console.log(dest); // { set a(val) {...}}



