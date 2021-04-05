import React, { useEffect, useState } from 'react'
import { MDBDataTable } from 'mdbreact'
import { Fragment } from 'react'
import { Link, useHistory } from 'react-router-dom'
const TeacherList = (props) => {
    const history = useHistory()
    const [datas, setData] = useState({products:[""]})
    useEffect((keyword = '', currentPage = 1)=>{
        let link = `/allTeachers?keyword=${keyword}&page=${currentPage}`
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
    fetch(`/teacher/${postid}`,{
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
                    label: 'Teacher Id',
                    field: 'teacherId',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Classes ',
                    field: 'classOfTeach',
                    sort: 'asc'
                },
                {
                    label: 'Subject',
                    field: 'subject',
                    sort: 'asc'
                },
                {
                    label: 'Cell',
                    field: 'cell',
                    sort: 'asc'
                },
                {
                    label: 'CNIC',
                    field: 'idCard',
                    sort: 'asc'
                },
                {
                    label: 'Salary',
                    field: 'salary',
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
                teacherId: <small><Link to={`/teacher/profile/${product._id}`}>{product.teacherId}</Link></small>,
                name:<small><Link to={`/teacher/profile/${product._id}`}>{product.name}</Link></small>,
                className:<small>{product.classOfTeach}</small>,
                subject: <small>{product.subject}</small>,
                cell:<small>{product.cell}</small>, 
                idCard: <small>{product.idCard}</small>,
                salary: <small>Rs.{product.salary}</small>,
                actions: <Fragment>
                    <Link to={`/teacher/profile/${product._id}`} className="btn btn-primary py-1 px-2">
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
            <h5 ><Link className="btn btn-primary" to="/addteacher">New Teacher</Link></h5>
            <div className="row">

                <div className="col-12 col-md-12">
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




export default TeacherList
