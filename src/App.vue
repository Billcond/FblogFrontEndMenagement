<template>
  <div id="app"><!--说明就生命周期而言 组件和非组件还是不一样的-->
    <router-view/>
  </div>
</template>

<style>

</style>
<script>
export default {
  compunent:{},
  data(){
        return{
          message:""
        }
    },
  // data:{
  //   el:"#app",
  //   message:"测试生命周期"
  // },
  beforeCreate(){
       console.log("App.vue============================")
       console.log("App.vue============================")
       console.log("App.vue============================")
      console.log('beforeCreate',this.data,this.$el)
  },
  created(){//实例化好了 此时已经可以读取到原来的data中的数据了
    console.log('App.vuecreated',this.data,this.$el)
  },
  beforeMount(){
      console.log("App.vuebeforeMount()",this.data,this.$el)
  },
  mounted(){
      console.log("App.vuemounted",this.data,this.$el)
  },
  beforeUpdate(){
      console.log("App.vuebeforeUpdate",this.data,this.$el)
  },
  updated(){
      console.log("App.vueupdate",this.data,this.$el);
  },
  beforeDestroy(){
      console.log("App.vuebeforeDestory",this.data,this.$el);
  },
  destroyed(){
      console.log("App.vuedestoryed",this.data,this.$el);
  }
};
</script>
