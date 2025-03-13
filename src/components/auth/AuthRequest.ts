import { Request } from 'express';

export default interface AuthRequest extends Request {
    body: {
        username: string;
        password: string;
        role?: string;
    };
}
