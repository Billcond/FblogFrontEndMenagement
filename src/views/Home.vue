<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :default-selected-keys="['']">
        <a-menu-item key="1" @click="clickPublishBlog">
          <a-icon type="file-markdown" />
          <span>博文发布</span>
        </a-menu-item>
        <a-menu-item key="2" @click="clickManagementBlog">
          <a-icon type="file-markdown" />
          <span>博文管理</span>
        </a-menu-item>
        <a-menu-item key="3" @click="clickBlogStatistics">
          <!-- <a-icon type="upload" /> -->
          <a-icon type="file-markdown" />
          <span>博文统计</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <!--头部-->
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />F-blog前端管理页面
      </a-layout-header>
      <router-view/>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
      hob:'asd'
    }
  },
  methods:{
    clickPublishBlog(){
      this.$router.replace('/fblog/management/edit')
    },
    clickManagementBlog(){
      this.$router.replace('/fblog/management/management')
    },
    clickBlogStatistics(){
      this.$router.replace('/fblog/management/statistic')
    }
  }
};
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
