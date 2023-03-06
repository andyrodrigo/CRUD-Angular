import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
})
export class UsersListComponent implements OnInit {
  users: Array<User> = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
    this.userService.palavraChave.subscribe((palavra) => {
      this.filtrar(palavra);
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (resposta) => {
        this.users = resposta;
      },
      error: (erro) => {
        console.log('Erro ;', erro);
      },
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUsers(id).subscribe({
      next: (resposta) => {
        console.log('Usuário Excluído: ', resposta);
      },
      error: (erro) => {
        console.log('Erro ;', erro);
      },
    });
  }

  filtrar(palavra: string): void {
    this.getUsers();
    console.log(palavra);
    if (!(palavra === '')) {
      const lowerCasePalavra = palavra.toLowerCase();
      this.users = this.users.filter((user) => {
        const { nome, sobrenome, idade, profissao } = user;
        const lowerCaseNome = nome!.toLowerCase();
        const lowerCaseSobrenome = sobrenome!.toLowerCase();
        const lowerCaseProfissao = profissao!.toLowerCase();
        return (
          lowerCaseNome.includes(lowerCasePalavra) ||
          lowerCaseSobrenome.includes(lowerCasePalavra) ||
          lowerCaseProfissao.includes(lowerCasePalavra) ||
          idade!.toString().includes(palavra)
        );
      });
    }
  }
}
