using Microsoft.EntityFrameworkCore.Migrations;

namespace FashionCollection_Project.Migrations
{
    public partial class m6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Wear_Collections_FashionCollectionId",
                table: "Wear");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Wear",
                table: "Wear");

            migrationBuilder.RenameTable(
                name: "Wear",
                newName: "Wears");

            migrationBuilder.RenameIndex(
                name: "IX_Wear_FashionCollectionId",
                table: "Wears",
                newName: "IX_Wears_FashionCollectionId");

            migrationBuilder.AlterColumn<int>(
                name: "FashionCollectionId",
                table: "Wears",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Wears",
                table: "Wears",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Wears_Collections_FashionCollectionId",
                table: "Wears",
                column: "FashionCollectionId",
                principalTable: "Collections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Wears_Collections_FashionCollectionId",
                table: "Wears");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Wears",
                table: "Wears");

            migrationBuilder.RenameTable(
                name: "Wears",
                newName: "Wear");

            migrationBuilder.RenameIndex(
                name: "IX_Wears_FashionCollectionId",
                table: "Wear",
                newName: "IX_Wear_FashionCollectionId");

            migrationBuilder.AlterColumn<int>(
                name: "FashionCollectionId",
                table: "Wear",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Wear",
                table: "Wear",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Wear_Collections_FashionCollectionId",
                table: "Wear",
                column: "FashionCollectionId",
                principalTable: "Collections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
