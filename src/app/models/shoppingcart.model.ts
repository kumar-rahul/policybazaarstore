import { Cartitem } from 'app/models/cartitem.model';
export class Shoppingcart {
    public items: Cartitem[] = new Array<Cartitem>();
    public deliveryOptionId: string;
    public grossTotal = 0;
    public deliveryTotal = 0;
    public itemsTotal = 0;

    public updateFrom(src: Shoppingcart) {
        this.items = src.items;
        this.deliveryOptionId = src.deliveryOptionId;
        this.grossTotal = src.grossTotal;
        this.deliveryTotal = src.deliveryTotal;
        this.itemsTotal = src.itemsTotal;
    }
}
