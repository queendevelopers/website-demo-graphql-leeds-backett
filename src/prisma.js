import {Prisma} from 'prisma-binding'
const prisma=new Prisma({
    typeDefs:"src/generated/prisma.graphql",
    endpoint:"http://localhost:4466",
    secret: "wherethemindiswithoutfear"
})
export {prisma as default}
