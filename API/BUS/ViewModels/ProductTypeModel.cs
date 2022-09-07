using DAL.Entities.Product;
using DAL.Entities.Product.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.ViewModels
{
    public class ProductTypeModel
    {
        public Guid Id { get; set; }

        [DisplayName("Loại sản phẩm")]
        [Required(ErrorMessage = "{0} không được bỏ trống")]
        public string Name { get; set; }
        
        public DateTime CreatedAt { get; set; }

        [DisplayName("Còn hiệu lực")]
        public AuditStatusEnum Status { get; set; } = AuditStatusEnum.Active;
        // Collection reference property cho khóa ngoại từ Product
        public List<Product> Products { get; set; }
    }
}
