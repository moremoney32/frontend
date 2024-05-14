
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './pages/Home';
import { PageLogin } from './pages/PageLogin';
import { Profile } from './pages/Profile';
import { Menu } from './pages/Menu';



const App = () => {
  
  return (
    <BrowserRouter>
    <div className="App" id='body'>
          <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<PageLogin />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/menu" element={<Menu />} /> 
          </Routes>     
    </div>
   
</BrowserRouter>
  )
}

export default App