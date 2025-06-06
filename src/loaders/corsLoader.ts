import cors from 'cors';

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) {
            // Allow requests with no origin (like same host, mobile apps or server-to-server)
            return callback(null, true);
        }
        if (
            /^http:\/\/localhost:\d+$/.test(origin) || // Allow localhost with any port
            origin === 'https://safety-data.herokuapp.com' || origin === 'https://safety-data.anyway.co.il' // Allow specific origin
          ) {
            callback(null, true);  // Accept the request
        } else {
            callback(new Error(`Not allowed by CORS origin: ${origin}`));  // Reject the request
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,  // Allow credentials (cookies, auth headers) if needed
};

const corsLoder = async ({ app }) => {
    app.use(cors(corsOptions));
};

export default corsLoder;