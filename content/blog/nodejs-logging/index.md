---
path: nodejs-logging
date: 2020-10-19T02:12:55.506Z
title: Best Practices for Logging in Node.js
description: logging in Node.js with Winston
---
![Logging in Node.js](/../../assets/logger/header.png "Logging in Node.js")

Let's be honest, developers do more debugging than writing the actual code. There are cases where you need to troubleshoot an issue Node.js application, logs are the saviours. They provide information about the severity of the problem, as well as insights into its root cause. Thus good logging practices are crucial for monitoring your Node.js servers, track errors, carry out different analyses and discover optimization opportunities. This article will outline best logging practices to follow when writing a Node.js application.

## 1. Choosing the correct library

Node.js developers tend to rely on the runtime's console methods ( like console.log()) to log events and provides a familiar API similar to the Javascript console mechanism in browsers. console.log() has its uses but it's not enough to use it as a logging solution in a production application. It does provide methods like console.warn(), console.error(), console.debug(), but these are mere functions that print the standard output and don't define the severity of the log. 

### Characteristics of a good logging library 
Node.js developers tend to rely on the runtime's console methods ( like console.log()) to log events and provides a familiar API similar to the Javascript console mechanism in browsers. console.log() has its uses but it's not enough to use it as a logging solution in a production application. It does provide methods like console.warn(), console.error(), console.debug(), but these are mere functions that print the standard output and don't define the severity of the log. 

### Major concerns while choosing a suitable library
**Formatting:** A library should provide proper log formatting options that help you differentiate the different logging levels, customize the colours and priorities of the levels as per need and convenience

**Storing:** It should also provide ways to configure where a developer can save logs as we talked about earlier

**Performance:** As the logger will be used throughout the codebase, it can harm your application's runtime performance, therefore it is crucial to analyse and compare the performance characteristics before choosing a library.

one of such popular libraries is Winston, which we shall talk about in this blog.

## 2. Use the Correct Log Levels
Before proceeding with understanding the log levels let us install the library first so that you can try out commands and code as we go along.

Install the library :
```sh 
npm install winston
```

Regardless of what naming system different libraries use to denote log levels, the concept remains largely the same. Here are the most commonly used log levels in decreasing order of severity: 

**FATAL:** This represents a catastrophic situation, where your application cannot recover without manual intervention.

**ERROR:** Represents an error in the system that may halt a specific operation, but not the system as a whole. This is usually used to log the errors returned by a third party API.

**WARN:** Indicates runtime conditions that are unusual but don't affect the running system in any way. 

**INFO:** This represents purely informative messages. May use to log user-driven or application-specific events. A common use of this level is to log startup or shutdown service.

**DEBUG:** Used to represent diagnostic information that may be needed for troubleshooting.

**TRACE:** Captures every possible detail about an application’s behaviour during development.

The winston library in particular uses the following log levels by default — with error being the most severe and silly being the least:

```javascript 
{
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
}
```
If you are not comfortable with default naming you can change this by initializing custom logger as per your needs in winston.

```javascript
const { createLogger, format, transports } = require('winston');

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

const logger = createLogger({
  levels: logLevels,
  transports: [new transports.Console()],
});
```
When you want to log a message you can log the desire level directly on custom logger 

```javascript
logger.info('System Started');
logger.fatal('Fatal error occuered');
```
## 3. Structural Logging
When writing log messages priority should be to make the messages easily readable to both machines and humans. One of the main goals of logging is to enable post-mortem debugging, which involves reading log entries and reconstructing the steps that led to an event in the system.

Thus human-readable and easily understandable, descriptive messages will help developers and sysadmins. It’s also important to use a structured format that is easy to parse by machines.

One of the best practices is to use JSON for logging as it is easily readable by humans as well as can be parsed by machines and can be easily converted to other formats. When logging in JSON, it’s necessary to use a standard schema so that the semantics of each field is clearly defined. This also makes it easy to find what you’re looking for when analyzing log entries.

Winston outputs a JSON string by default with two fields: message and level. Message contains text that has been logged and level states the log level. we can customize this by using winston.format.  for example you can add timestamp by combining timestamp and json.

```javascript
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console({})],
});
```

## 4. Write Descriptive Messages
The message should clearly describe the event occurred at that particular point. Each message should be unique to the situation so that developer ot system admin can differentiate and track down errors easily.

One of the bad example of log message is:
```sh
 Error Occured!!
```
Above log tells the user that error has occurred but there are no specifics of what kind of error has occurred or which place it has occurred. More descriptive message looks like:
```sh
"PUT" request to "https://example.com/api" failed. Response code: "503", response message: "Internal Server Error!". Retrying after "60" seconds.
```
From this message we know that , request to server of example.com has failed. The propbale reason is the third party server might be down for unknown reasons. 

## 5. Avoid Logging Sensitive Data
Regardless of type of application you are working on, it is always important to avoid logging sensitive information in the logs. The sensitive information includes govt ID nos., addresses, phone numbers, email ids or access tokens etc. 

## 6. Add Proper Context to your Logs
Another crucial step to keep in mind while logging is to provide the necessary context i.e. the developer should know where the log has come from or what it relates to. Context makes it possible to quickly reconstruct the actions leading up to an event.
Winston provides the ability to add global metadata (such as the component or service where an event occurred) to every generated log entry. In a complex application, this information in your logs is helpful for troubleshooting issues because it immediately directs you to the point of failure.

```javascript
const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  defaultMeta: {
    service: 'auth-service',
  },
  transports: [new transports.Console({})],
});
```
the following output will be shown
```sh
{"message":"User loggedIn successfully","level":"info","service":"auth-service","timestamp":"2020-09-29T10:56:14.651Z"}
```