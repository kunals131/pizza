import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
const Product = ({pizza}) => {
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(pizza.prices[0]);
  const [quantity, setQuantity] = useState(1);
  const [extras,setExtras] = useState([]);
  // const pizza = {
  //   id: 1,
  //   img: "/img/pizza.png",
  //   name: "CAMPAGNOLA",
  //   price: [19.9, 23.9, 27.9],
  //   desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis arcu purus, rhoncus fringilla vestibulum vel, dignissim vel ante. Nulla facilisi. Nullam a urna sit amet tellus pellentesque egestas in in ante.",
  // };
  // useEffect(()=>console.log(extras), [extras]);
  const changePrice= (number)=>{
    setPrice(price+number);
  }
  const handleChange = (e,option)=>{
    const checked = e.target.checked;
    if (checked) {
      changePrice(option.price);
      setExtras([...extras, option]);
    }
    else {
      changePrice(-option.price);
      setExtras(extras.filter(ex=>(
        ex._id!==option._id
      )))
    }
    // console.log(extras);

  }
  const handleSize = (sizeIdx)=>{
    const difference = pizza.prices[sizeIdx]-pizza.prices[size];
    setSize(sizeIdx);
    changePrice(difference);

  }
  const dispatch = useDispatch();
  const handleClick = ()=>{
    dispatch(addProduct({...pizza, extras,quantity, price}));

  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map(option=>(
          <div className={styles.option} key={option._id}>
            <input
              type="checkbox"
              id={option.text}
              name={option.text}
              className={styles.checkbox}
              onChange={(e)=>handleChange(e,option)}
            />
            <label htmlFor="double">{option.text}</label>
          </div>
          ))}
         
        </div>
        <div className={styles.add}>
            <input type="number" value={quantity} onChange={(e)=>setQuantity(e.target.value)} className={styles.quantity}/>
            <button className={styles.button} onClick={handleClick}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({params})=>{
  const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);
  return {
    props : {
      pizza : res.data
    }
  }
}

export default Product;
