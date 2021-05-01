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
  props:['sub-modify-msg','sub-create-content'],//下面进行整合发送时候用到
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
        values.createTime = new Date().toLocaleDateString()+' '+new Date().toTimeString().split(' ')[0];
        console.log('Received values of form: ', values); //这里的value是弹出框种的内容
        if(this.$props.subModifyMsg!=undefined){//说明是修改的子组件传递过来的内容
            this.content = this.$props.subModifyMsg.content;
            values.content = this.content;
            values.id = this.$props.subModifyMsg.id;
            // values.title = this.$props.subModifyMsg.title;//这里官方的表格组件会自动帮我们获取表格
            //type 选中的时候会自动赋值
            alert("确认编辑")
            console.log("~~~~~~~~~~~~~将要修改的values",values)
            // console.log("~~~~~~~subModifyMsg.content",this.$props.subModifyMsg.content)

           //修改成功了但是标题没有更改过来
              this.postRequest('/articles/updateArticle',values).then(resp=>{
              if(resp){
                console.log("有响应------------------",resp)
              }else{
                console.log('无响应')
                return false;
              }
            })
        }
        if(this.$props.subCreateContent!=undefined){//说明是发布文章的子组件传递过来的内容
            this.content = this.$props.subCreateContent;
            values.content = this.content;

            this.postRequest('/articles/addArticle',values).then(resp=>{
            if(resp){
              console.log("有响应------------------",resp)
            }else{
              console.log('无响应')
              return false;
            }
          })
        }
        
        form.resetFields();
        this.visible = false;
      });
    },
  },
   watch:{
    //在这里监听没用  因为一开始值create初始化了一次  所以应该再这里监听父组件传递过来的内容
    'content':function(obj){
        console.log('在end子组件中获取到的内容',obj)
        this.content = obj;
    },
    'subCreateContent':function(obj){//
      console.log('---',obj)
    },
    'subModifyMsg':function(obj){
      console.log("父组件中修改的内容的穿过来的值",obj)
    }
  },
  beforeCreate(){
      //  console.log("======！！！！！！！！！！！！=========")
      //  console.log("====！！！！！！！！！！！====")
      //  console.log("====！！！！！！！！！！！！1=====")
    //console.log('=======创建钱钱钱======',this.$props.subButtonName)
    //这里的测试也符合vue的生命周期
  },
  created(){//实例化好了 此时已经可以读取到原来的data中的数据了
  //这里出错的原因是因为created只会在一开始执行一次  
  //后面父组件中的内容更改后  子组件在这里得不到更新  所以导致不正确 
  //这也说明了狗子函数只会在一开始执行一些事情   
  //这么简单的问题卡了这么久
  //这里再watch中监听一下 this.$props.subCreateContent就性了
    // this.buttonName = this.$props.subModifyMsg.buttonName;
    if(this.$props.subModifyMsg!=undefined){//说明是需要修改的内容
      this.buttonName = this.$props.subModifyMsg.buttonName;
      this.titlevalue = this.$props.subModifyMsg.title;

    }
    console.log('???????????????????????????????????',this.buttonName)
    console.log('!!!!!!!!!!!!!!!wwwwwwwwwwccccccccccccccccccc',this.titlevalue)
    console.log('=======创建吼吼吼=========',this.$props)
  },
  // beforeMount(){
  //     console.log("======挂载钱钱钱============",this.$props.subButtonName)
  // },
  // mounted(){
  //     console.log("========挂载吼吼吼==============",this.$props.subButtonName)
  // },
  // beforeUpdate(){
  //     console.log("========。。更新前。。。。。==========",this.content)
  // },
  // updated(){
  //     console.log("========。。。更新后。。。。。。。==========",this.content);
  // },
  // beforeDestroy(){
  //     console.log("ContentEditbeforeDestory",this.data,this.$el);
  // },
  // destroyed(){
  //     console.log("ContentEditdestoryed",this.data,this.$el);
  // }
};
</script>