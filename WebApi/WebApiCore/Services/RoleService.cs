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
    }
}
