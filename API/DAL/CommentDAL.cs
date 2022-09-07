using DAL.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class CommentDAL
    {
        private readonly ShopContext _context;
        public CommentDAL(ShopContext context)
        {
            _context = context;
        }
        public IEnumerable<Comment> GetAllComments()
        {
            return _context.Comments.Include(c => c.User).Include(p => p.Product).Where(cmt => cmt.Status != 99).OrderByDescending(x => x.CreatedAt).ToList();

        }
        public IEnumerable<Comment> GetCommentByProductId(Guid id)
        {
            return _context.Comments.Include(u => u.User).Include(p => p.Product).Where(x => x.ProductId == id).OrderByDescending(x => x.CreatedAt).ToList();

        }
        public void AddComment(Comment comment)
        {
            comment.CreatedAt = DateTime.Now;
            _context.Comments.Add(comment);
            _context.SaveChanges();
        }

        public void DeleteComment(Comment comment)
        {
            comment.Status = 99;
            _context.Comments.Update(comment);
            _context.SaveChanges();
        }

        public void UpdateComment(Comment comment, Comment commentCurrent)
        {
            commentCurrent.Status = comment.Status;
            _context.SaveChanges();
        }

        //public List<Comment> Search(string content, string userName, string productName)
        //{
        //    if (content == null) content = "";
        //    if (productName == null) productName = "";
        //    var account = _context.Comments.Where(a => a.Content.Contains(content))
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
