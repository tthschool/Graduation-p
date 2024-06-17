package jp.co.etlab.ItemsClass;

public  class Item {
        private int shohin_id;
        private String shohin_mei;
        private int hanbai_tanka;
        private int shiire_tanka;
    
        public Item(int shohin_id, String shohin_mei, int hanbai_tanka, int shiire_tanka) {
            this.shohin_id = shohin_id;
            this.shohin_mei = shohin_mei;
            this.hanbai_tanka = hanbai_tanka;
            this.shiire_tanka = shiire_tanka;
        }
    }
