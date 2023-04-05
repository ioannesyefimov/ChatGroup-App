

export type SocialBtnProps = {
    authType:string
    id:string
    execFunc:(authType:string)=>any
    icon:string
    socialType:string
}
const SocialBtn =  ({authType,id,execFunc,icon,socialType}:SocialBtnProps) => {

    return (
      <div className="social-btn-container" >
        <img src={icon} alt={`${socialType} icon`} />
        {socialType === 'Google' ? (
            <button    className="social-btn" id={id}> </button> 
            ) : ( 
            <button onClick={()=> execFunc(authType)}   className="social-btn" id={id}> </button>
            )
        }
     </div>
    )
  }
  
  export default SocialBtn