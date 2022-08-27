import axios from "axios";
import { useEffect, useState } from "react";
import FormErrors from '../FormErrors';

function Add(){
    const [categorydata,setCategory] = useState("");
    const [branddata,setBrand] = useState("");
    const [valuesale,setValuesale] = useState(1);
    const [inputs,setInputs] =useState({
        status: 1
    });
    // const [image,setImage] = useState("");
    const [fileUpload,setFileUpload] =useState("")
    const [errors, setErrors] = useState({});
    useEffect(()=>{
        axios.get("http://localhost/laravel/laravel/public/api/category-brand")
          .then(res=>{
    
            setCategory(res.data.category);
            setBrand(res.data.brand);
          })
    },[])
    
    const handleChange =(e)=>{
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state => ({...state,[nameInput]:value}))
    }
    // console.log(inputs.brand);
    // console.log(inputs);

     const handleSelectCategory =()=>{
        if(categorydata.length > 0){
            return(
                categorydata.map(value=>{

                //    console.log(value.category);
                  return(
                        <option value={value.id}>{value.category}</option>
                  )
                
                })
            )
  
        }
    }
    const handleSelectBrand =()=>{
        if(branddata.length > 0){
            return(
                branddata.map(value=>{
                //    console.log(value.category);
                  return(
                        <option value={value.id}>{value.brand}</option>
                  )
                
                })
            )
  
        }
    }
    
    // const handleChoose =(e)=>{
    //     setValuesale(e.target.value)
    // }
    //  console.log(valuesale);
    function handleShowSale(e){
        // console.log(valuesale)
        if(inputs.status == 0){
            return(
                <input type="text" placeholder="0" name="sale" onChange={handleChange}/>
            )
        }
       
    }
    
    const  handleInputFile =(e)=>{
        
        const files = e.target.files
        // console.log(files);
            setFileUpload(files)
           
    }
    // console.log(fileUpload);

    const handleSubmit =(e)=>{
         e.preventDefault();
         let errorSubmit ={};
         let flag =true;
        //  console.log(inputs.name);
         if( inputs.name == undefined){
            flag = false;
            errorSubmit.name ="Vui long nhap name"
         }else{
            flag = true;
            errorSubmit.name =""
         }
         if(inputs.price == undefined){
            flag = false;
            errorSubmit.price ="Vui long nhap price"
         }else{
            flag = true;
            errorSubmit.price =""
         }
       
        if(inputs.company == undefined){
            flag = false;
            errorSubmit.company ="Vui long nhap company"
         }else{
            flag = true;
            errorSubmit.company =""
         }
         if(inputs.detail == undefined){
            flag = false;
            errorSubmit.detail ="Vui long nhap detail"
         }else{
            flag = true;
            errorSubmit.detail =""
         }
        //  console.log(fileUpload);
         if(fileUpload == ""){
             
            flag = false;
            errorSubmit.image ="Vui long nhap image"
         } else{
            flag = true;
            errorSubmit.image =""
            if(fileUpload.length >3){
               flag = false;
               errorSubmit.image ="Toi da uplad duoc 3 image"
            }else{
                flag = true;
                errorSubmit.image =""
                Object.keys(fileUpload).map(valuefile =>{
                    // console.log(fileUpload[valuefile]['size']);
                    if(fileUpload[valuefile]['size'] > 1024*1024){
                        flag = false;
                        errorSubmit.image ='Loi size qua lon'
                    }else{
                        flag = true;
                        errorSubmit.image =''
                    }
                    let avatarArr = ['png','jpg','jpeg','PNG','JPG']
                    let cutFile = fileUpload[valuefile]['name'].split('.');
                        // console.log(cutFile[1])
                    if(!(avatarArr.includes(cutFile[1]))){
                        flag = false;
                        errorSubmit.image ="loi khong ton tai duoi file"
                    }
                })
            }
               
         }

         if(!flag){
            setErrors(errorSubmit)
         }else{

            setErrors({})
            const useData = JSON.parse(localStorage['userState'])
           
            const url = "http://localhost/laravel/laravel/public/api/user/add-product"
            // console.log(useData.token.token);
            const config ={
                headers:{
                    'Authorization': 'Bearer ' + useData.token.token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept':'application/json'
                }
            } 

            const formData = new FormData();
            formData.append('name',inputs.name)
            formData.append('price',inputs.price)
            formData.append('category',inputs.category)
            formData.append('brand',inputs.brand)
            formData.append('company',inputs.company)
            formData.append('detail',inputs.detail)
            formData.append('status',inputs.status)
            formData.append('sale',inputs.sale)
            Object.keys(fileUpload).map((item,i)=>{
                // console.log(fileUpload[item]);
                formData.append('file[]',fileUpload[item])
            })
            axios.post(url,formData,config)
              .then(res=>{
                  console.log(res);
              })
              .catch(err=>{console.log(err);})
         }
        
    }

    return(
        
        <div class="signup-form">
            <h2>Create Product</h2>
            <FormErrors errors={errors}/>
            <form action="#" onSubmit={handleSubmit} enctype="multipart/form-data" >
                <input type="text" placeholder="Name" name="name" onChange={handleChange}    />
                <input type="text" placeholder="Price" name="price" onChange={handleChange}   />

                <select name="category" id="" form="" onChange={handleChange}    >
                     <option value="">vui long nhap category</option>
                     {handleSelectCategory()}
                </select>
                 
                <select name="brand" id="" form="" onChange={handleChange}   >
                      <option value="">vui long nhap brand</option>
                     {handleSelectBrand()}
                </select>

                <select name="status" id=""  onChange={handleChange} value={inputs.status}>
                  
                    <option value="1">New(1)</option>
                    <option value="0">Sale(0)</option>
                </select>
               
                  {handleShowSale()}
                   
                <input type="text" placeholder="Company profile" name="company"  onChange={handleChange}  />
                
                <input type="file" name="image" multiple  onChange={handleInputFile}/>

                <textarea rows="5" placeholder="Detail" name="detail" onChange={handleChange}></textarea>
                
                <button type="submit" class="btn btn-default">ADD</button>
           </form> 
        </div>
           
    )
}
export default Add;