<template>
  <div class="app-wrapper clearfix">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div class="main-container">
      <transition name="fade-transform" mode="out-in">
        <!-- <keep-alive> -->
        <router-view :key="key"></router-view>
        <!-- </keep-alive> -->
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  computed: {
    key () {
      return this.$route.fullPath
    }
  }
}
</script>

<style lang="less" scoped>
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
