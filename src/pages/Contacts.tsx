import { FC, MouseEvent, KeyboardEvent, useContext, useMemo, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite'
import { setTitle } from '../utils'
import { Context } from '../main'

interface IContact {
  id: number,
  name: string
}

const Contacts: FC = () => {

  setTitle('Контакты')

  const [newContact, setNewContact] = useState<string>("")
  const [changindId, setChangindId] = useState<number>(0)
  const [changingContact, setChangingContact] = useState<string>("")
  const [seachQuery, setSeachQuery] = useState<string>("")
  const { contacts , user } = useContext(Context)

  useEffect(() => {
    const savedContacts: string | null = localStorage.getItem('contacts')
    if (savedContacts) {
      contacts.setContacts(JSON.parse(savedContacts))
    }
  }, [])

  const seachedContects = useMemo(() => {
    if (seachQuery === '') {
      return contacts.contacts
    } else {
      return contacts.contacts.filter(contact => contact.name.toLowerCase().includes(seachQuery.toLowerCase()))
    }
  }, [seachQuery, contacts.contacts])

  const addContactHandler = (e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>) => {
    contacts.addContact(newContact)
    setNewContact('')
  }

  const removeContactHandler = (e: MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault()
    e.stopPropagation()
    contacts.removeContact(id)
  }

  const changeContactHandler = (e: KeyboardEvent<HTMLInputElement>, id: number, updatedName: string) => {
    e.preventDefault()
    e.stopPropagation()
    contacts.updateContact(id, updatedName)
    setChangindId(0)
  }

  const changeContactInputHandler = (e: MouseEvent<HTMLParagraphElement> , contact: IContact) => {
    e.preventDefault()
    e.stopPropagation()
    setChangingContact(contact.name)
    setChangindId(contact.id)
  }

  const logOut = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    user.logOut()
  }
  
  return (
    <div
      className="w-full p-4 min-h-screen flex justify-center items-center bg-slate-200"
    >
      <button
        onClick={e => logOut(e)}
        className="fixed top-5 right-8"
      >
        Выйти
      </button>
      <div
        className="w-96 p-5 rounded-md flex flex-col items-center bg-slate-50" 
      >
        <h1 className="text-3xl mb-6">Контакты</h1>
        <div className="flex flex-col w-80 mb-2">
          <label className="text-sm mb-1">Поиск</label>
          <input
            value={seachQuery}
            onChange={e => setSeachQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addContactHandler(e)}
            className="text-lg p-2 w-80 outline-none"
            type="text" 
          />
        </div>
        <div className="flex flex-col w-80 mb-2">
          <label className="text-sm mb-1">Добавить контакт</label>
          <div className="flex justify-between items-center">
            <input
              value={newContact}
              onChange={e => setNewContact(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addContactHandler(e)}
              className="text-lg p-2 w-60 outline-none"
              type="text" 
            />
            <button onClick={e => addContactHandler(e)}>Добавить</button>
          </div>
        </div>
        <div className="flex flex-col">
          {
            seachedContects.length
            ? seachedContects.map(contact => {
              return (
                <div 
                  key={contact.id}
                  onClick={e => changeContactInputHandler(e, contact)}
                  className="flex flex-row justify-between items-center text-lg w-80 p-2 mb-2 border-solid border-2 border-gray-400"
                >
                  {
                    changindId === contact.id
                    ? <input
                      className="bg-inherit"
                      type="text"
                      autoFocus
                      value={changingContact}
                      onKeyDown={e => e.key === 'Enter' && changeContactHandler(e, contact.id, changingContact)}
                      onChange={e => setChangingContact(e.target.value)}
                    />
                    : <p>{contact.name} </p>
                  }
                  <button
                    onClick={(e) => removeContactHandler(e, contact.id)}
                    className="p-1 text-sm border-2 border-gray-300"
                  >
                    Удалить
                  </button>
                </div>
              )
            })
            : <p className="text-lg">Контактов нет</p>
          }
        </div>
      </div>
    </div>
  )
}

export default observer(Contacts)