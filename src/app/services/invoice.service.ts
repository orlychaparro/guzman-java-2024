import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice';
import { invoiceData } from '../data/invoice.data';
import { Item } from '../models/item';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private invoice: Invoice = invoiceData;

  constructor() { }

  getInvoice(): Invoice {
    const total = this.calculateTotal();
    return {... this.invoice, total:total};
  }


  remove(id:number): Invoice {
    this.invoice.items = this.invoice.items.filter(item => item.id != id);
    const total = this.calculateTotal();


    return {... this.invoice, total:total};
  }

  save(item:Item): Invoice {
    this.invoice.items = [...this.invoice.items,item];
    const total = this.calculateTotal();
    return {... this.invoice, total:total};
  }




  calculateTotal(){
    /* let total = 0;
    this.invoice.items.forEach(item => {
      total += item.price * item.quantity; 
    });
    return total; */
    // reduce sirve para sumarizar los items en total calculando la funcion tota()
    //reduce((total-variable acumulador, item-variales que itera y suma) => acumulador + item.funcion total(), 0 inicializa el acumulador))
   //return this.invoice.items.reduce((total,item) => total + item.total(), 0);
    return this.invoice.items.reduce((total,item) => total + (item.price * item.quantity), 0);

  }
}
