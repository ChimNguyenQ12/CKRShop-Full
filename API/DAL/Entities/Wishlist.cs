using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Entities.Product;
using DAL.Entities.User;
namespace DAL
{
    public class Wishlist
    {
        public int Id { get; set; }
        //[NotMapped]
        //public string UserId { get; set; }
        public DAL.Entities.User.User User { get; set; }
        public string UserId { get; set; }

        public Guid ProductId { get; set; }

        public DAL.Entities.Product.Product Product { get; set; }

        public int Status { get; set; } = 1;
    }
}
