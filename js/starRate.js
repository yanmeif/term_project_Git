/*封装星级评分函数*/
$(function() {
    //创建星星评分的函数，挂在Windows上
    // window.createStarRate = function(score) {
    $.fn.createStarRate = function(score) { //扩展
        //满星
        var on = `<span class="on iconfont icon-star-full"></span>`;
        //半星
        var half = `<span class="half iconfont icon-star-half"></span>`;
        //灰色星星
        var off = `<span class="off iconfont icon-star-full"></span>`;

        //样式
        $(on).css({
            fontSize: '50px',
            color: 'red',
        });
        $(half).css({
            fontSize: '50px',
            color: 'red',
        });
        $(off).css({
            fontSize: '50px',
            color: '#ccc',
        })

        //计算分数
        var calcScore = Math.floor(score * 2) / 2;
        console.log(calcScore);
        //计算满星
        var onCount = Math.floor(calcScore);
        //计算半星
        var isHasHalf = 0;
        if (calcScore % 1 !== 0) {
            isHasHalf = 1;
        }
        //计算灰色的星星
        var offCount = 5 - onCount - isHasHalf;

        //计算拼接结果
        var rst = '';
        //拼接满星
        for (var i = 0; i < onCount; i++) {
            rst += on;
        }
        //拼接半星
        if (isHasHalf === 1) {
            rst += half;
        }
        //拼接灰色星星
        for (var k = 0; k < offCount; k++) {
            rst += off;
        }

        //返回rst
        // return rst;
        $(this).html(rst);
    }
})