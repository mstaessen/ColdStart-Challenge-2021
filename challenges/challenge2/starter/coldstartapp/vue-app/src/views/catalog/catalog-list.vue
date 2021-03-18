<script>
import CardContent from '@/components/card-content.vue';

export default {
  name: 'CatalogList',
  props: {
    icecreams: {
      type: Array,
      default: () => [],
    },
    featuredIcecreamId: {
      type: Number,
      default: () => undefined,
    },
    personalizerEventId: {
      type: String,
      default: () => undefined,
    },
    errorMessage: {
      type: String,
      default: () => '',
    },
  },
  components: {
    CardContent,
  },
  data() {
    return {
    };
  },
  computed: {
    sortedIcecreams: function sortedIcecreams() {
      return this.icecreams.filter((i) => i.Id === this.featuredIcecreamId)
        .concat(this.icecreams.filter((i) => i.Id !== this.featuredIcecreamId));
    },
  },
};
</script>

<template>
  <div>
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <div v-if="!icecreams.length && !errorMessage">
      Loading data ...
    </div>
    <div class="container">
      <div
        v-for="(icecream) in sortedIcecreams"
        :key="icecream.Id"
        role="presentation"
      >
        <div class="card">
          <CardContent
            :id="icecream.Id"
            :name="icecream.Name"
            :featured="icecream.Id === featuredIcecreamId"
            :description="icecream.Description"
            :imageurl="icecream.ImageUrl"
            :personalizerEventId="personalizerEventId"
          />
        </div>
      </div>
    </div>
  </div>
</template>
