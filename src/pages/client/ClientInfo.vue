<template>
  <div>
    <div
      v-if="item"
      class="table-responsive"
    >
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th width="20%">
              {{ $t('field') }}
            </th>
            <th>{{ $t('value') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ $t('name') }}</td>
            <td>{{ item.name }}</td>
          </tr>
          <tr>
            <td>{{ $t('description') }}</td>
            <td>{{ item.description }}</td>
          </tr>
          <tr>
            <td>{{ $t('createdAt') }}</td>
            <td>{{ dateFormat(item.createdAt) }}</td>
          </tr>
          <tr>
            <td>{{ $t('updatedAt') }}</td>
            <td>{{ dateFormat(item.updatedAt) }}</td>
          </tr>
          <tr>
            <td>{{ $t('updatedBy') }}</td>
            <td>{{ item.updatedBy }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClientInfo',
  props: {
    item: {
      type: Object,
      default: null
    }
  }
}
</script>
