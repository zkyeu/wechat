var host = 'http://';

if(!request_host){
    host += 'www.51talk.com';
}else{
    host += request_host;
}

//刷新页面客户端调用
function class_notify(obj){
    $.ajax({
        url: host + '/Ac/Log/AcWebFreshLog',
        data: {
            relId: relId,
            jsonData: obj
        },
        dataType:'json',
        success: function(rs){
            if(rs.code==1){
                var newObj = JSON.parse(obj);
                var type = newObj.uType;
                switch(type){
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 8:
                    case 9:
                    case 1002:
                    case 1004:
                        reload();
                        break;
                    case 1003:
                        if(newObj.strOther==2){
                            reload();
                        }
                        break;
                }
            }
        }
    })
}
//刷新页面
function reload(){
    location.reload();
}

//公共接口
function comm_type_get(fnName,data){
    var newFn = eval(fnName);
    if(typeof newFn =='function'){
        newFn(data);
    }
}