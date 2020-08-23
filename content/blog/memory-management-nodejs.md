---
path: memory-management-nodejs
date: 2020-08-23T01:22:55.506Z
title: Memory Management with Nodejs
description: Memory Management with Nodejs and Mark and Sweep algorithm
---
![Memory Management](/../assets/memory_management.jpg "Memory Management")

Over the past decade, Internet accessibility has seen a big shift from only the *privileged class* to almost anyone who owns a device that is capable of connecting to the internet. With more and more people accessing the internet, developers face the big challenge of managing the load on the application. Memory leaks have been the most common enemy for the tech industry has to fight every day with the growing user base and furthermore growing codebase with tons of features added every other software release. Memory leaks can result in problems such as application slowdowns, crashes, high latency, and so on.

For low-level languages like C, developers have to manually perform memory management with malloc and calloc. In contrast, JavaScript automatically allocates memory when objects are created and frees it when they are not used anymore. This process is known as **Garbage Collection.** But does this mean that javascript developers live with no knowledge of memory management? Definitely not! Whenever there is bad press coverage of Node.js, it is (typically) related to performance problems. The user must simply be aware of certain things about how Node.js works.

Regardless of programming language, the garbage collection cycle is pretty much similar
![Memory](/../assets/allocate_1.png "Memory")

## Reference-counting garbage collection
This is the most naive garbage collection algorithm. This algorithm determines whether or not there is at least one reference to the object.  An object is said to be "garbage" if there are zero references pointing to it. Let's see in general how GC works.

### Limitation: Circular References
let's say there are two objects in the memory who are referencing each other thus creating a cycle but are detached from the root. That is they are out of scope of function and no longer needed in the code execution. Now, this memory needs to be reclaimed. However, since the reference counting algorithm works by checking whether or not an object has at least a reference pointing to them, neither of them are marked as garbage and continue occupying space in the memory.

![video1](/../assets/giphy.gif "video")
Note that circularly referenced nodes are not removed from the memory.

## Mark-and-sweep algorithm
This algorithm reduces the definition of "an object is no longer needed" to "an object is unreachable". This algorithm assumes the knowledge of sets of objects called roots. In Javascript root is a global object. The garbage collector thus will start from the roots, find all objects referenced from these roots and the objects referenced from these and so on. Thus it finds reachable and non-reachable objects.

GC then frees the unreachable objects from the memory. This solves the problem of circular references. If two circularly referenced objects exist in the memory and are not reachable directly or indirectly through the roots then they are freed from the memory. This algorithm is further explained in detail under the Node.js memory management section.

## Memory Management in Nodejs
Google V8 is a JavaScript engine initially created for Google Chrome, but it can also be used as a standalone. This makes it the perfect fit for Node.js. V8 compiles JavaScript down to native code and executes it.

#### V8’s memory scheme
A running program is represented through a memory space called **Resident Set.**
This divides the memory into certain sets:

**Code:** The actual code being executed

**Stack:** Contains static data like function frames, primitive values (like boolean / integer), pointers to objects in the heap etc.

**Heap:** V8 stores objects or dynamic data in heap. This is the biggest block of memory area and it's where garbage collection (GC) takes place.

![Memory Management](/../assets/allocate_2.png "Memory Management")
**Tip:** The current memory usage in Node.js can be checked by calling process.memoryUsage().

#### Stack
Consider the following code: 

```javascript
function multiply(a,b) {
  return a * b;
}
multiply(a,b);
```
Here, both a and b will be placed on the **stack**.

#### Heap
Now consider the following code: 

```javascript
function Food(foodItem) {
  this.name = foodItem.name;
}
const Burger = new Food({ name: 'Big Mac'});
```
After this, **Heap** memory would look something like this:
![Step1](/../assets/allocate_3.png "Step1")

Now let's two more objects: 
```javascript
function Food(foodItem) {
  this.name = foodItem.name;
}
const Burger = new Food({ name: 'Big Mac'});
const Pizza = new Food({ name: 'Cheesy Pizza'});
const Biryani = new Food({ name: 'Prawns Biryani'});
```
our memory gets updated to :
![Step2](/../assets/allocate_4.png "Step2")

If GC would run now, nothing would be freed as the root is linked to all the objects in the memory. This tells GC that all the objects defined in the running code are being used for execution. 

Consider, we no longer use Pizza object. Let's say we set Pizza to be **undefined**. (Please note that to change the value of Pizza, you need to use 'let' keyword to  make the initial definition of Pizza & not const)

Now the memory would look something like this:
![Step3](/../assets/allocate_5.png "Step3")

Now when GC runs, the original Pizza object cannot be reached from the root object, so on the next garbage collector run it will be freed up:
![video2](/../assets/1.gif "video2")

## What Causes Memory Leaks in JS
So the biggest dilemma is if JS already has an automated garbage collector then why should a developer learn about memory leaks? Does Javascript still have memory leaks? The answer is yes.

Even though automatic memory management like garbage collection in V8 avoids most of the memory leaks, there could still be unwanted memory references in the heap which could happen due to various reasons.

**Global Variables:**  Since global variables in JS exists in the global execution context (GEC), these variables are always referenced by the root node (window or global ***this***) they are never garbage collected throughout the lifetime of the application and will occupy memory. Having a large graph of objects referenced from the root can cause a memory leak.

**Multiple References:** There may be a case where the same object is referenced from multiple objects and one of the references is left dangling.

**Closures:** Javascript closure is an excellent tool that helps in memorizing its context. When a closure holds a reference to a large object in the heap, the object remains in the memory as long as that particular closure is in use. If closures are improperly used, these can lead to memory leaks.

**Timers & Events:** The use of setTimeout, setInterval, Observers and event listeners can cause memory leaks if large object references are kept in their callback without proper handling.

