using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApi.Migrations
{
    public partial class AddRFKEmp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EmployeeID",
                table: "Department",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Department_EmployeeID",
                table: "Department",
                column: "EmployeeID");

            migrationBuilder.AddForeignKey(
                name: "FK_Department_Employee_EmployeeID",
                table: "Department",
                column: "EmployeeID",
                principalTable: "Employee",
                principalColumn: "EmployeeID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Department_Employee_EmployeeID",
                table: "Department");

            migrationBuilder.DropIndex(
                name: "IX_Department_EmployeeID",
                table: "Department");

            migrationBuilder.DropColumn(
                name: "EmployeeID",
                table: "Department");
        }
    }
}
