<template>
    <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '60vh' }"
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
         <markDownEnd :sub-content="content"></markDownEnd>
    </a-layout-content>
</template>

<script>
// import 'simplemde/dist/simplemde.min.css'
// 引入组件
//在vue 中  组件时 MarkdownEdit   
//组件时 markdownEdit 
//都可以写成 markdown-edit
import markdownEditor from './ContentEditComponents/markDown'
import markDownEnd from "./ContentEditComponents/markDownEnd"
const content = `
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
  data () {
    return {
      content: content,
      editHeight:90,
      editZIndex:20,
      editautufocus:false,
      title:"第一个标题",
      html: '',
    }
  },

};
</script>


<style>

</style>
