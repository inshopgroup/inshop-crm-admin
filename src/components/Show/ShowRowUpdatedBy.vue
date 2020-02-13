<template>
  <show-row label="updatedBy" :value="item.updatedBy" />
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
