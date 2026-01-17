import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // 太极阴阳色彩系统
        yin: '#1a1a1a',
        yang: '#f5f5f5',
        // 禅意自然色彩
        'zen-green': '#4a7c59',
        bamboo: '#8b9d83',
        sage: '#9ca986',
        earth: '#d4c4a8',
        gold: '#c9a227',
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', '"Playfair Display"', 'serif'],
        sans: ['"Noto Sans SC"', '"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-yin-yang': 'linear-gradient(135deg, #1a1a1a 0%, #f5f5f5 100%)',
        'gradient-zen': 'linear-gradient(135deg, #4a7c59 0%, #8b9d83 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
