import { GithubIco, GoogleIco, TwitterIco, facebookIco } from "../../assets";
import { useAddScript, useAuth, useError, useFacebook, useGithub, useGoogle, useTwitter } from "../../hooks";
import SocialBtn from "./AuthSocialBtn";
import './AuthSocialButtons.scss'



const AuthSocialButtons = ({authType, loggedThroughBtn=''}:{authType :string,loggedThroughBtn?:string}) => {

    const {setUser,setLoading} = useAuth();
    const {setError} = useError()
    const {handleTwitter} = useTwitter(authType);
    const {handleFacebook} = useFacebook(authType); 
    const {handleGoogle} = useGoogle(authType);
    const {handleGitHub} = useGithub(authType);
    
    const content = (
      <>
      <p className="hint">or continue with social:</p>
      <div className='social-wrapper'>
        <SocialBtn execFunc={handleGoogle} icon={GoogleIco} socialType={`Google`} authType={authType} id={`googleBtn`} />
        <SocialBtn execFunc={handleFacebook} icon={facebookIco} socialType={`Facebook`} authType={authType} id={`facebookBtn`}   />
        <SocialBtn execFunc={handleTwitter} icon={TwitterIco} socialType={`Twitter`} authType={authType} id={`twitterBtn`}  />
        <SocialBtn execFunc={handleGitHub} icon={GithubIco} socialType={`Github`} authType={authType} id={`githubBtn`}  />
    </div>
      </> 
    )
  
    // if(loggedThroughBtn?.social){
    //   switch(loggedThroughBtn?.social){
    //     case 'Google':   return <SocialBtn   icon={GoogleIco} socialType={`Google`} authType={loginType} id={`googleBtn`} />
    //     case 'Github':   return <SocialBtn  execFunc={handleGitHub} icon={GithubIco} socialType={`Github`} loginType={loginType} id={`githubBtn`}  />
    //     case 'Twitter':  return <SocialBtn  execFunc={handleTwitter} icon={TwitterIco} socialType={`Twitter`} loginType={loginType} id={`twitterBtn`}  />
    //     case 'Facebook': return <SocialBtn  execFunc={handleFacebook} icon={facebookIco} socialType={`Facebook`} loginType={loginType} id={`facebookBtn`}   />
    //  }
    // }
    
    return content
  }
  
  export default AuthSocialButtons