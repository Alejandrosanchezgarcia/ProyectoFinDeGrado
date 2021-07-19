using System;
using System.Collections.Generic;

#nullable disable

namespace BelakorGamesAPI
{
    public partial class Producto
    {
        public Producto()
        {
            DetallePedidos = new HashSet<DetallePedido>();
            ListaDeseos = new HashSet<ListaDeseo>();
            Valoracions = new HashSet<Valoracion>();
        }

        public int IdProducto { get; set; }
        public string NombreProducto { get; set; }
        public string DescripcionProducto { get; set; }
        public decimal Precio { get; set; }
        public int Stock { get; set; }
        public string Imagen { get; set; }
        public int IdCategoria { get; set; }

        public virtual Categorium IdCategoriaNavigation { get; set; }
        public virtual ICollection<DetallePedido> DetallePedidos { get; set; }
        public virtual ICollection<ListaDeseo> ListaDeseos { get; set; }
        public virtual ICollection<Valoracion> Valoracions { get; set; }
    }
}
