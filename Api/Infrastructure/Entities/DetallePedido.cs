using System;
using System.Collections.Generic;

#nullable disable

namespace BelakorGamesAPI
{
    public partial class DetallePedido
    {
        public int IdPedido { get; set; }
        public int IdProducto { get; set; }
        public decimal Cantidad { get; set; }
        public bool Devuelto { get; set; }

        public virtual Pedido IdPedidoNavigation { get; set; }
        public virtual Producto IdProductoNavigation { get; set; }
    }
}
