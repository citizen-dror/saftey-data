import terminate from '../middlewares/terminate';

const terminateLoader = async ({ server }) => {
    const exitHandler = terminate(server, {
        coredump: false,
        timeout: 500
    })

    process.on('uncaughtException', exitHandler(1, 'Unexpected Error'));
    process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'));
    process.on('SIGTERM', exitHandler(0, 'SIGTERM'));
    process.on('SIGINT', exitHandler(0, 'SIGINT'));
};

export default terminateLoader;