import Categories from "../../components/Categories.jsx"
import Footer from "../../components/Footer.jsx"
import Header from "../../components/Header.jsx"

import FeaturedProducts from "../../components/FeaturedProducts"
import HeroCarousel from "../../components/HeroCarousel.jsx"


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
