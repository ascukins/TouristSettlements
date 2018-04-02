import { Injectable } from '@angular/core';
import { Spending, Tourist, TouristSummary } from '../models/models';

@Injectable()
export class TouristService {

    persons: Tourist[] = [];
    summaries: TouristSummary[] = [];

    addPerson( name: string) {
        this.persons.push(
            {
                name: name,
                spendings: []
            }
        );
    }

    addSpending( name: string, spending: Spending) {
        for (const p of this.persons) {
            if ( p.name === name) {
                p.spendings.push(spending);
                break;
            }
        }
        this.recalcSummaries();
    }


    addToPersonSummary( name: string, spent: number, received: number) {
        let nameFound = false;
        for (const p of this.summaries) {
            if ( p.name === name) {
                nameFound = true;
                p.spent += spent;
                p.received += received;
                break;
            }
        }
        if (!nameFound) {
            this.summaries.push({
                name: name,
                spent: spent,
                received: received
            });
        }
    }

    recalcSummaries() {
        for (const sm of this.summaries) {
            sm.received = 0;
            sm.spent = 0;
        }
        for (const p of this.persons) {
            for (const sp of p.spendings) {
                this.addToPersonSummary(p.name, sp.amount, 0);
                const beneficiaryCount = sp.beneficiaries.length;
                for ( const ben of sp.beneficiaries) {
                    this.addToPersonSummary(ben, 0, sp.amount / beneficiaryCount);

                }
            }
        }
        this.summaries.sort( (a, b) => {
            const aBalance = (a.received - a.spent);
            const bBalance = (b.received - b.spent);
            return -(aBalance - bBalance);
        });

        
    }


    constructor() {
    if (this.persons.length === 0) {
      this.persons = [
        {
          name: 'Alex',
          spendings: [
            {
              amount: 300,
              comment: 'For transport',
              beneficiaries: [
                'Alex', 'Nino', 'Rito'
              ]
            }
          ]

        },
        {
          name: 'Nino',
          spendings: [
            {
                amount: 20,
                comment: 'Food',
                beneficiaries: [
                  'Nino', 'Rito'
                ]
            },
            {
                amount: 30,
                comment: 'Museum',
                beneficiaries: [
                  'Alex', 'Nino', 'Rito'
                ]
              }
            ]
        },
        {
          'name': 'Tinka',
          'spendings': [
            {
              'amount': 500,
              'comment': 'hyhh',
              'beneficiaries': [
                'Alex',
                'Nino'
              ]
            }
          ]
        }
      ];
    }


    }

}
