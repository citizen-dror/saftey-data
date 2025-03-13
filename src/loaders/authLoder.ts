
import auth from '../middlewares/auth';

const authLoder = async ({ app }) => {
    app.use(auth);
}
export default authLoder;