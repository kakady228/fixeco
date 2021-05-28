<template>
  <div class="home">
    <SelectionForm />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue';
import SelectionForm from '@/components/SelectionForm.vue';

@Options({
  components: {
    HelloWorld,
    SelectionForm
  },
})
export default class Home extends Vue {

}
</script>
