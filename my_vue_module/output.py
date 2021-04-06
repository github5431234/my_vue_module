import os
import stat
import shutil
class output:
    def __init__(self,load_path=None,save_name=None,add_readme_bool=True):
        """
        html_path:需要处理的html
        save_name:需要保存的名字
        add_readme_bool:是否添加readme
        """
        self.load_path=load_path#html路径
        self.save_name=save_name
        self.add_readme_bool=add_readme_bool
    def get_name(self,load_path=None):
        try:
            if load_path:info=self._read_file(load_path)
            else:info=self._read_file(self.load_path)
            info=str(info)
            set_default={'','rp', 'ol', 'h1', 'header', 'footer', 'svg', 'font', 'br', 'input', 'wbr', 'center', 'area', 'dd', 'legend', 'nav', 'data', 'mark', 'command', 'acronym', 'menuitem', 'aside', 'kbd', 'em', 'track', 'dl', 'b', 'bdo', 'applet', 'optgroup', 'code', 'template', 'big', 'q', 'textarea', 'basefont', 'tbody', 'p', 'sup', 'span', 'a', 'button', 'map', 'table', 'script', 'option', 'dir', 'dt', 'li', 'hr', 'address', 'div', 'meta', 'img', 'form', 'html', 'menu', 'time', 'keygen', 'i', 'video', 'progress', 'col', 'abbr', 'cite', 'section', 'tr', 'canvas', 'ins', 'iframe', 'select', 'strike', 's', 'source', 'head', 'figure', 'rt', 'base', 'details', 'blockquote', 'var', 'output', 'thead', '!DOCTYPE', 'bdi', 'ul', 'dfn', 'style', 'tfoot', 'label', 'ruby', 'td', 'colgroup', 'noframes', 'small', 'caption', 'figcaption', 'frame', 'title', 'article', 'frameset', 'isindex', 'th', 'embed', 'main', 'summary', 'pre', 'body', 'audio', 'samp', 'tt', 'noscript', 'del', 'object', 'fieldset', 'dialog', 'strong', 'link', 'datalist', 'param', 'sub', 'meter', 'u'}
            res=set()
            flag=0
            mid=""
            for i in info:
                if flag==0:
                    if i=="<":flag=1;mid=""
                else:
                    if i!=" " and i!=">" and i!="/":mid+=i
                    else:
                        flag=0
                        if mid not in set_default:res.add(mid)
            return res
        except Exception as e:
            print(e)
            return set()
    def __get_module_name(self):
        set_res=self.get_name()
        return set_res
    def _read_file(self,path):
        try:
            with open(path,"rb") as f:
                return f.read()
        except Exception as e:print(e);return ""
    def _delete_dir(self,dir_path):
        if os.path.exists(dir_path):
            for fileList in os.walk(dir_path):
                for name in fileList[2]:
                    os.chmod(os.path.join(fileList[0],name), stat.S_IWRITE)
                    os.remove(os.path.join(fileList[0],name))
            shutil.rmtree(dir_path)
            return "delete ok"
        else:
            return "no filepath"
    def to_html_css_js(self,is_demo=True):
        set_res=self.__get_module_name()
        print("使用组件:",set_res)
        save_dir=os.path.join("output",self.save_name)
        #删除文件夹
        self._delete_dir(save_dir)
        #创建文件夹
        os.mkdir(save_dir)
        #创建static文件夹
        static_path=os.path.join(save_dir,"static")
        os.mkdir(static_path)
        myjs=os.path.join(static_path,"my1.0.js")
        vuejs=os.path.join(static_path,"vue2.6.12.js")
        with open(os.path.join(static_path,"my1.0.js"),"wb") as f1:
            data=self._read_file(os.path.join("static","my1.0.js"))
            f1.write(data)
        with open(os.path.join(static_path,"vue2.6.12.js"),"wb") as f2:
            data=self._read_file(os.path.join("static","vue2.6.12.js"))
            f2.write(data)
        f1=open(os.path.join(static_path,"main.js"),"wb")
        f2=open(os.path.join(static_path,"main.css"),"wb")
        f3=open(os.path.join(save_dir,"main.html"),"wb")
        for module_name in set_res:
            module_dir=os.path.join("module",module_name)
            print("当前处理:",module_dir)
            module_css=os.path.join(module_dir,"public.css")
            module_readme=os.path.join(module_dir,"readme.js")
            module_main=os.path.join(module_dir,"main.js")
            f1.write(self._read_file(module_main))
            f1.write(b'\n')
            f1.write(self._read_file(module_readme))
            f2.write(self._read_file(module_css))
        html_info=self._read_file(self.load_path)
        static=bytes("""
<script src="%sstatic/vue2.6.12.js"></script>
<script src="%sstatic/my1.0.js"></script>
<script src="%sstatic/main.js"></script>
<link rel="stylesheet" type="text/css" href="%sstatic/main.css">
"""%tuple(""if is_demo else "/" for i in range(4)),encoding="utf-8")
        try:
            head_index=html_info.index(b"</head>")
            html_info=html_info[:head_index]+static+html_info[head_index:]
        except:
            try:
                body_index=html_info.index(b"</body>")
                html_info=b"<head>"+static+b"</head>"+html_info
            except:
                html_info=b"<head>"+static+b"</head><body>"+html_info+b"</body>"
        f3.write(html_info)
        f1.close()
        f2.close()
        f3.close()
        print("处理完成,保存在:",save_dir)

if __name__ == '__main__':
    o=output("client.html","demo",add_readme_bool=True)
    o.to_html_css_js(is_demo=True)#is_demo == True表示生成静态文件前缀加/