import models from "../models";
import resources from "../resources";


export default{
    list:async(req,res)=>{
        try{
            let Categories = await models.Categorie.find({state:1});
            Categories = Categories.map((categorie) => {
                
                return resources.Categorie.categorie_list(categorie);
            })

            let OursProducts = await models.Product.find({state:2}).sort({"createdArt": 1});
            var ObjectOursProducts = [];
            for(const Product of OursProducts){
                let VARIEDADES = await models.Variedad.find({product: Product._id});
                ObjectOursProducts.push(resources.Product.product_list(Product, VARIEDADES));
            }

            res.status(200).json({
                categorie: Categories,
                our_products: ObjectOursProducts,
            })
        }catch(error){
            res.status(500).send({
                message: "OCURRIO ERROR"
            });
            console.log(error);
        }
    }
}