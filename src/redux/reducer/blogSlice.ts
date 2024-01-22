import { Blog } from '@/interfaces/blog'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: Blog[] = [
  {
    title:
      "Revolutionizing Factory Inspection: BnK's Journey into Japan's Smart Factory Landscape",
    date: new Date(),
    img: 'https://bnksolution.com/assets/up_load/news/380423185_661230382774628_5742777397925732602_n.jpg',
    posts: [
      {
        title: 'Introduction:',
        content:
          'In a bold leap toward the future of manufacturing, BnK proudly unveils its latest venture in Japan, promising to redefine the landscape of factory inspections. This groundbreaking project is set to transform the traditional approach to quality control and monitoring, ushering in an era of remote inspections powered by cutting-edge virtual reality (VR) technology and 360-degree cameras. Through this innovative solution, BnK eliminates the need for physical on-site visits, allowing stakeholders to access real-time factory floor status anywhere in the world.'
      }
    ]
  }
]

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    addBlog: (state, action: PayloadAction<Blog>) => {
      state.push(action.payload)
    }
  }
})

export const { addBlog } = blogSlice.actions

export default blogSlice.reducer
