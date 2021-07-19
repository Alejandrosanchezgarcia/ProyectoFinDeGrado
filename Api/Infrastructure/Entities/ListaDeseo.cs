using System;
using System.Collections.Generic;

#nullable disable

namespace BelakorGamesAPI
{
    public partial class ListaDeseo
    {
        public int IdUsuario { get; set; }
        public int IdProducto { get; set; }

        public virtual Producto IdProductoNavigation { get; set; }
        public virtual Usuario IdUsuarioNavigation { get; set; }
    }
}
