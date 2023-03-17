using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.IRepository
{
    public interface IDepartmentRepository
    {
        Task<IEnumerable<Department>> GetDepartment();
        Task<Department> GetDepartmentByID(int ID);
        Task<Department> InsertDepartment(Department objDepartment);
        Task<Department> UpdateDepartment(Department objDepartment);
        bool DeleteDepartment(int ID);
    }
}
