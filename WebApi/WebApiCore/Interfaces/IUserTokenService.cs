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
        Task<List<UserInfo>> GetUsersInfoAsync();
        Task<SignupResponse> SignupAsync(Register signupRequest, string origin);
        //Task<LogoutResponse> LogoutAsync(int userId);
        //Task<List<User>> GetUsersAsync();
    }
}
