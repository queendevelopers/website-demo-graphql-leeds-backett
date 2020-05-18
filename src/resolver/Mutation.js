import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getUserId from '../utils/getUserId'

const Mutation= {
  async LoginUser(parent,args,{prisma},info){
    const user = await prisma.query.user({where:{
      email:args.data.email
    }})
    if(!user) throw Error ("Incorrect Login Credentials")
   const passwordMatched= await bcrypt.compare(args.data.password,user.password)
   if(!passwordMatched) throw  Error("Incorrect Login Credentials")
   const token=jwt.sign({user},'tokensecretkey')
   if(passwordMatched){
     return {user,token}
   }

  },

   async createUser(parent, args, {db,prisma}, info) {
      const emailTaken = await prisma.exists.User({email:args.data.email})
      if (emailTaken) throw new Error("Email taken already.");
      if(args.data.password.length<8) throw Error("Password must be at least 8 charcters long")
      const password= await bcrypt.hash(args.data.password,10)
      const user= await prisma.mutation.createUser({data: {
        ...args.data,
        password
      }})
      console.log(password)
      console.log(user)
  
      return {
        user,
        token: jwt.sign({userId: user.id},"tokensecretkey")
      }
    },
    async deleteUser(parent, args, {db,prisma,request}, info) {
      const userId=getUserId(request)
     const userFound= await prisma.exists.User({id: userId})
     if(!userFound) throw Error("No user found with provided email or id")
     return prisma.mutation.deleteUser({where:{
       id:userId
     }},info)
    },
    async createPost(parent, args, {prisma,request}, info) {
      const userId=await getUserId(request)
        const randomId="afdsafasdfdasfd"
     return prisma.mutation.createPost({
       data:{
       title:args.data.title,
       body:args.data.body,
       published: args.data.published,
       author:{
         connect:{
           id: userId
         }
       }
     }},info)
    },

    deletePost(parent, args, {prisma}, info) {
      return prisma.mutation.deletePost({where:{
        id:args.id
      }},info)
    },
    async createComment(parent, args, {prisma}, info) {
      const haveUser= await prisma.exists.User({id:args.data.author})
      if(haveUser){
        const havePost= await prisma.exists.Post({id:args.data.post})
        if(havePost){
          return prisma.mutation.createComment({data:{
            text:args.data.text,
            author:{
              connect:{
                id:args.data.author
              }
            },
            post:{
              connect:{
                id:args.data.post
              }
            },
          }},info)
        }
      }
      
    },
    deleteComment(parent,args,{prisma},info){
        return prisma.mutation.deleteComment({where:{
          id:args.id
        }},info)
      },
      updateUser(parent,args,{prisma,request},info){
        const userId=getUserId(request)
       return prisma.mutation.updateUser({where:{id:userId},data:args.data},info)
      },
      updatePost(parent,args,{prisma},info){
        return prisma.mutation.updatePost({where:{id:args.id},data:args.data},info)
      },
      updateComment(parent,args,{prisma},info){
          return prisma.mutation.updateComment({where:{id:args.id},data:args.data},info)
      } 
     }
  export {Mutation as default}