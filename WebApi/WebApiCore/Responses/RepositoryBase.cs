using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using WebApi.Models;
using WebApiCore.IRepository;

namespace WebApiCore.Responses
{
    public class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected APIDbContext ReposistoryContext { get; set; }

        public RepositoryBase(APIDbContext ReposistoryContext) 
        {
            this.ReposistoryContext = ReposistoryContext;
        }

        public void Create(T entity)
        {
            this.ReposistoryContext.Set<T>().Add(entity);
            this.ReposistoryContext.SaveChanges();
        }

        public void Delete(T entity)
        {
            this.ReposistoryContext.Set<T>().Remove(entity);
            this.ReposistoryContext.SaveChanges();
        }

        public IQueryable<T> FindAll()
        {
            return this.ReposistoryContext.Set<T>().AsNoTracking();
        }

        public IQueryable<T> FindbyCondition(Expression<Func<T, bool>> exception)
        {
            return this.ReposistoryContext.Set<T>().Where(exception).AsNoTracking();
        }

        public void Update(T entity)
        {
            this.ReposistoryContext.Set<T>().Update(entity);
            this.ReposistoryContext.SaveChanges();
        }
    }
}
