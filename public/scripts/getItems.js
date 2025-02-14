const mainSection = document.querySelector('main.mainSection');

async function loadJSON() {
    try {
      const response = await fetch('http://localhost:2024/api/modelsOzon');
      if (!response.ok) {
        throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
      }
      const data = await response.json();
      const windowForItems = document.querySelector('.windowForItems');
  
    data.items.forEach(item => {
        const itemSale = document.createElement('div');
        itemSale.className = 'itemSale';
    
        // 1. Product ID (скрытый)
        const productIDCell = document.createElement('span');
        productIDCell.textContent = item.product_id;
        productIDCell.style.visibility = 'hidden';
        productIDCell.className = 'product_id';
        itemSale.appendChild(productIDCell);
    
        // 2. Offer ID (заголовок)
        const offerIDCell = document.createElement('h3');
        offerIDCell.textContent = item.offer_id;
        offerIDCell.className = 'offer_id';
        itemSale.appendChild(offerIDCell);
    
        // 3. Изображение
        const imageItem = document.createElement('img');
        imageItem.src = item.primary_image;
        imageItem.alt = 'Product Image';
        imageItem.className = 'imageItem';
        itemSale.appendChild(imageItem);
    
        const boxInputs = document.createElement('div');
        boxInputs.className = 'boxInputs'
        boxInputs.style.display = 'none';

        itemSale.appendChild(boxInputs);

        // 0. Описание 
        const descriptionItem = document.createElement('span');
        descriptionItem.textContent = item.name;
        descriptionItem.className = 'descriptionItem';
        descriptionItem.title = item.name;
        itemSale.appendChild(descriptionItem);
        
        // 0. Описание 
        const priceItem = document.createElement('span');
        priceItem.textContent = item.price;
        priceItem.className = 'priceItem';
        itemSale.appendChild(priceItem);

        // 0. Описание 
        const oldPriceItem = document.createElement('span');
        oldPriceItem.textContent = item.old_price;
        oldPriceItem.className = 'oldPriceItem';
        itemSale.appendChild(oldPriceItem);
        
        // 4. Уценка (checkbox)
        const discountedLabel = document.createElement('label');
        discountedLabel.htmlFor = 'is_discounted'
        discountedLabel.textContent = 'Уценка: ';
        boxInputs.appendChild(discountedLabel);

        const discountedCell = document.createElement('input');
        discountedCell.type = 'checkbox';
        discountedCell.name = 'is_discounted';
        discountedCell.className = 'is_discounted';
        discountedCell.checked = item.is_discounted;
        boxInputs.appendChild(discountedCell);
    
        boxInputs.appendChild(document.createElement('br'));

        // 5. Архив (checkbox)
        const archivedLabel = document.createElement('label');
        archivedLabel.htmlFor = 'archived';
        archivedLabel.textContent = 'В архиве: ';
        boxInputs.appendChild(archivedLabel);
    
        const archivedCell = document.createElement('input');
        archivedCell.type = 'checkbox';
        archivedCell.name = 'archived';
        archivedCell.className = 'archived';
        archivedCell.checked = item.archived;
        boxInputs.appendChild(archivedCell);
       
        boxInputs.appendChild(document.createElement('br'));

        // 6. ФБС (checkbox)
        const fbsLabel = document.createElement('label');
        fbsLabel.htmlFor = 'has_fbs_stocks';
        fbsLabel.textContent = 'ФБС: ';
        boxInputs.appendChild(fbsLabel);
    
        const fbsStocksCell = document.createElement('input');
        fbsStocksCell.type = 'checkbox';
        fbsStocksCell.name = 'has_fbs_stocks';
        fbsStocksCell.className = 'has_fbs_stocks';
        fbsStocksCell.checked = item.has_fbs_stocks;
        boxInputs.appendChild(fbsStocksCell);

        boxInputs.appendChild(document.createElement('br'));

        // 7. ФБО (checkbox)
        const fboLabel = document.createElement('label');
        fboLabel.htmlFor = 'has_fbo_stocks';
        fboLabel.textContent = 'ФБО: ';
        boxInputs.appendChild(fboLabel);
        
        const fboStocksCell = document.createElement('input');
        fboStocksCell.type = 'checkbox';
        fboStocksCell.name = 'has_fbo_stocks';
        fboStocksCell.className = 'has_fbo_stocks';
        fboStocksCell.checked = item.has_fbo_stocks;
        fboStocksCell.onclick = "false"
        boxInputs.appendChild(fboStocksCell);

        boxInputs.appendChild(document.createElement('br'));

        // 0. Количество на складе 
        // const countModelsWarehouse = document.createElement('span');
        // countModelsWarehouse.textContent = 'На складе: ' + item.model_info.count;
        // countModelsWarehouse.className = 'countModelsWarehouse';
        // itemSale.appendChild(countModelsWarehouse);

        // 0. Скидка
        const salesCount = document.createElement('span');
        const result = (item.old_price - item.price) / 100;
        const roundedResult = Math.round(result / 10) * 10;
        salesCount.textContent = '-'+roundedResult + '%';
        salesCount.className = 'salesCount';
        itemSale.appendChild(salesCount);

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