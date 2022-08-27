import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router";

function Comment(props){
      const getId = useParams();
      const [comment, setComment] = useState("")
      const [errorsComment, setErrorsComment] = useState("")
      function handleComment(e){
        setComment(e.target.value);
      }

      function handleCheck(e){
         
        e.preventDefault();
        var xx = localStorage.getItem('userlist')
     
        var vv = JSON.parse(xx) 
        if(vv){
            const useData = JSON.parse(localStorage['userState'])
            const url = "http://localhost/laravel/laravel/public/api/blog/comment/" + getId.id
            // console.log(useData)
            // 401: bao k co dung api nay 
            // 404: api k tim thay 
            const config ={
                headers:{
                  'Authorization': 'Bearer ' + useData.token.token,
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Accept':'application/json'
                }
            }
            //   console.log(props.id)
            // kiem tra co comment hay khong 
            if(comment){
              // console.log(comment)
              const formData = new FormData();
              formData.append('id_blog',props.id)
              // console.log(props.id)
              formData.append('id_user',useData.data.id)

              console.log(useData.data.id)
              formData.append('id_comment', props.IdReplay ? props.IdReplay:0)
              
              formData.append('comment',comment)
              formData.append('image_user',useData.data.avatar)
              formData.append('name_user',useData.data.name)
            
              axios.post(url, formData, config)
                .then(response =>{
                     props.getComment(response)
                    // console.log(response.data.data)
                })
                .catch(err =>console.error(err))
                setErrorsComment('') 
            }else{
                  setErrorsComment('Vui long comment')
                  console.log('Vui long comment')
                 
            }
  
        }
        else{
           console.log('loi')
        }

   }
   

    return(
        <div className="replay-box">
            <div className="row">
           
              <div className="col-sm-8">
                <div className="text-area">
                    <form onSubmit={handleCheck}>
                      <div className="blank-arrow">
                          <label>Your Name</label>
                         
                      </div>
                      <span>*</span>
                      <textarea name="message" rows={11} value={comment} onChange={handleComment} />

                      <p>{errorsComment}</p>

                      <button className="btn btn-primary" type="submit">
                          post comment
                      </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
    )
}
export default Comment;