import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const Carrusel = ({foundation}) => {

    console.log(foundation)

    const createCarouselItemImage = (pet, i) => {

        console.log(pet)

        return (
            <div key={i} >
                <img src={`/assets/${i}.jpeg`} />
                <p className="legend">Legend {i}</p>
            </div>
        )
    }

    const baseChildren = <div>{foundation?.pets?.map(createCarouselItemImage)}</div>;

    return (
        <Carousel>{baseChildren.props.children}</Carousel>
    )
}

export default Carrusel