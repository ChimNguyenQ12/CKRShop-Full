using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities.Product.Enums
{
    public enum StatusEnum
    {
        [Display(Name = "NotSet")]
        [EnumMember(Value = "NotSet")]
        NotSet = 1,
        [Display(Name = "New")]
        [EnumMember(Value = "New")]
        New = 2,

        [Display(Name = "Error")]
        [EnumMember(Value = "Error")]
        Error = 3,

        [Display(Name = "Inventory")]
        [EnumMember(Value = "Inventory")]
        Inventory = 4,

        [Display(Name = "Selling ")]
        [EnumMember(Value = "Selling ")]
        Selling = 5,

        [Display(Name = "Inactive ")]
        [EnumMember(Value = "Inactive ")]
        Inactive = 6,

        [Display(Name = "Deleted")]
        [EnumMember(Value = "Deleted")]
        Deleted = 99,

        [Display(Name = "DeletedTrash")]
        [EnumMember(Value = "DeletedTrash")]
        DeletedTrash = 100

    }
}
