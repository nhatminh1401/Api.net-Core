using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    public partial class AddFRKeyUserRole : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RoleId",
                table: "UserInfo",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserInfo_RoleId",
                table: "UserInfo",
                column: "RoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserInfo_Roles_RoleId",
                table: "UserInfo",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserInfo_Roles_RoleId",
                table: "UserInfo");

            migrationBuilder.DropIndex(
                name: "IX_UserInfo_RoleId",
                table: "UserInfo");

            migrationBuilder.DropColumn(
                name: "RoleId",
                table: "UserInfo");
        }
    }
}
