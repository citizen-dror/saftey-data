import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../components/users/roles'; 

interface AuthRequest extends Request {
    user?: { id: string; role: UserRole };
}

const auth = (roles: UserRole[] = []) => (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET as string) as AuthRequest['user'];
        req.user = decoded;

        if (roles.length && !roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

export default auth;
