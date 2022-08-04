import { makeAutoObservable, } from "mobx"

class UserStore {

  private _isAuth: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  checkAuth(): boolean {
    this._isAuth = Boolean(localStorage.getItem('auth'))
    return this._isAuth
  }

  setIsAuth() {
    localStorage.setItem('auth', String(true))
    this._isAuth = true
  }

  auth(email: string, password: string) {
    if (
      email === 'test@test.com' 
      && password === 'testpassword'
    ) {
      return 'success'
    } else {
      return 'error'
    }
  }

  logOut() {
    localStorage.removeItem('auth')
    this._isAuth = false
  }
}

export default new UserStore()