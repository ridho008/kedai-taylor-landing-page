document.addEventListener("alpine:init", () => {
  // artinya mengembalikan object, bila ditambahkan kurung ()
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Kemeja Putih", img: "1.jpg", price: 200000 },
      { id: 2, name: "Jeans", img: "2.jpg", price: 100000 },
      { id: 3, name: "Celana Bahan", img: "3.jpg", price: 800000 },
      { id: 4, name: "Dinas Polisi", img: "4.jpg", price: 600000 },
      { id: 5, name: "Dinas Dishub", img: "5.jpg", price: 500000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika ada barang di cart
        this.item = this.items.map((item) => {
          // jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang sudah ada, tambah quantity dan totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
      // console.log(this.total);
    },
    remove(id) {
      const cartItem = this.items.find((item) => item.id === id);

      // jika item lebih dari 1
      if (cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          // jika bukan barang yang diklik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // jika barangnya sisa 1
        this.items = this.items.filter((item) => item.id != id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// Form Validation
const checkoutBtn = document.querySelector(".checkout-btn");
checkoutBtn.disabled = true;

const form = document.querySelector("#checkoutForm");
form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length != 0) {
      checkoutBtn.classList.remove("disabled");
      checkoutBtn.classList.add("disabled");
    } else {
      return false;
    }
  }

  checkoutBtn.disabled = false;
  checkoutBtn.classList.remove("disabled");
});

// kirim data ketika tombol checkout diklik
checkoutBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  console.log(objData);
  const message = formatMessage(objData);
  window.open("http://wa.me/6285272773873?text=" + message);
});

// format pesan whatsapp
const formatMessage = (obj) => {
  return `Data Customer
    Nama: ${obj.name}
    Email: ${obj.email}
    Np Hp: ${obj.phone}
  Data Pesanan
    ${JSON.parse(obj.items).map(
      (item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n
  TOTAL: ${rupiah(obj.total)}
  Terima Kasih`
    )}`;
};

// conver to rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
