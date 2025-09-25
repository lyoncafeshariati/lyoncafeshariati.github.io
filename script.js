document.addEventListener("DOMContentLoaded", function () {
    const menuContainer = document.getElementById("menu-container");
    const homeButton = document.getElementById("home-button");
    let menuData = null;
    let selectedCategory = null;

    // لود کردن منو از menu.json
    fetch('menu.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('فایل menu.json پیدا نشد');
            }
            return response.json();
        })
        .then(data => {
            menuData = data;
            console.log('منو لود شد:', data); // برای دیباگ
            renderCategories();
        })
        .catch(error => {
            console.error('خطا در بارگذاری منو:', error);
            menuContainer.innerHTML = `
                <div class="text-center text-red-400">
                    <p>متاسفانه در بارگذاری منو مشکلی پیش آمده است.</p>
                    <p class="text-sm mt-2">${error.message}</p>
                </div>
            `;
        });

    // نمایش دایره‌های دسته‌بندی
    function renderCategories() {
        if (!menuData || !menuData.categories) return;
        menuContainer.innerHTML = `
            <div class="category-grid animate-fadeInUp">
                ${menuData.categories.map(category => `
                    <div class="category-circle w-32 sm:w-40 h-32 sm:h-40 rounded-full bg-gray-800 flex items-center justify-center" data-category="${category.name}">
                        <img src="${category.categoryImage || 'https://via.placeholder.com/150?text=${encodeURIComponent(category.name)}'}" alt="${category.name}" class="rounded-full">
                        <span>${category.name}</span>
                    </div>
                `).join('')}
            </div>
        `;
        addCategoryClickListeners();
    }

    // نمایش آیتم‌های یک دسته‌بندی
    function renderCategoryItems(categoryName) {
        if (!menuData) return;
        selectedCategory = categoryName;
        const category = menuData.categories.find(cat => cat.name === categoryName);
        if (!category) return;
        
        menuContainer.innerHTML = `
            <div class="animate-fadeIn">
                <!-- دایره‌های کوچک شده -->
                <div class="flex flex-wrap justify-center gap-4 mb-8">
                    ${menuData.categories.map(cat => `
                        <div class="category-circle-small relative ${cat.name === categoryName ? 'ring-2 ring-yellow-500' : ''}" data-category="${cat.name}">
                            <img src="${cat.categoryImage || 'https://via.placeholder.com/64?text=${encodeURIComponent(cat.name)}'}" alt="${cat.name}" class="rounded-full">
                            <span>${cat.name}</span>
                        </div>
                    `).join('')}
                </div>
                <!-- آیتم‌های دسته‌بندی -->
                <div>
                    <h2 class="text-2xl font-bold border-b-2 border-yellow-500 pb-2 mb-6">${category.name}</h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        ${category.items.map(item => `
                            <div class="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                                <img src="${item.image || 'https://via.placeholder.com/300x200?text=${encodeURIComponent(item.name)}'}" alt="${item.name}" class="w-full h-48 object-cover hover:scale-110 transition-transform duration-300">
                                <div class="p-4 flex flex-col">
                                    <div class="flex justify-between items-baseline mb-2">
                                        <h3 class="text-lg font-bold">${item.name}</h3>
                                        <span class="text-yellow-500 font-bold">${item.price}</span>
                                    </div>
                                    <p class="text-gray-400 text-sm">${item.description || 'توضیحات موجود نیست'}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        addCategoryClickListeners();
    }

    // اضافه کردن listener برای کلیک روی دایره‌ها
    function addCategoryClickListeners() {
        const circles = document.querySelectorAll('.category-circle, .category-circle-small');
        circles.forEach(circle => {
            circle.addEventListener('click', (e) => {
                e.preventDefault();
                const categoryName = circle.getAttribute('data-category');
                renderCategoryItems(categoryName);
            });
        });
    }

    // بازگشت به صفحه اصلی با دکمه خانه
    homeButton.addEventListener('click', (e) => {
        e.preventDefault();
        selectedCategory = null;
        renderCategories();
    });
});
```
