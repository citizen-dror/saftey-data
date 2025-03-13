import { Router, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import { UserRole } from './roles'; 
import User from './user.model';

interface AuthRequest extends Request {
    user?: { id: string; role: UserRole };
}

const router = Router();

const userRouter = (app: Router): void => {
    app.use('/api/v1/users', router);

    router.get('/profile', auth(), async (req: AuthRequest, res: Response) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        try {
            // Fetch the user from the database based on the userId
            const user = await User.findById(req.user.id).select('username role'); // Only select necessary fields (username, role)
    
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
    
            res.json({ message: `Welcome ${user.username}, your role is ${user.role}` });
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch user data' });
        }
    });

    // Admin-only route
    router.get('/admin', auth([UserRole.ADMIN]), (req: AuthRequest, res: Response) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        res.json({ message: 'Welcome Admin!' });
    });
};

export default userRouter;
