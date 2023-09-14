import Image, { StaticImageData } from 'next/image'
import React from 'react'

const ProductCard = (props:{title:string,price:number,img:StaticImageData}) => {
  return (
    <div className='hover:scale-110 duration-500'><Image src = {props.img} alt={"Dress"} height={400} width={400}/>
    <h3 className="mt-2 font-bold text-lg">{props.title}</h3>
    <p className="font-bold text-lg">${props.price}</p>
</div>
  )
}

export default ProductCard