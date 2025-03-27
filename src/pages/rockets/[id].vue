<template>
  <div class="rocket-detail-page">
    <!-- Loading State -->
    <div v-if="!rocket" class="loading-container">
      <v-progress-circular indeterminate color="primary" size="64" width="5"
        class="loading-animation"></v-progress-circular>
      <p class="text-body-1 mt-4 text-medium-emphasis">Loading rocket details...</p>
    </div>

    <template v-else-if="rocket">
      <!-- Full-width Hero Image Section -->
      <div class="hero-section">
        <div class="hero-image-container">
          <v-img
            :src="rocket.flickr_images && rocket.flickr_images.length > 0 ? rocket.flickr_images[0] : '/placeholder.jpg'"
            height="500px" cover class="hero-image">
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </div>
            </template>
            <div class="hero-overlay">
              <v-container>
                <h1 class="text-h2 font-weight-bold text-white mb-2">{{ rocket.name || 'Rocket Details' }}</h1>
                <p class="text-h6 text-white text-opacity-80">{{ rocket.company || '' }}</p>
              </v-container>
            </div>
          </v-img>
        </div>
      </div>
    </template>
  </div>

  <!-- Main Content -->
  <v-container class="content-container">
    <!-- Description Card -->
    <v-card v-if="rocket.description" class="description-card mb-8" elevation="3">
      <v-card-text class="pa-6">
        <p class="text-body-1 description-text">{{ rocket.description }}</p>
      </v-card-text>
    </v-card>

    <!-- Specifications Section -->
    <h2 class="text-h4 font-weight-medium mb-6 section-title">Specifications</h2>

    <v-row class="specs-row">
      <v-col cols="12" sm="6" md="4" v-for="(spec, index) in rocketSpecs" :key="index" class="spec-col">
        <v-card class="spec-card" elevation="2">
          <v-card-text class="pa-4">
            <div class="d-flex align-center">
              <v-avatar color="primary" class="spec-icon-bg mr-4">
                <v-icon :icon="spec.icon" color="white"></v-icon>
              </v-avatar>
              <div>
                <div class="text-subtitle-2 text-medium-emphasis">{{ spec.label }}</div>
                <div class="text-h6 font-weight-bold">{{ spec.value }}</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Image Gallery -->
    <template v-if="rocket.flickr_images && rocket.flickr_images.length > 0">
      <h2 class="text-h4 font-weight-medium my-6 section-title">Gallery</h2>

      <v-row class="gallery-row">
        <v-col v-for="(image, index) in rocket.flickr_images" :key="index" cols="12" sm="6" md="4" lg="3"
          class="gallery-col">
          <v-card class="gallery-card" elevation="2" @click="openGallery(index)">
            <v-img :src="image" height="200" cover class="gallery-image">
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </div>
              </template>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-container>

  <!-- Image Gallery Dialog -->
  <v-dialog v-if="rocket.flickr_images && rocket.flickr_images.length > 0" v-model="galleryDialog" fullscreen>
    <v-card class="gallery-dialog-card">
      <v-toolbar color="primary" class="gallery-toolbar">
        <v-btn icon @click="galleryDialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ rocket.name || 'Rocket' }} Gallery</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="pa-0">
        <v-carousel v-model="activeImage" height="calc(100vh - 64px)" hide-delimiters show-arrows="hover">
          <v-carousel-item v-for="(image, i) in rocket.flickr_images" :key="i">
            <div class="d-flex align-center justify-center fill-height bg-black">
              <v-img :src="image" max-height="90vh" contain class="mx-auto"></v-img>
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>


<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import type { TAny } from '@/types/global';
import { createFetch } from '@/services/constants';

const route = useRoute();
const rocket = ref<TAny | null>({
  flickr_images: []
});
const galleryDialog = ref(false);
const activeImage = ref(0);

onMounted(async () => {
  try {
    const res = await createFetch(`/rockets/${route.params.id}`).get({});
    rocket.value = res.data;
    console.log('Rocket data loaded:', rocket.value);
  } catch (error) {
    console.error('Failed to load rocket details', error);
  }
});

const rocketSpecs = computed(() => {
  if (!rocket.value) return [];

  const specs = [];

  if (rocket.value.cost_per_launch !== undefined) {
    specs.push({
      icon: 'mdi-currency-usd',
      label: 'Cost per Launch',
      value: `$${rocket.value.cost_per_launch.toLocaleString()}`
    });
  }

  if (rocket.value.country) {
    specs.push({
      icon: 'mdi-map-marker',
      label: 'Country',
      value: rocket.value.country
    });
  }

  if (rocket.value.first_flight) {
    specs.push({
      icon: 'mdi-calendar',
      label: 'First Flight',
      value: rocket.value.first_flight
    });
  }

  if (rocket.value.height && rocket.value.height.meters) {
    specs.push({
      icon: 'mdi-ruler',
      label: 'Height',
      value: `${rocket.value.height.meters} m`
    });
  }

  if (rocket.value.mass && rocket.value.mass.kg) {
    specs.push({
      icon: 'mdi-weight',
      label: 'Mass',
      value: `${rocket.value.mass.kg.toLocaleString()} kg`
    });
  }

  if (rocket.value.success_rate_pct !== undefined) {
    specs.push({
      icon: 'mdi-rocket',
      label: 'Success Rate',
      value: `${rocket.value.success_rate_pct}%`
    });
  }

  if (rocket.value.engines && rocket.value.engines.type) {
    specs.push({
      icon: 'mdi-engine',
      label: 'Engines',
      value: rocket.value.engines.type
    });
  }

  if (rocket.value.stages !== undefined) {
    specs.push({
      icon: 'mdi-layers',
      label: 'Stages',
      value: rocket.value.stages
    });
  }

  if (rocket.value.engines &&
    rocket.value.engines.thrust_vacuum &&
    rocket.value.engines.thrust_vacuum.kN) {
    specs.push({
      icon: 'mdi-speedometer',
      label: 'Max Speed',
      value: `${Math.round(rocket.value.engines.thrust_vacuum.kN)} kN`
    });
  }

  return specs;
});

const openGallery = (index: number) => {
  activeImage.value = index;
  galleryDialog.value = true;
};
</script>

<style scoped lang="scss">
.rocket-detail-page {
  background: linear-gradient(135deg, #f5f7fa 0%, #eef1f5 100%);

  :deep(.v-theme--dark) & {
    background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
  }
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.loading-animation {
  display: block;
  margin: 0 auto;
  animation: pulse 1.5s infinite ease-in-out;
}

.hero-section {
  width: 100%;
  height: 500px;
  position: relative;
  overflow: hidden;
}

.hero-image-container {
  width: 100%;
  height: 100%;

  .hero-image {
    width: 100%;
    height: 100%;
  }

  .hero-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%);
    padding: 2rem 0;
    display: flex;
    align-items: flex-end;
  }
}

.content-container {
  margin-top: -3rem;
  position: relative;
  z-index: 2;
}

.description-card {
  border-radius: 16px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05) !important;

  :deep(.v-theme--dark) & {
    background: #1e293b;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2) !important;
  }

  .description-text {
    font-size: 1.125rem;
    line-height: 1.8;
  }
}

.section-title {
  position: relative;
  padding-left: 1rem;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.5rem;
    bottom: 0.5rem;
    width: 4px;
    background: linear-gradient(to bottom, #6366f1, #8b5cf6);
    border-radius: 4px;
  }
}

.specs-row {
  margin: 0 -12px;
}

.spec-col {
  padding: 12px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
}

.spec-card {
  border-radius: 12px;
  height: 100%;
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.15) !important;
  }

  :deep(.v-theme--dark) & {
    background: #1e293b;

    &:hover {
      box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3) !important;
    }
  }
}

.spec-icon-bg {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
}

.gallery-row {
  margin: 0 -12px;
}

.gallery-col {
  padding: 12px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
}

.gallery-card {
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.15) !important;

    .gallery-image {
      transform: scale(1.05);
    }
  }

  :deep(.v-theme--dark) & {
    background: #1e293b;

    &:hover {
      box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3) !important;
    }
  }
}

.gallery-image {
  transition: transform 0.5s ease;
}

.gallery-dialog-card {
  :deep(.v-theme--dark) & {
    background: #0f172a;
  }
}

.gallery-toolbar {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.7;
    transform: scale(0.95);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .hero-section {
    height: 350px;
  }

  .content-container {
    margin-top: -2rem;
  }

  .hero-overlay {
    h1 {
      font-size: 2rem !important;
    }
  }
}
</style>
