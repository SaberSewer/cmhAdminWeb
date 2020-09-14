var table

var defalutShow = "                                                <fieldset class=\"layui-elem-field\">\n" +
    "                                                    <legend>提成方式</legend>\n" +
    "                                                    <div class=\"layui-field-box\">\n" +
    "                                                        <div class=\"row\" style=\"text-align: center;line-height: 30px\">\n" +
    "                                                            <input type=\"button\" class=\"layui-btn layui-btn-disabled\"\n" +
    "                                                                   value=\"针灸（排钟）0.15\"> <span\n" +
    "                                                                style=\"font-size: 15px\">+</span>\n" +
    "                                                            <input type=\"button\" class=\"layui-btn layui-btn-disabled\"\n" +
    "                                                                   value=\"针灸（点钟）0.15\">\n" +
    "                                                        </div>\n" +
    "                                                    </div>\n" +
    "                                                </fieldset>\n" +
    "                                                <fieldset class=\"layui-elem-field layui-field-title\">\n" +
    "                                                    <legend>操作</legend>\n" +
    "                                                    <div class=\"layui-field-box\" style=\"float: right\">\n" +
    "                                                        <input type=\"button\" class=\"layui-btn layui-btn-primary\" onclick=\"modify()\"\n" +
    "                                                               value=\"修改\">\n" +
    "                                                        <input type=\"button\" class=\"layui-btn layui-btn-danger\" id=\"delete\"\n" +
    "                                                               value=\"删除\">\n" +
    "                                                    </div>\n" +
    "                                                </fieldset>\n"
layui.use(["table", "element", "layer"], function () {
    table = layui.table
    var element = layui.element;
    var layer = layui.layer
    //编写数组的删除方法
    Array.prototype.remove = function (idx) {
        this.splice(idx, 1)
    }

    let menuList = []

    element.on('nav(employeeList)', function (data) {

        var name = $(data).attr("lay-data");
        let md5Name = md5(name)
        console.log(menuList.indexOf(md5Name))
        if (menuList.indexOf(md5Name) < 0) {
            element.tabAdd("demo", {
                title: name,
                id: md5Name,
                content: defalutShow
            })
            menuList.push(md5Name)
        }
        element.tabChange("demo", md5Name)
    });
    /*table.render({})*/

    //点击
    element.on("tab(demo)", function (data) {
        $($(".layui-tan-item")[data.index]).addClass("layui-show")
        element.render("tab(demo)")
    })

    //删除
    element.on('tabDelete(demo)', function (data) {
        menuList.remove(data.index)
    });

    table.on('tool(test)', function (obj) {
        //修改
        if (layEvent == "modify") {
            xadmin.open("修改", "commission-add.html", 400, 300, false)
        } else if (layEvent == "delete") {
            layer.confirm('真的删除行么', function (index) {
                obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                layer.close(index);
                //向服务端发送删除指令
            });
        }
    })


})

function add() {
    xadmin.open("添加", "commission-add.html", 800, 600, false)
}

function modify() {
    xadmin.open("修改", "commission-modify.html", 800, 600, false)
}

function paySuccess() {
    layui.use("layer", function () {
        let layer = layui.layer

        layer.open({
            type: 0,
            title: "支付结果",
            content: $("#paySuccess").html(),
            resize:false
        })
    })
}

function search() {
    table.reload("test", {

        where: {},
        page: {
            curr: 1
        }
    })
}

function showContent() {
    var defaultLine = [{ //模拟数据
        "projectName": "针灸",
        "mode": "点钟",
        "percent": "10%",
        "id": 1
    }, {
        "projectName": "针灸",
        "mode": "点钟",
        "percent": "10%",
        "id": 2
    }, {
        "projectName": "针灸",
        "mode": "点钟",
        "percent": "10%",
        "id": 3
    }]

}


