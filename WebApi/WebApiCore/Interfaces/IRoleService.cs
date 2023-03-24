using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Models;
using WebApiCore.Models;

namespace WebApiCore.Interfaces
{
    public interface IRoleService
    {
        Task<IEnumerable<Role>> Get();
        Task<Role> GetRoleByID(int ID);
        Task<Role> InsertRole(Role role);
        Task<Role> UpdateRole(Role role);
        bool DeleteRole(int ID);
    }
}
