var currentUser = null;
var atualLocation;
const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
];
const date = new Date();

function main_list_food() {
    for (let i = 0; i < 10; i++) {
        food_item(recipes[i]);
    }
}

function food_item(recipe) {
    li = document.createElement("LI");
    li.setAttribute("class", "f_card f_container");
    a = document.createElement("a");
    // a.setAttribute("href", "#");

    img_food = document.createElement("img");
    img_food.setAttribute(
        "src",
        `${"static/data/img/" + recipe.Image_Name + ".jpg"}`
    );
    img_food.setAttribute("class", "f_img");

    div = document.createElement("div");
    div.setAttribute("class", "f_container");

    title = document.createElement("p");
    title.innerHTML = `<b>${recipe.Title} </b>`;

    description = document.createElement("DETAILS");
    summary = document.createElement("summary");
    summary.innerHTML = "Description";
    description.appendChild(summary);

    text = document.createElement("p");
    text.innerHTML =`<b>Ingredientes : </b>${recipe.Cleaned_Ingredients}
                    <p> <b> Instructions  : </b> ${recipe.Instructions} </p>`;

    description.appendChild(text)

    div.appendChild(title);
    div.appendChild(description);

    a.appendChild(img_food);
    a.appendChild(div);

    li.appendChild(a);

    document.getElementById("listfood").appendChild(li);
}

window.onload = function () {
    main_list_food();
};
