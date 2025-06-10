import { Routes, Route } from 'react-router'
import Home from './routes/home/home.component'
import NavBar from './routes/navbar/navbar.component'
import SignIn from './routes/sign-in/sign-in.component'

const Shop = () => {
  return(
    <h1>This is the shop</h1>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<NavBar/>}>
        <Route index element={<Home/>}/>{/* index={true}*/}
        <Route path='shop' element={<Shop/>}/>
        <Route path='sign-in' element={<SignIn/>}/>
      </Route>
    </Routes>
  )
}

export default App
