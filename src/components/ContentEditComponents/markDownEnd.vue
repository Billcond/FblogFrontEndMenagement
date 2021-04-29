<template>
  <div>
    <a-button type="primary" @click="showModal">
      发布文章
    </a-button>
    <collection-create-form
      ref="collectionForm"
      :visible="visible"
      @cancel="handleCancel"
      @create="handleCreate"
    />
  </div>
</template>

<script>
const CollectionCreateForm = {
  props: ['visible'],
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'form_in_modal' });
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
      visible: false,
    };
  },
  props:['sub-content'],
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
        //这里将来请求数据库等
        values.content = this.$props.subContent;
        values.creteTime = new Date();
        console.log('Received values of form: ', values);

        //axios将数据传递给数据库
        this.postRequest('/test',values).then(resp=>{
          if(resp){
            console.log("有响应------------------",resp)
          }else{
            console.log('无响应')
            return false;
          }
        })
        form.resetFields();
        this.visible = false;
      });
    },
  },
};
</script>