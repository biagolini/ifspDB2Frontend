import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ScreenMonitorService } from '../../services/screen-monitor.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

    //MASK
    cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.',/\d/, /\d/, /\d/,  '-', /\d/, /\d/];


  constructor(
    private router: Router,
    private screenMonitorService: ScreenMonitorService,
    ){ }


  ngOnInit( ): void {
  }


  isDisplay(option: string){
    return this.screenMonitorService.isDisplay(option);  
  }


  validacaoCPF() {    
    // Ref: https://www.macoratti.net/alg_cpf.htm#:~:text=O%20algoritmo%20de%20valida%C3%A7%C3%A3o%20do,%3A%20111.444.777%2D05.
    const field: any = document.getElementById("cpf");
    const givenCPF: any = field.value;
    let testCpfValid: boolean = false;

    if(givenCPF.length==14){
      let cleanCPF = givenCPF;
      cleanCPF = cleanCPF.substring(0, 11) + cleanCPF.substring(12, cleanCPF.length);
      cleanCPF = cleanCPF.substring(0, 7) + cleanCPF.substring(8, cleanCPF.length);
      cleanCPF = cleanCPF.substring(0, 3) + cleanCPF.substring(4, cleanCPF.length);
     
      let auxValidatorDigit: number = 0; 
      let aux: number = 2;
    
      for(let i = 8; i>=0; i--){ // Executa uma condição até que seja falsa
        auxValidatorDigit = auxValidatorDigit + (cleanCPF[i] * aux); 
        aux++;   
      }

      // I - Cálculo do primeiro dígito
      let firstValidatorDigit: number = 0;
      let restoDivision: number = auxValidatorDigit%11;

      if(restoDivision<2) firstValidatorDigit=0;
      else firstValidatorDigit= 11-restoDivision;

      // II - Cálculo do segundo dígito
      auxValidatorDigit = firstValidatorDigit*2; 
      aux = 3;

      for(let i = 8; i>=0; i--){
        console.log(cleanCPF[i] );
        auxValidatorDigit = auxValidatorDigit + (cleanCPF[i] * aux); 
        aux++;   
      }
      let secondValidatorDigit: number = 0;
      restoDivision = auxValidatorDigit%11;

      if(restoDivision<2) secondValidatorDigit=0;
      else secondValidatorDigit= 11-restoDivision;
      
      // Validation
      if(firstValidatorDigit==cleanCPF[9]&&secondValidatorDigit==cleanCPF[10]) testCpfValid = true;


    } 

    if (testCpfValid){
      alert("Mensagem enviada com sucesso, aguarde o nosso contato pelo email indicado.");
      this.router.navigate(['/']);
    }else{
      alert("CPF inválido, verifique o numero digitado");
    }
  }
}
