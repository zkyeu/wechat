/**
 *
 * @authors vincent (zhuning@51talk.com)
 * @date    2015-07-21 12:10:30
 * @version 1.0.0
 */
define(function(require,exports,module){
	var numForCount = 0; // 30: FUJI, 50: Iphone 6S

	/* tips轮播 */
	setInterval(function(){
		if( parseInt($(".dc_tipsL").css("top")) <= (-$(".dc_tipsL").height() + $(".dc_tips").height())) $(".dc_tipsL").css("top", 34);
		$(".dc_tipsL").animate({top: parseInt($(".dc_tipsL").css("top"))-$(".dc_tips").height()+"px"}, "slow");
	}, 3000);

	/* 
	 * addNum 奖品增加
	 * @obj 奖品弹出层
	 * @objNum 奖品数据展示层
	 */
	function addNum(obj, objNum) {
		if (!objNum.hasClass("dc_prizeN")) objNum.addClass("dc_prizeN");
		objNum.html(parseInt(objNum.html())+1);
		obj.addClass("hide");
	}

	/* 抽鸭子 */
	$(".dc_topC li a").click(function(){
		$.ajax({
			url:"/activity/doLottery",
			type:"POST",
			dataType:"json",
			success:function(res){
				result = res;
				/* 1: 鼠标垫 2: 2分钟 3: 1分钟 */
				if(result.status<=0) {
					$("#info .runOut_tit").html(result.info);
					$("#info").removeClass("hide");
					$("#info .runOut_ok").click(function(){
						$("#info").addClass("hide");
					});
					return false;
				}
				/* 抽奖机会判断 */
				if (parseInt($("#rest").html()) != 0) {
					/* 机会用完后处理 */
					if ((parseInt($("#rest").html())-1) == 0) {
						$("#overUrl").removeClass("dc_draw").addClass("dc_now");
						$("#overUrl").attr("href", $("#rest").attr("data-over-url"));
						$("#overUrl").attr("target", "_blank");
						$("#overUrl").css("cursor", "pointer");
					}
					$("#rest").html(parseInt($("#rest").html())-1);
					switch(result.data) {
						case 3:
							$("#pad").removeClass("hide");
							$("#pad .runOut_ok").unbind().click(function(){
								addNum($("#pad"), $("#padNum"));
							});
						  	break;
						case 2:
							$("#2min").removeClass("hide");
							$("#2min .runOut_ok").unbind().click(function(){
								addNum($("#2min"), $("#2minNum"));
							});
						  	break;
						case 1:
							$("#1min").removeClass("hide");
							$("#1min .runOut_ok").unbind().click(function(){
								addNum($("#1min"), $("#1minNum"));
							});
						  	break;
						default:
						  	return false;
					};				
				} else {
					$("#gameOver").removeClass("hide");
					$("#gameOver .runOut_ok").unbind().click(function(){
						$("#gameOver").addClass("hide");
					});
				}
			}
		});
	});

	/* 活动规则 */
	$(".dc_rule").click(function(){
		$(".rule").removeClass("hide");
		$(".rule .runOut_ok").click(function(){
			$(".rule").addClass("hide");
		});
	});

	function duckRandom() {
		var dbArray = ['Cici','xh','Judy','Lily','linda','Hanjinyan','marimo','chennvshi','king','Della','sharon','Andy','Yolanda','number','sudent','ivy','kiwi','Tiana','Candy','Sunny','Alen','dolphin','tree','ss','Vicky','coco','Cindy','mike','Lingling','Entai','Amanda','Time','Vinuary','June','lucy','Luka','annie','eva','lisa','Seven','Ayan','Aaron','zxc','Arthur','Pharos','ne','fock','Derico','Mary','Steven','yayuan','Jessica','Anlar','Elyar','Tashi','autumu','zhunvshi','Tobey','Nick','vincent','zhaonvshi','Yin','Well','Eilene','tina','amy','Travis','WingMok','Memory','cherry','alisa','Jim','Apple','sarah','lord','alice','yan','kimhans','Tom','Iris','Liz','Ada','Peter','Jake','Junia','Leo','justin','Martha','anjou','Rita','pony','Lewis','vivian','Ormosia','lost','rose','Angus','chunzhaozou','Fiona','Blue','Yang','Jason','Anne','Athena','Marry','MorganSze','Liviia','Wendy','daling','Sally','liza','Guo','Bill','Aria','wenzi','gantongxue','Serena','wangwenya','Eason','Hulda','John','yuki','ivory','Evelyn','ponior','angel','yenvshi','carmen','Lonelycoffee','ATM','sweety','Kevin','zhang','sandy','Tang','joy','Meepo','moira','camille','iceytang','gaohanc','Lyn','Megan','bin','Tracy','chirs','cynthia','mission','VAE','zhao','liangnvshi','Ella','lena','cong','Cherise','Carol','ANGLE','William','BronVer','Jessie','michael','vicki','Ash','jessi','cathy','simon','LeonZhang','zhoutongxue','Wei','echo','panzijian','Sophie','sophia','brucelee','Jane','alexhoooooo','sunshine','Christina','xielly','AAAAA','wilber','karen','riven','YangLi','Sherry','whr','Cristiano','Frank','Harrison','Joyce','chong','fighting','LUNA','Catty','hello','linvshi','Darren','Jamie','Jelly','Jayson','jule','Gloria','kido','jeffery','nacy','susu','Eric','Zhoujiamei','hllLily','gaogao','shenwu','Jasmin','Cry','Villa','Joanna','xu','Alic','Bonnie','tiger','wanglei','wuqiqing','Warren','wangnvshi','Evangeline','sujin','wang','cathyrine','Heloise','gungnir','Becky','shelly','sukeer','SIMONA','yinjiaolian','bob','dora','Phyllis','oucai','Anthony','dou','lvnvshi','andyyc','Reta','Tiffany','dongnvshi','Flora','Zhu','hannah','willjay','zhenglianghai','olivia','Demi','Lili','sue','yuanzifeng','xutongxue','stacie','Baiyun','Raissa','zhi','allen','meng','snow','wwhan','lake','silence','wene','tony','ALAN','Violet','Eden','toto','Ariel','brian','Wayne','johney','Sakura','Elva','bison','Lin','carolyang','Dykimy','rain','Will','Dong','Cora','caonvshi','Liu','chen','luke','MarkAn','Hamay','MING','anny','dsxcil','Bruce','Deng','kunb','shirley','litameng','Arclless','Daisy','tannvshi','xingxing','Smile','liuxiansheng','Joseph','Yukina','bulrush','Joan','ann','tongxue','jerry','MOMO','Luo','TanYingbo','Jan','berry','Kobe','zhangzhiyun','Charles','lixiansheng','Vayne','Chris','summer','Virgil','Wells','Jacky','brant','Felicity','VictorLee','sky','Julie','Junjicai','wutongxue','Nancy','poppy','liuterry','make','stefanie','Gavin','lemon','Roxy','Accees','Edward','carrie','Colin','Hyf','appointments','scalett','Jennifer','abc','Jenny','Spring','Helen','zhouzhou','Eiffe','yunvshi','Emily','Robin','liyi','isher','baonvshi','Tornado','Wangyucheng','Lee','stella','yoyo','Martin','Victoria','JACK','Preston','lian','Harry','banana','cloud','bang','Paul','Devin','chloe','fancy','li','qinkaisong','poliy','Dorah','monster','Dana','reedi','Fkesnai','peng','chenbyuao','thinn','jersey','Match','Herry','Caroline','zhangtongxue','Emma','yilun','Celia','Elaine','Erica','Jasen','Honson','Zibary','worker','jay','Mili','Abbott','Belinda','Henry','Andrew','subic','Zero','secret','Zoe','ZORERO','Yuko','Alvin','JetHu','Josh','lynn','amily','gabrielle','Lisha','Hanson','hi','xiaoxuesheng','Jasmine','handy','Ricky','Huang','Malay','MrCao','Matilda','mark','nieyide','jeff','ma','binglan','Jimmy','Kitty','SANMI','Damon','Jeeny','Betty','sam','Stone','dem','koren','hat','Hanley','lilian','AI','Onecy','mingming','shinvshi','zhangpaixiong','Anna','Ethan','charmer','Mickey','Ashley','fang','like','wangyu','Emmna','williamlin','Trojan','leaf','haye','learn','yangzhengquan','jeffrey','Fisher','Elex','Xixi','Charlie','Abby','magic','Husky','Lusia','Gebrial','sundy','Zichuan','Charicy','liangjiawen','Robert','Narina','Ping','Catherine','lida','happy','iceworld','Kathy','Rena','liang','limbo','qiqi','erin','hot','Matthew','ironhide','wangzi','Heather','hideonbush','ben','luoxiansheng','susie','Rocket','Rulish','Junki','fred','antonio','Mona','fezz','George','crastal','ruby','Maggie','Tommy','leyi','shine','monica','Cute','qiuqiu','Kirk','PANCE','wangju','Donny','Juan','Sunzeyu','Magin','Dharnilow','JASPER','Jolin','Kochab','River','Tous','Tiantian','GaryJiang','mini','james','lpdchild','Silas','zhangsan','Sissy','Sharry','kyle','suzie','Wolker','Bella','TracyChen','MINGZHIUX','yuan','Ssy','Sully','David','Beccy','willie','Levina','Estelle','mcan','windy','Uson','chenxiansheng','Cassiel','Lindsay','Kaylee','joe','Hayden','Claire','cresnt','zoey','he','Naomi','direction','Mandy','Felicia','leila','dengnvshi','Revenge','Vilin','Khun','Grace','Holiday','Anc','Dragon','wangxiansheng','unwin','Cecilia','lulu','gaoyufei','liuzhenzhong','davi','liuxinbo','Elena','mrshan','celine','sharly','CC','Moon','Wilson','Asa','LiWei','derrick','center','tangdongming','xiong','JIAN','Jackie','hely','Lancelot','Kabo','LenFon','Agan','Caneray','Daivd','Tab','jackson','Ton','CGod','dingfangwei','yuansheng','Optimus','suli','rainqi','haha','Celina','Donna','Samuel','LAN','ritaren','Terry','linhua','dexter','chensheng','susan','JONAH','cai','Renata','Wallis','Diane','yangjiahao','bvn','Merry','Hardy','XUBI','Shaina','Joey','wangyi','Ashlee','Lilith','mina','cookie','Oscar','Alexandra','Hellen','Archy','hongjie','MissDu','Ross','Miss','Jiang','Dave','Louisa','Cher','Tasha','Jeremy','wangfei','ally','stu','eiger','Haili','xienvshi','Victor','Aad','velo','Brandon','gaotongxue','jianwu','wahana','MissJiang'];
		var gift = ["51Talk鼠标垫", "免费次卡", "10分钟时长券", "2分钟时长券", "1分钟时长券"];
		var giftClass = ["iconM", "iconF", "icon10m", "icon2m", "icon1m"];
		// var gift = ["Iphone6s", "FUJI拍立得", "51Talk鼠标垫", "免费次卡", "10分钟时长券", "2分钟时长券", "1分钟时长券"];
		// var giftClass = ["icon6", "iconFu", "iconM", "iconF", "icon10m", "icon2m", "icon1m"];
		//随机用户名
		var nameArray = [];
		for (var j=0; j<8; j++){
			var randomNumber = Math.floor(0+Math.random()*(683-0));
			if (nameArray.length == 0) {
				nameArray.push(randomNumber);
			} else {
				var flag = true;
				for (var i=0; i<nameArray.length; i++){
					if (nameArray[i] == randomNumber) {
						flag = false;
						break;
					}
				}
				if (flag) nameArray.push(randomNumber);
			}
		}
		//随机奖品
		var giftArray = [];
		for (var j=0; j<5; j++) {
			var randomNumber = Math.floor(0+Math.random()*(5-0));
			giftArray.push(randomNumber);
		}
		//展示数据
		var data = [];
		for (var m=0; m<8; m++) {
			var tmpObj = {};
			if (m >= 5) {
				if (numForCount%30 == 0 && numForCount != 0 && m == 5) {
					tmpObj.name = dbArray[nameArray[m]];
					tmpObj.gift = "FUJI拍立得";
					tmpObj.classN = "iconFu";
				} else if (numForCount%50 == 0 && numForCount != 0 && m == 6) {
					tmpObj.name = dbArray[nameArray[m]];
					tmpObj.gift = "Iphone6s";
					tmpObj.classN = "icon6";
				} else {
					tmpR = Math.floor(0+Math.random()*(5-0));
					tmpObj.name = dbArray[nameArray[m]];
					tmpObj.gift = gift[tmpR];
					tmpObj.classN = giftClass[tmpR];
				}
			} else {
				tmpR = Math.floor(0+Math.random()*(5-0));
				tmpObj.name = dbArray[nameArray[m]];
				tmpObj.gift = gift[tmpR];
				tmpObj.classN = giftClass[tmpR];
			}
			data.push(tmpObj);
		}
		return data;
	}

	/* 中间绘制 */
	function dataInsert() {
		var data = duckRandom();
		for (var i=0; i<data.length; i++) {
			var index = $(".dc_win ul li").eq(i);
			index.find("dt").attr("class", "iconT1 " + data[i].classN);
			index.find("h3").html(data[i].name);
			index.find(".dc_textB span").html(data[i].gift);
		}
	}
	/* 中奖播报 */
	setInterval(function(){
		numForCount++;
		dataInsert();
	}, 3000);

	/* page init */
	dataInsert();
});
