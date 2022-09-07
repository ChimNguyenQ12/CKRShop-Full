using AutoMapper;
using BLL.ViewModels;
using DAL;
using DAL.Data;
using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class TradeMarkBLL
    {
        private readonly TradeMarkDAL _DAL;
        private readonly Mapper _TradeMarkMapper;
        private readonly ShopContext _context;

        /// <summary>
        /// Constructor init config mapper, new UserDAL
        /// </summary>
        /// <param name="context"></param>
        public TradeMarkBLL(ShopContext context)
        {
            _DAL = new TradeMarkDAL(context);
            var _configUser = new MapperConfiguration(cfg => cfg.CreateMap<TradeMark, TradeMarkModel>().ReverseMap());

            _TradeMarkMapper = new Mapper(_configUser);
            _context = context;
        }
        public IEnumerable<TradeMarkModel> GetAllTradeMarks()
        {
            /// Mapper 
            IEnumerable<TradeMark> tradeMarksFromDB = _DAL.GetAllTradeMarks();
            IEnumerable<TradeMarkModel> tradeMarksModel = _TradeMarkMapper.Map<IEnumerable<TradeMark>, IEnumerable<TradeMarkModel>>(tradeMarksFromDB);
            return tradeMarksModel;
        }

        public IEnumerable<TradeMarkModel> GetTradeMarkByProductTypeId(Guid id)
        {
            // Mapper
            IEnumerable<TradeMark> tradeMarkEntity = _DAL.GetTradeMarkByProductTypeId(id);
            IEnumerable<TradeMarkModel> tradeMarkModel = _TradeMarkMapper.Map<IEnumerable<TradeMark>, IEnumerable<TradeMarkModel>>(tradeMarkEntity);
            //if(data == null)
            //{
            //    throw new Exception("Invalid ID");
            //}
            return tradeMarkModel;
        }

        public void AddTradeMark(TradeMarkModel tradeMarkModel)
        {
            //DAL add user => Mapper reverse Usermodel => user
            TradeMark userEntity = _TradeMarkMapper.Map<TradeMarkModel, TradeMark>(tradeMarkModel);
            _DAL.AddTradeMark(userEntity);
        }

        public TradeMarkModel DeleteTradeMark(Guid id)
        {
            var tradeMark = _context.TradeMarks.FirstOrDefault(x => x.Id == id);
            if (tradeMark == null)
            {
                throw new Exception("Invalid ID");
            }
            TradeMarkModel tradeMarkModel = _TradeMarkMapper.Map<TradeMark, TradeMarkModel>(tradeMark);
            _DAL.DeleteTradeMark(tradeMark);
            return tradeMarkModel;
        }

        public TradeMarkModel UpdateTradeMark(TradeMark tradeMark, Guid id)
        {
            var tradeMarkCurrent = _context.TradeMarks.Where(s => s.Id == id)
                                                        .FirstOrDefault();
            if (tradeMarkCurrent != null)
            {
                TradeMarkModel tradeMarkModel = _TradeMarkMapper.Map<TradeMark, TradeMarkModel>(tradeMark);
                _DAL.UpdateTradeMark(tradeMark, tradeMarkCurrent);
                return tradeMarkModel;
            }
            else
            {
                throw new Exception("Invalid ID");
            }
        }

        public List<TradeMarkModel> Search(string name)
        {
            // Mapper
            var tradeMarkEntity = _DAL.Search(name);
            List<TradeMarkModel> tradeMarkModel = _TradeMarkMapper.Map<List<TradeMark>, List<TradeMarkModel>>(tradeMarkEntity);
            //if(data == null)
            //{
            //    throw new Exception("Invalid ID");
            //}
            return tradeMarkModel;

        }
    }
}

