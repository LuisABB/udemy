import routerx from 'express-promise-router';
import categoriecontroller from '../controllers/CategorieController';
import auth from '../Middleware/auth'

import multiparty from 'connect-multiparty'
var path = multiparty({uploadDir: './upload/categorie'})

const router = routerx();

//http://localhost:3000/api/user/register

router.post("/register",[auth.verifyAdmin,path],categoriecontroller.register);
router.put("/update",[auth.verifyAdmin,path],categoriecontroller.update);
router.get("/list", auth.verifyAdmin,categoriecontroller.list);
router.delete("/remove", auth.verifyAdmin,categoriecontroller.remove);

router.get("/upload/categorie/:img", categoriecontroller.obtener_imagen);

export default router;