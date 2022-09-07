using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities.User
{
    public class User : IdentityUser
    {
        public string FullName { get; set; }
        public string Avatar { get; set; }
        public string Role { get; set; } 
        public string Address { get; set; }
        public DateTime CreatedAt { get; set; }
        public int Status { get; set; } = 1;

        // Collection reference property cho khóa ngoại từ Invoice
        public List<Invoice> Invoices { get; set; }

        // Collection reference property cho khóa ngoại từ Cart
        public List<Cart> Carts { get; set; }

        public List<Comment> Comments { get; set; }
    }
}
