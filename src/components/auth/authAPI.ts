import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../users/user.model';
import AuthRequest from './AuthRequest';
import { UserRole } from '../users/roles';
import { validateUserRole } from './authUtils';

const router = Router();

const authRouter = (app: Router) => {
    app.use('/api/v1/auth', router);
    // Register user
    router.post('/register', async (req: AuthRequest, res: Response) => {
        const { username, password, role } = req.body;    
        try {
            // Default role to USER if no role is provided
            let assignedRole = UserRole.USER; 
            // Admin can Register user with admin/ editor roles  
            const result = validateUserRole(req, [UserRole.ADMIN]);
            if (result.success) {
                if (role === UserRole.ADMIN || role === UserRole.EDITOR) {
                    assignedRole = role;
                }
            }            
            // Create and save the user
            const user = new User({ username, password, role: assignedRole }); 
            await user.save();
    
            res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    });

    // Login
    router.post('/login', async (req: AuthRequest, res: Response) => {
        const { username, password } = req.body;

        try {
            const user = await User.findOne({ username });
            if (!user) return res.status(400).json({ error: 'User not found' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET as string,
                { expiresIn: '1h' }
            );

            res.json({ token });
        } catch (err) {
            res.status(500).json({ error: (err as Error).message });
        }
    });
}


export default authRouter;
