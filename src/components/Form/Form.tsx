import { Posts } from '@/interfaces/blog'
import { addBlog } from '@/redux/reducer/blogSlice'
import { RootState } from '@/redux/store'
import Image from 'next/image'
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export interface PropsForm {
  setOpenAddBlog: Function
}

export interface Errors {
  blogTitle: boolean
  img: boolean
  posts: {
    postsTitle: boolean
    postsContent: boolean
  }[]
}

export default function Form(props: PropsForm): JSX.Element {
  const { setOpenAddBlog } = props
  const inputImgRef = useRef<HTMLInputElement>(null)
  const [imgPreview, setImgPreview] = useState<string>()
  const [postsList, setPostsList] = useState<Posts[]>()
  const [blogTitle, setBlogTitle] = useState<string>('')
  const [img, setImg] = useState<File | string>('')
  const [errors, setErrors] = useState<Errors>({
    blogTitle: false,
    img: false,
    posts: []
  })

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      imgPreview && URL.revokeObjectURL(imgPreview)
    }
  }, [imgPreview])

  const handleChangeBlogTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setBlogTitle(e.target.value)

    setErrors((prev): Errors => {
      const newErrors: Errors = { ...prev, blogTitle: false }

      return newErrors
    })
  }

  const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files) {
      const file = e.target?.files[0]

      setImg(file)

      setImgPreview(URL.createObjectURL(file))

      setErrors((prev): Errors => {
        const newErrors: Errors = { ...prev, img: false }

        return newErrors
      })
    }
  }

  const handleAddPostsList = (): void => {
    setPostsList((prev): Posts[] => {
      if (!prev) {
        return [{ title: '', content: '' }]
      }

      return [...prev, { title: '', content: '' }]
    })

    setErrors((prev): Errors => {
      const newErrors: Errors = {
        ...prev,
        posts: [...prev.posts, { postsTitle: false, postsContent: false }]
      }

      return newErrors
    })
  }

  const handleChangePostsTitle = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    setPostsList((prev): Posts[] => {
      if (!prev) {
        return []
      }

      const newPostsList: Posts[] = [...prev]

      newPostsList[index].title = e.target.value

      return newPostsList
    })

    setErrors((prev): Errors => {
      const newErrors: Errors = { ...prev }

      newErrors.posts[index].postsTitle = false

      return newErrors
    })
  }

  const handleChangePostsContent = (
    e: ChangeEvent<HTMLTextAreaElement>,
    index: number
  ): void => {
    setPostsList((prev): Posts[] => {
      if (!prev) {
        return []
      }

      const newPostsList: Posts[] = [...prev]

      newPostsList[index].content = e.target.value

      return newPostsList
    })

    setErrors((prev): Errors => {
      const newErrors: Errors = { ...prev }

      newErrors.posts[index].postsContent = false

      return newErrors
    })
  }

  const validateBlogTitle = (): boolean => {
    if (!blogTitle) {
      setErrors((prev): Errors => {
        const newErrors: Errors = { ...prev, blogTitle: true }

        return newErrors
      })

      return false
    }

    return true
  }

  const validateImg = (): boolean => {
    if (!img) {
      setErrors((prev): Errors => {
        const newErrors: Errors = { ...prev, img: true }

        return newErrors
      })

      return false
    }

    return true
  }

  const validatePostsList = (): boolean => {
    if (postsList) {
      let validated: boolean = true

      postsList.forEach((posts, index) => {
        if (!posts.title) {
          setErrors((prev): Errors => {
            const newErrors: Errors = { ...prev }

            newErrors.posts[index].postsTitle = true

            return newErrors
          })

          validated = false
        }

        if (!posts.content) {
          setErrors((prev): Errors => {
            const newErrors: Errors = { ...prev }

            newErrors.posts[index].postsContent = true

            return newErrors
          })

          validated = false
        }
      })

      return validated
    }

    return true
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    validateBlogTitle()

    validateImg()

    validatePostsList()

    const validated =
      validateBlogTitle() && validateImg() && validatePostsList()

    if (validated) {
      console.log(blogTitle)
      console.log(img)
      console.log(postsList)

      dispatch(
        addBlog({
          title: blogTitle,
          img,
          date: new Date(),
          posts: postsList
        })
      )

      setOpenAddBlog(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl">
      <div className="py-10 pr-[63px] pl-[67px]">
        <form onSubmit={handleSubmit} className="w-[600px]">
          <label className={`${errors?.blogTitle ? 'text-red-500' : ''}`}>
            Blog Title:
            <input
              type="text"
              placeholder="Blog Title"
              className={`border border-black rounded-sm px-4 py-2 mb-4 mt-1 w-full outline-none ${
                errors?.blogTitle
                  ? 'border-red-500 placeholder:text-red-500'
                  : ''
              }`}
              onChange={handleChangeBlogTitle}
            />
            {errors?.blogTitle && (
              <p className="mt-[-12px] mb-2 text-red-500">
                Blog Title is required
              </p>
            )}
          </label>
          <input
            ref={inputImgRef}
            type="file"
            className="hidden"
            onChange={handleChangeImg}
          />
          <button
            type="button"
            className={`border border-black rounded-sm px-4 py-2 mb-4 mt-1 w-full outline-none ${
              errors?.img ? 'border-red-500 text-red-500' : ''
            }`}
            onClick={() => {
              inputImgRef.current?.click()
            }}
          >
            Select Image
          </button>
          {errors?.img && (
            <p className="mt-[-12px] mb-2 text-red-500">Image is required</p>
          )}
          {imgPreview && (
            <Image
              alt="Image"
              src={imgPreview}
              width={0}
              height={0}
              sizes="100%"
              className="w-auto h-auto object-cover"
            />
          )}

          {postsList?.map((_posts, index) => (
            <div className="mt-2" key={index}>
              <label
                className={`${
                  errors?.posts[index].postsTitle ? 'text-red-500' : ''
                }`}
              >
                Posts Title:
                <input
                  value={postsList[index].title}
                  type="text"
                  placeholder="Posts Title"
                  className={`border border-black rounded-sm px-4 py-2 mb-4 mt-1 w-full outline-none ${
                    errors?.posts[index].postsTitle
                      ? 'border-red-500 placeholder:text-red-500'
                      : ''
                  }`}
                  onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                    handleChangePostsTitle(e, index)
                  }}
                />
                {errors?.posts[index].postsTitle && (
                  <p className="mt-[-12px] mb-2 text-red-500">
                    Posts Title is required
                  </p>
                )}
              </label>
              <label
                className={`${
                  errors?.posts[index].postsContent ? 'text-red-500' : ''
                }`}
              >
                Posts Content:
                <textarea
                  cols={30}
                  rows={10}
                  className={`border border-black rounded-sm px-4 py-2 mb-4 mt-1 w-full outline-none ${
                    errors?.posts[index].postsContent
                      ? 'border-red-500 placeholder:text-red-500'
                      : ''
                  }`}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => {
                    handleChangePostsContent(e, index)
                  }}
                ></textarea>
                {errors?.posts[index].postsContent && (
                  <p className="mt-[-12px] mb-2 text-red-500">
                    Posts Content is required
                  </p>
                )}
              </label>
            </div>
          ))}
          <button
            type="button"
            className="border border-black rounded-sm px-4 py-2 mb-4 mt-1 w-full outline-none"
            onClick={handleAddPostsList}
          >
            Add Posts
          </button>
          <button
            type="submit"
            className="border border-black rounded-sm px-4 py-2 mb-4 mt-1 w-full outline-none"
          >
            Add Blogs
          </button>
        </form>
      </div>
    </div>
  )
}
