import React, {useEffect,useState} from 'react'
import {Button, Descriptions } from 'antd'

function ProductInfo(props) {
    const [Product, setProduct] = useState({})
    useEffect(() => {
        setProduct(props.detail)
     
    }, [props.detail])
    const addToCartHandler=()=>{
props.addTocart(props.detail._id)

    }
    return (
        <div>
        <Descriptions title="Product Info">
    <Descriptions.Item label="Price">{Product.price}</Descriptions.Item>
        <Descriptions.Item label="Sold">{Product.sold}</Descriptions.Item>
        <Descriptions.Item label="view">{Product.view}</Descriptions.Item>
        <Descriptions.Item label="Description">{Product.descriptions}</Descriptions.Item>
        <br/>
        <div style={{dispaly:"flex", justifyContent:'center'}}>
<Button size="large" shape="round" type="danger" 
onClick={addToCartHandler}>
    Add to Cart

</Button>
        </div>
        </Descriptions>
        </div>
    )
}

export default ProductInfo
