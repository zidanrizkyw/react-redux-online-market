import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export const SignInPage = (props) => {
    const {children} = props
    const userSelector = useSelector((state) => state.user)

    if (!userSelector.id) {
        return <Navigate to="/"/>
    }

    return children
}