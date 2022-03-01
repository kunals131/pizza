import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/router";
import {reset} from "../redux/cartSlice";
import OrderDetail from "../components/OrderDetail";
import axios from 'axios'

const Cart = () => {
  const dispatch = useDispatch();
  const [open,setOpen] = useState(false);
  const [cash,setCash] = useState(false);
  const router = useRouter();
  const createOrder = async(data)=>{
    try {
      console.log("created!");
      const res = await axios.post('http://localhost:3000/api/orders',data);
        router.push("/orders/"+res.data._id);
        console.log("created!x");
        dispatch(reset());
   
      
    }catch(err) {
      console.log(err);
    }
  }
  
   const cart = useSelector(state=>state.cart);
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tr className={styles.trTitle}>
            <th>Product</th>
            <th>Name</th>
            <th>Extras</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
          {cart.products.map(product=>(
          <tr key={product._id} className={styles.tr}>
            <td>
              <div className={styles.imgContainer}>
                <Image
                  src={product.img}
                  layout="fill"
                  objectFit="cover"
                  alt=""
                />
              </div>
            </td>
            <td>
              <span className={styles.name}>{product.title}</span>
            </td>
            <td>
              <span className={styles.extras}>
                {product.extras.length>0?product.extras.map(ex=>(<div key={ex._id}>{ex.text}</div>)):'None'}
              </span>
            </td>
            <td>
              <span className={styles.price}>${product.price}</span>
            </td>
            <td>
              <span className={styles.quantity}>{product.quantity}</span>
            </td>
            <td>
              <span className={styles.total}>${product.price*product.quantity}</span>
            </td>
          </tr>
          ))}
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${cart.total}
          </div>
          <button className={styles.button} onClick={()=>setOpen(true)}>CHECKOUT NOW!</button>
          {open&&<div className={styles.paymentMethods}>
            <button className={styles.payButton} onClick={()=>setCash(true)}>Cash on Delivery</button>
          </div>}
          
        </div>
      </div>
      {cash&&(
        <OrderDetail total={cart.total} createOrder={createOrder}/>
      )}
    </div>
  );
};

export default Cart;
