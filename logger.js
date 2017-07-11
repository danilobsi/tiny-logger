const winston = require("winston")
const WinstonGraylog2 = require("winston-graylog2")
const url = require("url")

require("winston-mongodb").MongoDB
//const path = require("path")
// const logDirectory = path.join(__dirname, 'log');

function getLogger(options = {}, otherTransports = []) {
    var transportTypes = []
    var validationErrors = []

    otherTransports.forEach((item) => transportTypes.push(item))

    if (!options.Console)
        options.Console = {
            //timestamp: tsFormat,
            colorize: true
        }
    transportTypes.push(
        new winston.transports.Console(options.Console)
    )

    if (options.MongoDB) {
        if (!options.MongoDB.db)
            validationErrors.push("MongoDB log configuration failure: db is not defined")
        else {
            const result = url.parse(options.MongoDB.db, true)
            if (result.protocol != 'mongodb:')
                validationErrors.push("MongoDB log configuration failure: invalid schema, expected mongodb")
            else
                transportTypes.push(
                    new winston.transports.MongoDB(options.MongoDB)
                )
        }
    }

    if (options.Graylog) {
        transportTypes.push(new WinstonGraylog2(options.GrayLog))
    }

    if (options.File) {
        if (!options.File.filename)
            options.File.filename = "log"

        transportTypes.push(
            new winston.transports.File(options.File)
        )
    }

    var logger = new winston.Logger({
        transports: transportTypes
    })

    validationErrors.forEach((el) => logger.error(el))

    return logger
}

function getBusinessLogger(mongoDBOptions, otherTransports = []) {
    return getLogger({
        MongoDB: mongoDBOptions
    }, otherTransports)
}

function getAppLogger(graylogOptions, otherTransports = []) {
    return getLogger({
        Graylog: graylogOptions
    }, otherTransports)
}

module.exports = {
    getLogger: getLogger,
    getAppLogger: getAppLogger,
    getBusinessLogger: getBusinessLogger
}
