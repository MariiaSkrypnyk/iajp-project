const form = document.getElementById("contactForm");

if (form) {

    form.addEventListener("submit", function(event){
        event.preventDefault();
        const message = document.getElementById("formMessage");
        message.innerText =
            "Thank you, your responce has been submitted. We will respond as soon as possible.";

        message.classList.add("successMessage");
        message.classList.add("showMessage");        

        form.reset();

        setTimeout(() => {
            message.classList.remove("showMessage");
        }, 5000);
    });
}

let acc = document.getElementsByClassName("accordion");
for (let i = 0; i < acc.length; i++) {

    acc[i].addEventListener("click", function () {
        
        let panel = this.nextElementSibling;
        
    if (panel.style.display === "block") {
        panel.style.display = "none";
    } else {
        panel.style.display = "block";
    }
    });
}

let slideIndex = 0;
const slides = document.getElementsByClassName("carousel-img");

function showSlide(index) {
    for (let i = 0; i < slides.length; i++){
        slides[i].style.display = "none";
    }
    slides[index].style.display = "block";
}

if (slides.length > 0) {
    
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    nextBtn.addEventListener("click", function () {
        slideIndex++;
        if (slideIndex >= slides.length) slideIndex = 0;
        showSlide(slideIndex);
    });

    prevBtn.addEventListener("click", function () {
        slideIndex--;
        if (slideIndex < 0) slideIndex = slides.length - 1;
        showSlide(slideIndex);
    });

    showSlide(slideIndex);

    setInterval(() => {
        slideIndex++;
        if (slideIndex >= slides.length) slideIndex = 0;
        showSlide(slideIndex);
    }, 4000);
}

document.addEventListener("DOMContentLoaded", function () {
    const bgSlides = document.getElementsByClassName("bg-slide");
    let bgIndex = 0;

    function showBgSlide() {

        for (let i = 0; i < bgSlides.length; i++) {
            bgSlides[i].classList.remove("active");
        }

        bgSlides[bgIndex].classList.add("active");

        bgIndex++;
        if (bgIndex >= bgSlides.length) {
            bgIndex = 0;
        }
    }
    if (bgSlides.length > 0) {
        showBgSlide();
        setInterval(showBgSlide, 5000);
    }
});


let regionData = [];

function loadAlerts() {
    fetch("https://raw.githubusercontent.com/alexandrkutashov/ukraine_alarm_api/main/api/alerts.json")
        .then(response => response.json())
        .then(data => {
            console.log("Data Loaded:", data);

            if (data.states) {
                regionsData = data.states;
            } else {
                console.log("No regions found");
            }
        })
        .catch(error => {
            console.error("Fetch Error:", error);
        });
}

const apiKey = "24e63f6639526453d1657a8e479d8573";

fetch("https://api.spaceflightnewsapi.net/v4/articles/?search=Ukraine war")
    .then(response => response.json())
    .then(data => {

        let output = "";

        data.results.slice(0, 5).forEach(article => {
            output += `
                <div class="news-item">
                    <a href="${article.url}" target="_blank">
                        ${article.title}
                       <p>${article.summary}</p>
                    </a>
                </div>
            `;
        });

        document.getElementById("newsContainer").innerHTML = output;
    })
    .catch(error => {
        console.error(error);
        document.getElementById("newsContainer").textContent =
            "Unable to load news.";
    });