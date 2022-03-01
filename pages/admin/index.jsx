import React, {useState} from 'react'
import styles from '../../styles/Admin.module.css'
import Image from 'next/image'
import axios from 'axios'
const Admin = ({orders,products}) => {
  const [pizzaList,setPizzaList] = useState(products);
  const [orderList,setOrderList] = useState(orders);
  const handleDelete = async (id)=>{
    try {
      const res = await axios.delete("http://localhost:3000/api/products/"+id);
      setPizzaList(pizzaList.filter(pizz=>(pizz._id!==id)))
    }
    catch(err) {
      console.log(err);
    }
  }
  const handleStatus = async(id)=>{
    const item = orderList.filter(order=>order._id===id)[0];
    try {
      const res = await axios.put("http://localhost:3000/api/orders/"+id, {status : item.status+1});
      setOrderList(orderList.map(o=>(
        o._id==id?{...o,status : item.status+1}:o
      )))

    }catch(err) {
      console.log(err)
    }
  }
  const status = ["preparing", "on the way", "delivered"]
  return (
    <div className={styles.container}>
        <div className={styles.item}>
            <h1 className={styles.title}>Products</h1>
            <table>
            <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {pizzaList.map(product=>(
          <tbody key={product._id}>
              <tr className={styles.trTitle}>
                  <td>
                      <Image
                      src={product.img}
                      width={50}
                      height={50}
                      objectFit="cover"
                      alt=""
                      />
                  </td>
                  <td>{product._id.slice(0,5)}...</td>
                  <td>{product.title}</td>
                  <td>{product.prices[0]}</td>
                  <td>
                    <button className={styles.button}>Edit</button>
                    <button className={styles.button} onClick={()=>handleDelete(product._id)}>Delete</button>
                  </td>
              </tr>
          </tbody>
            )) }
            </table>
        </div>
        <div className={styles.item}>
        
        <table>
        <h1 className={styles.orders}>Products</h1>
            <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment Method</th>
              <th>status</th>
              <th>action</th>
            </tr>
          </tbody>
          {orderList.map(order=>(
          <tbody key={order._id}>
              <tr className={styles.trTitle}>
                  <td>{order._id.slice(0,5)}...</td>
                  <td>{order.customer}</td>
                  <td>{order.total}</td>
                  <td>{(order.method===0)?(<span>Cash</span>):"Paypal"}</td>
                  <td>{status[order.status]}</td>
                  <td>
                    <button onClick={()=>handleStatus(order._id)} className={""}>Next Stage</button>
                  </td>
              </tr>
          </tbody>
          ))}
            </table>
        </div>

    </div>
  )
}

export const getServerSideProps = async(ctx)=>{
  const myCookie = ctx.req?.cookies||"";
  if (myCookie.token!==process.env.TOKEN) {
    return {
      redirect: {
        destination : "/admin/login",
        permanent : false
      }
    }
  }
  const productRes = await axios.get("http://localhost:3000/api/products")
  const orderRes = await axios.get("http://localhost:3000/api/orders")

  return {
    props : {
      orders : orderRes.data,
      products : productRes.data
    }
  }
}

export default Admin