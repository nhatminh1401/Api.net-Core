using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    public partial class AddRoleInUserInfo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserInfo_Role_RoleId",
                table: "UserInfo");

            migrationBuilder.DropIndex(
                name: "IX_UserInfo_RoleId",
                table: "UserInfo");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Role",
                table: "Role");

            migrationBuilder.DropColumn(
                name: "RoleId",
                table: "UserInfo");

            migrationBuilder.RenameTable(
                name: "Role",
                newName: "Roles");

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "UserInfo",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Roles",
                table: "Roles",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Roles",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "UserInfo");

            migrationBuilder.RenameTable(
                name: "Roles",
                newName: "Role");

            migrationBuilder.AddColumn<int>(
                name: "RoleId",
                table: "UserInfo",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Role",
                table: "Role",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_UserInfo_RoleId",
                table: "UserInfo",
                column: "RoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserInfo_Role_RoleId",
                table: "UserInfo",
                column: "RoleId",
                principalTable: "Role",
                principalColumn: "Id");
        }
    }
}
