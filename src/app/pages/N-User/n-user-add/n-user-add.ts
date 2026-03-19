import { Component, inject, signal, computed, input, model, effect, OnInit } from '@angular/core';
import { FormField, form, submit } from '@angular/forms/signals';
import { NUserServiceAPI } from '../../../services/N-User/n-user-service-api';
import { ResponseData } from '../../../shared/response-data';
import { NUsersModel, initialNUsersData, nUsersSchema } from '../../../model/N-User/n-users.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/Auth/auth-service';


@Component({
  selector: 'app-n-user-add',
  imports: [],
  templateUrl: './n-user-add.html',
  styleUrl: './n-user-add.css',
})
export class NUserAdd implements OnInit {
  router = inject(Router);
 
  authService = inject(AuthService);
  userService = inject(NUserServiceAPI);

  n_User = signal<NUsersModel>(initialNUsersData);
  n_UserForm = form(this.n_User, nUsersSchema);

  ngOnInit() {
    alert("NUserEdit - ngOnInit()");

  }


}
