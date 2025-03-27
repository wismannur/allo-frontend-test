<template>
  <v-card class="rocket-card" @click="$emit('view-details', rocket.id)" elevation="3">
    <div class="image-container">
      <v-img
        :src="rocket.flickr_images && rocket.flickr_images.length > 0 ? rocket.flickr_images[0] : '/placeholder.jpg'"
        height="200px" cover class="rocket-image">
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </div>
        </template>

        <!-- Gradient overlay -->
        <div class="image-overlay">
          <v-chip size="small" class="country-chip" color="primary">
            {{ rocket.country || 'Unknown' }}
          </v-chip>
        </div>
      </v-img>
    </div>

    <v-card-title class="rocket-title pt-3 pb-1">
      {{ rocket.name || 'Unnamed Rocket' }}
    </v-card-title>

    <v-card-subtitle class="rocket-subtitle pb-2">
      {{ rocket.description ? (rocket.description.substring(0, 80) + '...') : 'No description available' }}
    </v-card-subtitle>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions class="rocket-actions pa-4 pt-2">
      <div class="d-flex align-center">
        <v-icon icon="mdi-calendar" size="small" class="mr-1 text-primary"></v-icon>
        <span class="text-caption">{{ rocket.first_flight || 'N/A' }}</span>
      </div>

      <v-spacer></v-spacer>

      <v-btn variant="text" color="primary" class="details-btn px-2" size="small">
        View Details
        <v-icon icon="mdi-arrow-right" size="small" class="ml-1"></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { TAny } from '@/types/global';

defineProps<{ rocket: TAny }>();
defineEmits(['view-details']);

</script>

<style scoped lang="scss">
.rocket-card {
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 25px rgba(99, 102, 241, 0.15) !important;

    .rocket-image {
      transform: scale(1.05);
    }

    .details-btn {
      .v-icon {
        transform: translateX(3px);
      }
    }
  }

  :deep(.v-theme--dark) & {
    background: #1e293b;

    &:hover {
      box-shadow: 0 12px 25px rgba(99, 102, 241, 0.3) !important;
    }
  }
}

.image-container {
  position: relative;
  overflow: hidden;

  .rocket-image {
    transition: transform 0.5s ease;
  }

  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.4) 100%);
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 12px;
  }
}

.country-chip {
  font-size: 0.75rem;
  font-weight: 600;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
  color: white !important;
  box-shadow: 0 2px 10px rgba(99, 102, 241, 0.3);
}

.rocket-title {
  font-weight: 600;
  line-height: 1.3;
  font-size: 1.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rocket-subtitle {
  color: rgba(100, 116, 139, 0.8);
  line-height: 1.5;

  :deep(.v-theme--dark) & {
    color: rgba(203, 213, 225, 0.8);
  }
}

.rocket-actions {
  margin-top: auto;
}

.details-btn {
  font-weight: 600;
  font-size: 0.875rem;

  .v-icon {
    transition: transform 0.3s ease;
  }
}
</style>
