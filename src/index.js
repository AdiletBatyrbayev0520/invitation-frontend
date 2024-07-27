import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Создаем корневой элемент для рендеринга приложения
const root = ReactDOM.createRoot(document.getElementById('root'));

// Рендерим приложение внутри StrictMode для выявления потенциальных проблем
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Функция для измерения производительности приложения
reportWebVitals(console.log);

// Включение отчетности о производительности (по желанию)
// Вы можете заменить console.log на отправку данных в аналитику
// Подробнее: https://bit.ly/CRA-vitals
