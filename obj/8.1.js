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