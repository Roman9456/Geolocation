// src/index.js
import './styles.css';

// Переместите код, зависящий от DOM, в функцию и экспортируйте её
export function setupEventListener() {
  const postInput = document.getElementById('post-input');
  const postButton = document.getElementById('post-button');

  function handlePost() {
    const postText = postInput.value;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        addPost(postText, position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        const coordinates = prompt('Could not get your location. Please enter coordinates manually (format: latitude,longitude):');
        try {
          const { latitude, longitude } = parseCoordinates(coordinates);
          addPost(postText, latitude, longitude);
        } catch (err) {
          alert(err.message);
        }
      }
    );
  }

  postInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default behavior
      handlePost();
    }
  });

  postButton.addEventListener('click', handlePost);
}

// Функция для добавления поста
export function addPost(text, latitude, longitude) {
  const post = document.createElement('div');
  post.className = 'post';
  post.innerHTML = `<p>${text}</p><p>Location: ${latitude}, ${longitude}</p>`;
  document.getElementById('timeline').appendChild(post);
}

// Функция для парсинга координат
export function parseCoordinates(input) {
  const regex = /^\s*\[?\s*(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)\s*\]?\s*$/;
  const match = input.match(regex);
  if (!match) throw new Error('Invalid coordinate format.');
  return {
    latitude: parseFloat(match[1]),
    longitude: parseFloat(match[2]),
  };
}

// Запускаем обработчик событий после загрузки страницы
document.addEventListener('DOMContentLoaded', setupEventListener);
