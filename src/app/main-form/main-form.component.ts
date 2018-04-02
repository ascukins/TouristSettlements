import { Component, OnInit } from '@angular/core';
import { TouristService } from '../services/tourist.service';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css']
})
export class MainFormComponent implements OnInit {

  inputPerson: string;
  inputAmount: number;
  inputBeneficiaries: string[] =  [];
  inputComment: string;

  tourists: any[] = [];

  addPerson = (term: string) => {
    this.touristService.addPerson(term);
    this.tourists = [...this.touristService.persons];
  }

  addSpending() {
    this.touristService.addSpending(this.inputPerson, {
      amount: this.inputAmount,
      comment: this.inputComment,
      beneficiaries: this.inputBeneficiaries
    });
    this.inputAmount = undefined;
    this.inputComment = '';
    this.inputBeneficiaries = [];
    this.tourists = [...this.touristService.persons];
  }

  constructor( public touristService: TouristService) { }

  ngOnInit() {

    this.tourists = [...this.touristService.persons];
    this.touristService.recalcSummaries();
  }

}
