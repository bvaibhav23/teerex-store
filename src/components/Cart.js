import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import QuantityManager from "./QuantityManager";
import { deleteFromCart } from "../store/cartSlice";

const Cart = () => {
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    let [total, setTotal] = useState(Number(0));
    useEffect(() => {
        let sum = 0;
        cartItems.map(
            (val) => (sum += Number(val.price) * Number(val.quantityInCart))
        );
        setTotal(sum);
    }, [cartItems]);
    return (
        <>
            {cartItems.length === 0 && (
                <h1 className="container text-center mt-5 shadow p-2 ">Empty Cart</h1>
            )}
            {cartItems.length > 0 && (
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col"></th>
                                <th scope="col">Name</th>
                                <th scope="col">Color</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((val, index) => (
                                <tr key={val.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>
                                        <img
                                            src={val.imageURL}
                                            style={{ width: "5rem", height: "7rem" }}
                                            alt=""
                                        />
                                    </td>
                                    <td className="pt-3">
                                        <p className="d-flex flex-column fw-bold">{val.name}</p>
                                    </td>
                                    <td className="pt-3">
                                        <div
                                            style={{
                                                backgroundColor: `${val.color}`,
                                                width: "2rem",
                                                height: "2rem"
                                            }}
                                        ></div>
                                    </td>
                                    <td className="pt-3">
                                        <p>{`${val.price} * ${val.quantityInCart}`}</p>
                                    </td>
                                    <td>
                                        <QuantityManager val={val} />
                                    </td>
                                    <td id="total" className="pt-3">
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => dispatch(deleteFromCart(val))}
                                        >
                                            X
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <th className="text-center" colSpan={4}>
                                    <h3>Total</h3>
                                </th>
                                <th colSpan={3}>
                                    <h3>{total}</h3>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};
export default Cart;
