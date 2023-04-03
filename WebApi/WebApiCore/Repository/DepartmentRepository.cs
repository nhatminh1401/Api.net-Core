using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Globalization;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using WebApi.IRepository;
using WebApi.Models;
using WebApiCore.Paging;
using WebApiCore.Responses;

namespace WebApi.Repository
{
    public class DepartmentRepository : RepositoryBase<Department>, IDepartmentRepository
    {
        //private readonly APIDbContext _appDBContext;
        public DepartmentRepository(APIDbContext context) : base(context) { }

        public void CreateDepartment(Department department)
        {
            Create(department);
        }

        public void DeleteDepartment(Department department)
        {
            Delete(department);
        }

        public Department GetDepartment(int id)
        {
            return FindbyCondition(e => e.DepartmentId == id).FirstOrDefault();
        }

        public Task<object> GetDepartments(PagingParameters pagingParameters, string search)
        {
            if (search == null)
            {
                var deparments = PagedList<Department>.GetPagedList(FindAll(), pagingParameters.PageNumber, pagingParameters.PageSize);
                //int count = temp.TotalCount;
                Object t = new
                {
                    deparments.CurrentPage,
                    deparments.OrderBy,
                    deparments.TotalPage,
                    deparments.TotalCount,
                    deparments.PageSize,
                    deparments.HasPrevious,
                    deparments.HasNext,
                    Data = deparments
                };
                return Task.FromResult(t);
            }
            else
            {
                var deparments = PagedList<Department>.GetPagedList(FindAll().OrderBy(s => s.DepartmentId).Where(s => s.DepartmentName.Contains(search)), pagingParameters.PageNumber, pagingParameters.PageSize);
                //int count = temp.TotalCount;
                Object t = new
                {
                    deparments.CurrentPage,
                    deparments.OrderBy,
                    deparments.TotalPage,
                    deparments.TotalCount,
                    deparments.PageSize,
                    deparments.HasPrevious,
                    deparments.HasNext,
                    Data = deparments
                };
                return Task.FromResult(t);
            }
        }

        public void UpdateDepartment(Department department)
        {
            Update(department);
        }
        //public DepartmentRepository(APIDbContext context)
        //{
        //    _appDBContext = context ??
        //        throw new ArgumentNullException(nameof(context));
        //}
        //public async Task<IEnumerable<Department>> GetDepartment()
        //{
        //    return await _appDBContext.Departments.ToListAsync();
        //}
        //public async Task<Department> GetDepartmentByID(int ID)
        //{
        //    return await _appDBContext.Departments.FindAsync(ID);
        //}
        //public async Task<Department> InsertDepartment(Department objDepartment)
        //{
        //    _appDBContext.Departments.Add(objDepartment);
        //    await _appDBContext.SaveChangesAsync();
        //    return objDepartment;
        //}
        //public async Task<Department> UpdateDepartment(Department objDepartment)
        //{
        //    _appDBContext.Entry(objDepartment).State = EntityState.Modified;
        //    await _appDBContext.SaveChangesAsync();
        //    return objDepartment;
        //}
        //public bool DeleteDepartment(int ID)
        //{
        //    bool result = false;
        //    var department = _appDBContext.Departments.Find(ID);
        //    if (department != null)
        //    {
        //        _appDBContext.Entry(department).State = EntityState.Deleted;
        //        _appDBContext.SaveChanges();
        //        result = true;
        //    }
        //    else
        //    {
        //        result = false;
        //    }
        //    return result;
        //}
    }
}
