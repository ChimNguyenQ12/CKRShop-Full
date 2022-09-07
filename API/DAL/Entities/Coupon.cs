using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Coupon
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Code { get; set; }

        public DateTime DateFrom { get; set; }

        public DateTime DateTo { get; set; }

        public int Discount { get; set; }

        public int Status { get; set; } = 1;


    }
}
