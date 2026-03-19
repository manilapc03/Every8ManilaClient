import { signal } from '@angular/core';
import { apply, applyWhen, email, max, min, minLength, required, schema, validate, pattern } from "@angular/forms/signals";

export interface LoginModel {
    username: string;
    password: string;        
}

export const initialLoginData : LoginModel = {
    username: '',
    password: ''
}

// Form builder for account fields
export const loginSchema = schema<LoginModel>((path) => {
  required(path.username, { message: 'User name is required' });
  minLength(path.username, 5, { message: 'User name must be at least 5 characters long' });
  pattern(path.password, /^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{6,128}$/g, 
    { message: 'Password must have more than 6 characters, min. 1 uppercase, min. 1 lowercase, min. 1 special characters' });

});

