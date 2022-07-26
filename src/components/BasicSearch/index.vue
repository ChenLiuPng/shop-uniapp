<script setup lang="ts">
  import { withDefaults } from 'vue';
  interface PropsType {
    value?: string;
  }
  const emit = defineEmits(['handleClick']);
  const props = withDefaults(defineProps<PropsType>(), {
    value: '西装',
  });
  const handleClick = () => {
    emit('handleClick');
  };
</script>
<template>
  <!-- 导航栏 -->
  <view class="BasicSearch" @click="handleClick">
    <image src="../../static/svg/index/search.svg" class="icon" />
    <text>{{ props?.value }}</text>
  </view>
</template>
<style lang="scss" scoped>
  .BasicSearch {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 710rpx;
    height: 62rpx;
    border-radius: 30rpx;
    background-color: #fff;
    margin: 20rpx 0;
    padding: 15rpx 32rpx;
    font-size: 28rpx;
    color: #b7b7b7;
    .icon {
      width: 28rpx;
      height: 28rpx;
      margin-right: 25rpx;
    }
  }
</style>
