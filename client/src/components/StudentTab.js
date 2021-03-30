import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom';
const StudentTab = (props) => {
    const [data, setData] = useState({})
   const {id} = useParams()
   console.log(id)
    useEffect(()=>{
        fetch(`/student/${id}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
          
            setData(result)
        })
     },[])

    return (
        
                              <div className="row">
                            <div className="col-sm-12">
                              {/* Tab variant tab card start */}
                              <div className="card">
                                <div className="card-header">
                                  <h5>Tab variant</h5>
                                  <div className="card-header-right">    <ul className="list-unstyled card-option">        <li><i className="icofont icofont-simple-left " /></li>        <li><i className="icofont icofont-maximize full-card" /></li>        <li><i className="icofont icofont-minus minimize-card" /></li>        <li><i className="icofont icofont-refresh reload-card" /></li>        <li><i className="icofont icofont-error close-card" /></li>  </ul></div>
                                </div>
                                <div className="card-block tab-icon">
                                  {/* Row start */}
                                  <div className="row">
                                    <div className="col-lg-12 col-xl-6">
                                      {/* <h6 class="sub-title">Tab With Icon</h6> */}
                                      <div className="sub-title">Tab With Icon</div>
                                      {/* Nav tabs */}
                                      <ul className="nav nav-tabs md-tabs " role="tablist">
                                        <li className="nav-item">
                                          <a className="nav-link active" data-toggle="tab" href="#home7" role="tab"><i className="icofont icofont-home" />Home</a>
                                          <div className="slide" />
                                        </li>
                                        <li className="nav-item">
                                          <a className="nav-link" data-toggle="tab" href="#profile7" role="tab"><i className="icofont icofont-ui-user " />Profile</a>
                                          <div className="slide" />
                                        </li>
                                        <li className="nav-item">
                                          <a className="nav-link" data-toggle="tab" href="#messages7" role="tab"><i className="icofont icofont-ui-message" />Messages</a>
                                          <div className="slide" />
                                        </li>
                                        <li className="nav-item">
                                          <a className="nav-link" data-toggle="tab" href="#settings7" role="tab"><i className="icofont icofont-ui-settings" />Settings</a>
                                          <div className="slide" />
                                        </li>
                                      </ul>
                                      {/* Tab panes */}
                                      <div className="tab-content card-block">
                                        <div className="tab-pane active" id="home7" role="tabpanel">
                                          <p className="m-0">1. This is Photoshop's version of Lorem IpThis is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean mas Cum sociis natoque penatibus et magnis dis.....</p>
                                        </div>
                                        <div className="tab-pane" id="profile7" role="tabpanel">
                                          <p className="m-0">2.Cras consequat in enim ut efficitur. Nulla posuere elit quis auctor interdum praesent sit amet nulla vel enim amet. Donec convallis tellus neque, et imperdiet felis amet.</p>
                                        </div>
                                        <div className="tab-pane" id="messages7" role="tabpanel">
                                          <p className="m-0">3. This is Photoshop's version of Lorem IpThis is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean mas Cum sociis natoque penatibus et magnis dis.....</p>
                                        </div>
                                        <div className="tab-pane" id="settings7" role="tabpanel">
                                          <p className="m-0">4.Cras consequat in enim ut efficitur. Nulla posuere elit quis auctor interdum praesent sit amet nulla vel enim amet. Donec convallis tellus neque, et imperdiet felis amet.</p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-12 col-xl-6 tab-with-img">
                                      <div className="sub-title">Tab With Images</div>
                                      {/* Nav tabs */}
                                      <ul className="nav nav-tabs md-tabs img-tabs b-none" role="tablist">
                                        <li className="nav-item">
                                          <a className="nav-link active" data-toggle="tab" href="#home8" role="tab">
                                            <img src={data.photo} className="img-fluid img-circle" alt={data.name} />
                                            <span className="quote"><i className="icofont icofont-quote-left bg-primary" /></span>
                                          </a>
                                        </li>
                                       
                                       
                                        
                                      </ul>
                                      {/* Tab panes */}
                                      <div className="tab-content card-block">
                                        <div className="tab-pane active" id="home8" role="tabpanel">
                                          <p className="text-center m-0">1. This is Photoshop's version of Lorem IpThis is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean mas Cum sociis natoque penatibus et magnis dis.....</p>
                                        </div>
                                        <div className="tab-pane" id="profile8" role="tabpanel">
                                          <p className="text-center m-0">2. Cras consequat in enim ut efficitur. Nulla posuere elit quis auctor interdum praesent sit amet nulla vel enim amet. Donec convallis tellus neque, et imperdiet felis amet.</p>
                                        </div>
                                        <div className="tab-pane" id="messages8" role="tabpanel">
                                          <p className="text-center m-0">3. This is Photoshop's version of Lorem IpThis is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean mas Cum sociis natoque penatibus et magnis dis.....</p>
                                        </div>
                                        <div className="tab-pane" id="settings8" role="tabpanel">
                                          <p className="text-center m-0">4. Cras consequat in enim ut efficitur. Nulla posuere elit quis auctor interdum praesent sit amet nulla vel enim amet. Donec convallis tellus neque, et imperdiet felis amet.</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* Row end */}
                                </div>
                              </div>
                              {/* Tab variant tab card start */}
                            </div>
                          </div>
                        
                     
           
    )
}

export default StudentTab
