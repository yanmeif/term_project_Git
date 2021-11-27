/*购物车交互js文件*/
$(function() {
    //1.全选
    /*1.点击表头全选框 获取表头全选框的选中状态
    2.表格中的单选状态需要一致
    3.结算中的全选状态一致
    */
    //  定义三个变量
    var $theadInput = $('table thead input[type=checkbox]'); //头部选择框
    var $bodyInput = $('table tbody input[type=checkbox]'); //中间选择框
    var $allPriceInput = $('.totalPrice input[type=checkbox]'); //结算选择框
    $theadInput.change(function() {
            //获取选中状态
            var state = $(this).prop('checked');
            //让表格中的选择框状态保持一致
            $bodyInput.prop('checked', state);
            $allPriceInput.prop('checked', state);
        })
        //结算中的选择状态
    $allPriceInput.change(function() {
            //获取选中状态
            var state = $(this).prop('checked');
            //让表格中的选择框状态保持一致
            $theadInput.prop('checked', state);
            $bodyInput.prop('checked', state);
        })
        //取消全选
    $bodyInput.change(function() {
            //定一个标杆
            var flag = true;
            //总价
            var totalPrice = 0;
            //循环表格中所有选择框的选中状态
            $bodyInput.each(function(i, input) {
                    if (!$(input).prop('checked')) { //只要有一个选择框没有选中，那么状态变为false；
                        flag = false;
                    } else {
                        totalPrice += parseFloat($(this).closest('tr').find('.subprice').text());
                    }
                })
                //把状态用来改变全选框
            $theadInput.prop('checked', flag)
            $allPriceInput.prop('checked', flag)
                //渲染到总价的位置
            $('.total').text(totalPrice.toFixed(2))
        })
        //数量的加减功能
        //加
    $('.add').on('click', function() {
            //下一个节点
            var $nextInput = $(this).next();
            //获取输入框的值
            var oldVal = parseInt($nextInput.val());
            //自增
            oldVal++;
            //重新赋值给输入框
            $nextInput.val(oldVal)

            //小计
            subTotalPrice(oldVal, $(this))
        })
        //减
    $('.reduce').on('click', function() {
            //上一个节点
            var $prevInput = $(this).prev();
            //获取输入框的值
            var oldVal = parseInt($prevInput.val());
            //自减
            oldVal--;
            oldVal = oldVal < 1 ? 1 : oldVal //如果小于1，就等于1，否则就等于自己
                //重新赋值给输入框
            $prevInput.val(oldVal)

            //小计
            subTotalPrice(oldVal, $(this))


        })
        //抽取小计的函数
    function subTotalPrice(val, dom) {
        //小计
        var subtotal = val * parseFloat(dom.closest('tr').find('.price').text());
        //把小计的值放入dom对象对应的位置
        dom.closest('tr').find('.subprice').text(subtotal.toFixed(2));
    }

    //删除
    $('.del').click(function() {
        //删除整行
        $(this).closest('tr').remove();
    })

    //计算总价


})