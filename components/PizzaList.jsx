import React from 'react'
import PizzaCard from './PizzaCard'
import styles from '../styles/PizzaList.module.css';

const PizzaList = ({pizzaList}) => {
  return (
    <div className={styles.container}>
        <div className={styles.title}>THE BEST PIZZA IN TOWN</div>
        <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore illum aut accusantium alias eligendi quae quasi nisi maxime, repellendus dolorem, voluptatum ipsum fugit quaerat qui omnis laboriosam, quos non officia!
        </p>
        <div className={styles.wrapper}>
          {pizzaList.map(pizza=>(
            <PizzaCard key={pizza._id} pizza={pizza}></PizzaCard>
          ))}
        </div>
    </div>
  )
}

export default PizzaList