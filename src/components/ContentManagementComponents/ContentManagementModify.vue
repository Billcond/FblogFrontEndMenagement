<template>
    <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '80vh' }"
      >

       
        <!--
                这个组件中是编辑的内容
                height 绑定了子组件prop中的值
                v-model的值自动绑定了额  子组件中的values
                id  会传到子模版中的id
                下面是这个组件
                子组件中定义了相关的props  在这里通过data中的数据设置它
            -->
            <markdownEditor id="a" ref="contentEditor" 
            v-model="content"
            :autofocus="editautufocus"
            :height="editHeight"
            placeholder="请输入内容"
            toolbar:
            >
            </markdownEditor>

        
        <!-- <button @click="markdown2Html">To HTML</button>
        <div v-html="html"></div> -->
         <markDownEnd :sub-modify-msg="re"></markDownEnd>
  </a-layout-content>
</template>

<script>
// import 'simplemde/dist/simplemde.min.css'
// 引入组件
//在vue 中  组件时 MarkdownEdit   
//组件时 markdownEdit 
//都可以写成 markdown-edit
import markdownEditor from '.././ContentEditComponents/markDown'
import markDownEnd from ".././ContentEditComponents/markDownEnd"
var content = `
**this is test**
* vue
* element
1. markdown
2. editor
## Simplemde
[link](https://www.baidu.com) 
![图片](https://i.imgur.com/sZlktY7.png)
`
export default {
  components: { markdownEditor,markDownEnd},
  props:['articleContent'],
  data () {
    return {
      editHeight:90,
      editZIndex:20,
      editautufocus:false,
      type:"",
      html: '',
      content:content,//因为上面的模板是这样的 所以 这里要有
      re:{
        content: content,
        title:"第一个标题",
        buttonName:"确认编辑",
      }
    }
  },
//      beforeCreate(){
//        console.log("==============ContentEdit==============")
//        console.log("============================")
//        console.log("============================")
//     console.log('beforeCreate',this.data,this.$el)
//   },
  created(){//实例化好了 此时已经可以读取到原来的data中的数据了
    console.log('========嘿嘿===========',this.$props.articleContent)
    
    this.content = this.$props.articleContent.content;
    this.re.content = this.content;
    this.re.title = this.$props.articleContent.title;//获取到title
    this.re.buttonName = "确认编辑"
  },
//   beforeMount(){
//       console.log("ContentEditbeforeMount()",this.data,this.$el)
//   },
//   mounted(){
//       console.log("ContentEditmounted",this.data,this.$el)
//   },
//   beforeUpdate(){
//       console.log("ContentEditbeforeUpdate",this.data,this.$el)
//   },
//   updated(){
//       console.log("ContentEditupdate",this.data,this.$el);
//   },
//   beforeDestroy(){
//       console.log("ContentEditbeforeDestory",this.data,this.$el);
//   },
//   destroyed(){
//       console.log("ContentEditdestoryed",this.data,this.$el);
//   }

};
</script>


<style>

</style>
