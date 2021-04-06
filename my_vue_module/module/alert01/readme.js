readme['alert01']= `
### props ###
button1_class: 按钮1的css类 default:""
button1_name: 按钮1上显示的名称 default: "显示"
button2_url:按钮2按下后发送的url default:"/"
input_value:输入框双向绑定的变量 default:""
input_name:输入框输入内容将会作为key value作为post传参，这里设置key default:"input01"
input_key_values_func:提供父组件添加post传参对象，可以为null default:null
is_active: 用于控制弹窗动画css的开关 default: false
none_or_block: 用于控制弹窗显示与隐藏 default: false
title: 弹窗框的标题 default: "标题"
title_introduce: 弹窗的介绍 default: "这是一个弹窗模板"
input01: input的默认显示字符串 default: "请输入内容"
enter: 确认按钮的显示字符 default: "确认"
### method ###
result_func: post成功后执行的方法1 default:result_func(data){alert(data)},
show: 用于控制弹窗显示以及css动画的函数 default:show(){this.none_or_block=this.is_active=!this.none_or_block;},stopPogation(e){ //阻止事件冒泡，点击白色区域不会关闭弹窗e.stopPropagation();},
send_post: 按钮2按下 发送请求 default:send_post(){
            send_infos=[]
            data={}
            data[this.input_name]=this.input_value
            send_infos.push(data)
            send_infos.push(this.input_key_values_func())
            success_funcs=[]
            success_funcs.push(this.result_func)
            post(send_infos,success_funcs,this.button2_url);
            this.show();
`;