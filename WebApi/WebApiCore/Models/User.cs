using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApiCore.Models
{
    public class User
    {
        public User()
        {
            RefreshTokens = new HashSet<RefreshToken>();

        }
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PasswordSalt { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool Active { get; set; }

        public virtual ICollection<RefreshToken> RefreshTokens { get; set; }
    }
}