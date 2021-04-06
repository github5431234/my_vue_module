function head01_enter_add_DeepClone (obj) {
	if (obj === null || typeof obj !== 'object') return obj;
	var cpObj = obj instanceof Array ? [] : {};
	for (var key in obj) cpObj[key] = DeepClone(obj[key]);
	return cpObj;
}
  function head01_enter_add(item_self,key,key_,item,bool_){
    let count_=Object.getOwnPropertyNames(enter).length+1;
    enter[count_]={'onfunc':item_self.onfunc};
        console.log("set item onfunc",item_self.onfunc)
    if (bool_){
      Object.defineProperty(item_self,key,
        {
            get:()=>{},
            set:(data)=>{item_self[key_]=data;enter[count_]['key']="Ctrl+"+data;console.log("???")},
            enumerable:true
        });
    }else{
    Object.defineProperty(item_self,key,
        {
            get:()=>{},
            set:(data)=>{item_self[key_]=enter[count_]['key']=data;},
            enumerable:true
        });}
    Object.defineProperty(item_self,"onfunc",
        {
            get:()=>{},
            set:(data)=>{
              enter[count_]["onfunc"]=data;
              item_self['onfunc_']=data;
          },
            enumerable:true
        });
        item_self[key]=item_self.key_;
        item_self['onfunc_']=item_self.onfunc;
        // console.log("set item onfunc",item_self.onfunc)
}
Vue.component('head01', {
// 声明 props
props: {
  head_info:{default:[]
},
  sys_name:{default:"后台管理系统"},
  sys_logo_src:{default:""},
  login_name:{default:"请登录"}
},
// 就像 data 一样，prop 也可以在模板中使用
// 同样也可以在 vm 实例中通过 this.message 来使用
template: `
<div module_name="head01" class="head01_bg">
  <div class="head01_left">
    <div v-for="(item,index) in head_info" >
      <img :src="item.logo_src">
      <div :key="index" class="head01_menu1" @click="item.self.onfunc_()" @mousemove.prevent="item.self.show($event)" @mouseleave="item.self.over()"><span>{{item.self.name}}(</span><span>{{item.self.key_}})</span></div>
      <div class="head01_menu2 head01_border_bottom_end" v-if='item.self.null_or_block' v-bind:style="{ left: item.self.x+'px',top: item.self.y + 'px' }" @mousemove.prevent="item.self.show()" @mouseleave="item.self.over()">
      <div v-for="item2_ in item.child_node" class="head01_border_bottom">
        <div v-for="item2 in item2_">
          <div class="head01_menu2_name" @click="item2.self.onfunc_()"><div class="head01_menux_name">{{item2.self.name}}</div><div class="head01_menux_onfunc">{{item2.self.key_}}</div></div>
          <div v-for="item3_ in item2.child_node"  v-if="item2.self.null_or_block">
            <div v-for="item3 in item3_">
              <div  v-if="item3.self.null_or_block"><div>{{item3.self.name}}</div><div>{{item3.self.key_}}</div></div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
  <div class="head01_center">
    <div>{{sys_name}}</div>
    <img :src="sys_logo_src">
  </div>
  <div class="head01_right">
    <div>
      {{login_name}}
    </div>
  </div>
</div>
  `,mounted(){
    this.init(this)
    }
  ,
        methods:{
          init(that){for(item_index in that.head_info){
            let index_=item_index;
      that.head_info[index_].self['null_or_block']="false";
      that.head_info[index_].self['show']=function(event){
        if (event==undefined){
                that.head_info[index_].self.null_or_block=true}
        else{
        oRect   = event.currentTarget .getBoundingClientRect();   
        x=oRect.left   
        y=oRect.top
        // console.log(x,y)
        if (that.head_info[index_].self.click_flag==true){
                that.head_info[index_].self.null_or_block=true
                // event.currentTarget.style['left']=x;
                // event.currentTarget.style['top']=y+48;
                that.head_info[index_].self.x=x;
                that.head_info[index_].self.y=y+21.5;

      }}
      };
      that.head_info[index_].self['over']=function(){
        // console.log("mouse out")
        that.head_info[index_].self.null_or_block=false
      }
      that.head_info[index_].self['onfunc']=function(){};
      head01_enter_add(that.head_info[index_].self,"key","key_",that.head_info[index_],true)
      that.head_info[index_].self['onfunc']=function(){
        that.head_info[index_].self['show']();
      };
      that.head_info[index_].self['over']();
      // 1级菜单完毕，开始2级菜单
      if(that.head_info[index_].child_node!=undefined){
      for (index2_ in that.head_info[index_].child_node){
        let item2__index=index2_;
        var item2_=that.head_info[index_].child_node[item2__index];
        if(item2_!=[]){
          // console.log("item2 is ",item2_)
          for(item2___ in item2_){
            let item2_index=item2___;
            item2=item2_[item2_index];
            // console.log(item2)
              item2.self['null_or_block']=false;
              item2.self['show']=function(){
              if (item2.self.click_flag!=false){
              item2.self['null_or_block']=true}
            };
            item2.self['over']=function(){
              item2.self['null_or_block']=false
            }
            console.log("that.head_info["+index_+"]['child_node']["+item2__index+"]["+item2_index+"]['self']['onfunc']")
            that.head_info[index_]['child_node'][item2__index][item2_index]['self']['onfunc']=function(){};
            console.log(that.head_info[index_]['child_node'][item2__index][item2_index]['self']['onfunc'])
            // console.log('item2.self is:',item2.self)this.head_info[0]['child_node'][0][0]['self']['onfunc']
            head01_enter_add(that.head_info[index_]['child_node'][item2__index][item2_index]['self'],"key","key_",item2,false);
            that.head_info[index_]['child_node'][item2__index][item2_index]['self']['onfunc']=function(){
                    if(item2.self.func!=null && item2.self.click_flag!=false){item2.self.func()}
                  };
                  item2.self['over']();
      // 2级菜单完毕，开始3级菜单
                if(item2.child_node!=undefined){
                  for (item3___1 in item2.child_node){
                    let item3__index=item3___1;
                    var item3_=item2.child_node[item3__index];
                    if(item3_!=[]){
                      for(item3_index in item3_){
                        item3=item3_[item3_index];
                        console.log("name:",item3.self.name)
                          item3.self['null_or_block']=false;
                        item3.self['show']=function(){
                          if (item3.self.click_flag!=false){
                          item3.self['null_or_block']=true}
                        };
                        item3.self['over']=function(){
                          item3.self['null_or_block']=false
                        }
                        item3['onfunc']=function(){};
                        head01_enter_add(item3.self,"key","key_",item3,false)
                        item3['onfunc']=function(){
                          if(item3.self.func!=null && item3.self.click_flag!=false){item3.self.func()}
                        };
                        item3.self['over']();
                        
                  }}
                }
                }
                }
      }}
    }
    
                };
            }
        }
})
