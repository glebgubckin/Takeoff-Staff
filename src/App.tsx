import { FC, useContext } from 'react'
import Login from './pages/Login'
import Contacts from './pages/Contacts'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Context } from './main'
import { observer } from 'mobx-react-lite'

const App: FC = () => {

  const { user } = useContext(Context)
  const isAuth: boolean = user.checkAuth()

  return (
    <Router>
      <Routes>
        {
          isAuth
          ? <Route path="/" element={<Contacts />} />
          : <Route path="login" element={<Login />} />
        }
        {
          isAuth
          ? <Route path="*" element={<Navigate to="/" />} />
          : <Route path="*" element={<Navigate to="/login" />} />
        }
      </Routes>
    </Router>
  )
}

export default observer(App)