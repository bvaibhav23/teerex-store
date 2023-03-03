import React from 'react'

const QuantityManager = ({ IncreaseCount, DecreaseCount, count, val, items }) => {
    return (
        <div>
            <button className="button rounded m-1"
                onClick={() => {
                    return DecreaseCount(items[val.id - 1])
                }}>
                -
            </button>
            <span className="border border-dark ps-1 pe-1">{count[val.id - 1]}</span>
            <button className="button rounded m-1"
                onClick={() => { return IncreaseCount(items[val.id - 1]) }}>
                +
            </button>
        </div>
    )
}

export default QuantityManager