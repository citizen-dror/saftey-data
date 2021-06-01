import logger from '../middlewares/logger';

function terminate(server, options = { coredump: false, timeout: 500 }) {
    // Exit function
    const exit = (code: any) => {
        options.coredump ? process.abort() : process.exit(code);
    }

    return (code, reason) => (err, promise) => {
        if (err && err instanceof Error) {
            // Log error information
            logger.error(err.message, err.stack);
        }
        logger.info("terminate");
        // Attempt a graceful shutdown
        server.close(exit);
        setTimeout(exit, options.timeout).unref();
    }
}

export default terminate
