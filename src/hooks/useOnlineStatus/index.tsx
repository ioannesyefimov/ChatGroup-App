import { useContext } from "react";
import { OnlineStatusContext } from "../../components/CheckConnectionContext/Provider";
 const useOnlineStatus = () => {
    const store = useContext(OnlineStatusContext);
    return store;
  };

  export default useOnlineStatus