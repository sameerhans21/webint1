var logged_in = false;

function userDisplay(mail) {
  user_display.style.display = "initial";
  var user_info = JSON.parse(sessionStorage.getItem(mail));

  title_user.appendChild(
    document.createTextNode(user_info[0] + " " + user_info[1])
  );
  age.appendChild(document.createTextNode("Age : " + user_info[3] + " years"));
  var bmi = Math.trunc((100 * user_info[6]) / (user_info[5] / 100) ** 2) / 100;

  for (i = 7; i < user_info.length; i++) {
    var dish_display = document.createElement("div");
    dish_display.appendChild(document.createTextNode("-" + user_info[i]));
    favorite_dishes_display.appendChild(dish_display);
  }
  favorite_dishes_display.appendChild(document.createElement("p"));
  bmi_display.childNodes = [];
  bmi_display.appendChild(
    document.createTextNode("BMI (Body Mass Index) : " + bmi)
  );
  console.log(bmi);
  if (bmi < 18.5)
    recommendations.appendChild(
      document.createTextNode(
        "Be careful, your BMI is below the recommended level, you should eat more. Use SnapFood searchbar to find a dish that suits you."
      )
    );
  if (18.5 <= bmi & bmi < 24)
    recommendations.appendChild(
      document.createTextNode(
        "You have a healthy BMI. You can eat whatever food you want."
      )
    );

  if (25 <= bmi & bmi < 30)
    recommendations.appendChild(
      document.createTextNode(
        "Be careful, you are overweight. Use SnapFood searchbar to find healthy food that you like. "
      )
    );

  if (bmi >= 30)
    recommendations.appendChild(
      document.createTextNode(
        "Be careful, you are obese. Use SnapFood searchbar to find healthy food that you like. "
      )
    );
}



function showLogin(event) {
  user_display.style.display = "none";
  login_form.style.display = "initial";

  registration_form.style.display = "none";
  event.preventDefault();
}

window.onload = function () {

  const existing_account = document.querySelector('#existing_account');
  const user_display = document.querySelector("#user_display");
  const registration_form = document.querySelector("#registration_form");
  const login_form = document.querySelector("#login_form");
  const title_user = document.querySelector("#title_user");
  const bmi_display = document.querySelector("#bmi_display");
  const age = document.querySelector("#age");
  const favorite_dishes_display = document.querySelector("#bmi_display");
  const recommendations = document.querySelector("#recommendations");

  existing_account.onclick = function (event) {
    showLogin(event);
  };


  registration_form.addEventListener("submit", function (event) {

    event.preventDefault();
    registration_mail = registration_form.querySelector(
      `input[name=${"mail"}]`
    ).value;
    let user_info = [];
    user_info.push(
      registration_form.querySelector(`input[name=${"first_name"}]`).value
    );
    user_info.push(
      registration_form.querySelector(`input[name=${"last_name"}]`).value
    );
    user_info.push(registration_mail);
    user_info.push(
      registration_form.querySelector(`input[name=${"age"}]`).value
    );

    var everyday = document.querySelector("#everyday");
    var twomore = document.querySelector("#twomore");
    var oneless = document.querySelector("#oneless");
    if (everyday.checked) user_info.push("everyday");
    if (twomore.checked) user_info.push("twomore");
    if (oneless.checked) user_info.push("oneless");

    user_info.push(registration_form.querySelector(`input[name=${"height"}]`).value);
    user_info.push(registration_form.querySelector(`input[name=${"weight"}]`).value);

    var american = document.querySelector("#american");
    var indian = document.querySelector("#indian");
    var french = document.querySelector("#french");
    var italian = document.querySelector("#italian");
    var african = document.querySelector("#african");
    var japanese = document.querySelector("#japanese");
    if (american.checked) user_info.push("American");
    if (italian.checked) user_info.push("Italian");
    if (french.checked) user_info.push("French");
    if (african.checked) user_info.push("African");
    if (japanese.checked) user_info.push("Japanese");
    if (indian.checked) user_info.push("Indian");

    sessionStorage.setItem(registration_mail, JSON.stringify(user_info));

    registration_form.style.display = "none";
    existing_account.style.display = "none";

    userDisplay(registration_mail);

  });


  login_form.addEventListener("submit", function (event) {
    event.preventDefault();
    var login_mail = login_form.querySelector(`input[name=${"email"}]`).value;
    if (sessionStorage.getItem(login_mail)) {
      login_form.style.display = "none";
      userDisplay(login_mail);
    }
  });



};
