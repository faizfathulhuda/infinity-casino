<script>
import { useAuth } from '@/store/auth'


export default {
  setup() {
    const auth = useAuth()
    return { auth }
  },
  data: () => ({
    errorMessage: null,
    isLoading: false
  }),
  methods: {
    async login() {
      this.errorMessage = null

      try {
        this.isLoading = true
        await this.auth.login(this.credential)

        this.isLoading = false
      } catch (err) {
        this.isLoading = false
        this.errorMessage = err.message
      }
    }
  }
}
</script>
