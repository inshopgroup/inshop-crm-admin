<template>
  <tr>
    <td>{{ $t('isActive') }}</td>
    <td>
      <span :class="['label', {'label-danger': !item.isActive, 'label-success': item.isActive}]">
        {{ $t(item.isActive ? 'yes' : 'no') }}
      </span>
    </td>
  </tr>
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
