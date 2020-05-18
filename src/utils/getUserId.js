import jwt from 'jsonwebtoken'

const getUserId = (request)=>{
    const header=request.request.headers.authorization
    if(!header) throw Error("Error header is required")
    const token=header.replace('Bearer ','')
    const decoded=jwt.verify(token,'tokensecretkey')
    console.log(decoded)
    console.log(decoded.user.id)
    return decoded.user.id
}

export {getUserId as default}