const searchIcon = document.getElementById('search-icon');
const searchOptions = document.getElementById('search-options');
const searchForm = document.getElementById('search-form');
const searchBar = document.getElementById('search-bar');
const blur = document.getElementById('background-blur');
const searchLinks = searchOptions.querySelectorAll('a');

// Placeholder mặc định theo công cụ tìm kiếm
const placeholders = {
    "https://www.google.com/search": "Search on Google . . .",
    "https://paulgo.io/search": "Search on SearXNG . . .",
    "https://search.brave.com/search": "Search on Brave . . .",
    "https://www.bing.com/search": "Search on Bing . . .",
    "https://duckduckgo.com/": "Search on DuckDuckGo . . ."
};

// Toggle options visibility
searchIcon.addEventListener('click', () => {
    searchOptions.classList.toggle('active');
    blur.classList.toggle('active');
});

// Change search engine and placeholder
searchOptions.addEventListener('click', (event) => {
    const link = event.target.closest('a'); // Tìm phần tử <a>
    if (link) {
        event.preventDefault(); // Ngăn chuyển hướng

        const engine = link.getAttribute('data-engine');
        const icon = link.getAttribute('data-icon');

        // Cập nhật URL action
        searchForm.action = engine;

        // Cập nhật biểu tượng
        searchIcon.src = icon;

        // Cập nhật placeholder
        searchBar.placeholder = placeholders[engine] || "Search...";

        // Ẩn menu sau khi chọn
        searchOptions.classList.remove('active');
        blur.classList.remove('active');
    }
});

// Close options when clicking outside
document.addEventListener('click', (event) => {
    if (!searchIcon.contains(event.target) && !searchOptions.contains(event.target)) {
        searchOptions.classList.remove('active');
        blur.classList.remove('active');
    }
});

// Lắng nghe sự kiện submit form
document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();

    var query = searchBar.value.trim();

    // Biểu thức chính quy kiểm tra URL (đã cải tiến)
    var urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/i;

    if (urlRegex.test(query)) {
        // Nếu là URL hợp lệ, chuyển hướng đến URL đó
        if (!/^https?:\/\//i.test(query)) {
            query = 'https://' + query; // Thêm "https://" để đảm bảo an toàn
        }
        window.location.href = query;
    } else {
        // Nếu không phải URL, tìm kiếm theo công cụ đã chọn
        var searchEngineUrl = searchForm.action;
        window.location.href = searchEngineUrl + '?q=' + encodeURIComponent(query);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    searchLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const engine = this.getAttribute('data-engine');
            const icon = this.getAttribute('data-icon');
            searchForm.action = engine;
            searchIcon.src = icon;
            searchBar.placeholder = `Search on ${this.textContent.trim()} ...`;
            updateOutlineColor(this.textContent.trim());
        });
    });

    function updateOutlineColor(engineName) {
        let color;
        switch (engineName) {
            case 'Google':
                color = '#FEC319';
                break;
            case 'SearXNG':
                color = 'blue';
                break;
            case 'Brave':
                color = '#FF2F00';
                break;
            case 'Bing':
                color = '#5083DF';
                break;
            case 'DuckDuckGo':
                color = '#DE5933';
                break;
            default:
                color = '#FEC319';
        }
        searchBar.style.outlineColor = color;
    }
});



// Segment mappings for digits 0-9
const digitSegments = {
    0: ['top', 'top-right', 'top-left', 'bot', 'bot-right', 'bot-left'],
    1: ['top-right', 'bot-right'],
    2: ['top', 'top-right', 'between', 'bot-left', 'bot'],
    3: ['top', 'top-right', 'between', 'bot-right', 'bot'],
    4: ['top-left', 'top-right', 'between', 'bot-right'],
    5: ['top', 'top-left', 'between', 'bot-right', 'bot'],
    6: ['top', 'top-left', 'between', 'bot-right', 'bot', 'bot-left'],
    7: ['top', 'top-right', 'bot-right'],
    8: ['top', 'top-right', 'top-left', 'between', 'bot', 'bot-right', 'bot-left'],
    9: ['top', 'top-left', 'top-right', 'between', 'bot-right', 'bot']
};

// Function to update the clock
function updateClock() {
    // Get Vietnam time (UTC+7)
    const now = new Date();
    const vietnamTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
    const hours = vietnamTime.getUTCHours().toString().padStart(2, '0');
    const minutes = vietnamTime.getUTCMinutes().toString().padStart(2, '0');
    const seconds = vietnamTime.getUTCSeconds().toString().padStart(2, '0');

    // Update hours
    updateDigit('h1', hours[0]);
    updateDigit('h2', hours[1]);

    // Update minutes
    updateDigit('m1', minutes[0]);
    updateDigit('m2', minutes[1]);

    // Update seconds
    updateDigit('s1', seconds[0]);
    updateDigit('s2', seconds[1]);
}

// Function to update a single digit
function updateDigit(prefix, digit) {
    const segments = ['top', 'top-right', 'top-left', 'between', 'bot', 'bot-right', 'bot-left'];
    const activeSegments = digitSegments[digit] || [];

    segments.forEach(segment => {
        const element = document.getElementById(`${prefix}-${segment}`);
        if (element) {
            if (activeSegments.includes(segment)) {
                element.style.fill = 'rgba(255, 213, 0, 1)';
                element.style.transition = 'fill 0.3s ease';
            } else {
                element.style.fill = 'rgba(0, 0, 0, 0.1)';
                element.style.transition = 'fill 0.3s ease';
            }
        }
    });
}

setInterval(updateClock, 1000);
updateClock();








// Function to open or close the Google popup
function toggleGooglePopup(event) {
    event.preventDefault();
    event.stopPropagation();

    const googlePopup = document.getElementById('google-popup');
    const googleBookmark = document.getElementById('google-bookmark');

    if (!googlePopup || !googleBookmark) {
        console.error("Popup or Google bookmark element not found.");
        return;
    }

    const isPopupOpen = googlePopup.classList.contains('active');

    if (isPopupOpen) {
        closeGooglePopup();
    } else {
        // 1. Đảm bảo display là 'block' trước tiên để phần tử có mặt trong DOM
        googlePopup.style.display = 'block';

        // 2. Sử dụng requestAnimationFrame hoặc setTimeout ngắn
        // để trình duyệt có thể áp dụng các kiểu ban đầu (scale 0.1, opacity 0)
        // trước khi thêm class 'active' kích hoạt transition.
        requestAnimationFrame(() => {
            googlePopup.classList.add('active');
        });
        // Hoặc bạn có thể dùng:
        // setTimeout(() => {
        //     googlePopup.classList.add('active');
        // }, 10); // Một độ trễ nhỏ, ví dụ 10ms
    }
}

// Function to close the GooglePopup (giữ nguyên)
function closeGooglePopup() {
    const googlePopup = document.getElementById('google-popup');
    if (googlePopup) {
        googlePopup.classList.remove('active');
        // Chờ animation đóng kết thúc trước khi ẩn hẳn phần tử
        setTimeout(() => {
            googlePopup.style.display = 'none';
        }, 300); // Phải khớp với transition duration trong CSS
    }
}

// Close popup when clicking outside the content (on the window)
window.onclick = function (event) {
    const googlePopup = document.getElementById('google-popup');
    const googleBookmark = document.getElementById('google-bookmark');

    // Chỉ thực hiện nếu popup đang hiển thị
    if (googlePopup.classList.contains('active') && googlePopup.style.display === 'block') {
        // Kiểm tra nếu click không phải là popup và không phải là con của popup
        // VÀ KHÔNG PHẢI LÀ CHÍNH BIỂU TƯỢNG GOOGLE
        if (!googlePopup.contains(event.target) && !googleBookmark.contains(event.target)) {
            closeGooglePopup(); // Gọi hàm đóng
        }
    }
};

// Ngăn chặn việc click bên trong popup đóng nó và gán sự kiện cho bookmark
document.addEventListener('DOMContentLoaded', (event) => {
    const googlePopupContent = document.querySelector('#google-popup .popup-content');
    const googleBookmarkElement = document.getElementById('google-bookmark');

    if (googlePopupContent) {
        googlePopupContent.addEventListener('click', function (e) {
            e.stopPropagation(); // Ngăn chặn sự kiện click bên trong popup lan truyền lên window.onclick
        });
    }

    // THAY ĐỔI QUAN TRỌNG: Gán hàm toggle cho sự kiện click của bookmark Google
    // Đảm bảo phần tử tồn tại trước khi gán sự kiện
    if (googleBookmarkElement) {
        googleBookmarkElement.onclick = toggleGooglePopup;
    }
});

document.querySelectorAll('.popup-bookmarks-grid .bookmark-item')
    .forEach((el, index) => {
        const delay = Math.floor(index / 3) * 0.08;
        el.style.animationDelay = `${delay}s`;
    });














// Cấu hình Google Apps Script Web App URL
// <<< THAY THẾ BẰNG URL THỰC CỦA BẠN TỪ GOOGLE APPS SCRIPT SAU KHI TRIỂN KHAI >>>
const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbz3iDnOF9B6e-tOnjFm-Rqg1R4qM9HgtKlUwOda-ZrDFreSEESK3D261Z5SDkUrETiqLQ/exec';

// Cấu hình Cloudinary
// <<< THAY THẾ BẰNG CLOUD NAME CỦA BẠN >>>
const CLOUDINARY_CLOUD_NAME = 'dxwwkauuj';
// <<< THAY THẾ BẰNG TÊN UPLOAD PRESET MÀ BẠN ĐÃ TẠO VỚI 'Unsigned' >>>
const CLOUDINARY_UPLOAD_PRESET = 'my_chat_upload'; // Ví dụ: 'my_chat_upload'

// URL upload của Cloudinary (dùng cho unsigned uploads)
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;

// Google Drive Folder ID (chỉ để hiển thị cho biết, không dùng để upload trực tiếp từ JS)
// Upload giờ sẽ qua Apps Script.
const DRIVE_FOLDER_ID_INFO = '10hazXwlU-Lg_22FxYstRkI3ABvpYh4nM'; // Đây chỉ là biến thông tin, không dùng trong upload

// --- GIỚI HẠN CLOUDINARY (Bytes) ---
const CLOUDINARY_MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB
const CLOUDINARY_MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100 MB
const CLOUDINARY_MAX_RAW_SIZE = 10 * 1024 * 1024; // 10 MB

// Khai báo biến này ở phạm vi toàn cục
let currentActiveMessageBox = null;
let chatContentArea = null; // Khai báo biến chatContentArea ở phạm vi toàn cục

// --- ĐỐI TƯỢNG CHỨA CÁC ICON SVG CHO TỪNG LOẠI FILE DỰA TRÊN MIME TYPE ---
const fileIcons = {
    // PDF Files
    'application/pdf': {
        svg: '<svg viewBox="0 0 100 100"><path fill="#fefefe" d="m70 0 20 20v70q0 10-10 10H20q-10 0-10-10V10Q10 0 20 0Z"/><path fill="#d5d5d5" d="m70 0 20 20H73q-3 0-3-3Z"/><path fill="red" d="M60 32q0 3-3 3H10v7q-4 0-4-5V13q0-3 3-3h48q3 0 3 3Z"/><path d="M13.5 28.5v-12h4c7 0 7 7.5 0 7.5h-4Zm15.5-12v12h4c8 0 8-12 0-12Zm24 0h-8v6h8-8v6-12Z" fill="red" stroke="#fff" stroke-width="3" stroke-linejoin="round"/><path fill="#fff" stroke="#fd797d" stroke-width="3" d="M46 51q9 24-15 38c-4 2-8.3 1-4-4q17-18 47-8c5 1.5 7 6.5-1 5q-24-5-34-32c-2.5-8 4-8 7 1Z"/></svg>',
        class: 'file-icon-pdf'
    },

    'image/pdf': { // Vẫn giữ cái này để fallback nếu mimeType từ backend bị sai
        svg: '<svg viewBox="0 0 100 100"><path fill="#fefefe" d="m70 0 20 20v70q0 10-10 10H20q-10 0-10-10V10Q10 0 20 0Z"/><path fill="#d5d5d5" d="m70 0 20 20H73q-3 0-3-3Z"/><path fill="red" d="M60 32q0 3-3 3H10v7q-4 0-4-5V13q0-3 3-3h48q3 0 3 3Z"/><path d="M13.5 28.5v-12h4c7 0 7 7.5 0 7.5h-4Zm15.5-12v12h4c8 0 8-12 0-12Zm24 0h-8v6h8-8v6-12Z" fill="red" stroke="#fff" stroke-width="3" stroke-linejoin="round"/><path fill="#fff" stroke="#fd797d" stroke-width="3" d="M46 51q9 24-15 38c-4 2-8.3 1-4-4q17-18 47-8c5 1.5 7 6.5-1 5q-24-5-34-32c-2.5-8 4-8 7 1Z"/></svg>',
        class: 'file-icon-pdf'
    },

    // Word Documents
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { // .docx
        svg: '<svg viewBox="0 0 100 100"><path fill="#fefefe" d="m70 0 20 20v70q0 10-10 10H20q-10 0-10-10V10Q10 0 20 0Z"/><path fill="#d5d5d5" d="m70 0 20 20H73q-3 0-3-3Z"/><path fill="#068EFE" d="M60 32q0 3-3 3H10v7q-4 0-4-5V13q0-3 3-3h48q3 0 3 3Z"/><g fill="#068EFE" stroke="#fff" stroke-width="3" stroke-linejoin="round" transform="translate(-1)"><path d="M13 16.5v12h3c9 0 9-12 0-12Z"/><circle cx="34" cy="22.5" r="6"/><path d="m55 27 .5-.5a6 6 0 1 1 0-8L55 18" fill="none"/></g><path d="M25 50h35Zm0 9h35Zm0 9h50Zm0 9h50Zm0 9h50Z" stroke="#A4E1FD" stroke-width="3" stroke-linejoin="round"/></svg>',
        class: 'file-icon-docx'
    },
    'application/msword': { // .doc
        svg: '<svg viewBox="0 0 100 100"><path fill="#fefefe" d="m70 0 20 20v70q0 10-10 10H20q-10 0-10-10V10Q10 0 20 0Z"/><path fill="#d5d5d5" d="m70 0 20 20H73q-3 0-3-3Z"/><path fill="#068EFE" d="M60 32q0 3-3 3H10v7q-4 0-4-5V13q0-3 3-3h48q3 0 3 3Z"/><g fill="#068EFE" stroke="#fff" stroke-width="3" stroke-linejoin="round" transform="translate(-1)"><path d="M13 16.5v12h3c9 0 9-12 0-12Z"/><circle cx="34" cy="22.5" r="6"/><path d="m55 27 .5-.5a6 6 0 1 1 0-8L55 18" fill="none"/></g><path d="M25 50h35Zm0 9h35Zm0 9h50Zm0 9h50Zm0 9h50Z" stroke="#A4E1FD" stroke-width="3" stroke-linejoin="round"/></svg>',
        class: 'file-icon-docx'
    },

    // JavaScript Files
    'application/javascript': { // .js
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#F7DF1E" d="M0 32V480c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H32C14.3 0 0 14.3 0 32zM204.6 179.8c-10.4 0-16.7-10.2-16.7-19.4c0-10.9 8.3-17.6 20.3-17.6c11.9 0 20.3 6.7 20.3 17.6c-.1 9.2-6.5 19.4-19.9 19.4zm-48.4 20.2c16.1 12 50.1 10.4 50.1-51.4c0-30.8-21.6-47.5-49.4-47.5c-42.5 0-77 34.3-77 90.9c0 58.7 34.3 90.8 77 90.8c27.8 0 49.4-16.7 49.4-47.5c0-62.1-34.3-50.5-50.1-51.4zm236.4-1.6c-10.4 0-16.7-10.2-16.7-19.4c0-10.9 8.3-17.6 20.3-17.6c11.9 0 20.3 6.7 20.3 17.6c0 9.2-6.5 19.4-19.9 19.4zm-48.4 20.2c16.1 12 50.1 10.4 50.1-51.4c0-30.8-21.6-47.5-49.4-47.5c-42.5 0-77 34.3-77 90.9c0 58.7 34.3 90.8 77 90.8c27.8 0 49.4-16.7 49.4-47.5c0-62.1-34.3-50.5-50.1-51.4z"/></svg>',
        class: 'file-icon-js'
    },
    'text/javascript': { // .js (alternative MIME type)
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#F7DF1E" d="M0 32V480c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H32C14.3 0 0 14.3 0 32zM204.6 179.8c-10.4 0-16.7-10.2-16.7-19.4c0-10.9 8.3-17.6 20.3-17.6c11.9 0 20.3 6.7 20.3 17.6c-.1 9.2-6.5 19.4-19.9 19.4zm-48.4 20.2c16.1 12 50.1 10.4 50.1-51.4c0-30.8-21.6-47.5-49.4-47.5c-42.5 0-77 34.3-77 90.9c0 58.7 34.3 90.8 77 90.8c27.8 0 49.4-16.7 49.4-47.5c0-62.1-34.3-50.5-50.1-51.4zm236.4-1.6c-10.4 0-16.7-10.2-16.7-19.4c0-10.9 8.3-17.6 20.3-17.6c11.9 0 20.3 6.7 20.3 17.6c0 9.2-6.5 19.4-19.9 19.4zm-48.4 20.2c16.1 12 50.1 10.4 50.1-51.4c0-30.8-21.6-47.5-49.4-47.5c-42.5 0-77 34.3-77 90.9c0 58.7 34.3 90.8 77 90.8c27.8 0 49.4-16.7 49.4-47.5c0-62.1-34.3-50.5-50.1-51.4z"/></svg>',
        class: 'file-icon-js'
    },

    // HTML Files
    'text/html': { // .html
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#E34F26" d="M0 32l34.9 395.8L192 480l157.1-52.2L384 32H0zm308.2 114.9L192 216.5 75.8 146.9 64 36.5h256l-11.8 110.4zM192 373.8l-68.1-18.5-4.7-47.5H57.4l11.6 117 123 34.1 123-34.1 11.6-117H303.4l-4.7 47.5-68.1 18.5z"/></svg>',
        class: 'file-icon-html'
    },

    // CSS Files
    'text/css': { // .css
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#1572B6" d="M0 32l34.9 395.8L192 480l157.1-52.2L384 32H0zm308.2 114.9L192 216.5 75.8 146.9 64 36.5h256l-11.8 110.4zM192 373.8l-68.1-18.5-4.7-47.5H57.4l11.6 117 123 34.1 123-34.1 11.6-117H303.4l-4.7 47.5-68.1 18.5z"/></svg>',
        class: 'file-icon-css'
    },

    // ZIP Files
    'application/zip': { // .zip
        svg: '<svg viewBox="0 0 100 100"><path fill="#fefefe" d="m70 0 20 20v70q0 10-10 10H20q-10 0-10-10V10Q10 0 20 0Z"/><path fill="#d5d5d5" d="m70 0 20 20H73q-3 0-3-3Z"/><path fill="#ff4e00" d="M60 32q0 3-3 3H10v7q-4 0-4-5V13q0-3 3-3h48q3 0 3 3Z"/><path d="M27 16.5h-7.5H27V18l-7.5 9v1.5H27h-7.5m14.5-12v12Zm7 0h3c6 0 6 6.5 0 6.5h-3v5.5Z" fill="#ff4e00" stroke="#fff" stroke-width="3" stroke-linejoin="round"/><g fill="#FDB67F" transform="matrix(.9 0 0 .9 5.4 1.8)"><path d="M50 45h5v5h-5zm-5 5h5v5h-5zm5 5h5v5h-5zm-5 5h5v5h-5zm5 5h5v5h-5zm-5 5h5v5h-5z"/><rect x="45" y="76" width="10" height="10" rx="2.5" ry="2.5"/><path d="m50 83 6 15q1 2-1 2H45q-2 0-1-2Z"/></g></svg>',
        class: 'file-icon-zip'
    },
    'application/x-zip-compressed': { // .zip (alternative MIME type)
        svg: '<svg viewBox="0 0 100 100"><path fill="#fefefe" d="m70 0 20 20v70q0 10-10 10H20q-10 0-10-10V10Q10 0 20 0Z"/><path fill="#d5d5d5" d="m70 0 20 20H73q-3 0-3-3Z"/><path fill="orange" d="M60 32q0 3-3 3H10v7q-4 0-4-5V13q0-3 3-3h48q3 0 3 3Z"/><path d="M27 16.5h-7.5H27V18l-7.5 9v1.5H27h-7.5m14.5-12v12Zm7 0h3c6 0 6 6.5 0 6.5h-3v5.5Z" fill="orange" stroke="#fff" stroke-width="3" stroke-linejoin="round"/><g fill="#FDB67F" transform="matrix(.9 0 0 .9 5.4 1.8)"><path d="M50 45h5v5h-5zm-5 5h5v5h-5zm5 5h5v5h-5zm-5 5h5v5h-5zm5 5h5v5h-5zm-5 5h5v5h-5z"/><rect x="45" y="76" width="10" height="10" rx="2.5" ry="2.5"/><path d="m50 83 6 15q1 2-1 2H45q-2 0-1-2Z"/></g></svg>',
        class: 'file-icon-zip'
    },
    'application/x-compressed': { // .zip (another alternative)
        svg: '<svg viewBox="0 0 100 100"><path fill="#fefefe" d="m70 0 20 20v70q0 10-10 10H20q-10 0-10-10V10Q10 0 20 0Z"/><path fill="#d5d5d5" d="m70 0 20 20H73q-3 0-3-3Z"/><path fill="#ff4e00" d="M60 32q0 3-3 3H10v7q-4 0-4-5V13q0-3 3-3h48q3 0 3 3Z"/><path d="M27 16.5h-7.5H27V18l-7.5 9v1.5H27h-7.5m14.5-12v12Zm7 0h3c6 0 6 6.5 0 6.5h-3v5.5Z" fill="#ff4e00" stroke="#fff" stroke-width="3" stroke-linejoin="round"/><g fill="#FDB67F" transform="matrix(.9 0 0 .9 5.4 1.8)"><path d="M50 45h5v5h-5zm-5 5h5v5h-5zm5 5h5v5h-5zm-5 5h5v5h-5zm5 5h5v5h-5zm-5 5h5v5h-5z"/><rect x="45" y="76" width="10" height="10" rx="2.5" ry="2.5"/><path d="m50 83 6 15q1 2-1 2H45q-2 0-1-2Z"/></g></svg>',
        class: 'file-icon-zip'
    },

    // EXE Files
    'application/x-msdownload': { // .exe
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#6f42c1" d="M495.9 166.6c3.1 3.1 6.2 7 9.1 11.4c2.9 4.3 5.4 9 7.3 14.1s3.4 10.3 4.6 15.6s1.8 10.6 1.8 16.1s-.6 11.2-1.8 16.1s-2.7 10.8-4.6 16.1s-4.4 9.8-7.3 14.1s-6 8.3-9.1 11.4l-112 112c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L400.6 272 272 143.4c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L495.9 166.6zM0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V288H256c-35.3 0-64 28.7-64 64V512H64c-35.3 0-64-28.7-64-64V64zm384 64V0L256 128H384z"/></svg>',
        class: 'file-icon-exe'
    },
    'application/octet-stream': { // .exe (alternative MIME type)
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#6f42c1" d="M495.9 166.6c3.1 3.1 6.2 7 9.1 11.4c2.9 4.3 5.4 9 7.3 14.1s3.4 10.3 4.6 15.6s1.8 10.6 1.8 16.1s-.6 11.2-1.8 16.1s-2.7 10.8-4.6 16.1s-4.4 9.8-7.3 14.1s-6 8.3-9.1 11.4l-112 112c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L400.6 272 272 143.4c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L495.9 166.6zM0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V288H256c-35.3 0-64 28.7-64 64V512H64c-35.3 0-64-28.7-64-64V64zm384 64V0L256 128H384z"/></svg>',
        class: 'file-icon-exe'
    },

    // Thêm các MIME type khác
    'application/json': {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#FD7E14" d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM384 128L256 0H64c-17.7 0-32 14.3-32 32V480c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V128z"/></svg>',
        class: 'file-icon-json'
    },

     'application/x-rar-compressed': { // .rar
        svg: '<svg viewBox="0 0 100 100"><path fill="#fefefe" d="m70 0 20 20v70q0 10-10 10H20q-10 0-10-10V10Q10 0 20 0Z"/><path fill="#d5d5d5" d="m70 0 20 20H73q-3 0-3-3Z"/><path fill="#700BFD" d="M60 32q0 3-3 3H10v7q-4 0-4-5V13q0-3 3-3h48q3 0 3 3Z"/><path d="M15 28.5v-12h5c5 0 5 7 0 7h-5Zv-5h4.5l4 5-4-5m10 5 4-12H35l4 12-1.2-3.5h-7.1Zm15.5 0v-12h5c5 0 5 7 0 7h-5Zv-5h4.5l4 5-4-5" fill="#700BFD" stroke="#fff" stroke-width="3" stroke-linejoin="round"/><g fill="#a26bfa" stroke="#a26bfa"><path stroke-width="13" d="M25 50h30M25 65h30M25 80h30"/><path stroke-width="6" d="M57 46.5h11"/><path d="M57 51.5h11v13h-4V58h-3v6.5h-4" stroke="none"/><path stroke-width="20" d="M57 76.5h11"/><path stroke-width="13" d="M70 50h5m-5 15h5m-5 15h5"/></g></svg>',
        class: 'file-icon-rar'
    },

    'text/plain': {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#6c757d" d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM384 128L256 0H64c-17.7 0-32 14.3-32 32V480c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V128z"/></svg>',
        class: 'file-icon-txt'
    },

    // Icon mặc định cho các loại file không có icon riêng
    'default': {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#6c757d" d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64L256 0H64c-22.1 0-40 17.9-40 40V472c0 22.1 17.9 40 40 40H320c22.1 0 40-17.9 40-40V128z"/></svg>',
        class: 'file-icon-default'
    }
};

// --- HÀM HỖ TRỢ LẤY ICON FILE DỰA TRÊN MIME TYPE HOẶC TÊN FILE ---
function getFileIcon(mimeType, fileName) {
    // Ưu tiên sử dụng MIME type
    if (mimeType && fileIcons[mimeType]) {
        return fileIcons[mimeType];
    }

    // Nếu không có MIME type hoặc MIME type không được hỗ trợ,
    // thử xác định dựa trên phần mở rộng file
    if (fileName) {
        const extension = fileName.toLowerCase().split('.').pop();

        // Map phần mở rộng tới MIME type
        const extensionToMimeType = {
            'pdf': 'application/pdf',
            'js': 'application/javascript',
            'javascript': 'application/javascript',
            'zip': 'application/zip',
            'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'doc': 'application/msword',
            'html': 'text/html',
            'htm': 'text/html',
            'css': 'text/css',
            'exe': 'application/x-msdownload',
            'json': 'application/json',
            'txt': 'text/plain',
            'rar': 'application/x-rar-compressed' 
        };

        const detectedMimeType = extensionToMimeType[extension];
        if (detectedMimeType && fileIcons[detectedMimeType]) {
            return fileIcons[detectedMimeType];
        }
    }

    // Trả về icon mặc định
    return fileIcons['default'];
}

// --- Scroll to Bottom Function (di chuyển ra ngoài DOMContentLoaded) ---
function scrollToBottom() {
    if (chatContentArea) {
        chatContentArea.scrollTo({
            top: chatContentArea.scrollHeight,
            behavior: 'smooth'
        });
    }
}

// --- HÀM HỖ TRỢ ĐỊNH DẠNG KÍCH THƯỚC FILE ---
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// --- HÀM HỖ TRỢ RÚT GỌN TÊN FILE ---
function shortenFileName(fileName, maxLength = 30) {
    const parts = fileName.split('.');
    const extension = parts.length > 1 ? '.' + parts.pop() : '';
    let nameWithoutExt = parts.join('.');

    if (nameWithoutExt.length + extension.length > maxLength) {
        // Tính toán số ký tự thực sự để hiển thị tên file không bao gồm phần mở rộng và "..."
        const charsToShow = maxLength - extension.length - 3; // -3 cho '...'

        if (charsToShow <= 0) { // Trường hợp tên quá ngắn, chỉ hiển thị phần đầu
            return fileName.substring(0, maxLength - 3) + '...';
        }
        return nameWithoutExt.substring(0, charsToShow) + '...' + extension;
    }
    return fileName;
}


document.addEventListener('DOMContentLoaded', function() {
    const chatBubble = document.getElementById('chat-bubble');
    const backgroundBlurChat = document.querySelector('.background-blur-chat');
    const sendButton = document.querySelector('.chat-toolbar .send-button');
    const textInput = document.querySelector('.chat-toolbar .text-input');
    chatContentArea = document.querySelector('.chat-content-area'); // Gán giá trị cho biến toàn cục
    const toolbarLoadingOverlay = document.getElementById('toolbar-loading-overlay');
    const noteBackground = document.getElementById('note-background');
    const syncLoadingOverlay = document.getElementById('sync-loading-overlay');
    const scrollToBottomBtn = document.getElementById('scroll-to-bottom-btn');
    const plusButton = document.querySelector('.plus-button');


    // --- HÀM HIỂN THỊ THÔNG BÁO TẠM THỜI (Ví dụ: "Đã lưu vào Google Drive") ---
    function showTemporaryNotification(message) {
        const notificationBox = document.createElement('div');
        notificationBox.classList.add('temporary-notification');
        notificationBox.textContent = message;
        document.body.appendChild(notificationBox);

        // Kích hoạt animation hiện ra
        setTimeout(() => notificationBox.classList.add('show'), 10);

        // Ẩn và xóa sau 3 giây
        setTimeout(() => {
            notificationBox.classList.remove('show');
            notificationBox.addEventListener('transitionend', () => notificationBox.remove(), { once: true });
        }, 3000);
    }

    // --- HÀM XỬ LÝ DOWNLOAD TRỰC TIẾP ---
    async function downloadFileDirectly(fileUrl, fileName) {
        try {
            const response = await fetch(fileUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = fileName || 'download';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
            showTemporaryNotification('Tải xuống hoàn tất!');
            console.log('File đã được tải xuống trực tiếp:', fileName);
        } catch (error) {
            console.error('Lỗi khi tải xuống file trực tiếp:', error);
            alert('Không thể tải xuống file trực tiếp. Vui lòng thử lại.');
        }
    }


    // --- HÀM ẨN CÁC NÚT TƯƠNG TÁC ---
    function hideInteractionButtons() {
        if (currentActiveMessageBox) {
            const buttons = currentActiveMessageBox.querySelectorAll('.interaction-button');
            buttons.forEach(button => {
                button.classList.remove('active');
                button.classList.add('hide');
                button.addEventListener('transitionend', function handler() {
                    button.remove();
                    button.removeEventListener('transitionend', handler);
                }, { once: true });
            });
            currentActiveMessageBox = null;
        }
    }

    // --- HÀM HIỆN THỊ CÁC NÚT TƯƠNG TÁC ---
    function showInteractionButtons(messageBox) {
        hideInteractionButtons(); // Ẩn các nút cũ trước

        currentActiveMessageBox = messageBox;

        const copyDownloadButton = document.createElement('div');
        copyDownloadButton.classList.add('interaction-button', 'blue');
        const copyDownloadImg = document.createElement('img');

        if (messageBox.dataset.fileUrl) { // Nếu có fileUrl, hiển thị nút download
            copyDownloadImg.src = 'assets/img/download.png';
            copyDownloadImg.alt = 'Download';
            copyDownloadButton.dataset.action = 'download';
        } else { // Nếu không có fileUrl, hiển thị nút copy (cho tin nhắn văn bản)
            copyDownloadImg.src = 'assets/img/copy.png';
            copyDownloadImg.alt = 'Copy';
            copyDownloadButton.dataset.action = 'copy';
        }

        copyDownloadButton.appendChild(copyDownloadImg);
        messageBox.appendChild(copyDownloadButton);

        const deleteButton = document.createElement('div');
        deleteButton.classList.add('interaction-button', 'red');
        const deleteImg = document.createElement('img');
        deleteImg.src = 'assets/img/delete.png';
        deleteImg.alt = 'Delete';
        deleteButton.appendChild(deleteImg);
        messageBox.appendChild(deleteButton);

        setTimeout(() => {
            copyDownloadButton.classList.add('active');
            deleteButton.classList.add('active');
        }, 10);

        copyDownloadButton.addEventListener('click', function(event) {
            event.stopPropagation();
            if (this.dataset.action === 'download') {
                const fileUrl = messageBox.dataset.fileUrl;
                const fileName = messageBox.querySelector('.file-name') ? messageBox.querySelector('.file-name').textContent : 'download'; // Lấy tên file từ element nếu có
                if (fileUrl) {
                    downloadFileDirectly(fileUrl, fileName); // Gọi hàm tải xuống trực tiếp
                    console.log('Đang tải xuống file trực tiếp:', fileName, fileUrl);
                }
            } else {
                const textToCopy = messageBox.querySelector('p') ? messageBox.querySelector('p').textContent : '';
                if (textToCopy) {
                    navigator.clipboard.writeText(textToCopy)
                        .then(() => {
                            console.log('Đã sao chép vào clipboard:', textToCopy);
                            showTemporaryNotification('Đã sao chép!');
                        })
                        .catch(err => {
                            console.error('Không thể sao chép:', err);
                            alert('Không thể sao chép. Vui lòng thử lại hoặc sao chép thủ công.');
                        });
                }
            }
            hideInteractionButtons();
        });

        deleteButton.addEventListener('click', async function(event) {
            event.stopPropagation();
            // index là 0-based, tương ứng với vị trí trong mảng messages trả về từ Apps Script
            const messageIndex = messageBox.dataset.messageIndex;

            if (confirm("Bạn có chắc muốn xóa tin nhắn này không?")) {
                try {
                    toolbarLoadingOverlay.classList.add('active');

                    // Gửi index 0-based đến Apps Script
                    const response = await fetch(GAS_WEB_APP_URL + '?action=delete&index=' + messageIndex, {
                        method: 'GET', // Gửi DELETE request qua GET với tham số
                    });
                    const result = await response.json();

                    if (result.status === 'success') {
                        console.log('Tin nhắn đã được xóa thành công.');
                        await loadAllMessages(false); // Tải lại tin nhắn
                        showTemporaryNotification('Đã xóa tin nhắn/file thành công!');
                    } else {
                        console.error('Lỗi khi xóa tin nhắn:', result.message);
                        alert('Lỗi khi xóa tin nhắn: ' + result.message);
                    }
                } catch (error) {
                    console.error('Lỗi kết nối hoặc API khi xóa:', error);
                    alert('Lỗi kết nối hoặc API: ' + error.message);
                } finally {
                    toolbarLoadingOverlay.classList.remove('active');
                }
                hideInteractionButtons(); // Ẩn nút sau khi xóa
            }
        });
    }

    // --- HÀM XỬ LÝ SỰ KIỆN CLICK VÀO MESSAGE BOX ---
    function handleMessageBoxClick(event) {
        event.stopPropagation();

        if (currentActiveMessageBox && currentActiveMessageBox !== this) {
            hideInteractionButtons();
        }

        showInteractionButtons(this);
    }

    // --- HÀM THÊM EVENT LISTENER CHO CÁC MESSAGE BOX ---
    function addMessageBoxEventListeners() {
        document.querySelectorAll('.message-box').forEach(box => {
            box.removeEventListener('click', handleMessageBoxClick); // Xóa để tránh trùng lặp
            box.addEventListener('click', handleMessageBoxClick);
        });
    }

    // --- KHỞI TẠO CHAT VÀ TẢI TIN NHẮN BAN ĐẦU ---
    async function initializeChat() {
        if (syncLoadingOverlay) {
            syncLoadingOverlay.classList.add('active');
        }
        try {
            await loadAllMessages(true); // Tải tin nhắn và cuộn xuống dưới cùng
        } catch (error) {
            console.error("Lỗi khi tải tin nhắn ban đầu:", error);
        } finally {
            if (syncLoadingOverlay) {
                syncLoadingOverlay.classList.remove('active');
            }
        }
    }

    initializeChat();

    // --- Scroll to Bottom Button Functions ---
    function isAtBottom() {
        if (!chatContentArea) return true;
        const threshold = 100;
        return chatContentArea.scrollTop + chatContentArea.clientHeight >= chatContentArea.scrollHeight - threshold;
    }

    function updateScrollButton() {
        if (!scrollToBottomBtn || !chatBubble.classList.contains('expanded')) {
            if (scrollToBottomBtn) scrollToBottomBtn.classList.remove('show');
            return;
        }

        if (isAtBottom()) {
            scrollToBottomBtn.classList.remove('show');
        } else {
            scrollToBottomBtn.classList.add('show');
        }
    }

    if (chatContentArea) {
        chatContentArea.addEventListener('scroll', updateScrollButton);
    }

    if (scrollToBottomBtn) {
        scrollToBottomBtn.addEventListener('click', function(event) {
            event.stopPropagation();
            scrollToBottom();
            setTimeout(() => {
                updateScrollButton();
            }, 300);
        });
    }

    // --- Logic Chat Bubble Expand/Collapse ---
    if (chatBubble) {
        chatBubble.addEventListener('click', function(event) {
            if (!this.classList.contains('expanded')) {
                if (!event.target.closest('#note-background') &&
                    !event.target.closest('.chat-toolbar') &&
                    !event.target.closest('.message-box')) {
                    this.classList.add('expanded');
                    if (backgroundBlurChat) {
                        backgroundBlurChat.classList.add('active');
                    }
                    scrollToBottom(); // Gọi hàm toàn cục
                    setTimeout(updateScrollButton, 100);
                }
            }
        });

        document.addEventListener('click', function(event) {
            if (currentActiveMessageBox && !currentActiveMessageBox.contains(event.target)) {
                hideInteractionButtons();
            }

            if (chatBubble.classList.contains('expanded') && !chatBubble.contains(event.target)) {
                chatBubble.classList.remove('expanded');
                if (backgroundBlurChat) {
                    backgroundBlurChat.classList.remove('active');
                }
                if (scrollToBottomBtn) {
                    scrollToBottomBtn.classList.remove('show');
                }
            }
        });
    } else {
        console.error("Không tìm thấy phần tử #chat-bubble. Vui lòng đảm bảo ID chính xác.");
    }

    // --- Logic Click vào #note-background để Sync ---
    if (noteBackground && syncLoadingOverlay && chatBubble) {
        noteBackground.addEventListener('click', async function(event) {
            event.stopPropagation();

            if (!chatBubble.classList.contains('expanded')) {
                chatBubble.classList.add('expanded');
                if (backgroundBlurChat) {
                    backgroundBlurChat.classList.add('active');
                }
                scrollToBottom(); // Gọi hàm toàn cục
                setTimeout(updateScrollButton, 100);
                return;
            }

            if (chatBubble.classList.contains('expanded')) {
                syncLoadingOverlay.classList.add('active');

                try {
                    await loadAllMessages(true);
                    console.log("Đồng bộ dữ liệu từ Google Sheet thành công!");
                    showTemporaryNotification('Dữ liệu đã được đồng bộ!');
                } catch (error) {
                    console.error("Lỗi khi đồng bộ dữ liệu từ Google Sheet:", error);
                    alert("Lỗi khi đồng bộ dữ liệu: " + error.message);
                } finally {
                    syncLoadingOverlay.classList.remove('active');
                }
            }
        });
    } else {
        console.error("Không tìm thấy #note-background, #sync-loading-overlay hoặc #chat-bubble. Vui lòng kiểm tra lại HTML.");
    }

    const maxTextAreaHeight = 400;
    const minTextAreaHeight = 40;

    if (textInput) {
        function adjustHeight() {
            const currentHeight = parseInt(textInput.style.height) || minTextAreaHeight;

            textInput.style.transition = 'none';
            textInput.style.height = 'auto';

            let newHeight = Math.max(Math.ceil(textInput.scrollHeight), minTextAreaHeight);

            if (newHeight > maxTextAreaHeight) {
                newHeight = maxTextAreaHeight;
                textInput.style.overflowY = 'auto';
            } else {
                textInput.style.overflowY = 'hidden';
            }

            if (Math.abs(newHeight - currentHeight) > 3) {
                textInput.style.height = currentHeight + 'px';
                textInput.offsetHeight;
                textInput.style.transition = 'height 0.3s ease';
                textInput.style.height = newHeight + 'px';
            } else {
                textInput.style.height = newHeight + 'px';
            }
        }

        textInput.addEventListener('input', adjustHeight);
        adjustHeight();
        window.addEventListener('resize', adjustHeight);
    } else {
        console.error("Không tìm thấy phần tử .text-input. Vui lòng đảm bảo class hoặc ID chính xác.");
    }

    // --- XỬ LÝ GỬI TIN NHẮN (VĂN BẢN) ---
    if (sendButton && textInput && chatContentArea && toolbarLoadingOverlay) {
        sendButton.addEventListener('click', async function() {
            const messageText = textInput.value.trim();

            if (messageText) {
                toolbarLoadingOverlay.classList.add('active');

                try {
                    const response = await fetch(GAS_WEB_APP_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'text/plain;charset=utf-8'
                        },
                        body: JSON.stringify({
                            action: 'saveMessage',
                            content: messageText
                        })
                    });

                    const result = await response.json();

                    if (result.status === 'success') {
                        console.log('Tin nhắn đã được gửi và lưu thành công:', messageText);
                        textInput.value = '';
                        adjustHeight();
                        await loadAllMessages(true);
                        showTemporaryNotification('Đã gửi tin nhắn!');
                    } else {
                        console.error('Lỗi khi lưu tin nhắn:', result.message);
                        alert('Lỗi khi gửi tin nhắn: ' + result.message);
                    }
                } catch (error) {
                    console.error('Lỗi kết nối hoặc API:', error);
                    alert('Lỗi kết nối hoặc API: ' + error.message);
                } finally {
                    toolbarLoadingOverlay.classList.remove('active');
                }
            }
        });

        textInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                sendButton.click();
            }
        });
    } else {
        console.error("Không tìm thấy một hoặc nhiều phần tử: sendButton, textInput, chatContentArea, toolbarLoadingOverlay. Vui lòng kiểm tra lại HTML.");
    }

    // --- XỬ LÝ NÚT PLUS VÀ TẢI FILE LÊN CLOUDINARY HOẶC GOOGLE DRIVE (QUA APPS SCRIPT) ---
    if (plusButton) {
        plusButton.addEventListener('click', async function(event) {
            event.stopPropagation();

            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.style.display = 'none';
            document.body.appendChild(fileInput);

            const fileChosenPromise = new Promise(resolve => {
                fileInput.addEventListener('change', function handler(e) {
                    fileInput.removeEventListener('change', handler);
                    resolve(e.target.files[0]);
                }, {
                    once: true
                });
            });

            fileInput.click();

            const file = await fileChosenPromise;

            document.body.removeChild(fileInput);

            if (!file) {
                console.log("Người dùng đã hủy chọn file.");
                return;
            }

            console.log("File được chọn:", file.name, file.type, file.size);
            toolbarLoadingOverlay.classList.add('active'); // Kích hoạt loading

            let storagePlatform = 'Google Drive'; // Mặc định là Google Drive
            let useCloudinary = true;

            try {
                // --- KIỂM TRA ĐIỀU KIỆN CLOUDINARY TRÊN FRONTEND ---
                if (file.type.startsWith('image/') && file.size > CLOUDINARY_MAX_IMAGE_SIZE) {
                    console.warn(`File ảnh quá lớn (${formatFileSize(file.size)}). Chuyển sang Google Drive.`);
                    useCloudinary = false;
                } else if (file.type.startsWith('video/') && file.size > CLOUDINARY_MAX_VIDEO_SIZE) {
                    console.warn(`File video quá lớn (${formatFileSize(file.size)}). Chuyển sang Google Drive.`);
                    useCloudinary = false;
                } else if (!file.type.startsWith('image/') && !file.type.startsWith('video/') && file.size > CLOUDINARY_MAX_RAW_SIZE) {
                    console.warn(`File khác quá lớn (${formatFileSize(file.size)}). Chuyển sang Google Drive.`);
                    useCloudinary = false;
                }

                // Kiểm tra xem CLOUDINARY_CLOUD_NAME và CLOUDINARY_UPLOAD_PRESET có được cấu hình không
                if (useCloudinary && CLOUDINARY_CLOUD_NAME && CLOUDINARY_UPLOAD_PRESET) {
                    try {
                        // --- BƯỚC 1A: Tải file lên Cloudinary ---
                        const formData = new FormData();
                        formData.append('file', file);
                        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
                        formData.append('cloud_name', CLOUDINARY_CLOUD_NAME);

                        const cloudinaryResponse = await fetch(CLOUDINARY_UPLOAD_URL, {
                            method: 'POST',
                            body: formData
                        });

                        const cloudinaryResult = await cloudinaryResponse.json();

                        if (cloudinaryResult.error) {
                            console.warn('Lỗi từ Cloudinary, thử tải lên Google Drive:', cloudinaryResult.error.message);
                            useCloudinary = false; // Chuyển sang Google Drive
                        } else {
                            storagePlatform = 'Cloudinary';
                            const fileUrl = cloudinaryResult.secure_url;
                            const resourceType = cloudinaryResult.resource_type; // 'image', 'video', 'raw'
                            const cloudinaryFormat = cloudinaryResult.format; // 'jpg', 'mp4', 'rar'

                            let detectedMimeType;
                            if (resourceType === 'image') {
                                detectedMimeType = `image/${cloudinaryFormat}`;
                            } else if (resourceType === 'video') {
                                detectedMimeType = `video/${cloudinaryFormat}`;
                            } else if (resourceType === 'raw') {
                                // Đối với raw files (bao gồm .rar), sử dụng ánh xạ hoặc fallback về type gốc nếu cần
                                const extension = file.name.toLowerCase().split('.').pop();
                                const extensionToMimeTypeMap = {
                                    'rar': 'application/x-rar-compressed',
                                    'zip': 'application/zip',
                                    'pdf': 'application/pdf', // Đảm bảo PDF cũng được xử lý nếu nó là 'raw'
                                    // Thêm các ánh xạ khác nếu cần
                                };
                                detectedMimeType = extensionToMimeTypeMap[extension] || file.type;
                            } else {
                                detectedMimeType = file.type; // Fallback về MIME type gốc từ trình duyệt
                            }


                            const fileSize = cloudinaryResult.bytes;
                            const fileName = file.name;

                            console.log('File đã tải lên Cloudinary:', fileUrl);
                            console.log('Detected MIME Type for Cloudinary:', detectedMimeType); // Log để kiểm tra

                            // --- BƯỚC 2A: Lưu metadata file Cloudinary vào Google Sheet qua Apps Script ---
                            const saveMetadataResponse = await fetch(GAS_WEB_APP_URL, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'text/plain;charset=utf-8'
                                },
                                body: JSON.stringify({
                                    action: 'saveFileMetadata',
                                    platform: 'cloudinary',
                                    fileData: {
                                        type: resourceType, // Gửi resource type của Cloudinary
                                        fileName: fileName,
                                        mimeType: detectedMimeType, // Gửi MIME type đã xử lý
                                        fileSize: fileSize,
                                        fileUrl: fileUrl
                                    }
                                })
                            });

                            const saveMetadataResult = await saveMetadataResponse.json();

                            if (saveMetadataResult.status === 'success') {
                                console.log('Thông tin file Cloudinary đã được lưu vào Sheet:', saveMetadataResult.message);
                                showTemporaryNotification(`Đã lưu file vào Cloudinary!`);
                            } else {
                                console.error('Lỗi khi lưu thông tin file Cloudinary vào Sheet:', saveMetadataResult.message);
                                alert('Lỗi khi lưu thông tin file Cloudinary vào Sheet: ' + saveMetadataResult.message);
                                useCloudinary = false; // Nếu lưu metadata thất bại, coi như Cloudinary thất bại
                            }
                        }
                    } catch (cloudinaryUploadError) {
                        console.warn('Lỗi kết nối Cloudinary, thử tải lên Google Drive:', cloudinaryUploadError);
                        useCloudinary = false;
                    }
                } else {
                    // Nếu Cloudinary không được cấu hình hoặc file quá lớn, buộc phải dùng Google Drive
                    useCloudinary = false;
                }


                if (!useCloudinary) {
                    // --- BƯỚC 1B: Tải file lên Google Drive QUA APPS SCRIPT ---
                    storagePlatform = 'Google Drive';

                    const formData = new FormData();
                    formData.append('action', 'uploadFileToDrive'); // Thêm action cho Apps Script
                    formData.append('file', file); // Thêm file trực tiếp vào FormData

                    const driveUploadResponse = await fetch(GAS_WEB_APP_URL, {
                        method: 'POST',
                        body: formData // Gửi FormData trực tiếp
                    });

                    const driveUploadResult = await driveUploadResponse.json();

                    if (driveUploadResult.status === 'success') {
                        console.log('File đã được tải lên Google Drive qua Apps Script:', driveUploadResult);
                        showTemporaryNotification(`Đã lưu file vào Google Drive!`);
                        // Apps Script đã tự lưu metadata, không cần gọi lại
                    } else {
                        console.error('Lỗi khi tải file lên Google Drive qua Apps Script:', driveUploadResult.message);
                        alert('Lỗi khi tải file lên Google Drive: ' + driveUploadResult.message);
                    }
                }

                // Luôn làm sạch UI và tải lại tin nhắn sau khi upload xong (hoặc thất bại)
                textInput.value = '';
                adjustHeight();
                await loadAllMessages(true);

            } catch (mainError) {
                console.error('Lỗi tổng quan trong quá trình tải file:', mainError);
                alert('Lỗi tổng quan khi tải file: ' + mainError.message);
            } finally {
                toolbarLoadingOverlay.classList.remove('active'); // Tắt loading
            }
        });
    } else {
        console.error("Không tìm thấy phần tử .plus-button. Vui lòng đảm bảo class hoặc ID chính xác.");
    }


    // --- TẢI TẤT CẢ TIN NHẮN (BAO GỒM VĂN BẢN VÀ FILE) ---
    async function loadAllMessages(forceScrollToBottom = false) {
        if (!chatContentArea) return;

        const currentScrollTop = chatContentArea.scrollTop;
        const currentScrollHeight = chatContentArea.scrollHeight;

        try {
            const response = await fetch(GAS_WEB_APP_URL + '?action=getAllMessages', {
                method: 'GET'
            });

            const messages = await response.json();
            chatContentArea.innerHTML = ''; // Xóa nội dung cũ

            messages.sort((a, b) => {
                const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
                const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
                return timeA - timeB;
            });

            messages.forEach((msgObj, index) => {
                if (msgObj) {
                    const messageBox = document.createElement('div');
                    messageBox.classList.add('message-box');
                    // Gán index + 1 vì Apps Script dùng 1-based index cho hàng
                    messageBox.dataset.messageIndex = index + 1;

                    // Xử lý tin nhắn văn bản
                    if (msgObj.type === 'text') {
                        const paragraph = document.createElement('p');
                        paragraph.textContent = msgObj.content;
                        messageBox.appendChild(paragraph);
                    } else { // Xử lý file (bao gồm image/pdf)
                        const fileLink = msgObj.fileUrl;
                        const fileName = msgObj.fileName;
                        const fileSize = msgObj.fileSize;
                        let mimeType = msgObj.mimeType; // MIME type từ backend
                        const filePlatform = msgObj.filePlatform; // Lấy nền tảng lưu trữ

                        // Sửa MIME type cho PDF nếu cần (hoặc từ backend trả về sai)
                        if (mimeType === 'image/pdf') {
                            mimeType = 'application/pdf';
                        } else if (mimeType && mimeType.includes('rar')) { // Thêm xử lý cho .rar từ backend
                            mimeType = 'application/x-rar-compressed';
                        }


                        messageBox.dataset.fileUrl = fileLink;
                        messageBox.dataset.filePlatform = filePlatform; // Lưu nền tảng vào dataset

                        // Xử lý hiển thị dựa trên type
                        if (msgObj.type === 'image' && mimeType && !mimeType.includes('pdf')) { // Kiểm tra mimeType không phải PDF
                            const img = document.createElement('img');
                            img.src = fileLink;
                            img.alt = fileName;
                            img.classList.add('chat-image');
                            messageBox.appendChild(img);
                        } else if (msgObj.type === 'video') {
                            const video = document.createElement('video');
                            video.src = fileLink;
                            video.controls = true;
                            video.preload = 'metadata';
                            video.alt = fileName;
                            video.classList.add('chat-video');
                            messageBox.appendChild(video);
                        } else if (msgObj.type === 'audio') {
                            const audio = document.createElement('audio');
                            audio.src = fileLink;
                            audio.controls = true;
                            audio.preload = 'metadata';
                            audio.alt = fileName;
                            audio.classList.add('chat-audio');
                            messageBox.appendChild(audio);

                            const audioFileNameP = document.createElement('p');
                            audioFileNameP.classList.add('file-name');
                            audioFileNameP.textContent = shortenFileName(fileName, 25);
                            messageBox.appendChild(audioFileNameP);
                        } else { // Xử lý các file khác, bao gồm PDF và RAR
                            const fileContentDiv = document.createElement('div');
                            fileContentDiv.classList.add('file-content');

                            // Sử dụng mimeType từ backend (đã được chuẩn hóa nếu cần)
                            const fileIconInfo = getFileIcon(mimeType, fileName);
                            const iconContainer = document.createElement('div');
                            iconContainer.classList.add('file-avatar-container');
                            if (fileIconInfo.class) {
                                iconContainer.classList.add(fileIconInfo.class);
                            }
                            iconContainer.innerHTML = fileIconInfo.svg;

                            fileContentDiv.appendChild(iconContainer);

                            const fileInfoDiv = document.createElement('div');
                            fileInfoDiv.classList.add('file-info');

                            const fileNameP = document.createElement('p');
                            fileNameP.classList.add('file-name');
                            fileNameP.textContent = shortenFileName(fileName, 25);
                            fileInfoDiv.appendChild(fileNameP);

                            const fileSizeP = document.createElement('p');
                            fileSizeP.classList.add('file-size');
                            fileSizeP.textContent = formatFileSize(fileSize);
                            fileInfoDiv.appendChild(fileSizeP);

                            fileContentDiv.appendChild(fileInfoDiv);
                            messageBox.appendChild(fileContentDiv);
                        }
                    }
                    chatContentArea.appendChild(messageBox);
                }
            });

            if (forceScrollToBottom) {
                scrollToBottom();
            } else {
                const newScrollHeight = chatContentArea.scrollHeight;
                const scrollRatio = currentScrollTop / currentScrollHeight;
                chatContentArea.scrollTop = scrollRatio * newScrollHeight;
            }

            addMessageBoxEventListeners();
            setTimeout(updateScrollButton, 100);

        } catch (error) {
            console.error('Lỗi khi tải tin nhắn:', error);
            alert('Lỗi khi tải tin nhắn: ' + error.message);
        }
    }


    // Khởi tạo các ngôi sao
    function createBoxShadows(count, maxX, maxY) {
        let shadows = [];
        for (let i = 0; i < count; i++) {
            const x = Math.floor(Math.random() * maxX);
            const y = Math.floor(Math.random() * maxY);
            shadows.push(`${x}px ${y}px #FFF`);
        }
        return shadows.join(', ');
    }

    const starsElement = document.getElementById('stars');
    const stars2Element = document.getElementById('stars2');
    const stars3Element = document.getElementById('stars3');

    const expandedWidth = 900;
    const expandedHeight = 480;
    const bufferHeight = 100;

    if (starsElement) {
        starsElement.style.boxShadow = createBoxShadows(700, expandedWidth, expandedHeight + bufferHeight);
        starsElement.style.setProperty('--star-animation-height', `${expandedHeight + bufferHeight}px`);
    }
    if (stars2Element) {
        stars2Element.style.boxShadow = createBoxShadows(200, expandedWidth, expandedHeight + bufferHeight);
        stars2Element.style.setProperty('--star-animation-height', `${expandedHeight + bufferHeight}px`);
    }
    if (stars3Element) {
        stars3Element.style.boxShadow = createBoxShadows(100, expandedWidth, expandedHeight + bufferHeight);
        stars3Element.style.setProperty('--star-animation-height', `${expandedHeight + bufferHeight}px`);
    }
});