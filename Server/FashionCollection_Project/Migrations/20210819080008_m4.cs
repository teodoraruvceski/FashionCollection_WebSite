using Microsoft.EntityFrameworkCore.Migrations;

namespace FashionCollection_Project.Migrations
{
    public partial class m4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "RateCount",
                table: "Collections",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "RateCount",
                table: "Collections",
                type: "int",
                nullable: false,
                oldClrType: typeof(long));
        }
    }
}
