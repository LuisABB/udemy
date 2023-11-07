export default{
    cart_list: (cart = []) => {
        return {
            user:cart.user,
            product:{
                _id: cart._id,
                title: cart.title,
                slug: cart.slug,
                sku: cart.sku,
                imagen : 'http://localhost:3000'+'/api/products/upload/product/'+cart.portada,
                categorie: cart.categorie,
                price_usd: cart.price_usd,
                price_mxn: cart.price_mxn,
            },
            type_discount: cart.type_discount,
            discount: cart.discount,
            cantidad: cart.cantidad,
            variedad: cart.variedad,
            code_cupon: cart.code_cupon,
            code_discount: cart.code_discount,
            price_unitario: cart.price_unitario,
            subtotal: cart.subtotal,
            total: cart.total,
            
        }
    }
}