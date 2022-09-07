using BLL.Services;
using BLL.ViewModels;
using DAL.Data;
using DAL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace CKRShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TradeMarkController : ControllerBase
    {
        private TradeMarkBLL _BLL;
        private readonly ShopContext _context;

        public TradeMarkController(ShopContext context)
        {
            _BLL = new TradeMarkBLL(context);
            _context = context;
        }
        [HttpGet]
        [Authorize(Roles = "Staff,Admin")]
        [Route("GetAllTradeMarks")]
        public IEnumerable<TradeMarkModel> GetAllTradeMarks()
        {
            return _BLL.GetAllTradeMarks();
        }
        /// <summary>
        /// Call method GetTradeMarkById from BLL class with route GetTradeMarkById
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetTradeMarkByProductTypeId")]
        public ActionResult<TradeMarkModel> GetTradeMarkByProductTypeId(Guid id)
        {
            var data = _BLL.GetTradeMarkByProductTypeId(id);
            // check null id
            if (data == null)
            {
                return NotFound("Invalid ID");
            }
            return Ok(data);
        }


        /// <summahttps://localhost:44302/api/TradeMark/AddTradeMark
        /// Call method AddTradeMark from BLL class with route AddTradeMark
        /// </summary>
        /// <returns></returns>
        [HttpPost] //  POST
        [Route("AddTradeMark")]
        [Authorize(Roles = "Staff,Admin")]
        public void AddTradeMark(TradeMarkModel productModel)
        {
            _BLL.AddTradeMark(productModel);
        }


        /// <summary>
        /// Call method DeleteTradeMark from BLL class with route DeleteTradeMark
        /// </summary>
        /// <returns></returns>
        [HttpDelete] //  DELETE
        [Route("DeleteTradeMark")]
        [Authorize(Roles = "Staff,Admin")]
        public void DeleteTradeMark(Guid id)
        {
            _BLL.DeleteTradeMark(id);

        }


        /// <summary>
        /// Call method UpdateTradeMark from BLL class with route UpdateTradeMark
        /// </summary>
        /// <returns></returns>
        [HttpPut] //  PUT
        [Route("UpdateTradeMark")]
        [Authorize(Roles = "Staff,Admin")]
        public void UpdateTradeMark(TradeMark TradeMark, Guid id)
        {
            _BLL.UpdateTradeMark(TradeMark, id);
        }

        /// <summary>
        /// Call method Search from BLL  class with route Search
        /// </summary>
        /// <param name="id"></param>
        [HttpGet] //  PATCH
        [Route("Search")]

        public ActionResult<TradeMarkModel> Search(string name)
        {
            var data = _BLL.Search(name);
            // check null
            if (data == null)
            {
                return NotFound("Invalid ID");
            }
            return Ok(data);

        }
    }
}

