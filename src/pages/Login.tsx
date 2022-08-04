import { FC, useState, MouseEvent, KeyboardEvent, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { formValidate, setTitle } from '../utils'
import { observer } from 'mobx-react-lite'
import { Context } from '../main'

const Login: FC = () => {

  setTitle('Войти')

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const { user } = useContext(Context)
  const router = useNavigate()

  const authHandler = async (e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const authed = user.auth(email, password)
    if (authed === 'success') {
      user.setIsAuth()
      router('/')
    } else {
      alert('Неверный логин или пароль')
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-slate-200">
      <form className="p-5 rounded-md flex flex-col items-center bg-slate-50">
        <h1 className="text-3xl mb-4">Войти</h1>
        <div className="mb-4 flex flex-col w-60">
          <label className="text-sm">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            className="p-2 mt-1 outline-none rounded-sm text-lg" type="text" 
          />
        </div>
        <div className="mb-4 flex flex-col w-60">
          <label className="text-sm">Пароль</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            className="p-2 mt-1 outline-none rounded-sm text-lg" type="password" 
          />
        </div>
        <button
          onClick={e => authHandler(e)}
          onKeyDown={e => e.key === 'Enter' && authHandler(e)}
          className={`px-3 py-1 rounded-lg border-2 border-solid border-green-400 bg-white ${formValidate(email, password) ? '' : 'opacity-50 cursor-not-allowed'}`}
        >
          Войти
        </button>
      </form>
    </div>
  )
}

export default observer(Login)