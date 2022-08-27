import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import AppContext from './../../AppContext'
import React, { useContext } from 'react'

function Header() {
  const numbercart = useContext(AppContext)
  // console.log(numbercart)
  // console.log(Object.keys(numbercart.cartContext).length)

  // ============================
  // function renderLogin(){
  //   goi bien trong local ra
  //   kiem tra co k?
  //   co {
  //     return (
  //       <li><a logout(....)>logout</a></li>
  //     )
  //   }else {
  //     return (
  //       <li><a href="login.html">Login</a></li>
  //     )
  //   }
  // }
  const navigate = useNavigate()
  //  kiem tra neu co login thanh cong thi chuyen thanh logout
  function renderLogin() {
    var xx = localStorage.getItem('userlist')
    var vv = JSON.parse(xx)
    var aa = JSON.parse(localStorage.getItem('userState'))
    // console.log(aa.data.avatar);
    if (vv) {
      return (
        <li>
          <a onClick={logout}><img className="avatarLogin" src ={'http://localhost/laravel/laravel/public/upload/user/avatar/'+ aa.data.avatar}/>
           {aa.data.name}</a>
        </li>
      )
    } else {
      return (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )
    }
  }
  //  neu click login thi xoa het du lieu chuyen ve trang login
  function logout() {
    // -xoa het local local
    // - chuyen ve trang login
    localStorage.removeItem('userlist')
    navigate('/login')
  }
  // them Account vao trang neu da login thanh cong
  function renderAccount() {
    var xx = localStorage.getItem('userlist')
    var vv = JSON.parse(xx)
    if (vv) {
      return (
        <li>
          <Link to="/account/update" onClick={renderAccount}>
            <i className="fa fa-user" /> Account
          </Link>
        </li>
      )
    }
  }
  // -----------
  function renderCart() {
    let getQty = localStorage.getItem('getQty')

    let qty = 0
    if (getQty) {
      qty = getQty
    }

    return (
      <li>
        <Link to="/cartlist">
          <i className="fa fa-shopping-cart" /> {qty}
        </Link>
      </li>
    )
  }
  
  const renderWishList = () => {
    let getWishList = localStorage.getItem('getWishList')

    let wishlist = 0
    if (getWishList) {
      wishlist = getWishList
    }
    return (
      <li>
        <Link to="/cartwishlist">
          <i className="fa fa-star" /> Wishlist {wishlist}
        </Link>
      </li>
    )
  }
  return (
    <header id="header">
      {/*header*/}
      <div className="header_top">
        {/*header_top*/}
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="contactinfo">
                <ul className="nav nav-pills">
                  <li>
                    <a href>
                      <i className="fa fa-phone" /> +2 95 01 88 821
                    </a>
                  </li>
                  <li>
                    <a href>
                      <i className="fa fa-envelope" /> info@domain.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="social-icons pull-right">
                <ul className="nav navbar-nav">
                  <li>
                    <a href>
                      <i className="fa fa-facebook" />
                    </a>
                  </li>
                  <li>
                    <a href>
                      <i className="fa fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href>
                      <i className="fa fa-linkedin" />
                    </a>
                  </li>
                  <li>
                    <a href>
                      <i className="fa fa-dribbble" />
                    </a>
                  </li>
                  <li>
                    <a href>
                      <i className="fa fa-google-plus" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*/header_top*/}
      <div className="header-middle">
        {/*header-middle*/}
        <div className="container">
          <div className="row">
            <div className="col-md-4 clearfix">
              <div className="logo pull-left">
              <Link to="/" className="active">
                   <img src="../eshopper/images/home/logo.png" alt="" />
              </Link>
                {/* <a href="index.html">
                  <img src="../eshopper/images/home/logo.png" alt="" />
                </a> */}
              </div>
              <div className="btn-group pull-right clearfix">
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-default dropdown-toggle usa"
                    data-toggle="dropdown"
                  >
                    USA
                    <span className="caret" />
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a href>Canada</a>
                    </li>
                    <li>
                      <a href>UK</a>
                    </li>
                  </ul>
                </div>
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-default dropdown-toggle usa"
                    data-toggle="dropdown"
                  >
                    DOLLAR
                    <span className="caret" />
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a href>Canadian Dollar</a>
                    </li>
                    <li>
                      <a href>Pound</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-8 clearfix">
              <div className="shop-menu clearfix pull-right">
                <ul className="nav navbar-nav">
                  {renderAccount()}
                  {/* <AppContext.Consumer>
                    {() => (
                      <li>
                        <a href>
                          <i className="fa fa-star" /> Wishlist ( )
                        </a>
                      </li>
                    )}
                  </AppContext.Consumer> */}
                  {/* <li>
                    <Link to="/cartwishlist">
                      <i className="fa fa-star" /> Wishlist
                    </Link>
                  </li> */}
                  {renderWishList()}
                  <li>
                    <Link to="checkout.html">
                      <i className="fa fa-crosshairs" /> Checkout
                    </Link>
                  </li>

                  {renderCart()}

                  {renderLogin()}
                  {/* <li><Link to="/login"><i className="fa fa-lock" /> Login</Link></li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*/header-middle*/}
      <div className="header-bottom">
        {/*header-bottom*/}
        <div className="container">
          <div className="row">
            <div className="col-sm-9">
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle"
                  data-toggle="collapse"
                  data-target=".navbar-collapse"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                </button>
              </div>
              <div className="mainmenu pull-left">
                <ul className="nav navbar-nav collapse navbar-collapse">
                  <li>
                    <Link to="/" className="active">
                      Home
                    </Link>
                  </li>
                  <li className="dropdown">
                    <a href="#">
                      Shop
                      <i className="fa fa-angle-down" />
                    </a>
                    <ul role="menu" className="sub-menu">
                      <li>
                        <Link to="/productlist">Products</Link>
                      </li>
                      <li>
                        <Link to="./product/detail">Product Details</Link>
                      </li>
                      <li>
                        <a href="checkout.html">Checkout</a>
                      </li>
                      <li>
                        <a href="cart.html">Cart</a>
                      </li>
                      <li>
                        <a href="login.html">Login</a>
                      </li>
                      {/* {renderLogin()}  */}
                    </ul>
                  </li>
                  <li className="dropdown">
                    <a href="#" className="active">
                      Blog
                      <i className="fa fa-angle-down" />
                    </a>
                    <ul role="menu" className="sub-menu">
                      <li>
                        <Link to="./blog/list" className="active">
                          Blog List
                        </Link>
                      </li>
                      <li>
                        <Link to="./blog/detail">Blog Single</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="404.html">404</a>
                  </li>
                  <li>
                    <a href="contact-us.html">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-3">
            
              <div className="search_box pull-right">
                <input type="text" placeholder="Search" />
                <button className="btn  btn-search">Search</button>
              </div>
            
            </div>
          </div>
        </div>
      </div>
      {/*/header-bottom*/}
    </header>
  )
}
export default Header
