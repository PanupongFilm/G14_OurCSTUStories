/*sidebar*/
function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}

/*=========================================================================================================*/
/*New function for rating*/
function rate(n) {
    remove();
    for (let i = 0; i < n; i++) {
        flower[i].className = "rating selected";
        flower[i].textContent = "✿";
    }
    updateEmoji(n);
}

function remove() {
    Array.from(flower).forEach((f) => {
        f.className = "rating";
        f.textContent = "❀";
    });
}

function updateEmoji(rating) {
    const emojis = [
        "1! {{{(˃̣̣̥ᯅ˂̣̣̥)}}}",
        "2!! ( ｡ •̀ ⤙ •́ ｡ )",
        "3!!! ~(ㆆᴗㆆ)~~♪",
        "4!!!! ⸜(｡˃ ᵕ ˂ )⸝♡",
        "5!!!!! ✧˖°(≧ヮ≦) ⊹˚. ♡",
    ];
    emoji.textContent = emojis[rating - 1];
}

const flower = document.getElementsByClassName("rating");

/*=========================================================================================================*/
// Event Listener for Star Ratings
const rateInputs = document.querySelectorAll('.RateUs input[name="star"]');
rateInputs.forEach((ratingInput) => {
    ratingInput.addEventListener('change', (event) => {
        const rating = event.target.value;
        console.log(`Selected Rating: ${rating}`);
    });
});

// Load existing data from Local Storage
const outputDiv = document.getElementById("output");
let guestBookEntries = JSON.parse(localStorage.getItem("guestBookEntries")) || [];

// Render guest book entries on page load
document.addEventListener("DOMContentLoaded", updateOutput);

const rateLabels = document.querySelectorAll('.RateUs label');
let selectedRating = null; // To store the selected rating

rateLabels.forEach((label) => {
    label.addEventListener('click', (event) => {
        // Clear any previous selection
        rateLabels.forEach((lbl) => lbl.classList.remove('selected'));

        // Mark the clicked label as selected
        event.target.classList.add('selected');

        // Get the value from the clicked label
        selectedRating = event.target.getAttribute('data-value');
        console.log(`Selected Rating: ${selectedRating}`);
    });
});

// Handle form submission
function handleSubmit() {
    const Username = document.getElementById("Username").value;
    const email = document.getElementById("email").value;
    const role = document.getElementById("role").value;
    const comment = document.getElementById("comment").value;

    if (!Username || !email || !role || !comment) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน!");
        return;
    }

    if (!selectedRating) {
        alert("Please select a rating!");
        return;
    }

    const entry = { Username, email, role, star: selectedRating, comment };
    guestBookEntries.push(entry);
    localStorage.setItem("guestBookEntries", JSON.stringify(guestBookEntries));
    updateOutput();
    document.getElementById("guest_Form").reset();
}

// Update output
function updateOutput() {
    outputDiv.innerHTML = ""; // Clear previous entries

    guestBookEntries.forEach((entry, index) => {
        const flowerRating =
            entry.star !== "No Rating" ? "✿".repeat(parseInt(entry.star)) : "No Rating";
        const entryDiv = document.createElement("div");
        entryDiv.className = "guest-entry";
        entryDiv.innerHTML = `
            <h3><strong>Guest Number : ${index + 1}</strong></h3>
            <p class="name">${entry.Username}</p>
            <p><strong>email :</strong> ${entry.email}</p>
            <p><strong>Role :</strong> ${entry.role}</p>
            <p><strong>Rating :</strong> ${flowerRating} (${entry.star}/5)</p>
            <p><strong>Comment :</strong> ${entry.comment}</p>
            <hr>
        `;
        outputDiv.appendChild(entryDiv);
    });
}
/*=========================================================================================================*/
//menuBar toggling
function toggleMenu() {
    x.classList.toggle("change");
}
/*=========================================================================================================*/
document.getElementsByClassName('RateUs').addEventListener('change', (event) => {
    if (event.target.name === 'rating') {
        const rating = event.target.value;
        console.log(`Selected Rating: ${rating}`);

        // Send rating to the server
        postData('/rate', { rating });
    }
});

async function postData(url = '', data = {}) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log('Server Response:', result);
    } catch (error) {
        console.error('Error:', error);
    }
}
/*=========================================================================================================*/
/*const rateInputs = document.querySelectorAll('.RateUs input[name="star"]');
rateInputs.forEach((ratingInput) => {
    ratingInput.addEventListener('change', (event) => {
        const rating = event.target.value;
        console.log(`Selected Rating: ${rating}`);
    });
});
// ดึงองค์ประกอบ HTML
const outputDiv = document.getElementById("output");

// ตรวจสอบว่า Local Storage มีข้อมูลหรือไม่
let guestBookEntries = JSON.parse(localStorage.getItem("guestBookEntries")) || [];

// โหลดข้อมูลเก่าเมื่อเปิดหน้าเว็บ
document.addEventListener("DOMContentLoaded", updateOutput);

// ฟังก์ชันสำหรับจัดการเมื่อกด Submit
function handleSubmit() {
    //ดึงค่าจากฟอร์ม
    const Username = document.getElementById("Username").value;
    const email = document.getElementById("email").value;
    const role = document.getElementById("role").value;
    const star = document.querySelector("input[name='star']:checked")?.value || "No Rating";
    const comment = document.getElementById("comment").value;

    if (!Username || !email || !role || !comment) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน!");
        return;
    }

    if (star === "No Rating") {
        alert("Please select a rating!");
        return;
    }

    const entry = { Username, email, role, star, comment };
    guestBookEntries.push(entry);
    localStorage.setItem("guestBookEntries", JSON.stringify(guestBookEntries));
    updateOutput();
    document.getElementById("guest_Form").reset();
}

// สร้างออบเจ็กต์สำหรับเก็บข้อมูล
const entry = {
    Username,
    email,
    role,
    star,
    comment,
};

// เพิ่มข้อมูลลงในอาร์เรย์
guestBookEntries.push(entry);

// บันทึกข้อมูลลงใน Local Storage
localStorage.setItem("guestBookEntries", JSON.stringify(guestBookEntries));

// อัพเดตการแสดงผล
function updateOutput() {
    outputDiv.innerHTML = "";
    guestBookEntries.forEach((entry, index) => {
        const flowerRating = entry.star !== "No Rating" ? "✿".repeat(parseInt(entry.star)) : "No Rating";
        const entryDiv = document.createElement("div");
        entryDiv.className = "guest-entry";
        entryDiv.innerHTML = `
            <h3><strong>Guest Number : ${index + 1}</strong></h3>
            <p class="name">${entry.Username} </p>
            <p><strong>email :</strong> ${entry.email}</p>
            <p><strong>Role :</strong> ${entry.role}</p>
            <p><strong>Rating :</strong> ${flowerRating} ${entry.star}</p>
            <p><strong>Comment :</strong> ${entry.comment}</p>
            <hr>
        `;
        outputDiv.appendChild(entryDiv);
    });
}

// ล้างค่าในฟอร์มหลังจากเพิ่มข้อมูล
document.getElementById("guest_Form").reset();

// ฟังก์ชันอัพเดตข้อมูลในหน้าเว็บ
function updateOutput() {
    // ล้างข้อมูลเก่า
    outputDiv.innerHTML = "";

    // แสดงรายการทั้งหมด
    guestBookEntries.forEach((entry, index) => {
        const flowerRating = "✿".repeat(entry.star);
        const entryDiv = document.createElement("div");
        entryDiv.className = "guest-entry";
        entryDiv.innerHTML = `
            <h3><strong>Guest Number : ${index + 1}</strong></h3>
            <p class="name">${entry.Username} </p>
            <p><strong>email :</strong> ${entry.email}</p>
            <p><strong>Role :</strong> ${entry.role}</p>
            <p><strong>Rating :</strong> ${flowerRating} ${entry.star}</p>
            <p><strong>Comment :</strong> ${entry.comment}</p>
            <hr>
        `;
        outputDiv.appendChild(entryDiv);
    });
}*/
/*=========================================================================================================*/
/*GuestBook: Rate us!*/
/*let flower = document.getElementsByClassName("rating");
let emoji = document.getElementById("emoji");

function rate(n) {
    remove();
    for (let i = 0; i < n; i++) {
        if (n == 1) cls = "one";
        else if (n == 2) cls = "two";
        else if (n == 3) cls = "three";
        else if (n == 4) cls = "four";
        else if (n == 5) cls = "five";
        flower[i].className = "rating" + cls;
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
}*/