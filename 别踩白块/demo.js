var main = $('#main'),
    color = ['#1AAB8A', '#E15650', '#121B39', '#80A84E'],
    timer,
    speed = 5,
    flag = true,
    num = 0;
//动态创建小块块
function cDiv() {
    //创建每行的外包裹
    var oDiv = $('<div></div>');
    var index = Math.floor(Math.random() * 4)

    console.log('index :' + index)
    //给每行的外包裹添加class : row
    oDiv.attr('class', 'raw');
    console.log('cDiv');
    //在row里面添加4个子div块
    for (var j = 0; j < 4; j++) {
        var str = $('<div></div>');
        oDiv.append(str)
    }
    console.log(main.children().length)
    if (main.children().length == 0) {
        //第一行添加到main里面
        main.append(oDiv);
    } else {
        //非第一行添加到main的最前面
        oDiv.insertBefore(main.children()[0]);
    }
    //选出每一行【非白块】添加颜色，并标记用于记分
    var clickDiv = oDiv.children()[index];
    console.log('clickDiv')
    $(clickDiv).css('background-color', color[index]);
    $(clickDiv).attr('class', 'i')

}
function move(dom) {
    clearInterval(timer);
    timer = setInterval(function () {
        //改变main的top定位进行垂直运动
        var step = parseInt(dom.css('top')) + speed;
        // console.log(step)
        dom.css('top', step + 'px');
        if (parseInt(dom.css('top')) >= 0) {
            cDiv();
            dom.css('top', -150 + 'px');
        }
        //当到达6行时
        var len = dom.children().length;
        if (len == 6) {
            //当【非白块】到达底部没有被点击，则游戏结束
            for (var i = 0; i < 4; i++) {
                if (dom.children()[len - 1].children[i].className == 'i') {
                    main.css('top', '-150px');
                    alert('GAME OVER :' + num);
                    clearInterval(timer);
                    flag = false;
                    $('#go').css('display', 'block');
                }
            }
            //当块为6行的时候去除底部，保证页面最多至于6行
            $(dom.children()[len - 1]).remove();
        }
    }, 30)
    bindEvent();
    // console.log('move');
}
//计算分数
function bindEvent() {
    main.on('click', function (event) {
        if (flag) {
            //判断点击源对象是否被标记了【i】
            if (event.target.className == 'i') {
                event.target.style.backgroundColor = '#bbb';
                event.target.className = '';
                num++;
            } else {
                main.css('top', '0px');
                alert('GAME OVER :' + num);
                clearInterval(timer);
                flag = false;
                $('#go').css('display', 'block');
            }
            //加速
            if (num % 10 == 0) {
                speed++;
            }
        }
    })
}
//开始游戏
function clickStart() {
    $('a').on('click', function () {
        if (main.children().length) {
            //暴力清楚main里面所有盒子
            main.html('');
        }
        $('#go').css('display', 'none');
        move(main);
        // console.log('start');
    })
}
clickStart()


