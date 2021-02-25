<script>
import HeaderBarBrand from '@/components/header-bar-brand.vue';
import AuthLogin from '@/components/auth-login.vue';
import AuthLogout from '@/components/auth-logout.vue';
import getUserInfo from '../assets/js/userInfo';

export default {
  name: 'HeaderBar',
  components: {
    HeaderBarBrand,
    AuthLogin,
    AuthLogout,
  },
  data() {
    return {
    };
  },
  methods: {
    async created() {
      this.user = await getUserInfo();
    },
  },
};
</script>

<template>
  <header>
    <nav class="navbar is-white" role="navigation" aria-label="main navigation">
      <HeaderBarBrand></HeaderBarBrand>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item nav-home" to="/">Home</router-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <AuthLogin provider="github" v-if="!user" />
          </div>
          <div class="navbar-item">
            <AuthLogout v-if="user" />
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
