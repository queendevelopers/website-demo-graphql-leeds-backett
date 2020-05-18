const Query= {
    me() {
      return {
        id: "abc123",
        name: "nikesh",
        email: "applelappala@gmail.com",
        age: 15,
      };
    },
    post() {
      return {
        id: "abc123",
        title: "This is it",
        body: "A song by Micheal Jackson",
        published: true,
      };
    },

    Comments(parent, args, {db,prisma}, info) {
    
      return prisma.query.comments(null,info)
      // return db.dummyComments;
    },

    Users(parent, args, {db,prisma}, info) {
      const opArgs={}
      if(args.query){
        opArgs.where= {
          OR:[{
            name_contains:args.query

          },
          {
            email_contains: args.query

          }]
        }
      }
      return prisma.query.users(opArgs,info)
    },

    Posts(parent, args, {db,prisma}, info) {
      const opArgs={}
      if(args.query){
        opArgs.where= {
          OR:[{
            title_contains:args.query
          },{
            body_contains: args.query
          }]
          
      }
      }
      return prisma.query.posts(opArgs,info)
    },
  }

  export {Query as default}
  
