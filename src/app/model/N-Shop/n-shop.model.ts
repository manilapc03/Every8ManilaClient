export interface NShopModel {
    shop_id: number;
    shop_name: string;
    shop_name_yomi?: string;
    shop_name_hirakana: string;
    shop_name_todokede?: string;
    shop_url_name: string;

    chihou_id: number;
    area_id: number;
    zone_id?: number;
    rosen_id?: number;
    rosen_id2?: number;

    kinmuchi?: string;
    gyousyu_id: number;
    syokusyu: string;
    zaiseki_age?: number;

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

    rank: number;
    scout_flg: boolean;
    member_flg: boolean;
    view_flg: boolean;
    keisai_status_id: number;
    banner: boolean;

    create_date: Date;
    update_date?: Date;
    shop_update_date?: Date;

    info_photo_filename?: string;
    info_photo_comment?: string;
    use_com_domain: boolean;

    min_age?: number;
    max_age?: number;

    title_tag_text?: string;
    area_id2?: number;
    area_id3?: number;
    area_id4?: number;

    group_name?: string;
    sub_title_tag_text?: string;
    kyuuyo_guarantee?: string;
    tk_iwaikin?: string;
    charge_photo?: string;
    charge_name?: string;
    charge_message?: string;
    keisai_plan?: number;
    charge_sex?: boolean;

    seo_message?: string;
    new_koutsuu?: string;
    new_shikaku?: string;
    new_kinmubi?: string;
    new_kinmuzikan?: string;
    kyuuyo_stand_by_hour?: number;
    kyuuyo_diary_salary?: number;
    kyuuyo_suppliment?: string;

    // n_ShopContacts?: any[]; // Pwede mo rin gawin ng specific type kung may model ka
    // n_ShopManage?: any[];
    // n_ShopTaiguu?: any[];
    // n_ShopWebSites?: any[];
    // n_ShopKodawaris?: any[];
}