import axios from 'axios'
import { useEffect, useState } from 'react'

function ProductList() {
  const [productlist, setProductList] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost/laravel/laravel/public/api/product/list')
      .then((res) => {
        setProductList(res.data.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
     
  }, [])
  const renderProductList = () => {
    if (productlist.length > 0) {
      return productlist.map((product) => {
        var xx = JSON.parse(product.image)
        return (
          <div className="col-sm-4">
            <div className="product-image-wrapper">
              <div className="single-products">
                <div className="productinfo text-center">
                  <img
                    src={
                      'http://localhost/laravel/laravel/public/upload/user/product/' +
                      product.id_user +
                      '/' +
                      xx[0]
                    }
                    alt=""
                  />
                  <h2>{product.price}</h2>
                  <p>{product.name}</p>
                  <a href="#" className="btn btn-default add-to-cart">
                    <i className="fa fa-shopping-cart" />
                    Add to cart222
                  </a>
                </div>
                <div className="product-overlay">
                  <div className="overlay-content">
                    <h2>{product.price}</h2>
                    <p>{product.name}</p>
                    <form>
                      <input defaultValue={56} type="hidden" name="price" />
                      <input
                        defaultValue="asy Polo Black Edition"
                        type="hidden"
                        name="title"
                      />
                      <button
                        type="submit"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart" />
                        Add to cart1111
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="choose">
                <ul className="nav nav-pills nav-justified">
                  <li>
                    <a href="#">
                      <i className="fa fa-plus-square" />
                      Add to wishlist
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-plus-square" />
                      Add to compare
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )
      })
    }
  }
  return (
    <>
      {/* <section id="advertisement">
        <div class="container">
          <img src="../eshopper/images/shop/advertisement.jpg" alt="" />
        </div>
      </section> */}
      <div className="features_items">
        {/*features_items*/}
        <h2 className="title text-center">Features Items</h2>
        {renderProductList()}
      </div>
      <ul className="pagination">
        <li className="active">
          <a href>1</a>
        </li>
        <li>
          <a href>2</a>
        </li>
        <li>
          <a href>3</a>
        </li>
        <li>
          <a href>»</a>
        </li>
      </ul>
    </>
  )
}
export default ProductList
