import React from 'react'
import { useDispatch, useSelector } from "react-redux";

const SingularPet = () => {
  const infoView = useSelector((state)=>state.id)
  console.log(infoView)
  return (
    <>
        
    </>
  )
}

export default SingularPet