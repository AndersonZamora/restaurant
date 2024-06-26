import bcrypt from 'bcryptjs';
import { db } from './';
import { User } from '../models';

export const checkUserEmailPassword = async (email: string, password: string) => {

    try {
        await db.connect();
        const user = await User.findOne({ email });
        await db.disconnect();

        if (!user) {
            return null;
        }

        if (!bcrypt.compareSync(password, user.password!)) {
            return null;
        }

        const { name, _id } = user;

        return {
            _id,
            email: email.toLocaleLowerCase(),
            name,
        }
    } catch (error) {
        return null;
    }
}
