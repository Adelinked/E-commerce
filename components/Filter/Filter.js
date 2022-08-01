import { useDispatch, useSelector } from "react-redux";
import { setFilter, clearFilter } from "../../store/actions/productsAction";
import styles from "./Filter.module.css";
export default () => {
  const { filter, products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const target = e.target;
    const value =
      target.name === "freeShipping" ? target.checked : target.value;

    const name = target.name;
    dispatch(
      setFilter({
        ...filter,
        [name]: value,
      })
    );
  };
  const companies = products.reduce((acc, curr) => {
    if (curr.company && acc.indexOf(curr.company) < 0) {
      acc.push(curr.company);
    }
    return acc;
  }, []);

  const categories = products.reduce((acc, curr) => {
    if (curr.category && acc.indexOf(curr.category) < 0) {
      acc.push(curr.category);
    }
    return acc;
  }, []);

  const minPrice =
    products?.length > 0 ? Math.min(...products.map((p) => p.price)) : 0;
  const maxPrice =
    products?.length > 0 ? Math.max(...products.map((p) => p.price)) : 1000;
  return (
    <div className={styles.filterContainer}>
      <form
        className={styles.filterForm}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          className="search"
          name="title"
          type="text"
          placeholder="Search"
          label="Title"
          id="title"
          value={filter.title}
          onChange={handleChange}
        />
        {categories && categories.length > 0 && (
          <>
            <label htmlFor="category">Category</label>
            <select
              onChange={handleChange}
              name="category"
              id="category"
              value={filter.category}
            >
              <option value="">All</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </>
        )}
        {companies && companies.length > 0 && (
          <>
            {" "}
            <label htmlFor="company">
              Company
              <select
                onChange={handleChange}
                name="company"
                id="company"
                value={filter.company}
              >
                <option value="">All</option>
                {companies.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          </>
        )}
        <label htmlFor="price">Price :$ {filter.price}</label>
        <input
          type="range"
          name="price"
          id="price"
          onChange={handleChange}
          min={minPrice}
          max={maxPrice}
          value={filter.price}
        />

        <label htmlFor="freeShipping">
          Free Shipping{" "}
          <input
            type="checkbox"
            name="freeShipping"
            id="freeShipping"
            onChange={handleChange}
            checked={filter.freeShipping}
            style={{ cursor: "pointer" }}
          />
        </label>
        <button
          onClick={() => {
            dispatch(clearFilter());
          }}
        >
          Clear
        </button>
      </form>
    </div>
  );
};
