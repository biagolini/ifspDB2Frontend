import { Component, OnInit } from '@angular/core';
import { ScreenMonitorService } from '../../services/screen-monitor.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor(
    private screenMonitorService: ScreenMonitorService,
  ) { }

  ngOnInit(): void {
  }

  isDisplay(option: string){
    return this.screenMonitorService.isDisplay(option);  
  }

}
