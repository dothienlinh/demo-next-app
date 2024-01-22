import Image from 'next/image'
import Link from 'next/link'
import { Blog } from '@/interfaces/blog'
import { useEffect, useState } from 'react'

export default function Blog(props: Blog): JSX.Element {
  const { title, date, img, posts } = props

  const [imgPreview, setImgPreview] = useState<string>(() => {
    if (typeof img === 'string') {
      return img
    }
    return URL.createObjectURL(img)
  })

  useEffect(() => {
    return () => URL.revokeObjectURL(imgPreview)
  }, [imgPreview])

  return (
    <div className="bg-white rounded-2xl">
      <div className="pt-10 pr-[63px] pl-[67px]">
        <h2 className="font-centuryGothicBold text-[40px] text-[#262525] leading-[44px] mb-5">
          {title}
        </h2>
        <Link
          href="/"
          className="inline-block px-5 py-[6px] my-[10px] text-[#333] bg-[#01a89e33] text-sm font-centuryGothicBold rounded transition hover:text-white"
        >
          Business
        </Link>
        <div className="mb-10 flex justify-between items-center">
          <div className="mt-[10px] flex items-center gap-2">
            <Image
              alt="Logo"
              src={'https://bnksolution.com/assets/images/calendar.png'}
              width={24}
              height={24}
            />
            <span>
              {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>Share: </span>
            <Image
              alt="Copy Link"
              src={
                'https://bnksolution.com/assets/images/general/social/copy-link.svg'
              }
              width={40}
              height={40}
            />
            <Image
              alt="Twitter"
              src={
                'https://bnksolution.com/assets/images/general/social/light-twitter.svg'
              }
              width={40}
              height={40}
            />
            <Image
              alt="Email"
              src={
                'https://bnksolution.com/assets/images/general/social/light-mail.svg'
              }
              width={40}
              height={40}
            />
            <Image
              alt="Linked"
              src={
                'https://bnksolution.com/assets/images/general/social/light-linked.svg'
              }
              width={40}
              height={40}
            />
            <Image
              alt="Facebook"
              src={
                'https://bnksolution.com/assets/images/general/social/light-facebook.svg'
              }
              width={40}
              height={40}
            />
          </div>
        </div>
      </div>
      <div>
        <Image
          alt="Banner"
          src={imgPreview}
          width={0}
          height={0}
          priority
          sizes="100%"
          className="w-full h-auto"
        />
      </div>

      <div className="mt-10 pb-10 pl-[67px] pr-[63px]">
        {posts &&
          posts.map((post, index) => (
            <div key={index}>
              <h3 className="text-[28px] text-[#262525]">{post.title}</h3>
              <p className="my-[10px] text-[#666] leading-8">{post.content}</p>
            </div>
          ))}
      </div>
    </div>
  )
}
