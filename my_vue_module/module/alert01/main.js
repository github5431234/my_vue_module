Vue.component('alert01', {
  // 声明 props
  props: {
    button1_class: {default: ""},
    button1_name: {default: "显示"},
    button2_url:{default:"/"},
    input_value:{default:""},
    input_name:{default:"input01"},
    input_key_values_func:{default:null},
    is_active: {default: false},
    null_or_block: {default: false},
    title: {default: "标题"},
    title_introduce: { default: "这是一个弹窗模板"},
    input01: {default: "请输入内容"},
    enter: {default: "确认"},
          }
  ,
  // 就像 data 一样，prop 也可以在模板中使用
  // 同样也可以在 vm 实例中通过 this.message 来使用
  template: `
  <div module_name="alert01">
    <a v-bind:class="['alert01_button_class',button1_class]" href="javascript:void(0);" @click="show()">{{button1_name}}</a>
    <div v-if="null_or_block" class="alert01_bg" @click="show()">
      <div @click="stopPogation" :class="['alert01_body',{'alert01_is_active':is_active}]">
        <div class="alert01_head">
          <div @click="show()" class="alert01_close">×</div>
          <div class="alert01_title">{{title}}</div>
          <div class="alert01_title_introduce">{{title_introduce}}</div>
        </div>
        <div class="alert01_body2">
          <input class="alert01_input" :placeholder="input01" v-model="input_value">
          <div class="alert01_enter" @click="send_post">{{enter}}</div>
        </div>
      </div>
    </div>
    </div></div>
  `,
          methods:{
            result_func(data){alert(data)},
            show(){this.null_or_block=this.is_active=!this.null_or_block;},
            stopPogation(e){ //阻止事件冒泡，点击白色区域不会关闭弹窗
            e.stopPropagation();},
            send_post(){
              send_infos=[]
              data={}
              data[this.input_name]=this.input_value
              send_infos.push(data)
              try{send_infos.push(this.input_key_values_func())}catch(error){}
              success_funcs=[]
              success_funcs.push(this.result_func)
              post(send_infos,success_funcs,this.button2_url);
              this.show();
            }
          }
  })