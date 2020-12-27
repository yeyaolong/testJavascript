# 8.2 创建对象

## 8.2.1概述

## 8.2.2 工厂模式

```javascript
function createPerson(name, age, job) {
	let o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function() {
    	console.log(this.name);
    };
    return 0;
}

let person1 = createPerson("Nicholas", 29, "Software Engineer");
let person2 = createPerson("Greg", 27, "Doctor");
```

这种工厂模式虽然可以解决创建多个类似对象的问题，但没有解决对象标识问题(即新创建的对象是什么类型).



## 8.2.3 构造函数模式

```javascript
function Person(name, age, job) {
	this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function() {
    	console.log(this.name);
    }
}

let person1 = new Person("Nicholas", 29, "Software Engineer");
let person2 = new Person("Greg", 27, "Doctor");

person1.sayName(); // Nicholas
person2.sayName(); // Greg
```

构造函数模式内部代码与工厂模式基本一样，区别在于

- 没有显式地创建对象
- 属性和方法直接赋值给了this
- 没有return

使用new 操作符调用构造函数会执行如下操作:

- (1)在内存中创建一个新对象

- (2)在这个新对象内部的[[Prototype]]特性被赋值为构造函数的prototype属性

- (3)构造函数内部的this被赋值为这个新对象(即this指向新对象)

- (4)执行构造函数内部的代码(给新对象添加属性)

- (5)如果构造哦啊函数返回非空对象,则返回该对象;否则，返回刚创建的新对象.

### 构造函数也是函数
任何函数只要使用new 操作符就是构造函数，而不使用new操作符调用的函数就是普通函数.
```javascript
// 作为构造函数
let person = new Person("Nicholas", 29, "Software Engineer");
person.sayName();

// 作为函数调用
Person("Greg", 27, "Doctor"); // 添加到window对象
window.sayName(); // "Greg"

// 在另一个对象的作用域中调用
let o = new Object();
Person.call(o, "Kristen", 25, "Nurse");
o.sayName(); // "Kristen"

```
**在调用一个函数而没有明确设置this值的情况下(即没有作为对象的方法调用,或者没有使用call()/apply()调用), this始终指向Global对象（在浏览器中就是window对象）**
放在普通的作用域中，也会被挂到global上
```javascript
// 普通作用域
{
	Person("Greg", 27, "Doctor");
}

// 放在if生成的作用域，也还是会挂到global对象上
if (true) {
	Person("Greg", 27, "Doctor");
}

window.sayName(); // "Greg"
```
放到函数的作用域内，也是被挂到global对象上
```javascript

let scope = function () {
    Person("Greg", 27, "Doctor");
}

scope();

window.sayName(); // "Greg"
```

### 构造函数的问题

构造函数定义的方法会在每个实例上都创建一遍. 在上面的例子中,person1和person2都有名为sayName的方法,但是这两个方法不是同一个Function实例.因为在做同一件事,没必要定义两个不同的实例函数.


要解决这个问题，可以把函数定义转移到构造函数外部
```javascript
function Person(name, age, job) {
	this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = sayName;
}

let sayName = function() {
	console.log(this.name);
}
```

但是，把函数定义在外部也有问题
- 全局作用域污染
- 自定义类型引用不能很好的聚集在一起,代码显得乱