<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible style="min-height:100vh">
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
  },
  created(){
    this.getRequest('/articles').then(resp=>{
          if(resp){
            this.$store.state.allArticles = resp.data;
            this.$store.state.curArticles = resp.data;//因为是一开始当前数据就是全部数据
            this.$store.state.javascriptArticles = this.$store.state.allArticles.filter((o)=>{
              return o.type==="JavaScript"
            })
            this.$store.state.cssArticles = this.$store.state.allArticles.filter((o)=>{
              return o.type==="CSS"
            })
            this.$store.state.htmlArticles = this.$store.state.allArticles.filter((o)=>{
              return o.type==="HTML"
            })
            this.$store.state.nodeArticles = this.$store.state.allArticles.filter((o)=>{
              return o.type==="Node"
            })
            this.$store.state.koaArticles = this.$store.state.allArticles.filter((o)=>{
              return o.type==="Koa"
            })
            this.$store.state.vueArticles = this.$store.state.allArticles.filter((o)=>{
              return o.type==="Vue"
            })
            this.$store.state.reactArticles = this.$store.state.allArticles.filter((o)=>{
              return o.type==="React"
            })
            this.$store.state.otherArticles = this.$store.state.allArticles.filter((o)=>{
              return o.type==="Other"
            })
          }else{
            console.log('无响应')
            return false;
          }
        })
    console.log('ContentManagement,created',this.data,this.$el)
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
  height: 18px;

  margin: 16px;
}
</style>
