import { signal } from '@angular/core';
import { apply, applyWhen, email, max, min, minLength, required, schema, validate, pattern } from "@angular/forms/signals";

export interface NUsersModel {
    uid: number;   
    chihou_id: number; 
    hpass : string;
    pass : string;
    email: string;
    email_2 : string;
    uname : string;
    bday: Date | null;
    ken_id : number;
    address: string;
    current_job: string;
    lid: string;
    kid: string;
    last_login : Date | null;
    last_logout: Date | null;

    newinfo: boolean;
    newjob: boolean;
    numbers: boolean;
    kid_sub : string;
    taikai: number;
    media: string;
    agent: string;

    media_id: number;
    media_chihou_id: number;
    update_date: Date | null;
    create_date: Date | null;
    use_com_domain : number;
    open_id: string;
    open_id_type: number;
    mail_login_pass: string;

    hashPassword: string;
    provider: string;
    refreshToken: string;
    refreshTokenExpiryTime: Date | null;

}

//   private today: Date = new Date();  
//   public previousDate: Date;
   //this.previousDate.setDate(this.today.getDate() - 1); 

export const initialNUsersData : NUsersModel = {
    uid: 0,   
    chihou_id: 0, 
    hpass : '',
    pass : '',
    email: '',
    email_2 : '',
    uname : '',
    bday: null,
    ken_id : 0,
    address: '',
    current_job: '',
    lid: '',
    kid: '',
    last_login : null,
    last_logout: null,
    newinfo: false,
    newjob: false,
    numbers: false,
    kid_sub : '',
    taikai: 0,
    media: '',
    agent: '',

    media_id: 0,
    media_chihou_id: 0,
    update_date: null,
    create_date: null,
    use_com_domain : 0,
    open_id: '',
    open_id_type: 0,
    mail_login_pass: '',

    hashPassword: '',
    provider: '',
    refreshToken: '',
    refreshTokenExpiryTime: null,
    
}

// Form builder for account fields
export const nUsersSchema = schema<NUsersModel>((path) => {
    required(path.uname, { message: 'User name is required' });
    minLength(path.uname, 5, { message: 'User name must be at least 5 characters long' });
    pattern(path.pass, /^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{6,128}$/g, 
        { message: 'Password must have more than 6 characters, min. 1 uppercase, min. 1 lowercase, min. 1 special characters' });
    required(path.email, { message: 'Email is required' });
    email(path.email, { message: 'Email is not valid' });

});

