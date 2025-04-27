const searchIcon = document.getElementById('search-icon');
const searchOptions = document.getElementById('search-options');
const searchForm = document.getElementById('search-form');
const searchBar = document.getElementById('search-bar');
const blur = document.getElementById('background-blur');
const searchLinks = searchOptions.querySelectorAll('a');

// Placeholder mặc định theo công cụ tìm kiếm
const placeholders = {
    "https://www.google.com/search": "Search on Google...",
    "https://paulgo.io/search": "Search on SearXNG...",
    "https://search.brave.com/search": "Search on Brave...",
    "https://www.bing.com/search": "Search on Bing...",
    "https://duckduckgo.com/": "Search on DuckDuckGo"
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



const segmentMap = {
    0: ['top', 'top-right', 'top-left', 'bot-right', 'bot-left', 'bot'],
    1: ['top-right', 'bot-right'],
    2: ['top', 'top-right', 'between', 'bot-left', 'bot'],
    3: ['top', 'top-right', 'between', 'bot-right', 'bot'],
    4: ['top-left', 'top-right', 'between', 'bot-right'],
    5: ['top', 'top-left', 'between', 'bot-right', 'bot'],
    6: ['top', 'top-left', 'between', 'bot-right', 'bot-left', 'bot'],
    7: ['top', 'top-right', 'bot-right'],
    8: ['top', 'top-right', 'top-left', 'between', 'bot-right', 'bot-left', 'bot'],
    9: ['top', 'top-left', 'top-right', 'between', 'bot-right', 'bot']
};

function updateClock() {
    const now = new Date();
    // Lấy giờ Việt Nam (GMT+7) bằng cách sử dụng toLocaleString với múi giờ Asia/Ho_Chi_Minh
    const vnTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));
    const hours = vnTime.getHours(); // Lấy giờ (0-23)
    const minutes = vnTime.getMinutes();
    const seconds = vnTime.getSeconds();
    
    const hourFirstDigit = Math.floor(hours / 10); // Chữ số đầu của giờ
    const hourSecondDigit = hours % 10; // Chữ số thứ hai của giờ
    const minuteFirstDigit = Math.floor(minutes / 10);
    const minuteSecondDigit = minutes % 10;
    const secondFirstDigit = Math.floor(seconds / 10);
    const secondSecondDigit = seconds % 10;

    // Ghi log để kiểm tra
    console.log(`Thời gian VN: ${hours}:${minutes}:${seconds}`);
    console.log(`Chữ số giờ: ${hourFirstDigit}, ${hourSecondDigit}`);

    // Đặt lại tất cả các đoạn và thêm hiệu ứng chuyển đổi
    ['h1', 'h2', 'm1', 'm2', 's1', 's2'].forEach(prefix => {
        ['top', 'top-right', 'top-left', 'between', 'bot-right', 'bot-left', 'bot'].forEach(segment => {
            const element = document.querySelector(`#${prefix}-${segment}`);
            if (element) {
                element.style.transition = 'background 0.3s ease';
                element.style.background = 'rgba(0, 0, 0, 0.2)';
            } else {
                console.warn(`Không tìm thấy phần tử #${prefix}-${segment}`);
            }
        });
    });

    // Cập nhật chữ số đầu của giờ (h1)
    segmentMap[hourFirstDigit].forEach(segment => {
        const element = document.querySelector(`#h1-${segment}`);
        if (element) {
            element.style.background = 'rgb(255, 217, 0)';
        }
    });

    // Cập nhật chữ số thứ hai của giờ (h2)
    segmentMap[hourSecondDigit].forEach(segment => {
        const element = document.querySelector(`#h2-${segment}`);
        if (element) {
            element.style.background = 'rgb(255, 217, 0)';
        }
    });

    // Cập nhật chữ số đầu của phút (m1)
    segmentMap[minuteFirstDigit].forEach(segment => {
        const element = document.querySelector(`#m1-${segment}`);
        if (element) {
            element.style.background = 'rgb(255, 217, 0)';
        }
    });

    // Cập nhật chữ số thứ hai của phút (m2)
    segmentMap[minuteSecondDigit].forEach(segment => {
        const element = document.querySelector(`#m2-${segment}`);
        if (element) {
            element.style.background = 'rgb(255, 217, 0)';
        }
    });

    // Cập nhật chữ số đầu của giây (s1)
    segmentMap[secondFirstDigit].forEach(segment => {
        const element = document.querySelector(`#s1-${segment}`);
        if (element) {
            element.style.background = 'rgb(255, 217, 0)';
        }
    });

    // Cập nhật chữ số thứ hai của giây (s2)
    segmentMap[secondSecondDigit].forEach(segment => {
        const element = document.querySelector(`#s2-${segment}`);
        if (element) {
            element.style.background = 'rgb(255, 217, 0)';
        }
    });
}

// Cập nhật đồng hồ ngay lập tức và sau đó mỗi giây
updateClock();
setInterval(updateClock, 1000);