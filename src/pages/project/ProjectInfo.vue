<template>
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
          <td>{{ $t('type_name') }}</td>
          <td>
            <template v-if="item && item.type">
              {{ item.type.name }}
            </template>
          </td>
        </tr>
        <tr>
          <td>{{ $t('status_name') }}</td>
          <td>
            <template v-if="item && item.type">
              {{ item.status.name }}
            </template>
          </td>
        </tr>
        <tr>
          <td>{{ $t('client_name') }}</td>
          <td>
            <router-link
              v-if="item.client"
              :to="{name: 'ClientShow', params: { id: item.client.id }}"
            >
              {{ item.client.name }}
            </router-link>
          </td>
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
</template>

<script>
export default {
  name: 'ProjectInfo',
  props: {
    item: {
      type: Object,
      default: null
    }
  }
}
</script>
