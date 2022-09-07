using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities.User
{
    public  class UserRoles : IdentityRole
    {
        public const string Admin = "Admin";
        public const string Staff = "Staff";
        public const string Member = "Member";
        public const string Customer = "Customer";

        public string UserId { get; set; }
        public string RoleId { get; set; }

    }
}
