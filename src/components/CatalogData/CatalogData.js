import { useState } from "react";
import FilterColumn from "../FilterColumn";
import QuantityManager from "../QuantityManager";
import Search from "../Search";
import "./CatalogData.css";
import filtersvg from "./filter_icon.svg";
const CatalogData = ({ items, IncreaseCount, DecreaseCount, count }) => {
  const [getSearch, setSearch] = useState("");

  const [checkColor, setColor] = useState([]);
  const [checkGender, setGender] = useState([]);
  const [checkType, setType] = useState([]);
  const [checkPrice, setPrice] = useState([0, 1000])

  const [show, setShow] = useState(false);
  const ToggleAdd = () => {
    setShow((prev) => !prev);
  };



  const uniqueColor = [...new Set(items.map((item) => item.color))];
  const uniqueGender = [...new Set(items.map((item) => item.gender))];
  const uniqueType = [...new Set(items.map((item) => item.type))];
  const uniquePrice = ["0-Rs250", "Rs251-450", "Rs450+"]
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
  // const priceHandle = (val) => {
  //   if (!checkPrice.includes(val.id)) setPrice([...checkPrice, ...{ id: val.checked }]);
  //   else setPrice(checkPrice.filter((v) => v !== val.id));
  //   console.log(checkPrice)
  // };
  const priceHandle = (val) => {
    if (val.checked && val.id === "Rs450+")
      setPrice([451, 1000])

    else if (val.checked && val.id === "Rs251-450")
      setPrice([251, 450])
    else if (val.checked && val.id === "0-Rs250")
      setPrice([0, 250])
    else
      setPrice([0, 1000])
    // console.log(val.checked, val.id)
  }


  const searchHandle = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="container position-relative">
      <img className="filterimg  d-flex flex-end" onClick={ToggleAdd} src={filtersvg} width='40px' height="40px" alt="filter"></img>
      {show && <div className="card p-2 uponFilter  shadow w-50 text-center bg-light  position-absolute top-5 start-50  translate-middle-x  ">
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
          <h6 className='mt-2'> {"Price"}</h6>
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
      </div>}
      <Search searchHandle={searchHandle} />
      <div className="row">

        <div className="col-2 filterColumn">
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
            <h6 className='mt-2'> {"Price"}</h6>
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

        <div className={show ? "col-10" : ""}>
          <div className="d-flex flex-wrap m-3 justify-content-center">
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
                  return val
                else
                  return false
              })
              .map((val, index) => (
                <div
                  className="card m-3 shadow "
                  key={index}
                  style={{ width: "15rem" }}>
                  <img
                    src={val.imageURL}
                    className="card-img-top p-2"
                    alt={val.name}
                  />
                  <div
                    className={
                      "card-body d-flex flex-column align-items-center text-center justify-content-between"
                    }>
                    <h6 className="card-title">{val.name}</h6>
                    <p className="card-text ">
                      <span className="fw-bold"> ₹{val.price}</span>
                    </p>
                    <div>
                      {count[val.id - 1] < 1 ? (
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            return IncreaseCount(items[index]);
                          }}
                          disabled={val.quantity === 0}>
                          Add to cart
                        </button>
                      ) : (
                        <QuantityManager val={val} items={items}
                          count={count}
                          IncreaseCount={IncreaseCount}
                          DecreaseCount={DecreaseCount}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogData;
