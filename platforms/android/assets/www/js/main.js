"use strict";

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
   
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    
    onDeviceReady: function() {
        app.receivedEvent();
    },
    // Update DOM on a Received Event
    receivedEvent: function() {
       var pages = document.querySelectorAll("[data-role=page]");
            [].forEach.call(pages, function(obj, index){
            obj.className = "inactive-page";
            if(index==0){
            obj.className = "active-page";
            }
            });

            //called after DOMContentLoaded
            var navi=document.querySelector(".btnfab");
            var navmobilehammer = new Hammer(navi);
            navmobilehammer.on('tap', function(ev){
                        console.log("Tapped");
                    document.getElementById("title").value="";
                    document.getElementById("review").value="";
                    document.getElementById("dispimg").src=null;
                    var rating=document.getElementsByName("rating");
                    for(var i=0;i<rating.length;i++)
                        {
                            if(rating[i].checked)
                                {
                                    rating[i].checked=false;
                                }
                        }
                    
		                  app.navigate(ev);
	           }); 
             var naviback=document.querySelector(".back");
            var navmobileback = new Hammer(naviback);
            navmobileback.on('tap', function(ev){
                        console.log("Tapped");
                 naviback.setAttribute("data-href","listreview");
		                  app.navigate(ev);
                    app.refreshList();
                      
	           }); 
             var naviback1=document.querySelector(".back1");
            var navmobileback1 = new Hammer(naviback1);
            navmobileback1.on('tap', function(ev){
                naviback1.setAttribute("data-href","listreview");
                        console.log("Tapped");
		                  app.navigate(ev);
               
                   
	           }); 
            
            var checkreview=document.querySelector("#checkreview");
            var navmobilecheckreview=new Hammer(checkreview);
            navmobilecheckreview.on('tap',function(ev){
                 checkreview.setAttribute("data-href","listreview");
                
                app.navigate(ev);
                
            })
            var cls=document.querySelector("#close");
            var navcls=new Hammer(cls);
            navcls.on('tap',function(ev){
                        cls.setAttribute("data-href","listreview");
                      app.navigate(ev);
                app.refreshList();
                  
            })
            
            var ck=document.querySelector('#check');
            var navck=new Hammer(ck);
            navck.on('tap',function(ev){
                app.saveData(ev);
            })
            
            var cm=document.getElementById("camera");
            var navcm=new Hammer(cm);
            navcm.on('tap',function(ev){
                 navigator.camera.getPicture(imgSuccess, imgFail, {quality : 75,

                      destinationType: Camera.DestinationType.DATA_URL,

                      sourceType: Camera.PictureSourceType.CAMERA,

                      targetWidth : 100,

                      targetHeight : 100,

                      cameraDirection : Camera.Direction.FRONT,

                      saveToPhotoAlbum : false})
           
                 function imgSuccess(data)
                 {
                    var img= "data:image/jpeg;base64,"+data;
                    img=encodeURIComponent(img);
                    console.log(img);
                    document.getElementById("camera").setAttribute("image",img);
                   document.getElementById("dispimg").src=decodeURIComponent(img);
                     
                }
                function imgFail(message)
                    {
                        console.log("Image failed to capture"+message);
                    }

            })
            
//            document.querySelector(".btnfab").addEventListener("click",app.navigate);
//            document.querySelector(".back").addEventListener("click",app.navigate);
//            document.querySelector(".back").setAttribute("data-href","listreview");
//            document.querySelector(".back1").addEventListener("click",app.navigate);
//             document.querySelector(".back1").setAttribute("data-href","listreview");
//            document.querySelector("#checkreview").setAttribute("data-href","listreview");
//            document.querySelector("#checkreview").addEventListener("click",app.navigate);
//            document.querySelector("#close").setAttribute("data-href","listreview");
//            document.querySelector("#close").addEventListener("click",app.navigate);
//            document.querySelector('#check').addEventListener("click",app.saveData);
//             document.getElementById("camera").addEventListener("click",function(){
//                            
//                    navigator.camera.getPicture(imgSuccess, imgFail, {quality : 75,
//
//                      destinationType: Camera.DestinationType.DATA_URL,
//
//                      sourceType: Camera.PictureSourceType.CAMERA,
//
//                      allowEdit : true,
//
//                      targetWidth : 100,
//
//                      targetHeight : 100,
//
//                      cameraDirection : Camera.Direction.FRONT,
//
//                      saveToPhotoAlbum : false})
//           
//                 function imgSuccess(data)
//                 {
//                    var img= "data:image/jpeg;base64,"+data;
//                    img=encodeURIComponent(img);
//                    console.log(img);
//                    document.getElementById("camera").setAttribute("image",img);
//                     
//                }
//                function imgFail(message)
//                    {
//                        console.log("Image failed to capture"+message);
//                    }
//           });
            //get list of thigs for the home page
            app.getList();
    },
    refreshList:function()
    {
        document.querySelector("#listreview ul").innerHTML="";
        app.getList();
    },
     getList:function(){
            var xhr=new XMLHttpRequest();
            xhr.open("POST","https://griffis.edumedia.ca/mad9022/reviewr/reviews/get/");

            xhr.addEventListener("load",function(ev){
                var response=JSON.parse(xhr.responseText);
                console.log(response.reviews);
                console.log(response.reviews.length);
                for(var i=0;i<response.reviews.length;i++)
                { 
                    var li=document.createElement("li");
                    li.textContent=response.reviews[i].title;
                   
                    if(response.reviews[i].rating==1)
                    {
                        var img=document.createElement('img');
                        img.src="img/filled.png";
                        img.width="50";
                        img.height="25" ;
                        img.className="lirating"
                        li.appendChild(img);
                    }
                    if(response.reviews[i].rating==2)
                    {
                        for(var j=0;j<2;j++)
                        {
                            var img=document.createElement('img');
                            img.src="img/filled.png";
                            img.width="50";
                            img.height="25";
                            img.className="lirating"
                            li.appendChild(img);
                        }
                    }
                    if(response.reviews[i].rating==3)
                    {
                        for(var j=0;j<3;j++)
                        {
                            var img=document.createElement('img');
                            img.src="img/filled.png";
                            img.width="50";
                            img.height="25";
                            img.className="lirating"
                            li.appendChild(img);
                        }
                    }
                    if(response.reviews[i].rating==4)
                    {
                        for(var j=0;j<4;j++)
                        {
                            var img=document.createElement('img');
                            img.src="img/filled.png";
                            img.width="50";
                            img.height="25";
                            img.className="lirating"
                            li.appendChild(img);
                        }
                    }
                    if(response.reviews[i].rating==5)
                    {
                        for(var j=0;j<5;j++)
                        {
                            var img=document.createElement('img');
                            img.src="img/filled.png";
                            img.width="50";
                            img.height="25";
                            img.className="lirating"
                            li.appendChild(img);
                        }
                    }
                   

                    li.setAttribute("data-href","readreview");
                    li.setAttribute("data-id",response.reviews[i].id);

                    li.addEventListener("click",function(){
                        var url=this.getAttribute("data-href");
                        history.pushState({"page":url},null,"#" + url);
                        var pages = document.querySelectorAll("[data-role=page]");
                        for(var p=0; p<pages.length; p++){
                            if(pages[p].id === url)
                            {
                                pages[p].classList.remove("hidden");
                                if(pages[p].className !== "active-page")
                                {
                                    pages[p].className = "active-page";
                                }
                            }
                            else
                            {
                                if(pages[p].className !== "inactive-page")
                                {
                                    pages[p].className = "inactive-page";
                                }
                            }
                        }

                        var id=this.getAttribute("data-id");
                        console.log(id);
                        var img;
                        var xhr=new XMLHttpRequest();
                        xhr.open("POST","https://griffis.edumedia.ca/mad9022/reviewr/review/get/");
                        var params1=new FormData();
                        params1.append("uuid",device.uuid);
                        params1.append("review_id",id);
                        xhr.send(params1); 
                        xhr.addEventListener("load",function(ev){
                        var response=JSON.parse(xhr.responseText);
                            console.log(response);
                            console.log(response.review_details.title);
                            document.getElementById("fetchedtitle").innerHTML=response.review_details.title;
                            document.getElementById("fetchedreview").innerHTML=response.review_details.review_txt;
                             var division=document.getElementById("displayrate");
                            division.innerHTML="";
                              if(response.review_details.rating==1)
                                {
                                               
                                        var img=document.createElement("img");
                                        img.src="img/filled.png";
                                        img.width="20";
                                        img.height="18";
                                        division.appendChild(img);
                                        
                                }
                            if(response.review_details.rating==2)
                                {
                                    for(var i=0;i<2;i++)
                                        {
                                            
                                            var img=document.createElement("img");
                                            img.src="img/filled.png";
                                            img.width="20";
                                            img.height="18";
                                            division.appendChild(img);
                                        }
                                }
                            if(response.review_details.rating==3)
                                {
                                    for(var i=0;i<3;i++)
                                        {
                                           
                                            var img=document.createElement("img");
                                            img.src="img/filled.png";
                                            img.width="20";
                                            img.height="18";
                                            division.appendChild(img);
                                           
                                         }
                                  }
                            if(response.review_details.rating==4)
                                {
                                    for(var i=0;i<4;i++)
                                        {
                                            var img=document.createElement("img");
                                            img=document.createElement('img');
                                            img.src="img/filled.png";
                                            img.width="20";
                                            img.height="18";
                                           division.appendChild(img);
                                         }
                                    
                                }
                            if(response.review_details.rating==5)
                            {
                                for(var i=0;i<5;i++)
                                        {
                                            var img=document.createElement('img');
                                            img.src="img/filled.png";
                                            img.width="20";
                                            img.height="18";
                                           division.appendChild(img);
                                         }
                                
                            }
                            
//                            document.querySelector("#displayrate").appendChild(division);
                            document.getElementById("displayimg").src=decodeURIComponent(response.review_details.img);
                        });
                   
                    });
                document.querySelector("#listreview ul").appendChild(li);
               
                }
            });
            xhr.addEventListener("error",function(ev){
            });
            var params=new FormData();
            params.append("uuid",device.uuid);
            xhr.send(params);
        },
     navigate:function(ev)
        {
            ev.preventDefault();
            var url=ev.target.getAttribute("data-href");
            console.log(url);
            history.pushState({"page":url},null,"#" + url);
            var pages = document.querySelectorAll("[data-role=page]");
          
            for(var p=0; p<pages.length; p++)
            {
                if(pages[p].id === url)
                {
                    pages[p].classList.remove("hidden");
                    if(pages[p].className !== "active-page")
                    {
                        pages[p].className = "active-page";
                    }
                }
                else
                {
                    if(pages[p].className !== "inactive-page")
                    {
                        pages[p].className = "inactive-page";
                    }
                }
            }
        },
     saveData:function(ev)
        {
            var cnt=0;
            var title=document.getElementById("title").value;
            var review=document.getElementById("review").value;
            var rating=document.getElementsByName("rating");
            var rate;
            var filepath;
             var img;
            for (var i = 0; i < rating.length; i++) 
            {
                if(rating[i].checked)
                    rate=rating[i].value;
            }
            if(rate==undefined)
            {
                    rate=0;
            }
            console.log(rate);
           var img=document.getElementById("camera").getAttribute("image");
            console.log(img);
//            if(title==null || title=="")
//                {
//                    alert("Please enter title");
//                }
//            if(review==null || review=="")
//                {
//                    alert("Please enter review");
//                }
//            if(img==null)
//                {
//                    alert("Please take a picture")
//                }
//            if(title!=null && title!="" && review!=null && review!="" && img!=null)
//                {
            var xhr=new XMLHttpRequest();
            xhr.open("POST","https://griffis.edumedia.ca/mad9022/reviewr/review/set/");
            
            var sendparams=new FormData();
             sendparams.append("uuid",device.uuid);
                console.log("UUID"+device.uuid);
             sendparams.append("action","insert");
            console.log("Title is:"+title);
            console.log("Review is:"+review);
             sendparams.append("title",title);
            sendparams.append("review_txt",review);
            sendparams.append("rating",rate);
            
            sendparams.append("img",img);
            
             xhr.send(sendparams); 
            
            xhr.addEventListener("load",function(ev){
                var xhr=ev.target;
                var response=JSON.parse(xhr.responseText);
                if(response.code==0)
                    {
                        console.log("Record added successfully");
                        alert("Record Added Successfully!!!");
                    }
                else
                    {
                        console.log("Record not added successfully");
                        
                    }
            });
             xhr.addEventListener("error",function(ev){
                
            });
            
//            }
        }
       
    
};

app.initialize();
