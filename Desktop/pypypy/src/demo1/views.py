from django.shortcuts import render,HttpResponse,redirect
from django.views import View
# Create your views here.
def index(request):
    title="DJ ango"
    list=[1,2,3]
    return render(request,"home.html",{"title":title,"list":list})

def login(request):
    if request.method=="GET":
        return render(request,"login.html")
    elif request.method=="POST":
        u=request.POST.get("user")
        p=request.POST.get("pwd")
        set=request.POST.get("gender")
        print("1为男，2为女,结果为:"+set)
        file=request.FILES.get("file_fa")
        print(file)
        import os
        # 设置上传文件路径
        file_path=os.path.join("upload",file.name)
        with open(file_path,mode="wb")as f:
            # chunks上传的文件所有的块
            for i in file.chunks():
                f.write(i)
            f.close()
        if u=='admin' and p=='123123':
            return redirect("/index/")
        else:
            return render(request,"login.html")
    else:
        return HttpResponse("请求出错！")

class Demo(View):
    def dispatch(self, request, *args, **kwargs):
        print("before")
        result=super(Demo,self).dispatch(request, *args, **kwargs)
        print("after")
        return result
    def get(self, request):
        print(request.method)
        return render(request,"demo.html")
    def post(self,request):
        print(request.method)
        return render(request, "demo.html")