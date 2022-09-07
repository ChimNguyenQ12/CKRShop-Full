using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class ImageType
    {
        public int Id { get; set; }
        public string TypeName { get; set; }
        public List<Advertisement> Advertisements { get; set; }

        public DateTime CreatedAt { get; set; }
        public int Status { get; set; } = 1;
    }
}
