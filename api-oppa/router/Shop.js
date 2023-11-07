import routerx from 'express-promise-router'
import shopController from '../controllers/ShopController.js'

const router = routerx();

router.get("/list",shopController.list);
 
export default router;