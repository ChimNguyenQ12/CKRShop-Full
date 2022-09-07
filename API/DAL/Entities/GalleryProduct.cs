using DAL.Entities.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class GalleryProduct
    {
        public int Id { get; set; }
        public Guid ProductId { get; set; }

        public Product Product { get; set; }

        public string Image { get; set; }
    }
}
