using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.ViewModels
{
    public class ImageTypeModel
    {
        public int Id { get; set; }
        [DisplayName("Loại Ảnh")]
        public string TypeName { get; set; }
        public DateTime CreatedAt { get; set; }
        public int Status { get; set; } = 1;
        public List<AdvertisementModel> Advertisements { get; set; }
    }
}
