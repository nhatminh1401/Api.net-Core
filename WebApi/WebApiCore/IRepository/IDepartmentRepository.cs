using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Models;
using WebApiCore.Paging;

namespace WebApi.IRepository
{
    public interface IDepartmentRepository
    {
        //Task<IEnumerable<Department>> GetDepartment();
        //Task<Department> GetDepartmentByID(int ID);
        //Task<Department> InsertDepartment(Department objDepartment);
        //Task<Department> UpdateDepartment(Department objDepartment);
        //bool DeleteDepartment(int ID);
        Task<object> GetDepartments(PagingParameters pagingParameters);
        Department GetDepartment(int id);
        void CreateDepartment(Department department);
        void UpdateDepartment(Department department);
        void DeleteDepartment(Department department);
    }
}
