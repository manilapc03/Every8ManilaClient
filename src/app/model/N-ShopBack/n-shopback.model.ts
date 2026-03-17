export interface NShopBackModel {
  history_id: number;
  shop_id: number;

  shop_name: string;
  shop_name_yomi?: string;
  shop_name_hirakana: string;
  shop_url_name: string;

  chihou_id: number;
  area_id: number;

  kinmuchi?: string;
  gyousyu_id: number;

  syokusyu: string;
  kyuuyo: string;
  shikaku: string;

  koutsuu?: string;

  kinmubi: string;
  kinmuzikan: string;

  homepage_1?: string;
  homepage_2?: string;
  homepage_mobile?: string;

  hp_view_flg?: boolean;

  homepage_note1?: string;
  homepage_note2?: string;

  mail_1?: string;
  mail_2?: string;
  mail_3?: string;

  mail_note1?: string;
  mail_note2?: string;
  mail_note3?: string;

  mail_open1: boolean;
  mail_open2: boolean;
  mail_open3: boolean;

  taiguu_other?: string;
  taiguu_id?: string;

  map_pc?: string;

  group_map_flg: boolean;

  longitude?: string;
  latitude?: string;

  map_ph?: string;

  shop_zip?: string;

  shop_todoufuken: number;

  shop_address_1: string;
  shop_address_2?: string;
  shop_address_3?: string;
  shop_address_building?: string;

  tel_1: string;
  tel_2?: string;
  tel_3?: string;

  tel_note1?: string;
  tel_note2?: string;
  tel_note3?: string;

  title?: string;
  catch?: string;

  rank?: number;

  scout_flg: boolean;

  member_flg?: boolean;
  view_flg?: boolean;

  keisai_status_id: number;

  create_date?: Date;
  update_date: Date;
  shop_update_date?: Date;

  login_id: string;
  password_1: string;

  ip_address: string;
  user_agent: string;
}