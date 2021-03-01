import { Injectable, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CurrencyPipe, DatePipe} from '@angular/common';
import {NgbCalendar, NgbDate, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { transferData} from '../models/transferData.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TransferService } from '../services/transfer.service';



@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}

@Component({
  selector: 'app-add-transfer',
  templateUrl: './add-transfer.component.html',
  styleUrls: ['./add-transfer.component.scss'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})



export class AddTransferComponent implements OnInit {
@ViewChild('addTransferdata') transferForm: NgForm;
ibanValue:string;
transferdateValue: string;
todayDate: string;
amountValue: string;
guid: string;
isAddMode: boolean = true;
edit_transfer_id: string;

  constructor(private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>,
    private currencyPipe : CurrencyPipe,
    private datePipe : DatePipe,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private transferService: TransferService) {
    this.getTodayDate();
  }


  getTodayDate() {
    this.transferdateValue = this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }

  transformAmount(element){
    this.amountValue = this.currencyPipe.transform(this.amountValue, '€', 'symbol', '1.2-2');
}

  ngOnInit(): void {
    this.route.queryParams
      .subscribe((queryParams: Params) => {
        this.edit_transfer_id = queryParams.id;
        if(this.edit_transfer_id) {
          this.isAddMode = false;
          this.prefillform();
        }
      });
  }

  private dateToString = (date) => `${date.month}/${date.day}/${date.year}`;

  prefillform() {
    this.transferService.getById(this.edit_transfer_id).subscribe(data => {
      this.transferForm.form.patchValue(data)
      });
  }

  onSubmit(inputTransferdata: transferData) {
    if (this.isAddMode) {
      this.onAddTransfer(inputTransferdata);
  } else {
      this.onUpdateTransfer(inputTransferdata);
  }
  }

  onAddTransfer(inputTransferdata: transferData) {
    inputTransferdata.transferdate = this.dateToString(inputTransferdata.transferdate);
    this.transferService.create( inputTransferdata).subscribe((data:any) => {
      this.router.navigate(['/home']);
    }, error => {
      console.log("error");
      });
  }

  onUpdateTransfer(editedTransferdata: transferData) {
    editedTransferdata.transferdate = this.dateToString(editedTransferdata.transferdate);
    this.transferService.update(this.edit_transfer_id, editedTransferdata).subscribe((data:any) => {
      this.router.navigate(['/home']);
    }, error => {
      console.log("error");
   });
  }

}
