<template >
<a-layout-content v-if="modify">
    <content-management-modify :articleContent="modifyArticle" @goToBack = "handlerGoBack"></content-management-modify>
</a-layout-content>
<a-layout-content v-else>
    <content-management-header/>
    <!--说明父组件先将数据传递给了子组件，即使在create中已经请求了  但它是异步的  导致了传递不正确
    但是赋值的时候已经更改了数据  会触发响应式，这里并没有更新-->
    <content-management-content :articles = "this.$store.state.curArticles " @modifyevent="midifyEvent"></content-management-content>
</a-layout-content>
</template>


<script>
import ContentManagementModify from './ContentManagementComponents/ContentManagementModify.vue';
import ContentManagementContent from './ContentManagementComponents/ContentManagementContent.vue';
import ContentManagementHeader from './ContentManagementComponents/ContentManagementHeader.vue';
export default {
  components:{ContentManagementContent, ContentManagementHeader, ContentManagementModify},
  data () {
    return {
        //刚刚一直不成功，但是后来为啥成功了
        allArticles: "",
        modify:false,
        modifyArticle:""
    }
  },
  methods:{
    //编辑时间传递到父组件
    midifyEvent(data){//原本向通过父组件来实现兄弟组件的通信  现在看来  这里的父子还是有必要的  下一步通过Bus来实现兄弟的通信
    //这里有对应的id的值
        alert("子组件传递父组件值成功")
        console.log("传递的值是",data)
        this.modifyArticle = data;//更改的内容 需要传递给子组件
        this.modify = true;
    },
    handlerGoBack(){//编辑过文章了重新刷新请求 子组件传递过来的事件
      this.getRequest('/articles').then(resp=>{
          if(resp){
            console.log("ContentManagement,created 有响应------------------",resp.data)
            this.$store.state.allArticles = resp.data;
            this.$store.state.curArticles = resp.data;
          }else{
            console.log('无响应')
            return false;
          }
        })

      this.modify = false;

    }
  },
   beforeCreate(){
       console.log("===========ContentManagement=================")
       console.log("============================")
       console.log("============================")
    console.log('ContentManagement,beforeCreate',this.data,this.$el)
   
  },
  created(){//实例化好了 此时已经可以读取到原来的data中的数据了
  //这里可以请求axios  来观察数据的变化  请求到数据还要传到子组件中
  //初始化请求数据
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
  },
//   beforeMount(){
//       console.log("ContentManagement,beforeMount()",this.data,this.$el)
//   },
//   mounted(){
//       console.log("ContentManagement,mounted",this.data,this.$el)
//   },
//   beforeUpdate(){
       
//       console.log("ContentManagement,beforeUpdate",this.data,this.$el)
//   },
//   updated(){
//       console.log("ContentManagement,update",this.data,this.$el);
//   },
//   beforeDestroy(){
//       console.log("ContentManagement,beforeDestory",this.data,this.$el);
//   },
//   destroyed(){
//       console.log("ContentManagement,destoryed",this.data,this.$el);
//   }
};

</script>


<style>
</style>
