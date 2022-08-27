import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Index() {
  const [dataBlog, setDataBlog] = useState({})
  useEffect(() => {
    axios.get('http://localhost/laravel/laravel/public/api/blog')
      .then(res => {
        // console.log(res.data.blog.data)
        setDataBlog(res.data.blog.data)
      })
      .catch(error => console.log(error))
  }, [])
 
  const renderDataBlog = () => {
    if (dataBlog.length > 0) {
      return dataBlog.map((value, key) => {
        // console.log(value)
        return (

          <>
          
            <div class="blog-post-area">
              <h2 class="title text-center">Latest From our Blog</h2>
              <div className="single-blog-post">
              <h3>{value.title}</h3>
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
                <span>
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star-half-o" />
                </span>
              </div>
              <a href>
                <img src={"http://localhost/laravel/laravel/public/upload/Blog/image/" + value['image']} />

              </a>
              <p>
                {value.description}
              </p>
              <Link className="btn btn-primary" to={"/blog/detail/" + value.id}>Read More</Link>

            </div>
            <div class="pagination-area">
              <ul class="pagination">
                <li><a href="" class="active">1</a></li>
                <li><a href="">2</a></li>
                <li><a href="">3</a></li>
                <li><a href=""><i class="fa fa-angle-double-right"></i></a></li>
              </ul>
            </div>
            </div>
         
          </>

        )
      })
    }
  }
  return (
    <>

      {renderDataBlog()}
    </>
  )
}
export default Index;