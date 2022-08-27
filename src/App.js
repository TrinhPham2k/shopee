// import "./App.css";
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import Slider from './components/Layout/Slider'
import MenuLeft from './components/Layout/MenuLeft'
import CartList from './components/Cart/CartList'
import AppContext from './AppContext'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'

function App(props) {
  let location = useLocation()
  // const user = { name: 'trinh' }
  const [cartContext, setCartContext] = useState(0)
  const [wishlistContext, setWishListContext] = useState(0)
  function getValueCart(qty) {
    localStorage.setItem('getQty', qty)
    setCartContext(qty)
  }
  function getValueWishList(qty) {
    localStorage.setItem('getWishList', qty)
    setWishListContext(qty)
  }
  // console.log(cartContext)

  return (
    <AppContext.Provider
      value={{
        getValueCart: getValueCart,
        getValueWishList: getValueWishList,
        // cartContext: cartContext,
      }}
    >
      <Header />

      <section>
        <div class="container">
          <div class="row">
           
            { location['pathname'] == '/' ? <Slider /> : ' ' }
            {location['pathname'].includes('account') || location['pathname'].includes('cartlist') ? ( '' ) : (
              <MenuLeft />
            )}

            <div class="col-sm-9">{props.children}</div>
          </div>
        </div>
      </section>

      <Footer />
    </AppContext.Provider>
  )
}

export default App
