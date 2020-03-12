<template>
  <div id="my-list">
    <q-table
      table-style="overflow-x: hidden"
      flat
      wrap-cells
      :data="list"
      :columns="columns"
      row-key="name"
      :hide-bottom="list.length <= 5"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td auto-width key="activity" :props="props">
            {{ props.row.activity }}
          </q-td>
          <q-td auto-width key="participants" :props="props">
            {{ props.row.participants }}
          </q-td>
          <q-td auto-width key="price" :props="props">
            {{ props.row.price >= 0.5 ? 'Expensive' : 'Cheap' }}
          </q-td>
          <q-td auto-width key="action" :props="props">
            <q-btn
              round
              color="purple"
              unelevated
              icon="checkmark"
              @click="completeItem(props.row)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-btn
      unelevated
      color="red"
      label="Clear all"
      class="full-width q-mt-md"
      @click="clearAll">
    </q-btn>
  </div>
</template>

<script>

import {
  mapGetters,
  mapActions,
} from 'vuex';

export default {
  name: 'MyList',
  data() {
    return {
      columns: [
        {
          name: 'id', align: 'left', label: '#', field: 'id', sortable: false, headerClasses: 'bg-purple text-white',
        },
        {
          name: 'activity', align: 'left', label: 'Activity', field: 'activity', sortable: false, headerClasses: 'bg-purple text-white',
        },
        {
          name: 'participants', align: 'left', label: 'Participants', field: 'participants', sortable: false, headerClasses: 'bg-purple text-white',
        },
        {
          name: 'price', align: 'left', label: 'Budget', field: 'price', sortable: false, headerClasses: 'bg-purple text-white',
        },
        {
          name: 'action', align: 'left', label: '', field: 'action', sortable: false, headerClasses: 'bg-purple text-white',
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      list: 'list/list',
    }),
  },
  methods: {
    ...mapActions({
      clearList: 'list/clearList',
      clearListItem: 'list/clearListItem',
    }),
    async clearAll() {
      try {
        await this.clearList();
        this.$q.notify({ type: 'positive', message: 'List successfully cleared' });
      } catch (e) {
        this.$q.notify({ type: 'negative', message: 'Failed to clear list' });
      }
    },
    async completeItem(item) {
      try {
        await this.clearListItem(item.id);
        this.$q.notify({ type: 'positive', message: 'Successfully marked as completed' });
      } catch (e) {
        this.$q.notify({ type: 'negative', message: 'Failed to mark as completed' });
      }
    },
  },
};
</script>
