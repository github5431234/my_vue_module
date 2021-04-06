# my_vue_module
```
这是手写的vue组件库，使用python,vue.js以及自己的my.js(目前就100行左右吧..)
```
# 生成方式
```
通过调用output.py来生成static、css和js:
if __name__ == '__main__':
    o=output("client.html","demo",add_readme_bool=True)
    o.to_html_css_js(is_demo=True)#is_demo == True表示生成静态文件前缀加/
会根据使用的组件，来生成js和css,生成的文件夹在output文件夹下面
输出信息(类似):
  PS C:\Users\12751\Desktop\my_vue_module> python output.py
  使用组件: {'head01'}
  当前处理: module\head01
  处理完成,保存在: output\demo
```


