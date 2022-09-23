import React from 'react'
import {Link} from 'react-router-dom'

function Sidebar() {
  return <>
  <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

{/* <!-- Sidebar - Brand --> */}
<a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
    <div className="sidebar-brand-icon rotate-n-15">
        <i className="fas fa-laugh-wink"></i>
    </div>
    <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
</a>

{/* <!-- Divider --> */}
<hr className="sidebar-divider my-0"/>

{/* <!-- Nav Item - Dashboard --> */}
<li className="nav-item active">
    <div className="nav-link">
        <i className="fas fa-fw fa-tachometer-alt"></i>
       <Link to='/Dashboard'><span style={{'color':'white'}}>Dashboard</span></Link>
       </div>
       {/* <!-- Heading --> */}
<div className="sidebar-heading">
    Interface
</div>
</li>

<li className="nav-item active">
    <div className="nav-link collapsed">
        <i className="fas fa-fw fa-cog"></i>
       <Link to='/sign-up'><span style={{'color':'white'}}>Create Users</span></Link>
       </div>
</li>
<li className="nav-item active">
    <div className="nav-link collapsed">
        <i className="fas fa-fw fa-cog"></i>
       <Link to='/user'><span style={{'color':'white'}}>All Users</span></Link>
       </div>
       </li>
<li className="nav-item active">
    <div className="nav-link collapsed">
        <i className="fas fa-fw fa-cog"></i>
       <Link to='/login'><span style={{'color':'white'}}>Login Users</span></Link>
       </div>
       </li>

{/* <!-- Divider --> */}
<hr className="sidebar-divider"/>
{/* <!-- Divider --> */}
<hr className="sidebar-divider d-none d-md-block"/>

{/* <!-- Sidebar Toggler (Sidebar) --> */}
<div className="text-center d-none d-md-inline">
    <button className="rounded-circle border-0" id="sidebarToggle"></button>
</div>

{/* <!-- Sidebar Message --> */}
<div className="sidebar-card d-none d-lg-flex">
    <img className="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="..."/>
    <p className="text-center mb-2"><strong>SB Admin Pro</strong> is packed with premium features, components, and more!</p>
    <a className="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">Upgrade to Pro!</a>
</div>

</ul>
  
  
  </>
}

export default Sidebar