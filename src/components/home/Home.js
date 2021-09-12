import Carousel from 'react-bootstrap/Carousel'
import "../../sass/style.scss";
import BlogPost from "../blog/BlogPost";


export default function Home() {
    return (    
            <>
            <Carousel>
                <Carousel.Item>
                    <img className="d-block w-100" src="carousel1.jpg" alt="First slide"/>
                    <Carousel.Caption>
                        <h3 className="carousel-text">VELKOMMEN TIL SOLHJERTER</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src="carousel2.jpg" alt="Second slide"/>

                    <Carousel.Caption>
                        <h3 className="carousel-text">YOGA, REHABILITERING OG GLEDE</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src="carousel3.jpg" alt="Third slide"/>

                    <Carousel.Caption>
                        <h3 className="carousel-text">MELD DEG PÅ NÅ!</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <h2 className="home-title">Rehabiliterende yoga i vakker nord-norsk natur</h2>
            <p className="home-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Aenean dignissim arcu at malesuada aliquet. 
Etiam in velit vitae est consequat dictum in eu ex. 
Nunc sagittis ultricies nulla. Donec ac magna lorem. 
Nulla sit amet vehicula magna, nec euismod nunc. 
Duis ultrices tempor metus sit amet mollis. 
Suspendisse neque ante, iaculis vel libero vel, efficitur interdum ex. 
Morbi congue maximus nulla, ac sodales eros feugiat et. 
</p>


        <a href="/courses">
            <button className="button" size="lg" block id="home-button" >
                Sjekk ut kursoversikten!
            </button>
        </a>
            <BlogPost />
            
            </>

        
    )
}
