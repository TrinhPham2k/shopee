import axios from "axios";
import { useEffect, useState } from "react";
// import ProductFilters from '../Product/ProductFilters'
import Home from '../../Home'
function MenuLeft() {
  const [categorydata, setCategory] = useState("");
  const [categoryClick, setCategoryClick] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost/laravel/laravel/public/api/category-brand")
      .then((res) => {
        setCategory(res.data.category);
        // setBrand(res.data.brand)
      });
  }, []);
  const handleCategoryClick = (id) => {
    // console.log(id);
    axios
      .get("http://localhost/laravel/laravel/public/api/product/list")
      .then((res) => {
        // console.log(res.data.data.data);
        setCategoryClick(res.data.data.data);
      });

    if (categoryClick.length > 0) {
      let result =categoryClick.filter((value) => {
        return value.id_category === id
        // const result = 
        // if(value.id_category === id){
        //   setCategory()
        // }
  
        // const result = categorydata.filter((culData) => {
        //   console.log(culData);
        //   // return culData.id === id;
        // });
        // // setCategory(result);
      });
      // console.log(result);
    }
  };

  const handleSelectCategory = () => {
    if (categorydata.length > 0) {
      return categorydata.map((value) => {
        //  console.log(value);
        return (
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a
                  data-toggle="collapse"
                  data-parent="#accordian"
                  href="#"
                  onClick={() => handleCategoryClick(value.id)}
                >
                  {/* <span className="badge pull-right"><i className="fa fa-plus" /></span> */}
                  {value.category}
                </a>
              </h4>
            </div>
          </div>
        );
      });
    }
  };
  return (
    <div class="col-sm-3">
      <div className="left-sidebar">
        <h2>Category</h2>
        <div className="panel-group category-products" id="accordian">
          {/*category-productsr*/}
          {handleSelectCategory()}
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a data-toggle="collapse" data-parent="#accordian" href="#mens">
                  <span className="badge pull-right">
                    <i className="fa fa-plus" />
                  </span>
                  Mens
                </a>
              </h4>
            </div>
            <div id="mens" className="panel-collapse collapse">
              <div className="panel-body">
                <ul>
                  <li>
                    <a href>Fendi</a>
                  </li>
                  <li>
                    <a href>Guess</a>
                  </li>
                  <li>
                    <a href>Valentino</a>
                  </li>
                  <li>
                    <a href>Dior</a>
                  </li>
                  <li>
                    <a href>Versace</a>
                  </li>
                  <li>
                    <a href>Armani</a>
                  </li>
                  <li>
                    <a href>Prada</a>
                  </li>
                  <li>
                    <a href>Dolce and Gabbana</a>
                  </li>
                  <li>
                    <a href>Chanel</a>
                  </li>
                  <li>
                    <a href>Gucci</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a
                  data-toggle="collapse"
                  data-parent="#accordian"
                  href="#womens"
                >
                  <span className="badge pull-right">
                    <i className="fa fa-plus" />
                  </span>
                  Womens
                </a>
              </h4>
            </div>
            <div id="womens" className="panel-collapse collapse">
              <div className="panel-body">
                <ul>
                  <li>
                    <a href>Fendi</a>
                  </li>
                  <li>
                    <a href>Guess</a>
                  </li>
                  <li>
                    <a href>Valentino</a>
                  </li>
                  <li>
                    <a href>Dior</a>
                  </li>
                  <li>
                    <a href>Versace</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a href="#">Kids</a>
              </h4>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a href="#">Fashion</a>
              </h4>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a href="#">Households</a>
              </h4>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a href="#">Interiors</a>
              </h4>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a href="#">Clothing</a>
              </h4>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a href="#">Bags</a>
              </h4>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a href="#">Shoes</a>
              </h4>
            </div>
          </div>
        </div>
        {/*/category-products*/}
        <div className="brands_products">
          {/*brands_products*/}
          <h2>Brands</h2>
          <div className="brands-name">
            <ul className="nav nav-pills nav-stacked">
              <li>
                <a href>
                  {" "}
                  <span className="pull-right">(50)</span>Acne
                </a>
              </li>
              <li>
                <a href>
                  {" "}
                  <span className="pull-right">(56)</span>Grüne Erde
                </a>
              </li>
              <li>
                <a href>
                  {" "}
                  <span className="pull-right">(27)</span>Albiro
                </a>
              </li>
              <li>
                <a href>
                  {" "}
                  <span className="pull-right">(32)</span>Ronhill
                </a>
              </li>
              <li>
                <a href>
                  {" "}
                  <span className="pull-right">(5)</span>Oddmolly
                </a>
              </li>
              <li>
                <a href>
                  {" "}
                  <span className="pull-right">(9)</span>Boudestijn
                </a>
              </li>
              <li>
                <a href>
                  {" "}
                  <span className="pull-right">(4)</span>Rösch creative culture
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/*/brands_products*/}
        <div className="price-range">
          {/*price-range*/}
          <h2>Price Range</h2>
          <div className="well">
            <input
              type="text"
              className="span2"
              defaultValue
              data-slider-min={0}
              data-slider-max={600}
              data-slider-step={5}
              data-slider-value="[250,450]"
              id="sl2"
            />
            <br />
            <b>$ 0</b> <b className="pull-right">$ 600</b>
          </div>
        </div>
        {/*/price-range*/}
        <div className="shipping text-center">
          {/*shipping*/}
          <img src="../eshopper/images/home/shipping.jpg" alt="" />
        </div>
        {/*/shipping*/}
      </div>
    </div>
  );
}
export default MenuLeft;
