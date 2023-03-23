using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApi.Models;
using WebApiCore.Models;
using WebApiCore.Requests;
using WebApiCore.Responses;

namespace WebApiCore.Interfaces
{
    public interface IUserTokenService
    {
        //Task<TokenResponse> LoginAsync(LoginRequest loginRequest);
        //Task<List<UserInfo>> GetUsersInfoAsync(string email);
        Task<IEnumerable<UserInfo>> GetUsersInfoAsync(string email);
        Task<SignupResponse> SignupAsync(Register signupRequest, string origin);
        Task<UserInfo> UpdateUserInfo(UserInfo userInfo);
        //Task<LogoutResponse> LogoutAsync(int userId);
        Task<UserInfo> GetUserByID(int ID);
        bool DeleteUser(int ID);
    }
}
