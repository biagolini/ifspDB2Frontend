import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { ThemeService } from 'src/app/shared/services/theme.service';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 
  constructor(
    private router: Router,
    private builder: FormBuilder,
    private authenticationService: AuthenticationService,
    private feedback: FeedbackService,
    private themeService: ThemeService,
  ) {}

  hidePassword = true;
  processingRequest = false;


  loginForm = this.builder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  darkModeCondition = true;


  ngOnInit(): void {
    this.hidePassword = true;
    this.processingRequest = false;

    this.darkModeCondition = this.themeService.isDarkTheme();
    alert("TESTE ESTA APLICAÇÃO USANDO OS USUARIOS: \nADMINS:\n*   admin\n*   estoque\nCLIENTES\n*   helena@email.com\n*   miguel@email.com\nSENHA\n123456")
  }

  login(): void {    
    this.processingRequest = true;

    if (this.loginForm.valid) {
      this.authenticationService.authenticate(this.loginForm.value).subscribe({
        next: () => {
          this.feedback.showMessage('login.message.loginSuccess').subscribe();
          this.router.navigate(['./']);
        },
        error: (response) => {
        this.processingRequest = false;
        this.feedback.showMessage('login.message.loginFail').subscribe();
      }
      });
    }
    
  }

  EnterSubmit(event: KeyboardEvent): void {
    if (event.key === 'Enter') this.login();
  }
}
