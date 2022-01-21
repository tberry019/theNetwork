import { AppState } from "../AppState"
import { api } from "./AxiosService"

class ProfilesService {
  async getProfile(id) {
    const res = await api.get('api/profiles/${id}')
    AppState.posts = res.data
  }
}



export const profilesService = new profilesService()