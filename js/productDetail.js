/*产品详情核心js*/
$(function() {
    //调用函数插件
    magnifier({
            magnifier: "#magnifier1", //最外层的大容器
            width: 340, //承载容器宽
            height: 470, //承载容器高
            zoom: 5 //缩放比例
        })
        //添加购物车数量
    var spinner = $("#spinner").spinner();
    $("#disable").on("click", function() {
        if (spinner.spinner("option", "disabled")) {
            spinner.spinner("enable");
        } else {
            spinner.spinner("disable");
            spinner = spinner < 1 ? 1 : spinner //如果小于1，就等于1，否则就等于自己
        }
    })
})