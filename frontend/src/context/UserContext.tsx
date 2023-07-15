import {
  createContext,
  useContext,
  useState,
  ReactNode
} from 'react'

export interface User {
  email: string
  accessToken: string
  balance?: string
}

interface UserContextType {
  user: User | null
  login: (user: User) => void
  updateBalance: (balance: number) => void,
  logout: () => void
}

const userSession = (): User | null => {
  const stored = localStorage.getItem('user')
  return stored ? JSON.parse(stored) : null
}

export const UserContext = createContext<UserContextType>({
  user: userSession(),
  login: (user: User) => { },
  updateBalance: (balance: number) => {},
  logout: () => { }
})

export const useUserContext = () => {
  return useContext(UserContext)
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<User | null>(() => {
  //   const stored = localStorage.getItem('user')
  //   return stored ? JSON.parse(stored) : null
  // })
  const localUser = JSON.parse(localStorage.getItem('user') as string) || undefined;
  let [user, setUser] = useState(localUser);

  const login = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user ))
    setUser(user)
  }

  const updateBalance = (balance: number) => {
    user.balance = balance;
    localStorage.setItem('user', JSON.stringify(user ))
    setUser(user)
  }

  const logout = () => {
    setUser(null)
    localStorage.clear();
  }

  return (
    <UserContext.Provider value={{ user, login, updateBalance, logout }}>
      {children}
    </UserContext.Provider>
  )
}
