import { useMemo,useContext} from "react"
import { CurrentChannelContext } from "../../components/ChatProvider/CurrentChannelProvider"

 
 
export default function useCurrentContext() {
    const {currentChannel,setCurrentChannel} = useContext(CurrentChannelContext)

    return {currentChannel,setCurrentChannel}
}