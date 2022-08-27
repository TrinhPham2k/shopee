
function Listcomment(props){

      const handleReplay =(e)=>{
        e.preventDefault();
        let getIdReplay = e.target.id
        // console.log(getIdReplay)
        // đây là hàm getReplay được gọi từ bên Detail
         props.getReplay(getIdReplay)
      
     }
  
    const renderDataComment = () =>{
      let {listCmt} = props
      
      if(listCmt.length > 0){

        return listCmt.map((value, key) => {
          //  console.log(value.id)
          const idReplay = value.id
          // console.log(value.id_comment)
          if(value.id_comment ==0){
            return(
              <>
                 <li className="media">
                <a className="pull-left" href="#">
                  <img className="media-object" src={"http://localhost/laravel/laravel/public/upload/user/avatar/" + value['image_user']} alt="" />
                </a>
                <div className="media-body">
                  <ul className="sinlge-post-meta">
                    <li><i className="fa fa-user" />{value.name_user}</li>
                    <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                    <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                  </ul>
                  <p>{value.comment}</p>
                  <a className="btn btn-primary" id={idReplay}  onClick={handleReplay}><i className="fa fa-reply"  />Replay</a>
                </div>
              </li>
             { 
                listCmt.map((index,key)=>{
                   if(index.id_comment == value.id){
                     return(
                      <li className="media second-media">
                          <a className="pull-left" href="#">
                            <img className="media-object" src={"http://localhost/laravel/laravel/public/upload/user/avatar/" + value['image_user']} alt="" />
                          </a>
                          <div className="media-body">
                            <ul className="sinlge-post-meta">
                              <li><i className="fa fa-user" />{index.name_user}</li>
                              <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                              <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                            </ul>
                            <p>{index.comment}</p>
                            <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
                          </div>
                    </li>
                     )
                   }
                })
             }
              </>
           )
          }

        })
          
      } 
  
    }

    return (
      <div className="response-area">
          <h2>3 RESPONSES</h2>
          <ul className="media-list">
            {renderDataComment()}

          </ul> 
      </div>
    )
}
export default Listcomment;