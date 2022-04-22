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
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private feedback: FeedbackService,
    private themeService: ThemeService,
  ) {}

  loginForm = this.builder.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
  });

  darkModeCondition = true;


  ngOnInit(): void {
    this.darkModeCondition = this.themeService.isDarkTheme();
  }

  login(): void {    
    if (this.loginForm.valid) {
      this.authenticationService.authenticate(this.loginForm.value).subscribe({
        next: () => {
          this.feedback.showMessage('login.message.loginSuccess').subscribe();
          this.activatedRoute.queryParams.subscribe((params) => {
            const path = params['path'] ? params['path'] : '';
            this.router.navigate([path]);
          });
        },
        error: () => this.feedback.showMessage('login.message.loginFail').subscribe(),
      });
    }
    
  }

  EnterSubmit(event: KeyboardEvent): void {
    if (event.key === 'Enter') this.login();
  }
}
