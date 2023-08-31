$(document).ready(function(){
    headerBG();
    $('.close').click(closeBtn);
    tabSlider()
    customSlider(".eventSlider",true,true);
    customSlider(".itemSlider",true,false);
    customSlider(".choiceSlider",false,true,false,250,10,'2','6');

    cartAdd();
    
    hoverChangeAll('.mainContainer div:nth-of-type(2) figure:nth-of-type(1) img','src','images/index_item01_hover.png','images/index_item01.png');
    hoverChangeAll('.mainContainer div:nth-of-type(2) figure:nth-of-type(2) img','src','images/index_item02_hover.png','images/index_item02.png');
    hoverChangeAll('.mainContainer div:nth-of-type(4) figure:nth-of-type(1) img','src','images/index_item03_hover.png','images/index_item03.png');
    hoverChangeAll('.mainContainer div:nth-of-type(4) figure:nth-of-type(2) img','src','images/index_item04_hover.png','images/index_item04.png');
    
    cartTabMenu(".cartContainer>ol li",".cartContainer div input[type='button'].pink:not([value^='payer'])",".cartContainer>div:not(.pop,:last-of-type)",'.cartContainer>div:last-of-type>div:not(:first-of-type)>strong:first-of-type',".cartContainer>div:last-of-type>div");
    panelPopActive(".cartContainer input[type='button'].btn_delete",'data-popName');
    cartEmpty("#panier>div",".listDelete");

    tabMenu('.informationContainer>ul li','.informationContainer div[id*=Tab]');
    tabMenu('.articleContainer>ul li','.articleContainer .articlePage');
    panelPopActive('header *','data-panelName');
    panelPopActive('footer *','data-panelName');
    panelPopActive('#cartHave .btn_delete','data-panelName');
    panelPopActive('.mainContainer *','data-panelName');
    panelPopActive(".signContainer .pink",'data-popName');
    panelPopActive('header div>ul li input','data-panelName');
    panelPopActive(".detailContainer input[type='button']",'data-popName');
    panelPopActive(".detailContainer .titleBox input[type='button']",'data-panelName');
    panelPopActive(".detailContainer #choice input[type='button']",'data-panelName');
    panelPopActive(".storeContainer>input[type='button']",'data-popName');
    panelPopActive(".cartContainer #paiement input[type='button']",'data-popName');
    panelPopActive(".endBox input[type='button']",'data-popName');
    panelPopActive(".informationContainer input[type='submit']",'data-popName');
    panelPopActive(".contactContainer input[type='submit']",'data-popName');
    submitActive("#test01");
    submitActive("#test02");
    submitActive("#test03");
    submitActive("#test04");
    detailImage();

    muiClick();
    muiClick02();
    
    $('ul.itemBox li').click(itemBoxActive);

    $('.listContainer.type03 ul li>input').click(macAddActive);
    $('.listContainer.type03 ul li div input').click(macRemoveActive);
    
    countNumb('#cartHave .countComponent span','#cartHave ul li mark',"#cartHave .countComponent input[type='button']",'#cartHave output');
    countNumb('#panier #listBox .countComponent span','#panier #listBox small',"#panier #listBox .countComponent input[type='button']",'#panier #listBox output');

    macSetMe();

    macHref();
    toTop('.cartContainer>div:not(#paiement) .pink',0);
    toTop('.cartContainer>div:last-of-type>div:not(:first-of-type)>strong:first-of-type',0);
    toTop('.articleContainer>ul:last-of-type li','.articleContainer>ul:first-of-type li');
});

function headerBG(){
    var baseHeight, addHeight, hoverHeight;

    if (window.matchMedia("(min-width: 1280px)").matches) {
        $('nav ul >li:nth-of-type(2n)').hover(function(){
            baseHeight = $("h1").height();
            addHeight = $(this).children("ol").height();
            hoverHeight = baseHeight + addHeight;
            
            $('header>div:last-of-type').css("height",hoverHeight);
            $('nav ul >li:nth-of-type(2n)').on('mouseleave',function(){
                $('header>div:last-of-type').css('height',baseHeight);
            });
        });
    }
}

function closeBtn(){
    var parent = $(this).parent();
    var buttonRetour = $(this).attr('value');
    var parentClass = $(parent).attr('class');

    var headerHeight = $("header div:last-of-type").height();
    var headerMargin = parseInt($("header div:last-of-type").css('margin-top'));

    if(buttonRetour=='Retour'){
        parent = parent.parent();
    }

    if(parentClass=='headBanner'){
        $(parent).css('display','none');
        $("section").css('margin-top',headerHeight+headerMargin*2-1);
    }else{
        $(parent).removeClass('active');
    }
}

function customSlider(target,pagerVal,adapVal,touchVal,widthVal,marginVal,minVal,maxVal){
    $(target).bxSlider({
        pager: pagerVal,
        controls : true,
        autoHover: true,
        pause: 3000,
        speed: 1000,
        hideControlOnEnd: true,
        nextText : 'next',
        prevText : 'prev',
        adaptiveHeight : adapVal,
        adaptiveHeightSpeed: 500,
        touchEnabled : touchVal,


        slideWidth: widthVal,
        slideMargin: marginVal,
        minSlides: minVal,
        maxSlides: maxVal,
        shrinkItems: true,
        moveSlides: 2
    });
}

function hoverChangeAll(objectName,attributeName,changeAttr,resetAttr){
    $(objectName).hover(function(){
        $(this).attr(attributeName,changeAttr)
        $(this).on('mouseleave',function(){
            $(this).attr(attributeName,resetAttr);
        });
    });
}

function cartTabMenu(stepper,nextStepBtn,mainStep,backStepBtn,rightStep){
    var idName = null;
    var tabMenuArr = [];
    var currentArrNumb = 0;
    for(var i = 0; i < $(stepper).length; i++){
        var pushTarget = $(stepper).eq(i).text();
        tabMenuArr.push(pushTarget);
    }
    $(nextStepBtn).click(function(){
        idName = $(this).attr("data-orderStep");
        $(mainStep).removeClass('active');
        $("#" + idName).addClass('active');
        $(stepper).removeClass('active');
        currentArrNumb++;
        $(rightStep).eq(currentArrNumb).css('display','block');
        $(stepper).eq(currentArrNumb).addClass('active');
    });
    $(backStepBtn).click(function(){
        var i = $(this).attr('data-numb');
        idName = tabMenuArr[i];
        for(var j=3; i < j; j--){
            $(rightStep).eq(j).css('display','none');
        }
        $(mainStep).removeClass('active');
        $("#" + idName).addClass('active');
        $(stepper).removeClass('active');
        $(stepper).eq(i).addClass('active');
        currentArrNumb = i;
    });
}

function cartEmpty(targetD,targetB){
    $(targetB).click(function(){
        var idName = $(this).attr('data-orderStep');
        var parent = $(this).parent();
        parent  = $(parent).parent();

        $(parent).removeClass('active');

        $(targetD).removeClass('active');
        $("#" + idName).addClass('active');
    });
}

function tabMenu(targetL,targetD){
    $(targetL).click(function(){
        var idName = $(this).attr('data-tabName');
        
        $(targetD).removeClass('active');
        $('#'+idName).addClass('active');

        $(targetL).removeClass('active');
        $(this).addClass('active')
        if(window.matchMedia("(max-width:1279px)")){
            if(targetL == '.informationContainer>ul li'){
                $(targetL).parents("ul").toggleClass("active");
                $(this).siblings("li").removeClass("active");
                $(this).addClass("active");
            }
        }
    });
}

function panelPopActive(targetB,dataName){
    $(targetB).click(function(){
        var idName = $(this).attr(dataName);
        if(idName=='cartEmpty'){
            $("[class*=Panel]").removeClass('active');
        }
        $('#'+idName).addClass('active');
    });
}

function submitActive(formID){
    $(formID).on("submit", function(e){
        e.preventDefault();
    });
}

function detailImage(){
    $('.detailContainer .titleBox ol li').click(function(){
        var fileName = $(this).attr('data-fileName');
        $('.detailContainer .titleBox>img').attr('src',fileName);
    });
}

function muiClick(){
    var state = 0;
    $('.mui').click(function(){
        if(state==0){
            $('header>div:last-of-type nav').css('display','block');
            $(".mui input[type='button']").attr('value','close');
            state = 1;
        }else{
            $('header>div:last-of-type nav').css('display','none');
            $(".mui input[type='button']").attr('value','menu');
            $('nav ul >li:nth-of-type(2n)').removeClass('active');
            $('nav ul >li:nth-of-type(2n) ol').removeClass('active');
            state = 0;
        }
    });
}

function muiClick02(){
    if (window.matchMedia("(max-width:1279px)").matches){
        $('nav ul >li:nth-of-type(2n)').click(function(){
            var childrenHeight = $(this).height();
    
            if(childrenHeight > 50){
                $(this).children().removeClass("active");
                $(this).removeClass('active');
            }else{
                $('nav ul >li:nth-of-type(2n)').removeClass('active');
                $(this).addClass('active');
                $('nav ul >li:nth-of-type(2n) ol').removeClass('active');
                $(this).children().addClass('active');
            }
        });
    }
}

function tabSlider(){
    if (window.matchMedia("(max-width:1279px)").matches){
        for(var i=1; i<$(".eventSlider li").length+1; i++){
            var imgSrc = $('.eventSlider li:nth-of-type('+i+') img').attr('src');
            imgSrc = imgSrc.replace('eventSlider','tab_eventSlider');
            $('.eventSlider li:nth-of-type('+i+') img').attr('src',imgSrc);
        }
    }
}

function itemBoxActive(){
    if (window.matchMedia("(max-width:1279px)").matches){
        $(this).toggleClass('active');
    }
}

function cartAdd(){
    $(".itemBox li div div input[type='button']").click(function(){
        var targetValue = $(this).attr('value');
        var idName = $(this).attr('data-panelName');
        
        if(targetValue == 'local_mall'){
            $(this).removeClass('active');
            $(this).attr('value','shopping_bag');
        }else{
            $('#'+idName).addClass('active');
            $(this).addClass('active');
            $(this).attr('value','local_mall');
        }
    });
}

function macAddActive(){
    $(this).parent().addClass('active');
}

function macRemoveActive(){
    var target = $(this).parent();
    target = target.parent();
    $(target).removeClass('active');
}

function countNumb(numbOfItem,priceVal,targetB,targetP){
    var currentNumber = parseInt($(numbOfItem).text());
    var limitNumber = 100;
    
    var onePrice = $(priceVal).text();
    var priceFront = 0;
    var priceBack = 0;
    var addPrice = 0;
    var finalPrice = 0;
    
    var inputValue = '';

    $(targetB).click(function(){
        inputValue = $(this).val();

        if(inputValue == '+' && currentNumber < limitNumber){
            currentNumber = currentNumber+1;
        }else if(currentNumber != 1 && currentNumber < limitNumber){
            currentNumber = currentNumber-1;
        }else if(currentNumber == limitNumber && inputValue == '-'){
            currentNumber = currentNumber-1;
        }

        $(numbOfItem).text(currentNumber);


        priceFront = onePrice.slice(0,-5);
        priceBack = onePrice.slice(-4,-2);

        priceFront = (currentNumber*priceFront);
        priceBack = (currentNumber*priceBack);
        
        if(priceBack > 99){
            priceBack = priceBack.toString();
            addPrice = parseInt(priceBack.slice(0,-2));
            priceBack = priceBack.slice(-2);
            priceFront = priceFront + addPrice;
        }
        finalPrice = priceFront + '.' + priceBack;

        finalPrice = parseFloat(finalPrice).toFixed(2).replace('.',',');
        
        $(targetP).val(finalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
    });
}

function macSetMe(){
    var addForm = $(".macList");
    var mName = '';
    var maxCount = 0;
    var totalCount = 0;
    
    var perCount = 0;
    var mIdName = '';

    $(".choiceSlider input[value='+ ADD']").on('click',function(){
        totalCount = parseInt($(".macCount .addCount").text())+1;
        maxCount = parseInt($(".macCount .limitCount").text());
        
        mName = $(this).siblings("span").text();
        $(addForm).children("small").text(mName);
        mIdName = mName.replace(/\s/g, "");
        
        if(totalCount <= maxCount){
            $(addForm).clone().attr('id', mIdName).appendTo($("#choice .macSelected"));
            $(".macCount .addCount").text(totalCount);
        }
        if(totalCount == maxCount){
            $("#choice>input[type='button']").addClass('active');
            $("#choice>input[type='button']").attr("disabled",false);
            $("#choice>input[type='button']").attr("value","AJOUTER AU PANIER");
        }
        
        $(".macList .btn_delete").on('click',function(){
            $(this).closest(".macList").remove();
            totalCount = $(".macList").length-1;

            if(totalCount <= maxCount){
                $("#choice>input[type='button']").removeClass('active');
                $("#choice>input[type='button']").attr("disabled",true);
                $("#choice>input[type='button']").attr("value","CHOISIR UNE SÉLECTION");
            }
            $(".macCount .addCount").text(totalCount);
        });

        $("#"+mIdName+" .countComponent input[type='button']").on('click',function(){
            var inputValue = $(this).val();
            perCount = parseInt($(this).siblings('span').text());

            if(totalCount < maxCount){
                if(inputValue == '+'){
                    totalCount = totalCount+1;
                    perCount = perCount+1;
                }else if(perCount != 1){
                    totalCount = totalCount-1;
                    perCount = perCount-1;
                }
    
                $(this).siblings('span').text(perCount);
                $(".macCount .addCount").text(totalCount);
            }

            if(totalCount == maxCount){
                $("#choice>input[type='button']").addClass('active');
                $("#choice>input[type='button']").attr("disabled",false);
                $("#choice>input[type='button']").attr("value","AJOUTER AU PANIER");

                if(inputValue == '-' && perCount != 1){
                    totalCount = totalCount-1;
                    perCount = perCount-1;
                    $("#choice>input[type='button']").removeClass('active');
                    $("#choice>input[type='button']").attr("disabled",true);
                    $("#choice>input[type='button']").attr("value","CHOISIR UNE SÉLECTION");
                }

                $(this).siblings('span').text(perCount);
                $(".macCount .addCount").text(totalCount);
            }

            $("#"+mIdName+".btn_delete").on('click',function(){
                $(this).closest(".macList").remove();
                totalCount = totalCount-perCount;

                $(".macCount .addCount").text(totalCount);
            });
        });
    });
}

function macHref(){
    $('.titleBox a').click(function(e){
        var target = $(this).attr('href');
        e.preventDefault();
        $("html, body").animate({scrollTop : $(target).offset().top - 180},600);
    });
}

function toTop(target,targetH){
    $(target).click(function(e){
        e.preventDefault();
        
        if(targetH == 0){
            $("html, body").animate({scrollTop : 0},600);
        }else{
            $("html, body").animate({scrollTop : $(targetH).offset().top},600);
        }
    });
}