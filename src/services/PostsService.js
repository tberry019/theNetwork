import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class PostsService {
  async getPosts() {
    const res = await api.get('api/posts')
    logger.log('get posts res', res.data.posts)
    AppState.posts = res.data.posts
  }
}




export const postsService = new PostsService()