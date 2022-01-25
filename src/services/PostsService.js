import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class PostsService {
  async getPosts(query = '') {
    const res = await api.get('api/posts' + query)
    AppState.posts = res.data.posts
    AppState.older = res.data.older
    AppState.newer = res.data.newer
  }



  async createPost(newPost) {
    const res = await api.post('api/posts', newPost)
    AppState.posts.unshift(res.data)
  }

  async getMore(url) {
    const res = await api.get(url)
    logger.log('get older posts res', res.data.older)
    AppState.posts = res.data.posts
    AppState.older = res.data.older
    AppState.newer = res.data.newer
  }
  // async deletePost()

}




export const postsService = new PostsService()