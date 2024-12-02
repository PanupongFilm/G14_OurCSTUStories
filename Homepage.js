/*GuestBook: Rate us!
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
}*

/*=========================================================================================================*/
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

// ดึงองค์ประกอบ HTML
const outputDiv = document.getElementById("output");

// ตรวจสอบว่า Local Storage มีข้อมูลหรือไม่
let guestBookEntries = JSON.parse(localStorage.getItem("guestBookEntries")) || [];

// โหลดข้อมูลเก่าเมื่อเปิดหน้าเว็บ
document.addEventListener("DOMContentLoaded", updateOutput);

// ฟังก์ชันสำหรับจัดการเมื่อกด Submit
function handleSubmit() {
    // ดึงค่าจากฟอร์ม
    const Username = document.getElementById("Username").value;
    const email = document.getElementById("email").value;
    const role = document.getElementById("role").value;
    const star = document.querySelector("input[name='star']:checked")?.value || "No Rating";
    const comment = document.getElementById("comment").value;

    // ตรวจสอบว่ากรอกข้อมูลครบหรือยัง
    if (!Username || !email || !role || !comment) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน!");
        return;
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
    updateOutput();

    // ล้างค่าในฟอร์มหลังจากเพิ่มข้อมูล
    document.getElementById("guest_Form").reset();
}

// ฟังก์ชันอัพเดตข้อมูลในหน้าเว็บ
function updateOutput() {
    // ล้างข้อมูลเก่า
    outputDiv.innerHTML = "";

    // แสดงรายการทั้งหมด
    guestBookEntries.forEach((entry, index) => {
        const entryDiv = document.createElement("div");
        entryDiv.className = "guest-entry";
        entryDiv.innerHTML = `
            <h3><strong>Guest Number : ${index + 1}</strong></h3>
            <p class="name">${entry.Username} </p>
            <p><strong>email :</strong> ${entry.email}</p>
            <p><strong>Role :</strong> ${entry.role}</p>
            <p><strong>Rating :</strong> ${entry.star} <span>✿</span></p>
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