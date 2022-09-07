using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities.Product
{
    public class LaptopType
    {
        public int Id { get; set; } 
        public string CPU { get; set; }
        public string RAM { get; set; }
        public string Moniter { get; set; }
        public string SSD { get; set; }
        public string HDD { get; set; }
        public string GraphicCard { get; set; }
        public string Battery { get; set; }
        public string Webcam { get; set; }
        public string Weight { get; set; }
        public string OS { get; set; }

    }
}
