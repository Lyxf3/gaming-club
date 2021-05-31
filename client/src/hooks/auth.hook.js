import {useState, useCallback, useEffect} from 'react'
import {data} from '../pages/tournaments-page/data'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken
        }))
        const important = JSON.parse(localStorage.getItem("Important data"))

        if (!important) {
            localStorage.setItem("Important data", JSON.stringify(data))
        }

    }, [])


    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
        localStorage.removeItem("Important data")
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId)
        }
        setReady(true)
    }, [login])


    return { login, logout, token, userId, ready }
}