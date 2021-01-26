using Microsoft.EntityFrameworkCore.Migrations;

namespace webApi.Migrations
{
    public partial class v1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Gradovi",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gradovi", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Timovi",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MaxBrojVolontera = table.Column<int>(type: "int", nullable: false),
                    MojGradId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Timovi", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Timovi_Gradovi_MojGradId",
                        column: x => x.MojGradId,
                        principalTable: "Gradovi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Volonteri",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MojTimId = table.Column<int>(type: "int", nullable: true),
                    MojGradId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Volonteri", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Volonteri_Gradovi_MojGradId",
                        column: x => x.MojGradId,
                        principalTable: "Gradovi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Volonteri_Timovi_MojTimId",
                        column: x => x.MojTimId,
                        principalTable: "Timovi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Timovi_MojGradId",
                table: "Timovi",
                column: "MojGradId");

            migrationBuilder.CreateIndex(
                name: "IX_Volonteri_MojGradId",
                table: "Volonteri",
                column: "MojGradId");

            migrationBuilder.CreateIndex(
                name: "IX_Volonteri_MojTimId",
                table: "Volonteri",
                column: "MojTimId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Volonteri");

            migrationBuilder.DropTable(
                name: "Timovi");

            migrationBuilder.DropTable(
                name: "Gradovi");
        }
    }
}
