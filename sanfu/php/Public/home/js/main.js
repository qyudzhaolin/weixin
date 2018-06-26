var scrollableArray = ['box-1'];//禁止滑动box
var box1Button_left = parseInt($('#box-1 .button').css('left')); // box1滑动框位置
var box2inputOld = '这不就是群发吗...太敷衍了吧...'; // box2字
var box4Index = 0;//滑动的box
var box5titles = ['吃嘛嘛香，小胖5斤','沾枕头就着，失眠退散','找到男朋友/女朋友','基友一生一起走，谁先脱单谁是狗','吃的东西都胖在对象身上','不经历风雨，怎能见雷电','每天睡到自然醒','升职加薪，走向人生巅峰','一夜暴瘦，掉肉10斤','发量猛增，绝不秃头','霸道总裁爱上你','爱你么么哒','加油你是最胖的','前男友过的比你好','加班不止加薪无望'];
var box5titlesK = 0;
var music1 = document.getElementById('music1')
var music2 = document.getElementById('music2')
if(isold){
    returnBox('box-3','box-2')
}else{
    music2.play();
    box1Show();

}
//首页显示
function box1Show(){
    $('#box-1').addClass('boxShow')
    var date = new Date();
    $("body").addClass("scrollable");
    var DayArray = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
    var t;
    if(date.getMinutes() > 9){
        t = date.getMinutes();
    }else{
        t = '0'+date.getMinutes();
    }
    $("#box-1 .time p").html(date.getHours()+':'+ t)
    $("#box-1 .time span").html((date.getMonth()+1)+'月'+date.getDate()+'日&nbsp;'+DayArray[date.getDay()]);
}
//聊天框显示
function bo2Show(){
    returnBox('box-2','box-1')
    var i = 0;
    var Interval = setInterval(function(){
        if($('#box-2 ul li').length-1 > i ){
            if(i%2 == 0 ){
                music1.play();
            }
            $($('#box-2 ul li')[i]).css('display','block')
        }else{
            clearInterval(Interval);
            var c = 0;
            var Interval2 = setInterval(function(){
                if(box2inputOld.length > c){
                    $("#box-2 .input").append(box2inputOld.charAt(c));
                }else{
                    clearInterval(Interval2);
                    $("#box-2 .input").html('');
                    $($('#box-2 ul li')[$('#box-2 ul li').length-1]).css('display','block')
                    $("#box-2 ul").scrollTop(1200);
                    setTimeout(function(){
                      $('#box-2 .tk').css('display','block');
                    },600)
                }
                c++;
            },300)
        }
        i++;
    },1200)
    //打字

    function inputIn(){
        // box2inputOld
        $("#box-2 .input").html(box2input.substr(0,c));
    }
}
//box3跳转
$('#box-2 .next-box').on('click',function(){
    returnBox('box-3','box-2')
    music2.play();
})
//box4跳转
$('#box-3 .next-box').on('click',function(){
    returnBox('box-4','box-3')
})
//box5跳转
$('#box-4 .button-anniu').on('click',function(){
    returnBox('box-5 ','box-4')
    showTab()
})
//box6跳转
$('#box-5 .next-box').on('click',function(){
    if($('#input-form-to').val() == '' || $('#box5-form-content').val() == ''){
        alert("请正确填写信息");
        return 0;
    }
    returnBox('box-6','box-5')
    // box4Index
    //合成第一次
    var canvas = document.createElement("canvas");
    canvas.width = '425';
    canvas.height = '694';
    var ctx = canvas.getContext("2d");
    ctx.font="13px Georgia";
    if(queue.getResult('back'+(box4Index+1))){
        imgDraw(queue.getResult('back'+(box4Index+1)))
    }else{
        var img = new Image();
        img.src = imgSrc+'/ico/back'+(box4Index+1)+'.jpg';
        img.crossOrigin = "Anonymous";
        img.onload = function(){
            imgDraw(img)
        }
    }
    function imgDraw(boxImg){
        ctx.drawImage(boxImg,0,0,canvas.width,canvas.height);
        ctx.drawImage(queue.getResult('jyhk'),76,367,281,187);
        ctx.fillText($('#input-form-to').val(),129,424);
        ctx.fillText($('#box5-form-content').val().substring(0,16),110,450);
        ctx.fillText($('#box5-form-content').val().substring(16,32),110,465);
        ctx.fillText($('#box5-form-content').val().substring(32,48),110,480);
        ctx.fillText($('#box5-form-content').val().substring(48,64),110,495);
        ctx.fillText(nackname,227,526);
        var img = new Image();
        img.src=canvas.toDataURL("image/jpg")
        // $("#box-6 .content").html(img)
        imgplay(img)
    }
})
$('#box-6 #box6-b1').on('click',function(){
    $('#box-6 .box6-list').fadeIn("slow");
    $('#box-6 #box6-b1').css('display','none')
    $('#box-6 #box6-b2').css('display','block')
})
$('#box-6 #box6-b2').on('click',function(){
    $('#loading').addClass("boxShow");
    var imgObj_src = document.getElementById('canvas').toDataURL('image/jpeg');
    if(imgObj_src){
        var canvas = document.createElement("canvas");
        canvas.width = '425';
        canvas.height = '694';
        var ctx = canvas.getContext("2d");
        var img = new Image();
        img.src = imgObj_src;
        img.onload = function(){
            imgDraw(img)
        }
        function imgDraw(boxImg){
            ctx.drawImage(boxImg,0,0,canvas.width,canvas.height);
            ctx.drawImage(queue.getResult('2wm'),19,581,76,103);
            var img = new Image();
            img.src=canvas.toDataURL("image/jpg")

            var data = {
                'to':$('#input-form-to').val(),
                'content':$('#box5-form-content').val(),
                'img':img.src
            }




            $.post(url,data,function(result){
                $("#box-7 .content").html(img);
                 returnBox('box-7','box-6')
                $('#loading').removeClass("boxShow");

           } ,'json');




        }
    }
})
$('#box-7 .next-box').on('click',function(){
    $('#fx').addClass("boxShow");
})
$('#fx').on('click',function(){
    $('#fx').removeAttr("class");
})
//贴图
function imgplay(img){
    //获取画布
    var canvas = new fabric.Canvas('canvas',{
            selection: false
    });
    canvas.setBackgroundImage(img.src, canvas.renderAll.bind(canvas));
    // canvas.setBackgroundImage('../assets/pug.jpg', canvas.renderAll.bind(canvas));
    // this.__canvases.push(canvas);

//贴图入屏
$('#box-6 #box6-ico-box img').click(function(){
    imgDraw(this);
});
function imgDraw(img) {
    var icon_index= $(img).attr("data-src");
    var imgInstance = new fabric.Image(queue.getResult(icon_index), {
        left: 100,
        top: 100,
        angle: 0,
        opacity: 1,
        hasBorders: false,
        hasControls: false,
        crossOrigin: 'use-credentials'
      });
      imgInstance.hascontrols = false;
      imgInstance.hasborders = false;
      imgInstance.on('selected', function() {
        is_back_qh = false;
        shanchu(this)
        obj = this;
      });
      imgInstance.on('moving', function() {
        is_back_qh = false;
        shanchu(this)
      });
      imgInstance.on('scaling', function() {
         is_back_qh = false;
        shanchu(this)
      });
      imgInstance.on('rotating', function() {
         is_back_qh = false;
        shanchu(this)
      });

      canvas.add(imgInstance).renderAll();
    }

    //ico操作
    function shanchu(bj){
        if(!bj){
        $("#remove").css("top",-999);
        $("#remove").css("left",-999);
        }else{
        $("#remove").css("top",bj.oCoords.tr.y);
        $("#remove").css("left",bj.oCoords.tr.x);
        }

        canvas.forEachObject(function(obj) {
        var setCoords = obj.setCoords.bind(obj);
            obj.on({
            selected: setCoords,
            moving: setCoords,
            scaling: setCoords,
            rotating: setCoords
            });
        });
    }
    $("#remove").click(function(){
        if(obj){
            obj.remove(obj);
        }
        $(this).css("top",9999)
    })
}
//活动规则
$('#rule-button').on('click',function(){
    $('#rule').addClass("boxShow");
})

//音乐关闭
var musicplaying = 1;
$('#music-button').on('click',function(){
    if(musicplaying){
        $('#music-button').removeAttr("class");
        $('#music-button').addClass("fd-button");
        music2.pause();
        musicplaying = 0;
    }else{
        $('#music-button').addClass("music-show");
        music2.play();
        musicplaying = 1;
    }
})
//首页滑动
boxSlideFun('#box-1',
    function(){
    },function(){
        if((boxSlide.x - boxSlide.lastx) < 0){
            var n = (0-(boxSlide.x - boxSlide.lastx))/210;
            $('#box-1 .title').css('opacity',1-n/1.2);
            $('#box-1 .button').css('opacity',1.1-n/1.2);
            $('#box-1 .button').css('left',box1Button_left+(0-(boxSlide.x - boxSlide.lastx)));
        }
    },function(){
        if((0-(boxSlide.x - boxSlide.lastx))/200>1){
            bo2Show()
        }
        $('#box-1 .title').css('opacity',1);
        $('#box-1 .button').css('opacity',1);
        $('#box-1 .button').css('left',box1Button_left);
    }
)
//关闭rule
$('#rule .next-box').on('click',function(){
    $('#rule').removeAttr("class");
})
//tab title显示
$('#box-5 .hyp').on('click',function(){
    showTab();
})
//tab title 列表
function showTab(){
    var string = '';
    for(var i = 1; i < 4; i++){
        box5titlesK += i;
        if(box5titles.length <= box5titlesK){
            box5titlesK = 0;
        }
        string  += '<li><a>'+box5titles[box5titlesK]+'</a></li>'
        // <li><a href="###">吃嘛嘛香，小胖5斤</a></li>
    }
    $('#box-5 .list ul').html(string); 
    $('#box-5 .list ul li a').click(function(){
        if($('#box5-form-content').val().length + $(this).html().length < 60){
            $('#box5-form-content').val($('#box5-form-content').val()+$(this).html());
        }else{
            alert('您输入的内容超出限制，请保证输入字符<60')
        }
    });

}
//滑动判断
var boxSlide = {x:0,y:0,lastx:0,lasty:0}
function boxSlideFun(box,startFun,moveFun,endFun){
    $(box).on('touchstart',function(e) {
        var touch = e.originalEvent.targetTouches[0];
            boxSlide.x = touch.pageX;
            boxSlide.lastx = touch.pageX;
            boxSlide.y = touch.pageY;
            boxSlide.lasty = touch.pageY;
            startFun();
    });
    $(box).on('touchmove',function(e){
        var touch = e.originalEvent.targetTouches[0];
            boxSlide.lastx = touch.pageX;
            boxSlide.lasty = touch.pageY;
            moveFun();
    })
    $(box).on('touchend',function(e){
        endFun();
        boxSlide.y = 0;
        boxSlide.lasty = 0;
        boxSlide.x = 0;
        boxSlide.lastx = 0;
    })
}
//禁止滑动
document.body.addEventListener('touchmove',function(e){
    if($("body").hasClass("scrollable")){
        e.preventDefault();
    }
});
//页面逃转
function returnBox(box,box2){
    $('#'+box2).removeAttr("class");
    $('#'+box).addClass("boxShow");
    for(var i = 0; i < scrollableArray.length;i++){
        if(box == scrollableArray[i]){
            $("body").addClass("scrollable");
            return 1;
        }else{
            $("body").removeClass("scrollable");
        }
    }
}
//box4提示框消失
$('#box-4 #box-4-tsk').on('click',function(){
    $(this).fadeOut();
})