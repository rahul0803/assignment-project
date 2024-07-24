import CategoryMenu from "../../components/CategoryMenu"
import FoodItems from "../../components/FoodItems"
import Cart from "../../components/Cart"
import Navbar from "../../components/Navbar"

const Home = () => {

  return (
    <div>
      <Navbar />
      <CategoryMenu />
      <FoodItems />
      <Cart />
    </div>
  )
}

export default Home
