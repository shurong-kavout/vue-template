<template>
  <app-main />
</template>

<script>

import { AppMain } from './components'

export default {
  name: 'Layout',
  components: {
    AppMain
  },
  data() {
    return {
      activeIndex: '1'
    }
  },
  computed: {

  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}

</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";
</style>
