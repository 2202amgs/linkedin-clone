import { handlePostState, useSSRPostState } from '@/atoms/postAtom';
import { PostType } from '@/types/types';
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import Input from './Input'
import Post from './Post';

type Data = {
  posts: [PostType]
}

function Feed({posts}:Data) {
  const [realTimePosts, setRealTimePosts] = useState([]);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [useSSRPost, setUseSSRPost] = useRecoilState(useSSRPostState);


  useEffect(() => {    
    const getPosts = ()=>{
      fetch('/api/posts',{
        method: "GET",
        headers: {"Content-Type": "application/json"},
      }).then((res)=>{
        res.json().then(data => {
          setRealTimePosts(data);
          setHandlePost(false);
          setUseSSRPost(false);
        })
      }).catch((error)=>{
        console.error(error);
      });
    }

    getPosts();
  }, [handlePost])


  return (
    <div className='space-y-6 pb-24 max-wlg'>
      <Input />
      {useSSRPostState
      ?posts.map((post:PostType)=> (<Post key={post._id} post={post} />))
      :realTimePosts.map((post:PostType)=> (<Post key={post._id} post={post} />))}
      
    </div>
  )
}

export default Feed