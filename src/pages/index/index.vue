<script setup>
  import { ref } from 'vue';
  import BasicSearch from '@/components/BasicSearch/index.vue';
  import AlTabs from '../../uni_modules/al-tabs/components/al-tabs/al-tabs.vue';
  const tabIndex = ref(0);
  const tabs = ref([
    { name: '精选' },
    { name: '数码' },
    { name: '家居' },
    { name: '鞋包' },
    { name: '美食' },
    { name: '美妆' },
    { name: '母婴' },
    { name: '全部' },
  ]);
  const tabClick = (index) => {
    console.log(index);
  };
  const handleClick = () => {
    console.log('handleClick');
  };
</script>
<template>
  <view class="content">
    <!-- 导航栏 -->
    <view class="header">
      <view class="search">
        <BasicSearch @handleClick="handleClick" />
      </view>
      <!-- tabs -->
      <AlTabs
        :current="tabIndex"
        :list="tabs"
        bg="#FF4A2B"
        color="#fff"
        activeColor="#fff"
        @change="tabClick"
      />
      <!-- 轮播图 -->
      <swiper class="swiper" :autoplay="true" :interval="3000" :duration="1000">
        <swiper-item>
          <view class="swiper-item">
            <image src="/static/images/index/banner.png" class="image" mode="widthFix" />
          </view>
        </swiper-item>
      </swiper>
    </view>
    <!-- 列表 -->
  </view>
</template>
<style lang="scss" scoped>
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .header {
      height: 370rpx;
      background-color: #ff4a2b;
      .search {
        display: flex;
        padding: 0 20rpx;
        background-color: #ff4a2b;
      }
      .swiper {
        height: 215rpx;
        margin-top: 20rpx;
        .swiper-item {
          display: flex;
          justify-content: center;
          width: 100%;
          .image {
            width: 720rpx;
          }
        }
      }
    }
  }
</style>
