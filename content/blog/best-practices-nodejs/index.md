---
path: best-practices-nodejs
date: 2021-05-09T12:12:55.506Z
title: Best Practices for Node.js Development
description: Best Practices for Node.js Development
---
![header](/../../assets/best-practices/best-practices.jpg "header")

The popularity of Node.js is growing at a rapid pace, with more and more unicorn companies adapting to the technology it has become very crucial to follow certain conventions to make code readable and modifiable by other developers. The code you write is also directly proportional to the scalability of the product you ultimately build.

## Best Practice #1
**Choose a Layered Approach: Separation of your concerns**

Popular Node.js frameworks like Express.js allow you to define routes as callback functions that are executed when a client request is received. This gets you tempted to write all the business logic under a single function which unknowingly escalates to a messy code that is difficult to interpret for a human being.

Thus this should be implemented keeping in mind the' Separation of concerns' principle of programming. According to this principle, we should have distinct modules addressing distinct concerns in the application. The server-side aspects are broadly divided as
![manipulation](/../../assets/best-practices/manipulation.png "manipulation")

These aspects can be handled by programming three different layers:  
![burger](/../../assets/best-practices/burger.png "burger")

- **Controller:** API routes & endpoints
- **Service Layer:**  For business logic
- **Data Access Layer:** For working with database

### Controller layer

In this module, you only write API routes. In the route handler function, you can deconstruct the request object from HTTP to get params, query params, payload etc and pass them to the service layer for processing.

### Service layer

This layer houses the business logic. This contains all the methods that take up singular responsibility and are reusable. 

### Data Access layer

The main role of this layer is talking to the Database - Fetching from, updating, writing to it. All DB connections, models, ODM/ORMs are defined here.

## Best Practice #2
**Folder Structure: Properly organize your code files**

In the previous section, we spoke about how to logically modularize a project into layers. To get this abstract architecture in play we need a proper folder structure

```javascript
src
      ├── app.js			    app entry point
      ├── /api			      controller layer: api routes
      ├── /config			    config settings, env variables
      ├── /services		    service layer: business logic
      ├── /models			    data access layer: database models	
      ├── /scripts		    miscellaneous NPM scripts
      ├── /subscribers		async event handlers
      └── /test           test suites
```
Here, **/apis** (controller layer), **/services** and **/models** (data access layer) are the three layers we spoke about. 

**/config** layer can store your constants and app configurations / settings like environment variables etc. **/scripts** directory can be used to store automation scripts like deployment pipelines. **/tests** will house the test cases you write for the application.


## Best Practice #3
**Publisher subscriber models**

The Publisher/Subscriber models can be used for communication between two entities in your code. Publishers (Message Senders) send out messages, along specific channels without having knowledge of who the receiving entities are. Similarly, Subscribers ( receiving entities ) on other hand listen to one or more channels without the knowledge of publishing entities.

It is a good practice to implement this model in your project to manage multiple children operations corresponding to a single action. Let consider an example where, in your app, on user sign up, you do numerous things like - create a DB entry, generating an Auth key, sending a confirmation email.  If you handle this in a single service function the function code tends to get lengthy and messy.

the structure of the code would look like:
```javascript
export default class AuthService() {
		async function signup(user) {
			//1. create DB entry
			//2. generate auth key
			//3. send confirmation email
	}
}
```
We can very well simplify this with pub/sub model.

Pub/sub model can use Node.js Events API

```javascript
var events = require('events');
      var eventEmitter = new events.EventEmitter();		

      export default class UserService() {

        async function signup(user) {
          // emit 'signup' event
          eventEmitter.emit('signup', user.data)
        }

      }
```
To handle such events emissions, you can have multiple subscribers that are essentially event listeners, waiting for certain events to be emitted. These subscribers can be organized into separate files based on their purpose and stored in the /subscribers directory.

```javascript
// email.js

    // ...
    eventEmitter.on('signup', async ({ data }) => {  // event listener 
      // send email 
    })
```

```javascript
// auth.js

    // ...
    eventEmitter.on('signup', async ({ data }) => {	// event listener
      // generate auth key
    })
```
## Best Practice #4
**Clean Code & Easy Readability: Use code linters, formatters & comments**

- **Linting & Formatting**

The main goal here is improving code quality and readability. A linter warns you about syntactic errors (sometimes even semantic ) whereas code formatted styles the code in a more readable way. Some of the popular linters for javascript are Jslint and Eslint. For code formatting, Prettier is a well-known code formatter. Plugins for these linters and formatters are available in most of the code editors like Atom and VS code.
![formatting](/../../assets/best-practices/formatting.gif "formatting")

- **Adding Comments**

When writing code it is important for a developer to write proper comments so that the team working on the project can benefit. A proper yet short comment explaining the functionality of the code can save much confusion and time for peer developers and ultimately the time of the entire team.  The screenshot below shows one of the examples of a proper comment:
![comments](/../../assets/best-practices/comments.png "comments")

- **Proper nomenclature of functions, variables and constants**

The function, variables and constants names that you define should indicate the use or significance of that function( / variable / constant). Poor nomenclature of the variables can create confusion among the team members and peer developers. Proper naming also helps you to recognize the functions when checking memory snapshots. 

How **not** to write function name:
![constants](/../../assets/best-practices/const1.png "constants")

Here we are not clear about what kind of items have been defined in the items array, moreover, items is a common term that is likely to be used frequently. This is an example of bad nomenclature. 

The function name too doesn't go with the functionality of the method. Like the function can both mark items available and unavailable, so naming it 'makeAvailable' doesn't seem to be right.
The parameter n inside the function is just a letter 'n'  and doesn't tell what it signifies.
Better code would be:
![constants](/../../assets/best-practices/const2.png "constants")


## Best Practice #5
**Write Asynchronous code: Use Promises, Async/Await** 

Javascript is quite known for callback functions. They allow you to define the asynchronous behaviour in javascript. But with more and more callbacks in the code, the code gets clunkier, resulting in what is known as **callback hell.** 
Javascript introduced promises in 2015 which is a much cleaner way to handle asynchronous behaviour. Furthermore, in 2017, the async/await syntax was introduced to further simplify things.

Therefore it's advisable to scrap the use of callback functions and choose promises or async/await. 
These syntaxes make the code more readable and easier to look at the code flow and debug.
Just as an example, this is how the same code would look in callbacks vs the async/await: 

**With callbacks:**
![callback](/../../assets/best-practices/callback.png "callback")

**With Async/Await:**
![asyncawait](/../../assets/best-practices/asyncawait.png "asyncawait")
Code with async/await syntax does the exact same computation as the callback one, but is much easier to read and debug.


## Best Practice #6
**Testing, Logging & Error Handling**

**Testing**

It's quite common for newbies to overlook the importance of writing test cases for the code. However, writing test cases is as important as writing the code as it checks the validity and accuracy of the code by bringing to light even the smallest inaccuracies. 

Unit tests form the foundation of most testing setups. Here, individual units/components are tested in isolation from the rest of the code to verify their correctness. This allows your code to be validated at the (logically) lower level to ensure that each of the internal components is working accurately, as expected.

**Logging**

Logging is a crucial part of the development process as it helps track down the errors in case of failures. This helps you record your important information and analyse various aspects of it with respect to accuracy and performance metrics. It helps you manage the application better and helps in debugging. you can read more about logging in Node.js and recommended libraries **here**.

**Catching Errors**

The errors provide relevant information on what went wrong in the code and possibly where it went wrong. But instead of Node.js throwing errors, interrupt code execution or even fail sometimes, it's better if we take control by handling error conditions. We can achieve this through try/catch blocks. In such a way, we can keep things simple, stable and easier to debug as well as prevent poor user-end experience.

```javascript
try {
		if(somethingHappened)
				throw "Error Message";
} catch (err) {
		console.log(e);
} finally {
		console.log("Finally Executed" );
}
```

## Best Practice #7
**Third-party solutions: Don't Reinvent the wheel | Dont overdo either**

Node.js has a huge developer community across the world. As far as third-party support is concerned, Node’s package manager, NPM is full of feature-rich, well maintained, well documented, frameworks, libraries and tools for any use case you can imagine. It is therefore very convenient for developers to plug these existing solutions into their code and make the most of their APIs.

While these libraries and tools ease off a lot of the burden, it is important to be intelligent and responsible about every package that we import. We should be aware of the purpose, strengths and weaknesses of each package we import and ensure that we aren’t over-reliant on them.
