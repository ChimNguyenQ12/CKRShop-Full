using ClassLibrary.Model.Models.DbModel;
using DAL.Entities;
using DAL.Entities.Product;
using DAL.Entities.User;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Data
{
    public class ShopContext : IdentityDbContext<User>
    {
        public ShopContext(DbContextOptions<ShopContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }

        public DbSet<ProductType> ProductTypes { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<ResetPassword> ResetPasswords { get; set; }

        public DbSet<Advertisement> Advertisements { get; set; }
        public DbSet<ImageType> ImageTypes { get; set; }
        public DbSet<TradeMark> TradeMarks { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<InvoiceDetail> InvoiceDetails { get; set; }
        public DbSet<GalleryProduct> GalleryProducts { get; set; }

        public DbSet<Wishlist> Wishlists { get; set; }

        public DbSet<Coupon> Coupons { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder); 
    }
    }
}
