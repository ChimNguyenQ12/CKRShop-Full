using DAL.Entities.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class TradeMark
    {
        public Guid Id { get; set; }
        public string  Name { get; set; }

        public  ProductType ProductType { get; set; }
        public Guid ProductTypeId { get; set; }
        public int Status { get; set; } = 1;
        public DateTime CreatedAt { get; set; }
    }
}
