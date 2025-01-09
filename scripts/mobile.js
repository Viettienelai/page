document.addEventListener('DOMContentLoaded', () => {
  console.log('Mobile View Loaded');
  // Ví dụ: Hiển thị thông báo khi nhấn vào một nút
  const button = document.createElement('button');
  button.textContent = 'Nhấn vào tôi';
  document.body.appendChild(button);

  button.addEventListener('click', () => {
    alert('Bạn đang dùng Mobile!');
  });
});
