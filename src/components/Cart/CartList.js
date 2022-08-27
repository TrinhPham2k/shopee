// nhớ khi 1 cái j thay đổi dư xlieeru phải set nó vô 1 biến gọi useState()

import React, { useContext } from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import AppContext from './../../AppContext'

const CartList = () => {
  const user = useContext(AppContext)

  const [dataproduct, setDataProduct] = useState([])
  const [dataInput, setDataInput] = useState([])

  useEffect(() => {
    
    // kiem tra thu no da co torng local chua co thi gọi từ local bên file Home
    let aa = localStorage['cartproduct']
    if (aa) {
      let dataproduct = JSON.parse(aa)
      const url = 'http://localhost/laravel/laravel/public/api/product/cart'
      axios
        .post(url, dataproduct)
        .then((res) => {
          // console.log(res.data.data)
          setDataProduct(res.data.data)
        })
        .catch((err) => console.error(err))
    }
  }, [])

  const hanlePlus = (e) => {
    // user.getValue(123344)
    let dataInputPlus = e.target.id

    let listcartpar = {}

    if (dataproduct.length > 0) {
      // console.log(dataproduct)
      dataproduct.map((key, index) => {
        if (key.id == dataInputPlus) {
          key.qty++

          setDataInput(key.qty)
        }

        listcartpar[key.id] = key.qty
      })
    }
    localStorage.setItem('cartproduct', JSON.stringify(listcartpar))

    // ================= cach 2===================
    // xử lý tỏng local storge
    // var valLocal = JSON.parse(localStorage.getItem('cartproduct'))
    // if (valLocal) {
    //   Object.keys(valLocal).map((key) => {
    //     if (key == dataInputPlus) {
    //       valLocal[key]++
    //     }
    //   })
    // }
    // localStorage.setItem('cartproduct', JSON.stringify(valLocal))
    //   xử lý trên mảng hình
    // if (dataproduct.length > 0) {
    //   dataproduct.map((value) => {
    //     if (value.id == dataInputPlus) {
    //       value.qty = value.qty + 1
    //       // setDataInput(value.qty)
    //       // xx[value.id] = value.qty
    //     }
    //   })
    //   let a = []
    //   dataproduct.map((value, key) => {
    //     if (value) {
    //       a.push(value)
    //     }
    //   })

    //   setDataProduct(a)
    // }
    // ======================================

    // click thi lay id so sanh voi key, neu bang key thi e lay qty ra va tang len 1
    // dua han vao dataproduct , thay doi thi render tu chay lai

    // id so sanh voi key,
    // - id
    // - lay dataproduct
    // - viet ham map kiem tra id co trong dataproduct
    // {
    //   1:...... qty:1,
    //   2:..... qty:1
    // }
  }

  const hanleMines = (e) => {
    let dataInputMinus = e.target.id

    var valLocal = JSON.parse(localStorage.getItem('cartproduct'))

    if (valLocal) {
      Object.keys(valLocal).map((key) => {
        if (key == dataInputMinus) {
        
          if (valLocal[key] <= 1) {
            delete valLocal[key]
          } else {
            valLocal[key]--
          }
        }
      })
    }
    localStorage.setItem('cartproduct', JSON.stringify(valLocal))

    if (dataproduct.length > 0) {
      dataproduct.map((key, index) => {
        if (key.id == dataInputMinus) {
          // console.log(index)
          // console.log(dataproduct[index])
          if (key.qty <= 1) {
            delete dataproduct[index]
          } else {
            key.qty -= 1
          }

          let xx = []
          dataproduct.map((value, key) => {
            if (value) {
              xx.push(value)
            }
          })
          // console.log(xx)
          setDataProduct(xx)

          // toan tu 3 ngoi
          // key.qty <= 0 ? (key.qty = 0) : key.qty--
        }
      })
    }
  }

  const handleDelete = (id) => {
    let valproduct = JSON.parse(localStorage['cartproduct'])
    let getQty = localStorage.getItem('getQty')
    let qty = 0

    // xử lý trong local storge
    // if (valproduct) {
    //   Object.keys(valproduct).map((key) => {
    //     if (key == id) {
    //       delete valproduct[key]
    //     }
    //   })

    //   setDataProduct(valproduct)
    // }
    //   xử lý trên màng hình
    if (dataproduct.length > 0) {
      dataproduct.map((value, key) => {
        // console.log(key)
        if (value.id == id) {
          delete dataproduct[key]
          delete valproduct[id]
          delete getQty[id]
        }
      })
      if (getQty) {
        getQty = getQty - 1
        qty = getQty
        // console.log(qty)
      }
      localStorage.setItem('cartproduct', JSON.stringify(valproduct))
      localStorage.setItem('getQty', qty)

      let xx = []
      dataproduct.map((value, key) => {
        if (value) {
          xx.push(value)
        }
      })
      // console.log(xx)

      setDataProduct(xx)
      user.getValueCart(qty)
    }
  }

  let sumAll = 0
  function renderproductcart() {
    // console.log(dataproduct)
    if (dataproduct.length > 0) {
      return dataproduct.map((product, key) => {
        // console.log(product)
        let xx = JSON.parse(product.image)
        let totalproduct = product.qty * product.price

        sumAll += totalproduct
        // console.log(sumAll)

        let getValId = product.id
        return (
          <tr>
            <td className="cart_product">
              <a href>
                <img
                  src={
                    'http://localhost/laravel/laravel/public/upload/user/product/' +
                    product.id_user +
                    '/' +
                    xx[0]
                  }
                  alt=""
                />
              </a>
            </td>
            <td className="cart_description">
              <h4>
                <a href>{product.name}</a>
              </h4>
              <p>Web ID: {product.id}</p>
            </td>
            <td className="cart_price">
              <p>$ {product.price}</p>
            </td>
            <td className="cart_quantity">
              <div className="cart_quantity_button">
                <a
                  className="cart_quantity_up "
                  onClick={hanlePlus}
                  id={getValId}
                >
                  {' '}
                  +{' '}
                </a>
                <input
                  className="cart_quantity_input"
                  type="text"
                  name="quantity"
                  defaultValue={1}
                  autoComplete="off"
                  size={2}
                  value={product.qty}
                />
                <a
                  className="cart_quantity_down"
                  id={getValId}
                  onClick={hanleMines}
                >
                  {' '}
                  -{' '}
                </a>
              </div>
            </td>
            <td className="cart_total">
              <p className="cart_total_price">$ {totalproduct}</p>
            </td>
            <td className="cart_delete">
              <a
                className="cart_quantity_delete"
                onClick={() => {
                  handleDelete(product.id)
                }}
              >
                <i className="fa fa-times" />
              </a>
            </td>
          </tr>
        )
      })
    }
  }
  return (
    <>
      <section id="cart_items">
        <div className="container">
          <div className="breadcrumbs">
            <ol className="breadcrumb">
              <li>
                <a href="#">Home</a>
              </li>
              <li className="active">Shopping Cart</li>
            </ol>
          </div>
          <div className="table-responsive cart_info">
            <table className="table table-condensed">
              <thead>
                <tr className="cart_menu">
                  <td className="image">Item</td>
                  <td className="description" />
                  <td className="price">Price</td>
                  <td className="quantity">Quantity</td>
                  <td className="total">Total</td>
                  <td />
                </tr>
              </thead>
              <tbody>{renderproductcart()}</tbody>
            </table>
          </div>
        </div>
      </section>{' '}
      {/*/#cart_items*/}
      <section id="do_action">
        <div className="container">
          <div className="heading">
            <h3>What would you like to do next?</h3>
            <p>
              Choose if you have a discount code or reward points you want to
              use or would like to estimate your delivery cost.
            </p>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="chose_area">
                <ul className="user_option">
                  <li>
                    <input type="checkbox" />
                    <label>Use Coupon Code</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Use Gift Voucher</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Estimate Shipping &amp; Taxes</label>
                  </li>
                </ul>
                <ul className="user_info">
                  <li className="single_field">
                    <label>Country:</label>
                    <select>
                      <option>United States</option>
                      <option>Bangladesh</option>
                      <option>UK</option>
                      <option>India</option>
                      <option>Pakistan</option>
                      <option>Ucrane</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field">
                    <label>Region / State:</label>
                    <select>
                      <option>Select</option>
                      <option>Dhaka</option>
                      <option>London</option>
                      <option>Dillih</option>
                      <option>Lahore</option>
                      <option>Alaska</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field zip-field">
                    <label>Zip Code:</label>
                    <input type="text" />
                  </li>
                </ul>
                <a className="btn btn-default update" href>
                  Get Quotes
                </a>
                <a className="btn btn-default check_out" href>
                  Continue
                </a>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="total_area">
                <ul>
                  <li>
                    Cart Sub Total <span>$59</span>
                  </li>
                  <li>
                    Eco Tax <span>$2</span>
                  </li>
                  <li>
                    Shipping Cost <span>Free</span>
                  </li>
                  <li>
                    Total <span>${sumAll}</span>
                  </li>
                </ul>
                <a className="btn btn-default update" href>
                  Update
                </a>
                <a className="btn btn-default check_out" href>
                  Check Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*/#do_action*/}
    </>
  )
}

export default CartList
