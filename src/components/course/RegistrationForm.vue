<template>
  <div class="bg-paper rounded-2xl shadow-xl p-8 md:p-12 border border-border/30">
    <div class="mb-8">
      <h3 class="text-3xl font-serif font-bold text-ink mb-4">
        课程报名
      </h3>
      <div class="w-16 h-1 bg-accent/50"></div>
      <p class="text-secondary mt-4">
        填写下方信息，我们将尽快与您联系
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- 姓名 -->
      <div>
        <label for="name" class="block text-sm font-medium text-ink mb-2">
          您的称呼 <span class="text-accent">*</span>
        </label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          required
          placeholder="请输入您的称呼"
          class="w-full px-4 py-3 rounded-lg border border-border/50 bg-paper text-ink placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
          :disabled="isSubmitting"
        />
      </div>

      <!-- 邮箱 -->
      <div>
        <label for="email" class="block text-sm font-medium text-ink mb-2">
          电子邮箱 <span class="text-accent">*</span>
        </label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          required
          placeholder="请输入您的邮箱地址"
          class="w-full px-4 py-3 rounded-lg border border-border/50 bg-paper text-ink placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
          :disabled="isSubmitting"
        />
      </div>

      <!-- 电话（可选） -->
      <div>
        <label for="phone" class="block text-sm font-medium text-ink mb-2">
          联系电话 <span class="text-secondary">(可选)</span>
        </label>
        <input
          id="phone"
          v-model="formData.phone"
          type="tel"
          placeholder="请输入您的联系电话"
          class="w-full px-4 py-3 rounded-lg border border-border/50 bg-paper text-ink placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
          :disabled="isSubmitting"
        />
      </div>

      <!-- 课程选择 -->
      <div>
        <label for="course" class="block text-sm font-medium text-ink mb-2">
          意向课程 <span class="text-accent">*</span>
        </label>
        <select
          id="course"
          v-model="formData.course"
          required
          class="w-full px-4 py-3 rounded-lg border border-border/50 bg-paper text-ink focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
          :disabled="isSubmitting"
        >
          <option value="">请选择课程</option>
          <option value="beginner">24式太极拳入门班</option>
          <option value="intermediate">42式太极拳进阶班</option>
          <option value="advanced">传统108式研修班</option>
          <option value="private">一对一私教课程</option>
        </select>
      </div>

      <!-- 备注 -->
      <div>
        <label for="message" class="block text-sm font-medium text-ink mb-2">
          留言 <span class="text-secondary">(可选)</span>
        </label>
        <textarea
          id="message"
          v-model="formData.message"
          rows="4"
          placeholder="请告诉我们您的学习目标或其他需求..."
          class="w-full px-4 py-3 rounded-lg border border-border/50 bg-paper text-ink placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none"
          :disabled="isSubmitting"
        ></textarea>
      </div>

      <!-- 提示信息 -->
      <div v-if="submitStatus" class="p-4 rounded-lg" :class="{
        'bg-accent/10 border border-accent/30': submitStatus.type === 'success',
        'bg-red-50 border border-red-200': submitStatus.type === 'error'
      }">
        <p class="text-sm" :class="{
          'text-accent': submitStatus.type === 'success',
          'text-red-600': submitStatus.type === 'error'
        }">
          {{ submitStatus.message }}
        </p>
      </div>

      <!-- 提交按钮 -->
      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full px-8 py-4 bg-accent hover:bg-primary text-paper font-medium text-lg rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
      >
        <svg v-if="isSubmitting" class="animate-spin h-5 w-5 text-paper" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>{{ isSubmitting ? '提交中...' : '提交报名' }}</span>
      </button>

      <p class="text-xs text-secondary text-center">
        提交即表示您同意我们的隐私政策。我们将保护您的个人信息安全。
      </p>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import emailjs from '@emailjs/browser';

// 表单数据
const formData = reactive({
  name: '',
  email: '',
  phone: '',
  course: '',
  message: ''
});

// 提交状态
const isSubmitting = ref(false);
const submitStatus = ref(null);

// EmailJS 配置
// 注意：这些是示例值，您需要在 https://www.emailjs.com/ 注册并获取实际的配置
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

const handleSubmit = async () => {
  isSubmitting.value = true;
  submitStatus.value = null;

  try {
    // 准备发送的参数
    const templateParams = {
      to_name: formData.name,
      to_email: formData.email,
      phone: formData.phone || '未提供',
      course: getCourseName(formData.course),
      message: formData.message || '无',
      from_name: '太极文化官网',
      reply_to: formData.email
    };

    // 发送邮件
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    // 成功
    submitStatus.value = {
      type: 'success',
      message: '✓ 报名成功！我们已收到您的信息，将在24小时内与您联系。'
    };

    // 重置表单
    Object.keys(formData).forEach(key => {
      formData[key] = key === 'phone' || key === 'message' ? '' : '';
    });

  } catch (error) {
    console.error('EmailJS Error:', error);
    submitStatus.value = {
      type: 'error',
      message: '✗ 提交失败，请稍后重试或直接联系我们。错误信息：' + (error.text || error.message)
    };
  } finally {
    isSubmitting.value = false;
  }
};

const getCourseName = (value) => {
  const courses = {
    'beginner': '24式太极拳入门班',
    'intermediate': '42式太极拳进阶班',
    'advanced': '传统108式研修班',
    'private': '一对一私教课程'
  };
  return courses[value] || value;
};
</script>
