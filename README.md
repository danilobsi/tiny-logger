# tiny-logger
An easy-to-use logger to implement on your app. It implements winston logger.

## Example
```nodejs
const logger = require("../logger").getLogger({})

logger.info("Hi there, my first log!")
```