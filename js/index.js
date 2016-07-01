// JavaScript Document
function id(obj) {
    return document.getElementById(obj);
}
function bind(obj, ev, fn) { 
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent('on' + ev, function() {
            fn.call(obj);
        });
    }
}
function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}
function addClass(obj, sClass) { 
    var aClass = obj.className.split(' ');
    if (!obj.className) {
        obj.className = sClass;
        return;
    }
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) return;
    }
    obj.className += ' ' + sClass;
}

function removeClass(obj, sClass) { 
    var aClass = obj.className.split(' ');
    if (!obj.className) return;
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) {
            aClass.splice(i, 1);
            obj.className = aClass.join(' ');
            break;
        }
    }
}

function fnLoad(){
    var iTime = new Date().getTime();
    var oW = id('welcome');
    var arr = [""];
    var bImgLoad = true;
    var bTime = false;
    var oTimer = 0;

    bind(oW,"webkitTransitionend",end);
    bind(oW,"transitionend",end);
    
   oTimer = setInterval(function(){
        if( new Date().getTime()-iTime>=5000 ){
            bTime=true;
        }
        if(bImgLoad&&bTime){
            clearInterval(oTimer);
            oW.style.opacity = 0;
        }
    },1000)

    function end(){
        removeClass(oW,'pageShow');
    }
    /*for(var i=0;i<arr.length;i++){
        var oImg = new Image();
        oImg.src=arr[i];
        oImg.onload = function(){

        }
    }*/
}

bind(document,"touchmove",function(ev){
    ev.preventDefault();
})

function fnTab(){
    var oTab = id('tabPic');
    var oList = id('picList');
    var aNav = oTab.getElementsByTagName('nav')[0].children;
    var iNow = 0;
    var iX = 0;
    var iW = view().w;
    var oTimer = 0;
    var iStartTouchX = 0;
    var iStartX = 0;
    oTimer = setInterval(function(){
        iNow++;
        iNow=iNow%aNav.length;
        tab();
    },2000);

    bind(oTab,"touchstart",fnStart);
    bind(oTab,"touchmove",fnMove);
    bind(oTab,"touchend",fnEnd);
    function fnStart(ev){
        ev  = ev.changedTouches[0];
        iStartTouchX = ev.pageX;
        iStartX = iX;
        clearInterval(oTimer);
    }
    function fnMove(ev){
        ev  = ev.changedTouches[0];
        var iDis = ev.pageX-iStartTouchX;
        iX = iStartX+iDis;
        oList.style.WebkitTransition = 'none';
        oList.style.WebkitTransform = "translateX("+iX+"px)";
    }
    function fnEnd(ev){
        iNow = iX/iW;
        iNow = -Math.round(iNow);
        console.log(iNow);
        console.log('----------------------------------------');
        if(iNow<=0){
            iNow = 0;
        }
        if(iNow>=aNav.length-1){
            iNow = aNav.length-1;
        }
        console.log(iNow);
        tab();
    }

    function tab(){
        iX = -iNow*iW;
        oList.style.WebkitTransition = '0.7s';
        oList.style.WebkitTransform = "translateX("+iX+"px)";
        for(var i=0;i<aNav.length;i++){
            removeClass(aNav[i],"active");
        }
        addClass(aNav[iNow],"active");
    }
}


