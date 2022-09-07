using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BUS.Models
{
    public class UserModel
    {
        public string Id { get; set; }
        [DisplayName("Tên tài khoản")]
        public string UserName { get; set; }
        [DisplayName("Họ tên")]
        public string FullName { get; set; }

        [DisplayName("Mật khẩu")]
        public string PasswordHash { get; set; }

        [DisplayName("Ảnh đại diện")]
        public string Avatar { get; set; }
        [DisplayName("Là admin")]
        [DefaultValue(true)]
        public string Role { get; set; } 

        [DisplayName("Địa chỉ")]
        public string Address { get; set; }
        public bool EmailConfirmed { get; set; }

        [DisplayName("Số điện thoại")]
        public string PhoneNumber { get; set; }

        [DisplayName("Email")]
        public string Email { get; set; }

        [DisplayName("Created At")]
        public string CreatedAt { get; set; }


        [DisplayName("Còn hoạt động")]
        [DefaultValue(true)]
        public int Status { get; set; } = 1;

    }
}
