// Import modul express
const express = require('express');
const app = express();

// Middleware untuk menyajikan berkas statis dari folder 'public'
app.use('/public', express.static('public'));
// Set view engine menjadi EJS
app.set('view engine', 'ejs');

// Import modul body-parser untuk menghandle parsing data dari formulir
const bodyParser = require('body-parser');

// Middleware untuk memproses body permintaan dengan format JSON dan URL-encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rute untuk menampilkan halaman utama dengan nilai awal persentase kosong
app.get('/', (req, res) => {
    res.render("home.ejs", { percentage: " " });
});

// Rute untuk menangani permintaan POST dari formulir
app.post('/', (req, res) => {
    // Ambil data dari formulir
    const userName = req.body.username;
    const partnerName = req.body.partnername;

    // Gabungkan nama dan ubah ke huruf kecil
    const combinedNames = (userName + partnerName).toLowerCase();

    // Hitung kemunculan setiap huruf
    const t = combinedNames.split("t").length - 1;
    const r = combinedNames.split("r").length - 1;
    const u = combinedNames.split("u").length - 1;
    const e = combinedNames.split("e").length - 1;

    // Hitung digit pertama
    let firstDigit = t + r + u + e;
    if (firstDigit < 5) {
        firstDigit += 5;
    }

    // Hitung kemunculan setiap huruf (menggunakan variabel yang berbeda dari sebelumnya)
    const l = combinedNames.split("l").length - 1;
    const o = combinedNames.split("o").length - 1;
    const v = combinedNames.split("v").length - 1;
    const eAgain = combinedNames.split("e").length - 1;

    // Hitung digit kedua
    const secondDigit = l + o + v + eAgain;

    // Hitung persentase cinta
    const lovePercentage = firstDigit + '' + secondDigit;

    // Render kembali halaman home.ejs dengan hasil persentase cinta
    res.render("home.ejs", { percentage: lovePercentage });
});

// Dengarkan pada port 3000
app.listen(3000, () => {
    console.log("Aplikasi berjalan pada port 3000");
});
