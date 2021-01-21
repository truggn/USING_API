var keyLocalStorageItemGioHang = ('danhSachItemGioHang');

function taoGioHang(idSanPham, soLuong) {
	var itemGioHang = new Object();
	itemGioHang.idSanPham = idSanPham;
	itemGioHang.soLuong = soLuong;
	return itemGioHang;
}

function layDanhSachItemGioHang() {
	var danhSachItemGioHang = new Array();
	var jsonDanhSachItemGioHang = localStorage.getItem('danhSachItemGioHang');



	if (jsonDanhSachItemGioHang != null) {
		danhSachItemGioHang = JSON.parse(jsonDanhSachItemGioHang);
	}
	return danhSachItemGioHang;

};
function luuDanhSachItemGioHangVaoLocalStorage(danhSachItemGioHang) {
	var jsonDanhSachItemGioHang = JSON.stringify(danhSachItemGioHang);

	localStorage.setItem(keyLocalStorageItemGioHang, jsonDanhSachItemGioHang)
};



function onClickXoa(idSanPham) {

	// load từ local
	let dataGioHang = loadDuLieuLocal('danhSachItemGioHang');

	// xóa node giỏ hàng
	let nodeCha = event.target.parentElement;
	let nodeSanPham = nodeCha.parentElement;
	nodeSanPham.remove();

	// xóa trong local
	let viTri = dataGioHang.findIndex(sp => sp.idSanPham == idSanPham);
	dataGioHang.splice(viTri, 1);

	ghiDuLieuLocal('danhSachItemGioHang', dataGioHang);

};

function onInPutSoLuong(id) {

	let soLuong = parseInt(event.target.value);

	if(soLuong <= 0)
		return;

	// lay node thanh tien
	let nodeCha1 = event.target.parentElement;
	let nodeCha2 = nodeCha1.parentElement;
	let nodeChuaNodeTongTien = nodeCha2.nextElementSibling;
	let nodeTongTien = nodeChuaNodeTongTien.getElementsByClassName('tongTien')[0];

	// lay gia ban san pham
	let dataSanPham = loadDuLieuLocal('danhSachSanPham');
	let sanPham = dataSanPham.find(sp => sp.id == id);
	let giaban = sanPham.giaBan * ((100- sanPham.phanTramGiamGia)/100);

	// dua tong tien len node
	nodeTongTien.innerText = giaban * soLuong;
	

	// luu lai len local
	let danhSachGioHang = loadDuLieuLocal("danhSachItemGioHang");

	for (var i = 0; i < danhSachGioHang.length; i++) {
		if (danhSachGioHang[i].idSanPham == id) {
			danhSachGioHang[i].soLuong = soLuong;
			break;
		}
	}

	ghiDuLieuLocal('danhSachItemGioHang',danhSachGioHang);

	
}

function onclickDuaVaoGioHang(idSanPham) {
    // lay danh sach item gio hang tu local
    const danhSachItemGioHang = layDanhSachItemGioHang();
    const itemEmpty = false;
    // nếu tồn tại thì tăng só lượng
    for (var i = 0; i < danhSachItemGioHang.length; i++) {
        var gioHangHienTai = danhSachItemGioHang[i];
        if (gioHangHienTai.idSanPham==idSanPham) {
            danhSachItemGioHang[i].soLuong++;
            itemEmpty = true;
        }
    }
    if (itemEmpty==false) {
        var itemGioHang = taoGioHang(idSanPham ,1);
        danhSachItemGioHang.push(itemGioHang);
    }
    // thuc hien luu tru xuống local 
    luuDanhSachItemGioHangVaoLocalStorage(danhSachItemGioHang);
};
function layDanhSachItemGioHang() {
	var listItemGioHang= new Array();
	 var jsonDanhSachItemGioHang = localStorage.getItem('danhSachItemGioHang');
	 if (jsonDanhSachItemGioHang != null ) {
        listItemGioHang = JSON.parse(jsonDanhSachItemGioHang);
	 }
	return danhSachItemGioHang;
}