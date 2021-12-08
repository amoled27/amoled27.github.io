---
path: avoid-memory-leaks
date: 2020-12-02T11:12:55.506Z
title: Best Practices to Avoid Memory Leaks
description: Best Practices to Avoid Memory Leaks in Node.js
---
![Logging in Node.js](/../../assets/memory-leak/header.png "Logging in Node.js")

In the Previous Blog (add a link to blog ) we understood the Memory management in Node.js, how Garbage Collector (GC) works and what are the possible causes of memory leaks despite GC playing a crucial role. In this blog, let's look at best practices to ensure efficient memory use in Node.js.

## 1. REDUCE USE OF GLOBAL VARIABLES
Since global variables are never garbage collected, it's best to ensure you don't overuse them. 
In javascript particularly you need to keep in mind certain aspects to reduce global variables 

#### 1. Avoid Accidental Globals
In Javascript, if you assign a value to an undeclared variable, Javascript automatically hoists it as a global variable in default mode. Also, this goes the same with the word 'this' used in functions in the global scope.

Examples:
```javascript
function apple() {
	red = true; // this red variable gets hoisted in global space
}

function mango() {
// since 'this' in global functions refers to global this varible is hoisted in global space
this.type = "Alphanso";  
}
```
**Solution:** It is helpful to write javascript in a strict mode with 'use strict' annotation at the top of the JS file. In newer versions of Node.js you can globally enable strict mode by passing '- - use_strict ' flag when running node command.

```javascript
'use strict'

function apple() {
	red = true; // this will throw an error
}

function mango() {
// this function will have its own scope for 'this'
this.type = "Alphanso";  
}
```
**Caution:**  Be careful when you use arrow functions though, because even in use strict mode 'this' in arrow function will be in global space

```javascript
// This will also become a global variable as arrow functions
const plantation = () => {
    this.coconut = "Brown";
}
```
**solution:** use the no-invalid-this rule from ESLint to avoid such cases.

Use global scope wisely :

- As much as possible don't use the global scope, make the best use of local scope inside the functions, as that will be garbage collected and will keep memory free.
- Try to define only constants, cache and reusable variables in global. Mark variables as null whenever the values are not needed.
- Do not use global space as a medium to pass values from one function to other, use function parameters instead.
- Dont store big objects in global scope. If you have to store them, then nullify them when when not needed. Dont let cache objects grow indefinitely , cleaup once and while.

#### 2. Use Stack Memory Effectively
Accessing stack is much faster than accessing heap memory, hence try to use stack variables more frequently than their counter parts. This also ensures we don't accidentally cause memory leaks. Ofcourse in real world scenario its impossible to create a usable application by only using static data. But we can follow some tricks to make better use of stack.

1. Avoid heap object references from stack variables when possible. Also, don’t keep unused variables.
2. Destructure and use fields needed from an object or array rather than passing around entire objects/arrays to functions. This avoids keeping a reference to objects inside closures.

```javascript
function outer() {
    const obj = {
        foo: 1,
        bar: "hello",
    };

    const closure = () {
        const { foo } = obj;
        myFunc(foo);
    }
}

function myFunc(foo) {}
```

#### 3. Use Heap Memory Effectively
In real world applications it is quite impossible to completely avoid using heap memory but we can make it more efficient by following few tips:

1.  copy objects instead of referencing them. Pass the reference only if the object is huge and copy operation is expensive. 
2. Avoid object mutations as much as possible, instead use object spread or object.assign and create a copy.
3. Avoid creating multiple references to the same object
4. Avoid creating huge object trees else keep them short lived

Use APM to track your heap memory usage.

#### 4. Be Cautious when using Closures, Timers & Event Handlers
For timers always remember to pass copies of objects to avoid mutations and clear timers when done using clearTimeout and clearInterval methods. 

Also clear listeners once the job is done, don't keep them running forever. In cases where they are holding on to object reference from parent scope.