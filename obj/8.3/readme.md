## 8.3 继承

继承是面向对象编程中讨论最多的话题.很多面向对象语言都支持两种继承

- 接口继承

  只继承方法签名

- 实现继承

  继承实际的方法.

接口继承在ECMAScript中是不可能的，因为函数没有签名.

实现继承是ECMAScript唯一支持的继承方式，而这主要通过原型链实现.

### 8.3.1 原型链

```javascript
function SuperType() {
	this.property = true;
}

SuperType.prototype.getSuperValue = function () {
	return this.property;
}

function SubType() {
	this.subproperty = false;
}

// 继承SuperType
SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function () {
	return this.subproperty;
}

let instance = new SubType();
console.log(instance.getSuperValue()); // true
console.log(typeof instance); // 返回object，并不是想象中的 Subtype
```

#### 默认原型

任何函数的默认都是一个 Object 的实例.

#### 原型和继承关系

原型和实例的关系可以通过两种方式来确定。

第一种方式是**使用instanceof操作符**，如果**实例的原型链中出现过相应的构造函数，则instanceof 返回 true(注意：说的是构造函数在原型链中)**

```javascript
console.log(instance instanceof Object); // true
console.log(instance instanceof SuperType); // true
console.log(instance instanceof SubType); // true
```

从技术上讲,instance 是 Object、SuperType 和 SubType的实例，因为instance的原型链中包含这些构造函数的原型。结果就是instanceof 对所有这些构造函数都返回true



确定这种关系的第二种方式是**使用isPrototypeOf()方法**。原型链中的每个原型都可以调用这个方法，如下例所示，**只要原型链中包含这个原型，这个方法就返回true（注意：这里说的是原型在原型链中）**

```javascript
console.log(Object.prototype.isPrototypeOf(instance); // true
console.log(SuperType.prototype.isPrototypeOf(instance)); // true
console.log(SubType.prototype.isPrototypeOf(instance)); // true
```



#### 关于方法

子类有时候需要覆盖父类的方法，或者增加父类没有的方法。为此，**这些方法必须在原型赋值后再添加到原型上.**

```javascript
function SuperType() {
	this.property = true;
}

SuperType.prototype.getSuperValue = function() {
	return this.property;
}

function SubType() {
	this.subproperty = false;
}

// 继承SuperTYpe
SubType.prototype = new SuperType();

// 新方法
SubType.prototype.getSubValue = function () {
	return this.subproperty;
}

// 覆盖已有的方法
SubType.prototype.getSuperValue = function () {
	return false;
}
```

**以对象字面量方式创建原型方法会破坏之前的原型链，因为这相当于重写了原型链**

```javascript
function SuperType() {
    this.property = true;
}

SuperType.prototype.getSuperValue = function () {
    return this.property;
}

function SubType() {
    this.subproperty = false;
}

// 继承 SuperType
SubType.prototype = new SuperType();

// 通过对象字面量添加新方法, 这会导致上一行无效
SubType.prototype = {
    getSubValue() {
        return this.subproperty;
    },
    someOtherMethod() {
        return false;
    }
};

let instance = new SubType();
console.log(instance.getSuperValue()); // 出错!
```

#### 原型链问题

- 1、原型中包含的**引用值**会在所有实例间共享,在使用原型实现继承时,原型实际变成了另一个类型的实例

```javascript
function SuperType() {
    this.colors = ["red", "blue", "green"];
}

function SubType() {

}

// 继承SuperType
SubType.prototype = new SuperType();

let instance1 = new SubType();
instance1.colors.push("black");

let instance2 = new SubType();
console.log(instance2.colors); // ["red", "blue", "green", "black"]
```

- 2、子类型在实例化时不能给父类型的构造函数传参.

  因为是基于原型链继承，所以SubType的参数在`SubType.prototype = new SuperType();`就已经被确定掉了。

  

  在子类型实例化时，子类SubType中，没有调用SuperType的方法，自然也就无法实现给父类传参.

  ```javascript
  function SuperType() {
      this.colors = ["red", "blue", "green"];
  }
  
  function SubType(color) {
  	this.subColor = color;
  }
  
  // 继承SuperType
  SubType.prototype = new SuperType();
  
  let instance1 = new SubType("black");
  ```

  下面的*盗用构造函数*可以解决传参问题.


### 8.3.2 盗用构造函数

基本思路: 在子类构造函数中调用父类构造函数

```javascript
function SuperType() {
    this.colors = ["red", "blue", "green"];
}

function SubType() {
    // 继承 SuperType
    SuperType.call(this);
}

let instance1 = new SubType();
instance1.colors.push("black");

let instance2 = new SubType();
console.log(instance2.colors); // "red, blue, green"
```

#### 1、传递参数

相比于使用原型链,盗用构造函数的一个优点就是**可以在子类构造函数中向父类构造函数传参**.

```javascript
function SuperType(name) {
    this.name = name;
}

function SubType() {
    // 继承
    SuperType.call(this, "Nicholas");
    
    // 实例属性
    this.age = 29;
}

let instance = new SubType();
console.log(instance.name);
console.log(instance.age);
```



#### 2、盗用构造函数问题

必须在构造 函数中定义方法，因此函数不能重用,子类也不能访问父类原型上定义的方法.



### 8.3.3 组合继承

```javascript
function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function() {
    console.log(this.name);
}

function SubType(name, age) {
    // 继承属性, 属性用盗用构造函数继承
    SuperType.call(this, name);
    
    this.age = age;
}

// 继承方法，方法用原型链继承.
SubType.prototype = new SuperType();

SubType.prototype.sayAge = function() {
    console.log(this.age);
}
// 实际上原型链上也继承了SuperType的属性，但是由于查找的优先级，原型链的优先级比较低，所以，还是找到subtype.name，而不是subtype.prototype.name

let instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
console.log(instance1.colors); // "red, blue, green, black"
instance1.sayName();
instance1.sayAge();

let instance2 = new SubType("Greg",19);
console.log(instance2.colors); // "red, blue, green"
instance2.sayName();
instance2.sayAge();

```

### 8.3.4 原型式继承

原型式继承非常适合不需要单独创建构造函数,但仍然需要在对象间共享信息的场合.

```javascript
function object(o) {
    function F() {
        
    }
    F.prototype = o; // 浅拷贝放到原型上
    return new F();
}

let person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
}

let anotherPerson = object(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

let yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");

console.log(person.name); // "Nicholas",因为不是引用类型，所以不会改变
console.log(person.friends); // ["Shelby", "Court", "Van", "Rob", Barbie"]
```

*ECMAScript 5* 通过*Object.create()* 将原型式继承的概念规范化了,Object.create()与 上面的 object()方法效果相同

```javascript
let person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
}

let anotherPerson = Object.create(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

let yetAnotherPerson = Object.create(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");

console.log(person.name); // "Nicholas",因为不是引用类型，所以不会改变
console.log(person.friends); // ["Shelby", "Court", "Van", "Rob", Barbie"]
```

### 8.3.5 寄生式继承

```javascript
function createAnother(original) {
    let clone = object(original);
    clone.sayHi = function() {
        console.log("hi");
    }
    return clone;
}
```

寄生式继承背后的思路类似于寄生构造函数和工厂模式：创建一个实现继承的函数，以某种方式增强对象,然后返回这个对象.

#### 8.3.6 寄生式组合继承

```javascript
function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function() {
    console.log(this.name);
}

function SubType(name, age) {
    // 盗用构造函数,继承实例属性
    SuperType.call(this, name); // 第二次调用SuperType()    
    this.age = age;
}

// 组合继承,导致原型被覆盖
SubType.prototype = new SuperType(); // 第一次调用SuperType()

SubType.prototype.constructor = SubType; // 把constructor重新赋值回去
SubType.prototype.sayAge = function() {
    console.log(this.age);
}

console.log(SubType.prototype.isPrototypeOf(sub)); // true
console.log(sub instanceof SuperType); // true
```

寄生式组合继承通过盗用构造函数继承属性,但使用混合式原型链继承方法.

```javascript
function object(o) {
    function F() {
        
    }
    F.prototype = o; // 浅拷贝放到原型上
    return new F();
}

function inheritPrototype(subType, superType) {
    let prototype = object(superType.prototype); // 创建对象
    prototype.construdctor = subType; // 增强对象
    subType.prototype = prototype; // 赋值对象
}

function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function() {
    console.log(this.name);
}

function SubType(name, age) {
    // 盗用构造函数,继承实例属性
    SuperType.call(this, name); // 第二次调用SuperType()    
    this.age = age;
}

inheritPrototype(SubType, SuperType);

// 增强对象
SubType.prototype.sayAge = function() {
    console.log(this.age);
}
```



