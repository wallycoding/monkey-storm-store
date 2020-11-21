function createProduct(product) {
    const divProductBox = document.createElement('div'); // product-box
    const divProductBoxHeader = document.createElement('div'); // product-box-header
    const divProductBoxHeaderChildrens = [
        document.createElement('span'),
        document.createElement('a'),
        document.createElement('img')
    ];
    const divProductBoxContent = document.createElement('div'); // product-box-content
    const divProductName = document.createElement('div'); // product-name
    const divProductNameChildrens = [document.createElement('a'), document.createElement('span')];

    const divProductDetails = document.createElement('div'); // product-details
    const divProductDetailsChildrens = [
        document.createElement('span')
    ];

    const divProductPrices = document.createElement('div'); // product-prices
    const divProductPricesChildrens = [
        document.createElement('span'),
        document.createElement('span')
    ]

    // product-box sets
    divProductBox.setAttribute('class', 'product-box');

    // product-box-header sets
    divProductBoxHeader.setAttribute('class', 'product-box-header');
    divProductBoxHeaderChildrens[0].innerText = product.discount;
    divProductBoxHeaderChildrens[1].setAttribute('href', product.redirect);
    divProductBoxHeaderChildrens[2].setAttribute('src', product.photo);
    divProductBoxHeaderChildrens[2].setAttribute('src', product.photo);
    divProductBoxHeaderChildrens[2].setAttribute('alt', 'product-photo');

    divProductBoxHeaderChildrens[1].appendChild(divProductBoxHeaderChildrens[2]);

    divProductBoxHeader.appendChild(divProductBoxHeaderChildrens[0]);
    divProductBoxHeader.appendChild(divProductBoxHeaderChildrens[1]);

    divProductBox.appendChild(divProductBoxHeader);

    // product-box-content sets

    divProductBoxContent.setAttribute('class', 'product-box-content');

    // product-name sets

    divProductName.setAttribute('class', 'product-name');
    divProductNameChildrens[0].setAttribute('href', product.redirect);
    divProductNameChildrens[1].innerText = product.title;
    divProductNameChildrens[0].appendChild(divProductNameChildrens[1]);
    divProductName.appendChild(divProductNameChildrens[0]);
    divProductBoxContent.appendChild(divProductName);

    // product-details sets
    divProductDetails.setAttribute('class', 'product-details');
    divProductDetailsChildrens[0].innerText = product.marking;

    divProductDetails.appendChild(divProductDetailsChildrens[0]);

    divProductBoxContent.appendChild(divProductDetails);

    // product-prices sets
    divProductPrices.setAttribute('class', 'product-prices');
    divProductPricesChildrens[0].setAttribute('class', 'product-price-old');
    divProductPricesChildrens[0].innerText = product.oldPrice;
    divProductPricesChildrens[1].setAttribute('class', 'product-price-now');
    divProductPricesChildrens[1].innerText = product.nowPrice;

    divProductPrices.appendChild(divProductPricesChildrens[0]);
    divProductPrices.appendChild(divProductPricesChildrens[1]);

    divProductBoxContent.appendChild(divProductPrices);

    // product-box-content in product-box sets
    divProductBox.appendChild(divProductBoxContent);

    return divProductBox;

};
function setProducts(className, products) {
    const elementFather = document.querySelector(className);
    const productsDOM = products.map(createProduct);
    productsDOM.forEach(product => elementFather.appendChild(product));
    elementFather.style.width = `${productsDOM.length * 250}px`;
};

function setSlideButtonList() {

    function pressLeftButton([fatherList, fatherListRow, productWidth]) {

        const fatherDOM = document.querySelector(`.${fatherList}`);
        const fatherRowDOM =
            document.querySelector(`.${fatherListRow}`);

        const marginL = Number(
            fatherRowDOM.style.marginLeft.split('px')[0]
        );

        const calc = marginL + Math.round(fatherDOM.clientWidth / 2);


        if (calc > 0) {
            fatherRowDOM.style.marginLeft = `0px`;
        } else {
            fatherRowDOM.style.marginLeft = `${calc}px`;
        }

    };

    function pressRightButton([fatherList, fatherListRow, productWidth]) {

        const fatherDOM = document.querySelector(`.${fatherList}`);
        const fatherRowDOM =
            document.querySelector(`.${fatherListRow}`);

        const marginL = Number(
            fatherRowDOM.style.marginLeft.split('px')[0]
        );

        const calc = marginL - Math.round(fatherDOM.clientWidth / 2);
        const listW = fatherRowDOM.children.length * productWidth;


        if (fatherDOM.clientWidth - listW > calc) {
            fatherRowDOM.style.marginLeft =
                `${fatherDOM.clientWidth - listW}px`;
        } else {
            fatherRowDOM.style.marginLeft = `${calc}px`;
        }

    };

    const fatherLists = [...document.querySelectorAll('.father-list')];
    const fatherListRows = [...document.querySelectorAll('.father-list-row')];

    const list = [];

    fatherLists.forEach((fatherList, i) => {
        list.push([
            fatherList.className.split(' ')[1],
            fatherListRows[i].className.split(' ')[1],
            fatherListRows[i].children[0].clientWidth
        ]);
    });

    list.forEach(data => {
        const buttons = document.querySelectorAll(`.${data[0]} > button`);
        buttons[0].onclick = function () {
            pressLeftButton(data);
        }
        buttons[1].onclick = function () {
            pressRightButton(data);
        }
    });

};

async function loadProducts() {

    function Ajax(url, listName) {
        return new Promise((resolve, reject) => {
            try {
                const URL = `${location.href}${url}`;
                const xhr = new XMLHttpRequest();

                xhr.onload = ({ target: { response: json } }) => {
                    setProducts(listName, JSON.parse(json));
                    resolve(true);
                }

                xhr.open('get', URL);
                xhr.send();
            } catch {
                reject(false);
            }
        })

    };

    /**
     * Os produtos foram tirados da kabum.
     */
    await Ajax('products-list/products', '.featured-list');
    await Ajax('products-list/products', '.top-now-list');
    setSlideButtonList();
};

loadProducts();