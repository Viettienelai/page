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














const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbz9nlxeoscUf-uh3VJFbxjvIUhxLy-6Nw72IWehjRHV-JipV_HScnBbGNsKa3CBVpsUEg/exec';

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

  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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

  function showInteractionButtons(messageBox) {
    hideInteractionButtons();
    currentActiveMessageBox = messageBox;

    const copyDownloadButton = document.createElement('div');
    copyDownloadButton.classList.add('interaction-button', 'blue');
    const copyDownloadImg = document.createElement('img');

    if (messageBox.dataset.fileUrl) {
      copyDownloadImg.src = 'assets/img/download.png';
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

    setTimeout(() => {
      copyDownloadButton.classList.add('active');
      deleteButton.classList.add('active');
    }, 10);

    copyDownloadButton.addEventListener('click', function(event) {
      event.stopPropagation();
      if (this.dataset.action === 'download') {
        const fileUrl = messageBox.dataset.fileUrl;
        const fileId = messageBox.dataset.fileId;
        if (fileId) {
          const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
          window.open(downloadUrl, '_blank');
          console.log('Downloading file from Drive:', downloadUrl);
        } else if (fileUrl) {
          window.open(fileUrl, '_blank');
          console.log('Opening file from Drive:', fileUrl);
        }
      } else {
        const textToCopy = messageBox.querySelector('p') ? messageBox.querySelector('p').textContent : '';
        if (textToCopy) {
          navigator.clipboard.writeText(textToCopy)
            .then(() => console.log('Copied to clipboard:', textToCopy))
            .catch(err => {
              console.error('Failed to copy:', err);
              alert('Copy thất bại. Vui lòng thử lại.');
            });
        }
      }
      hideInteractionButtons();
    });

    deleteButton.addEventListener('click', async function(event) {
      event.stopPropagation();
      const messageIndex = messageBox.dataset.messageIndex;

      if (confirm("Bạn có chắc muốn xóa tin nhắn này không?")) {
        try {
          toolbarLoadingOverlay.classList.add('active');
          const response = await fetch(GAS_WEB_APP_URL + '?action=delete&index=' + messageIndex, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          });
          const result = await response.json();

          if (result.status === 'success') {
            console.log('Message deleted successfully.');
            await loadAllMessages(false);
          } else {
            console.error('Error deleting message:', result.message);
            alert('Lỗi xóa tin nhắn: ' + result.message);
          }
        } catch (error) {
          console.error('Lỗi kết nối hoặc API khi xóa:', error);
          alert('Lỗi kết nối hoặc API khi xóa: ' + error.message);
        } finally {
          toolbarLoadingOverlay.classList.remove('active');
        }
        hideInteractionButtons();
      }
    });
  }

  function addMessageBoxEventListeners() {
    document.querySelectorAll('.message-box').forEach(box => {
      box.removeEventListener('click', handleMessageBoxClick);
      box.addEventListener('click', handleMessageBoxClick);
    });
  }

  async function initializeChat() {
    if (syncLoadingOverlay) syncLoadingOverlay.classList.add('active');
    try {
      await loadAllMessages(true);
    } catch (error) {
      console.error("Lỗi tải tin nhắn ban đầu:", error);
    } finally {
      if (syncLoadingOverlay) syncLoadingOverlay.classList.remove('active');
    }
  }

  initializeChat();

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

  function scrollToBottom() {
    if (chatContentArea) {
      chatContentArea.scrollTo({
        top: chatContentArea.scrollHeight,
        behavior: 'smooth'
      });
    }
  }

  if (chatContentArea) {
    chatContentArea.addEventListener('scroll', updateScrollButton);
  }

  if (scrollToBottomBtn) {
    scrollToBottomBtn.addEventListener('click', function(event) {
      event.stopPropagation();
      scrollToBottom();
      setTimeout(() => updateScrollButton(), 300);
    });
  }

  if (chatBubble) {
    chatBubble.addEventListener('click', function(event) {
      if (!this.classList.contains('expanded')) {
        if (!event.target.closest('#note-background') &&
            !event.target.closest('.chat-toolbar') &&
            !event.target.closest('.message-box')) {
          this.classList.add('expanded');
          if (backgroundBlurChat) backgroundBlurChat.classList.add('active');
          scrollToBottom();
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
        if (backgroundBlurChat) backgroundBlurChat.classList.remove('active');
        if (scrollToBottomBtn) scrollToBottomBtn.classList.remove('show');
      }
    });
  } else {
    console.error("Không tìm thấy phần tử #chat-bubble.");
  }

  if (noteBackground && syncLoadingOverlay && chatBubble) {
    noteBackground.addEventListener('click', async function(event) {
      event.stopPropagation();
      if (!chatBubble.classList.contains('expanded')) {
        chatBubble.classList.add('expanded');
        if (backgroundBlurChat) backgroundBlurChat.classList.add('active');
        scrollToBottom();
        setTimeout(updateScrollButton, 100);
        return;
      }
      syncLoadingOverlay.classList.add('active');
      try {
        await loadAllMessages(true);
        console.log("Đồng bộ dữ liệu từ Google Sheet thành công!");
      } catch (error) {
        console.error("Lỗi đồng bộ dữ liệu từ Google Sheet:", error);
        alert("Lỗi đồng bộ dữ liệu: " + error.message);
      } finally {
        syncLoadingOverlay.classList.remove('active');
      }
    });
  } else {
    console.error("Không tìm thấy phần tử #note-background, #sync-loading-overlay, hoặc #chat-bubble.");
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
    console.error("Không tìm thấy phần tử .text-input.");
  }

  if (sendButton && textInput && chatContentArea && toolbarLoadingOverlay) {
    sendButton.addEventListener('click', async function() {
      const messageText = textInput.value.trim();
      if (messageText) {
        toolbarLoadingOverlay.classList.add('active');
        try {
          const response = await fetch(GAS_WEB_APP_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'saveMessage', content: messageText })
          });
          const result = await response.json();
          if (result.status === 'success') {
            console.log('Tin nhắn đã gửi và lưu:', messageText);
            textInput.value = '';
            adjustHeight();
            await loadAllMessages(true);
          } else {
            console.error('Lỗi lưu tin nhắn:', result.message);
            alert('Lỗi gửi tin nhắn: ' + result.message);
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
    console.error("Không tìm thấy một hoặc nhiều phần tử (sendButton, textInput, chatContentArea, toolbarLoadingOverlay).");
  }

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
        }, { once: true });
      });
      fileInput.click();
      const file = await fileChosenPromise;
      document.body.removeChild(fileInput);
      if (!file) {
        console.log("Người dùng hủy chọn file.");
        return;
      }
      console.log("File đã chọn:", file.name, file.type, file.size);
      const maxFileSize = 50 * 1024 * 1024;
      if (file.size > maxFileSize) {
        alert('File quá lớn! Vui lòng chọn file nhỏ hơn 50MB.');
        return;
      }
      toolbarLoadingOverlay.classList.add('active');
      try {
        console.log('Thử phương thức tải lên Base64...');
        let success = await tryBase64Upload(file, 2);
        if (!success) {
          console.log('Base64 thất bại, thử phương thức FormData...');
          success = await tryFormDataUpload(file);
        }
        if (!success) {
          throw new Error('Tất cả phương thức tải lên thất bại');
        }
      } catch (error) {
        console.error('Lỗi tải lên:', error);
        alert('Lỗi tải file: ' + error.message);
      } finally {
        toolbarLoadingOverlay.classList.remove('active');
      }
    });

    async function tryBase64Upload(file, retries = 2) {
      for (let attempt = 1; attempt <= retries; attempt++) {
        try {
          console.log(`Thử tải lên Base64 lần ${attempt}...`);
          const base64Data = await fileToBase64(file);
          const requestData = {
            action: 'uploadFileBase64',
            fileName: file.name,
            mimeType: file.type || 'application/octet-stream',
            fileSize: file.size,
            fileData: base64Data
          };
          console.log('Gửi yêu cầu Base64...', { ...requestData, fileData: '[BASE64_DATA_' + base64Data.length + '_CHARS]' });
          const response = await fetch(GAS_WEB_APP_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
          });
          console.log('Trạng thái phản hồi:', response.status);
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          const result = await response.json();
          if (result.status === 'success') {
            console.log('✅ Tải lên Base64 THÀNH CÔNG:', result.message);
            console.log('Thông tin file:', { fileId: result.fileId, fileName: result.fileName, fileSize: result.fileSize });
            if (textInput) {
              textInput.value = '';
              adjustHeight();
            }
            await loadAllMessages(true);
            return true;
          } else {
            console.log('❌ Tải lên Base64 THẤT BẠI:', result.message);
            if (result.debug) console.log('Thông tin debug:', result.debug);
            if (attempt === retries) return false;
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        } catch (error) {
          console.log(`❌ Lỗi tải lên Base64 (lần ${attempt}):`, error.message);
          if (attempt === retries) return false;
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      return false;
    }

    async function tryFormDataUpload(file) {
      try {
        const formData = new FormData();
        formData.append('file', file, file.name);
        console.log('Gửi yêu cầu FormData...');
        console.log('FormData entries:', [...formData.entries()]);
        const response = await fetch(GAS_WEB_APP_URL, {
          method: 'POST',
          body: formData
        });
        console.log('Trạng thái phản hồi:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const result = await response.json();
        if (result.status === 'success') {
          console.log('✅ Tải lên FormData THÀNH CÔNG:', result.message);
          if (textInput) {
            textInput.value = '';
            adjustHeight();
          }
          await loadAllMessages(true);
          return true;
        } else {
          console.log('❌ Tải lên FormData THẤT BẠI:', result.message);
          if (result.debug) console.log('Thông tin debug:', result.debug);
          return false;
        }
      } catch (error) {
        console.log('❌ Lỗi tải lên FormData:', error.message);
        return false;
      }
    }

    function fileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const result = reader.result;
            if (typeof result === 'string' && result.includes(',')) {
              const base64 = result.split(',')[1];
              resolve(base64);
            } else {
              reject(new Error('Kết quả FileReader không hợp lệ'));
            }
          } catch (error) {
            reject(error);
          }
        };
        reader.onerror = () => reject(new Error('Lỗi FileReader'));
        reader.readAsDataURL(file);
      });
    }
  } else {
    console.error("Không tìm thấy phần tử .plus-button.");
  }

  async function loadAllMessages(forceScrollToBottom = false, retries = 2) {
    if (!chatContentArea) return;
    const currentScrollTop = chatContentArea.scrollTop;
    const currentScrollHeight = chatContentArea.scrollHeight;
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`Tải tin nhắn, lần thử ${attempt}...`);
        const response = await fetch(GAS_WEB_APP_URL + '?action=getAllMessages', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const messages = await response.json();
        chatContentArea.innerHTML = '';
        messages.sort((a, b) => {
          const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
          const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
          return timeA - timeB;
        });
        messages.forEach((msgObj, index) => {
          if (msgObj) {
            const messageBox = document.createElement('div');
            messageBox.classList.add('message-box');
            messageBox.dataset.messageIndex = index;
            if (msgObj.type === 'text') {
              const paragraph = document.createElement('p');
              paragraph.textContent = msgObj.content;
              messageBox.appendChild(paragraph);
            } else if (msgObj.type === 'file' || msgObj.type === 'image') {
              const fileLink = msgObj.fileUrl;
              const fileId = msgObj.fileId;
              const fileName = msgObj.fileName;
              const fileSize = msgObj.fileSize;
              const mimeType = msgObj.mimeType;
              messageBox.dataset.fileId = fileId;
              messageBox.dataset.fileUrl = fileLink;
              if (msgObj.type === 'image' && mimeType.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = `https://drive.google.com/uc?export=view&id=${fileId}`;
                img.alt = fileName;
                img.classList.add('chat-image');
                img.onerror = () => {
                  console.error(`Lỗi tải ảnh: ${img.src}.`);
                  img.src = 'assets/img/file_broken.png';
                };
                messageBox.appendChild(img);
              } else if (mimeType.startsWith('video/')) {
                const videoElement = document.createElement('video');
                videoElement.src = `https://drive.google.com/uc?export=download&id=${fileId}`;
                videoElement.controls = true;
                videoElement.classList.add('chat-video');
                videoElement.onerror = () => {
                  console.error(`Lỗi tải video: ${videoElement.src}.`);
                };
                messageBox.appendChild(videoElement);
              } else {
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
        return;
      } catch (error) {
        console.error(`Lỗi tải tin nhắn (lần ${attempt}):`, error);
        if (attempt === retries) {
          alert('Lỗi tải tin nhắn: ' + error.message);
          return;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
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
});