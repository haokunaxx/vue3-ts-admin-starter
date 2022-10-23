import { UserGetters } from './types'
import type { UserStoreState } from './types'

function getRoles(state: UserStoreState): string[] {
  return state.roles
}

function getToken(state: UserStoreState): string | undefined {
  return state.token
}

export default {
  getRoles,
  getToken
}
