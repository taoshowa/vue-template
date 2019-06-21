<template>
  <div class="app-wrapper clearfix">
    <div id="nav">
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/about">About</RouterLink>
    </div>
    <div class="main-container">
      <Transition name="fade-transform" mode="out-in">
        <!-- <keep-alive> -->
        <RouterView :key="key" />
        <!-- </keep-alive> -->
      </Transition>
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
