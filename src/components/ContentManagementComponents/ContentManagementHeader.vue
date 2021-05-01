<template>
  <div>
    <a-card title="请选择对应的文章" :bordered="false" style="width: 100%">
    </a-card>
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
        <a-menu-item key="Express">
          Express
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
        alert(e.key)
    },
    clickAfterEnd(e){
        alert(e.key)
    },
    clickFrame(e){
        alert(e.key)
    },
    clickOther(temp){
        alert(temp)
    }
    
  },
};
</script>