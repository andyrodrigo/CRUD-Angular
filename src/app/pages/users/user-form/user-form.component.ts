import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  userId: any = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      id: 0,
      nome: '',
      sobrenome: '',
      idade: '',
      profissao: '',
    });
  }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      if (this.userId !== null) {
        this.userService.getUser(this.userId).subscribe((resposta) => {
          this.userForm.patchValue({
            id: resposta?.id,
            nome: resposta.nome,
            sobrenome: resposta.sobrenome,
            idade: resposta.idade,
            profissao: resposta.profissao,
          });
        });
      }
    });
  }

  updateUser() {
    this.userService.updateUser(this.userId, this.userForm.value).subscribe({
      next: (resposta) => {
        console.log(
          `Usuario ${resposta.nome} ${resposta.sobrenome} foi atualizado com sucesso!`
        );
        this.router.navigate(['/']);
      },
      error: (erro) => {
        console.log('Erro ;', erro);
      },
    });
  }

  createUser() {
    this.userService.postUser(this.userForm.value).subscribe({
      next: (resposta) => {
        console.log(
          `Usuario ${resposta.nome} ${resposta.sobrenome} foi cadastrado com sucesso!`
        );
        this.router.navigate(['/']);
      },
      error: (erro) => {
        console.log('Erro ;', erro);
      },
    });
  }

  actionButton() {
    if (this.userId !== null) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }
}
