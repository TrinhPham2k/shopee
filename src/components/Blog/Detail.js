import axios from "axios";
import { useParams } from "react-router";
import { useEffect, useState } from "react/cjs/react.development";
import Comment from "./Comment"
import Listcomment from "./Listcomment"
import Rate from "./Rate"
function Detail(props) {

  const [dataBlogDetail, setdataBlogDetail] = useState({});
  const [listCmt, setListCmt] = useState("");
  const [IdReplay, setIdReplay] = useState("");
  const getId = useParams();
  //  console.log(getId.id)
  useEffect(() => {
    axios.get( "http://localhost/laravel/laravel/public/api/blog/detail/" + getId.id )
      .then((res) => {
       
        setdataBlogDetail(res.data.data);
        setListCmt(res.data.data.comment)
       
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  function renderDataBlogDetail() {
   
    // console.log(dataBlogDetail)
    if (Object.keys(dataBlogDetail).length > 0) {
      // console.log(dataBlogDetail.data)
      return (
        
            <div className="single-blog-post">
              <h3>Girls Pink T Shirt arrived in store</h3>
              <div className="post-meta">
                <ul>
                  <li>
                    <i className="fa fa-user" /> Mac Doe
                  </li>
                  <li>
                    <i className="fa fa-clock-o" /> 1:33 pm
                  </li>
                  <li>
                    <i className="fa fa-calendar" /> DEC 5, 2013
                  </li>
                </ul>
               <Rate id={getId.id} />
              </div>
              <a href>
                <img
                  src={
                    "http://localhost/laravel/laravel/public/upload/Blog/image/" +
                    dataBlogDetail.image
                  }
                />
              </a>
              <p>{dataBlogDetail.content}</p> <br />
              <div className="pager-area">
                <ul className="pager pull-right">
                  <li>
                    <a href="#">Pre</a>
                  </li>
                  <li>
                    <a href="#">Next</a>
                  </li>
                </ul>
              </div>
            </div>
      );
    }
  }
  
  // xu ly khi không cần reload comments vẫn hiện ra comment mới nhất
  function getComment(data){
      console.log(data);
      setListCmt(listCmt.concat(data.data.data))
      
  }
  const getReplay =(data1)=>{
      //  console.log(data1);
       setIdReplay(data1);
  }
// function averageRate(){

// }
  return (
    <div>
      <div class="blog-post-area">
        <h2 class="title text-center">Latest From our Blog</h2>
           {renderDataBlogDetail()}
           {/* phan danh gia */}
           <div className="rating-area">
          <ul className="ratings">
            <li className="rate-this">Rate this item:</li>
            <li>
              <i className="fa fa-star color" />
              <i className="fa fa-star color" />
              <i className="fa fa-star color" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
            </li>
            <li className="color">(6 votes)</li>
          </ul>
          <ul className="tag">
            <li>TAG:</li>
            <li><a className="color" href>Pink <span>/</span></a></li>
            <li><a className="color" href>T-Shirt <span>/</span></a></li>
            <li><a className="color" href>Girls</a></li>
          </ul>
        </div>
          {/* phan socials */}
          <div className="socials-share">
            <a href>
              <img src="images/blog/socials.png" alt="" />
            </a>
          </div>
          {/*/socials-share*/}
          <div className="media commnets">
            <a className="pull-left" href="#">
              <img
                className="media-object"
                src="images/blog/man-one.jpg"
                alt=""
              />
            </a>
            <div className="media-body">
              <h4 className="media-heading">Annie Davis</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <div className="blog-socials">
                <ul>
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
                      <i className="fa fa-dribbble" />
                    </a>
                  </li>
                  <li>
                    <a href>
                      <i className="fa fa-google-plus" />
                    </a>
                  </li>
                </ul>
                <a className="btn btn-primary" href>
                  Other Posts
                </a>
              </div>
            </div>
          </div>
          <Listcomment listCmt={listCmt}  getReplay ={getReplay}  />
          {/*/Response-area*/}
          <Comment id={getId.id} getComment={getComment} IdReplay={IdReplay} />
          {/*/Repaly Box*/} 
      </div>
    </div>
  )
}
export default Detail;
