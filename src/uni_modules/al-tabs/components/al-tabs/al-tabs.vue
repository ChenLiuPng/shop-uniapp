<template>
  <view class="al-tabs" :style="{ backgroundColor: bg, color: color }">
    <scroll-view
      class="al-tabs-scroll"
      scroll-x="true"
      :scroll-left="scrollLeft"
      scroll-with-animation
    >
      <view class="al-scroll-view">
        <view
          class="al-tab-item"
          v-for="(item, index) in list"
          :key="index"
          @click="clickTab(index)"
        >
          <text v-if="currentIndex != index" class="name">{{ item.name }}</text>
          <text v-else class="name tab-active" :style="{ color: activeColor }">{{
            item.name
          }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    name: 'AlTabs',
    props: {
      list: {
        type: Array,
        default() {
          return [];
        },
      },
      current: {
        type: Number,
        default: 0,
      },
      bg: {
        type: String,
        default: '#ef5e4f',
      },
      color: {
        type: String,
        default: '#fff',
      },
      activeColor: {
        type: String,
        default: '#fff',
      },
    },
    data() {
      return {
        currentIndex: 0, //当前tab索引
        scrollLeft: 0,
        tabViewWidth: 0, //tab视图的宽度
        tabQueryInfo: [],
      };
    },
    watch: {
      current(n) {
        this.$nextTick(function () {
          this.currentIndex = n;
          this.scrollByIndex();
        });
      },
    },
    mounted() {
      this.scrollInit();
    },
    methods: {
      clickTab(index) {
        this.currentIndex = index;
        this.$emit('change', index);
      },
      scrollByIndex() {
        let tabInfo = this.tabQueryInfo[this.currentIndex];
        if (tabInfo.left < this.tabViewWidth / 2) {
          this.scrollLeft = 0;
          return;
        }
        this.scrollLeft = tabInfo.left - this.tabViewWidth / 2 + tabInfo.width / 2;
      },
      scrollInit() {
        // eslint-disable-next-line no-undef
        const query = uni.createSelectorQuery().in(this);
        query
          .selectAll('.al-tab-item')
          .boundingClientRect((data) => {
            this.tabQueryInfo = data;
          })
          .exec();
        query
          .select('.al-scroll-view')
          .boundingClientRect((data) => {
            this.tabViewWidth = data.width;
          })
          .exec();
      },
    },
  };
</script>

<style lang="scss" scoped>
  .al-tabs {
    border: none;
  }
  .al-tabs-scroll {
    white-space: nowrap;
  }
  .al-scroll-view {
    display: flex;
    align-items: center;
  }
  .al-tab-item {
    font-size: 28rpx;
    padding: 20rpx 30rpx;
    .name {
      white-space: nowrap;
      padding: 10rpx 0;
      // padding: 10rpx 30rpx;
    }
    .tab-active {
      color: #fff;
      font-weight: 600;
      font-size: 110%;
      border-bottom: 2px solid #fff;
    }
  }
  // 隐藏scroll-view下的滚动条
  scroll-view ::v-deep ::-webkit-scrollbar {
    display: none;
    width: 0 !important;
    height: 0 !important;
    -webkit-appearance: none;
    background: transparent;
  }
</style>
