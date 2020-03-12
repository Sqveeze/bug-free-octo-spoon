<template>
  <div id="activities">
    <div class="row q-col-gutter-md">
      <div class="col-7">
        <div class="row">
          <div class="col-12 q-pb-sm">
            <h6 class="q-ma-none">You should: </h6>
          </div>
          <div class="col-12 q-pb-xs">
            <q-input
              dense
              v-model="activity.activity"
              :loading="loading.activity"
              outlined
              type="textarea"
              autogrow
              class="c-textarea"
            />
          </div>
          <div class="col-12">
            <q-btn
              type="submit"
              :loading="loading.saving"
              label="Save for later"
              class="q-mt-md full-width"
              color="red"
              unelevated
              @click="saveForLater"
            >
              <template v-slot:loading>
                <q-spinner />
              </template>
            </q-btn>
          </div>
        </div>
      </div>
      <div class="col-5">
        <div class="row">
          <div class="col-12">
            <h6 class="q-ma-none">Activity details: </h6>
          </div>
          <div class="col-12 q-pt-xs">
            <p class="q-ma-none">Type</p>
          </div>
          <div class="col-12">
            <q-select
              outlined
              dense
              v-model="query.type"
              :options="options"
              :loading="loading.activity"
            />
          </div>
          <div class="col-12 q-pt-md">
            <p class="q-ma-none">Participants</p>
          </div>
          <div class="col-12">
            <q-input
              :loading="loading.activity"
              type="number"
              min="1"
              outlined
              dense
              v-model="query.participants"
            />
          </div>
          <div class="col-12 q-pt-md">
            <p class="q-ma-none">Budget</p>
          </div>
          <div class="col-12">
            <q-slider
              dense
              color="purple"
              v-model="query.maxprice"
              :min="0"
              :max="1"
              :step="0.1"
            />
          </div>
          <div class="col-12">
            <div class="row">
              <div class="col-auto q-mr-auto">
                <p class="q-ma-none">Cheap</p>
              </div>
              <div class="col-auto">
                <p class="q-ma-none">Expensive</p>
              </div>
            </div>
          </div>
          <div class="col-12">
            <q-btn
              type="submit"
              :loading="loading.activity"
              :disabled="loading.activity"
              label="Hit me with a new one"
              class="q-mt-md full-width"
              color="purple"
              unelevated
              @click="hitMeWithANewOne"
            >
              <template v-slot:loading>
                <q-spinner />
              </template>
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {
  mapActions,
  mapGetters,
} from 'vuex';

export default {
  name: 'Activities',
  data() {
    return {
      loading: {
        activity: false,
        saving: false,
      },
      options: ['education', 'recreational', 'social', 'diy', 'charity', 'cooking', 'relaxation', 'music', 'busywork'],
      query: {
        type: 'education',
        minprice: 0.5,
        maxprice: 0.1,
        participants: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      activity: 'activities/activity',
    }),
  },
  async created() {
    this.loading.activity = true;
    try {
      await this.getActivity();
      this.query.type = this.activity.type;
      this.query.maxprice = this.activity.price;
      this.query.participants = this.activity.participants;
      this.loading.activity = false;
    } catch (e) {
      this.loading.activity = false;
    }
  },
  methods: {
    ...mapActions({
      getActivity: 'activities/getActivity',
      saveActivity: 'list/saveActivity',
    }),
    async hitMeWithANewOne() {
      this.loading.activity = true;
      try {
        await this.getActivity({
          params: this.query,
        });
        this.loading.activity = false;
      } catch (e) {
        this.loading.activity = false;
        this.$q.notify({ type: 'negative', message: e.toString() });
      }
    },
    async saveForLater() {
      this.loading.saving = true;
      try {
        await this.saveActivity(this.activity);
        this.$q.notify({ type: 'positive', message: `Activity (${this.activity.activity}) saved` });
        this.loading.saving = false;
      } catch (e) {
        this.loading.saving = false;
        this.$q.notify({ type: 'negative', message: 'Failed to save activity' });
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
  #activities
    .c-textarea
      >>> .q-field__control
        height: 207px;
</style>
