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
    public class CouponModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Code { get; set; }

        public int Discount { get; set; }
        public int Status { get; set; } = 1;

        public DateTime DateTo { get; set; }
        public DateTime DateFrom { get; set; }

    }
}
