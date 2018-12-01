using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CloudReseller.Api.Models
{
    public class Order
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public IList<OrderItem> Items { get; set; }
    }

    public class OrderItem
    {
        [Required]
        public string ProductId { get; set; }

        [Required]
        public int Quantity { get; set; }
    }
}
