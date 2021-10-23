---
path: reactjs-ref
date: 2021-07-03T01:22:55.506Z
title: Using refs in React.js
description: Conventional way to use ref in React.js
---
![React Ref](/../../assets/react-ref/header.png "React Ref")

In this article, we are going to investigate why React.js, a library that keeps your code away from DOM manipulation, keeps its doors open for you to access it. React rethinks a view as a result of a state of a component. It provides JSX, a syntactic sugar over Javascript, to design the view layer and then modifies the DOM itself rather than giving the control to the developer. 

Still, the React team provided escape routes and kept the library open for certain situations that go beyond the scope of what React is designed for.

**Creating refs**
Refs are escape routes and it's better to avoid them whenever possible. When we obtain a DOM element using ref and then later modify its attribute, we might enter into a conflict with React's diff and update approach.
Let's start with a simple component and grab a DOM element using ref, assuming that you already know how to set up a basic react app.

```javascript
import React, { useRef } from 'react'

function Button ({ label, action }) {
    // declare & initializing a reference to null
   const buttonRef = useRef(null)
   
   // attaching 'buttonRef' to the <button> element in JSX
    return (
      <button onClick={action} ref={buttonRef}>{label}</button>
    )
  }
}
```

In the above piece of code, we are using a react hook 'useRef' to create and initialize a variable called buttonRef. We then assign buttonRef to ref attribute on button JSX element.

### **Using React refs**
As we discussed earlier in this article we are declaring views based on the state, and though we are still altering the state using functions, we are not in direct control of the DOM changes. But in a few use cases, it makes sense to introduce refs in your code.

**Focus Control**
To better understand the problem statement let's storify the situation.
*Arjun is a software development intern at Doogle INC  and his manager has given him the task of creating contact forms. The manager has asked him to focus on the first input element in the form when a modal is opened* *Arjun is confused about how he can achieve this in React.js. Let's help Arjun out.*

```javascript
import React, { useState } from "react";

const InputModal = ({ close }) => {
  const [value, updateVal] = useState("");
  const onChange = (e) => {
    updateVal(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    close();
  };

  return (
    <div className="overlay">
      <div className="modal">
        <h1>Insert a new value</h1>
        <form action="?" onSubmit={onSubmit}>
          <input type="text" onChange={onChange} value={value} />
          <button>Save new value</button>
        </form>
      </div>
    </div>
  );
};

export default InputModal;
```
The first thing we need to do is to get a reference to the input.
```javascript
import React, { useState, useRef } from "react";

const InputModal = ({ close }) => {
  const [value, updateVal] = useState("");
  const inputRef = useRef(null);

  const onChange = (e) => {
    updateVal(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    close();
  };

  return (
    <div className="overlay">
      <div className="modal">
        <h1>Insert a value</h1>
        <form action="?" onSubmit={onSubmit}>
          <input type="text" onChange={onChange} value={value} ref={inputRef} />
          <button>Save</button>
        </form>
      </div>
    </div>
  );
};

export default InputModal;
```
Next, when our modal loads, we imperatively call focus on our input ref. 
```javascript
import React, { useState, useRef, useEffect } from "react";

const InputModal = ({ close }) => {
  const [value, updateVal] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onChange = (e) => {
    updateVal(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    close();
  };

  return (
    <div className="overlay">
      <div className="modal">
        <h1>Insert a value</h1>
        <form action="?" onSubmit={onSubmit}>
          <input type="text" onChange={onChange} value={value} ref={inputRef} />
          <button>Save</button>
        </form>
      </div>
    </div>
  );
};

export default InputModal;
```
**Note**: You need to access the element through the current property of the ref you declare.

[**Follow this link**](https://codesandbox.io/s/distracted-grothendieck-z9lun?file=/src/InputModal.js:0-709) to check the working code. Try commenting out inputRef implementation and see how the input focus changes with and without ref.


**Detect if an element is contained** 
Similarly, we would want to take an action in the app when an event is dispatched. Like close the modal when the user clicks outside of it.

```javascript
import React, { useState, useRef, useEffect } from "react";

const InputModal = ({ close }) => {
  const [value, updateVal] = useState("");
  const inputRef = useRef(null);
  const modalRef = useRef(null);

  const onClickOverlay = (e) => {
    const overlay = e.target;
    if (modalRef.current && !modalRef.current.contains(overlay)) {
      e.preventDefault();
      e.stopPropagation();
      close();
    }
  };
  useEffect(() => {
    inputRef.current.focus();
    document.body.addEventListener("click", onClickOverlay);
  }, []);

  const onChange = (e) => {
    updateVal(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    close();
  };

  return (
    <div className="overlay">
      <div className="modal" ref={modalRef}>
        <h1>Insert a value</h1>
        <form action="?" onSubmit={onSubmit}>
          <input type="text" onChange={onChange} value={value} ref={inputRef} />
          <button>Save</button>
        </form>
      </div>
    </div>
  );
};

export default InputModal;
```
Here, we are checking if the user click is out of the modal ref limit. If it is we are calling close() function from props to close the modal.

**Integrating DOM-based libraries**
Like React there are other utilities and libraries outside its ecosystem that have been in use for years. To use such libraries refs come in handy.
GreenSock library is a popular choice for animation examples. To use it, we need to send a DOM element to any of its methods.
Let’s go back to our modal and add some animation:

```javascript
import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const InputModal = ({ close }) => {
  const [value, updateVal] = useState("");

  const inputRef = useRef(null);
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  const onComplete = () => {
    inputRef.current.focus();
  };
  const gaspTimeline = gsap.timeline({ paused: true, onComplete });

  const onClickOverlay = (e) => {
    const overlay = e.target;
    if (modalRef.current && !modalRef.current.contains(overlay)) {
      e.preventDefault();
      e.stopPropagation();
      close();
    }
  };
  useEffect(() => {
    //timeline - gasp
    gaspTimeline
      .from(overlayRef.current, {
        duration: 0.25,
        autoAlpha: 0
      })
      .from(modalRef.current, {
        duration: 0.25,
        autoAlpha: 0,
        y: 25
      });

    gaspTimeline.play();

    document.body.addEventListener("click", onClickOverlay);
  }, []);

  const onChange = (e) => {
    updateVal(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    close();
  };

  return (
    <div className="overlay" ref={overlayRef}>
      <div className="modal" ref={modalRef}>
        <h1>Insert a value</h1>
        <form action="?" onSubmit={onSubmit}>
          <input type="text" onChange={onChange} value={value} ref={inputRef} />
          <button>Save</button>
        </form>
      </div>
    </div>
  );
};

export default InputModal;
```
[**Here is the working Demo **](https://codesandbox.io/s/twilight-cherry-sxgec?file=/src/InputModal.js)


**Forwarding Refs**
Refs are useful for specific actions. The examples shown are a little simpler than what we usually find in a real-life web application. We need to deal with complex components and we barely use plain HTML elements directly. It's common to use a ref from one component in another component.
```javascript
import React from 'react'

const LabelledInput = (props) => {
  const { id, label, value, onChange } = props

  return (
    <div class="labelled--input">
      <label for={id}>{label}</label>
      <input id={id} onChange={onChange} value={value} />
    </div>
  )
}

export default LabelledInput
```
The issue now is that passing a ref to this component will return its instance, a React component reference, and not the input element we want to focus on like in our first example.
React provides **forwardRef**, which allows you to define internally what element the ref will point at.

```javascript
import React from 'react'

const LabelledInput = (props, ref) => {
  const { id, label, value, onChange } = props

  return (
    <div class="labelled--input">
      <label for={id}>{label}</label>
      <input id={id} onChange={onChange} value={value} ref={ref}/>
    </div>
  )
}

export default React.forwardRef(LabelledInput)
```
Now, when a parent component passes a ref value, it’s going to obtain the input, which is helpful to avoid exposing the internals and properties of a component and breaking its encapsulation.