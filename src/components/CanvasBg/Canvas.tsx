type PropsType= {
    bgUrl?:string
    bgColor?:string,
    bgSize?:'cover'|'contain' |'auto' ,
    bgPosition?:string,
    bgRepeat?:string
}
const Canvas = ({bgUrl,bgColor,bgSize,bgPosition,bgRepeat}:PropsType) => {
  return (
    <div 
    style={
        {
          position:'absolute',
          width:'100dvw',
        height:'100dvh',
        zIndex:'-1',
        backgroundColor:bgColor ?? 'none',
        backgroundPosition: bgPosition??"center",
        backgroundRepeat:bgRepeat ?? 'no-repeat',
        backgroundImage: `url(${bgUrl})` ,
        backgroundSize: bgSize ?? 'cover',
        }
    }
    className='canvas' id={'canvas'}>
        
    </div>
  )
}

export default Canvas