import { useDispatch, useSelector } from "react-redux";
import { sortProducts } from "../store/actions/productsAction";

export default () => {
  const dispatch = useDispatch();
  const { sort } = useSelector((state) => state.products);
  return (
    <div>
      <span>Sort: </span>
      <select
        onChange={(e) => {
          dispatch(sortProducts(e.target.value));
        }}
        value={sort}
      >
        <option value="0">By Name (A/Z)</option>
        <option value="1">By Name (Z/A)</option>

        <option value="2">By Price (LOWEST)</option>
        <option value="3">By Price (HIGHEST)</option>
      </select>
    </div>
  );
};
