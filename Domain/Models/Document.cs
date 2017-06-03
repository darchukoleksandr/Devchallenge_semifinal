using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models
{
    public class Document
    {
        /// <summary>
        /// Primary key. ID of document from the source web-site. Can be used to inspect the original document www.brovary-rada.gov.ua/documents/{{sourceId}}.html
        /// </summary>
        [Key]
        public int SourceId { get; set; }
        /// <summary>
        /// Name of the document
        /// </summary>
        [Required]
        public string Name { get; set; }
        /// <summary>
        /// Date of detection of document removal
        /// </summary>
        public DateTime? Deleted { get; set; }
        public ICollection<Version> Versions { get; set; }
    }
    public class Version
    {
        /// <summary>
        /// Primary key
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        /// <summary>
        /// ID of document from the source web-site. Can be used to inspect the original document www.brovary-rada.gov.ua/documents/{{sourceId}}.html
        /// </summary>
        public int SourceId { get; set; }
        /// <summary>
        /// Text of the document
        /// </summary>
        [Required]
        public string Text { get; set; }
        /// <summary>
        /// Date of detection of document updating
        /// </summary>
        [Required]
        public DateTime Updated { get; set; }
        [ForeignKey("SourceId")]
        public Document Document { get; set; }
    }
}
