import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { BehaviorSubject, map } from 'rxjs';
import { Product } from '../../_models/product';
import { Purchase } from '../../_models/purchase';
import { Router } from '@angular/router';
import { Type } from 'src/app/_models/type_product';
import { User } from 'src/app/_models/user';
import { Image } from '../../_models/image';
import { Coupon } from '../../_models/coupon';
import { Invoice } from '../../_models/invoice';
import { InvoiceDetail } from '../../_models/invoicedetail';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  types : Type[] = [];
  images : Image[]=[];
  users : User[] = [];
  coupons: Coupon[]=[];
  products: Product[] = [];
  invoice : Invoice[] =[];
  //Used to store Cart Items
  placeholder = [];
invoicedetail : InvoiceDetail[] =[];
  //Behavior Subject to update total cart items in nav component. Passing empty array
  cartItems = new BehaviorSubject([])
  private totalItems : BehaviorSubject<number> = new BehaviorSubject<number>(0);

getCartItems(){
  return this.totalItems.asObservable();
}

updateCartItems(items: number){
  this.totalItems.next(items);
}

  constructor(private router: Router,private http: HttpClient) {
    const ls = this.getCartData();

    //Check if there is data stored here. Push data to our BehaviourSubject
    if(ls) this.cartItems.next(ls);
   }
   addItem(product:Product)
   {
     //Get local storage object
     const ls = this.getCartData();
 
     const purchase: Purchase[] = [];
 
     //Storage for local storage data
     let exist: Product;
 
     //Check if item is already in cart
     if(ls)
     //Iterating through items in Cart
     exist = ls.find((item) =>{
       return item.id === product.id;
     });
 
     //Already in [localStorage]
     if(exist)
     {

       //Set to our local storage
       this.setCartData(ls);
 
       //Display error toast

     }
     //Not in local [localStorage]
     else
     {
       //Product not in cart yet. Check if any other data is in local storage.
       if(ls)
       {
         //Combine the new item array to Product array
         
         const newData = [...ls, product];
 
         //Store new Product in local Storage
         this.setCartData(newData);
 
         //Display success toast
         console.log("Da them 1 cai gi do");
         
         //Emit the new data so it can be subscribed to from any other objects that we need.
         this.cartItems.next(this.getCartData());
       }
       //Nothing in local storage yet. So this will be the first item
       else
       {
         //Push Products to our placeholder object
         this.placeholder.push(product);
 
         //Set to our local storage
         this.setCartData(this.placeholder);
         console.log(this.placeholder);
         //Display success toast
         console.log("Da them");
 
         //Emit the new data so it can be subscribed to from any other objects that we need.
         this.cartItems.next(this.getCartData());
 
       }
     }
   }
 
   //Function to clear entire cart
   emptyCart()
   {
         //Clear cart items
         this.placeholder = [];
 
         //Set update to our local storage
         this.setCartData(this.placeholder);
 
         //Display toast
         console.log("Da clear");
 
         //Emit the new data so it can be subscribed to from any other objects that we need.
         this.cartItems.next(this.getCartData());
   }
 
   //Function to remove Product from cart by ID
   removeCartItem(id: Guid): void {
 
     //Fetch Products from cart
     this.placeholder = this.getCartData();
      
     //Storage for Product to delete
     let toDelete: Product;
 
     //Check if item is already in cart
     if(this.placeholder)
     //Iterating through items in cart to find Product to delete
     toDelete = this.placeholder.find((item) =>{
       return item.id === id;
     });  
     
     //Product to delete found
     if(toDelete)
     {
       this.placeholder = this.placeholder.filter(item => item !== toDelete);
     }else
     {
       //Display toast
       console.log("Da xay ra loi");
     }
 
     //Set update to our local storage
     this.setCartData(this.placeholder);
 
     //Display toast
     console.log("Da xoa ");
 
     //Emit the new data so it can be subscribed to from any other objects that we need.
     this.cartItems.next(this.getCartData());
   }
 
   //Function to set local storage
   setCartData(data: any)
   {
     localStorage.setItem('cart', JSON.stringify(data));
   }
 
   //Function to get local storage data
   getCartData()
   {
     return JSON.parse(localStorage.getItem('cart'));
   }
 

  getProducts() {
    return this.http.get<any>("https://localhost:44302/api/Product/GetAllProductsIndex/").pipe(map(products =>{this.products = products;
  return products
    })
  );
  }
  getAllProductsClient() {
    return this.http.get<any>("https://localhost:44302/api/Product/GetAllProductsClient/").pipe(map(products =>{this.products = products;
  return products
    })
  );
  }
  GetAllAscendingProducts() {
    return this.http.get<any>("https://localhost:44302/api/Product/GetAllAscendingProducts/").pipe(map(products =>{this.products = products;
  return products
    })
  );
  }
  GetAllDescendingProducts() {
    return this.http.get<any>("https://localhost:44302/api/Product/GetAllDescendingProducts/").pipe(map(products =>{this.products = products;
  return products
    })
  );
  }
  getAllCoupon() {
    return this.http.get<any>("https://localhost:44302/api/Coupon/GetAllCoupons");
  }
  getAllWishlist(id : string) {
    return this.http.get<any>("https://localhost:44302/api/Wishlist/GetAllWishlists?userId=" +id);
  }
  getSearchedProducts(searchtext : string) {
    return this.http.get<any>("https://localhost:44302/api/Product/SearchInClient?SearchText=" +searchtext);
  }
  getProduct(id: string)
  {
    return this.http.get<Product>("https://localhost:44302/api/Product/GetProductById?id=" + id)
  }
  getAllProductsTypeClient() {
    return this.http.get<any>("https://localhost:44302/api/ProductType/GetAllProductTypesClient").pipe(map(types =>{this.types = types;
    return types
      })
    );
  }
  getAllProductsTypeID(id: string) {
    return this.http.get<any>("https://localhost:44302/api/Product/GetProductByTypeId?id=" + id);
  }
  getAllNewProducts() {
    return this.http.get<any>("https://localhost:44302/api/Product/GetAllNewProducts").pipe(map(products =>{this.products = products;
  return products
    })
  );
  }
  getAllBestSellerProducts() {
    return this.http.get<any>("https://localhost:44302/api/Product/GetAllBestSellerProducts").pipe(map(products =>{this.products = products;
  return products
    })
  );
  }

  getImageComingProducts() {
    return this.http.get<any>("https://localhost:44302/api/Advertisement/Get3ComingProducts").pipe(map(images =>{this.images = images;
  return images
    })
  );
  }
  getAllUsers() {
    return this.http.get<any>("https://localhost:44302/api/User/GetAllUsersClient").pipe(map(users =>{this.users = users;
  return users
    })
  );
  
  } getLatestInvoice() {
    return this.http.get<any>("https://localhost:44302/api/Invoice/GetLastestInvoice").pipe(map(invoicedetail =>{this.invoicedetail = invoicedetail;
  return invoicedetail
    })
  );
  }
  getImageAboutUSBanner() {
    return this.http.get<any>("https://localhost:44302/api/Advertisement/GetOneAboutUSBanner").pipe(map(images =>{this.images = images;
    return images
      })
    );
  }
  deleteWishlistItem( id: string) {
    console.log(id);
     this.http.delete<any>("https://localhost:44302/api/Wishlist/DeleteWishlist?id=" + id).subscribe(
      (val) => {
          console.log("DELETE call successful value returned in body", 
                      val);
      },
      response => {
          console.log("DELETE call in error", response);
      },
      () => {
        
      });
  };
  postWishlist(data: any) {
    console.log(data);
    return this.http.post<any>("https://localhost:44302/api/Wishlist/AddWishlist", data).subscribe(
      (val) => {
          console.log("POST call successful value returned in body", 
                      val);
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
        
      });

  }
  postInvoice(data: any) {
    return this.http.post<any>("https://localhost:44302/api/Invoice/AddInvoice/", data).subscribe(
      {
        next:(res)=>{

          console.log(res);
        }
      }
     );
  }
  postInvoiceDetails(data: any) {
    return this.http.post<any>("https://localhost:44302/api/Invoice/AddInvoiceDetail/", data)
  }
  updateProductCheckout(data: any, id: string) {

     console.log(data);
     console.log(id);
     this.http.put<any>("https://localhost:44302/api/Product/UpdateProductCheckout/?id=" + id,data).subscribe(
      {
        next:(res)=>{

          console.log(res);
        }
      }
     );
  }
  makeInvoiceDetail(data: any) {

    //Get local storage object
    console.log(data);
    //Make http post
    this.http.post('https://localhost:44302/api/InvoiceDetail/AddInvoiceDetail/', data)
        .subscribe(
            (val) => {
                console.log("POST call successful value returned in body", 
                            val);
            },
            response => {
                console.log("POST call in error", response);
            },
            () => {
               //Clear cart items
               this.placeholder = [];

               //Set update to our local storage
               this.setCartData(this.placeholder);

               //Route to thank you purchase page
               this.router.navigateByUrl('');

               //Emit the new data so it can be subscribed to from any other objects that we need.
               this.cartItems.next(this.getCartData());
            });
    }
  makePurchase(data: any) {

    //Get local storage object
    console.log(data);
    //Make http post
    this.http.post('https://localhost:44302/api/Invoice/AddInvoice/', data)
        .subscribe(
            (val) => {
                console.log("POST call successful value returned in body", 
                            val);
            },
            response => {
                console.log("POST call in error", response);
            },
            () => {
              
            });
    };
    
   
}
