<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import FilterSelector from '../components/filter-selector/FilterSelector.vue';
import IssueList from 'src/issues/components/issue-list/IssueList.vue';
import useIssues from '../composables/useIssues';
import FloatingButtons from '../components/FloatingButtons.vue';
import NewIssueDialog from '../components/NewIssueDialog.vue';
import { ref } from 'vue';
import useLabels from '../composables/useLabels';

const { issuesQuery } = useIssues();
const { labelsQuery } = useLabels();

const isOpen = ref<boolean>(false);

const openDialog = () => {
  isOpen.value = true;
};
</script>
<template>
  <div class="row q-mb-md">
    <div class="col-12">
      <span class="text-h4">GitHub Issues</span>
    </div>
  </div>

  <div class="row">
    <div class="col-xs-12 col-md-4">
      <FilterSelector />
    </div>

    <div class="col-xs-12 col-md-8">
      <LoaderSpinner v-if="issuesQuery.isLoading.value" color="white" />
      <IssueList v-else :issues="issuesQuery.data?.value || []" />
    </div>
  </div>

  <!-- FloatingButtons -->
  <FloatingButtons
    :buttons="[
      {
        action: openDialog,
        color: 'primary',
        icon: 'add',
        size: 'lg',
      },
    ]"
  />

  <!-- New Issue -->

  <NewIssueDialog
    v-if="labelsQuery.data"
    :is-open="isOpen"
    :labels="labelsQuery.data.value?.map((label) => label.name) || []"
    @on-close="isOpen = false"
  />
</template>

<style scoped></style>
