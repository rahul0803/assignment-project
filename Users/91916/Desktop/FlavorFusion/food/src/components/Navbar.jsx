import { searchInput } from "../redux/input/actions/InputActionCreators";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const inputValue = useSelector((state) => state.input);

  return (
    <nav className="flex flex-col lg:flex-row justify-between mx-6 py-3 mb-10">
      <div>
        <h3 className="text-xl font-bold text-gray-600">
          {new Date().toLocaleDateString(undefined, {
            weekday: "short",
            day: "numeric",
            year: "numeric",
            month: "long",
          })}
        </h3>
        <h1 className="text-2xl font-bold">FlavorFusion</h1>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search here..."
          name="search"
          autoComplete="off"
          value={inputValue}
          onChange={(e) => dispatch(searchInput(e.target.value))}
          className="p-3 border border-gray-400 text-sm rounded-lg outline-none w-full lg:w-[25vw]"
        />
      </div>
    </nav>
  );
};

export default Navbar;
