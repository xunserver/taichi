<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isDark = ref(false);

onMounted(() => {
  // 从 localStorage 读取主题偏好
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    isDark.value = savedTheme === 'dark';
  } else {
    // 尊重系统偏好
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  applyTheme();
});

const toggleTheme = () => {
  isDark.value = !isDark.value;
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
  applyTheme();
};

const applyTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};
</script>

<template>
  <button
    @click="toggleTheme"
    class="fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg bg-paper dark:bg-ink hover:bg-mist dark:hover:bg-ink-light transition-all duration-300 hover:scale-110"
    :aria-label="isDark ? '切换到浅色模式' : '切换到深色模式'"
  >
    <!-- 太阳图标 (浅色模式) -->
    <svg
      v-if="!isDark"
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 text-ink"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>

    <!-- 月亮图标 (深色模式) -->
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 text-paper"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  </button>
</template>

<style scoped>
button {
  cursor: pointer;
}
</style>
