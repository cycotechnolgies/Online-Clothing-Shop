import React from 'react'
import Table from '../../components/Table.jsx'
import Card from '../../components/Card.jsx'
import arrow from '../../assets/l-arrow.svg'
import refresh from '../../assets/refresh.svg'

const Cartview = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row lg:w-[80%] mx-auto gap-5 mt-5 px-3">
        
        <div className="flex-1">
          <Table />  
        </div>
        <div className="w-full lg:w-[350px]">
          <Card />
        </div>
      
      </div>
    </>
  )
}

export default Cartview
