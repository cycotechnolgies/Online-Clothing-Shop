import Footer from "../../components/Footer.jsx"
import Header from "../../components/Header.jsx"
import CategoryPage from "../../components/CategoryPage.jsx"


const CategoryView = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
        <Header />
        <CategoryPage/>
        <Footer />
    </div>
  )
}

export default CategoryView
