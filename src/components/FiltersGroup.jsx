import { useState, React } from "react";

const FiltersGroup = ({
  setSortFilter,
  setIsLoading,
  titleFilter,
  setTitleFilter,
  price,
  setPrice,
}) => {
  const [trigger, setTrigger] = useState(false);
  // const [page, setPage] = useState();
  // const [limit, setLimit] = useState();

  // const [rangeValue, setRangeValue] = useState(5);

  return (
    <div className="filters-groups">
      <input
        onChange={(event) => {
          setTitleFilter(event.target.value);
        }}
        className="search"
        type="text"
        placeholder="Recherche des articles"
        value={titleFilter}
      />
      <i className="search-icon fas fa-search"></i>

      <div className="filters">
        <div className="filter-price">
          <span></span>
          <span>Trier par prix</span>
          <div
            onClick={(event) => {
              if (trigger === false) {
                setSortFilter("price-desc");

                setTrigger(!trigger);
              } else {
                setSortFilter("price-asc");

                setTrigger(!trigger);
              }
            }}
            className="switcher"
          >
            <div
              className="trigger"
              style={
                !trigger ? { left: "-1px" } : { left: "inherit", right: "-1px" }
              }
            >
              <i
                className={`filter-up fas fa-arrow-up ${trigger && "d-none"}`}
              ></i>
              <i
                className={`filter-down fas fa-arrow-down ${
                  !trigger && "d-none"
                }`}
              ></i>
            </div>
          </div>
        </div>
        {/* <div className="filter-range-price">
          <label htmlFor="range">Prix entre</label>

          <input
            onChange={(event) => {
              // console.log(event.target.value);
              let priceMin = event.target.value;

              if (priceMin <= price[1]) {
                const clonePrice = [...price];
                clonePrice[0] = event.target.value;

                setPrice(clonePrice);
              }
              // setPrice(event.target.value);
            }}
            value={price[0]}
            step="5"
            type="range"
            id="rangeMin"
            min="5"
            max={price[0] <= price[1] ? price[0] : price[1]}
          />
          <input
            onChange={(event) => {
              // console.log(event.target.value);
              let priceMax = event.target.value;
              if (priceMax >= price[0]) {
                const clonePrice = [...price];
                clonePrice[1] = event.target.value;
                setPrice(clonePrice);
              }
            }}
            value={price[1]}
            step="5"
            type="range"
            id="rangeMax"
            min={price[1] > price[0] ? price[1] : price[0]}
            max="1000"
          />
        </div> */}
      </div>
    </div>
  );
};
export default FiltersGroup;
