<template>
  <v-card class="rocket-form-card" elevation="3">
    <v-card-title class="gradient-header text-white pa-4">
      <h2 class="text-h5">Add New Rocket</h2>
    </v-card-title>

    <v-card-text class="pa-4 pt-6">
      <v-form @submit.prevent="addRocket">
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="newRocket.name" label="Rocket Name" variant="outlined"
              :rules="[v => !!v || 'Name is required']" required prepend-inner-icon="mdi-rocket"
              class="rocket-field"></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-textarea v-model="newRocket.description" label="Description" variant="outlined"
              :rules="[v => !!v || 'Description is required']" required prepend-inner-icon="mdi-text-box"
              class="rocket-field" rows="3" auto-grow></v-textarea>
          </v-col>

          <v-col cols="12">
            <v-text-field v-model="newRocket.image" label="Image URL" variant="outlined"
              :rules="[v => !!v || 'Image URL is required']" required prepend-inner-icon="mdi-image"
              class="rocket-field" hint="Enter a valid image URL" persistent-hint></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field v-model="newRocket.cost" label="Cost per Launch ($)" type="number" variant="outlined"
              :rules="[v => !!v || 'Cost is required']" required prepend-inner-icon="mdi-currency-usd"
              class="rocket-field"></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field v-model="newRocket.country" label="Country" variant="outlined"
              :rules="[v => !!v || 'Country is required']" required prepend-inner-icon="mdi-map-marker"
              class="rocket-field"></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field v-model="newRocket.firstFlight" label="First Flight" variant="outlined"
              :rules="[v => !!v || 'First flight date is required']" required prepend-inner-icon="mdi-calendar"
              class="rocket-field" placeholder="YYYY-MM-DD"></v-text-field>
          </v-col>

          <v-col cols="12" class="d-flex justify-end">
            <v-btn color="grey-darken-1" variant="text" class="cancel-btn" @click="hideForm">Cancel</v-btn>
            <v-btn type="submit" size="large" class="submit-btn" :disabled="!isFormValid">
              <v-icon class="mr-2">mdi-rocket-launch</v-icon>
              Add Rocket
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, defineEmits, computed } from 'vue';

const emit = defineEmits(['rocket-added', 'close-form']);

const newRocket = ref({
  name: '',
  description: '',
  image: '',
  cost: '',
  country: '',
  firstFlight: '',
});

const isFormValid = computed(() => {
  return (
    !!newRocket.value.name &&
    !!newRocket.value.description &&
    !!newRocket.value.image &&
    !!newRocket.value.cost &&
    !!newRocket.value.country &&
    !!newRocket.value.firstFlight
  );
});

const hideForm = () => {
  emit('close-form');
}

const addRocket = () => {
  if (!isFormValid.value) {
    return;
  }

  const rocket = {
    id: Date.now().toString(), // Use timestamp as unique ID
    name: newRocket.value.name,
    description: newRocket.value.description,
    flickr_images: [newRocket.value.image],
    cost_per_launch: Number(newRocket.value.cost),
    country: newRocket.value.country,
    first_flight: newRocket.value.firstFlight,
  };

  emit('rocket-added', rocket);

  // Reset form
  newRocket.value = {
    name: '',
    description: '',
    image: '',
    cost: '',
    country: '',
    firstFlight: '',
  };
};
</script>

<style scoped lang="scss">
.rocket-form-card {
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  :deep(.v-theme--dark) & {
    background: #1e293b;
  }
}

.gradient-header {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
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
}

.rocket-field {
  margin-bottom: 8px;
  transition: all 0.3s ease;

  &:focus-within {
    transform: translateY(-2px);
  }

  :deep(.v-field__prepend-inner) {
    opacity: 0.7;
    transition: opacity 0.3s ease;
  }

  &:focus-within {
    :deep(.v-field__prepend-inner) {
      opacity: 1;
    }
  }
}

.cancel-btn {
  padding: 0 24px;
  height: 48px;
  margin-right: 12px;
}

.submit-btn {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  font-weight: 600;
  padding: 0 24px;
  height: 48px;
  border-radius: 8px;
  transition: all 0.3s ease;


  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(99, 102, 241, 0.3);
  }

  &:disabled {
    background: #cbd5e1;
    color: #64748b;
  }

  :deep(.v-theme--dark) & {
    &:disabled {
      background: #334155;
      color: #94a3b8;
    }
  }
}
</style>
