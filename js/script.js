/* NAV ACTIVE */
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop - 120) {
      current = sec.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

/* NAME TYPING */
const nameText = "Saurabh Shirole";
let i = 0;
function typeName() {
  if (i < nameText.length) {
    document.getElementById("name-typing").textContent += nameText[i++];
    setTimeout(typeName, 120);
  }
}
typeName();

/* PDF MODAL */
const modal = document.getElementById("resumeModal");
const viewer = document.getElementById("pdfViewer");
document.querySelector(".resume-close").onclick = () => {
  modal.style.display = "none";
  viewer.src = "";
};
function openPDF(path) {
  viewer.src = path;
  modal.style.display = "block";
}
window.onclick = e => {
  if (e.target === modal) modal.style.display = "none";
};

/* EMAILJS INIT */
(function () {
  emailjs.init("ci5GBxbZZ4jPoEcYv"); // ✅ Public Key
})();

/* CONTACT FORM SUBMIT */
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = this;

  // 1️⃣ Send email to YOU (Admin email)
  emailjs.sendForm(
    "service_a6iydw4",
    "template_zgeu1vb", // ✅ your main template
    form
  ).then(() => {

    // 2️⃣ Send AUTO-REPLY to USER
    emailjs.sendForm(
      "service_a6iydw4",
      "template_uuzj0nk", // 🔴 replace with auto-reply template ID
      form
    );

    showToast("Message sent successfully!");
    form.reset();

  }).catch((error) => {
    console.error("EmailJS Error:", error);
    showToast("Failed to send message", true);
  });
});

/* TOAST */
function showToast(msg, error = false) {
  const t = document.createElement("div");
  t.className = `toast ${error ? "error" : ""}`;
  t.textContent = msg;
  document.body.appendChild(t);

  setTimeout(() => t.classList.add("show"), 100);
  setTimeout(() => t.remove(), 3000);
}
