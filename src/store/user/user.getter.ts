import { UserGetters } from './user.types'
import type { UserStoreState } from './user.types'

function getRoles(state: UserStoreState): string[] {
  return state.roles
}


function getToken(state: UserStoreState): string {
  return state.token
}


export default {
  getRoles,
  getToken
}