import React, { useRef, useState, useEffect } from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import hero_banner from '../../assets/hero_banner.jpg';
import second_banner from '../../assets/second_banner.jpg';
import third_banner from '../../assets/third_banner.jpg';
import fourth_banner from '../../assets/fourth_banner.jpg';
import hero_title from '../../assets/hero_title.png';
import second_title from '../../assets/second_title.png';
import third_title from '../../assets/third_title.png';
import fourth_title from '../../assets/fourth_title.png';
import play_icon from '../../assets/play_icon.png';
import TitleCards from '../../components/TitileCards/TitleCards';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const homeRef = useRef(null);
  const blockbusterRef = useRef(null);
  const onlyOnPublixRef = useRef(null);
  const upcomingRef = useRef(null);
  const topPicsRef = useRef(null);

  const carouselItems = [
    {
      image: hero_banner,
      title: hero_title,
      desc: "When the world doubts Superman’s power, Batman rises to challenge him. But as tensions erupt, a darker threat looms over them both.",
      id: '209112',
      name: "Batman VS Superman: Dawn Of Justice"
    },
    {
      image: second_banner,
      title: second_title,
      desc: "Discovering his ties to a secret ancient order, a young man embarks on a quest to save Istanbul from an immortal enemy.",
      id: '603',
      name: "The Protector"
    },
    {
      image: third_banner,
      title: third_title,
      desc: "A journalist becomes host to a deadly alien symbiote. As Venom, he fights inner demons and dangerous enemies alike.",
      id: '912649',
      name: "Venom"
    },

    {
      image: fourth_banner,
      title: fourth_title,
      desc: "A ruthless hunter sets out to prove he's the ultimate predator. His obsession turns violent, blurring the line between hero and villain.",
      id: '539972',
      name: "Kraven The Hunter"
    }

    


  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const startAutoplay = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    startAutoplay();
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
    startAutoplay();
  };

  useEffect(() => {
    startAutoplay();
    return () => clearInterval(intervalRef.current);
  }, []);

  const currentItem = carouselItems[currentIndex];

  return (
    <div className='home' ref={homeRef}>
      <Navbar 
        homeRef={homeRef}
        blockbusterRef={blockbusterRef}
        onlyOnPublixRef={onlyOnPublixRef}
        upcomingRef={upcomingRef}
        topPicsRef={topPicsRef}
      />

      <div className="hero">
        <img src={currentItem.image} alt="" className='banner-img'/>
        <div className="hero-caption">
          <img src={currentItem.title} alt="" className='caption-img'/>
          <p>{currentItem.desc}</p>
          <div className="hero-btns">
            <button
              className='btn'
              onClick={() => navigate(`/player/${currentItem.id}`, { state: { title: currentItem.name } })}
            >
              <img src={play_icon} alt="" />Play
            </button>
          </div>
        </div>

        {/* Arrows */}
        <button 
          className="carousel-arrow left" 
          onClick={prevSlide} 
          aria-label="Previous Slide"
        >
          <ChevronLeft size={30} color="#fff" />
        </button>
        <button 
          className="carousel-arrow right" 
          onClick={nextSlide} 
          aria-label="Next Slide"
        >
          <ChevronRight size={30} color="#fff" />
        </button>

        {/* Dot Indicators */}
        <div className="carousel-dots">
          {carouselItems.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => {
                setCurrentIndex(index);
                startAutoplay();
              }}
            ></span>
          ))}
        </div>
      </div>

      <div className="more-cards">
        <div ref={blockbusterRef}>
          <TitleCards title={"Blockbuster Movies"} category={"top_rated"} />
        </div>
        <div ref={onlyOnPublixRef}>
          <TitleCards title={"Only on Publix"} category={"popular"} />
        </div>
        <div ref={upcomingRef}>
          <TitleCards title={"Upcoming"} category={"upcoming"} />
        </div>
        <div ref={topPicsRef}>
          <TitleCards title={"Top Pics for You"} category={"now_playing"} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
