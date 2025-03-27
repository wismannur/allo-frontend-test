<template>
  <div class="home-page">
    <!-- Hero Section -->
    <div class="hero-section">
      <v-container>
        <v-row align="center" class="hero-content">
          <v-col cols="12" md="6" class="hero-text">
            <h1 class="text-h2 font-weight-bold text-white mb-4">Rocket Explorer</h1>
            <p class="text-h6 text-white text-opacity-80 mb-6">
              Discover and explore the fascinating world of rockets with our interactive platform.
            </p>
            <div class="d-flex flex-wrap gap-3">
              <v-btn
                size="large"
                class="explore-btn"
                to="/rockets"
                prepend-icon="mdi-rocket"
              >
                Explore Rockets
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="hero-image-col d-none d-md-flex">
            <div class="hero-image-container">
              <img src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                   alt="Rocket Launch"
                   class="hero-image" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.home-page {
  background: linear-gradient(135deg, #f5f7fa 0%, #eef1f5 100%);

  :deep(.v-theme--dark) & {
    background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
  }
}

// Hero Section
.hero-section {
  min-height: 100vh;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%);
  padding: 6rem 0 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -10%;
    right: -10%;
    width: 60%;
    height: 100%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    transform: rotate(30deg);
  }

  .hero-content {
    position: relative;
    z-index: 2;
    min-height: 500px;
  }

  .hero-text {
    animation: fadeInUp 1s ease-out;
  }

  .hero-image-col {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hero-image-container {
    width: 100%;
    max-width: 500px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    transform: perspective(1000px) rotateY(-5deg) rotateX(5deg);
    transition: all 0.5s ease;
    animation: float 6s ease-in-out infinite, fadeIn 1s ease-out;

    &:hover {
      transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
    }

    .hero-image {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  .explore-btn {
    background: white;
    color: #6366f1;
    font-weight: 600;
    padding: 0 24px;
    height: 48px;
    border-radius: 8px;
    transition: all 0.3s ease;
    margin-right: 16px;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(255, 255, 255, 0.2);
    }
  }

  .learn-btn {
    color: white;
    border-color: rgba(255, 255, 255, 0.5);
    font-weight: 600;
    padding: 0 24px;
    height: 48px;
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-3px);
    }
  }

  .hero-wave {
    position: relative;
    width: 100%;
    color: #f5f7fa;
    margin-top: -5px;

    :deep(.v-theme--dark) & {
      color: #111827;
    }
  }
}

// Animations
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes float {
  0%, 100% {
    transform: perspective(1000px) rotateY(-5deg) rotateX(5deg) translateY(0);
  }
  50% {
    transform: perspective(1000px) rotateY(-5deg) rotateX(5deg) translateY(-15px);
  }
}

// Responsive Adjustments
@media (max-width: 960px) {
  .hero-section {
    padding: 4rem 0 0;

    .hero-content {
      min-height: 400px;
    }
  }

  .cta-section .cta-content {
    padding: 3rem 1.5rem;
  }
}

@media (max-width: 600px) {
  .hero-section {
    padding: 3rem 0 0;

    .hero-content {
      min-height: 300px;
    }

    h1 {
      font-size: 2.5rem !important;
    }
  }

  .cta-section {
    padding: 3rem 0;
  }

  h2 {
    font-size: 2rem !important;
  }
}
</style>
