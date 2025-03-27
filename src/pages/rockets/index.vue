<template>
  <div class="rockets-page">
    <v-container>
      <!-- Header with gradient background -->
      <div class="header-section mb-8">
        <h1 class="text-h3 font-weight-bold text-white mb-2">🚀 Rocket Explorer</h1>
        <p class="text-subtitle-1 text-white text-opacity-80">Discover and manage your rocket collection</p>
      </div>

      <!-- Search and Add section -->
      <v-card class="mb-8 search-card" elevation="3" rounded="lg">
        <v-card-text>
          <v-row>
            <v-col cols="12" md="8">
              <v-text-field
                v-model="search"
                label="Search Rockets"
                clearable
                class="search-field"
                hide-details
                :variant="themeVariant"
                density="comfortable"
              >
                <template v-slot:prepend-inner>
                  <v-icon icon="mdi-magnify" color="primary"></v-icon>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="d-flex align-center">
              <v-btn color="primary" block @click="showForm = true" prepend-icon="mdi-rocket" class="add-rocket-btn"
                elevation="2">
                Add New Rocket
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Form Dialog -->
      <v-dialog v-model="showForm" max-width="600px">
        <v-card class="form-card">
          <v-card-text class="pa-0">
            <RocketForm @close-form="hideForm" @rocket-added="addRocket" />
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- Error Alert -->
      <v-alert v-if="error" type="error" variant="tonal" border="start" class="mb-6" closable>
        <div class="d-flex align-center">
          <div>
            <strong>Error loading rockets:</strong> {{ error.message }}
          </div>
          <v-spacer></v-spacer>
          <v-btn color="error" variant="tonal" @click="refetch()">Retry</v-btn>
        </div>
      </v-alert>

      <!-- Loading State -->
      <div v-if="isLoading" class="loading-container">
        <v-progress-circular indeterminate color="primary" size="64" width="5"
          class="loading-animation"></v-progress-circular>
        <p class="text-body-1 mt-4 text-medium-emphasis">Loading rockets...</p>
      </div>

      <!-- Empty State -->
      <v-card v-else-if="filteredRockets.length === 0" class="empty-state pa-8 text-center" elevation="0" border>
        <v-icon icon="mdi-rocket-launch-outline" size="64" color="primary" class="mb-4"></v-icon>
        <h3 class="text-h5 mb-2">No Rockets Found</h3>
        <p class="text-body-1 text-medium-emphasis mb-4">
          {{ search ? 'Try a different search term' : 'Add your first rocket to get started' }}
        </p>
        <v-btn color="primary" @click="showForm = true" prepend-icon="mdi-plus">
          Add Rocket
        </v-btn>
      </v-card>

      <!-- Rocket Grid -->
      <v-row v-else class="rocket-grid">
        <v-col v-for="rocket in filteredRockets" :key="rocket.id" cols="12" sm="6" class="rocket-col">
          <RocketCard :rocket="rocket" @view-details="goToDetail" />
        </v-col>
      </v-row>
    </v-container>

    <!-- Success Snackbar -->
    <v-snackbar v-model="snackbar" location="top" color="success" timeout="3000" rounded="pill">
      <div class="d-flex align-center">
        <v-icon icon="mdi-check-circle" class="mr-2"></v-icon>
        Rocket added successfully!
      </div>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRockets, useAddRocket } from '../../store/rocket-store';
import RocketCard from '@/components/rocket-card.vue';
import RocketForm from '@/components/rocket-form.vue';
import { useRouter } from 'vue-router';
import type { TAny } from '@/types/global';
import { useTheme } from 'vuetify';

const search = ref('');
const router = useRouter();
const snackbar = ref(false);
const showForm = ref(false);

const { data: rockets, error, isLoading, refetch } = useRockets();
const { mutate: addRocketMutation } = useAddRocket();

const filteredRockets = computed(() =>
  (rockets.value?.data || []).filter((rocket: TAny) =>
    rocket.name.toLowerCase().includes(search.value.toLowerCase())
  )
);

const theme = useTheme();
const themeVariant = computed(() => (theme.global.current.value.dark ? 'filled' : 'outlined'));

const hideForm = () => {
  showForm.value = false;
};

const addRocket = (rocket: TAny) => {
  addRocketMutation(rocket);
  snackbar.value = true;
  showForm.value = false;
};

const goToDetail = (id: string) => {
  router.push(`/rockets/${id}`);
};
</script>

<style scoped lang="scss">
.rockets-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #eef1f5 100%);

  :deep(.v-theme--dark) & {
    background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
  }
}

.header-section {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%);
  padding: 2.5rem 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.3);
  margin-top: 1rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    transform: rotate(30deg);
  }

  :deep(.v-theme--dark) & {
    box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.5);
  }
}

.search-card {
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05) !important;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.08) !important;
  }

  :deep(.v-theme--dark) & {
    background: #1e293b;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2) !important;

    &:hover {
      box-shadow: 0 6px 25px rgba(0, 0, 0, 0.25) !important;
    }
  }
}

.add-rocket-btn {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  font-weight: 600;
  height: 48px;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0 6px 15px rgba(99, 102, 241, 0.3);
  }

  :deep(.v-theme--dark) & {
    box-shadow: 0 6px 15px rgba(99, 102, 241, 0.2);

    &:hover {
      box-shadow: 0 6px 15px rgba(99, 102, 241, 0.4);
    }
  }
}

.gradient-header {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 8px 8px 0 0;
}

.form-card {
  border-radius: 16px !important;
  overflow: hidden;

  :deep(.v-theme--dark) & {
    background: #1e293b;
  }
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
}

.loading-animation {
  display: block;
  margin: 0 auto;
  animation: pulse 1.5s infinite ease-in-out;
}

.rocket-grid {
  margin-top: 1rem;
}

.rocket-col {
  transition: transform 0.3s ease;
  animation: fadeIn 0.5s ease-out;
  animation-fill-mode: both;

  &:hover {
    transform: translateY(-5px);
  }

  &:nth-child(2) {
    animation-delay: 0.1s;
  }

  &:nth-child(3) {
    animation-delay: 0.2s;
  }

  &:nth-child(4) {
    animation-delay: 0.3s;
  }

  &:nth-child(5) {
    animation-delay: 0.4s;
  }

  &:nth-child(6) {
    animation-delay: 0.5s;
  }
}

.empty-state {
  padding: 4rem 2rem;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px dashed rgba(99, 102, 241, 0.3);

  :deep(.v-theme--dark) & {
    background-color: rgba(30, 41, 59, 0.7);
    border: 1px dashed rgba(99, 102, 241, 0.3);
  }
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
</style>
