
document.addEventListener("DOMContentLoaded", function () {

    // =================================
    // 1. MOBILE NAVIGATION
    // =================================

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    menuToggle.addEventListener("click", function () {

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Tutup menu" : "Buka menu"
        );

    });


    // Tutup menu setelah memilih navigasi

    document.querySelectorAll(".nav-links a").forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("open");

            menuToggle.textContent = "☰";

            menuToggle.setAttribute("aria-expanded", "false");

        });

    });


    // =================================
    // 2. TYPING TEXT ANIMATION
    // =================================

    const typingText = document.getElementById("typingText");

    const words = [
        "Informatics Student.",
        "Production Experience.",
        "Continuous Learner.",
        "Future Professional."
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentWord = words[wordIndex];

        if (deleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typingText.textContent =
            currentWord.substring(0, charIndex);

        let speed = deleting ? 55 : 100;

        if (charIndex === currentWord.length && !deleting) {

            deleting = true;
            speed = 1600;

        }

        if (charIndex === 0 && deleting) {

            deleting = false;

            wordIndex = (wordIndex + 1) % words.length;

            speed = 400;

        }

        setTimeout(typeEffect, speed);

    }

    typeEffect();


    // =================================
    // 3. DARK MODE / LIGHT MODE
    // =================================

    const themeToggle = document.getElementById("themeToggle");

    function updateTheme() {

        const isLight =
            document.body.classList.contains("light-mode");

        themeToggle.textContent = isLight ? "☾" : "☀";

        themeToggle.setAttribute(
            "aria-label",
            isLight ? "Aktifkan mode gelap" : "Aktifkan mode terang"
        );

    }


    // Membaca tema yang sebelumnya dipilih

    try {

        if (localStorage.getItem("portfolioTheme") === "light") {

            document.body.classList.add("light-mode");

        }

    } catch (error) {

        console.log("Penyimpanan tema tidak tersedia.");

    }

    updateTheme();


    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("light-mode");

        updateTheme();

        try {

            const currentTheme =
                document.body.classList.contains("light-mode")
                    ? "light"
                    : "dark";

            localStorage.setItem(
                "portfolioTheme",
                currentTheme
            );

        } catch (error) {

            console.log("Tema tidak dapat disimpan.");

        }

    });


    // =================================
    // 4. SCROLL PROGRESS BAR
    // =================================

    const progressBar =
        document.getElementById("progressBar");

    const backToTop =
        document.getElementById("backToTop");


    function handleScroll() {

        const scrollHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress = scrollHeight > 0
            ? (window.scrollY / scrollHeight) * 100
            : 0;

        progressBar.style.width =
            `${Math.min(progress, 100)}%`;


        // Tombol kembali ke atas

        if (window.scrollY > 400) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }

    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );

    window.addEventListener("resize", handleScroll);

    handleScroll();


    // =================================
    // 5. BACK TO TOP BUTTON
    // =================================

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    // =================================
    // 6. SCROLL REVEAL ANIMATION
    // =================================

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            }, {
                threshold: 0.08
            });


        revealElements.forEach(function (element) {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {

            element.classList.add("visible");

        });

    }


    // =================================
    // 7. ACTIVE NAVIGATION
    // =================================

    const sections =
        document.querySelectorAll("main section");

    const navigationLinks =
        document.querySelectorAll(".nav-links a");


    if ("IntersectionObserver" in window) {

        const sectionObserver =
            new IntersectionObserver(function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        navigationLinks.forEach(function (link) {

                            const isActive =
                                link.getAttribute("href") ===
                                `#${entry.target.id}`;

                            link.classList.toggle(
                                "active",
                                isActive
                            );

                        });

                    }

                });

            }, {
                rootMargin: "-25% 0px -55% 0px"
            });


        sections.forEach(function (section) {

            sectionObserver.observe(section);

        });

    }


    // =================================
    // 8. CONTACT FORM VALIDATION
    // =================================

    const contactForm =
        document.getElementById("contactForm");

    const formStatus =
        document.getElementById("formStatus");


    function showError(field, message) {

        const errorElement =
            document.getElementById(`${field}Error`);

        const inputElement =
            document.getElementById(field);

        errorElement.textContent = message;

        inputElement.setAttribute(
            "aria-invalid",
            message ? "true" : "false"
        );

    }


    function clearErrors() {

        const fields = [
            "name",
            "email",
            "subject",
            "message"
        ];

        fields.forEach(function (field) {

            showError(field, "");

        });

    }


    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        clearErrors();

        formStatus.textContent = "";


        // Mengambil data dari form

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const subject =
            document.getElementById("subject").value;

        const message =
            document.getElementById("message").value.trim();


        let isValid = true;


        // Validasi nama

        if (name.length < 3) {

            showError(
                "name",
                "Nama minimal 3 karakter."
            );

            isValid = false;

        }


        // Validasi email

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            showError(
                "email",
                "Masukkan email yang valid."
            );

            isValid = false;

        }


        // Validasi subjek

        if (subject === "") {

            showError(
                "subject",
                "Silakan pilih subjek pesan."
            );

            isValid = false;

        }


        // Validasi pesan

        if (message.length < 10) {

            showError(
                "message",
                "Pesan minimal 10 karakter."
            );

            isValid = false;

        }


        // Jika data belum valid

        if (!isValid) {

            formStatus.textContent =
                "Mohon periksa kembali data yang dimasukkan.";

            formStatus.style.color = "#ff8585";

            return;

        }


        // =================================
        // 9. SEND MESSAGE TO EMAIL
        // =================================

        const destination =
            "yxrips@gmail.com";

        const emailSubject =
            encodeURIComponent(subject);

        const emailBody =
            encodeURIComponent(
                "Nama Pengirim: " + name +
                "\nEmail Pengirim: " + email +
                "\n\nPesan:\n" + message
            );


        const mailtoLink =
            `mailto:${destination}` +
            `?subject=${emailSubject}` +
            `&body=${emailBody}`;


        formStatus.textContent =
            "Data valid! Membuka aplikasi email untuk mengirim pesan.";

        formStatus.style.color = "#52dfab";


        // Membuka aplikasi email

        window.location.href = mailtoLink;

    });


    // =================================
    // 10. DYNAMIC COPYRIGHT YEAR
    // =================================

    document.getElementById("year").textContent =
        new Date().getFullYear();


    // =================================
    // 11. CONSOLE INFORMATION
    // =================================

    console.log(
        "Personal Portfolio Muhammad Rhiva berhasil dijalankan."
    );

});
