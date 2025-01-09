document.addEventListener('DOMContentLoaded', () => {
  console.log('Desktop View Loaded');
  // Ví dụ: Thêm animation khi di chuột vào tiêu đề
  const title = document.querySelector('h1');
  title.addEventListener('mouseover', () => {
    title.style.color = 'red';
  });

  title.addEventListener('mouseout', () => {
    title.style.color = '#28a745';
  });
});
