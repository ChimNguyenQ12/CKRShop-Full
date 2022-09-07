using DAL.Entities.Product;
using DAL.Entities.User;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.ViewModels
{
    public class CommentModel
    {
        public int Id { get; set; }

        [DisplayName("Khách Hàng")]
        public string UserId { get; set; }
        public User User { get; set; }
        [DisplayName("Nội Dung")]
        public string Content { get; set; }
        [DisplayName("Đăng vào lúc")]
        public DateTime CreatedAt { get; set; }

        public Guid ProductId { get; set; }
        [DisplayName("Tên sản phẩm")]
        public Product Product { get; set; }

        public int Status { get; set; } = 1;
    }
}
