using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;
using WebApiCore.IRepository;
using WebApiCore.Models;
using WebApiCore.Paging;

namespace WebApi.IRepository
{
    public interface IEmployeeRepository : IRepositoryBase<Employee>
    {
        //Task<IEnumerable<Employee>> GetEmployees(string email);
        //Task<Employee> GetEmployeeByID(int ID);
        //Task<Department> GetEmployeeDeparByID(int ID);
        //Task<Employee> InsertEmployee(Employee objEmployee);
        //Task<Employee> UpdateEmployee(Employee objEmployee);
        //bool DeleteEmployee(int ID);
        Task<object> GetEmployees(PagingParameters pagingParameters);
        Employee GetEmployee(int id);
        void CreateEmployee (Employee employee);
        void UpdateEmployee (Employee employee);
        void DeleteEmployee (Employee employee);


    }
}
