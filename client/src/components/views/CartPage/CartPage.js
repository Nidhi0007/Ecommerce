import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCartItems, removeCartItem, onSuccessBuy } from '../../../_actions/user_actions'
import UserCardBlock from './sections/UserCardBlock'
import { Result, Empty } from 'antd'
import Paypal from '../../utils/Paypal'
import Axios from 'axios'
// function CartPage

function CartPage(props) {
    const dispatch = useDispatch()
    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)
    const [ShowSuccess, setShowSuccess] = useState(false)
    useEffect(() => {

        let cartItems = [];
        if (props.user.userData && props.user.userData.cart) {
            if (props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                });
                dispatch(getCartItems(cartItems, props.user.userData.cart))
                    .then((response) => {
                        if (response.payload.length > 0) {
                            calculateTotal(response.payload)
                           
                        }
                    })
            }
        }

    }, [props.user.userData])
    const calculateTotal = (cartDetail) => {
        let total = 70;

        cartDetail.map(item => {
            total += parseInt(item.price, 10) * item.quantity

        });
       
        setTotal(total)
        setShowTotal(true)

    }
    const removeFromCart = (productId) => {

        dispatch(removeCartItem(productId))
            .then((response) => {
                if (response.payload.cartDetail.length <= 0) {
                    setShowTotal(false)
                } else {
                    calculateTotal(response.payload.cartDetail)
                }
            })
    }
    const transactionSuccess=(data)=>{
        let variables ={
            cartDetail:props.user.cartDetail, paymentData:data

        }
        Axios.post('/api/users/successBuy', variables)
        .then(response=>{
            if(response.data.success){
                setShowSuccess(true)
                setShowTotal(false)
                dispatch(onSuccessBuy({
                    cart:response.data.cart,
                    cartDetail:response.data.cartDetail
                }))

            }else{
                alert('failed to buy')
            }
        })

    }
    const transactionErrors=()=>{
        console.log('paypal Error')
    }

    const transectionCancelled=()=>{
        console.log('paypal Cancelled')
    }
    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1>My Cart</h1>
            <div>

                <UserCardBlock
                    products={props.user.cartDetail}
                    removeItem={removeFromCart}
                />


                {ShowTotal ?
                    <div style={{ marginTop: '3rem' }}>
                        <h2>Total amount: ${Total} </h2>
                    </div>
                    :
                    ShowSuccess ?
                        <Result
                            status="success"
                            title="Successfully Purchased Items"
                        /> :
                        <div style={{
                            width: '100%', display: 'flex', flexDirection: 'column',
                            justifyContent: 'center'
                        }}>
                            <br />
                            <Empty description={false} />
                            <p>No Items In the Cart</p>
                            </div>
                }
            </div>



     
{/* paypal button */}
{ShowTotal &&
     <Paypal 
     
     toPay={Total}
     onSuccess={transactionSuccess}
     transactionError={transactionErrors}
     transactionCancel={transectionCancelled}

     />      
}

        </div>
    )
}
export default CartPage
