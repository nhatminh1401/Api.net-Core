using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApi.Models;
using WebApiCore.Helpers;
using WebApiCore.Interfaces;
using WebApiCore.Models;
using WebApiCore.Requests;
using WebApiCore.Responses;

namespace WebApiCore.Services
{
    public class UserTokenService : IUserTokenService
    {

        private readonly APIDbContext tasksDbContext;
        private readonly ITokenService tokenService;

        public UserTokenService(APIDbContext tasksDbContext/*, ITokenService tokenService*/)
        {
            this.tasksDbContext = tasksDbContext;
            //this.tokenService = tokenService;
        }
        public async Task<List<UserInfo>> GetUsersInfoAsync()
        {
            if (tasksDbContext != null)
            {
                return await tasksDbContext.UsersInfo.ToListAsync();
            }
            return null;
        }

        public async Task<IEnumerable<UserInfo>> GetUsersInfoAsync(string email)
        {
            var result = (from a in tasksDbContext.UsersInfo
                          where a.Email == email
                          select a)
                          .ToList();
            return result;
        }
        public async Task<SignupResponse> SignupAsync(Register signupRequest, string origin)
        {
            var existingUser = await tasksDbContext.UsersInfo.SingleOrDefaultAsync(user => user.Email == signupRequest.Email);

            if (existingUser != null)
            {
                return new SignupResponse
                {
                    Success = false,
                    Error = "User already exists with the same email",
                    ErrorCode = "S02"
                };
            }

            if (signupRequest.Password != signupRequest.ConfirmPassword)
            {
                return new SignupResponse
                {
                    Success = false,
                    Error = "Password and confirm password do not match",
                    ErrorCode = "S03"
                };
            }

            if (signupRequest.Password.Length <= 7) // This can be more complicated than only length, you can check on alphanumeric and or special characters
            {
                return new SignupResponse
                {
                    Success = false,
                    Error = "Password is weak",
                    ErrorCode = "S04"
                };
            }
                     
            var user = new UserInfo
            {
                Email = signupRequest.Email,
                Password = signupRequest.Password,
                ConfirmPassword = signupRequest.ConfirmPassword,
                FirstName = signupRequest.FirstName,
                LastName = signupRequest.LastName,
                UserName = signupRequest.UserName,
                CreateDate = signupRequest.CreatedDate,
                //Active = true // You can save is false and send confirmation email to the user, then once the user confirms the email you can make it true
            };

            await tasksDbContext.UsersInfo.AddAsync(user);

            var saveResponse = await tasksDbContext.SaveChangesAsync();

            if (saveResponse >= 0)
            {
                return new SignupResponse { Success = true, Email = user.Email };
            }

            return new SignupResponse
            {
                Success = false,
                Error = "Unable to save the user",
                ErrorCode = "S05"
            };
        }


        public async Task<UserInfo> UpdateUserInfo(UserInfo userInfo)
        {
            tasksDbContext.Entry(userInfo).State = EntityState.Modified;
            await tasksDbContext.SaveChangesAsync();
            return userInfo;
        }

        public async Task<UserInfo> GetUserByID(int ID)
        {
            return await tasksDbContext.UsersInfo.FindAsync(ID);
        }
        public bool DeleteUser(int ID)
        {
            bool result = false;
            var user = tasksDbContext.UsersInfo.Find(ID);
            if (user != null)
            {
                tasksDbContext.Entry(user).State = EntityState.Deleted;
                tasksDbContext.SaveChanges();
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
