import React, { useState } from 'react'
import Image from 'next/image'
import styles from '../styles/Featured.module.css';
const Featured = () => {
    const [index,setIndex] = useState(0) 
    const images = [
        '/img/featured2.png',
        '/img/featured3.png',
        '/img/featured.png',
    ]
    const handleArrow = (direction)=>{
        if (direction==="l") {
            setIndex(index!==0?index-1:2);
        }
        else {
            setIndex(index!==2?index+1:0);
        }
        console.log(index);
    }
  return (
    <div className={styles.container}>
        <div className={styles.arrowContainer} style={{left:0}} onClick={()=>handleArrow("l")}>

        <Image src="/img/arrowl.png" layout='fill' objectFit='contain'></Image>
        </div>
        <div className={styles.wrapper} style={{transform : `translateX(${-100*index}vw)`}}>
            <div className={styles.imgContainer}>
                {images.map((img, idx)=>(
                    <Image src={img} key={idx} layout='fill' objectFit='contain'></Image>
                ))}
            </div>
        </div>
        <div className={styles.arrowContainer} style={{right : 0    }} onClick={()=>handleArrow("r")}>
        <Image src="/img/arrowr.png" objectFit='contain' layout='fill'></Image>
</div>
    </div>
  )
}

export default Featured