import React, { createContext, useState} from 'react'

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState("")
  const [name, setName] = useState("")
  const [avatar, setAvatar] = useState("")
  const [repos, setRepos] = useState([])
  const [notFound, setNotFound] = useState(false)


  const updateUsername = (data) => {
    setUser(data)
  }

  const updateName = (data) => {
    setName(data)
  }

  const updateAvatar = (data) => {
    setAvatar(data)
  }

  const updateRepos = (data) => {
    setRepos(data)
  }

  const resetRepos = (data) => {
    setRepos([])
  }

  const updateFoundStatus = (data) => {
    setNotFound(data)
  }

  return (
    <UserContext.Provider value={{
      user,
      name,
      avatar,
      updateUsername: updateUsername,
      updateName: updateName,
      updateAvatar: updateAvatar,
      updateRepos: updateRepos,
      repos,
      resetRepos: resetRepos,
      notFound,
      updateFoundStatus: updateFoundStatus

    }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider