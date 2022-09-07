using DAL.Data;
using DAL.Entities.Product;
using DAL.Entities.Product.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class ProductTypeDAL
    {
        private readonly ShopContext _context;
        public ProductTypeDAL(ShopContext context)
        {
            _context = context;
        }
        public IEnumerable<ProductType> GetAllProductTypes()
        {
            return _context.ProductTypes.Where(cate => cate.Status != AuditStatusEnum.Deleted).ToList();
        }
        public ProductType GetProductTypeById(Guid id)
        {
            return _context.ProductTypes.FirstOrDefault(x => x.Id == id);

        }
        public void AddProductType(ProductType productType)
        {
            productType.CreatedAt = DateTime.Now;
            _context.ProductTypes.Add(productType);
            _context.SaveChanges();
        }

        public void DeleteProductType(ProductType productType)
        {
            productType.Status = AuditStatusEnum.Deleted;
            _context.ProductTypes.Update(productType);
            _context.SaveChanges();
        }

        public void UpdateProductType(ProductType productType, ProductType productTypeCurrent)
        {
            productTypeCurrent.Name = productType.Name;
            productTypeCurrent.Status = productType.Status;
            _context.SaveChanges();
        }

        public List<ProductType> Search(string name)
        {
            if (name == null) name = "";
         
            var account = _context.ProductTypes.Where(a => a.Name.Contains(name))
                                           .ToList();
            if (account == null)
            {
                return null;
            }
            return account;
        }
    }
}
