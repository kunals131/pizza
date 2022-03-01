import React from 'react'
import styles from '../styles/Navbar.module.css';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import Link from "next/link";
const Navbar = () => {
  const quantity = useSelector(state=>state.cart.quantity);
  return (
    <div className={styles.container}>
        <div className={styles.item}>
            <div className={styles.callButton}>
                <Image src="/img/telephone.png" width={32} height={32} />
            </div>
            <div className={styles.texts}>
              <div className={styles.text}>Order Now</div>
              <div className={styles.text}>+019223232</div>
            </div>
        </div>
        <div className={styles.item}>
          <ul className={styles.list}>
            <Link href={"/"}>
            <li className={styles.listItem}>Homepage</li>
            </Link>
            <li className={styles.listItem}>Products</li>
            <li className={styles.listItem}>Menu</li>
            <Image src={"/img/logo.png"} width="160px" height="69px"></Image>
            <li className={styles.listItem}>Events</li>
            <li className={styles.listItem}>Blog</li>
            <li className={styles.listItem}>Contact</li>
          </ul>

        </div>
        <div className={styles.item}>
          <Link href="/Cart">
          <div className={styles.cart}>
          <Image src={"/img/cart.png"} width="30px" height="30px"></Image>
          <div className={styles.counter}>{quantity}</div>
          </div>
          </Link>
        </div>
    </div>
  )
}

export default Navbar