<template>
  <show-row label="createdAt" :value="crmDateFormat(item.createdAt)"></show-row>
</template>

<script>
  import ShowRow from "./ShowRow";
  export default {
    components: {ShowRow},
    props: {
      item: {
        type: Object,
        required: true
      },
    }
  }
</script>
