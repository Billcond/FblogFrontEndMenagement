<template>
  <div>
    <a-button type="primary" @click="showModal">
      {{buttonName}}
    </a-button>
    <collection-create-form
      ref="collectionForm"
      :visible="visible"
      :titlevalue = "titlevalue"
      @cancel="handleCancel"
      @create="handleCreate"
    />
  </div>
</template>

<script>
const CollectionCreateForm = {
  props: ['visible',"titlevalue"],//这个props是下面关联的
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'form_in_modal' });
  },
  created(){
    //从这个this可以看出  背后prop中创立的名字  在后面也会传入
    console.log('---------------',this)
  },
  template: `
    <a-modal
      :visible="visible"
      title='Create a new collection'
      okText='Create'
      @cancel="() => { $emit('cancel') }"
      @ok="() => { $emit('create') }"
    >
      <a-form layout='vertical' :form="form">
        <a-form-item label='文章标题'>
          <a-input
            :placeholder = "titlevalue"
            v-decorator="[
              'title',
              {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              }
            ]"
            
          />
        </a-form-item>
        
        <a-form-item class='collection-create-form_last-form-item'>
          <a-radio-group
            v-decorator="[
              'type',
              {
                initialValue: 'private',
              }
            ]"
          >
              <a-radio value='JavaScript'>JavaScript</a-radio>
              <a-radio value='HTML'>HTML</a-radio>
              <a-radio value='CSS'>CSS</a-radio>
              <a-radio value='Node'>Node</a-radio>
              <a-radio value='Koa'>Koa</a-radio>
              <a-radio value='Vue'>Vue</a-radio>
              <a-radio value='React'>React</a-radio>
              <a-radio value='Ohter'>其他</a-radio>
            </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  `,
};

export default {
  components: { CollectionCreateForm },
  data() {
    return {
      visible: false,//传入创建的组件种了
      buttonName:"博文发布",
      titlevalue:"",
      content:"",
    };
  },
  props:['sub-msg'],//下面进行整合发送时候用到
  methods: {
    showModal() {
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },
    handleCreate() {
      const form = this.$refs.collectionForm.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        //console.log('=========！！！！！！！！！！！！！！！===',this.$props)
        //这里将来请求数据库等
        //这里是打印出来查看才直到是subContent  猜测是因为Porp定义的是标签-会转成驼峰规则
        values.content = this.content;
        //这里不这样  传入数据库  时间就出错了  
        values.createTime = new Date().toLocaleDateString()+' '+new Date().toTimeString().split(' ')[0];
        console.log('当前的时间',values.createTime)
        console.log('Received values of form: ', values); //这里的value是弹出框种的内容

        //axios将数据传递给数据库
        if(this.buttonName=="博文发布"){
          this.postRequest('/articles/addArticle',values).then(resp=>{
            if(resp){
              console.log("有响应------------------",resp)
            }else{
              console.log('无响应')
              return false;
            }
          })
        }
        if(this.buttonName=="确认编辑"){
          alert("确认编辑")
        }
        
        form.resetFields();
        this.visible = false;
      });
    },
  },
  beforeCreate(){
       console.log("======！！！！！！！！！！！！=========")
       console.log("====！！！！！！！！！！！====")
       console.log("====！！！！！！！！！！！！1=====")
    //console.log('=======创建钱钱钱======',this.$props.subButtonName)
    //这里的测试也符合vue的生命周期
  },
  created(){//实例化好了 此时已经可以读取到原来的data中的数据了
    // if(this.$props.subButtonName!=undefined)
    this.buttonName = this.$props.subMsg.buttonName;
    this.titlevalue = this.$props.subMsg.title;
    this.content = this.$props.subMsg.content;
    console.log('=======创建吼吼吼=========',this.$props)
  },
  beforeMount(){
      console.log("======挂载钱钱钱============",this.$props.subButtonName)
  },
  mounted(){
      console.log("========挂载吼吼吼==============",this.$props.subButtonName)
  },
  beforeUpdate(){
      console.log("========。。。。。。。。。。。。。。==========",this.$props.subButtonName)
  },
  updated(){
      console.log("========。。。。。。。。。。。。。。==========",this.$props.subButtonName);
  },
  beforeDestroy(){
      console.log("ContentEditbeforeDestory",this.data,this.$el);
  },
  destroyed(){
      console.log("ContentEditdestoryed",this.data,this.$el);
  }
};
</script>