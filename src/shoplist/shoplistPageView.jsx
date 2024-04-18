import React from 'react'

const ShoplistPageView = (props) => {
  const renderIngr = ()=>{
    return props.allItems.map((ingre)=>{
      return(<div>
        {ingre.name}
      </div>)
    })
  }
  return (
    <div>
      {renderIngr()}
    </div>
  )
}

export default ShoplistPageView