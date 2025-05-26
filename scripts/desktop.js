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
    const noteBackground = document.getElementById('note-background'); 
    const syncLoadingOverlay = document.getElementById('sync-loading-overlay'); 

    const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyCvMLNa8Q5lXVwg2Dda_LlkmvkEvzkNEEMJTOnffrlmuHRb9vqXDVnTPwkXCEa_xDEIA/exec';

    let currentActiveMessageBox = null; 

    // --- SỬA ĐỔI PHẦN NÀY ĐỂ HIỂN THỊ LOADING NGAY LẬP TỨC KHI TẢI TRANG ---
    async function initializeChat() {
        if (syncLoadingOverlay) {
            syncLoadingOverlay.classList.add('active'); // Hiển thị loading overlay
        }
        try {
            await loadAllMessages(true); // Tải tin nhắn lần đầu
        } catch (error) {
            console.error("Lỗi khi tải tin nhắn ban đầu:", error);
        } finally {
            if (syncLoadingOverlay) {
                syncLoadingOverlay.classList.remove('active'); // Ẩn loading overlay sau khi tải xong
            }
        }
    }

    initializeChat(); // Gọi hàm khởi tạo khi DOM đã sẵn sàng
    // --- KẾT THÚC SỬA ĐỔI PHẦN NÀY ---

    // --- Logic Chat Bubble Expand/Collapse ---
    if (chatBubble) {
        chatBubble.addEventListener('click', function(event) {
            if (!this.classList.contains('expanded')) {
                if (!event.target.closest('#note-background') && 
                    !event.target.closest('.chat-toolbar') && 
                    !event.target.closest('.message-box')) 
                {
                    this.classList.add('expanded');
                    if (backgroundBlurChat) {
                        backgroundBlurChat.classList.add('active');
                    }
                    scrollToBottom();
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
                scrollToBottom();
                return; 
            } 
            
            if (chatBubble.classList.contains('expanded')) { 
                syncLoadingOverlay.classList.add('active'); 

                try {
                    await loadAllMessages(true); 
                    console.log("Đồng bộ dữ liệu từ Google Sheet thành công!");
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
    } else {
        console.error("Không tìm thấy phần tử .text-input. Vui lòng đảm bảo class hoặc ID chính xác.");
    }

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
                        await loadAllMessages(true); 
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

    async function loadAllMessages(forceScrollToBottom = false) {
        if (!chatContentArea) return;

        try {
            const response = await fetch(GAS_WEB_APP_URL, {
                method: 'GET'
            });

            let messages = await response.json();
            chatContentArea.innerHTML = ''; 

            messages.forEach((msg, index) => { 
                if (msg) {
                    const messageBox = document.createElement('div');
                    messageBox.classList.add('message-box');
                    messageBox.dataset.messageIndex = index + 1; 

                    const paragraph = document.createElement('p');
                    paragraph.textContent = msg;

                    messageBox.appendChild(paragraph);
                    chatContentArea.appendChild(messageBox);
                }
            });

            if (forceScrollToBottom) {
                scrollToBottom();
            } 

            addMessageBoxEventListeners();

        } catch (error) {
            console.error('Lỗi khi tải tin nhắn:', error);
            // Có thể hiển thị một thông báo lỗi trên giao diện nếu muốn
        }
        // Lưu ý: Việc ẩn loading overlay đã được chuyển ra ngoài hàm loadAllMessages
        // để xử lý tại nơi gọi hàm này (initializeChat hoặc noteBackground click)
    }

    function scrollToBottom() {
        chatContentArea.scrollTop = chatContentArea.scrollHeight;
    }

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

    function showInteractionButtons(messageBox) {
        hideInteractionButtons(); 

        currentActiveMessageBox = messageBox;

        const copyButton = document.createElement('div');
        copyButton.classList.add('interaction-button', 'blue');
        const copyImg = document.createElement('img');
        copyImg.src = 'assets/img/copy.png'; 
        copyImg.alt = 'Copy';
        copyButton.appendChild(copyImg);
        messageBox.appendChild(copyButton);

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
            
            try {
                toolbarLoadingOverlay.classList.add('active'); 
                
                const response = await fetch(GAS_WEB_APP_URL + '?action=delete&index=' + messageIndex, {
                    method: 'GET', 
                });
                const result = await response.json();

                if (result.status === 'success') {
                    console.log('Tin nhắn đã được xóa thành công.');
                    await loadAllMessages(true); 
                } else {
                    console.error('Lỗi khi xóa tin nhắn:', result.message);
                    alert('Lỗi khi xóa tin nhắn: ' + result.message);
                }
            } catch (error) {
                console.error('Lỗi kết nối hoặc API khi xóa:', error);
                alert('Lỗi kết nối hoặc API khi xóa: ' + error.message);
            } finally {
                toolbarLoadingOverlay.classList.remove('active');
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
        document.querySelectorAll('.message-box').forEach(box => {
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