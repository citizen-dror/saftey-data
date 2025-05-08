import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../users/user.model';
import { UserRole } from '../users/roles';

export default class AuthService {
    async register(username: string, password: string, role: UserRole): Promise<void> {
        const user = new User({ username, password, role });
        await user.save();
    }

    async login(username: string, password: string): Promise<string> {
        const user = await User.findOne({ username });
        if (!user) throw new Error('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');

        return jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );
    }
}
