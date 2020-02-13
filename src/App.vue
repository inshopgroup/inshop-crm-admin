<template>
  <div>
    <router-view />
    <loader />
  </div>
</template>

<script>
import Loader from './components/Loader'

export default {
  name: 'App',
  components: { Loader }
}
</script>
