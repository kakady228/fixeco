<template>
  <div class="home">
    <SelectionForm />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import SelectionForm from '@/components/SelectionForm.vue';

@Options({
  components: {
    SelectionForm
  },
})
export default class Home extends Vue {

}
</script>
