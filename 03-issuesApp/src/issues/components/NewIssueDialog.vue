<script setup lang="ts">
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { watch } from 'vue';
import useIssueMutation from '../composables/useIssueMutation';

interface Props {
  isOpen: boolean;
  labels: string[];
}

interface Emits {
  (e: 'onClose'): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const { issueMutation } = useIssueMutation();

// eslint-disable-next-line vue/no-dupe-keys
const isOpen = ref<boolean>(false);

const title = ref<string>('');
const body = ref<string>('');
// eslint-disable-next-line vue/no-dupe-keys
const labels = ref<string[]>([]);

watch(props, () => {
  isOpen.value = props.isOpen;
});

watch(
  () => issueMutation.isSuccess.value,
  (isSuccess) => {
    if (isSuccess) {
      title.value = '';
      body.value = '';
      labels.value = [];

      issueMutation.reset();
      emits('onClose')
    }
  }
);
</script>
<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="isOpen" position="bottom" persistent>
      <q-card style="width: 700px, height: 400px">
        <q-form @submit="issueMutation.mutate({ title, body, labels })">
          <q-linear-progress :value="1" color="primary" />

          <q-card-section class="column no-wrap">
            <div class="text-weight-bold">New Issue</div>
            <div class="text-grey">Add new Issue</div>
            <q-space />
            <div>
              <q-input
                dense
                filled
                v-model="title"
                label="Title"
                placeholder="Title"
                class="q-mb-sm"
                :rules="[(val) => !!val || 'Field is required']"
              />
              <q-select
                dense
                filled
                v-model="labels"
                multiple
                :options="props.labels"
                use-chips
                stack-label
                label="Multiple selection"
                class="q-mb-sm"
              />
              <md-editor
                v-model="body"
                placeholder="#Markdown"
                language="en-US"
              />
            </div>
          </q-card-section>
          <q-card-actions align="left">
            <q-btn
              :disable="issueMutation.isLoading.value"
              @click="emits('onClose')"
              flat
              label="Cancel"
              v-close-popup
              color="dark"
            />
            <q-space />
            <q-btn
              :disable="issueMutation.isLoading.value"
              type="submit"
              flat
              label="Add"
              color="dark"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>
<style scoped></style>
