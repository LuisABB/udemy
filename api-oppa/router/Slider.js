import routerx from 'express-promise-router';
import slidercontroller from '../controllers/SliderController';
import auth from '../Middleware/auth'

import multiparty from 'connect-multiparty'
var path = multiparty({uploadDir: './upload/slider'})

const router = routerx();

//http://localhost:3000/api/user/register

router.post("/register",[auth.verifyAdmin,path],slidercontroller.register);
router.put("/update",[auth.verifyAdmin,path],slidercontroller.update);
router.get("/list", auth.verifyAdmin,slidercontroller.list);
router.delete("/remove", auth.verifyAdmin,slidercontroller.remove);

router.get("/upload/slider/:img", slidercontroller.obtener_imagen);

export default router;