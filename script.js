// صبر کن تا تمام محتوای صفحه بارگذاری شود
document.addEventListener("DOMContentLoaded", function() {
    
    const menuContainer = document.querySelector(".menu-container");

    // دریافت اطلاعات منو از فایل menu.json
    fetch('menu.json?v=1.0')
        .then(response => response.json())
        .then(data => {
            // به ازای هر دسته بندی در فایل json، یک آکاردئون بساز
            data.categories.forEach(category => {
                const accordionDiv = document.createElement('div');
                accordionDiv.classList.add('accordion');

                // ساخت HTML برای یک دسته بندی کامل
                accordionDiv.innerHTML = `
                    <button class="accordion-button">
                        ${category.name}
                        <i class="fa-solid fa-chevron-down icon"></i>
                    </button>
                    <div class="accordion-panel">
                        <div class="menu-items-grid">
                            ${category.items.map(item => `
                                <div class="menu-item">
                                    <img src="${item.image}" alt="${item.name}">
                                    <div class="item-details">
                                        <div class="item-header">
                                            <h3>${item.name}</h3>
                                            <span class="price">${item.price}</span>
                                        </div>
                                        <p class="description">${item.description}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
                menuContainer.appendChild(accordionDiv);
            });

            // پس از ساختن تمام آکاردئون‌ها، منطق کلیک کردن را به آن‌ها اضافه کن
            setupAccordionLogic();
        })
        .catch(error => {
            console.error('خطا در بارگذاری اطلاعات منو:', error);
            menuContainer.innerHTML = '<p style="text-align: center;">متاسفانه در بارگذاری منو مشکلی پیش آمده است.</p>';
        });

    function setupAccordionLogic() {
        const accordionButtons = document.querySelectorAll(".accordion-button");

        accordionButtons.forEach(button => {
            button.addEventListener("click", function() {
                accordionButtons.forEach(otherButton => {
                    if (otherButton !== this && otherButton.classList.contains("active")) {
                        otherButton.classList.remove("active");
                        const panelToClose = otherButton.nextElementSibling;
                        panelToClose.style.maxHeight = null;
                    }
                });

                this.classList.toggle("active");
                const panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            });
        });
    }
});
