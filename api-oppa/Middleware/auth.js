import token from "../service/token"

export default {
    verifyEcommerce: async (req,res,next) =>{
        if(!req.headers.token){
            res.status(404).send({
                message: 'No se envio el token'
            });
        }
        const response = await token.decode(req.headers.token);
        if(response){
            if(response.rol == "cliente" || response.rol == "admin"){
                next();
            }else{
                res.status(403).send({
                    message: 'NO esta permitido entrar a esta ruta'
                });
            }
        }else{
            res.status(403).send({
                message: 'El token no es valido'
            });
        }
    },
    verifyAdmin: async (req,res,next) =>{
        if(!req.headers.token){
            res.status(404).send({
                message: 'No se envio el token'
            });
        }
        const response = await token.decode(req.headers.token);
        if(response){
            if(response.rol == "admin"){
                next();
            }else{
                res.status(403).send({
                    message: 'NO esta permitido entrar a esta ruta'
                });
            }
        }else{
            res.status(403).send({
                message: 'El token no es valido'
            });
        }
    }
}