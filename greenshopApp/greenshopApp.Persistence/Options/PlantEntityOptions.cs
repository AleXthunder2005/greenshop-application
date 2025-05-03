using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using greenshopApp.Persistence.Models;

namespace greenshopApp.Persistence.Options
{
    public class PlantEntityOptions
    {
        public string? Category { get; set; } = null;
        public string? Name { get; set; } = null;
        public decimal? Price { get; set; } = null;
        public int? Size { get; set; } = null;
        public string? Description { get; set; } = null;
        public string? PictureFileName { get; set; } = null;
        public int? RemainingCount { get; set; } = null;
        public int? NoteCount { get; set; } = null;
        public long? SummaryNote { get; set; } = null;
    }
}
