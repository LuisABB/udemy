import routerx from 'express-promise-router';
import markController from '../controllers/MarkController';
import auth from '../Middleware/auth'

import multiparty from 'connect-multiparty'
var path = multiparty({uploadDir: './upload/mark'})

const router = routerx();

//http://localhost:3000/api/user/register

router.post("/register",[auth.verifyAdmin,path],markController.register);
router.put("/update",[auth.verifyAdmin,path],markController.update);
router.get("/list", auth.verifyAdmin,markController.list);
router.delete("/remove", auth.verifyAdmin,markController.remove);
 
router.get("/upload/mark/:img", markController.obtener_imagen);

export default router;