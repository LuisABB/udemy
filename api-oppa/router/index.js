import routerx from "express-promise-router";
import Categorie from "./Categorie";
import User from "./User"
import Product from "./Product";
import Slider from "./Slider";
import Home from "./Home"
import Mark from "./Mark";
import Shop from "./Shop"
import Cart from "./Cart";

const router = routerx();
router.use('/users',User);
router.use('/categories',Categorie);
router.use('/products',Product);
router.use('/sliders',Slider);
router.use('/marks',Mark);
router.use('/home',Home);
router.use('/shop',Shop); 
router.use('/cart',Cart)

export default router;