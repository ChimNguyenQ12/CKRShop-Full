using DAL.Data;
using DAL.Entities.Product;
using DAL.Entities.Product.Enums;
using DAL.Entities.User;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class ProductDAL
    {
        private readonly ShopContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public ProductDAL(ShopContext context,IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }
        public IEnumerable<Product> GetAllProducts()
        {
            Product product = new Product();
            var today = DateTime.Now;
            var q = _context.Products.Where(t => t.CreatedAt.AddDays(7) < today).ToList();
            foreach (var item in q)
            {   
                item.Status = StatusEnum.NotSet;
                _context.Products.Update(item);
                _context.SaveChanges();
            }
            return _context.Products.Where(p => p.Status != StatusEnum.Deleted && p.Status != StatusEnum.DeletedTrash).ToList();
        }
        public IEnumerable<Product> GetAllProductsClient()
        {
            return _context.Products.Where(p => p.Status != StatusEnum.Deleted && p.Status != StatusEnum.DeletedTrash).Take(8).ToList();
        }
        public IEnumerable<Product> GetAllAscendingProducts()
        {
            return _context.Products.Where(p => p.Status != StatusEnum.Deleted && p.Status != StatusEnum.DeletedTrash).OrderBy(p=>p.Price).ToList();
        }
        public IEnumerable<Product> GetAllDescendingProducts()
        {
            return _context.Products.Where(p => p.Status != StatusEnum.Deleted && p.Status != StatusEnum.DeletedTrash).OrderByDescending(p => p.Price).ToList();
        }
        public IEnumerable<Product> GetProductsIndex()
        {
            return _context.Products.Where(p => p.Status != StatusEnum.Deleted && p.Status != StatusEnum.DeletedTrash).ToList();
        }
        public IEnumerable<Product> GetAllProductsRemove()
        {
            return _context.Products.Where(p => p.Status == StatusEnum.Deleted).ToList();
        }

        public IEnumerable<Product> GetAllNewProducts()
        {
            return _context.Products.Where(p => p.Status != StatusEnum.Deleted && p.Status != StatusEnum.DeletedTrash && p.Status == StatusEnum.New).ToList();
        }

        public IEnumerable<Product> GetAllBestSellerProducts()
        {
            return _context.Products.Where(p => p.Status != StatusEnum.Deleted && p.Status != StatusEnum.DeletedTrash && p.Status == StatusEnum.Selling).ToList();
        }

        public Product GetProductById(Guid id)
        {
            return _context.Products.FirstOrDefault(x => x.Id == id);

        }

        public IEnumerable<Product> GetProductByTypeId(Guid id)
        {
            return _context.Products.Where(x => x.ProductTypeId == id).ToList();

        }
        public void AddProduct(Product product)
        {
            product.CreatedAt = DateTime.Now;
            _context.Products.Add(product);
            _context.SaveChanges();       
        }
        public void DeleteProduct(Product product)
        {
            product.Status = StatusEnum.Deleted;
            _context.Products.Update(product);
            _context.SaveChanges();
        }

        public void DeleteProductTrash(Product product)
        {
            product.Status = StatusEnum.DeletedTrash;
            _context.Products.Update(product);
            _context.SaveChanges();
        }
        public void UpdateProduct(Product product, Product productCurrent)
        {
            productCurrent.Name = product.Name;
            productCurrent.Price = product.Price;
            productCurrent.Stock = product.Stock;
            productCurrent.Status = product.Status;
            productCurrent.SKU = product.SKU;
            productCurrent.Branch = product.Branch;
            productCurrent.ProductTypeId = product.ProductTypeId;
            productCurrent.ProductType = product.ProductType;
            productCurrent.Description = product.Description;
            productCurrent.Image = product.Image;

            _context.SaveChanges();
        }
        public List<Product> SearchInClient(string SearchText)
        {         
                     
                var product1 = _context.Products.Where(a => a.Name.Contains(SearchText) || a.Branch.Contains(SearchText))                                       
                                          .ToList();
                if (product1 == null)
                {
                    return null;
                }
                return product1;                
        }
        public List<Product> Search(Guid productTypeId, string trademark = "", int price = 0, int stock = 0)
        {
            var priceMin = 0;
            var stockMin = 0;
            if (productTypeId == Guid.Empty) productTypeId = Guid.Empty;
            if (trademark == null) trademark = "";
            if (price == 500) priceMin = 0;
            if (price == 1000) priceMin = 500;
            if (price == 2000) priceMin = 1000;
            if (price == 3000) priceMin = 2000;
            if (stock == 50) stockMin = 0;
            if (stock == 100) stockMin = 50;
            if (stock == 300) stockMin = 100;
            if (stock == 500) stockMin = 300;
            if (price == 4000 && stock == 1000)
            {
                var product1 = _context.Products.Where(a => a.ProductTypeId == productTypeId)
                                         .Where(a => a.Branch == trademark)
                                         .Where(a => a.Price > 3000)
                                         .Where(a => a.Stock > 500)
                                         .ToList();
                if (product1 == null)
                {
                    return null;
                }
                return product1;
            }
            else if (price == 4000 && stock != 1000)
            {
                var product1 = _context.Products.Where(a => a.ProductTypeId == productTypeId)
                                          .Where(a => a.Branch == trademark)
                                          .Where(a => a.Price > 3000)
                                          .Where(a => a.Stock < stock && a.Stock > stockMin)
                                          .ToList();
                if (product1 == null)
                {
                    return null;
                }
                return product1;
            }
            else if (stock == 1000 && price != 4000)
            {
                var product1 = _context.Products.Where(a => a.ProductTypeId == productTypeId)
                                         .Where(a => a.Branch == trademark)
                                         .Where(a => a.Price < price && a.Price > priceMin)
                                         .Where(a => a.Stock > 500)
                                         .ToList();
                if (product1 == null)
                {
                    return null;
                }
                return product1;
            }
            else
            {
                var product = _context.Products.Where(a => a.ProductTypeId == productTypeId)
                                          .Where(a => a.Branch == trademark)
                                          .Where(a => a.Price < price && a.Price > priceMin)
                                          .Where(a => a.Stock < stock && a.Stock > stockMin)
                                          .ToList();
                if (product == null)
                {
                    return null;
                }
                return product;
            }

        }
    }
}
