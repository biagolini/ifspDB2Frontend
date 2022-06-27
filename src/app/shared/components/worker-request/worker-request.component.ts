import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-worker-request',
  templateUrl: './worker-request.component.html',
  styleUrls: ['./worker-request.component.scss']
})
export class WorkerRequestComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  validacaoEmail() {
    
    const field: any = document.getElementById("email")
    const usuario: string = field.value.substring(0, field.value.indexOf("@"));
    const dominio: string = field.value.substring(field.value.indexOf("@")+ 1, field.value.length);
    
    if ((dominio.search("@")==-1) &&
        (usuario !== "") &&
        (dominio != "") &&
        (dominio === "xyz.com")) 
    {
    alert("Chamado aberto com sucesso, aguarde o contato do suporte técnico no email indicado.");
    this.router.navigate(['/']);
    }
    else{
alert("E-mail invalido \n Exemplo: joaozinho@xyz.com");
    }
}

  ngOnInit(): void {
  }

}
