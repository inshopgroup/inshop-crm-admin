<template>
  <div v-if="item" class="table-responsive">
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
          <td>{{ $t('type_name') }}</td>
          <td>
            <div v-if="item.type">
              {{ item.type.name }}
            </div>
          </td>
        </tr>

        <show-row-is-active :item="item" />
        <show-row-created-at :item="item" />
        <show-row-updated-at :item="item" />
        <show-row-updated-by :item="item" />
      </tbody>
    </table>
  </div>
</template>

<script>
import ShowRowIsActive from '../../components/Show/ShowRowIsActive'
import ShowRowCreatedAt from '../../components/Show/ShowRowCreatedAt'
import ShowRowUpdatedAt from '../../components/Show/ShowRowUpdatedAt'
import ShowRowUpdatedBy from '../../components/Show/ShowRowUpdatedBy'

export default {
  name: 'TemplateInfo',
  components: {
    ShowRowUpdatedBy,
    ShowRowUpdatedAt,
    ShowRowCreatedAt,
    ShowRowIsActive
  },
  props: {
    item: {
      type: Object,
      default: null
    }
  }
}
</script>
