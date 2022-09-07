using DAL.Entities;
using DAL.Entities.Product;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Advertisement
    {
        public int Id { get; set; }
        public string Image { get; set; }
        public int ImageTypeId { get; set; }
        public ImageType ImageType { get; set; }

        public int Status { get; set; } = 1;

        public DateTime CreatedAt { get; set; }

    }
}
