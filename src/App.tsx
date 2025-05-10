
import { Route, Routes } from 'react-router'
import './App.css'
import Navbar from './components/Navbar'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import TasksPage from './components/TasksPage'
import Home from './components/Home'
import AuthRequired from './components/AuthRequired'

function App() {
  return (
    <div className='container-fluid'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route element={<AuthRequired />}>
          <Route path="/tasks" element={<TasksPage />} />
        </Route>
      </Routes>

    </div>
  )
}

export default App