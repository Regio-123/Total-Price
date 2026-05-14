let struk = document.getElementById("struk");
let totalSemua = document.getElementById("totalSemua");
let rowStruk = document.querySelector(".row-struk");
let keranjang = [];

function RenderStruk() {
  rowStruk.innerHTML = "";
  let total = 0;
  for (let i = 0; i < keranjang.length; i++) {
    let totalHarga = keranjang[i].harga * keranjang[i].jumlah;
    total += totalHarga;
    let kiriGroup = document.createElement("div");
    let kananGroup = document.createElement("div");
    kananGroup.className = "kananGroup";
    kiriGroup.className = "kiriGroup";
    let kiriText = document.createElement("span");
    let kananText = document.createElement("span");
    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    kiriText.textContent = `${keranjang[i].nama} x${keranjang[i].jumlah} X ${keranjang[i].harga} =`;
    kananText.textContent = `RP.${totalHarga.toLocaleString("id-ID")}`;
    let row = document.createElement("div");
    row.className = "row-struk-item";
    kiriGroup.appendChild(kiriText);
    kananGroup.appendChild(kananText);
    kananGroup.appendChild(editButton);
    row.appendChild(kiriGroup);
    row.appendChild(kananGroup);
    rowStruk.appendChild(row);
    editButton.dataset.index = i;

    editButton.addEventListener("click", function(e) {
      let index = e.target.dataset.index;
      let item = keranjang[index];
      let newNama = prompt("Masukkan nama baru:", item.nama);
      let newHarga = prompt("Masukkan harga baru:", item.harga);
      let newJumlah = prompt("Masukkan jumlah baru:", item.jumlah);

      item.nama = newNama;
      item.harga = Number(newHarga);
      item.jumlah = Number(newJumlah);
      RenderStruk();
    });
  }
  localStorage.setItem("keranjang", JSON.stringify(keranjang));
  totalSemua.textContent = `Total: RP.${total.toLocaleString("id-ID")}`;

}

function LoadFromStorage() {
  let dataKeranjang = localStorage.getItem("keranjang");
  if (dataKeranjang) {
    keranjang = JSON.parse(dataKeranjang);
    RenderStruk();
  }
}
LoadFromStorage();
function Hasil() {
  let nama = document.getElementById("nama").value;
  let harga = document.getElementById("harga").value;
  let jumlah = document.getElementById("jumlah").value;
  if (nama === "" || harga === "" || jumlah === "") {
    alert("Mohon isi semua field!");
    return;
  }

  keranjang.push({
    nama: nama,
    harga: Number(harga),
    jumlah: Number(jumlah),
  });

  RenderStruk();

  let namaInput = document.getElementById("nama");
  let hargaInput = document.getElementById("harga");
  let jumlahInput = document.getElementById("jumlah");
  namaInput.focus();
  namaInput.value = "";
  hargaInput.value = "";
  jumlahInput.value = "";
}

function Kembali() {
  if (keranjang.length === 0) return;
  keranjang.pop();
  RenderStruk();
}
