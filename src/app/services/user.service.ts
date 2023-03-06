import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  simulacaoBackup = true;

  apiUrl = 'https://sheet.best/api/sheets/17d78082-e1e2-4ed0-9c2f-2519bb2962f2';

  palavraChave = new BehaviorSubject<string>('');

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  filtrar(palavra: string): void {
    this.palavraChave.next(palavra);
  }

  //CRUD (Create, Read, Update and Delete)
  //Create
  postUser(user: User): Observable<User> {
    if (this.simulacaoBackup) return of(this.post(user));
    return this.httpClient.post<User>(this.apiUrl, user, this.httpOptions);
  }
  //Read
  getUsers(): Observable<User[]> {
    if (this.simulacaoBackup) return of(this.usuarios);
    return this.httpClient.get<User[]>(this.apiUrl);
  }
  getUser(id: string): Observable<User> {
    if (this.simulacaoBackup) return of(this.get(Number(id)));
    return this.httpClient.get<User>(
      `${this.apiUrl}/id/${id}`,
      this.httpOptions
    );
  }
  //Update
  updateUser(id: string, user: User): Observable<User> {
    if (this.simulacaoBackup) return of(this.update(Number(id), user));
    return this.httpClient.put<User>(
      `${this.apiUrl}/id/${id}`,
      user,
      this.httpOptions
    );
  }
  //Delete
  deleteUsers(id: number): Observable<User> {
    if (this.simulacaoBackup) return of(this.delete(id));
    return this.httpClient.delete<User>(`${this.apiUrl}/id/${id}`);
  }

  //-----------------------------------------------------------------------
  //Backup Simulado
  idkey = 6;

  get(id: number): User {
    let usuario = { id: 0 };
    const usuarioEncontrado = this.usuarios.find(
      (usuario) => usuario.id === id
    );
    if (usuarioEncontrado) {
      usuario = usuarioEncontrado;
    }
    return usuario;
  }

  delete(id: number): User {
    const index = this.usuarios.findIndex((usuario) => usuario.id === id);
    if (index !== -1) {
      return this.usuarios.splice(index, 1)[0];
    } else {
      return {
        id: 0,
      };
    }
  }

  post(usuario: User): User {
    let usuarioCriado = {
      id: this.idkey,
      nome: usuario.nome,
      sobrenome: usuario.sobrenome,
      idade: usuario.idade,
      profissao: usuario.profissao,
    };
    this.usuarios.push(usuarioCriado);
    this.idkey++;
    return usuarioCriado;
  }

  update(id: number, usuario: User): User {
    const indice = this.usuarios.findIndex((usuario) => usuario.id === id);
    if (indice !== -1) {
      this.usuarios[indice] = usuario;
      return usuario;
    } else {
      return {
        id: 0,
      };
    }
  }

  usuarios: User[] = [
    {
      id: 1,
      nome: 'Sanderson',
      sobrenome: 'Rodrigo',
      idade: 39,
      profissao: 'Desenvolvedor',
    },
    {
      id: 2,
      nome: 'Geovana',
      sobrenome: 'Sousa',
      idade: 38,
      profissao: 'Psicóloga',
    },
    {
      id: 3,
      nome: 'Ariane',
      sobrenome: 'Gomes',
      idade: 37,
      profissao: 'Jornalista',
    },
    {
      id: 4,
      nome: 'Mariano',
      sobrenome: 'Benedito',
      idade: 40,
      profissao: 'Empreendedor',
    },
    {
      id: 5,
      nome: 'Arthur',
      sobrenome: 'Tavares',
      idade: 35,
      profissao: 'Logista',
    },
  ];
}
