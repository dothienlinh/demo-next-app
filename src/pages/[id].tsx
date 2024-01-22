import ComponentBlog from '@/components/Blog/Blog'
import { RootState } from '@/redux/store'
import { GetStaticPaths, GetStaticProps } from 'next'
import { NextRouter, useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Blog } from '@/interfaces/blog'

export default function BlogDetails(props: number): JSX.Element {
  const router: NextRouter = useRouter()
  const blogs = useSelector((state: RootState) => state.blog)
  const id: number = Number(router.query?.id)

  if (isNaN(id)) {
    return <p>Loading...</p>
  }

  return (
    <div className="h-screen bg-[#f4f4f4]">
      <div className="py-[120px] flex items-center bg-[#f4f4f4]">
        <div className="max-w-[1140px] px-[15px] mx-auto">
          <ComponentBlog
            date={blogs[id].date}
            img={blogs[id].img}
            title={blogs[id].title}
            posts={blogs[id].posts}
          />
        </div>
      </div>
    </div>
  )
}
