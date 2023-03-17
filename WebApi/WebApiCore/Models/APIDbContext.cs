using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore.Models;

namespace WebApi.Models
{
    public class APIDbContext : DbContext
    {
        public APIDbContext(DbContextOptions<APIDbContext> options) : base(options) { }
        public DbSet<Department> Departments
        {
            get;
            set;
        }
        public DbSet<Employee> Employees
        {
            get;
            set;
        }
        public virtual DbSet<RefreshToken> RefreshTokens { get; set; }

        public virtual DbSet<User> Users { get; set; }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<RefreshToken>(entity =>
        //    {

        //        entity.Property(e => e.ExpiryDate).HasColumnType("smalldatetime");

        //        entity.Property(e => e.TokenHash)
        //            .IsRequired()
        //            .HasMaxLength(1000);

        //        entity.Property(e => e.TokenSalt)
        //            .IsRequired()
        //            .HasMaxLength(1000);

        //        entity.Property(e => e.Ts)
        //            .HasColumnType("smalldatetime")
        //            .HasColumnName("TS");

        //        entity.HasOne(d => d.User)
        //            .WithMany(p => p.RefreshTokens)
        //            .HasForeignKey(d => d.UserId)
        //            .OnDelete(DeleteBehavior.ClientSetNull)
        //            .HasConstraintName("FK_RefreshToken_User");

        //        entity.ToTable("RefreshToken");
        //    });
        //    modelBuilder.Entity<User>(entity =>
        //    {
        //        entity.Property(e => e.Email)
        //            .IsRequired()
        //            .HasMaxLength(50);

        //        entity.Property(e => e.FirstName)
        //            .IsRequired()
        //            .HasMaxLength(255);

        //        entity.Property(e => e.LastName)
        //            .IsRequired()
        //            .HasMaxLength(255);

        //        entity.Property(e => e.Password)
        //            .IsRequired()
        //            .HasMaxLength(255);

        //        entity.Property(e => e.PasswordSalt)
        //            .IsRequired()
        //            .HasMaxLength(255);

        //        entity.Property(e => e.Phone)
        //           .IsRequired()
        //           .HasMaxLength(12);

        //        entity.Property(e => e.Address)
        //           .IsRequired()
        //           .HasMaxLength(255);

        //        entity.Property(e => e.CreatedDate)
        //            .HasColumnType("smalldatetime")
        //            .HasColumnName("CreatedDate");

        //        entity.ToTable("User");

        //    });
        //}
    }
}
