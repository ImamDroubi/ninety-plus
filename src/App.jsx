import { Route, Routes } from "react-router-dom"
import Home from "./components/views/Home"
import MainLayout from "./components/layouts/MainLayout"

function App() {
  return (
    <>
    <Routes>
        <Route path='/' element ={<MainLayout/>} />
        {/* <Route path='/try' element ={<QuickTry/>} />
        
        <Route path='/*' element={<TopbarLayout/>}>
          <Route path='login' element ={<SignIn/>} />
          <Route path='register' element ={<SignUp />}/>
          <Route path='user/:id' element ={<UserProfile/>}/>
          <Route path='profile' element ={<EditProfile/>}/>
        </Route>

        <Route path='/*' element ={<MainLayout />}>
          <Route path='mixing-zone' element={<MixingZone/>}/>
          <Route path='user-combinations' element={<UserCombinations/>}/>
          <Route path='user-tracks' element={<UserTracks/>}/>
        </Route> */}
      </Routes>
    </>
  )
}

export default App
