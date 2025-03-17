import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../users/roles'; 

interface AuthRequest extends Request {
    user?: { id: string; role: UserRole };
}

export const hasRole = (userRole: UserRole, allowedRoles: UserRole[]): boolean => {
    return allowedRoles.includes(userRole);
};

export const validateUserRole = (req: AuthRequest, roles: UserRole[]): { success: boolean; error?: string } => {
    const token = req.header('Authorization');
    if (!token) {
        return { success: false, error: 'Access denied' };
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET as string) as AuthRequest['user'];
        req.user = decoded;
        if (roles.length && !hasRole(req.user.role, roles)) {
            return { success: false, error: 'Forbidden' };
        }
        return { success: true };
    } catch {
        return { success: false, error: 'Invalid token' };
    }
};
