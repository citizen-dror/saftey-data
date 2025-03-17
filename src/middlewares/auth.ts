import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../components/users/roles'; 
import { validateUserRole } from '../components/auth/authUtils';

interface AuthRequest extends Request {
    user?: { id: string; role: UserRole };
}

const auth = (roles: UserRole[] = []) => (req: AuthRequest, res: Response, next: NextFunction) => {
    const result = validateUserRole(req, roles);
    if (!result.success) {
        return res.status(403).json({ error: result.error });
    }
    next();
};

export default auth;
