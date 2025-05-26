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















document.addEventListener('DOMContentLoaded', function() {
    const chatBubble = document.getElementById('chat-bubble');
    const backgroundBlurChat = document.querySelector('.background-blur-chat');
    const sendButton = document.querySelector('.chat-toolbar .send-button');
    const textInput = document.querySelector('.chat-toolbar .text-input');
    const chatContentArea = document.querySelector('.chat-content-area');
    const toolbarLoadingOverlay = document.getElementById('toolbar-loading-overlay'); 

    // Cập nhật URL Web App mới nhất của bạn
    const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyCvMLNa8Q5lXVwg2Dda_LlkmvkEvzkNEEMJTOnffrlmuHRb9vqXDVnTPwkXCEa_xDEIA/exec';

    let currentActiveMessageBox = null; 
    let lastScrollTop = 0; 
    // const messageElements = new Map(); // Hiện tại không cần Map này với cách render lại toàn bộ

    // --- Tải tin nhắn ngay khi trang tải xong ---
    loadAllMessages(true); // Tải tất cả tin nhắn và cuộn xuống cuối (lần đầu)

    // --- Logic Chat Bubble Expand/Collapse ---
    if (chatBubble) {
        chatBubble.addEventListener('click', function(event) {
            event.stopPropagation();
            if (!this.classList.contains('expanded')) {
                this.classList.add('expanded');
                if (backgroundBlurChat) {
                    backgroundBlurChat.classList.add('active');
                }
                scrollToBottom();
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
            }
        });
    } else {
        console.error("Không tìm thấy phần tử #chat-bubble. Vui lòng đảm bảo ID chính xác.");
    }

    // --- Logic Tự động tăng chiều cao TextArea ---
    const maxTextAreaHeight = 400;
    const minTextAreaHeight = 40;

    if (textInput) {
        function adjustHeight() {
            textInput.style.height = 'auto';
            let newHeight = Math.ceil(textInput.scrollHeight);
            const paddingBuffer = 2;
            newHeight = newHeight + paddingBuffer;

            if (newHeight < minTextAreaHeight) {
                newHeight = minTextAreaHeight;
            }

            if (newHeight > maxTextAreaHeight) {
                newHeight = maxTextAreaHeight;
                textInput.style.overflowY = 'auto';
            } else {
                textInput.style.overflowY = 'hidden';
            }
            textInput.style.height = newHeight + 'px';
        }

        textInput.addEventListener('input', adjustHeight);
        adjustHeight();
        window.addEventListener('resize', adjustHeight);
    }

    // --- Logic Gửi Tin Nhắn ---
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
                        body: messageText
                    });

                    const result = await response.json();

                    if (result.status === 'success') {
                        console.log('Tin nhắn đã được gửi và lưu thành công:', messageText);
                        textInput.value = '';
                        adjustHeight();
                        await loadAllMessages(true); // Gửi tin nhắn mới thì vẫn cuộn xuống cuối
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
    }

    // --- Hàm Tải TẤT CẢ Tin Nhắn (Đã cải tiến cho hiệu ứng xóa) ---
    async function loadAllMessages(forceScrollToBottom = false) {
        if (!chatContentArea) return;

        try {
            const response = await fetch(GAS_WEB_APP_URL, {
                method: 'GET'
            });

            let newMessages = await response.json();
            
            // Lấy danh sách tin nhắn hiện có trong DOM
            const existingMessageBoxes = Array.from(chatContentArea.querySelectorAll('.message-box'));
            
            const messagesToAdd = [];
            const messagesToKeep = new Set(); // Dùng để theo dõi những tin nhắn vẫn còn
            
            // Xây dựng danh sách các tin nhắn mới để thêm vào DOM
            // Đồng thời đánh dấu những tin nhắn cũ vẫn còn tồn tại
            newMessages.forEach((msg, newIndex) => {
                const existingBox = existingMessageBoxes.find(box => 
                    box.querySelector('p')?.textContent === msg // Tìm tin nhắn cũ có nội dung khớp
                );

                if (existingBox) {
                    // Nếu tin nhắn đã tồn tại, cập nhật data-message-index
                    existingBox.dataset.messageIndex = newIndex + 1;
                    messagesToKeep.add(existingBox); // Đánh dấu là giữ lại
                } else {
                    // Tin nhắn mới, tạo element và đánh dấu để thêm vào
                    const messageBox = document.createElement('div');
                    messageBox.classList.add('message-box');
                    const paragraph = document.createElement('p');
                    paragraph.textContent = msg;
                    messageBox.appendChild(paragraph);
                    messageBox.dataset.messageIndex = newIndex + 1;
                    messagesToAdd.push(messageBox);
                }
            });

            // Loại bỏ các tin nhắn không còn tồn tại trong danh sách mới (có animation)
            existingMessageBoxes.forEach(box => {
                if (!messagesToKeep.has(box)) {
                    box.classList.add('removing'); // Thêm class để fade out/slide out
                    box.addEventListener('transitionend', function handler() {
                        box.remove();
                        box.removeEventListener('transitionend', handler);
                    }, { once: true });
                }
            });

            // Thêm các tin nhắn mới vào DOM
            messagesToAdd.forEach(box => {
                chatContentArea.appendChild(box);
                // Kích hoạt animation 'appear' cho tin nhắn mới (nếu có trong CSS)
                // Timeout nhỏ để đảm bảo trình duyệt render element trước khi thêm class
                setTimeout(() => box.classList.add('loaded'), 10); 
            });


            if (forceScrollToBottom) {
                scrollToBottom();
            } else {
                // Đảm bảo cuộn về đúng vị trí sau khi các phần tử đã được render lại và chuyển động xong
                // Một timeout nhỏ có thể cần thiết nếu transition của removing quá dài
                setTimeout(() => {
                    chatContentArea.scrollTop = lastScrollTop;
                }, 300); // 300ms = thời gian transition của .message-box
            }

            addMessageBoxEventListeners(); // Gán lại event listeners cho các box mới/cập nhật

        } catch (error) {
            console.error('Lỗi khi tải tin nhắn:', error);
        } finally {
             // Đảm bảo loading overlay bị ẩn sau khi tất cả quá trình tải tin nhắn hoàn tất
             toolbarLoadingOverlay.classList.remove('active');
        }
    }

    // --- Hàm Cuộn xuống cuối ---
    function scrollToBottom() {
        chatContentArea.scrollTop = chatContentArea.scrollHeight;
    }

    // --- Logic Ngôi sao ngẫu nhiên (giữ nguyên) ---
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

    // --- Hàm Xử lý hiển thị/ẩn các nút tương tác ---
    function showInteractionButtons(messageBox) {
        hideInteractionButtons(); 

        currentActiveMessageBox = messageBox;

        // Tạo nút Copy (Blue)
        const copyButton = document.createElement('div');
        copyButton.classList.add('interaction-button', 'blue');
        const copyImg = document.createElement('img');
        copyImg.src = 'assets/img/copy.png'; 
        copyImg.alt = 'Copy';
        copyButton.appendChild(copyImg);
        messageBox.appendChild(copyButton);

        // Tạo nút Delete (Red)
        const deleteButton = document.createElement('div');
        deleteButton.classList.add('interaction-button', 'red');
        const deleteImg = document.createElement('img');
        deleteImg.src = 'assets/img/delete.png'; 
        deleteImg.alt = 'Delete';
        deleteButton.appendChild(deleteImg);
        messageBox.appendChild(deleteButton);

        setTimeout(() => {
            copyButton.classList.add('active');
            deleteButton.classList.add('active');
        }, 10); 

        copyButton.addEventListener('click', function(event) {
            event.stopPropagation(); 
            const textToCopy = messageBox.querySelector('p').textContent;
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    console.log('Đã sao chép vào clipboard:', textToCopy);
                })
                .catch(err => {
                    console.error('Không thể sao chép:', err);
                });
            hideInteractionButtons(); 
        });

        deleteButton.addEventListener('click', async function(event) {
            event.stopPropagation(); 
            const messageIndex = messageBox.dataset.messageIndex;
            
            lastScrollTop = chatContentArea.scrollTop; // Lưu vị trí cuộn hiện tại

            try {
                toolbarLoadingOverlay.classList.add('active'); 
                
                const response = await fetch(GAS_WEB_APP_URL + '?action=delete&index=' + messageIndex, {
                    method: 'GET', 
                });
                const result = await response.json();

                if (result.status === 'success') {
                    console.log('Tin nhắn đã được xóa thành công.');
                    // Gọi loadAllMessages để cập nhật và tạo hiệu ứng xóa
                    await loadAllMessages(false); 
                } else {
                    console.error('Lỗi khi xóa tin nhắn:', result.message);
                    alert('Lỗi khi xóa tin nhắn: ' + result.message);
                }
            } catch (error) {
                console.error('Lỗi kết nối hoặc API khi xóa:', error);
                alert('Lỗi kết nối hoặc API khi xóa: ' + error.message);
            } finally {
                // Loading overlay sẽ được ẩn trong loadAllMessages()
            }
            hideInteractionButtons(); 
        });
    }

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

    function addMessageBoxEventListeners() {
        // Chỉ gán lại cho các message box không phải là 'removing'
        document.querySelectorAll('.message-box:not(.removing)').forEach(box => {
            box.removeEventListener('click', handleMessageBoxClick);
            box.addEventListener('click', handleMessageBoxClick);
        });
    }

    function handleMessageBoxClick(event) {
        event.stopPropagation(); 
        showInteractionButtons(this);
    }

    addMessageBoxEventListeners();
});