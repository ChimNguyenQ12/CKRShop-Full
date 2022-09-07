using DAL.Data;
using DAL.Entities;
using DAL.Entities.Product;
using DAL.Entities.Product.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class TradeMarkDAL
    {
        private readonly ShopContext _context;
        public TradeMarkDAL(ShopContext context)
        {
            _context = context;
        }
        public IEnumerable<TradeMark> GetAllTradeMarks()
        {
            return _context.TradeMarks.Where(cate => cate.Status != 99).ToList();
        }
        public IEnumerable<TradeMark> GetTradeMarkByProductTypeId(Guid id)
        {
            var cate = _context.ProductTypes.FirstOrDefault(c => c.Id == id);
            return  _context.TradeMarks.Where(x => x.ProductTypeId == cate.Id && x.Status !=99).ToList();
        }
        public void AddTradeMark(TradeMark tradeMark)
        {
            tradeMark.Status = 1;
            tradeMark.CreatedAt = DateTime.Now;
            _context.TradeMarks.Add(tradeMark);
            _context.SaveChanges();
        }

        public void DeleteTradeMark(TradeMark tradeMark)
        {
            tradeMark.Status =99;
            _context.TradeMarks.Update(tradeMark);
            _context.SaveChanges();
        }

        public void UpdateTradeMark(TradeMark tradeMark, TradeMark tradeMarkCurrent)
        {
            tradeMarkCurrent.Name = tradeMark.Name;
            tradeMarkCurrent.Status = tradeMark.Status;
            tradeMarkCurrent.ProductTypeId = tradeMark.ProductTypeId;
            _context.SaveChanges();
        }

        public List<TradeMark> Search(string name)
        {
            if (name == null) name = "";

            var account = _context.TradeMarks.Where(a => a.Name.Contains(name))
                                           .ToList();
            if (account == null)
            {
                return null;
            }
            return account;
        }
    }
}
