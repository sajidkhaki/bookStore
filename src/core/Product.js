import React, { useState, useEffect } from 'react';
import Layout from './Layout'
import { read } from './ApiCore';
import Card from './Card'

const Product = props => {
     console.log("Params", props.match.params.productId)
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            console.log("data of single product", data)
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props])


    return (
        <Layout
            title={product && product.name}
            description={product && product.description && product.description.substring(0, 100)}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-8">
                    {product && product.description &&
                    <Card product={product} showViewProductButton={false} />}
                </div>
            </div>
        </Layout>
    )
}
export default Product