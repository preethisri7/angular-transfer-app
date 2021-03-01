import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { transferData } from '../models/transferData.model';
import { TransferService } from '../services/transfer.service';


@Component({
  selector: 'app-user-transfer-list',
  templateUrl: './user-transfer-list.component.html',
  styleUrls: ['./user-transfer-list.component.scss']
})

export class UserTransferListComponent implements OnInit {
  transferLists: transferData[] = [];

  constructor(private router: Router, private http: HttpClient, private transferService: TransferService) {
   this.fetchTransferList();
   }

   private subscriber: any;

  ngOnInit(): void {
  }

  onAddTransfer(){
    this.router.navigate(['/addTransfer']);
  }

  onEditTransfer(transfer_id){
    this.transferService.getById(transfer_id).subscribe((data:any) => {
      this.router.navigate(['/addTransfer'], { queryParams: { id: transfer_id } });
    }, error =>
    {
      console.log("error");
      });
  }

  onDeleteTransfer(transfer_id){
    this.transferService.delete(transfer_id).subscribe((data:any) => {
      this.fetchTransferList();
    }, error =>
    {
      console.log("error");
      });
  }

  fetchTransferList() {
    this.transferService.getAll().subscribe((data:any) => {
     this.transferLists = data;
     });
  }
}
