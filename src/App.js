import React from 'react'
import Dashboard from './components/Dashboard'
import Sidebar from './components/Sidebar'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import CreateStudent from './components/CreateStudent'
import EditStudent from './components/EditStudent'
import ViewStudent from './components/ViewStudent'
import Login from './components/Login'
import Forgot from './components/Forgot'

export const url = 'http://localhost:8000/users'

export const Students= React.createContext();

function App() {
  let data = {
monthly : '40,000' ,
annual : '4,80,000',
task : '10',
pending : '18'
}
  return <>
  <div className='main-wrapper'> 
<BrowserRouter>
<Sidebar/>
<Students.Provider value ={{data}}>
<Routes>
  <Route path="Dashboard" element={<Dashboard  data={data}/>}/>
  <Route path="sign-up" element={<CreateStudent/>}/>
  <Route path="login" element={<Login/>}/>
  <Route path="forgot" element={<Forgot/>}/>
  <Route path="reset/:id" element={<EditStudent/>}/>
  <Route path="user" element={<ViewStudent/>}/>
  <Route path="*" element={<Login/>}/>
</Routes>
</Students.Provider>
</BrowserRouter>
  
  </div>
  </>
} 
export default App