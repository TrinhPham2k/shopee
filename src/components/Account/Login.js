import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormErrors from './FormErrors';
import Register from './Register'
function Login(){
    const [inputs,setInputs] =useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    
    const handleChange = (e)=>{
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state =>({...state,[nameInput]:value}))
        
    }
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        let errorSubmit={};
        let flag = true;
    
       if(inputs.email == undefined){
            flag = false;
            errorSubmit.email ="Vui long nhap email"
       }else{
            flag = true;
            errorSubmit.email =""
            const re = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            if(!re.test(inputs.email)){
              flag = false;
              errorSubmit.email = 'Email khong dung dinh dang'
            }else{
              flag = true;
              errorSubmit.email = ''
            }
        }
        if(inputs.pass == undefined){
              flag = false;
              errorSubmit.pass ="Vui long nhap pass"
        }else{
            flag = true;
            errorSubmit.pass =""
        }
        if(!flag){
            setErrors(errorSubmit)
        }else{
            setErrors({})
            const user ={
              email:inputs.email,
              password:inputs.pass,
              level:0
               
            }
            axios.post('http://localhost/laravel/laravel/public/api/login',user)
            .then(res =>{
              if(res.data.errors){
                   // console.log(res);
                  // kiem tra viec nhap email va pass co dung khong neu nhap sai thi set loi len mang hinh
                  setErrors(res.data.errors)
              }
            
          
              else{
                    // console.log(res.data.success)
                    let objVaule = {
                       data:  res.data.Auth,
                       token : res.data.success
                    }
                  
                    localStorage.setItem('userState', JSON.stringify(objVaule))

                    let checkValue = true;
                    localStorage.setItem('userlist', JSON.stringify(checkValue))
                    // neu ma login thanh cong chuyen huong sang trang home
                    navigate('/')

                //  - tao ra 1 bien gi do (True) -> localStorage
              }
            })
            
        }
      
    }
   

   return(
    <section id="form">
    <div className="container">
      <div className="row">
        <div className="col-sm-4 col-sm-offset-1">
          <div className="login-form">{/*login form*/}
            <h2>Login to your account</h2>
            <FormErrors errors={errors}/>
            <form action="#"   onSubmit={handleSubmit}>
              <input type="text" placeholder="Email Address" name="email" onChange={handleChange} />
              <input type="password" placeholder="Password" name="pass" onChange={handleChange} />
              {/* <span>
                <input type="checkbox" className="checkbox" name="check" onChange={ handleChange} /> 
                Keep me signed in
              </span> */}
              <button type="submit" className="btn btn-default">Login</button>
            </form>
          </div>{/*/login form*/}  
        </div>
        <div class="col-sm-1">
					<h2 class="or">OR</h2>
				</div>

				<div class="col-sm-4">
					<div class="signup-form">
						<h2>New User Signup!</h2>
				      <Register/>
					</div>
				</div>
      </div>
    </div>
  </section>
   )
}
export default Login;