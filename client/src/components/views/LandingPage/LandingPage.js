import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import {Col,Card, Row} from 'antd';
import ImageSlider from '../../utils/ImageSlider'
import CheckBox from './sections/CheckBox';
import RadioBox from './sections/RadioBox';
import SearchFeature from './sections/SearchFeature'
import {continents, price} from './sections/Datas'
const {Meta} =Card
function LandingPage() {
    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)
    const [SearchTerms, setSearchTerms] = useState("")
    const [Filters, setFilters]=useState({
        continents:[],
        price:[]
    })
    useEffect(() => {
        const variables={
            skip:Skip,
            limit:Limit,
        }
        getProducts(variables)

    }, [])

const getProducts= (variables) =>{
    

    Axios.post('/api/product/getProducts', variables)
            .then(response => {
                if (response.data.success) {
                    if (variables.loadmore){
                    setProducts([...Products,...response.data.products])
                    }else{
                        setProducts(response.data.products)
                    }
                    setPostSize( response.data.PostSize)
                   
                } else {
                    alert('fAILED')
                }
            })
        }

const onLoadMore=()=>{
let skip=Skip+Limit

const variables={
    skip:skip,
    limit:Limit,
    loadmore:true
}
getProducts(variables)
}
    const renderCards =Products.map((product,index)=>{
        return <Col lg={6} md={8} xs={24}>
        <Card
        honerable ={true}
        cover={<a href={`/product/${product._id}`}><ImageSlider images={product.images}/></a>}
        >
        <Meta
        title={product.title}
        description={`$${product.price}`}
        
        />
        
        </Card>
         </Col>
    })
const showFilteredResults=(filters)=>{
    const variables={
        skip:0,
        limit:Limit,
        filters:filters
    }
    getProducts(variables)
    setSkip(0) 
}
const handlePrice=(value)=>{

    const data =price;
    let array=[];

    for(let key in data){
        console.log('key',key)
        if(data[key]._id===parseInt(value,10)){
            array=data[key].array;
        }
    }
    console.log('array', array)
    return array
return
}

    const handleFilter =(filters, category)=>{

        console.log(filters)
const newFilters ={ ...Filters}
console.log(newFilters)
newFilters[category]=filters
if(category==="price"){
   
let priceValue=handlePrice(filters)
newFilters[category]=priceValue
}
console.log(newFilters)
showFilteredResults(newFilters)
setFilters(newFilters)
    }

    const updateSearchTerms = (newSearchTerm) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerms(newSearchTerm)

        getProducts(variables)
    }

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
            
            </div>
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24} >
                    <CheckBox
                        list={continents}
                        handleFilter={filters => handleFilter(filters, "continents")}
                    />
                </Col>
                <Col lg={12} xs={24}>
                    <RadioBox
                        list={price}
                        handleFilter={filters => handleFilter(filters, "price")}
                    />
                </Col>
            </Row>


            {/* Search  */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>

                <SearchFeature
                    refreshFunction={updateSearchTerms}
                />

            </div>


            {Products.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No post yet...</h2>
                </div> :
                <div>
                    <Row gutter={[16, 16]}>

                        {renderCards}

                    </Row>


                </div>
            }
            <br/><br/>
           
                {PostSize>= Limit &&
                 <div style={{display:'flex', justifyContent:'center'}}>
                <button onClick={onLoadMore}>Load More</button>

                </div>}

        </div>

    )
}

export default LandingPage
