import models from "../models";
import resources from "../resources";

export default {
    list:async(req, res)=>{
        try{
            let user_id = req.query.user_id;
            let CARTS = await models.Cart.find({
                user: user_id,
            }).populate("variedad").populate({
                path: "product",
                populate:{
                    path:"categorie"
                },
            });

            CARTS = CARTS.map((cart)=>{
                return resources.Cart.cart_list(cart);
            });

            res.status(200).json({
                carts: CARTS,
            })
        }catch(error){
            res.status(500).send({
                message:"OCURRIO UN ERROR",
            });
            console.log(error);
        }
    },
    register:async(req, res)=>{
        //Primero vamos a validar si el producto existe en el carrito
        try{
            let data = req.body;
            if(data.variedad){
                let valid_cart = await models.Cart.findOne({
                    user: data.user,
                    variedad: data.variedad,
                    product: data.product,
                });
                if(valid_cart){
                    res.status(200).json({
                        message: 403,
                        message_text:"EL PRODUCTO CON LA VARIDAD YA EXISTE EN EL CARRITO DE COMPRA",
                    })
                    return;
                }
            }else{
                console.log("eNTRO AQUI");
                let valid_cart = await models.Cart.findOne({
                    user: data.user,
                    product: data.product,
                });
                if(valid_cart){
                    res.status(200).json({
                        message: 403,
                        message_text:"EL PRODUCTO YA EXISTE EN EL CARRITO DE COMPRA",
                    })
                    return;
                }
            }
            //Despues se valida si el stock esta disponible

            if(data.variedad){
                let valid_variedad = await models.Variedad.findOne({
                    _id: data.variedad,
                });
                if(valid_variedad.stock < data.cantidad){
                    res.status(200).json({
                        message:403,
                        message_text:"El stock no esta disponible",
                    });
                    return;
                }
            }else{
                console.log("VALIDA STOCK");
                let valid_product = await models.Product.findOne({
                    user: data.user,
                    product: data.product,
                });
                if(valid_product.stock < data.cantidad){
                    console.log(valid_product.stock+"<"+data.cantidad);
                    res.status(200).json({
                        message:403,
                        message_text:"El stock no esta disponible",
                    });
                    return;
                }
            }

            let CART = await models.Cart.create(data);

            res.status(200).json({
                cart: CART,
                message_text:"EL CARRITO SE HA REGISTRADO CON EXITO",
            })

        }catch(error){
            res.status(500).send({
                message:"OCURRIO UN ERROR",
            });
            console.log(error);
        }
    },
    update:async(req, res)=>{
        try{
            let data = req.body;

            //Despues se valida si el stock esta disponible

            if(data.variedad){
                let valid_variedad = await models.Variedad.findOne({
                    id_: data.variedad,
                });
                if(valid_variedad.stock < data.cantidad){
                    res.status(200).json({
                        message:403,
                        message_text:"El stock no esta disponible",
                    });
                    console.log(error);
                    return;
                }
            }else{
                let valid_product = await models.Product.findOne({
                    user: data.user,
                    product: data.product,
                });
                if(valid_product.stock < data.cantidad){
                    res.status(200).json({
                        message:403,
                        message_text:"El stock no esta disponible",
                    });
                    console.log(error);
                    return;
                }
            }

            let CART = await models.Cart.findByIdAndUpdate({_id: data._id},data);

            res.status(200).json({
                cart: CART,
                message_text:"El carrito se actualizo con exito",
            })
        }catch(error){
            res.status(500).send({
                message:"OCURRIO UN ERROR",
            });
            console.log(error);
        }
    },
    delete:async(req, res)=>{
        try{
            let _id = req.params.id;
            let CART = await models.Cart.findByIdAndDelete({_id:_id});
            res.status(200).json({
                message_text:"EL CARRITO SE HA ELIMINADO CON EXITO",
            });
        }catch(error){
            res.status(500).send({
                message:"OCURRIO UN ERROR",
            });
            console.log(error);
        }
    },
    
}