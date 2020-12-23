<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="activeIndex"
        :router="true"
        mode="horizontal"
        active-text-color="#ff3168"
      >
        <el-menu-item index="screening">Screening</el-menu-item>
        <el-menu-item index="backtesting">Backtesting</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <h1>Screening</h1>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Layout',
  components: {

  },
  data() {
    return {
      activeIndex: 'screening'
    }
  },
  computed: {

  },
  methods: {

  }
}

</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";
</style>
