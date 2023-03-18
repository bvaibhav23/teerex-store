import { useState } from "react";
import FilterColumn from "../FilterColumn";
import QuantityManager from "../QuantityManager";
import Search from "../Search";
import "./CatalogData.css";
import filtersvg from "./filter_icon.svg";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

const CatalogData = () => {
  const items = useSelector((state) => state.products.data);
  const loading = useSelector((state) => state.products.isLoading);
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [getSearch, setSearch] = useState("");

  const [checkColor, setColor] = useState([]);
  const [checkGender, setGender] = useState([]);
  const [checkType, setType] = useState([]);
  const [checkPrice, setPrice] = useState([0, 1000]);

  const [show, setShow] = useState(false);
  const ToggleAdd = () => {
    setShow((prev) => !prev);
  };

  const uniqueColor = [...new Set(items.map((item) => item.color))];
  const uniqueGender = [...new Set(items.map((item) => item.gender))];
  const uniqueType = [...new Set(items.map((item) => item.type))];
  const uniquePrice = ["0-Rs250", "Rs251-450", "Rs450+"];
  const colorHandle = (id) => {
    if (!checkColor.includes(id)) setColor([...checkColor, ...[id]]);
    else setColor(checkColor.filter((v) => v !== id));
  };
  const genderHandle = (id) => {
    if (!checkGender.includes(id)) setGender([...checkGender, ...[id]]);
    else setGender(checkGender.filter((v) => v !== id));
  };
  const typeHandle = (id) => {
    if (!checkType.includes(id)) setType([...checkType, ...[id]]);
    else setType(checkType.filter((v) => v !== id));
  };

  const priceHandle = (val) => {
    if (val.checked && val.id === "Rs450+") setPrice([451, 1000]);
    else if (val.checked && val.id === "Rs251-450") setPrice([251, 450]);
    else if (val.checked && val.id === "0-Rs250") setPrice([0, 250]);
    else setPrice([0, 1000]);
    // console.log(val.checked, val.id)
  };

  const searchHandle = (e) => {
    setSearch(e.target.value);
  };
  if (loading)
    return (<h1 className="text-center m-5">Loading... </h1>)

  return (
    <div className="container position-relative">
      <img
        className="filterimg  d-flex flex-end"
        onClick={ToggleAdd}
        src={filtersvg}
        width="40px"
        height="40px"
        alt="filter"
      />
      {show && (
        <div className="card p-2 uponFilter  shadow w-50 text-center bg-light  position-absolute top-5 start-50  translate-middle-x  ">
          <FilterColumn
            filterType={"Color"}
            filterData={uniqueColor}
            filterHandle={colorHandle}
          />
          <FilterColumn
            filterType={"Gender"}
            filterData={uniqueGender}
            filterHandle={genderHandle}
          />
          <div>
            <h6 className="mt-2"> {"Price"}</h6>
            {uniquePrice.map((attribute, key) => (
              <div key={key} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={attribute}
                  onChange={(e) => priceHandle(e.target)}
                />
                <label className="form-check-label" htmlFor={attribute}>
                  {attribute}
                </label>
              </div>
            ))}
          </div>

          <FilterColumn
            filterType={"Type"}
            filterData={uniqueType}
            filterHandle={typeHandle}
          />
        </div>
      )}
      <Search searchHandle={searchHandle} />
      <div className="row justify-content-around">
        <div className=" col-2 filterColumn">
          <FilterColumn
            filterType={"Color"}
            filterData={uniqueColor}
            filterHandle={colorHandle}
          />
          <FilterColumn
            filterType={"Gender"}
            filterData={uniqueGender}
            filterHandle={genderHandle}
          />
          <div>
            <h6 className="mt-2"> {"Price"}</h6>
            {uniquePrice.map((attribute, key) => (
              <div key={key} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={attribute}
                  onChange={(e) => priceHandle(e.target)}
                />
                <label className="form-check-label" htmlFor={attribute}>
                  {attribute}
                </label>
              </div>
            ))}
          </div>
          <FilterColumn
            filterType={"Type"}
            filterData={uniqueType}
            filterHandle={typeHandle}
          />
        </div>
        <div className="col-10 d-flex flex-wrap justify-content-center">
          {items
            .filter((val) => {
              if (getSearch === "") {
                return val;
              }
              if (val.name.toLowerCase().includes(getSearch.toLowerCase())) {
                return val;
              } else return false;
            })
            .filter((val) => {
              if (checkColor.length < 1) return val;
              if (checkColor.includes(val.color)) return val;
              else return false;
            })
            .filter((val) => {
              if (checkGender.length < 1) return val;
              if (checkGender.includes(val.gender)) return val;
              else return false;
            })
            .filter((val) => {
              if (checkType.length < 1) return val;
              if (checkType.includes(val.type)) return val;
              else return false;
            })
            .filter((val) => {
              if (checkPrice[0] <= val.price && checkPrice[1] >= val.price)
                return val;
              else return false;
            })
            .map((val, index) => (
              <div
                className="card m-3 shadow p-1 border rounded"
                key={index}
                style={{ width: "15rem", height: "24rem" }}
              >
                <img
                  src={val.imageURL}
                  alt={val.name}
                />
                <div
                  className={
                    "card-body d-flex flex-column align-items-center "
                  }
                >
                  <h5 className="card-title border-bottom">{val.name}</h5>
                  <p className="card-text ">
                    <span className="fw-bold"> ₹{val.price}</span>
                  </p>
                  <div>
                    {!cartItems.find((item) => item.id === val.id) ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => dispatch(addToCart(val))}
                        disabled={val.quantity === 0}
                      >
                        {val.quantity === 0 ? "Out Of Stock" : "Add to cart"}
                      </button>
                    ) : (
                      <QuantityManager val={val} />
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogData;
