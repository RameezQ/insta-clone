import React, { useEffect, useState } from 'react'
import { MDBDataTable } from 'mdbreact'
import { Fragment } from 'react'
import { Link, useHistory } from 'react-router-dom'
const StudentList = (props) => {
    const history = useHistory()
    const [datas, setData] = useState({products:[""]})
    useEffect((keyword = '', currentPage = 1)=>{
        let link = `/allproducts?keyword=${keyword}&page=${currentPage}`
        fetch(link,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setData(result)
        })
     },[])

const deleteProductHandler=(postid)=>{
    fetch(`/deletepost/${postid}`,{
        method:"delete",
        headers:{
            Authorization:"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        const newData = datas.filter(item=>{
            return item._id !== result._id
        })
        setData([...newData])
    })
    // history.push('/studentlist')
}


     const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'Roll NUmber',
                    field: 'rollNumber',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Father Name',
                    field: 'fatherName',
                    sort: 'asc'
                },
                {
                    label: 'Address',
                    field: 'address',
                    sort: 'asc'
                },
                {
                    label: 'Cell',
                    field: 'cell',
                    sort: 'asc'
                },
                {
                    label: 'Course',
                    field: 'course',
                    sort: 'asc'
                },
                {
                    label: 'Class Name',
                    field: 'inClass',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        datas.products.map(product => {
            data.rows.push({
                rollNumber: <small><Link to={`/student/profile/${product._id}`}>{product.rollNumber}</Link></small>,
                name:<small><Link to={`/student/profile/${product._id}`}>{product.name}</Link></small>,
                fatherName:<small>{product.fatherName}</small>,
                address: <small>{product.address}</small>,
                cell:<small>{product.cell}</small>, 
                course: <small>{product.course}</small>,
                actions: <Fragment>
                    <Link to={`/product/${product._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" 
                    onClick={() => deleteProductHandler(product._id)}
                    > 
                        <i className="fa fa-trash"></i> 
                     </button>
                </Fragment>
            })
        })

        return data;
    }

  

    return (
        <Fragment>
            <h5 ><Link className="btn btn-primary" to="/addstudent">New Addmission</Link></h5>
            <div className="row">

                <div className="col-12 col-md-10">
                    <Fragment>
                            <MDBDataTable
                                data={setProducts()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}




export default StudentList
