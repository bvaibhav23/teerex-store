import React from "react";

const Search = ({ searchHandle }) => {
    return (
        <form className="d-flex">
            <input
                className="form-control searchBar"
                type="search"
                placeholder="Search..."
                aria-label="Search"
                onChange={searchHandle}
            />
        </form>
    );
};

export default Search;
