
import React from "react";
import { API } from "../Config";
import { Carousel } from 'react-bootstrap';
const ShowImage = ({ item, url }) => {

    console.log(`items ${JSON.stringify(item._id)}`)
    return (

        <Carousel>
            <Carousel.Item>
                <img
                    src={`${API}/${url}/photo/${item._id}`}
                    alt={item.name}
                    className="mb-3"
                    style={{maxHeight: "100%", maxWidth: "100%"}}
                />
            </Carousel.Item>
        </Carousel>

    );
}

export default ShowImage;