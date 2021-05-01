<template>
  <a-table :columns="columns" :data-source="data">
    <!--标签-->
    <span slot="tags" slot-scope="tags">
      <a-tag
        v-for="tag in tags"
        :key="tag"
        :color="'green'"
      >
        {{ tag.toUpperCase() }}
      </a-tag>
    </span>
    <span slot="action" slot-scope="text, record">
      <a @click = "clickModify(text,record)">编辑</a>
      <a-divider type="vertical" />
      <a  @click = "clickDelete(text,record)">删除</a>
    </span>
  </a-table>
</template>
<script>
const columns = [
  {
    title:"文章标题",
    dataIndex: 'title',
    key: 'name',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' },
    width:150,
    ellipsis:true
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'age',
    ellipsis:true
  },
  {
    title: '文章内容',
    dataIndex: 'content',
    key: 'address',//这里key变不变没关系  上面的dataIndex  关联了下面对应的数据
    ellipsis:true,
    width:200
  },
  {
    title: '文章种类',
    key: 'tags',
    dataIndex: 'tags', //
    scopedSlots: { customRender: 'tags' },
    ellipsis:true
  },
  {
    title: '阅读喜欢比',
    key: 'action1',
    dataIndex: 'count',
    ellipsis:true
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' },
    width:150,
    ellipsis:true
  },
];

const data = [
  {
    key: '1',
    title: 'John Brown',
    createTime: 32,
    content: 'enasdfwqr',
    tags: ['javascript'],
    count:'454/3'
  },
  {
    key: '2',
    title: 'Jim Green',
    createTime: 42,
    content: 'gfjkgoeqtq',
    tags: ['css'],
    count:'454/4'
  },
  {
    key: '3',
    title: 'Joe Black',
    createTime: 32,
    content: 'Sdddd',
    tags: ['node'],
    count:'454/5'
  },
];

export default {
  name:"ContentManagementContent",
  props:["articles"],
  data() {
    return {
      data,
      columns,
    };
  },
  methods:{
      clickDelete(text,scope){//text scope 都是点击传回来的内容  将来在这里和数据库请求删除的连接
          console.log('deleteDelete',text)
          let deleteMessage={deleteMsg:text.title}
          this.postRequest('/articles/delete',deleteMessage).then(resp=>{
          if(resp){
            console.log("有响应------------------",resp)
          }else{
            console.log('无响应')
            return false;
          }
          })
          //这里避免重新刷新数据库 这里直接将原来的数据进行删改
          for(let i = 0;i<this.data.length;i++){
            if(text===this.data[i]){
              this.data.splice(i,1);
              break;
            }else{
              alert('未知出错')
            }
          }
      },
      clickModify(text,scope){
        alert("编辑")
        this.$emit('modifyevent',text)
        
      }
  },
  watch:{
    //异步获取数据后读取
    'articles':function(obj){
          this.data = [];
        //拿到之后更改模板的值
        let index = 1;
        for(let o of obj){
          let temp = {};
          temp.key = index++;
          temp.title = o.title;
          temp.createTime = o.createtime;
          temp.content = o.context;
          temp.count = o.seecount+'/'+o.likes;
          temp.tags = [o.type]
          this.data.push(temp)
        }
    }
  },
  beforeCreate(){
      console.log('ContentManagementContent,beforeCreate',this.data,this.$el)
      //console.log("ContentManagementContent,beforecreated父组件传递过东西来了嘛!!!!==============",this.$props.articles) 报错了
  },
  created(){//实例化好了 此时已经可以读取到原来的data中的数据了
    console.log('ContentManagementContent,created',this.data,this.$el)
    console.log("ContentManagementContent,created父组件传递过东西来了嘛!!!!==============",this.$props.articles);

  },
  // beforeMount(){
  //     console.log("ContentManagementContent,beforeMount()",this.data,this.$el)
  //     console.log("ContentManagementContent,beforeMount父组件传递过东西来了嘛!!!!==============",this.$props.articles)
  // },
  // mounted(){
  //     console.log("ContentManagementContent,mounted",this.data,this.$el)
  //           console.log("ContentManagementContent,mounted父组件传递过东西来了嘛!!!!==============",this.$props.articles)
  // },
  // beforeUpdate(){
  //     console.log("ContentManagementContent,beforeUpdate",this.data,this.$el)
  // },
  // updated(){
  //     console.log("ContentManagementContent,update",this.data,this.$el);

  // },
  // beforeDestroy(){
  //     console.log("ContentManagementContent,beforeDestory",this.data,this.$el);
  // },
  // destroyed(){
  //     console.log("ContentManagementContent,destoryed",this.data,this.$el);
  // }
};
</script>