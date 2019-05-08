/ *!
 * Plugin Cookie jQuery v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Hak Cipta 2013 Klaus Hartl
 * Dirilis di bawah lisensi MIT
 * /
(fungsi (pabrik) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define (['jquery'], factory);
	} lain jika (typeof export === 'object') {
		// CommonJS
		pabrik (membutuhkan ('jquery'));
	} lain {
		// Browser global
		pabrik (jQuery);
	}
} (fungsi ($) {

	var pluses = / \ + / g;

	function encode (s) {
		kembalikan config.raw? s: komponen encodeURIC;
	}

	decode fungsi {s)
		kembalikan config.raw? s: komponen decodeURIC;
	}

	function stringifyCookieValue (nilai) {
		return encode (config.json? JSON.stringify (value): String (value));
	}

	function parseCookieValue (s) {
		if (s.indexOf ('"') === 0) {
			// Ini adalah cookie yang dikutip sesuai dengan RFC2068, hapus jejak ...
			s = s.slice (1, -1) .replace (/ \\ "/ g, '"') .replace (/ \\\ / g, '\\');
		}

		coba {
			// Ganti nilai tambah sisi server dengan spasi.
			// Jika kita tidak bisa mendekode cookie, abaikan saja, itu tidak bisa digunakan.
			// Jika kami tidak dapat menguraikan cookie, abaikan saja, itu tidak dapat digunakan.
			s = decodeURIComponent (s.replace (pluses, ''));
			kembalikan config.json? JSON.parse (s): s;
		} tangkapan (e) {}
	}

	function read (s, converter) {
		nilai var = config.raw? s: parseCookieValue (s);
		return $ .isFunction (converter)? konverter (nilai): nilai;
	}

	var config = $ .cookie = fungsi (kunci, nilai, opsi) {

		// Menulis

		if (value! == undefined &&! $. isFunction (value)) {
			options = $ .extend ({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = Date baru ();
				t.setTime (+ t + hari * 864e + 5);
			}

			return (document.cookie = [
				menyandikan (kunci), '=', stringifyCookieValue (nilai),
				options. kedaluwarsa? '; kadaluarsa = '+ options.expires.toUTCString ():' ', // gunakan atribut kadaluwarsa, usia maks tidak didukung oleh IE
				options.path? '; path = '+ options.path:' ',
				options.domain? '; domain = '+ options.domain:' ',
				options.secure? '; aman ':' '
			].ikut(''));
		}

		// Baca baca

		var result = key? tidak terdefinisi : {};

		// Untuk mencegah for for di tempat pertama berikan array kosong
		// kalau-kalau tidak ada cookie sama sekali. Juga mencegah hasil aneh saat
		// menelepon $ .cookie ().
		var cookies = document.cookie? document.cookie.split (';'): [];

		untuk (var i = 0, l = cookies.length; i <l; i ++) {
			var parts = cookies [i] .split ('=');
			var name = decode (parts.shift ());
			var cookie = parts.join ('=');

			if (key && key === name) {
				// Jika argumen kedua (nilai) adalah fungsi itu adalah konverter ...
				hasil = baca (cookie, nilai);
				istirahat;
			}

			// Cegah penyimpanan cookie yang tidak bisa kami pecahkan.
			if (! key && (cookie = read (cookie))! == tidak terdefinisi) {
				hasil [nama] = cookie;
			}
		}

		hasil pengembalian;
	};

	config.defaults = {};

	$ .removeCookie = fungsi (kunci, opsi) {
		if ($ .cookie (key) === tidak terdefinisi) {
			return false;
		}

		// Tidak boleh mengubah opsi, sehingga memperluas objek baru ...
		$ .cookie (key, '', $ .extend ({}, options, {expires: -1}));
		kembali! $. cookie (kunci);
	};

}));
