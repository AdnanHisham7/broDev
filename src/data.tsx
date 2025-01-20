import React from 'react'

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
  