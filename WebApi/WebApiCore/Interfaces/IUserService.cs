using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApiCore.Models;
using WebApiCore.Requests;
using WebApiCore.Responses;

namespace WebApiCore.Interfaces
{
    public interface IUserService
    {
        Task<TokenResponse> LoginAsync(LoginRequest loginRequest);
        Task<SignupResponse> SignupAsync(SignupRequest signupRequest);
        Task<LogoutResponse> LogoutAsync(int userId);
        Task<List<User>> GetUsersAsync();
    }
}
