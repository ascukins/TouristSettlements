import { Injectable } from '@angular/core';
import { Spending, Tourist, TouristSummary } from '../models/models';

@Injectable()
export class TouristService {

    persons: Tourist[] = [];
    summaries: TouristSummary[] = [];

    balances: any[] = [];
    actions: any[] = [];

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
                received: received,
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
        this.summaries.sort( (a, b) => (a.received - a.spent) - (b.received - b.spent) );

        this.balances = [];
        for (const sm of this.summaries ) {
            this.balances.push({
                name: sm.name,
                balance: (sm.received - sm.spent)
            });
        }
        this.actions = [];
        for ( let positiveBal = 0; positiveBal < this.balances.length; positiveBal++) {
//          if (this.balances[i].balance > 0) { // has free money
                for ( let negativeBal = this.balances.length - 1;
                                                    negativeBal >= 0 && this.balances[positiveBal].balance > 0; negativeBal--) {
                    if (this.balances[negativeBal].balance < 0) { // needs money
                        let amnt = 0;
                        if ( this.balances[positiveBal].balance > - this.balances[negativeBal].balance) {
                            amnt = - this.balances[negativeBal].balance;
                        } else {
                            amnt = this.balances[positiveBal].balance;
                        }
                        this.actions.push({
                            nameFrom: this.balances[positiveBal].name,
                            nameTo:  this.balances[negativeBal].name,
                            amount: amnt
                        });
                        this.balances[negativeBal].balance += amnt;
                        this.balances[positiveBal].balance -= amnt;

                    }
                }
//          }
        }
    }


    constructor() {
    // if (this.persons.length === 0) {
    //   this.persons = [
    //     {
    //       name: 'Alex',
    //       spendings: [
    //         {
    //           amount: 300,
    //           comment: 'For transport',
    //           beneficiaries: [
    //             'Alex', 'Nino', 'Rito'
    //           ]
    //         }
    //       ]

    //     },
    //     {
    //       name: 'Nino',
    //       spendings: [
    //         {
    //             amount: 20,
    //             comment: 'Food',
    //             beneficiaries: [
    //               'Nino', 'Rito'
    //             ]
    //         },
    //         {
    //             amount: 30,
    //             comment: 'Museum',
    //             beneficiaries: [
    //               'Alex', 'Nino', 'Rito'
    //             ]
    //           }
    //         ]
    //     },
    //     {
    //       'name': 'Tinka',
    //       'spendings': [
    //         {
    //           'amount': 500,
    //           'comment': 'hyhh',
    //           'beneficiaries': [
    //             'Alex',
    //             'Nino'
    //           ]
    //         }
    //       ]
    //     }
    //   ];
    // }


    }

}
