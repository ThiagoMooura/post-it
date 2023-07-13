import { Component, OnInit } from '@angular/core';

interface PostIt {
  id: number;
  texto: string;
  cor: string;
  posicao: string;
  concluido: boolean;
  editavel: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  text: string = '';
  newText: string = '';
  id: number = 0;
  array: PostIt[] = [];
  ultimaCor: any = null;

  ngOnInit(): void {
    const stringArray = localStorage.getItem('postIt');
    if(stringArray !== null){
    const meuArrayRecuperado = JSON.parse(stringArray);
    this.array = meuArrayRecuperado
    }
    this.ultimaCor = localStorage.getItem('ultimaCor')
  }

  add() {
    if (this.text.length == 1) {
      this.text = ''
      return;
    }
    const cores = [
      '#FFFF00', // Amarelo
      '#7BED7B', // Verde
      '#FFA500', // Laranja
      '#BC83E6', // Roxo
      '#40E0D0', // Turquesa
    ];

    let indice;
    let cor
    do {
      indice = Math.floor(Math.random() * cores.length);
      cor = cores[indice]
    } while (cor === this.ultimaCor);
    this.ultimaCor = cor;
    const posicao = Math.floor(Math.random() * 11) - 5;

    const postIt: PostIt = {
      id: this.id++,
      texto: this.text,
      cor: cores[indice],
      posicao: 'rotate(' + posicao + 'deg)',
      concluido: false,
      editavel: false
    };
    this.array.push(postIt);
    this.text = '';
    localStorage.setItem('postIt', JSON.stringify(this.array));
    localStorage.setItem('ultimaCor', this.ultimaCor);

  }

  concluir(id:number){
    this.array.map((el: any) => {
      if(el.id === id){
        el.concluido = true
      }
    })
    let index = this.array.findIndex(objeto => objeto.id === id);
    let selecionado = this.array[index]
    this.delete(id)
    this.array.unshift(selecionado)
    localStorage.setItem('postIt', JSON.stringify(this.array));
    const set = this.array.length - 1
    this.ultimaCor = this.array[set].cor
  }

  delete(id: number) {
    const index = this.array.findIndex(objeto => objeto.id === id);
    if (index !== -1) {
      this.array.splice(index, 1);
    }

    localStorage.setItem('postIt', JSON.stringify(this.array));
    const set = this.array.length - 1
    this.ultimaCor = this.array[set].cor
  }

  editar(id: number) {
    this.array.map((el: any) => {
      if(el.id === id){
        el.editavel = !el.editavel
      }
    })
  }

  novoTexto(texto: any){
    const textoRecebido = texto?.value
    this.newText = textoRecebido
  }

  mudaTexto(id:number){
    if(this.newText === ''){
      return;
    }
    this.array.map((el: any) => {
      if(el.id === id){
        el.texto = this.newText
      }
    })
    this.editar(id)
    this.newText = ''
    localStorage.setItem('postIt', JSON.stringify(this.array));
    console.log(this.array)
  }

}
