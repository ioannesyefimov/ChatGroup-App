import { useEffect } from "react";
import { GithubIco, GoogleIco, TwitterIco, facebookIco } from "../../assets";
import { useAddScript, useFacebook, useGithub, useGoogle, useTwitter } from "../../hooks";
import SocialBtn from "./AuthSocialBtn";
import './AuthSocialButtons.scss'



const AuthSocialButtons = ({authType, redirectUrl=''}:{authType :string,redirectUrl?:string}) => {

    const {handleTwitter} = useTwitter(authType);
    const {handleFacebook} = useFacebook(authType); 
    const {handleGoogle} = useGoogle(authType,redirectUrl);
    const {handleGitHub} = useGithub(authType);

    useAddScript({id:'oauthGoogle', src:'https://accounts.google.com/gsi/client',text:''})
    useAddScript({id: 'facebookAuth',src:'https://connect.facebook.net/en_US/sdk.js', text:''})


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
    return content
  }
  
  export default AuthSocialButtons