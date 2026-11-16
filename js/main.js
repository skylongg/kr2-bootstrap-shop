// Общий скрипт сайта. Работает только с теми элементами, которые есть на странице.

// 1. Проверка форм в стиле Bootstrap
const forms = document.querySelectorAll('.needs-validation');
const successToast = document.getElementById('successToast');

forms.forEach(function (form) {
  form.addEventListener('submit', function (event) {
    // Учебный проект: данные никуда не отправляем
    event.preventDefault();

    // Есть ошибки: Bootstrap подсветит поля, фокус на первое неверное поле
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      form.querySelector(':invalid').focus();
      return;
    }

    // Всё заполнено: очищаем форму
    form.reset();
    form.classList.remove('was-validated');

    // Если форма в модальном окне, закрываем его
    const modal = form.closest('.modal');
    if (modal) {
      bootstrap.Modal.getInstance(modal).hide();
    }

    // Показываем уведомление об отправке
    if (successToast) {
      bootstrap.Toast.getOrCreateInstance(successToast).show();
    }
  });
});

// 2. Название товара в модальном окне быстрой заявки
const orderModal = document.getElementById('orderModal');

if (orderModal) {
  orderModal.addEventListener('show.bs.modal', function (event) {
    // event.relatedTarget — кнопка «Заказать», которая открыла окно
    const product = event.relatedTarget.getAttribute('data-product');
    document.getElementById('modal-product').value = product;
  });
}

// 3. Фильтр каталога по категориям
const categoryButtons = document.querySelectorAll('input[name="category"]');
const productItems = document.querySelectorAll('[data-category]');
const productsCount = document.getElementById('products-count');

categoryButtons.forEach(function (button) {
  button.addEventListener('change', function () {
    let count = 0;

    productItems.forEach(function (item) {
      const isVisible = button.value === 'all' || item.dataset.category === button.value;
      // d-none — класс Bootstrap, который скрывает элемент
      item.classList.toggle('d-none', !isVisible);
      if (isVisible) {
        count++;
      }
    });

    productsCount.textContent = count;
  });
});

// 4. Выбор товара в форме заявки по ссылке вида order.html?product=mouse
const productSelect = document.getElementById('order-product');

if (productSelect) {
  const product = new URLSearchParams(window.location.search).get('product');
  if (product) {
    productSelect.value = product;
  }
}
