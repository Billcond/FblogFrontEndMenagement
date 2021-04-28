<template>
    <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        文章管理
    <div class="components-container">
        <div class="editor-container">
            <!--
                height 绑定了子组件prop中的值
                v-model的值自动绑定了额  子组件中的values
                id  会传到子模版中的id
            -->
            <markdownEditor id="a" ref="contentEditor" 
            v-model="content" 
            autofocus="true"
            height="300"
            zIndex="20"
            placeholder="请输入内容"
            toolbar:
            >
            </markdownEditor>
        </div>
        <!-- <button @click="markdown2Html">To HTML</button>
        <div v-html="html"></div> -->
    </div>
    </a-layout-content>
</template>

<script>
// import 'simplemde/dist/simplemde.min.css'
// 引入组件
//在vue 中  组件时 MarkdownEdit   
//组件时 markdownEdit 
//都可以写成 markdown-edit
import markdownEditor from '../components/markDown'
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
  components: { markdownEditor },
  data () {
    return {
      content: content,
      html: ''
    }
  },

};
</script>


<style>

</style>
