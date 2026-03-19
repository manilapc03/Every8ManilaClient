import { Component, inject, signal, computed, input, model, effect, OnInit } from '@angular/core';
import { submit, email, FormField, form, maxLength, minLength, required } from '@angular/forms/signals';
import { NUserServiceAPI } from '../../../services/N-User/n-user-service-api';
import { ResponseData } from '../../../shared/response-data';
import { NUsersModel, initialNUsersData, nUsersSchema } from '../../../model/N-User/n-users.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/Auth/auth-service';
import { delay } from 'rxjs';


@Component({
  selector: 'app-n-user-edit',
  imports: [FormField],
  templateUrl: './n-user-edit.html',
  styleUrl: './n-user-edit.css',
})
export class NUserEdit implements OnInit {
  private router = inject(Router);

  private authService = inject(AuthService);
  private userService = inject(NUserServiceAPI);


  uid =  signal<number>(0);
  title = signal('Edit N-User '+ this.uid().toString());
  uname = signal<string>('');


  nUserModel = signal<NUsersModel>(initialNUsersData);
  nUserForm = form(this.nUserModel, nUsersSchema);

  constructor(private act: ActivatedRoute) { }

  ngOnInit() {
    this.handleLoadData(this.act.snapshot.params['id']);
  }

  // pageData = computed(() => {
  //   return this.userService.data().data[0];
  // });

  handleLoadData(id: number) {
    try {
      this.userService.getUserById(id).unsubscribe();

      this.uid.set(id);
      this.title.set('Edit N-User '+ this.uid().toString());

      this.userService.getUserById(id);

      //this.nUserModel.set(this.userService.data().data[0]);

      //delay(2000);
    } catch (error) {
      // Code to handle the error
    } finally {
      console.log('handleLoadData - finally');
      this.nUserModel.set(this.userService.data().data[0]);
      //console.log('this.nUserModel');
      //console.log(this.nUserModel());

    }

  }

  
  handleSave(event: Event) {
    event.preventDefault();
    if (this.nUserForm().valid()) { 
       this.userService.updateUser(this.nUserForm().value());
    }
  }



}
