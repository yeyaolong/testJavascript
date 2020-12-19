# 第八章 对象、类与面向对象编程

## 8.1 理解对象
### 数据的属性
- [[Configurable]]: 
  直接定义对象时，默认为true.
  
  如果是使用Object.defineProperty，默认是false.
  
  - 属性是否可删除 delete object.pro
  - 是否可以修改某些特性
  - 是否可以可以改为访问器属性
  - 定义为configurable = false后，再也无法改回true.所以虽然可以对同一个属性多次调用Object.defineProperty(),但在把configurable设置为false之后，就无效了.
  
- [[Enumerable]]:
  直接定义对象时，默认为true
  
  如果是使用Object.defineProperty，默认是false.
  
  - 是否可以通过for..in 遍历
  
- [[Writable]]: 
  直接定义对象时，默认为true
  
  如果是使用Object.defineProperty，默认是false.
  
   - 是否可以修改属性的值 object.pro = 'new'
  
- [[value]]:
  不论直接还是defineProperty定义对象，默认都为undefined.
  
  - 属性实际的值
  
### writable

![image-20201219163839160](/home/yaolong/workspace/javascript/obj/readme.assets/image-20201219163839160.png)

### configurable

![image-20201219164139668](/home/yaolong/workspace/javascript/obj/readme.assets/image-20201219164139668.png)

# 访问器属性

[[Configurable]]: 表示属性是否可以通过delete删除并重新定义，是否可以修改他的特性,以及是否可以把它改为数据属性。

[[Enumerable]]: 表示属性是否可以通过for-in 循环返回.默认情况下，所有直接定义在对象上的属性的这个特性都是true.

[[Get]]:获取函数，在读取属性时调用.默认值为undefined

[[Set]]: 设置函数，在写入属性时调用。默认值为undefined



![image-20201219175538210](/home/yaolong/workspace/javascript/obj/readme.assets/image-20201219175538210.png)