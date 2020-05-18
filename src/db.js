const dummyComments = [
    {
      id: "abc123",
      text: "This is very good. I loved it.",
      author: "abc123",
      post: "abc123",
    },
    {
      id: "def456",
      text: "This is awesome. I loved it as well.",
      author: "abc123",
      post: "abc123",
    },
    {
      id: "ghi789",
      text: "Boaring hated it.",
      author: "def456",
      post: "def456",
    },
    {
      id: "jkl101112",
      text: "Impressive",
      author: "ghi789",
      post: "def456",
    },
  ];
  
  const dummyUsers = [
    {
      id: "abc123",
      name: "Nikesh",
      email: "applelappala@gmail.com",
      age: 25,
    },
    {
      id: "def456",
      name: "Lover Boy",
      email: "ballcall@gmail.com",
      age: 21,
    },
    {
      id: "ghi789",
      name: "Astha",
      email: "candaybandy@gmail.com",
      age: 29,
    },
  ];
  
  const dummyPosts = [
    {
      id: "abc123",
      title: "Hello",
      body: "applelappala@gmail.com",
      published: true,
      author: "abc123",
    },
    {
      id: "def456",
      title: "Barrel Role",
      body: "ballcall@gmail.com",
      published: false,
      author: "ghi789",
    },
    {
      id: "ghi789",
      title: "Day Dream",
      body: "candaybandy@gmail.com",
      published: true,
      author: "ghi789",
    },
  ];
  
  const db= {
      dummyUsers,
     dummyPosts,
    dummyComments
} 
export {db as default}
