import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function ShowProduct() {
  const [products, setProduct] = useState('')
  useEffect(() => {
    let useData = JSON.parse(localStorage.getItem('userState'))
    const url = 'http://localhost/laravel/laravel/public/api/user/my-product'
    // console.log(useData.token.token);
    const config = {
      headers: {
        Authorization: 'Bearer ' + useData.token.token,
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    }
    axios
      .get(url, config)
      .then((res) => {
        setProduct(res.data.data)
      })

      .catch((err) => {
        console.log(err)
      })
  }, [])

  const deleteProduct = (id) => {
    let useData = JSON.parse(localStorage.getItem('userState'))
    const url =
      'http://localhost/laravel/laravel/public/api/user/delete-product/' + id
    // console.log(useData.token.token);
    const config = {
      headers: {
        Authorization: 'Bearer ' + useData.token.token,
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    }
    axios
      .get(url, config)
      .then((res) => {
        // console.log(res);
        setProduct(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const renderProduct = () => {
    if (Object.keys(products).length > 0) {
      return Object.keys(products).map((value) => {
        //  console.log(products[value].id);
        let images = products[value].image
        var xx = JSON.parse(images)
        //  console.log(xx[0]);

        return (
          <tr>
            <td className="cart_product">
              <p>{products[value].id}</p>
            </td>
            <td className="cart_total">
              <p className="cart_total_price">{products[value].name}</p>
            </td>

            <td className="cart_product">
              <a href>
                <img
                  className="cart_img"
                  src={
                    'http://localhost/laravel/laravel/public/upload/user/product/' +
                    products[value].id_user +
                    '/' +
                    xx[0]
                  }
                  alt=""
                />
              </a>
            </td>
            <td className="cart_quantity">
              <p className="cart_total_price">${products[value].price}</p>
            </td>
            <td className="cart_delete">
              <Link
                to={'/account/editproduct/' + products[value].id}
                className="cart_quantity_edit"
              >
                <i className="fas fa-edit"></i>
              </Link>
              <a
                onClick={() => {
                  deleteProduct(products[value].id)
                }}
                className="cart_quantity_delete"
                href
              >
                <i className="fa fa-times" />
              </a>
            </td>
          </tr>
        )
      })
    }
  }

  // console.log(products);
  return (
    <section id="cart_items">
      <div className="table-responsive cart_info">
        <table className="table table-condensed">
          <thead>
            <tr className="cart_menu">
              <td className="image">ID</td>
              <td className="image">Name</td>
              <td className="price">Image</td>
              <td className="quantity">Price</td>
              <td className="total">Action</td>
              <td />
            </tr>
          </thead>
          <tbody>{renderProduct()}</tbody>
        </table>
      </div>
      <Link to="/account/add">
        <button type="submit" class="btn btn-danger">
          Add New
        </button>
      </Link>
    </section>
  )
}
export default ShowProduct
