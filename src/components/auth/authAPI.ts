import { Router, Response } from 'express';
import AuthRequest from './AuthRequest';
import { UserRole } from '../users/roles';
import { validateUserRole } from './authUtils';
import AuthService from './AuthService';

const router = Router();

const authRouter = (app: Router, authService: AuthService) => {
    app.use('/api/v1/auth', router);

    router.post('/register', async (req: AuthRequest, res: Response) => {
        const { username, password, role } = req.body;

        try {
            let assignedRole = UserRole.USER;
            // Admin can Register user with admin / editor roles  
            const result = validateUserRole(req, [UserRole.ADMIN]);          
            if (result.success && (role === UserRole.ADMIN || role === UserRole.EDITOR)) {
                assignedRole = role;
            }
            await authService.register(username, password, assignedRole);
            res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    });

    router.post('/login', async (req: AuthRequest, res: Response) => {
        const { username, password } = req.body;
        try {
            const token = await authService.login(username, password);
            res.json({ token });
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    });
};

export default authRouter;