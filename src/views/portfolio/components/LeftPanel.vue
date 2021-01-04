<template>
  <div :class="{ collapsed }" class="left-panel">
    <button class="handler open" @click="collapsed = false">
      <i class="el-icon-arrow-right"></i>
    </button>
    <button class="handler close" @click="collapsed = true">
      <i class="el-icon-close"></i>
    </button>
    <div class="panel-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeftPanle',

  data() {
    return {
      collapsed: false
    }
  },

  // computed: {
  //   mobile() {
  //     return this.$screen.width < 992
  //   }
  // },

  watch: {
    '$screen.width'(width) {
      this.collapsed = width < 992
    }
  }
}
</script>

<style lang="scss" scoped>
@import './styles/LeftPanel.scss';
</style>
