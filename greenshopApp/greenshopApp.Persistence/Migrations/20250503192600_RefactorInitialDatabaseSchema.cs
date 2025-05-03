using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace greenshopApp.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class RefactorInitialDatabaseSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderEntity_UserEntity_CustomerID",
                table: "OrderEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderEntityPlantEntity_OrderEntity_OrdersId",
                table: "OrderEntityPlantEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderEntityPlantEntity_PlantEntity_PlantsId",
                table: "OrderEntityPlantEntity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserEntity",
                table: "UserEntity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PlantEntity",
                table: "PlantEntity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderEntity",
                table: "OrderEntity");

            migrationBuilder.DropColumn(
                name: "Rate",
                table: "PlantEntity");

            migrationBuilder.RenameTable(
                name: "UserEntity",
                newName: "Users");

            migrationBuilder.RenameTable(
                name: "PlantEntity",
                newName: "Plants");

            migrationBuilder.RenameTable(
                name: "OrderEntity",
                newName: "Orders");

            migrationBuilder.RenameIndex(
                name: "IX_OrderEntity_CustomerID",
                table: "Orders",
                newName: "IX_Orders_CustomerID");

            migrationBuilder.AddColumn<int>(
                name: "NoteCount",
                table: "Plants",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "PictureFileName",
                table: "Plants",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<long>(
                name: "SummaryNote",
                table: "Plants",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Plants",
                table: "Plants",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Orders",
                table: "Orders",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderEntityPlantEntity_Orders_OrdersId",
                table: "OrderEntityPlantEntity",
                column: "OrdersId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderEntityPlantEntity_Plants_PlantsId",
                table: "OrderEntityPlantEntity",
                column: "PlantsId",
                principalTable: "Plants",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Users_CustomerID",
                table: "Orders",
                column: "CustomerID",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderEntityPlantEntity_Orders_OrdersId",
                table: "OrderEntityPlantEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderEntityPlantEntity_Plants_PlantsId",
                table: "OrderEntityPlantEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Users_CustomerID",
                table: "Orders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Plants",
                table: "Plants");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Orders",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "NoteCount",
                table: "Plants");

            migrationBuilder.DropColumn(
                name: "PictureFileName",
                table: "Plants");

            migrationBuilder.DropColumn(
                name: "SummaryNote",
                table: "Plants");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "UserEntity");

            migrationBuilder.RenameTable(
                name: "Plants",
                newName: "PlantEntity");

            migrationBuilder.RenameTable(
                name: "Orders",
                newName: "OrderEntity");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_CustomerID",
                table: "OrderEntity",
                newName: "IX_OrderEntity_CustomerID");

            migrationBuilder.AddColumn<float>(
                name: "Rate",
                table: "PlantEntity",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserEntity",
                table: "UserEntity",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PlantEntity",
                table: "PlantEntity",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderEntity",
                table: "OrderEntity",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderEntity_UserEntity_CustomerID",
                table: "OrderEntity",
                column: "CustomerID",
                principalTable: "UserEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderEntityPlantEntity_OrderEntity_OrdersId",
                table: "OrderEntityPlantEntity",
                column: "OrdersId",
                principalTable: "OrderEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderEntityPlantEntity_PlantEntity_PlantsId",
                table: "OrderEntityPlantEntity",
                column: "PlantsId",
                principalTable: "PlantEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
