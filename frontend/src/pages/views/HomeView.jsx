import Categories from "../../components/Categories.jsx"
import Footer from "../../components/Footer.jsx"
import Header from "../../components/Header.jsx"
import HeroCarousel from "../../components/HeroCarousel.jsx"
import FeaturedProducts from "../../components/FeaturedProducts"


const HomeView = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
            <HeroCarousel />
            <FeaturedProducts/>
            <Categories />
      <Footer />
    </div>
  )
}

export default HomeView
