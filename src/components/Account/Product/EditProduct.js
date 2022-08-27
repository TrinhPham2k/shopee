import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import FormErrors from '../FormErrors'
function EditProduct() {
  const getId = useParams()
  const [errors, setErrors] = useState({})
  const [inputs, setInputs] = useState({
    status: 1,
    image: '',
  })
  const [categorydata, setCategory] = useState('')
  const [branddata, setBrand] = useState('')
  const [avatar, setAvatar] = useState('')
  const [fileUpload, setFileUpload] = useState('')

  // const [resp, setGitData] = useState({ data: null, repos: null });
  // useEffect(() => {
  //       const fetchData = async () => {
  //         const respGlobal = await axios(
  //             "http://localhost/laravel/laravel/public/api/user/product/" + getId.id
  //         );
  //         const respRepos = await axios(
  //             "http://localhost/laravel/laravel/public/api/category-brand"
  //         );

  //         setGitData({ data: respGlobal.data, repos: respRepos.data });
  //     };

  //     fetchData();
  //   }, []);

  useEffect(() => {
    const useData = JSON.parse(localStorage['userState'])
    const url =
      'http://localhost/laravel/laravel/public/api/user/product/' + getId.id
    const config = {
      headers: {
        Authorization: 'Bearer ' + useData.token.token,
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    }
    axios.get(url, config).then((res) => {
      // console.log(res.data);
      setInputs(res.data.data)
    })
  }, [])

  useEffect(() => {
    axios
      .get('http://localhost/laravel/laravel/public/api/category-brand')
      .then((res) => {
        setCategory(res.data.category)
        setBrand(res.data.brand)
      })
  }, [])

  const handleSelectCategory = () => {
    if (categorydata.length > 0) {
      return categorydata.map((value) => {
        //    console.log(value.category);
        return <option value={value.id}>{value.category}</option>
      })
    }
  }
  const handleSelectBrand = () => {
    if (branddata.length > 0) {
      return branddata.map((value) => {
        //    console.log(value.category);
        return <option value={value.id}>{value.brand}</option>
      })
    }
  }
  function handleShowSale(e) {
    // console.log(valuesale)
    if (inputs.status == 0) {
      return (
        <input
          type="text"
          placeholder="0"
          name="sale"
          onChange={handleChange}
        />
      )
    }
  }
  const handleChange = (e) => {
    let nameInput = e.target.name
    let value = e.target.value
    setInputs((state) => ({ ...state, [nameInput]: value }))
  }

  const handleInputFile = (e) => {
    const files = e.target.files
    setFileUpload(files)
  }

  const handleShowImage = () => {
    if (inputs.image.length > 0) {
      return inputs.image.map((value, index) => {
        return (
          <>
            <div>
              <img
                className="cart_img"
                src={
                  'http://localhost/laravel/laravel/public/upload/user/product/' +
                  inputs.id_user +
                  '/' +
                  value
                }
                alt=""
              />
              <input
                type="checkbox"
                temp={temp.includes(value)}
                name=""
                value={value}
                onChange={checkbox}
              />
            </div>
          </>
        )
      })
    }
  }
  const [temp, setTemplate] = useState([])
  console.log(temp)
  function checkbox(e) {
    let valueImage = e.target.value
    // console.log(valueImage);
    setTemplate((prev) => {
      // kiem tra xem hinh anh dc check da co torng mang nay chua
      const isChecked = temp.includes(valueImage)
      if (isChecked) {
        return temp.filter((item) => item !== valueImage)
      } else {
        return [...prev, valueImage]
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let errSubmit = {}
    let flag = true

    errSubmit.name = errSubmit.price = errSubmit.company = errSubmit.company_profile = errSubmit.detail =
      ''
    if (inputs.name == '') {
      flag = false
      errSubmit.name = 'Vui long nhap name Product'
    }
    if (inputs.price == '') {
      flag = false
      errSubmit.price = 'Vui long nhap price Product'
    }
    if (inputs.company_profile == '') {
      flag = false
      errSubmit.company_profile = 'Vui long nhap company_profile  Product'
    }
    if (inputs.detail == '') {
      flag = false
      errSubmit.detail = 'Vui long nhap detail Product'
    }
    // hinh con lai
    let itemremove = inputs.image.filter((item) => !temp.includes(item))
    //  console.log(fileUpload.length);
    let arr = itemremove.length + fileUpload.length

    //  console.log(arr);
    if (arr > 3) {
      flag = false
      errSubmit.image = 'Toi da uplad duoc 3 image'
    } else {
      flag = true
      errSubmit.image = ''
      Object.keys(fileUpload).map((valuefile) => {
        if (fileUpload[valuefile]['size'] > 1024 * 1024) {
          flag = false
          errSubmit.image = 'Loi size qua lon'
        } else {
          flag = true
          errSubmit.image = ''
        }
        let avatarArr = ['png', 'jpg', 'jpeg', 'PNG', 'JPG']
        let cutFile = fileUpload[valuefile]['name'].split('.')
        // console.log(cutFile[1])
        if (!avatarArr.includes(cutFile[1])) {
          flag = false
          errSubmit.image = 'loi khong ton tai duoi file'
        }
      })
    }

    if (!flag) {
      setErrors(errSubmit)
    } else {
      setErrors({})
      const useData = JSON.parse(localStorage['userState'])
      const url =
        'http://localhost/laravel/laravel/public/api/user/edit-product/' +
        inputs.id
      const config = {
        headers: {
          Authorization: 'Bearer ' + useData.token.token,
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      }

      const formData = new FormData()
      formData.append('name', inputs.name)
      formData.append('price', inputs.price)
      formData.append('category', inputs.id_category)
      formData.append('brand', inputs.id_brand)
      formData.append('company', inputs.company_profile)
      formData.append('detail', inputs.detail)

      Object.keys(fileUpload).map((item, i) => {
        // console.log(fileUpload[item]);
        formData.append('file[]', fileUpload[item])
      })

      temp.map((item, i) => {
        formData.append('avatarCheckBox[]', item)
      })
      //    console.log(temp);
      axios
        .post(url, formData, config)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  return (
    <div class="signup-form">
      <h2>Update Product</h2>
      <FormErrors errors={errors} />
      <form action="#" enctype="multipart/form-data" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={inputs.name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Price"
          name="price"
          value={inputs.price}
          onChange={handleChange}
        />

        <select
          name="category"
          value={inputs.id_category}
          onChange={handleChange}
        >
          {handleSelectCategory()}
        </select>

        <select
          name="brand"
          id=""
          form=""
          value={inputs.id_brand}
          onChange={handleChange}
        >
          {handleSelectBrand()}
        </select>

        <select
          name="status"
          id=""
          onChange={handleChange}
          value={inputs.status}
        >
          <option value="1">New(1)</option>
          <option value="0">Sale(0)</option>
        </select>
        {handleShowSale()}
        <input
          type="text"
          placeholder="Company profile"
          name="company_profile"
          value={inputs.company_profile}
          onChange={handleChange}
        />

        <input type="file" name="image" multiple onChange={handleInputFile} />
        <div class="cart-img-group">{handleShowImage()}</div>

        <textarea
          rows="5"
          placeholder="Detail"
          name="detail"
          value={inputs.detail}
          onChange={handleChange}
        ></textarea>

        <button type="submit" class="btn btn-default">
          Update
        </button>
      </form>
    </div>
  )
}
export default EditProduct

// - hinh anh muon xoa: avatarCheckBox[1,2]
// - hinh upload: file
//   + hinh con lai[3] + hinh upload <= 3

//   hinh ban dau [1,2,3]
//   hinh xoa [1,2]
//   kiem tra tung hinh anh xoa co trông hinh cu ban dau k?
//   co thi unset => [3] length

// hinh con lai
// hinh xoa
// hinh upload
