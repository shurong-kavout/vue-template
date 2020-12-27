<template>
  <div class="app-container">
    <left-panel>
      <h1>LEFT PANEL</h1>
    </left-panel>
    <div class="main-panel">
      <p>Page width is {{ $screen.width }} px</p>
      <p>Current breakpoint is {{ $screen.breakpoint }}</p>
    </div>
  </div>
</template>

<script>
import LeftPanel from './components/LeftPanel.vue'

export default {
  name: 'Screening',
  components: {
    LeftPanel
  },
  computed: {},
  methods: {
    fn() {}
  }
}
</script>

<style lang="scss" scoped>
@import "./styles/index.scss";

</style>
