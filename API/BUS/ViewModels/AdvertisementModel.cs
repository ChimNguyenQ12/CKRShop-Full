using BLL.ViewModels;
using DAL.Entities.Product;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class AdvertisementModel
    {
        public int Id { get; set; }


        [DisplayName("Ảnh")]
        public string Image { get; set; }
        [DisplayName("Loại Ảnh")]
        public int ImageTypeId { get; set; }
        [DisplayName("Loại Ảnh")]
        public ImageTypeModel ImageType { get; set; }

        public int Status { get; set; } = 1;

        public DateTime CreatedAt { get; set; }


    }
}
