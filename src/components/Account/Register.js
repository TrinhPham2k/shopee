import { useState } from "react";
import axios from "axios";
import FormErrors from './FormErrors';
function Register(){
    const [inputs,setInputs] =useState("");
    const [success,setSuccess] =useState("");
    const [avatar,setAvatar] =useState("");
    const [fileUpload,setFileUpload] =useState("")
    const [errors, setErrors] = useState({});
    const handleChange = (e)=>{
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state =>({...state,[nameInput]:value}))
    }
   const  handleUserInputFile = (e)=>{
       const file = e.target.files;
       let reader = new FileReader();
        reader.onload = (e) => {
           
            setAvatar(e.target.result) //cai nay de gui qua api
            setFileUpload(file[0])    //cai nay de toan bo thong file upload vao file de xuong check validate
        };
        reader.readAsDataURL(file[0]);
   }
   

    const handleSubmit = (e)=>{
        e.preventDefault();
        let errorSubmit={};
        let flag = true;
        if(inputs.name == undefined){
            flag = false;
            errorSubmit.name ="Vui long nhap name"
        }else{
          flag = true;
          errorSubmit.name =""
        } 
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
              errorSubmit.pass ="Vui long nhap password"
        }else{
            flag = true;
            errorSubmit.pass =""
        }
        if(inputs.phone == undefined){
            flag = false;
            errorSubmit.phone ="Vui long nhap phone"
        }else{
          flag = true;
          errorSubmit.phone =""
        }
        if(inputs.address == undefined){
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
            errorSubmit.avatar =''
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
        }else{
            setErrors({})
            const user ={
              name: inputs.name,
              email:inputs.email,
              password:inputs.pass,
              phone: inputs.phone,
              address:inputs.address,
              avatar:avatar,
              level:0
               
            }
            axios.post('http://localhost/laravel/laravel/public/api/register',user)
            .then(res =>{
              if(res.data.errors){
                //   có 2 lỗi : 1loi là kiểm tra form đăng nhập và lỗi thuws2 là lỗi do api trả về
                //   loi oi api tra ve
                setErrors(res.data.errors)
                setSuccess('')

              }
              else{
                  setSuccess('Dang ky thanh cong')
                 console.log('thanh cong1')
              }
            })
        }
    }
     
   return(
       <>
         <FormErrors errors={errors}/>
         <p>{success}</p>
        <form action="#" onSubmit={handleSubmit} enctype="multipart/form-data">
            <input type="text" placeholder="Name" name="name" onChange={handleChange}/>
            <input type="email" placeholder="Email Address" name="email" onChange={handleChange}/>
            <input type="password" placeholder="Password" name="pass" onChange={handleChange}/>
            <input type="text" placeholder="Phone" name="phone" onChange={handleChange}/>
            <input type="text" placeholder="Address"name="address" onChange={handleChange}/>
            <input type="file" placeholder="Avatar"name="avatar" onChange={ handleUserInputFile}/>
            <button type="submit" class="btn btn-default">Signup</button>
        </form> 
       </>
       
   )
}
export default Register;