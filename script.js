// صبر کن تا تمام محتوای صفحه بارگذاری شود
document.addEventListener("DOMContentLoaded", function() {
    
    // تمام دکمه‌های آکاردئون را پیدا کن
    const accordionButtons = document.querySelectorAll(".accordion-button");

    accordionButtons.forEach(button => {
        // به هر دکمه یک شنونده رویداد کلیک اضافه کن
        button.addEventListener("click", function() {
            
            // ابتدا، تمام پنل‌های دیگر را ببند
            accordionButtons.forEach(otherButton => {
                // اگر دکمه دیگری فعال است و آن دکمه، همین دکمه‌ای که کلیک شده نیست
                if (otherButton !== this && otherButton.classList.contains("active")) {
                    otherButton.classList.remove("active");
                    const panelToClose = otherButton.nextElementSibling;
                    panelToClose.style.maxHeight = null;
                }
            });

            // حالا پنل مربوط به دکمه کلیک شده را باز یا بسته کن
            this.classList.toggle("active");
            const panel = this.nextElementSibling;

            // اگر پنل باز است، آن را ببند
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                // اگر بسته است، آن را به اندازه ارتفاع محتوایش باز کن
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });

});
