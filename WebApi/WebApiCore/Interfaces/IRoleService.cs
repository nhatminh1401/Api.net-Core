using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Models;
using WebApiCore.Models;

namespace WebApiCore.Interfaces
{
    public interface IRoleService
    {
        Task<IEnumerable<Role>> Get();
        //Task<Department> GetDepartmentByID(int ID);
        //Task<Department> InsertDepartment(Department objDepartment);
        //Task<Department> UpdateDepartment(Department objDepartment);
        //bool DeleteDepartment(int ID);
    }
}
