import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faBars,
  faSearch,
  faSignOut,
  faTrophy,
  faUsers} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faSearch,
  faBars,
  faUsers,
  faTrophy,
  faSignOut
)

export default FontAwesomeIcon
