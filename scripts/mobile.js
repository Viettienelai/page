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














// Khai báo biến này ở phạm vi toàn cục hoặc phạm vi cao hơn
let currentActiveMessageBox = null;

document.addEventListener('DOMContentLoaded', function() {
  const chatBubble = document.getElementById('chat-bubble');
  const backgroundBlurChat = document.querySelector('.background-blur-chat');
  const sendButton = document.querySelector('.chat-toolbar .send-button');
  const textInput = document.querySelector('.chat-toolbar .text-input');
  const chatContentArea = document.querySelector('.chat-content-area');
  const toolbarLoadingOverlay = document.getElementById('toolbar-loading-overlay');
  const noteBackground = document.getElementById('note-background');
  const syncLoadingOverlay = document.getElementById('sync-loading-overlay');
  const scrollToBottomBtn = document.getElementById('scroll-to-bottom-btn');
  const plusButton = document.querySelector('.plus-button');

  const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyxKvzpmeGbD8cv-CjoFTK8lgLdJPt89iHJJpzsS2HfK0MlEgO_Yh-7c9AMeTKng_i_fg/exec'; // ĐẶT URL THỰC CỦA BẠN VÀO ĐÂY

  // --- HÀM HỖ TRỢ ĐỊNH DẠNG KÍCH THƯỚC FILE ---
  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // --- HÀM ẨN CÁC NÚT TƯƠNG TÁC ---
  function hideInteractionButtons() {
    if (currentActiveMessageBox) {
      const buttons = currentActiveMessageBox.querySelectorAll('.interaction-button');
      buttons.forEach(button => {
        button.classList.remove('active');
        button.classList.add('hide');
        // Xóa nút khỏi DOM sau khi animation kết thúc để tránh tích tụ phần tử
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
    hideInteractionButtons(); // Đảm bảo ẩn các nút của box trước đó

    currentActiveMessageBox = messageBox;

    const copyDownloadButton = document.createElement('div');
    copyDownloadButton.classList.add('interaction-button', 'blue');
    const copyDownloadImg = document.createElement('img');

    // Kiểm tra xem đây là hộp file hay hộp văn bản
    if (messageBox.dataset.fileUrl) {
      copyDownloadImg.src = 'assets/img/download.png'; // Thay đổi icon nếu là file
      copyDownloadImg.alt = 'Download';
      copyDownloadButton.dataset.action = 'download';
    } else {
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

    // Kích hoạt animation hiện ra
    setTimeout(() => {
      copyDownloadButton.classList.add('active');
      deleteButton.classList.add('active');
    }, 10);

    // Event listeners cho các nút tương tác
    copyDownloadButton.addEventListener('click', function(event) {
      event.stopPropagation(); // Ngăn sự kiện click lan truyền đến messageBox hoặc document
      if (this.dataset.action === 'download') {
        const fileUrl = messageBox.dataset.fileUrl;
        if (fileUrl) {
          window.open(fileUrl, '_blank'); // Mở URL file để tải xuống
          console.log('Đang tải xuống file:', fileUrl);
        }
      } else { // copy
        const textToCopy = messageBox.querySelector('p') ? messageBox.querySelector('p').textContent : '';
        if (textToCopy) {
          navigator.clipboard.writeText(textToCopy)
            .then(() => {
              console.log('Đã sao chép vào clipboard:', textToCopy);
            })
            .catch(err => {
              console.error('Không thể sao chép:', err);
              alert('Không thể sao chép. Vui lòng thử lại hoặc sao chép thủ công.');
            });
        }
      }
      hideInteractionButtons(); // Ẩn các nút sau khi thực hiện hành động
    });

    deleteButton.addEventListener('click', async function(event) {
      event.stopPropagation(); // Ngăn sự kiện click lan truyền đến messageBox hoặc document
      const messageIndex = messageBox.dataset.messageIndex; // Đây là index của hàng trong Google Sheet

      if (confirm("Bạn có chắc muốn xóa tin nhắn này không?")) { // Thêm xác nhận xóa
        try {
          toolbarLoadingOverlay.classList.add('active'); // Hiển thị loading

          // Gửi yêu cầu DELETE đến Apps Script
          const response = await fetch(GAS_WEB_APP_URL + '?action=delete&index=' + messageIndex, {
            method: 'GET', // Hoặc 'POST' nếu bạn muốn gửi dữ liệu trong body
          });
          const result = await response.json();

          if (result.status === 'success') {
            console.log('Tin nhắn đã được xóa thành công.');
            await loadAllMessages(false); // Tải lại tin nhắn mà không cuộn xuống cuối
          } else {
            console.error('Lỗi khi xóa tin nhắn:', result.message);
            alert('Lỗi khi xóa tin nhắn: ' + result.message);
          }
        } catch (error) {
          console.error('Lỗi kết nối hoặc API khi xóa:', error);
          alert('Lỗi kết nối hoặc API khi xóa: ' + error.message);
        } finally {
          toolbarLoadingOverlay.classList.remove('active'); // Ẩn loading
        }
        hideInteractionButtons(); // Ẩn các nút sau khi thực hiện hành động
      }
    });
  }

  // --- HÀM XỬ LÝ SỰ KIỆN CLICK VÀO MESSAGE BOX ---
  function handleMessageBoxClick(event) {
    // Ngăn chặn sự kiện click lan truyền đến document hoặc chat bubble
    event.stopPropagation();

    // Nếu đã có một message box đang hoạt động, và đó không phải là box hiện tại, ẩn các nút cũ đi.
    if (currentActiveMessageBox && currentActiveMessageBox !== this) {
      hideInteractionButtons();
    }

    // Hiển thị các nút tương tác cho message box này
    showInteractionButtons(this); // 'this' ở đây chính là messageBox được click
  }

  // --- HÀM THÊM EVENT LISTENER CHO CÁC MESSAGE BOX ---
  function addMessageBoxEventListeners() {
    // Xóa listener cũ trước khi thêm mới để tránh trùng lặp
    document.querySelectorAll('.message-box').forEach(box => {
      box.removeEventListener('click', handleMessageBoxClick);
      box.addEventListener('click', handleMessageBoxClick);
    });
  }


  // --- KHỞI TẠO CHAT VÀ TẢI TIN NHẮN BAN ĐẦU ---
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


  // --- Scroll to Bottom Button Functions ---
  function isAtBottom() {
    if (!chatContentArea) return true;
    const threshold = 100; // 100px từ cuối
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

  function scrollToBottom() {
    if (chatContentArea) {
      chatContentArea.scrollTo({
        top: chatContentArea.scrollHeight,
        behavior: 'smooth'
      });
    }
  }

  // Event listener cho scroll
  if (chatContentArea) {
    chatContentArea.addEventListener('scroll', updateScrollButton);
  }

  // Event listener cho nút scroll to bottom
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
        // Đảm bảo không mở rộng khi click vào các phần tử tương tác bên trong bong bóng đã thu gọn
        if (!event.target.closest('#note-background') &&
            !event.target.closest('.chat-toolbar') &&
            !event.target.closest('.message-box'))
        {
          this.classList.add('expanded');
          if (backgroundBlurChat) {
            backgroundBlurChat.classList.add('active');
          }
          scrollToBottom();
          setTimeout(updateScrollButton, 100);
        }
      }
    });

    document.addEventListener('click', function(event) {
      // Ẩn các nút tương tác nếu click ra ngoài message box hiện tại
      if (currentActiveMessageBox && !currentActiveMessageBox.contains(event.target)) {
        hideInteractionButtons();
      }

      // Thu gọn chat bubble nếu click ra ngoài
      if (chatBubble.classList.contains('expanded') && !chatBubble.contains(event.target)) {
        chatBubble.classList.remove('expanded');
        if (backgroundBlurChat) {
          backgroundBlurChat.classList.remove('active');
        }
        // Ẩn scroll button khi collapse
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

      // Nếu chat bubble chưa mở, mở nó ra trước
      if (!chatBubble.classList.contains('expanded')) {
        chatBubble.classList.add('expanded');
        if (backgroundBlurChat) {
          backgroundBlurChat.classList.add('active');
        }
        scrollToBottom();
        setTimeout(updateScrollButton, 100);
        return;
      }

      // Nếu đã mở, tiến hành đồng bộ
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
        textInput.offsetHeight; // Force reflow
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

  // --- XỬ LÝ NÚT PLUS VÀ TẢI FILE ---
  if (plusButton) {
    plusButton.addEventListener('click', function(event) {
      event.stopPropagation(); // Ngăn sự kiện click bubble

      // Tạo một input type="file" ẩn và kích hoạt nó
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.style.display = 'none';
      document.body.appendChild(fileInput); // Cần thêm vào DOM để nó hoạt động

      fileInput.addEventListener('change', async function(e) {
        const file = e.target.files[0];
        if (file) {
          console.log("File được chọn:", file.name, file.type, file.size);
          toolbarLoadingOverlay.classList.add('active'); // Kích hoạt loading toolbar

          const reader = new FileReader();
          reader.onload = async function(event) {
            const base64Data = event.target.result.split(',')[1]; // Lấy phần base64 của file

            // *** SỬ DỤNG FormData ĐỂ TRÁNH LỖI CORS ***
            const formData = new FormData();
            formData.append('action', 'uploadFile'); // Tham số action cho Apps Script
            formData.append('fileName', file.name);
            formData.append('mimeType', file.type);
            formData.append('fileSize', file.size);
            formData.append('base64Data', base64Data);

            try {
              const response = await fetch(GAS_WEB_APP_URL, {
                method: 'POST',
                // KHÔNG SET Content-Type ở đây! Trình duyệt sẽ tự động đặt là multipart/form-data với boundary
                body: formData // Gửi FormData trực tiếp
              });

              const result = await response.json();

              if (result.status === 'success') {
                console.log('File đã được tải lên thành công:', result.message);
                textInput.value = '';
                adjustHeight();
                await loadAllMessages(true); // Tải lại tin nhắn để hiển thị file mới
              } else {
                console.error('Lỗi khi tải file lên:', result.message);
                alert('Lỗi khi tải file lên: ' + result.message);
              }
            } catch (error) {
              console.error('Lỗi kết nối hoặc API khi tải file:', error);
              alert('Lỗi kết nối hoặc API khi tải file: ' + error.message);
            } finally {
              toolbarLoadingOverlay.classList.remove('active'); // Ẩn loading toolbar
            }
          };
          reader.readAsDataURL(file); // Đọc file dưới dạng Base64
        }
        document.body.removeChild(fileInput); // Xóa input file sau khi sử dụng
      });
      fileInput.click(); // Mở trình quản lý file
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

      const messages = await response.json(); // Nhận mảng các đối tượng tin nhắn/file
      chatContentArea.innerHTML = ''; // Xóa nội dung cũ

      // Sắp xếp tin nhắn theo Timestamp nếu có, nếu không thì theo thứ tự nhận được
      messages.sort((a, b) => {
        const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
        const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
        return timeA - timeB;
      });

      messages.forEach((msgObj, index) => {
        if (msgObj) {
          const messageBox = document.createElement('div');
          messageBox.classList.add('message-box');
          // dataset.messageIndex để dễ dàng xác định hàng trong Google Sheet để xóa
          messageBox.dataset.messageIndex = index + 1; // +1 vì Apps Script dùng index 1 dựa

          if (msgObj.type === 'text') {
            const paragraph = document.createElement('p');
            paragraph.textContent = msgObj.content;
            messageBox.appendChild(paragraph);
           } else if (msgObj.type === 'file' || msgObj.type === 'image') {
            const fileLink = msgObj.fileUrl;
            const fileName = msgObj.fileName;
            const fileSize = msgObj.fileSize;

            if (msgObj.type === 'image') {
              const img = document.createElement('img');
              img.src = fileLink;
              img.alt = fileName;
              img.classList.add('chat-image'); // Thêm class để áp dụng CSS
              messageBox.appendChild(img);
              // KHÔNG THÊM CÁC THÔNG TIN TÊN FILE/KÍCH THƯỚC FILE CHO ẢNH
            } else { // Generic file (không phải ảnh) - giữ nguyên hiển thị tên/kích thước
              const fileContentDiv = document.createElement('div');
              fileContentDiv.classList.add('file-content');

              const fileAvatar = document.createElement('img');
              fileAvatar.src = 'assets/img/file.png';
              fileAvatar.alt = 'File Icon';
              fileAvatar.classList.add('file-avatar');
              fileContentDiv.appendChild(fileAvatar);

              const fileInfoDiv = document.createElement('div');
              fileInfoDiv.classList.add('file-info');

              const fileNameP = document.createElement('p');
              fileNameP.classList.add('file-name');
              fileNameP.textContent = fileName;
              fileInfoDiv.appendChild(fileNameP);

              const fileSizeP = document.createElement('p');
              fileSizeP.classList.add('file-size');
              fileSizeP.textContent = formatFileSize(fileSize);
              fileInfoDiv.appendChild(fileSizeP);

              fileContentDiv.appendChild(fileInfoDiv);
              messageBox.appendChild(fileContentDiv);
            }
            messageBox.dataset.fileUrl = fileLink;
          }

          chatContentArea.appendChild(messageBox);
        }
      });

      if (forceScrollToBottom) {
        scrollToBottom();
      } else {
        // Cố gắng giữ vị trí cuộn nếu không yêu cầu cuộn xuống cuối
        const newScrollHeight = chatContentArea.scrollHeight;
        const scrollRatio = currentScrollTop / currentScrollHeight;
        chatContentArea.scrollTop = scrollRatio * newScrollHeight;
      }

      addMessageBoxEventListeners(); // Gọi lại sau khi DOM được cập nhật
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
  const bufferHeight = 100; // Để sao có thể bay ra khỏi khung nhìn

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