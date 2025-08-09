import Footer from "../../components/Footer.jsx"
import Header from "../../components/Header.jsx"
import FeaturedProducts from "../../components/FeaturedProducts"


const HomeView = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <FeaturedProducts/>
       <Footer />
    </div>
  )
}

export default HomeView
