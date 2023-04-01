import { modalState, modalTypeState } from '@/atoms/modalAtom';
import Articles from '@/components/Articles';
import Feed from '@/components/Feed';
import Header from '@/components/Header';
import Modal from '@/components/Modal';
import Sidebar from '@/components/Sidebar';
import { PostType } from '@/types/types';
import { connectToDatabase } from '@/util/mongodb';
import { AnimatePresence } from 'framer-motion';
import { Session } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useRecoilState } from 'recoil';

interface Props {
  session:Session|null,
  posts:[PostType],
  articles: [any]
}
function Index({session, posts, articles}:Props):JSX.Element{
  const router = useRouter();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);

  const {status} = useSession({
    required: true,
    onUnauthenticated(){
      router.push('/home');
    }
  });
  
  
  return (
    <div className='bg-[#F3F2EF} dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6'>
      <Head>
        <title>Linkedin</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <Header />
      <main className='flex justify-center gap-x-5 px-4 sm:px-12'>
        <div className="flex flex-col sm:flex-row gap-x-5">
          <Sidebar />
          <Feed posts={posts} />
          <Articles articles={articles} />
        </div>
        <AnimatePresence>
          {modalOpen&& (
            <Modal handleClose={()=>setModalOpen(false)} type={modalType} />
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

export async function getServerSideProps(context:any) {  
  const session:Session|null = await getSession(context);
  
  if (!session) {
    return {
      redirect: {
        destination: '/home',
        permanent: false
      }
    }
  }

  const {db} = await connectToDatabase();
  const posts:[PostType] = await db.collection('posts').find().toArray();
  

  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=eg&apiKey=${process.env.NEWS_API_KEY}`
  ).then((res) => res.json());
  
  return {
    props: {
      session,
      articles: res.articles,
      posts: posts.map<PostType>((post)=>{
        return {
          _id: post._id.toString(),
          input: post.input,
          photoUrl: post.photoUrl,
          username:post.username,
          email: post.email,
          userImg: post.userImg,
          createdAt: post.createdAt,
        }
      }),
    }
  }
}

export default Index