import React from 'react'

const FilterColumn = ({ filterType, filterData, filterHandle }) => {
    return (
        <div>
            <h6 className='mt-2'> {filterType}</h6>
            {filterData.map((attribute, key) => (
                <div key={key} className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id={attribute}
                        onChange={(e) => filterHandle(e.target.id)}
                    />
                    <label className="form-check-label" htmlFor={attribute}>
                        {attribute}
                    </label>
                </div>
            ))}
        </div>
    )
}

export default FilterColumn