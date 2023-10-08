export default{
    product_list: (product, variedades = []) => {
        var IMAGEN_TWO = "";
        let  GALERIAS = [];
        if(product.galerias && product.galerias.length > 0){
            GALERIAS = product.galerias.map((galeria)=>{
                galeria.imagen = 'http://localhost:3000'+'/api/products/upload/product/'+galeria.imagen;
                return galeria;
            });

            var VAL = Math.floor(Math.random()*3);
            IMAGEN_TWO = GALERIAS[VAL].imagen;
        }
    
        return {
            _id: product._id,
            title: product.title,
            slug: product.slug,
            sku: product.sku,
            imagen : 'http://localhost:3000'+'/api/products/upload/product/'+product.portada,
            categorie: product.categorie,
            price_usd: product.price_usd,
            price_mxn: product.price_mxn,
            stock: product.stock,
            description: product.description,
            resumen: product.resumen,
            tags: product.tags ? JSON.parse(product.tags): [],
            type_inventario: product.type_inventario,
            state: product.state,
            variedades: variedades,
            imagen_two: IMAGEN_TWO,
            galerias:GALERIAS,
        }
    }
}