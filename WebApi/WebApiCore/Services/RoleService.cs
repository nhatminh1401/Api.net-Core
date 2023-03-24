using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Models;
using WebApiCore.Interfaces;
using WebApiCore.Models;
using Microsoft.EntityFrameworkCore;

namespace WebApiCore.Services
{
    public class RoleService : IRoleService
    {
        private readonly APIDbContext _appDBContext;
        public RoleService(APIDbContext context)
        {
            _appDBContext = context ??
                throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<Role>> Get()
        {
            try
            {
                var re = await _appDBContext.Roles.ToListAsync();
                return re;
            }
            catch (Exception ex)
            {
                return null;
            }
            
        }
        public async Task<Role> GetRoleByID(int ID)
        {
            return await _appDBContext.Roles.FindAsync(ID);
        }

        public async Task<Role> UpdateRole(Role role)
        {
            _appDBContext.Entry(role).State = EntityState.Modified;
            await _appDBContext.SaveChangesAsync();
            return role;
        }
        public async Task<Role> InsertRole(Role role)
        {
            _appDBContext.Roles.Add(role);
            await _appDBContext.SaveChangesAsync();
            return role;
        }

        public bool DeleteRole(int ID)
        {
            bool result = false;
            var role = _appDBContext.Roles.Find(ID);
            if (role != null)
            {
                _appDBContext.Entry(role).State = EntityState.Deleted;
                _appDBContext.SaveChanges();
                result = true;
            }
            else
            {
                result = false;
            }
            return result;
        }
    }
}
