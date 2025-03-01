import React from 'react'

//Search Cards data
export const users = [
  { username: 'JohnDoe', profileImage: 'https://img.freepik.com/free-photo/close-up-portrait-young-bearded-man-face_171337-2887.jpg', domain: 'Mern Stack', following:true },
  { username: 'dianaLee', profileImage: 'https://th.bing.com/th/id/OIP.A7Q-O2-xLsAhU2Owgv8jgwHaFy?rs=1&pid=ImgDetMain', domain: 'Mern Stack', following:true },
  { username: 'aliceSmith', profileImage: 'https://renaissancedentalcenter.com/wp-content/uploads/2014/03/smiling-faces.jpg', domain: 'Mern Stack', following:false },
  { username: 'bobJohnson', profileImage: 'https://i.pinimg.com/736x/c7/d4/25/c7d425ddc9daed43e808a703c0a21c1c.jpg', domain: 'Mern Stack', following:true },
  { username: 'charlieDavis', profileImage: 'https://th.bing.com/th/id/OIP.lMZFykq2WTSIenQvW_vK1wHaJQ?rs=1&pid=ImgDetMain', domain: 'Mern Stack', following:true },
  { username: 'evanMiller', profileImage: '', domain: 'Mern Stack', following:true },
];

// TEST pROFILES:
export const testProfiles = {
  JohnDoe : {
    username: "John Doe",
    domain: "Web Development",
    tags: {
      tagExample: "ff5722",
      debugger: "3b82f6",
    },
    userProfile: "https://img.freepik.com/free-photo/close-up-portrait-young-bearded-man-face_171337-2887.jpg",
    batch: "2025",
    githubLink: "https://github.com/johndoe",
    linkedlnLink: "https://linkedin.com/in/johndoe",
    email: "john.doe@example.com",
    bio:"illed in penetration testing, malware analysis, and security audits.",
    rank: 1,
    postCount:10,
    followersCount:256,
    isFollow:true,
    leetcodeUsername: "ItsSadhik",
    skillsArray: ["JavaSc", "React", "Node.js", "TypeScript"],
  },
  
  aliceSmith: {
    username: "Alice Smith",
    domain: "Full Stack Development",
    tags: {
      react: "61dafb",
      nodejs: "68a063",
    },
    userProfile: "https://renaissancedentalcenter.com/wp-content/uploads/2014/03/smiling-faces.jpg",
    batch: "2024",
    githubLink: "https://github.com/alicesmith",
    linkedlnLink: "https://linkedin.com/in/alicesmith",
    email: "alice.smith@example.com",
    bio: "A creative full-stack developer specializing in React, Node.js, and MongoDB. Loves building user-friendly applications with a focus on performance and scalability.",
    rank: 3,
    postCount: 15,
    followersCount: 320,
    isFollow:false,
    leetcodeUsername: "AliceDev",
    skillsArray: ["React", "Node.js", "Express", "MongoDB", "GraphQL"],
  },
  
  bobJohnson: {
    username: "Bob Johnson",
    domain: "Cybersecurity",
    tags: {
      ethicalHacker: "ff0000",
      penetrationTesting: "000000",
    },
    userProfile: "https://i.pinimg.com/736x/c7/d4/25/c7d425ddc9daed43e808a703c0a21c1c.jpg",
    batch: "2023",
    githubLink: "https://github.com/bobjohnson",
    linkedlnLink: "https://linkedin.com/in/bobjohnson",
    email: "bob.johnson@example.com",
    bio: "Cybersecurity expert with a passion for ethical hacking and network security. Skilled in penetration testing, malware analysis, and security audits.",
    rank: 1,
    postCount: 25,
    followersCount: 580,
    isFollow:false,
    leetcodeUsername: "BobSecure",
    skillsArray: ["Ethical Hacking", "Kali Linux", "Penetration Testing", "Cyber Forensics"],
  },
  
  charlieDavis: {
    username: "Charlie Davis",
    domain: "Machine Learning",
    tags: {
      ai: "0077cc",
      deepLearning: "ffcc00",
    },
    userProfile: "",
    batch: "2026",
    githubLink: "https://github.com/charliedavis",
    linkedlnLink: "https://linkedin.com/in/charliedavis",
    email: "charlie.davis@example.com",
    bio: "AI enthusiast focused on deep learning, NLP, and computer vision. Building intelligent applications to make data-driven decisions.",
    rank: 8,
    postCount: 12,
    followersCount: 210,
    isFollow:false,
    leetcodeUsername: "MLCharlie",
    skillsArray: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "NLP"],
  },
  
  dianaLee: {
    username: "Diana Lee",
    domain: "UI/UX Design",
    tags: {
      figma: "ff4081",
      wireframing: "808080",
    },
    userProfile: "",
    batch: "2025",
    githubLink: "https://github.com/dianalee",
    linkedlnLink: "https://linkedin.com/in/dianalee",
    email: "diana.lee@example.com",
    bio: "UI/UX designer passionate about creating stunning user interfaces and seamless user experiences. Proficient in Figma, Adobe XD, and user research.",
    rank: 5,
    postCount: 18,
    followersCount: 450,
    isFollow:false,
    leetcodeUsername: "DesignGuru",
    skillsArray: ["Figma", "Adobe XD", "Wireframing", "Prototyping", "User Research"],
  },
  
  evanMiller: {
    username: "Evan Miller",
    domain: "Mobile App Development",
    tags: {
      flutter: "02569b",
      kotlin: "f18e33",
    },
    userProfile: "",
    batch: "2024",
    githubLink: "https://github.com/evanmiller",
    linkedlnLink: "https://linkedin.com/in/evanmiller",
    email: "evan.miller@example.com",
    bio: "Mobile app developer with expertise in Flutter and Kotlin. Passionate about building smooth, responsive, and high-performance mobile applications.",
    rank: 2,
    postCount: 30,
    followersCount: 620,
    isFollow:false,
    leetcodeUsername: "EvanApps",
    skillsArray: ["Flutter", "Dart", "Kotlin", "Swift", "Firebase"],
  },
};

// postsData:
export const postsData = [
  {
    username: "JohnDoe",
    images: [
      "https://th.bing.com/th/id/OIP.U8JB9b-gG9zf8MH3r6idbgHaE8?rs=1&pid=ImgDetMain",
      "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/01/the-bad-batch-tech.jpg",
    ],
    likes: 120,
    commentsCount: 30,
    comments: [],
    description: "This is my latest project showcase!",
  },
  {
    username: "JohnDoe",
    images: [
      "https://th.bing.com/th/id/OIP.U8JB9b-gG9zf8MH3r6idbgHaE8?rs=1&pid=ImgDetMain",
      "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/01/the-bad-batch-tech.jpg",
    ],
    likes: 120,
    commentsCount: 30,
    comments: [],
    description: "This is my latest project showcase!",
  },
  {
    username: "JohnDoe",
    images: [
      "https://th.bing.com/th/id/OIP.U8JB9b-gG9zf8MH3r6idbgHaE8?rs=1&pid=ImgDetMain",
      "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/01/the-bad-batch-tech.jpg",
    ],
    likes: 120,
    commentsCount: 30,
    comments: [],
    description: "This is my latest project showcase!",
  },
  {
    username: "JohnDoe",
    images: [
      "https://th.bing.com/th/id/OIP.U8JB9b-gG9zf8MH3r6idbgHaE8?rs=1&pid=ImgDetMain",
      "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/01/the-bad-batch-tech.jpg",
    ],
    likes: 120,
    commentsCount: 30,
    comments: [],
    description: "This is my latest project showcase!",
  },
  {
    username: "JohnDoe",
    images: [
      "https://th.bing.com/th/id/OIP.U8JB9b-gG9zf8MH3r6idbgHaE8?rs=1&pid=ImgDetMain",
      "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/01/the-bad-batch-tech.jpg",
    ],
    likes: 120,
    commentsCount: 30,
    comments: [],
    description: "This is my latest project showcase!",
  },
  {
    username: "evanMiller",
    images: [
      "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/01/the-bad-batch-tech.jpg",
    ],
    likes: 80,
    commentsCount: 15,
    comments: [],
    description: "Exploring new technologies every day!",
  },
  {
    username: "evanMiller",
    images: [
      "https://th.bing.com/th/id/OIP.KwCCuz0alNOKhgf_4shI7AHaFF?w=640&h=440&rs=1&pid=ImgDetMain",
    ],
    likes: 80,
    commentsCount: 15,
    comments: [],
    description: "Another amazing project!",
  },
  {
    username: "dianaLee",
    images: [
      "https://th.bing.com/th/id/OIP.NKv4YX7bul61AY8Ye_YYlwHaNK?rs=1&pid=ImgDetMain",
    ],
    likes: 80,
    commentsCount: 15,
    comments: [],
    description: "Check out my new blog post!",
  },
];


// faculty side list users 
export const manageUsers = [
  { username: 'JohnDoe', profileImage: 'https://img.freepik.com/free-photo/close-up-portrait-young-bearded-man-face_171337-2887.jpg', domain: 'Mern Stack', batch:"BCK 198", email:"necheyanmidlaj@gmail.com", tags:{}, isBlocked:true },
  { username: 'dianaLee', profileImage: 'https://th.bing.com/th/id/OIP.A7Q-O2-xLsAhU2Owgv8jgwHaFy?rs=1&pid=ImgDetMain', domain: 'Mern Stack', batch:"BCK 198", email:"necheyanmidlaj@gmail.com", tags:{}, isBlocked:true },
  { username: 'aliceSmith', profileImage: 'https://renaissancedentalcenter.com/wp-content/uploads/2014/03/smiling-faces.jpg', domain: 'Mern Stack', batch:"BCK 198", email:"necheyanmidlaj@gmail.com", tags:{}, isBlocked:false },
  { username: 'bobJohnson', profileImage: 'https://i.pinimg.com/736x/c7/d4/25/c7d425ddc9daed43e808a703c0a21c1c.jpg', domain: 'Mern Stack', batch:"BCK 198", email:"necheyanmidlaj@gmail.com", tags:{}, isBlocked:true },
  { username: 'charlieDavis', profileImage: 'https://th.bing.com/th/id/OIP.lMZFykq2WTSIenQvW_vK1wHaJQ?rs=1&pid=ImgDetMain', domain: 'Mern Stack', batch:"BCK 198", email:"necheyanmidlaj@gmail.com", tags:{}, isBlocked:true },
  { username: 'evanMiller', profileImage: '', domain: 'Mern Stack', batch:"BCK 198", email:"necheyanmidlaj@gmail.com", tags:{}, isBlocked:true },
];


export const commentsData = [
    {
      id: 1,
      username: "user_name",
      userProfile: "https://yt3.googleusercontent.com/ytc/AL5GRJXp4_LjX5QYQqa_2PZRyaxWdA2Hwfe3mVz9nO5NJg=s900-c-k-c0x00ffffff-no-rj",
      comment: "Amazing insight! 👏",
      likesCount: 22100,
      isLiked:false,
      isOwner: true,
      nestedCommentsCount: 2,
      nestedComments: [
        {
          id: 101,
          username: "nested_user_1",
          userProfile: "https://th.bing.com/th/id/OIP.ck0nVJIcSOthXRXM7DcomQHaHa?rs=1&pid=ImgDetMain",
          comment: "Yeah broh!",
          likesCount: 105,
          isLiked:true,
          isOwner: true,
          nestedCommentsCount: 0,
          nestedComments: [],
        },
        {
          id: 102,
          username: "nested_user_2",
          userProfile: "https://th.bing.com/th/id/OIP.0fkvqXwjxiCiRZwUTsxqsAAAAA?w=250&h=258&rs=1&pid=ImgDetMain",
          comment: "This is so helpful, thanks for sharing! 🙌",
          likesCount: 89,
          isOwner: false,
          nestedCommentsCount: 0,
          nestedComments: [],
        },
      ],
    },
    {
      id: 2,
      username: "user_name",
      userProfile: "https://th.bing.com/th/id/OIP.I4GIrt2tUWq3NtJyBx_cwgHaJW?w=608&h=768&rs=1&pid=ImgDetMain",
      comment: "Wow, this post is incredibly detailed and informative.",
      likesCount: 22100,
      isOwner: true,
      nestedCommentsCount: 4,
      nestedComments: [
        {
          id: 201,
          username: "nested_user_3",
          userProfile: "https://th.bing.com/th/id/OIP.2GogDoqYJrR3eaYg1Lf3aAHaHy?w=506&h=532&rs=1&pid=ImgDetMain",
          comment: "Interesting perspective, thanks for sharing! 🤔Interesting perspective, thanks for sharing! 🤔Interesting perspective, thanks for sharing! 🤔Interesting perspective, thanks for sharing! 🤔Interesting perspective, thanks for sharing! 🤔Interesting perspective, thanks for sharing! 🤔",
          likesCount: 45,
          isOwner: false,
          nestedCommentsCount: 0,
          nestedComments: [],
        },
        {
          id: 202,
          username: "nested_user_4",
          userProfile: "https://th.bing.com/th/id/OIP.2GogDoqYJrR3eaYg1Lf3aAHaHy?w=506&h=532&rs=1&pid=ImgDetMain",
          comment: "Fantastic content as always! 🌟",
          likesCount: 120,
          isOwner: false,
          nestedCommentsCount: 0,
          nestedComments: [],
        },
        {
          id: 203,
          username: "nested_user_5",
          userProfile: "https://th.bing.com/th/id/OIP.2GogDoqYJrR3eaYg1Lf3aAHaHy?w=506&h=532&rs=1&pid=ImgDetMain",
          comment: "@user_name That's not obvious.",
          likesCount: 30,
          isOwner: false,
          nestedCommentsCount: 0,
          nestedComments: [],
        },
        {
          id: 204,
          username: "nested_user_6",
          userProfile: "https://th.bing.com/th/id/OIP.2GogDoqYJrR3eaYg1Lf3aAHaHy?w=506&h=532&rs=1&pid=ImgDetMain",
          comment: "Thanks Dude!",
          likesCount: 10,
          isOwner: false,
          nestedCommentsCount: 0,
          nestedComments: [],
        },
      ],
    },
  ];
  
  const data = () => {
    return (
      <div>
        
      </div>
    )
  }
  
  export default data
  