import React, { createContext, useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { database } from "../Firebase/FirebaseConfig";
import { get, push, ref, set, update } from "firebase/database";
import { useDispatch } from "react-redux";
import { DataStored } from "../ReduxPage/ReduxActions/Slicer";

export const FetchableContext = createContext(null);

const Context = ({ children }) => {
  const [shoppingData, setShoppingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cartItem, setCartItem] = useState([]);
  const [addCart, setAddCart] = useState([]);
  const [totalArray, setTotalArray] = useState(null);

  const dispatch = useDispatch()
  const navigate = useNavigate();
  async function FetchData() {
    setLoading(true);
    try {
      const response = await fetch("https://dummyjson.com/products", {
        timeout: 5000,
      });
      if (!response.ok) throw new Error(response.statusText);
      const result = await response.json();
      if (result) {
        setShoppingData(result);
        setError(null);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  }

  // const GetFireDatabase = async () => {
  //   const db = database;

  //   try {
  //     const refer = ref(db, "addCart/cartItems");
  //     const getuser = get(refer);
  //     if ((await getuser).exists()) {
  //       const forFilter = Object.values((await getuser).val());
  //       const filteringData = forFilter.find(
  //         (filterer) => filterer.id === formData.phone
  //       );

  //       if (filteringData) {
  //         const newDoc = ref(database, "addCart/cartItems")
  //         localStorage.setItem("acNumber", JSON.stringify(acNumber));

  //         set(newDoc, {
  //           Ac_number: acNumber,

  //           balance: Number(bal.toFixed(2)),
  //           ...formData,
  //           phone: Number(formData.phone),
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  async function handleNavigate(getProductItem) {
    const refer = ref(database, "addCart/cartItems");
    const product = await get(refer);
    try {
      if (product.exists()) {
        const valueOfCart = Object.entries(product.val());
        const filteringData = valueOfCart.find(
          ([index, items]) => String(items.id) === String(getProductItem.id)
        );

        if (filteringData) {
          const [keys, values] = filteringData;
          const quantityPerValue = 1;
          const productPrice = getProductItem.price;
          const updatePort = ref(database, `addCart/cartItems/${keys}`);
          const ArrayQuantity = [
            Number(values.quantity),
            Number(quantityPerValue),
          ];
          const ArrayPrice = [Number(values.price), Number(productPrice)];

          const TotalQuantity = ArrayQuantity.reduce(
            (arr, curr) => arr + curr,
            0
          );

          const TotalPrice = ArrayPrice.reduce((arr, curr) => arr + curr, 0);
          const addCartArray = [TotalPrice, TotalQuantity];

          setTotalArray(addCartArray);


          await update(updatePort, {
            quantity: TotalQuantity,
            price: TotalPrice,
          });

        } else {
          console.log("filteringData", filteringData);
          const pusherItems = await push(refer, {
            quantity: 1,
            ...getProductItem,
          });
          if (pusherItems) {
            dispatch(DataStored(pusherItems))
          }
        }

        console.log("getProductItem.id", getProductItem.id);

        setCartItem(getProductItem);
        // console.log(getProductItem);

        navigate("/AddCart");
      }
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    let isMounted = true;
    const getDataFromFirebase = async () => {
      const refTransactionData = ref(database, "addCart/cartItems");
      const getItem = await get(refTransactionData);
      try {
        if (getItem.exists()) {
          const objTransactionData = Object.values(getItem.val());

          setAddCart(objTransactionData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDataFromFirebase();
    return () => {
      isMounted = false; // Cleanup function
    };
  }, []);

  useEffect(() => {

    dispatch(DataStored(addCart))
  }, [DataStored, addCart, dispatch]);


  return (
    <FetchableContext.Provider
      value={{
        setShoppingData,
        shoppingData,
        setLoading,
        loading,
        setError,
        error,
        handleNavigate,
        cartItem,
        addCart,
        totalArray,
      }}
    >
      {children}
    </FetchableContext.Provider>
  );
};

export default Context;
