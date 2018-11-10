<template>
<div>
  <router-view></router-view>
  <loader></loader>
</div>
</template>

<script>
import Loader from './components/Loader'
export default {
  name: 'App',
  components: {Loader}
}
</script>

<style>
.__vev_calendar-wrapper .cal-wrapper .cal-header {
  background: none;
}

@media print {
  .show-print {
    color: red;
    display: block !important;
  }

  a[href]:after {
    content: none !important;
  }
}
</style>
