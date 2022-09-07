using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.ViewModels
{
    public class TradeMarkModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public ProductTypeModel ProductTypeModel { get; set; }
        public Guid ProductTypeId { get; set; }
        public int Status { get; set; } = 1;
        public DateTime CreatedAt { get; set; }
    }
}
