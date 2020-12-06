import React from 'react';
import PageCards from './PageCards';
import Container from './Container';
import Post from './resources/Post';

function AllRealTimePost (){
    return(
<Container>
       {
         Post.map( (val, index) => {
           let content = val.content.split("<p>").join("").split("</p>")[0];
           return <PageCards key={index} title={val.title} subtitle={val.subtitle} content={content} id={index} />
         })
       }
        <button type="button" class="btn btn-primary btn-sm">Small button</button>
    </Container> 
    )
}

export  default AllRealTimePost;