import {
  createContext,
  useContext,
  useState,
  useEffect,
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
  logout: () => void
}

const userSession = (): User | null => {
  const stored = localStorage.getItem('user')
  return stored ? JSON.parse(stored) : null
}

export const UserContext = createContext<UserContextType>({
  user: userSession(),
  login: (user: User) => {},
  logout: () => {}
})

export const useUserContext = () => {
  return useContext(UserContext)
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    }
  }, [user])

  const login = (user: User) => {
    setUser(user)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}
