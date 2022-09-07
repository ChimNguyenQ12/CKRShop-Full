using DAL.Entities.Product.Enums;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities.Product
{
    public class Product
    {
        public Guid Id { get; set; }
        public string SKU { get; set; } = string.Empty;  
        public string Name { get; set; } = string.Empty; 
        public string Branch { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Price { get; set; } = 0;
        public int Stock { get; set; } = 0;
        public Guid ProductTypeId { get; set; }
        public ProductType ProductType { get; set; }
        public string Image { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public StatusEnum Status { get; set; } = StatusEnum.NotSet;

        // Collection reference property cho khóa ngoại từ Cart
        public List<Cart> Carts { get; set; }

        //// Collection reference property cho khóa ngoại từ InvoiceDetail
        public List<InvoiceDetail> InvoiceDetails { get; set; }

        public List<Advertisement> Advertisements { get; set; }

        public List<Comment> Comments { get; set; }

        public List<GalleryProduct> GalleryProducts { get; set; }

    }
}
