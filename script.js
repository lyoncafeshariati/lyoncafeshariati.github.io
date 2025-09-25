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

                    <div class="category-circle w-32 sm:w-40 h-32 sm:h-40 rounded-full flex items-center justify-center" data-category="${category.name}">

                        <img src="${category.categoryImage || 'https://via.placeholder.com/150?text=${encodeURIComponent(category.name)}'}" alt="${category.name}" class="rounded-full">

                        <div class="title-box">${category.name}</div>

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

                <div class="small-grid">

                    ${menuData.categories.map(cat => `

                        <div class="category-circle-small relative ${cat.name === categoryName ? 'selected' : ''}" data-category="${cat.name}">

                            <img src="${cat.categoryImage || 'https://via.placeholder.com/64?text=${encodeURIComponent(cat.name)}'}" alt="${cat.name}" class="rounded-full">

                            <div class="title-box">${cat.name}</div>

                        </div>

                    `).join('')}

                </div>

                <!-- آیتم‌های دسته‌بندی -->

                <div>

                    <h2 class="text-2xl font-bold border-b-2 border-yellow-500 pb-2 mb-6">${category.name}</h2>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">

            ${category.items.map(item => `
                <div class="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg border border-yellow-500 p-4 transition-all duration-300 relative min-h-[140px]">
                    <!-- عکس در سمت راست -->
                    <img src="${item.image || 'https://via.placeholder.com/80?text=${encodeURIComponent(item.name)}'}" alt="${item.name}" class="w-20 h-20 object-cover rounded-md absolute right-4 top-1/2 transform -translate-y-1/2">
                    
                    <!-- عنوان و توضیحات در سمت چپ -->
                    <div class="pr-24"> <!-- فاصله از سمت راست برای عکس -->
                        <h3 class="text-lg font-bold text-yellow-400 hover:text-yellow-300 transition-colors mb-1">${item.name}</h3>
                        <p class="text-gray-400 text-sm">${item.description || 'توضیحات موجود نیست'}</p>
                    </div>
                    
                    <!-- قیمت در چپ پایین -->
                    <div class="absolute left-4 bottom-4 text-yellow-600 font-semibold text-lg">${item.price}</div>
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
