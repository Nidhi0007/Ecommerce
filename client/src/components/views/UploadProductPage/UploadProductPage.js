import React, { useState, useEffect } from 'react';
import FileUpload from '../../utils/FileUpload';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Axios from 'axios';
import * as ReactBootStrap from 'react-bootstrap'

const { Title } = Typography;
const { TextArea } = Input;


const Continents = [
    { key: 1, value: "India" },
    { key: 2, value: "Africa" }
]

function UploadProductPage(props) {
    const userId = localStorage.getItem('userId') || "";


    const [DescriptionValue, setDescriptionValue] = useState("")
    const [TitleValue, setTitleValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0)
    const [Images, setImages] = useState([])
    const [ContinentValue, setContinentValue] = useState(1)
    const [userProducts, setuserProducts] = useState([])
    const [EditProducts, setEditProducts]=useState(false)
const[productId, setProductId]=useState()






    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)

    }
    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)

    }
    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value)

    }
    const onContinentsSelectChange = (event) => {
        setContinentValue(event.currentTarget.value)
    }
    const uploadeImages = (newImages) => {
        setImages(newImages)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (!TitleValue || !DescriptionValue || !PriceValue || !ContinentValue || !Images) {
            return alert('fill all the fields')
        }
        const variables = {
            writer: props.user.userData._id,
        
            title: TitleValue,
            description: DescriptionValue,
            price: PriceValue,
            continents: ContinentValue,
            images: Images,


        }
        Axios.post('/api/product/uploadProduct', variables)
            .then(response => {
                if (response.data.success) {
                    alert('product successfully uploaded')

                    console.log(response.data)
                } else {
                    alert('failed to upload product')
                }
            })

    }


    const onEdit= (event) => {
        event.preventDefault();
        if (!TitleValue || !DescriptionValue || !PriceValue || !ContinentValue || !Images) {
            return alert('fill all the fields')
        }
        const variables = {
            writer: props.user.userData._id,
        
            title: TitleValue,
            description: DescriptionValue,
            price: PriceValue,
            continents: ContinentValue,
            images: Images,


        }
    
        Axios.put('/api/product/editProduct/'+ productId, variables)
        .then(response => {
            if (response.data.success) {
                console.log(response.data)
                alert('product successfully updated')

               
            } else {
                alert('failed to update product')
            }
        })
    }
    const del=(id)=> {
        Axios.delete('/api/product/deleteProducts/'+id)
        .then(response => {
            if (response.data.success) {
                console.log(response.data)
                alert('product successfully Deleted')

               
            } else {
                alert('failed to Delete product')
            }
        })

    }
    const reply_click=(product)=> {
        console.log(product)
        setProductId(product._id)
        setTitleValue(product.title)
        setDescriptionValue(product.description)
        setPriceValue(product.price)
        setContinentValue(product.continents) 
        setImages([]) 
    setEditProducts(true)
    }

    useEffect(() => {
        if (userId) {
            Axios.post('/api/product/userProducts', { userId: userId })
            .then(response => {
                if (response.data.success) {
                    setuserProducts([...userProducts, ...response.data.products])
                } else {
                    alert('failed')
                }
            })
        } else {
            console.log("please login")
        }
    }, [])

   
    const renderuserProduct = userProducts.map((product, index) => {
      
        return (
            <tr key={product._id}>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.sold}</td>
                <td><button onClick={() => reply_click(product)}>Edit</button></td>
                <td><button onClick={() => del(product._id)}>Delete</button></td>
            </tr>)

    })
    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2>Upload Product</h2>

            </div>
            <Form onSubmit={onSubmit}>
                <FileUpload refreshFunction={uploadeImages} />
                <br />
                <br />

                <br />
                <br />
                <Title>Title</Title>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                />
                <br />
                <br />
                <label>Price</label>
                <Input
                    onChange={onPriceChange}
                    value={PriceValue}
                    type="number"
                />
                <select onChange={onContinentsSelectChange}>
                    {Continents.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}

                </select>
                <br />
                <br />
                {EditProducts?
                <Button 
                 onClick={onEdit}>
              Update

                </Button>:
                <Button className="btn btn-priimary"
                onClick={onSubmit}>Submit</Button>}

            </Form>
            <div className="App">
                <ReactBootStrap.Table>
                    <tbody>
                        <thead>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Sold</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </thead>
                        <tbody>
                            {renderuserProduct}
                        </tbody>
                    </tbody>
                </ReactBootStrap.Table>
            </div>


        </div>


    )
}









export default UploadProductPage