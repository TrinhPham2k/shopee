import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import StarRatings from "react-star-ratings";

function Rate(props){
    // user_blog
    // console.log(props.id)
    const getId= useParams();
  
    const [errorsRate, setErrorsRate] = useState("")
    const [checkLogin, setCheckLogin] = useState("")

    const [rate, setRate] = useState(0);
    
  
    useEffect(()=>{
      axios.get( "http://localhost/laravel/laravel/public/api/blog/rate/" + getId.id )
      .then((res) => {
        // console.log(res.data.data);
        let dataRate = res.data.data
        // console.log(Object.keys(dataRate).length);
        var sum=0;
        if(Object.keys(dataRate).length >0) {
             Object.keys(dataRate).map((value) => {
                  // console.log(dataRate[value]);
                         const valueRate = dataRate[value].rate
                        sum +=valueRate
                        // console.log(sum);        
             })
        }
           const lengthRate = Object.keys(dataRate).length
          //  console.log(lengthRate);
           if(lengthRate  >0){
                 let averge =  sum / lengthRate 
                 setRate(averge)
                //  console.log(averge);
           }
          
        //  let dataRate = res.data.data
        //   const lengthRate = dataRate.length
        //   console.log(dataRate);
        //   var sum =0;

        //   if(dataRate.length > 0){
            
        //       dataRate.map( (value) =>{
        //           //  console.log(value.rate);
        //           let length = value.rate
        //           // console.log(lengnthRate);
        //            if(length >0 ){
        //                 sum +=length 
        //                console.log(sum);
        //            }
        //           // const valueRate = value.rate
        //           // console.log(valueRate);
                 
        //       })
           
        //      let averge =  sum / lengthRate 
        //       setRate(averge) 
        //   }
          
         

          // let averge =  sum / lengthRate 
                  // setRate(averge)
        //    if(dataRate.length > 0) {

            //  console.log(dataRate);
          //  }
         
        //  console.log(res.data.data);
        //  var sum=0;
        // if(dataRate.length > 0) {
        //     Object.keys(dataRate).map((value)=>{
        //     const valueRate = dataRate[value].rate
        //        sum +=valueRate
        //   })
        //   const lengthRate = dataRate.length
        
        //   let averge =  sum / lengthRate 
        //    setRate(averge)
        // }
         
        

        
    })
  .catch((err) => {
       console.log(err);
   });
  },[])
    // console.log(dataRate) 
        function changeRating( newRating, name ) {
        
          //  console.log(newRating);
          
            var xx = localStorage.getItem('userlist')
            var vv = JSON.parse(xx) 
           
            if(vv){
               const useData = JSON.parse(localStorage['userState'])
               
               const url = "http://localhost/laravel/laravel/public/api/blog/rate/" + getId.id
               const config ={
                headers:{
                  'Authorization': 'Bearer ' + useData.token.token,
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Accept':'application/json'
                }
              }
             
              if(rate){
                const formData = new FormData();
                formData.append('blog_id',props.id)
               
                  //  user_id
               // console.log(useData.data.id)
                formData.append('user_id',useData.data.id) 
                // console.log(rate)
                formData.append('rate',newRating)
                axios.post(url,formData,config)
                 .then(res =>{
                    //  console.log(res)
                    
                 })
                 .catch(err =>console.error(err))
                //  setErrorsRate('')
                 
                 
              }else{
                console.log('Vui long danh gia')
                // setErrorsRate('Vui long danh gia')
              }

            }else{
                console.log("loi")
                setCheckLogin("Vui long login de danh gia")

            }
            setRate( newRating)
        }     
     
    return (
      <span  >
            {/* <p>{errorsRate}</p> */}
           <p>{checkLogin}</p>
              <StarRatings
              rating={rate}
              starRatedColor="blue"
              changeRating={changeRating}
              numberOfStars={5}
              name='rating'
            />
      </span>
       
      );
}
export default Rate;