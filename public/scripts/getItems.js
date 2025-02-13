const mainSection = document.querySelector('main.mainSection');

async function loadJSON() {
    try {
      const response = await fetch('http://localhost:2024/api/modelsOzon'); // Укажите правильный путь к файлу
      if (!response.ok) {
        throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
      }
      const data = await response.json(); // Парсим JSON
      const windowForItems = document.querySelector('.windowForItems');
  
    data.items.forEach(item => {
        const itemSale = document.createElement('div'); // Создаём div для каждого товара
        itemSale.className = 'itemSale'; // Устанавливаем класс
    
        // 1. Product ID (скрытый)
        const productIDCell = document.createElement('span');
        productIDCell.textContent = item.product_id;
        productIDCell.style.visibility = 'hidden'; // Скрываем ID
        productIDCell.className = 'product_id'; // Добавляем класс
        itemSale.appendChild(productIDCell);
    
        // 2. Offer ID (заголовок)
        const offerIDCell = document.createElement('h3');
        offerIDCell.textContent = item.offer_id;
        offerIDCell.className = 'offer_id'; // Добавляем класс
        itemSale.appendChild(offerIDCell);
    
        // 3. Изображение
        const imageItem = document.createElement('img');
        imageItem.src = item.primary_image;
        imageItem.alt = 'Product Image'; // Добавляем alt для доступности
        imageItem.className = 'imageItem'; // Добавляем класс
        itemSale.appendChild(imageItem);
    
        const boxInputs = document.createElement('div');
        boxInputs.className = 'boxInputs'
        boxInputs.style.display = 'none'; // Скрываем ID

        itemSale.appendChild(boxInputs);

        // 0. Описание 
        const descriptionItem = document.createElement('span');
        descriptionItem.textContent = item.name;
        descriptionItem.className = 'descriptionItem'; // Добавляем класс
        descriptionItem.title = item.name; // Добавляем класс
        itemSale.appendChild(descriptionItem);
        
        // 0. Описание 
        const priceItem = document.createElement('span');
        priceItem.textContent = item.price;
        priceItem.className = 'priceItem'; // Добавляем класс
        itemSale.appendChild(priceItem);

        // 0. Описание 
        const oldPriceItem = document.createElement('span');
        oldPriceItem.textContent = item.old_price;
        oldPriceItem.className = 'oldPriceItem'; // Добавляем класс
        itemSale.appendChild(oldPriceItem);
        
        // 4. Уценка (checkbox)
        const discountedLabel = document.createElement('label');
        discountedLabel.htmlFor = 'is_discounted'; // Связываем label с input
        discountedLabel.textContent = 'Уценка: ';
        boxInputs.appendChild(discountedLabel);

        const discountedCell = document.createElement('input');
        discountedCell.type = 'checkbox';
        discountedCell.name = 'is_discounted';
        discountedCell.className = 'is_discounted'; // Добавляем класс
        discountedCell.checked = item.is_discounted; // Устанавливаем состояние checkbox
        boxInputs.appendChild(discountedCell);
    
        boxInputs.appendChild(document.createElement('br'));

        // 5. Архив (checkbox)
        const archivedLabel = document.createElement('label');
        archivedLabel.htmlFor = 'archived'; // Связываем label с input
        archivedLabel.textContent = 'В архиве: ';
        boxInputs.appendChild(archivedLabel);
    
        const archivedCell = document.createElement('input');
        archivedCell.type = 'checkbox';
        archivedCell.name = 'archived';
        archivedCell.className = 'archived'; // Добавляем класс
        archivedCell.checked = item.archived; // Устанавливаем состояние checkbox
        boxInputs.appendChild(archivedCell);
       
        boxInputs.appendChild(document.createElement('br'));

        // 6. ФБС (checkbox)
        const fbsLabel = document.createElement('label');
        fbsLabel.htmlFor = 'has_fbs_stocks'; // Связываем label с input
        fbsLabel.textContent = 'ФБС: ';
        boxInputs.appendChild(fbsLabel);
    
        const fbsStocksCell = document.createElement('input');
        fbsStocksCell.type = 'checkbox';
        fbsStocksCell.name = 'has_fbs_stocks';
        fbsStocksCell.className = 'has_fbs_stocks'; // Добавляем класс
        fbsStocksCell.checked = item.has_fbs_stocks; // Устанавливаем состояние checkbox
        boxInputs.appendChild(fbsStocksCell);

        boxInputs.appendChild(document.createElement('br'));

        // 7. ФБО (checkbox)
        const fboLabel = document.createElement('label');
        fboLabel.htmlFor = 'has_fbo_stocks'; // Связываем label с input
        fboLabel.textContent = 'ФБО: ';
        boxInputs.appendChild(fboLabel);
        
        const fboStocksCell = document.createElement('input');
        fboStocksCell.type = 'checkbox';
        fboStocksCell.name = 'has_fbo_stocks';
        fboStocksCell.className = 'has_fbo_stocks'; // Добавляем класс
        fboStocksCell.checked = item.has_fbo_stocks; // Устанавливаем состояние checkbox
        fboStocksCell.onclick = "false"
        boxInputs.appendChild(fboStocksCell);

        boxInputs.appendChild(document.createElement('br'));

        // 0. Описание 
        const buttonMoreInfoModel = document.createElement('button');
        buttonMoreInfoModel.textContent = 'Подробнее про модель';
        buttonMoreInfoModel.className = 'buttonMoreInfoModel'; // Добавляем класс
        itemSale.appendChild(buttonMoreInfoModel);

        // 0. Описание 
        const countModelsWarehouse = document.createElement('span');
        countModelsWarehouse.textContent = 'На складе: ' + item.model_info.count;
        countModelsWarehouse.className = 'countModelsWarehouse'; // Добавляем класс
        itemSale.appendChild(countModelsWarehouse);

        // 8. Quants (пустой span)
        // const quantsCell = document.createElement('span');
        // quantsCell.textContent = item.quants.length > 0 ? item.quants.join(', ') : 'Нет данных';
        // quantsCell.className = 'quants'; // Добавляем класс
        // itemSale.appendChild(quantsCell);
    
        // Добавляем созданный элемент в контейнер
        windowForItems.appendChild(itemSale);
      });
    } catch (error) {
      console.error('Ошибка при загрузке JSON:', error);
    }
  }
  
  // Вызываем функцию при загрузке страницы
  document.addEventListener('DOMContentLoaded', loadJSON);