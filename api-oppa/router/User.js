import routerx from 'express-promise-router';
import UserControllers from '../controllers/UserControllers';
import auth from '../Middleware/auth'

const router = routerx();

//http://localhost:3000/api/user/register

router.post("/register", UserControllers.register);
router.put("/update", UserControllers.update);
router.get("/list", auth.verifyAdmin,UserControllers.list);
router.post("/register_admin", auth.verifyAdmin,UserControllers.register_admin);
router.post("/login", UserControllers.login);
router.post("/login_admin", UserControllers.login_admin);
router.delete("/remove", UserControllers.remove);

export default router;