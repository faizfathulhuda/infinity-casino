<template>
  <div class="drawer drawer-mobile">
    <input
      id="my-drawer-2"
      type="checkbox"
      class="drawer-toggle"
    >
    <div class="drawer-content m-4">
      <!-- Page content here -->
      <router-view />
      <label
        for="my-drawer-2"
        class="btn btn-primary drawer-button lg:hidden"
      >
        <fa-icon
          icon="bars"
          size="xl"
        />
      </label>
    </div> 
    <div class="drawer-side shadow">
      <label
        for="my-drawer-2"
        class="drawer-overlay"
      />
      <ul class="menu p-4 w-80 bg-base-100 text-base-content">
        <img
          class="mb-4"
          src="@/assets/image/img_logo.svg"
          alt="asda"
        >
        <!-- Sidebar content here -->
        <router-link
          v-for="(menu, m) of menus"
          :key="1-m"
          :to="menu.path"
          :exact="menu.exact"
          class="link text-nowrap"
        >
          <fa-icon
            class="mr-3"
            :icon="menu.icon"
            fixed-width
          />
          <span class="ml-3">
            {{ menu.text }}
          </span>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

  components: {},
  props: {},

  data: () => ({
    activeMenu: '',
    menus: [
      {
        path: '/manage-player',
        text: 'Manage Player',
        icon: 'users'
      },
      {
        path: '/leaderboard',
        text: 'Leaderboard',
        icon: 'trophy'
      }
    ]
  }),

  computed: {},

  mounted() {},

  methods: {
    changeMenu(val) {
      this.activeMenu = val
    }
  }
}
</script>

<style lang="scss">
.btn-primary {
  background-color: transparent;
  border-color: transparent;
  color: #000;
}

.sub-menu {
  background-color: #fff;
  margin-bottom: 20px;
  border-radius: 10px;
}

.drawer-side {
  box-shadow: none;
}

.shadow {
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
}

.link {
  color: #000;
  display: block;
  font-size: 14px;
  padding: 11px 0px 11px 9px;
  position: relative;
  text-decoration: none;
  margin-bottom: 15px;

  span {

    .expanded & {
      display: inline-block;
    }
  }
}

.router-link-exact-active {
  background-color: #F4D5D5;
  cursor: pointer;
  border-radius: .25rem;
}
</style>
