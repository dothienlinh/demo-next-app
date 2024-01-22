import { useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { IoMdAdd } from 'react-icons/io'
import Form from '@/components/Form/Form'

export default function Home(): JSX.Element {
  const blogs = useSelector((state: RootState) => state.blog)
  const [openAddBlog, setOpenAddBlog] = useState<boolean>(false)

  useEffect(() => {
    console.log(blogs)
  })

  return (
    <div className="h-screen bg-[#f4f4f4]">
      <div className="py-[120px] flex items-center bg-[#f4f4f4]">
        <div className="max-w-[1140px] px-[15px] mx-auto">
          {openAddBlog ? (
            <Form setOpenAddBlog={setOpenAddBlog} />
          ) : (
            <>
              <h1 className="text-center text-[32px] font-bold my-2">
                Blog List
              </h1>
              <div className="flex flex-col">
                {blogs.map((blog, index) => (
                  <Link
                    href={`/${index}`}
                    key={index}
                    className="inline-block px-5 py-[6px] my-[10px] text-[#333] bg-[#01a89e33] text-sm font-centuryGothicBold rounded transition hover:text-white"
                  >
                    Blog {index + 1}: {blogs[index].title}
                  </Link>
                ))}

                <button
                  className="border border-black rounded-sm flex items-center justify-between py-2 px-6 w-36"
                  onClick={() => setOpenAddBlog(!openAddBlog)}
                >
                  <span>Add Blog</span>
                  <IoMdAdd />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
