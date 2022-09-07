using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Entities.Product;
using DAL.Entities.User;

namespace DAL
{
    public class Cart
    {
        public int Id { get; set; }

        public string UserId { get; set; }

        // Navigation reference property cho khóa ngoại đến Account
        public User User { get; set; }

        public Guid ProductId { get; set; }

        // Navigation reference property cho khóa ngoại đến Product
        public Product Product { get; set; }

        public int Quantity { get; set; } = 1;
    }
}
