<template>
  <tr>
    <td>{{ $t(label) }}</td>
    <td>{{ value }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ''
    }
  }
}
</script>
