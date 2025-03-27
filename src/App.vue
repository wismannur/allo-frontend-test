<template>
  <v-app>
    <!-- Main Content -->
    <v-main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.main-content {
  background: linear-gradient(135deg, #f5f7fa 0%, #eef1f5 100%);

  :deep(.v-theme--dark) & {
    background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
  }
}

// Page transition
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes rocket-float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-3px);
  }
}
</style>
