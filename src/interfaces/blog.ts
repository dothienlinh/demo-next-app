export interface Blog {
  title: string
  date: Date
  img: string | File
  posts: Posts[] | undefined
}

export interface Posts {
  title: string
  content: string
}
