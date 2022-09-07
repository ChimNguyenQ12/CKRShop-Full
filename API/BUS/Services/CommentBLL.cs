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
    public class CommentBLL
    {
        private CommentDAL _DAL;
        private Mapper _CommentMapper;
        private readonly ShopContext _context;

        /// <summary>
        /// Constructor init config mapper, new UserDAL
        /// </summary>
        /// <param name="context"></param>
        public CommentBLL(ShopContext context)
        {
            _DAL = new CommentDAL(context);
            var _configUser = new MapperConfiguration(cfg => cfg.CreateMap<Comment, CommentModel>().ReverseMap());

            _CommentMapper = new Mapper(_configUser);
            _context = context;
        }
        public IEnumerable<CommentModel> GetAllComments()
        {
            /// Mapper 
            IEnumerable<Comment> commentsFromDB = _DAL.GetAllComments();
            IEnumerable<CommentModel> commentsModel = _CommentMapper.Map<IEnumerable<Comment>, IEnumerable<CommentModel>>(commentsFromDB);
            return commentsModel;
        }

        public IEnumerable<CommentModel> GetCommentByProductId(Guid id)
        {
            // Mapper
            var commentEntity = _DAL.GetCommentByProductId(id);
            IEnumerable<CommentModel> commentModel = _CommentMapper.Map<IEnumerable<Comment>, IEnumerable<CommentModel>>(commentEntity);
            //if(data == null)
            //{
            //    throw new Exception("Invalid ID");
            //}
            return commentModel;
        }
        public void AddComment(CommentModel commentModel)
        {
            Comment commentEntity = _CommentMapper.Map<CommentModel, Comment>(commentModel);
            _DAL.AddComment(commentEntity);
        }

        public CommentModel DeleteComment(int id)
        {
            var comment = _context.Comments.FirstOrDefault(x => x.Id == id);
            if (comment == null)
            {
                throw new Exception("Invalid ID");
            }
            CommentModel commentModel = _CommentMapper.Map<Comment, CommentModel>(comment);
            _DAL.DeleteComment(comment);
            return commentModel;
        }

        public CommentModel UpdateComment(Comment comment, int id)
        {
            var commentCurrent = _context.Comments.Where(s => s.Id == id)
                                                        .FirstOrDefault();
            if (commentCurrent != null)
            {
                CommentModel commentModel = _CommentMapper.Map<Comment, CommentModel>(comment);
                _DAL.UpdateComment(comment, commentCurrent);
                return commentModel;
            }
            else
            {
                throw new Exception("Invalid ID");
            }
        }

        //public List<CommentModel> Search(string content, string commentName, string productName)
        //{
        //    // Mapper
        //    var commentEntity = _DAL.Search(content, commentName, productName);
        //    List<CommentModel> commentModel = _CommentMapper.Map<List<Comment>, List<CommentModel>>(commentEntity);
        //    //if(data == null)
        //    //{
        //    //    throw new Exception("Invalid ID");
        //    //}
        //    return commentModel;

        //}
    }
}
