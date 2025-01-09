const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

// Chuyển hướng dựa trên thiết bị
if (isMobile) {
  window.location.href = './mobile.html';
} else {
  window.location.href = './desktop.html';
}
