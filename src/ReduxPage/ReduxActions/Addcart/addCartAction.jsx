import axios from "axios"

import { database } from "../../../Firebase/FirebaseConfig"
import { get, push, ref, update } from "firebase/database"
import { GET_DATA } from "../ActionType"


export const toget_data = (adata) => {
    return {
        type: GET_DATA,
        payload: adata
    }
}
// export const fromError = (error) => {
//     return {
//         type: ERROR_DATA,
//         payload: error
//     }
// }
// export const fromData = (data) => {
//     return {
//         type: SUCCESS_DATA,
//         payload: data
//     }
// }


export const ProductFetchedData = (data) => {
    return async (dispatch) => {

        const refer = ref(database, "addCart/cartItems");
        const product = await get(refer);

        try {
            if (product.exists()) {
                const valueOfCart = Object.entries(product.val());
                const filteringData = valueOfCart.find(
                    ([index, items]) => String(items.id) === String(data.id)
                );


                if (filteringData) {
                    const [keys, values] = filteringData;
                    const quantityPerValue = 1;
                    const productPrice = data.price;
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

                    await update(updatePort, {
                        quantity: TotalQuantity,
                        price: TotalPrice,
                    });
                    console.log('filteringDataddf', data);
                    navigate("/AddCart");
                } else {

                    await push(refer, {
                        quantity: 1,
                        ...data
                    });
                    const dataa = { quantity: 1, ...data }
                    dispatch(toget_data(dataa))

                }
            }
        } catch (error) {
            console.log(error);
        }

    }
}