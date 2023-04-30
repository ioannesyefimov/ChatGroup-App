import { useContext} from "react"
import { CurrentChannelContext } from "../../components/ChatProvider/CurrentChannelProvider"

 
 
export default function useCurrentContext() {
    const value = useContext(CurrentChannelContext)
    return value
}