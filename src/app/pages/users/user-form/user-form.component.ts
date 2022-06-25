import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private actRoute: ActivatedRoute, private router: Router) {
    this.userForm = this.fb.group({
      id: 0,
      nome: '',
      sobrenome: '',
      idade: '',
      profissao: ''
    })
  }

  ngOnInit(): void {
  }

  createUser() {
    this.userService.postUsers(this.userForm.value).subscribe(result =>{
      console.log(`Usuario ${result.nome} ${result.sobrenome} foi cadastrado com sucesso!`)
    })

  }

  actionButton() {

  }

}
