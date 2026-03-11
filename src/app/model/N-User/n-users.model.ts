export interface NUsersModel {
    uid: number;   
    chihou_id: number; 
    hpass : string;
    pass : string;
    email: string;
    email_2 : string;
    uname : string;
    bday: Date;
    ken_id : number;
    address: string;
    current_job: string;
    lid: string;
    kid: string;
    last_login : Date;
    last_logout: Date;

    newinfo: boolean;
    newjob: boolean;
    numbers: boolean;
    kid_sub : string;
    taikai: number;
    media: string;
    agent: string;

    media_id: number;
    media_chihou_id: number;
    update_date: Date;
    create_date: Date;
    use_com_domain : number;
    open_id: string;
    open_id_type: number;
    mail_login_pass: string;

    HashPassword: string;
    Provider: string;
    RefreshToken: string;
    RefreshTokenExpiryTime: Date;

}
