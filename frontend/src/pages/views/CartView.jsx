import React from 'react'
import Table from '../../components/Table.jsx'
import Card from '../../components/Card.jsx'
import arrow from '../../assets/l-arrow.svg'
import refresh from '../../assets/refresh.svg'
import Header from '../../components/Header.jsx'
import Footer from '../../components/Footer.jsx'

const Cartview = () => {
  return (
    <>
      <Header/>
      <div className="flex flex-col lg:flex-row lg:w-[80%] mx-auto gap-5 mt-5 px-3 mb-5">
        
        <div className="flex-1">
          <Table />  
        </div>
        <div className="w-full lg:w-[350px]">
          <Card />
        </div>
      
      </div>
      <Footer/>
    </>
  )
}

export default Cartview
