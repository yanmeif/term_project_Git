/*购物车功能js*/
$(function() {

    //  把三个类型的input分别获取
    var $theadInput = $('table thead input[type=checkbox]'); //头部选择框
    var $tbodyInputs = $('tbody input[type=checkbox]'); //中间选择框
    var $totalPriceInput = $('.totalPrice input[type=checkbox]'); //结算选择框

    /*全选*/
    /*1.给表头绑定点击事件，获取选中状态(true/false)
    2.给表格中的数据的选择框，赋值为表头的选中状态(true/false)
    3.给计算中的全选框，，赋值为表头的选中状态(true/false) 
    */
    //表头全选
    $theadInput.change(function() {
        var checkState = $(this).prop('checked'); //获取全选框的选中状态
        $tbodyInputs.prop('checked', checkState); //把状态给表格的选择框
        $totalPriceInput.prop('checked', checkState); //把状态给全选中的选择框

        allTotal(); //总计
    });
    /*
    计算总价的全选:
    1.给计算总价的全选按钮绑定点击事件，获取选中状态(true/false)
    2.把状态给表头的选择框
    3.把状态给表格的选择框
    */
    $totalPriceInput.change(function() {
            var checkState = $(this).prop('checked'); //获取全选状态
            $theadInput.prop('checked', checkState); //把状态给表格的选择框
            $tbodyInputs.prop('checked', checkState); //把状态给表头的选择框
            allTotal(); //总计
        })
        /*
        反选功能：
        1、给表格中的选择框绑定点击事件
               定一个标杆
        2、循环表格中的选择框
        3、获取每一个选择框的选中状态
          判断：如果有一个是false,则不是全选，
          4.把falg的值赋值给两个全选框
        */
    $tbodyInputs.change(function() {
            var flag = true;
            $tbodyInputs.each(function(index, input) {
                var checkState = $(this).prop('checked');
                if (checkState == false) {
                    flag = false;
                }
            })
            $theadInput.prop('checked', flag);
            $totalPriceInput.prop('checked', flag);
            allTotal(); //总计
        })
        /*加法功能：
        1、获取加法按钮，绑定点击事件，
        2、点击之后获取后面input值
        3、输入框的值自增
        4、把自增后的值，重新赋值给输入框
        */
    $('.add').click(function() { //绑定事件
            var count = parseInt($(this).next().val()); //获取输入框值
            count++; //自增
            $(this).next().val(count); //重新赋值给输入框
            //小计
            subTotal($(this), count);
            allTotal(); //总计
        })
        /*减法功能：
            1、获取减法按钮，绑定点击事件，
            2、点击之后获取前面input值
            3、输入框的值自减，边界判断，如果小于1，那么等于1，否则等于自己
            4、把减少后的值，重新赋值给输入框
            */
    $('.reduce').click(function() { //绑定事件
            var count = parseInt($(this).prev().val()); //获取输入框值
            count--; //自减
            count = count < 1 ? 1 : count;
            $(this).prev().val(count); //重新赋值给输入框
            //小计
            subTotal($(this), count);
            allTotal(); //总计
        })
        /*封装一个小计函数
         */
    function subTotal(dom, count) {
        /*找单价*/
        var singlePrice = parseFloat(dom.closest('tr').find('.price').text()); //找单价

        var subTotalPrice = singlePrice * count; //单价*数量=小计
        dom.closest('tr').find('.subprice').text(subTotalPrice.toFixed(2))
    }
    /*
    总计：（头部全选、计算总价全选、表格的选择框、+ 、-  、删除）
       定义一个变量，用于保存总价
       定义一个变量，用于保存商品的数量
    1、获取所有表格中的选择框，循环，获取选中状态判断
    2、如果选中，那么累加这一行的小计
    */
    function allTotal() {
        var allPrice = 0; //定义一个变量，用于保存总价
        var selectedCount = 0; //定义一个变量，用于保存商品的数量
        $('tbody input[type=checkbox]').each(function() {
                //获取表格中的选中框，循环
                var checkState = $(this).prop('checked');
                if (checkState) {
                    allPrice += parseFloat($(this).closest('tr').find('.subprice').text());
                    selectedCount++;
                }
            })
            //渲染
        $('.total').text(allPrice.toFixed(2)); //渲染总价
        $('.count').text(selectedCount); //渲染数量
    }
    //删除
    $('.del').click(function() {
        //删除整行
        $(this).closest('tr').remove();
        getGoodsCount(); //重新计算商品数量
        allTotal(); //计算总价
    })

    //删除选中商品
    $('.deleteChecked').click(function() {
            //循环选中框，如果选中，则删除(一行)
            $('tbody input[type=checkbox]').each(function() {
                var checkState = $(this).prop('checked');
                if (checkState) {
                    $(this).closest('tr').remove();
                }
            })
            getGoodsCount(); //重新计算商品数量
            allTotal(); //计算总价
        })
        //封装一个获取全部商品的函数
    function getGoodsCount() {
        //获取数量
        var goodsCount = $('table tbody tr').length;
        //渲染
        $('.goodsCount').text(goodsCount);
    }
    getGoodsCount(); //页面加载调用一次
})