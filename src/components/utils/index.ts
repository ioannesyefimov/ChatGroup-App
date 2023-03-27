import { RefObject } from "react";

 const  validateEmail = function(email:string) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
       return regex.test(email)
};


interface validateProps {
  firstRef: RefObject<any>
  secondRef: RefObject<any>
  thirdRef: RefObject<any>
}

  
 function validatePassword(password:string, name:string){
    // check whether password doesn't contains at least 
    // 1 uppercase, 1 lowercase, 1 number, and 1 special character. 
    // If it doesn't contains everything mentioned, returns true
    const password_rgx = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/

    function kmpSearch(pattern:string, text:string ) {
      
        if (pattern.length == 0)
          return 0; // Immediate match
        // change inputs to lowercase so that comparing will be non-case-sensetive
       pattern = pattern.toLowerCase()
       text = text.toLowerCase()
        // Compute longest suffix-prefix table
        let lsp = [0]; // Base case
        for (let i = 1; i < pattern.length; i++) {
          let j = lsp[i - 1]; // Start by assuming we're extending the previous LSP
          while (j > 0 && pattern[i] !== pattern[j])
            j = lsp[j - 1];
          if (pattern[i] === pattern[j])
            j++;
          lsp.push(j);
        }
      
        // Walk through text string
        let j = 0; // Number of chars matched in pattern
        for (let i = 0; i < text.length; i++) {
          while (j > 0 && text[i] != pattern[j])
            j = lsp[j - 1]; // Fall back in the pattern
          if (text[i]  == pattern[j]) {
            j++; // Next char matched, increment position
            if (j == pattern.length)
              return i - (j - 1);
          }
        }
        return -1; // Not found
      }
    
      const hasNamePatternInPassword = kmpSearch(name, password)

      const isInValidPassword = password_rgx.test(password)
    
    if((hasNamePatternInPassword !== -1) ){
        return Errors.PASSWORD_CONTAINS_NAME
    } else if(isInValidPassword === true) {
        return Errors.INVALID_PASSWORD
    } else {
      return `valid`
    }
}

 const Errors = {
  INVALID_PASSWORD: `must be in English and contains at least one uppercase and lowercase character, one number, and one special character`,
  PASSWORD_CONTAINS_NAME: `MUST_NOT_CONTAIN_USER'S_INPUT`,
  USER_EXIST: 'USER_ALREADY_EXISTS',
  EMAIL_EXIST: 'EMAIL_ALREADY_EXISTS',
  NOT_FOUND: 'NOT_FOUND',
  WRONG_PASSWORD: `WRONG_PASSWORD`,
  INVALID_EMAIL: `INVALID_EMAIL`,
  WRONG_EMAIL: `WRONG_EMAIL`,
  CANNOT_CONTAIN_NUMBERS: `CANNOT_CONTAIN_NUMBERS`,
  LOGGED_THROUGH_SOCIAL: "LOGGED_THROUGH_SOCIAL",
  CANNOT_BE_EMPTY: `CANNOT_BE_EMPTY`,
  NOT_SIGNED_UP: `NOT_SIGNED_UP`,
  SIGNED_UP_DIFFERENTLY: `SIGNED_UP_DIFFERENTLY`,
  ALREADY_EXISTS: `ALREADY_EXISTS`,
  INVALID_NUMBER: `INVALID_NUMBER`,
  CHANGES_APPLIED: `CHANGES_APPLIED`,
  CHANGES_NOT_APPLIED: `CHANGES_NOT_APPLIED`,
  JWT_MALFORMED: `jwt malformed` ,
  MISSING_ARGUMENTS: `MISSING_ARGUMENTS`,
  JWT_EXPIRED: `jwt expired`,
  ABORTED_TRANSACTION: `ABORTED_TRANSACTION`,


  
}


const getUrlWithQueryParams = (baseUrl:string, params:object):string =>{
  const query = Object.entries(params)
  .map(([key,value])=> `${key}=${encodeURIComponent(value)}`)
    .join(`&`)
    return `${baseUrl}?${query}`
}


const timeout = (delay:number)=>{
  return new Promise(res=>setTimeout(res,delay));
}

const convertBase64 = (file:File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      resolve(fileReader.result)
    };

    fileReader.onerror=(err)=>{
      reject(err)
    }
  })
}
interface FetchProps {
  url: string
  method?: 'get' | 'post' | 'delete' | 'update' | 'POST' | 'GET' | 'DELETE' | 'UPDATE'
  body?: Object
  headers?: HeadersInit | undefined 
  signal?: AbortSignal
}
 const APIFetch = async({url,
  method='get',
 headers={
  "Content-Type": "application/json",
}, 
body,
signal}:FetchProps) => {
  console.log(`headers: `, headers);
  console.log(`body: `, body);
  console.log(`url: `, url)
 return !method?.toLowerCase().includes('get')   ? (
  await fetch(url, {
    method: method,
    signal,
    headers,
    body: JSON.stringify(body)
  }).then(response=>response.json())
 ) : (
  
  await fetch(url, {
    method: method,
    headers,
    signal,
  }).then(response=>response.json())
 )
}

const isObj = (obj:any) =>{
  return (typeof obj === 'object' && !Array.isArray(obj) && obj !== null && obj.constructor === Object )

}
const isTrue = (arg:any) =>{
  if(Array.isArray(arg) && !arg.length){
    return {arg, is:false}
  }
  if(isObj(arg) && !Object.keys(arg).length){
    return {arg, is: false}
  }
  return {arg, is: !!arg}
}

function countWords(str:string) {
  const arr = str.split(' ');

  return arr.filter(word => word !== '').length;
}

function getFirstLetter(str:string,words?:number){
  if(!str) return Errors.MISSING_ARGUMENTS
  let letters
  if(countWords(str) > 1){
    let arr = str.split(' ')
    letters = arr.map(word=>word.charAt(0))
    if(words){
      return letters.slice(0,words).join('')

    }
    return letters.join('')

  } else if(countWords(str) == 1){
    letters = str.charAt(0)
    return letters
  }

}
 
  export {
    countWords,getFirstLetter,
    convertBase64, timeout, getUrlWithQueryParams, Errors, validateEmail,validatePassword, isTrue,isObj,APIFetch
  }