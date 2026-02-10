import Hero from '../components/home/Hero';
import AboutSection from '../components/home/AboutSection';
import SafarisPreview from '../components/home/SafarisPreview';
import RoomsPreview from '../components/home/RoomsPreview';
import Testimonials from '../components/home/Testimonials';
import LocationMap from '../components/home/LocationMap';
import Newsletter from '../components/home/Newsletter';

const Home = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <SafarisPreview />
      <RoomsPreview />
      <Testimonials />
      <LocationMap />
      <Newsletter />
    </>
  );
};

export default Home;
