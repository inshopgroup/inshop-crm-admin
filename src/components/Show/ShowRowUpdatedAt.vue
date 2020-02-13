<template>
  <show-row label="updatedAt" :value="crmDateFormat(item.updatedAt)" />
</template>

<script>
import ShowRow from './ShowRow'

export default {
  components: { ShowRow },
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
