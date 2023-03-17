import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseCount } from "../store/cartSlice";

const QuantityManager = ({ val }) => {
    const cartItems = useSelector((state) => state.cart);
    let item = cartItems.find((i) => val.id === i.id);
    const dispatch = useDispatch();
    return (
        <div>
            <button
                className="button rounded m-1 "
                onClick={() => dispatch(decreaseCount(val))}
            >
                -
            </button>
            <span className="border border-dark ps-1 pe-1">
                {item.quantityInCart}
            </span>
            <button
                className="button rounded m-1"
                onClick={() => dispatch(addToCart(val))}
            >
                +
            </button>
        </div>
    );
};

export default QuantityManager;
