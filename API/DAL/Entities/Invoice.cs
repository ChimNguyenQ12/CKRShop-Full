using DAL.Entities.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Invoice
    {
        public int Id { get; set; }

        public string Code { get; set; }



        // Navigation reference property cho khóa ngoại đến Account 
        public User User { get; set; }
        public string UserId { get; set; }

        public DateTime IssuedDate { get; set; } = DateTime.Now;

        public string ShippingAddress { get; set; }

        public string ShippingPhone { get; set; }

        public int Total { get; set; } = 0;

        public int Status { get; set; } = 1;

        // Collection reference property cho khóa ngoại từ InvoiceDetail
        public List<InvoiceDetail> InvoiceDetails { get; set; }
    }
}
