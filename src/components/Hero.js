import React from 'react';

function Hero({ title, subtitle, img }) {

    let hero_style = {
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat"
    }
    return (

        <div style={hero_style} className="overlay jumbotron jumbotron-fluid text-center blog-hero">
            <div className="container blog-hero-inner">
                <h1 className="display-4"> {title} </h1>
                <p className="lead" > {subtitle} </p>
            </div>
        </div>
    )
}




export default Hero;