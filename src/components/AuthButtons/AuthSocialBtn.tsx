

export type SocialBtnProps = {
    authType:string
    id:string
    execFunc:(authType:string)=>any
    icon:string
    socialType:string
}
const SocialBtn =  ({authType,id,execFunc,icon,socialType}:SocialBtnProps) => {

  let googleBtn = (
    <div className="social-btn-container"  >
      <img src={icon} alt={`${socialType} icon`} />
      <button className="social-btn" id={id}></button> 
     </div>
  )

  let socialBtn = (
    <div className="social-btn-container"  >
      <img src={icon} alt={`${socialType} icon`} />
      <button onClick={()=> execFunc(authType)}   className="social-btn" id={id}> </button>
    </div>
  )
    return socialType === 'Google' ? googleBtn : socialBtn
  }
  
  export default SocialBtn