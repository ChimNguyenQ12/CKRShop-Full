using AutoMapper;
using BLL.ViewModels;
using DAL;
using DAL.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class WishlistBLL
    {
        private WishlistDAL _DAL;
        private Mapper _WishlistMapper;
        private readonly ShopContext _context;

        /// <summary>
        /// Constructor init config mapper, new UserDAL
        /// </summary>
        /// <param name="context"></param>
        public WishlistBLL(ShopContext context)
        {
            _DAL = new WishlistDAL(context);
            var _configUser = new MapperConfiguration(cfg => cfg.CreateMap<Wishlist, WishlistModel>().ReverseMap());

            _WishlistMapper = new Mapper(_configUser);
            _context = context;
        }
        public IEnumerable<WishlistModel> GetAllWishlists(string userId)
        {
            /// Mapper 
            IEnumerable<Wishlist> WishlistsFromDB = _DAL.GetAllWishlists(userId);
            IEnumerable<WishlistModel> WishlistsModel = _WishlistMapper.Map<IEnumerable<Wishlist>, IEnumerable<WishlistModel>>(WishlistsFromDB);
            return WishlistsModel;
        }

     
        public void AddWishlist(WishlistModel WishlistModel)
        {
            Wishlist WishlistEntity = _WishlistMapper.Map<WishlistModel, Wishlist>(WishlistModel);
            _DAL.AddWishlist(WishlistEntity);
        }

        public WishlistModel DeleteWishlist(int id)
        {
            var Wishlist = _context.Wishlists.FirstOrDefault(x => x.Id == id);
            if (Wishlist == null)
            {
                throw new Exception("Invalid ID");
            }
            WishlistModel WishlistModel = _WishlistMapper.Map<Wishlist, WishlistModel>(Wishlist);
            _DAL.DeleteWishlist(Wishlist);
            return WishlistModel;
        }

   

        //public List<WishlistModel> Search(string content, string WishlistName, string productName)
        //{
        //    // Mapper
        //    var WishlistEntity = _DAL.Search(content, WishlistName, productName);
        //    List<WishlistModel> WishlistModel = _WishlistMapper.Map<List<Wishlist>, List<WishlistModel>>(WishlistEntity);
        //    //if(data == null)
        //    //{
        //    //    throw new Exception("Invalid ID");
        //    //}
        //    return WishlistModel;

        //}
    }
}
