/**
 * 错误处理
 */

dest = {};
src = {
  a: 'foo',
  get b() {
    // Object.assign() // 在调用这个函数时会抛出错误
    throw new Error();
  },
  c: 'bar'
};

try {
  Object.assign(dest, src);
} catch(e) {

}

// Object.assign // 没有办法回滚已经完成的修改
// 因此抛出错误之前,目标对象已经完成的修改会继续存在
console.log(dest); // {a: foo}