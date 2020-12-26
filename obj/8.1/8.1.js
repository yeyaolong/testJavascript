let person = new Object();
person.name = "Nicholas";
person.age = 29;
person.job = "Software Engineer";
person.sayName = function() {
  console.log(this.name);
}
// 对象字面量方式
let person = {
  name: "Nicholas",
  age: 20,
  job: "Software Engineer",
  sayName() {
    console.log(this.name);
  }
}

// defineProperty
let person = {};
Object.defineProperty(person, "name", {
  writable: false,
  value: "Nicholas",
  Configurable: true,
  Enumerable: true
});
console.log(person.name);
person.name = "Greg";
console.log(person.name);

// 访问器属性
let book = {
  year_: 2017,
  edition: 1
};    

Object.defineProperties(book, "year", {
  get () {
    return this.year_;
  },
  set (newValue) {
    if (newValue > 2017) {
      this.year_ = newValue;
      this.edition += newValue - 2017;
    }
  }
});

// 定义多个属性
let book = {};
Object.defineProperties(book, {
  year_: {
    value: 2017
  },
  edition: {
    value: 1
  },
  year: {
    get() {
      return this.year_;
    },
    set(newValue) {
      if (newValue > 2017) {
        this.year_ = newValue;
        this.edition += newValue - 2017;
      }
    }
  }
});

// 读取属性的特性
let descriptor = Object.getOwnPropertyDescriptor(book, "year_");
let descriptors = Object.getOwnPropertyDescriptors(book);