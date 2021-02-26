<script>
import { mapActions } from 'vuex';
import ButtonFooter from '@/components/button-footer.vue';
import getUserInfo from '@/assets/js/userInfo';

export default {
  components: {
    ButtonFooter,
  },
  name: 'CardContent',
  props: {
    id: {
      type: String,
      default: () => '',
    },
    name: {
      type: String,
      default: () => '',
    },
    description: {
      type: String,
      default: () => '',
    },
    imageurl: {
      type: String,
      default: () => '',
    },
  },
  async created() {
    this.user = await getUserInfo();
  },
  methods: {
    ...mapActions('orders', ['orderProductAction']),
    async order() {
      this.errorMessage = undefined;
      try {
        await this.orderProductAction(this.id);
      } catch (error) {
        this.errorMessage = 'Unauthorized';
      }
    },
  },
};
</script>

<template>
  <div class="card-content">
    <header class="card-header">
      <p class="card-header-title">{{ name }}</p>
    </header>

    <div class="content">
      <div class="catalog-image">
        <img v-bind:src="imageurl" />
      </div>
      <p class="description">{{ description }}</p>
    </div>

    <div class="card-footer" v-if="user">
      <ButtonFooter @clicked="order" label="Order"></ButtonFooter>
    </div>
  </div>
</template>
