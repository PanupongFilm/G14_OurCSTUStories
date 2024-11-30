//GuestBook: Rate us!
let flower = document.getElementsByClassName("rating");
let emoji = document.getElementById("emoji");

function rate(n) {
    remove();
    for (let i = 0; i < n; i++) {
        if (n == 1) cls = "one";
        else if (n == 2) cls = "two";
        else if (n == 3) cls = "three";
        else if (n == 4) cls = "four";
        else if (n == 5) cls = "five";
        flower[i].className = "rating " + cls;
        flower[i].textContent = "✿";
    }
    updateEmoji(n);
}

function remove() {
    let i = 0;
    while (i < 5) {
        flower[i].className = "rating";
        flower[i].textContent = "❀";
        i++;
    }
}

function updateEmoji(rating) {
    let reaction = "";
    if (rating === 1) reaction = "1! {{{(˃̣̣̥ᯅ˂̣̣̥)}}}";
    else if (rating === 2) reaction = "2!! ( ｡ •̀ ⤙ •́ ｡ )";
    else if (rating === 3) reaction = "3!!! ~(ㆆᴗㆆ)~~♪";
    else if (rating === 4) reaction = "4!!!! ⸜(｡˃ ᵕ ˂ )⸝♡";
    else if (rating === 5) reaction = "5!!!!! ✧˖°(≧ヮ≦) ⊹˚. ♡";
    emoji.textContent = reaction;
}