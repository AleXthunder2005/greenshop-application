using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace greenshopApp.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class RefactorDBBeforeConnectingWithFrontend : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Plants");

            migrationBuilder.DropColumn(
                name: "NoteCount",
                table: "Plants");

            migrationBuilder.DropColumn(
                name: "RemainingCount",
                table: "Plants");

            migrationBuilder.DropColumn(
                name: "SummaryNote",
                table: "Plants");

            migrationBuilder.DropColumn(
                name: "DeliveryAdress",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "Sity",
                table: "Users",
                newName: "City");

            migrationBuilder.RenameColumn(
                name: "PictureFileName",
                table: "Plants",
                newName: "ShortDescription");

            migrationBuilder.AlterColumn<string>(
                name: "Size",
                table: "Plants",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<int>(
                name: "Sale",
                table: "Plants",
                type: "integer",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Sale",
                table: "Plants");

            migrationBuilder.RenameColumn(
                name: "City",
                table: "Users",
                newName: "Sity");

            migrationBuilder.RenameColumn(
                name: "ShortDescription",
                table: "Plants",
                newName: "PictureFileName");

            migrationBuilder.AlterColumn<int>(
                name: "Size",
                table: "Plants",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Plants",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "NoteCount",
                table: "Plants",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RemainingCount",
                table: "Plants",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<long>(
                name: "SummaryNote",
                table: "Plants",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "DeliveryAdress",
                table: "Orders",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
