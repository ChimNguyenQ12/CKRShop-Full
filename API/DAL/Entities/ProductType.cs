using DAL.Entities.Product.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities.Product
{
    public class ProductType
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public AuditStatusEnum Status { get; set; } = AuditStatusEnum.Active;
        public DateTime CreatedAt { get; set; }
        // Collection reference property cho khóa ngoại từ Product
        public List<Product> Products { get; set; }
        public List<TradeMark> TradeMarks { get; set; }

    }
}
