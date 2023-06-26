<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import { useRoute } from 'vue-router';
import IssueCard from '../components/issue-list/IssueCard.vue';
import useIssue from '../composables/useIssue';

const route = useRoute();
const { id } = route.params;
const { issueQuery, issueCommentsQuery } = useIssue(+id);
</script>
<template>
  <router-link class="text-white" to="/">Go back</router-link>
  <!-- Header -->
  <LoaderSpinner
    v-if="issueQuery.isLoading.value"
    :thickness="1"
    size="1.5rem"
    :show-text="false"
  />
  <IssueCard v-else-if="issueQuery.data.value" :issue="issueQuery.data.value" />
  <p v-else>Issue #{{ id }} not found</p>
  <!-- Comentarios -->
  <LoaderSpinner v-if="issueCommentsQuery.isLoading.value" :thickness="1" size="1.5rem" :show-text="false" />

  <div class="column" v-else-if="issueCommentsQuery.data.value">
    <span class="text-h5 q-mb-md"
      >Comments ({{ issueCommentsQuery.data.value?.length }})</span
    >
    <IssueCard
      v-for="comment of issueCommentsQuery.data.value"
      :key="comment.id"
      :issue="comment"
    />
  </div>
</template>

<style scoped></style>
