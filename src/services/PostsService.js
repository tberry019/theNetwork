import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class PostsService {
  async getPosts() {
    const res = await api.get('api/posts')
    logger.log('get posts res', res.data.posts)
    AppState.posts = res.data.posts
  }

  async createPost(newPost) {
    const res = await api.post('api/posts', newPost)
    logger.log('create post res', res.data.posts)
    AppState.posts.unshift(res.data)
  }
}




export const postsService = new PostsService()