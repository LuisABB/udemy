export default{
    product_list: (product, variedades = []) => {
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
            galerias:product.galerias.map((galeria)=>{
                galeria.imagen = 'http://localhost:3000'+'/api/products/upload/product/'+galeria.imagen;
                return galeria;
            }),
        }
    }
}