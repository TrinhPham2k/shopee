import { useEffect, useState } from "react";
import axios from "axios";
import FormErrors from '../FormErrors';

function Update(){
 
   
    const [errors, setErrors] = useState({});
    const [avatar,setAvatar] =useState("");
    const [fileUpload,setFileUpload] =useState("")
    const [inputs,setInputs] =useState({
        token:"",
        id :"",
        username:"",
        email:"",
        address:"",
        phone:"" ,
        pass:""
    });
    useEffect(()=>{

        let userData = localStorage.getItem('userState')
       
        if(userData){
            const xx = JSON.parse(userData)
            // console.log(xx.token)
            // console.log(xx.data)
             setInputs({
                 token: xx.token,
                 id: xx.data.id,
                  username: xx.data.name,
                 email: xx.data.email,
                 address: xx.data.address,
                 phone:xx.data.phone,
                
             });
            
            
        }
    },[])
    
    const handleChange = (e) => {
        const nameInput = e.target.name
        const value = e.target.value
        setInputs(state=>({...state,[nameInput]:value}))

    }
    const  handleUserInputFile = (e)=>{
        const file = e.target.files;
        let reader = new FileReader();
         reader.onload = (e) => {
            
             setAvatar(e.target.result) 
             setFileUpload(file[0])    
         };
         reader.readAsDataURL(file[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let errorSubmit={};
        let flag = true;
        // console.log(inputs.username)
        if(inputs.username == "" || inputs.username == undefined){
            flag = false;
            errorSubmit.username ="Vui long nhap name"
        }else{
            flag = true;
            errorSubmit.username =""
        }
         
        if(inputs.phone == "" || inputs.phone == undefined){
            flag = false;
            errorSubmit.phone ="Vui long nhap phone"
        }else{
            flag = true;
            errorSubmit.phone =""
        }

        if(inputs.address == "" || inputs.address == undefined){
            flag = false;
            errorSubmit.address ="Vui long nhap address"
        }else{
            flag = true;
            errorSubmit.address =""
        }
       
        
        if(fileUpload ==''){
            flag = false;
            errorSubmit.avatar ='Vui long chon file'
        }else{
            flag = true;

            errorSubmit.avatar = ""
            if(fileUpload['size'] > 1024*1024){
                flag = false;
                errorSubmit.avatar ='loi size qua lon'
            }else{
                flag = true;
                errorSubmit.avatar =''
            }
            let avatarArr = ['png','jpg','jpeg','PNG','JPG']
            let cutFile = fileUpload['name'].split('.');
                // console.log(cutFile[1])
            if(!(avatarArr.includes(cutFile[1]))){
                flag = false;
                errorSubmit.avatar ="loi khong ton tai duoi file"
            }
        }

        if(!flag){
            setErrors(errorSubmit)
        }
        else{
            setErrors({})
           
            // console.log(user.id)
             const url = 'http://localhost/laravel/laravel/public/api/user/update/' + inputs.id
             const config ={
                headers:{
                    'Authorization': 'Bearer ' + inputs.token.token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept':'application/json'
                }
            }
            const formData = new FormData();
            formData.append('name',inputs.username);
            formData.append('email',inputs.email);
            formData.append('password',inputs.pass);
            formData.append('phone',inputs.phone);
            formData.append('address',inputs.address);
            formData.append('avatar',avatar);
           
           axios.post(url, formData, config)
            .then(res =>{
                // console.log(res)
                // loi api tra ve
                if(res.data.errors){
                    setErrors(res.data.errors)
                }else{
                    let objAvalue ={
                        data: res.data.Auth,
                        token: res.data.success
                    }
                    // console.log(objAvalue);
                    localStorage.setItem("userState",JSON.stringify(objAvalue))
                }
               
            })
            .catch(err =>console.error(err))
        }

        

    }
    // console.log(inputs)
    return(
        
        <div class="signup-form">
            <h2>User Update</h2>
            <FormErrors errors={errors}/>
            <form action="#" onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" name="username" value={inputs.username}   onChange={handleChange} />
                <input type="text" readonly placeholder="Email Address" name="email" value={inputs.email}  onChange={handleChange} />
                <input type="password" placeholder="Password" name="pass"  onChange={handleChange} />
                <input type="text" placeholder="Phone" name="phone" value={inputs.phone}  onChange={handleChange} />
                <input type="text" placeholder="Address"name="address" value={inputs.address}   onChange={handleChange}/>
                <input type="file" placeholder="Avatar"name="avatar" onChange={ handleUserInputFile} />
                <button type="submit" class="btn btn-default">Signup</button>
           </form> 
        </div>
      
    )
}
export default Update;