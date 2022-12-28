import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faBars,
  faEdit,
  faSearch,
  faSignOut,
  faTrashAlt,
  faTrophy,
  faUsers} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faSearch,
  faBars,
  faUsers,
  faTrophy,
  faSignOut,
  faEdit,
  faTrashAlt
)

export default FontAwesomeIcon
