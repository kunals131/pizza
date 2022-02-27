import React from 'react'
import Image from 'next/image'
import styles from '../styles/PizzaCard.module.css'
const PizzaCard = () => {
  return (
    <div className={styles.container}>
        <Image src="/img/pizza.png" alt="" width="500" height="500"/>
        <h1 className={styles.title}>FIORI DI ZuCCA</h1>
        <span className={styles.price}>$19.00</span>
        <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus nihil obcaecati nostrum quo incidunt iure aliquid consequuntur consequatur, excepturi voluptas.
        </p>
    </div>
  )
}

export default PizzaCard