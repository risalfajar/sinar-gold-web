import {Menu} from "src/features/dashboard/types/menu"

export const menus: Menu[] = [
    {
        title: 'Beranda',
        link: '/dashboard/index'
    },
    {
        title: 'Berlian',
        link: '/dashboard/diamond',
        subMenus: [
            {
                title: 'Master Supplier',
                link: '/dashboard/diamond/supplier'
            },
            {
                title: 'Batu Shape',
                link: '/dashboard/diamond/shape'
            },
            {
                title: 'Batu Color',
                link: '/dashboard/diamond/color'
            },
            {
                title: 'Batu Clarity',
                link: '/dashboard/diamond/clarity'
            },
            {
                title: 'Batu Fluorescence',
                link: '/dashboard/diamond/fluorescence'
            },
            {
                title: 'Batu Symmetry',
                link: '/dashboard/diamond/symmetry'
            },
            {
                title: 'Batu Polish',
                link: '/dashboard/diamond/polish'
            },
            {
                title: 'Batu Cutgrade',
                link: '/dashboard/diamond/cutgrade'
            },
            {
                title: 'Jenis Batu',
                link: '/dashboard/diamond/stone-type'
            },
        ]
    },
    {
        title: 'Penjualan',
        link: '/dashboard/sale'
    },
    {
        title: 'Pembelian',
        link: '/dashboard/purchase'
    },
    {
        title: 'Pemesanan',
        link: '/dashboard/order/index',
        subMenus: [
            {
                title: 'Data Pesanan',
                link: '/dashboard/order/index'
            },
            {
                title: 'Proses Pesanan',
                link: '/dashboard/order/process'
            },
            {
                title: 'Pesanan Selesai',
                link: '/dashboard/order/finished'
            },
            {
                title: 'Riwayat Pesanan',
                link: '/dashboard/order/history'
            },
            {
                title: 'Data Barang Titipan',
                link: '/dashboard/order/deposit'
            },
        ]
    },
    {
        title: 'Buku Tukang',
        link: '/dashboard/craftsman'
    },
    {
        title: 'Service',
        link: '/dashboard/service'
    },
    {
        title: 'Simpan Pinjam',
        link: '/dashboard/loan'
    },
    {
        title: 'Uang Kas',
        link: '/dashboard/cash'
    },
    {
        title: 'Validasi',
        link: '/dashboard/validation',
        subMenus: [
            {
                title: 'Validasi Penjualan',
                link: '/dashboard/validation/sale'
            },
            {
                title: 'Validasi Pembelian',
                link: '/dashboard/validation/purchase'
            },
            {
                title: 'Validasi Simpan Pinjam',
                link: '/dashboard/validation/loan'
            },
            {
                title: 'Validasi Tebus',
                link: '/dashboard/validation/saving'
            },
        ]
    },
    {
        title: 'Member',
        link: '/dashboard/member'
    },
    {
        title: 'Barang',
        link: '/dashboard/items',
        subMenus: [
            {
                title: 'Data Barang',
                link: '/dashboard/items/data'
            },
            {
                title: 'Cetak Barcode',
                link: '/dashboard/items/barcode-print'
            },
        ]
    },
    {
        title: 'Timbang Talang',
        link: '/dashboard/weigh'
    },
    {
        title: 'Data Master',
        link: '/dashboard/master-data/group',
        subMenus: [
            {
                title: 'Master Group',
                link: '/dashboard/master-data/group'
            },
            {
                title: 'Master Jenis',
                link: '/dashboard/master-data/item-kind'
            },
            {
                title: 'Master Tipe Barang',
                link: '/dashboard/master-data/item-type'
            },
            {
                title: 'Master Gudang',
                link: '/dashboard/master-data/warehouse'
            },
            {
                title: 'Master Etalase',
                link: '/dashboard/master-data/storefront'
            },
            {
                title: 'Master Talang',
                link: '/dashboard/master-data/chamfer'
            },
            {
                title: 'Master Brondol',
                link: '/dashboard/master-data/brondol'
            },
            {
                title: 'Master Sales',
                link: '/dashboard/master-data/salesman'
            },
            {
                title: 'Data Hadiah',
                link: '/dashboard/master-data/gift'
            },
            {
                title: 'Master Marketplace',
                link: '/dashboard/master-data/marketplace'
            },
            {
                title: 'Master Kode Transaksi',
                link: '/dashboard/master-data/transaction-code'
            },
            {
                title: 'Master Kondisi Barang',
                link: '/dashboard/master-data/item-condition'
            },
            {
                title: 'Master Kondisi Pembelian',
                link: '/dashboard/master-data/purchase-condition'
            },
            {
                title: 'Master Bank',
                link: '/dashboard/master-data/bank'
            },
            {
                title: 'Master Rekening',
                link: '/dashboard/master-data/bank-account-number'
            },
            {
                title: 'Parameter Jenis Group',
                link: '/dashboard/master-data/group-type'
            },
            {
                title: 'Parameter Point',
                link: '/dashboard/master-data/point'
            },
            {
                title: 'Parameter Harga Emas',
                link: '/dashboard/master-data/gold-price'
            },
            {
                title: 'Parameter Ongkos',
                link: '/dashboard/master-data/cost'
            },
            {
                title: 'Master Toko',
                link: '/dashboard/master-data/store'
            },
            {
                title: 'Parameter Keterangan Nota',
                link: '/dashboard/master-data/note-description'
            },
            {
                title: 'Master Supplier',
                link: '/dashboard/master-data/supplier'
            },
            {
                title: 'Master Kategori',
                link: '/dashboard/master-data/category'
            },
        ]
    },
    {
        title: 'Stock Opname',
        link: '/dashboard/stock-opname'
    },
    {
        title: 'Laporan',
        link: '/dashboard/report',
        subMenus: [
            {
                title: 'Laporan Barang',
                link: '/dashboard/report/items'
            },
            {
                title: 'Laporan End Of Day',
                link: '/dashboard/report/eod'
            },
            {
                title: 'Laporan Keuangan',
                link: '/dashboard/report/finance'
            },
            {
                title: 'Laporan Otorisasi',
                link: '/dashboard/report/authorization'
            },
            {
                title: 'Laporan Harga Emas',
                link: '/dashboard/report/gold-price'
            },
            {
                title: 'Laporan Timbang Talang',
                link: '/dashboard/report/weigh'
            },
        ]
    },
    {
        title: 'Utility',
        link: '/dashboard/utility'
    },
    {
        title: 'Manajemen User',
        link: '/dashboard/users'
    },
]
