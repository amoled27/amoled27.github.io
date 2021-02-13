---
path: rectjs-use-effect
date: 2021-02-12T21:02:55.506Z
title: useEffect() in ReactJs
description: useEffect() hook in Reactjs usage
---
![React useEffect](/../../assets/react-useeffect/header.png "React useEffect")

Functional components gained popularity after React team included hooks in React 16 .8 release. The react hooks facilitate developers to do state management in the formerly called stateless components i.e. functional components. Many developers have switched to react hooks approach since their introduction.

one of the important hooks is useEffect(). For those who are familiar with the class based approach of React.js, useEffect is a combination of **componentDidMount**, **componentDidUpdate** and **componentWillMount**.

**Importing hooks**
The react hooks are part of 'react' library and can be imported in the component using
```javascript
   import React, { useEffect } from "react";
```
As the name states, it's related to side effects or effects that are being carried out throughout the component. Data fetching / calling an API, setting up subscriptions and manually altering the DOM are all examples of the side effect we are talking about. 
sometimes we need to run additional code after React has finished updating DOM for eg. API requests, manual DOM mutations etc, these can be handled in this hook.


**Using Classes**

In React class components, render cannot cause side effects. So we cause side effects in **componentDidUpdate** and **componentDidMount.** let us look at the example:
```javascript
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    document.title = `clicked ${this.state.count} times`;
  }
  componentDidUpdate() {
    document.title = `clicked ${this.state.count} times`;
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```
Here we want to update the count on every render. That means I have to make the side effect on both **onMount -** first load and **onUpdate** - subsequent render of the component.
But in **useEffect** we have to call just once.


**Using useEffect hook**
```javascript
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
→ If your component needs to do something after render, that should go in the useEffect hook.
React will remember the function you passed and will call it after the DOM updates.

→ We place useEffect inside the component, this lets us access all the props and states. It makes use of javascript closures to achieve this.

→You need to be cautious about what code goes into useEffect as it is called both after first render and every subsequent update. We can control this by passing an array of dependent states as a second argument. We shall read about it later in the article.


**Effects with cleanup**
so Earlier we saw effects that don't need a cleanup, like API or DOM manipulations. However, effects such as subscription need a cleanup. But functional component does not provide a method like **componentWillUnmount** as in the case of class components.

**class component**
```javascript
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  
  componentDidMount() {
   document.body.addEventListener("click", this.onClickTest);
  }
  componentWillUnMount() {
   document.removeEventListener("click", this.onClickTest);
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```
Let's see how can we achieve the above functionality from the functional components using useEffect hook.

```javascript
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
    document.body.addEventListener("click", onClickTest);

    return () => document.body.removeEventListener("click", onClickTest);
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
→ The function returned from useEffect is optional cleanup mechanism for effects. The logic for adding and removing subscriptions can be at one place with useEffect hook.

→ React performs cleanups at component unmount. However, the useEffect hook runs after every render, thus react cleans up effects from the previous render before running effects next time.


**Optimal use of useEffect hook**

In some cases cleanup or applying effects on every render might cause performance issue. In class based components we solve it using prevState and prevProps:
example:
```javascript
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```
In useEffect hook, this comes built in. you can tell react to skip applying useEffect if values of certain states haven't changed. We can pass an array of states as a second argument to the hook.

```javascript
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // Only re-run the effect if count changes
```
If you want useEffect to run and clean it up only once each, then you can pass an empty array as a second argument.
```javascript
useEffect(() => {
  document.title = `This runs on mount`;
}, []);
```