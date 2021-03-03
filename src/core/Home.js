import React, { useState, useEffect } from 'react';
import Layout from './Layout'
import { getProducts } from './ApiCore';
import Card from './Card'
import Search from './Search'

const Home = () => {

    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            // console.log("sold", data)
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            // console.log("Arrival", data)
            // console.log(data);
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);  //[]Runs initoal render. 2..if nothing runs initial render and after every re-render, 3 [data] o initial render and on evert change render

    return (
        <Layout title="Home Page" description="Book Shop"
            className="container-fluid"
        >
            {/*layout==Menu-- jumbtron then search*/}

            <Search />
            <h2 className="mb-4">New Arrivals</h2>
            <div className="row">
                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-md-4 col-sm-12 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>
        </Layout>




    )
}
export default Home;