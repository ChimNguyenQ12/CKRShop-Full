using DAL.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class WishlistDAL
    {
        private readonly ShopContext _context;
        public WishlistDAL(ShopContext context)
        {
            _context = context;
        }
        public IEnumerable<Wishlist> GetAllWishlists(string userId)
        {
            return _context.Wishlists.Include(p => p.Product).Where(cmt => cmt.Status !=99 && cmt.UserId == userId).ToList();

        }

        public void AddWishlist(Wishlist Wishlist)
        {
            _context.Wishlists.Add(Wishlist);
            _context.SaveChanges();        
        }

        public void DeleteWishlist(Wishlist Wishlist)
        {
            Wishlist.Status = 99;
            _context.Wishlists.Update(Wishlist);
            _context.SaveChanges();
        }
 

        //public List<Wishlist> Search(string content, string userName, string productName)
        //{
        //    if (content == null) content = "";
        //    if (productName == null) productName = "";
        //    var account = _context.Wishlists.Where(a => a.Content.Contains(content))
        //                                    .Where(a => a.User.UserName.Contains(userName))
        //                                    .Where(a => a.Product.Name.Contains(productName)).ToList();
        //    if (account == null)
        //    {
        //        return null;
        //    }
        //    return account;
        //}
    }
}
