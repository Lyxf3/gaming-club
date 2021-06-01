import {useState, useCallback, useEffect} from 'react'
import {data} from '../pages/tournaments-page/data'
const storageName = 'userData'

export const useAuth = () => {

    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)
    const [bookedPc, setBookedPc] = useState(null)
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

    const bookPc =  useCallback(async (header, id, price) => {
        await setBookedPc({header, id, price})
        localStorage.setItem("Booked PC", JSON.stringify({header, id, price}))
    }, [])


    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
        localStorage.removeItem("Important data")
        localStorage.removeItem("Booked PC")

    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId)
        }
        setReady(true)
    }, [login])
    const bookedPcHandler = useCallback(() => {
        localStorage.removeItem("Booked PC")
        setBookedPc(null)
    },[])
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("Booked PC"))
        if (data) {
            bookPc(data.header, data.id, data.price)
        }
    }, [bookPc])


    return { login, logout, token, userId, ready, bookPc, bookedPc, bookedPcHandler }
}