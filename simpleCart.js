/ ************************************************* *****************************
Hak Cipta (c) 2009 The Wojo Group

thewojogroup.com
simplecartjs.com
http://github.com/thewojogroup/simplecart-js/tree/master

Lisensi MIT

Izin dengan ini diberikan, gratis, kepada siapa pun yang mendapatkan salinannya
perangkat lunak ini dan file dokumentasi terkait ("Perangkat Lunak"), untuk ditangani
dalam Perangkat Lunak tanpa batasan, termasuk tanpa batasan hak
untuk menggunakan, menyalin, memodifikasi, menggabungkan, menerbitkan, mendistribusikan, mensublisensikan, dan / atau menjual
salinan Perangkat Lunak, dan untuk mengizinkan orang kepada siapa Perangkat Lunak ini berada
diperlengkapi untuk melakukannya, tunduk pada ketentuan berikut:

Pemberitahuan hak cipta di atas dan pemberitahuan izin ini harus disertakan dalam
semua salinan atau bagian penting Perangkat Lunak.

PERANGKAT LUNAK INI DISEDIAKAN "SEBAGAIMANA ADANYA", TANPA JAMINAN APA PUN, BAIK TERSURAT MAUPUN
DITERAPKAN, TERMASUK TAPI TIDAK TERBATAS PADA JAMINAN DAGANG,
KESESUAIAN UNTUK TUJUAN TERTENTU DAN NONINFRINGEMENT. DALAM ACARA TIDAK AKAN
PENULIS ATAU PEMEGANG HAK CIPTA BERTANGGUNG JAWAB ATAS KLAIM, KERUSAKAN ATAU LAINNYA
KEWAJIBAN, APAKAH DALAM TINDAKAN KONTRAK, TORT ATAU LAINNYA, BANGKIT DARI,
DI LUAR ATAU DALAM HUBUNGAN DENGAN PERANGKAT LUNAK ATAU PENGGUNAAN ATAU HUBUNGAN LAINNYA DI
PERANGKAT LUNAK.
************************************************ ************************** /




var NextId = 1, Kustom = "Kustom", GoogleCheckout = "GoogleCheckout", PayPal = "PayPal", Email = "Email", AustralianDollar = AUD = "AUD", CanadianDollar = CAD = "CAD", CzechKoruna = CZK = " CZK ", DanishKrone = DKK =" DKK ", Euro = EUR =" EUR ", HongKongDollar = HKD =" HKD ", HungarianForint = HUF =" HUF ", IsraelNewSheqel = ILS =" ILS ", JepangYen = JPY =" JPY " , MexicanPeso = MXN = "MXN", NorwegianKrone = NOK = "NOK", NewZealandDollar = NZD = "NZD", PolishZloty = PLN = "PLN", PoundSterling = GBP = "GBP", SingaporeDollar = SGD = "SGD", SwedishKrona = SEK = "SEK", SwissFranc = CHF = "CHF", USDollar = USD = "USD",
 	Bahasa Inggris = {PRICE: "price", QUANTITY: "quantity", TOTAL: "total"}, PRICE = "price", TOTAL = "total", QUANTITY = "quantity";

/ ***********************************
 * MANAJEMEN BAHASA *
 *********************************** /
	
	function setLanguage (bahasa) {
		PRICE = language.PRICE.toLowerCase (),
		QUANTITY = language.QUANTITY.toLowerCase (),
		TOTAL = language.TOTAL.toLowerCase ();
	}
	


fungsi Keranjang () {
	
	var me = ini;
	/ * variabel anggota * /
	me.Version = '2.0.1';
	me.Shelf = Shelf baru ();
	me.items = {};
	me.isLoaded = false;
	me.pageIsReady = false;
	saya [KUANTITAS] = 0;
	saya [TOTAL] = 0;
	me.taxRate = 0;
	me.taxCost = 0;
	me.shippingFlatRate = 0;
	me.shippingTotalRate = 0;
	me.shippingQuantityRate = 0;
	me.shippingRate = 0;
	me.shippingCost = 0;
	me.currency = USD;
	me.checkoutTo = PayPal;
	me.email = "";
	me.merchantId = "";
	me.cartHeaders = ['Nama', 'Harga', 'Quantiy', 'Total'];
	/ * 
		header keranjang: 
		Anda dapat mengatur ini ke pesanan yang pernah Anda inginkan, dan keranjang akan menampilkan header yang sesuai
		dan info barang. bidang apa pun yang Anda miliki untuk item dalam kereta dapat digunakan, dan 'Total' akan secara otomatis
		menjadi harga * kuantitas.  
		
		ada kata kunci yang bisa digunakan:
			
			1) "_input" - bidang akan menjadi input teks dengan nilai yang ditetapkan ke bidang yang diberikan. saat pengguna
				mengubah nilainya, itu akan memperbarui keranjang. ini dapat berguna untuk kuantitas. (yaitu "Quantity_input")
			
			2) "increment" - tautan dengan "+" yang akan menambah jumlah item sebanyak 1
			
			3) "decrement" - tautan dengan "-" yang akan mengurangi jumlah item sebanyak 1
			
			4) "hapus" - tautan yang akan menghapus item dari keranjang 
			
			5) "_image" atau "Image" - isian akan menjadi tag img dengan src diatur ke nilai. Anda cukup menggunakan "Gambar" jika
				Anda menetapkan bidang dalam item yang disebut "Gambar". Jika Anda memiliki bidang bernama sesuatu yang lain, seperti "Thumb", Anda dapat menambahkan
				"_image" untuk membuat tag gambar (yaitu "Thumb_image").
				
			6) "_noHeader" - ini akan melewati tajuk untuk bidang itu (yaitu "increment_noHeader")
		
	
	* /
	
	


	/ ************************************************* *****
			tambah / hapus item ke troli  
 	 ************************************************ **** /

	me.add = function () {
		var me = ini;
		/ * muat nilai keranjang jika belum dimuat * /
		if (! me.pageIsReady) { 
			me.initializeView (); 
			me.update ();	
		}
		if (! me.isLoaded) { 
			me.load (); 
			me.update ();	
		}
		
		var newItem = new CartItem ();
		
		/ * periksa untuk memastikan argumen telah diteruskan di * /
		if (! argumen || arguments.length === 0) {
			kesalahan ('Tidak ada nilai yang diteruskan untuk item.');
			kembali;
		}
		var argumentArray = argumen;
		if (argumen [0] && typeof (argumen [0])! = 'string' && typeof (argumen [0])! = 'number') { 
			argumentArray = argumen [0]; 
		} 
	
		newItem.parseValuesFromArray (argumentArray);
		newItem.checkQuantityAndPrice ();
		
		/ * jika item sudah ada, perbarui kuantitas * /
		if (me.hasItem (newItem)) {
			var id = me.hasItem (newItem);
			me.items [id] [QUANTITY] = parseInt (me.items [id] [QUANTITY], 10) + parseInt (newItem [QUANTITY], 10);
		} lain {
			me.items [newItem.id] = newItem;
		}	
		
		me.update ();
	};
	
	
	me.remove = fungsi (id) {
		var tempArray = {};
		untuk (item var di this.items) {
			if (item! = id) { 
				tempArray [item] = this.items [item]; 
			}
		}
		this.items = tempArray;
	};
	
	me.empty = function () {
		simpleCart.items = {};
		simpleCart.update ();
	};
	
	/ ************************************************* *****
			 fungsi pengaksesan item
     ************************************************ **** /

	me.find = fungsi (kriteria) {
		if (! kriteria)
			kembali nol;
		var results = [];
		for (var next in me.items) {
			var item = me.items [selanjutnya],
				cocok = benar;
			untuk (var name in criteria) {
				if (! item [nama] || item [nama]! = kriteria [nama])
					cocok = salah;
			}
			jika (cocok)
				results.push (me.next)
		}
		return (results.length == 0)? null: hasil;
	}

	/ ************************************************* *****
			 manajemen checkout 
     ************************************************ **** /

	me.checkout = function () {
		if (simpleCart [QUANTITY] === 0) {
			kesalahan ("Troli kosong");
			kembali;
		}
		switch (simpleCart.checkoutTo) {
			kasing PayPal:
				simpleCart.paypalCheckout ();
				istirahat;
			huruf GoogleCheckout:
				simpleCart.googleCheckout ();
				istirahat;
			Email kasus:
				simpleCart.emailCheckout ();
				istirahat;
			default:
				simpleCart.customCheckout ();
				istirahat;
		}
	};
	
	me.paypalCheckout = function () {
		
		var saya = ini,
			winpar = "scrollbar, lokasi, dapat diubah ukurannya, status",
			strn = "https://www.paypal.com/cgi-bin/webscr?cmd=_cart" +
		   			"& unggah = 1" +
		        	"& bisnis =" + me.email + 
					"& currency_code =" + me.currency,
			penghitung = 1,
			itemsString = "",
			saya = ini;
			
		
		if (me.taxRate) {
			strn = strn + 
				"& tax_cart =" + me.currencyStringForPaypalCheckout (me.taxCost);
		}
		
		for (var current in me.items) {
			var item = me.items [saat ini];
			
			var optionsString = "";
			untuk (bidang var dalam item) {
				if (typeof (item [field])! = "function" && field! = "id" && field! = bidang PRICE &&! = bidang QUANTITY &&! = "name" && field! = "shipping") {
					optionsString = optionsString + "," + field + "=" + item [bidang]; 
				}
			}
			optionsString = optionsString.substring (2);
			
			itemsString = itemsString + "& item_name_" + counter + "=" + item.name +
									 	  "& item_number_" + counter + "=" + counter +
										  "& quantity_" + counter + "=" + item [QUANTITY] +
										  "& number_" + counter + "=" + me.currencyStringForPaypalCheckout (item [PRICE]) + 
										  "& on0_" + counter + "=" + "Opsi" + 
										  "& os0_" + counter + "=" + optionsString;
			counter ++;
		}
		
		if (me.shipping ()! = 0) {
			 itemsString = itemsString + "& item_name_" + counter + "= Pengiriman" +
									 	  "& item_number_" + counter + "=" + counter +
										  "& quantity_" + counter + "= 1" + 
										  "& number_" + counter + "=" + me.currencyStringForPaypalCheckout (me.shippingCost);
		}
		
		
		strn = strn + itemsString;
		window.open (strn, "paypal", winpar);
	};

	me.googleCheckout = function () {
		var me = ini;
		if (me.currency! = USD && me.currency! = GBP) {
			kesalahan ("Google Checkout hanya memungkinkan USD dan GBP untuk mata uang.");
			kembali;
		} lain jika (me.merchantId === "" | | me.merchantId === null ||! me.merchantId) {
			kesalahan ("Tidak ada ID pedagang untuk checkout Google yang disediakan.");
			kembali;
		} 
		
		var form = document.createElement ("form"),
			penghitung = 1;
		form.style.display = "tidak ada";
		form.method = "POST";
		form.action = "https://checkout.google.com/api/checkout/v2/checkoutForm/Merchant/" + 
						me.merchantId;
		form.acceptCharset = "utf-8";
		
		for (var current in me.items) {
			var item = me.items [saat ini];
			form.appendChild (me.createHiddenElement ("item_name_" + counter, item.name));
			form.appendChild (me.createHiddenElement ("item_quantity_" + counter, item [QUANTITY]));
			form.appendChild (me.createHiddenElement ("item_price_" + counter, item [PRICE]));
			form.appendChild (me.createHiddenElement ("item_currency_" + counter, me.currency));
			form.appendChild (me.createHiddenElement ("item_tax_rate_" + counter, me.taxRate));
			form.appendChild (me.createHiddenElement ("_charset_", ""));
			
			var descriptionString = "";
			
			untuk (bidang var dalam item) {
				if (typeof (item [field])! = "function" && 
									bidang! = "id" && 
									bidang! = QUANTITY && 
									bidang! = HARGA)
				{
						descriptionString = descriptionString + "," + bidang + ":" + item [bidang];				
				}
			}
			descriptionString = descriptionString.substring (1);
			form.appendChild (me.createHiddenElement ("item_description_" + counter, descriptionString));
			counter ++;
		}
		
		document.body.appendChild (form);
		form.submit ();
		document.body.removeChild (form);
	};
	
	
	
	me.emailCheckout = function () {
		var div = me.updateCartView (document.createElement ("div"));
		div = "<div class = 'simpleCart_items'>" + div.innerHTML + "</div>";
		$ .post ("email.php", {div: div}, fungsi (data) {
			waspada (data);
		});
	};
	
	me.customCheckout = function () {
		kembali;
	};




	/ ************************************************* *****
				penyimpanan dan pengambilan data 
	 ************************************************ **** /
	
	/ * muat keranjang dari cookie * /
	me.load = function () {
		var me = ini;
		/ * menginisialisasi variabel dan array item * /
		me.items = {};
		saya [TOTAL] = 0,00;
		saya [QUANTITY] = 0;
		
		/ * mengambil data barang dari cookie * /
		if (readCookie ('simpleCart')) {
			var data = unescape (readCookie ('simpleCart')). split ('++');
			untuk (var x = 0, xlen = data.length; x <xlen; x ++) {
			
				var info = data [x] .split ('||');
				var newItem = new CartItem ();
			
				if (newItem.parseValuesFromArray (info)) {
					newItem.checkQuantityAndPrice ();
					/ * simpan item baru di troli * /
					me.items [newItem.id] = newItem;
				}
 			}
		}
		me.isLoaded = true;
	};
	
	
	
	/ * simpan keranjang ke cookie * /
	me.save = function () {
		var dataString = "";
		untuk (item var di this.items) {
			dataString = dataString + "++" + this.items [item] .print ();
		}
		createCookie ('simpleCart', dataString.substring (2), 30);
	};
	
	

	
		
	/ ************************************************* *****
				 manajemen tampilan 
	 ************************************************ **** /
	
	me.initializeView = function () {
		var me = ini;
		me.totalOutlets = getElementsByClassName ('simpleCart_' + TOTAL);
		me.quantityOutlets = getElementsByClassName ('simpleCart_' + QUANTITY);
		me.cartDivs = getElementsByClassName ('simpleCart_items');
		me.taxCostOutlets = getElementsByClassName ('simpleCart_taxCost');
		me.taxRateOutlets = getElementsByClassName ('simpleCart_taxRate');
		me.shippingCostOutlets = getElementsByClassName ('simpleCart_shippingCost');
		me.finalTotalOutlets = getElementsByClassName ('simpleCart_finalTotal');
		
		me.addEventToArray (getElementsByClassName ('simpleCart_checkout'), simpleCart.checkout, "klik");
		me.addEventToArray (getElementsByClassName ('simpleCart_empty'), simpleCart.empty, "klik");
		
		me.Shelf.readPage ();
			
		me.pageIsReady = true;
		
	};
	
	
	
	me.updateView = function () {
		me.updateViewTotals ();
		if (me.cartDivs && me.cartDivs.length> 0) { 
			me.updateCartView (); 
		}
	};
	
	me.updateViewTotals = function () {
		var outlet = [[QUANTITY, "none"], 
						[TOTAL, "mata uang"], 
						["biaya pengiriman", "mata uang"],
						["taxCost", "currency"],
						["taxRate", "persentase"],
						["finalTotal", "mata uang"]];
						
		untuk (var x = 0, xlen = outlets.length; x <xlen; x ++) {
			
			var arrayName = gerai [x] [0] + "Gerai",
				outputString;
				
			for (var element in me [arrayName]) {
				switch (outlet [x] [1]) {
					huruf "tidak ada":
						outputString = "" + me [outlet [x] [0]];
						istirahat;
					huruf "mata uang":
						outputString = me.valueToCurrencyString (me [outlet [x] [0]]);
						istirahat;
					huruf "persentase":
						outputString = me.valueToPercentageString (me [outlet [x] [0]]);
						istirahat;
					default:
						outputString = "" + me [outlet [x] [0]];
						istirahat;
				}
				saya [arrayName] [elemen] .innerHTML = "" + outputString;
			}
		}
	};
	
	me.updateCartView = function (div_) {
		var newRows = [],
			x, newRow, item, current, header, newCell, info, outputValue, option, headerInfo;
		
		/ * buat baris tajuk * /
		newRow = document.createElement ('div');
		untuk (tajuk di me.cartHeaders) {
			newCell = document.createElement ('div');
			headerInfo = me.cartHeaders [header] .split ("_");
			
			newCell.innerHTML = headerInfo [0];
			newCell.className = "item" + headerInfo [0];
			untuk (x = 1, xlen = headerInfo.length; x <xlen; x ++) {
				if (headerInfo [x] .toLowerCase () == "noheader") {
					newCell.style.display = "tidak ada";
				}
			}
			newRow.appendChild (newCell);
			
		}
		newRow.className = "cartHeaders";
		newRows [0] = newRow;
		
		/ * buat baris untuk setiap item di troli * /
		x = 1;
		untuk (saat ini di me.items) {
			newRow = document.createElement ('div');
			item = me.items [saat ini];
			
			untuk (tajuk di me.cartHeaders) {
				
				newCell = document.createElement ('div');
				info = me.cartHeaders [header] .split ("_");
				
				beralih (info [0] .toLowerCase ()) {
					case TOTAL:
						outputValue = me.valueToCurrencyString (parseFloat (item [PRICE]) * parseInt (item [QUANTITY], 10));
						istirahat;
					huruf "increment":
						outputValue = me.valueToLink ("+", "javascript :;", "onclick = \" simpleCart.items [\ '"+ item.id +" \']. increment (); \ "");
						istirahat;
					huruf "decrement":
						outputValue = me.valueToLink ("-", "javascript :;", "onclick = \" simpleCart.items [\ '"+ item.id +" \']. decrement (); \ "");
						istirahat;
					huruf "hapus":
						outputValue = me.valueToLink ("Hapus", "javascript:;", "onclick = \" simpleCart.items [\ '"+ item.id +" \']. hapus (); \ "");
						istirahat;
					HARGA kasus:
						outputValue = me.valueToCurrencyString (item [info [0] .toLowerCase ()]? item [info [0] .toLowerCase ()]: "");
						istirahat;
					default: 
						outputValue = item [info [0] .toLowerCase ()]? item [info [0] .toLowerCase ()]: "";
						istirahat;
				}	
				
				untuk (var y = 1, ylen = info.length; y <ylen; y ++) {
					option = info [y] .toLowerCase ();
					beralih (opsi) {
						huruf "gambar":
						huruf "img":
							outputValue = me.valueToImageString (outputValue);		
							istirahat;
						huruf "masukan":
							outputValue = me.valueToTextInput (outputValue, "onchange = \" simpleCart.items [\ '"+ item.id +" \']. set (\ '"+ outputValue +" \', this.value); \ "" );
							istirahat;
						huruf "div":
						huruf "rentang":
						huruf "h1":
						huruf "h2":
						huruf "h3":
						huruf "h4":
						huruf "p":
							outputValue = me.valueToElement (opsi, outputValue, "");
							istirahat;
						huruf "noheader":
							istirahat;
						default:
							kesalahan ("opsi tajuk tidak dikenal:" + opsi);
							istirahat;
					}
				
				}		  
				newCell.innerHTML = outputValue;
				newCell.className = "item" + info [0];
				newRow.appendChild (newCell);
			}			
			newRow.className = "itemContainer";
			newRows [x] = newRow;
			x ++;
		}
		
		if (div_) {
			while (div_.childNodes [0])
				div_.removeChild (div_.childNodes [0]);
			
			untuk (var j = 0, jLen = newRows.length; j <jLen; j ++)
				div_.appendChild (newRows [j]);
			return div_;
		} lain {
			untuk (saat ini di me.cartDivs) {

				/ * hapus baris saat ini di div * /
				var div = me.cartDivs [sekarang];
				while (div.childNodes [0])
					div.removeChild (div.childNodes [0]);

				untuk (var j = 0, jLen = newRows.length; j <jLen; j ++)
					div.appendChild (newRows [j]);
			}
		}
		
		
	};

	me.addEventToArray = function (array, functionCall, theEvent) {
		untuk (var outlet in array) {
			var element = array [outlet];
			if (element.addEventListener) {
				element.addEventListener (theEvent, functionCall, false);
			} lain jika (element.attachEvent) {
			  	element.attachEvent ("on" + theEvent, functionCall);
			}
		}
	};
	
	
	me.createHiddenElement = fungsi (nama, nilai) {
		var element = document.createElement ("input");
		element.type = "hidden";
		element.name = name;
		element.value = value;
		elemen pengembalian;
	};
	
	
	
	/ ************************************************* *****
				Manajemen mata uang
	 ************************************************ **** /
	
	me.currencySymbol = function () {		
		switch (me.currency) {
			case JPY:
				return "& yen;";
			kas EUR:
				return "& euro;";
			case GBP:
				return "& pound;";
			case USD:
			case CAD:
			case AUD:
			kasus NZD:
			kasus HKD:
			kasus SGD:
				kembali "& # 36;";
			default:
				kembali "";
		}
	};
	
	
	me.currencyStringForPaypalCheckout = fungsi (nilai) {
		if (me.currencySymbol () == "& # 36;") {
			return "$" + parseFloat (nilai) .toFixed (2);
		} lain {
			return "" + parseFloat (nilai) .toFixed (2);
		}
	};
	
	/ ************************************************* *****
				Memformat
	 ************************************************ **** /
	
	
	me.valueToCurrencyString = fungsi (nilai) {
		return parseFloat (value) .toCurrency (me.currencySymbol ());
	};
	
	me.valueToPercentageString = fungsi (nilai) {
		return parseFloat (nilai 100 *) + "%";
	};
	
	me.valueToImageString = fungsi (nilai) {
		if (value.match (/ <\ s * img. * src \ = /)) {
			nilai pengembalian;
		} lain {
			return "<img src = \" "+ value +" \ "/>";
		}
	};
	
	me.valueToTextInput = fungsi (nilai, html) {
		mengembalikan "<input type = \" text \ "value = \" "+ value +" \ "" + html + "/>";
	};
	
	me.valueToLink = fungsi (nilai, tautan, html) {
		kembalikan "<a href=\"" + tautan +" \" "+ html +"> "+ value +" </a> ";
	};
	
	me.valueToElement = fungsi (tipe, nilai, html) {
		return "<" + type + "" + html + ">" + value + "</" + type + ">";
	};
	
	/ ************************************************* *****
				Manajemen rangkap
	 ************************************************ **** /
	
	me.hasItem = fungsi (item) {
		for (var current in me.items) {
			var testItem = me.items [saat ini];
			var cocok = benar;
			untuk (bidang var dalam item) {
				if (typeof (item [field])! = "function" && 
					bidang! = "kuantitas" && 
					bidang! = "id") {
					if (item [bidang]! = testItem [bidang]) {
						match = false;
					}
				}	
			}
			jika (cocok) 
				arus balik; 
			}
		}
		return false;
	};
	
	
	
	
	/ ************************************************* *****
				Manajemen Pembaruan Keranjang
	 ************************************************ **** /
	
	me.update = function () {
		if (! simpleCart.isLoaded) {
			simpleCart.load ();
		} 
		if (! simpleCart.pageIsReady) {
			simpleCart.initializeView ();
		}
		me.updateTotals ();
		me.updateView ();
		me.save ();
	};
	
	me.updateTotals = function () {
		saya [TOTAL] = 0;
		saya [QUANTITY] = 0;
		for (var current in me.items) {
			var item = me.items [saat ini];
			if (item [QUANTITY] <1) { 
				item.remove ();
			} lain jika (item [QUANTITY]! == null && item [QUANTITY]! = "undefined") {
				saya [QUANTITY] = parseInt (saya [QUANTITY], 10) + parseInt (item [QUANTITY], 10); 
			}
			if (item [PRICE]) { 
				saya [TOTAL] = parseFloat (saya [TOTAL]) + parseInt (item [QUANTITY], 10) * parseFloat (item [PRICE]); 
			}
		}
		me.shippingCost = me.shipping ();
		me.taxCost = parseFloat (me [TOTAL]) * me.taxRate;
		me.finalTotal = me.shippingCost + me.taxCost + me [TOTAL];
	};
	
	me.shipping = function () {
		if (parseInt (me [QUANTITY], 10) === 0)
			return 0;
		var shipping = parseFloat (me.shippingFlatRate) + 
					  	parseFloat (me.shippingTotalRate) * parseFloat (me [TOTAL]) +
						parseFloat (me.shippingQuantityRate) * parseInt (me [QUANTITY], 10),
			item berikutnya,
			berikutnya;
		untuk (selanjutnya dalam item saya) {
			nextItem = me.items [selanjutnya];
			if (nextItem.shipping) {
				if (ketik nextItem.shipping == 'function') {
					shipping + = parseFloat (nextItem.shipping ());
				} lain {
					shipping + = parseFloat (nextItem.shipping);
				}
			}
		}
		
		pengiriman kembali;
	}
	
	me.initialize = function () {
		simpleCart.initializeView ();
		simpleCart.load ();
		simpleCart.update ();
	};
				
}

/ ************************************************* ************************************************ *****
 * Obyek Item Keranjang
 ************************************************ ************************************************ **** /

fungsi CartItem () {
	this.id = "c" + NextId ++;
}
	CartItem.prototype.set = fungsi (bidang, nilai) {
		field = field.toLowerCase ();
		if (typeof (this field))! = "function" && field! = "id") {
			if (bidang == QUANTITY) {
				value = value.replace (/[^((dd#####/gi, "");
				value = value.replace (/, * / gi, "");
				value = parseInt (value, 10);
			} lain jika (bidang == PRICE) {
				value = value.replace (/[^((dd#####/gi, "");
				value = value.replace (/, * / gi, "");
				value = parseFloat (nilai);
			}
			if (typeof (value) == "number" && isNaN (value)) {
				error ("Input tidak diformat dengan benar.");
			} lain {
				ini [bidang] = nilai;
				this.checkQuantityAndPrice ();
			}			
		} lain {
			kesalahan ("Tidak dapat mengubah" + bidang + ", ini adalah bidang yang dicadangkan.");
		}
		simpleCart.update ();
	};
	
	CartItem.prototype.increment = function () {
		this [QUANTITY] = parseInt ([QUANTITY] ini, 10) +1;
		simpleCart.update ();
	};
	
	CartItem.prototype.decrement = function () {
		if (parseInt ([QUANTITY] ini, 10) <2) {
			this.remove ();
		} lain {
			this [QUANTITY] = parseInt (this [QUANTITY], 10) - 1;
			simpleCart.update ();
		}
	};
	
	CartItem.prototype.print = function () {
		var returnString = '';
		untuk (bidang var dalam hal ini) {
			if (typeof (this field))! = "function") {
				returnString + = escape (bidang) + "=" + escape ([bidang] ini) + "||";
			}
		}
		return returnString.substring (0, returnString.length-2);
	};
	
	
	CartItem.prototype.checkQuantityAndPrice = function () {
		if (! this [PRICE] || this [QUANTITY] == null || this [QUANTITY] == 'undefined') { 
			ini [QUANTITY] = 1;
			kesalahan ('Tidak ada kuantitas untuk item.');
		} lain {
			this [QUANTITY] = ("" + this [QUANTITY]). ganti (/, * / gi, "");
			this [QUANTITY] = parseInt (("" + this [QUANTITY]). ganti (/[^((dd#####), ""), 10); 
			if (isNaN ([QUANTITY]) ini)) {
				kesalahan ('Kuantitas bukan angka.');
				ini [QUANTITY] = 1;
			}
		}
				
		if (! this [PRICE] || this [PRICE] == null || this [PRICE] == 'undefined') {
			ini [HARGA] = 0,00;
			kesalahan ('Tidak ada harga untuk barang atau harga yang tidak diformat dengan benar.');
		} lain {
			this [PRICE] = ("" + this [PRICE]). ganti (/, * / gi, "");
			this [PRICE] = parseFloat (("" + this [PRICE]). ganti (/[^((dd####), "")); 
			if (isNaN ([PRICE] ini))) {
				kesalahan ('Harga bukan angka.');
				ini [HARGA] = 0,00;
			}
		}
	};
	
	
	CartItem.prototype.parseValuesFromArray = function (array) {
		if (array && array.length && array.length> 0) {
			untuk (var x = 0, xlen = array.length; x <xlen; x ++) {
			
				/ * memastikan pasangan tidak memiliki pembatas kunci * /
				array [x]. ganti (/ || /, "| |");
				array [x]. ganti (/ \ + \ + /, "+ +");
			
				/ * pisahkan pasangan dan simpan nilai yang tidak terhapus ke item * /
				nilai var = array [x] .split ('=');
				if (value.length> 1) {
					if (value.length> 2) {
						untuk (var j = 2, jlen = value.length; j <jlen; j ++) {
							nilai [1] = nilai [1] + "=" + nilai [j];
						}
					}
					this [unescape (value [0]). toLowerCase ()] = unescape (value [1]);
				}
			}
			kembali benar;
		} lain {
			return false;
		}
	};
	
	CartItem.prototype.remove = function () {
		simpleCart.remove (this.id);
		simpleCart.update ();
	};
	


/ ************************************************* ************************************************ *****
 * Objek Rak untuk mengelola barang di rak yang dapat ditambahkan ke troli
 ************************************************ ************************************************ **** /

function Shelf () {
	this.items = {};
}	
	Shelf.prototype.readPage = function () {
		this.items = {};
		var newItems = getElementsByClassName ("simpleCart_shelfItem");
		for (var current in newItems) {
			var newItem = new ShelfItem ();
			this.checkChildren (newItems [current], newItem);
			this.items [newItem.id] = newItem;
		}
	};
	
	Shelf.prototype.checkChildren = fungsi (item, newItem) {
		
		untuk (var x = 0; item.childNodes [x]; x ++) {
			
			var node = item.childNodes [x];
			if (node.className && node.className.match (/ item _ [^] + /)) {
				
				var data = / item _ [^] + /. exec (node.className) [0] .split ("_");
				
				if (data [1] == "add" || data [1] == "Add") {
					var tempArray = [];
					tempArray.push (node);
					var addFunction = simpleCart.Shelf.addToCart (newItem.id);
					simpleCart.addEventToArray (tempArray, addFunction, "click");
					node.id = newItem.id;
				} lain {
					newItem [data [1]] = node;
				}
			}		
			if (node.childNodes [0]) { 
				this.checkChildren (node, newItem);	
			}	
		}
	};
	
	Shelf.prototype.empty = function () {
		this.items = {};
	};
	
	
	Shelf.prototype.addToCart = fungsi (id) {
		fungsi pengembalian () {
			if (simpleCart.Shelf.items [id]) {
				simpleCart.Shelf.items [id] .addToCart ();
			} lain {
				kesalahan ("Item rak dengan id" + id + "tidak ada.");
			}
		};
	};
	

/ ************************************************* ************************************************ *****
 * Benda Rak Barang
 ************************************************ ************************************************ **** /


function ShelfItem () {
	this.id = "s" + NextId ++;
}	
	ShelfItem.prototype.remove = function () {
		simpleCart.Shelf.items [this.id] = null;
	};
	
	
	ShelfItem.prototype.addToCart = function () {
		var outStrings = [], valueString;
		untuk (bidang var dalam hal ini) {
			if (typeof (this field))! = "function" && field! = "id") {
				valueString = "";
				
				beralih (bidang) {
					HARGA kasus:
						if ([bidang] ini. nilai) {
							valueString = this [field] .value; 
						} lain jika (bidang [ini] .innerHTML) {
							valueString = this [field] .innerHTML;
						}
						/ * hapus semua karakter dari harga kecuali angka dan periode * /
						valueString = valueString.replace (/[^((dd#####), "");
						valueString = valueString.replace (/, * /, "");
						istirahat;
					huruf "gambar":
						valueString = this [field] .src;
						istirahat;
					default:
						if ([bidang] ini. nilai) {
							valueString = this [field] .value; 
						} lain jika (bidang [ini] .innerHTML) {
							valueString = this [field] .innerHTML;
						} lain jika (bidang [ini] .src) {
							valueString = this [field] .src;
						} lain {
							valueString = this [field];
						}
						istirahat;
				}
				outStrings.push (bidang + "=" + valueString);
			}
		}
		
		simpleCart.add (outStrings);
	};
	


/ ************************************************* ************************************************ *****
 * Terima kasih kepada Peter-Paul Koch untuk fungsi cookie ini (http://www.quirksmode.org/js/cookies.html)
 ************************************************ ************************************************ **** /
function createCookie (nama, nilai, hari) {
	jika (hari) {
		var date = Tanggal baru ();
		date.setTime (date.getTime () + (hari * 24 * 60 * 60 * 1000));
		var kedaluwarsa = "; kedaluwarsa =" + date.toGMTString ();
	}
	selain itu var kedaluwarsa = "";
	document.cookie = nama + "=" + nilai + kedaluwarsa + "; jalur = /";
}

function readCookie (nama) {
	var nameEQ = name + "=";
	var ca = document.cookie.split (';');
	untuk (var i = 0; i <ca.length; i ++) {
		var c = ca [i];
		while (c.charAt (0) == '') c = c.substring (1, c.length);
		if (c.indexOf (nameEQ) === 0) mengembalikan c.substring (nameEQ.length, c.length);
	}
	kembali nol;
}

function eraseCookie (nama) {
	createCookie (nama, "", - 1);
}


// ********************************************** ***********************************************
/ *
	Dikembangkan oleh Robert Nyman, http://www.robertnyman.com
	Kode / lisensi: http://code.google.com/p/getelementsbyclassname/
* /	
var getElementsByClassName = fungsi (className, tag, elm) {
	if (document.getElementsByClassName) {
		getElementsByClassName = fungsi (className, tag, elm) {
			elm = elm || dokumen;
			elemen var = elm.getElementsByClassName (className),
				nodeName = (tag)? RegExp baru ("\\ b" + tag + "\\ b", "i"): null,
				returnElements = [],
				arus;
			untuk (var i = 0, il = elements.length; i <il; i + = 1) {
				saat ini = elemen [i];
				if (! nodeName || nodeName.test (current.nodeName)) {
					returnElements.push (saat ini);
				}
			}
			returnElements return;
		};
	}
	lain jika (document.evaluate) {
		getElementsByClassName = fungsi (className, tag, elm) {
			tag = tag || "*";
			elm = elm || dokumen;
			kelas var = className.split (""),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace: null,
				returnElements = [],
				elemen,
				simpul;
			untuk (var j = 0, jl = classes.length; j <jl; j + = 1) {
				classesToCheck + = "[berisi (concat ('', @class, ''), '" + kelas [j] + "')]";
			}
			coba {
				elements = document.evaluate (".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
			}
			catch (e) {
				elements = document.evaluate (".//" + tag + classesToCheck, elm, null, 0, null);
			}
			while ((node ​​= elements.iterateNext ())) {
				returnElements.push (node);
			}
			returnElements return;
		};
	}
	lain {
		getElementsByClassName = fungsi (className, tag, elm) {
			tag = tag || "*";
			elm = elm || dokumen;
			kelas var = className.split (""),
				classesToCheck = [],
				elements = (tag === "*" && elm.all)? elm.all: elm.getElementsByTagName (tag),
				arus,
				returnElements = [],
				pertandingan;
			untuk (var k = 0, kl = class.length; k <kl; k + = 1) {
				classesToCheck.push (RegExp baru ("(^ | \\ s)" + kelas [k] + "(\\ s | $)"));
			}
			untuk (var l = 0, ll = elements.length; l <ll; l + = 1) {
				saat ini = elemen [l];
				match = false;
				untuk (var m = 0, ml = classesToCheck.length; m <ml; m + = 1) {
					match = classesToCheck [m] .test (current.className);
					if (! match) {
						istirahat;
					}
				}
				jika (cocok) {
					returnElements.push (saat ini);
				}
			}
			returnElements return;
		};
	}
	kembalikan getElementsByClassName (className, tag, elm);
};


/ ************************************************* ************************************************ *****
 * Pembantu
 ************************************************ ************************************************ **** /


String.prototype.reverse = function () {return this.split (""). Reverse (). Join ("");};
Number.prototype.withCommas = function () {var x = 6, y = parseFloat (this) .toFixed (2) .toString (). Reverse (); sebaliknya (x <y.length) {y = y.substring ( 0, x) + "," + y.substring (x); x + = 4;} kembalikan y.reverse ();};
Number.prototype.toCurrency = function () {return (argumen [0]? Argumen [0]: "$") + this.withCommas ();};


/ ************************************************* ************************************************ *****
 * manajemen kesalahan 
 ************************************************ ************************************************ **** /

kesalahan fungsi (pesan) {
	mencoba{ 
		console.log (pesan); 
	} catch (err) { 
	// alert (pesan);
	}
}


var simpleCart = Keranjang baru ();

if (typeof jQuery! == 'undefined') $ (document) .ready (function () {simpleCart.initialize ();}); 
lain jika (typeof Prototype! == 'undefined') Event.observe (window, 'load', function () {simpleCart.initialize ();});
selain itu window.onload = simpleCart.initialize;
