<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref<boolean>(true);

const title = ref<string>('');
const body = ref<string>('');
const labels = ref<string[]>([]);
</script>
<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="isOpen" position="bottom">
      <q-card style="width: 500px">
        <q-form>
          <q-linear-progress :value="1" color="primary" />

          <q-card-section class="column no-wrap">
            <div class="text-weight-bold">New Issue</div>
            <div class="text-grey">Add new Issue</div>
            <q-space />
            <div>
              <q-input
                filled
                v-model="title"
                label="Ttitle"
                placeholder="Title"
                class="q-mb-sm"
              />
              <q-select
                filled
                v-model="labels"
                multiple
                :options="[]"
                use-chips
                stack-label
                label="Multiple selection"
                class="q-mb-sm"
              />
              <!--  TODO: Markdown Editor -->
            </div>
          </q-card-section>
          <q-card-actions align="left">
            <q-btn flat label="Cancel" v-close-popup color="dark" />
            <q-space />
            <q-btn type="submit" flat label="Add" v-close-popup color="dark" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>
<style scoped></style>
