# w-tiny-logger
An easy-to-use logger to implement on your NodeJs App. It implements winston logger.

## Example

```javascript
const logger = require("w-tiny-logger").getLogger()

logger.info("Hi there, my first log!")
```

This example will just log on your console.

## File Logging
If you want to log information on a log file, you can try the next example: 
```javascript
const logger = require("w-tiny-logger").getLogger({
    File: {}
})

logger.info("Hi there, my first file log!")
```

## Metadata
You can log string messages, or maybe JSON metadata objects.
```javascript
const logger = require("w-tiny-logger").getLogger({})

logger.info("Logging my JSON!", { myObject: "This is my JSON Metadata object" })
logger.warn("Logging my JSON!", { whatever: "This is my warn" })
```

## Logging Levels
You can use different levels for logging.
```javascript
const logger = require("w-tiny-logger").getLogger({})

logger.log('info', "Info log");
logger.log('warn', "Warn log");
logger.log('error', "Error log");
logger.info("Info log by method call");
logger.warn("Warn log by method call");
logger.error("Error log by method call");
```

## Other Transports and Multiple Transports
It´s possible to use MongoDB or Graylog aswell. Or maybe you want to use all of them together.
```javascript
const logger = require("w-tiny-logger").getLogger({
    File: {
        filename: "MyLog" //optional
    },
    MongoDB: { db: "mongodb://127.0.0.1"},
    Graylog: {}
})

logger.info("Using many transports at the same time!")
```

It´s default the use of the Console Transport, but any other is optional.

## Other Considerations
This module is an implementation of the [Winston Logger Library](https://www.npmjs.com/package/winston), using some of the basic transports available for the library, like [Winston Graylog2](https://github.com/namshi/winston-graylog2) and and [Winston MongoDB](https://github.com/winstonjs/winston-mongodb).

You can find more information about the options for each transport on the authors library.

## Full Example
It´s possible to implement other transports, just like using winston.

```javascript
const assert = require("assert")
const winston = require('winston');
const sinon = require('sinon');
const spyLogger = require('winston-spy');

const spy = sinon.spy();

const logger = require("w-tiny-logger").getLogger({
    File: {
        filename: "MyLog" //optional
    },
    MongoDB: { 
        level: 'info',
        silent: false,
        db: "mongodb://127.0.0.1",
        options: { poolSize: 2, autoReconnect: true },
        collection: 'log',
        storeHost: false,
        username: '',
        password: '',
        label: '',
        name: '',
        capped: false,
        cappedSize: 10000000,
        cappedMax: 10000000,
        tryReconnect: false,
        decolorize: false,
        expireAfterSeconds: 10000
    },
    Graylog: {
        name: 'Graylog',
        level: 'debug',
        silent: false,
        handleExceptions: false,
        prelog: function(msg) {
            return msg.trim();
        },
        graylog: {
            servers: [{host: 'localhost', port: 12201}, {host: 'remote.host', port: 12201}],
            hostname: 'myServer',
            facility: 'myAwesomeApp',
            bufferSize: 1400
        },
        staticMeta: {env: 'staging'}
    }
}, [new spyLogger({ spy: spy })])

let message = "Using many transports at the same time!"
logger.info(message)

assert(spy.calledWith('info', message));
```