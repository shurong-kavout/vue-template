<template>
  <div class="home-container">
    <!-- <div class="home-text">{{ name }}</div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.home {
  &-container {
    margin: 20px;
  }
  &-text {
    font-size: 20px;
    line-height: 20px;
  }
}
</style>
