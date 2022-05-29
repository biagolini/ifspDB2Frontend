import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { TypesModelDual } from 'src/app/shared/models/models';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { TypeService } from 'src/app/shared/services/type.service';
import { WarehouseService } from '../../services/warehouse.service';

@Component({
  selector: 'app-warehouse-balance',
  templateUrl: './warehouse-balance.component.html',
  styleUrls: ['./warehouse-balance.component.scss']
})
export class WarehouseBalanceComponent implements OnInit {

  constructor(
    private typeService: TypeService,
    private warehouseService: WarehouseService,
    private feedback: FeedbackService,
    private form: FormBuilder,
  ) {}

  filterControl = new FormControl('');
  asc = new FormControl(false);
  sortBy = new FormControl('');
  // Options
  listGamePlatform: TypesModelDual [] = []; //  Lista de estados e seus codigos
  selectedState = new FormControl();
  totalLength!: number;
  pageSize = 10;
  page = 0;

  
  customerDataTable = new MatTableDataSource();
  displayedColumns = ['gamePlatform', 'lastName', 'email', 'birthDate', 'cpf', 'street', 'city','state', 'action'];
  loadingTable:boolean = true;

  ngOnInit(): void {
  }

}
