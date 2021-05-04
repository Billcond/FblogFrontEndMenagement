<template>
  <div>
    <a-card title="请选择对应的文章" :bordered="false" style="width: 100%">
    </a-card>
     <a-button  @click ="clickAll('All')">全部</a-button>
    <a-dropdown>
      <a-menu slot="overlay" @click="clickFrontEnd">
        <a-menu-item key="JavaScript">
          JavaScript
        </a-menu-item>
        <a-menu-item key="CSS">
          CSS
        </a-menu-item>
        <a-menu-item key="HTML">
          HTML
        </a-menu-item>
      </a-menu>
      <a-button> 前端 <a-icon type="down" /> </a-button>
    </a-dropdown>
    <a-dropdown>
      <a-menu slot="overlay" @click="clickAfterEnd">
        <a-menu-item key="Node">
          Node
        </a-menu-item>
        <a-menu-item key="Koa">
          Koa
        </a-menu-item>
      </a-menu>
      <a-button> 后端 <a-icon type="down" /> </a-button>
    </a-dropdown>
    <a-dropdown>
      <a-menu slot="overlay" @click="clickFrame">
        <a-menu-item key="Vue">
          Vue
        </a-menu-item>
        <a-menu-item key="React">
          React
        </a-menu-item>
      </a-menu>
      <a-button> 框架 <a-icon type="down" /> </a-button>
    </a-dropdown>

    <a-button  @click ="clickOther('Other')">其他</a-button>

  </div>
</template>
<script>
export default {
  name:"ContentManagementHeader",
  methods: {
    clickFrontEnd(e) {
        switch (e.key){
          case "JavaScript":{
            this.$store.state.curArticles = this.$store.state.javascriptArticles;
            break;
          }
          case "CSS":{
            this.$store.state.curArticles = this.$store.state.cssArticles;
            break;
          }
          case "HTML":{
            this.$store.state.curArticles = this.$store.state.htmlArticles;
            break;
          }
        }
    },
    clickAfterEnd(e){
        switch (e.key){
          case "Node":{
            this.$store.state.curArticles = this.$store.state.nodeArticles;
            break;
          }
          case "Koa":{
            this.$store.state.curArticles = this.$store.state.koaArticles;
            break;
          }
        }
    },
    clickFrame(e){
        switch (e.key){
          case "Vue":{
            this.$store.state.curArticles = this.$store.state.vueArticles;
            break;
          }
          case "React":{
            this.$store.state.curArticles = this.$store.state.reactArticles;
            break;
          }
        }
    },
    clickOther(temp){
        this.$store.state.curArticles = this.$store.state.otherArticles;
    },
    clickAll(temp){
        this.$store.state.curArticles = this.$store.state.allArticles;
    }
    
  },
};
</script>