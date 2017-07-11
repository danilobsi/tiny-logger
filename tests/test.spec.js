const assert = require("assert")
const winston = require('winston');
const sinon = require('sinon');
const spyLogger = require('winston-spy');
const loggerLib = require("../logger")


describe("Business Logger", function () {
    it("Should log", function () {
        var spy = sinon.spy();

        const logger = loggerLib.getBusinessLogger({
            db: "mongodb://127.0.0.1"
        }, [new spyLogger({ spy: spy })])

        let testMessage = "Teste Info",
            testMeta = { info: 1 }

        logger.log('info', testMessage, testMeta);
        // assert(spy.calledOnce);
        assert(spy.calledWith('info', testMessage, testMeta));
    })

    it("Should log on a File", function () {
        var spy = sinon.spy();

        const logger = loggerLib.getLogger({
            File : {}
        }, [new spyLogger({ spy: spy })])

        let testMessage = "Teste Info",
            testMeta = { info: 1 }

        logger.log('info', testMessage, testMeta);
        // assert(spy.calledOnce);
        assert(spy.calledWith('info', testMessage, testMeta));
    })

    it("Should log with mongoDB error (db is not defined)", function () {
        var spy = sinon.spy();

        const logger = loggerLib.getBusinessLogger({}, [new spyLogger({ spy: spy })])

        let testMessage = "Teste Info",
            testMeta = { info: 1 }

        logger.log('info', testMessage, testMeta);
        // assert(spy.calledOnce);
        assert(spy.calledWith('info', testMessage, testMeta));
        assert(spy.calledWith('error', "MongoDB log configuration failure: db is not defined"));
    })

    it("Shouldn log with mongoDB error (invalid schema)", function () {
        var spy = sinon.spy();

        const logger = loggerLib.getBusinessLogger({ db: " " }, [new spyLogger({ spy: spy })])

        let testMessage = "Teste Info",
            testMeta = { info: 1 }

        logger.log('info', testMessage, testMeta);
        // assert(spy.calledOnce);
        assert(spy.calledWith('info', testMessage, testMeta));
        assert(spy.calledWith('error', "MongoDB log configuration failure: invalid schema, expected mongodb"));
    })
})

describe("App Logger", function () {
    it("Should log", function () {
        var spy = sinon.spy();

        const logger = loggerLib.getAppLogger({}, [new spyLogger({ spy: spy })])

        let testMessage = "Teste Info",
            testMeta = { info: 1 }

        logger.log('info', testMessage, testMeta)
        // assert(spy.calledOnce);
        assert(spy.calledWith('info', testMessage, testMeta))
    })
})