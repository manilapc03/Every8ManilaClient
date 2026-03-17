export interface NShopBlogKyuuboNonPublicationModel{

    publication_id: number;

    shop_id: number;

    isBlog: boolean;

    publication_date: Date;

    title: string;

    contents: string;

    reason: string;

    update_date: Date;
    
}