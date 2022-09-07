using DAL.Entities.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class InvoiceDetail
    {
        public int Id { get; set; }

        public int InvoiceId { get; set; }

        // Navigation reference property cho khóa ngoại đến Invoice
        public Invoice Invoice { get; set; }


        // Navigation reference property cho khóa ngoại đến Product
        public Product Product { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; } = 1;

        public int UnitPrice { get; set; } = 0;
    }
}
