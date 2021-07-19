using System;
using System.Collections.Generic;

#nullable disable

namespace BelakorGamesAPI
{
    public partial class Pedido
    {
        public Pedido()
        {
            DetallePedidos = new HashSet<DetallePedido>();
        }

        public int IdPedido { get; set; }
        public bool Comprado { get; set; }
        public string Fecha { get; set; }
        public int IdUsuario { get; set; }

        public virtual Usuario IdUsuarioNavigation { get; set; }
        public virtual ICollection<DetallePedido> DetallePedidos { get; set; }
    }
}
