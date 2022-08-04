import { makeAutoObservable } from 'mobx'
import { generateId } from '../utils/index'

interface IContact {
  id: number,
  name: string
}

class ContactStore {
  private _contacts: IContact[] = []

  constructor() {
    makeAutoObservable(this)
  }

  get contacts(): IContact[] {
    return this._contacts
  }

  setContacts(allContacts: IContact[]) {
    this._contacts = [...allContacts]
  }

  addContact(name: string) {
    const id = generateId()
    const existingId = this._contacts.filter(contact => contact.id === id)
    if (existingId.length === 0) {
      this._contacts.push({id, name})
      localStorage.setItem('contacts', JSON.stringify(this._contacts))
    } else {
      this.addContact(name)
    }
  }

  removeContact(id: number) {
    this._contacts = this._contacts.filter(contact => contact.id !== id)
    localStorage.setItem('contacts', JSON.stringify(this._contacts))
  }

  updateContact(id: number, updatedName: string) {
    this._contacts = this._contacts.map(el => {
      if (el.id === id) {
        el.name = updatedName
      }
      return el
    })
    localStorage.setItem('contacts', JSON.stringify(this._contacts))
  }
}

export default new ContactStore()