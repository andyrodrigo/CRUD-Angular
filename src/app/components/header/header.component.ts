import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  pesquisar(palavra: string) {
    this.userService.filtrar(palavra);
  }
}
