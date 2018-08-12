var startBtn = document.getElementById('btn');
var box = document.getElementById('box');
var boom = document.getElementById('boom');
var alertBox = document.getElementById('alertBox');
var alertImage = document.getElementById('alertImage');
var close = document.getElementById('close');
var score = document.getElementById('score');
var block;
var minesNum,
    mineOver;
var mineMap = [];//代表当前小格是否有雷
var startGame = true;

bindEvent();
function bindEvent(){
  startBtn.onclick = function(){
      if(startGame){
        box.style.display = 'block';
        boom.style.display = 'block';
        init();
        startGame = false;
      }
  }
  box.oncontextmenu = function (){
      return false;
  }
  box.onmousedown = function (e){
    var event = e.target;
    if(e.which == 1){
      leftClick(event);
    }else if(e.which == 3){
        rightClick(event);
    }
  }
  close.onclick = function (){
      alertBox.style.display = 'none';
      boom.style.display = 'none';
      box.style.display = 'none';
      box.innerHTML = '';//失败后清空box里面展示出来的雷
      startGame = true;
  }
}

function init(){
    minesNum = 10;//雷的数量
    mineOver = 10;//雷还剩的数量
    score.innerHTML = mineOver;
    for(var i=0; i < 10; i ++){
        for(var j=0; j <10; j ++){
            var con = document.createElement('div');//生成小格子
            con.classList.add('block');
            con.setAttribute('id',i + '-' + j);//标记小格子的位置
            box.appendChild(con);
            mineMap.push({mine:0});//为数组里面每个div标记一个属性mine，值为0。
        }
    }
    block = document.getElementsByClassName('block');
    while(minesNum){
        var mineIndex = Math.floor(Math.random()*100);
        //如果雷的位置重复，将重新生存一个雷，在比较，直到生成新的雷。
        if(mineMap[mineIndex].mine == 0){//判断该div的mine属性值是否为0，即判断该div是否已经被标记为雷。
            mineMap[mineIndex].mine = 1;//将变成雷的div的mine属性值标记为1。
            block[mineIndex].classList.add('isLie');
            minesNum --;
        }
    }
}

function leftClick(dom){
    // console.log('left');
    var isLie = document.getElementsByClassName('isLie');
    // console.log(dom);
    if(dom && dom.classList.contains('isLie')){
        // console.log('gameover')
        for(var i = 0; i < isLie.length; i ++){
            isLie[i].classList.add('show');
        }
        setTimeout(function(){
            alertBox.style.display = 'block';
            alertImage.style.backgroundImage = 'url(image/gameOver.png)';
        },800)
    }else{
        var n = 0;
        //获取被点击的dom的id，即坐标。
        var posArr = dom && dom.getAttribute('id').split('-');
        var posX = posArr && +posArr[0];
        var posY = posArr && +posArr[1];
        dom && dom.classList.add('num');
        //如果点击对象的周边，统计9宫格内的雷数，并赋值给点击了的dom
        for(var i = posX-1; i <= posX + 1; i ++){
            for(var j = posY-1; j <= posY + 1; j ++){
                var aroundBox = document.getElementById(i + '-' + j);
                if(aroundBox && aroundBox.classList.contains('isLie')){
                    n ++;
                }
            }
        }
        // console.log(n)
        //如果点击的dom周边没有雷，则递归循环
        dom && (dom.innerHTML = n);
        if(n == 0){
            for(var i = posX-1; i <= posX + 1; i ++){
                for(var j = posY-1; j <= posY + 1; j ++){
                    var nearBox = document.getElementById(i + '-' + j);
                    if(nearBox && nearBox.length !=0){
                        //check是用来标记
                        if(!nearBox.classList.contains('check')){
                            nearBox.classList.add('check')
                            leftClick(nearBox);
                         }
                    }
                }
            }
        }
    }
}
function rightClick(dom){
    if(dom.classList.contains('num')){
        return;
    }
    //给右击的dom添加flowr这个类
    dom.classList.toggle('flower');
    //判断被右击的是否是雷，若是雷
    if(dom.classList.contains('isLie') && dom.classList.contains('flower')){
        mineOver --;
    }
    //若不是雷
    if(dom.classList.contains('isLie') && !dom.classList.contains('flower')){
        mineOver ++;
    }
    //将剩余雷的数量显示给score
    score.innerHTML = mineOver;
    //如果选出所有的雷，则成功
    if(mineOver == 0){
        alertBox.style.display = 'block';
        alertImage.style.backgroundImage = 'url(image/success.png)';
    }
}
//通过classList.add()来给不同状态的小格添加类，再根据classList.contains()来判断是否含有这个类。