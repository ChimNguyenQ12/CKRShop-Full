using DAL.Entities.Product;
using DAL.Entities.User;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.ViewModels
{
    public class CartModel
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        // Navigation reference property cho khóa ngoại đến Account
        [DisplayName("Khách hàng")]
        public User User { get; set; }

        public int ProductId { get; set; }

        // Navigation reference property cho khóa ngoại đến Product
        [DisplayName("Sản phẩm")]
        public Product Product { get; set; }

        [Required(ErrorMessage = "{0} không được bỏ trống")]
        [DefaultValue(1)]
        [DisplayName("Số lượng")]
        public int Quantity { get; set; } = 1;
    }
}
