import React from "react";
import ShoplistPageView from "./shoplistPageView"
import { useDispatch, useSelector } from 'react-redux';
import { getAllItems } from "./shoplistSlice";
import { generateShoplist } from "./shoplistSlice";
import { getRecommendationList } from "../recommendation_page/recommendationPageSlice";
import { useEffect } from "react";
import {generateShoppingListPDFLink} from "../pdf/pdfgen_component"

const ShoplistPagePresenter = () =>{
  const dispatch = useDispatch();
  const allItems = useSelector(getAllItems)
  const shoplist = useSelector(getRecommendationList)

  useEffect(()=>{
    dispatch(generateShoplist(shoplist))
  },[dispatch, shoplist])

  const handleGeneratePDF = () => {
    generateShoplist(shoplist)
  }

  return(
<ShoplistPageView
allItems = {allItems}
generatePDF = {handleGeneratePDF}
/>
  )
}

export default ShoplistPagePresenter;

