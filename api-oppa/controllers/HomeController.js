import models from "../models";
import resources from "../resources";


export default{
    list:async(req,res)=>{
        try{
            let Sliders = await models.Slider.find({state:1});
            
            Sliders = Sliders.map((slider) => {
                return resources.Slider.slider_list(slider);
            })

            let Categories = await models.Categorie.find({state:1});
            Categories = Categories.map((categorie) => {
                
                return resources.Categorie.categorie_list(categorie);
            })

            let BestProducts = await models.Product.find({state:2}).sort({"createdArt": -1});
            var ObjectBestProductos = [];
            for(const Product of BestProducts){
                let VARIEDADES = await models.Variedad.find({product: Product._id});
                ObjectBestProductos.push(resources.Product.product_list(Product, VARIEDADES));
            }

            let OursProducts = await models.Product.find({state:2}).sort({"createdArt": 1});
            var ObjectOursProducts = [];
            for(const Product of OursProducts){
                let VARIEDADES = await models.Variedad.find({product: Product._id});
                ObjectOursProducts.push(resources.Product.product_list(Product, VARIEDADES));
            }


            let Marks = await models.Mark.find({state:1});
            Marks = Marks.map((mark) => {
                return resources.Mark.mark_list(mark);
            })

            


            res.status(200).json({
                sliders: Sliders,
                categorie: Categories,
                best_products: ObjectBestProductos,
                our_products: ObjectOursProducts,
                marks: Marks,
            })
        }catch(error){
            res.status(500).send({
                message: "OCURRIO ERROR"
            });
            console.log(error);
        }
    },

    show_landing_product:async(req,res)=>{
        try{
            let SLUG = req.params.slug;
            
            let Product = await models.Product.findOne({slug: SLUG,state:2});

            let VARIEDADES = await models.Variedad.find({product: Product._id});

            let RelatedProducts = await models.Product.find({categorie: Product.categorie,state:2});
            var ObjectRelatedProducts = [];
            for(const Product of RelatedProducts){
                let VARIEDADES = await models.Variedad.find({product: Product._id});
                ObjectRelatedProducts.push(resources.Product.product_list(Product, VARIEDADES));
            }

            res.status(200).json({
                product: resources.Product.product_list(Product, VARIEDADES),
                related_products: ObjectRelatedProducts,
            })

        }catch(error){
            res.status(500).send({
                message: "OCURRIO ERROR"
            });
            console.log(error);
        }
    },
}