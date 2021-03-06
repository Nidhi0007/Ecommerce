import React , {useState} from 'react'
import {Checkbox, Collapse} from 'antd'
const {Panel} =Collapse

const continents=[
{
    "_id":1,
    "name":"Africa"
},
{
    "_id":2,
    "name":"Asia"
},
{
    "_id":3,
    "name":"Nort America"
},
{
    "_id":4,
    "name":"South America"
},


]

function CheckBox(props) {
    const [Checked, setChecked] =useState([])
    const handleToggle=(value)=>{
        
        const currentIndex=Checked.indexOf(value)
        const newChecked =[...Checked];

        if(currentIndex === -1){
            newChecked.push(value)
        }else{
            newChecked.splice(currentIndex,1)
        }

        setChecked(newChecked)
        props.handleFilter(newChecked)
    }
    const renderCheckBoxList=()=>(continents.map((value, index)=>(
        <React.Fragment key={index}>
            <Checkbox
            onChange={()=>handleToggle(value._id)}
            type="checkbox"
            checked={Checked.indexOf(value._id)===-1 ? false:true}
            />
            <span>{value.name}</span>
        </React.Fragment>
    )))
    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel header key="1">
{renderCheckBoxList()}
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox
