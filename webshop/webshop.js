class Webshop {
    constructor() {
        this.items = [];
    }
    addProduct(product) {
        this.items.push(product);
    }
    seeAllProducts() {
        this.items.forEach((product) => console.log(product));
    }
    totalPrice() {
        let total = 0;
        this.items.forEach((item) => (total += item.totalStock()));
        return total;
    }
    filterType(typeOfProduct) {
        return this.items.filter((product) => product instanceof typeOfProduct);
    }
}

class Product {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
    totalStock() {
        return this.price * this.quantity;
    }
    addStock() {
        this.quantity++;
    }
    removeStock() {
        this.quantity--;
    }
}

class Book extends Product {
    constructor(name, price, quantity, author, pages) {
        super(name, price, quantity);
        this.author = author;
        this.pages = pages;
    }
    showLabel() {
        console.log(`${this.name} by ${this.author}`);
    }
}

class Electronics extends Product {
    constructor(name, price, quantity, brand, model) {
        super(name, price, quantity);
        this.brand = brand;
        this.model = model;
    }
    showLabel() {
        console.log(`${this.brand}: ${this.model}: ${this.name}`);
    }
}

class Clothing extends Product {
    constructor(name, price, quantity, size, color) {
        super(name, price, quantity);
        this.size = size;
        this.color = color;
    }
    showLabel() {
        console.log(`${this.name}: ${this.size}: ${this.color}`);
    }
}

const book1 = new Book("Lord of the rings", 20, 100, "JRR Tolkien", 500);
const book2 = new Book("Lord of the rings", 20, 100, "JRR Tolkien", 500);
const washer = new Electronics("Vaskemaskine", 2000, 10, "Bosch", "Wax123");
const clothing1 = new Clothing("t-shirt", 200, 10, "Medium", "Red");

const webshop1 = new Webshop();
webshop1.addProduct(book1);
webshop1.addProduct(book2);
webshop1.addProduct(washer);
webshop1.addProduct(clothing1);
webshop1.seeAllProducts();
console.log(webshop1.totalPrice());
console.log(webshop1.filterType(Book));
