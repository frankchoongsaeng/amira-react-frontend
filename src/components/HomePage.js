import React from 'react';
import Hero from './Hero';
import Post from './Post';
import NavBar from './NavBar';

import heroImage from './aisyncdada.jpg';

function HomePage() {
   return (
      <div>
         <NavBar />
          <Hero img={heroImage} title="AiSyncData" subtitle="We monitor for youv at real time"/>
          <Post />
      </div>
   );
}


export default HomePage;