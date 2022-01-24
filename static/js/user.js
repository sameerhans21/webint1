var logged_in= false ;
var registration_form = document.querySelector('#registration_form');
//sessionStorage.clear() ;
var error_login=document.querySelector('#error_login');
var login_mail=null;
var registration_mail=null;
var section=document.querySelector('#main-container') ;
var mycanvas=document.querySelector('#mycanvas') ;
var sport_form=document.querySelector('#sport_form') ;
var bmi_form=document.querySelector('#bmi_form') ;
var dishes_form=document.querySelector('#dishes_form') ;
var user_display=document.querySelector('#user_display') ;
var title_user=document.querySelector('#title_user') ;
var bmi_display=document.querySelector('#bmi_display') ;
var age=document.querySelector('#age') ;
var favorite_dishes_display=document.querySelector('#bmi_display') ;  
var recommendations=document.querySelector('#recommendations') ;
var existing_account=document.querySelector('#existing_account') ;

registration_form.addEventListener('submit', function(event){
  event.preventDefault() ;
  registration_mail=registration_form.querySelector(`input[name=${'mail'}]`).value ;
  let user_info=[] ;
  user_info.push(registration_form.querySelector(`input[name=${'first_name'}]`).value)  ;
  user_info.push(registration_form.querySelector(`input[name=${'last_name'}]`).value)  ;
  user_info.push(registration_mail)  ;
  user_info.push(registration_form.querySelector(`input[name=${'age'}]`).value)  ;
        
  sessionStorage.setItem(registration_mail,JSON.stringify(user_info));   
  registration_form.style.display="none" ;
  existing_account.style.display="none" ;
  
  //personal_questions() ;
  sport_form.style.display="contents" ;
});

sport_form.addEventListener('submit', function(event){
  event.preventDefault() ;
  var everyday=document.querySelector('#everyday') ;
  var twomore=document.querySelector('#twomore') ;
  var oneless=document.querySelector('#oneless') ;
  var user_info=JSON.parse(sessionStorage.getItem(registration_mail));
  sessionStorage.removeItem(registration_mail) ;
  if (everyday.checked) 
    user_info.push("everyday") ;
  if (twomore.checked) 
    user_info.push("twomore") ;
  if (oneless.checked) 
    user_info.push("oneless") ;  
  sessionStorage.setItem(registration_mail,JSON.stringify(user_info));
  sport_form.style.display="none" ;
  bmi_form.style.display="contents" ;
});

bmi_form.addEventListener('submit', function(event){
  event.preventDefault() ;
  bmi_form.style.display="none" ;
  var user_info=JSON.parse(sessionStorage.getItem(registration_mail));
  sessionStorage.removeItem(registration_mail) ; user_info.push(bmi_form.querySelector(`input[name=${'height'}]`).value)  ; user_info.push(bmi_form.querySelector(`input[name=${'weight'}]`).value)  ;
  sessionStorage.setItem(registration_mail,JSON.stringify(user_info));
  dishes_form.style.display="contents" ;
});

dishes_form.addEventListener('submit', function(event){
  event.preventDefault() ;
  dishes_form.style.display="none" ;
  var user_info=JSON.parse(sessionStorage.getItem(registration_mail));
  sessionStorage.removeItem(registration_mail) ;
  var american=document.querySelector('#american') ;
  var indian=document.querySelector('#indian') ;
  var french=document.querySelector('#french') ;
  var italian=document.querySelector('#italian') ;
  var african=document.querySelector('#african') ;
  var japanese=document.querySelector('#japanese') ;
  if (american.checked) 
    user_info.push("American") ;
  if (italian.checked) 
    user_info.push("Italian") ;
  if (french.checked) 
    user_info.push("French") ;  
  if (african.checked) 
    user_info.push("African") ;  
  if (japanese.checked) 
    user_info.push("Japanese") ;  
  if (indian.checked) 
    user_info.push("Indian") ; 
 
  sessionStorage.setItem(registration_mail,JSON.stringify(user_info));
  userDisplay(registration_mail) ;
});


function userDisplay(mail) {
  user_display.style.display="contents" ;
  var user_info=JSON.parse(sessionStorage.getItem(mail));
  
  title_user.appendChild(document.createTextNode(user_info[0]+" "+user_info[1])) ;
  age.appendChild(document.createTextNode("Age : "+ user_info[3]+" years")) ;
  var bmi=Math.trunc(100*user_info[6]/(user_info[5]/100)**2)/100 ;
 
  for(i=7;i<user_info.length;i++){
    var dish_display=document.createElement("div") ;
    dish_display.appendChild(document.createTextNode("-"+user_info[i])) ;
    favorite_dishes_display.appendChild(dish_display) ;
  } 
  favorite_dishes_display.appendChild(document.createElement("p"))
  bmi_display.childNodes=[] ;
  bmi_display.appendChild(document.createTextNode("BMI (Body Mass Index) : "+bmi)) ;
  console.log(bmi)
  if (bmi<18.5) 
   recommendations.appendChild(document.createTextNode("Be careful, your BMI is below the recommended level, you should eat more. Use SnapFood searchbar to find a dish that suits you.")) ;
  if (18.5<=bmi<25) 
   recommendations.appendChild(document.createTextNode("You have a healthy BMI. You can eat whatever food you want.")) ; 
  
  if (25<=bmi<30) 
   recommendations.appendChild(document.createTextNode("Be careful, you are overweight. Use SnapFood searchbar to find healthy food that you like. ")) ;
  
  if (bmi>=30) 
     recommendations.appendChild(document.createTextNode("Be careful, you are obese. Use SnapFood searchbar to find healthy food that you like. ")) ;

}

function login(){
  
  registration_form.style.display="none" ;
  existing_account.style.display="none" ;
  login_form.style.display="contents" ;
}

login_form.addEventListener('submit', function(event){
  event.preventDefault() ;
  var login_mail=login_form.querySelector(`input[name=${'email'}]`).value ;
  if (sessionStorage.getItem(login_mail)){
    login_form.style.display="none" ;
    userDisplay(login_mail) ;
    
  }
    
    
});
  


                                 