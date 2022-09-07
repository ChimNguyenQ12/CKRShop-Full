using DAL.Entities.Product;
using DAL.Entities.User;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Comment
    {
        public int Id { get; set; }
        //[NotMapped]
        //public string UserId { get; set; }
        public User User { get; set; }
        public string UserId { get; set; }

        public string Content { get; set; }
      
        public DateTime CreatedAt { get; set; }

        public Guid ProductId { get; set; }
        
        public Product Product { get; set; }

        public int Status { get; set; } = 1;
    }
}
