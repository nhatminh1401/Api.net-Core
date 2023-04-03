using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Session;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography;
using System.Threading.Tasks;
using WebApi.IRepository;
using WebApi.Models;
using WebApiCore.Models;
using WebApiCore.Paging;
using WebApiCore.Responses;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace WebApi.Repository
{
    public class EmployeeRepository : RepositoryBase<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(APIDbContext context) : base(context) 
        {

        }
        //private readonly APIDbContext _apiDBContext;
        

        public void CreateEmployee(Employee employee)
        {
            Create(employee);
        }
        public void UpdateEmployee(Employee employee)
        {
            Update(employee);
        }

        public void DeleteEmployee(Employee employee)
        {
            Delete(employee);
        }
       
        public Employee GetEmployee(int id)
        {
            return FindbyCondition (e => e.EmployeeID == id).FirstOrDefault();
        }

        public async Task<IEnumerable<Employee>> Search(string name)
        {
            IQueryable<Employee> query = ReposistoryContext.Employees;
            if (!string.IsNullOrEmpty(name))
            {
                query = query.Where(e => e.EmployeeName.Contains(name) || e.EmailId.Contains(name));
            }          
            return await query.ToListAsync();
           
        }

        public Task<object> GetEmployees(PagingParameters pagingParameters, string search)
        {
            if (search == null)
            { 
                var employees = PagedList<Employee>.GetPagedList(FindAll().OrderBy(s => s.EmployeeID), 
                    pagingParameters.PageNumber, pagingParameters.PageSize, pagingParameters.OrderBy);
                //int count = temp.TotalCount;
                Object t = new
                {
                    employees.CurrentPage,
                    employees.OrderBy,
                    employees.TotalPage,
                    employees.TotalCount,
                    employees.PageSize,
                    employees.HasPrevious,
                    employees.HasNext,
                    Data = employees
                };
                return Task.FromResult(t) ;
            }
            else
            {
                var employees = PagedList<Employee>.GetPagedList(FindAll().OrderBy(s => s.EmployeeID).
                    Where(e => e.EmailId.Contains(search) || e.EmployeeName.Contains(search)), pagingParameters.PageNumber, pagingParameters.PageSize);
                //int count = temp.TotalCount;
                Object t = new
                {
                    employees.CurrentPage,
                    employees.TotalPage,
                    employees.TotalCount,
                    employees.PageSize,
                    employees.HasPrevious,
                    employees.HasNext,
                    Data = employees
                };
                return Task.FromResult(t);
            }
            
        }

       



        //    private readonly APIDbContext _appDBContext;
        //    public EmployeeRepository(APIDbContext context)
        //    {
        //        _appDBContext = context ??
        //            throw new ArgumentNullException(nameof(context));
        //    }
        //    public async Task<IEnumerable<Employee>> GetEmployees(string email)
        //    {            
        //        var result = (from a in _appDBContext.UsersInfo
        //                      /*where a.Email == email*/ select a)
        //                      .ToList();


        //        return await _appDBContext.Employees.ToListAsync();

        //    }
        //    public async Task<Employee> GetEmployeeByID(int ID)
        //    {
        //        return await _appDBContext.Employees.FindAsync(ID);
        //    }
        //    public async Task<Department> GetEmployeeDeparByID(int ID)
        //    {
        //        return await _appDBContext.Departments.FindAsync(ID);
        //    }
        //    public async Task<Employee> InsertEmployee(Employee objEmployee)
        //    {
        //        _appDBContext.Employees.Add(objEmployee);
        //        await _appDBContext.SaveChangesAsync();
        //        return objEmployee;
        //    }
        //    public async Task<Employee> UpdateEmployee(Employee objEmployee)
        //    {
        //        _appDBContext.Entry(objEmployee).State = EntityState.Modified;
        //        await _appDBContext.SaveChangesAsync();
        //        return objEmployee;
        //    }
        //    public bool DeleteEmployee(int ID)
        //    {
        //        bool result = false;
        //        var department = _appDBContext.Employees.Find(ID);
        //        if (department != null)
        //        {
        //            _appDBContext.Entry(department).State = EntityState.Deleted;
        //            _appDBContext.SaveChanges();
        //            result = true;
        //        }
        //        else
        //        {
        //            result = false;
        //        }
        //        return result;
        //    }
        //}
    }
}
