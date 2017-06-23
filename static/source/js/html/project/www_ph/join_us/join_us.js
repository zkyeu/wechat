$(function(){
	var error_top=0,
	onOff=false;
	//topbar_hover
	new hover({
		el:".twinkle_line",
		h_el:".bar_list>ul",
		mouseout:"dis",
		current_page:"teach"
	});
	//footer_hover
	new hover({
		el:".f_twinkle_line",
		h_el:".notice>ul",
		mouseout:"dis",
		current_page:"teach"
	});
	//scrollTo
	function pos_to(x,y,callback){
		if(x==undefined||y==undefined)return;
		window.scrollTo(x,y);
		if(callback)callback();
	}
 
	//join-us
	  $("input,select").bind("focus",function(){
	  		$(this).parents(".j_group").find(".j_error").hide();
	  });
	  $(".certificatList span").on("click",function(){
	  		 $(".j_certError").hide();
	  });
	  $(".firstName").bind("blur",function(){  
	  		var firstName=$.trim($(".firstName").val());
	  		if(firstName==""){
	  			$(this).parents(".j_group").find(".j_error").show();
	  		}
	  });
	   $(".lastName").bind("blur",function(){
	  		var lastName=$.trim($(".lastName").val());
	  		if(lastName==""){
	  			$(this).parents(".j_group").find(".j_error").show();
	  		}
	  });
	   $(".email").bind("blur",function(){
	  		var email=$.trim($(".email").val());
	  		var emailreg = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i;
	  		if( email=="" ){
	  			$(this).parents(".j_group").find(".j_error").show();
	  			return false;
	  		}
	  		if( !emailreg.test(email)){
	  				$(this).parents(".j_group").find(".j_error").html("This email is not correct.").show();
	  				return false;
	  		}
	  		$.ajax({
	  			url: BASE_URL +"/phweb/page/ajaxCheckEmail",
	  			type: "post",
	  			dataType: "json",
	  			data:{email:email},
	  			success:function(data){   //10103 空 不合法
	  					if(data.code==20000){
	  						$(".email").parents(".j_group").find(".j_error").html("This email is taken.Try another").show();
	  					}
	  			}
	  		});	
	  });
	  $(".mobile").bind("blur",function(){
	  		var mobile=$.trim($(".mobile").val());
	  		var mobileReg=/^\d+$/;
	  		if(mobile==""){
	  			$(this).parents(".j_group").find(".j_error").html("This field is required").show();
	  			return false;
	  		}
	  		if(!mobileReg.test(mobile)){
	  			$(this).parents(".j_group").find(".j_error").html("Mobile number is invalid").show();
	  			return false;	
	  		}
	  		$.ajax({
	  			url: BASE_URL +"/phweb/page/ajaxCheckMobile",
	  			type: "post",
	  			dataType: "json",
	  			data:{mobile_number:mobile},
	  			success:function(data){  
	  					if(data.code==20000){
	  						$(".mobile").parents(".j_group").find(".j_error").html("This mobile is taken.Try another").show();
	  					}
	  			}
	  		});	
	  });
	  
	  //region and city
	   $(".regions").append('<option value="1000">'+'Region'+'</option>');
	   $(".citys").append('<option>'+'City'+'</option>');
	   $.get(BASE_URL + "/phweb/page/ajaxGetPhCity",'',function(data){

	   	//region
				var regions=data.res.regions;
				$.each(regions,function (i){
            $.each(regions[i],function(k,v){
               $(".regions").append('<option value='+v.id+' >'+v.name+'</option>');
            });
        });
				//city
				var citys=data.res.cities;
				$(".regions").change(function(){
						var regionVal=$(this).val();
						$(".citys").empty();
						$.each(citys,function (i){
	                if(regionVal == i){
	                    $.each(citys[i],function(k,v){
	                        $(".citys").append('<option value='+v.id+' >'+v.name+'</option>');
	                    });
	                }
	            });
						if(regionVal==1000){
								$(".citys").empty().append('<option>'+'City'+'</option>');
						}
				});
		});
	   $(".regions").bind("blur",function(){
	  		var regions=$.trim($(".regions").val());
	  		if(regions==""){
	  			$(this).parents(".j_group").find(".j_error").show();
	  		}
	  });
	   //Educational Attainment
	   $(".degrees").append('<option value="1000">'+'Degree'+'</option>');
	   $(".universitys").append('<option value="1000">'+'University'+'</option>');
	   $(".majors").append('<option value="1000">'+'Major'+'</option>');
	$.get(BASE_URL + "/phweb/page/ajaxGetEduAttainment",'',function(data){
	   	//degree
	   		var degrees=data.res.edu_attainment; 
        $.each(degrees,function(k,v){
          	$(".degrees").append('<option value="'+degrees[k]+'" >'+degrees[k]+'</option>');
        });
        //当第一个为默认值，其他俩也为默认值
        $(".degrees").change(function(){
        		var degreeVal=$(".degrees").val();
        		var oMajor= '<div class="j_group baseInfo">'+
                            '<div class="j_list j_left"> </div>'+
                            '<div class="j_list j_center"><i></i>'+
                                '<select name="" type="text" class="majors">'+
                                    '<option value="1000">Major</option>'+
                                '</select>'+
                            '</div>'+
                             '<div class="j_list j_right j_error">This field is required</div>'+
                         '</div>'
		        
		        if(degreeVal=="High School Graduate" || degreeVal=="Vocational Course"){  
		        		$(".majors").parents(".j_group").remove();
		        		return false;
		        }if(degreeVal==1000){  
		        		$(".universitys option:first").attr("selected",true);
		        		$(".majors option:first").attr("selected",true);

		        		if( $(".majors").length==0){ 
		        				$(".universitys").parents(".j_group").after(oMajor);
		        				$("input,select").bind("focus",function(){
									  		$(this).parents(".j_group").find(".j_error").hide();
									  });
		        		}else{
		        			 return false
		        		} 
		        		return false;
		        }else{  
		        		if( $(".majors").length==0){ 
		        				$(".universitys").parents(".j_group").after(oMajor);
		        				var majors=data.res.major;
						         $.each(majors,function(k,v){ 
						          	$(".majors").append('<option value="'+majors[k]+'" >'+majors[k]+'</option>');
						        });
						        $("input,select").bind("focus",function(){
									  		$(this).parents(".j_group").find(".j_error").hide();
									  }); 

		        		}else{
		        			 return false
		        		}
		        		return false;
		        }
        });
 				//当第二个为默认值，第三个为默认值
 				$(".universitys").change(function(){
 						var universityVal=$(".universitys").val();
 						if(universityVal==1000){
 								$(".majors option:first").attr("selected",true);
 								 $.each(majors,function(k,v){
					          	$(".majors").append('<option value="'+majors[k]+'" >'+majors[k]+'</option>');
					        }); 
 						}
 				});
        //University
        var universities=data.res.collage;
         $.each(universities,function(k,v){
          	$(".universitys").append('<option value="'+universities[k]+'" >'+universities[k]+'</option>');
        }); 
				//Major
				 var majors=data.res.major;
         $.each(majors,function(k,v){
          	$(".majors").append('<option value="'+majors[k]+'" >'+majors[k]+'</option>');
        });  
	   });

   //calendar
    $( "#datepicker" ).datepicker();
		var dateFormat = $( "#datepicker" ).datepicker( "option", "dateFormat" );
	  $( "#datepicker" ).datepicker( "option", "dateFormat", "yy-mm-dd" );
	   //minDate
		$( "#datepicker" ).datepicker({
		  minDate: new Date()
		});
		var minDate = $( "#datepicker" ).datepicker( "option", "minDate" );
		$( "#datepicker" ).datepicker( "option", "minDate", '1d' );
    //getvalue
 	 //var currentDate = $( "#datepicker" ).datepicker( "getDate" );
 
   //Certificat
		$(".certificatList .j_none").on("click",function(){
				$(this).addClass("active");
				$(".certificatList .j_have").removeClass("active");
				$(".j_upload").hide();
		});
		$(".certificatList .j_have").toggle(function(){  
				var spanVal=$(this).attr("data");
        $(".certificatList .j_none").removeClass("active");
				$(this).addClass("active");
				$(".j_upload").show();
		},function(){ 
				$(this).removeClass("active");
				var activeLength=$(".certificatList").find(".active").length;
				if(activeLength==0){
					$(".j_upload").hide();
				}
		});
 
	//Resume uploadCertificat upload 
		$(".uploadResume").change(function(){  
				var pathVal=$(this).val();
		    var pathArr = pathVal.split('\\');
		    var fileName=pathArr[pathArr.length-1];
		    var _this=$(this);
			  var fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
			  if(fileExtension!="doc" && fileExtension!="docx") {
			  		  _this.parents(".j_group").find(".j_error").show().html("Upload Your Resume in doc,docx !");;
			  		  _this.parents(".j_group").find(".filePath").val("");
			  		  _this.parents(".j_group").find("em").hide();
			  }else{
			  	   _this.parents(".j_group").find(".filePath").val(pathVal);
			  	   _this.parents(".j_group").find(".j_error").hide();
			  	   _this.parents(".j_group").find("em").show();
			  }	 
		});
		$(".uploadCertificat").change(function(){  
				var pathVal=$(this).val();
		    var pathArr = pathVal.split('\\');
		    var fileName=pathArr[pathArr.length-1];
		    var _this=$(this);
			  var fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1).toUpperCase();
			  if(fileExtension!="JPG" && fileExtension!="PNG") {
			  		  _this.parents(".j_group").find(".j_error").show().html("Upload a proof in JPG or PNG !");;
			  		  _this.parents(".j_group").find(".filePath").val("");
			  		  _this.parents(".j_group").find("em").hide();
			  }else{
			  	   _this.parents(".j_group").find(".filePath").val(pathVal);
			  	   _this.parents(".j_group").find(".j_error").hide();
			  	   _this.parents(".j_group").find("em").show();
			  }	 
		});

	//form	 
	 $(".do-submit a").on("click",function(){
	 		 var firstName=$.trim($(".firstName").val());
	 		 var lastName=$.trim($(".lastName").val());
	 		 var email=$.trim($(".email").val());
	 		 var mobile=$.trim($(".mobile").val());
	 		 var regions=$(".regions").val();
 		   var degrees=$(".degrees").val();
 		   var universitys=$(".universitys").val();
 		   var majors=$(".majors").val();
 		   var internet=$("select[name='internet']").val();
 		   var interview_date=$(".interview_date").val();
 		   var interview_time=$("select[name='interview_time']").val();
 		   var esl_tea_exp=$("select[name='esl_tea_exp']").val();
 		   var certificatArr=[];

 		   $(".certificatList .active").each(function(){
 		   		 var thisData=$(this).attr("data");
 		   		 certificatArr.push(thisData);
 		   });
 		    $("#certificate_hidden").val(certificatArr);
 		    var certificate=$("#certificate_hidden").val();
 		    var flag=true;
	 			if( firstName=="" || lastName==""){
	 					$(".firstName").parents(".j_group").find(".j_error").show();
	 					flag=false;
	 			}
	 			if(email==""){
	 					$(".email").parents(".j_group").find(".j_error").show();
	 					flag=false;
	 			}	
	 			if(mobile==""){
	 					$(".mobile").parents(".j_group").find(".j_error").show();
	 					flag=false;
	 			}
	 			if(regions==1000){
	 					$(".regions").parents(".j_group").find(".j_error").show();
	 					flag=false;
	 			}
	 			if(degrees==1000){
	 					$(".degrees").parents(".j_group").find(".j_error").show();
	 					flag=false;
	 			}
	 			if(universitys==1000){
	 					$(".universitys").parents(".j_group").find(".j_error").show();
	 					flag=false;
	 			}
	 			if(majors==1000){ 
	 					$(".majors").parents(".j_group").find(".j_error").show();
	 					flag=false;
	 			}
	 			if(internet==1){ 
	 					$("select[name='internet']").parents(".j_group").find(".j_error").show();
	 					flag=false;
	 			}
	 			if(interview_date==""){
	 					$(".interview_date").parents(".j_group").find(".j_error").show();
	 					flag=false;
	 			}
	 			if(interview_time==0){
	 					$("select[name='interview_time']").parents(".j_group").find(".j_error").show();
	 					flag=false;
	 			}
	 			if(esl_tea_exp==""){
	 					$("select[name='esl_tea_exp']").parents(".j_group").find(".j_error").show();
	 					flag=false;
	 			}
	 			if(certificate==""){
	 					$(".j_certError").show();
	 					flag=false;
	 			}
	 			//找到第一个报错的位置，屏幕移动到相应位置
	 			$(".j_error").each(function(i,v){
	 				if($(v).css("display")=='block'){
	 					error_top=$(v).offset().top-100;
	 					onOff=true;//当第一次赋值完毕后，跳出
	 				}
					if(onOff)return false;
	 			})
	 			pos_to(0,error_top,function(){
	 				onOff=false;//重置开关
	 			})
	 			//window.scrollTo(0,error_top)
	 			if(flag){
	 				  $(".do-submit").removeClass(".do-submit");
	 					$("#join-form").submit();
	 			}
	 			 
	 });
		$("#join-form").keydown(function(e){
			 var e = e || event,
			 keycode = e.which || e.keyCode;
			 if (keycode==13) {
			  	$(".do-submit a").trigger("click");
			 }
		});

});