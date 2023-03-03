// import { useEffect, useState } from "react";
import QuantityManager from "./QuantityManager";

const Cart = ({ cartItem, items, IncreaseCount, DecreaseCount, count, removeItem }) => {

    return <>
        {cartItem.length === 0 && <h1 className="container text-center mt-5 shadow p-2 ">Empty Cart</h1>}
        {cartItem.length > 0 &&
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
                    <tbody >
                        {cartItem.map((val, index) =>
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td><img src={val.imageURL} style={{ width: "5rem", height: "7rem" }} alt="" /></td>
                                <td className="pt-3" ><p className="d-flex flex-column fw-bold">{val.name}</p></td>
                                <td className="pt-3" ><div style={{ backgroundColor: `${val.color}`, width: "2rem", height: "2rem" }}></div></td>
                                <td className="pt-3">{val.price}</td>
                                <td><QuantityManager val={val} items={items}
                                    count={count}
                                    IncreaseCount={IncreaseCount}
                                    DecreaseCount={DecreaseCount} /></td>
                                <td id="total" className="pt-3"><button className="btn btn-danger" onClick={() => removeItem(val)}>X</button></td>
                            </tr>)}
                    </tbody>

                </table>
            </div>
        }



    </>
}
export default Cart;