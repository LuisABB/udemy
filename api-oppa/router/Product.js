import routerx from 'express-promise-router'
import productController from '../controllers/ProductController'
import variedadController from '../controllers/VariedadController'
import auth from '../Middleware/auth'

import multiparty from 'connect-multiparty'
var path = multiparty({uploadDir: './upload/product'})
const router = routerx();
//http://localhost:3000/api/user/register

router.post("/register",[auth.verifyAdmin,path],productController.register);
router.post("/register_imagen",[auth.verifyAdmin,path],productController.register_imagen);
router.post("/remove_imagen",[auth.verifyAdmin,path],productController.remove_imagen);

router.put("/update",[auth.verifyAdmin,path],productController.update);
router.get("/list", auth.verifyAdmin,productController.list);
router.delete("/delete", auth.verifyAdmin,productController.remove);

router.get("/upload/product/:img", productController.obtener_imagen);
router.get("/show/:id", productController.show);

//Variedad
router.post("/register-variedad",[auth.verifyAdmin,path],variedadController.register);
router.put("/update-variedad",[auth.verifyAdmin,path],variedadController.update);
router.delete("/delete-variedad/:id",[auth.verifyAdmin,path],variedadController.delete);

export default router;