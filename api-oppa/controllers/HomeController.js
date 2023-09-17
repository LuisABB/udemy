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

            res.status(200).json({
                sliders: Sliders,
                categorie: Categories,
            })
        }catch(error){
            res.status(500).send({
                message: "OCURRIO ERROR"
            });
            console.log(error);
        }
    }
}