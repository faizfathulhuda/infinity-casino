import request from '@/utils/request'

const fetchLeaderboard = () => request.get('/leaderboards')
export default {
  fetchLeaderboard
}
